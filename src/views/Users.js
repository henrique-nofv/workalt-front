import React, { Fragment, useEffect } from 'react';
import { Table, Tag, PageHeader } from 'antd';
import axios from 'axios'
import { useUsers } from "../context/Users";
import { useToken } from "../context/Token";

const columns = [
    {
        title: 'Cpf',
        dataIndex: 'cpf',
        key: 'cpf',
    },
    {
        title: 'Cref',
        dataIndex: 'cref',
        key: 'cref',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) =>
            <Tag color={`${record.status == 'BLOCKEAD' ? 'red' : record.status == 'PENDING' ? 'grey' : 'blue'}`}>
                {record.status ? record.status : ''}
            </Tag>
    },
    {
        title: 'Assinatura',
        dataIndex: 'assinatura',
        key: 'assinatura',
    },
    {
        title: 'Detalhes',
        key: 'Detalhes',
        render: (text, record) => <a onClick={() => { window.location.assign(`/user/${record.cpf}`) }}>Visualizar</a>,
    },
];


function Users() {
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
                    key: index,
                    status: personal.user.status,
                    assinatura: personal.signatureStatus
                })
            })
            setUsers(data)
        })
    }, [])




    return (
        <Fragment>
            <PageHeader
                className="site-page-header"
                title="Personais"
            />
            <Table
                loading={!users[0]}
                dataSource={users}
                columns={columns} />
        </Fragment>
    );
}

export default Users;
