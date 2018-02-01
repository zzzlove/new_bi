const Formatter = {};

/*

Date
Formatter.date(new Date(), 'YYYY-MM-DD HH:mm:ss'); // 2015-10-12 14:22:16

money

Formatter.money("6566456.65466545") // "6 566 456.65466545"
Formatter.money("6566456.65466545", ",")  // "6,566,456.65466545"
Formatter.money("6566456", ",")  // "6,566,456"
Formatter.money("6566456", ",", 4) // "6,566,456.0000"
Formatter.money("6566456", ",", 2) // "6,566,456.00"
Formatter.money("6566456.65466545", ",", 4)  // "6,566,456.6547"
Formatter.money("6566456.65466545", ",", 2) // "6,566,456.65"

cnmobile
Formatter.cnmobile('+8615652988282', ' '); // +86 1565 2988 282

card
Formatter.cnmobile('1565298828212233', ' '); // 1565 2988 2821 2233

*/


Formatter.date = function (str, pattern) {
  

  if(!str||str.valueOf()==0){return ''}
  
  const date = new Date(str);

  if (Object.prototype.toString.call(date) === '[object Date]') {

    if (isNaN(date.getTime())) {

      // invalid

      console.warn('Formatter: invalid date');

      return '';

    }

    let actualPattern = pattern || 'YYYY-MM-DD';

    const o = {

      'M+': date.getMonth() + 1, // 月份

      'D+': date.getDate(), // 日

      'd+': date.getDate(), // 日

      'H+': date.getHours(), // 小时

      'h+': date.getHours(), // 小时

      'm+': date.getMinutes(), // 分

      's+': date.getSeconds(), // 秒

      'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度

      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度

      S: date.getMilliseconds(), // 毫秒

    };

    if (/(y+)/i.test(actualPattern)) {

      actualPattern = actualPattern.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));

    }

    for (const k in o) {

      if (new RegExp(`(${k})`).test(actualPattern)) {

        actualPattern = actualPattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));

      }

    }

    return actualPattern;

  }

  return '';

};



Formatter.money = function (str, delimiter = ' ', fixedNum) {

  if(str=='0'){ return 0}  
  if(!str){ return null}

  const actualStr = fixedNum ? parseFloat(str).toFixed(fixedNum).toString() : parseFloat(str).toFixed(0).toString();

  if (actualStr.indexOf('.') !== -1) {

    return actualStr.replace(/(\d)(?=(?:\d{3})+(\.))/g, (match, $1) => $1 + delimiter)

      .replace(/(\d{3})(?![$|\.|\(|\s])/g, (match, $1) => $1);

  }

  return actualStr.replace(/(\d)(?=(?:\d{3})+$)/g, (match, $1) => $1 + delimiter);

};



Formatter.cnmobile = function (str, delimiter = ' ') {

  return str.replace(/^(\+?0?86)(?!$)/, `$1${delimiter}`).replace(/(\d{4})(?!$)/g, `$1${delimiter}`);

};



Formatter.card = function (str, delimiter = ' ') {

  return str.replace(/(\d{4})(?!$)/g, `$1${delimiter}`);

};



export default Formatter;