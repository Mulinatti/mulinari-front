import ServicoAjudanteContext from "@/contexts/ServicoAjudanteContext";
import { useContext } from "react";

const useServicoAjudante = () => {
  const { ajudantes, setAjudantes } = useContext(ServicoAjudanteContext);

  return { ajudantes, setAjudantes };
};

export default useServicoAjudante;
