// ─────────────────────────────────────────────────────────────────────────────
// EmptyState — placeholder for stub / coming-soon panels
// ─────────────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  icon?: "construction" | "inbox" | "check";
}

const ICONS = {
  construction: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.4">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" strokeLinecap="round" />
      <path d="M2 12l10 5 10-5" strokeLinecap="round" />
    </svg>
  ),
  inbox: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.4">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.4">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function EmptyState({ title, description, action, icon = "construction" }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 32px",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 10,
        textAlign: "center",
        gap: 12,
      }}
    >
      {ICONS[icon]}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: 0 }}>{title}</h3>
      {description && (
        <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, maxWidth: 320 }}>{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          style={{
            marginTop: 8,
            padding: "9px 20px",
            background: "#7A0C0C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
