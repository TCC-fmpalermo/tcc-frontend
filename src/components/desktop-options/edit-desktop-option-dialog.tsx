import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { updateDesktopOption, getFlavorOptions, getImageOptions } from "@/data/desktop-options";
import { isAPIError } from "@/interfaces/errors";
import { Edit } from "lucide-react";

const editDesktopOptionSchema = z.object({
    openstackImageId: z.string().min(1, "A imagem é obrigatória"),
    openstackFlavorId: z.string().min(1, "O flavor é obrigatório"),
    size: z.number().min(1, "O tamanho do volume deve ser maior que 0"),
    autoApproved: z.boolean(),
    description: z.string().optional(),
});

type EditDesktopOptionFormValues = z.infer<typeof editDesktopOptionSchema>;

export function EditDesktopOptionDialog({ desktopOptionId, option, onOptionUpdated }: { desktopOptionId: number; option: EditDesktopOptionFormValues; onOptionUpdated: () => void }) {
    const [open, setOpen] = useState(false);

    const { data: imageOptions } = useQuery({
        queryKey: ["image-options"], 
        queryFn: getImageOptions,
    });

    const { data: flavorOptions } = useQuery({
        queryKey: ["flavor-options"], 
        queryFn: getFlavorOptions,
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditDesktopOptionFormValues>({
        defaultValues: option,
        resolver: zodResolver(editDesktopOptionSchema),
    });

    const onSubmit = async (data: EditDesktopOptionFormValues) => {
        try {
            await updateDesktopOption(desktopOptionId, data);
            onOptionUpdated();
            toast.success("Opção de desktop atualizada com sucesso!");
            setOpen(false);
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Erro ao atualizar opção de desktop", {
                    description: error.message,
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
                });
            } else {
                console.error("Erro inesperado", error);
                toast.error("Erro inesperado", {
                    description: "Algo deu errado. Tente novamente.",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
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
                    <DialogTitle>Editar Opção de Desktop</DialogTitle>
                    <DialogDescription>
                        Atualize os campos abaixo para editar a opção de desktop
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="image">Imagem</Label>
                        <Select
                            onValueChange={(value) => setValue("openstackImageId", value)}
                            defaultValue={option.openstackImageId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma imagem" />
                            </SelectTrigger>
                            <SelectContent>
                                {imageOptions?.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.name} - {option.size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.openstackImageId && (
                            <p className="text-red-500 text-sm">{errors.openstackImageId.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="flavor">Flavor</Label>
                        <Select
                            onValueChange={(value) => setValue("openstackFlavorId", value)}
                            defaultValue={option.openstackFlavorId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um flavor" />
                            </SelectTrigger>
                            <SelectContent>
                                {flavorOptions?.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.name} - {option.vcpus} vCPUs, {option.ram} RAM
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.openstackFlavorId && (
                            <p className="text-red-500 text-sm">{errors.openstackFlavorId.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="size">Tamanho do Volume</Label>
                        <Input
                            type="number"
                            id="size"
                            placeholder="Tamanho do volume (GB)"
                            {...register("size", { valueAsNumber: true })}
                        />
                        {errors.size && (
                            <p className="text-red-500 text-sm">{errors.size.message}</p>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="autoApproved">Aprovação Automática</Label>
                        <Select
                            onValueChange={(value) => setValue("autoApproved", value === "true")}
                            defaultValue={String(option.autoApproved)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Sim</SelectItem>
                                <SelectItem value="false">Não</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="description">Descrição (Opcional)</Label>
                        <Input
                            type="text"
                            id="description"
                            placeholder="Descrição"
                            {...register("description")}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
