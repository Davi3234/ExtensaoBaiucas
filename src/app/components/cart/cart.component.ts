import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Item } from '../../service/order/item';
import { Produto } from '../../service/product/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true
})
export class CartComponent implements OnInit {

  cartItems: Item[] = [];

  constructor(private cartService: CartService) {}

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
}
