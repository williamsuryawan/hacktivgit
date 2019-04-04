require('dotenv').config()
const express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const app = express();


const router = require ('./routes/index')
const userRouter = require ('./routes/users')

const port = 3000

app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@cluster0-dlbfv.mongodb.net/hacktivgitrepeat?retryWrites=true`, {useNewUrlParser: true})

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', router)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})