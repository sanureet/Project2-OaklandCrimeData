# Project 2 Oakland Crime Data

## Table of Contents

- [Oakland Crime Data](#oakland-crime-data)
  - [Table of contents](#table-of-contents)
  - [The Challenge](#the-challenge)
  - [The Development Process](#the-developement-process)
  - [The Output](#the-ouput)
  - [Installation and Uage](#installation-and-usage)
  - [Credits, tools and other references](#credits-tools-and-other-references)

## The Challenge [remove after project completed]

In this project, we created a Full Stack webpage that visualizes the city of Oakland, California crime data derived from public sources. It is an dynamic website that pulls data from a SQL database, filters the information based on user input. The data is presented as map layers including Oakland neighborhoods, as well as crime yptes that are plotted using geo-coordinates. 

Here are key attributes of the project:
- A “thick” SQL server that performs multiple manipulations on data in a database prior to visualization
- A dashboard page with multiple charts that update from the same data
- Python Flask-powered API
- HTML/CSS for the front-end
- User-driven interaction

## About
Oakland Crime
The Development Process

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
- geoJSON 2.5.0
- Bootstrap
- d3.js
- Leaflet
- plotly
- Jquery
- Material Design Bootstrap
- PostgreSQL 13.2
