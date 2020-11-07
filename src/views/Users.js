import React, { Fragment, useEffect } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios'
import { useUsers } from "../context/Users";
import { useParams } from 'react-router-dom';
import { useToken } from "../context/Token";
const columns = [
    {
        title: 'Cpf',
        dataIndex: 'cpf',
        key: 'cpf',
        render: text => <a onClick={()=>{window.location.assign(`/user/${text}`)}}>{text}</a>,
    },
    {
        title: 'Cref',
        dataIndex: 'cref',
        key: 'cref',
    },
    {
        title: 'Ações',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a style={{ color: 'green' }}>Aceitar {record.name}</a>
                <a style={{ color: 'red' }}>Negar</a>
            </Space>
        ),
    },
];


function Users() {
    let { id } = useParams();

    const { users, setUsers } = useUsers();
    const { token } = useToken();

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/personals`, config).then(response => {
            let data = [];

            response.data.forEach((personal, index) => {
                data.push({
                    cpf: personal.cpf,
                    cref: personal.cref,
                    key: index
                })
            })
            setUsers(data)
        })
    }, [])




    return (
        <Fragment>
            <h1>ID: {id}</h1>
            <Table dataSource={users}
                title={() => 'Usuários - Personal'}
                columns={columns} />
        </Fragment>
    );
}

export default Users;
