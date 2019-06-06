import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import NavComponent from '../components/NavComponent';
import HeaderComponent from '../components/HeaderComponent';

const { Sider, Content, Footer } = Layout;
class AdminPageLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <Fragment>
                <Layout >
                    <Sider width={250} style={{
                        overflowY: 'hidden',
                        overflowX: 'hidden',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        paddingTop: 120
                    }}>
                        <div className="logo" />
                        <NavComponent />
                    </Sider>
                    <Layout style={{ marginLeft: 250, minHeight: '100vh' }}>
                        <HeaderComponent title="FPT University New K" />
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial', marginTop: 80 }}>
                            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                                {children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Abc ©2018 Designed by Front end team</Footer>
                    </Layout>
                </Layout>
                
            </Fragment>
        )
    }
}

export default AdminPageLayout;