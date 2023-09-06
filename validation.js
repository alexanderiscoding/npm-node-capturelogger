exports.isString = (variable) => {
  if (typeof variable === 'string') {
    return true;
  } else {
    return false;
  }
}

exports.isBoolean = (variable) => {
  if (typeof variable === 'boolean') {
    return variable;
  } else {
    return false;
  }
}

exports.isObj = (variable) => {
  if (typeof variable === 'object') {
    return true;
  } else {
    return false;
  }
}