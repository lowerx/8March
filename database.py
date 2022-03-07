from curses import echo
from http import client
from sqlalchemy import create_engine, delete, insert, update
from sqlalchemy.orm import relationship, backref, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from tables import *
from importlib.metadata import metadata


class DataBase(object):
    __name = None
    __engine = None
    __session = None
    __user = None
    __quest = None
    __prize = None

    def __init__(self, name):
        self.__name = name
        self.__start_connection()
        self.start_session(initial=True)
        if not sqlalchemy.inspect(self.__engine).has_table('user'):
            self.__initial_creation()
            self.__initial_fill()
    
    def __start_connection(self):
        self.__engine = create_engine('sqlite:///' + str(self.__name) + '.sqlite', echo=True)

    def __initial_creation(self):
        self.__quest = Quest.metadata.create_all(self.__engine)
        self.c_and_c_connection()

        self.__prize = Prize.metadata.create_all(self.__engine)
        self.c_and_c_connection()
        
        self.__user = User.metadata.create_all(self.__engine)
        self.c_and_c_connection()
    
    def __initial_fill(self):
        obj = Quest()
        obj.answer = 'ты прелестна словно роза'
        obj.url = 'images/1_quest.jpg'
        self.__session.add(obj)
        self.c_and_c_connection()

        obj = Quest()
        obj.answer = 'только разница одна'
        obj.url = 'images/2_quest.jpg'
        self.__session.add(obj)
        self.c_and_c_connection()

        obj = Quest()
        obj.answer = 'роза вянет от мороза'
        obj.url = 'images/3_quest.jpg'
        self.__session.add(obj)
        self.c_and_c_connection()

        obj = Prize()
        obj.login = 'i'
        obj.passphrase = 'huh'
        self.__session.add(obj)
        self.c_and_c_connection()

        obj = User()
        obj.name = 'vlad'
        obj.password = 'shur'
        obj.prize_id = 1
        self.__session.add(obj)
        self.c_and_c_connection()

    def start_session(self, initial=False):
        Session = sessionmaker(bind=self.__engine)
        self.__session = Session()
        if not initial:
            user = self.__session.query(User).order_by(User.id).all()
            prize = self.__session.query(Prize).order_by(Prize.id).all()
            quest = self.__session.query(Quest).order_by(Quest.id).all()
            return {"session": self.__session, "user": user, "prize": prize, "quest": quest}
    
    def c_and_c_connection(self):
        try:
            self.__session.commit()
        except:
            self.__session.rollback()
            raise
        finally:
            self.__session.close()

    def get_name(self):
        return self.__name

    def get_engine(self):
        return self.__engine

