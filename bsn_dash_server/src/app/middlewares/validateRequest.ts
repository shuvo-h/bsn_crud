import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      // Replace original request data with validated data
      req.body = validatedData.body
      req.query = validatedData.query
      req.params = validatedData.params
      req.cookies = validatedData.cookies

      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
