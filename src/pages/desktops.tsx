import { CloudResourceDetailsDialog } from "@/components/cloud-resources/cloud-resource-details-dialog"
import { DisableCloudResourceDialog } from "@/components/cloud-resources/disable-cloud-resource-dialog"
import { EnableCloudResourceDialog } from "@/components/cloud-resources/enable-cloud-resource-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCloudResources } from "@/data/cloud-resources"
import { useQuery } from "@tanstack/react-query"

export function Desktops() {
  const { data: cloudResources, refetch } = useQuery({
    queryFn: () => getCloudResources(),
    queryKey: ['get-cloud-resources'],
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
                        {cloudResources?.map((cloudResource) => (
                            <TableRow key={cloudResource.id}>
                                <TableCell>{cloudResource.id}</TableCell>
                                <TableCell>{cloudResource.alias}</TableCell>
                                <TableCell>{cloudResource.instance.name}</TableCell>
                                <TableCell>{cloudResource.instance.ipAddress}</TableCell>
                                <TableCell>{cloudResource.volume.imageInfo.name}</TableCell>
                                <TableCell>{cloudResource.instance.flavorSpecs.name}</TableCell>
                                <TableCell>{cloudResource.volume.size}</TableCell>
                                <TableCell
                                    className={cloudResource.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}
                                >{cloudResource.status}</TableCell> 
                                <TableCell>
                                    <div className="flex items-center gap-0.5">
                                        <CloudResourceDetailsDialog details={cloudResource} />
                                        {cloudResource.status === 'Ativo' && (
                                            <DisableCloudResourceDialog cloudResourceId={cloudResource.id} onDisable={refetch} />
                                        )}
                                        {cloudResource.status === 'Inativo' && (
                                            <EnableCloudResourceDialog cloudResourceId={cloudResource.id} onEnable={refetch} />
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