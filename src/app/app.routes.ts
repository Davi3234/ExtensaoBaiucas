import { Routes } from '@angular/router';
import { ListUserComponent } from './components/pages/user/list-user/list-user.component';
import { CreateUserComponent } from './components/pages/user/create-user/create-user.component';
import { EditUserComponent } from './components/pages/user/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
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
    path: 'users/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
];
