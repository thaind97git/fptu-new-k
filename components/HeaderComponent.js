import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Avatar, Row, Col, Menu, Dropdown, Icon } from 'antd';
import Router from 'next/router';
import * as storageConfig from '../config/storageConfig';
import * as toast from '../libs/Toast';
const { Header } = Layout;
import { URL_USER } from '../constant/UrlApi';


const logout = async () => {
    axios.get(URL_USER.LOGOUT)
        .then(rs => {
            const resp = rs.data;
            if (resp.status === 200) {
                storageConfig.removeUsername();
                Router.push("/login");
            } else {
                toast.errorToast('Có lỗi không xác định !')
            }
        })
        .catch(err => {
            toast.errorToast('Có lỗi không xác định !')
        })
}


const menu = (username) => {
    return (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    Change password
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={logout} target="_blank" rel="noopener noreferrer">
                    <Icon type="logout" />   Logout, {username}
                </a>
            </Menu.Item>
        </Menu>
    )
}


const HeaderComponent = ({ title }) => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        setUsername(storageConfig.getUsername())
    })
    return (
        <Fragment>
            <Header style={{
                background: '#6288e7',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                position: 'fixed', zIndex: 1, width: '100%', right: 0
            }}>
                <Row>
                    <Col span={23}>
                        <h2 className="title">{title}</h2>
                    </Col>
                    <Col span={1}>
                        <Dropdown overlay={menu(username)} placement="bottomRight">
                            <Avatar style={{cursor: 'pointer'}} size="default" icon="user" />
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
            <style jsx>{`
                .title{
                    color: #fff;
                }
            `}</style>
        </Fragment>
    )
}
export default HeaderComponent;