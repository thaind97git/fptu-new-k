import ButtonLayout from '../layouts/ButtonLayout';
import ModelAsycnLayout from '../layouts/ModelAsycnLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import DialogLayout from '../layouts/DialogLayout';
import { Fragment } from 'react';
import axios from 'axios';
import { URL_USER } from '../constant/UrlApi';

const DashboardComponent = ({ }) => {
    return (
        <Fragment>
            <div className="padding-table">
                Dashboard Component
                <div>{process.env.NODE_ENV}</div>
                <ButtonLayout onClick={() => DialogLayout('success', 'Success', 'completed !')} text="Success" type="success" />
                <ButtonLayout onClick={() => ConfirmLayout({})} text="Primary" type="primary" />
                <ButtonLayout onClick={() => DialogLayout('error', 'Error', 'something wrong !')} text="Danger" type="danger" />
                <ButtonLayout text="Default" type="default" />

                {/* <ModelAsycnLayout
                    titleModel={<h3>Here is model example about asycn</h3>}
                    okModelText="Save"
                    cancelModelText="Cancel"
                    PromiseCallAPI={axios.get(URL_USER.ALL_USER)}
                    titleButton="Open Modal with async logic"
                    typeButton="primary"
                    sizeButton="middle"
                    titleSuccessDialog={<h1>Success</h1>}
                    contentErrorDialog="Completed !"
                    titleErrorDialog={<h2>Error</h2>}
                    contentErrorDialog="Something wrong !"
                >
                    <h1>ModelComponent</h1>
                </ModelAsycnLayout> */}
            </div>
        </Fragment>
    )
}

export default DashboardComponent;