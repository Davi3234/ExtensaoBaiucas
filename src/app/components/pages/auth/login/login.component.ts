import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  @Input() login = "";
  @Input() password = "";

  formulario!: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // private authService: AuthService
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: ['', Validators.compose([
        Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  logar(){
    console.log('OIIIII');
    this.router.navigate(['/users/create']);
  }
}
