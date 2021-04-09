import { request } from 'umi';
import { serverUrl } from '@/utils/utils';


export async function login(data: { username: string; password: string }) {
  console.log('data -> ', data)
  return request(`${serverUrl}/api/login`, {
    data,
    method: 'POST',
  });
}

export async function logout(data: { token: string | null }) {
  return request(`${serverUrl}/api/logout`, {
    data,
    method: 'POST',
  });
}
