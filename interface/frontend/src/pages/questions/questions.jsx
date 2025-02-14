import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import GraphComponent from "../../components/graph/graph";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaPrint } from "react-icons/fa";

export default function Questions() {
  const [current, setCurrent] = useState(0); // Controle da pergunta atual
  const [answers, setAnswers] = useState([]); // Respostas do usuário
  const [score, setScore] = useState(0); // Número de acertos
  const [completed, setCompleted] = useState(false); // Quiz finalizado?
  const [startTime, setStartTime] = useState(null); // Tempo de início para cada pergunta

  const location = useLocation();
  const patientId = location.state?.patientId

  console.log("id do paciente que vai responder: ", patientId)

  const questions = [
    // Tópico 1: Senso Numérico
    
    {
      question: "Qual número é maior?",
      options: ["7", "3", "1", "5"],
      result: ["7"],
      tipo:["Senso numérico"]
    },
    {
      question: "Nessa sequência: '0, 1, 2, 3, 0, 4, 2, 0, 1, 0' quantos 'O' existem?",
      options: ["3", "5", "4", "6"],
      result: ["4"],
      tipo:["Senso numérico"]
    },
    {
      question: "Ordene os números do menor para o maior: 5, 2, 8, 1.",
      options: [
        "8, 5, 2, 1",
        "1, 2, 5, 8",
        "5, 2, 1, 8",
        "2, 1, 5, 8",
      ],
      result: ["1, 2, 5, 8"],
    },
    {
      question: "Se você adicionar 2 a 4, qual será o total?",
      options: ["7", "6", "8", "5"],
      result: ["6"],
      tipo:["Senso numérico"]
    },
    {
      question: "Sem contar, escolha o número que corresponde ao total de dedos nas mãos juntas.",
      options: ["8", "10", "11", "9"],
      result: ["10"],
      tipo:["Senso numérico"]
    },
  
    // Tópico 2: Cálculo Simples
    {
      question: "Se você tem 3 maçãs e ganha mais 2, quantas terá?",
      options: ["5", "3", "4", "6"],
      result: ["5"],
      tipo:["Cálculo simples"]
    },
    {
      question: "Quanto é 8 menos 5?",
      options: ["2", "4", "5", "3"],
      result: ["3"],
      tipo:["Cálculo simples"]
    },
    {
      question: "Multiplique o número 2 pelo número  3.",
      options: ["6", "5", "8", "7"],
      result: ["6"],
      tipo:["Cálculo simples"]
    },
    {
      question: "Divida 10 em 2 grupos iguais. Quantos objetos haverá em cada grupo?",
      options: ["5", "3", "4", "6"],
      result: ["5"],
      tipo:["Cálculo simples"]
    },
    {
      question: "Um brinquedo custa 5 moedas, e você tem 2 moedas. Quantas faltam?",
      options: ["1", "4", "3", "2"],
      result: ["3"],
      tipo:["Cálculo simples"]
    },
  
    // Tópico 3: Compreensão do Tempo e Espaço
    {
      question: "O que acontece primeiro?",
      options: [
        "Dormir",
        "Jantar",
        "Tomar café da manhã",
        "Ir para a escola",
      ],
      result: ["Tomar café da manhã"],
      tipo:["Tempo e espaço"]
    },
    {
      question: "Qual distância é maior?",
      options: ["4 metros", "2 metros", "5 metros", "3 metros"],
      result: ["5 metros"],
      tipo:["Tempo e espaço"]
    },
    {
      question: "Se no relógio está marcando 15h30min, quanto tempo fata para às 16h00min?",
      options: ["1h15min", "15min", "30min", "3h00min"],
      result: ["30min"],
      tipo:["Tempo e espaço"]
    },
    {
      question: "Se um ônibus sai às 14h e a viagem dura 2 horas, que horas chegará?",
      options: ["17h", "16h", "18h", "15h"],
      result: ["16h"],
      tipo:["Tempo e espaço"]
    },
    {
      question: "Coloque na ordem correta as seguintes atividades: acordar, ir para a escola, jantar, dormir.",
      options: [
        "Dormir, acordar, jantar, ir para a escola",
        "Ir para a escola, jantar, acordar, dormir",
        "Acordar, ir para a escola, jantar, dormir",
        "Jantar, dormir, acordar, ir para a escola",
      ],
      result: ["Acordar, ir para a escola, jantar, dormir"],
      tipo:["Tempo e espaço"]
    },
  
    // Tópico 4: Reconhecimento de Padrões
    {
      question: "Complete a sequência: 1, 2, 3, _, _.",
      options: ["4, 5", "5, 6", "2, 3", "3, 4"],
      result: ["4, 5"],
      tipo:["Reconhecimento de padrões"]
    },
    {
      question: "Identifique o próximo elemento nesta sequência: 1 2 1 2 1 _",
      options: ["1", "2 2", "1 1 ", "2"],
      result: ["2"],
      tipo:["Reconhecimento de padrões"]
    },
    {
      question: "Encontre o padrão: 5, 10, 15, _, _.",
      options: ["25, 30", "20, 25", "15, 20", "10, 15"],
      result: ["20, 25"],
      tipo:["Reconhecimento de padrões"]
    },
    {
      question: "Qual elemento é diferente nesta sequência: X O X O X Y",
      options: ["X", "X O", "Y", " O"],
      result: ["Y"],
      tipo:["Reconhecimento de padrões"]
    },
    {
      question: "Complete a figura com o elemento que falta. (Figura incompleta - incluir imagem)",
      options: ["Opção A", "Opção D", "Opção B", "Opção C"],
      result: ["Opção A"],
      tipo:["Reconhecimento de padrões"]
    },
  
    // Tópico 5: Memória de Trabalho 
    {
      question: "Qual número aparece na terceira posição desta sequência: 2, 4, 6, 8, 10?",
      options: ["4", "6", "8", "10"],
      result: ["6"],
      tipo:["Memória de trabalho"]
    },
    {
      question: "Se você contar de 3 em 3 a partir de 1, quais são os primeiros quatro números?",
      options: [
        "1, 3, 5, 7",
        "1, 4, 7, 10",
        "1, 3, 6, 9",
        "1, 4, 6, 9",
      ],
      result: ["1, 4, 7, 10"],
      tipo:["Memória de trabalho"]
    },
    {
      question: "Se você começar com 10 e subtrair 2 repetidamente, quais números aparecem?",
      options: [
        "10, 8, 6, 4",
        "10, 7, 5, 3",
        "10, 9, 8, 7",
        "10, 8, 5, 3",
      ],
      result: ["10, 8, 6, 4"],
      tipo:["Memória de trabalho"]
    },
    {
      question: "Complete a sequência lógica: 5, 10, 20, _, _.",
      options: ["30, 35", "30, 40", "25, 35", "25, 40"],
      result: ["30, 40"],
      tipo:["Memória de trabalho"]
    },
    {
      question: "Se um número for multiplicado por 2 e depois somado a 3, qual número resulta para 4?",
      options: ["8", "11", "10", "7"],
      result: ["11"],
      tipo:["Memória de trabalho"]
    },
  ];
  const [groupTimes, setGroupTimes] = useState(Array(Math.ceil(questions.length / 5)).fill([])); // Inicializa tempos por grupo

  const [groupScores, setGroupScores] = useState(Array(Math.ceil(questions.length / 5)).fill(0)); // Inicializa o array de pontuações por grupo

  const handleAnswerClick = (answer) => {
    const timeTaken = Date.now() - startTime;

    const updatedAnswers = [...answers];
    updatedAnswers[current] = {
        questionIndex: current + 1,
        answer: answer,
        correct: questions[current]?.result[0] === answer,
        time: timeTaken
    };
    setAnswers(updatedAnswers);

    // Índice do grupo atual
    const groupIndex = Math.floor(current / 5);

    if (questions[current]?.result[0] === answer) {
        setGroupScores(prevScores => {
            const newScores = [...prevScores];
            newScores[groupIndex]++;
            return newScores;
        });
    }

    // Atualiza tempos por grupo
    setGroupTimes(prevTimes => {
        const newTimes = [...prevTimes];
        newTimes[groupIndex] = [...newTimes[groupIndex], timeTaken];
        return newTimes;
    });

    if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
        setStartTime(Date.now());
    } else {
        setCompleted(true);
    }
};

