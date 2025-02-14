import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import GraphComponent from './graph/graph'; // Assumindo que GraphComponent seja o seu componente de gráfico
import GraphComponent3 from './graph/graph_questions'; // Assumindo que GraphComponent3 seja o seu outro componente de gráfico

const saveAsPDF = () => {
  const doc = new jsPDF();
  
  
  // Captura os gráficos e adiciona ao PDF
  const captureGraph = (elementId, x, y) => {
    return new Promise((resolve) => {
      const element = document.getElementById(elementId);
      html2canvas(element).then((canvas) => {
        doc.addImage(canvas.toDataURL(), 'PNG', x, y, 180, 100); // Ajuste as coordenadas e tamanhos conforme necessário
        resolve();
      });
    });
  };

  // Adiciona o conteúdo dos três gráficos ao PDF
  const addGraphsToPDF = async () => {
    await captureGraph('graph1', 10, 10); // Captura e posiciona o primeiro gráfico
    await captureGraph('graph2', 10, 120); // Captura e posiciona o segundo gráfico
    await captureGraph('graph3', 10, 230); // Captura e posiciona o terceiro gráfico

    // Salva o PDF
    doc.save('graficos.pdf');
  };

  // Chama a função para adicionar os gráficos e salvar o PDF
  addGraphsToPDF();
};

export default function Graphs() {
  return (
    <div>
      {/* Divs com gráficos e IDs para cada um */}
      <div className="w-full h-full flex flex-col items-center" id="graph1">
        <h3 className="text-lg font-semibold mt-4">Resultados por grupo:</h3>
        <GraphComponent data={getGroupAverages()} />
      </div>

      <div className="w-full h-full flex flex-col items-center" id="graph2">
        <h3 className="text-lg font-semibold mt-4">Tempo por questao:</h3>
        <GraphComponent data={getTimeAndCorrectnessData()} />
      </div>

      <div className="w-full h-full flex flex-col items-center" id="graph3">
        <h3 className="text-lg font-semibold mt-4">Tempo por questao:</h3>
        <GraphComponent3 data={getCorrectnessData()} />
      </div>

      <button 
        onClick={saveAsPDF}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Baixar PDF com gráficos
      </button>
    </div>
  );
}