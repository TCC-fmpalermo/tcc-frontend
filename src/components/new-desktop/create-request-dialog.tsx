import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createDesktopRequest } from "@/data/desktop-requests";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";

const requestSchema = z.object({
    objective: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
});

type RequestFormData = z.infer<typeof requestSchema>;

export function CreateRequestDialog({ desktopOptionId }: { desktopOptionId: number }) {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RequestFormData>({
        resolver: zodResolver(requestSchema),
    });

    const onSubmit = async (data: RequestFormData) => {
        try {
            await createDesktopRequest({ objective: data.objective, desktopOptionId });
            setOpen(false);
            toast.success('Solicitação enviada com sucesso!');
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao enviar solicitação", {
                    description: error.message,
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            toast.dismiss()
                        }
                    }
                })
            } else {
                toast.error("Erro inesperado", {
                    description: "Algo deu errado. Tente novamente.",
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            toast.dismiss()
                        }
                    }
                })
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Solicitar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Informações da Solicitação</DialogTitle>
                    <DialogDescription>Descreva o objetivo para utilização desse desktop.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                        <Label htmlFor="purpose">Motivo</Label>
                        <Textarea
                            id="goal"
                            placeholder="Descreva o motivo..."
                            {...register("objective")}
                        />
                        {errors.objective && (
                            <p className="text-red-500 text-sm">{errors.objective.message}</p>
                        )}
                    </div>
                    <DialogFooter className="col-span-2">
                        <Button type="submit">Enviar Solicitação</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
