# NEXERGY AI Platform - Project Architecture

## Overview

NEXERGY AI is an **AI-native operational intelligence platform** designed for enterprise-grade industrial automation, predictive analytics, and autonomous execution. The platform provides real-time operational context analysis, digital twin simulation, and intelligent orchestration across multiple industry sectors.

The platform implements a multi-tenant corporate onboarding model where domain verification (e.g., `@polimetalruedas.com.ar`) governs tenant isolation and restricts system access exclusively to whitelisted corporate roles (IT, Maintenance, Engineering, and Processes).

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 | Interactive UI with real-time updates |
| **Styling** | Framer Motion, Recharts | Animations and data visualization |
| **Backend** | Express.js, tRPC 11 | Type-safe API layer |
| **Database** | MySQL / TiDB, Drizzle ORM | Data persistence & schema management |
| **Authentication** | Manus OAuth & Domain Auth Guard | User authentication & domain-restricted access |
| **AI Integration** | LLM API (Manus Built-in) | Real-time intelligence & analyzer engine |
| **Build Tools** | Vite, TypeScript, Vitest | Development, bundling, and testing |

---

## Architecture Overview

---

## Multi-Tenant Onboarding & Domain Authorization Model

NEXERGY AI provides an enterprise onboarding flow triggered from the main Landing Page when a user selects **"Start for Free"** or **"Join"**.

### Onboarding Workflow
1. **Domain Input:** The enterprise specifies its primary corporate domain (e.g., `polimetalruedas.com.ar`).
2. **Access Restriction:** The system locks access to this tenant workspace so that **only users with emails ending in `@<domain>`** can register or log in.
3. **Role Whitelisting (4 Core Fields):** The onboarding admin assigns 4 key engineering and management roles for their enterprise:
   - **IT / Systems Leader:** (e.g., `sistemas@polimetalruedas.com.ar`)
   - **Maintenance Leader:** (e.g., `mantenimiento@polimetalruedas.com.ar`)
   - **Engineering Leader:** (e.g., `ingenieria@polimetalruedas.com.ar`)
   - **Process Leader:** (e.g., `procesos@polimetalruedas.com.ar`)
4. **Workspace Activation:** Upon completing the wizard, invitations are dispatched, and active users gain access to configure network analyzers, digital twin simulations, and operational reports.

### Enterprise Dedicated Portals & Examples:

| Enterprise Name | Corporate Domain | Portal Endpoint | Core Focus / Use Case |
|-----------------|------------------|-----------------|------------------------|
| **Polimetal Ruedas** | `@polimetalruedas.com.ar` | `/polimetal` | Alloy wheel foundry, thermal processing, and machine analyzer telemetry. |
| **Niza** | `@niza.com.ar` | `/niza` | Industrial automation, energy efficiency vector analysis, and plant uptime tracking. |
| **Aluar** | `@aluar.com.ar` | `/aluar` | Primary aluminum smelting, high-voltage energy orchestration, and predictive maintenance. |

---

## Core Components

### 1. Hero Section (`Hero.tsx`)
The hero section serves as the platform's entry point, featuring:
- **Particle Background Animation:** Canvas-based particle system with neural network-style connections.
- **Dynamic Headline:** "NEXERGY AI" with "Operational Intelligence" subtitle.
- **Call-to-Action Buttons:** "Experience Orchestrator" and "View Dashboard".
- **Scroll Indicator:** Animated chevron indicating more content below.

### 2. Operational Orchestrator (`OperationalOrchestrator.tsx`)
Visualizes the 5-step operational intelligence flow:
1. **Data Ingestion** - Collect operational context & analyzer inputs.
2. **AI Analysis** - Process and understand industrial data.
3. **Digital Twin** - Simulate plant scenarios and vector energy.
4. **Risk & Efficiency** - Evaluate operational and economic risks.
5. **Business Unit Execution** - Activate autonomous agents or manual protocols.

**Implementation Details:**
- SVG-based flow diagram with animated connections.
- Color-coded steps (Electric Blue → Neon Green → Purple → Cyan).
- Responsive grid layout.

### 3. Operational Input (`OperationalInput.tsx`)
Real-time AI-powered intelligence analysis interface:
- **Sector Selector:** Manufacturing, Energy, Logistics, Healthcare, Mining.
- **Context Textarea:** Free-form operational scenario input.
- **LLM Integration:** Real-time analysis via Manus LLM API with streaming markdown output.
- **Output Data:** Status assessment, key findings, recommended actions, and risk indicators.

