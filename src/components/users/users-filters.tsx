import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getRoles } from "@/data/roles";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserStatusOptions } from "@/data/users";
import { useSearchParams } from "react-router-dom";
import { SelectSeparator } from "@radix-ui/react-select";
import { useState } from "react";

const usersFiltersSchema = z.object({
    search: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
})

type UsersFiltersSchema = z.infer<typeof usersFiltersSchema>

export function UsersFilters() {
    const { data: roles } = useQuery({
        queryFn: getRoles,
        queryKey: ['get-roles'],
    });

    const { data: statusOptions } = useQuery({
        queryFn: getUserStatusOptions,
        queryKey: ['get-status-options'],
    });

    const [roleKey, setRoleKey] = useState(+new Date())
    const [statusKey, setStatusKey] = useState(+new Date() + 1)

    const [_, setSearchParams] = useSearchParams();

    const { register, handleSubmit, setValue } = useForm<UsersFiltersSchema>({
        resolver: zodResolver(usersFiltersSchema)
    })

    function handleFilterUsers({ search, role, status }: UsersFiltersSchema) {
        setSearchParams(state => {
            if (search) {
                state.set('search', search);
            } else {
                state.delete('search');
            }
            if (role) {
                state.set('role', role);
            } else {
                state.delete('role');
            }
            if (status) {
                state.set('status', status);
            } else {
                state.delete('status');
            }
            return state;
        })
    }


    return (
        <form onSubmit={handleSubmit(handleFilterUsers)} className="grid grid-cols-4 gap-1.5">     
            <Input 
                placeholder="Nome e E-mail"
                className="w-auto"
                {...register("search")}
            />

            <Select
                key={roleKey}
                onValueChange={(value) => setValue("role", value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Filtrar por Cargo" />
                </SelectTrigger>
                <SelectContent>
                    {roles?.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                            {role.alias}
                        </SelectItem>
                    ))}
                    <SelectSeparator />
                    <Button
                        className="w-full px-2"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            setRoleKey(+new Date())
                            setValue("role", undefined)
                        }}
                    >
                        Limpar
                    </Button>
                </SelectContent>
            </Select>
        
            <Select
                key={statusKey}
                onValueChange={(value) => setValue("status", value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Filtrar por Status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions?.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                    <SelectSeparator />
                    <Button
                        className="w-full px-2"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            setStatusKey(+new Date())
                            setValue("status", undefined)
                        }}
                    >
                        Limpar
                    </Button>
                </SelectContent>
            </Select>
        
            <Button type="submit" variant="outline" className="w-32">
                <Search className="h-4 w-4"/>
                Filtrar
            </Button>
        </form>
    )
}