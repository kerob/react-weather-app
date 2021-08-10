const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

export function convertDate(timecode) {
  const date = new Date(parseInt(timecode) * 1000);

  const convertedDate = months[date.getMonth()] + " " + date.getDate();

  return convertedDate;
}
