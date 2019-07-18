import React, { Fragment } from 'react';
import AvatarComponent from '../components/AvatarComponent';
import StatusComponent from './StatusComponent';
import { momentDateUser, momentTimeSpanInput } from '../utils/dateUtils';
import ButtonLayout from '../layouts/ButtonLayout';
const RenderColumnComponent = ({
    type = 'text',
    content
}) => {

    return (
        <Fragment>
            {
                  type === 'date' ? content ? momentDateUser(content) : <div className="unknow">Not yet</div>
                : type === 'bDate' ? content ? momentTimeSpanInput(content) : <div className="unknow">Not yet</div> 
                : type === 'avatar' ? <AvatarComponent small url={content} small />
                : type === 'result' ? (
                      content === 'pass' ? <ButtonLayout type="outline-success" size="small" text={content} />
                    : content === 'fail' ? <ButtonLayout type="outline-danger" size="small" text={content} />
                    : <div className="unknow">Not yet</div>
                )
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