import { request } from 'umi';
import { serverUrl } from '@/utils/utils';

export async function loadMovieCategories() {
   return request(`${serverUrl}/api/v1/admin/moviecategory`);
}

export async function saveOne(data: any) {
  return request(`${serverUrl}/api/v1/admin/moviecategory`, {
    method: 'post',
    data
  });
}

export async function updateOne(id: number, data: any) {
  return request(`${serverUrl}/api/v1/admin/moviecategory/${id}`, {
    method: 'put',
    data
  });
}

export async function delOne(id: number) {
  return request(`${serverUrl}/api/v1/admin/moviecategory/${id}`, {
    method: 'delete'
  });
}
