import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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