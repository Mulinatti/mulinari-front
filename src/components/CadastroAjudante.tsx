import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import http from "@/api/connection";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import { useEffect } from "react";

const formSchema = z.object({
  nome: z.string().min(1, {
    message: "Nome não pode estar vazio",
  }),
  apelido: z.string().max(20, {
    message: "Apelido muito grande",
  }),
  motorista: z.boolean().default(false).optional(),
  dataNascimento: z.date(),
  telefone: z.string().min(1, {
    message: "Telefone não pode estar vazio",
  }),
});

const CadastroAjudante = () => {
  const { servicos, buscarDados, ajudantePorId } = useServicoAjudante();

  const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      apelido: "",
      motorista: false,
      dataNascimento: undefined,
      telefone: "",
    },
  });

  useEffect(() => {
    if (id) {
      const ajudante = ajudantePorId(id);

      if (ajudante)
        form.reset({
          nome: ajudante.nome,
          apelido: ajudante.apelido,
          motorista: ajudante.motorista,
          dataNascimento: parse(
            ajudante.dataNascimento,
            "dd/MM/yyyy",
            new Date()
          ),
          telefone: ajudante.telefone,
        });
    }
  }, [id, servicos]);

  const cadastrarAjudante = (ajudante: z.infer<typeof formSchema>) => {
    const ajudanteFixed = {
      ...ajudante,
      dataNascimento: ajudante.dataNascimento.toLocaleDateString("pt-BR"),
    };

    if (id) {
      http
        .put(`/ajudantes/${id}`, ajudanteFixed)
        .then(() => {
          toast.success("Ajudante atualizado!");
          buscarDados();
          form.reset();
        })
        .catch(() => toast.error("Ocorreu um erro!"));
    } else {
      http
        .post("/ajudantes", ajudanteFixed)
        .then(() => {
          toast.success("Ajudante cadastrado!");
          buscarDados();
          form.reset();
        })
        .catch(() => toast.error("Ocorreu um erro!"));
    }
  };

  return (
    <main className="w-2/4 mx-auto space-y-6">
      <Link to={"/cadastro/servico"} className="text-primary hover:underline">
        Ir para cadastro de serviço {"->"}
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(cadastrarAjudante)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apelido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apelido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={11} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal
                          ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1950}
                        toYear={new Date().getFullYear()}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motorista"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 mt-4">
                  <FormLabel className="mt-2">Motorista</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <Button type="submit">{id ? "Atualizar" : "Cadastrar"}</Button>
        </form>
      </Form>
    </main>
  );
};

export default CadastroAjudante;
