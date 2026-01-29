import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formAPI } from "@/services/formAPI";
import { ContactFormData, AdmissionFormData } from "@/types/api";
import type { SubmissionResponse } from "@/services/formAPI";

type SubmitResult = {
  success: boolean;
  message?: string;
  data?: SubmissionResponse;
};

export const useContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => formAPI.submitContact(data),
  });

  const submit = async (data: ContactFormData): Promise<SubmitResult> => {
    setErrors({});
    try {
      const result = await mutation.mutateAsync(data);
      return { success: true, data: result };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      if (error instanceof Error) {
        setErrors({ submit: message });
      }
      return { success: false, message };
    }
  };

  return { ...mutation, submit, errors };
};

export const useAdmissionForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: AdmissionFormData) => formAPI.submitAdmission(data),
  });

  const submit = async (data: AdmissionFormData): Promise<SubmitResult> => {
    setErrors({});
    try {
      const result = await mutation.mutateAsync(data);
      return { success: true, data: result };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      if (error instanceof Error) {
        setErrors({ submit: message });
      }
      return { success: false, message };
    }
  };

  return { ...mutation, submit, errors };
};
