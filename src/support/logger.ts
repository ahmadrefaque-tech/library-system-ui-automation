import { createLogger, format, transports } from "winston";
import path from "path";

const logPath = path.join(process.cwd(), "logs", "test.log");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logPath, level: "info" })
  ],
});

export default logger;