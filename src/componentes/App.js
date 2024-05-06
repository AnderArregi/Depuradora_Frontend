import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import NuevoPass from './NuevoPass';
import { Panel } from './Panel';
import { Depuradora } from './Depuradora';
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
        <Route path="panel" element={<Panel />} />
        <Route path="depuradora" element={<Depuradora/>} />
        <Route path="calendario" element={<MiCalendario />} /> 
        <Route path="datos" element={<Datos />} />
        <Route path="vacaciones" element={<Vacaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
