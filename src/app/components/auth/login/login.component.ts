import { Component } from '@angular/core';
import { InputTextComponent } from '@app/components/input-text/input-text.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
