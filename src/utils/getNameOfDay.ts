const getNameOfDay = (date: Date | string | number) => {
  const dayNumber = new Date(date).getDay();

  const weekDays = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  return weekDays[dayNumber];
};
export default getNameOfDay;
