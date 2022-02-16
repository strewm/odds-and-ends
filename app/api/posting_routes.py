from flask import Blueprint, jsonify, redirect, session, request
from flask_login import current_user, login_required
from app.models import User, Posting, db
from sqlalchemy.orm import joinedload, selectinload
from app.forms.posting_form import AddPostingForm
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
def getAllPostings():
    """
    Route that returns all postings
    """
    res = {}
    postings = Posting.query.all()

    for post in postings:
        res[post.id] = post.to_dict()

    return res


@posting_routes.route('/<int:userId>/postings')
# @login_required
def getUserPostings(userId):
    """
    Route that returns a user's postings
    """
    res = {}
    postings = Posting.query.filter(userId == Posting.user_id).all()

    for post in postings:
        res[post.id] = post.to_dict()

    return res


@posting_routes.route('/create', methods=["POST"])
# @login_required
def createPosting():
    """
    Route that allows user to create a posting
    """
    form = AddPostingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPosting = Posting(
            user_id = current_user.id,
            # user_id = userId,
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zipcode = form.data['zipcode'],
            name = form.data['name'],
            caption = form.data['caption'],
            icon = form.data['icon']
        )

        db.session.add(newPosting)
        db.session.commit()
        return newPosting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@posting_routes.route('/<int:postingId>', methods=["PUT"])
# @login_required
def editPosting(postingId):
    """
    Route that allows a user to edit a posting
    """
    posting = Posting.query.get(postingId)
    data = request.get_json()

    posting.address = data['address']
    posting.city = data['city']
    posting.state = data['state']
    posting.zipcode = data['zipcode']
    posting.name = data['name']
    posting.caption = data['caption']
    posting.icon = data['icon']

    db.session.commit()
    return posting.to_dict()


@posting_routes.route('/<int:postingId>', methods=["DELETE"])
# @login_required
def deletePosting(postingId):
    """
    Route that allows a user to delete a posting
    """
    posting = Posting.query.get(postingId)

    db.session.delete(posting)
    db.session.commit()
    return posting.to_dict()
