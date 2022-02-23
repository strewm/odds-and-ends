from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length


# def check_zip_number(form, field):
#     zipcode = field.data

#     if

def check_zip_number(form, field):
    zipcode = field.data

    check_num = [character.isdigit() for character in zipcode]

    if not all(check_num):
        raise ValidationError('Zipcode must be numeric.')


class PostingForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired(), Length(min=2, max=2, message='State must be 2 characters.')])
    zipcode = StringField('zipcode', validators=[DataRequired(), check_zip_number, Length(min=5, max=5, message='Zipcode must be 5 characters.')])
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=30, message='Title must be 3-30 characters.')])
    caption = TextAreaField('caption', validators=[DataRequired()])
    icon = SelectField('icon', choices=['Food', 'Home', 'Supplies', 'Other'], validators=[DataRequired()])
