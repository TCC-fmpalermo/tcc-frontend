import { DeleteDesktopRequestDialog } from "@/components/desktop-requests/delete-desktop-request-dialog";
import { DesktopRequestDetailsDialog } from "@/components/desktop-requests/desktop-request-details-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context";
import { getUserDesktopRequests } from "@/data/desktop-requests"
import { useQuery } from "@tanstack/react-query"

export function MyRequests() {
    const { token } = useAuth();
    const { data: desktopRequests, refetch } = useQuery({
        queryFn: () => getUserDesktopRequests(),
        queryKey: ['get-user-desktop-requests', token],
    });
    return (
      <div className="ml-64 p-4">
          <h1 className="text-2xl font-bold">Minhas Solicitações de Desktop</h1>
          <hr className="border-muted/70 my-4" />
          <div className="px-8">
            <div className="mt-4 border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Sistema Operacional</TableHead>
                        <TableHead>Flavor</TableHead>
                        <TableHead>CPUs</TableHead>
                        <TableHead>RAM</TableHead>
                        <TableHead>Tamanho</TableHead>
                        <TableHead>Data de Solicitação</TableHead>
                        <TableHead>Data de Conclusão</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableHeader>
                    <TableBody>
                        {desktopRequests?.map((desktopRequest) => (
                            <TableRow key={desktopRequest.id}>
                                <TableCell>{desktopRequest.id}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.imageInfo.name}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.name}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.vcpus}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.ram}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.size}</TableCell>
                                <TableCell>{desktopRequest.requestedAt}</TableCell>
                                <TableCell>{desktopRequest.finishedAt}</TableCell>
                                <TableCell
                                    className={desktopRequest.status === 'Aprovado' ? 'text-green-600' : 
                                    desktopRequest.status === 'Pendente' ? 'text-yellow-600' : 'text-red-600'}
                                >{desktopRequest.status}</TableCell> 
                                <TableCell>
                                    <div className="flex items-center gap-0.5">
                                        <DesktopRequestDetailsDialog details={desktopRequest} />
                                        {desktopRequest.status === 'Pendente' && (
                                            <DeleteDesktopRequestDialog desktopRequestId={desktopRequest.id} onDelete={refetch} />
                                        )}
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