'use client';

import Button from "@/components/ui/Button";
import BsnForm from "@/components/ui/Form/BsnForm";
import BsnInput from "@/components/ui/Form/BsnInput";
import { API_ACCESS_TOKEN_KEY } from "@/constant/authConst";
import { useAuth } from "@/hooksAndCtx/context/AuthContext";
import useApi from "@/hooksAndCtx/useApi";
import { AxiosBsn } from "@/lib/axios/AxiosBsn";
import { AuthApi } from "@/network/AuthApi";
import { BsnUserApi } from "@/network/BsnUserApi";
import { setToLocalStorage } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
    const {errorMessage,execute,isLoading,data} = useApi()
    const {setIsLogin} = useAuth();
    const router = useRouter();
    const [token,setToken] = useState('');

    const loginHandler = async () =>{
        // just a test if the api access toke is correct
        const {data,isSuccess} = await execute(()=>AuthApi.login(token))
        if (isSuccess) {
            setIsLogin(true)
            setToLocalStorage(API_ACCESS_TOKEN_KEY,token)
            router.push('/')
        }
    }
    const fieldHandler = (value:string) =>{
        setToken(value)
    }

    return (
        <div className="max-w-80 mx-auto mt-24">
            <BsnForm onSubmit={loginHandler}>
                <BsnInput
                    label="Api Access Token"
                    name="api_access_token"
                    type="text"
                    // onChange={fieldHandler}
                    errorMessage={errorMessage as string}
                    onBlur={fieldHandler}
                />
                <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                >Submit</Button>
            </BsnForm>
        </div>
    );
};

export default LoginForm;