import { Component } from '@angular/core';
import { InputTextComponent } from "@app/components/ui/input-text/input-text.component";
import { InputNumericComponent } from "@app/components/ui/input-numeric/input-numeric.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextComponent, InputNumericComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
