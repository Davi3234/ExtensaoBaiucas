import { PaymentMethod } from '../../enums/payment-method';
import { State } from '../../enums/state';
import { TypeDelivery } from '../../enums/type-delivery';
import { User } from '../user/user';
import { Item } from './item';

export interface Order {
  id?: number,
  date: Date,
  client?: User,
  totalPrice: number
  state: State
  paymentMethod: PaymentMethod
  observation: string,
  type: TypeDelivery
  address: string,
  deliveryTax: number,
  items?: Item[]
}
