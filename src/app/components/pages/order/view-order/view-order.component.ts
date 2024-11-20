import { IOrderService } from './../../../../interface/order.service.interface';
import { Produto } from './../../../../service/product/product';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import {
  ORDER_SERVICE_TOKEN,
} from '../../../../service/services.injection';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../../../service/category/category';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../service/order/order';
@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [MenuComponent, NgbAccordionModule, NgbAlertModule, CommonModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent implements OnInit {
  list?: { categorias: { category: Categoria; orders: Produto[] }[] };
  id?: number;
  disableButtons: boolean = true;
  order?: Order

  constructor(
    @Inject(ORDER_SERVICE_TOKEN)
    private readonly orderService: IOrderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    protected readonly selectionService: SelectionService,
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.orderService.buscarPorId(this.id).subscribe((result) => {
      this.order = result.value.order;
      debugger;
    });
  }

  getTotal(): number{
    return 0;
  }
}
