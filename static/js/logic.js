function createMap(earthquakes) {
//L.circleMarker(latlng)
    //This base code is from 01-Lesson-Plans\17-Mapping-Web\3\Activities\01-Stu_CitiBike\Solved\Basic
    //I am turning it into HW for 17
    //
    
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "lightmap": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "earthquakes": earthquakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 4,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "features" property off of response.data
  var features = response.features;

  // Initialize an array to hold earthquake markers
  var bikeMarkers = [];

  // Loop through the features array
  for (var index = 0; index < features.length; index++) {
    var feature = features[index];

    // For each station, create a marker and bind a popup with the earthquake's name
    var bikeMarker = L.marker([feature.latlng])
      .bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

    // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bikeMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", createMarkers);
