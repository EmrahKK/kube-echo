const express = require('express')
const app = express()
const port = 3000

const startDate = Date.now();

app.get('/', (req, res) => {
  const seconds = Math.floor(Date.now() - startDate)/1000;
  res.json({"Uptime(seconds)": seconds})    
})

app.get('/json', (req, res) => res.json({"message":"Hello World"}))
app.get('/echo', (req, res) => {
    let name = req.query.name;
    let message = "Hollo "+name;
    res.json({"message": message})
})

// http status codes
app.get('/badRequest', (req, res) => {    
    res.status(400).json({"message": "Bad request"})
})

app.get('/nofound', (req, res) => {    
    res.status(404).json({"message": "Not found"})
})

app.get('/internalServiceError', (req, res) => {    
    res.status(500).json({"message": "Internal service error"})
})

// Kubernetes
app.get('/healthz', (req, res) => {
  var date = new Date();
  var current_hour = date.getHours();
  var current_minutes = date.getMinutes();
  
  if (current_hour==13 && current_minutes>25 ) {    
    res.status(400).json({"Message": "Unhealty..","current_hour": current_hour,"current_minutes": current_minutes})  
  } else {
    res.json({"Message": "Healty..","current_hour": current_hour,"current_minutes": current_minutes})  
  }  
})

app.get('/readiness', (req, res) => {
    const seconds = Math.floor(Date.now() - startDate)/1000;
    if (seconds<20) {
      res.status(400).json({"Message": "Not Ready.."})  
    } else {
      res.json({"Uptime(seconds)": seconds})  
    };    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
