// Read-only GitHub repository tools for the owner-authenticated Meridian agents.
// Intentionally no GitHub secrets, private repo access, mutation or shell execution.
// Never follow model-supplied URLs: the only hosts and repositories are fixed here.
const API='https://api.github.com';
const PROJECTS=Object.freeze([
  'christianhola/-meridian-showcase',
  'christianhola/meridian-agents-v2',
]);
const MAX_TREE=180;
const MAX_FILE_CHARS=14000;
const MAX_FILE_BYTES=70000;
const BLOCKED_PART=/(^|\/)(?:\.env(?:\..*)?|\.git|node_modules|\.next|dist|coverage|secrets?|credentials?|private-keys?|\.ssh)(\/|$)/i;
const BLOCKED_FILE=/(?:\.pem|\.p12|\.pfx|\.key|\.env(?:\..*)?)$/i;
const REPO_TIMEOUT_MS=8500;
const failure=(code,message)=>Object.assign(new Error(message),{code});

export const repositoryChoices=PROJECTS;
export function validateRepo(repository) {
  if (typeof repository!=='string' || !PROJECTS.includes(repository)) {
    throw failure(403,'Este agente solo puede inspeccionar los repositorios públicos autorizados de Meridian');
  }
  return repository;
}
export function validatePath(path) {
  if (typeof path!=='string' || !path || path.length>240 || path.startsWith('/') ||
      path.endsWith('/') || path.includes('\\') || path.split('/').some(x=>x==='..'||x==='.'||!x) ||
      !/^[a-zA-Z0-9_./+@-]+$/.test(path) || BLOCKED_PART.test('/'+path) || BLOCKED_FILE.test(path)) {
    throw failure(403,'Ruta de archivo no permitida');
  }
  return path;
}
const requestGitHub=async(url,fetchImpl)=>{
  let response;
  try {
    response=await fetchImpl(url,{
      method:'GET',
      headers:{'accept':'application/vnd.github+json','user-agent':'Meridian-Agents-Repository-Inspector',
        'x-github-api-version':'2022-11-28'},
      signal:AbortSignal.timeout(REPO_TIMEOUT_MS),
    });
  }catch{throw failure(502,'No se pudo conectar con GitHub para leer el repositorio');}
  if(!response.ok){
    if(response.status===404)throw failure(404,'GitHub no encontró ese archivo o repositorio público');
    if(response.status===403 || response.status===429)throw failure(429,'GitHub limitó temporalmente las consultas públicas');
    throw failure(502,'GitHub no respondió correctamente (HTTP '+response.status+')');
  }
  try{return await response.json();}catch{throw failure(502,'GitHub devolvió datos inválidos');}
};
export async function inspectRepository({tool,args,fetchImpl=fetch}){
  if(!args || typeof args!=='object' || Array.isArray(args))throw failure(400,'Parámetros del repositorio inválidos');
  const repository=validateRepo(args.repository);
  const root=API+'/repos/'+repository;
  if(tool==='list_repository_files'){
    if(Object.keys(args).sort().join(',')!=='repository')throw failure(400,'Argumentos no permitidos');
    const tree=await requestGitHub(root+'/git/trees/main?recursive=1',fetchImpl);
    if(!Array.isArray(tree.tree))throw failure(502,'GitHub no devolvió el árbol del repositorio');
    const files=tree.tree.filter(item=>item.type==='blob' && typeof item.path==='string')
      .map(item=>item.path).filter(path=>{
        try{validatePath(path);return true;}catch{return false;}
      });
    return {
      repository,branch:'main',
      count:files.length,files:files.slice(0,MAX_TREE),
      truncated:tree.truncated===true || files.length>MAX_TREE,
      source:'https://github.com/'+repository+'/tree/main',
      readonly:true
    };
  }
  if(tool==='read_repository_file'){
    if(Object.keys(args).sort().join(',')!=='path,repository')throw failure(400,'Argumentos no permitidos');
    const path=validatePath(args.path);
    const file=await requestGitHub(root+'/contents/'+path.split('/').map(encodeURIComponent).join('/')+'?ref=main',fetchImpl);
    if(file.type!=='file' || file.encoding!=='base64' || typeof file.content!=='string' ||
       typeof file.size!=='number' || file.size>MAX_FILE_BYTES) {
      throw failure(413,'El archivo no es texto accesible o supera el tamaño permitido');
    }
    const contents=Buffer.from(file.content.replace(/\s/g,''),'base64').toString('utf8');
    if(contents.includes('\u0000'))throw failure(415,'No se permite leer archivos binarios');
    const truncated=contents.length>MAX_FILE_CHARS;
    return {
      repository,path,branch:'main',contents:contents.slice(0,MAX_FILE_CHARS),
      truncated,source:'https://github.com/'+repository+'/blob/main/'+path.split('/').map(encodeURIComponent).join('/'),
      readonly:true
    };
  }
  throw failure(400,'Herramienta de repositorio desconocida');
}
