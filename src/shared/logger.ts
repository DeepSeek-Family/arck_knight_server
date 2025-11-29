
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "../config";

const { combine, timestamp, printf, errors, colorize } = winston.format;

// ----------------- Formats -----------------
const fileFormat = printf(({ level, message, timestamp, stack }: any) => {
  return `${timestamp} ${level.toUpperCase()}: ${stack || message}`;
});

const consoleFormat = printf(({ level, message, timestamp, stack }: any) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// ----------------- INFO Rotate Transport -----------------
const infoRotate = new DailyRotateFile({
  filename: path.join(
    process.cwd(),
    config.logger.logDir,
    `${config.logger.logFilePrefix}-%DATE%.log`
  ),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: config.logger.maxSize,
  maxFiles: config.logger.maxFiles,
  level: "info",
});

// ----------------- ERROR Rotate Transport -----------------
const errorRotate = new DailyRotateFile({
  filename: path.join(
    process.cwd(),
    config.logger.logDir,
    `error-%DATE%.log`
  ),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: config.logger.maxSize,
  maxFiles: config.logger.maxFiles,
  level: "error",
});

// ----------------- INFO LOGGER -----------------
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    errors({ stack: true }),
    fileFormat
  ),
  transports: [infoRotate],
});

// ----------------- ERROR LOGGER -----------------
const errorLogger = winston.createLogger({
  level: "error",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    errors({ stack: true }),
    fileFormat
  ),
  transports: [errorRotate],
});

// ----------------- DEV Console Logger -----------------
if (config.nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        errors({ stack: true }),
        colorize({ all: true }),
        consoleFormat
      ),
      level: "debug",
    })
  );

  errorLogger.add(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        errors({ stack: true }),
        colorize({ all: true }),
        consoleFormat
      ),
      level: "error",
    })
  );
}

// ----------------- Morgan Stream -----------------
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, errorLogger, stream };
