import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BsnUserValidation } from './bsnUser.validate';
import { BsnUserController } from './bsnUser.controller';
import authCheck from '../../middlewares/authCheck';



export const BsnUserRoutes = express.Router();

BsnUserRoutes.route("/get_record")
.get(
    authCheck(),
    validateRequest(BsnUserValidation.getBsnUsers),
    BsnUserController.getBsnUsers
)
BsnUserRoutes.route("/")
.post(
    authCheck(),
    validateRequest(BsnUserValidation.createBsnUser),
    BsnUserController.createBsnUser
).patch(
    authCheck(),
    validateRequest(BsnUserValidation.updateBsnUser),
    BsnUserController.updateBsnUser
);


