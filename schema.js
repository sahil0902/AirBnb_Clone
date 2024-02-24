const Joi = require("joi");

const listingSchema = Joi.object({
    Listing : Joi.object({
           title : Joi.string().required(),  // required string
           description:Joi.string().required(),   // required string
           location:Joi.string().required(),     // required string
           price: Joi.number().positive().integer().min(0),// positive integer number
        country:Joi.string().required(),
        image : Joi.string().allow("",null)                 // optional string
    }).required()
});



const reviewSchema = Joi.object({
     review : Joi.object({
        rating : Joi.number().integer().min(1).max(5).required(),      // integer from 1 to 5
        comment  : Joi.string().required(),

     }).required()
});

module.exports = { listingSchema, reviewSchema };