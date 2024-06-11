import ServicoAjudanteContext from "@/contexts/ServicoAjudanteContext";
import { useContext } from "react";

const useServicoAjudante = () => {
  const { ajudantes, setAjudantes, servicos, setServicos } = useContext(ServicoAjudanteContext);

  return { ajudantes, setAjudantes, servicos, setServicos};
};

export default useServicoAjudante;
