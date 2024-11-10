import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../core/menu/menu.component';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.router.navigate([''])

    this.formulario = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  login() {
    if (this.formulario.valid) {
      this.authService.login(this.formulario.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.value.token)
          this.router.navigate([''])
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error?.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              if (origin.includes('login'))
                this.formulario.get('login')?.setErrors({ backendError: message });

              if (origin.includes('password'))
                this.formulario.get('password')?.setErrors({ backendError: message });
            });
          }
        }
      })
    }
  }
}
