import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReceiptText } from "lucide-react";
import { GetDesktopRequestData } from "@/interfaces/desktop-requests";

export function DesktopRequestDetailsDialog({ details }: { details: GetDesktopRequestData }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" variant="ghost">
                    <ReceiptText className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{details.id} - Solicitação de Desktop</DialogTitle>
                    <DialogDescription>Informações sobre a solicitação de desktop</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">ID do Usuário:</span>
                        <span>{details.user.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Nome:</span>
                        <span>{details.user.firstName + " " + details.user.lastName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Objetivo:</span>
                        <span className="break-words whitespace-normal">{details.objective}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Sistema Operacional:</span>
                        <span>{details.desktopOption.imageInfo.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Flavor:</span>
                        <span>{details.desktopOption.flavorSpecs.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">CPUs:</span>
                        <span>{details.desktopOption.flavorSpecs.vcpus}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Memória RAM:</span>
                        <span>{details.desktopOption.flavorSpecs.ram}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Armazenamento:</span>
                        <span>{details.desktopOption.size}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Status:</span>
                        <span className={`font-medium ${
                            details.status === "Aprovado" ? "text-green-500" : details.status === "Pendente" ? "text-yellow-500" : "text-red-500"}`}>
                            {details.status}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Data de Solicitação:</span>
                        <span>{details.requestedAt}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <span className="font-semibold">Data de Conclusão:</span>
                        <span>{details.finishedAt}</span>
                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
