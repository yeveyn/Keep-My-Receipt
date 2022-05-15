import axios from 'axios';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

const setToken = () => {
  const token = sessionStorage.getItem('accessToken');
  const config = {
    Authorization: `${token}`,
  };
  return config;
};

export const apiCreateBSCategory = async (
  clubId: number,
  largeCategoryName: string,
  bscName: string,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/bscategory`,
    data: {
      clubId,
      lcName: largeCategoryName,
      bscName,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiUpdateBSCategory = async (
  bscId: number,
  clubId: number,
  largeCategoryName: string,
  bscName: string,
) => {
  return await axios({
    method: 'put',
    url: `${BASE_URL}/bscategory/${bscId}`,
    data: {
      clubId,
      lcName: largeCategoryName,
      bscName,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiReadAllBSCategory = async (
  clubId: string,
  largeCategoryName: string,
) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/bscategory/${clubId}/${largeCategoryName}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiDeleteBSCategory = async (bscId: number) => {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/bscategory/${bscId}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};
