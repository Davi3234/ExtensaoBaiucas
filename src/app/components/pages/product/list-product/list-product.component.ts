import { IProductService } from './../../../../interface/product.service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Product } from '../../../../service/product/product';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { PRODUCT_SERVICE_TOKEN } from '../../../../service/services.injection';
import { HttpStatusCode } from '@angular/common/http';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  products?: Product[]
  id?: number

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private readonly productService: IProductService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.productService.listar().subscribe(request => {
      this.products = request.value;
      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();
    });
  }

  incluir(){
    this.route.navigate(['products/create']);
  }

  editar(){
    this.route.navigate([`products/edit/${this.id}`]);
  }

  excluir(){
    this.productService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Produto',
          message: 'Sucesso ao excluir o produto',
        });
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Produto',
            message: 'Erro ao excluir o produto',
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
