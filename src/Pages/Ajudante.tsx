import CardServico from "@/components/CardServico";
import { Button } from "@/components/ui/button";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { Calendar, PencilIcon, Phone, TrashIcon } from "lucide-react";
import { useParams } from "react-router-dom";

const Ajudante = () => {

  const { ajudantes } = useServicoAjudante();
  const { id } = useParams();

  const ajudante = ajudantes.find(ajudante => {
    if(id)
      return ajudante.id == parseInt(id);
  });

  return (
    <main className="w-3/4 mx-auto pb-6">
      <section className="flex items-center">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="Ajudante"
          className="h-44 w-44 mr-5"
        />
        <div>
          <h3 className="text-4xl font-semibold tracking-tight">{ajudante?.apelido}</h3>
          <p className="ml-0 text-x text-zinc-500">{ajudante?.nome}</p>
          <div className="flex gap-4 mt-2">
            <div className="flex gap-2 items-center">
              <Phone size={20} className="text-zinc-600"/>
              <span className="ml-0 text-x text-zinc-500">{ajudante?.telefone}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar size={20} className="text-zinc-600"/>    
              <span className="ml-0 text-x text-zinc-500">{ajudante?.dataNascimento}</span>
            </div>
          </div>
        </div>
        <div className="flex ml-auto gap-2 mr-8">
          <Button className="w-[50px]">
            <PencilIcon />
          </Button>
          <Button variant={"destructive"} className="w-[50px]">
            <TrashIcon />
          </Button>
        </div>
      </section>
      <section className="mt-14 w-full">
        <ul className="space-y-4">
          {
            ajudante?.servicos.map(servico => (
              <li key={servico.id}>
                <CardServico servico={servico.servico}/>
              </li>
            ))
          }
        </ul>
      </section>
    </main>
  );
};

export default Ajudante;
