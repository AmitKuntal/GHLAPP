const pg= require('pg');

const client = new pg.Client({
  user: 'ztlbqzhtnwgpzb',
  host: "ec2-3-213-85-90.compute-1.amazonaws.com",
  database: 'dclacpp7k00i21',
  password: "4e6569fc3613586bc77443d26c70b7fb780b6f7d4375dab5e9b09e653727120f",
  connectionString:"postgres://ztlbqzhtnwgpzb:4e6569fc3613586bc77443d26c70b7fb780b6f7d4375dab5e9b09e653727120f@ec2-3-213-85-90.compute-1.amazonaws.com:5432/dclacpp7k00i21",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = client