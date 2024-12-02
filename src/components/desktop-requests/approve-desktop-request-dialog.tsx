import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { updateStatusDesktopRequest } from "@/data/desktop-requests";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";

export function ApproveDesktopRequestDialog({ desktopRequestId, onApprove }: { desktopRequestId: number, onApprove: () => void }) {

    const onSubmit = async () => {
        try {
            await updateStatusDesktopRequest(desktopRequestId, 'Aprovado');
            toast.success('Solicitação aprovada com sucesso!');
            onApprove();
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao aprovar solicitação", {
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
                <Check className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Aprovação</DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">
                    Você tem certeza que deseja aprovar esta solicitação?
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => document.dispatchEvent(new Event('dialog-close'))}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        Aprovar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}