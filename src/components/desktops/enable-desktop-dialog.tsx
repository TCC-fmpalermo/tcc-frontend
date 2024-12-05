import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { MonitorUp } from "lucide-react";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";
import { updateDesktopStatus } from "@/data/desktops";

export function EnableDesktopDialog({ desktopId, onEnable }: { desktopId: number, onEnable: () => void }) {

    const onSubmit = async () => {
        try {
            await updateDesktopStatus(desktopId, 'Ativo');
            toast.success('Instância ativada com sucesso!');
            onEnable();
        } catch (error) {
            if(isAPIError(error)) {
                toast.error("Erro ao ativar instância", {
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
                    <MonitorUp className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ativar Instância</DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">
                    Você tem certeza que deseja ativar esta instância?
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => document.dispatchEvent(new Event('dialog-close'))}>
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit}>
                        Ativar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}