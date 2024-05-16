
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
 import Loginform from './Components/Loginform';
 
 
 import Curd from './Components/Curd';

function App() {
 
  return (
    
      <Router>
      <Routes>
        <Route path='/' element={<Loginform />}/>
        <Route path='/curd' element={<Curd />}/>
      </Routes>
      </Router>
    
  
       
        
   
  );
}

export default App;
