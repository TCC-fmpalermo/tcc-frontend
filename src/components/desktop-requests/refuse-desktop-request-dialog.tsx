import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { updateStatusDesktopRequest } from "@/data/desktop-requests";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";

export function RefuseDesktopRequestDialog({ desktopRequestId, onRefuse }: { desktopRequestId: number, onRefuse: () => void }) {

    const onSubmit = async () => {
        try {
            await updateStatusDesktopRequest(desktopRequestId, 'Recusado');
            toast.success('Solicitação recusada com sucesso!');
            onRefuse();
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao recusar solicitação", {
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <X className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Recusa</DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">
                    Você tem certeza que deseja recusar esta solicitação?
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => document.dispatchEvent(new Event('dialog-close'))}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        Recusar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}