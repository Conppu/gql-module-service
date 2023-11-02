import morgan from "morgan";
import { createLogger, format, transports, addColors } from "winston";

const isProduction = false;

const { combine, colorize, timestamp, errors, printf, splat, metadata } =
  format;

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
};

// Tell winston that you want to link the colors
addColors(colors);

type Formatter = {
  level: string;
  message: any;
  [key: string]: any;
};
// Custom formate logging
const formatter = ({
  level,
  message,
  timestamp: time,
  metadata: meta,
}: Formatter) => {
  let customFormat = `${time} | ${level} | ${message}`;
  if (meta?.["stack"]) {
    customFormat = `${customFormat} | ${meta["stack"]}`;
  } else if (meta instanceof Object && Object.entries(meta).length > 0) {
    customFormat = `${customFormat} | ${JSON.stringify(meta)}`;
  }

  return customFormat;
};

export const Log = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  level: isProduction ? "error" : "silly",
  format: combine(
    // error stack trace in metadata
    errors({ stack: true }),
    metadata(),
    // timestamp to logger
    timestamp(),
    // string interpolation
    splat(),
    printf(formatter)
  ),
  transports: [new transports.Console({ format: colorize({ all: true }) })],
});

// Build the morgan middleware
export const loggerHTTPMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message: unknown) => Log.http(message),
    },
  }
);
