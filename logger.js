import winston from 'winston';
import 'winston-daily-rotate-file';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('./config/.env', import.meta.url) });
dotenv.config({ path: new URL('./config/default.env', import.meta.url) });

const logger = winston.createLogger({
  levels: winston.config.npm.levels, // { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: process.env.LOG_DIR,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD_HH',
      createSymlink: true,
      symlinkName: 'current.log',
      frequency: '3h',
      maxFiles: '1d',
      level: process.env.LOG_LEVEL,
    }),
  ],
});
if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      // format: winston.format.simple(),
      level: process.env.LOG_LEVEL,
    }),
  );
}

export default logger;
