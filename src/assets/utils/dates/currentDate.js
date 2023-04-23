export const currentDate = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
