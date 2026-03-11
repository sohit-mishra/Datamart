import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";

const securityMiddleware = [
  helmet(),
  xss(),
  hpp()
];

export default securityMiddleware;