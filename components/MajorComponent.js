import React, { Component, Fragment } from 'react';
import TableComponent from '../components/TableComponent';
import Button from '../layouts/ButtonLayout';
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
                <Button value={id} type="success" text="View" />
                <Button value={id} type="primary" text="Edit" />
                <Button value={id} type="danger" text="Delete" />
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

let key;
class MajorComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNo: 0,
            totalRecord: 10
        }
    }
    componentWillMount() {
        const { currentNo } = this.state;
        key = currentNo;
        data.map(item => {
            key++;
            item.key = key;
        })
    }
    render() {
        
        return (
            <Fragment>
                <HeaderContent />
                <TableComponent columns={columns} isLoading={false} data={data} rowKey={record => record.id} pagination={pagination}  />
            </Fragment>
        )
    }
}
export default MajorComponent;