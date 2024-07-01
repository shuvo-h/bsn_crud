import { z } from 'zod';

const loginZodSchema = z.object({
    body: z.object({
        master_password: z.string({
            required_error: 'Master password is required',
        }),
    }),
});


export const AuthValidation = {
    loginZodSchema,
};