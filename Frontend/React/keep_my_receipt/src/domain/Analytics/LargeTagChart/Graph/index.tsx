import React, { useEffect } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface ItemType {
  id: string;
  value: string;
  rate: string;
}

export default function Graph({
  sumValue,
  items,
}: {
  sumValue: number;
  items: ItemType[];
}) {
  Chart.register(ArcElement);
  const labels: String[] = items.map((item) => item.id);
  const datas: Number[] = items.map((item) => parseInt(item.value));
  const data = {
    labels,
    datasets: [
      {
        labels: labels,
        data: datas,
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          'rgba(238, 102, 121, 1)',
          'rgba(98, 181, 229, 1)',
          'rgba(255, 198, 0, 1)',
        ],
        fill: true,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}
