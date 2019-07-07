import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import { Pagination } from 'antd';
import HeaderContent from '../components/HeaderContent';
import StatusComponent from '../components/StatusComponent';
import * as Utils from '../utils/utils';
import { REQUEST_OPTION_DEFAULT } from '../config/options';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { URL_USER } from '../constant/UrlApi';
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

const UserComponent = ({}) => {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
        },
        {
            title: 'Tên user',
            dataIndex: 'name',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioi_tinh',
            // width: '20%',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
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
                        // PromiseCallAPI={axios.put(`${URL_MAJOR.UPDATE_MAJOR}/:${id}`)}
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
                                okText: 'Delete', cancelText: 'No', functionOk: () => Delete(id, displayNotify)
                            })} size="small" value={id} type="danger" text="Delete"
                        />
                    </Fragment>
                )
            },
        },
    ];
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const ac = new AbortController();
        setIsLoading(true);
        const opt = {
            method: "GET"
        }
        axios(`${URL_USER.GET_USERS}?page_num=${pageIndex}&page_row=${PAGE_SIZE}`,
            Object.assign(REQUEST_OPTION_DEFAULT, opt))
            .then(({ data }) => {
                if (data) {
                    setIsLoading(false);
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