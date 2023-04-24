// Generate current month
export const getCurrentMonth = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const dateObj = new Date();
  let month = dateObj.getMonth();
  let currentMonth = months[month];
  return currentMonth;
}