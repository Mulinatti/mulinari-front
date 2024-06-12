import ServicoAjudanteContext from "@/contexts/ServicoAjudanteContext";
import { useContext } from "react";

const useServicoAjudante = () => {
  const { ajudantes, servicos, buscarDados } = useContext(ServicoAjudanteContext);

  const servicoPorId = (id: string) => {
    return servicos.find(servico => {
      if(servico.id == parseInt(id))
        return servico;
    });
  }

  const ajudantePorId = (id: string | undefined) => {
    if(id)
      return ajudantes.find(ajudante => {
        if(ajudante.id == parseInt(id))
          return ajudante;
      })
  }

  return { ajudantes, servicos, ajudantePorId, servicoPorId, buscarDados };
};

export default useServicoAjudante;
