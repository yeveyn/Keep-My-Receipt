import axios from 'axios';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

const setToken = () => {
  const token = sessionStorage.getItem('accessToken');
  const config = {
    Authorization: `${token}`,
  };
  return config;
};

export const apiCreateASCategory = async (
  clubId: number,
  largeCategoryName: string,
  ascName: string,
  balance: number,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/ascategory`,
    data: {
      clubId,
      lcName: largeCategoryName,
      ascName,
      balance,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiUpdateASCategory = async (
  ascId: number,
  clubId: number,
  largeCategoryName: string,
  ascName: string,
  balance: number,
) => {
  return await axios({
    method: 'put',
    url: `${BASE_URL}/ascategory/${ascId}`,
    data: {
      clubId,
      lcName: largeCategoryName,
      ascName,
      balance,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiUpdateBalance = async (ascId: number, newBalance: number) => {
  return await axios({
    method: 'put',
    url: `${BASE_URL}/ascategory/${ascId}/${newBalance}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiReadAllASCategory = async (
  clubId: string,
  largeCategoryName: string,
) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/ascategory/${clubId}/${largeCategoryName}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiDeleteASCategory = async (ascId: number) => {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/ascategory/${ascId}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};
