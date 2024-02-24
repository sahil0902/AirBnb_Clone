const Listing = require("../models/listing");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken =  process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({accessToken: mapToken});

// Get all listings from the database and send them to the client as a response
//index route
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

//new listing route
module.exports.Add = async (req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
};

/////show route
module.exports.ShowAll = async (req, res, next) => {
    let { id } = req.params;
    console.log("Requested ID:", id); // Log the requested ID

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "This listing does not exist.");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

///create route
module.exports.CreateListing = async (req, res, next) => {

     
        let response = await geocodingClient.forwardGeocode({
            query: `${req.body.Listing.location},${req.body.Listing.city} ${req.body.Listing.country}`,
            limit: 1
        }).send();

        console.log("res\t" + JSON.stringify(response.body.features[0].geometry)); // Change this line
       
   
try {
    // req.body is the body of our request - in this case filled by out form
   let url = req.file.path;
   let filename = req.file.filename;
  // console.log(url + "sa" + filename);
    const newlisting = new Listing(req.body.Listing);
    newlisting.image = {url,filename};
    newlisting.owner = req.user._id; //this is how we associate a user with a listing
    newlisting.geometry = response.body.features[0].geometry;
    let savedListing = await newlisting.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}
catch(E){
    console.log("error\t"+ E);
}
};

//update route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    if (!id) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    console.log(id);
    let { title, description, price, country, location } =
        req.body.Listing;

   let listing =  await Listing.findByIdAndUpdate(id, {
        title,
        description,
       
        price,
        country,
        location,
    })

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image= {url,filename}
        await listing.save().then(res => console.log("sav image:" + res));
    }
        req.flash("success", "Successfully Updated Listing!");
        res.redirect(`/listings/${id}`);
  
};

//deleteroute
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    await Listing.findByIdAndDelete(id)
        .then((ress) => {
            console.log(ress);
            req.flash("success", "Listing Deleted");
            res.redirect("/listings");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/listings");
        });
};

//edit route
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            let err = new ExpressError(404, "Listing not found");
            res.render("error.ejs", { err });
        }
        let originalImage = listing.image.url;
        originalImage = originalImage.replace("/upload","/upload/h_300,w_250");
        res.render("listings/edit.ejs", { listing, originalImage });
    } catch (err) {
        console.log(err);
        res.redirect("/listings");
    }
};
