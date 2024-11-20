import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Usuario } from '../../../../service/user/user';
import { Router } from '@angular/router';
import { IUserService } from '../../../../interface/user.service.interface';
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection';
import { SelectionService } from '../../../../service/selection/selection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component';
import { Result } from '../../../../@types/http';
import { NotificationService } from '../../../../service/notification/notification.service';
import { NgbdSortableHeader, SortEvent } from '../../../../directives/sortable.directive';
import { compare } from '../../../../util/sort';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MenuComponent, NgbdSortableHeader
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit {
  private _users: Usuario[] = []
  users: Usuario[] = []
  id?: number

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.userService.listar().subscribe((request) => {
      this._users = request.value;
      this.users = request.value;
      this.selectionService.enableButton('btnExcluir', false);
      this.selectionService.enableButton('btnEditar', false);
      this.selectionService.removeSelectedItems();
    });
  }

  incluir() {
    this.route.navigate(['users/create']);
  }

  editar() {
    this.route.navigate([`users/edit/${this.id}`]);
  }

  excluir() {
    this.userService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Usuário',
          message: 'Sucesso ao excluir o usuário',
        });
        this.listAll();
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Usuário',
            message: 'Erro ao excluir o usuário',
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
    this.selectionService.selectItem(id);
    this.id = id;
  }

  onSort({ column, direction }: SortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    if (direction === '' || column === '') {
      this.users = this._users;
    } else {
      this.users = [...this._users].sort((a: any, b: any) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
