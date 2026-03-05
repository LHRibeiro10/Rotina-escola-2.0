
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RegisterChild from "./pages/RegisterChild.jsx";
import Aluno from './pages/Aluno.jsx'
import Biblioteca from './pages/Biblioteca.jsx'
import Agenda from './pages/Agenda.jsx'
import Responsavel from './pages/Responsavel.jsx'
import Perfil from './pages/Perfil.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-child" element={<RegisterChild />} />
        <Route element={<App />}> 
          <Route index element={<Aluno />} />
          <Route path="biblioteca" element={<Biblioteca />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="responsavel" element={<Responsavel />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
