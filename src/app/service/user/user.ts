import { TypeUser } from "../../enums/type-user"

export interface Usuario {
  id?: number
  name: string
  login: string
  active: boolean,
  tipo: TypeUser
}
