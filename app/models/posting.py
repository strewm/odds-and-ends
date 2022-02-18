from .db import db
from sqlalchemy.sql import func
from datetime import datetime


saved = db.Table(
    "saved",
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('posting_id', db.Integer, db.ForeignKey('postings.id'), primary_key=True)
)

class Posting(db.Model):
    __tablename__ = 'postings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    caption = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now())

    users = db.relationship('User', back_populates='postings', secondary=saved)
    pickups = db.relationship('Pickup', back_populates='postings')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'title': self.title,
            'caption': self.caption,
            'icon': self.icon,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class Pickup(db.Model):
    __tablename__ = 'pickups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    posting_id = db.Column(db.Integer, db.ForeignKey('postings.id'), nullable=False,)
    date = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now())

    users = db.relationship('User', back_populates='pickups')
    postings = db.relationship('Posting', back_populates='pickups')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'posting_id': self.posting_id,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
