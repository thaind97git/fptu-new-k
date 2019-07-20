import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Pagination, Icon, Row, Input, Select } from 'antd';
import { requestAPI } from '../config';
import { GET_FORM_REGISTER, UPDATE_RESULT_FORM } from '../constant/UrlApi';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DIALOG_INFO, TOAST_SUCCESS, TOAST_ERROR, DIALOG_SUCCESS } from '../utils/actions';
import { isEmptyObject } from '../utils/utils'
import { momentTimeSpanInput } from '../utils/dateUtils';
import Link from 'next/link';

import * as Utils from '../utils/utils';
import HeaderContent from './HeaderContent';
import Tablecomponent from './TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import RenderColumnComponent from './RenderComlunComponent';

const { Option } = Select;
const connectToRedux = connect(
    pick(['']),
    dispatch => ({
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message, options: {} } })
        },
        displayDialog: (type, title, content, onOK, okText) => {
            dispatch({ type: type, payload: { title, content, onOK, okText } })
        }
    })
)

const UpdateResult = ({
    id,
    displayDialog,
    displayNotify,
    isReFetch,
    setIsReFetch,
    currentValue
}) => {
    return (
        displayDialog(
            DIALOG_INFO,
            'Update result for form register',
            (<Row>
                <Select style={{ width: '100%' }} defaultValue={currentValue} onChange={(e) => currentValue = e}>
                    <Option value="pass">Pass</Option>
                    <Option value="fail">Fail</Option>
                </Select>
            </Row>),
            () => {
                const opt = {
                    method: 'PUT',
                    url: `${UPDATE_RESULT_FORM}/${id}/ket-qua`,
                    data: {
                        name: currentValue
                    }
                }
                if (currentValue === undefined) {
                    displayNotify(TOAST_ERROR, 'Cập nhật kết quả thất bại !')
                    return;
                }
                requestAPI(opt).then(({ data }) => {
                    if (data && data.status === 200) {
                        setIsReFetch(!isReFetch);
                        displayNotify(TOAST_SUCCESS, 'Cập nhật kết quả thành công !')
                    } else {
                        displayNotify(TOAST_ERROR, data.errorMessage || 'Cập nhật kết quả thất bại !')
                    }
                    return;
                })
                    .catch(() => displayNotify(TOAST_ERROR, 'Cập nhật kết quả thất bại !'))
            }
        , 'Update result')
    )
}

const DetailExample = ({ ky_thi, displayDialog }) => {
    return (
        displayDialog(DIALOG_INFO, 'Detail exam',
            <Fragment>
                <Row>
                    Exam name:
                    <Input disabled defaultValue={ky_thi.name} />
                </Row>
                <br/>
                <Row>
                    Test time:
                    <Input disabled defaultValue={ky_thi.gio_thi} />
                </Row>
                <br/>
                <Row>
                    Test date:
                    <Input disabled defaultValue={ky_thi.ngay_thi} />
                </Row>
                <br/>
                <Row>
                    Start date:
                    <Input disabled defaultValue={momentTimeSpanInput(ky_thi.ngay_bat_dau)} />
                </Row>
                <br/>
                <Row>
                    End date:
                    <Input disabled defaultValue={momentTimeSpanInput(ky_thi.ngay_ket_thuc)} />
                </Row>
                <br/>
                <Row>
                    Type exam:
                    <Input disabled defaultValue={ky_thi.loai_ky_thi} />
                </Row>
            </Fragment>
        )
    )
}

const MethodRegisterComponent = ({ displayDialog, displayNotify }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);
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
            render: code => //<RenderColumnComponent content={code} />
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
            render: (result, row, index) => (
                <Row>
                    <Row style={{ textAlign: 'center' }}>
                        <RenderColumnComponent type="result" content={result} />
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <ButtonLayout
                            onClick={() =>
                                UpdateResult({
                                    id: row.id,
                                    displayDialog,
                                    displayNotify,
                                    isReFetch,
                                    setIsReFetch,
                                    currentValue: result
                                })
                            }
                            type="primary" size="small" text="Update" />
                    </Row>
                </Row>
            )
        },
        {
            title: 'Exam',
            dataIndex: 'ky_thi',
            render: exam => isEmptyObject(exam) ? 
                <Row style={{ textAlign: 'center' }}><ButtonLayout size="small" text="Update exam" /></Row> :
                <Row style={{ textAlign: 'center' }}> <ButtonLayout
                    isDisabled={false}
                    onClick={() => DetailExample({ky_thi: exam, displayDialog})}
                    size="small"
                    type="primary"
                    text=" View detail " /></Row>
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
        // {
        //     title: 'Edit',
        //     dataIndex: 'id',
        //     render: (id, row, index) => {
        //         return (
        //             <Fragment>
        //                 <Link href={"/regiter-form/detail?id=" + id} >
        //                     <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
        //                 </Link>
        //             </Fragment>
        //         )
        //     },
        // },
    ];


    useEffect(() => {
        let didCancel = false;
        setIsLoading(true);
        const opt = {
            method: 'GET',
            url: `${GET_FORM_REGISTER}?page_num=${pageIndex}&page_row=${pageSize}`
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * pageSize)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);

        }
        !didCancel && fetchData()
        return () => {
            didCancel = true;
        };
    }, [pageIndex, isReFetch, pageSize])
    const getPage = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
    }
    return (
        <Fragment>
            <HeaderContent
                isPageSize={true}
                getPageSize={setPageSize}
                title="List register form" />
            <div className="padding-table">
                <Tablecomponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key}
                    scrollX={1600}
                    pageSize={pageSize}
                    onChangePage={getPage}
                    totalPage={totalPage} />
            </div>
        </Fragment>
    )
}

export default connectToRedux(MethodRegisterComponent)