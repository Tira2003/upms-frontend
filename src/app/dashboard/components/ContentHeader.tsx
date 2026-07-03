import { Bell, Search, RotateCcw, ChevronDown } from "lucide-react";
import type { UserContext } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// ContentHeader — top bar inside the content area (breadcrumb + actions)
// Matches the reference design: ← → breadcrumb · right icons · Share button
// ─────────────────────────────────────────────────────────────────────────────

interface ContentHeaderProps {
  user: UserContext;
  pageTitle: string;
  pageSubtitle?: string;
}

export function ContentHeader({ user, pageTitle, pageSubtitle }: ContentHeaderProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F5F9",
        padding: "0 28px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left: breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Back/forward */}
        <div style={{ display: "flex", gap: 2, marginRight: 8 }}>
          {["←", "→"].map((arrow, i) => (
            <button
              key={arrow}
              style={{
                width: 26,
                height: 26,
                border: "1px solid #E5E7EB",
                borderRadius: 6,
                background: "#FAFAFA",
                color: i === 0 ? "#374151" : "#D1D5DB",
                cursor: i === 0 ? "pointer" : "not-allowed",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {arrow}
            </button>
          ))}
        </div>

        {/* Breadcrumb */}
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>UPMS</span>
        <span style={{ fontSize: 12, color: "#D1D5DB" }}>›</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{pageTitle}</span>
      </div>

      {/* Right: search + bell + avatar + month filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Month filter chip */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            background: "#FAFAFA",
            color: "#374151",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          This Month <ChevronDown size={12} />
        </button>

        {/* Reset */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            border: "none",
            background: "none",
            color: "#9CA3AF",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={12} /> Reset Data
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#E5E7EB" }} />

        {/* Bell */}
        <button
          style={{
            width: 32,
            height: 32,
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            background: "#FAFAFA",
            color: "#6B7280",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Bell size={14} />
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#EF4444",
              border: "1.5px solid white",
            }}
          />
        </button>

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7A0C0C, #5C0808)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: "#F59E0B",
            }}
          >
            {user.avatarInitials}
          </div>
          <ChevronDown size={12} color="#9CA3AF" />
        </div>

        {/* Share / Sign In button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            background: "#7A0C0C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page header inside scrollable content (title + subtitle + actions)
// ─────────────────────────────────────────────────────────────────────────────

interface PageTitleBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageTitleBar({ title, subtitle, actions }: PageTitleBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#111827",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 13, color: "#9CA3AF", margin: "4px 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
