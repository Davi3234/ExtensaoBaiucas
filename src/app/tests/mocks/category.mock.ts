import { ICategoryService } from './../../interface/category.service.interface';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../service/category/category';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ofPadrao } from '../utils';
import { CATEGORY_MOCK_STORAGE } from '../mocks.manager.injection';
import { CategoryMockStorage } from '../storage/category.storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryMockService implements ICategoryService{

  constructor (
    @Inject(CATEGORY_MOCK_STORAGE) private readonly categoryMockStorage: CategoryMockStorage
  ) { }

  listar(): Observable<Result<Category[]>> {
    return of({
      ...ofPadrao,
      value: this.categoryMockStorage.getCategories()
    });
  }

  criar(category: Category): Observable<Result<Category>> {

    this.categoryMockStorage.save(category);

    return of({
      ...ofPadrao,
      value: category
    });
  }

  editar(category: Category): Observable<Result<Category>> {
    this.categoryMockStorage.edit(category);

    return of({
      ...ofPadrao,
      value: category
    });
  }

  excluir(id: number): Observable<Result<Message[]>> {
    this.categoryMockStorage.remove(id);

    return of({
      ...ofPadrao,
      value: [{message: "Categoria excluída com sucessa"}]
    });
  }

  buscarPorId(id: number): Observable<Result<{category:Category}>> {
    let categoryReturn = this.categoryMockStorage.find(id);

    if(!categoryReturn){
      return of({
        error: {
          message: 'Categoria não encontrada',
          causes: [
            {
              message: 'Categoria não encontrada',
              origin: [
                'login'
              ]
            }
          ]
        },
        ok: false,
        status: 404,
        value: {category:{id: 0, name: '', login: '', active: false}}
      });
    }

    return of({
      ...ofPadrao,
      value: {category: categoryReturn}
    });
  }
}
