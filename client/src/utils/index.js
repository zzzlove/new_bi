import lodash from 'lodash';
import config from './config';
import menu from './menu';
import request from './request';
import classnames from 'classnames';
import { color } from './theme';
import formatter from './formatter';
import moment from 'moment';
import city from './city';

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

const openNewLink = (url) => {  
  window.open(url)
}

const getAllValuesFromRecord = (obj) => {
  let result = "";
  for (var name in obj){
    if (typeof(obj[name])=='object'){
      for(var subname in obj[name]){
        result += obj[name][subname]?obj[name][subname]:""
      }
    }
    else{
      result += obj[name]?obj[name]:""
    }
  }
  return result.toUpperCase();
}

function getDistinctValues(arrayInput, listReturn){
    var returnObj = {};
    
    for(var y of listReturn){
          returnObj[y] = [];
    }
   
    if(arrayInput){
       for(var x = 0; x<arrayInput.length; x++){
          for(var y of listReturn){
            if(arrayInput[x][y]&&(!returnObj[y]||returnObj[y].indexOf(arrayInput[x][y]) == -1)){
                 returnObj[y].push(arrayInput[x][y]);
              }
          }
       }
    }
    else {
       for(var y of listReturn){
          returnObj[y] = [""];
       }
    }

    return returnObj;
}

function getDistinct2ndValues(arrayInput, level, colReturn){
// 一个一个来  
    var returnObj = [];
   
    if(arrayInput){
      for(var x = 0; x<arrayInput.length; x++){
          let currentValue =  arrayInput[x][level]?arrayInput[x][level][colReturn]:null;
            if(currentValue&&(returnObj.indexOf(currentValue) == -1)){
                 returnObj.push(currentValue);
            }
       }
    }
    else {
      returnObj.push("");
    }

    return returnObj;
}


function fetchPropSummary(pagination, filtersPage, sorterPage){

    var returnObj = {};
    
    returnObj.limit = pagination.pageSize;
    returnObj.offset = (pagination.current - 1)*pagination.pageSize;   
    
    if (Object.getOwnPropertyNames(sorterPage).length != 0) {
      if(sorterPage.order == 'descend'){ returnObj.order = [[sorterPage.field, "DESC"]] }
      if(sorterPage.order == 'ascend'){  returnObj.order = [[sorterPage.field]] }
    }
    for (var name in filtersPage){
      if (filtersPage[name]){ returnObj[name] = filtersPage[name];  }
    }
    return returnObj;
}

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - (day * oneDay);

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

module.exports = {
  city,
  config,
  menu,
  request,
  color,
  classnames,
  queryURL,
  formatter,
  getAllValuesFromRecord,
  getDistinctValues,
  getDistinct2ndValues,
  openNewLink,
  fetchPropSummary,
  getTimeDistance, 
  digitUppercase,
}
