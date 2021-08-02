# Project 2 Oakland Crime Data

## Table of Contents

- [Oakland Crime Data](#oakland-crime-data)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [The Development Process](#the-developement-process)
  - [The Output](#the-ouput)
  - [Installation and Uage](#installation-and-usage)
  - [Credits, tools and other references](#credits-tools-and-other-references)

## Description

In this project, a Full Stack webpage was created to visualize the city of Oakland, California's crime data for years 2019 and 2020. It is useful for understanding the types and number of crimes committed in the various Oakland neighborhoods. The dynamic webpage pulls data from a SQL database, and presents the data as map layers over a map of the city. The map layers include Oakland neighborhoods, and crime types. The crime data is plotted using a cloropleth map that uses differences in color shading, within the various neighborhoods, to indicate the number of crimes in those areas. Clicking on each neighborhood displays the crimes associated with that particular area.

## Key Features
Key attributes of the project:
- A “thick” SQL server performs multiple manipulations, on data in a database, prior to visualization
- A dashboard page with three charts that update from the same data
- Python Flask-powered API
- HTML/CSS for the front-end
- User-driven interaction radio buttons
- PostgreSQL database back-end to serve up data

### The Development Process
Crime data was pulled from the City of Oakland's Crime Watch Data respository, and truncated to years 2019-2020. 
Jupyter Notebook was then used to set up the connection to our Postgres db, set up the data tables and confirm that the tables were written to Postgres. 
An index.html page was created with a basic layout using layitout.com to configure the container, rows and columns that would hold the 4 visualizations. 
A Python Flask App  "app.py" was created within which routes were designated to render the index.html page and the postgres db. 
Another Jupyter Notebook was created to read in the flask app data route and merge this with the neigbhorhoods polygon data geojson file which outlines the Oakland neighborhoods. 
This was done by converting the crime data route into a geodataframe (with the gpd.GeoDataFrame function to pull the lat & lng points) and then merged this and the neighborhood geodataframes with the gpd.sjoin function. 
Next, a javascript file was created "crimemap.js" to create visuals and render them within the html page. 
Created and called multiple functions within the javascript that were connected to ids within the html file: 
	1) A function to load the map by reading in the merged geodata and applying choropleth layer to show concentration of the crime data for each neighbhorhood.
	2) A function to create a horizontal bar chart - utilized the plotly library 
	3) A function to create a pie chart - utilized the plotly library 
	4) A function to create a data table - utilized the JQuery - Material Design Bootstrap
	5) A function to apply filters




**The application**
![Screenshot1]()
![Screenshot2]()

## Installation and Usage
Mapbox is a location data platform that powers map and location services. We used Mapbox to map geocoordinates of Oakland crimes. You will need to create an account in order to create access tokens for the Mapbox api. https://docs.mapbox.com/help/tutorials/get-started-tokens-api/

To install the project follow these steps:

1. Install PostgreSQL https://www.postgresql.org/download/
2. Clone the repo and install the dependencies.
3. Create config.py file for THE PostgreSQL DB. Add:
db_user = 'YOUR USERNAME'
db_password = 'YOUR PASSWORD'
db_host = 'localhost'
db_port = '5432'
db_name = 'crime_db'
then place file in static > py folder


```bash
git clone https://github.com/speedracer05/Project2-OaklandCrimeData
cd Map
```

```bash
$ pip install gmaps
$ pip install js
$ pip install d3
$ pip install geojson
$ pip install plotly
$ pip install leaflet
$ pip install jquery
$ pip install bootstrap4
$ pip install SQLAlchemy
```

## Credits, tools and other references

**Collaborators**
- John Chan
- Sanureet Bhullar
- Jackson Freese
- Matt Jensen
- Veerpal Sanga

**Third Party Assets**
- JSON
- Pandas 0.25.3
- Requests 2.5.1
- SQLAlchemy 1.4.20
- Psycopg2
- geoJSON 2.5.0
- Bootstrap
- d3.js
- Leaflet
- plotly
- Jquery
- Material Design Bootstrap
- PostgreSQL 13.2
