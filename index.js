const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 80;

app.use(bodyParser.text({
  type: function (req) {
    return 'text';
  }
}));

const startDate = Date.now();

app.get('/', (req, res) => {
  const seconds = Math.floor(Date.now() - startDate) / 1000;
  res.json({"Uptime(seconds)": seconds});
});

app.get('/json', (req, res) => res.json({"message": "Hello World"}));
app.get('/echo', (req, res) => {
  let name = req.query.name;
  let message = "Hollo " + name;
  console.log(message);
  res.json({"message": message});
});

// http status codes
app.get('/badRequest', (req, res) => {
  res
    .status(400)
    .json({"message": "Bad request"});
});

app.get('/notFound', (req, res) => {
  res
    .status(404)
    .json({"message": "Not found"})
});

app.get('/internalServiceError', (req, res) => {
  res
    .status(500)
    .json({"message": "Internal service error"});
});

app.post('/log', (req, res) => {    
  res = res.status(200);
  if (req.get('Content-Type')) {    
    res = res.type(req.get('Content-Type'));
  }
  console.log(req.body);
  res.send(req.body);    
});

// Kubernetes
app.get('/healthz', (req, res) => {
  var date = new Date();
  var current_hour = date.getHours();
  var current_minutes = date.getMinutes();

  if (current_hour == 13 && current_minutes < 2) {
    res
      .status(400)
      .json({"Message": "Unhealty..", "current_hour": current_hour, "current_minutes": current_minutes});
  } else {
    res.json({"Message": "Healty..", "current_hour": current_hour, "current_minutes": current_minutes});
  }
});

app.get('/readyz', (req, res) => {
  const seconds = Math.floor(Date.now() - startDate) / 1000;
  if (seconds < 20) {
    res
      .status(400)
      .json({"Message": "Not Ready.."});
  } else {
    res.json({"Uptime(seconds)": seconds});
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
