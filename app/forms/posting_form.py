from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Posting

def title_length(form, field):
    title = field.data

    if len(title) >= 31:
        raise ValidationError('Title must be less than 30 characters.')

def state_length(form, field):
    state = field.data

    if len(state) >= 3:
        raise ValidationError('State must be two characters.')

class PostingForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired(), state_length])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), title_length])
    caption = TextAreaField('caption', validators=[DataRequired()])
    icon = SelectField('icon', choices=['Food', 'Home', 'Supplies', 'Other'], validators=[DataRequired()])
