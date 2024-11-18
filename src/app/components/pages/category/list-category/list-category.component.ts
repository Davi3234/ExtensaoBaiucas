import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Category } from '../../../../service/category/category';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { CATEGORY_SERVICE_TOKEN } from '../../../../service/services.injection';
import { HttpStatusCode } from '@angular/common/http';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit{

  categories?: Category[]
  id?: number

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.categoryService.listar().subscribe(request => {
      this.categories = request.value;
      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();
    });
  }

  incluir(){
    this.route.navigate(['categories/create']);
  }

  editar(){
    this.route.navigate([`categories/edit/${this.id}`]);
  }

  excluir(){
    this.categoryService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Categoria',
          message: 'Sucesso ao excluir a categoria',
        });
        this.listAll();
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Categoria',
            message: 'Erro ao excluir a categoria',
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
