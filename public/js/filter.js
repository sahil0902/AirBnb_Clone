// document.addEventListener('DOMContentLoaded', () => {
//     let listings = [];

//     // Fetch listings data
//     fetch('/filter-listings')
//         .then(response => response.json())
//         .then(data => {
//             listings = data;
//             renderListings(listings);
//         })
//         .catch(e =>{
//             console.error('Error fetching listings:', e);
//         });

//     // Add click event listeners to filters
//     const filters = document.querySelectorAll('.filter');
//     filters.forEach(filter => {
//         filter.addEventListener('click', () => {
//             const category = filter.querySelector('p').textContent;
//             filterListings(category);
//         });
//     });

//     function filterListings(category) {
//         const filteredListings = listings.filter(listing => {
//             switch(category) {
//                 case 'Iconic Cities':
//                     return listing.isIconicCity;
//                 case 'Trending':
//                     return listing.isTrending;
//                 case 'Room':
//                     return listing.type === 'room';
//                 case 'Mountains':
//                     return listing.terrain === 'mountains';
//                 case 'Castles':
//                     return listing.type === 'castle';
//                 case 'Amazing Pools':
//                     return listing.hasAmazingPool;
//                 case 'Camping':
//                     return listing.type === 'camping';
//                 case 'Farms':
//                     return listing.type === 'farm';
//                 case 'Arctic':
//                     return listing.climate === 'arctic';
//                 case 'Domes':
//                     return listing.type === 'dome';
//                 default:
//                     return true;
//             }
//         });
//         renderListings(filteredListings);
//     }

//     function renderListings(listingsToRender) {
//         const listingsContainer = document.querySelector('.row');
//         listingsContainer.innerHTML = '';

//         listingsToRender.forEach(listing => {
//             const listingElement = createListingElement(listing);
//             listingsContainer.appendChild(listingElement);
//         });
//     }

//     function createListingElement(listing) {
       
//         const div = document.createElement('div');
//         div.className = 'card col listing-card';
//         div.style.width = '20rem';
       
//         return div;
//     }
// });

//displays vats and notification
window.addEventListener("load", () => {
    let taxSwitch = document.getElementById("flexSwitchCheckDefault");
    let taxInfo = document.querySelectorAll(".tax-info");
    1
    taxSwitch.addEventListener("click", () => {
        taxInfo.forEach(info => {
            info.style.display = info.style.display === "inline" ? "none" : "inline";
        });
    });
});
let filters = document.querySelectorAll(".filter");
filters.forEach(filter => {
    let filterName = filter.innerText;
    filter.addEventListener("click", () => {
        console.log(filter.innerText);
        Toastify({
            text: `${filterName} category is coming soon! Stay tuned for updates.`,
            duration: 4000,
            style: {
                background: "linear-gradient(to right, #FF5A5F, #FFB400)",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: "16px",
                padding: "10px 20px",
            }
        }).showToast();
    });
});