import { IOrderService } from './../../../../interface/order.service.interface';
import { Produto } from './../../../../service/product/product';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ORDER_SERVICE_TOKEN } from '../../../../service/services.injection';
import { NgbAccordionModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../../../service/category/category';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../service/order/order';
import { FormsModule } from '@angular/forms';
import { getPaymentDescription } from '../../../../enums/payment-method';
import { getStateDescription } from '../../../../enums/state';
@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    MenuComponent,
    NgbAccordionModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent implements OnInit{
  list?: { categorias: { category: Categoria; orders: Produto[] }[] };
  id?: number;
  disableButtons: boolean = true;
  order?: Order;
  private readonly offcanvasService = inject(NgbOffcanvas)

  constructor(
    @Inject(ORDER_SERVICE_TOKEN)
    private readonly orderService: IOrderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    protected readonly selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.orderService.buscarPorId(this.id).subscribe((result) => {
      this.order = result.value.order;
    });
  }

  getTotal(): number | undefined {
    return this.order?.items?.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }

  getPayment(method?: string){
    return getPaymentDescription(method);
  }
  getState(method?: string){
    return getStateDescription(method);
  }
}
