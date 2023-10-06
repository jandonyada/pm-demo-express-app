const express = require("express");
const app = express();

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

app.listen(3000);
console.log("Server is listening on port 3000");
