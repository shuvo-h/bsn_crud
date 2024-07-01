import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL as string,
    PORT: process.env.PORT as string,
    isProd: process.env.NODE_ENV === 'production',
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN as string,

}