import React, { Fragment } from 'react';
import AvatarComponent from '../components/AvatarComponent';
import StatusComponent from './StatusComponent';
const RenderColumnComponent = ({
    type = 'text',
    content
}) => {

    return (
        <Fragment>
            {
                  type === 'date' ? (new Date(Date(+content)).toLocaleDateString())
                : type === 'avatar' ? <AvatarComponent url={content} size={20} width={30} height={30} />
                : type === 'sex' ? (
                    content === 0 ? 'Male' : content === 1 ? 'Fmale' 
                    : <div className="unknow">Not yet</div>
                )
                : type === 'status' ? <StatusComponent status={status} />
                : content ? content : <div className="unknow">Not yet</div>
            }
        </Fragment>
    )

}
export default RenderColumnComponent;