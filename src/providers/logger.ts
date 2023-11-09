import { createLogger, format, transports, addColors } from "winston";
import configs from "./configs.js";

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

const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  level: configs.IS_PROD ? "info" : "silly",
  format: combine(
    // error stack trace in metadata
    errors({ stack: true }),
    metadata(),
    // timestamp to logger
    timestamp(),
    // string interpolation
    splat(),
    printf(formatter),
  ),
  transports: [new transports.Console({ format: colorize({ all: true }) })],
});

export default logger;
