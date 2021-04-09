import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getData(data: any) {
  return request(`${serverUrl}/api/getData`, {
    data,
    method: "GET",
  });
}


export async function saveShip(data: any) {
  return request(`${serverUrl}/api/saveShip`, {
    method: 'post',
    data
  });
}

export async function deleteShip(id: number) {
  return request(`${serverUrl}/api/deleteShip`, {
    method: 'delete',
    data: [id]
  });
}

export async function updateShip(id: number) {
  return request(`${serverUrl}/api/deleteShip`, {
    method: 'put',
    data: [id]
  });
}
