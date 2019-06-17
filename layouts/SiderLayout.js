import { useState, useEffect } from 'react';
;import MediaQuery from 'react-responsive';
import NavComponent from '../components/NavComponent';
import { Fragment } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';

const connectToRedux = connect(pick(['isOpenMenu']), null)

const { Sider } = Layout;
const widthMenu = 250;
const styleSider = {
    overflowY: 'hidden', overflowX: 'hidden', position: 'fixed',
    height: '100vh', paddingTop: 63
}
const SiderLayout = ({isOpenMenu}) => {
    const [leftMenu, setLeftMenu] = useState(widthMenu);
    useEffect(() => {
        isOpenMenu ? setLeftMenu(0) : setLeftMenu(-widthMenu)
        console.log(leftMenu)
    }, [isOpenMenu])
    return (
        <Fragment>
            {/* <MediaQuery minWidth={1824}> */}
                <Sider width={widthMenu} style={{ left: leftMenu }} style={styleSider}>
                    <img src="/static/image/lo_fug.jpg" className="logo" />
                    <NavComponent />
                </Sider>
            {/* </MediaQuery> */}
            {/* <MediaQuery minWidth={1224}>
                <Sider width={widthMenu} style={{ left: -widthMenu }} style={styleSider}>
                    <img src="/static/image/lo_fug.jpg" className="logo" />
                    <NavComponent />
                </Sider>
            </MediaQuery> */}
            <style jsx>{`
                    .logo {
                        width: 100%;
                        padding: 6px
                    }
                `}</style>
        </Fragment>
    )
}

export default connectToRedux(SiderLayout);