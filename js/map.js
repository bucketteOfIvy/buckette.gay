/* global L */

// load in a basemap from OSM of Hyde Park at it's latitude and longitude
var map = L.map('map').setView([41.7898, -87.5987], 16)

var osm = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
var stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

stadiaDark.addTo(map)

var baseMaps = {
  'Open Street Maps': osm,
  'Stadia Dark': stadiaDark
}

L.control.layers(baseMaps).addTo(map)

var style = {
  color: 'rgba(85, 205, 252, 1)',
  fillColor: 'rgba(85, 205, 252, .825)',
  // fillColor: 'rgba(247, 168, 184, .25)',
  // fillColor: '#FFFFFF',
  weight: 2,
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
        displayString = '<h5>' + feature.properties.Building + '</h5><br>' + bathrooms.join(' <br> ')
        layer.bindPopup(displayString)
      })
    }
  }
)
// add the geojson layer to the map
buildings.addTo(map)
