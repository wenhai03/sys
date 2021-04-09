import { request } from 'umi';
import {serverUrl} from "@/utils/utils";

export async function getCompanyList(params: any) {
  return request(`${serverUrl}/api/getCompanyList`, {
    params,
    method: "GET",
  });
}


export async function saveCompany(data: any) {
  return request(`${serverUrl}/api/saveCompany`, {
    method: 'post',
    data
  });
}

export async function deleteCompany(data: any) {
  return request(`${serverUrl}/api/deleteCompany`, {
    method: 'delete',
    data
  });
}

export async function updateCompany({id, ...data}: any) {
  return request(`${serverUrl}/api/updateCompany?id=${id}`, {
    method: 'put',
    data
  });
}
export async function importCompany(data: any){
  const formData = new FormData();
  formData.append('file', data);
  return request(`${serverUrl}/api/importCompany`, {
    method: 'POST',
    body: formData
  });
}

export async function exportCompany(data: any) {
  return request(`${serverUrl}/api/exportCompany`, {
    method: 'POST',
    data
  });
}

export async function getCompanyNameList(data: any) {
  return request(`${serverUrl}/api/getCompanyNameList`, {
    method: 'GET',
    data
  });
}
