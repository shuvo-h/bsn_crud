import { Request, Response } from 'express';

import { config } from '../../../config/config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config.isProd,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        signed: true,
    };

    res.cookie('accessToken', accessToken, cookieOptions);

    const cookieRefreshOptions = {
        secure: config.isProd,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        signed: true,
    };
    res.cookie('refreshToken', refreshToken, cookieRefreshOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: {
            accessToken: result.accessToken,
        },
    });
});




export const AuthController = {
    loginUser,
};