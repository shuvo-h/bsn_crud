import { z } from 'zod'

const login = z.object({
  body: z.object({
    api_access_token: z
      .string({
        required_error: 'Api access token is required',
        invalid_type_error: 'Api access token must be string',
      }),

  }),
})

export const AuthValidation = {
  login,
}
