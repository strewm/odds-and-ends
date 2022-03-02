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
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height=40/>

## Features
### Login + Signup
Login page with complete in-line error handling.
![login](./images/1-login.png)

Sign up page with complete in-line error handling (shown).
![signup](./images/2-signup-errors.png)

### Home
Home feed, showing all active postings. Postings owned by the logged-in user are yellow, and all others pink.
![home feed](./images/3-home.png)
Single posting page, with all scheduled pick-up dates below. Banner in upper right corner indicates a saved post by the logged-in user.
![single posting](./images/6-post.png)

### Create posting
Create posting modal, with complete in-line error handling.
![create post](./images/5-create.png)

### User Profile Page
User profile, with ability to edit logged-in user's profile picture. Google maps embedded.
![user profile](./images/4-profile.png)

## Future Features
- Maps API
    - Users will be able to see a single posting's pin on a map
- Search
    - Users will be able to filter postings by location
