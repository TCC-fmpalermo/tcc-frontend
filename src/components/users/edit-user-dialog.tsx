import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/data/roles";
import { Edit } from "lucide-react";
import { useState } from "react";
import { getUserStatusOptions, updateUser } from "@/data/users";
import { isAPIError } from "@/interfaces/errors";

const editUserSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    role: z.string().min(1, "Cargo é obrigatório"),
    status: z.string().min(1, "Status é obrigatório"),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export function EditUserDialog({ user, onUserUpdated }: { user: any; onUserUpdated: () => void }) {
    const [open, setOpen] = useState(false);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditUserFormValues>({
        defaultValues: {
            ...user,
            role: user.role.value
        },
        resolver: zodResolver(editUserSchema),
    });

    const { data: roles } = useQuery({
        queryFn: getRoles,
        queryKey: ["get-roles"],
    });

    const { data: statusOptions } = useQuery({
        queryFn: getUserStatusOptions,
        queryKey: ['get-status-options'],
    });

    const onSubmit = async (data: EditUserFormValues) => {
        try {
            await updateUser(user.id, data);
            onUserUpdated();
            toast.success("Usuário atualizado com sucesso");
            setOpen(false);
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao editar usuário", {
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
                <Button variant="ghost">
                    <Edit className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Usuário</DialogTitle>
                    <DialogDescription>
                        Atualize as informações do usuário abaixo.
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
                            type="text"
                            id="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="role">Cargo</Label>
                        <Select
                            onValueChange={(value) => setValue("role", value)}
                            defaultValue={user.role.value}
                        >
                            <SelectTrigger>
                                <SelectValue />
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
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            defaultValue={user.status}
                            onValueChange={(value) => setValue("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter className="col-span-2">
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
