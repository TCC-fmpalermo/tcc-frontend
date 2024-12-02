import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MonitorUp } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { isAPIError } from "@/interfaces/errors";
import { Link } from "react-router-dom";
import { createCloudResource, getCloudResourceProgress } from "@/data/cloud-resources";

const desktopSchema = z.object({
    alias: z.string().min(1, 'Apelido é obrigatório'),
});

type DesktopFormData = z.infer<typeof desktopSchema>;
  
export function CreateDesktopDialog({ desktopOptionId, iconOption = false }: { desktopOptionId: number, iconOption?: boolean }) {
    const [open, setOpen] = useState(false);
    const [listenProgress, setListenProgress] = useState(false);
    const [created, setCreated] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusProgress, setStatusProgress] = useState('Aguardando processamento...');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DesktopFormData>({
        resolver: zodResolver(desktopSchema),
    });

    const onOpenModal = () => {
        if(listenProgress && open) {
            return;
        }

        setOpen(!open);
    }

    useEffect(() => {
        if(!listenProgress) return;

        let closeConnection: (() => void) | undefined;

        const fetchProgress = async () => {
            closeConnection = await getCloudResourceProgress<{ progress: number; message: string }>(
              (data) => {
                setProgress(data.progress);
                setStatusProgress(data.message);
              },
              (error) => {
                console.error("Erro no SSE:", error);
              }
            );
        };
      
        fetchProgress();
    
        return () => {
            if (closeConnection) closeConnection(); // Fechando a conexão quando o componente for desmontado
        };
    }, [listenProgress]);

    const onSubmit = async (data: DesktopFormData) => {
        try {
            setListenProgress(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await createCloudResource({
                alias: data.alias,
                desktopOptionId: desktopOptionId
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            setCreated(true);
            setListenProgress(false);
            toast.success("Desktop criado com sucesso!");
        } catch (error) {
            setProgress(0);
            setCreated(false);
            setListenProgress(false);
            setStatusProgress('');
            if(isAPIError(error)) {
                toast.error("Erro ao criar desktop", {
                    description: error.message,
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            console.log("Fechar"); 
                        }
                    }
                });
            } else {
                console.log("erro inesperado", error);
                
                toast("Erro inesperado", {
                    description: "Algo deu errado. Tente novamente.",
                    action: {
                        label: "Fechar",
                        onClick: () => {
                            console.log("Fechar"); 
                        }
                    }
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenModal}>
            <DialogTrigger asChild>
                {iconOption ? (
                    <Button variant="ghost">
                        <MonitorUp className="mr-2 h-4 w-4" />
                    </Button>
                ):(
                    <Button>
                        <MonitorUp className="mr-2 h-4 w-4" />
                        Selecionar
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent 
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}  
            >
                <DialogHeader>
                <DialogTitle>Informações do Desktop</DialogTitle>
                <DialogDescription>Preencha o nome e apelido da instância.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                        <Label htmlFor="alias">Apelido</Label>
                        <Input
                            type="text"
                            id="alias"
                            placeholder="Nome"
                            {...register("alias")}
                        />
                        {errors.alias && (
                            <p className="text-red-500 text-sm">{errors.alias.message}</p>
                        )}
                    </div>
                    {(listenProgress || created) && (    
                        <div className="grid w-full items-center gap-1.5 col-span-2">
                            <Label>Progresso</Label>
                            <Progress className="col-span-2" value={progress} />
                            <p className="text-sm">{statusProgress}</p>
                        </div>
                    )}
                    <DialogFooter className="col-span-2">
                        {!created ? (
                            <Button type="submit" disabled={listenProgress}>Criar Desktop</Button>
                        ): (
                            <Link to="/my-desktops">
                                <Button >
                                    Acessar Desktop
                                </Button>   
                            </Link>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}