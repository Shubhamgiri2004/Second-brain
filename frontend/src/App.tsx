import SignUp from "./pages/SignUp";
import './App.css'
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='dark:bg-slate-900 h-screen'>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  )
  
}

export default App
