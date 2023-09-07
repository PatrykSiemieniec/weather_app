const getNameOfDay = (date: Date | string | number) => {
  const dayNumber = new Date(date).getDay() - 1;

  const weekDays = [
    "Monday",
    "Tueasday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return weekDays[dayNumber];
};
export default getNameOfDay;
