const Deck = require("../models/card");

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
  
  const getOneDeck = async (req, res) => {
    try {
      const foundDeck = await Deck.findById(req.params.id).populate('cards');
      if (!foundDeck) {
        return res.redirect("/?error=Deck not found");
      }
      res.render("decks/show", { deck: foundDeck });
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
      res.redirect(`/decks/${newDeck._id}`);
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
        return res.redirect("/?error=Card not found");
      }
      res.render("decks/edit", { deck: deckToEdit });
    } catch (err) {
      console.error(err);
      res.redirect("/?error=Failed to load edit form");
    }
  };

  const editDeck = async (req, res) => {
    req.body.ReadyForBattle = req.body.ReadyForBattle === "on"; 
    try {
      const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDeck) {
        return res.redirect("/?error=Deck not found");
      }
      res.redirect(`/decks/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/decks/${req.params.id}?error=Failed to update deck`);
    }
  };

module.exports = {
    getAllDecks,
    getOneDeck,
    getNewForm,
    createDeck,
    deleteDeck,
    getEditForm,
    editDeck,
};
