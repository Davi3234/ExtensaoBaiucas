import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';

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

  @ViewChildren('notificationElement') notificationElements!: QueryList<ElementRef<HTMLDivElement>>;

  onClickNotification(id: number) {
    const notificationElement = this.notificationElements.find(el => el.nativeElement.id === `notification-id-${id}`);

    if (notificationElement) {
      notificationElement.nativeElement.classList.add('hidden')
    }

    setTimeout(() => {
      const index = this.notifications.findIndex(({ id: notificationId }) => notificationId == id)

      if (index < 0)
        return

      this.notifications.splice(index, 1)
    }, 300)
  }
}
