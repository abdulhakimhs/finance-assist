const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const path = require('path')
const userRoute = require('./routes/userRoute')
const transactionsRoute = require('./routes/transactionsRoute')

app.use('/api/users/', userRoute)
app.use('/api/transaction/', transactionsRoute)

const port = process.env.PORT || 5000

if (process.env.MODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname), 'client/build/index.html')
    })
}

app.listen(port, () => console.log(`Node JS Server started at port ${port}`))