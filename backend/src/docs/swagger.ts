import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];
const doc = {
  info: {
    version: "1.0.0",
    title: "Dokumentasi API Backend Asah",
    description: "Dokumentasi API Backend Asah",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
    {
      url: "https://backend-asah.vercel.app/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchmes: {
      bearerAuth: {
        type: "http",
        schema: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "ruffinoahmadnoor",
        password: "123456789",
      },
    },
  },
};

swaggerAutogen({
  openapi: "3.0.0",
})(outputFile, endpointsFiles, doc);
