import { DesktopDetailsDialog } from "@/components/desktops/desktop-details-dialog"
import { DisableDesktopDialog } from "@/components/desktops/disable-desktop-dialog"
import { EnableDesktopDialog } from "@/components/desktops/enable-desktop-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDesktops } from "@/data/desktops"
import { useQuery } from "@tanstack/react-query"

export function Desktops() {
  const { data: desktops, refetch } = useQuery({
    queryFn: () => getDesktops(),
    queryKey: ['get-desktops'],
  })

    return (
      <div className="ml-64 p-4">
        <h1 className="text-2xl font-bold">Gerenciar Desktops</h1>
        <hr className="border-muted/70 my-4" />
          <div className="px-8">
            <div className="mt-4 border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Apelido</TableHead>
                        <TableHead>Nome da Instância</TableHead>
                        <TableHead>Endereço IP</TableHead>
                        <TableHead>Sistema Operacional</TableHead>
                        <TableHead>Flavor</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableHeader>
                    <TableBody>
                        {desktops?.map((desktop) => (
                            <TableRow key={desktop.id}>
                                <TableCell>{desktop.id}</TableCell>
                                <TableCell>{desktop.alias}</TableCell>
                                <TableCell>{desktop.instance.name}</TableCell>
                                <TableCell>{desktop.instance.ipAddress}</TableCell>
                                <TableCell>{desktop.volume.imageInfo.name}</TableCell>
                                <TableCell>{desktop.instance.flavorSpecs.name}</TableCell>
                                <TableCell>{desktop.volume.size}</TableCell>
                                <TableCell
                                    className={desktop.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}
                                >{desktop.status}</TableCell> 
                                <TableCell>
                                    <div className="flex items-center gap-0.5">
                                        <DesktopDetailsDialog details={desktop} />
                                        {desktop.status === 'Ativo' && (
                                            <DisableDesktopDialog desktopId={desktop.id} onDisable={refetch} />
                                        )}
                                        {desktop.status === 'Inativo' && (
                                            <EnableDesktopDialog desktopId={desktop.id} onEnable={refetch} />
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