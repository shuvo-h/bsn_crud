import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validate';
import { AuthController } from './auth.controller';


export const AuthRoutes = express.Router();

AuthRoutes.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);


