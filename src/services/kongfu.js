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