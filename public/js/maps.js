console.log(listing.location);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 14 // starting zoom
});

const marker = new mapboxgl.Marker({ color: 'red' })
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<div style='background-color: #f1f1f1; border-radius: 5px; padding: 10px;'>
    <h4 style='color: red; font-size: 16px; margin: 0;'>${listing.location}</h4>
    <p style='color: #333; font-size: 14px;'>Exact location will be provided after booking</p>
</div>`)
)

.addTo(map);
// Add zoom buttons
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');


