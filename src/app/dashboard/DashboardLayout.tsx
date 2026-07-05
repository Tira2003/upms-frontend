import { useState } from "react";
import type { Role, UserContext } from "./types";
import { Sidebar } from "./components/Sidebar";
import { ContentHeader } from "./components/ContentHeader";
import { HODDashboard } from "./views/HODDashboard";
import { BursarDashboard } from "./views/BursarDashboard";
import { SDCDashboard } from "./views/SDCDashboard";
import { TECDashboard } from "./views/TECDashboard";
import { TBDashboard } from "./views/TBDashboard";
import { StorekeeperDashboard } from "./views/StorekeeperDashboard";
import { SupplierDashboard } from "./views/SupplierDashboard";
import { FinanceDashboard } from "./views/FinanceDashboard";
import { ProcurementStatusTracker } from "./components/ProcurementStatusTracker";
import { ProcurementDetails } from "./components/ProcurementDetails";
import { MOCK_PROCUREMENTS } from "./data";

// ─────────────────────────────────────────────────────────────────────────────
// DashboardLayout — sidebar + main content shell
// Layout: [Fixed Left Sidebar 248px] | [Right: sticky header + scrollable content]
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_USERS: Record<Role, UserContext> = {
  HOD: { role: "HOD", name: "Dr. Nimal Perera",          title: "Head of Department",      faculty: "Faculty of Applied Sciences", department: "Computer Science",  avatarInitials: "NP" },
  BUR: { role: "BUR", name: "Mr. Kamal Silva",            title: "Bursar (Main)",           faculty: undefined,                     department: undefined,           avatarInitials: "KS" },
  FBUR: { role: "FBUR", name: "Mrs. Indrani Perera",     title: "Faculty Bursar",          faculty: "Faculty of Applied Sciences", department: undefined,           avatarInitials: "IP" },
  SDC: { role: "SDC", name: "Ms. Dilhani Jayasena",       title: "Supplies Division Clerk", faculty: undefined,                     department: "Supplies Division", avatarInitials: "DJ" },
  TEC: { role: "TEC", name: "Dr. Ruwan Fernando",         title: "TEC Member",              faculty: "Faculty of Engineering",      department: undefined,           avatarInitials: "RF" },
  TB:  { role: "TB",  name: "Prof. Anura Wickramasinghe", title: "Tender Board Member",     faculty: undefined,                     department: undefined,           avatarInitials: "AW" },
  STK: { role: "STK", name: "Mr. Saman Rathnayake",       title: "Storekeeper",             faculty: undefined,                     department: "Central Stores",    avatarInitials: "SR" },
  SUP: { role: "SUP", name: "Lanka Lab Supplies Co.",     title: "Supplier / Bidder",       faculty: undefined,                     department: undefined,           avatarInitials: "LL" },
  FIN: { role: "FIN", name: "Ms. Priyanka Perera",        title: "Finance Division",        faculty: undefined,                     department: "Finance Dept",      avatarInitials: "PP" },
};

/** Map nav key → page title for the breadcrumb header */
const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "dashboard":           { title: "Overview",             subtitle: "Here is the summary of overall data" },
  "new-requisition":     { title: "New Requisition",      subtitle: "Create a new purchase requisition" },
  "procurements":        { title: "All Procurements",     subtitle: "Full list of procurement records" },
  "status-tracker":      { title: "Procurement Tracker",  subtitle: "Step-by-step status and activity log" },
  "procurement-details": { title: "Procurement Details",  subtitle: "Full specification and details of the requisition" },
  "quality-report":      { title: "Quality Reports",      subtitle: "Submit quality inspection reports" },
  "fund-verification":   { title: "Fund Verification",    subtitle: "Verify budget availability" },
  "method":              { title: "Method Selection",     subtitle: "Select procurement method for verified requisitions" },
  "suppliers":           { title: "Suppliers",            subtitle: "Registered supplier directory" },
  "bidding":             { title: "Bidding",              subtitle: "Manage bid openings and supplier invitations" },
  "evaluations":         { title: "Evaluations",          subtitle: "Technical and financial bid evaluation" },
  "approvals":           { title: "Approvals",            subtitle: "Review BES reports and authorise POs" },
  "grn":                 { title: "GRN",                  subtitle: "Generate goods received notes" },
  "my-bids":             { title: "My Bids",              subtitle: "Track your submitted bids" },
  "submit-bid":          { title: "Submit Bid",           subtitle: "Submit a sealed bid for an open tender" },
  "payments":            { title: "Payments",             subtitle: "Process payments after quality report approval" },
};

