import { CaptureLogger, name, version } from '../../package.json';

function send(action, log, userAgent) {
  fetch('https://cl.alexanderiscoding.com/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': userAgent,
      'serviceid': CaptureLogger.id,
      'token': CaptureLogger.token
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

export default (action, log, userAgent) => {
  if (CaptureLogger) {
    if (String(CaptureLogger.id) && String(CaptureLogger.token) && String(CaptureLogger.source)) {

      if (!String(CaptureLogger.source) && !String(name)) {
        console.log("name and/or CaptureLogger.source not defined in package.json");
        return;
      }

      if (!String(version)) {
        console.log("version not defined in package.json");
        return;
      }

      if (typeof CaptureLogger.ignore == 'object') {
        if (CaptureLogger.ignore.includes(action)) {
          return;
        }
      }

      send(action, log, userAgent);
    } else {
      console.log("CaptureLogger.id and/or CaptureLogger.token not defined in package.json");
    }
  } else {
    console.log({ "action": action, "log": log });
  }
}