import axios from 'axios';
import { WarningToast } from '../../../services/customSweetAlert';
import { TypeNameKeys } from '../bookReducer';

import { BASE_URL, setToken } from './bookWriteApi';

export type ReadTransactionResType = {
  date: string;
  totalPrice: number;
  transactionId: number;
  requestId?: number;
  receiptUrl?: string;
  items: {
    transactionDetailId: number;
    name: string;
    price: number;
    type: TypeNameKeys;
    largeCategory: string;
    smallCategory: string;
    largeTag: string;
    smallTag: string;
    memo: string;
  }[];
};

export const initialReadResponse: ReadTransactionResType = {
  date: '',
  totalPrice: 0,
  transactionId: 0,
  requestId: 0,
  receiptUrl: '',
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
        WarningToast.fire({
          icon: 'error',
          title: res.data.msg,
        });
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
        WarningToast.fire({
          icon: 'error',
          title: res.data.msg,
        });
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
