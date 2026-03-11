import env from "./env.config.js";

const appConfig = {
  name: "datamart-api",
  env: env.NODE_ENV,
  port: env.PORT,

  apiPrefix: "/api/v1",

  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};

export default appConfig;