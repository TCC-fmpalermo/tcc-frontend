import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/data/auth";
import { DecodedToken, useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usePermissions } from "@/contexts/permission-context";

const signInFormSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(5, { message: 'Senha deve ter pelo menos 5 caracteres' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema)
    })

    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { setUserPermissions } = usePermissions()
    const [ error, setError ] = useState<string | null>(null);
    async function handleSignIn(data: SignInFormSchema) {
        try {
            const res = await signIn(data.email, data.password);
            if (res.token) {
                setToken(res.token);
                const decoded: DecodedToken = jwtDecode(res.token);
                setUserPermissions(new Set(decoded.permissions));
                navigate('/');
            } else {
                setError(res.message);
            }   
        } catch (error) {
            setError("Erro ao tentar fazer login. Tente novamente.")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[400px] p-6">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl text-center">
                            Acesse sua conta
                        </h1>
                    </CardTitle>
                    <CardDescription className="text-center">Ou crie uma nova conta</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input 
                                        type="email" 
                                        id="email" 
                                        placeholder="E-mail" 
                                        {...register('email')}
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input 
                                        type="password" 
                                        id="password" 
                                        placeholder="Senha" 
                                        {...register('password')}
                                        className={errors.password ? "border-red-500" : ""}  
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>
                            </div>
                            <div className="mt-4">
                                {error && <span className="text-red-500 text-sm">{error}</span>}
                            </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Entrar</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
