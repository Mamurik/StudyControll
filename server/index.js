require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  try {
   
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();