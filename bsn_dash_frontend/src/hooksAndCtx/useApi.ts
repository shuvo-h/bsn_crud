import { Dispatch, SetStateAction, useState } from 'react';
import { TMeta, TResponseSuccess } from '@/interface';
import { defaultMeta } from '@/constant/pagination.constant';
import { ArrayToObject } from '@/utils/transformer';
import { toast } from 'sonner';

type ApiHookResult<T> = {
    isLoading: boolean;
    isSuccess: boolean;
    data: T | null;
    setData: Dispatch<SetStateAction<T | null>>;
    meta: TMeta | undefined;
    errorMessage: string | null | undefined;
    errors: Record<string,any> | null | undefined
    successMessage: string | null;
    execute: (request: () => Promise<TResponseSuccess<T>>) => Promise<{
        data: T | undefined;
        meta: TMeta | undefined;
        isSuccess: boolean;
    }>;
};


function useApi<T>(ititialValue:any=null): ApiHookResult<T> {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(ititialValue);
    const [meta, setMeta] = useState<TMeta>(defaultMeta);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string,any> | null | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const execute = async (request: () => Promise<TResponseSuccess<T>>) => {
        setIsLoading(true);
        setIsSuccess(false);
        setErrors(null);
        setData(null);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            // Execute the request and get the transformed response directly
            const res = await request();
            if (res.success) {
                setIsSuccess(true);
                setSuccessMessage(res.message || null);
                setData(res.data);
                setMeta(res.meta || defaultMeta);
                toast.success(res.message || 'Data retrived successfully',{className:'text-green-500', position:"top-center"})
            } else {
                setErrorMessage(res.message || 'Unknown error occurred.');
                if (Array.isArray(res.errorMessages)) {
                    setErrors(ArrayToObject(res.errorMessages))
                }
                toast.error(res.message || 'Unknown error occurred.',{className:'text-red-500',position:"top-center"})
            }
            return {
                data: res.data,
                meta: res.meta,
                isSuccess: res.success,
            };
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.message || 'An error occurred.');
            return {
                data: null,
                meta: defaultMeta,
                isSuccess: false,
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isSuccess,
        data,
        meta: meta || defaultMeta,
        isLoading,
        errorMessage,
        errors,
        setData,
        successMessage,
        execute,
    };
}

export default useApi;
