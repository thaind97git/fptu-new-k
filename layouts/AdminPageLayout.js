import React, { Fragment } from 'react';
import { Layout } from 'antd';
import NavComponent from '../components/NavComponent';
import HeaderComponent from '../components/HeaderComponent';

const { Sider, Content, Footer } = Layout;
const AdminPageLayout = ({ children }) => {
    return (
        <Fragment>
            <Layout >
                <span id="nav-menu">
                    <Sider width={250} style={{
                        overflowY: 'hidden',
                        overflowX: 'hidden',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        paddingTop: '5%'
                    }}>
                        <img src="/static/image/lo_fug.jpg" className="logo" />
                        <NavComponent />
                    </Sider>
                </span>
                <Layout style={{ marginLeft: 250, minHeight: '100vh' }}>
                    <HeaderComponent title="FPT University New K" />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial', marginTop: 80 }}>
                        <div className="admin-content">
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Abc ©2018 Designed by Front end team</Footer>
                </Layout>
            </Layout>
            <style jsx>{`
                    .admin-content {
                        background: #fff;
                        text-align: center
                    }
                    .logo {
                        width: 100%;
                        padding: 10px
                    }
                `}</style>
        </Fragment>
    )
}

export default AdminPageLayout;