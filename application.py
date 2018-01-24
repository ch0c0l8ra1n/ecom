from flask import *
from flask_login import LoginManager
from flask_session import Session
from pymongo import MongoClient
import os
from werkzeug.security import generate_password_hash, check_password_hash
import errors,success
import re

mongoServer = '139.59.92.128'
mongoUser = 'rjpjUsers'
mongoPwd = os.environ['ecompwd']
mongoDbName = 'users'

url = "mongodb://{}:{}@{}/{}?authSource={}".format(mongoUser,mongoPwd,mongoServer,mongoDbName,mongoDbName)

print(repr(url))


client = MongoClient(url)

db = client[mongoDbName]
users = db.users


#instantiating the flask app
app = Flask(__name__)

app.secret_key = "rjpj's Ecom website"
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

app.secret_key = "rjpj's Ecom website"


#instansiating flask-login login manager with flask app
#login = LoginManager(app)

@app.route("/")
def index():
	if not session.get('user_id'):
		return render_template("index.html", loggedin = 'false')
	return render_template("index.html" ,loggedin = 'true')

@app.route("/login",methods=["GET","POST"])
def login():
	session.clear()
	if request.method=="POST":
		print(request.form.to_dict())

		if not request.form.get('email') or not re.match( '.*@.*[.].*' , request.form.get('email') ):
			return jsonify(errors.invalidEmail)
		if not request.form.get('pwd') or not re.match( '.{6,}' , request.form.get('pwd') ):
			return jsonify(errors.invalidPwd)

		user = users.find_one({'email' : request.form.get('email')})

		if not user:
			return jsonify(errors.emailDoesNotExists)

		has = user['pwd_hash']

		if check_password_hash(has,request.form.get('pwd')):
			session['user_id'] = user['_id']
			return jsonify(success.loginSuccessful)

		return jsonify(errors.wrongPassword)

	else:
		return render_template("login.html")

@app.route("/register",methods=["GET","POST"])
def signup():
	if request.method == "POST":

		if not request.form.get('name') or not re.match( '.{1,}' , request.form.get('name') ):
			return jsonify(errors.invalidName)
		if not request.form.get('no') or not re.match( '9[0-9]*.{9}' , request.form.get('no') ):
			return jsonify(errors.invalidNo)
		if not request.form.get('email') or not re.match( '.*@.*[.].*' , request.form.get('email') ):
			return jsonify(errors.invalidEmail)
		if not request.form.get('pwd') or not re.match( '.{6,}' , request.form.get('pwd') ):
			return jsonify(errors.invalidPwd)

		user = users.find_one({'email' : request.form.get('email')})
		if user:
			return jsonify(errors.emailAlreadyExists)
		else:
			user = users.find_one({'no' : request.form.get('no')})
			if user:
				return jsonify(errors.noAlreadyExists)


		newUser = {
		'name':request.form.get('name'),
		'email':request.form.get('email'),
		'no':request.form.get('no'),
		'pwd_hash':generate_password_hash(request.form.get('pwd')),
		}
		
		newId = users.insert_one(newUser).inserted_id

		session['user_id'] = newId


		return jsonify(success.registerSuccessful)

	return render_template("register.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/cart")
def cart():
	return render_template("cart.html")


if __name__ == "__main__":
	app.run(host="0.0.0.0",port=80)