import { Routes } from '@angular/router';
import { ListUserComponent } from './components/pages/user/list-user/list-user.component';
import { CreateUserComponent } from './components/pages/user/create-user/create-user.component';
import { EditUserComponent } from './components/pages/user/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthGuardService } from './service/auth/can-active';
import { ListProdutoComponent } from './components/page/produto/list-produto/list-produto.component';
import { CreateProdutoComponent } from './components/page/produto/create-produto/create-produto.component';
import { EditProdutoComponent } from './components/page/produto/edit-produto/edit-produto.component';
import { ListCategoriaComponent } from './components/page/categoria/list-categoria/list-categoria.component';
import { CreateCategoriaComponent } from './components/page/categoria/create-categoria/create-categoria.component';
import { EditCategoriaComponent } from './components/page/categoria/edit-categoria/edit-categoria.component';

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
    path: 'products',
    component: ListProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/create',
    component: CreateProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/edit/:id',
    component: EditProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category',
    component: ListCategoriaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category/create',
    component: CreateCategoriaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category/edit/:id',
    component: EditCategoriaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  }
];
