// Importing required modules
const express = require('express'); // Importing express module
const mongoose = require('mongoose'); // Importing mongoose module
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose; // Importing Schema object from mongoose

const UserSchema = new Schema({
   //passport local will define username and password for authentication
  email : {
      type: String,
      required : true
  }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema); // Export the model
