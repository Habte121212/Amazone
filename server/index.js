const express = require('express')
const dotenv = require('dotenv')

// load enviroment
dotenv.config();

// initialize
const app = express();

// middleware
app.use(express.json());

// routes

// port
const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})