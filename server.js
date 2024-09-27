// Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cardController = require('../controllers/cards.js');

// Middleware
const methodOverride = require('method-override');
const morgan = require('morgan');
//const path = ('path');

// App Config
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const Card = require("./models/card”);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get(“/cards/new", (req, res) => {
  res.render(“cards/new");
});

app.get(“/cards/:id", async (req, res) => {
  try {
    const foundCard = await Card.findById(req.params.id);
    const contextData = { card: foundCard };
    res.render(“cards/show", contextData);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get(“/cards", async (req, res) => {
  try {
    const allCards = await Card.find();
    res.render(“cards/index", { cards: allCards, message: "Play" });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post(“/cards", async (req, res) => {
  if (req.body.ReadyToPlay) {
    req.body.ReadyToPlay = true;
  } else {
    req.body.ReadyToPlay = false;
  }

  try {
    await Card.create(req.body);
    res.redirect(“/cards/new?status=success");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete(“/cards/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    console.log(deletedCard, "response from db after deletion");
    res.redirect(“/cards");
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

app.get(“/cards/:card/edit", async (req, res) => {
  try {
    const cardToEdit = await Game.findById(req.params.cardId);
    res.render(“cards/edit", { card: cardToEdit });
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

app.put(“/cards/:id", async (req, res) => {
  try {
    if (req.body.ReadyToPlay === "on") {
      req.body.ReadyToPlay = true;
    } else {
      req.body.ReadyToPlay = false;
    }

    await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });

res.redirect(`/cards/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/cards/${req.params.id}`);
  }
});

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
  