const getTimeAndCorrectnessData = () => {
  const times = answers.map(answer => answer.time / 1000); // Converte tempo para segundos
  
  return {
    labels: answers.map((_, index) => `Questão ${index + 1}`), // Rótulos das questões
    datasets: [
      {
        label: 'Tempo (segundos)',
        data: times,
        backgroundColor: 'rgba(75,192,192,0.2)', // Cor de fundo da barra
        borderColor: 'rgba(75,192,192,1)', // Cor da borda da barra
        borderWidth: 1, // Largura da borda
        yAxisID: 'y', // Eixo Y para o tempo
      },
    ],
  };
};

const getGroupAverages = () => {
  return groupScores.map((score, index) => {
      const averageScore = score / 5; // Média percentual de acertos
      const averageTime = groupTimes[index].length > 0
          ? groupTimes[index].reduce((a, b) => a + b, 0) / groupTimes[index].length
          : 0; // Média de tempo em milissegundos
      return {
          group: index + 1,
          averageScore: parseFloat(averageScore.toFixed(2)), // Mantém 2 casas decimais
          averageTime: parseFloat((averageTime / 1000).toFixed(2)) // Tempo em segundos como número
      };
  });
};

const getFormattedGroupAverages = () => {
  const averages = getGroupAverages(); // Chama a função original para obter os dados
  const formattedAverages = averages.flatMap(avg => [avg.averageScore, avg.averageTime]); // Converte para o formato desejado
  return formattedAverages;
};

