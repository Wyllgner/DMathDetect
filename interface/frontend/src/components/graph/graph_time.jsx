import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraphComponent({ data }) {
  return (
    <div className="w-full h-96"> {/* Definindo um tamanho controlado para o gráfico */}
      <Bar 
        data={data} 
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Tempo por Questão', // Título do gráfico
            },
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              type: 'line',
              position: 'left',
              ticks: {
                beginAtZero: true, // Começar o eixo Y do zero
              },
            },
          },
        }} 
      />
    </div>
  );
}
