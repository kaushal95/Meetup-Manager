export const getFormattedDate = (dateString) => {
  const time = new Date(dateString).toLocaleTimeString();
  const year = new Date(dateString).getFullYear();
  const date = new Date(dateString).toString().split(year)[0] + year;

  return { date, time };
};
