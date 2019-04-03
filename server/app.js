require('dotenv').config()
const express = require('express');
const cors = require ('cors');
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const router = require ('./routes/index')

const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})