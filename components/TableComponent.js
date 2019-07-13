import { Table } from 'antd';
import { Fragment } from 'react';

const Tablecomponent = ({ 
    columns,
    data,
    handleTableChange,
    isLoading,
    pagination,
    rowKey,
    scrollX = '',
    scrollY = ''
}) => {
    return (
        <Fragment>
            <Table
                style={{overflowX: 'auto'}}
                columns={columns}
                rowKey={rowKey}
                dataSource={data}
                pagination={pagination || false }
                loading={isLoading}
                onChange={handleTableChange}
                scroll={{ x: scrollX, y: scrollY }}
            />
        </Fragment>
    )
}
export default Tablecomponent;