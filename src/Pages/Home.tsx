import CardAjudante from "@/components/CardAjudante";
import Valores from "@/components/Valores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useServicoAjudante from "@/hooks/useServicoAjudante";

const Home = () => {

  const { ajudantes } = useServicoAjudante();

  return (
    <main className="w-3/4 mx-auto">
      <Valores></Valores>
      <section className="my-6 flex gap-4 justify-center">
        <div className="flex gap-4">
          <Button className="w-[100px]">Ajudantes</Button>
          <Button className="w-[100px]">Servicos</Button>
        </div>
        <Input placeholder="Busque um ajudante"/>
      </section>
      <section className="mb-4">
        <ul className="space-y-4">
          {ajudantes.map(ajudante => (
            <li key={ajudante.id}>
              <CardAjudante ajudante={ajudante}/>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
