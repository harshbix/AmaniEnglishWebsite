import { useEffect } from "react";
import { setPageMeta } from "@/utils/helpers";
export const usePageMeta = ({ title, description, keywords, }) => {
    useEffect(() => {
        setPageMeta(title, description, keywords);
    }, [title, description, keywords]);
};
