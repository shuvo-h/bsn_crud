'use client'
import { API_ACCESS_TOKEN_KEY } from '@/constant/authConst';
import { useAuth } from '@/hooksAndCtx/context/AuthContext';
import { getFromLocalStorage } from '@/utils/localstorage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
type TLayoutProps = {
    children: React.ReactNode
}
const Layout = ({children}:TLayoutProps) => {
    const router = useRouter();
    const {isLogin} = useAuth();

    useEffect(()=>{
        if (!isLogin) {
            const isToken = getFromLocalStorage(API_ACCESS_TOKEN_KEY)
            if (!isToken) {
                router.push('/login')
            }
        }
    },[isLogin])
    return (
        <main className='mx-[1%] md:mx-[5%] lg:mx-[7%]'>
            {children}
        </main>
    );
};

export default Layout;