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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
