import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen ml-64 p-4 items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold">403</h1>
        <p className="mt-4 text-lg">Você não tem permissão para acessar esta página.</p>
        <Button onClick={handleGoBack} className="mt-6">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default Forbidden;
