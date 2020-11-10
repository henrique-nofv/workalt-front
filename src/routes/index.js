import Users from '../views/Users.js';
import User from '../views/User.js';
import Login from '../views/Login.js';
//Importar as dependências
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../App.css';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useToken } from "../context/Token";
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

function Routes() {
  const { token, signOut } = useToken();
  
  return (
    <div>
      {
        token ?
          <Layout style={{height: '100vh'}}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              >
              <Header style={{color: 'white'}}>Workalt</Header>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <a href="/users">
                    Usuários
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <Button type="link" style={{width: '100%'}}  onClick={signOut} icon={<PoweroffOutlined />}>
                    Sair
                  </Button>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '24px 16px 0', height: '77.3vh' }}>

                <BrowserRouter>
                  <Switch>
                    <Route path="/" exact component={Users} />
                    <Route path="/user/:id" component={User} />
                    <Route path="/users" exact component={Users} />
                  </Switch>
                </BrowserRouter>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Workalt</Footer>
            </Layout>
          </Layout> :
          <BrowserRouter>
            <div style={{backgroundColor: '#001529', height: '100vh'}}>
              <Route  path="*" component={Login} />
            </div>
          </BrowserRouter>
      }
    </div>
  );
};

export default Routes;