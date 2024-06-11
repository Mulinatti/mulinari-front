import ServicoAjudanteContext from "@/contexts/ServicoAjudanteContext";
import { useContext } from "react";

const useServicoAjudante = () => {
  const { ajudantes, servicos } = useContext(ServicoAjudanteContext);

  const servicoPorId = (id: string) => {
    return servicos.find(servico => {
      if(servico.id == parseInt(id))
        return servico;
    });
  }

  return { ajudantes, servicos, servicoPorId };
};

export default useServicoAjudante;
