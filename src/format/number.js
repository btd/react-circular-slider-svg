const formatNumber = (value, { thousandSeparator = '.' } = {}) => {
  const str = String(value);
  const thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, `$1${thousandSeparator}`)
  );
};

export default formatNumber;
