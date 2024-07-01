import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import {
  TBsnCreatePayload,
  TBsnUpdatePayload,
  TBsnuserFilters,
} from './bsnUser.interface'
import prisma from '../../../shared/prisma'

const createBsnUser = async (payload: TBsnCreatePayload) => {
  const existBsnUser = await prisma.bsnUser.findUnique({
    where: {
      code: payload.code,
    },
    select: {
      id: true,
    },
  })
  if (existBsnUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Code already exist')
  }

  // create a new bsn user
  const result = await prisma.bsnUser.create({
    data: payload,
  })

  return result
}
const updateBsnUser = async (payload: TBsnUpdatePayload) => {
  // check code is not exist
  const result = await prisma.bsnUser.update({
    where: {
      code: payload.code,
    },
    data: payload,
    select: {
      id: true,
    },
  })

  return result
}

const getBsnUsers = async (filters: TBsnuserFilters) => {
  const result = await prisma.bsnUser.findUnique({
    where: {
      code: filters.code,
    },
    select: {
      status: true,
    },
  })

  return result
}

const deleteBsnUsers = async (params: { code: number }) => {
  await prisma.bsnUser.delete({
    where: {
      code: params.code,
    },
    select: {
      status: true,
    },
  })

  return null
}

export const BsnUserServices = {
  createBsnUser,
  updateBsnUser,
  getBsnUsers,
  deleteBsnUsers,
}
