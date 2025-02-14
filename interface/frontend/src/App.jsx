import './App.css'
import{
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Home from './pages/home/home'
import Register from './pages/register/register'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import HomeHeader from './components/header/homeHeader'
import HeaderPatients from './components/header/headerPatients'
import Login from './pages/login/login'
import Patients from './pages/patients/patients'
import About from './pages/about/about'
import Contact from './pages/contact/contact'
import Questions from './pages/questions/questions'
import HeaderQuestions from './components/header/headerQuestions'


function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? (<HomeHeader />) 
      : 
      location.pathname === '/patients' ? (<HeaderPatients/>) 
      : 
      location.pathname === '/register' ? (<HomeHeader />)
      :
      location.pathname === '/questions' ? (<HeaderQuestions/>)
      :
      (<Header/>)}
      <div className='pt-16'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/patients' element={<Patients/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/questions' element={<Questions/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}