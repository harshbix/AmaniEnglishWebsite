/**
 * Utility for managing page metadata (SEO)
 */
export const setPageMeta = (title, description, keywords) => {
    document.title = `${title} | Amani School`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", description);
    }
    if (keywords && keywords.length > 0) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute("content", keywords.join(", "));
        }
    }
};
/**
 * Format date to readable format
 */
export const formatDate = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
/**
 * Format date to short format (e.g., Jan 15)
 */
export const formatDateShort = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};
/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
/**
 * Validate phone number (basic)
 */
export const isValidPhone = (phone) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return regex.test(phone.replace(/\s/g, ""));
};
/**
 * Truncate text to specified length
 */
export const truncateText = (text, length) => {
    if (text.length <= length)
        return text;
    return text.slice(0, length) + "...";
};
/**
 * Get initials from name
 */
export const getInitials = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
};
/**
 * Scroll to element smoothly
 */
export const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};
