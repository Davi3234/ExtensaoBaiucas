import { IOrderService } from './../../interface/order.service.interface';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../service/order/order';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ofDefault } from '../utils';
import { CATEGORY_MOCK_STORAGE, PRODUCT_MOCK_STORAGE } from '../mocks.manager.injection';
import { OrderMockStorage } from '../storage/order.storage';
import { State } from '../../enums/state';
import { PaymentMethod } from '../../enums/payment-method';
import { TypeDelivery } from '../../enums/type-delivery';

@Injectable({
  providedIn: 'root'
})
export class OrderMockService implements IOrderService{

  constructor (
    @Inject(PRODUCT_MOCK_STORAGE) private readonly orderMockStorage: OrderMockStorage,
  ) { }

  listar(): Observable<Result<Order[]>> {
    return of({
      ...ofDefault,
      value: this.orderMockStorage.getOrders()
    });
  }

  criar(order: Order): Observable<Result<Order>> {

    this.orderMockStorage.save(order);

    return of({
      ...ofDefault,
      value: order
    });
  }

  editar(order: Order): Observable<Result<Order>> {

    this.orderMockStorage.edit(order);

    return of({
      ...ofDefault,
      value: order
    });
  }

  excluir(id: number): Observable<Result<Message[]>> {
    this.orderMockStorage.remove(id);

    return of({
      ...ofDefault,
      value: [{message: "Order excluída com sucessa"}]
    });
  }

  buscarPorId(id: number): Observable<Result<{order:Order}>> {
    let orderReturn = this.orderMockStorage.find(id);

    if(!orderReturn){
      return of({
        error: {
          message: 'Pedido não encontrado',
          causes: [
            {
              message: 'Pedido não encontrado',
              origin: [
                'pedido'
              ]
            }
          ]
        },
        ok: false,
        status: 404,
        value: {order:{
          id: 0,
          date: new Date(),
          client: undefined,
          totalPrice: 0,
          state: State.PREPARING,
          paymentMethod: PaymentMethod.CARD,
          observation: '',
          type: TypeDelivery.DELIVERY,
          address: '',
          deliveryTax: 0,
          items: []
        }}
      });
    }

    return of({
      ...ofDefault,
      value: {order: orderReturn}
    });
  }
}
