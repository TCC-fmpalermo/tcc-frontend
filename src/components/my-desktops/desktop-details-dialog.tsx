import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { EditDesktopAliasDialog } from "./edit-desktop-alias-dialog";
import { GetUserCloudResourcesData } from "@/interfaces/cloud-resources";

export function DesktopDetailsDialog({ details, onAliasUpdated }: { details: GetUserCloudResourcesData, onAliasUpdated: () => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" variant={"secondary"}>
                    <Info className="mr-2 h-4 w-4" />
                    Detalhes
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{details.alias}</DialogTitle>
                    <DialogDescription>Informações sobre o desktop</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Sistema Operacional:</span>
                        <span>{details.volume.imageInfo.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">CPUs:</span>
                        <span>{details.instance.cpus}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Memória RAM:</span>
                        <span>{details.instance.ram}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Armazenamento:</span>
                        <span>{details.volume.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Status:</span>
                        <span className={`font-medium ${details.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                            {details.status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Data de Criação:</span>
                        <span>{details.createdAt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Última Atualização:</span>
                        <span>{details.updatedAt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Último Acesso:</span>
                        <span>{details.lastAccessedAt}</span>
                    </div>
                </div>
                <DialogFooter>
                    <EditDesktopAliasDialog cloudResourceId={details.id} alias={details.alias} onAliasUpdated={() => onAliasUpdated()} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}