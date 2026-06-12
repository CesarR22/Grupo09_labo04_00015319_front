import type { RoleName } from '@/enum/role'
import { RoutesEnum } from '@/enum/routes..app'

type RouteConfig = {
  auth: boolean
  roles: RoleName[]
  permission: string[]
  title: string
  search: boolean
}

export const routesConfig: Record<RoutesEnum, RouteConfig> = {
  [RoutesEnum.ROOT]: {
    auth: true,
    roles: [],
    permission: ['*'],
    title: 'Inicio',
    search: false,
  },
  [RoutesEnum.LOGIN]: {
    auth: false,
    roles: [],
    permission: ['*'],
    title: 'Login',
    search: false,
  },
  [RoutesEnum.DASHBOARD]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Dashboard',
    search: true,
  },
  [RoutesEnum.ROLES]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Roles',
    search: true,
  },
  [RoutesEnum.PERMISSIONS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Permisos',
    search: true,
  },
  [RoutesEnum.FINANZAS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Finanzas',
    search: false,
  },
  [RoutesEnum.FINANZAS_CUENTAS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Cuentas bancarias',
    search: false,
  },
  [RoutesEnum.FINANZAS_MOVIMIENTOS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Movimientos',
    search: false,
  },
  [RoutesEnum.FINANZAS_TRANSFERENCIAS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Transferencias',
    search: false,
  },
  [RoutesEnum.FINANZAS_CATEGORIAS]: {
    auth: true,
    roles: ['*'],
    permission: ['*'],
    title: 'Categorías financieras',
    search: false,
  },
} as const
