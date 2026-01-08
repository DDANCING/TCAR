import { Suspense } from "react";
import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ErrorCard />
    </Suspense>
  )
}

export default AuthErrorPage;