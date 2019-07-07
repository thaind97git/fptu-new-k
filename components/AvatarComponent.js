import React, { Fragment } from 'react';

const AvatarComponent = ({ url, width =  100, height = 100 }) => {
    return (
        <Fragment>
            url ? (
            <img src={url} alt="" />
            
        ) : <Icon type="user" />
            <style jsx>{`
                img{
                    width: ${width}px;
                    height: ${height}px
                }
            `}</style>
        </Fragment>
    )
}

export default AvatarComponent;