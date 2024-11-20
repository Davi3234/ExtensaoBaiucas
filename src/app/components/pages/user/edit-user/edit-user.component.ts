import { Usuario } from '../../../../service/user/user';
import { Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { IUserService } from '../../../../interface/user.service.interface';
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  formulario!: FormGroup;
  user!: Usuario;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group(
      {
        id: [0, []],
        name: [
          '',
          [Validators.required, Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)],
        ],
        active: [
          '',
          [Validators.required],
        ],
        login: ['', [Validators.required, Validators.email]],
        password: [''],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );

    this.formulario.get('password')?.valueChanges.subscribe((password) => {
      const passwordControl = this.formulario.get('password');

      if (password?.length > 0) {
        passwordControl?.setValidators([
          Validators.minLength(8),
          uppercaseValidator(),
          lowercaseValidator(),
          numberValidator(),
          symbolValidator(),
        ]);
      } else {
        passwordControl?.clearValidators();
      }

      passwordControl?.updateValueAndValidity();
    });

    this.userService.buscarPorId(parseInt(id!)).subscribe((result) => {
      this.user = result.value.user;

      this.formulario.get('id')?.setValue(this.user.id);
      this.formulario.get('name')?.setValue(this.user.name);
      this.formulario.get('login')?.setValue(this.user.login);
      this.formulario.get('active')?.setValue(this.user.active);
    });
  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password?.length > 0 || confirmPassword?.length > 0) {
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

    return null;
  }


  salvar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      this.userService.editar(this.formulario.value).subscribe({
        next: () => {
          this.notificationService.success({
            title: 'Edição de Usuário',
            message: 'Sucesso ao editar o usuário',
          });

          this.cancelar();
        },
        error: (error) => {
          if (error.status === 400) {
            const causes = error.error?.error?.causes || [];
            causes.forEach((cause: any) => {
              if (cause.cause === 'login') {
                this.formulario
                  .get('login')
                  ?.setErrors({ backendError: cause.message });
              }
            });

            this.notificationService.error({
              title: 'Edição de Usuário',
              message: 'Erro ao editar o usuário',
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
