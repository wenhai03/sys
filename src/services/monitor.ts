import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getMonitorList(params: any) {
  return request(`${serverUrl}/api/getMonitorList`, {
    params,
    method: "GET",
  });
}

export async function saveMonitor(data: any) {
  return request(`${serverUrl}/api/saveMonitor`, {
    method: 'post',
    data
  });
}

export async function deleteMonitor(data: any) {
  return request(`${serverUrl}/api/deleteMonitor`, {
    method: 'delete',
    data
  });
}

export async function updateEmail(id: number, data: any) {
  return request(`${serverUrl}/api/updateEmail?id=${id}`, {
    method: 'put',
    data
  });
}

export async function uploadEnclosure(data: any) {
  return request(`${serverUrl}/api/uploadEnclosure`, {
    method: 'post',
    data
  });
}
export async function updateMonitor(id: number, data: any) {
  return request(`${serverUrl}/api/updateMonitor?id=${id}`, {
    method: 'put',
    data
  });
}
