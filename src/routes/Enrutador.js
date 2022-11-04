import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

//ProtectedRoute tiene la funcion de que no cualquiera pueda redireccionar al menu y previo tenga que estar logueado
export function ProtectedRoute({ children }) {
    //Obtenemos el usuario y se verifica si existe una sesion iniciada
    const { user, loading } = useAuth();
    //Por si llega a tardar en conectar se muestra un mensaje de espera 
    if (loading) return <h1>loading...</h1>
    //Si no existe siempre redireccionamos al login
    if (!user) return <Navigate to='/auth/loginformik' />
    return <>{children}</>
}