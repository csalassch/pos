import { useAuth } from '../Context/authContext';
import { Navigate } from 'react-router-dom';
//const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    
    if (loading) return <h1>loading...</h1>
    if (!user) return <Navigate to='/auth/loginformik' />
    return <>{children}</>
}