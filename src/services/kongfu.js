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

export function getKongfu(kongfu_id) {
  return request(API + '/kongfu/' + kongfu_id)
}

export function createTerminal(image) {
  return request(API + '/cloudware/startContainer?type=1&imageName=' + image)
}