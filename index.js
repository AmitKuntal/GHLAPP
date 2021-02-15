const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
jsonParser = bodyParser.json();

const free_time_service = require('./service/free_slots');
const START_HOUR = '10:00';
const END_HOUR = '15:00';


app.post('/free/slots',jsonParser,(req, res)=>{
    var start_time = new Date(req.body.date +" "+ START_HOUR );
    var end_time = new Date(req.body.date  +" "+ END_HOUR);
    res.json(free_time_service.get_free_time_slots(start_time, end_time, req.body.timeZone))
})

app.listen(port, ()=>{
    console.log("Server is running on port "+port)
})