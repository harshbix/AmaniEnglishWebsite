import type { FC } from "react";
import { buildImageSources } from "@/utils/images";

type LoadingMode = "lazy" | "eager";

type DecodingMode = "async" | "auto" | "sync";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  widths?: number[];
  sizes?: string;
  className?: string;
  imgClassName?: string;
  loading?: LoadingMode;
  decoding?: DecodingMode;
  width?: number;
  height?: number;
  fetchPriority?: "high" | "low" | "auto";
}

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  widths,
  sizes,
  className,
  imgClassName,
  loading = "lazy",
  decoding = "async",
  width,
  height,
  fetchPriority = "auto",
}) => {
  const sources = buildImageSources(src, widths);

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={sources.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sizes} />
      <img
        src={sources.src}
        srcSet={sources.srcSet}
        sizes={sizes}
        alt={alt}
        className={imgClassName}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
};

export default ResponsiveImage;
