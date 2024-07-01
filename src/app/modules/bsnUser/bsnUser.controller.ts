import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BsnUserServices } from './bsnUser.service'
import pick from '../../../shared/pick'
import { bsnuserFilterableFields } from './bsnUser.constant'
import httpStatus from 'http-status'

const createBsnUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.createBsnUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'BSN User created in successfully!',
    data: result,
  })
})
const updateBsnUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.updateBsnUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN User updated successfully!',
    data: result,
  })
})

const getBsnUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bsnuserFilterableFields)
  const result = await BsnUserServices.getBsnUsers(filters)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN User retrived in successfully!',
    data: result,
  })
})
const deleteBsnUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.deleteBsnUsers(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN User deleted in successfully!',
    data: result,
  })
})

export const BsnUserController = {
  createBsnUser,
  updateBsnUser,
  getBsnUsers,
  deleteBsnUsers,
}
