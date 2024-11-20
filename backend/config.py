from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mssql+pyodbc://DESKTOP-1HV37H6\\SQLEXPRESS/mytestDB?"
    "driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)