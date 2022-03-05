import sqlalchemy
from sqlalchemy import Column, Integer, String, Table, create_engine, engine_from_config, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Quest(Base):
    __tablename__ = 'quest'

    id = Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    url = Column('url', sqlalchemy.Text())
    answer = Column('answer', sqlalchemy.Text())
    played = Column('played', sqlalchemy.Boolean, default=False)


class User(Base):
    __tablename__ = 'user'

    id = Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = Column('user', sqlalchemy.Text())
    password = Column('password', sqlalchemy.Text())
    prize_id = Column(sqlalchemy.Integer, ForeignKey('prize.id'))

    prize = relationship('Prize', back_populates='user')


class Prize(Base):
    __tablename__ = 'prize'

    id = Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    login = Column('login', sqlalchemy.Text())
    passphrase = Column('passphrase', sqlalchemy.Text(), unique=True)

    user = relationship('User', back_populates='prize')
