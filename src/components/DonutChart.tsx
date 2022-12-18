import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Stat } from '../models/Pokemon';

import '../styles/DonutChart.scss';

interface Props {
  stat: Stat;
}
const DonutChart = ({ stat }: Props) => {
  const [chartData] = useState({
    labels: [stat.name, 'total'],
    datasets: [
      {
        label: 'Total stat',
        data: [stat.base_stat, stat.max_stat - stat.base_stat],
        borderWidth: 0,
        backgroundColor: [stat.color, '#1E1E1E'],
      },
    ],
  });

  return (
    <div className='DonutChart'>
      <div className='chart'>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            cutout: 40,
          }}
          className='donut'
        />
        <p className={`number number--${stat.name}`}>{stat.base_stat}</p>
      </div>
      <h3 className='name'>{stat.name}</h3>
    </div>
  );
};

export default DonutChart;
