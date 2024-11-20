import { IProductService } from './../../interface/product.service.interface';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../../service/product/product';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ofDefault } from '../utils';
import { CATEGORY_MOCK_STORAGE, PRODUCT_MOCK_STORAGE } from '../mocks.manager.injection';
import { ProductMockStorage } from '../storage/product.storage';
import { CategoryMockStorage } from '../storage/category.storage';

@Injectable({
  providedIn: 'root'
})
export class ProductMockService implements IProductService{

  constructor (
    @Inject(PRODUCT_MOCK_STORAGE) private readonly productMockStorage: ProductMockStorage,
    @Inject(CATEGORY_MOCK_STORAGE) private readonly categoryMockStorage: CategoryMockStorage
  ) { }

  listar(): Observable<Result<Produto[]>> {
    return of({
      ...ofDefault,
      value: this.productMockStorage.getProducts()
    });
  }

  criar(product: Produto): Observable<Result<Produto>> {

    product.category = this.categoryMockStorage.find(product.category?.id);

    this.productMockStorage.save(product);

    return of({
      ...ofDefault,
      value: product
    });
  }

  editar(product: Produto): Observable<Result<Produto>> {

    product.category = this.categoryMockStorage.find(product.category?.id);

    this.productMockStorage.edit(product);

    return of({
      ...ofDefault,
      value: product
    });
  }

  excluir(id: number): Observable<Result<Message[]>> {
    this.productMockStorage.remove(id);

    return of({
      ...ofDefault,
      value: [{message: "Produto excluída com sucessa"}]
    });
  }

  buscarPorId(id: number): Observable<Result<{product:Produto}>> {
    let productReturn = this.productMockStorage.find(id);

    if(!productReturn){
      return of({
        error: {
          message: 'Produto não encontrado',
          causes: [
            {
              message: 'Produto não encontrado',
              origin: [
                'login'
              ]
            }
          ]
        },
        ok: false,
        status: 404,
        value: {product:{
          id: 0,
          name: '',
          description: '',
          value: 0,
          category: {id:0, name: ''},
          ativo: false,
          data_inclusao: new Date()
        }}
      });
    }

    return of({
      ...ofDefault,
      value: {product: productReturn}
    });
  }
}
