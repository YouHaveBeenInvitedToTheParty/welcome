import type { CalendarConfig } from "../utils/calendar";

export const EVENT = {
  title: "House Party, Wasn't This a ____ Party?",
  description:
    "Show up pretending it's whatever theme you want. At the door, ask: wasn't this a ____ party?",
  location: "Pietersbergweg 546, 1105 BM Amsterdam, Netherlands",
  addressLine: "Pietersbergweg 546",
  city: "Amsterdam 1105 BM",
  dateLabel: "July 25, 2026",
  timeLabel: "From 17:00 onwards",
} as const;

export const HOUSE_CALENDAR: CalendarConfig = {
  title: EVENT.title,
  description: EVENT.description,
  location: EVENT.location,
  googleDates: "20260725T170000/20260726T010000",
  uid: "party-20260725@welcome",
  dtStart: "20260725T170000",
  dtEnd: "20260726T010000",
  filename: "house-party.ics",
};
