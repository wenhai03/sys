import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getEmailList(params: any) {
  return request(`${serverUrl}/api/getEmailList`, {
    params,
    method: "GET",
  });
}


export async function saveEmail(data: any) {
  return request(`${serverUrl}/api/saveEmail`, {
    method: 'post',
    data
  });
}

export async function deleteEmail(id: number) {
  return request(`${serverUrl}/api/deleteEmail`, {
    method: 'delete',
    data: [id]
  });
}

export async function updateEmail(id: number, data: any) {
  return request(`${serverUrl}/api/updateEmail?id=${id}`, {
    method: 'put',
    data
  });
}

export async function uploadImage(data: any) {
  const formData = new FormData();
  formData.append('file', data);
  return request(`${serverUrl}/api/uploadImage`, {
    method: 'post',
    body: formData
  });
}

export async function getEmailInfo(params: any) {
  return request(`${serverUrl}/api/getEmailInfo`, {
    method: 'get',
    params
  });
}

export async function getSendEmailList(params: any) {
  return request(`${serverUrl}/api/getSendEmailList`, {
    method: 'get',
    params
  });
}

export async function getSendEmailInfo({id}: any) {
  console.log('getSendEmailInfo id -> ', id)
  return request(`${serverUrl}/api/getSendEmailInfo?id=${id}`, {
    method: 'get',
  });
}

export async function updateSendEmail(id: any, data: any) {
  return request(`${serverUrl}/api/updateSendEmail?id=${id}`, {
    method: 'put',
    data
  });
}
export async function deleteSendEmail(id: number) {
  return request(`${serverUrl}/api/deleteSendEmail`, {
    method: 'delete',
    data: [id]
  });
}
export async function sendEmail(data: any) {
  return request(`${serverUrl}/api/sendEmail`, {
    method: 'post',
    data
  });
}
