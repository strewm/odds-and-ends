from app.models import db, Posting


def seed_postings():
    post_one = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, name='Free lemons', caption='We have a tree in our front yard with 500+ ripe lemons. Come pick some for yourself!', icon='Option 1 - Food')
    post_two = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, name='Free oranges', caption='We have a tree in our front yard with 500+ ripe oranges. Come pick some for yourself!', icon='Option 1 - Food')
    post_three = Posting(user_id=2, address='3655 Lawton St', city='San Francisco', state='CA', zipcode=94122 , name='Free wood', caption='Tree fell down in our front yard. Come and chop some wood, if you need it!', icon='Option 2 - Supplies')

    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)

    db.session.commit()


def undo_postings():
    db.session.execute('TRUNCATE postings RESTART IDENTITY CASCADE;')
    db.session.commit()
