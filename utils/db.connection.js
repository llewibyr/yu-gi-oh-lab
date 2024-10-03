const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('connected', () => console.log(`connected on ${db.name}`))
db.on('error', (e) => console.error(`Error on ${db.host}: ${e.message}`))

db.on('disconnected', () => console.log(`disconnected on ${db.host}`))