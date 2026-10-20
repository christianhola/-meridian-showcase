/** Identifies explicitly local GUI work; web/cloud tasks stay in normal chat. */
export const DESKTOP_API = 'https://meridian-virtual-desktop-production.up.railway.app';
const LOCAL_APPS = /\b(?:mousepad|libreoffice|writer|gimp|editor de texto|text editor|bloc de notas|notepad|nota local|documento local|escritorio virtual|computadora virtual|laptop virtual|sbmeridian|daytona)\b/i;
const LOCAL_ACTIONS = /\b(?:abr[ei]|open|escrib[ea]|write|redact[ae]|cre[ao]|create|dibuj[ae]|draw|edit[ae]|guarda|save|prepara|hacer|haz|realiza|utiliza|usa|trabaja|inicia)\b/i;
const RESTRICTED = /(?:contraseña|password|credencial|borrar|eliminar|delete|remove|pagar|comprar|buy|pay|enviar correo|send email|subir archivo|upload|instalar|install|chrome|firefox|navegador|browser|terminal|shell|internet|https?:\/\/|sitio web|página web)/i;

export function shouldUseDesktop(task: string): boolean {
  return task.length <= 600 && LOCAL_APPS.test(task) && LOCAL_ACTIONS.test(task) && !RESTRICTED.test(task);
}

export type LocalTaskState = {
  id: string;
  status: 'starting'|'running'|'finished'|'blocked'|'cancelled'|'limit_reached'|'error';
  step: number;
  maxSteps: number;
  message: string;
  history: Array<{step:number;type:string;message:string}>;
  outcome: 'model_reported'|null;
};

export async function desktopCall<T>(
  token:string,path:string,method='GET',body?:unknown,timeoutMs=30000
):Promise<T> {
  const response=await fetch(DESKTOP_API+path,{
    method,
    headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
    body:body===undefined?undefined:JSON.stringify(body),
    cache:'no-store',
    signal:AbortSignal.timeout(timeoutMs)
  });
  const payload=await response.json().catch(()=>({error:'Respuesta inválida del servicio de escritorio'}));
  if(!response.ok) throw new Error(String(payload.error||'La computadora virtual no respondió'));
  return payload as T;
}
