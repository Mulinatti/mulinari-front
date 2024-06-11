import IServicoAjudante from "./IServicoAjudante";

interface IServico {
  id: number;
  rua: string;
  bairro: string;
  data: string;
  valor: number;
  ajudantes: IServicoAjudante[];
}

export default IServico;