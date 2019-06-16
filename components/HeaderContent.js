import { Row, Col } from 'antd';
import SearchLayout from '../layouts/SearchLayout'
const HeaderContent = ({ title, isSearch }) => {
    return (
        <div className="card">
            <Row>
                <Col pull={1} span={24} lg={10}>
                    <h2>{title}</h2>
                </Col>
                {
                    isSearch && (
                        <Col span={24} lg={14}>
                            <Row>
                                <SearchLayout />
                            </Row>
                        </Col>
                    )
                }
            </Row>
            <style jsx>{`
                h2{
                    padding: 10px 0
                }
            `}</style>
        </div>
    )
}
export default HeaderContent;