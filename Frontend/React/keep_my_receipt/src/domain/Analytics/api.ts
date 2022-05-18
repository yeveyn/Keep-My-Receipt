import axios from 'axios';
import { TagItemType } from './types';

export type FirstChartResponseType = {
  tagName: string;
  percentage: number;
  cost: number;
  totalCost: number;
};

export const apiLoadFirstChartData = async (
  clubId: string,
  year: string,
  month: string,
) => {
  return await axios
    .get(
      `https://k6d104.p.ssafy.io/api/spring/chart/${clubId}/${year}/${month}`,
    )
    .then((response) => {
      console.log('analytics API test', response);
      return response;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const toTagItemType = (tags: FirstChartResponseType[]) => {
  const tagItems: TagItemType[] = tags.map((tag) => ({
    id: tag.tagName,
    rate: tag.percentage.toString(),
    value: tag.cost.toString(),
  }));

  const tagTotalCost = tags[0].totalCost;

  return { tagItems, tagTotalCost };
};
