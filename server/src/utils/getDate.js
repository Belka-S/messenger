const getDate = () =>
  new Date().toLocaleDateString('en-CA', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

module.exports = getDate;
