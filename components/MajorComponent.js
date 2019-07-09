import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DELETE_MAJOR, GET_MAJOR, UPDATE_MAJOR } from '../constant/UrlApi';
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



const MajorDetail = ({ row = {}, form }) => {
    const { getFieldDecorator } = form;
    return (
        <div>
            <Form>
                Mã ngành
                <Form.Item>
                    {getFieldDecorator('code', { initialValue: row.ma_nganh, })(
                        <Input type="text" disabled />
                    )}
                </Form.Item>
                Tên ngành
                <Form.Item>
                    {getFieldDecorator('name', { initialValue: row.name, })(
                        <Input type="text" />
                    )}
                </Form.Item>
                Nhóm ngành
                <Form.Item>
                    {getFieldDecorator('group', { initialValue: row.nhom_nganh, })(
                        <Input type="text" />
                    )}
                </Form.Item>
                Ngày tạo
                <Form.Item>
                    {getFieldDecorator('created', { initialValue: new Date(+row.created).toLocaleDateString() })(
                        <Input type="text" disabled />
                    )}
                </Form.Item>
                <Form.Item>
                    Trạng thái {'\u00A0'}{'\u00A0'}
                    {getFieldDecorator('status', {
                        valuePropName: row.status ? 'checked' : 'unchecked',
                    })(<Checkbox><StatusComponent status={row.status} /></Checkbox>)}
                </Form.Item>
            </Form>
        </div>
    )
}

const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${DELETE_MAJOR}/${id}` })
        .then(({ data }) => {
            if (data && data.status === 200) {
                displayNotify(TOAST_SUCCESS, 'Xóa ngành học thành công !')
                setIsReFetch(!isReFetch);
            } else {
                displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa ngành học thất bại !')
            }
            return;
        })
        .catch(() => displayNotify(TOAST_ERROR, 'Xóa ngành học thất bại !'))
}

const MajorComponent = ({ displayNotify, form }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);
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
                            // PromiseCallAPI={requestAPI({ method: 'PUT', url: `${UPDATE_MAJOR}/${id}` })}
                        >
                            { MajorDetail({ row: row, form: form })}
                        </ModalAsycnLayout>
                        <ButtonLayout
                            onClick={() => ConfirmLayout({
                                title: 'Delete', content: 'Do you want delete this record ?',
                                okText: 'Delete', cancelText: 'No', functionOk: () => Delete(id, displayNotify, isReFetch, setIsReFetch)
                            })} size="small" value={id} type="danger" text="Delete"
                        />
                    </Fragment>
                )
            },
        },
    ];
    

    useEffect(() => {
        let didCancel = false;
        setIsLoading(true);
        const opt = {
            method: 'GET' ,
            url: `${GET_MAJOR}?page_num=${pageIndex}&page_row=${PAGE_SIZE}` 
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                setIsLoading(false);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * PAGE_SIZE)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }

        }
        !didCancel && fetchData()
        return () => {
            didCancel = true;
        };
    }, [pageIndex, isReFetch])
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