import React, { Fragment } from 'react';
import { Icon } from 'antd';

const AvatarComponent = ({ url, width =  100, height = 100, size = 64 }) => {
    const styleIcon = {
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${size}px`,
        color: 'white',
        backgroundColor: '#2196f3',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    return (
        <Fragment>
            {
                url ? (
                    <img src={url} alt="" />
                    
                ) : <Icon type="user" style={styleIcon} />
            }
            <style jsx>{`
                img{
                    width: ${width}px;
                    height: ${height}px;
                    border-radius: 50%
                }
            `}</style>
        </Fragment>
    )
}

export default AvatarComponent;