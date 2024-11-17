import { Component, Inject, Input, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  lowercaseValidator,
  numberValidator,
  symbolValidator,
  uppercaseValidator,
} from '../../../../validators/password-validator';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Result } from '../../../../@types/http';
import { IUserService } from '../../../../interface/user.service.interface';
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        name: [
          '',
          [Validators.required, Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)],
        ],
        login: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            uppercaseValidator(),
            lowercaseValidator(),
            numberValidator(),
            symbolValidator(),
          ],
        ],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  salvar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      this.userService.criar(this.formulario.value).subscribe({
        next: () => {
          this.notificationService.success({
            title: 'Cadastro de Usuário',
            message: 'Sucesso ao cadastrar o usuário',
          });

          this.cancelar();
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              if (origin.includes('login'))
                this.formulario
                  .get('login')
                  ?.setErrors({ backendError: message });
            });

            this.notificationService.error({
              title: 'Cadastro de Usuário',
              message: 'Erro ao cadastrar o usuário',
            });
          }
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/users']);
  }
}
