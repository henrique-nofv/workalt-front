import React from 'react';
import { Fragment } from "react";
import { Layout, Menu } from 'antd';
const { Header } = Layout;

function TopBar() {
    return (
        <Fragment>
            < Header className="header" >
                <Fragment className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Inicio</Menu.Item>
                </Menu>
            </Header >
        </Fragment>
    )
}

export default TopBar;
