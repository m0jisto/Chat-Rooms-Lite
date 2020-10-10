import React, { useState, useRef, useEffect } from 'react';

import socket from '../socket'

const Chat = ({ onSendMessage, roomId, userName, users, messages }) => {
    const [messageValue, setMessageValue] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 9999)
    }, [messages])

    const onSenMessages = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName,
            message: messageValue,
        })
        onSendMessage({ userName, message: messageValue});
        setMessageValue('');
    }

    const myUsername= userName;

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr />
                <b>Онлайн ({users.length}):</b>
                <ul>
                    {users.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map( ({ userName, message }, index) => (
                            <div className={myUsername === userName ? "message my-message" : "message"} key={index}>
                                <p>{message}</p>
                                <div>
                                    <span>{index < messages.length - 1 && messages[index+1].userName === userName ? '' : userName}</span>
                                </div>
                            </div>
                        ))}
                </div>
                <form>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                    />
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={onSenMessages}
                    >
                        Отправить
                    </button>
                </form>
            </div>
            
        </div>
    )
}

export default Chat;
