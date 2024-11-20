import { IOrderService } from './../../../../interface/order.service.interface';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Order } from '../../../../service/order/order';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { ORDER_SERVICE_TOKEN } from '../../../../service/services.injection';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GridService } from '../../../../service/grid/grid.service';
import { NgbdSortableHeader } from '../../../../directives/sortable.directive';
import { compare } from '../../../../util/sort';
import { DescriptionPayment } from '../../../../enums/payment-method';
import { DescriptionState } from '../../../../enums/state';
@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [MenuComponent, DatePipe, NgbdSortableHeader, AsyncPipe, ReactiveFormsModule, NgbPaginationModule],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit {
  orders$ = new BehaviorSubject<Order[]>([])
  id?: number

  constructor(
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: IOrderService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
    protected readonly gridService: GridService<Order>
  ) {
    this.gridService.setFilterHandler((order, column, value) => {
      return `${value}` === '' || `${order[column]}`.toLowerCase().includes(`${value}`.toLowerCase())
    })

    this.gridService.setOrderHandler((orderA, orderB, column) => {
      if (!orderA || !orderB)
        return 0

      if (column == 'client') {
        return compare(orderA?.client?.name || '', orderB?.client?.name || '')
      }

      return compare(orderA[column] as any || '', orderB[column] as any || '')
    })

    this.gridService.rows$.subscribe(orders => {
      this.orders$.next(orders)
    })
  }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.orderService.listar().subscribe(request => {
      this.gridService.setData(request.value)

      this.selectionService.enableButton('btnVisualizar', false);
      this.selectionService.removeSelectedItems();

      this.gridService.refresh()
    });
  }

  visualizar() {
    this.route.navigate([`orders/view/${this.id}`]);
  }

  getPaymentDescription(method?: string): string {
    return DescriptionPayment[method as keyof typeof DescriptionPayment] || 'Desconhecido';
  }

  getStateDescription(method?: string){
    return DescriptionState[method as keyof typeof DescriptionState] || 'Desconhecido';
  }

  selectItem(id?: number) {
    this.id = id;
    this.selectionService.selectItem(id);
  }

}
