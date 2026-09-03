import type { CalendarConfig } from "../utils/calendar";

export const HALLOWEEN_EVENT = {
  title: "Halloween, Order & Chaos",
  description:
    "A Halloween gathering of order and chaos. Snacks and drinks provided. Costumes optional, duality encouraged. Club later is optional.",
  location: "Pietersbergweg 546, 1105 BM Amsterdam, Netherlands",
  addressLine: "Pietersbergweg 546",
  city: "Amsterdam 1105 BM",
  dateLabel: "October 31, 2026",
  timeLabel: "From 19:00 onwards",
} as const;

export const HALLOWEEN_CALENDAR: CalendarConfig = {
  title: HALLOWEEN_EVENT.title,
  description: HALLOWEEN_EVENT.description,
  location: HALLOWEEN_EVENT.location,
  googleDates: "20261031T190000/20261101T020000",
  uid: "halloween-20261031@welcome",
  dtStart: "20261031T190000",
  dtEnd: "20261101T020000",
  filename: "halloween-party.ics",
};
