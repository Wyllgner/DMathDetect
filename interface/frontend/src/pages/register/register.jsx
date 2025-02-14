import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate()


  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    profisao:""
  })

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/register", user) 
      navigate("/login")
    }
    catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  return(

    <div className="bg-gradient-to-b from-white to-gray-300 w-full h-screen flex items-center justify-center">

    <div className=" bg-white w-96 h-5/6 shadow-lg shadow-gray-600 rounded-xl flex items-center justify-center">
      <div className="w-80 h-96 flex justify-center items-center">
        <form action="/login-submit" method="POST">

            <div>
              <h1 className="text-center text-2xl font-bold pb-10">Insira seus dados</h1>
            </div>

            <div className="flex-row items-center justify-center pb-5">
              <label for="name" className="text-md">Nome:</label>
              <input className="rounded-md border-2 border-black w-full h-8" type="text" name="name" id="name" onChange={handleChange} required />
            </div>

            <div className="flex-row items-center justify-center pb-5">
              <label for="email" className="text-md">E-mail:</label>
              <input className="rounded-md border-2 border-black w-full h-8" type="email" name="email" id="email" onChange={handleChange} required />
            </div>

            <div className="flex-row items-center justify-center pb-5">
              <label for="password" className="text-md">Senha:</label>
              <input className="rounded-md border-2 border-black w-full h-8" type="password" name="password" id="password" onChange={handleChange} required />
            </div>

            <div className="flex-row items-center justify-center pb-5">
              <label for="password" className="text-md">Profissão:</label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="profissao" value="psicopedagogo" className="form-radio text-blue-500" onChange={handleChange}/>
                <span>Psicopedagogo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="profissao" value="psicologo" className="form-radio text-blue-500" onChange={handleChange}/>
                <span>Psicólogo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="profissao" value="fonoaudiologo" className="form-radio text-blue-500" onChange={handleChange}/>
                <span>Fonoaudiólogo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="profissao" value="outros" className="form-radio text-blue-500" onChange={handleChange}/>
                <span>Outros</span>
              </label>
            </div>

            <div className="flex items-center justify-center pt-1">
              <button className="bg-green-700 shadow hover:shadow-gray-600 hover:bg-green-800 rounded-xl w-28 h-9 font-bold text-white" onClick={handleClick}>Criar conta</button>
             
            </div>

        </form>
      </div>
    </div>


  </div>

  )

}