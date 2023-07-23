const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 80;

app.use(bodyParser.json());

const forwardingUrl = process.env.FORWARDING_URL;
const serviceName = process.env.SERVICE_NAME;

// Endpoint 1: Returns 200 and some text
app.get('/endpoint1', (req, res) => {
  console.log(`Request from ${req.ip}`);
  res.status(200).send(`Request to service ${serviceName} from ${req.ip}`);
});

// Endpoint 2: Forwards the request to a URL read from an environment variable
app.use('/endpoint2', (req, res) => {
  console.log(`Request from ${req.ip}`);
  request(`${forwardingUrl}${req.url}`).pipe(res);
});

// Endpoint 3: Queries a PostgreSQL database
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 300000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 20000,
    //ssl: {
    //    sslmode: 'require'
    //},
});

app.get('/endpoint3', async (req, res) => {
  console.log(`Request from ${req.ip}`);
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    res.status(200).send(result.rows);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});