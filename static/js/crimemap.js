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

var layers = {
  PETTY_THEFT: new L.LayerGroup(),
  STOLEN_VEHICLE: new L.LayerGroup(),
  ROBBERY: new L.LayerGroup(),
  FELONY_ASSAULT: new L.LayerGroup(),
  FORCIBLE_RAPE: new L.LayerGroup()
};


// Create map object and set default layers
var myMap = L.map("map", {
  center: [37.8044, -122.2712],
  zoom: 12,
  layers: [
    street,
    layers.PETTY_THEFT,
    layers.STOLEN_VEHICLE,
    layers.ROBBERY,
    layers.FELONY_ASSAULT,
    layers.FORCIBLE_RAPE
  ]
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
    return "skyblue";
  default:
    return "skyblue";
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
        fillOpacity: 0.3,
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


// // Create an overlays object to add to the layer control
// var overlays = {
//   "Petty Theft": layers.PETTY_THEFT,
//   "Stolen Vehicle": layers.STOLEN_VEHICLE,
//   "Tobbery": layers.ROBBERY,
//   "Felony Assault": layers.FELONY_ASSAULT,
//   "Forcible Rape": layers.FORCIBLE_RAPE
// };
// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   PETTY_THEFT: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   STOLEN_VEHICLE: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   ROBBERY: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   FELONY_ASSAULT: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   FORCIBLE_RAPE: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };

// // Grab the data with d3
// d3.json('/api/data').then( function(crimedata) {
//   var crimetype = data.crimetype;
//   var crimeinfo = data.casenumber;

//   var crimecount = {
//     PETTY_THEFT:0,
//     STOLEN_VEHICLE:0,
//     ROBBERY:0,
//     FELONY_ASSAULT:0,
//     FORCIBLE_RAPE:0
//   };

//   var crimecode;

//   // Loop through the stations (they're the same size and have partially matching data)
//   for (var i = 0; i < crimeinfo.length; i++) {

//     // Create a new station object with properties of both station objects
//     var crime = Object.assign({}, crimeinfo[i], crimetype[i]);
//     // If a station is listed but not installed, it's coming soon
//     if (crime.) {
//       crimecode = "PETTY_THEFT";
//     }
//     // If a station has no bikes available, it's empty
//     else if (!station.num_bikes_available) {
//       crimecode = "STOLEN_VEHICLE";
//     }
//     // If a station is installed but isn't renting, it's out of order
//     else if (station.is_installed && !station.is_renting) {
//       crimecode = "ROBBERY";
//     }
//     // If a station has less than 5 bikes, it's status is low
//     else if (station.num_bikes_available < 5) {
//       crimecode = "FELONY_ASSAULT";
//     }
//     // Otherwise the station is normal
//     else {
//       crimecode = "FORCIBLE_RAPE";
//     }

//     // Update the station count
//     stationCount[crimecode]++;
//     // Create a new marker with the appropriate icon and coordinates
//     var newMarker = L.marker([station.lat, station.lon], {
//       icon: icons[crimecode]
//     });

//     // Add the new marker to the appropriate layer
//     newMarker.addTo(layers[stationStatusCode]);

//     // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//     newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//   }

//   // Call the updateLegend function, which will... update the legend!
//   updateLegend(updatedAt, stationCount);
// });
