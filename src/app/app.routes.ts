import { Routes } from '@angular/router';
import { ListUserComponent } from './components/pages/user/list-user/list-user.component';
import { CreateUserComponent } from './components/pages/user/create-user/create-user.component';
import { EditUserComponent } from './components/pages/user/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthGuardService } from './service/auth/can-active';
import { ListProductComponent } from './components/pages/product/list-product/list-product.component';
import { CreateProductComponent } from './components/pages/product/create-product/create-product.component';
import { EditProductComponent } from './components/pages/product/edit-product/edit-product.component';
import { ListCategoryComponent } from './components/pages/category/list-category/list-category.component';
import { CreateCategoryComponent } from './components/pages/category/create-category/create-category.component';
import { EditCategoryComponent } from './components/pages/category/edit-category/edit-category.component';
import { ListOrderComponent } from './components/pages/order/list-order/list-order.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: ListUserComponent,
    canActivate: [AuthGuardService],
    title: 'Usuário',
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
    component: ListProductComponent,
    canActivate: [AuthGuardService],
    title: "Produtos"
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories',
    component: ListCategoryComponent,
    canActivate: [AuthGuardService],
    title: "Categoria"
  },
  {
    path: 'categories/create',
    component: CreateCategoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories/edit/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'orders',
    component: ListOrderComponent,
    canActivate: [AuthGuardService],
    title: "Pedido"
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
