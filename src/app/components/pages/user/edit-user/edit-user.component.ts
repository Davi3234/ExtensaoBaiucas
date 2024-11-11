import { User } from './../../../../service/user/user';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { UserService } from '../../../../service/user/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { lowercaseValidator, numberValidator, symbolValidator, uppercaseValidator } from '../../../../validators/password-validator';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

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
export class EditUserComponent implements OnInit{

  formulario!: FormGroup;
  user!: User;

  constructor (
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  )
  {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)
      ]],
      login: ['', [
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

    this.userService.buscarPorId(parseInt(id!)).subscribe((result) => {
      this.user = result.value.user;

      this.formulario.get('name')?.setValue(this.user.name);
      this.formulario.get('login')?.setValue(this.user.login);
    });

  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  salvar(){
    if(this.formulario.valid){
      this.userService.editar(this.formulario.value).subscribe({
        next: () => {
          this.cancelar();
        },
        error: (error) => {
          if (error.status === 400) {
            const causes = error.error?.error?.causes || [];
            causes.forEach((cause: any) => {
              if (cause.cause === 'login') {
                this.formulario.get('login')?.setErrors({ backendError: cause.message });
              }
            });
          }
        }
      });
    }
  }
  cancelar(){
    this.router.navigate(['/users']);
  }
}
