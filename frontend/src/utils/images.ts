const DEFAULT_WIDTHS = [480, 768, 1200, 1600];

export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "avif";

export interface ImageSourceSet {
  base: string;
  ext: "jpg" | "png";
  widths: number[];
  src: string;
  srcSet: string;
  webpSrcSet: string;
  avifSrcSet: string;
}

const normalizeExtension = (ext: string): "jpg" | "png" => {
  if (ext.toLowerCase() === "png") {
    return "png";
  }
  return "jpg";
};

export const buildImageSources = (src: string, widths: number[] = DEFAULT_WIDTHS): ImageSourceSet => {
  const match = src.match(/^(.*?)(?:-(\d+))?\.(jpg|jpeg|png|webp|avif)$/i);
  const base = match ? match[1] : src;
  const ext = normalizeExtension(match?.[3] ?? "jpg");
  const normalizedWidths = widths.slice().sort((a, b) => a - b);
  const largest = normalizedWidths[normalizedWidths.length - 1];

  const srcSet = normalizedWidths
    .map((width) => `${base}-${width}.${ext} ${width}w`)
    .join(", ");
  const webpSrcSet = normalizedWidths
    .map((width) => `${base}-${width}.webp ${width}w`)
    .join(", ");
  const avifSrcSet = normalizedWidths
    .map((width) => `${base}-${width}.avif ${width}w`)
    .join(", ");

  return {
    base,
    ext,
    widths: normalizedWidths,
    src: `${base}-${largest}.${ext}`,
    srcSet,
    webpSrcSet,
    avifSrcSet,
  };
};

export default buildImageSources;
