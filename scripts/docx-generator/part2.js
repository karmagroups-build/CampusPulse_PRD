const h = require("./helpers.js");
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign,
  VIOLET, MAGENTA, INK, INK_SOFT, LINE, PANEL, SUCCESS, WARN, FONT_BODY,
  H1, H2, H3, P, bullet, divider, cellText } = h;
const { PageBreak } = require("docx");

function statusCell(text, status) {
  const colors = { in: SUCCESS, out: WARN, partial: MAGENTA };
  const labels = { in: "v1", out: "v2+", partial: "v1 — limited" };
  return new TableCell({
    width: { size: 1800, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [new Paragraph({
      children: [new TextRun({ text: labels[status], size: 18, bold: true, color: colors[status], font: FONT_BODY })],
    })],
  });
}

function scopeRow(feature, notes, status) {
  return new TableRow({
    children: [
      h.cellText(feature, { width: 3600, bold: true }),
      h.cellText(notes, { width: 3600, color: INK_SOFT }),
      statusCell("x", status),
    ],
  });
}

function scopeHeaderRow() {
  return new TableRow({
    children: [
      h.cellText("Feature", { width: 3600, bold: true, shade: INK, color: "FFFFFF" }),
      h.cellText("Notes", { width: 3600, bold: true, shade: INK, color: "FFFFFF" }),
      h.cellText("Status", { width: 1800, bold: true, shade: INK, color: "FFFFFF" }),
    ],
  });
}

const scope = [
  H1("3. v1 Scope"),
  P("Feature-by-feature breakdown of what ships in v1 versus what's deferred. \"v1 — limited\" means a simplified version ships now with a fuller version planned later."),
  H2("3.1 Attendee-side features"),
  new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [3600, 3600, 1800],
    rows: [
      scopeHeaderRow(),
      scopeRow("Live feed (home screen)", "Chronological + proximity-ranked event cards. This is the app's home screen — no separate \"browse\" tab.", "in"),
      scopeRow("Stories", "24-hour ephemeral posts from organizers — lineup drops, almost-sold-out alerts, day-of reminders.", "in"),
      scopeRow("Event detail page", "Description, time, location, host, RSVP count.", "in"),
      scopeRow("Free RSVP", "One-tap RSVP for free events. Generates a QR code for check-in.", "in"),
      scopeRow("Paid ticket purchase", "Requires payment processor integration.", "out"),
      scopeRow("QR check-in code (attendee view)", "Displayed in-app; add-to-device-wallet is v2.", "in"),
      scopeRow("Student verification", "Email domain (@stu.ui.edu.ng) or manual ID upload.", "partial"),
      scopeRow("Following organizers/clubs", "Follow a club to prioritize their events/stories in your feed.", "in"),
      scopeRow("Search", "Text search across events and organizers.", "partial"),
      scopeRow("Social sharing", "Share an event card to WhatsApp/Instagram from within the app.", "in"),
      scopeRow("Comments / social proof", "Seeing which friends are going, comments on events.", "out"),
    ],
  }),
  new Paragraph({ spacing: { after: 300 }, children: [] }),
  H2("3.2 Organizer-side features"),
  new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [3600, 3600, 1800],
    rows: [
      scopeHeaderRow(),
      scopeRow("Organizer account / club profile", "Verified organizer badge, follower list.", "in"),
      scopeRow("Create free event", "Title, description, location, date/time, capacity, cover image.", "in"),
      scopeRow("Post a Story", "Attach a story to a live or upcoming event.", "in"),
      scopeRow("RSVP dashboard", "Live count of RSVPs, basic attendee list export.", "in"),
      scopeRow("QR check-in scanner", "In-app camera scanner to validate attendee QR codes at the door.", "in"),
      scopeRow("Paid ticketing (tiers, pricing)", "Regular/VIP tiers, pricing, capacity per tier.", "out"),
      scopeRow("Payment processor integration", "Paystack/Flutterwave checkout.", "out"),
      scopeRow("Payout management", "Organizer bank details, payout schedule, fee transparency.", "out"),
      scopeRow("Event analytics", "Views, RSVP conversion, check-in rate. Basic counts only in v1.", "partial"),
      scopeRow("Multi-admin club accounts", "Multiple students managing one club's account.", "out"),
    ],
  }),
  new Paragraph({ spacing: { after: 300 }, children: [] }),
  H2("3.3 Platform / shared"),
  new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [3600, 3600, 1800],
    rows: [
      scopeHeaderRow(),
      scopeRow("Push notifications", "Event starting soon, new story from followed organizer.", "in"),
      scopeRow("Multi-campus support", "Campus-scoping in data model, UI, and discovery.", "out"),
      scopeRow("Admin / moderation tooling", "Report event, suspend organizer, content review queue.", "partial"),
      scopeRow("Offline check-in", "Scanner works without live internet connection at the door.", "out"),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

module.exports = { scope };
