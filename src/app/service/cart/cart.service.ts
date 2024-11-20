import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../order/item';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor (
    private readonly notificationService: NotificationService
  ) { }

  private cartItems = new BehaviorSubject<Item[]>([]);

  getItems() {
    return this.cartItems.asObservable();
  }

  addItem(item: Item) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.product.id === item.product.id);

    if (existingItem) {

      existingItem.price = item.price;
      existingItem.observation = item.observation;
    } else {
      currentItems.push(item);
    }

    this.cartItems.next([...currentItems]);

    this.notificationService.success({
      title: "Carrinho",
      message: "Item adicionado ao carrinho com sucesso."
    });
  }

  removeItem(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.product?.id !== productId);
    this.cartItems.next([...currentItems]);

    this.notificationService.success({
      title: "Carrinho",
      message: "Item removido do carrinho com sucesso."
    });
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
