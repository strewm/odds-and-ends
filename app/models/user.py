from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .posting import saved


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_picture = db.Column(db.Text, nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    postings = db.relationship('Posting', back_populates='user', cascade="all, delete")
    saved_postings = db.relationship('Posting', back_populates='user_saved', secondary=saved, cascade="all, delete")
    pickups = db.relationship('Pickup', back_populates='users', cascade="all, delete")

    # save = db.relationship(
    #     "Posting",
    #     secondary=saved,
    #     primaryjoin=(saved.c.user_id == id),
    #     lazy='dynamic'
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'postings': [posting.to_dict() for posting in self.postings],
            'saved_postings': [posting.to_dict() for posting in self.saved_postings]
        }
