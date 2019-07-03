import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import { Pagination } from 'antd';
import HeaderContent from '../components/HeaderContent';
import * as Utils from '../utils/utils';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DIALOG_SUCCESS } from '../utils/actions';
import { URL_MAJOR } from '../constant/UrlApi';

const connectToRedux = connect(
    null,
    dispatch => ({
        displayDialog: (type, title = "" , content = "") => {
            dispatch({ type: type, payload: { title: title, content: content } })
        }
    })
)

const MajorComponent = ({ displayDialog }) => {
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
            render: (status) => (
                !status ? <ButtonLayout type="outline-success" size="small" text="Active" /> 
                : <ButtonLayout type="outline-danger" size="small" text="Deactive" /> 
            )
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: id => <Fragment>
                <ButtonLayout
                    onClick={() => {
                        displayDialog(DIALOG_SUCCESS, 'abc', 'abc')
                    }} size="small" value={id} type="success" text="View" />
                <ButtonLayout size="small" value={id} type="primary" text="Edit" />
                <ButtonLayout
                    onClick={() => ConfirmLayout({
                        title: 'Delete', content: 'Do you want delete this record ?',
                        okText: 'Delete', cancelText: 'No'
                    })} size="small" value={id} type="danger" text="Delete"
                />
            </Fragment>,
            // width: '20%'
        },
    ];
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${URL_MAJOR.GET_MAJOR}?page_num=${pageIndex}&page_row=${PAGE_SIZE}`)
            .then(({ data }) => {
                if (data) {
                    setIsLoading(false);
                    let src = data.data.result;
                    Utils.mapIndex(src, (pageIndex - 1) * PAGE_SIZE)
                    setDataSrc(src);
                    setTotalPage(data.data.count)
                }
            })
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
                    rowKey={record => record.id} />
                <br />
                <Pagination 
                    onChange={getPage}
                    defaultCurrent={1}
                    total={totalPage} />
            </div>
        </Fragment>
    )
}
export default connectToRedux(MajorComponent);