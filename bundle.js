const { CaptureLogger, name, version } = require('../../package.json');
const { isObj, isString, isBoolean } = require('./validation');

function send(action, log, userAgent) {
  fetch('https://cl.alexanderiscoding.com/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': userAgent,
      'serviceid': CaptureLogger.serviceID,
      'accesstoken': CaptureLogger.accessToken
    },
    body: JSON.stringify({
      action: action,
      log: log,
      source: CaptureLogger.source ? CaptureLogger.source : name,
      version: version,
      SenderMessage: CaptureLogger.SenderMessage
    })
  }).then(
    (response) => console.log(response.status == 200 ? 'CaptureLogger: send ' + action : 'CaptureLogger: not send ' + action + ' - status code: ' + response.status)
  ).catch(
    (error) => console.log('CaptureLogger: Ocorred error in ' + action + ': ' + error)
  );
}

function checkConfig() {
  if (!isObj(CaptureLogger)) {
    console.log("CaptureLogger not configured in package.json");
    return false;
  } else {
    if (!CaptureLogger.serviceID) {
      console.log("CaptureLogger.serviceID not defined in package.json");
      return false;
    }
    if (!CaptureLogger.accessToken) {
      console.log("CaptureLogger.accessToken not defined in package.json");
      return false;
    }
    if (!CaptureLogger.source) {
      if (!name) {
        console.log("name and/or CaptureLogger.source not defined in package.json");
        return false;
      }
    }
    if (!version) {
      console.log("version not defined in package.json");
      return false;
    }
    return true;
  }
}

function validationConfig() {
  if (!isString(CaptureLogger.serviceID)) {
    console.log("CaptureLogger.serviceID invalid config in package.json");
    return false;
  }
  if (!isString(CaptureLogger.accessToken)) {
    console.log("CaptureLogger.accessToken invalid config in package.json");
    return false;
  }
  if (!isString(CaptureLogger.source)) {
    if (!CaptureLogger.source) {
      if (!isString(name)) {
        console.log("name invalid config in package.json");
        return false;
      }
    } else {
      console.log("CaptureLogger.source invalid config in package.json");
      return false;
    }
  }
  if (!isString(version)) {
    console.log("version invalid config in package.json");
    return false;
  }
  return true;
}

module.exports = (action, log, userAgent) => {
  if (checkConfig()) {
    if (isBoolean(CaptureLogger.debug)) {
      console.log({ "action": action, "log": log });
    } else {
      if (validationConfig()) {
        if (isObj(CaptureLogger.ignore)) {
          if (CaptureLogger.ignore.includes(action)) {
            return;
          }
        }
        if (!isString(action)) {
          console.log("Action is not string.");
          return;
        }
        send(action, log, userAgent);
      }
    }
  }
}