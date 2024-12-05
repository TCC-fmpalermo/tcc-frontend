import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { MonitorDown } from "lucide-react";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";
import { updateDesktopStatus } from "@/data/desktops";

export function DisableDesktopDialog({ desktopId, onDisable }: { desktopId: number, onDisable: () => void }) {

    const onSubmit = async () => {
        try {
            await updateDesktopStatus(desktopId, 'Inativo');
            toast.success('Instância desativada com sucesso!');
            onDisable();
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao desativar instância", {
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
                    <MonitorDown className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Desativar Instância</DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">
                    Você tem certeza que deseja desativar esta instância?
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => document.dispatchEvent(new Event('dialog-close'))}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        Desativar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}