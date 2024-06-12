import IServico from "@/interfaces/IServico";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, User } from "lucide-react";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import http from "@/api/connection";
import { toast } from "sonner";

interface CardServicoProps {
  servico: IServico;
  ajudanteId?: number;
  pago?: boolean
}

const CardServico = ({ servico, ajudanteId, pago }: CardServicoProps) => {
  const navigate = useNavigate();

  const { servicos, buscarDados } = useServicoAjudante();

  const servicoAjudante = servicos.find(
    (servicoAtual) => servico.id == servicoAtual.id
  );

  const servicoPagamento = servicoAjudante?.ajudantes.find(
    (ajudante) => ajudante.ajudante.id == ajudanteId
  );

  const efetuarPagamento = () => {
    http
      .put(`/servico-ajudante/${servicoPagamento?.id}`)
      .then(() => {
        toast.success("Ajudante pago!");
        buscarDados();
      })
      .catch(() => toast.error("Erro ao efetuar pagamento"));
  };

  return (
    <div className="relative flex items-center">
      <Card
        onClick={() => navigate(`/servico/${servico.id}`)}
        className={`ml-1 relative flex flex-1 justify-between items-center p-8 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer ${pago && "ring-1 ring-emerald-500/50"}`}
      >
        <CardHeader className="ml-4 p-0">
          <CardTitle>{servico.rua}</CardTitle>
          <div className="items-center gap-1 flex mt-2">
            <span className="text-x text-gray-500 font-italic">
              {servico.bairro}
            </span>
            <p className="text sm ml-0 text-gray-400 italic">
              - {servico.data}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex gap-10 items-center p-0 mr-4">
          <div className="flex gap-2 items-center">
            <User size={30} className="text-zinc-500/90"></User>
            <span className="text-xl font-semibold">
              {servicoAjudante?.ajudantes.length}
            </span>
          </div>
          <div className="flex gap-2 items-center w-28">
            <DollarSign size={25} className="text-emerald-600" />
            <span className="text-xl font-semibold">
              {servico.valor.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </CardContent>
      </Card>
      <Button onClick={efetuarPagamento} variant={"secondary"} className={`absolute z-10 -right-20 ${pago && "hidden"}`}>
        Pagar
      </Button>
    </div>
  );
};

export default CardServico;
