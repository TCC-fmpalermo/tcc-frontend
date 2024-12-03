import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { getPersonalInformation, updatePersonalInformation } from "@/data/users";
import { isAPIError } from "@/interfaces/errors";

const editUserSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export function EditPersonalInformationDialog() {
    const { data: userData } = useQuery({
        queryFn: () => getPersonalInformation(),
        queryKey: ['get-personal-information'],
    })

    const [open, setOpen] = useState(false);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: EditUserFormValues) => {
        try {
            await updatePersonalInformation(data);
            toast.success("Informações pessoais atualizadas com sucesso");
            setOpen(false);
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao atualizar suas informações pessoais", {
                    description: error.message,
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            console.log("Fechar"); 
                        }
                    }
                });
            } else {
                console.log("erro inesperado", error);
                
                toast("Erro inesperado", {
                    description: "Algo deu errado. Tente novamente.",
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            console.log("Fechar"); 
                        }
                    }
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <a className="flex items-center gap-4 py-6 px-6 text-muted-foreground hover:text-foreground">
                    <User className="h-5 w-5" />
                    <span>Minha Conta</span>
                </a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Informações Pessoais</DialogTitle>
                    <DialogDescription>
                        Atualize suas informações abaixo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                            type="text"
                            id="firstName"
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            disabled
                            type="text"
                            id="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirmar Senha"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <DialogFooter className="col-span-2">
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
