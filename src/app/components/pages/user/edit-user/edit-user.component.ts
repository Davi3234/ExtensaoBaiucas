import { User } from './../../../../service/user/user';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { UserService } from '../../../../service/user/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { lowercaseValidator, numberValidator, symbolValidator, uppercaseValidator } from '../../../../validators/password-validator';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from '../../../../@types/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  formulario!: FormGroup;
  user!: User;

  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  )
  {
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.buscarPorId(parseInt(id!)).subscribe((result) => {
      this.user = result.value;

      this.formulario = this.formBuilder.group({
        name: [this.user.name, [
          Validators.required,
          Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)
        ]],
        login: [this.user.login, [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          uppercaseValidator(),
          lowercaseValidator(),
          numberValidator(),
          symbolValidator()
        ]],
        confirmPassword: ['']
      }, { validators: this.passwordMatchValidator });
    });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  salvar() {
    if (this.formulario.valid) {
      this.userService.editar(this.formulario.value).subscribe({
        next: () => {
          this.cancelar();
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              if (origin.includes('login'))
                this.formulario.get('login')?.setErrors({ backendError: message });
            });
          }
        }
      });
    }
  }
  cancelar() {
    this.router.navigate(['/users']);
  }
}
