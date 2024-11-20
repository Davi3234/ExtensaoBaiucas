import { Injectable, PipeTransform } from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { DecimalPipe } from '@angular/common'
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators'
import { SortColumn, SortDirection } from '../../directives/sortable.directive'

interface SearchResult {
  rows: any[]
  total: number
}

interface State {
  page: number
  pageSize: number
  searchTerm: string
  sortColumn: SortColumn
  sortDirection: SortDirection
}

@Injectable({
  providedIn: 'root',
})
export class SortColumnService {
  private _loading$ = new BehaviorSubject<boolean>(true)
  private _search$ = new Subject<void>()
  private _rows$ = new BehaviorSubject<SortColumn[]>([])
  private _total$ = new BehaviorSubject<number>(0)
  private _data: any[] = []
  private matchHandle: (row: any, term: string) => any = () => null
  private sortHandle: (rows: any[], column: string, direction: string) => any[] = () => []

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  }

  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._rows$.next(result.rows)
        this._total$.next(result.total)
      })

    this._search$.next()
  }

  get rows$() {
    return this._rows$.asObservable()
  }
  get total$() {
    return this._total$.asObservable()
  }
  get loading$() {
    return this._loading$.asObservable()
  }
  get page() {
    return this._state.page
  }
  get pageSize() {
    return this._state.pageSize
  }
  get searchTerm() {
    return this._state.searchTerm
  }

  set page(page: number) {
    this._set({ page })
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize })
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm })
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn })
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection })
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch)
    this._search$.next()
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state

    // 1. sort
    let rows = this.sortHandle(this._data, sortColumn, sortDirection)

    // 2. filter
    rows = rows.filter((row) => this.matchHandle(row, searchTerm))
    const total = rows.length

    // 3. paginate
    rows = rows.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)

    return of({ rows, total })
  }

  setDataSource(data: any[]) {
    this._data = data
  }

  setMatchHandle(matchHandle: (row: any, term: string) => any) {
    this.matchHandle = matchHandle
  }

  setSortHandle(sortHandle: ((rows: any[], column: string, direction: string) => any[])) {
    this.sortHandle = sortHandle
  }
}
