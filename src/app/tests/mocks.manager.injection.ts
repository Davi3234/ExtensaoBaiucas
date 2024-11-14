import { InjectionToken } from '@angular/core';
import { IUserService } from '../interface/user.service.interface';
import { environment } from '../environments/environment'
import { UserMockStorage } from './storage/user.storage';

export const USER_MOCK_STORAGE = new InjectionToken<UserMockStorage>('UserMockStorage');

const mocksInjection: { provide: InjectionToken<IUserService>; useClass: any; }[] = [];

if(!environment.production){

  mocksInjection.push(
    { provide: USER_MOCK_STORAGE, useClass:UserMockStorage },
  );

}

export {mocksInjection};
