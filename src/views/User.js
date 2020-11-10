import React, { Fragment, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, PageHeader, Tag, Skeleton } from 'antd';
import { useUser } from "../context/User";

import { Space } from 'antd';


function User() {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);

    const { user, getUser, userChangeStatus } = useUser();

    useEffect(() => {
        getUser(id)
    }, [])

    return (
        <Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => window.location.assign('/users')}
                title="Personais"
                tags={user.status ?
                    <Tag color={`${user.status == 'Não encontrado situação de CREF' ? 'yellow' : 'blue'}`}>
                        {user.status ? user.status : ''}
                    </Tag> :
                    ''}
                subTitle="Detalhe"
            />
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
                            <p>
                                {
                                    <Tag on color={`${user.user.status == 'BLOCKEAD' ? 'red' : user.user.status == 'PENDING' ? 'grey' : 'green'}`}>
                                        {user.user.status ? user.user.status : ''}
                                    </Tag>
                                }
                            </p>
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    loading={loading}
                                    onClick={async () => { 
                                        setLoading(true)
                                        await userChangeStatus(user.id, 'ACTIVE')
                                        setLoading(false)
                                    }}
                                    disabled={user.user.status == 'ACTIVE' ? true : false}
                                >
                                    Aceitar
                            </Button>
                                <Button
                                    type="primary"
                                    danger
                                    loading={loading}
                                    disabled={user.user.status == 'BLOCKEAD' ? true : false}
                                    onClick={async () => {
                                        setLoading(true)
                                        await userChangeStatus(user.id, 'BLOCKEAD')
                                        setLoading(false)
                                    }}
                                >
                                    Rejeitar
                                </Button>
                            </Space>
                        </div>
                        :
                        <div>
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                }
            </Card>

        </Fragment>
    );
}

export default User;
