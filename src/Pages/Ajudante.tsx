import CardServico from "@/components/CardServico";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { PencilIcon, TrashIcon } from "lucide-react";

const Ajudante = () => {
  return (
    <main className="w-3/4 mx-auto pb-6">
      <section className="ml-4 flex items-center">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="Ajudante"
          className="h-44 w-44 mr-5"
        />
        <div className="ml-4 ">
          <CardTitle className="text-4xl mb-2">Negueba</CardTitle>
          <span className="ml-0 text-x text-zinc-500">Edgar Bivara</span>
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
      <section className="mt-14 space-y-4 w-full">
        <CardServico />
        <CardServico />
        <CardServico />
        <CardServico />
      </section>
    </main>
  );
};

export default Ajudante;
