import { z } from 'zod'
import { TBSN_USER_STATUS } from '../../../interfaces/enum'
const  createBsnUser = z.object({
  code: z
    .string({
      required_error: 'Code is required',
      invalid_type_error: 'Code must be string',
    }),
  status: z.nativeEnum(TBSN_USER_STATUS, {
    required_error: 'Status is required',
    invalid_type_error: `Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`,
    message: `Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`,
  }),
  name: z
    .union([
      z
        .string({
          invalid_type_error: 'Name must be string',
          message: 'Provide a valid name',
        })
        .optional(),
      z.null(),
    ])
    .optional(),
  ic: z
    .union([
      z
        .string({
          invalid_type_error: 'IC must be string',
          message: 'Provide a valid IC',
        })
        .optional(),
      z.null(),
    ])
    .optional(),
  phone_number: z
    .union([
      z
        .string({
          invalid_type_error: 'Phone number must be string',
          message: 'Provide a valid phone number',
        })
        .optional(),
      z.null(),
    ])
    .optional(),
    company_name: z
    .union([
      z
        .string({
          invalid_type_error: 'Company name must be string',
          message: 'Must be a valid company name',
        })
        .optional(),
      z.null(),
    ])
    .optional(),
})

const createSingleBsnUser = z.object({
  body: createBsnUser
})
const createBulkBsnUser = z.object({
  body: z.array(createBsnUser),
})

const updateBsnUser = z.object({
  body: z.object({
    code: z
      .string({
        required_error: 'Code is required',
        invalid_type_error: 'Code must be string',
      }),
      status: z.nativeEnum(TBSN_USER_STATUS, {
        required_error: 'Status is required',
        invalid_type_error: `Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`,
        message: `Status must be ${TBSN_USER_STATUS.ONE}/${TBSN_USER_STATUS.TWO}/${TBSN_USER_STATUS.THREE}/${TBSN_USER_STATUS.FOUR}`,
      }),

  }),
})

const getAllBsnUsers = z.object({
  query: z.object({
    page: z.union([
      z
        .string()
        .transform(val => parseInt(val, 10))
        .refine(val => !isNaN(val), {
          message: 'Page must be a valid integer',
        }),
      z.undefined(),
    ]),
    limit: z.union([
      z
        .string({
          invalid_type_error: 'Limit must be a string',
          required_error: 'Limit is required',
        })
        .transform(val => (val === '' ? undefined : parseInt(val || '', 10)))
        .refine(val => val === undefined || !isNaN(val), {
          message: 'Limit must be a valid integer',
        }),
      z.undefined(),
    ]),
    sortBy: z.union([
      z
        .string({ required_error: 'sortBy must be string' })
        .min(1, 'Minimum 1 character is required for sorting')
        .optional(),
      z.undefined(),
    ]),
    sortOrder: z.union([
      z
        .string({ required_error: 'sortOrder must be string' })
        .optional()
        .refine(val => val === undefined || ['asc', 'desc'].includes(val), {
          message: "Sort order must be 'asc' or 'desc'",
        }),
      z.undefined(),
    ]),
    code: z.union([
      z
      .string()
      .optional(),
      z.undefined()
    ]),
  }),
})

const getBsnUserByCode = z.object({
  query: z.object({
    code: z
      .string({ required_error: 'Code is required' }),
  }),
})

const deleteBsnUsers = z.object({
  query: z.object({
    code: z
      .string({ required_error: 'Code is required' }),
  }),
})

export const BsnUserValidation = {
  createSingleBsnUser,
  createBulkBsnUser,
  updateBsnUser,
  getAllBsnUsers,
  getBsnUserByCode,
  deleteBsnUsers,
}
