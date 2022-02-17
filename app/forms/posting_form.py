from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Posting


class PostingForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    caption = TextAreaField('caption', validators=[DataRequired()])
    icon = SelectField('icon', choices=['Food', 'Home', 'Supplies', 'Other'], validators=[DataRequired()])
