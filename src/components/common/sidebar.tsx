import { useAuth } from "@/contexts/auth-context";
import { ClipboardList, LogOut, Monitor, MonitorCheck, MonitorCog, MonitorUp, User, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
    const { clearToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken(); 
        navigate("/sign-in");
    };

    return (
      <div className="flex w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 w-66 border-r bg-background">
            <Link 
                to="#"
                className="flex items-center gap-4 py-6 px-6 text-muted-foreground hover:text-foreground"
            >
                <User className="h-5 w-5" />
                <span>Minha Conta</span>
            </Link>
            <hr className="border-muted/70 mb-4" />
            <nav className="grid gap-4 px-4 grow">
                <h3> Acesso Rápido </h3>
                <Link 
                    to="/new-desktop"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <MonitorUp className="h-5 w-5" />
                    <span>Novo Desktop</span>
                </Link>

                <h3 className="py-2"> Gerenciamento </h3>
                <Link 
                    to="/my-desktops"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Monitor className="h-5 w-5" />
                    <span>Meus Desktops</span>
                </Link>
                <Link 
                    to="/my-requests"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <ClipboardList className="h-5 w-5" />
                    <span>Minhas Solicitações</span>
                </Link>
                <h3 className="py-2"> Administração </h3>
                <Link 
                    to="/desktops"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <MonitorCog className="h-5 w-5" />
                    <span>Gerenciar Desktops</span>
                </Link>
                
                <Link 
                    to="/desktop-options"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <MonitorCheck className="h-5 w-5" />
                    <span>Opções de Desktops</span>
                </Link>

                <Link 
                    to="/desktop-requests"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <ClipboardList className="h-5 w-5" />
                    <span>Solicitações de Desktop</span>
                </Link>

                <Link 
                    to="/users"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Users className="h-5 w-5" />
                    <span>Gerenciar Usuários</span>
                </Link>
            </nav>
            <hr className="border-muted/70 mt-4"/>
            <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-6 text-muted-foreground hover:text-foreground text-red-500"
            >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
            </button>
        </aside>
      </div>
    )
}