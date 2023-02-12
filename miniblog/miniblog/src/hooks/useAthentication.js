
import { db } from "../firebase/config"

import { getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        updateProfile, 
        signOut 
    } from 'firebase/auth'

    import { useState, useEffect } from 'react'


    export const useAuthentication = ()=>{
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(null)

        // cleanup
        // del with memory leak
        const [cancelled, setCancelled] = useState(false)

        const auth = getAuth()

        function checkIfIsCancelled()
        {
            if (cancelled)
            {
             return;   
            }
        }

        // register

        const createUser = async (data) =>
        {
            checkIfIsCancelled()
            setLoading(true)

            setError(null)

            try
            {
                const { user } = await createUserWithEmailAndPassword( auth, data.email, data.password)

                await updateProfile(user, {
                    displayName: data.displayName
                })
                setLoading(false)
                return user

            }
            catch(error)
            {
                
                let systemErroMessage

                if(error.message.includes("Password"))
                {
                    systemErroMessage = "A senha precisa conter pelo menos 6 caracteres."
                }
                else if(error.message.includes("email-already"))
                {
                    systemErroMessage = "E-mail já cadastrado."
                }
                else
                {
                    systemErroMessage = "Ocorreu um erro, por favor tente mais tarde."
                }
                
                setLoading(false)
                setError(systemErroMessage)
            }

        }

        // logout - sign out
        const logout = () =>{
            checkIfIsCancelled()
            signOut(auth)
        }

        // login - sign in

        const login = async (data) =>{

            checkIfIsCancelled()

            setLoading(true)
            setError(false)

            try
            {
                await signInWithEmailAndPassword(auth, data.email, data.password)
                setLoading(false);
            }
            catch(error)
            {
                let systemErroMessage;

                if(error.message.includes("user-not-found"))
                {
                    systemErroMessage = "Usuário não encontrado."
                }
                else if(error.message.includes("wrong-password"))
                {
                    systemErroMessage = "Senha incorreta."
                }
                else
                {
                    systemErroMessage = "Ocorreu um erro, por favor tente mais tarde."
                }

                setError(systemErroMessage)
                setLoading(false)
            }

           
        }



        useEffect( () => {
            return () =>  setCancelled(true)
        }, [] )

        return { auth, createUser, error, loading, logout, login }
    }