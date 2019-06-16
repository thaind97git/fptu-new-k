import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import { Pagination } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { URL_USER } from '../constant/UrlApi';
const columns = [
    {
        title: 'No.',
        dataIndex: 'key'
    },
    {
        title: 'Name',
        dataIndex: 'username',
        width: '20%',
    },
    {
        title: 'Roles',
        dataIndex: '_roles',
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Edit',
        dataIndex: 'id',
        render: id => <Fragment>
            <ButtonLayout size="small" value={id} type="success" text="View" />
            <ButtonLayout size="small" value={id} type="primary" text="Edit" />
            <ButtonLayout
                onClick={() => ConfirmLayout({
                    title: 'Delete', content: 'Do you want delete this record ?',
                    okText: 'Delete', cancelText: 'No'
                })}
                size="small"
                value={id}
                type="danger"
                text="Delete"
            />
        </Fragment>,
        width: '20%'
    },
];

const data = [
    {
        id: 1,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 2,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Female',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 3,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Female',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 4,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 5,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 6,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 7,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 8,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 9,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 10,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 11,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    }
]


function Get(pageIndex, pageSize) {
    console.log(pageIndex)
    console.log(pageSize)
}

let currentNo = 0;
data.map(item => {
    currentNo++;
    item.key = currentNo;
})

const fetchData = async (pageSize, pageIndex) => {
    // return await axios.get(URL_USER.ALL_USER, { pageSize: pageSize, pageIndex: pageIndex })
}

class UserComponent extends Component {

    state = {
        data: [],
        pageSize: 10,
        pageIndex: 0,
        isLoading: false
    }

    componentWillMount() {
        const { pageSize, pageIndex } = this.state;
        // fetchData(pageSize, pageIndex).then(rs => this.setState({ data: rs.data.data }))
        // axios.get(URL_USER.ALL_USER, { pageSize: pageSize, pageIndex: pageIndex }).then(rs => this.setState({ data: rs.data.data }))
    }

    changePage = (pageIndex, pageSize) => {
        this.setState({
            pageSize: pageSize,
            pageIndex: pageIndex
        })
    }
    render() {
        const { isLoading, data, pageSize } = this.state
        const pagination = {
            total: 12,
            defaultCurrent: 1,
            pageSize: pageSize,
            onChange: this.changePage
        }

        return (
            <Fragment>
                <HeaderContent isSearch={true} title="Danh sách account" />
                <div className="padding-table">
                    <TableComponent
                        columns={columns}
                        isLoading={isLoading}
                        data={data}
                        rowKey={record => record._id}
                        pagination={pagination} />
                </div>
            </Fragment>
        )
    }
}
export default UserComponent;