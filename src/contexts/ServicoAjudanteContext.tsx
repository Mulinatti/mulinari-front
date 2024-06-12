import http from "@/api/connection";
import IAjudante from "@/interfaces/IAjudante";
import IServico from "@/interfaces/IServico";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface ServicoAjudanteContextProps {
  ajudantes: IAjudante[];
  setAjudantes: React.Dispatch<React.SetStateAction<IAjudante[]>>;
  servicos: IServico[];
  setServicos: React.Dispatch<React.SetStateAction<IServico[]>>;
  buscarDados: () => void;
}

interface ServicoAjudanteProviderProps {
  children: ReactNode;
}

export const ServicoAjudanteContext =
  createContext<ServicoAjudanteContextProps>({} as ServicoAjudanteContextProps);

export const ServicoAjudanteProvider = ({
  children,
}: ServicoAjudanteProviderProps) => {
  const [ajudantes, setAjudantes] = useState<IAjudante[]>([]);
  const [servicos, setServicos] = useState<IServico[]>([]);

  const buscarDados = () => {
    http.get<IAjudante[]>("/ajudantes").then((res) => {
      setAjudantes(res.data);
    });

    http.get<IServico[]>("/servicos").then(res => {
      setServicos(res.data);
    });
  }

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <ServicoAjudanteContext.Provider
      value={{ ajudantes, setAjudantes, servicos, setServicos, buscarDados }}
    >
      {children}
    </ServicoAjudanteContext.Provider>
  );
};

export default ServicoAjudanteContext;
