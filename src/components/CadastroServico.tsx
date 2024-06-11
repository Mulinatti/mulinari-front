import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "./ui/multi-select";
import useServicoAjudante from "@/hooks/useServicoAjudante";
import http from "@/api/connection";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const formSchema = z.object({
  rua: z.string().min(1, {
    message: "Rua não pode estar vazio",
  }),
  bairro: z.string().min(1, {
    message: "Bairro não pode estar vazio",
  }),
  valor: z.coerce.number({
    invalid_type_error: "Digite apenas números",
  }).gte(1, {
    message: "Digite um valor válido"
  }),
  data: z.date({message: "Escolha uma data"}),
  ajudantesIds: z.array(z.string()).nonempty({message: "Escolha pelo menos um ajudante"}),
});

const CadastroServico = () => {
  const { ajudantes } = useServicoAjudante();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rua: "",
      bairro: "",
      valor: 0,
      data: undefined,
      ajudantesIds: [],
    },
  });

  const cadastrarServico = (servico: z.infer<typeof formSchema>) => {
    const servicoFixed = {
      ...servico,
      data: servico.data.toLocaleDateString("pt-BR"),
      ajudantesIds: ajudantes.filter((ajudante) => {
        return servico.ajudantesIds.find(
          (value) => value == ajudante.apelido
        );
      }).map(ajudante => ajudante.id),
    };

    http.post("/servicos", servicoFixed)
      .then(() => toast.success("Serviço cadastrado!"))
      .catch(() => toast.error("Ocorreu um erro!")) 
  };

  return (
    <main className="w-2/4 mx-auto space-y-6">
      <Link to={"/cadastro/ajudante"} className="text-primary hover:underline">Ir para cadastro de ajudante {"->"} </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(cadastrarServico)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do serviço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ajudantesIds"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ajudantes</FormLabel>
                <MultiSelector
                  onValuesChange={field.onChange}
                  values={field.value}
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Selecione os ajudantes" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {ajudantes.map((ajudante) => (
                        <MultiSelectorItem
                          key={ajudante.id}
                          value={ajudante.apelido}
                        >
                          {ajudante.apelido}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
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
                      captionLayout="buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Form>
    </main>
  );
};

export default CadastroServico;
