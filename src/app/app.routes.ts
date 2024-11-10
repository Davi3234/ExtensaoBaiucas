import { Routes } from '@angular/router';
import { CreateUserComponent } from './components/pages/user/create-user/create-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { ListUserComponent } from './components/pages/user/list-user/list-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: ListUserComponent
  },
  {
    path: 'users/create',
    component: CreateUserComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
];
