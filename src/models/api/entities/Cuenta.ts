import BaseEntity from '../core/_BaseEntity'

export default interface Cuenta extends BaseEntity {
  nombre: string
  numeroCuenta: string
  saldo: number
  activa: boolean
}
