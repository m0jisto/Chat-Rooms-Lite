import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

import socket from './socket';
import { isJoined, setUsers, setData, addNewMessage } from './redux/actions'
import { initialState, reducer } from './redux/reducers';


const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const onSetUsers = (users) => {
		dispatch(setUsers(users));
	}

	const onSendMessage = ({ userName, message }) => {
		dispatch(addNewMessage(userName, message));
	}

	useEffect(() => {
		socket.on('ROOM:SET_USERS', onSetUsers);
		socket.on('ROOM:NEW_MESSAGE', onSendMessage);
	}, [])

	const onLogin = async (obj) => {
		dispatch(isJoined(obj));
		socket.emit('ROOM:JOIN', obj);
		const { data } = await axios.get(`rooms/${obj.roomId}`);
		dispatch(setData(data))
	}

  	return (
		<div className="wrapper">
			{!state.joined
				? <JoinBlock onLogin={onLogin} />
				: <Chat onSendMessage={onSendMessage} {...state}/>
			}
		</div>
	);
}

export default App;
