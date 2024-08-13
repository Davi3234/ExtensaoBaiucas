import { Component } from '@angular/core';
import { InputTextComponent } from "@components/input-text/input-text.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
