import Role from '@/models/api/entities/Role'
import Permissions from '@/models/api/entities/Permissions'
import Service from '../core/Service'
import UserService from './custom/UserService'
import FinanzasService from './custom/FinanzasService'

//custom
export const userService = new UserService()
export const finanzasService = new FinanzasService()

//core
export const roleService = new Service<Role>({ endpoint: 'roles' })
export const permissionService = new Service<Permissions>({
  endpoint: 'permissions',
})
