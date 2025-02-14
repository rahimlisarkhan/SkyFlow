import { Card } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { memo } from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface IChartBar {
  data?: number[];
  label?: string[];
  title: string;
  xTitle: string;
}

const initialLabel: string[] = Array.from({ length: 6 }, () => 'label');
const initialData: number[] = Array.from({ length: 6 }, () => 0);

function BarChart({
  title,
  label = initialLabel,
  xTitle,
  data = initialData,
}: IChartBar) {
  const safeLabel = label ? [...label] : [...initialLabel];
  const safeData = data ? [...data] : [...initialData];

  const barOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: safeLabel,
    },
    yAxis: {
      title: {
        text: xTitle,
      },
    },
    series: [
      {
        name: xTitle,
        data: safeData,
        color: '#4bc0c0',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <ErrorBoundary>
      <Card title={title}>
        <HighchartsReact highcharts={Highcharts} options={barOptions} />
      </Card>
    </ErrorBoundary>
  );
}

export default memo(BarChart);
