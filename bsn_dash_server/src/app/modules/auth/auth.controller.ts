import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthServices,  } from './auth.service'
import httpStatus from 'http-status'

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: result,
  })
})


export const AuthController = {
  login
}
