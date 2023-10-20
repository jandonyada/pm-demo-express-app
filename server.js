const express = require("express");
const app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  const friends = [
    { name: "Shanty", department: "Design", interest: "Drinking" },
    { name: "Anty", department: "Engineering", interest: "Tennis/soccer" },
    { name: "Jackson", department: "Product Ops", interest: "Shitposting" },

  ];
  const tagline = "These are the 3 people in OGP I dislike the least!";

  res.render("pages/index", {
    friends: friends,
    tagline: tagline,
  });
});

// work page
app.get("/work", function (req, res) {
  const works = [
    {
      name: "Isomer",
      description: "building websites for gahmen",
    },
    {
      name: "Project GoBlock",
      description: "building websites without code—using blocks.",
    },
    {
      name: "Project MMORPG",
      description: "allowing multiple content collaborators to publish independently on a single site.",
    },
    {
      name: "FarQueue",
      description: "queuing from afar.",
    },
  ];

  res.render("pages/work", {
    works: works,
  });
});

// about page
app.get("/interest", function (req, res) {
  res.render("pages/interest");
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/status', (req, res) => res.send({ status: "I'm up and running" }));

app.listen(port, () => console.log(`Node.js Application is listening on port ${port}!`));

app.post('/insert', (req, res) => {
  const { username, email, age } = req.query;

  if (username && email && age) {
    console.log('Received an insert call');
    const insertQuery = 'INSERT INTO users (username, email, age) VALUES ($1, $2, $3)';
    const values = [username, email, age];

    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send({ username, email, age });
      }
    });
  } else {
    console.log('Something went wrong, Missing a parameter');
    res.status(400).send('Missing parameters');
  }
});

app.get('/list', (req, res) => {
  console.log('Received a list call');
  const selectQuery = 'SELECT * FROM users';

  pool.query(selectQuery, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(port);
console.log("Server is listening on specified port");
