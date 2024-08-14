import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
}
