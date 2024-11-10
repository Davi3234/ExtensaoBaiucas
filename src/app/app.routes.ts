import { Routes } from '@angular/router';
import { ListUserComponent } from './components/pages/user/list-user/list-user.component';
import { CreateUserComponent } from './components/pages/user/create-user/create-user.component';
import { EditUserComponent } from './components/pages/user/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthGuardService } from './service/auth/can-active';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: ListUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/create',
    component: CreateUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  }
];
