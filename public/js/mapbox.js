/*eslint-disable*/

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGljaHUyNSIsImEiOiJja2Nrb2o3cTkxOHpvMnNvMzdlendxcWhnIn0.WUEIs2j-b2701kwDZ73-vg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dichu25/ckckoqduy56x51imqj1gbtsq1',
  scrollZoom: false

  //   center: [-118.113491, 34.111745],
  //   zoom: 4
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';
  //add the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>${loc.day}:${loc.description}</p>`)
    .addTo(map);

  //extends the map bounds to include the current location
  bounds.extend(loc.coordinates);
});
map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
