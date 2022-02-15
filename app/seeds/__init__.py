from flask.cli import AppGroup
from .users import seed_users, undo_users
from .postings import seed_postings, undo_postings
from .pickups import seed_pickups, undo_pickups

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_postings()
    seed_pickups()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_postings()
    undo_pickups()
