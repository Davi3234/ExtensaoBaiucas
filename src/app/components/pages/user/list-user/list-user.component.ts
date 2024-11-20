import { Component, Inject, Input, OnInit } from '@angular/core'
import { MenuComponent } from '../../core/menu/menu.component'
import { Usuario } from '../../../../service/user/user'
import { Router } from '@angular/router'
import { IUserService } from '../../../../interface/user.service.interface'
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection'
import { SelectionService } from '../../../../service/selection/selection.service'
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component'
import { Result } from '../../../../@types/http'
import { NotificationService } from '../../../../service/notification/notification.service'
import { NgbdSortableHeader } from '../../../../directives/sortable.directive'
import { BehaviorSubject } from 'rxjs'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe } from '@angular/common'
import { GridService } from '../../../../service/grid/grid.service'

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MenuComponent, NgbdSortableHeader, AsyncPipe, ReactiveFormsModule, NgbPaginationModule
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit {
  users$ = new BehaviorSubject<Usuario[]>([])
  id?: number

  @Input() filter = new FormControl('', { nonNullable: true })

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService,
    protected readonly gridService: GridService<Usuario>
  ) {
    this.filter.valueChanges.subscribe(value => {
      this.gridService.filter({ column: 'name', value })
    })

    this.gridService.setFilterHandler((user, column, value) => {
      return `${value}` === '' || `${user[column]}`.toLowerCase().includes(`${value}`.toLowerCase())
    })

    this.gridService.rows$.subscribe(users => {
      this.users$.next(users)
    })
  }

  ngOnInit(): void {
    this.listAll()
  }

  listAll() {
    this.userService.listar().subscribe((request) => {
      this.gridService.setData(request.value)

      this.selectionService.enableButton('btnExcluir', false)
      this.selectionService.enableButton('btnEditar', false)
      this.selectionService.removeSelectedItems()

      this.gridService.refresh()
    })
  }

  incluir() {
    this.route.navigate(['users/create'])
  }

  editar() {
    this.route.navigate([`users/edit/${this.id}`])
  }

  excluir() {
    this.userService.excluir(this.id!).subscribe({
      next: () => {
        this.notificationService.success({
          title: 'Exclusão de Usuário',
          message: 'Sucesso ao excluir o usuário',
        })
        this.listAll()
      },
      error: ({ error }: { error: Result }) => {
        if (error.status === 400) {
          this.notificationService.error({
            title: 'Exclusão de Usuário',
            message: 'Erro ao excluir o usuário',
          })
        }
      }
    })
  }

  confirmDelete(): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent)
    const modalInstance = modalRef.componentInstance as ConfirmDeleteModalComponent

    modalInstance.onConfirm.subscribe(() => {
      this.excluir()
    })

    modalInstance.onCancel.subscribe(() => {
    })
  }

  selectItem(id?: number) {
    this.selectionService.selectItem(id)
    this.id = id
  }
}
