const constants = require('./../constants/constants')
const client =  require('./../db/db.js')

const get_free_time_slots = async (start_time, end_time, timeZone)=>{
    var available_slots = [];
    let tempSlot = start_time;
    var BOOKED_SLOTS = await getBookedSlots();
    BOOKED_SLOTS = BOOKED_SLOTS.rows;
    while(tempSlot < end_time){
        if(!BOOKED_SLOTS.includes(tempSlot)){
            available_slots.push(tempSlot.toLocaleTimeString('en-US', { timeZone: timeZone }));
        }
        tempSlot = new Date(tempSlot.getTime() + constants.SLOT_DURATION);
    }

    return available_slots;
}

const getBookedSlots=()=>{
    var sql = 'select events.dateTime from events'
    return client.query(sql);
}

module.exports = {get_free_time_slots}
