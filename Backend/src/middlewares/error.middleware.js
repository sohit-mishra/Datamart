import HTTP_STATUS from "../constants/httpStatus.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {

  logger.error(err);

  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

export default errorMiddleware;