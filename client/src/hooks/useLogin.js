import { useAuthContext } from './useAuthContext'
import {auth, googleProvider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const API_URL=process.env.REACT_APP_AUTH_API_URL;

export const useLogin = () => {
  const { dispatch } = useAuthContext()
  

  const login = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        console.log(token);        
        const res = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                
            },
            body: JSON.stringify({ name: result.user.displayName, email:  result.user.email, picture: result.user.photoURL })
        });
        if(res.ok) {
            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data })
        }
    } catch (e) {
        console.error(e);
    }
  }

  return { login }
}