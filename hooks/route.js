import { useAuth } from '@/Context/AuthContext'
import { useRouter } from 'next/router';
import React from 'react'

export function withPublic(Component){
    return function WithPublic(props){
        const router=useRouter();
        const auth=useAuth();
        console.log("AUTH: ",auth);
        if(!auth.user){
            router.replace("/views/login");
            return <h1>Loading...</h1>
        }
        return <Component auth={auth} {...props}/>;
    }
}