import React from 'react';
import { Stack } from '@mui/material';
import ClubListItem from '../../../../components/ClubListItem';

export default function SearchList(clubList: any) {
  console.log(clubList['clubList']);
  // clubList['clubList'].map((item: any) => {
  //   console.log(item);
  // });
  return (
    <Stack>
      <div>SearchList</div>
      {/* {Object.keys(clubList).map((key: any) => {
        <p>{key}</p>;
      })} */}
      {/* <ClubListItem /> */}
    </Stack>
  );
}
