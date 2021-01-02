if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')



const indexRouter = require('./routes/index');


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// coonecting DB

mongoose.connect( process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology : true})
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'))


// Home Routes

app.use('/', indexRouter);


app.listen(process.env.PORT || 3000, ()=> {console.log('Server Started at Port 3000')})
