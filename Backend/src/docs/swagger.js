import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DataMart API",
      version: "1.0.0",
      description: "Performance optimized API documentation"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};