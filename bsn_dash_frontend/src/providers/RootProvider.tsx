'use client'
import { AuthProvider } from '@/hooksAndCtx/context/AuthContext';

import { Toaster, toast } from 'sonner'

type TRootProviderProps = {
    children: React.ReactNode
}
const RootProvider = ({children}:TRootProviderProps) => {
    return (
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
    );
};

export default RootProvider;