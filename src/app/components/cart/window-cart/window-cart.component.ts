import { Component, inject, Input, TemplateRef } from '@angular/core';
import { Item } from '../../../service/order/item';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinalizaPedidoComponent } from '../finaliza-pedido/finaliza-pedido.component';

@Component({
  selector: 'app-window-cart',
  standalone: true,
  imports: [
    NgbAccordionModule,
    FormsModule,
    CommonModule,
    FinalizaPedidoComponent
  ],
  templateUrl: './window-cart.component.html',
  styleUrl: './window-cart.component.css',
})
export class WindowCartComponent {
  private readonly modalService = inject(NgbModal);

  @Input() cartItems: Item[] = [];

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.value;
    }, 0);
  }

  openFinishWindow(content: TemplateRef<any>){
    this.modalService.open(content, { ariaLabelledBy: 'finaliza-pedido' });
  }
}
