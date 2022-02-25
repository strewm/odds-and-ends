from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='demo', email='demo@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')
    savanah = User(username='savanah', email='savanah@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')
    joey = User(username='joey', email='joey@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')
    mau = User(username='Mau', email='mau@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')
    souvla = User(username='Souvla', email='souvla@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')
    dogpatch = User(username='Dogpatch', email='dogpatch@aa.io', profile_picture="https://capstone-odds-ends.s3.us-east-2.amazonaws.com/cee2db0314ce41909703e7de8e411482.png", password='password')


    db.session.add(demo)
    db.session.add(savanah)
    db.session.add(joey)
    db.session.add(mau)
    db.session.add(souvla)
    db.session.add(dogpatch)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
