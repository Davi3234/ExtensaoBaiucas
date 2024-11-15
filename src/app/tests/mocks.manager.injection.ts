import { InjectionToken } from '@angular/core';
import { IUserService } from '../interface/user.service.interface';
import { environment } from '../environments/environment'
import { UserMockStorage } from './storage/user.storage';
import { CategoryMockStorage } from './storage/category.storage';

export const USER_MOCK_STORAGE = new InjectionToken<UserMockStorage>('UserMockStorage');
export const CATEGORY_MOCK_STORAGE = new InjectionToken<CategoryMockStorage>('CategoryMockStorage');

const mocksInjection: { provide: InjectionToken<IUserService>; useClass: any; }[] = [];

if(!environment.production){

  mocksInjection.push(
    { provide: USER_MOCK_STORAGE, useClass:UserMockStorage },
    { provide: CATEGORY_MOCK_STORAGE, useClass:CategoryMockStorage },
  );

}

export {mocksInjection};
