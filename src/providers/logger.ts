import logger from "npmlog";
import configs from "./configs.js";

logger.level = "silly";

if (configs.IS_PROD) {
  logger.level = "warn";
}

if (configs.IS_DEV) {
  logger.level = "info";
}

logger.enableColor();
logger.enableUnicode();

logger.heading = configs.APP_NAME;
logger.headingStyle = {
  bold: true,
  bell: true,
  fg: "cyan",
};

export default logger;
