const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config();
const todoRoute=require('./routes/todoRoute')

const app = express();
app.use(bodyParser.json());
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,   
    database: process.env.DB_NAME,   
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
app.use(express.json());  
app.use(bodyParser.json());
app.use(cors())
app.use('/',todoRoute)

app.use('/task',todoRoute)

app.use('/Alltask',todoRoute)


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
