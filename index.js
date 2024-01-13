require("dotenv").config();
const path = require("path"); // untuk menentukan path position dari file / folder
const express = require("express");
const tagsData = require("./data.json");
const app = express();
const PORT = process.env.PORT || 9001;

// set view engine, where the template engine is stored & static folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // to set path to views folder
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10 + 1);
  res.render("random", { num });
});

app.get("/tag/:tag", (req, res) => {
  const { tag } = req.params;
  const data = tagsData[tag]; // access property in tagsData using tag

  if (data) {
    res.render("tag.ejs", { data });
  } else {
    res.render("notFound.ejs", { tag });
  }
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Lola", "Coco"];
  res.render("cats", { cats });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
