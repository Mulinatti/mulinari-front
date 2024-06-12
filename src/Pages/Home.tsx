import CardAjudante from "@/components/CardAjudante";
import CardServico from "@/components/CardServico";
import Valores from "@/components/Valores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { useState } from "react";

const Home = () => {
  const { ajudantes, servicos } = useServicoAjudante();

  const [mostrarServicoOuAjudante, setMostrarServicoOuAjudante] =
    useState(true);
  const [search, setSearch] = useState<string>("");

  const ajudantesFiltro =
    search.length > 0
      ? ajudantes.filter((ajudante) => ajudante.apelido.toLowerCase().includes(search.toLowerCase()))
      : ajudantes;

  const servicosFiltro =
    search.length > 0
      ? servicos.filter((servico) => servico.rua.toLowerCase().includes(search.toLowerCase()))
      : servicos;

  return (
    <main className="w-3/4 mx-auto">
      <Valores></Valores>
      <section className="my-6 flex gap-4 justify-center">
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setMostrarServicoOuAjudante(true);
              setSearch("");
            }}
            className="w-[100px]"
          >
            Ajudantes
          </Button>
          <Button
            onClick={() => {
              setMostrarServicoOuAjudante(false);
              setSearch("");
            }}
            className="w-[100px]"
          >
            Servicos
          </Button>
        </div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={mostrarServicoOuAjudante ? search : ""}
          className={`${!mostrarServicoOuAjudante && "hidden"}`}
          placeholder="Busque um ajudante"
        />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={!mostrarServicoOuAjudante ? search : ""}
          className={`${mostrarServicoOuAjudante && "hidden"}`}
          placeholder="Busque um servico"
        />
      </section>
      <section className="mb-4">
        {mostrarServicoOuAjudante ? (
          <ul className="space-y-4">
            {ajudantesFiltro.map((ajudante) => (
              <li key={ajudante.id}>
                <CardAjudante ajudante={ajudante} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {servicosFiltro.map((servico) => (
              <li key={servico.id}>
                <CardServico servico={servico} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Home;
