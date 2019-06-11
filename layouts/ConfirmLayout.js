import { Modal } from 'antd';

const confirm = Modal.confirm;

function defaultFunc(){
    console.log('default confirm !')
}

function ConfirmLayout(
    title = 'Do you want to delete these items?',
    content = 'When clicked the OK button, this dialog will be closed after 1 second',
    okText = "Ok",
    cancelText = "Cancel",
    functionOk
) {
    confirm({
        title: title,
        content: content,
        okText: okText,
        cancelText: cancelText,
        onOk() {
            return (functionOk ? functionOk() : defaultFunc())
        },
        onCancel() { },
    });
}

module.exports = ConfirmLayout;