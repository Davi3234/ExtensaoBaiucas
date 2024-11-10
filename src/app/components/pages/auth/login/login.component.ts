import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.router.navigate([''])

    // this.authService.login({ login: 'dan@gmail.com', password: 'Dan!@#123' }).subscribe(response => {
    //   console.log(response)
    // })
  }
}
