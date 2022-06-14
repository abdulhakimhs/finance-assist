const mongoose = require('mongoose')
const config = require('./config')

const connect = mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.pass}@cluster0.ugltr.mongodb.net/${config.database.name}`, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))