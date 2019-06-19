import { Fragment } from "react";
import { Layout } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
const { Content, Footer } = Layout;
const AdminContentPageLayout = ({ marginLeft, children }) => {
    return (
        <Fragment>
            <HeaderComponent isCollepse={true} title="FPT University New K" />
            <Layout style={{ marginLeft: marginLeft, minHeight: '100vh' }}>
                <Content style={{ margin: '24px 16px 0', marginTop: 80 }}>
                    <div className="admin-content">
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Abc ©2018 Designed by Front end team</Footer>
            </Layout>
            <style jsx>{`
                    .admin-content {
                        background: #fff;
                        text-align: center
                    }
                `}</style>
        </Fragment>
    )
}
export default AdminContentPageLayout;