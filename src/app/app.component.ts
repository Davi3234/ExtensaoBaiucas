import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationContainerComponent } from './components/notification/notification-container/notification-container.component';
import { CartComponent } from './components/cart/cart.component';
import { WindowCartComponent } from './components/cart/window-cart/window-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NotificationContainerComponent,
    CartComponent,
    WindowCartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'extensao-baiucas';
}
