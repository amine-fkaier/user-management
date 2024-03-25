import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const getAllUsers = () => {
    return axios.get(BASE_URL + "users/?page=1");
};

export const getUserById = (userId) => {
    return axios.get(BASE_URL + `user/${userId}/`);
};

export const createUser = (userData) => {
    return axios.post(BASE_URL + 'user/create/', userData);
};

export const updateUser = (userId, updatedUserData) => {
    return axios.put(BASE_URL + `user/${userId}/update/`, updatedUserData);
};

export const deleteUserById = (userId) => {
    return axios.delete(BASE_URL + `user/${userId}/delete/`);
};
