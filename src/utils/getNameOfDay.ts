const getNameOfDay = (date: string | number) => {
  let dayNumber: number = 0;

  if (typeof date === "number") {
    dayNumber = date;
  } else if (typeof date === "string") {
    dayNumber = new Date(date).getDay();
  }

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekDays[dayNumber];
};
export default getNameOfDay;
