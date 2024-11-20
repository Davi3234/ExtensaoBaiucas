import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Item } from '../../service/order/item';
import { Produto } from '../../service/product/product';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { WindowCartComponent } from './window-cart/window-cart.component';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [WindowCartComponent]
})
export class CartComponent implements OnInit {

  cartItems: Item[] = [];
  private readonly offcanvasService = inject(NgbOffcanvas);

  constructor(
    private cartService: CartService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  addItemToCart(product: Produto, price: number, observation: string) {
    const item: Item = {
      product,
      price,
      observation
    };
    this.cartService.addItem(item);
  }

  removeItemFromCart(productId: number) {
    this.cartService.removeItem(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  openCartWindow(content: any) {
    if(this.cartItems.length > 0){
      this.offcanvasService.open(content, { position: 'end' });
      return;
    }
    this.notificationService.warning({
      title: 'Carrinho',
      message: 'Não há nenhum item no carrinho.'
    });
  }
}
