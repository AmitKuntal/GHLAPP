const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

jsonParser = bodyParser.json();

const free_time_service = require('./service/free_slots');
const events = require('./service/events');
const client = require('./db/db');
const constants = require('./constants/constants')


client.connect();

app.post('/free/slots',jsonParser,(req, res)=>{
    var start_time = new Date(req.body.date +" "+ constants.START_HOUR );
    var end_time = new Date(req.body.date  +" "+ constants.END_HOUR);
    free_time_service.get_free_time_slots(start_time, end_time, req.body.timeZone).then(result=>{
        res.status(200).json(result)
    }).catch(err=> res.status(500).json({"message":"Something went wrong"});)
})


app.post('/event', jsonParser, (req, res)=>{
    events.addEvent(req.body).then(status=>{
        if(status) res.status(200).json({"message":"Event created"})
        else res.status(422).json({"message":"Event can not be added"})
    }).catch(err=>{
        console.log(err);
        res.status(500).json({"message":"Something went wrong"});
    }) 
})

app.post('/get/events', jsonParser, (req, res) =>{
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    events.getEvents(startDate.toISOString(), endDate.toISOString()).then(data=>{
        res.status(200).json(data.rows)
    }).catch(err=> res.status(500).json({"message":"Something went wrong"}))
})

app.listen(port, ()=>{
    console.log("Server is running on port "+port)
})