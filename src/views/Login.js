import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useToken } from "../context/Token";

const NormalLoginForm = () => {
  const { token, setToken } = useToken();

  const saveAuth = (value)=>{
    setToken(value)
  }

  const onFinish = values => {    
    const body = {
      email: values.email,
      password: values.password
    }

    axios.post(`${process.env.REACT_APP_URL}/auth/login`, body).then(response =>{
      if (response.status == 200) {
        saveAuth(
          response.data.token
        )

        console.log('Token', token)
      }
    })
  };


  return (
    <Card title="Login" style={{ width: 300, margin: 'auto' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, informe seu usuário!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NormalLoginForm;