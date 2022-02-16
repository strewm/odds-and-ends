from flask import Blueprint, jsonify, redirect, session, request
from flask_login import current_user, login_required
from app.models import User, Post, db
from sqlalchemy.orm import joinedload, selectinload
# from app.forms.posting_form import AddPostingForm
# from app.forms.edit_posting_form.py import EditPostingForm


posting_routes = Blueprint('postings', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@posting_routes.route('/all')
# @login_required
def homefeed():
    """
    Route that returns all postings
    """


@posting_routes.route('/<int:userId>/postings')
# @login_required
def getUserPostings(userId):
    """
    Route that returns a user's postings
    """


@posting_routes.route('/create', methods=["POST"])
# @login_required
def createPosting():
    """
    Route that allows user to create a posting
    """


@posting_routes.route('/<int:postingId>', methods=["PUT"])
# @login_required
def editPosting(userId):
    """
    Route that allows a user to edit a posting
    """


@posting_routes.route('/<int:postingId>', methods=["DELETE"])
# @login_required
def getUserPostings(userId):
    """
    Route that allows a user to delete a posting
    """
