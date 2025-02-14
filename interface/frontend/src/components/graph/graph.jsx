import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraphComponent({ data }) {
  return (
    <div className="w-full h-full">
      <Bar data={data} options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Resultados do Quiz por Grupo'
          },
          legend: {
            position: 'top',
          }
        }
      }} />
    </div>
  );
}