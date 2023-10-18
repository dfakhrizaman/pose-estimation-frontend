export const formattedTimeAndDate = (date: Date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Create the formatted date string
  const formattedDate = `${hours}:${minutes}, ${dayOfWeek} ${day}/${month}/${year}`;

  return formattedDate;
};
