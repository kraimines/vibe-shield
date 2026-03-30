export type UserRole = 'employee' | 'manager' | 'direction';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  projects: string[];
  performance: number;
  hoursThisMonth: number;
  leaveBalance: number;
  skills: { name: string; score: number }[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed' | 'delayed';
  budget: number;
  consumed: number;
  manager: string;
  team: string[];
  startDate: string;
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  revenue: number;
  trend: number;
  projects: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: 'rh' | 'crm' | 'erp' | 'rag';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface SimulationScenario {
  type: string;
  params: Record<string, number | string[]>;
}

export interface ScenarioMetrics {
  revenueImpact: number;
  projectsAtRisk: number;
  employeesAffected: number;
  recoveryMonths: number;
}

export interface SimulationResult {
  scenario: string;
  pessimistic: ScenarioMetrics;
  realistic: ScenarioMetrics;
  optimistic: ScenarioMetrics;
  aiAnalysis: string;
  recommendations: { scenario: string; risk: string; actions: string[] }[];
  propagationNodes: PropagationNode[];
  projections: MonthlyProjection[];
}

export interface PropagationNode {
  id: string;
  label: string;
  type: 'client' | 'project' | 'employee' | 'department' | 'finance';
  x: number;
  y: number;
  impacted: boolean;
  connections: string[];
}

export interface MonthlyProjection {
  month: string;
  current: number;
  pessimistic: number;
  realistic: number;
  optimistic: number;
}

export interface Activity {
  id: string;
  type: 'commit' | 'leave' | 'meeting' | 'delivery';
  text: string;
  time: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  text: string;
  action: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Opportunity {
  stage: string;
  count: number;
  value: number;
}
