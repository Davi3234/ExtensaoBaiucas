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
    id: number
    title?: string
    message: string
    type: 'WARNING' | 'SUCCESS' | 'INFO' | 'ERROR'
  }[] = []

  onClickNotification(id: number) {
    const index = this.notifications.findIndex(({ id: notificationId }) => notificationId == id)

    if (index < 0)
      return

    this.notifications.splice(index, 1)
  }
}
