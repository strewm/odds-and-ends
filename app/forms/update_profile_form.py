from flask_wtf import FlaskForm
from wtforms import FileField


class UpdateProfile(FlaskForm):
    profile_picture = FileField('profile_picture')
