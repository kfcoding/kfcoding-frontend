import request from '../utils/request';
import API from "../utils/api";

export function createWorkSpace(data) {
  return request(API + '/workspaces', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getWorkspaceByUser() {
  return request(API + '/workspaces');
}

export function deleteWorkspace(id) {
  return request(API + '/workspaces/'+id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  });
}

export function createContainer() {
  return request("http://aliapi.workspace.cloudwarehub.com/workspace",
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    }
  )
};

