import React, { Component, Fragment, useState, useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import { Pagination } from 'antd';
import HeaderContent from '../components/HeaderContent';
const columns = [
    {
        title: 'No.',
        dataIndex: 'key'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
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
                onClick={() => ConfirmLayout({title: 'Delete', content: 'Do you want delete this record ?', 
                 okText: 'Delete', cancelText: 'No'})}
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

const pagination = {
    total: data.length,
    defaultCurrent: 1
}

function Get(page, pageSize) {
    console.log(page)
    console.log(pageSize)
}

let currentNo = 0;
data.map(item => {
    currentNo++;
    item.key = currentNo;
})
const UserComponent = ({ }) => {

    const pageSize = 10;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
    }, [])

    return (
        <Fragment>
            <HeaderContent isSearch={true} title="Danh sách account" />
            <div className="padding-table">
                <TableComponent columns={columns} isLoading={isLoading} data={data} rowKey={record => record.id} />
                <br />
                <Pagination onChange={Get} defaultCurrent={1} total={data.length} />
            </div>
        </Fragment>
    )
}
export default UserComponent;