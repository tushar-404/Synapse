import { Suspense } from "react";
import VerifyForm from "./_components/verifyForm";


export default function VerifyRequest() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  )
} 