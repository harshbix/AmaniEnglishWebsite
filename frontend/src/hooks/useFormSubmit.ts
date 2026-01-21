import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formAPI } from "@/services/formAPI";
import { ContactFormData, AdmissionFormData } from "@/types/api";

export const useContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => formAPI.submitContact(data),
  });

  const submit = async (data: ContactFormData) => {
    setErrors({});
    try {
      await mutation.mutateAsync(data);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      }
      return false;
    }
  };

  return { ...mutation, submit, errors };
};

export const useAdmissionForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: AdmissionFormData) => formAPI.submitAdmission(data),
  });

  const submit = async (data: AdmissionFormData) => {
    setErrors({});
    try {
      await mutation.mutateAsync(data);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      }
      return false;
    }
  };

  return { ...mutation, submit, errors };
};
