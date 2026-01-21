import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Container, Hero, Button, Input, Textarea, Alert } from "@/components";
import { usePageMeta, useContactForm } from "@/hooks";
import { isValidEmail, isValidPhone } from "@/utils/helpers";
import { motion } from "framer-motion";
export const ContactPage = () => {
    usePageMeta({
        title: "Contact Us",
        description: "Get in touch with Amani School. Contact form and location details.",
        keywords: ["contact", "phone", "email", "location"],
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const { submit, isPending, errors } = useContactForm();
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim())
            errors.firstName = "First name is required";
        if (!formData.lastName.trim())
            errors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        }
        else if (!isValidEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        if (formData.phone && !isValidPhone(formData.phone)) {
            errors.phone = "Please enter a valid phone number";
        }
        if (!formData.subject.trim())
            errors.subject = "Subject is required";
        if (!formData.message.trim()) {
            errors.message = "Message is required";
        }
        else if (formData.message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters";
        }
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
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                subject: "",
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
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "Contact Us", subtitle: "We'd love to hear from you. Get in touch with our team." }), _jsx("section", { className: "py-16 md:py-24", children: _jsx(Container, { children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [_jsxs(motion.div, { variants: itemVariants, className: "lg:col-span-1", children: [_jsx("h2", { className: "text-2xl font-bold text-brand-dark mb-8", children: "Get In Touch" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-dark mb-2", children: "Address" }), _jsxs("p", { className: "text-gray-600", children: ["Amani School", _jsx("br", {}), "Tanga, Tanzania"] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-dark mb-2", children: "Phone" }), _jsx("a", { href: "tel:+255272634234", className: "text-brand-green hover:underline", children: "+255 (0) 27-2634-234" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-dark mb-2", children: "Email" }), _jsx("a", { href: "mailto:info@amanischool.tz", className: "text-brand-green hover:underline", children: "info@amanischool.tz" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-dark mb-2", children: "Office Hours" }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Monday - Friday: 7:30 AM - 3:30 PM", _jsx("br", {}), "Saturday: By appointment", _jsx("br", {}), "Sunday: Closed"] })] })] })] }), _jsx(motion.div, { variants: itemVariants, className: "lg:col-span-2", children: _jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [showSuccess && (_jsx(Alert, { type: "success", title: "Message Sent!", message: "Thank you for contacting us. We'll get back to you soon.", onClose: () => setShowSuccess(false) })), errors.submit && (_jsx(Alert, { type: "error", title: "Error", message: errors.submit, onClose: () => setFieldErrors({ ...fieldErrors, submit: "" }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Input, { label: "First Name", placeholder: "John", value: formData.firstName, onChange: (e) => setFormData({ ...formData, firstName: e.target.value }), error: fieldErrors.firstName, required: true }), _jsx(Input, { label: "Last Name", placeholder: "Doe", value: formData.lastName, onChange: (e) => setFormData({ ...formData, lastName: e.target.value }), error: fieldErrors.lastName, required: true })] }), _jsx(Input, { label: "Email Address", type: "email", placeholder: "john@example.com", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), error: fieldErrors.email, required: true }), _jsx(Input, { label: "Phone Number", type: "tel", placeholder: "+255...", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), error: fieldErrors.phone, helperText: "Optional" }), _jsx(Input, { label: "Subject", placeholder: "How can we help?", value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), error: fieldErrors.subject, required: true }), _jsx(Textarea, { label: "Message", placeholder: "Your message...", rows: 6, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), error: fieldErrors.message, required: true }), _jsx(Button, { type: "submit", size: "lg", isLoading: isPending, children: "Send Message" })] })] }) })] }) }) }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl font-bold text-brand-dark mb-8 text-center", children: "Find Us" }), _jsx("div", { className: "w-full h-96 bg-gray-200 rounded-lg overflow-hidden", children: _jsx("iframe", { width: "100%", height: "100%", style: { border: 0 }, loading: "lazy", allowFullScreen: true, referrerPolicy: "no-referrer-when-downgrade", src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.8662852908334!2d39.19805!3d-6.172107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c521f0d5a5555%3A0x123456789!2sTanga%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1234567890" }) })] }) })] }));
};
