import { DesktopDetailsDialog } from "@/components/my-desktops/desktop-details-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getUserCloudResources } from "@/data/cloud-resources";
import { useQuery } from "@tanstack/react-query";
import { Monitor, MonitorPlay } from "lucide-react";

export function MyDesktops() {
    const { data: myDesktops, isLoading, refetch } = useQuery({
        queryFn: getUserCloudResources,
        queryKey: ['get-user-cloud-resources'],
    });

    if (isLoading) {
        return (
            <div className="flex ml-60 p-4 justify-center items-center h-screen">
                <LoadingSpinner size={40} />
            </div>
        );
    }

    return (
        <div className="ml-60 p-4">
            <h1 className="text-2xl font-bold">Meus Desktops</h1>
            <hr className="border-muted/70 my-4" />
            <h2 className="text-lg font-semibold text-pretty mb-4">Acesse seus desktops:</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 w-full mx-auto">
                {myDesktops?.map((desktop) => (    
                    <Card className="my-4 p-4 w-full sm:w-1/2 md:w-1/3 max-w-lg">
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">
                                {desktop.alias}
                            </CardTitle>
                            <Monitor className="h-16 w-16 text-muted" />
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li>Sistema Operacional: {desktop.volume.imageInfo.name}</li>
                                <li>Último acesso: {desktop.lastAccessedAt}</li>
                                <li>
                                    Status: 
                                    <span className={`font-semibold ml-2 ${desktop.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                                        {desktop.status} 
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <div className="grid grid-cols-2 gap-8 w-full">
                                <DesktopDetailsDialog details={desktop} onAliasUpdated={refetch}/>
                                <Button className="">
                                    <MonitorPlay className="mr-2 h-4 w-4" />
                                    Acessar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
