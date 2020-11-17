
import React, { createContext, useState, useContext, useCallback } from "react";
import axios from 'axios'
import { useToken } from "../context/Token";
const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const { token } = useToken();

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const userChangeStatus = useCallback((id, status) => {
        return axios.put(`${process.env.REACT_APP_URL}/personals/${id}/status`, {
            status
        }, config).then(() => {
            getUser(id)
        })
    })

    const getUser = useCallback((id) => {

        axios.get(`${process.env.REACT_APP_URL}/personals/${id}`, config).then(async response => {
            const crefStatus = await isValidCref(response.data.cref)
            console.log('Valor do cref', response.data.cref)
            response.data.status = crefStatus

            setUser(response.data)
        })
    })

    const isValidCref = useCallback(cref => {
        let crefStatus;
        return new Promise((resolve) => {
            axios.get(`https://www.confef.org.br/confef/registrados/ssp.registrados.php?columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&order%5B0%5D%5Bcolumn%5D=2&search%5Bvalue%5D=${cref}`)
                .then(response => {
                    if (response.data.data[0]) {
                        if (response.data.data[0].length >= 5) {
                            crefStatus = response.data.data[0][5]
                            resolve(crefStatus);
                        }
                        else {
                            crefStatus = 'Não encontrado situação de CREF'
                            resolve(crefStatus);
                        }
                    } else {
                        crefStatus = 'Não encontrado situação de CREF'
                        resolve(crefStatus);
                    }
                }).catch(e => resolve(''))
        })

    })

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userChangeStatus,
                getUser,
                isValidCref
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}