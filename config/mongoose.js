//require the library
const mongoose = require("mongoose");

//connect to DB
mongoose.connect("mongodb://localhost/contact_list");

//acquire the connection
const db = mongoose.connection;

//check for error
db.on("error", console.error.bind(console, "error connecting to DB"));

//if connection is successfull and running
db.once("open", function(){
    console.log("Successfully connected to DataBase");
});