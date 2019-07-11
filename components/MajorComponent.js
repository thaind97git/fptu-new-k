import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox, Icon } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DELETE_MAJOR, GET_MAJOR, UPDATE_MAJOR } from '../constant/UrlApi';
import { FETCH_LOADING } from '../store/UtilsState';
import { TOAST_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';
import * as Utils from '../utils/utils';
import Link from 'next/link';

import TableComponent from './TableComponent';
import StatusComponent from './StatusComponent';

import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import HeaderContent from './HeaderContent';
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

const MajorComponent = ({ displayNotify, form, isLoading, setIsLoading }) => {
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
            title: 'Major name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Major code',
            dataIndex: 'ma_nganh',
            render: code => <RenderColumnComponent content={code} />
            // width: '20%',
        },
        {
            title: 'Major group',
            dataIndex: 'nhom_nganh',
            render: group => <RenderColumnComponent content={group} />
        },
        {
            title: 'Subject combination',
            dataIndex: 'to_hop_mon',
            render: x => <RenderColumnComponent content={x} />
        },
        {
            title: 'Date create',
            dataIndex: 'created',
            render: bDate => <RenderColumnComponent type="date" content={bDate} />
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
                        <Link href={"/major/detail?id=" + id} >
                        <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
                        </Link>
                        <ButtonLayout
                            onClick={() => ConfirmLayout({
                                title: 'Delete', content: 'Do you want delete this record ?',
                                okText: 'Delete', cancelText: 'No', 
                                functionOk: () => Delete(id, displayNotify, isReFetch, setIsReFetch)
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
            url: `${GET_MAJOR}?page_num=${pageIndex}&page_row=${PAGE_SIZE}` 
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
            <HeaderContent isSearch={true} title="List of majors" />
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