import { CreateUserDialog } from "@/components/users/create-user-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersFilters } from "@/components/users/users-filters";
import { getUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";

export function Users() {
    const { data: users, refetch } = useQuery({
        queryFn: getUsers,
        queryKey: ['get-users'],
    })

    return (
        <div className="ml-60 p-4">
            <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
            <hr className="border-muted/70 my-4" />
            <div className="px-8">
                <div className="flex items-center justify-between">
                    <UsersFilters />
                    <CreateUserDialog onUserCreated={refetch}/>
                </div>
                <div className="mt-4 border rounded-lg p-2">
                    <Table>
                        <TableHeader>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Data de Criação</TableHead>
                            <TableHead>Status</TableHead>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}