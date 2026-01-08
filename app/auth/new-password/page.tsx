import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form.tsx"

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <NewPasswordForm/>
    </Suspense>
  )
}
export default NewPasswordPage