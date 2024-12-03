import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/data/auth"; // Adapte esta função para lidar com o cadastro
import { toast, Toaster } from "sonner";

const signUpFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'Primeiro nome é obrigatório' }),
    lastName: z.string().nonempty({ message: 'Último nome é obrigatório' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(5, { message: 'Senha deve ter pelo menos 5 caracteres' }),
    confirmPassword: z.string().min(5, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function handleSignUp(data: SignUpFormSchema) {
    try {
      const res = await signUp(data);
      
      if (res.status === 201) {
        toast.warning("Usuário cadastrado com sucesso. Por favor, aguarde a aprovação de um administrador", { duration: 10000 });
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar");
    }
  }

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[400px] p-6">
            <CardHeader>
            <CardTitle>
                <h1 className="text-2xl text-center">Crie sua conta</h1>
            </CardTitle>
            <CardDescription className="text-center"><a className="underline-offset-2 hover:underline" href="/sign-in"> Ou acesse sua conta </a></CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(handleSignUp)}>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">Primeiro Nome</Label>
                    <Input
                    type="text"
                    id="firstName"
                    placeholder="Primeiro Nome"
                    {...register('firstName')}
                    className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Último Nome</Label>
                    <Input
                    type="text"
                    id="lastName"
                    placeholder="Último Nome"
                    {...register('lastName')}
                    className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
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
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirme sua Senha</Label>
                    <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirme sua Senha"
                    {...register('confirmPassword')}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">Cadastrar</Button>
            </CardFooter>
            </form>
        </Card>
        </div>
        <Toaster />
    </>
  );
}
