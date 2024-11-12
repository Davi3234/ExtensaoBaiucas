import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css'
})
export class NotificationContainerComponent {

  @Input() notifications: {
    title?: string
    message: string
    type: 'ALERT' | 'SUCCESS' | 'INFO' | 'ERROR'
  }[] = []
}
