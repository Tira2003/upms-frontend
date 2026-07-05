import { useState } from "react";
import { Plus, TrendingUp, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { StatCardRow } from "../components/StatCard";
import type { UserContext } from "../types";
import { PageTitleBar } from "../components/ContentHeader";
import { ActionQueueList } from "../components/ActionQueueList";
import { ProcurementTable } from "../components/ProcurementTable";
import { StatusBadge } from "../components/StatusBadge";
import { MOCK_PROCUREMENTS, getActionQueueForRole, formatLKR } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// HOD Dashboard — Head of Department
// ─────────────────────────────────────────────────────────────────────────────

interface HODDashboardProps {
  user: UserContext;
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function HODDashboard({ user, activeTab, onTabChange }: HODDashboardProps) {
  if (activeTab === "new-requisition") return <NewRequisitionPanel onSubmit={() => onTabChange("dashboard")} />;
  if (activeTab === "procurements")    return <AllProcurementsPanel />;
  if (activeTab === "quality-report")  return <QualityReportPanel />;
  return <HODOverview user={user} onTabChange={onTabChange} />;
}



// ── HOD Overview ─────────────────────────────────────────────────────────────
function HODOverview({ user, onTabChange }: { user: UserContext; onTabChange: (k: string) => void }) {
  const queue = getActionQueueForRole("HOD");
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "28px 32px 40px" }}>
      {/* Welcome Banner */}
      <WelcomeBanner user={user} />

      {/* 4 Stat Cards */}
      <StatCardRow
        total={MOCK_PROCUREMENTS.length}
        inQueue={3}
        actionRequired={queue.length}
        completed={0}
      />

      {/* Create Purchase Requisition button */}
      <button
        onClick={() => onTabChange("new-requisition")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 20px",
          background: "#7A0C0C",
          color: "#FFFFFF",
          border: "none",
          borderRadius: 9,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        <Plus size={14} strokeWidth={2.5} />
        Create Purchase Requisition
      </button>

      {/* ── Bottom: Recent Procurements table ── */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 14,
          border: "1px solid #F1F5F9",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: 0 }}>Recent Activities</h3>
            <p style={{ fontSize: 11, color: "#9CA3AF", margin: "3px 0 0" }}>Latest procurement requests</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid #E5E7EB", borderRadius: 7, background: "#FAFAFA" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  fontSize: 12,
                  color: "#374151",
                  width: 140,
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ border: "none", background: "none", cursor: "pointer", color: "#9CA3AF", padding: 0, lineHeight: 1 }}
                >✕</button>
              )}
            </div>
            {/* Filter */}
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid #E5E7EB", borderRadius: 7, background: "#FAFAFA", color: "#374151", fontSize: 12, cursor: "pointer" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFA" }}>
                <th style={thStyle}></th>
                <th style={thStyle}>Activity</th>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Faculty</th>
                <th style={thStyle}>Value</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PROCUREMENTS.filter(pr => {
                const q = search.toLowerCase();
                return !q ||
                  pr.title.toLowerCase().includes(q) ||
                  pr.id.toLowerCase().includes(q) ||
                  pr.faculty.toLowerCase().includes(q) ||
                  pr.status.toLowerCase().includes(q) ||
                  (pr.department ?? "").toLowerCase().includes(q);
              }).slice(0, 8).map((pr, i) => (
                <tr
                  key={pr.id}
                  style={{ borderBottom: "1px solid #F9FAFB" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 10px 12px 20px" }}>
                    <input type="checkbox" style={{ width: 14, height: 14, accentColor: "#7A0C0C", cursor: "pointer" }} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: ["#FEF3C7","#F0FDF4","#EFF6FF","#F5F3FF","#FEF2F2"][i % 5],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                          color: ["#B45309","#15803D","#1D4ED8","#6D28D9","#B91C1C"][i % 5],
                          flexShrink: 0,
                        }}
                      >
                        PR
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {pr.title}
                        </div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{pr.department ?? pr.faculty}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", fontFamily: "monospace" }}>{pr.id}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{pr.faculty.replace("Faculty of ", "")}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#B45309" }}>{formatLKR(pr.value)}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={pr.status} />
                  </td>
                  <td style={{ padding: "12px 20px 12px 10px" }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer", color: "#D1D5DB" }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Card components ───────────────────────────────────────────────────────────

function HeroStatCard({ title, subtitle, value, badge, badgeUp, linkLabel, onClick }: {
  title: string; subtitle: string; value: string; badge: string;
  badgeUp: boolean; linkLabel: string; onClick: () => void;
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #7A0C0C 0%, #5C0808 100%)",
        borderRadius: 14,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Decorative circle */}
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{subtitle}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>{value}</div>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: badgeUp ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)", color: badgeUp ? "#4ADE80" : "#FCA5A5" }}>
            {badge} {badgeUp ? "↑" : "↓"}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{title}</div>
      </div>
      <button
        onClick={onClick}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.6)",
          fontSize: 12,
          padding: 0,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 4,
          paddingTop: 6,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          width: "100%",
        }}
      >
        {linkLabel} <ArrowUpRight size={12} />
      </button>
    </div>
  );
}

