import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Notification } from '../../../../service/notification/notification';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  @Input() notification!: Notification
  @Output() remove = new EventEmitter<number>()

  @ViewChildren('notificationElement') notificationElements!: QueryList<ElementRef<HTMLDivElement>>;

  progress: number = 0
  private intervalId: any;

  ngOnInit(): void {
    this.activeRemoveCounter()
  }

  onClick() {
    this.deleteNotification()
  }

  private activeRemoveCounter() {
    this.intervalId = setInterval(() => {
      if (this.progress >= 1)
        return this.deleteNotification();

      this.progress += 0.002;
    }, 10);
  }

  private deleteNotification() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const notificationElement = this.getCurrentElement()

    notificationElement?.nativeElement.classList.add('hidden')

    setTimeout(() => {
      this.remove.emit(this.notification.id);
    }, 300)
  }

  private getCurrentElement() {
    return this.notificationElements.find(el => el.nativeElement.id === `notification-id-${this.notification.id}`) || null
  }
}
