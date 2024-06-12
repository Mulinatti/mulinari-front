import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

interface DeletarDialogProps {
  titulo: string;
  action: () => void;
}

const DeletarDialog = ({titulo, action}: DeletarDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-[50px]">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>
            {titulo}
          </DialogTitle>
          <DialogDescription>
            Não é possível reverter essa ação
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={action} variant={"destructive"}>
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletarDialog;
