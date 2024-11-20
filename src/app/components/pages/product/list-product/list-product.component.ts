import { IProductService } from './../../../../interface/product.service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Produto } from '../../../../service/product/product';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import {
  CATEGORY_SERVICE_TOKEN,
  PRODUCT_SERVICE_TOKEN,
} from '../../../../service/services.injection';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { Categoria } from '../../../../service/category/category';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../../service/cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [MenuComponent, NgbAccordionModule, NgbAlertModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  list?: { categorias: { category: Categoria; products: Produto[] }[] };
  id?: number;
  disableButtons: boolean = true;

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: IProductService,
    @Inject(CATEGORY_SERVICE_TOKEN)
    private readonly categoryService: ICategoryService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.categoryService.listarCategoriaProduto().subscribe((request) => {
      this.list = request.value;
    });
  }

  incluir() {
    this.route.navigate(['products/create']);
  }

  addCarrinho() {
    let produto: Produto;
    this.productService.buscarPorId(this.id || 0).subscribe((el) => {
      produto = el.value.product;
      this.cartService.addItem({
        product: produto,
        price: produto.value,
        observation: '',
      });
    });
  }

  editar() {
    this.route.navigate([`products/edit/${this.id}`]);
  }

  excluir() {
    this.productService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Produto',
          message: 'Sucesso ao excluir o produto',
        });
        this.listAll();
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Produto',
            message: 'Erro ao excluir o produto',
          });
        }
      },
    });
  }

  confirmDelete(): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    const modalInstance =
      modalRef.componentInstance as ConfirmDeleteModalComponent;

    modalInstance.onConfirm.subscribe(() => {
      this.excluir();
    });

    modalInstance.onCancel.subscribe(() => {});
  }

  selectAlert(id?: number) {
    this.id = id;
    this.selectionService.selectAlert(id);
    this.disableButtons = false;
  }

  resetButtonState() {
    this.disableButtons = true;
  }
}
