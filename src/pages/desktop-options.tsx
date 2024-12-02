import { CreateDesktopOptionDialog } from "@/components/desktop-options/create-desktop-option-dialog";
import { EditDesktopOptionDialog } from "@/components/desktop-options/edit-desktop-option-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDesktopOptions } from "@/data/desktop-options";
import { useQuery } from "@tanstack/react-query";

export function DesktopOptions() {
    const { data: desktopOptions, refetch } = useQuery({
        queryFn: () => getDesktopOptions({}),
        queryKey: ['get-desktop-options'],
    })
    return (
      <div className="ml-64 p-4">
          <h1 className="text-2xl font-bold">Gerenciar Opções de Desktop</h1>
          <hr className="border-muted/70 my-4" />
          <div className="px-8">
            <div className="flex justify-end">
                <CreateDesktopOptionDialog onOptionCreated={refetch}/>
            </div>
            <div className="mt-4 border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome da Imagem</TableHead>
                        <TableHead>Usuário Padrão da Imagem</TableHead>
                        <TableHead>Flavor</TableHead>
                        <TableHead>CPUs</TableHead>
                        <TableHead>RAM</TableHead>
                        <TableHead>Tamanho</TableHead>
                        <TableHead>Aprovação Automática</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableHeader>
                    <TableBody>
                        {desktopOptions?.map((desktopOption) => (
                            <TableRow key={desktopOption.id}>
                                <TableCell>{desktopOption.id}</TableCell>
                                <TableCell>{desktopOption.imageInfo.name}</TableCell>
                                <TableCell>{desktopOption.defaultUsername}</TableCell>
                                <TableCell>{desktopOption.flavorSpecs.name}</TableCell>
                                <TableCell>{desktopOption.flavorSpecs.vcpus}</TableCell>
                                <TableCell>{desktopOption.flavorSpecs.ram}</TableCell>
                                <TableCell>{desktopOption.size}</TableCell>
                                <TableCell>{desktopOption.autoApproved ? 'Sim' : 'Não'}</TableCell>
                                <TableCell>{desktopOption.status}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <EditDesktopOptionDialog 
                                            desktopOptionId={desktopOption.id} 
                                            option={
                                                {
                                                    openstackImageId: desktopOption.imageInfo.id,
                                                    openstackFlavorId: desktopOption.flavorSpecs.id,
                                                    size: +desktopOption.size.split(' ')[0],
                                                    autoApproved: desktopOption.autoApproved,
                                                    description: desktopOption.description,
                                                    status: desktopOption.status,
                                                    defaultUsername: desktopOption.defaultUsername
                                                }
                                            } 
                                            onOptionUpdated={refetch}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
      </div>
    )
}