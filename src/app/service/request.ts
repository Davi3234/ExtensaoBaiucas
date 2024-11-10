import { HttpStatusCode } from "@angular/common/http";

export interface Request<T> {
  error: Error;
  ok: boolean;
  status: HttpStatusCode;
  value: T;
}
