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

export const USER_SERVICE_TOKEN = new InjectionToken<IUserService>('IUserService');
export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('IAuthService');
export const CATEGORY_SERVICE_TOKEN = new InjectionToken<ICategoryService>('ICategoryService');
export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('IProductService');

export const servicesInjection = [
  { provide: USER_SERVICE_TOKEN, useClass: environment.production ? UserService : UserMockService },
  { provide: AUTH_SERVICE_TOKEN, useClass: environment.production ? AuthService : AuthMockService },
  { provide: CATEGORY_SERVICE_TOKEN, useClass: environment.production ? CategoryService : CategoryMockService },
  { provide: PRODUCT_SERVICE_TOKEN, useClass: environment.production ? ProductService : ProductMockService },

];
