import { useEffect, useState, type FC, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon?: ReactNode;
}

export const MetricCard: FC<MetricCardProps> = ({
  label,
  value,
  suffix = "%",
  icon,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="text-center">
        {icon && <div className="mb-4 text-4xl">{icon}</div>}
        <div className="text-4xl md:text-5xl font-bold text-brand-green mb-2">
          {displayValue}
          {suffix}
        </div>
        <p className="text-gray-600 font-medium">{label}</p>
      </Card>
    </motion.div>
  );
};
