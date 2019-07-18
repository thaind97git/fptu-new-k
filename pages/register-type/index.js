import React from 'react';
import authenHOC from '../../HOC/authenHOC';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import TypeRegisterComponent from '../../components/TypeRegisterComponent';

const TypeRegisterLayout = ({}) => (
    <AdminPageLayout>
        <TypeRegisterComponent />
    </AdminPageLayout>
)

export default authenHOC(TypeRegisterLayout)