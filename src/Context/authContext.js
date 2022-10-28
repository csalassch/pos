import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import {set,ref} from 'firebase/database';
import { auth,db } from '../FirebaseConfig/firebase';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    const signup = (email, password,UserName) => createUserWithEmailAndPassword(auth, email, password).
        then((userCredential) => {
            const user1 = userCredential.user;
            console.log(`ahh:${user1.uid}`);
            set(ref(db, `usuarios/${user1.uid}` ), {
                user: email,
                userName:UserName,
                password: password,
                dateCreated: (new Date()).toUTCString()
            });
        });
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setloading(false);
        });
        return () => unSubscribe();
    }, [])
    return (
        <authContext.Provider value={{ signup, login, user, logout, loading }}>
            {children}
        </authContext.Provider>
    )

}