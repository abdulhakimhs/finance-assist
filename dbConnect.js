const mongoose = require('mongoose')

const connect = mongoose.connect('mongodb+srv://ahsanDbUser:ahsanDbUser98@cluster0.ugltr.mongodb.net/sheymoney', {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected', () => console.log('Mongo DB Atlas Connection Successfull'))