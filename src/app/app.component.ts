import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationContainerComponent } from './components/notification/notification-container/notification-container.component';
import { NotificationService } from './service/notification/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'extensao-baiucas';

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.success({ title: 'Teste', message: 'Teste' })
  }
}
