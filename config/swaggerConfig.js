const listEndpoints = require("express-list-endpoints");
const { getInputSchema } = require("../config/inputSchema")

// Converts `/api/products/:name` to `/api/products/{name}`
function normalizePath(path) {
  return path.replace(/:(\w+)/g, '{$1}');
}

// Generate a tag name from the route path
function generateTag(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

// Function to generate Swagger documentation automatically
function generateSwaggerSpec(app) {
  const endpoints = listEndpoints(app);
  const paths = endpoints.reduce((acc, endpoint) => {
    endpoint.methods.forEach((method) => {
      const methodLower = method.toLowerCase();
      const tag = generateTag(endpoint.path);

      // Normalize the path for Swagger (e.g., /api/products/{name})
      const normalizedPath = normalizePath(endpoint.path);

      acc[normalizedPath] = acc[normalizedPath] || {};
      acc[normalizedPath][methodLower] = {
        summary: `Handle ${method} for ${endpoint.path}`,
        // tags: [tag], // Assign tag based on the endpoint path
        ...getInputSchema(endpoint.path, methodLower), // Add input schema dynamically
        responses: {
          200: { description: "Successful response" },
          400: { description: "Bad request" },
          401: { description: "Unauthorized" },
        },
      };
    });
    return acc;
  }, {});

  return {
    openapi: "3.0.0",
    info: {
      title: "FreshCart API Documentation. NodeJs(Express)",
      version: "1.0.0",
      description: "Ecommerce API built with Express",
    },
    servers: [
      {
        url: "https://freshcart-api-6ivr.onrender.com/",
        description: "Live server"
      },
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }], // Apply globally to all endpoints
    paths,
  };
}

module.exports = { generateSwaggerSpec };
