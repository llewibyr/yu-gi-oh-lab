// Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cardController = require('../controllers/cards.js');

// Middleware
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = ('path');

// App Config
dotenv.config();

const app = express()