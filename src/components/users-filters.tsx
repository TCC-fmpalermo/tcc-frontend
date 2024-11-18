import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UsersFilters() {
    return (
        <form className="flex items-center gap-2">
            <Input 
                name="filter" 
                placeholder="ID, Nome, E-mail, Cargo, Status"
                className="w-auto"
            />
            <Button type="submit" variant="outline">
                <Search className="h-4 w-4"/>
                Filtrar
            </Button>
        </form>
    )
}