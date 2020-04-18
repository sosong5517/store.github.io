const dotenv = require('dotenv');
const server = require('./server');
const logEvent = require('./src/events/myEmitter');
const connection = require('./dbConn').connection;




dotenv.config();

if (pmobi) {
    connection.authenticate().then(() => {
        server.listen(3000, '0.0.0.0', function () {
            if (server.listening) {
                logEvent.emit('APP-INFO', {
                    logTitle: 'SERVER',
                    logMessage: `Server is listening on 3000`
                });
            }
        });
    }).catch((err) => {
        logEvent.emit('APP-ERROR', {
            logTitle: 'DB-FAILED',
            logMessage: err
        });
    });
} else {
    process.exit(1);
}