### 4. Operational Dashboard (`OperationalDashboard.tsx`)
Real-time metrics and analytics visualization:
- **KPI Cards:** System Uptime (99.97%), Active Agents (247), Anomalies Detected (12), AI Recommendations (1847).
- **Charts:** 24h Activity (Line Chart - Recharts), Business Unit Performance (Bar Chart - Recharts), Active Agents Status (Pie Chart - Recharts).
- **Live Updates:** Simulated live metric updates at 3-second intervals with color-coded status indicators.

### 5. Dedicated Integration Portals (`IntegrationsPolimetal.tsx`, `IntegrationsNiza.tsx`, etc.)
- Enterprise-specific portals accessible only by authenticated users belonging to the validated domain.
- Displays real-time analyzer readings, digital twin states, and collaborative dashboards for the **IT, Maintenance, Engineering, and Process** teams.

### 6. Intelligence Layers (`IntelligenceLayers.tsx`)
Five modular AI capability cards:

| Module | Color | Metrics | Description |
|--------|-------|---------|-------------|
| **NEXERGY INDUSTRIAL** | Electric Blue | Uptime, Efficiency, Downtime | Predictive maintenance |
| **NEXERGY ENERGY** | Neon Green | Efficiency, Consumption, Optimization | Energy intelligence |
| **NEXERGY AGENTS** | Purple | Autonomy, Actions, Decisions | AI orchestration |
| **NEXERGY DIGITAL TWIN** | Cyan | Prediction, Scenarios, Simulation | Predictive modeling |
| **NEXERGY LABS** | Magenta | Innovation, Research, Development | Governance & R&D |

### 7. Trust & Governance (`TrustGovernance.tsx`)
Enterprise compliance and transparency framework:
- **Compliance Certifications:** ISO 42001 AI Management System, SOC 2 Type II, GDPR Compliance.
- **Transparency & Accountability:** Complete Audit Trails, Decision Explainability, Blockchain Sync, Real-time Security Logging.

### 8. Navigation (`Navigation.tsx`)
Sticky header with scroll-spy functionality:
- Logo branding, responsive mobile collapsible menu, active section highlighting, and background transition on scroll.

### 9. Footer (`Footer.tsx`)
Comprehensive footer with status indicators (System Operational, Security Level, Performance), links categorized by Platform/Company/Resources, and legal pages.

---

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | `#00BFFF` | Primary accent, highlights |
| Neon Green | `#00FF7F` | Success, energy metrics |
| Deep Purple | `#C800FF` | Warnings, secondary accent |
| Cyan | `#00FFFF` | Tertiary accent, tech elements |
| Deep Black | `#0a0e27` | Main background |
| Dark Navy | `#0f1535` | Card backgrounds |
| Gray | `#999999` | Text secondary |

### Typography & Animation
- **Headings:** Bold, high contrast (white on dark background).
- **Technical Text:** Monospace for code, domains (`@polimetalruedas.com.ar`), and metrics.
- **Transitions:** 100-200ms interaction scale, 300-600ms entrance slide/fade using Framer Motion and GPU-accelerated CSS.

---

## Data Flow & State Management

### Frontend State Management
- **React Hooks:** `useState`, `useEffect`, `useRef`, `useMemo`.
- **tRPC Client Integration:**
  - `trpc.ai.analyzeLLM.useMutation()` for AI context calls.
  - `trpc.auth.me.useQuery()` for user and domain authentication checks.
  - `trpc.auth.logout.useMutation()` for session termination.

### Backend Procedures
- **Public Procedures:**
  - `auth.me` - Retrieve current authenticated user and domain context.
  - `auth.logout` - Destroy session.
  - `ai.analyzeLLM` - Process operational inputs.
- **Protected Procedures:**
  - `system.notifyOwner` - Dispatch domain alerts and role notifications.
  - `system.health` - Monitor system health status.

---

## Security & Access Control Guardrails

1. **Strict Domain Matching:** Email addresses must explicitly match the registered domain (e.g., `*@polimetalruedas.com.ar`).
2. **Role Authorization:** Access to key analyzer settings and result exports is restricted to designated IT, Maintenance, Engineering, and Process leads.
3. **Session Security:** Manus OAuth integration with HTTPS/TLS-only cookies.
4. **Audit Trail:** Complete logging for governance and compliance.

---

## File Structure

---

## Development Workflow

### Local Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run test suite
pnpm test

# Type checking
pnpm check

# Format codebase
pnpm format

# Generate migration schema
pnpm drizzle-kit generate

# Apply migrations
pnpm drizzle-kit migrate