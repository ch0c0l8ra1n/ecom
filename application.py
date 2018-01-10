from flask import *
from flask_login import LoginManager

#instantiating the flask app
app = Flask(__name__)

#instansiating flask-login login manager with flask app
login = LoginManager(app)

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/login",methods=["GET","POST"])
def login():
	if request.method=="POST":
		return render_template("login.html")
	else:
		return render_template("login.html")

@app.route("/signup")
def signup():
	return render_template("signup.html")

@app.route("/cart")
def cart():
	return render_template("cart.html")


if __name__ == "__main__":
	app.run(host="0.0.0.0",port=80)