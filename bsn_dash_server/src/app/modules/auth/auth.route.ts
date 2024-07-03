import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validate'
import { AuthController } from './auth.controller'

export const AutyhRoutes = express.Router()


AutyhRoutes.route('/login').post(
  validateRequest(AuthValidation.login),
  AuthController.login,
)
