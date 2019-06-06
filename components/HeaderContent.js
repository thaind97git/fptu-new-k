import { Fragment } from "react";
import { Input, Row, Col } from 'antd';

const { Search } = Input;

const HeaderContent = ({}) => {
    return (
            <div className="header-content">
                <Row>
                    <Col xs={24}  sm={12} span={12}>
                        <h3>Major Component</h3>
                    </Col>
                    <Col xs={24}  sm={12} span={12}>
                        <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="default"
                        onSearch={value => console.log(value)}
                        />
                    </Col>
                    <Col xs={24}  sm={16} md={8}>
                    
                    </Col>
                </Row>
                <style jsx global>{`
                    .header-content {
                        padding: 10px 0 25px 0
                    }
                `}</style>
            </div>
    )
}
export default HeaderContent;