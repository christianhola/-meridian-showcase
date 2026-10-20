import { desktopCall } from './desktopAutonomy';

export type AgentToolDecision =
  | {kind:'answer';text:string;modelUsed:true}
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
  if (selected.kind==='answer' && typeof selected.text==='string' && selected.text.length<=5000) return selected;
  if (selected.kind==='tool_call' && selected.tool==='desktop.run_local_task'
    && selected.arguments?.task===prompt && selected.arguments.agent===agent) return selected;
  throw Error('El servidor devolvió una herramienta no autorizada');
}
