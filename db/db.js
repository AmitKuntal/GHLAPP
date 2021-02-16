const pg= require('pg');

const client = new pg.Client({
  user: 'ghluser',
  host: "localhost",
  database: 'ghlapp',
  password: "ghlpass",
  port: 5432
});

module.exports = client