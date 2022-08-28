const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instagram');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error with connecting the MongoDB"));
db.once('open', () => {
    console.log("Succesfully connected with MongoDB");
});

module.exports = db;