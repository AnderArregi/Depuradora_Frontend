import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import NuevoPass from './NuevoPass';
import Panel from './Panel';
import Depuradora from './Depuradora';
import MiCalendario from './MiCalendario'; 
import  Datos  from './Datos';
import Vacaciones from './Vacaciones';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="nuevoPass" element={<NuevoPass />} />
        <Route path="depuradora" element={<Panel activePage={"depuradora"}/>} />
        <Route path="calendario" element={<Panel activePage={"calendario"}/>} /> 
        <Route path="datos" element={<Panel activePage={"datos"} />} />
        <Route path="vacaciones" element={<Panel activePage={"vacaciones"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
