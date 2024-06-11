import IAjudante from "./IAjudante";
import IServico from "./IServico";

interface IServicoAjudante {
  id: number;
  servico: IServico;
  ajudante: IAjudante;
  pago: boolean;
}

export default IServicoAjudante;