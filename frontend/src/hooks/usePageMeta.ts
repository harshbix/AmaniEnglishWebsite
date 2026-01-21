import { useEffect } from "react";
import { setPageMeta } from "@/utils/helpers";

interface UsePageMetaOptions {
  title: string;
  description: string;
  keywords?: string[];
}

export const usePageMeta = ({
  title,
  description,
  keywords,
}: UsePageMetaOptions): void => {
  useEffect(() => {
    setPageMeta(title, description, keywords);
  }, [title, description, keywords]);
};
