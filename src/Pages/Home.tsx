import CardAjudante from "@/components/CardAjudante";
import ServiçoDetalhado from "@/components/ServiçoDetalhado";
import Valores from "@/components/Valores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
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
      <section className=" *:mb-4">
        <CardAjudante />
        
        <CardAjudante />
        <CardAjudante />
        <CardAjudante />
        <CardAjudante />
        <CardAjudante />
        <CardAjudante />
      </section>
    </main>
  );
};

export default Home;
