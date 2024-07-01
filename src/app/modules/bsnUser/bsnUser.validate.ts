import { z } from 'zod';
import { TBSN_USER_STATUS } from '../../../interfaces/enum';

const createBsnUser = z.object({
    body: z.object({
        code: z.number({
            required_error: 'Code is required',
            invalid_type_error:"Code must be number"
        }).int({message:"Code must be integer"}),
        status: z.nativeEnum(TBSN_USER_STATUS,{
            required_error: 'Status is required',
            invalid_type_error:`Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`,message: `Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`
        }),
        name: z.union([
            z.string({
                invalid_type_error:"Name must be string",
                message:"Provide a valid name",
            }).optional(),
            z.null()
        ]).optional(),
        ic: z.union([
            z.string({
                invalid_type_error:"IC must be string",
                message:"Provide a valid IC",
            }).optional(),
            z.null()
        ]).optional(),
        phone_number: z.union([
            z.string({
                invalid_type_error:"Phone number must be string",
                message:"Provide a valid phone number",
            }).optional(),
            z.null()
        ]).optional(),

    }),
});
const updateBsnUser = z.object({
    body: z.object({
        code: z.number({
            required_error: 'Code is required',
            invalid_type_error:"Code must be number"
        }).int({message:"Code must be integer"}),
        name: z.union([
            z.string({
                invalid_type_error:"Name must be string",
                message:"Provide a valid name",
            }).optional(),
            z.null()
        ]).optional(),
        ic: z.union([
            z.string({
                invalid_type_error:"IC must be string",
                message:"Provide a valid IC",
            }).optional(),
            z.null()
        ]).optional(),
        phone_number: z.union([
            z.string({
                invalid_type_error:"Phone number must be string",
                message:"Provide a valid phone number",
            }).optional(),
            z.null()
        ]).optional(),

    }),
});


const getBsnUsers = z.object({
    query: z.object({
      code: z
        .string({required_error:"Code is required"}).transform(value=>{
            const int = parseInt(value)
            return int
        }).refine(value=>{
            if (isNaN(value)) {
                return false
            }
            return true
        },{message:"Code must be a valid number"}),
    }),
  })

export const BsnUserValidation = {
    createBsnUser,
    updateBsnUser,
    getBsnUsers,
};