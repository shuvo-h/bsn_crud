
export type TMeta = {
    page: number
    limit: number
    total: number
}
export interface TMetaPayload {
    page?: number
    limit?: number
}


export type TResponseSuccess<any> = {
    success: boolean;
    message: string;
    data: any;
    meta?: TMeta;
    errorMessages: TResponseErrorMessage[];
}
export type TResponseError = {
    statusCode: number;
    message: string;
    errorMessages: TResponseErrorMessage[];
}
export type TResponseErrorMessage = {
    path: string|number;
    message: string;
}