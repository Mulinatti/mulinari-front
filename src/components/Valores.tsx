import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { DollarSign, Truck, User } from "lucide-react";

const Valores = () => {
  const { servicos, ajudantes } = useServicoAjudante();

  const faturamento = servicos.reduce((acc, servico) => acc + servico.valor, 0);
  const totalDiarias = ajudantes.reduce(
    (acc, ajudante) =>
      acc +
      ajudante.servicos.filter((servico) => servico.pago == false).length * 90,
    0
  );

  return (
    <section className="flex gap-4">
      <div className="w-full">
        <Card className="card-1 flex h-44 flex-col justify-between p-6">
          <CardTitle className="text-left text-3xl">
            Faturamento Total
          </CardTitle>
          <CardContent className="flex p-0 gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <DollarSign size={25} className="text-emerald-600" />
              <span className="text-xl font-semibold">{`${faturamento
                .toFixed(2)
                .replace(".", ",")}`}</span>
            </div>
            <div className="flex p-0 gap-2 items-center">
              <Truck size={30} className="text-zinc-500/90"></Truck>
              <span className="text-xl font-semibold">{servicos.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card className="flex h-44 flex-col justify-between p-6">
          <CardTitle className="text-left text-3xl">
            Total das Diárias
          </CardTitle>
          <CardContent className="flex p-0 gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <DollarSign size={25} className="text-red-500" />
              <span className="text-xl font-semibold">{`${totalDiarias
                .toFixed(2)
                .replace(".", ",")}`}</span>
            </div>
            <div className="flex p-0 gap-2 items-center">
              <User size={30} className="text-zinc-500/90"></User>
              <span className="text-xl font-semibold">{ajudantes.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Valores;
