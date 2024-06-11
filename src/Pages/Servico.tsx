import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, PencilIcon, TrashIcon } from "lucide-react";
import CardAjudante from "../components/CardAjudante";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { useNavigate, useParams } from "react-router-dom";

const Servico = () => {
  const { ajudantes, servicos } = useServicoAjudante();
  const { id } = useParams();

  const navigate = useNavigate();

  const servico = servicos.find((servico) => {
    if (id) return servico.id == parseInt(id);
  });

  return (
    <main className="w-3/4 mx-auto">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight mb-2">
            {servico?.rua}
          </h1>
          <div className="ml-0 text-zinc-500 flex gap-4">
            <span>{servico?.bairro}</span>
            <div className="flex gap-1 items-center">
              <Calendar size={20} className="text-zinc-600" />
              <span>{servico?.data}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/cadastro/servico/${servico?.id}`)} className=" bg-blue-600 w-[50px] hover:bg-blue-700">
            <PencilIcon />
          </Button>
          <Button variant={"destructive"} className="w-[50px]">
            <TrashIcon />
          </Button>
        </div>
      </section>
      <section className="flex items-center gap-2 mt-8">
        <DollarSign className="text-emerald-600" size={30} />
        <span className="text-2xl font-medium">
          {servico?.valor.toFixed(2).replace(".", ",")}
        </span>
      </section>
      <section className="mt-10 w-full">
        <ul className="space-y-4">
          {servico?.ajudantes.map((ajudante) => (
            <li key={ajudante.id}>
              <CardAjudante
                ajudante={
                  ajudantes.find(
                    (ajudanteEncontrado) =>
                      ajudanteEncontrado.id == ajudante.ajudante.id
                  )!
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Servico;
