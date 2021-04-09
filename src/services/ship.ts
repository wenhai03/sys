import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getShipList(params: any) {
  return request(`${serverUrl}/api/getShipList`, {
    params,
    method: "GET",
  });
}


export async function saveShip(data: any) {
  return request(`${serverUrl}/api/saveShip`, {
    method: 'post',
    data
  });
}

export async function deleteShip(data: number) {
  return request(`${serverUrl}/api/deleteShip`, {
    method: 'delete',
    data
  });
}

export async function updateShip({id, ...data}: any) {
  return request(`${serverUrl}/api/updateShip?id=${id}`, {
    method: 'put',
    data
  });
}

export async function importShip(data: any) {
  const formData = new FormData();
  formData.append('file', data);
  return request(`${serverUrl}/api/importShip`, {
    method: 'POST',
    body: formData
  });
}
export async function exportShip(data: any) {
  return request(`${serverUrl}/api/exportShip`, {
    method: 'POST',
    data
  });
}

export async function downloadShipTemplate() {
  return request(`${serverUrl}/api/downloadShipTemplate`, {
    method: 'get',
  });
}

/*----------------*/

export async function getEventList(params: any) {
  console.log('params 44-> ', params)
  return request(`${serverUrl}/api/getEventList`, {
    method: 'get',
    params
  });
}

export async function saveEvent(data: any) {
  return request(`${serverUrl}/api/saveEvent`, {
    method: 'post',
    data
  });
}

export async function updateEvent({id, ...data}:any) {
  return request(`${serverUrl}/api/updateEvent?id=${id}`, {
    method: 'put',
    data
  });
}

export async function deleteEvent(id: any) {
  return request(`${serverUrl}/api/deleteEvent`, {
    method: 'delete',
    data: [id]
  });
}

export async function getEventInfo() {
  return request(`${serverUrl}/api/getEventInfo`, {
    method: 'get',
  });
}
