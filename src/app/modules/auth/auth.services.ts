
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { TLoginUserPayload } from './auth.interface';
import { config } from '../../../config/config';
import ApiError from '../../../errors/apiError';


const loginUser = async (payload: TLoginUserPayload) => {


    const isPasswordMatched = config.MASTER_PASSWORD === payload.master_password;

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Invalid login credential!');
    }

    const jwtPayload = {
        identifier: config.TOKEN_IDENTIFIER,
    };
    console.log(config);
    
    const accessToken = jwtHelpers.createToken(
        jwtPayload,
        config.jwt.JWT_SECRET as Secret,
        config.jwt.JWT_EXPIRES_IN
    );

    const refreshToken = jwtHelpers.createToken(
        jwtPayload,
        config.jwt.JWT_REFRESH_SECRET as Secret,
        config.jwt.JWT_REFRESH_EXPIRES_IN
    );

    return {
        accessToken,
        refreshToken,
    };
};







export const AuthService = {
    loginUser,
};