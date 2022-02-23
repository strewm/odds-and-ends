from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, Length(min=3, max=40, message='Username must be 3-40 characters.')])
    email = StringField('email', validators=[DataRequired(), email_exists, Email()])
    password = StringField('password', validators=[DataRequired(), EqualTo('confirm_password', message='Passwords must match.')])
    confirm_password = StringField('confirm_password', validators=[DataRequired()])
    profile_picture = TextAreaField('profile_picture')
