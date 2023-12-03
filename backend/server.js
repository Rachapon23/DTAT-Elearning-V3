const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const { readdirSync } = require('fs')
// const { loadData } = require("./mock/_loader")
const { checkFileAccess } = require('./middleware/middleware')
require('dotenv').config()

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


//midleware
app.use(express.json())
app.use(mongoSanitize({
    replaceWith: '_',
}))
app.use(cors())
app.use(morgan('dev'))



//route
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))



//run on PORT
const port = process.env.PORT
app.listen(port, () => {
    console.log("running on port", port)
})

