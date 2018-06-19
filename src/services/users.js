import request from '../utils/request';
import API from "../utils/api";

export function getUser(uid) {
  if (uid) {
    return request(API + '/users/' + uid);
  }
  if (!localStorage.getItem('user')) {
    return {avatarUrl: null};
  }
  return JSON.parse(localStorage.getItem('user'))
}

export function currentUser() {
  return request(API + '/users/current', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
}

export function getToken(code) {
  return request(API + '/auth?authType=github&code=' + code);
}

export function getMyKongfu() {
  return request(API + '/users/current/kongfu', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
}

export function UpdateUser(user) {
    return request(API + '/users/update', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });
    
}