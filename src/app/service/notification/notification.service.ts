import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  success({ title, message }: Omit<Notification, 'id' | 'type'>) {
    this.createNotification({ title, message, type: 'SUCCESS' })
  }

  error({ title, message }: Omit<Notification, 'id' | 'type'>) {
    this.createNotification({ title, message, type: 'ERROR' })
  }

  warning({ title, message }: Omit<Notification, 'id' | 'type'>) {
    this.createNotification({ title, message, type: 'WARNING' })
  }

  info({ title, message }: Omit<Notification, 'id' | 'type'>) {
    this.createNotification({ title, message, type: 'INFO' })
  }

  private createNotification({ title, message, type }: Omit<Notification, 'id'>): void {
    this.notifications.push({
      id: Date.now(),
      title,
      message,
      type
    });

    this.notificationsSubject.next([...this.notifications]);
  }
}
