import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { config } from '../../../config/config'

const login = async (payload: {api_access_token:string}) => {
  const isTokenMatch = payload.api_access_token === config.API_ACCESS_TOKEN;
  if (!isTokenMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Invalid api access token")
  }
  return isTokenMatch
}

export const AuthServices = {
  login
}
