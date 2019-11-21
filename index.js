const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/json', (req, res) => res.json({"message":"Hello World"}))

app.get('/echo', (req, res) => {
    let name = req.query.name;
    let message = "Hollo "+name;
    res.json({"message": message})
})

app.get('/nofound', (req, res) => {    
    res.status(404).json({"message": "Not found"})
})

app.get('/badRequest', (req, res) => {    
    res.status(400).json({"message": "Bad request"})
})

app.get('/internalServiceError', (req, res) => {    
    res.status(500).json({"message": "Internal service error"})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
