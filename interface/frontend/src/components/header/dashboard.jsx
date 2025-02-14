import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ChartComponent = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

const Dashboard = () => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simula carregamento dos gráficos
    const timer = setTimeout(() => setCompleted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getGroupAverages = () => ({
    labels: ["Grupo A", "Grupo B", "Grupo C"],
    datasets: [
      {
        label: "Pontuação Média",
        data: [65, 59, 80],
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  });

  const getTimeAndCorrectness = () => ({
    labels: ["Questão 1", "Questão 2", "Questão 3"],
    datasets: [
      {
        label: "Tempo (segundos)",
        data: [30, 45, 25],
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  });

  const getCorrectness = () => ({
    labels: ["Acertos", "Erros"],
    datasets: [
      {
        label: "Respostas",
        data: [85, 15],
        backgroundColor: ["rgba(54,162,235,0.6)", "rgba(255,99,132,0.6)"],
      },
    ],
  });

  const captureGraph = async (chartElementId, yOffset, label, doc) => {
    const chartElement = document.getElementById(chartElementId);
    if (!chartElement) return;

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");
    doc.text(label, 10, yOffset - 10);
    doc.addImage(imgData, "PNG", 10, yOffset, 190, 90);
  };

  const saveAsPDF = async () => {
    const doc = new jsPDF();
    let currentYOffset = 20;

    await captureGraph("group-averages-chart", currentYOffset, "Pontuação Média e Tempo", doc);
    currentYOffset += 110;
    await captureGraph("time-and-correctness-chart", currentYOffset, "Tempo por Questão", doc);
    currentYOffset += 110;
    await captureGraph("correctness-chart", currentYOffset, "Acertos e Erros", doc);

    doc.save("graficos.pdf");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div id="group-averages-chart">
        <h2>Pontuação Média e Tempo</h2>
        <ChartComponent data={getGroupAverages()} options={{ responsive: true }} />
      </div>

      <div id="time-and-correctness-chart">
        <h2>Tempo por Questão</h2>
        <ChartComponent data={getTimeAndCorrectness()} options={{ responsive: true }} />
      </div>

      <div id="correctness-chart">
        <h2>Acertos e Erros</h2>
        <ChartComponent data={getCorrectness()} options={{ responsive: true }} />
      </div>

      {completed && (
        <button onClick={saveAsPDF} style={{ marginTop: "20px" }}>
          Salvar PDF
        </button>
      )}
    </div>
  );
};

export default Dashboard;