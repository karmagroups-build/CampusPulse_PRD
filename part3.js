const h = require("./helpers.js");
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, VerticalAlign,
  VIOLET, MAGENTA, INK, INK_SOFT, LINE, PANEL, SUCCESS, WARN, FONT_BODY,
  H1, H2, H3, P, bullet, numbered, divider, cellText } = h;
const { PageBreak } = require("docx");

function stepTable(steps) {
  // steps: [ [stepNum, action, screen, systemBehavior] ]
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [700, 2600, 2600, 3100],
    rows: [
      new TableRow({ children: [
        h.cellText("#", { width: 700, bold: true, shade: INK, color: "FFFFFF" }),
        h.cellText("User action", { width: 2600, bold: true, shade: INK, color: "FFFFFF" }),
        h.cellText("Screen / surface", { width: 2600, bold: true, shade: INK, color: "FFFFFF" }),
        h.cellText("System behavior", { width: 3100, bold: true, shade: INK, color: "FFFFFF" }),
      ]}),
      ...steps.map(([n, action, screen, sys]) => new TableRow({ children: [
        h.cellText(String(n), { width: 700, bold: true, color: MAGENTA }),
        h.cellText(action, { width: 2600 }),
        h.cellText(screen, { width: 2600, color: INK_SOFT }),
        h.cellText(sys, { width: 3100, color: INK_SOFT }),
      ]})),
    ],
  });
}

const flows = [
  H1("4. Core User Flows"),
  P("These are the two flows the entire v1 build exists to support. Every screen in the UX spec should trace back to a step here."),

  H2("4.1 Attendee flow: Discover → RSVP → Check in"),
  stepTable([
    [1, "Opens app", "Feed (home screen)", "Loads events ranked by recency + proximity to campus; loads active Stories row at top."],
    [2, "Taps a Story", "Story viewer (full-screen)", "Plays 24h ephemeral content; taps through to event detail if a CTA is attached."],
    [3, "Taps an event card", "Event detail page", "Shows full description, time, location, host profile, live RSVP count."],
    [4, "Taps \"RSVP\"", "Event detail page", "Confirms attendance; generates a unique QR code tied to (user, event); adds event to \"My Events.\""],
    [5, "Gets reminder notification", "Push notification", "Sent ~30 min before event start to all RSVP'd attendees."],
    [6, "Arrives at event, opens QR code", "My Events → ticket view", "Displays static QR code (works without live connection once loaded)."],
    [7, "Organizer scans code", "(Organizer's scanner)", "Validates QR against event + attendee record; marks attendee as checked in; rejects duplicate scans."],
  ]),
  new Paragraph({ spacing: { after: 260 }, children: [] }),
  H3("Edge cases to design for"),
  bullet("Event reaches capacity — RSVP button should show \"Full\" and offer a waitlist or just close, per product decision."),
  bullet("User RSVPs to two overlapping events — no system conflict block in v1, this is a soft social problem, not a hard rule."),
  bullet("QR code screenshot shared with a friend — v1 does not prevent this; flagged as a known gap (see §7 Risks)."),
  bullet("User RSVPs then the event is cancelled — must trigger a push notification and remove from My Events."),

  new Paragraph({ children: [new PageBreak()] }),

  H2("4.2 Organizer flow: Create → Publish → Manage → Check in"),
  stepTable([
    [1, "Creates/opens organizer account", "Organizer onboarding", "Requires club/organization verification (manual review in v1)."],
    [2, "Taps \"Create event\"", "Event creation form", "Title, description, cover image, date/time, location, capacity — all required to publish."],
    [3, "Publishes event", "Event creation form", "Event goes live in the feed immediately; appears in followers' feeds first."],
    [4, "Posts a Story", "Story composer", "Attaches to the live event; visible in Stories row for 24 hours."],
    [5, "Monitors RSVPs", "Organizer dashboard", "Live count updates; basic attendee list visible and exportable."],
    [6, "Opens scanner at the door", "Check-in scanner", "Camera-based QR scan; instant valid/invalid feedback; running checked-in count."],
    [7, "Reviews post-event stats", "Organizer dashboard", "Final RSVP count, check-in count, check-in rate."],
  ]),
  new Paragraph({ spacing: { after: 260 }, children: [] }),
  H3("Edge cases to design for"),
  bullet("Organizer wants to edit event after publishing — needs to notify existing RSVPs of material changes (time/location)."),
  bullet("Organizer wants to cancel an event — must cascade a notification to every RSVP'd attendee."),
  bullet("Scanner used with no internet connection — v1 requires connectivity; flagged as a known gap (see §7 Risks)."),
  bullet("Unverified account tries to publish — should be blocked with a clear \"verification pending\" state, not a silent failure."),

  new Paragraph({ children: [new PageBreak()] }),
];

module.exports = { flows };
