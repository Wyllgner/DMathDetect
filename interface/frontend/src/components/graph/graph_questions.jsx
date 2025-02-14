import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraphComponent3({ data }) {
  return (
    <div className="w-full h-full">
      <Bar 
        data={data} 
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Acertos vs Erros',
            },
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Começa o eixo Y do zero
            },
          },
        }} 
      />
    </div>
  );
}