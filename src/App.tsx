import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/Pages/Home";
import Ajudante from "@/Pages/Ajudante";
import Header from "@/components/Header";
import CadastroAjudante from "@/components/CadastroAjudante"
import CadastroServico from "@/components/CadastroServico";
import { Toaster } from "./components/ui/sonner";
import { ServicoAjudanteProvider } from "./contexts/ServicoAjudanteContext";
import Servico from "@/Pages/Servico";

const App: React.FC = () => {
  return (
    <ServicoAjudanteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<Home/>} />
            <Route path="/cadastro">
              <Route path="/cadastro/ajudante" element={<CadastroAjudante/>}/>
              <Route path="/cadastro/ajudante/:id" element={<CadastroAjudante/>}/>
              <Route path="/cadastro/servico" element={<CadastroServico/>}/>
              <Route path="/cadastro/servico/:id" element={<CadastroServico/>}/>
            </Route>
            <Route path="/ajudante">
              <Route path="/ajudante/:id" element={<Ajudante/>} />
            </Route>
            <Route path="/">
              <Route path="/servico/:id" element={<Servico/>}/>
            </Route>
          </Route>
        </Routes>
        <Toaster richColors/>
      </BrowserRouter>
    </ServicoAjudanteProvider>
  );
};

export default App;
