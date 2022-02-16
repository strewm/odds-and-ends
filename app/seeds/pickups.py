from app.models import db, Pickup


def seed_pickups():
    pickup_one = Pickup(user_id=1, posting_id=1, date='Monday')
    pickup_two = Pickup(user_id=2, posting_id=1, date='Tuesday')
    pickup_three = Pickup(user_id=3, posting_id=1, date='Monday')

    db.session.add(pickup_one)
    db.session.add(pickup_two)
    db.session.add(pickup_three)

    db.session.commit()


def undo_pickups():
    db.session.execute('TRUNCATE pickups RESTART IDENTITY CASCADE;')
    db.session.commit()
