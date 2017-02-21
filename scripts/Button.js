import * as React from 'react';

import { Socket } from './Socket';

export class Button extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();

        var newMessage = this.input.value;
        // we will check every time if it is a command for bot or not
        var botCode = newMessage.substring(0,2);
        // get a variable to represent a boolean
        var botCodeTrue = botCode.localeCompare("!!");
        // althought the method in which I comapare the strings/char isn't explicit
        // good enough for this moment
        
        if(botCodeTrue === 0){
            if(newMessage.charAt(3) === 'a'){
                Socket.emit('chat bot', {
                'number': 'Chat Bot: This is a room were people rant about their frustrations'
                });
            }
           if(newMessage.charAt(3) === 'h'){
                Socket.emit('chat bot', {
                'number': "Chat Bot: You and me both, brother! Here are somewhat helpful commands:(!! about)(!! help)(!! say <something>)(!! rings)(!! presist)"
                });
            }
           if(newMessage.charAt(3) === 's'){
                Socket.emit('chat bot', {
                'number': "Chat Bot : "+newMessage.substr(6)
                });
            }
           if(newMessage.charAt(3) === 'r'){
                Socket.emit('chat bot', {
                'number': 'https://www.youtube.com/watch?v=jbDyJRUiMck'
                });
            }     
           if(newMessage.charAt(3) === ' ' || (newMessage.length === 2)){
                Socket.emit('chat bot', {
                'number': 'I do not understand what your saying!'
                });
            }  
           if(newMessage.charAt(3) === 'p'){
                Socket.emit('chat bot', {
                'number': 'This helped me stay awake: https://www.youtube.com/watch?v=0jgrCKhxE1s'
                });
            } 
            
        }
        else{
             FB.getLoginStatus((response) => {
                 if (response.status == 'connected') {
                     Socket.emit('new number', {
                         'facebook_user_token':
                             response.authResponse.accessToken,
                         'number': newMessage,
                     });
                 }else {
                     let auth = gapi.auth2.getAuthInstance();
                     let user = auth.currentUser.get();
                     if (user.isSignedIn()) {
                        Socket.emit('new number', {
                           'google_user_token':
                                user.getAuthResponse().id_token,
                            'facebook_user_token': '',
                            'number': newMessage,
                        });
                     }
                 } 
                 
             });
        }

        console.log('Sent user message to server!');
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input id="m" ref={(input) => this.input = input} autoComplete="off"/>
                    <button>Send</button>
                </form>
            </div>
        );
    }
}
