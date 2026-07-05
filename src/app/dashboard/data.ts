import type { Procurement, ProcurementStatus } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// UPMS Dashboard — Shared Mock Data
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_PROCUREMENTS: Procurement[] = [
  {
    id: "PR-2026-001",
    title: "Laboratory Microscopes",
    faculty: "Faculty of Applied Sciences",
    department: "Biology",
    value: 320000,
    method: "—",
    status: "Pending Fund Verification",
    updatedAt: "2026-02-10T13:30:00Z",
    submittedBy: "Dr. Nimal Perera",
    description: "10× binocular compound microscopes for undergraduate biology practicals.",
  },
  {
    id: "PR-2026-002",
    title: "Office Stationery",
    faculty: "Faculty of Applied Sciences",
    department: "Computer Science",
    value: 185000,
    method: "—",
    status: "Funds Verified",
    updatedAt: "2026-02-08T20:00:00Z",
    submittedBy: "Dr. Nimal Perera",
    description: "Annual stationery supply for the Computer Science department.",
  },
  {
    id: "PR-2026-003",
    title: "Network Switches",
    faculty: "Faculty of Applied Sciences",
    department: "IT Unit",
    value: 1250000,
    method: "Shopping",
    status: "Bidding Open",
    updatedAt: "2026-02-01T16:30:00Z",
    submittedBy: "Dr. Kumari Fernando",
    description: "24-port managed gigabit switches for campus network upgrade.",
  },
  {
    id: "PR-2026-004",
    title: "Auditorium AV System",
    faculty: "Faculty of Management Studies",
    department: "Management",
    value: 4500000,
    method: "NCB",
    status: "Technical Evaluation",
    updatedAt: "2026-07-03T23:02:00Z",
    submittedBy: "Prof. Saman Wickramasinghe",
    description: "Full AV system including projectors, PA, and control systems.",
  },
  {
    id: "PR-2026-005",
    title: "Chemistry Lab Chemicals",
    faculty: "Faculty of Applied Sciences",
    department: "Chemistry",
    value: 275000,
    method: "Shopping",
    status: "Purchase Order Issued",
    updatedAt: "2026-02-15T14:30:00Z",
    submittedBy: "Dr. Nimal Perera",
    description: "Reagents and consumables for undergraduate chemistry labs.",
  },
  {
    id: "PR-2026-006",
    title: "Library Books",
    faculty: "Faculty of Engineering",
    department: "Library",
    value: 420000,
    method: "Shopping",
    status: "Awaiting Delivery",
    updatedAt: "2026-02-20T13:30:00Z",
    submittedBy: "Mr. Chathura Jayasena",
    description: "Set of 250 engineering reference books for faculty library expansion.",
  },
  {
    id: "PR-2026-007",
    title: "Desktop Computers",
    faculty: "Faculty of Humanities",
    department: "IT Unit",
    value: 2800000,
    method: "NCB",
    status: "Quality Report Required",
    updatedAt: "2026-03-01T15:30:00Z",
    submittedBy: "Dr. Nilmini Silva",
    description: "50× desktop computers for academic staff workstations.",
  },
  {
    id: "PR-2026-008",
    title: "Air Conditioning Units",
    faculty: "Faculty of Medical Sciences",
    department: "Facilities",
    value: 890000,
    method: "Shopping",
    status: "Payment Pending",
    updatedAt: "2026-03-02T19:30:00Z",
    submittedBy: "Dr. Premal Gamage",
    description: "5× inverter AC units (18000 BTU) for Lecture Hall B renovation.",
  },
];

/** Helper: format LKR value */
export function formatLKR(value: number): string {
  if (value >= 1_000_000) {
    return `LKR ${(value / 1_000_000).toFixed(1)}M`;
  }
  return `LKR ${value.toLocaleString("en-LK")}`;
}

/** Filter procurements visible to a given role */
export function getProcurementsForRole(role: string): Procurement[] {
  // In a real system this would be server-side filtered.
  // For the demo all roles see all procurements except SUP (suppliers see bidding-open only).
  if (role === "SUP") {
    return MOCK_PROCUREMENTS.filter(p =>
      p.status === "Bidding Open" || p.status === "Technical Evaluation"
    );
  }
  return MOCK_PROCUREMENTS;
}

/** Get procurements that require action for a given role */
export function getActionQueueForRole(role: string): Procurement[] {
  const map: Record<string, ProcurementStatus[]> = {
    HOD: ["Quality Report Required"],
    BUR: ["Pending Fund Verification"],
    SDC: ["Funds Verified"],
    TEC: ["Technical Evaluation"],
    TB:  ["Technical Evaluation"],
    STK: ["Awaiting Delivery"],
    SUP: ["Bidding Open"],
    FIN: ["Payment Pending"],
  };
  const statuses = map[role] ?? [];
  return MOCK_PROCUREMENTS.filter(p => statuses.includes(p.status));
}


