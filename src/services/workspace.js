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