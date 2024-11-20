import { PaymentMethod } from '../../enums/payment-method';
import { State } from '../../enums/state';
import { TypeDelivery } from '../../enums/type-delivery';
import { Usuario } from '../user/user';
import { Item } from './item';

export interface Order {
  id?: number,
  date: Date,
  client?: Usuario,
  totalPrice: number
  state: State
  paymentMethod: PaymentMethod
  observation: string,
  type: TypeDelivery
  address: string,
  deliveryTax: number,
  items?: Item[]
}
