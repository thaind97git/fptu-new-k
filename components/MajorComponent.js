import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { URL_MAJOR } from '../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';
import * as Utils from '../utils/utils';

import TableComponent from '../components/TableComponent';
import StatusComponent from '../components/StatusComponent';

import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import HeaderContent from '../components/HeaderContent';
import ModalAsycnLayout from '../layouts/ModalAsycnLayout';
const connectToRedux = connect(
    null,
    dispatch => ({
        displayDialog: (type, title = "", content = "") => {
            dispatch({ type: type, payload: { title: title, content: content } })
        },
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message } })
        }
    })
)



const MajorDetail = ({ code, group, name, dateCreated, status, form }) => {
    const { getFieldDecorator } = form;
    return (
        <div>
            <Form>
                Mã ngành
                <Form.Item>
                    {getFieldDecorator('code', { initialValue: code, })(
                        <Input type="text" disabled />
                    )}
                </Form.Item>
                Tên ngành
                <Form.Item>
                    {getFieldDecorator('name', { initialValue: name, })(
                        <Input type="text" />
                    )}
                </Form.Item>
                Nhóm ngành
                <Form.Item>
                    {getFieldDecorator('group', { initialValue: group, })(
                        <Input type="text" />
                    )}
                </Form.Item>
                Ngày tạo
                <Form.Item>
                    {getFieldDecorator('created', { initialValue: dateCreated, })(
                        <Input type="text" disabled />
                    )}
                </Form.Item>
                <Form.Item>
                    Trạng thái {'\u00A0'}{'\u00A0'}
                    {getFieldDecorator('status', {
                        valuePropName: status ? 'checked' : 'unchecked',
                    })(<Checkbox><StatusComponent status={status} /></Checkbox>)}
                </Form.Item>
            </Form>
        </div>
    )
}

const Delete = (id, displayNotify, reFetch, setReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${URL_MAJOR.DELETE_MAJOR}/${id}` })
        .then(({ data }) => {
            if (data && data.status === 200) {
                displayNotify(TOAST_SUCCESS, 'Xóa ngành học thành công !')
                return;
            }
            displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa ngành học thất bại !')
            setReFetch(!reFetch)
            return;
        })
        .catch(() => displayNotify(TOAST_ERROR, 'Xóa ngành học thất bại !'))
}

const MajorComponent = ({ displayNotify, form }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);
    const [reFetch, setReFetch] = useState(false)
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Tên ngành',
            dataIndex: 'name',
        },
        {
            title: 'Mã ngành',
            dataIndex: 'ma_nganh',
            // width: '20%',
        },
        {
            title: 'Nhóm ngành',
            dataIndex: 'nhom_nganh',
        },
        {
            title: 'Tổ hợp môn',
            dataIndex: 'to_hop_mon',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (<StatusComponent status={status} />)
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: (id, row, index) => {
                return (
                    <Fragment>
                        <ModalAsycnLayout
                            titleButton="Edit" sizeButton="small" valueButton={id} typeButton="primary"
                            titleModel={<h3>{row.name}</h3>} okModelText="Save"
                            PromiseCallAPI={requestAPI({ method: 'PUT', url: `${URL_MAJOR.UPDATE_MAJOR}/${id}` })}
                        >
                            {MajorDetail({
                                code: row.ma_nganh,
                                name: row.name,
                                group: row.nhom_nganh,
                                dateCreated: (new Date(+row.created).toLocaleDateString()),
                                status: row.status,
                                form: form
                            })}
                        </ModalAsycnLayout>
                        <ButtonLayout
                            onClick={() => ConfirmLayout({
                                title: 'Delete', content: 'Do you want delete this record ?',
                                okText: 'Delete', cancelText: 'No', functionOk: () => Delete(id, displayNotify, reFetch, setReFetch)
                            })} size="small" value={id} type="danger" text="Delete"
                        />
                    </Fragment>
                )
            },
        },
    ];
    

    useEffect(() => {
        const ac = new AbortController();
        setIsLoading(true);
        const opt = {
            method: 'GET' ,
            url: `${URL_MAJOR.GET_MAJOR}?page_num=${pageIndex}&page_row=${PAGE_SIZE}` 
        }
        requestAPI(opt).then(({ data }) => {
            setIsLoading(false);
            if (data && data.status === 200) {
                let src = data.data.result;
                Utils.mapIndex(src, (pageIndex - 1) * PAGE_SIZE)
                setDataSrc(src);
                setTotalPage(data.data.count)
            }
        })
        return () => ac.abort();
    }, [pageIndex])
    const getPage = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
    }
    return (
        <Fragment>
            <HeaderContent isSearch={true} title="Danh sách ngành học" />
            <div className="padding-table">
                <TableComponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key} />
                <br />
                <Pagination
                    onChange={getPage}
                    defaultCurrent={1}
                    total={totalPage} />
            </div>
        </Fragment>
    )
}
const WrappedMajor = Form.create()(MajorComponent)
export default connectToRedux(WrappedMajor);