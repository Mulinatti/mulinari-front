import http from "@/api/connection";
import IAjudante from "@/interfaces/IAjudante";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface ServicoAjudanteContextProps {
  ajudantes: IAjudante[];
  setAjudantes: React.Dispatch<React.SetStateAction<IAjudante[]>>;
}

interface ServicoAjudanteProviderProps {
  children: ReactNode;
}

export const ServicoAjudanteContext = createContext<ServicoAjudanteContextProps>(
  {} as ServicoAjudanteContextProps
);

export const ServicoAjudanteProvider = ({children}: ServicoAjudanteProviderProps) => {
  const [ajudantes, setAjudantes] = useState<IAjudante[]>([]);

  useEffect(() => {
    http.get<IAjudante[]>("/ajudantes")
      .then(res => {
        setAjudantes(res.data);
      })
  }, []);

  return (
    <ServicoAjudanteContext.Provider value={{ajudantes, setAjudantes}}>
      {children}
    </ServicoAjudanteContext.Provider>
  )
}

export default ServicoAjudanteContext;