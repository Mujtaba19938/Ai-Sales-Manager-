import { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext(null);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsub;
    }, []);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signup = async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
            await updateProfile(cred.user, { displayName });
        }
        return cred;
    };

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => signOut(auth);

    const value = { user, loading, login, signup, loginWithGoogle, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
