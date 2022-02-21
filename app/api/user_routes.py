from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route('/<int:id>')
# # @login_required
# def user(id):
#     print('-------------------', id)
#     user = User.query.get(id)
#     username = user.username
#     print('+++++++++++++', username)
#     return user.to_dict()


@user_routes.route('/<username>')
# @login_required
def username(username):
    print(username)
    user = User.query.filter(User.username == username).first_or_404()
    # user = User.query.get(username)

    print('=========user route', user.to_dict())

    return user.to_dict()
