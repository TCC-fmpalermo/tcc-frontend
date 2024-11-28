import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Button } from "../ui/button";
import { MonitorUp } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const desktopSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    alias: z.string().min(1, 'Apelido é obrigatório'),
});

type DesktopFormData = z.infer<typeof desktopSchema>;
  
export function CreateDesktopDialog() {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DesktopFormData>({
        resolver: zodResolver(desktopSchema),
    });

    const onSubmit = (data: DesktopFormData) => {
        console.log('Dados da Instância:', data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <MonitorUp className="mr-2 h-4 w-4" />
                    Selecionar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Informações do Desktop</DialogTitle>
                <DialogDescription>Preencha o nome e apelido da instância.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Nome"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                        <Label htmlFor="alias">Apelido</Label>
                        <Input
                            type="text"
                            id="alias"
                            placeholder="Nome"
                            {...register("alias")}
                        />
                        {errors.alias && (
                            <p className="text-red-500 text-sm">{errors.alias.message}</p>
                        )}
                    </div>
                    <DialogFooter className="col-span-2">
                        <Button type="submit">Criar Desktop</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}