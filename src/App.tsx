import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/Pages/Home";
import Ajudante from "@/Pages/Ajudante";
import Header from "@/components/Header";
import CadastroAjudante from "@/components/CadastroAjudante"
import CadastroServico from "@/components/CadastroServico";
import { Toaster } from "./components/ui/sonner";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<Home/>} />
            <Route path="/cadastro">
              <Route path="/cadastro/ajudante" element={<CadastroAjudante/>}/>
              <Route path="/cadastro/servico" element={<CadastroServico/>}/>
            </Route>
            <Route path="/ajudante">
              <Route path="/ajudante/:id" element={<Ajudante/>} />
            </Route>
          </Route>
        </Routes>
        <Toaster richColors/>
      </BrowserRouter>
  );
};

export default App;
