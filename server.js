const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Student API",
    version: "1.0.0",
    description: "Simple Student API with MongoDB and Swagger UI"
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server"
    }
  ],
  components: {
    schemas: {
      Student: {
        type: "object",
        properties: {
          _id: { type: "string", example: "69d5ef937c7d864bc8b770a4" },
          name: { type: "string", example: "urban" },
          age: { type: "integer", example: 22 },
          course: { type: "string", example: "Computer Science" },
          __v: { type: "integer", example: 0 }
        }
      },
      StudentInput: {
        type: "object",
        required: ["name", "age", "course"],
        properties: {
          name: { type: "string", example: "urban" },
          age: { type: "integer", example: 22 },
          course: { type: "string", example: "Computer Science" }
        }
      }
    }
  },
  paths: {
    "/students": {
      post: {
        summary: "Create a new student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StudentInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Created student",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" }
              }
            }
          }
        }
      },
      get: {
        summary: "Get all students",
        responses: {
          200: {
            description: "List of students",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Student" }
                }
              }
            }
          }
        }
      }
    },
    "/students/{id}": {
      get: {
        summary: "Get a specific student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Student details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" }
              }
            }
          }
        }
      },
      put: {
        summary: "Update a student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StudentInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Updated student",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Student" }
              }
            }
          }
        }
      },
      delete: {
        summary: "Delete a student",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Delete confirmation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Deleted successfully" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected By gedeon"))
  .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
