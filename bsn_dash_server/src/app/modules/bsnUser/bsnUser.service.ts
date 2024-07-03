import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import {
  TBsnCreatePayload,
  TBsnUpdatePayload,
  TBsnuserFilters,
} from './bsnUser.interface'
import prisma from '../../../shared/prisma'
import { TPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { Prisma } from '@prisma/client'

const createSingleBsnUser = async (payload: TBsnCreatePayload) => {
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
const createBulkBsnUser = async (payload: TBsnCreatePayload[]) => {
  // check code unique
  const codeList = payload.map(({code})=>code);
  const existBsnUser = await prisma.bsnUser.findMany({
    where: {
      code:{in:codeList},
    },
    select: {
      id: true,
    },
  })
  if (existBsnUser.length) {
    throw new ApiError(httpStatus.CONFLICT, 'Some code already exist. Can not add.')
  }

  // create a new bsn user
  await prisma.bsnUser.createMany({
    data: payload,
  })
  const result = await prisma.bsnUser.findMany({
    where:{
      code:{in:codeList}
    },
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

const getAllBsnUsers = async (filters: TBsnuserFilters,options: TPaginationOptions,) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const {  ...filterData } = filters;

  const andConditions = [];

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key=>{
        return {
          [key]: {
            equals: (filterData as any)[key]
          }
        }
      })
    })
  }

  const whereConditions: Prisma.BsnUserWhereInput = andConditions.length >0 ? {AND: andConditions} :{}


  const result = await prisma.bsnUser.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder
    ? {[options.sortBy]:options.sortOrder}:{createdAt:"desc"},
    select: {
      id: true,
      code: true,
      status: true,
      name: true,
      ic: true,
      phone_number: true,
      company_name: true,
    },
  })

  const total = await prisma.bsnUser.count({
    where: whereConditions
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    users: result,
  };
}

const getBsnUserByCode = async (filters: TBsnuserFilters) => {
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

const deleteBsnUsers = async (code: string) => {
  await prisma.bsnUser.delete({
    where: {
      code,
    },
    select: {
      status: true,
    },
  })

  return null
}

export const BsnUserServices = {
  createSingleBsnUser,
  createBulkBsnUser,
  updateBsnUser,
  getAllBsnUsers,
  getBsnUserByCode,
  deleteBsnUsers,
}
