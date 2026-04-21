import { LoginForm } from "../organisms/LoginForm";
import logo from "@/assets/images/logo.png";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        
        {/* LOGO */}
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />

        {/* TÍTULO */}
        <h1 className="text-2xl font-bold">SIGEH</h1>
        <p className="text-gray-500 mb-6">
          Sistema Integral de Gestión para Hogar Infantil
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;