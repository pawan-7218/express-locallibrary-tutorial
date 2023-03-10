mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: beta.geometry.coordinates, // starting position [lng, lat]
    zoom: 4 ,// starting zoom
});
new mapboxgl.Marker()
.setLngLat(beta.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({offset:25})
  .setHTML(
    `<h3>${beta.title}</h3>`
  )
)
.addTo(map);