const [categoriaPrevista, setCategoriaPrevista] = useState(null);

const enviarDadosParaAPI = async (medias) => {
  try {
      const resposta = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ resposta: medias })
      });

      const data = await resposta.json();
      const resultadoDiv = document.getElementById('resultado');

      if (resposta.ok) {
         const categoria = data?.categoria || "Sem categoria";
          setCategoriaPrevista(categoria);

          if (data?.categoria === 1) {
              resultadoDiv.textContent = "Mensagem para categoria 1: A previsão indica sucesso!";
              resultadoDiv.style.color = "green";
          } else if (data?.categoria === 0) {
              resultadoDiv.textContent = "Mensagem para categoria 0: A previsão indica falha.";
              resultadoDiv.style.color = "red";
          } else {
              resultadoDiv.textContent = "Categoria desconhecida retornada pela API.";
              resultadoDiv.style.color = "orange";
          }
      } else {
          console.error("Erro na previsão:", data?.error || "Erro desconhecido");
          resultadoDiv.textContent = "Erro na previsão: " + (data?.error || "Erro desconhecido");
          resultadoDiv.style.color = "red";
      }
  } catch (error) {
      console.error("Erro ao se conectar com a API:", error);
      const resultadoDiv = document.getElementById('resultado');
      resultadoDiv.textContent = "Erro ao se conectar com a API.";
      resultadoDiv.style.color = "red";
  }
};

const medias = getFormattedGroupAverages();
console.log("medias:",medias)
console.log(enviarDadosParaAPI(medias))


