import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface listItemTypes {
  clubCrewId: number;
  name: string;
  email: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}

export default function ManageJoin() {
  const { id } = useParams();
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const getRequestList = async (page?: number) => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crews/requests`, {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,ASC',
        },
      })
      .then((response) => {
        console.log(response.data);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getRequestList();
  }, []);
  return <div>ManageJoin</div>;
}
