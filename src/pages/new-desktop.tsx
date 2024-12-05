import { CreateDesktopDialog } from "@/components/new-desktop/create-desktop-dialog";
import { CreateRequestDialog } from "@/components/new-desktop/create-request-dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useHasPermission } from "@/contexts/permission-context";
import { getDesktopOptions } from "@/data/desktop-options";
import { useQuery } from "@tanstack/react-query";
import { Monitor } from "lucide-react";

export function NewDesktop() {
    const canCreateAnyDesktop = useHasPermission("CREATE_ANY_DESKTOP");
    const status = "Ativo";
    const { data: desktopOptions, isLoading } = useQuery({
        queryFn: () => getDesktopOptions({ status }),
        queryKey: ['get-desktop-options', status],
    })
    
    if (isLoading) {
        return (
            <div className="flex ml-60 p-4 justify-center items-center h-screen">
                <LoadingSpinner size={40}/>
            </div>
        );
    }

    return (
      <div className="ml-64 p-4">
          <h1 className="text-2xl font-bold">Novo Desktop</h1>
          <hr className="border-muted/70 my-4" />
          <h2 className="text-lg font-semibold text-pretty mb-4">Selecione uma opção:</h2>
          <div className="grid grid-cols-4 gap-4">
              {desktopOptions?.map((desktop) => (
                  <Card key={desktop.id} className="my-4 p-4">
                      <CardHeader className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold">
                              {desktop.imageInfo.name}
                          </CardTitle>
                          <Monitor className="h-16 w-16 text-muted" />
                      </CardHeader>
                      <CardContent>
                          <ul className="list-disc pl-6 space-y-1 text-sm">
                              <li>CPUs: {desktop.flavorSpecs.vcpus}</li>
                              <li>RAM: {desktop.flavorSpecs.ram} </li>
                              <li>Armazenamento: {desktop.size}</li>
                          </ul>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-rows-2 w-full">
                            <p className="text-sm text-muted-foreground">
                                {desktop.autoApproved || canCreateAnyDesktop ? "Aprovado automaticamente" : "Necessita de aprovação de um administrador"}
                            </p>
                            {desktop.autoApproved || canCreateAnyDesktop? (<CreateDesktopDialog desktopOptionId={desktop.id} />) : (<CreateRequestDialog desktopOptionId={desktop.id} />)}
                            
                        </div>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      </div>
    );
}
