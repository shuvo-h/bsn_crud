
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { TBsnCreatePayload, TBsnUpdatePayload, TBsnuserFilters } from './bsnUser.interface';
import prisma from '../../../shared/prisma';


const createBsnUser = async (payload: TBsnCreatePayload) => {
    // check code is not exist
    const existBsnUser = await prisma.bsnUser.findUnique({
        where:{
            code: payload.code
        },
        select:{
            id: true
        }
    })
    if (existBsnUser) {
        throw new ApiError(httpStatus.CONFLICT, "Code already exist")
    }

    // create a new bsn user
    const result = await prisma.bsnUser.create({
        data: payload
    })

    return result;
};
const updateBsnUser = async (payload: TBsnUpdatePayload) => {
    console.log({payload});

    // check code is not exist
    const result = await prisma.bsnUser.update({
        where:{
            code: payload.code
        },
        data: payload,
        select:{
            id: true
        }
    })

    

    return result;
};


const getBsnUsers = async (filters: TBsnuserFilters) => {
    console.log(filters);

    // check code is not exist
    const result = await prisma.bsnUser.findUnique({
        where:{
            code: filters.code
        },
        select:{
            status: true
        }
    })

    return result;
};







export const BsnUserServices = {
    createBsnUser,
    updateBsnUser,
    getBsnUsers,
};