import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"

import { auth } from "@/firebase/firebase"

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = 
async() => {
    const cred = 
    await signInWithPopup(
        auth,
        googleProvider
    )
    return cred.user
}

export const registerUser = async (
    name: string,
    email: string, 
    password: string
) => {
    const cred = 
    await createUserWithEmailAndPassword(
        auth, 
        email,
        password
    )
    await updateProfile(
        cred.user,
        {
            displayName: name,
        }
    )
    return cred.user
}

export const loginUser = async (
    email: string,
    password: string
) => {
    const cred = 
    await signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    return cred.user
}

export const logoutUser = async () => {
    await signOut(auth)
}
