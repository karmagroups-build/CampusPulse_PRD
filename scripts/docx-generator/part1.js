const h = require("./helpers.js");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, LevelFormat, PageBreak, VerticalAlign,
  VIOLET, MAGENTA, INK, INK_SOFT, LINE, PANEL, SUCCESS, WARN, FONT_BODY, FONT_HEAD,
  H1, H2, H3, P, bullet, numbered, tag, meta, divider, cellText, fs } = h;

// ============ COVER ============
const cover = [
  new Paragraph({ spacing: { before: 2400, after: 0 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 80 },
    children: [new TextRun({ text: "PRODUCT REQUIREMENTS DOCUMENT", size: 20, bold: true, color: MAGENTA, font: FONT_BODY, characterSpacing: 20 })],
  }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "CampusPulse", size: 72, bold: true, color: INK, font: FONT_HEAD })],
  }),
  new Paragraph({
    spacing: { after: 600 },
    children: [new TextRun({ text: "Eventbrite's infrastructure. Instagram's instinct.", size: 26, italics: true, color: INK_SOFT, font: FONT_BODY })],
  }),
  divider(),
  meta("Prepared by", "Karma Groups"),
  meta("Prepared for", "CampusPulse — Ezeocha Obioma"),
  meta("Document owner", "Product"),
  meta("Version", "1.0 — v1 (MVP) Scope"),
  meta("Status", "Draft for review"),
  meta("Primary market", "University of Ibadan (~33,000 students)"),
  new Paragraph({ children: [new PageBreak()] }),
];

// ============ 1. OVERVIEW ============
const overview = [
  H1("1. Overview"),
  H2("1.1 Problem statement"),
  P("Event information at the University of Ibadan is fragmented across WhatsApp broadcast lists, Instagram stories, and physical bulletin boards. Discovery depends on already being in the right group chat. Students miss events they would have attended; organizers under-fill rooms they've paid for; word-of-mouth favors whoever already has the biggest network."),
  H2("1.2 Product thesis"),
  P("Discovery is a feed problem. Hosting is a commerce problem. Most platforms solve one and bolt the other on as an afterthought. CampusPulse is built as both from day one — a scrollable, visual, story-driven feed for attendees, and real event-management infrastructure for organizers, unified under one brand and one data model."),
  H2("1.3 v1 scope decisions"),
  P("Three scoping calls anchor everything in this document:", { bold: true }),
  bullet("Stories/feed ships in v1 — it is core to the product's identity, not a fast-follow."),
  bullet("Paid ticketing is NOT in v1. v1 supports free RSVP events only. Paystack/Flutterwave integration, ticket tiers, and organizer payouts are v2."),
  bullet("v1 targets a single campus (University of Ibadan). Multi-campus expansion is v2+."),
  P("This keeps v1 focused on proving the core discovery + attendance loop without taking on payment processing, PCI scope, or payout compliance before the social mechanics are validated."),
  divider(),
];

// ============ 2. PERSONAS ============
function personaTable(rows) {
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [2200, 6800],
    rows: rows.map(([label, value], i) => new TableRow({
      children: [
        cellText(label, { width: 2200, bold: true, shade: PANEL, color: INK_SOFT }),
        cellText(value, { width: 6800 }),
      ],
    })),
  });
}

const personas = [
  H1("2. Personas"),
  H2("2.1 The Attendee — \"Tobi\""),
  personaTable([
    ["Who", "300-level student, University of Ibadan. On Instagram daily, in 6+ WhatsApp groups, misses events constantly."],
    ["Goal", "Know what's happening tonight without scrolling five different group chats."],
    ["Behavior", "Opens apps to scroll, not to search. Decides to attend something in the last few hours, not days ahead."],
    ["Frustration", "Finds out about a great event the day after it happened, via a story someone else posted."],
    ["Success looks like", "Opens CampusPulse, sees what's live right now, taps RSVP, shows up, scans in."],
  ]),
  new Paragraph({ spacing: { after: 300 }, children: [] }),
  H2("2.2 The Organizer — \"Chidinma\""),
  personaTable([
    ["Who", "Final-year student, Public Relations Officer for a faculty association or hall committee."],
    ["Goal", "Get a real headcount before the event, not a guess based on group chat reactions."],
    ["Behavior", "Currently posts flyers to WhatsApp and Instagram, tracks RSVPs manually or not at all."],
    ["Frustration", "No visibility into who's actually coming. No way to reach people who aren't already in the group."],
    ["Success looks like", "Publishes an event in minutes, watches RSVPs come in live, checks people in at the door with a scanner."],
  ]),
  new Paragraph({ children: [new PageBreak()] }),
];

module.exports = { cover, overview, personas, personaTable };