function RegularStatCard({ icon, iconBg, title, subtitle, value, badge, badgeUp, linkLabel, onClick, highlight }: {
  icon: React.ReactNode; iconBg: string; title: string; subtitle: string;
  value: string; badge: string; badgeUp: boolean; linkLabel: string;
  onClick: () => void; highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        padding: "20px",
        border: highlight ? "1.5px solid #FCA5A5" : "1px solid #F1F5F9",
        boxShadow: highlight ? "0 0 0 3px rgba(239,68,68,0.06)" : "0 1px 4px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", color: "#D1D5DB" }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>{subtitle}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: highlight ? "#991B1B" : "#111827" }}>{value}</div>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: highlight ? "#FEE2E2" : badgeUp ? "#F0FDF4" : "#FEF3C7", color: highlight ? "#991B1B" : badgeUp ? "#15803D" : "#B45309" }}>
            {badge}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{title}</div>
      </div>
      <button
        onClick={onClick}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          color: highlight ? "#991B1B" : "#7A0C0C",
          fontSize: 12,
          fontWeight: 600,
          padding: 0,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 4,
          paddingTop: 6,
          borderTop: "1px solid #F3F4F6",
          width: "100%",
        }}
      >
        {linkLabel} <ArrowUpRight size={12} />
      </button>
    </div>
  );
}

// ── Table style ───────────────────────────────────────────────────────────────
const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 16px",
  fontSize: 11,
  fontWeight: 700,
  color: "#9CA3AF",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  borderBottom: "1px solid #F3F4F6",
};

// ── Sub-panels ────────────────────────────────────────────────────────────────
function NewRequisitionPanel({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState({ title: "", faculty: "", department: "", description: "", value: "", justification: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ padding: "28px 28px" }}>
        <div style={{ maxWidth: 500, margin: "40px auto", background: "#FFFFFF", borderRadius: 14, padding: "40px", textAlign: "center", border: "1px solid #F1F5F9" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0, marginBottom: 8 }}>Requisition Submitted!</h3>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 20px" }}>Sent to the Bursar for fund verification.</p>
          <button onClick={onSubmit} style={{ padding: "10px 24px", background: "#7A0C0C", color: "#FFFFFF", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 28px" }}>
      <PageTitleBar title="New Requisition" subtitle="Complete the form to create a purchase requisition" />
      <div style={{ maxWidth: 720, background: "#FFFFFF", border: "1px solid #F1F5F9", borderRadius: 14, padding: "28px", display: "flex", flexDirection: "column", gap: 18 }}>
        <FormRow label="Requisition Title" required>
          <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Laboratory Microscopes — Biology Dept" style={inputStyle} />
        </FormRow>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormRow label="Faculty" required>
            <select required value={form.faculty} onChange={e => setForm(p => ({ ...p, faculty: e.target.value }))} style={inputStyle}>
              <option value="">Select faculty…</option>
              {["Faculty of Applied Sciences","Faculty of Management Studies","Faculty of Engineering","Faculty of Humanities","Faculty of Medical Sciences"].map(f => <option key={f}>{f}</option>)}
            </select>
          </FormRow>
          <FormRow label="Department">
            <input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Biology" style={inputStyle} />
          </FormRow>
        </div>
        <FormRow label="Estimated Value (LKR)" required>
          <input required type="number" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} placeholder="e.g. 320000" style={inputStyle} />
        </FormRow>
        <FormRow label="Description" required>
          <textarea required rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe items/services required…" style={{ ...inputStyle, resize: "vertical" as const }} />
        </FormRow>
        <FormRow label="Justification">
          <textarea rows={2} value={form.justification} onChange={e => setForm(p => ({ ...p, justification: e.target.value }))} placeholder="Why is this procurement necessary?" style={{ ...inputStyle, resize: "vertical" as const }} />
        </FormRow>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button type="button" onClick={onSubmit} style={{ padding: "9px 20px", background: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button type="button" onClick={() => { if (form.title && form.value) setSubmitted(true); }} style={{ padding: "9px 24px", background: "#7A0C0C", color: "#FFFFFF", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Submit Requisition</button>
        </div>
      </div>
    </div>
  );
}

function AllProcurementsPanel() {
  return (
    <div style={{ padding: "28px 28px" }}>
      <PageTitleBar title="All Procurements" subtitle={`${MOCK_PROCUREMENTS.length} records visible for your role`} />
      <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid #F1F5F9", overflow: "hidden" }}>
        <ProcurementTable procurements={MOCK_PROCUREMENTS} title="" subtitle="" />
      </div>
    </div>
  );
}

function QualityReportPanel() {
  const needsReport = MOCK_PROCUREMENTS.filter(p => p.status === "Quality Report Required");
  return (
    <div style={{ padding: "28px 28px" }}>
      <PageTitleBar title="Quality Reports" subtitle="Submit inspection reports for delivered goods" />
      {needsReport.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "48px", textAlign: "center", color: "#9CA3AF", border: "1px solid #F1F5F9" }}>No quality reports pending</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {needsReport.map(pr => (
            <div key={pr.id} style={{ background: "#FFFFFF", border: "1px solid #F1F5F9", borderRadius: 14, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", fontFamily: "monospace" }}>{pr.id}</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "4px 0" }}>{pr.title}</h3>
                <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{pr.faculty} · {formatLKR(pr.value)}</p>
              </div>
              <button style={{ padding: "9px 20px", background: "#7A0C0C", color: "#FFFFFF", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Submit Report</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FormRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}{required && <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", background: "#FFFFFF", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
