require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./db');
const models = require('./models/models')
const router =  require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

app.use(cors());
app.use(express.json());
app.use('/api',router)

app.use(errorHandler)

app.get('/',(req,res)=>{
  res.status(200).json({message:"WORKING!"})
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
    console.log(`Сервер стартовал на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(":", error);
  }
};

start();