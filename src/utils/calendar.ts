export type CalendarConfig = {
  title: string;
  description: string;
  location: string;
  googleDates: string;
  uid: string;
  dtStart: string;
  dtEnd: string;
  filename: string;
};

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "Z");
}

export function getGoogleCalendarUrl(config: CalendarConfig) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: config.title,
    dates: config.googleDates,
    details: config.description,
    location: config.location,
    ctz: "Europe/Amsterdam",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(config: CalendarConfig) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//welcome//party//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Amsterdam",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "TZNAME:CEST",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "TZNAME:CET",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${config.uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART;TZID=Europe/Amsterdam:${config.dtStart}`,
    `DTEND;TZID=Europe/Amsterdam:${config.dtEnd}`,
    `SUMMARY:${config.title}`,
    `DESCRIPTION:${config.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${config.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = config.filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function addToCalendar(config: CalendarConfig) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    downloadIcsFile(config);
    return;
  }

  window.open(getGoogleCalendarUrl(config), "_blank", "noopener,noreferrer");
  downloadIcsFile(config);
}
