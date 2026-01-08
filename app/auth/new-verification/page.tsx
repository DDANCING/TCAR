import { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verification-form";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerificationPage