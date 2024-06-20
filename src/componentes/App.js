import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import NuevoPass from './NuevoPass';
import Panel from './Panel';
import Depuradora from './Depuradora';
import MiCalendario from './MiCalendario'; 
import  Datos  from './Datos';
import Vacaciones from './Vacaciones';
import TurnoDia from './TurnoDia';
import Formulario from './Formulario';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="nuevoPass" element={<NuevoPass />} />
        <Route path="depuradora/:usuarioId" element={<Panel activePage={"depuradora"}/>} />
        <Route path="calendario/:usuarioId" element={<Panel activePage={"calendario"}/>} /> 
        <Route path="datos/:usuarioId" element={<Panel activePage={"datos"} />} />
        <Route path="vacaciones/:usuarioId" element={<Panel activePage={"vacaciones"} />} />
        <Route path="turno/:usuarioId/:fecha" element={<TurnoDia/>} />
        <Route path="/formulario/:usuarioId/:fecha/:turno" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