const getCorrectnessData = () => {
  const correctCount = answers.filter(answer => answer.correct).length; // Conta os acertos
  const incorrectCount = answers.filter(answer => !answer.correct).length; // Conta os erros
  
  return {
    labels: ['Acertos', 'Erros'], // Rótulos para o gráfico
    datasets: [
      {
        label: 'Quantidade',
        data: [correctCount, incorrectCount], // Dados: quantidade de acertos e erros
        backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255,99,132,0.2)'], // Cores das barras
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'], // Cor da borda das barras
        borderWidth: 1, // Largura da borda das barras
      },
    ],
  };
};

  // Inicia o tempo quando a pergunta muda
  useEffect(() => {
    setStartTime(Date.now());
  }, [current]);

  const saveAsPDF = async () => {
    const doc = new jsPDF();
    let currentYOffset = 20; // Posição inicial do gráfico no PDF
  
    const captureGraph = async (chartId, yOffset, title) => {
      const chartElement = document.getElementById(chartId);
      if (!chartElement) return;
  
      const canvas = await html2canvas(chartElement);
      const imgData = canvas.toDataURL("image/png");
  
      doc.text(title, 10, yOffset - 10); // Adiciona o título do gráfico acima da imagem
      doc.addImage(imgData, "PNG", 10, yOffset, 190, 90); // Adiciona o gráfico ao PDF
    };
  
    // Adiciona o gráfico de médias por grupo
    await captureGraph("group-averages-chart", currentYOffset, "Médias por Grupo");
    currentYOffset += 110;
  
    // Adiciona o gráfico de acertos e erros
    await captureGraph("correctness-chart", currentYOffset, "Acertos e Erros");
    currentYOffset += 110;
  
    // Adiciona o gráfico de tempo por questão
    await captureGraph("time-chart", currentYOffset, "Tempo por Questão");
  
    // Salva o PDF
    doc.save("resultados.pdf");
  };

  return (
      <div className="bg-gradient-to-b from-white to-gray-300 w-screen min-h-screen flex items-center justify-center overflow-y-auto pt-10 pb-10">
        {completed ? (
          // Tela final
          <div className="bg-white w-full h-full shadow-lg shadow-gray-600 rounded-xl flex flex-col items-center justify-start">
            <div className="mt-4 w-4/6">
              {/* Gráfico de Médias por Grupo */}
              <div id="group-averages-chart" className="mb-8">
                <h3 className="font-semibold mb-4">Médias por Grupo:</h3>
                <Bar
                  data={{
                    labels: getGroupAverages().map((group) => `Grupo ${group.group}`),
                    datasets: [
                      {
                        label: "Média de Acertos",
                        data: getGroupAverages().map((group) => group.averageScore),
                        backgroundColor: "rgba(75,192,192,0.4)",
                      },
                      {
                        label: "Média de Tempo (segundos)",
                        data: getGroupAverages().map((group) => parseFloat(group.averageTime)),
                        backgroundColor: "rgba(153,102,255,0.4)",
                      },
                    ],
                  }}
                />
              </div>
    
              {/* Gráfico de Acertos e Erros */}
              <div id="correctness-chart" className="mb-8">
                <h4 className="font-medium mb-4">Acertos e Erros</h4>
                <Bar
                  data={getCorrectnessData()}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Acertos vs Erros",
                      },
                    },
                  }}
                />
              </div>
    
              {/* Gráfico de Tempo por Questão */}
              <div id="time-chart" className="mb-8">
                <h4 className="font-medium mb-4">Tempo por Questão</h4>
                <Bar
                  data={getTimeAndCorrectnessData()}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Tempo Gasto por Questão",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Tempo (segundos)",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Questões",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
    
            {/* Botão para salvar como PDF */}
            {categoriaPrevista !== null && (
                <div className="mt-4 mb-4 text-2xl">
                  <p>
                    {categoriaPrevista === 1
                      ? "Indícios de discalculia!"
                      : categoriaPrevista === 0
                      ? "Sem indícios de discalculia!"
                      : "Categoria desconhecida"}
                  </p>
                </div>
              )}
            
            <div className="mt-4 p-10">
              <button
                onClick={saveAsPDF}
                className="bg-green-700 text-white font-bold py-2 rounded hover:bg-blue-800 text-3xl flex justify-center items-center px-4"
              >
                <FaPrint/> 
                <p className="pl-6">Imprimir</p>
              </button>
            </div>
          </div>
        ) : (
          // Perguntas em andamento
          <div className="bg-white w-4/6 h-2/5 shadow-lg shadow-gray-600 rounded-xl flex flex-col items-center justify-start">
            <div className="w-full h-42 bg-white justify-center items-center flex rounded-t-xl shadow-black text-black font-semibold text-2xl p-10">
              {questions[current]?.question}
            </div>
    
            {/* Exibe imagem se disponível */}
            {questions[current]?.image_url && (
              <div className="w-full h-64 flex items-center justify-center">
                <img
                  src={questions[current]?.image_url}
                  alt="Imagem da questão"
                  className="max-h-full max-w-full rounded-md shadow-md"
                />
              </div>
            )}
    
            <div className="w-full h-full bg-white justify-center items-center flex rounded-b-xl p-5">
              <div className="w-full h-full p-2 grid grid-cols-2 grid-rows-2 gap-4 justify-center items-center">
                {/* Garantir que options seja um array antes de chamar map */}
                {Array.isArray(questions[current]?.options) && questions[current]?.options.length > 0 ? (
                  questions[current]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)} // Passa o valor selecionado
                      className="bg-green-700 h-40 justify-center items-center flex rounded-xl text-lg text-white font-semibold hover:bg-green-800"
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p>Carregando opções...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
