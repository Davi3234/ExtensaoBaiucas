import { InjectionToken } from '@angular/core';
import { IUserService } from '../interface/user.service.interface';
import { environment } from '../environments/environment';
import { UserService } from './user/user.service';
import { UserMockService } from '../tests/mocks/user.mock';
import { IAuthService } from '../interface/auth.service.interface';
import { AuthService } from './auth/auth.service';
import { AuthMockService } from '../tests/mocks/auth.mock';
import { ICategoryService } from '../interface/category.service.interface';
import { CategoryService } from './category/category.service';
import { CategoryMockService } from '../tests/mocks/category.mock';
import { IProductService } from '../interface/product.service.interface';
import { ProductService } from './product/product.service';
import { ProductMockService } from '../tests/mocks/product.mock';
import { IOrderService } from '../interface/order.service.interface';
import { OrderService } from './order/order.service';
import { OrderMockService } from '../tests/mocks/order.mock';

export const USER_SERVICE_TOKEN = new InjectionToken<IUserService>('IUserService');
export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('IAuthService');
export const CATEGORY_SERVICE_TOKEN = new InjectionToken<ICategoryService>('ICategoryService');
export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('IProductService');
export const ORDER_SERVICE_TOKEN = new InjectionToken<IOrderService>('IOrderService');

export const servicesInjection = [
  { provide: USER_SERVICE_TOKEN, useClass: environment.production ? UserMockService : UserService },
  { provide: AUTH_SERVICE_TOKEN, useClass: environment.production ? AuthMockService : AuthService },
  { provide: CATEGORY_SERVICE_TOKEN, useClass: environment.production ? CategoryService : CategoryMockService },
  { provide: PRODUCT_SERVICE_TOKEN, useClass: environment.production ? ProductService : ProductMockService },
  { provide: ORDER_SERVICE_TOKEN, useClass: environment.production ? OrderService : OrderMockService },

];
