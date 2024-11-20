import { ICategoryService } from './../../interface/category.service.interface';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../../service/category/category';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ofDefault } from '../utils';
import { CATEGORY_MOCK_STORAGE } from '../mocks.manager.injection';
import { CategoryMockStorage } from '../storage/category.storage';
import { Produto } from '../../service/product/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryMockService implements ICategoryService {

  constructor(
    @Inject(CATEGORY_MOCK_STORAGE) private readonly categoryMockStorage: CategoryMockStorage
  ) { }

  listar(): Observable<Result<Categoria[]>> {
    return of({
      ...ofDefault,
      value: this.categoryMockStorage.getCategories()
    });
  }

  listarCategoriaProduto(): Observable<Result<{categorias: {category:Categoria, products: Produto[]}[]}>> {
    return of({
      ...ofDefault,
      value: this.categoryMockStorage.getCategoriesProducts()
    });
  }

  criar(category: Categoria): Observable<Result<Categoria>> {

    this.categoryMockStorage.save(category);

    return of({
      ...ofDefault,
      value: category
    });
  }

  editar(category: Categoria): Observable<Result<Categoria>> {
    this.categoryMockStorage.edit(category);

    return of({
      ...ofDefault,
      value: category
    });
  }

  excluir(id: number): Observable<Result<Message[]>> {
    this.categoryMockStorage.remove(id);

    return of({
      ...ofDefault,
      value: [{ message: "Categoria excluída com sucessa" }]
    });
  }

  buscarPorId(id: number): Observable<Result<{ category: Categoria }>> {
    let categoryReturn = this.categoryMockStorage.find(id);

    if (!categoryReturn) {
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
        value: { category: { id: 0, name: '', login: '', active: false } }
      });
    }

    return of({
      ...ofDefault,
      value: { category: categoryReturn }
    });
  }
}
