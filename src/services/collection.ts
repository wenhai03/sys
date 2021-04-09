import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getImoList(params: any) {
  return request(`${serverUrl}/api/getImoList`, {
    params,
    method: "GET",
  });
}


export async function saveImo(data: any) {
  return request(`${serverUrl}/api/saveImo`, {
    method: 'post',
    data
  });
}


export async function deleteImo(data: any) {
  return request(`${serverUrl}/api/deleteImo`, {
    method: 'delete',
    data
  });
}

export async function importImo(data: any) {
  const formData = new FormData();
  formData.append('file', data);
  return request(`${serverUrl}/api/importImo`, {
    method: 'POST',
    body: formData
  });
}

export async function collectNow(params: any) {
  return request(`${serverUrl}/api/collectNow/`, {
    method: 'get',
    params
  });
}

