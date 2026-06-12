import BaseEntity from '../core/_BaseEntity'

export default interface CategoriaFinanciera extends BaseEntity {
  nombre: string
  activa: boolean
}
