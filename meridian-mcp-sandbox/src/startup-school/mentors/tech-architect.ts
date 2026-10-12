/** Meridian Startup School — Tech Architect. */
export interface ArchitectureBrief {
  product: string;
  users: string;
  coreWorkflow: string;
  integrations?: string[];
  sensitivity?: "public" | "internal" | "sensitive";
}

export interface ArchitectureAdvice {
  bot: "meridian-tech-architect";
  stack: { frontend: string; backend: string; database: string; agent: string };
  modules: string[];
  mcpBoundaries: string[];
  security: string[];
  buildOrder: string[];
  mode: "simulation" | "provider-ready";
}

export class TechArchitectBot {
  public advise(brief: ArchitectureBrief): ArchitectureAdvice {
    const sensitive = brief.sensitivity === "sensitive";
    return {
      bot: "meridian-tech-architect",
      stack: {
        frontend: "Next.js App Router + TypeScript + Tailwind",
        backend: "Route handlers / server actions with typed domain services",
        database: "PostgreSQL (Supabase or Neon) with tenant_id and RLS",
        agent: "Vercel AI SDK + MCP tool adapters with explicit permissions",
      },
      modules: [
        "Identity and organization tenancy",
        "Core workflow and audit events",
        "Agent orchestration with tool budgets",
        "Observability, evaluations and human approval queue",
      ],
      mcpBoundaries: [
        "Read-only tools by default; writes require capability flags.",
        "Validate tool inputs with JSON Schema before execution.",
        "Return citations and source timestamps for research tools.",
      ],
      security: [
        "Never put provider keys in the browser or committed files.",
        sensitive ? "Encrypt sensitive fields and redact them from traces." : "Classify data before adding external connectors.",
        "Use per-tenant RLS, least privilege and revocable connector tokens.",
      ],
      buildOrder: [
        "Define the golden user workflow and failure states.",
        "Ship local simulation with fixtures and contract tests.",
        "Add one read-only connector and measure usefulness.",
        "Add writes only after approval UX and audit logs exist.",
      ],
      mode: "simulation",
    };
  }
}
