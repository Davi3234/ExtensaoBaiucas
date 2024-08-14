import { Component } from '@angular/core';
import { InputTextComponent } from '@components/input-text/input-text.component';
import { InputNumericComponent } from '@components/input-numeric/input-numeric.component';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [InputTextComponent, InputNumericComponent],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {

}
