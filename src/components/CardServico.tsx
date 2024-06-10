import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, User } from "lucide-react";

const CardServico = () => {
  return (
    <Card className="ml-1 flex justify-between items-center p-8 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer ">
      <CardHeader className="ml-4 p-0">
        <CardTitle>Rua das Laranjeiras</CardTitle>
        <div className="items-center gap-1 flex mt-2">
          <span className="text-x text-gray-500 font-italic">Laranjeiras</span>
          <p className="text sm ml-0 text-gray-400 italic">- 02/10/2023</p>
        </div>
      </CardHeader>
      <CardContent className="flex gap-10 items-center p-0 mr-4">
        <div className="flex gap-2 items-center">
          <User size={30} className="text-zinc-500/90"></User>
          <span className="text-xl font-semibold">2</span>
        </div>
        <div className="flex gap-2 items-center">
          <DollarSign size={25} className="text-emerald-600" />
          <span className="text-xl font-semibold">180,00</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardServico;
