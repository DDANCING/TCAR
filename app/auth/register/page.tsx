import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

const Register = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegisterForm/>
    </Suspense>
  );
};

export default Register;