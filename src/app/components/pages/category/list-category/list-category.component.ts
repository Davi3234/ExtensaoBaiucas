import { Component, Inject, Input, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Categoria } from '../../../../service/category/category';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { CATEGORY_SERVICE_TOKEN } from '../../../../service/services.injection';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { GridService } from '../../../../service/grid/grid.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NgbdSortableHeader } from '../../../../directives/sortable.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [MenuComponent, NgbdSortableHeader, AsyncPipe, ReactiveFormsModule, NgbPaginationModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  categories$ = new BehaviorSubject<Categoria[]>([])

  categories?: Categoria[]
  id?: number

  @Input() filter = new FormControl('', { nonNullable: true })

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
    protected readonly gridService: GridService<Categoria>
  ) {
    this.filter.valueChanges.subscribe(value => {
      this.gridService.filter({ column: 'name', value })
    })

    this.gridService.setFilterHandler((user, column, value) => {
      return `${value}` === '' || `${user[column]}`.toLowerCase().includes(`${value}`.toLowerCase())
    })

    this.gridService.rows$.subscribe(users => {
      this.categories$.next(users)
    })
  }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.categoryService.listar().subscribe(request => {
      this.gridService.setData(request.value)

      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();

      this.gridService.refresh()
    });
  }

  incluir() {
    this.route.navigate(['categories/create']);
  }

  editar() {
    this.route.navigate([`categories/edit/${this.id}`]);
  }

  excluir() {
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

  selectItem(id?: number) {
    this.id = id;
    this.selectionService.selectItem(id);
  }

}
