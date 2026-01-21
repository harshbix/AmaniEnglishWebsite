import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Container, Hero, Button, Input, Select, Textarea, Alert } from "@/components";
import { usePageMeta, useAdmissionForm } from "@/hooks";
import { ADMISSION_CLASSES } from "@/utils/constants";
import { motion } from "framer-motion";
export const AdmissionsPage = () => {
    usePageMeta({
        title: "Admissions",
        description: "Learn about our admission process and apply to Amani School.",
        keywords: ["admissions", "apply", "enrollment"],
    });
    const [formData, setFormData] = useState({
        childFirstName: "",
        childLastName: "",
        childDateOfBirth: "",
        guardianFirstName: "",
        guardianLastName: "",
        guardianEmail: "",
        guardianPhone: "",
        guardianRelationship: "parent",
        intendedClass: "",
        message: "",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const { submit, isPending, errors } = useAdmissionForm();
    const validateForm = () => {
        const errors = {};
        if (!formData.childFirstName.trim())
            errors.childFirstName = "Child's first name is required";
        if (!formData.childLastName.trim())
            errors.childLastName = "Child's last name is required";
        if (!formData.childDateOfBirth)
            errors.childDateOfBirth = "Date of birth is required";
        if (!formData.guardianFirstName.trim())
            errors.guardianFirstName = "Guardian's first name is required";
        if (!formData.guardianLastName.trim())
            errors.guardianLastName = "Guardian's last name is required";
        if (!formData.guardianEmail.trim())
            errors.guardianEmail = "Guardian's email is required";
        if (!formData.guardianPhone.trim())
            errors.guardianPhone = "Guardian's phone is required";
        if (!formData.intendedClass)
            errors.intendedClass = "Intended class is required";
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        const success = await submit(formData);
        if (success) {
            setFormData({
                childFirstName: "",
                childLastName: "",
                childDateOfBirth: "",
                guardianFirstName: "",
                guardianLastName: "",
                guardianEmail: "",
                guardianPhone: "",
                guardianRelationship: "parent",
                intendedClass: "",
                message: "",
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "Admissions", subtitle: "Start your journey with Amani School. Apply today!" }), _jsx("section", { className: "py-16 md:py-24", children: _jsx(Container, { children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [_jsxs(motion.div, { variants: itemVariants, className: "lg:col-span-1", children: [_jsx("h2", { className: "text-2xl font-bold text-brand-dark mb-6", children: "Admission Requirements" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-green mb-2", children: "Documents Needed" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-2", children: [_jsx("li", { children: "\u2713 Birth Certificate" }), _jsx("li", { children: "\u2713 Previous School Reports" }), _jsx("li", { children: "\u2713 Health Certificate" }), _jsx("li", { children: "\u2713 Guardian ID/Passport Copy" }), _jsx("li", { children: "\u2713 Proof of Residence" })] })] }), _jsxs("div", { className: "border-t border-gray-200 pt-4", children: [_jsx("h3", { className: "font-semibold text-brand-green mb-2", children: "Available Classes" }), _jsx("p", { className: "text-sm text-gray-600", children: "We offer admissions from Pre-Primary through Grade 7." })] }), _jsxs("div", { className: "border-t border-gray-200 pt-4", children: [_jsx("h3", { className: "font-semibold text-brand-green mb-2", children: "Processing Time" }), _jsx("p", { className: "text-sm text-gray-600", children: "Typically 7-10 business days after submission." })] })] })] }), _jsx(motion.div, { variants: itemVariants, className: "lg:col-span-2", children: _jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-brand-dark mb-6", children: "Admission Application Form" }), showSuccess && (_jsx(Alert, { type: "success", title: "Application Received!", message: "Thank you for applying. We'll review your application and contact you soon.", onClose: () => setShowSuccess(false) })), errors.submit && (_jsx(Alert, { type: "error", title: "Error", message: errors.submit, onClose: () => setFieldErrors({ ...fieldErrors, submit: "" }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-green", children: "Child's Information" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Input, { label: "First Name", placeholder: "First name", value: formData.childFirstName, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        childFirstName: e.target.value,
                                                                    }), error: fieldErrors.childFirstName, required: true }), _jsx(Input, { label: "Last Name", placeholder: "Last name", value: formData.childLastName, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        childLastName: e.target.value,
                                                                    }), error: fieldErrors.childLastName, required: true })] }), _jsx("div", { className: "mt-4", children: _jsx(Input, { label: "Date of Birth", type: "date", value: formData.childDateOfBirth, onChange: (e) => setFormData({
                                                                    ...formData,
                                                                    childDateOfBirth: e.target.value,
                                                                }), error: fieldErrors.childDateOfBirth, required: true }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-brown", children: "Guardian's Information" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Input, { label: "First Name", placeholder: "First name", value: formData.guardianFirstName, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        guardianFirstName: e.target.value,
                                                                    }), error: fieldErrors.guardianFirstName, required: true }), _jsx(Input, { label: "Last Name", placeholder: "Last name", value: formData.guardianLastName, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        guardianLastName: e.target.value,
                                                                    }), error: fieldErrors.guardianLastName, required: true })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4", children: [_jsx(Input, { label: "Email Address", type: "email", placeholder: "email@example.com", value: formData.guardianEmail, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        guardianEmail: e.target.value,
                                                                    }), error: fieldErrors.guardianEmail, required: true }), _jsx(Input, { label: "Phone Number", type: "tel", placeholder: "+255...", value: formData.guardianPhone, onChange: (e) => setFormData({
                                                                        ...formData,
                                                                        guardianPhone: e.target.value,
                                                                    }), error: fieldErrors.guardianPhone, required: true })] }), _jsx("div", { className: "mt-4", children: _jsx(Select, { label: "Relationship to Child", options: [
                                                                    { value: "parent", label: "Parent" },
                                                                    { value: "guardian", label: "Guardian" },
                                                                ], value: formData.guardianRelationship, onChange: (e) => {
                                                                    const value = e.target.value;
                                                                    setFormData({
                                                                        ...formData,
                                                                        guardianRelationship: value,
                                                                    });
                                                                }, required: true }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-green", children: "Admission Details" }), _jsx(Select, { label: "Intended Class", options: ADMISSION_CLASSES.map((cls) => ({
                                                                value: cls,
                                                                label: cls,
                                                            })), value: formData.intendedClass, onChange: (e) => setFormData({
                                                                ...formData,
                                                                intendedClass: e.target.value,
                                                            }), error: fieldErrors.intendedClass, placeholder: "Select a class", required: true }), _jsx("div", { className: "mt-4", children: _jsx(Textarea, { label: "Additional Information", placeholder: "Tell us anything else we should know...", rows: 4, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }) }) })] }), _jsx(Button, { type: "submit", size: "lg", isLoading: isPending, children: "Submit Application" })] })] }) })] }) }) })] }));
};
