import request from '../utils/request';
import API from "../utils/api";

export function getOssToken(kongfu_id) {
  return request(API + '/auth/sts/' + kongfu_id);
}

export function createKongfu(form) {
  return request(API + '/kongfu/create', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(form)
  });
}

export function getAllKongfu() {
  return request(API + '/kongfu/list');
}

export function getUserKongfu(uid) {
  return request(API + '/users/' + uid + '/kongfu');
}

export function getKongfu(kongfu_id) {
  return request(API + '/kongfu/' + kongfu_id)
}

export function createTerminal(image) {
  return request(API + '/cloudware/startContainer', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      type: 1,
      imageName: image
    })
  });
}

export function createCloudware(image) {
  return request(API + '/cloudware/startContainer', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      type: 0,
      imageName: image
    })
  });
}

export function getTags() {
  return request(API + '/kongfu/taglist')
}

export function getKongfuByTag(tag) {
  return request(API + '/kongfu/findByTag?tag=' + tag)
}

export function updateKongfu(kongfu) {
  return request(API + '/kongfu/' + kongfu.id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(kongfu)
  })
}

export function deleteKongfu(id) {
    return request(API + '/kongfu/delete?id=' + id)
}