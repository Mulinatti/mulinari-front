import CardServiço from "@/components/CardServiço";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { PencilIcon, TrashIcon } from "lucide-react";
import CardAjudante from "./CardAjudante";

const ServiçoDetalhado = () => {
  return (
    <main className="w-3/4 mx-auto">
      <section className=" ml-4 flex items-center ">
       
        <div className="ml-4 ">
          <CardTitle className="text-5xl mb-2">Rua dos Bobos</CardTitle>

          <span className="ml-0 text-x text-zinc-500 italic">Pinto Grande - 10/02/2023 </span>
        </div>
        <div className="flex ml-auto gap-2 mr-8">
          <Button className=" bg-blue-600 w-[50px] hover:bg-blue-700">
            <PencilIcon />
          </Button>
          <Button variant={"destructive"} className="w-[50px]">
            <TrashIcon />
          </Button>
        </div>
      </section>
      <section className="mt-14 space-y-4 w-full">
        <CardAjudante />
        <CardAjudante />
        <CardAjudante/>
      </section>
    </main>
  );
};

export default ServiçoDetalhado;
