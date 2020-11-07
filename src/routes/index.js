import Users from '../views/Users.js';
import User from '../views/User.js';
import Login from '../views/Login.js';
//Importar as dependências
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import '../App.css';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useToken } from "../context/Token";
const { Header, Content, Footer, Sider } = Layout;
//Importar as páginas

//Criar o componentes com as rotas
function Routes(){
    const { token } = useToken();
    
    useEffect(() => {
      console.log('Auth', token)
        if (!token && window.location.pathname !== '/login') {
          window.location.assign('/login')
        }
    }, [])

    return(
    <Fragment>
    {
        token ? 
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <a href="/users">
                Usuários
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
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
      </Layout>:
      <BrowserRouter>
        <Route path="/login" component={Login} />
      </BrowserRouter>
    }
    </Fragment>
    );
};

export default Routes;