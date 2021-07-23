/****************************************
 ************ Map Layers*****************
 ****************************************/

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
  layers: [
    street
  ]
});

// setting up the legend so that the scope is global;
var legend;


  /****************************************
   *************User Filters***************
  ****************************************/


function destroyTableAndFilterCrime() {
  var crime_table = $('#crime-table').DataTable();
  crime_table.destroy();

  filterCrime();
}

function filterCrime() {

  var filter_year = document.querySelector('input[name="year"]:checked').value;
  var filter_crime_category = document.querySelector('input[name="crimecategory"]:checked').value;
  
  try{
    myMap.removeControl(legend);
  }
  catch{;
    console.log('An error has occurred while trying to remove the legend.')
  }

  populateBarChart(filter_year, filter_crime_category);
  populatePieChart(filter_year, filter_crime_category);
  populateDataTable(filter_year, filter_crime_category);
  loadMap(filter_year, filter_crime_category);
}


/****************************************
 **********Bar Chart Function************
 ****************************************/

function populateBarChart(filter_year, filter_crime_category){

  d3.json('/api/data/crime_summary').then(data => {    

    filteredData = data.filter(d => d['years'] == filter_year)
                        .filter(d => d['category'] == filter_crime_category);

    filteredData.sort((a, b) => b['count'] - a['count']);
    filteredData.reverse();
    
    console.log(filteredData);

    var crime_type = filteredData.map(d => d['crimetype']);
    var incident_count = filteredData.map(d => d['count']);

    var plotdata = [{
      type: 'bar',
      x: incident_count,
      y: crime_type,
      orientation: 'h'
    }];

    var layout = {
      autosize: true,
      yaxis: {
        automargin: true
      }
    }
    
    Plotly.newPlot('crime-bar', plotdata, layout);
  })

}

/****************************************
 **********Pie Chart Function************
 ****************************************/

 function populatePieChart(filter_year, filter_crime_category){

  d3.json('/api/data/crime_nb_summary').then(data => {    

    filteredData = data.filter(d => d['years'] == filter_year)
                        .filter(d => d['category'] == filter_crime_category);

    filteredData.sort((a, b) => b['count'] - a['count']);
    // filteredData.reverse();
    
    
    console.log(filteredData);

    var crime_nb = filteredData.map(d => d['nb_name']);
    var incident_count = filteredData.map(d => d['count']).slice(0,10);

    var plotdata = [{
      values: incident_count,
      labels: crime_nb,
      type: 'pie',
      textinfo: 'none'
    }];

    var layout = {
      height: 400,
      width: 500,
      // showlegend: false
      };
    
    Plotly.newPlot('crime-pie', plotdata, layout);
  })

}

/****************************************
 ***************Data Table****************
 ****************************************/

function populateDataTable(filter_year, filter_crime_category) {

  tbody = d3.select('#crime-tbody');
  tbody.html('');

  d3.json('api/data').then(data => {

    console.log('populating data table');

    filteredData = data.filter(d => d['years'] == filter_year)
    .filter(d => d['category'] == filter_crime_category);

    console.log(filteredData);

    filteredData.forEach(row => {

      tr = tbody.append('tr');

      tr.append('td').text(row['casenumber'])
      tr.append('td').text(row['description'])
      tr.append('td').text(row['address'])
          
      });

  });
  

  // Attach MDBootstrao the Crime table with a 5 second timeout
  console.log('timer started');
  setTimeout(function() {

   $(document).ready(function () {
     $('#crime-table').DataTable({
       "pagingType": "full_numbers" // "simple" option for 'Previous' and 'Next' buttons only
     });
     $('.dataTables_length').addClass('bs-select');
   });
   console.log('timer finished');

  }, 5000);

}


/****************************************
 **************Choropleth****************
 ****************************************/

function loadMap(filter_year, filter_crime_category) {
  // Load in geojson data
  var geoData = "../static/data/neighborhoods_with_crime_data.geojson";

  var geojson;

  // Grab data with d3
  d3.json(geoData).then(function(data) {

    // Preview geoJSON
    console.log(data);

    // Create a new choropleth layer
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      neighborhood: "NAME",

      valueProperty: `${filter_year} ${filter_crime_category}`,

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.7
      },

      // Binding a pop-up to each layer
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
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 60%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.7
            });
          },
          // // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
          // click: function(event) {
          //   myMap.fitBounds(event.target.getBounds());
          // }
        });

        
        year = filter_year;
        crime_other = feature['properties'][`${year} Other`]
        crime_property = feature['properties'][`${year} Property`]
        crime_violent = feature['properties'][`${year} Violent`]

        layer.bindPopup(`<b>${feature.properties.NAME} <hr/>` +
                        `${year} Violent Crimes: ${crime_violent}` + 
                        `<br>${year} Property Crimes: ${crime_property}` +
                        `<br>${year} Other Crimes: ${crime_other}` 
                      );
            }
    }).addTo(myMap);

    // Set up the legend
    legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h6>Crime Instances</h6>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

  });
}

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);

// Run filterCrime function by default, which calls loadMap()
filterCrime();