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

      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();

      this.gridService.refresh()
    });
  }

  incluir() {
    this.route.navigate(['orders/create']);
  }

  editar() {
    this.route.navigate([`orders/edit/${this.id}`]);
  }

  excluir() {
    this.orderService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Pedido',
          message: 'Sucesso ao excluir o pedido',
        });
        this.listAll();
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Pedido',
            message: 'Erro ao excluir o pedido',
          });
        }
      }
    });
  }

  confirmDelete(): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    const modalInstance = modalRef.componentInstance as ConfirmDeleteModalComponent;

    modalInstance.onConfirm.subscribe(() => {
      this.excluir();
    });

    modalInstance.onCancel.subscribe(() => {
    });
  }

  selectItem(id?: number) {
    this.id = id;
    this.selectionService.selectItem(id);
  }

}
