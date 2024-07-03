import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BsnUserServices } from './bsnUser.service'
import pick from '../../../shared/pick'
import { bsnuserFilterableFields } from './bsnUser.constant'
import httpStatus from 'http-status'
import { paginatinOptions } from '../../../constant/paginationConst'

const createSingleBsnUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.createSingleBsnUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'BSN User created in successfully!',
    data: result,
  })
})
const createBulkBsnUser = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.createBulkBsnUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'BSN bulk user created in successfully!',
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

const getAllBsnUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bsnuserFilterableFields);
  const options = pick(req.query, paginatinOptions);

  const {meta,users} = await BsnUserServices.getAllBsnUsers(filters,options)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN Users retrived in successfully!',
    meta,
    data: users,
  })
})

const getBsnUserByCode = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bsnuserFilterableFields)
  const result = await BsnUserServices.getBsnUserByCode(filters)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN User retrived in successfully!',
    data: result,
  })
})

const deleteBsnUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await BsnUserServices.deleteBsnUsers(req.query.code as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BSN User deleted in successfully!',
    data: result,
  })
})

export const BsnUserController = {
  createSingleBsnUser,
  createBulkBsnUser,
  updateBsnUser,
  getAllBsnUsers,
  getBsnUserByCode,
  deleteBsnUsers,
}
