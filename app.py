import os
import flask
import flask_socketio
import requests
import flask_sqlalchemy
import models

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
all_mah_numbers = []
all_bot_messages = []



# URI scheme: postgresql://<username>:<password>@<hostname>:<port>/<database-name>
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://AlanDB:AlanDB@localhost/postgres'
db = flask_sqlalchemy.SQLAlchemy(app)


@app.route('/')
def hello():
    #messages = models.Message.query.all()
    #html = ['<li>' + m.text + '</li>' for m in messages]
    #return'<ul>'+''.join(html)+'</ul'
    return flask.render_template('index.html')
## The idea was to use the same entry as that was use for general purpose
## like in lecture 7. But for some reason the colon was being displayed but not 
## the announcement that a new user was entering the chat
@socketio.on('connect')
def on_connect(data = "someone connected"):
    print('someone connected')
    all_bot_messages.append("someone connected")
    socketio.emit('all numbers',{
        'numbers': all_bot_messages
    })
    
## Same goes for the disconnecting, the colon in which the informatoin was
## supose to be displayed is shown, but not the informatoin. 
@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')
    all_bot_messages.append("someone disconnected")
    socketio.emit('all numbers',{
        'numbers': all_bot_messages
    })

@socketio.on('new number')
def on_new_number(data):
    response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()
    
    all_mah_numbers.append({'name': json['name'],'picture': json['picture']['data']['url'],'number': data['number']})
    
    all_mah_numbers.append(data['number'])
    socketio.emit('all numbers', {
        'numbers': all_mah_numbers
    })

## I copied over the original format in which the information was being displayed to the html
## without having to have the sign in token. This is where the bot would speak to masses. 
@socketio.on('chat bot')
def operator(data):
    all_bot_messages.append(data)
    socketio.emit('all numbers',{
        'numbers': all_bot_messages
    })
    
    
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

