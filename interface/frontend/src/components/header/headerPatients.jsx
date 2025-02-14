import { ImExit } from "react-icons/im";


export default function HeaderPatients(){

  return(

    <header className="w-full h-20 top-0 left-0 z-50 bg-green-700 shadow-md shadow-gray-600 p-30 flex justify-between items-center fixed">
      <div className="px-4"> 
      <img src="/logo.png" alt="" className="w-38 h-16" />
      </div>
      <nav>
        <a  href="/login" className="p-16 text-white text-2xl"><ImExit /></a>
      </nav>
    </header>

  )

}