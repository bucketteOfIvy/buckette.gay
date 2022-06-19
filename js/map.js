/* global L */

// load in a basemap from OSM of Hyde Park at it's latitude and longitude
var map = L.map('map').setView([41.7898, -87.5987], 16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map) // add it to the map

var style = {
  fillColor: '#F7A8B8',
  color: '#000000',
  weight: 1,
  opacity: 1,
  fillOpacity: 1
}

// TODO change how data is formatted initially so that this can have a less
//      hacky solution.
// import the geojson layer via AJAX

var buildings = new L.GeoJSON.AJAX('js/data/bathrooms.geojson',
  {
    style: style,
    onEachFeature: function (feature, layer) {
      layer.on('mouseover', function (e) {
        var displayString
        var bathrooms = [feature.properties.B1, feature.properties.B2,
          feature.properties.B3, feature.properties.B4, feature.properties.B5,
          feature.properties.B6, feature.properties.B7, feature.properties.B8,
          feature.properties.B9, feature.properties.B10, feature.properties.B11,
          feature.properties.B12, feature.properties.B13, feature.properties.B14,
          feature.properties.B15, feature.properties.B16, feature.properties.B17]
        bathrooms = bathrooms.filter(x => x !== null)
        displayString = bathrooms.join(' <br> ')
        layer.bindPopup(displayString)
      })
    }
  }
)
// add the geojson layer to the map
buildings.addTo(map)
