import { mkdir, copyFile, access } from "fs/promises";
import path from "path";
import sharp from "sharp";

const projectRoot = path.resolve(".");
const publicDir = path.join(projectRoot, "public", "images");
const rawDir = path.join(publicDir, "raw");
const outputDir = path.join(publicDir, "optimized");

const defaultWidths = [480, 768, 1200, 1600];
const logoWidths = [64, 96, 128, 192, 256];

const assets = [
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (1).jpeg", base: "students-reading-portrait" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (2).jpeg", base: "teacher-guidance-portrait" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (3).jpeg", base: "community-outreach-learning" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (4).jpeg", base: "student-leadership-meeting" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (5).jpeg", base: "sports-day-celebration" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (6).jpeg", base: "science-lab-experiment" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01 (7).jpeg", base: "graduation-ceremony" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.01.jpeg", base: "student-leader-portrait" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (1).jpeg", base: "parent-engagement" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (2).jpeg", base: "classroom-presentation" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (3).jpeg", base: "student-collaboration" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (4).jpeg", base: "athletics-training" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (5).jpeg", base: "classroom-focus" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (6).jpeg", base: "innovation-lab" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (7).jpeg", base: "community-celebration" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (8).jpeg", base: "leadership-planning" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (9).jpeg", base: "playground-activity" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (10).jpeg", base: "news-exam-success" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (11).jpeg", base: "news-stem-lab" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (12).jpeg", base: "news-leadership-camp" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (13).jpeg", base: "hero-home-campus" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (14).jpeg", base: "hero-about-campus" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (15).jpeg", base: "hero-gallery-campus" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (16).jpeg", base: "hero-calendar-events" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (17).jpeg", base: "hero-news-updates" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02 (18).jpeg", base: "hero-performance-achievement" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.02.jpeg", base: "campus-life-moments" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.03 (1).jpeg", base: "community-support" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.03 (2).jpeg", base: "hero-admissions-journey" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.03 (3).jpeg", base: "hero-contact-community" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.03 (4).jpeg", base: "hero-fees-planning" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.03.jpeg", base: "graduation-highlights" },
  { source: "WhatsApp Image 2026-01-29 at 22.30.04.jpeg", base: "campus-culture-moment" },
  { source: "Amani_logo_2.1.jpg__1_-removebg-preview.png", base: "logo-amani-school", role: "logo" },
];

const ensureDir = async (dir) => {
  await mkdir(dir, { recursive: true });
};

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const findSource = async (filename) => {
  const primary = path.join(publicDir, filename);
  if (await exists(primary)) {
    return primary;
  }
  const fallback = path.join(rawDir, filename);
  if (await exists(fallback)) {
    return fallback;
  }
  throw new Error(`Missing source image: ${filename}`);
};

const processImage = async (sourcePath, base, widths) => {
  await Promise.all(
    widths.map(async (width) => {
      const basePath = path.join(outputDir, `${base}-${width}`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(`${basePath}.jpg`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(`${basePath}.webp`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 50 })
        .toFile(`${basePath}.avif`);
    })
  );
};

const run = async () => {
  await ensureDir(rawDir);
  await ensureDir(outputDir);

  for (const asset of assets) {
    const sourcePath = await findSource(asset.source);
    const widths = asset.role === "logo" ? logoWidths : defaultWidths;
    await processImage(sourcePath, asset.base, widths);

    const rawTarget = path.join(rawDir, asset.source);
    if (!(await exists(rawTarget))) {
      await copyFile(sourcePath, rawTarget);
    }
  }

  console.log("✅ Images processed and optimized successfully.");
};

run().catch((error) => {
  console.error("Image processing failed:", error);
  process.exit(1);
});
