const calcJulianDate = (date) => {
  let year = new Date(date).getYear();

  if (year < 1000) {
    year += 1900;
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const univTime = hour + (min / 60) + (sec / 3600);

  const sign = 100 * year + month - 190002.5 >= 0 ? 1 : -1; 

  const part1 = 367 * year;
  const part2 = Math.floor( (7 * (year + Math.floor( (month + 9) / 12))) / 4 );
  const part3 = day + Math.floor( (275 * month) / 9 );
  const part4 = 1721013.5 + (univTime / 24);
  const part5 = 0.5 * sign;
  
  return part1 - part2 + part3 + part4 - part5 + 1;
}

/**
  JDToLongDate
  julianday is the julian day count, NOT a julian calendar date
  corresponder must be one of the numbers from the above list
  returns a string containing a mayan day count
*/
const julianDateToLongDate = (julianDay, corresponder) => {
  let adjustedDate = julianDay - corresponder;

  const bactuns = Math.floor(adjustedDate/144000);
  adjustedDate -= bactuns * 144000;
  
  const katuns = Math.floor(adjustedDate/7200);
  adjustedDate -= katuns * 7200;
  
  const tuns = Math.floor(adjustedDate/360);
  adjustedDate -= tuns * 360;
  
  const uinals = Math.floor(adjustedDate/20);

  const kins = Math.floor(adjustedDate - (uinals * 20));

  return `${bactuns}.${katuns}.${tuns}.${uinals}.${kins}`;
};