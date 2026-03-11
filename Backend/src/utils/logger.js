import winston from "winston";
import fs from "fs";
import path from "path";

const logDir = "logs";

// create logs folder if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(logDir, "app.log")
    })
  ]
});

export default logger;