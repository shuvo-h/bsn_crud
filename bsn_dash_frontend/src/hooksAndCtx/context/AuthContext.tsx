"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ACCESS_TOKEN_KEY } from '@/constant/authConst';
import { getFromLocalStorage } from '@/utils/localstorage';

type AuthContextType = {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setIsLogin: () => {}
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const api_access_token = getFromLocalStorage(API_ACCESS_TOKEN_KEY);
        if (api_access_token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
            router.push('/login');
        }
    }, [router]);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
