import { useContext } from 'react';
import { AuthContext } from '../components/Context/Context';

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;