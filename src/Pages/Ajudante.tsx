import http from "@/api/connection";
import CardServico from "@/components/CardServico";
import DeletarDialog from "@/components/DeletarDialog";
import { Button } from "@/components/ui/button";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { Calendar, PencilIcon, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Ajudante = () => {

  const { ajudantePorId, buscarDados } = useServicoAjudante();
  const { id } = useParams();

  const ajudante = ajudantePorId(id);

  const navigate = useNavigate();

  const deletarAjudante = () => {
    http.delete(`ajudantes/${id}`)
      .then(() => {
        toast.success("Ajudante deletado!");
        buscarDados();
        navigate(-1);
      })
      .catch(() => toast.error("Ocorreu um erro ao deletar!"))
  }

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
          <Button onClick={() => navigate(`/cadastro/ajudante/${id}`)} className="w-[50px]">
            <PencilIcon />
          </Button>
          <DeletarDialog action={deletarAjudante} titulo={`Tem certeza que deseja excluir ${ajudante?.apelido} ?`}/>
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
