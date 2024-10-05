const Deck = require("../models/deck");
const Card = require("../models/card")

const getAllDecks = async (req, res) => {
    try {
      const allDecks = await Deck.find().populate('cards');
      console.log(allDecks);
      res.render("decks/index", { decks: allDecks });
    } catch (err) {
      console.error(err);
      res.redirect("/?error=Failed to load decks");
    }
  };
  
  const mongoose = require('mongoose');

const getOneDeck = async (req, res) => {
  try {
    const deckId = req.params.id;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(deckId)) {
      return res.redirect("/?error=Invalid deck ID");
    }

    const foundDeck = await Deck.findById(deckId).populate('cards');
    const allCards = await Card.find();

    if (!foundDeck) {
      return res.redirect("/?error=Deck not found");
    }

    res.render("decks/show", { deck: foundDeck, cards: allCards });
  } catch (err) {
    console.error(err);
    res.redirect("/?error=Failed to load deck");
  }
};


  const getNewForm = (req, res) => {
    res.render("decks/new");
  };
  
  const createDeck = async (req, res) => {
    try {
      await Deck.create(req.body);
      res.redirect(`/decks`);
    } catch (err) {
      console.error(err);
      res.render("decks/new", { error: err.message, deck: req.body }); 
    }
  };
  
  const deleteDeck = async (req, res) => {
    try {
      await Deck.findByIdAndDelete(req.params.id);
      res.redirect("/decks");
    } catch (err) {
      console.error(err);
      res.redirect("/?error=Failed to delete deck");
    }
  };

  const getEditForm = async (req, res) => {
    try {
      const deckToEdit = await Deck.findById(req.params.id);
      if (!deckToEdit) {
        return res.redirect("/?error=Deck not found");
      }

      const allCards = await Card.find();
      res.render("decks/edit", { deck: deckToEdit, cards: allCards });
    } catch (err) {
      console.error(err);
      res.redirect("/?error=Failed to load edit form");
    }
  };

  const editDeck = async (req, res) => { 
    try {
      const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDeck) {
        return res.redirect("/?error=Deck not found");
      }
      console.log("Updated deck:", updatedDeck);
      res.redirect(`/decks/${updatedDeck._id}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/decks/${req.params.id}?error=Failed to update deck`);
    }
  };

  // Used ChatGPT // ADD CARD route
  const addCardToDeck = async (req, res) => {
    const {deckId } = req.params;
    const { cardId } = req.body;
    console.log(deckId, cardId)
    try {
      const deck = await Deck.findById(deckId);
      if(!deck) {
        return res.status(404).send('Deck not found');
      }

      const cardExists = await Card.findById(cardId);
      if(!cardExists) {
        return res.status(404).send('Card not found');
      }

      if (!deck.cards.includes(cardId)) {
        deck.cards.push(cardId);
        await deck.save();
      }

      res.redirect(`/decks/${deck._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error')
    }
  };
// 1. Look up deck by ID
    // 2. Render new temp. and pass deck info to temp.
  // Send Post with form that takes ID from form & form body and update deck with addCard

  // Other function -> Finding deck by ID -> Create new Card -> Puts ID of new card into decks cards field and then saves the deck
    
module.exports = {
    getAllDecks,
    getOneDeck,
    getNewForm,
    createDeck,
    deleteDeck,
    getEditForm,
    editDeck,
    addCardToDeck
};
