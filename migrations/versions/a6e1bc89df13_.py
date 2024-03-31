"""empty message

Revision ID: a6e1bc89df13
Revises: e4f0dfbc20ad
Create Date: 2024-03-31 00:40:37.299715

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6e1bc89df13'
down_revision = 'e4f0dfbc20ad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('recipe_name', sa.String(length=2000), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.drop_table('recipe')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(length=60), autoincrement=False, nullable=True),
    sa.Column('subtitle', sa.VARCHAR(length=60), autoincrement=False, nullable=True),
    sa.Column('desc', sa.VARCHAR(length=60), autoincrement=False, nullable=True),
    sa.Column('img_url', sa.VARCHAR(length=60), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='recipe_pkey')
    )
    op.drop_table('Favorites')
    # ### end Alembic commands ###