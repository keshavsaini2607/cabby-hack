import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const createUser = async(email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if(response) {
            console.log("user created", response);
        } else {
            console.log("somthing went wrong", response);
        }
    } catch (error) {
        console.log("error creating user", error);
    }
}