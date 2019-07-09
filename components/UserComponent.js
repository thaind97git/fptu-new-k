import React, { Component, Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DELETE_USER, GET_USERS, UPDATE_USER } from '../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';
import * as Utils from '../utils/utils';

import AvatarComponent from './AvatarComponent';
import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import HeaderContent from '../components/HeaderContent';
import StatusComponent from '../components/StatusComponent';
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

const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${DELETE_USER}/${id}` })
        .then(({ data }) => {
            if (data && data.status === 200) {
                displayNotify(TOAST_SUCCESS, 'Xóa user thành công !')
                setIsReFetch(!isReFetch);
            } else {
                displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa user thất bại !')
            }
            return;
        })
        .catch(() => displayNotify(TOAST_ERROR, 'Xóa user thất bại !'))
}

const UserComponent = ({ displayNotify }) => {
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
            title: 'Avatar',
            dataIndex: 'avatar',
            render: avatar => <AvatarComponent url={avatar} size={20} width={30} height={30} />
        },
        {
            title: 'Tên user',
            dataIndex: 'name',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioi_tinh',
            render: sex => sex === 0 ? 'Male' : sex === 1 ? 'Fmale' : 'không có'
            // width: '20%',
        },
        {
            title: 'email',
            dataIndex: 'email',
            render: email => email ? email : 'không có'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: address => address ? address : 'không có'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => ( <StatusComponent status={status} /> )
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
                        // PromiseCallAPI={axios.put(`${UPDATE_MAJOR}/:${id}`)}
                        >
                            {/* {MajorDetail({
                                code: row.ma_nganh,
                                name: row.name,
                                group: row.nhom_nganh,
                                dateCreated: (new Date(+row.created).toLocaleDateString()),
                                status: row.status,
                                form: form
                            })} */}
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
            url: `${GET_USERS}?page_num=${pageIndex}&page_row=${PAGE_SIZE}`
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
            <HeaderContent isSearch={true} title="Danh sách User" />
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
export default connectToRedux(UserComponent);