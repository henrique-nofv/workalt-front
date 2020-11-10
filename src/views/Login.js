import React, {useState} from 'react'
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useToken } from "../context/Token";

const NormalLoginForm = () => {
  const { signIn } = useToken();
  const [logged, setLogged] = useState(true);
  
  const onFinish = async values => {
    try{
      await signIn(values.email, values.password)
    }
    catch{
      setLogged(false)
      setTimeout(()=>{
        setLogged(true)
      }, 3500)
    }
  };


  return (
    <Card title="Login" style={{ width: 650, margin: 'auto', height: '100vh' }}>
      <Form
      style={{width: 350, margin: 'auto'}}
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
          {
            !logged ?
              <p style={{color: 'red'}}>Confira seu login e senha informado!</p>
            : ''
          }
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NormalLoginForm;