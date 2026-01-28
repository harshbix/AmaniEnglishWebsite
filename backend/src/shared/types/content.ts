export type EventType = "academic" | "meeting" | "activity" | "exam";

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  type: EventType;
  description: string;
}

export interface CalendarData {
  year: number;
  events: SchoolEvent[];
}
