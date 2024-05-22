// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/info/add */
export async function addApiInfo(body: API.ApiAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseAddOrUpdateResult>('/api/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/info/api-info */
export async function deleteApiInfos(
  body: API.DeleteRequestLong,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/api/info/api-info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/info/api-info/${param0} */
export async function getApiInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiInfoByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseApiInfoVo>(`/api/info/api-info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/info/api-infos */
export async function getApiInfoPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiInfoPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListResultApiInfoVo>('/api/info/api-infos', {
    method: 'GET',
    params: {
      ...params,
      apiQueryRequest: undefined,
      ...params['apiQueryRequest'],
      pageRequest: undefined,
      ...params['pageRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/info/update */
export async function updateApiInfo(body: API.ApiUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseAddOrUpdateResult>('/api/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
