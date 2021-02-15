const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const START_HOUR = '10:00';
const END_HOUR = '15:00';
const SLOT_DURATION = 30*60000;
app.get('/',(req, res)=>{
    var now = new Date();
    var nowDateTime = now.toISOString();
    var nowDate = nowDateTime.split('T')[0];
    var start_time = new Date(nowDate +" "+ START_HOUR );
    var end_time = new Date(nowDate  +" "+ END_HOUR);
    var available_slots = [];
    let tempSlot = start_time;
    while(tempSlot < end_time){
        available_slots.push(tempSlot);
        tempSlot = new Date(tempSlot.getTime() + SLOT_DURATION);
        
    }

    let booked_slot = ["2021-02-15T04:30:00.000Z","2021-02-15T05:00:00.000Z","2021-02-15T05:30:00.000Z"];
    available_slots = available_slots.filter( function( el ) {
        return !booked_slot.includes( el );
      } );
    res.json({"start_time":start_time, "end_time": end_time, "free_slots" : available_slots});
})

app.listen(port, ()=>{
    console.log("Server is running on port "+port)
})