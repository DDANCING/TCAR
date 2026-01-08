import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm/>
    </Suspense>
  );
};

export default LoginPage;