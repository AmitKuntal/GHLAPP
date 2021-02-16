# GHLAPP

This project is for go high-level calendar app.

## Requirements

```bash
POSTGRESQL DB with name ghldb.
DB user name should ghluser and ghlpass
run seed script from ./seed/seedScript.js
```

## Free Slots API

```
End Point:- /free/slots
Method:- POST
Request body :
{
    "date":"2021-02-15",
    "timeZone":"Asia/Kolkata"
}
```
## Add Event API

```
End Point:- /event
Method:- POST
Request body :
{
    "date":"2021-02-14T12:00:00.000Z",
    "duration":70
}
```

## Add Get Event between date API

```python
End Point:- /get/events
Method:- POST
Request body :
{
    "startDate":"2021-02-12",
    "endDate":"2021-02-18"
}
```
