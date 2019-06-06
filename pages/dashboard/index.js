import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import Button from '../../layouts/ButtonLayout';
const DashboardPage = (rootProps) => {
    return (
        <AdminPageLayout>
            Dashboard Component
            <Button text="Success" type="success" />
            <Button text="Primary" type="primary" />
            <Button text="Danger" type="danger" />
            <Button text="Default" type="default" />
        </AdminPageLayout>
    )
}

export default AuthenHOC(DashboardPage)