from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import User, db
from app.forms import UpdateProfile


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# @user_routes.route('/')
# # @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# @user_routes.route('/<int:id>')
# # @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()


@user_routes.route('/<username>')
# @login_required
def username(username):
    print(username)
    user = User.query.filter(User.username == username).first_or_404()

    return user.to_dict()


@user_routes.route('/user/<int:userId>', methods=["PUT"])
# @login_required
def updateUserProfile(userId):
    form = UpdateProfile()
    form['csrf_token'].data = request.cookies['csrf_token']

    image = form["profile_picture"].data

    if not allowed_file(image.filename):
        return {'errors': "Invalid File Type"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    if form.validate_on_submit():
        user = User.query.get(userId)
        user.profile_picture=url

        # db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
