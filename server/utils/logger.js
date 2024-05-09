const { createLogger, format, transports } = require('winston');
const fs = require('fs');

let logDir = "logs";

class Logger {
    constructor() {
        if(!fs.existsSync(logDir)){
            fs.mkdirSync(logDir);
        }
        this.severity = "info"
    }

    infoLog = createLogger({
        level: this.severity,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(x =>{
                return `${x.timestamp} ${x.level}: ${x.message}`
            })
        ),
        transports: [
            new transports.File({
                filename: `${logDir}/info.log`,
                level: "info"
            })
        ],
        exitOnError: false
    })

    errorLog = createLogger({
        level: this.severity,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(x =>{
                return `${x.timestamp} ${x.level}: ${x.message}`
            })
        ),
        transports: [
            new transports.File({
                filename: `${logDir}/error.log`,
                level: "error"
            })
        ],
        exitOnError: false
    })

    log(_severity, message, data=''){

        if(_severity === null || _severity === "info"){
            this.severity = "info";
            this.infoLog.log(this.severity,message,data)
        }
        else{
            this.severity = "error";
            this.errorLog.log(this.severity,message,data)
        }

    }
}

module.exports = Logger;