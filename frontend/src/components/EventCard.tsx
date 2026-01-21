import type { FC } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Event } from "@/types/api";
import { formatDateShort } from "@/utils/helpers";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard: FC<EventCardProps> = ({ event, onClick }) => {
  const typeVariants: Record<Event["type"], "primary" | "secondary" | "success" | "warning"> = {
    academic: "primary",
    meeting: "secondary",
    activity: "success",
    exam: "warning",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hoverable
        onClick={onClick}
        className="cursor-pointer"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-brand-green bg-opacity-10 rounded-lg flex flex-col items-center justify-center">
              <div className="text-xs text-brand-green font-bold">
                {formatDateShort(event.date).split(" ")[0]}
              </div>
              <div className="text-lg font-bold text-brand-green">
                {formatDateShort(event.date).split(" ")[1]}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-brand-dark mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
              <Badge variant={typeVariants[event.type]} size="sm">
                {event.type}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
