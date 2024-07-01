import express from 'express';
import { BsnUserRoutes } from '../modules/bsnUser/bsnUser.route';


export const routes_v1 = express.Router();

const moduleRoutes = [
  {
    path: '/bsn_users',
    route: BsnUserRoutes,
  },
];

moduleRoutes.forEach(route => routes_v1.use(route.path, route.route));
