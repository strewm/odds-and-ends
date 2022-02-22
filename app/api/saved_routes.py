# from flask import Blueprint, jsonify, session, request
# from itsdangerous import json
# from app.models import User, Post, db
# from flask_login import current_user, login_required

# save_routes = Blueprint('saved', __name__)


# @save_routes.route('/posting/<int:postingId>/saved')
# # @login_required
# def getSaved(postingId):
#     current_post = Posting.query.get(postingId)

#     res = {}
#     for user in current_post.like:
#         res[user.id] = user.to_dict()

#     return jsonify(res)


# @save_routes.route('/user/<username>/saved')
# # @login_required
# def getUserSaved(username):
#     current_post = Post.query.get(postId)

#     res = {}
#     for user in current_post.saved:
#         res[user.id] = user.to_dict()

#     return jsonify(res)


# @save_routes.route('/posting/<int:postingId>/saved', methods=["POST"])
# # @login_required
# def newSave(postingId):
#     target_post = Post.query.get(postId)

#     target_post.like.append(current_user)
#     db.session.commit()

#     res = {}
#     for user in target_post.like:
#         res[user.id] = user.to_dict()

#     return jsonify(res)


# @save_routes.route('/posting/<int:postingId>/saved/<int:userId>', methods=["DELETE"])
# # @login_required
# def deleteSave(postingId, userId):
#     target_post = Post.query.get(postId)
#     target_user = User.query.get(userId)

#     target_post.like.remove(target_user)
#     db.session.commit()

#     res = {}
#     for user in target_post.like:
#         res[user.id] = user.to_dict()

#     return jsonify(res)
