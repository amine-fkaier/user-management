import axios from 'axios';
import { BASE_URL } from '../constants/Constants';

export const getAllUsers = (page) => {
    return axios.get(BASE_URL + `users/?page=${page}`);
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

export const deleteUser = (userId) => {
    return axios.delete(BASE_URL + `user/${userId}/delete/`);
};
