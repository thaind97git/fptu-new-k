import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Pagination, Icon } from 'antd';

import { requestAPI } from '../config';
import { FETCH_LOADING } from '../store/UtilsState';
import { GET_METHOD_REGISTER } from '../constant/UrlApi';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DIALOG_ERROR, DIALOG_INFO, DIALOG_WARN, DIALOG_SUCCESS } from '../utils/actions';

import * as Utils from '../utils/utils';
import HeaderContent from './HeaderContent';
import Tablecomponent from './TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ModalAsycnLayout from '../layouts/ModalAsycnLayout';
import StatusComponent from './StatusComponent';
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

const MethodRegisterComponent = ({ isLoading, setIsLoading, displayDialog }) => {
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
            title: 'Code',
            dataIndex: 'code',
            render: code => 
                <ButtonLayout 
                    onClick={() => displayDialog(DIALOG_SUCCESS, 'Code: ', <RenderColumnComponent content={code} />)} 
                    size="small" 
                    text={<Icon type="plus-circle" theme="twoTone" />} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Major',
            dataIndex: 'major',
            render: major => <RenderColumnComponent content={major} />
            // width: '20%',
        },
        {
            title: 'School',
            dataIndex: 'school',
            render: school => <RenderColumnComponent content={school} />
        },
        {
            title: 'Subject combination',
            dataIndex: 'to_hop_mon',
        },
        {
            title: 'Total point',
            dataIndex: 'tong_diem',
            render: totalPoint => <RenderColumnComponent content={totalPoint} />
        },
        {
            title: 'Result',
            dataIndex: 'ket_qua.name',
            render: result => <RenderColumnComponent content={result} />
        },
        {
            title: 'Exam',
            dataIndex: 'ky_thi',
            render: exam => 
                <ButtonLayout 
                    isDisabled={true}
                    onClick={() => {}} 
                    size="small" 
                    text={<Icon type="plus-circle" theme="twoTone" />} />
        },
        {
            title: 'Email',
            dataIndex: 'email_lien_he',
            render: email => <RenderColumnComponent content={email} />
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            render: phone => <RenderColumnComponent content={phone} />
        },
        {
            title: 'Date create',
            dataIndex: 'created',
            render: created => <RenderColumnComponent type="date" content={created} />
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
                            titleButton={<Icon type="edit" />} sizeButton="small" valueButton={id} typeButton="primary"
                            titleModel={<h3>{row.name}</h3>} okModelText="Save"
                            // PromiseCallAPI={requestAPI({ method: 'PUT', url: `${UPDATE_MAJOR}/${id}` })}
                        >
                            {/* { MajorDetail({ row: row, form: form })} */}
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
        setIsLoading(FETCH_LOADING, true);
        const opt = {
            method: 'GET' ,
            url: `${GET_METHOD_REGISTER}?page_num=${pageIndex}&page_row=${PAGE_SIZE}` 
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * PAGE_SIZE)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(FETCH_LOADING, false);

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
            <HeaderContent isSearch={true} title="List method register" />
            <div className="padding-table">
                <Tablecomponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key}
                    scrollX={1600}/>
                <br />
                <Pagination
                    onChange={getPage}
                    defaultCurrent={1}
                    total={totalPage} />
            </div>
        </Fragment>
    )
}

export default connectToRedux(MethodRegisterComponent)