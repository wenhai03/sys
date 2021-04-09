import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getEmailLogList(params: any) {
  return request(`${serverUrl}/api/getEmailLogList`, {
    params,
    method: "GET",
  });
}

export async function getTaskLogList(params: any) {
  return request(`${serverUrl}/api/getTaskLogList`, {
    method: 'get',
    params
  });
}

export async function getFailLogList(params: any) {
  return request(`${serverUrl}/api/getFailLogList`, {
    method: 'get',
    params
  });
}



