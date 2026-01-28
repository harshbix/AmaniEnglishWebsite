enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  private log(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;

    const logMethod =
      level === LogLevel.ERROR
        ? console.error
        : level === LogLevel.WARN
          ? console.warn
          : console.info;

    data ? logMethod(`${prefix} ${message}`, data) : logMethod(`${prefix} ${message}`);
  }

  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data);
  }
}

export const logger = new Logger();

export default logger;
