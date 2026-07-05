import { useState } from "react";
import type { UserContext } from "../types";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { StatCardRow } from "../components/StatCard";
import { ActionQueueList } from "../components/ActionQueueList";
import { ProcurementTable } from "../components/ProcurementTable";
import { EmptyState } from "../components/EmptyState";
import { StatusBadge } from "../components/StatusBadge";
import { MOCK_PROCUREMENTS, getActionQueueForRole, formatLKR } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// Tender Board Dashboard
// Tabs: Dashboard · Approvals · All Procurements
// ─────────────────────────────────────────────────────────────────────────────

interface TBDashboardProps {
  user: UserContext;
  activeTab: string;
  onTabChange: (key: string) => void;
  onViewProcurement: (id: string) => void;
}

export function TBDashboard({ user, activeTab, onTabChange, onViewProcurement }: TBDashboardProps) {
  if (activeTab === "approvals")    return <ApprovalsPanel />;
  if (activeTab === "procurements") return <AllProcurementsPanel onViewProcurement={onViewProcurement} />;
  return <TBOverview user={user} onTabChange={onTabChange} />;
}

function TBOverview({ user, onTabChange }: { user: UserContext; onTabChange: (k: string) => void }) {
  const queue = getActionQueueForRole("TB");
  return (
    <div style={{ padding: "28px 32px" }}>
      <WelcomeBanner user={user} />
      <StatCardRow total={MOCK_PROCUREMENTS.length} inQueue={queue.length} actionRequired={queue.length} completed={2} />
      <ActionQueueList items={queue} onViewAll={() => onTabChange("approvals")} onItemClick={() => onTabChange("approvals")} />
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 10, padding: "18px 20px" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", margin: 0, marginBottom: 12 }}>Tender Board Responsibilities</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          {["Review BES reports submitted by TEC", "Approve or reject BES recommendations", "Authorise Purchase Orders for approved procurements", "Ensure compliance with Procurement Manual 2024 (NPC)"].map(s => (
            <li key={s} style={{ fontSize: 12, color: "#4B5563" }}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ApprovalsPanel() {
  const items = MOCK_PROCUREMENTS.filter(p => p.status === "Technical Evaluation");
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  const decide = (id: string, verdict: "approved" | "rejected") => {
    setDecisions(p => ({ ...p, [id]: verdict }));
  };

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 2 }}>Approvals</h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>Review BES reports and authorise purchase orders</p>
      </div>

      {items.length === 0 ? (
        <EmptyState icon="inbox" title="No BES reports pending review" description="Tender Board items will appear once TEC submits evaluation reports." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map(pr => {
            const decision = decisions[pr.id];
            return (
              <div
                key={pr.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "20px 24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", fontFamily: "monospace" }}>{pr.id}</span>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "4px 0" }}>{pr.title}</h3>
                    <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{pr.faculty} · {formatLKR(pr.value)} · Method: {pr.method}</p>
                  </div>
                  {decision ? (
                    <StatusBadge status={decision === "approved" ? "Purchase Order Issued" : "Rejected"} size="md" />
                  ) : (
                    <StatusBadge status={pr.status} size="md" />
                  )}
                </div>

                {!decision && (
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button
                      onClick={() => decide(pr.id, "rejected")}
                      style={{ padding: "8px 20px", background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                    >
                      Reject BES
                    </button>
                    <button
                      onClick={() => decide(pr.id, "approved")}
                      style={{ padding: "8px 20px", background: "#15803D", color: "#FFFFFF", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                    >
                      Approve & Issue PO
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AllProcurementsPanel({ onViewProcurement }: { onViewProcurement: (id: string) => void }) {
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 2 }}>All Procurements</h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>{MOCK_PROCUREMENTS.length} records</p>
      </div>
      <ProcurementTable procurements={MOCK_PROCUREMENTS} title="" subtitle="" onViewProcurement={onViewProcurement} />
    </div>
  );
}
