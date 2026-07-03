// ─────────────────────────────────────────────────────────────────────────────
// UPMS Dashboard — Shared Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

/** The 8 roles in the procurement system */
export type Role =
  | "HOD"   // Head of Department
  | "BUR"   // Bursar
  | "SDC"   // Supplies Division Clerk
  | "TEC"   // TEC Member
  | "TB"    // Tender Board Member
  | "STK"   // Storekeeper
  | "SUP"   // Supplier / Bidder
  | "FIN";  // Finance Division

/** Human-readable role metadata */
export const ROLE_META: Record<Role, { label: string; description: string }> = {
  HOD: { label: "Head of Department",    description: "Create requisitions, approve <500k, submit quality reports" },
  BUR: { label: "Bursar",                description: "Verify fund availability before procurement proceeds" },
  SDC: { label: "Supplies Division Clerk", description: "Select method, manage suppliers, coordinate bid opening" },
  TEC: { label: "TEC Member",            description: "Preliminary, technical & financial evaluation (>500k)" },
  TB:  { label: "Tender Board Member",   description: "Approve BES reports and authorise purchase orders" },
  STK: { label: "Storekeeper",           description: "Generate GRN upon goods receipt" },
  SUP: { label: "Supplier / Bidder",     description: "Submit sealed bids with bid bond & VAT declaration" },
  FIN: { label: "Finance Division",      description: "Process payments after quality report approval" },
};

/** A single navigation tab rendered in the top bar */
export interface NavTab {
  key: string;
  label: string;
}

/** Nav tabs available per role */
export const ROLE_NAV_TABS: Record<Role, NavTab[]> = {
  HOD: [
    { key: "dashboard",       label: "Dashboard" },
    { key: "new-requisition", label: "New Requisition" },
    { key: "procurements",    label: "All Procurements" },
  ],
  BUR: [
    { key: "dashboard",        label: "Dashboard" },
    { key: "fund-verification", label: "Fund Verification" },
    { key: "procurements",     label: "All Procurements" },
  ],
  SDC: [
    { key: "dashboard",       label: "Dashboard" },
    { key: "method",          label: "Method Selection" },
    { key: "suppliers",       label: "Suppliers" },
    { key: "bidding",         label: "Bidding" },
    { key: "procurements",    label: "All Procurements" },
  ],
  TEC: [
    { key: "dashboard",    label: "Dashboard" },
    { key: "evaluations",  label: "Evaluations" },
    { key: "procurements", label: "All Procurements" },
  ],
  TB: [
    { key: "dashboard",    label: "Dashboard" },
    { key: "approvals",    label: "Approvals" },
    { key: "procurements", label: "All Procurements" },
  ],
  STK: [
    { key: "dashboard",    label: "Dashboard" },
    { key: "grn",          label: "GRN" },
    { key: "procurements", label: "All Procurements" },
  ],
  SUP: [
    { key: "dashboard", label: "Dashboard" },
    { key: "my-bids",   label: "My Bids" },
    { key: "submit-bid", label: "Submit Bid" },
  ],
  FIN: [
    { key: "dashboard",    label: "Dashboard" },
    { key: "payments",     label: "Payments" },
    { key: "procurements", label: "All Procurements" },
  ],
};

/** Procurement status values */
export type ProcurementStatus =
  | "Pending Fund Verification"
  | "Funds Verified"
  | "Bidding Open"
  | "Technical Evaluation"
  | "Purchase Order Issued"
  | "Awaiting Delivery"
  | "Quality Report Required"
  | "Payment Pending"
  | "Completed"
  | "Rejected";

/** Procurement method */
export type ProcurementMethod = "Shopping" | "NCB" | "ICB" | "—";

/** A single procurement record */
export interface Procurement {
  id: string;           // e.g. "PR-2026-001"
  title: string;
  faculty: string;
  department?: string;
  value: number;        // LKR amount
  method: ProcurementMethod;
  status: ProcurementStatus;
  updatedAt: string;    // ISO date string
  submittedBy?: string;
  description?: string;
}

/** Logged-in user context */
export interface UserContext {
  role: Role;
  name: string;
  title: string;       // e.g. "Head of Department"
  faculty?: string;
  department?: string;
  avatarInitials: string;
}
