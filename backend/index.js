const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')
const app = express()
const port = 5000
app.use(cors())


app.use(express.json())
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/note',require('./routes/note.js'))

app.listen(port, () => {
    console.log(`App is on http://localhost:${port}`)
})
