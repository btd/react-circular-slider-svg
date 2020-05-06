import formatNumber from "./number";

const formatCurrency = value => `${formatNumber(value)}\xa0€`;

export default formatCurrency;
