export const getDate = () => {
  const date = new Date();
  const ms = Number(date).toString();
  const format = date.toLocaleDateString('en-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  return { ms, format };
};
