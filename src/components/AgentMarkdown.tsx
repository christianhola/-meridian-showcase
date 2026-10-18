/** Safe, dependency-free rendering of common model Markdown. Never executes HTML. */
import { Fragment, type ReactNode } from "react";

function inline(text: string, prefix: string): ReactNode[] {
  // Markdown link targets must be explicitly HTTPS or HTTP; other schemes remain plain text.
  const tokens = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)/g;
  const items: ReactNode[] = [];
  let index = 0;
  for (const match of text.matchAll(tokens)) {
    const start = match.index ?? 0;
    if (start > index) items.push(text.slice(index, start));
    const value = match[0];
    const key = prefix + "-" + start;
    if (match[2] && match[3]) {
      items.push(<a key={key} href={match[3]} target="_blank" rel="noopener noreferrer">{match[2]}</a>);
    } else if (value.startsWith("`")) {
      items.push(<code key={key}>{value.slice(1, -1)}</code>);
    } else if (value.startsWith("**")) {
      items.push(<strong key={key}>{value.slice(2, -2)}</strong>);
    } else {
      items.push(<em key={key}>{value.slice(1, -1)}</em>);
    }
    index = start + value.length;
  }
  if (index < text.length) items.push(text.slice(index));
  return items;
}

function paragraphs(text: string, prefix: string): ReactNode[] {
  return text.split(/\n\s*\n/).map((block, i) => {
    const content = block.trim();
    if (!content) return null;
    const key = prefix + "-p-" + i;
    const heading = /^(#{1,3})\s+(.+)$/.exec(content);
    if (heading && !content.includes("\n")) {
      const child = inline(heading[2], key);
      if (heading[1].length === 1) return <h2 key={key}>{child}</h2>;
      if (heading[1].length === 2) return <h3 key={key}>{child}</h3>;
      return <h4 key={key}>{child}</h4>;
    }
    const lines = content.split("\n");
    const isList = lines.every(line => /^\s*(?:[-*•]|\d+[.)])\s+/.test(line));
    if (isList) {
      const numbered = /^\s*\d+[.)]\s+/.test(lines[0]);
      const listItems = lines.map((line,j) => <li key={key+"-li-"+j}>{inline(line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, ""), key+"-li-"+j)}</li>);
      return numbered ? <ol key={key}>{listItems}</ol> : <ul key={key}>{listItems}</ul>;
    }
    return <p key={key}>{lines.map((line,j) => <Fragment key={j}>{j > 0 && <span className="agent-markdown-break"/>}{inline(line, key+"-"+j)}</Fragment>)}</p>;
  });
}

export function AgentMarkdown({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g,"\n").split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/gm);
  return <div className="agent-markdown">{blocks.map((block,i) => {
    if (!block) return null;
    const match = /^```([^\n]*)\n([\s\S]*?)\n?```\s*$/.exec(block);
    if (match) {
      return <div className="agent-markdown-code" key={"code-"+i}>
        <div className="agent-markdown-code-header"><span>{match[1].trim() || "Código"}</span><button type="button" onClick={() => navigator.clipboard?.writeText(match[2])}>Copiar código</button></div>
        <pre><code>{match[2]}</code></pre>
      </div>;
    }
    return <Fragment key={"text-"+i}>{paragraphs(block, String(i))}</Fragment>;
  })}</div>;
}
