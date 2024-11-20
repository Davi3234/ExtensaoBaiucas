import { Component, Inject, Input, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core'
import { MenuComponent } from '../../core/menu/menu.component'
import { Usuario } from '../../../../service/user/user'
import { Router } from '@angular/router'
import { IUserService } from '../../../../interface/user.service.interface'
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection'
import { SelectionService } from '../../../../service/selection/selection.service'
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import { ConfirmDeleteModalComponent } from '../../../confirm-delete-modal/confirm-delete-modal.component'
import { Result } from '../../../../@types/http'
import { NotificationService } from '../../../../service/notification/notification.service'
import { NgbdSortableHeader, SortEvent } from '../../../../directives/sortable.directive'
import { compare } from '../../../../util/sort'
import { BehaviorSubject, map, Observable, startWith } from 'rxjs'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, DecimalPipe } from '@angular/common'

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
  private _users: Usuario[] = []
  users$ = new BehaviorSubject<Usuario[]>([])
  id?: number

  @Input() filter = new FormControl('', { nonNullable: true })

  page = 1
  pageSize = 10
  collectionSize = 0

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService,
    private readonly modalService: NgbModal,
    private readonly notificationService: NotificationService
  ) {
    this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text)),
    )
      .subscribe(result => {
        this.users$.next(result)
      })
  }

  ngOnInit(): void {
    this.listAll()
  }

  listAll() {
    this.userService.listar().subscribe((request) => {
      this._users = request.value
      this.selectionService.enableButton('btnExcluir', false)
      this.selectionService.enableButton('btnEditar', false)
      this.selectionService.removeSelectedItems()
      this.filter.setValue('_')
      this.filter.setValue('')
      this.collectionSize = this._users.length
      this.refreshPage()
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

  search(text: string): Usuario[] {
    const users = this._users.filter((user) => {
      return text === '' || user.name.toLowerCase().includes(text.toLowerCase())
    })

    return users
  }

  onSort({ column, direction }: SortEvent) {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = ''
      }
    }

    if (direction !== '' && column !== '') {
      this._users = [...this._users].sort((a: any, b: any) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }

  refreshPage() {
    const users = this._users.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );

    this.users$.next(users)
  }
}
