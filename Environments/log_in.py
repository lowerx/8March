from curses import echo
from importlib.metadata import metadata
import sqlite3
import sys
import sqlalchemy
import os
from sqlalchemy import Column, Integer, String, ForeignKey, Table, MetaData, create_engine, engine_from_config
from sqlalchemy.orm import relationship, backref, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from database import DataBase

Base = declarative_base()

# def db_connect(db_name):
#     """
#     Performs database connection using database settings from settings.py.
#     Returns sqlalchemy engine instance
#     """

def create_table(db_name):
    engine = create_engine('sqlite:///' + str(db_name) + '.sqlite')
    An.metadata.create_all(engine)


class An(Base):
    __tablename__ = 'test'

    id = Column(sqlalchemy.Integer, primary_key=True)
    username = Column('username', sqlalchemy.Text())
    password = Column('password', sqlalchemy.Text())
    page = Column('page', sqlalchemy.Integer)


class Authentification(object):
    __engine = None
    def __init__(self, db, name, passphrase):
        engine = create_engine('sqlite:///' + str(name) + '.sqlite')
        if not sqlalchemy.inspect(engine).has_table(name):
            create_table('test')
        # self.__engine = db_connect(name)

        # self.__db.set_name(name)
        # self.__db.username = name
        # self.__db.password = passphrase

        # engine = db_connect(name)
        # create_table(engine)
        # self.Session = sessionmaker(bind=engine)
        # session = self.Session()
        # try:
        #     session.add(self.__db)
        #     session.commit()
        # except:
        #     session.rollback()
        #     raise
        # finally:
        #     session.close()
    
    def new_session(self):
        engine = db_connect(name)
        create_table(engine)
        self.Session = sessionmaker(bind=engine)
        session = self.Session()
        try:
            result = session.query(An)
            for item in result:
                print(item)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()


name = "test"
db = DataBase(name)
passphrase = "test"
AuthentificationPros = Authentification(db, name, passphrase)
