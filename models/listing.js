const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Review = require("./review.js");
const listingSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: [
        {
            url: String,
            filename: String
        }
    ],
    category: {
        type: String,
        default: "Room"
    },
    price: String,
    location: String,
    country: String,
    reviews : [
        {
        ////defining it as a foregin key (review collection)
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    geometry : {
        type: {
            type:String,
            enum : ['Point'],
            required:true
        },
        coordinates: {
            type: [Number],
            required: true 
        }
    }
});

///creating middlewweare
listingSchema.post("findOneAndDelete", async (listing)=>{
if(listing) {
   await Review.deleteMany({_id: {$in: listing.reviews}});
  }

});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
