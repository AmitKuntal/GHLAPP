const constants = require('./../constants/constants')

const get_free_time_slots = (start_time, end_time, timeZone)=>{
    var available_slots = [];
    let tempSlot = start_time;
    var BOOKED_SLOTS =  [];
    while(tempSlot < end_time){
        if(!BOOKED_SLOTS.includes(tempSlot)){
            available_slots.push(tempSlot.toLocaleTimeString('en-US', { timeZone: timeZone }));
        }
        tempSlot = new Date(tempSlot.getTime() + constants.SLOT_DURATION);
    }

    return available_slots;
}

module.exports = {get_free_time_slots}
