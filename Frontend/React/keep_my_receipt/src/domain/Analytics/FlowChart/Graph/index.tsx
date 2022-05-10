import React from 'react';
import {
  Chart,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMediaQuery } from '@mui/material';

interface ItemType {
  date: string;
  value: string;
}

export default function Graph({ items }: { items: ItemType[] }) {
  Chart.register(CategoryScale);
  Chart.register(LineController);
  Chart.register(LineElement);
  Chart.register(PointElement);
  Chart.register(LinearScale);
  const matches = useMediaQuery('(min-width:500px)');
  const labels: String[] = items.map((item) => item.date);
  const datas: Number[] = items.map((item) => parseInt(item.value));
  const data = {
    labels: labels,
    datasets: [
      {
        label: '월별 추이',
        data: datas,
        fill: false,
        borderColor: '#F1B0BC',
        backgroundColor: '#97CDBD',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };
  const options = {
    spanGaps: false,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: matches
        ? {
            display: true,
            formatter: (value: any, context: any) => {
              return value
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
            },
          }
        : { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawTicks: true,
        },
        afterDataLimits: (scale: any) => {
          scale.max = scale.max * 1.1;
        },
        title: {
          display: true,
          text: '단위: 원',
        },
        min: 0,
      },
    },
  };
  return (
    <div style={{ width: '80vw' }}>
      <Line data={data} options={options} />
    </div>
  );
}
