import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BsnUserValidation } from './bsnUser.validate'
import { BsnUserController } from './bsnUser.controller'
import authCheck from '../../middlewares/authCheck'

export const BsnUserRoutes = express.Router()


BsnUserRoutes.route('/get_record').get(
  authCheck(),
  validateRequest(BsnUserValidation.getBsnUserByCode),
  BsnUserController.getBsnUserByCode,
)
BsnUserRoutes.route('/delete_record').delete(
  authCheck(),
  validateRequest(BsnUserValidation.deleteBsnUsers),
  BsnUserController.deleteBsnUsers,
)

BsnUserRoutes.route('/')
.get(
  authCheck(),
  validateRequest(BsnUserValidation.getAllBsnUsers),
  BsnUserController.getAllBsnUsers,
)
// add bulk users
  .post(
    authCheck(),
    validateRequest(BsnUserValidation.createBulkBsnUser),
    BsnUserController.createBulkBsnUser,
  )

  .patch(
    authCheck(),
    validateRequest(BsnUserValidation.updateBsnUser),
    BsnUserController.updateBsnUser,
  )

  // add a single user
BsnUserRoutes.route('/bsn_user')

  .post(
    authCheck(),
    validateRequest(BsnUserValidation.createSingleBsnUser),
    BsnUserController.createSingleBsnUser,
  )

