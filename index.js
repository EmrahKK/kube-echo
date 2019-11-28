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

app.get('/healthz', (req, res) => {
  var date = new Date();
  var current_hour = date.getHours();
  var current_minutes = date.getMinutes();
  if (current_hour==11 && current_minutes<31 && current_minutes>30) {    
    res.status(400).json({"Message": "Unhealty.."})  
  } else {
    res.json({"Message": "Healty.."})  
  }
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
