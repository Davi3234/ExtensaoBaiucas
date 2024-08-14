import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@components/menu/menu.component';
import { LoginComponent } from '@components/auth/login/login.component';
import { HomeComponent } from '@pages/home/home.component';
import { ComponentsComponent } from '@pages/components/components.component';
import { DinamicFormComponent } from './components/dinamic-form/dinamic-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'components',
    component: ComponentsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'form',
    component: DinamicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
