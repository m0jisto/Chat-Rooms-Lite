export const isJoined = (obj) => ({
    type: 'JOINED',
    payload: obj,
})

export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users,
})

export const setData = (data) => ({
    type: 'SET_DATA',
    payload: data,
})

export const addNewMessage = (userName, message) => ({
    type: 'ADD_NEW_MESSAGES',
    payload: {
        userName,
        message,
    },
})