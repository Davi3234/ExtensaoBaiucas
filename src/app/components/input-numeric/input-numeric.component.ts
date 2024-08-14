import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-numeric',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './input-numeric.component.html',
  styleUrl: './input-numeric.component.css'
})
export class InputNumericComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
}
