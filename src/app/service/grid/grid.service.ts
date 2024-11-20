import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { compare } from '../../util/sort'
import { SortEvent } from '../../directives/sortable.directive'

export type GridState<T = any> = {
  page: number
  pageSize: number
  total: number
  searchValue: any
  searchColumn: keyof T | string
  sortColumn: keyof T | string
  sortDirection: 'asc' | 'desc' | ''
}

@Injectable({
  providedIn: 'root',
})
export class GridService<T = any> {
  private _data: T[] = []
  private _rows$ = new BehaviorSubject<T[]>([])
  state: GridState<T> = {
    page: 1,
    pageSize: 10,
    total: 0,
    searchValue: '',
    searchColumn: '',
    sortColumn: '',
    sortDirection: '',
  }

  private _filterHandler?: (row: T, column: keyof T, value: any) => boolean = () => false
  private _orderHandler?: (rowA: T, rowB: T, column: keyof T) => 1 | 0 | -1 = (rowA, rowB, column) => compare(rowA[column] as any, rowB[column] as any)

  constructor() { }

  filter({ column, value }: { column: keyof T, value: any }) {
    this.state.searchColumn = column
    this.state.searchValue = value

    this.refresh()
  }

  sort({ column, direction }: SortEvent) {
    this.state.sortColumn = column
    this.state.sortDirection = direction

    this.refresh()
  }

  setData(data: T[]) {
    this._data = data
    this.state.total = this._data.length

    this.refresh()
  }

  setFilterHandler(handler: (row: T, column: keyof T, value: any) => boolean) {
    this._filterHandler = handler
  }

  setOrderHandler(handler: (rowA: T, rowB: T, column: keyof T) => 1 | 0 | -1) {
    this._orderHandler = handler
  }

  refresh() {
    const { sortColumn, searchColumn, sortDirection, pageSize, page, searchValue } = this.state

    const rows = this._data
      // 1. sort
      .sort((rowA: T, rowB: T) => {
        // @ts-expect-error
        const res = this._orderHandler(rowA, rowB, sortColumn)

        return sortDirection === 'asc' ? res : -res
      })
      // 2. filter
      .filter(row => !this._filterHandler || this._filterHandler(row, searchColumn as keyof T, searchValue))
      // 3. paginate
      .slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      )

    this._rows$.next(rows)
  }

  get rows$() {
    return this._rows$.asObservable()
  }
}
