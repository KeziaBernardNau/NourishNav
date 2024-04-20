"""empty message

Revision ID: 4d0be22fa102
Revises: ab5c3a8d9fab
Create Date: 2024-04-02 22:22:08.360512

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d0be22fa102'
down_revision = 'ab5c3a8d9fab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Favorites', schema=None) as batch_op:
        batch_op.drop_constraint('Favorites_name_key', type_='unique')
        batch_op.drop_column('description')
        batch_op.drop_column('ingredients')
        batch_op.drop_column('name')

    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=200), nullable=False))
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=False))
        batch_op.add_column(sa.Column('ingredients', sa.Text(), nullable=False))
        batch_op.create_unique_constraint(None, ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('ingredients')
        batch_op.drop_column('description')
        batch_op.drop_column('name')

    with op.batch_alter_table('Favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=200), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('ingredients', sa.TEXT(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('description', sa.TEXT(), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('Favorites_name_key', ['name'])

    # ### end Alembic commands ###
