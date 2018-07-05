import request from '../utils/request';
import API from "../utils/api";

export function createWorkSpace(data) {
  return request(API + '/workspace/create', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getWorkspaceByUser() {
  return request(API + '/workspaces', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
}