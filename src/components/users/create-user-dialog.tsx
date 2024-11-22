import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useHasPermission } from "@/contexts/permission-context";
import { getRoles } from "@/data/roles";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/data/users";
import { useState } from "react";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";

const createUserSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
    role: z.string().min(1, "Cargo é obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export function CreateUserDialog({ onUserCreated }: { onUserCreated: () => void }) {
    const canCreateUser = useHasPermission('CREATE_USER');

    const [open, setOpen] = useState(false);
    
    const { data: roles } = useQuery({
        queryFn: getRoles,
        queryKey: ['get-roles'],
        enabled: canCreateUser,
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
    });

    const onSubmit = async (data: CreateUserFormValues) => {
        try {
            await createUser(data);
            onUserCreated();
            toast.success("Usuário criado com sucesso");
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao criar usuário", {
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
                <Button disabled={!canCreateUser}>
                    <Plus className="h-4 w-4" />
                    Criar Usuário
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Usuário</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um novo usuário
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                            type="text"
                            id="firstName"
                            placeholder="Nome"
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
                            placeholder="Sobrenome"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="E-mail"
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Select
                            onValueChange={(value) => setValue("role", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles?.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                        {role.alias}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-red-500 text-sm">{errors.role.message}</p>
                        )}
                    </div>
                    <DialogFooter className="col-span-2">
                        <Button type="submit">Criar Usuário</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
