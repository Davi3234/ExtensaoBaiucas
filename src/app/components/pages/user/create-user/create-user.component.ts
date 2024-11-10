import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { UserService } from '../../../../service/user/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { lowercaseValidator, numberValidator, symbolValidator, uppercaseValidator } from '../../../../validators/password-validator';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  formulario!: FormGroup;

  constructor (
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  )
  {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)
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
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  salvar(){
    if(this.formulario.valid){
      this.userService.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }
  cancelar(){
    // Implementação do método cancelar
  }
}
