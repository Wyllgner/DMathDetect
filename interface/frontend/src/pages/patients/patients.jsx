import React, { useState,  useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [divs, setDivs] = useState([]); // Estado para armazenar as divs criadas
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle de visibilidade do modal
  const [newPatient, setNewPatient] = useState({ name: "", age: ""}); // Dados do novo paciente
  const [parents, setParents] = useState({name: "", age:"", cpf:"", contact:""})


  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para confirmar os dados e adicionar a div na lista
  const confirmPatient = async () => {
    try {
      const email = localStorage.getItem("email"); // Recupera o email do usuário logado
      if (!email) {
        console.error("Email não encontrado no localStorage.");
        return;
      }
  
      // Faz a requisição para obter o ID do usuário com base no email
      const userResponse = await axios.get(`http://localhost:8800/getUserIdByEmail?email=${email}`);
      const userId = userResponse.data.id;
  
      if (!userId) {
        console.error("ID do usuário não encontrado.");
        return;
      }
  
      // Faz a requisição para salvar o paciente e o responsável
      const response = await axios.post("http://localhost:8800/newpatient", {
        userId, // Inclui o ID do usuário logado
        patientData: newPatient,
        parentData: parents,
      });
  
      const newPatientData = response.data; // Dados retornados pelo backend
  
      // Atualiza o estado com os dados retornados
      setPatients((prevPatients) => [...prevPatients, newPatientData]);
  
      // Fecha o modal e limpa os campos
      setIsModalOpen(false);
      setNewPatient({ name: "", age: "" });
      setParents({ name: "", age: "", cpf: "", contact: "" });
  
      console.log("Paciente e pai cadastrados com sucesso:", newPatientData);
    } catch (err) {
      console.error("Erro ao cadastrar paciente e pai:", err);
    }
  };

useEffect(() => {
  const loadPatients = async () => {
    const email = localStorage.getItem("email"); // Recupera o email do usuário logado
    console.log(localStorage.getItem("email"))
    if (email) {
      try {
        // Faz a requisição para obter o ID do usuário com base no email
        const userResponse = await axios.get(`http://localhost:8800/getUserIdByEmail?email=${email}`);
        const userId = userResponse.data.id;
        console.log("id do usuario:",userId)

        // Agora, com o ID do usuário, consulta os pacientes relacionados a ele
        const response = await axios.get(`http://localhost:8800/patients?userId=${userId}`);
        setPatients(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Erro ao carregar pacientes:", err);
      }
    }
  };

  loadPatients();
}, []);


  // Função para lidar com a mudança dos dados
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParents((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate()
  
  const handleNavigate = (patientId) => {
    navigate('/questions', { state: { patientId } });
  }
  return (
    <div className="bg-gradient-to-b from-white to-gray-300 w-full h-screen flex items-center justify-center p-10 overflow-y-auto min-h-screen">
      <div className="bg-white w-full max-h-full shadow-lg shadow-gray-600 rounded-xl flex justify-start items-center flex-col overflow-auto pt-10 pb-10">
        <button
          onClick={openModal}
          className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 shadow-md shadow-gray-500 transition w-2/3 h-20 flex justify-center items-center text-5xl"
        >
          <FaPlusCircle />
        </button>

        {/* Lista de divs com as informações inseridas */}
        <div className="flex flex-col w-full items-center gap-3 mt-5">
              {Array.isArray(patients) && patients.length > 0 ? (
                patients.map((patient, index) => (
                  <div
                    key={index}
                    className="w-2/3 h-auto bg-white p-4 rounded-xl shadow-md shadow-gray-500 text-left flex flex-row justify-between items-center"
                  >
                    <div className=" w-full h-auto pr-10 flex-col">
                      <p className="pb-2 pt-2"><strong>Dados do paciente</strong></p>
                      <p>Nome do Paciente: {patient.patientName}</p>
                      <p>Idade do Paciente:{patient.patientAge}</p>
                      <p className="pb-2 pt-2"><strong>Dados do responsável</strong></p>
                      <p>Nome do responsável: {patient.parentName}</p>
                      <p>Idade do responsável: {patient.parentAge}</p>
                      <p>Contato do responsável: 9 9999-9999</p>
                      <p>CPF do responsável: 000.000.000-00</p>
                    </div>
                    <div className="w-full h-full flex flex-row justify-between items-start">
                      <button className="w-32 h-32 bg-white rounded-xl shadow-md shadow-gray-500 hover:bg-gray-300 transition text-8xl flex justify-center items-center" onClick={() => handleNavigate(patient.patientId)}>
                      <TbReport className="text-green-700" />
                      </button>
                      <button className="w-32 h-32 bg-white p-4 rounded-xl shadow-md shadow-gray-500 hover:bg-gray-300 transition text-8xl flex justify-center items-center">
                      <TbReportAnalytics className="text-green-700" />
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <p>Nenhum paciente encontrado</p>
              )}
          </div>
      </div>

      {/* Modal para adicionar novo paciente */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl w-96 shadow-lg relative">
            {/* Botão de Fechar no canto superior direito */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircle />
            </button>
            <h1 className="text-3xl font-bold mb-4 ">Novo Paciente</h1>
            <h4 className="pb-2 font-bold">Dados do paciente:</h4>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={newPatient.name}
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="age"
                placeholder="Idade"
                value={newPatient.age}
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <h4 className="pb-2 font-bold">Dados dos pais:</h4>

            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={parents.name}
                onChange={handleParentChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="age"
                placeholder="Idade"
                value={parents.age}
                onChange={handleParentChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={parents.cpf}
                onChange={handleParentChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="contact"
                placeholder="Contato"
                value={parents.contact}
                onChange={handleParentChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={confirmPatient}
                className="bg-green-700 border-black shadow hover:shadow-gray-600  hover:bg-green-800 rounded-xl w-24 h-9 font-bold text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
