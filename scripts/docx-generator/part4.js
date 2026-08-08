const h = require("./helpers.js");
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, VerticalAlign,
  VIOLET, MAGENTA, INK, INK_SOFT, LINE, PANEL, SUCCESS, WARN, FONT_BODY,
  H1, H2, H3, P, bullet, divider, cellText } = h;
const { PageBreak } = require("docx");

function nfrTable(rows) {
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [2600, 2200, 4200],
    rows: [
      new TableRow({ children: [
        h.cellText("Dimension", { width: 2600, bold: true, shade: INK, color: "FFFFFF" }),
        h.cellText("Target", { width: 2200, bold: true, shade: INK, color: "FFFFFF" }),
        h.cellText("Rationale / notes", { width: 4200, bold: true, shade: INK, color: "FFFFFF" }),
      ]}),
      ...rows.map(([dim, target, note]) => new TableRow({ children: [
        h.cellText(dim, { width: 2600, bold: true }),
        h.cellText(target, { width: 2200, color: MAGENTA, bold: true }),
        h.cellText(note, { width: 4200, color: INK_SOFT }),
      ]})),
    ],
  });
}

const nfr = [
  H1("5. Non-Functional Requirements"),
  P("v1 is scoped for a single campus, so these targets are deliberately modest — sized for University of Ibadan's population, not for multi-campus scale. Revisit before any multi-campus rollout."),

  H2("5.1 Concurrency & load"),
  nfrTable([
    ["Baseline concurrent users", "500–1,000", "Realistic ceiling for daily active use across a ~33,000-student campus at this stage."],
    ["Peak concurrent users", "3,000–5,000", "A major event (Hall Week, a large concert) publishing or trending can spike feed traffic sharply in a short window."],
    ["RSVP burst handling", "200 RSVPs/min sustained", "Popular events can see a rush of RSVPs right after a Story drop or push notification — this is a write-heavy spike, not just reads."],
    ["Check-in scanner throughput", "1 scan every 1–2 sec per door", "A door with a queue needs scan validation to feel instant; anything slower creates a visible line."],
  ]),
  new Paragraph({ spacing: { after: 260 }, children: [] }),

  H2("5.2 Performance"),
  nfrTable([
    ["Feed load time (cold start)", "< 2.5 sec", "First impression of the app; slower than this reads as broken, not just slow."],
    ["Feed scroll / pagination", "< 500 ms per page", "Feed browsing should feel as responsive as Instagram, not like a paginated website."],
    ["Story load time", "< 1 sec per story", "Stories are meant to be consumed in rapid succession; any stutter breaks the format."],
    ["RSVP confirmation", "< 1 sec", "Needs to feel instant — this is the core conversion action of the app."],
    ["QR check-in validation", "< 1.5 sec round trip", "Must feel instant at a door with a line; this depends on venue WiFi/data quality, which is a real campus constraint."],
  ]),
  new Paragraph({ spacing: { after: 260 }, children: [] }),

  H2("5.3 Availability & reliability"),
  nfrTable([
    ["Platform uptime target", "99.5%", "~3.6 hrs/month allowed downtime. Not a payments platform yet, so this is more relaxed than a fintech SLA — but event nights are non-negotiable (see below)."],
    ["Check-in scanner uptime", "99.9% during live events", "The scanner is the one feature that must not fail — a broken door scanner during a live event is a visible, embarrassing failure mode."],
    ["Data durability", "No RSVP or event data loss", "An RSVP or a published event disappearing is a trust-breaking bug, not a minor one."],
  ]),
  new Paragraph({ spacing: { after: 260 }, children: [] }),

  H2("5.4 Device & network constraints"),
  bullet("Design for mid-range Android devices as the primary target, not flagship iPhones — matches realistic student device ownership."),
  bullet("Campus WiFi and mobile data can be inconsistent, especially in high-density areas during a live event (many devices on one venue's network). The check-in scanner is the highest-risk feature here — full offline support is out of scope for v1, but the UI must degrade gracefully (clear \"retrying...\" states, not silent failure) rather than assume good connectivity."),
  bullet("Feed and Story media should be compressed/optimized aggressively — this is a data-cost-sensitive user base."),
  new Paragraph({ spacing: { after: 260 }, children: [] }),

  H2("5.5 Security & privacy"),
  bullet("Student verification data (email, ID upload) must be handled per standard data-privacy practice even though v1 has no payment data in scope."),
  bullet("QR check-in tokens should be single-use or time-boxed to reduce (not eliminate — see §7) the risk of screenshot-sharing."),
  bullet("No payment data exists in v1's scope — this significantly reduces v1's compliance surface versus v2."),

  new Paragraph({ children: [new PageBreak()] }),
];

module.exports = { nfr };
