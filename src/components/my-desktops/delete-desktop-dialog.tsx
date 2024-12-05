import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";
import { deleteDesktop } from "@/data/desktops";
import { useState } from "react";

export function DeleteDesktopDialog({ desktopId, onDelete }: { desktopId: number, onDelete: () => void }) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const onOpenModal = () => {
        if(disabled && open) {
            return;
        }

        setOpen(!open);
    }

    const onSubmit = async () => {
        try {
            setDisabled(true);
            await deleteDesktop(desktopId);
            setDisabled(false);
            toast.success('Desktop deletado com sucesso!');
            onDelete();
        } catch (error) {
            setDisabled(false);
            if(isAPIError(error)) {
                toast.error("Erro ao deletar desktop", {
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
    }
    return (
        <Dialog open={open} onOpenChange={onOpenModal}>
            <DialogTrigger asChild>
                <Button
                    className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                    variant={"ghost"}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deletar Desktop</DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">
                    Você tem certeza que deseja desativar este desktop?
                </div>
                <DialogFooter>
                    <Button variant="ghost" disabled={disabled} onClick={() => document.dispatchEvent(new Event('dialog-close'))}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit} disabled={disabled}>
                        Deletar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}