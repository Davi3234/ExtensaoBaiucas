import { InjectionToken } from '@angular/core';
import { IUserService } from '../interface/user.service.interface';
import { environment } from '../environments/environment';
import { UserService } from './user/user.service';
import { UserMockService } from '../tests/mocks/user.mock';
import { IAuthService } from '../interface/auth.service.interface';
import { AuthService } from './auth/auth.service';
import { AuthMockService } from '../tests/mocks/auth.mock';

export const USER_SERVICE_TOKEN = new InjectionToken<IUserService>('IUserService');
export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('IAuthService');

export const servicesInjection = [
  { provide: USER_SERVICE_TOKEN, useClass: environment.production ? UserService : UserMockService },
  { provide: AUTH_SERVICE_TOKEN, useClass: environment.production ? AuthService : AuthMockService },

];
