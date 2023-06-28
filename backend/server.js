const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { readdirSync } = require('fs')
const { loadData } = require("./mock/_loader")

require('dotenv').config()

const app = express()
module.exports = { app, express }

// Static file for displat image
app.use(express.static('public'))

//connect cloud Database
mongoose.connect(process.env.DATABASE2, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => console.log("Connect DataBase success..."))
    .catch((err) => console.log("Connect DataBase error!!! :" + err))

// data first load when start server
loadData()


//midleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



//route
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))



//run on PORT
const port = process.env.PORT
app.listen(port, () => {
    console.log("running on port", port)
})

