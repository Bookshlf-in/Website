const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const currentDate = () => {
  const d = new Date();
  const newdate = d.getDate();
  const day = d.getDay();
  const month = d.getMonth();
  const year = d.getFullYear();

  return {
    date: newdate,
    day: day,
    dayName: dayNames[day],
    month: month,
    monthName: monthNames[month],
    year: year,
  };
};

export const TimestampToDate = (date) => {
  const d = new Date(date);
  const newdate = d.getDate();
  const day = d.getDay();
  const month = d.getMonth();
  const year = d.getFullYear();
  return {
    date: newdate,
    dayName: dayNames[day],
    monthName: monthNames[month],
    year: year,
  };
};
