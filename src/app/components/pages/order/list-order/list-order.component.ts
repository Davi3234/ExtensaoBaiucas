import { IOrderService } from './../../../../interface/order.service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Order } from '../../../../service/order/order';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { ORDER_SERVICE_TOKEN } from '../../../../service/services.injection';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit{

  orders?: Order[]
  id?: number

  constructor(
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: IOrderService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.orderService.listar().subscribe(request => {
      this.orders = request.value;
      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();
    });
  }

  incluir(){
    this.route.navigate(['orders/create']);
  }

  editar(){
    this.route.navigate([`orders/edit/${this.id}`]);
  }

  excluir(){
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

  selectItem(id?: number){
    this.id = id;
    this.selectionService.selectItem(id);
  }

}
