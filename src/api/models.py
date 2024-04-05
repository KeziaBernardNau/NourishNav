from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(60), nullable=True)
    age = db.Column(db.Integer, nullable=False)
    height = db.Column(db.String(20), nullable=False)
    weight = db.Column(db.Integer, nullable=True)
    activity_level = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(1500), nullable=True)

    def get_favorites(self):
        favorites = Favorites.query.filter_by(uid=self.id)
        favorites = [favorite.serialize() for favorite in favorites]
        return favorites

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "activity_level": self.activity_level,
            "profile_picture": self.profile_picture,
            "favorites": self.get_favorites(),
            # do not serialize the password, its a security breach
        }

class Favorites(db.Model):
    __tablename__ = "Favorites"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    uid = db.Column(db.Integer, nullable=False)
    recipe_name =db.Column(db.String(2000), nullable=False)


    def __repr__(self):
        return f'<Favorite {self.recipe_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "recipe_name": self.recipe_name
        }
    
class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)  

    def __repr__(self):
        return f'<Recipe {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ingredients": self.ingredients.split(", ")  # Converts ingredients string into a list
        }
