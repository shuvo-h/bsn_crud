import firebaseInitialization from "../firebase/firebase.init";
import { getAuth,createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,FacebookAuthProvider , signInWithEmailAndPassword, GithubAuthProvider    } from "firebase/auth";
import { useEffect, useState } from "react";


firebaseInitialization();

const useFirebase = () => {
    const [user,setUser]=useState({});
    const [emailError,setEmailError]=useState('');
    const [passError,setPassError]=useState('');
    const [isLoading,setIsLoading] = useState(true);
    

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const signInWithGoogle = () =>{
        return signInWithPopup(auth,googleProvider)
           
    }
    
    
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if (user) {
                setUser(user)
            }else{
                setUser({})
            }
            setIsLoading(false);
        })
    },[auth])

    const signInWithUserEmailAndPassword = (email,password) =>{
        // Write regular expression here for password and email and catch error 
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setEmailError("Please input a valid email address.");
            return;
        }else{
            setEmailError("");
        }
        
        if (!(/(?=.*[A-Z].*[A-Z])/).test(password)) {
            setPassError('At least two uppercase letters are required :(')
            return;
        }else if ( !(/(?=.*[!@#$&*])/).test(password)) {
            setPassError('At least one special character is required')
            return;
        }else{
            setPassError("");
        }

        return createUserWithEmailAndPassword(auth,email,password)
            
    }
    
    const signInWithEmail = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithFacebook = () => {
        return signInWithPopup(auth,facebookProvider)
    }

    const signInWithGitHub = () =>{
        return signInWithPopup(auth,gitHubProvider)
    }
    const logOut = () =>{
        setIsLoading(true);
        signOut(auth)
            .then(()=>setUser({}))
            .finally(()=>setIsLoading(false))
    }
    return {
        user,
        emailError,
        passError,
        signInWithGoogle,
        logOut,
        signInWithUserEmailAndPassword,
        signInWithEmail,
        signInWithFacebook,
        signInWithGitHub,
        setIsLoading,
        isLoading
    }
};

export default useFirebase;