interface DashboardLayoutProps {
  role: Role;
  onLogout: () => void;
}

export function DashboardLayout({ role, onLogout }: DashboardLayoutProps) {
  const user = DEMO_USERS[role];
  const [activeKey, setActiveKey] = useState<string>("dashboard");
  const [selectedProcurementId, setSelectedProcurementId] = useState<string | null>(null);

  // When a user clicks "View Status" on a procurement row, navigate to the tracker
  const handleViewProcurement = (id: string) => {
    setSelectedProcurementId(id);
    setActiveKey("status-tracker");
  };

  // When a user clicks "View Details" from action panels, navigate to the simple details sheet
  const handleViewProcurementDetails = (id: string) => {
    setSelectedProcurementId(id);
    setActiveKey("procurement-details");
  };

  // When navigating away from tracker via sidebar, clear selected
  const handleNavigate = (key: string) => {
    if (key !== "status-tracker" && key !== "procurement-details") setSelectedProcurementId(null);
    setActiveKey(key);
  };

  const selectedProcurement = selectedProcurementId
    ? MOCK_PROCUREMENTS.find(p => p.id === selectedProcurementId) ?? null
    : null;

  const pageInfo = PAGE_TITLES[activeKey] ?? { title: activeKey, subtitle: "" };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#F7F8FA",
        fontFamily: "'Inter', 'Google Sans', system-ui, sans-serif",
      }}
    >
      {/* ── Fixed Left Sidebar ────────────────────────────────────────────── */}
      <Sidebar
        user={user}
        activeKey={activeKey}
        onNavigate={handleNavigate}
        onSignOut={onLogout}
      />

      {/* ── Right column: header + scrollable content ─────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Sticky top header */}
        <ContentHeader
          user={user}
          pageTitle={pageInfo.title}
          pageSubtitle={pageInfo.subtitle}
        />

        {/* Scrollable content area */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#F7F8FA",
          }}
        >
          {/* ── Procurement Status Tracker (shared across all roles) ── */}
          {activeKey === "status-tracker" && selectedProcurement && (
            <ProcurementStatusTracker
              procurement={selectedProcurement}
              onBack={() => { setActiveKey("procurements"); setSelectedProcurementId(null); }}
            />
          )}

          {/* ── Procurement Details Sheet (shared across all roles) ── */}
          {activeKey === "procurement-details" && selectedProcurement && (
            <ProcurementDetails
              procurement={selectedProcurement}
              onBack={() => {
                setSelectedProcurementId(null);
                // Return to corresponding role action tab
                if (role === "HOD") setActiveKey("quality-report");
                else if (role === "BUR" || role === "FBUR") setActiveKey("fund-verification");
                else if (role === "SDC") setActiveKey("method");
                else if (role === "TEC") setActiveKey("evaluations");
                else if (role === "TB") setActiveKey("approvals");
                else if (role === "STK") setActiveKey("grn");
                else if (role === "FIN") setActiveKey("payments");
                else setActiveKey("dashboard");
              }}
            />
          )}

          {/* ── Role-specific views ── */}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "HOD" && (
            <HODDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && (role === "BUR" || role === "FBUR") && (
            <BursarDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "SDC" && (
            <SDCDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "TEC" && (
            <TECDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "TB" && (
            <TBDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "STK" && (
            <StorekeeperDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "SUP" && (
            <SupplierDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} />
          )}
          {activeKey !== "status-tracker" && activeKey !== "procurement-details" && role === "FIN" && (
            <FinanceDashboard user={user} activeTab={activeKey} onTabChange={setActiveKey} onViewProcurement={handleViewProcurement} onViewProcurementDetails={handleViewProcurementDetails} />
          )}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "10px 24px",
            fontSize: 11,
            color: "#CBD5E1",
            borderTop: "1px solid #F1F5F9",
            background: "#FFFFFF",
            flexShrink: 0,
          }}
        >
          University of Sri Jayewardenepura · Procurement Manual 2024 (NPC) · Prototype Demo
        </footer>
      </div>
    </div>
  );
}
