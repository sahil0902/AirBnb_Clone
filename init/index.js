const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust'
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.error(`Error connecting to database: ${err}`);
});


const initDB = async () =>{
    // delete all listings in the db
    await Listing.deleteMany({});
   initData.data =  initData.data.map((obj) => ({...obj, owner : "65d27a104d9382d9134e8cf4"}));
    // create new listings from data
    await Listing.insertMany(initData.data);
   (console.log("data was saved"));
}

initDB();