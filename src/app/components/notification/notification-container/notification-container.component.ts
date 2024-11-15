import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NotificationService } from '../../../service/notification/notification.service';
import { Notification } from '../../../service/notification/notification';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css'
})
export class NotificationContainerComponent implements OnInit {

  @Input() notifications: Notification[] = []

  @ViewChildren('notificationElement') notificationElements!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification)
    this.activeTimeoutToNotification(notification.id)
  }

  onClickNotification(id: number) {
    this.removeNotification(id)
  }

  private activeTimeoutToNotification(id: number) {
    const notificationElement = this.getElementNotification(id)

    if (!notificationElement)
      return

    let count = 10

    let timerCont = setInterval(() => {

    }, 10)
  }

  private removeNotification(id: number) {
    const notificationElement = this.getElementNotification(id);

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

  private getElementNotification(id: number) {
    return this.notificationElements.find(el => el.nativeElement.id === `notification-id-${id}`) || null
  }
}
