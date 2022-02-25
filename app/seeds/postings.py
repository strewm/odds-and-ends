from app.models import db, Posting, User


def seed_postings():
    post_one = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, title='Free lemons :)', caption='We have a tree in our front yard with 500+ ripe lemons. Come pick some for yourself, before they go bad!', icon='Food')
    post_two = Posting(user_id=1, address='3876 Noriega St', city='San Francisco', state='CA', zipcode=94122, title='Free oranges, too', caption='We have a tree in our front yard with 500+ ripe oranges. Come pick some for yourself, before they go bad!', icon='Food')
    post_three = Posting(user_id=2, address='3655 Lawton St', city='San Francisco', state='CA', zipcode=94122 , title='Free wood', caption='Tree fell down in our front yard. Come and chop some firewood, if you need it!', icon='Supplies')
    post_four = Posting(user_id=4, address='665 Valencia Street', city='San Francisco', state='CA', zipcode=94110 , title='Free veggies!', caption='WELL as luck would have it (yours, not ours!), our restaurant accidentally doubled our vegetable order for this week. Rather than let the produce go to waste, we have decided to offer them up to our local neighbors! So, if you or your friends find yourselves in need of some amazingly crisp vegetables, feel free to stop on by. We will be limiting it to 1 bag of veggies per person.', icon='Food')
    post_five = Posting(user_id=5, address='517 Hayes Street', city='San Francisco', state='CA', zipcode=94102 , title='Quick! Frozen yogurt!', caption='Our freezer just stopped working this morning, and all of our frozen yogurt is melting! Come pick up as much as you want. When you arrive feel free to throw in a tip, if you want to choose from some (non-frozen) toppings, as well. See you soon!', icon='Food')
    post_six = Posting(user_id=6, address='2573 3rd Street', city='San Francisco', state='CA', zipcode=94107 , title='Free pizza, tonight only!', caption="We're hosting our annual climbing competition tonight, and found that we over-ordered on pizza for our guests. We don't want it to go to waste, so swing on by if you want a slice!", icon='Food')
    post_seven = Posting(user_id=6, address='2573 3rd Street', city='San Francisco', state='CA', zipcode=94107 , title='Recycling - free cans!', caption="Hey SF! We finished up our annual climbing competition last night, and have a massive pile of bags filled with aluminum cans, plastic bottles, and glass bottles. Everything is all separated. If you're looking to make a few $ (or just want to help us out), there's a recycling center that will pay for cans a few minutes away. Come on by!", icon='Other')


    user1 = User.query.get(1)
    user2 = User.query.get(2)

    post_one.user_saved.append(user1)
    post_one.user_saved.append(user2)
    post_two.user_saved.append(user1)
    post_two.user_saved.append(user2)
    post_three.user_saved.append(user1)
    post_four.user_saved.append(user1)
    post_five.user_saved.append(user1)
    post_six.user_saved.append(user1)
    post_seven.user_saved.append(user1)


    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)
    db.session.add(post_four)
    db.session.add(post_five)
    db.session.add(post_six)
    db.session.add(post_seven)

    db.session.commit()


def undo_postings():
    db.session.execute('TRUNCATE postings RESTART IDENTITY CASCADE;')
    db.session.commit()
