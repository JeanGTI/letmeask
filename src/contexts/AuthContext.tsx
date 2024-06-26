import { createContext, useState, useEffect, ReactNode } from 'react'
import { auth, firebase } from '../services/firebase';

type User = { 
    id: String;
    name: String;
    avatar: String;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

type AuthContextProviderProps = {
     children : ReactNode;
}

  export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props : AuthContextProviderProps) { 

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
         if (user) {
           const { displayName, photoURL, uid } = user
     
           if (!displayName || !photoURL) {
             throw new Error('Missing information from Gooogle Accont.')
           }
           
           setUser({
             id: uid,
             name: displayName,
             avatar: photoURL
           })
         }
        }) 
    
        return () => {
            unsubscribe();
        };
    
       },[])
    
       const [user, setUser] = useState<User>();
    
      async function signInWithGoogle() {
          const provider = new firebase.auth.GoogleAuthProvider();
    
          const result = await auth.signInWithPopup(provider);
    
          if (result.user) {
            const { displayName, photoURL, uid } = result.user
    
            if (!displayName || !photoURL) {
              throw new Error('Missing information from Gooogle Accont.')
            }
            
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
      }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle}}>
           {props.children}
       </AuthContext.Provider>

   );
}