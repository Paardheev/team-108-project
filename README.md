# Vector — IIT Madras Club & CFI Operations System

Vector is an enterprise-grade operational portal tailored for IIT Madras student organizations, Centre for Innovation (CFI) clubs, and campus bodies (Shaastra, Saarang, CFI Competition Teams, and Department Societies). 

It unifies multi-department task management, proof-of-work checkpoint approvals, dynamic QR code attendance, institutional knowledge archives, inter-club competition registries, and an AI-powered operations copilot into a centralized platform.

---

## 🌟 Key Features

### 🔐 1. Role-Based Governance & Access Control
- **Role Hierarchy**: Delegate fine-grained permissions across Admin, Club Head, Core Coordinator, Club Member, and General Student roles.
- **IITM Domain Verification**: Roll email (`@smail.iitm.ac.in`) verification and departmental auto-assignment.
- **Permission Management**: Live permission toggle matrix and role delegation.

### 📢 2. Multi-Channel Announcements & Read Verification
- Broadcast critical updates across specialized channels (`#all-members`, `#core-coordinators`, `#software-team`, `#sponsorship`).
- Live read-receipt tracking and acknowledgement audits for heads and coordinators.

### 📋 3. Task Checkpoints & Proof-of-Work Approvals
- Breakdown complex engineering/event tasks into sequential checkpoints.
- Image proof upload for physical deliverables or hardware progress.
- Dual approval workflow: Heads review, approve, or reject milestone submissions.

### 📍 4. Dynamic QR Code & Manual Attendance System
- **Anti-Fraud QR Code**: Generates dynamic rotating QR codes for real-time meeting and lab session check-ins.
- **Manual Verification**: Roll-number manual attendance log sheet for off-grid events.
- **Analytics & Export**: Attendance percentage tracking and batch CSV exports.

### 📁 5. Institutional Knowledge & Resource Library
- Version-controlled archives for sponsorship pitch decks, CAD models, design assets, financial budgets, and SOPs across student batches.
- Download counters and category-filtered repository.

### 🏆 6. Inter-Club Competitions & Team Registration
- Flagship multi-stage competition tracking (prelims, finals, prize pools).
- Seamless team formation, leader assignment, and member registration.

### 🤖 7. Vector AI Operations Copilot
- Powered by **Gemini AI**.
- Summarize raw meeting transcripts into structured action items.
- Auto-generate task checkpoint breakdowns and event logistics timelines.

### 📊 8. Member Roster, Free-Time Matrix & Audit Ledger
- Member directory with department filters and skill tags.
- **Weekly Free-Time Matrix**: Schedule mapping for meeting slot optimization.
- **Immutable Audit Log**: Security ledger logging all permission updates, resource uploads, and checkpoint approvals.

---

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, React Router v6
- **Styling**: Tailwind CSS, Lucide React Icons
- **Build Tool**: Vite, ESBuild
- **Backend**: Express.js server (`server.ts`)
- **AI Integration**: `@google/genai` (Gemini API Integration)

---

## 📁 Project Structure

```text
├── server.ts                 # Express backend server & Gemini API proxy routes
├── index.html                # Entry HTML document
├── package.json              # Dependencies and scripts
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Primary application routes & layout wrapper
│   ├── index.css             # Tailwind CSS entry
│   ├── types.ts              # TypeScript interfaces and domain models
│   ├── components/
│   │   └── layout/           # MainLayout, Header Navbar, Sidebar
│   ├── context/
│   │   └── AppContext.tsx    # Global React state management engine
│   ├── data/
│   │   └── mockData.ts       # Comprehensive IIT Madras seed data
│   └── pages/
│       ├── Dashboard.tsx              # Central operational hub
│       ├── ai/                        # Gemini AI Assistant copilot
│       ├── analytics/                 # Metrics & department performance charts
│       ├── announcements/             # Broadcasts, channels & read receipts
│       ├── attendance/                # Dynamic QR scanner & attendance sheets
│       ├── auth/                      # Login, register, profile & roles management
│       ├── competitions/              # Competition listings & team registration
│       ├── discussions/               # Forum discussions & voting
│       ├── events/                    # Event scheduling & registration
│       ├── members/                   # Member roster & free-time matrix
│       ├── notifications/             # System alerts & activity log
│       ├── resources/                 # Resource library & upload portal
│       ├── system/                    # Audit logs & global search
│       └── tasks/                     # Task execution & proof approvals
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory (refer to `.env.example`):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Running Development Server

Start the application in dev mode:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 4. Build for Production

To compile the application and bundle the Express server:

```bash
npm run build
npm start
```

---

## 📄 License

Developed for student organization management at IIT Madras.
