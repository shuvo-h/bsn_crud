import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL as string,
    PORT: process.env.PORT as string,
    isProd: process.env.NODE_ENV === 'production',
    MASTER_PASSWORD: process.env.MASTER_PASSWORD as string,
    TOKEN_IDENTIFIER: process.env.TOKEN_IDENTIFIER as string,
    jwt:{
        JWT_SECRET: process.env.JWT_SECRET as string,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    },
    cookies:{
        COOKIE_SIGN_SECRET: process.env.COOKIE_SIGN_SECRET as string,
    }
}