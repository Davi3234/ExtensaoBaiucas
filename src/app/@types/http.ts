import { HttpStatusCode } from "@angular/common/http"

export interface Result<T = any> {
  error: null | {
    message: string,
    causes: {
      message: string,
      origin: string[]
    }[]
  }
  ok: boolean
  status: HttpStatusCode
  value: T
}
