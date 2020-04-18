const bunyan = require('bunyan');
const dotenv = require('dotenv');

dotenv.config();
const logConfig = bunyan.createLogger({
    name: 'pmobi',
    level: 'debug',
    streams: [
        {
            stream: process.stdout
        },
        {
            type: 'rotating-file',
            level: 'error',
            period: '1d',
            count: 3,
            path: '../Log'
        }
    ]
});
const recordLog = (logInfo) => {
    switch (logInfo.logType) {
        case 'FATAL':
            logConfig.fatal(logInfo.logTitle, logInfo.logMessage);
            break;
        case 'ERROR':
            logConfig.error(logInfo.logTitle, logInfo.logMessage);
            break;
        case 'INFO':
            logConfig.info(logInfo.logTitle, logInfo.logMessage);
            break;
        default:
            logConfig.debug(logInfo.logTitle, logInfo.logMessage);
    }
};


module.exports = recordLog;
