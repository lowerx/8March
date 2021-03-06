from crypt import methods
from http import server
import sqlite3
from turtle import update
from flask import Flask, render_template, request, url_for, flash, redirect
from werkzeug.exceptions import abort
from database import DataBase

def get_db_connection():
    db = DataBase('Jeroglifico')
    return db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abdulla_balulah'

@app.route('/', methods=['GET', 'POST'])
def index():
    db = get_db_connection()
    connect = db.start_session()
    quest = None
    for quest in connect["quest"]:
        if not quest.played:
            break
    print('URL - ', quest.url)
    return render_template('index.html', user=connect["user"], id=id, quest=quest)

@app.route('/submit', methods=['POST'])
def submit():
    db = get_db_connection()
    connect = db.start_session()
    
    quest = None
    for quest in connect["quest"]:
        if not quest.played:
            break
    
    answer = request.form['message']
    if (answer == "") or (answer is None):
        flash('Answer is required!')
    else:
        if answer == quest.answer:
            quest.played = True
            connect["session"].commit()
    return redirect(url_for('index'))

@app.route('/login', methods=('GET', 'POST'))
def login():
    db = get_db_connection()
    connect = db.start_session()
    return render_template('login.html', user=connect["user"])

# @app.route('/<int:post_id>')
# def post(post_id):
#     post = get_post(post_id)
#     return render_template('post.html', post=post)

# @app.route('/create', methods=('GET', 'POST'))
# def create():
#     if request.method == 'POST':
#         title = request.form['title']
#         content = request.form['content']

#         if not title:
#             flash('Title is required!')
#         else:
#             conn = get_db_connection()
#             conn.execute('INSERT INTO posts (title, content) VALUES (?, ?)',
#                          (title, content))
#             conn.commit()
#             conn.close()
#             return redirect(url_for('index'))
#     return render_template('create.html')


# @app.route('/<int:id>/edit', methods=('GET', 'POST'))
# def edit(id):
#     post = get_post(id)

#     if request.method == 'POST':
#         title = request.form['title']
#         content = request.form['content']

#         if not title:
#             flash('Title is required!')
#         else:
#             conn = get_db_connection()
#             conn.execute('UPDATE posts SET title = ?, content = ?'
#                          ' WHERE id = ?',
#                          (title, content, id))
#             conn.commit()
#             conn.close()
#             return redirect(url_for('index'))

#     return render_template('edit.html', post=post)

# @app.route('/<int:id>/delete', methods=('POST',))
# def delete(id):
#     post = get_post(id)
#     conn = get_db_connection()
#     conn.execute('DELETE FROM posts WHERE id = ?', (id,))
#     conn.commit()
#     conn.close()
#     flash('"{}" was successfully deleted!'.format(post['title']))
#     return redirect(url_for('index'))

