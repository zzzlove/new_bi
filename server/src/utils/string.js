function wildcardMatch(str, rule) {
  var reversed = false;
  if (rule && rule.charAt(0) === '!') {
    reversed = true;
    rule = rule.substr(1);
  }
  var matched = new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
  if (!matched) {
    return 0;
  }
  if (reversed) {
    return -1;
  }
  return 1;
}

function randomString(length, chars) {
  if (!chars) {
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function capitalizeWord(str) {
  return str.replace(/\b\w/g, function(c) {
    return c.toUpperCase();
  });
}

export { wildcardMatch, randomString, capitalizeWord };
