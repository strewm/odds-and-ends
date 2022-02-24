# Odds + Ends

Odds + Ends is an application loosely based on [Meta Marketplace](https://www.facebook.com/) + [Nextdoor](https://nextdoor.com/).

Check out Odds + Ends' live site: [Odds + Ends](https://odds-ends.herokuapp.com/login).


## Getting Started
To view and use this application, you can either navigate to the [live hosted site](https://flask-instagram-clone.herokuapp.com/) and login as a new or demo user, or download the project locally:
1. Clone this repository ```https://github.com/strewm/odds-and-ends.git```

2. Install dependencies in the main project folder ```pipenv install```

3. ```cd``` into ```/react-app``` and install dependencies ```npm install```

4.  Create a .env file based on the .env.example given

5.  Setup a PostgresSQL user + database in ```/python-project```
    ```javascript
    psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
    psql -c "CREATE DATABASE <database name> WITH OWNER <username>"
    ```

6. Start shell + migrate database + seed database + run flask in the main folder
    ```javascript
    pipenv shell
    flask db upgrade
    flask db migrate
    flask db seed all
    flask run
    ```

6. Keeping flask running, start the app by running ```npm start``` in ```/react-app```

7. Enjoy!

## Libraries Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" /><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height=40/>

## Features
### Login + Signup
<!-- ![login](./Images/ReadMePhotos/6-login.png)
![signup](./Images/ReadMePhotos/7-signup.png) -->

### Home
Home feed:
<!-- ![home feed](./Images/ReadMePhotos/1-homefeed.png) -->
Single posting:
<!-- ![single posting](./Images/ReadMePhotos/2-singlepost.png) -->

### Create posting
<!-- ![create post](./Images/ReadMePhotos/3-createpost.png) -->

### User Profile Page
User profile:
<!-- ![user profile](./Images/ReadMePhotos/4-viewprofile.png) -->
Edit profile:
<!-- ![edit profile](./Images/ReadMePhotos/5-editprofile.png) -->

## Future Features
- Profile
   - Users will be able to add and remove a profile picture
- Search
    - Users will be able to filter posts by location
