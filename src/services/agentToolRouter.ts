import { desktopCall } from './desktopAutonomy';

export type AgentToolDecision =
  | {kind:'answer';text:string;modelUsed:true;sources?:string[]}
  | {kind:'tool_call';tool:'desktop.run_local_task';arguments:{task:string;agent:string};requiresApproval:false};

const AGENTS=new Set(['Architect','Coder','Researcher','Growth','Browser','Reviewer']);
export async function chooseAgentAction(
  ownerSession:string,agent:string,prompt:string
):Promise<AgentToolDecision> {
  if (!ownerSession || !AGENTS.has(agent) || !prompt.trim() || prompt.length>600) {
    throw Error('Solicitud inválida para el agente privado');
  }
  const selected=await desktopCall<AgentToolDecision>(
    ownerSession,'/api/agents/plan','POST',{agent,prompt},45000
  );
  if (selected.kind==='answer' && typeof selected.text==='string' && selected.text.length<=5000) {
    // Render only grounded, canonical links reported by the authenticated backend.
    const sources=Array.isArray(selected.sources)
      ? selected.sources.filter(url=>typeof url==='string' &&
          /^https:\/\/github\.com\/christianhola\/(?:-meridian-showcase|meridian-agents-v2)\/(?:blob|tree)\/main(?:\/[-a-zA-Z0-9_./+@%]*)?$/.test(url)).slice(0,5)
      : [];
    return {...selected,sources};
  }
  if (selected.kind==='tool_call' && selected.tool==='desktop.run_local_task'
    && selected.arguments?.task===prompt && selected.arguments.agent===agent) return selected;
  throw Error('El servidor devolvió una herramienta no autorizada');
}
