import express from 'express'
import { BsnUserRoutes } from '../modules/bsnUser/bsnUser.route'
import { AutyhRoutes } from '../modules/auth/auth.route'

export const routes_v1 = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AutyhRoutes,
  },
  {
    path: '/bsn_users',
    route: BsnUserRoutes,
  },
]

moduleRoutes.forEach(route => routes_v1.use(route.path, route.route))
