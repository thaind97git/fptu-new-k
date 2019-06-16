import { toast } from 'react-toastify';

export const successToast = ( msg, option ) => {
    return toast.success(msg, option);
}

export const errorToast = ( msg, option ) => {
    return toast.error(msg, option);
}

export const warnToast = ( msg, option ) => {
    return toast.warn(msg, option);
}