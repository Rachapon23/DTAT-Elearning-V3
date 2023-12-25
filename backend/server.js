const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const { readdirSync } = require('fs')
const { checkFileAccess } = require('./middleware/middleware')
const { default: helmet } = require('helmet')
require('dotenv').config()
// const { loadData } = require("./mock/_loader")
// const { dev } = require('./devUtil')

const app = express()
module.exports = { app, express }


// Static file for displat image
app.use(express.static('public'))
app.use('/uploads/:path', checkFileAccess,
    (req, res, next) => {
        req.url = `/uploads/${req.params.path}/${req.query.file}`;
        express.static(`./private`)(req, res, next)
    }
)

//connect cloud Database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE2, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    dbName: 'version3',
})
    .then(() => console.log("Connect DataBase success..."))
    .catch((err) => console.log("Connect DataBase error!!! :" + err))

// data first load when start server
// loadData()

// test API
// app.use('/api/test', (_, res) => dev.testAPI(_, res))


//midleware
app.use(express.json())
app.use(mongoSanitize({
    replaceWith: '_',
}))
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())



//route
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))



//run on PORT
const port = process.env.PORT
app.listen(port, () => {
    console.log("running on port", port)
})

