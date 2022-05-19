import axios from 'axios';

import { TypeNameKeys } from '../bookReducer';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

const setToken = () => {
  const token = sessionStorage.getItem('accessToken');
  const config = {
    Authorization: `${token}`,
  };
  return config;
};

export type TransactionType = {
  date: string;
  totalPrice: number;
  requestId?: number;
  list: {
    name: string;
    price: number;
    type: TypeNameKeys;
    largeCategory: string;
    smallCategory: string;
    largeTag?: string;
    smallTag?: string;
    memo?: string;
  }[];
};

/** 요청 전 데이터 검사 */
export const apiValidateCreateTransaction = (
  data: TransactionType,
): boolean => {
  // 몇 번째 아이템인지 나타냄
  let index = 1;
  for (const item of data.list) {
    if (item.name === '') {
      alert(`${index}번째 세부 항목명을 입력해주세요`);
      return false;
    } else if (item.price === 0) {
      alert(`${index}번째 세부 항목의 금액은 0보다 커야 합니다`);
      return false;
    } else if (item.largeCategory === '') {
      alert(`${index}번째 세부 항목의 대분류를 선택해주세요`);
      return false;
    } else if (item.smallCategory === '') {
      alert(`${index}번째 세부 항목의 소분류를 선택해주세요`);
      return false;
    }
    index += 1;
  }
  return true;
};

// 거래내역
export const apiCreateTransaction = async (
  clubId: number,
  data: TransactionType,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/club/${clubId}/transaction`,
    data: data,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output == 200) {
        console.log(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiUpdateTransaction = async (
  transactionId: number,
  data: TransactionType,
) => {
  return await axios({
    method: 'put',
    url: `${BASE_URL}/club/transaction/${transactionId}`,
    data: data,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output == 200) {
        console.log(res.data.msg);
      } else {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiGetAllTransaction = async (
  clubId: number,
  searchKeyword?: string,
  start?: string,
  end?: string,
  page?: number,
) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/club/${clubId}/transactions`,
    params: {
      query: searchKeyword,
      start,
      end,
      page,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export type ReadResponseType = {
  transactionId: number;
  date: string;
  totalPrice: number;
  items: {
    transactionDetailId: number;
    name: string;
    price: number;
    type: string;
    largeCategory: string;
    smallCategory: string;
    largeTag: string;
    smallTag: string;
    memo: string;
  }[];
};

export const initialReadResponse: ReadResponseType = {
  transactionId: 0,
  date: '',
  totalPrice: 0,
  items: [
    {
      transactionDetailId: 0,
      name: '',
      price: 0,
      memo: '',
      type: '',
      largeCategory: '',
      smallCategory: '',
      largeTag: '',
      smallTag: '',
    },
  ],
};

export const apiGetTransaction = async (transactionId: number) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/club/transaction/${transactionId}`,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output == 200) {
        console.log(res.data.msg);
      } else {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiDeleteTransaction = async (transactionId: number) => {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/club/transaction/${transactionId}`,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output == 200) {
        console.log(res.data.msg);
      } else {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
