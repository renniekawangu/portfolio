import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts() {
  const data = {
    labels: ['Pass', 'Fail'],
    datasets: [{
      data: [80, 20],
      backgroundColor: ['#4CAF50', '#F44336']
    }]
  };
  return <Pie data={data}/>;
}
