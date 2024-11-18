import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";

export function CreateUserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Criar Usuário
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Usuário</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um novo usuário
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input type="text" id="firstName" placeholder="Nome" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="lastName">
                            Sobrenome
                        </Label>
                        <Input type="text" id="lastName" placeholder="Sobrenome"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                        <Label htmlFor="email">
                            E-mail
                        </Label>
                        <Input type="text" id="email" placeholder="Sobrenome"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">
                            Senha
                        </Label>
                        <Input type="password" id="password" placeholder="Senha"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">
                            Confirmar Senha
                        </Label>
                        <Input type="password" id="password" placeholder="Confirmar Senha"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                        <Label htmlFor="role">
                            Cargo
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Administrador</SelectItem>
                                <SelectItem value="1">Usuário</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit">Criar Usuário</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}