from flask import Blueprint, jsonify, redirect, session, request
from flask_login import current_user, login_required
from app.models import User, Posting, Pickup, db
from sqlalchemy.orm import joinedload, selectinload
from app.forms.pickup_form import PickupForm
from datetime import datetime


pickup_routes = Blueprint('pickups', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@pickup_routes.route('/posting/<int:postingId>/pickups')
@login_required
def getPostPickups(postingId):
    """
    Route that returns all pickups on a posting
    """
    res = {}
    pickups = Pickup.query.filter(Pickup.posting_id == postingId).all()

    for pickup in pickups:
        res[pickup.id] = pickup.to_dict()

    return res


@pickup_routes.route('/user/<int:userId>/pickups')
@login_required
def getUserPickups(userId):
    """
    Route that returns a user's postings
    """
    res = {}
    pickups = Pickup.query.filter(userId == Pickup.user_id).all()

    for pickup in pickups:
        res[pickup.id] = pickup.to_dict()

    return res


@pickup_routes.route('/posting/<int:postingId>/create', methods=["POST"])
@login_required
def createPickup(postingId):
    """
    Route that allows user to create a posting
    """
    form = PickupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPickup = Pickup(
            user_id = current_user.id,
            posting_id = postingId,
            date = form.data['date'],
            created_at = datetime.now()
        )

        db.session.add(newPickup)
        db.session.commit()
        return newPickup.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@pickup_routes.route('/<int:pickupId>', methods=["PUT"])
@login_required
def editPickup(pickupId):
    """
    Route that allows a user to edit a posting
    """
    form = PickupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pickup = Pickup.query.get(pickupId)
        pickup.date = form.data['date']
        pickup.updated_at = datetime.now()

        db.session.commit()
        return pickup.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@pickup_routes.route('/<int:pickupId>', methods=["DELETE"])
@login_required
def deletePosting(pickupId):
    """
    Route that allows a user to delete a posting
    """
    pickup = Pickup.query.get(pickupId)
    data = pickup.to_dict()
    db.session.delete(pickup)
    db.session.commit()
    return data
