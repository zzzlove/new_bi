import { wildcardMatch } from './string';

function wildcardMatchStringArray(strArray, str) {
  for (var rule of strArray) {
    var result = wildcardMatch(str, rule);
    if (result === 1) {
      return true;
    } else if (result === -1) {
      return false;
    }
  }
  return false;
}

function removeArrayItem(arr, str) {
  var i = arr.indexOf(str);
  if (i != -1) {
    arr.splice(i, 1)
  }
}

export { wildcardMatchStringArray, removeArrayItem };
