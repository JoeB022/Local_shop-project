"""empty message

Revision ID: a95dc8c574e0
Revises: 6bf5e5f57607
Create Date: 2025-02-24 11:59:53.917720

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a95dc8c574e0'
down_revision = '6bf5e5f57607'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stock', schema=None) as batch_op:
        batch_op.drop_column('quantity_damaged')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stock', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity_damaged', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###
