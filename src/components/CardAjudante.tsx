import { DollarSign, Truck } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
import IAjudante from "@/interfaces/IAjudante";

interface CardAjudanteProps {
  ajudante: IAjudante;
}

const CardAjudante = ({ajudante}: CardAjudanteProps) => {

    const navigate = useNavigate();

    const totalDiarias = ajudante.servicos.filter(servico => servico.pago == false).length * 90;

    return (
        <Card onClick = {() => navigate(`/ajudante/${ajudante.id}`)} className="flex hover:scale-[1.01] transition-all justify-between items-center p-8 shadow-sm hover:shadow-lg hover:cursor-pointer">
          <CardTitle className="ml-2">{ajudante.apelido}</CardTitle>
          <CardContent className="flex gap-10 items-center p-0 mr-4">
            <div className="flex gap-2 items-center">
              <Truck size={30} className="text-zinc-500/90"></Truck>
              <span className="text-xl font-semibold">{ajudante.servicos.length}</span>
            </div>
            <div className="flex gap-2 items-center w-28">
              <DollarSign size={25} className="text-red-500" />
              <span className="text-xl font-semibold">{`${totalDiarias.toFixed(2).replace(".", ",")}`}</span>
            </div>
          </CardContent>
        </Card>
    )
}

export default CardAjudante;