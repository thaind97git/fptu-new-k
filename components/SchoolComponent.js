import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Icon } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { GET_SCHOOLS, DELETE_SCHOOL } from '../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';
import * as Utils from '../utils/utils';
import Link from 'next/link';

import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import HeaderContent from '../components/HeaderContent';
import RenderColumnComponent from './RenderComlunComponent';

const connectToRedux = connect(
    pick(['']),
    dispatch => ({
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message, options: {} } })
        },
        displayDialog: (type, title, content, onOK) => {
            dispatch({ type: type, payload: { title: title, content: content, onOK } })
        },
    })
)


const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${DELETE_SCHOOL}/${id}` })
        .then(({ data }) => {
            if (data && data.status === 200) {
                displayNotify(TOAST_SUCCESS, 'Xóa trường học thành công !')
                setIsReFetch(!isReFetch);
            } else {
                displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa trường học thất bại !')
            }
            return;
        })
        .catch(() => displayNotify(TOAST_ERROR, 'Xóa trường học thất bại !'))
}

const StudentComponent = ({ displayNotify }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'School name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Date create',
            dataIndex: 'created',
            render: created => <RenderColumnComponent type="date" content={created} />
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: (id, row, index) => {
                return (
                    <Fragment>
                        <Link href={"/school/detail?id=" + id} >
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
        setIsLoading(true);
        const opt = {
            method: 'GET' ,
            url: `${GET_SCHOOLS}?page_num=${pageIndex}&page_row=${pageSize}` 
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                setIsLoading(false);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * pageSize)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }

        }
        !didCancel && fetchData()
        return () => {
            didCancel = true;
        }
    }, [pageIndex, isReFetch, pageSize])
    const getPage = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
    }

    return (
        <Fragment>
            <HeaderContent 
                title="List of schools"
                isPageSize={true}
                getPageSize={setPageSize} />
            <div className="padding-table">
                <TableComponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key} 
                    pageSize={pageSize}
                    onChangePage={getPage}
                    totalPage={totalPage}/>
            </div>
        </Fragment>
    )
}
export default connectToRedux(StudentComponent);