const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/node-basic-auth";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info(`Connected to the database: ${MONGODB_URI}`))
  .catch((error) => console.error("Database connection error:", error));
