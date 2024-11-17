import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NotificationService } from '../../../service/notification/notification.service';
import { Notification } from '../../../service/notification/notification';
import { NotificationComponent } from "../notification/notification/notification.component";

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css'
})
export class NotificationContainerComponent implements OnInit {

  @Input() notifications: Notification[] = []

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notifications => {
      if (!notifications.length)
        return

      this.notifications.push(notifications[notifications.length - 1]);
    });
  }

  removeNotification(id: number) {
    const index = this.notifications.findIndex(({ id: notificationId }) => notificationId == id)

    this.notifications.splice(index, 1)
  }
}
