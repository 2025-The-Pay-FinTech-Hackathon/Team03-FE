"use client";

import LimitForm from "./_components/LimitForm";
import AlertModal from "@/components/Modal/AlertModal";
import { useLimitForm } from "@/hooks/useLimitForm";

export default function LimitPage() {
  const { error, clearError } = useLimitForm();

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="p-6 h-full">
        <LimitForm />
      </div>

      <AlertModal isOpen={!!error} onClose={clearError} onConfirm={clearError}>
        <p className="text-center text-gray-700">{error}</p>
      </AlertModal>
    </div>
  );
}
