import { Check, ChevronRight, Circle, Clipboard, Code2, RotateCcw, ShieldCheck, Sparkles, Terminal, WandSparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Scenario = {
  id: string;
  label: string;
  question: string;
  title: string;
  intro: string;
  steps: readonly string[];
  answer: string;
  command: string;
};

const examples: readonly Scenario[] = [
  {
    id: "starter", label: "Starter", question: "How can I run a real agent-response demo?",
    title: "Run the local demo in minutes.",
    intro: "The starter includes a small Node HTTP server, local responses and a browser UI. It never contacts an AI provider.",
    steps: ["Choose a runnable starter", "Run local quality tests", "Start the demo server"],
    answer: "Use the included example as a foundation for your own UI. Its response data is deterministic, so it works without API keys.",
    command: "node examples/agent-response-starter/server.mjs",
  },
  {
    id: "mcp", label: "MCP", question: "What should a safe MCP connector declare?",
    title: "Permissions before execution.",
    intro: "Design the contract before wiring an external service. A connector should disclose capabilities and permissions.",
    steps: ["Declare tools and schemas", "Limit server-side credentials", "Review tool results and errors"],
    answer: "Keep credentials on the server, validate every argument and make potentially sensitive actions explicitly reviewable.",
    command: "cat docs/PLUGIN-CONTRACT.md",
  },
  {
    id: "skill", label: "Agent skill", question: "Is there a portable skill to learn from?",
    title: "Start with WILENNY.",
    intro: "The repository includes a portable agent skill with documentation, templates and local evaluation scenarios.",
    steps: ["Inspect the skill entrypoint", "Review capabilities and constraints", "Run the bundled evaluations"],
    answer: "WILENNY is an example of documented capability routing. Its published artifacts describe boundaries instead of promising secret capabilities.",
    command: "npm run evals",
  },
];

export function AgentResponseShowcase() {
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const example = examples[selected];

  useEffect(() => {
    if (!isPlaying || progress >= 3) return;
    const timer = window.setTimeout(() => setProgress(value => Math.min(value + 1, 3)), 650);
    return () => window.clearTimeout(timer);
  }, [isPlaying, progress, selected]);

  useEffect(() => {
    if (progress === 3) setIsPlaying(false);
  }, [progress]);

  const changeExample = (index: number) => {
    setSelected(index);
    setProgress(3);
    setIsPlaying(false);
    setCopyStatus("idle");
  };

  const replay = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setProgress(0);
    setCopyStatus("idle");
    setIsPlaying(!reducedMotion);
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(example.command);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("manual");
    }
  };

  return (
    <section className="agent-response" id="playground" aria-label="Interactive simulated agent response showcase">
      <div className="agent-response__bar">
        <div className="agent-response__identity">
          <span className="agent-response__logo"><Sparkles size={16} aria-hidden="true" /></span>
          <span><strong>Meridian / Agent Lab</strong><small>Interactive local simulation</small></span>
        </div>
        <span className="agent-response__preview"><Circle size={7} fill="currentColor" aria-hidden="true" /> DEMO</span>
      </div>
      <div className="agent-response__tabs" role="group" aria-label="Choose an agent demonstration">
        {examples.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={index === selected}
            className={index === selected ? "is-active" : ""} onClick={() => changeExample(index)}>{item.label}</button>
        ))}
      </div>
      <div className="agent-response__thread">
        <div className="agent-response__prompt"><span>You</span><p>{example.question}</p></div>
        <div className="agent-response__reply">
          <div className="agent-response__avatar"><WandSparkles size={16} aria-hidden="true" /></div>
          <div className="agent-response__content">
            <div className="agent-response__response-top">
              <strong>Meridian</strong>
              <span><ShieldCheck size={12} aria-hidden="true" /> Example data</span>
            </div>
            <h2>{progress === 0 ? "Preparing response…" : example.title}</h2>
            <p>{progress === 0 ? "Walking through the selected example." : example.intro}</p>
            <div className="agent-response__activity" aria-label="Illustrative agent workflow">
              <div className="agent-response__activity-header"><Terminal size={14} aria-hidden="true" />
                <strong>Example workflow</strong><span>{Math.min(progress,3)}/3</span></div>
              {example.steps.map((step,index) => (
                <div className={index < progress ? "agent-response__step is-done" : "agent-response__step"} key={step}>
                  <span>{index < progress ? <Check size={12} aria-hidden="true"/> : <Circle size={11} aria-hidden="true"/>}</span>
                  {step}
                  {index === progress && isPlaying ? <span className="agent-response__pulse" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
            {progress === 3 ? <div className="agent-response__result" role="status">
              <strong><ShieldCheck size={15} aria-hidden="true" /> What you can try</strong>
              <p>{example.answer}</p>
              <div className="agent-response__terminal"><Code2 size={14} aria-hidden="true" />
                <code>{example.command}</code>
                <button type="button" onClick={copyCommand} aria-label="Copy example command" title="Copy command">
                  {copyStatus === "copied" ? <Check size={15}/> : <Clipboard size={15}/>}</button>
              </div>
              <span className="agent-response__copy-note" aria-live="polite">
                {copyStatus === "copied" ? "Command copied." : copyStatus === "manual" ?
                  "Clipboard access is unavailable. Select the command above to copy it manually." :
                  "Run commands locally from the repository root."}
              </span>
            </div> : <p className="agent-response__waiting" role="status">Playing the UI sequence — no network or AI request is made.</p>}
          </div>
        </div>
      </div>
      <div className="agent-response__footer">
        <span><ShieldCheck size={13} aria-hidden="true" /> Simulated UI · not a live AI service</span>
        <div>
          <button type="button" onClick={replay}><RotateCcw size={14} aria-hidden="true" /> Replay</button>
          {progress < 3 ? (
            <>
              <button type="button" onClick={() => setIsPlaying(value => !value)}>
                {isPlaying ? "Pause" : "Resume"}
              </button>
              <button type="button" onClick={() => {
                setIsPlaying(false);
                setProgress(value => Math.min(value + 1, 3));
              }}>Next step</button>
            </>
          ) : null}
          <a href="#directory">Explore <ChevronRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
