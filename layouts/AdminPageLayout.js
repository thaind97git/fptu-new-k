import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import MediaQuery from 'react-responsive';
import SiderLayout from './SiderLayout';
import { WIDTH_MENU, RESPONSIVE_MENU } from '../constant/constants';
import AdminContentPageLayout from './AdminContentPageLayout';
const connectToRedux = connect(pick(['isOpenMenu']))
const AdminPageLayout = ({ children, isOpenMenu }) => {
    let marginLeft = isOpenMenu ? 0 : WIDTH_MENU;
    return (
        <Layout >
            <SiderLayout />
            <MediaQuery minWidth={RESPONSIVE_MENU}>
                <AdminContentPageLayout marginLeft={marginLeft} >
                    {children}
                </AdminContentPageLayout>
            </MediaQuery>
            <MediaQuery maxWidth={RESPONSIVE_MENU}>
                <AdminContentPageLayout marginLeft={0} >
                    {children}
                </AdminContentPageLayout>
            </MediaQuery>
        </Layout>
    )
}

export default connectToRedux(AdminPageLayout);