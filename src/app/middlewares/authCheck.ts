import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../errors/apiError'
import { config } from '../../config/config'

const authCheck =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const api_access_token = req.headers.api_access_token
      if (!api_access_token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      // match with identifier
      const isValidToken = api_access_token === config.API_ACCESS_TOKEN
      if (!isValidToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid api access token')
      }

      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

export default authCheck
