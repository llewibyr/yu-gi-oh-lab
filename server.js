// Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cardController = require('./controllers/cards.js');
const deckController = require('./controllers/deck.js');



// Middleware
const methodOverride = require('method-override');
const morgan = require("morgan");
const path = require("path");

// App Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const Card = require("./models/card");
const Deck = require('./models/deck');

// Setting up view engine and middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public"))); // Uncommented static files middleware

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

// CARD routes
app.get("/cards/new", cardController.getNewForm);
app.get("/cards/:id", cardController.getOneCard);
app.get("/cards", cardController.getAllCards);
app.post("/cards", cardController.createCard);
app.delete("/cards/:id", cardController.deleteCard);
app.get("/cards/:id/edit", cardController.getEditForm);
app.put("/cards/:id", cardController.editCard);

// DECK routes
app.get("/decks/new", deckController.getNewForm);
app.get("/decks/:id", deckController.getOneDeck);
app.get("/decks", deckController.getAllDecks);
app.post("/decks", deckController.createDeck);
app.delete("/decks/:id", deckController.deleteDeck);
app.get("/decks/:id/edit", deckController.getEditForm);
app.put('/decks/:id', deckController.editDeck);
app.post('/decks/:deckId/cards', deckController.addCardToDeck);

// Starting the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
