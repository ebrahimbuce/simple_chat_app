import { useContext } from 'react';
import { AuthContext } from '../context/auth-provider.context';

const useSession = () => {
    
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useSession must be used within an AuthProvider');
    }

    return context;
  
}

export default useSession