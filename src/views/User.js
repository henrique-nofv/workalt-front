import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import { useUser } from "../context/User";
import { useToken } from "../context/Token";
import axios from 'axios'
import { Space } from 'antd';


function User() {
    let { id } = useParams();

    const { user, setUser } = useUser();
    const { token } = useToken();
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(`${process.env.REACT_APP_URL}/personals/${id}`, config).then(response => {
            setUser(response.data)
        })
    }, [])

    return (
        <Fragment>
            <Card title={`CPF: ${id}`} bordered={false} style={{ width: '100%' }}>
                {
                    user.address ?
                    <div>
                        <p>Cep: {user.address.cep}</p>
                        <p>Cidade: {user.address.city}</p>
                        <p>Complemento: {user.address.complement}</p>
                        <p>Distrito: {user.address.district}</p>
                        <p>Número: {user.address.number} | UF: {user.address.uf}</p>
                        <hr></hr>
                        <p>Email: {user.user.email}</p>
                        <p>Status: {user.user.status}</p>
                        <Space size="middle">
                            <a style={{ color: 'green' }}>Aceitar</a>
                            <a style={{ color: 'red' }}>Negar</a>
                        </Space>
                    </div>
                    : ''
                }
            </Card>

        </Fragment>
    );
}

export default User;
