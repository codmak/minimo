export function pad(number) {
  return ('0' + number).substr(-2);
}

export function getTimeStr(amPM) {
  var date = new Date(),
    hours = date.getHours();

  if (amPM) {
    hours = hours > 12 ? (hours -= 12) : hours;
    hours = hours === 0 ? 12 : hours;
  } else {
    hours = pad(hours);
  }

  var minutes = pad(date.getMinutes());
  var seconds = pad(date.getSeconds());
  return hours + ' : ' + minutes + ' : ' + seconds;
}
