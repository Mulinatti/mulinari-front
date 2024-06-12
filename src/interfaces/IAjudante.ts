import IServicoAjudante from "./IServicoAjudante";

interface IAjudante {
  id: number;
  nome: string;
  motorista: boolean;
  apelido: string;
  dataNascimento: string;
  telefone: string;
  servicos: IServicoAjudante[];
}

export default IAjudante;