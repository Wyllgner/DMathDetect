import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"


export default function Login(){
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email:"",
    password:""
  })

  const handleRegister = () => {
    navigate('/register'); // Redireciona após evento
  };

  const handleLogin = async e => {
    
    e.preventDefault()

    try{

      const res = await axios.post("http://localhost:8800/login", user)
      const {data} = res

      if(data.message === "Login feito com sucesso"){
        
        navigate("/patients")
      }else if(data === "Usuário não encontrado"){
        console.log("Não encontrado")
      }
      else{
        console.log(data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  return(

    <div className="bg-gradient-to-b from-white to-gray-300 w-full h-screen flex items-center justify-center justify-">
      <div className=" bg-white w-96 h-2/3 shadow-lg shadow-gray-600  rounded-xl flex items-center justify-center">
        <div className="w-80 h-96 flex justify-center items-center">
          <form action="/login-submit" method="POST">

              <div>
                <h1 className="text-center text-4xl font-bold pb-10">Login</h1>
              </div>

              <div className="flex-row items-center justify-center pb-5">
                <label for="email" className="text-md">E-mail:</label>
                <input className="rounded-md border-2 border-black w-full h-8" type="text" name="email" id="email" required onChange={handleChange} />
              </div>

              <div className="flex-row items-center justify-center pb-5">
                <label for="password" className="text-md">Senha:</label>
                <input className="rounded-md border-2 border-black w-full h-8" type="password" name="password" id="password" required onChange={handleChange}/>
              </div>

              <div className="flex items-center justify-center pt-5">
                <button onClick={handleLogin} className="bg-green-700 border-black shadow hover:shadow-gray-600  hover:bg-green-800 rounded-xl w-20 h-9 font-bold text-white" type="submit">Enviar</button>
               
              </div>

              <div className="flex items-center justify-center">
                <a href="" onClick={handleRegister} className="text-blue-500 underline pt-2">Crie sua conta</a>
              </div>

          </form>
        </div>
      </div>
    </div>

  )

}