from flask import Blueprint, jsonify, redirect, session, request
from flask_login import current_user, login_required
from app.models import User, Posting, db
from sqlalchemy.orm import joinedload, selectinload
from app.forms.posting_form import PostingForm
from datetime import datetime


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
@login_required
def getAllPostings():
    """
    Route that returns all postings
    """
    res = {}
    postings = Posting.query.all()

    for post in postings:
        user = User.query.get(post.user_id)
        # username = user.username

        res[post.id] = post.to_dict()
        # res[post.id]['username'] = f'{username}'

    return res


@posting_routes.route('/<int:postingId>')
@login_required
def getPosting(postingId):
    """
    Route that returns all postings
    """
    posting = Posting.query.get(postingId)

    user = User.query.get(posting.user_id)
    username = user.username

    res = posting.to_dict()

    return res


@posting_routes.route('/user/<username>/postings')
@login_required
def getUserPostings(username):
    """
    Route that returns a user's postings
    """
    res = {}

    user = User.query.filter(User.username == username).first_or_404()
    userId = user.id

    print('++++++backend routes', user, userId)

    postings = Posting.query.filter(userId == Posting.user_id).all()

    print('========backend routes', postings)

    for post in postings:
        res[post.id] = post.to_dict()

    return res


@posting_routes.route('/create', methods=["POST"])
@login_required
def createPosting():
    """
    Route that allows user to create a posting
    """
    form = PostingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPosting = Posting(
            user_id = current_user.id,
            # user_id = userId,
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zipcode = form.data['zipcode'],
            title = form.data['title'],
            caption = form.data['caption'],
            icon = form.data['icon'],
            created_at = datetime.now()
        )

        db.session.add(newPosting)
        db.session.commit()
        return newPosting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@posting_routes.route('/<int:postingId>', methods=["PUT"])
@login_required
def editPosting(postingId):
    """
    Route that allows a user to edit a posting
    """
    form = PostingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        posting = Posting.query.get(postingId)
        posting.address = form.data['address']
        posting.city = form.data['city']
        posting.state = form.data['state']
        posting.zipcode = form.data['zipcode']
        posting.title = form.data['title']
        posting.caption = form.data['caption']
        posting.icon = form.data['icon']
        posting.updated_at = datetime.now()

        db.session.commit()
        return posting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@posting_routes.route('/<int:postingId>', methods=["DELETE"])
@login_required
def deletePosting(postingId):
    """
    Route that allows a user to delete a posting
    """
    posting = Posting.query.get(postingId)
    data = posting.to_dict()
    db.session.delete(posting)
    db.session.commit()
    return data
