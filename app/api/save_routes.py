from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import User, Posting, db
from flask_login import current_user, login_required

save_routes = Blueprint('saved', __name__)


@save_routes.route('/posting/<int:postingId>/saved')
@login_required
def getSaved(postingId):
    posting = Posting.query.get(postingId)

    res = {}
    for user in posting.user_saved:
        res[user.id] = user.to_dict()

    return res


@save_routes.route('/user/<username>/saved')
@login_required
def getUserSaved(username):
    user = User.query.filter(User.username == username).first_or_404()
    userId = user.id

    res = {}
    for posting in user.saved_postings:
        res[posting.id] = posting.to_dict()

    return res


@save_routes.route('/posting/<int:postingId>/user/<username>/saved', methods=["POST"])
@login_required
def newSave(postingId, username):
    posting = Posting.query.get(postingId)
    user = User.query.filter(User.username == username).first_or_404()

    posting.user_saved.append(user)
    db.session.commit()

    res = {}
    for user in posting.user_saved:
        res[user.id] = user.to_dict()

    return res


@save_routes.route('/posting/<int:postingId>/user/<username>/saved', methods=["DELETE"])
@login_required
def deleteSave(postingId, username):
    posting = Posting.query.get(postingId)
    user = User.query.filter(User.username == username).first_or_404()

    posting.user_saved.remove(user)
    db.session.commit()

    res = {}
    for user in posting.user_saved:
        res[user.id] = user.to_dict()

    return res
