import React, { Component, Fragment } from 'react';
import { Layout, Avatar, Typography, Row, Col, Menu, Dropdown, Icon } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import * as storageConfig from '../config/storageConfig';

// import './AppBar.css';

const { Header } = Layout;
const { Title } = Typography;

const logout = () => {
    storageConfig.removeToken();
    Router.push("/login");
}

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                Change password
            </a>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
                <Icon type="logout" />   Logout, thaind
            </a>
        </Menu.Item>
    </Menu>
);

const HeaderComponent = ({ title }) => {
    return (
        <Fragment>
            <Header style={{
                background: '#f57c00',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                position: 'fixed', zIndex: 1, width: '100%', right: 0
            }}>
                <Row>
                    <Col span={23}>
                        <Title level={3} style={{ padding: '10px', color: '#fff' }}>
                            {title}
                        </Title>
                    </Col>
                    <Col span={1}>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Avatar className="avatar" style={{ backgroundColor: '#4caf50' }} size="large" icon="user" />
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        </Fragment>
    )
}
export default HeaderComponent;