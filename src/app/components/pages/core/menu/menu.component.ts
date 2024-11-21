import { Component, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { routes } from '../../../../app.routes';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../../../cart/cart.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../service/notification/notification.service';
import { AuthService } from '../../../../service/auth/auth.service';
import { IUserService } from '../../../../interface/user.service.interface';
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CartComponent, NgbDropdownModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  routesWithTitle: Routes = [];

  options = [
    {
      id: 'edit.profile',
      text: 'Editar Perfil',
    },
    {
      id: 'logout',
      text: 'Logout',
    },
  ];

  private readonly OPTIONS_ACTION = {
    'edit.profile': () => this.editProfile(),
    'logout': () => this.logout(),
  }

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService
  ) {
    this.routesWithTitle = routes.filter(route => route.title);
  }

  selectOption({ id }: { id: string }) {
    const action = this.OPTIONS_ACTION[id as keyof typeof this.OPTIONS_ACTION]

    action && action()
  }

  private editProfile() {
    this.userService.buscarUsuarioLogado().subscribe({
      next: response => {
        this.router.navigate([`users/edit/${response.value.user.id}`])
      },
      error: ({ error }) => {
        this.notificationService.error({ message: error.error.message })
      }
    })
  }

  private logout() {
    this.authService.logout()
    this.router.navigate([`auth/login`])
  }
}
