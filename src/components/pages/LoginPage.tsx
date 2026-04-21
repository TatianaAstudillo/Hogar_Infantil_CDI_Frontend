import { LoginForm } from "../organisms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        
        {/* LOGO */}
        <img
          src="src/assets/images/logo.png"
          alt="logo"
          className="mx-auto mb-4 w-16"
        />

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