const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')


require('dotenv').config()
const app = express()


// Bodyparser middleware
app.use(bodyParser.json())

require('./config').then(() => {
    console.log('mongodb connected!!!')
    
})
.catch(e => console.error(e));

// Use routes
app.use('/api/items', items)

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    // any request 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () =>  console.log(`Server started on port ${port}`))
