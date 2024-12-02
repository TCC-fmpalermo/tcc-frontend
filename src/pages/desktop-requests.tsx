import { ApproveDesktopRequestDialog } from "@/components/desktop-requests/approve-desktop-request-dialog";
import { DesktopRequestDetailsDialog } from "@/components/desktop-requests/desktop-request-details-dialog";
import { RefuseDesktopRequestDialog } from "@/components/desktop-requests/refuse-desktop-request-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDesktopRequests } from "@/data/desktop-requests"
import { useQuery } from "@tanstack/react-query"

export function DesktopRequests() {
    const { data: desktopRequests, refetch } = useQuery({
        queryFn: () => getDesktopRequests({}),
        queryKey: ['get-desktop-requests'],
    });
    return (
      <div className="ml-64 p-4">
          <h1 className="text-2xl font-bold">Solicitações de Desktop</h1>
          <hr className="border-muted/70 my-4" />
          <div className="px-8">
            <div className="mt-4 border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Sistema Operacional</TableHead>
                        <TableHead>Flavor</TableHead>
                        <TableHead>CPUs</TableHead>
                        <TableHead>RAM</TableHead>
                        <TableHead>Tamanho</TableHead>
                
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableHeader>
                    <TableBody>
                        {desktopRequests?.map((desktopRequest) => (
                            <TableRow key={desktopRequest.id}>
                                <TableCell>{desktopRequest.id}</TableCell>
                                <TableCell>{desktopRequest.user.firstName + ' ' + desktopRequest.user.lastName}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.imageInfo.name}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.name}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.vcpus}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.flavorSpecs.ram}</TableCell>
                                <TableCell>{desktopRequest.desktopOption.size}</TableCell>
                                <TableCell
                                className={desktopRequest.status === 'Aprovado' ? 'text-green-600' : 
                                    desktopRequest.status === 'Pendente' ? 'text-yellow-600' : 'text-red-600'}
                                >{desktopRequest.status}</TableCell> 
                                <TableCell>
                                    <div className="flex items-center gap-0.5">
                                        <DesktopRequestDetailsDialog details={desktopRequest} />
                                        {desktopRequest.status === 'Pendente' && (
                                            <>
                                                <ApproveDesktopRequestDialog 
                                                    desktopRequestId={desktopRequest.id}
                                                    onApprove={() => refetch()} 
                                                />
                                                <RefuseDesktopRequestDialog 
                                                    desktopRequestId={desktopRequest.id}
                                                    onRefuse={() => refetch()} 
                                                />
                                            </>
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