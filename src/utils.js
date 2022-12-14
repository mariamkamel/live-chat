var winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.timestamp(),
    transports: [new winston.transports.Console(
        {
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }
    )],
    prettyPrint: true
  });
  
  module.exports = logger;

