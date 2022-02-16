from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError


class PickupForm(FlaskForm):
    date = StringField('date', validators=[DataRequired()])
