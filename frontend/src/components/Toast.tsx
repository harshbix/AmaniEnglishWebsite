import { useEffect } from "react";
import { motion } from "framer-motion";

const combine = (...classes: Array<string | undefined | false>): string => {
  return classes.filter(Boolean).join(" ");
};

export type ToastType = "success" | "error";

interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  className?: string;
}

const iconMap: Record<ToastType, JSX.Element> = {
  success: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />
    </svg>
  ),
  error: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
    </svg>
  ),
};

const toneMap = {
  success: {
    iconWrapper: "bg-brand-green text-white",
    container: "border border-brand-green/40",
  },
  error: {
    iconWrapper: "bg-red-500 text-white",
    container: "border border-red-500/40",
  },
} as const satisfies Record<ToastType, { iconWrapper: string; container: string }>;

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  duration = 4000,
  onDismiss,
  className,
}) => {
  useEffect(() => {
    if (!duration) {
      return;
    }

    const timer = window.setTimeout(() => {
      onDismiss?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onDismiss]);

  const tone = toneMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -16 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={combine(
        "pointer-events-auto fixed right-6 top-6 z-[1000] w-full max-w-sm rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur",
        tone.container,
        className
      )}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div className="flex items-start gap-3">
        <span
          className={combine(
            "flex h-10 w-10 items-center justify-center rounded-full",
            tone.iconWrapper
          )}
        >
          {iconMap[type]}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-brand-dark">{title}</p>
          <p className="mt-1 text-xs text-gray-600">{message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full p-1 text-gray-400 transition hover:text-brand-dark"
          aria-label="Dismiss notification"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
