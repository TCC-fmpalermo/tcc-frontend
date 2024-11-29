import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateCloudResource } from "@/data/cloud-resources";

const editAliasSchema = z.object({
    alias: z.string().min(1, "O apelido é obrigatório"),
});

type EditAliasFormValues = z.infer<typeof editAliasSchema>;

export function EditDesktopAliasDialog({ cloudResourceId, alias, onAliasUpdated }: { cloudResourceId: number, alias: string; onAliasUpdated: () => void }) {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditAliasFormValues>({
        defaultValues: { alias },
        resolver: zodResolver(editAliasSchema),
    });

    const onSubmit = async (data: EditAliasFormValues) => {
        try {
            await updateCloudResource(cloudResourceId, data);
            onAliasUpdated();
            toast.success("Apelido atualizado com sucesso!");
            setOpen(false);
        } catch (error) {
            toast.error("Erro ao atualizar o apelido.");
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >
                    <Edit className="h-5 w-5" />
                    Editar Apelido
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Apelido</DialogTitle>
                    <DialogDescription>
                        Atualize o apelido do desktop abaixo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="alias">Apelido</Label>
                        <Input
                            type="text"
                            id="alias"
                            {...register("alias")}
                        />
                        {errors.alias && (
                            <p className="text-red-500 text-sm">{errors.alias.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
