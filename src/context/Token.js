import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from 'axios';
const TokenContext = createContext();

export default function TokenProvider({ children }) {
    const [token, setToken] = useState('');

    const requestToken = () => {
        const storageToken = window.localStorage.getItem('token-workalt');
        if (storageToken) {
            setToken(storageToken)
        }
    }

    const signIn = useCallback((email, password) => {
        return axios.post(`${process.env.REACT_APP_URL}/auth/login`, {
            email,
            password
        }).then(response => {

            if (response.status === 200) {
                setToken(response.data.token)

                window.localStorage.setItem('token-workalt', response.data.token)
            }
            else {
            }
        })
    })

    const signOut = useCallback(() => {
        window.localStorage.removeItem('token-workalt')

        setToken(null)

    })

    useEffect(() => {
        requestToken()
    }, []);

    return (
        <TokenContext.Provider
            value={{
                token,
                setToken,
                signIn,
                signOut
            }}
        >
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    const context = useContext(TokenContext);
    if (!context) throw new Error("useToken must be used within a TokenProvider");
    // const { token, setToken, signIn, signOut } = context;
    return context;
}