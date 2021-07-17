# import necessary libraries
import pandas as pd
from config import db_user, db_password, db_host, db_port, db_name

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from sqlalchemy import create_engine

# instantiate Flask
app = Flask(__name__)

# connect to the SQLite DB
rds_connection_string = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'

engine = create_engine(rds_connection_string)

# create your default route
@app.route("/")
def home():
    return render_template('index.html')

# route to generate the form and/or POST data
# @app.route("/send", methods=["GET", "POST"])
# def send():
    # connect to db engine
    # conn = engine.connect()

    # # do this only if the form is POSTing data
    # # evaluate if the this is a POST request
    # if request.method == "POST":

    #     # use `request.form` to pull form attributes by their `name` attribute in the HTML
    #     nickname = request.form["nickname"]
    #     age = request.form["age"]

    #     # convert to a DataFrame so that we can use to_sql
    #     nickname_df = pd.DataFrame({
    #         'nickname': [nickname],
    #         'age': [age],
    #     })

    #     # post the update to the DB
    #     nickname_df.to_sql('pets', con=conn, if_exists='append', index=False)

    #     # send the user to the endpoint that contains the data listing
    #     return redirect('/')

    # # if the method is NOT POST (otherwise, GET, then send the user to the form)
    # return render_template("form.html")

# route to view data
@app.route("/api/data")
def crime_db():
    # connect to db engine
    conn = engine.connect()
  
    # query the database using Pandas
    crime_df = pd.read_sql('SELECT * FROM lat', con=conn)

    # convert the result to json
    crime_json = crime_df.to_json(orient='records')

    # close the db connection
    conn.close()

    # return json to the client
    return crime_json

# run the app in debug mode
if __name__ == "__main__":
    app.run(debug=True)