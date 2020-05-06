import moment from 'moment';

const formatDate = (value) => moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY');

export default formatDate;
