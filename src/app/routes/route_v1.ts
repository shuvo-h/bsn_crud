import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';


export const routes_v1 = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => routes_v1.use(route.path, route.route));
