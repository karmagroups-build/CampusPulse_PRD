# CampusPulse — Documentation & Product Specs

> **Tagline**: *Eventbrite's infrastructure. Instagram's instinct.*  
> CampusPulse is an event discovery and attendance management platform for university campuses, launching at the **University of Ibadan (~33,000 students)** on **September 20, 2026**.

---

## 🌐 Hosted Documentation

The interactive documentation is hosted on Netlify:

* 📄 **[PRD v1.2](https://campuspulse-prd.netlify.app/)** (`index.html`) — Product Requirements Document (First launch scope, user flows, NFRs)
* 👥 **[Team & Launch Timeline](https://campuspulse-prd.netlify.app/team.html)** (`team.html`) — 6-person team assignments & 6-week task breakdown
* 🎨 **[Brand Guidelines](https://campuspulse-prd.netlify.app/brand.html)** (`brand.html`) — Visual identity, typography, design tokens & color system
* 📐 **[Core Flow Wireframes](https://campuspulse-prd.netlify.app/wireframes.html)** (`wireframes.html`) — Interactive wireframes for attendee & organizer flows

---

## 📁 Repository Structure

```
CampusPulse_PRD/
├── index.html                      # PRD v1.2 (Interactive web spec)
├── team.html                       # Team roster & 6-week launch timeline
├── brand.html                      # CampusPulse Brand & Design Guidelines
├── wireframes.html                 # Core Flow Wireframes
├── docs/                           # Document specifications (.docx format)
│   ├── CampusPulse_PRD_v1_2_1.docx
│   ├── CampusPulse_Technical_Architecture_v1_2.docx
│   ├── CampusPulse_Data_Model_ERD_v1_2.docx
│   └── archive/                    # Historical versions (v1.0, v1.1)
├── scripts/                        # Tooling & document generators
│   └── docx-generator/            # JS scripts generating PRD docx files
├── .gitignore                      # Excludes large binaries (>100MB)
└── README.md
```

---

## 🚀 Launch Key Facts (v1 MVP)

| Metric / Fact | Value |
| :--- | :--- |
| **Launch Target** | **September 20, 2026** |
| **Primary Campus** | University of Ibadan (~33,000 students) |
| **v1 Scope** | Free RSVP events only, single campus, responsive web app |
| **Key Features** | Live discovery feed, 24h Stories, free RSVP with QR code, door check-in scanner |
| **Team Size** | 6 members (3 Backend, 1 Frontend, 1 Senior/Reviewer, 1 QA) |

---

## 👥 Team & Domains

* **Bayo** *(Senior Backend / Tech Lead)* — Events, Feed, Stories, Core Engine & Architecture
* **Victor** *(Backend)* — Auth, Users, Organizer accounts & Verification
* **Batman** *(Backend)* — RSVP, QR check-in, Notifications (Push, In-App, Email)
* **Joshua** *(Frontend)* — Attendee UI (Feed, Stories viewer, Event detail, RSVP, My Events)
* **Wave** *(Senior / Reviewer)* — Organizer UI (Dashboard, Create event, Scanner) & Code Review
* **Obioma** *(QA)* — Test planning, flow verification, bug tracking & launch sign-off