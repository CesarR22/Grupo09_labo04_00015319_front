import BaseEntity from '../core/_BaseEntity'

export type TipoMovimiento = 'INGRESO' | 'EGRESO' | 'TRANSFERENCIA'

export default interface Movimiento extends BaseEntity {
  monto: number
  descripcion: string
  tipo: TipoMovimiento
  fecha: string
  cuenta: string
  categoria?: string | null
}
