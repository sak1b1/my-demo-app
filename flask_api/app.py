from flask import Flask, request, jsonify, send_from_directory, session,  make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import uuid
from werkzeug.utils import secure_filename
import os
from sqlalchemy import desc
import json
from functools import wraps
import jwt
import datetime


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

UPLOAD_FOLDER = os.path.join(basedir,'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'}

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'MyRandomSecretKeyForDemoApp'


cors = CORS(app)
db = SQLAlchemy(app)

if not os.path.exists(os.path.join(basedir, 'db.sqlite')):
	db.create_all()
	print('Created new databse: db.sqlite')

ma= Marshmallow(app)

# @app.route('/', methods=['GET'])
# def get():
# 	return jsonify({'msg': 'hello world!'})


# title: response.data.Title,
# year: response.data.Year,
# writer: response.data.Writer,
# director: response.data.Director,
# poster: response.data.Poster,
# ratings: response.data.Ratings,
# type: response.data.Type,
# imdbID: response.data.imdbID,


class Product(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(100), unique=True)
	year = db.Column(db.String(200))
	writer = db.Column(db.String(200))
	director = db.Column(db.String(200))
	poster = db.Column(db.String(2000))
	type_of = db.Column(db.String(200))
	imdb_id = db.Column(db.String(200))
	comments = db.relationship('Comment', backref='product', lazy=False)

	def __init__(self, title, year, writer, director, poster, type_of, imdb_id):
		self.title = title
		self.year = year
		self.writer = writer
		self.director = director
		self.poster = poster
		self.type_of = type_of
		self.imdb_id = imdb_id
		

	def __repr__(self):
		return "Product, id: %s, Name: %s " % (self.id, self.title)

class Comment(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(120))
	product_id = db.Column(db.Integer, db.ForeignKey('product.id'),
		nullable=False)
	posted_by = db.Column(db.Integer)

	def __init__(self,content,product_id, posted_by):
		self.content = content
		self.product_id = product_id
		self.posted_by = posted_by

	def to_json(self):
  		return {"id": self.id, "content": self.content, "product_id": self.product_id}



class CommentSchema(ma.Schema):
	class Meta:
		  fields = ('id', 'content', 'product_id', 'posted_by')

class ProductSchema(ma.Schema):
  	class Meta:
		  fields = ('id','title', 'year', 'writer', 'director', 'poster', 'type_of', 'imdb_id', 'comments')
	


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)




@app.route('/product', methods=['POST'])
def add_product():
	print(request.json)

	title = request.json.get('title')
	year = request.json.get('year')
	writer = request.json.get('writer')
	director = request.json.get('director')
	poster = request.json.get('poster')
	type_of = request.json.get('type_of')
	imdb_id = request.json.get('imdbID')

	new_product = Product(title, year, writer, director, poster, type_of, imdb_id)

	db.session.add(new_product)
	db.session.commit()

	#==== toDo changed
	# all_products = Product.query.order_by(desc(Product.id)).all()
	# result = products_schema.dump(all_products)
	#toDo changed

	return product_schema.jsonify(new_product)
	# return jsonify(result)

@app.route('/product', methods=['GET'])
# @check_for_token
def get_products():
	all_products = Product.query.order_by(desc(Product.id)).all()
	result = products_schema.dump(all_products)
	print('----')
	print(result)
	print('-----')
	
	for item in result:
		if item.get('comments'):
			item['comments'] = comments_schema.dump(item['comments'])

	return products_schema.jsonify(result)


@app.route('/product/<string:id>', methods=['GET'])
def get_product(id):
	product = Product.query.get(id)
	result = product_schema.dump(product)
	result['comments'] = comments_schema.dump(result['comments'])
	return product_schema.jsonify(result)






#========================= Comment ===============================
@app.route('/comment', methods=['GET'])
def get_comments():
	all_comments = Comment.query.order_by(desc(Comment.id)).all()
	result = comments_schema.dump(all_comments)
	return jsonify(result)

@app.route('/comment', methods=['POST'])
def add_comment():

	content = request.json.get('content')
	product_id=request.json.get('product_id')
	posted_by = request.json.get('posted_by')
	
	new_comment = Comment(content=content, product_id=product_id, posted_by=posted_by)

	db.session.add(new_comment)
	db.session.commit()

	#==== toDo changed
	# all_comments = Comment.query.order_by(desc(Comment.id)).all()
	# result = comments_schema.dump(all_comments)
	#toDo changed

	return comment_schema.jsonify(new_comment)
	# return jsonify(result)
if __name__ == '__main__':
	app.run(debug=True)


