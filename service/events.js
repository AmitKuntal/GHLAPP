const { SLOT_DURATION, START_HOUR, END_HOUR} = require('../constants/constants.js');
const client =  require('./../db/db.js')


const addEventQuery = (slots)=>{
    const valueArrayString = slots.reduce((acc, crr,index)=>{
        return index == '1' ? `('${acc}'),('${crr}')` : `${acc},('${crr}')`
      })
    const sql = `insert into events (dateTime) values ${valueArrayString} RETURNING *`;
    console.log(sql)
    return client.query(sql);
}

const getEventsBetweenSlots = (slots) =>{
    var condition = slots.reduce((acc, crr,index)=>{
      return index == '1' ? `'${acc}','${crr}'` : `${acc},'${crr}'`
    })
    if(slots.length()<=1){
        condition = `'${condition}'`
    }
    console.log(condition);
    const sql = `select * from events where dateTime in (${condition})`;
    console.log(sql)
    return client.query(sql);
}

const addEvent =async (body) =>{
    const date = new Date(body.date);
    const availablityStart = new Date(date.toISOString().split('T')[0]+' '+ START_HOUR+'Z');
    const availablityEnd = new Date(date.toISOString().split('T')[0]+' '+ END_HOUR+'Z');
    console.log("start" + availablityStart);
    console.log("end" + availablityEnd);
    console.log("date" + date);
    
    if(date >= availablityStart && date <= availablityEnd){
        const slots = generateSlots(date, body.duration);
        const eventRows = await checkEventExist(slots);
        console.log(eventRows.rowCount)
        if(eventRows.rowCount > 0){
            return false;
        }
        else{
            const addEventResult = await addEventQuery(slots);
            return true;
        }  
    }
    else {
        console.log("failed because of unavailablity")
     return false;
    }
}

const getEvents = (startDate, endDate)=>{
    var sql = `select * from events where dateTime >='${startDate}' and dateTime <= '${endDate}';`
    return client.query(sql);
}

const checkEventExist = (slots)=>{
    return getEventsBetweenSlots(slots)
}

const generateSlots = (date, duration)=>{
    duration
    if(duration*60000 <= SLOT_DURATION){
        return [date.toISOString().toString()];
    }
    else{
        let slotsCount = Math.ceil(duration*60000/SLOT_DURATION);
        let slots = [];
        let tempSlot = date;
        while(slotsCount > 0){
           slots.push(tempSlot.toISOString().toString());
           tempSlot = new Date(tempSlot.getTime() + SLOT_DURATION);
           slotsCount -=1;
        }
        return slots
    }
}


module.exports = {addEvent, getEvents}