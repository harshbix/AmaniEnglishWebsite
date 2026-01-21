import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formAPI } from "@/services/formAPI";
export const useContactForm = () => {
    const [errors, setErrors] = useState({});
    const mutation = useMutation({
        mutationFn: (data) => formAPI.submitContact(data),
    });
    const submit = async (data) => {
        setErrors({});
        try {
            await mutation.mutateAsync(data);
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                setErrors({ submit: error.message });
            }
            return false;
        }
    };
    return { ...mutation, submit, errors };
};
export const useAdmissionForm = () => {
    const [errors, setErrors] = useState({});
    const mutation = useMutation({
        mutationFn: (data) => formAPI.submitAdmission(data),
    });
    const submit = async (data) => {
        setErrors({});
        try {
            await mutation.mutateAsync(data);
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                setErrors({ submit: error.message });
            }
            return false;
        }
    };
    return { ...mutation, submit, errors };
};
