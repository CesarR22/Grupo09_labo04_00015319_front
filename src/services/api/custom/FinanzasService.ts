import { appSettings } from '@/AppSettings'
import type Cuenta from '@/models/api/entities/Cuenta'
import type CategoriaFinanciera from '@/models/api/entities/CategoriaFinanciera'
import type Movimiento from '@/models/api/entities/Movimiento'
import type Transferencia from '@/models/api/entities/Transferencia'
import { axiosInstance } from '@/services/utils/axiosInstance'
import type { AxiosInstance } from 'axios'

interface SpringPage<T> {
  content: T[]
  totalElements: number
  number: number
  size: number
  totalPages: number
}

export interface FinanzasPage<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    pageCount: number
  }
}

export default class FinanzasService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axiosInstance({
      origin: appSettings.apiService,
      initPath: 'api',
    })
  }

  async getCuentas(): Promise<Cuenta[]> {
    const res = await this.axios.get<Cuenta[]>('/finanzas/cuentas')
    return res.data
  }

  async crearCuenta(payload: Pick<Cuenta, 'nombre' | 'numeroCuenta'>) {
    const res = await this.axios.post<Cuenta>('/finanzas/cuentas', payload)
    return res.data
  }

  async getMovimientos(page: number, size: number): Promise<FinanzasPage<Movimiento>> {
    const res = await this.axios.get<SpringPage<Movimiento>>('/finanzas/movimientos', {
      params: { page, size },
    })

    return {
      data: res.data.content,
      pagination: {
        total: res.data.totalElements,
        page: res.data.number,
        pageSize: res.data.size,
        pageCount: res.data.totalPages,
      },
    }
  }

  async transferir(payload: Transferencia) {
    const res = await this.axios.post<Movimiento>('/finanzas/transferencias', payload)
    return res.data
  }

  async getCategorias(): Promise<CategoriaFinanciera[]> {
    const res = await this.axios.get<CategoriaFinanciera[]>('/finanzas/categorias')
    return res.data
  }
}
