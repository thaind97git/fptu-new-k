import React, { useState } from 'react';
import { Modal } from 'antd';
import ButtonLayout from './ButtonLayout';
import DialogLayout from './DialogLayout';

const ModelAsycnLayout = ({
    cancelModelText = "Cancel",
    okModelText = "Ok",
    children,
    titleModel = "Title model default",
    PromiseCallAPI,
    titleButton,
    typeButton,
    sizeButton,
    isDisplayDialog = true,
    titleSuccessDialog,
    contentSuccessDialog,
    titleErrorDialog,
    contentErrorDialog
}) => {
    const [visible, setVisible] = useState(false); // Open model
    const [confirmLoading, setConfirmLoading] = useState(false)
    const handleOk = (PromiseCallAPI) => {
        setConfirmLoading(true);
        PromiseCallAPI.then((rs) => {
            setVisible(false)
            setConfirmLoading(false)
            isDisplayDialog && DialogLayout('success', titleSuccessDialog, contentSuccessDialog)
        }, err => {
            setVisible(false)
            setConfirmLoading(false)
            isDisplayDialog && DialogLayout('error', titleErrorDialog, contentErrorDialog)
        })
    };

    return (
        <div>
            <ButtonLayout
                text={titleButton}
                type={typeButton}
                onClick={() => setVisible(true)}
                size={sizeButton}
            />
            <Modal
                title={titleModel}
                cancelText={cancelModelText}
                okText={okModelText}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={() => handleOk(PromiseCallAPI)}
                onCancel={() => setVisible(false)}

            >
                <div>{children}</div>
            </Modal>
        </div>
    );
}

export default ModelAsycnLayout;