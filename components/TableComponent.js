import { Table } from 'antd';
import { Fragment } from 'react';

const Tablecomponent = ({ columns, data, handleTableChange, isLoading, pagination, rowKey }) => {
    return (
        <Fragment>
            <Table
                columns={columns}
                rowKey={rowKey}
                dataSource={data}
                pagination={pagination || {}}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </Fragment>
    )
}
export default Tablecomponent;