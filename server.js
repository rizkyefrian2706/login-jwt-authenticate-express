require('dotenv').config()
const router = require('./router')

const cors = require('cors')
const express = require('express')
const app = express()
const port = 3009

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'test' })
})
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})