const getNameOfDay = (date: Date | string | number) => {
  const dayNumber = new Date(date).getDay();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tueasday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekDays[dayNumber];
};
export default getNameOfDay;
