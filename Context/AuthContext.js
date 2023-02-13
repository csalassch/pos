import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendEmailVerification,sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "@/config";

//Exportamos el contexto, es decir, informacion del usuario que haya iniciado sesion
export const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
}
//AuthProvider proporciona al hijo todas las propiedades de un usuario para prevenir hacer importaciones o consultas innecesarias
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [dataUser, setDataUser] = useState(null);


    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password).
        then((userCredential) => {
            const user1 = userCredential.user;
            sendEmailVerification(user1).then((e)=>{
                console.log("email sent",e);
            })
            console.log(`usr:${user1.uid}`);
            return user1;
        });
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const resetPassword = (email) => sendPasswordResetEmail(auth,email);


    useEffect(() => {
        //Seteamos el valor del usuario actual en el estado user para ser pasado como parametro al hijo
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("Usuario actual: ", currentUser);
            setUser(currentUser);
            setDataUser(currentUser);
            console.log("Usuario DATAUSER: ", dataUser);
        });
        return () => unSubscribe();
    }, [user])
    return (
        //Proporcionamos los datos necesarios para nuestro componente hijo
        <authContext.Provider value={{ user, signup, dataUser,login ,logout,resetPassword}}>
            {children}
        </authContext.Provider>
    )

}