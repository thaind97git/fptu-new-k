import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox, Icon } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { GET_STUDENTS, DELETE_STUDENT, UPDATE_STUDENT } from '../constant/UrlApi';
import { FETCH_LOADING } from '../store/UtilsState';
import { TOAST_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';
import * as Utils from '../utils/utils';
import Link from 'next/link';

import TableComponent from '../components/TableComponent';
import StatusComponent from '../components/StatusComponent';

import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import HeaderContent from '../components/HeaderContent';
import ModalAsycnLayout from '../layouts/ModalAsycnLayout';
import AvatarComponent from './AvatarComponent';
import RenderColumnComponent from './RenderComlunComponent';

const connectToRedux = connect(
    pick(['isLoading']),
    dispatch => ({
        displayDialog: (type, title = "", content = "") => {
            dispatch({ type: type, payload: { title: title, content: content } })
        },
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message } })
        },
        setIsLoading: (type, isLoading) => {
            dispatch({ type: type, payload: { isLoading: isLoading } })
        }
    })
)

const StudentDetail = ({ row = {}, form }) => {
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
    requestAPI({method: 'DELETE' ,url: `${DELETE_STUDENT}/${id}` })
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

const StudentComponent = ({ displayNotify, isLoading, setIsLoading }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: avatar => <RenderColumnComponent type="avatar" content={avatar} />
        },
        {
            title: 'Student name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Birthday',
            dataIndex: 'ngay_sinh',
            render: bDate => <RenderColumnComponent type="date" content={bDate} />
            // width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: email => <RenderColumnComponent content={email} />
        },
        {
            title: 'Full Address',
            dataIndex: 'dia_chi_day_du',
            render: address => <RenderColumnComponent content={address} />
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            render: phone => <RenderColumnComponent content={phone} />
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => <StatusComponent status={status} />
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: (id, row, index) => {
                return (
                    <Fragment>
                        <Link href={"/student/detail?id=" + id} >
                        <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
                        </Link>
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
        setIsLoading(FETCH_LOADING, true);
        const opt = {
            method: 'GET' ,
            url: `${GET_STUDENTS}?page_num=${pageIndex}&page_row=${PAGE_SIZE}` 
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                setIsLoading(FETCH_LOADING, false);
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
            <HeaderContent isSearch={true} title="List of students" />
            <div className="padding-table">
                <TableComponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key}
                    scrollX={1100}/>
                <br />
                <Pagination
                    onChange={getPage}
                    defaultCurrent={1}
                    total={totalPage} />
            </div>
        </Fragment>
    )
}
export default connectToRedux(StudentComponent);