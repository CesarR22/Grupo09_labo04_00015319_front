export default interface Transferencia {
  cuentaOrigenId: number
  cuentaDestinoId: number
  monto: number
  descripcion?: string
}
