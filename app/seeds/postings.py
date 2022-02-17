from app.models import db, Posting, User


def seed_postings():
    post_one = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, title='Free lemons', caption='We have a tree in our front yard with 500+ ripe lemons. Come pick some for yourself!', icon='Food')
    post_two = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, title='Free oranges', caption='We have a tree in our front yard with 500+ ripe oranges. Come pick some for yourself!', icon='Food')
    post_three = Posting(user_id=2, address='3655 Lawton St', city='San Francisco', state='CA', zipcode=94122 , title='Free wood', caption='Tree fell down in our front yard. Come and chop some wood, if you need it!', icon='Supplies')

    user1 = User.query.get(1)
    user2 = User.query.get(2)

    post_one.users.append(user1)
    post_one.users.append(user2)
    post_two.users.append(user1)

    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)

    db.session.commit()


def undo_postings():
    db.session.execute('TRUNCATE postings RESTART IDENTITY CASCADE;')
    db.session.commit()
