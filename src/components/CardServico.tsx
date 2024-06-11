import IServico from "@/interfaces/IServico";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, User } from "lucide-react";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface CardServicoProps {
  servico: IServico;
}

const CardServico = ({servico}: CardServicoProps) => {

  const navigate = useNavigate();

  const {servicos} = useServicoAjudante();

  const ajudantesDoServico = servicos.find(servicoAtual => servicoAtual.id === servico.id)?.ajudantes.length;

  return (
    <Card onClick={() => navigate(`/servico/${servico.id}`)} className="ml-1 flex justify-between items-center p-8 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer ">
      <CardHeader className="ml-4 p-0">
        <CardTitle>{servico.rua}</CardTitle>
        <div className="items-center gap-1 flex mt-2">
          <span className="text-x text-gray-500 font-italic">{servico.bairro}</span>
          <p className="text sm ml-0 text-gray-400 italic">- {servico.data}</p>
        </div>
      </CardHeader>
      <CardContent className="flex gap-10 items-center p-0 mr-4">
        <Button variant={"secondary"}>Pagar</Button>
        <div className="flex gap-2 items-center">
          <User size={30} className="text-zinc-500/90"></User>
          <span className="text-xl font-semibold">{ajudantesDoServico}</span>
        </div>
        <div className="flex gap-2 items-center w-28">
          <DollarSign size={25} className="text-emerald-600" />
          <span className="text-xl font-semibold">{servico.valor.toFixed(2).replace(".", ",")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardServico;
