import moment from 'moment';
export const formatDateServer = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '';
}

export const momentDateUser = (timeSpan) => {
    return timeSpan ? moment(new Date(Date(timeSpan)).toLocaleDateString(), "MM-DD-YYYY") : '';
}