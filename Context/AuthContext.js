import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config";
import { onAuthStateChanged, createUserWithEmailAndPassword,signInWithPopup, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider } from 'firebase/auth';

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
    const provider1 = new GoogleAuthProvider();

    const provider = ()=>signInWithPopup(auth, provider1)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log({ credential, token, user });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({ errorCode, errorMessage, email, credential });
        });

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password).
        then((userCredential) => {
            const user1 = userCredential.user;
            sendEmailVerification(user1).then((e) => {
                console.log("email sent", e);
            })
            console.log(`usr:${user1.uid}`);
            return user1;
        });
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);


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
        <authContext.Provider value={{ user, signup, dataUser, login, logout, resetPassword, provider }}>
            {children}
        </authContext.Provider>
    )

}