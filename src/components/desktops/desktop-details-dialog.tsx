import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReceiptText } from "lucide-react";
import { GetDesktopsData } from "@/interfaces/desktops";

export function DesktopDetailsDialog({ details }: { details: GetDesktopsData }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" variant="ghost">
                    <ReceiptText className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{details.alias}</DialogTitle>
                    <DialogDescription>Informações sobre o desktop</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">ID:</span>
                        <span>{details.id}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Nome da Instância:</span>
                        <span>{details.instance.name}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Endereço de IP:</span>
                        <span>{details.instance.ipAddress}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Sistema Operacional:</span>
                        <span>{details.volume.imageInfo.name}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Flavor:</span>
                        <span>{details.instance.flavorSpecs.name}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">CPUs:</span>
                        <span>{details.instance.cpus}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Memória RAM:</span>
                        <span>{details.instance.ram}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Armazenamento:</span>
                        <span>{details.volume.size}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Status:</span>
                        <span className={`font-medium ${details.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                            {details.status}
                        </span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Data de Criação:</span>
                        <span>{details.createdAt}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Última Atualização:</span>
                        <span>{details.updatedAt}</span>
                    </div>
                    <hr className="border-muted/70 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Último Acesso:</span>
                        <span>{details.lastAccessedAt}</span>
                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}