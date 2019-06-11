import { Modal } from 'antd';

function DialogLayout(type, titleDialog, contentDialog) {
    if (type === "success") { Modal.success({ title: titleDialog, content: contentDialog }) }
    if (type === "error") { Modal.error({ title: titleDialog, content: contentDialog }) }
    if (type === "warning") { Modal.warning({ title: titleDialog, content: contentDialog }) }
    if (type === "info") { Modal.info({ title: titleDialog, content: contentDialog }) }
}

export default DialogLayout;