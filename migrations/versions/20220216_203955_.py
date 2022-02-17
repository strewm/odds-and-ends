"""empty message

Revision ID: dd69a6ec031e
Revises: bd8901e5b4a8
Create Date: 2022-02-16 20:39:55.297214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd69a6ec031e'
down_revision = 'bd8901e5b4a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('postings', sa.Column('title', sa.String(), nullable=False))
    op.drop_column('postings', 'name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('postings', sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('postings', 'title')
    # ### end Alembic commands ###