import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function loadSysParamsData(data: { username: string; password: string }) {
  return request(`${serverUrl}/api/getConfig`, {
    data,
    method: "GET",
  });
}

export async function updateSysParams (data: any) {
  return request(`${serverUrl}/api/setConfig`, {
    data,
    method: "PUT",
  });
}

export async function addConfig (data: any) {
  return request(`${serverUrl}/api/addConfig`, {
    data,
    method: "post",
  });
}

export async function delConfig (id: any) {
  return request(`${serverUrl}/api/delConfig`, {
    data: [id],
    method: "delete",
  });
}
export async function setMonitorRateConfig (data: any) {
  return request(`${serverUrl}/api/setMonitorRateConfig`, {
    data,
    method: "PUT",
  });
}

/*------------------*/
export async function loadAccountData (data: any) {
  return request(`${serverUrl}/api/getUserList`, {
    data,
    method: "get",
  });
}
export async function addAccount (data: any) {
  return request(`${serverUrl}/api/register`, {
    data,
    method: "post",
  });
}

export async function delUser (id: any) {
  return request(`${serverUrl}/api/delUser?id=${id}`, {
    method: "delete",
  });
}

export async function updatePwd (data: any) {
  return request(`${serverUrl}/api/updatePwd?id=${data.userId}`, {
    data,
    method: "put",
  });
}

/*------------*/
export async function getEmailAccountList(data: any) {
  return request(`${serverUrl}/api/getEmailAccountList`, {
    data,
    method: "GET",
  });
}


export async function saveEmailAccount(data: any) {
  return request(`${serverUrl}/api/saveEmailAccount`, {
    method: 'post',
    data
  });
}

export async function deleteEmailAccount(id: number) {
  return request(`${serverUrl}/api/deleteEmailAccount`, {
    method: 'delete',
    data: [id]
  });
}

export async function uploadEmailAccount(id: number, data: any) {
  return request(`${serverUrl}/api/updateEmailAccount?id=${id}`, {
    method: 'put',
    data
  });
}
