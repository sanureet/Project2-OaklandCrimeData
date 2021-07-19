// Adding tile layer
var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Street: street,
  Light: light,
  Dark: dark
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [37.8044, -122.2712],
  zoom: 12,
  layers: [street]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);

// Use this link to get the geojson data.
var link = "../static/data/opd_boundaries-geojson.json";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(CP_BEAT) {
  switch (CP_BEAT) {
  case "12X":
    return "yellow";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link).then(data => {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.CP_BEAT),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup(`<h1>Police District:&nbsp;${feature.properties.POL_DIST}</h1><hr/><h2 style='text-align: center;'>Police Beat:&nbsp;${feature.properties.CP_BEAT}</h2>`);

    }
  }).addTo(myMap);
});

// Grab the data with d3
d3.json( "../static/data/oakland_crime_data.json").then( function( response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for ( var i = 0; i < response.length; i++) {

    // // Set the data location property to a variable
    // var location = response[i].address;

    // Check for location property
    if ( response[i].lng) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer( L.marker( [lng, lat])
        .bindPopup( response[i].crimetype));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer( markers);

});
