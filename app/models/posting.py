from .db import db
from sqlalchemy.sql import func


saved = db.Table(
    "saved",
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
    db.Column('posting_id', db.Integer, db.ForeignKey('postings.id'))
)

class Posting(db.Model):
    __tablename__ = 'postings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('users.id'))
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String, nullable=False)
    caption = db.Column(db.Text, nullable=False)
    icon = db.Column(db.Text, nullable=False)

    users = db.relationship('User', back_populates='postings')
    pickups = db.relationship('Posting', back_populates='postings')

    save = db.relationship(
        'User',
        secondary=saved,
        primaryjoin=(saved.c.posting_id == id),
        # backref=db.backref("saved"),
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'name': self.name,
            'caption': self.caption,
            'icon': self.icon
        }


class Pickup(db.Model):
    __tablename__ = 'pickups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('users.id'))
    posting_id = db.Column(db.Integer, nullable=False, db.ForeignKey('postings.id'))
    date = db.Column(db.String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

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
