(()=>{'use strict';
const $=s=>document.querySelector(s),app=$('#app');
const OLD_KEY='ultimo-grito-save';const SLOT_PREFIX='ultimo-grito-slot-';let activeSlot=1;const KEY_UNUSED='ultimo-grito-save';
const LEGACY=['ultimo-grito-save-v06','ultimo-grito-save-v05','ultimo-grito-save-v04','ultimo-grito-save-v03','ultimo-grito-save-v02'];
let save=null,view='menu';let castSelected=null;
let soundOn=false,ac=null,osc=null;

const CHAPTERS=[
  {id:'prologo', short:'PRÓLOGO', title:'A noite em que tudo mudou', label:'PRÓLOGO · A NOITE EM QUE TUDO MUDOU', start:'p01', summary:'A festa de Jullia, o acidente e o pacto no lago.'},
  {id:'cap1', short:'CAPÍTULO 01', title:'Um ano depois', label:'CAPÍTULO 01 · UM ANO DEPOIS', start:'c01', summary:'A homenagem a Jullia reacende o medo quando surge o primeiro bilhete.'},
  {id:'cap2', short:'CAPÍTULO 02', title:'Ninguém está seguro', label:'CAPÍTULO 02 · NINGUÉM ESTÁ SEGURO', start:'d01', summary:'O grupo investiga as ameaças e sofre o primeiro ataque.'},
  {id:'cap3', short:'CAPÍTULO 03', title:'Ninguém é inocente', label:'CAPÍTULO 03 · NINGUÉM É INOCENTE', start:'e01', summary:'Novas suspeitas, mensagens apagadas e uma perseguição mais brutal na marina.'},
  {id:'cap4', short:'CAPÍTULO 04', title:'Fora de alcance', label:'CAPÍTULO 04 · FORA DE ALCANCE', start:'f01', summary:'O grupo é atraído para o arquivo da estrada norte; Allan corre perigo.'},
  {id:'cap5',short:'CAPÍTULO 05',title:'Laços de sangue',label:'CAPÍTULO 05 · LAÇOS DE SANGUE',start:'g01',summary:'O luto muda o grupo e você decide qual romance — ou nenhuma relação — quer seguir.'}
];

const CLUE_DATA={
  convite_jullia:{title:'Convite inesperado',category:'Passado',text:'Você estranhou o convite de Jullia para a festa. Havia algo urgente e pessoal por trás daquele chamado.'},
  breno_desconfortavel:{title:'Breno já estava desconfortável',category:'Passado',text:'Ainda no caminho para a festa, Breno demonstrava que aquele ambiente e aquela noite o deixavam inquieto.'},
  breno_observador:{title:'Breno percebeu detalhes antes',category:'Passado',text:'Breno observava o comportamento de todos e parecia notar tensões antes mesmo de elas explodirem.'},
  moises_ausente:{title:'Moisés estava distante',category:'Passado',text:'Durante a festa, Jullia procurava Moisés várias vezes, mas ele não estava ao lado dela quando mais precisava.'},
  comentarios_maldosos:{title:'Jullia ouviu comentários cruéis',category:'Passado',text:'O grupo falando mal dela foi uma das últimas humilhações que Jullia suportou naquela noite.'},
  moises_traicao:{title:'Traição de Moisés',category:'Passado',text:'Jullia viu Moisés com outra pessoa logo depois da confusão da festa, o que agravou seu estado emocional.'},
  estrada_escura:{title:'A estrada do lago',category:'Passado',text:'O atropelamento aconteceu na estrada escura próxima ao lago. É o ponto central do segredo do grupo.'},
  saco_na_van:{title:'Saco preto na van',category:'Passado',text:'O grupo usou um saco que estava na van de Samuel para esconder o corpo antes de levá-lo ao lago.'},
  pacto_verao:{title:'Pacto do verão passado',category:'Passado',text:'Depois de jogar o corpo de Jullia no lago, todos juraram manter silêncio absoluto sobre o que aconteceu.'},
  jullia_mata:{title:'Jullia correu para a mata',category:'Passado',text:'Antes do atropelamento, Jullia deixou a festa chorando e correu pela mata do terreno da propriedade.'},
  ultima_mensagem_jullia:{title:'Última mensagem de Jullia',category:'Homenagem',text:'Antes da festa, Jullia enviou uma mensagem dizendo que precisava de um rosto amigo naquela noite.'},
  buscas_continuam:{title:'As buscas continuam',category:'Homenagem',text:'A família Gomes e a polícia ainda tratam o caso como desaparecimento e nunca deixaram de procurar por Jullia.'},
  convidados_observados:{title:'Convidados atentos demais',category:'Homenagem',text:'Durante a homenagem, algumas pessoas pareciam observar o grupo com atenção incomum, como se esperassem uma reação.'},
  moises_provocou:{title:'Moisés conhece detalhes',category:'Homenagem',text:'Moisés sabe que Jullia saiu chorando naquela noite e insinuou conhecer informações sobre a estrada.'},
  moises_relacao:{title:'Relacionamento conturbado',category:'Homenagem',text:'A relação de Jullia com Moisés já estava muito abalada antes do desaparecimento.'},
  bilhete_ameaca:{title:'Bilhete ameaçador',category:'Homenagem',text:'Na homenagem, surgiu a ameaça “Eu sei o que vocês fizeram no verão passado”, provando que alguém conhece o segredo do grupo.'},
  foto_recente_grupo:{title:'Foto recente do grupo',category:'Homenagem',text:'Alguém tirou uma foto recente do grupo durante a homenagem, sem que vocês percebessem. Isso indica vigilância próxima.'},
  foto_pier:{title:'Foto do píer',category:'Homenagem',text:'Uma fotografia antiga reacendeu a memória do píer e dos lugares ligados à última noite de Jullia.'},
  plano_cameras:{title:'Plano das câmeras',category:'Investigação',text:'O grupo cogitou usar as câmeras da propriedade Gomes para descobrir quem circulou perto do lago e do jardim.'},
  cameras_mansao:{title:'Câmeras da mansão',category:'Investigação',text:'Existe a possibilidade de as câmeras da mansão terem registrado movimentações suspeitas perto da homenagem ou do lago.'},
  rota_jardim:{title:'Acesso ao jardim',category:'Investigação',text:'Quem tirou a foto durante a homenagem provavelmente conhecia bem as rotas internas da propriedade.'},
  porta_lateral:{title:'Porta lateral',category:'Investigação',text:'A porta lateral da propriedade ou do local investigado pode ter sido usada para entrar e sair sem chamar atenção.'},
  trilha_servico:{title:'Trilha de serviço',category:'Investigação',text:'Uma trilha ou passagem de serviço pode ter sido usada para se deslocar sem ser visto pelo grupo.'},
  funcionario_gomes:{title:'Funcionário dos Gomes',category:'Investigação',text:'Alguém ligado ao funcionamento da propriedade Gomes pode ter acesso a rotas, horários e áreas restritas.'},
  depoimentos_parecidos:{title:'Depoimentos parecidos',category:'Investigação',text:'Alguns relatos sobre aquela noite ou sobre a homenagem combinam demais entre si, como se parte da história tivesse sido ensaiada.'},
  culpa_breno:{title:'Culpa de Breno',category:'Investigação',text:'Breno revelou culpa por não ter impedido o uso do saco e a decisão de levar o corpo até o lago.'},
  celular_lago:{title:'Celular perto do lago',category:'Investigação',text:'Um celular ou vestígio eletrônico ligado ao lago pode conter provas sobre o que aconteceu depois da festa.'},
  carro_farol_apagado:{title:'Carro de farol apagado',category:'Investigação',text:'Foi notado um carro de farol apagado em circunstâncias suspeitas, possivelmente observando ou acompanhando o grupo.'},
  testemuhna_estrada:{title:'Testemunha da estrada',category:'Investigação',text:'Alguém pode ter visto movimentações estranhas na estrada na noite em que Jullia foi atropelada.'},
  testemunha_estrada:{title:'Testemunha da estrada',category:'Investigação',text:'Existe a possibilidade de alguém ter testemunhado parte do que aconteceu na estrada naquela noite.'},
  fita_vermelha_trilha:{title:'Fita vermelha na trilha',category:'Investigação',text:'Uma fita vermelha encontrada numa trilha pode indicar marcação de rota ou ter ficado presa na fuga de alguém.'},
  marca_cera_vermelha:{title:'Marca de cera vermelha',category:'Investigação',text:'O vestígio de cera vermelha pode estar ligado a algum objeto levado pelo perseguidor ou a uma encenação deliberada.'},
  mascara_lisa:{title:'Máscara pálida',category:'Ataque',text:'O perseguidor usava uma máscara clara, lisa e sem expressão, reforçando a sensação de que tudo foi planejado.'},
  testemunha_padaria:{title:'Testemunha na padaria',category:'Ataque',text:'Pessoas na padaria viram parte da fuga e podem confirmar que houve uma perseguição real.'},
  registro_ataque:{title:'Ataque registrado',category:'Ataque',text:'Pela primeira vez, o grupo cogitou formalizar um ataque sem necessariamente revelar todo o segredo do verão passado.'},
  marcas_arrasto:{title:'Marcas de arrasto',category:'Ataque',text:'Marcas no chão indicam que algo — ou alguém — pode ter sido arrastado em algum ponto importante da investigação.'},
  objeto_sarjeta:{title:'Objeto na sarjeta',category:'Ataque',text:'Um objeto encontrado na sarjeta pode ter pertencido ao perseguidor ou a alguém que passou pela cena antes do grupo.'},
  grade_passarela:{title:'Grade da passarela',category:'Ataque',text:'A passarela ou sua estrutura danificada pode indicar por onde o agressor passou ou onde houve confronto físico.'},
  promessa_sem_resposta:{title:'Promessa a alguém sem voz',category:'Telefonema',text:'A voz no telefone sugeriu que vocês fizeram uma promessa a alguém que já não podia responder.'},
  mensagens_apagadas_jullia:{title:'Mensagens apagadas',category:'Telefonema',text:'A ligação insinuou que mensagens de Jullia foram apagadas depois da noite do acidente.'},
  ligacao_telefone_fixo:{title:'Ligação impossível',category:'Telefonema',text:'O telefone fixo da casa de Isabella tocou mesmo estando supostamente desligado, como se alguém quisesse assustar o grupo.'},
  video_reacao_samuel:{title:'Reação estranha de Samuel',category:'Telefonema',text:'Samuel pareceu reconhecer a mensagem ou a ameaça antes mesmo de ela ser totalmente mostrada aos demais.'},
  notebook_marina:{title:'Pista da marina',category:'Capítulo 3',text:'Um backup antigo ligado a Jullia parece estar guardado na marina velha dos Gomes.'},
  mensagens_restauradas:{title:'Mensagens restauradas',category:'Capítulo 3',text:'Fragmentos de conversas de Jullia foram recuperados, sugerindo que alguém apagou partes importantes de propósito.'},
  meia_confissao_samuel:{title:'Samuel sabe mais',category:'Capítulo 3',text:'Samuel admitiu ter omitido que viu alguém saindo da mata pouco antes do atropelamento.'},
  distintivo_arranhado:{title:'Fragmento do perseguidor',category:'Capítulo 3',text:'Durante a perseguição, alguém conseguiu arrancar ou encontrar um pequeno fragmento metálico ligado ao agressor.'},
  rota_subterranea:{title:'Agressor conhece a marina',category:'Capítulo 3',text:'O perseguidor usou acessos internos e rotas técnicas como alguém que conhecia muito bem a marina.'},
  voz_jullia_backup:{title:'Áudio de Jullia',category:'Capítulo 3',text:'Um gravador ou backup contém um áudio parcial de Jullia gravado pouco antes de tudo dar errado.'},
  acesso_audio_c5:{title:'Quem ouviu o áudio?',category:'Capítulo 5',text:'O áudio pode ter passado por um dispositivo dos Gomes antes de ser recuperado; não há confirmação sobre quem teve acesso.'},
  cracha_portao_c5:{title:'Crachá no portão',category:'Capítulo 5',text:'Uma foto anônima mostra um crachá com detalhe azul, talvez de equipe de apoio da propriedade Gomes.'},
  vigia_portao_c5:{title:'Lembrança da guarita',category:'Capítulo 5',text:'Samuel se recorda de uma figura com roupa escura perto da guarita, mas não pode confirmar a identidade.'},
  audio_ruido_motor:{title:'Ruído na gravação',category:'Capítulo 4',text:'Breno percebeu um som distante de motor ou gerador no áudio de Jullia. Ainda não é prova de um veículo.'},
  foto_van_origem:{title:'Ângulo da foto da van',category:'Capítulo 4',text:'Ryan identificou uma encosta perto da antiga cabine da estrada norte como possível ponto de captura da fotografia.'},
  moises_parou_portao:{title:'Moisés no portão',category:'Capítulo 3',text:'A presença ou movimentação de Moisés perto do portão levanta dúvidas sobre quanto ele sabe e quando chegou.'}
};

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const baseSave=(name,pronouns,look)=>({hero:{name:name.trim(),pronouns,look},node:'p01',bonds:Object.fromEntries(ELENCO.map(x=>[x[0],50])),traits:{coragem:0,empatia:0,cautela:0},romance:Object.fromEntries(['ryan','breno','rayssa','rauanny'].map(id=>[id,{atracao:0,ressentimento:0}])),flags:{},clues:[],history:[],updated:Date.now(),saveVersion:9});

function chapterIdFromLabel(label=''){
  if(label.startsWith('PRÓLOGO')) return 'prologo';
  if(label.startsWith('CAPÍTULO 01')) return 'cap1';
  if(label.startsWith('CAPÍTULO 02')) return 'cap2';
  if(label.startsWith('CAPÍTULO 03')) return 'cap3';
  if(label.startsWith('CAPÍTULO 04')) return 'cap4';
  if(label.startsWith('CAPÍTULO 05')) return 'cap5';
  return 'prologo';
}
function chapterMetaForNode(nodeId){const node=window.NODES?.[nodeId];return CHAPTERS.find(c=>c.id===chapterIdFromLabel(node?.chapter||''))||CHAPTERS[0]}
function highestReached(a){
  if(!a||!a.node||!window.NODES?.[a.node]) return 0;
  const ids=[...new Set([chapterIdFromLabel(window.NODES[a.node].chapter), ...((a.history||[]).map(h=>chapterIdFromLabel(h.chapter)))])];
  return ids.reduce((m,id)=>Math.max(m,CHAPTERS.findIndex(c=>c.id===id)),0);
}
function normalize(a){
  if(!a||!a.hero||typeof a.hero.name!=='string'||!window.NODES?.[a.node]) return null;
  const b=baseSave(a.hero.name,a.hero.pronouns||'ele',a.hero.look||'casual');
  b.node=a.node;
  b.bonds={...b.bonds,...(a.bonds||{})};
  b.traits={...b.traits,...(a.traits||{})};
  b.romance={...b.romance,...(a.romance||{})};
  for(const id of Object.keys(b.romance)){b.romance[id]={atracao:0,ressentimento:0,...(b.romance[id]||{})};}
  b.flags=a.flags&&typeof a.flags==='object'?a.flags:{};b.friendBonds=a.friendBonds&&typeof a.friendBonds==='object'?a.friendBonds:{};
  b.clues=Array.isArray(a.clues)?a.clues:[];
  b.history=Array.isArray(a.history)?a.history:[];
  b.romanceEscolhido=['ryan','breno','rayssa','rauanny','solteiro'].includes(a.romanceEscolhido)?a.romanceEscolhido:null;
  if(!b.romanceEscolhido){const found=['ryan','breno','rayssa','rauanny'].find(id=>b.flags['romance_'+id+'_c5']);if(found)b.romanceEscolhido=found;else if(b.flags.romance_solteiro_c5)b.romanceEscolhido='solteiro';}
  b.updated=a.updated||Date.now();
  b.saveVersion=9;
  return b;
}
function slotKey(n){return SLOT_PREFIX+n}
function slotSave(n){try{return normalize(JSON.parse(localStorage.getItem(slotKey(n))||'null'))}catch{return null}}
function migrateLegacy(){
 if(localStorage.getItem('ultimo-grito-slots-migrated'))return;
 const legacy=[OLD_KEY,...LEGACY];
 for(const k of legacy){try{const raw=localStorage.getItem(k),data=raw&&normalize(JSON.parse(raw));if(data){if(!slotSave(1))localStorage.setItem(slotKey(1),JSON.stringify(data));break}}catch(e){console.warn(e)}}
 localStorage.setItem('ultimo-grito-slots-migrated','1');
}
function getSave(){migrateLegacy();return slotSave(activeSlot)}
function persist(){try{if(save)localStorage.setItem(slotKey(activeSlot),JSON.stringify(save))}catch(e){console.warn('Não foi possível salvar',e)}}
function interp(s){const name=save?.hero?.name?.split(' ')[0]||'Você';return esc(s).replaceAll('{nome}',esc(name))}
function formatted(s){return String(s||'').split(/\n\n/).map(part=>{let content=part.trim();if(!content)return '';const m=content.match(/^([A-Za-zÀ-ÿ ]{2,28}|Você):\s*[—-]\s*([\s\S]*)$/);if(m){return `<div class="spoken"><div class="speaker-name">${interp(m[1]==='Você'?(save?.hero?.name||'Você'):m[1])}</div><p>${interp(m[2])}</p></div>`}if(content==='UM ANO DEPOIS.'||content.startsWith('ENQUANTO ISSO'))return `<div class="intertitle">${interp(content)}</div>`;return `<p class="narrative">${interp(content).replaceAll('\n','<br>')}</p>`}).join('')}
function allowed(req){return !req||req.every(([type,key,val])=>type==='flag'?Boolean(save.flags[key])===Boolean(val):type==='clue'?save.clues.includes(key)===Boolean(val):type==='bond'?(save.bonds[key]||0)>=val:true)}
function apply(effects){(effects||[]).forEach(([type,key,val])=>{if(type==='flag'){save.flags[key]=!!val;if(key.startsWith('romance_')&&key.endsWith('_c5')&&val)save.romanceEscolhido=key.slice(8,-3)}if(type==='clue'&&!save.clues.includes(key))save.clues.push(key);if(type==='romance'){save.romance[key]??={atracao:0,ressentimento:0};save.romance[key].atracao=Math.max(0,Math.min(100,save.romance[key].atracao+val))}if(type==='resent'){save.romance[key]??={atracao:0,ressentimento:0};save.romance[key].ressentimento=Math.max(0,Math.min(100,save.romance[key].ressentimento+val))}if(type==='trait')save.traits[key]=(save.traits[key]||0)+val;if(type==='bond')save.bonds[key]=Math.max(0,Math.min(100,(save.bonds[key]||50)+val));if(type==='friendBond'&&Array.isArray(key)&&key.length===2){save.friendBonds??={};const pair=pairKey(key[0],key[1]);save.friendBonds[pair]=(save.friendBonds[pair]||0)+Number(val||0)}})}

function ui(body){app.innerHTML=`<div class="grain"></div><div class="ui">${body}</div>`}
function header(chapter='UMA HISTÓRIA DE LAKEWOOD',isLanding=false){
  return `<header class="app-header ${isLanding?'landing-header':''}"><button class="nav-home" data-act="menu">⌂ MENU</button><div class="header-center"><button class="brand brand-center" data-act="menu">O <span>ÚLTIMO</span> GRITO</button><div class="top-info">${esc(chapter)}</div></div><button class="sound" data-act="sound">${soundOn?'♪ ON':'♪ OFF'}</button></header>`;
}

function sound(){
  soundOn=!soundOn;
  try{
    if(soundOn){ac=new(window.AudioContext||window.webkitAudioContext)();osc=ac.createOscillator();const g=ac.createGain();osc.type='sine';osc.frequency.value=58;g.gain.value=.018;osc.connect(g).connect(ac.destination);osc.start();}
    else{osc?.stop();ac?.close();osc=null;ac=null;}
  }catch{soundOn=false}
  render();
}

function menu(){
  view='menu'; const existing=getSave();
  ui(`<main class="landing scenic town"><div class="vignette"></div>${header('UMA HISTÓRIA DE LAKEWOOD',true)}<div class="landing-center"><div class="eyebrow">UM VERÃO. OITO SEGREDOS. UMA ÚLTIMA CHANCE.</div><div class="main-title">O <em>ÚLTIMO</em><br>GRITO<span class="dot">.</span></div><p class="tagline">Alguém sabe o que aconteceu naquela noite — e está cansado de esperar.</p><div class="actions"><button class="primary" data-act="new">NOVO JOGO <span>↗</span></button>${existing?'<button class="secondary" data-act="continue">CONTINUAR HISTÓRIA</button><button class="secondary" data-act="chapters">CAPÍTULOS</button><button class="secondary" data-act="clues">QUADRO DE PISTAS</button><button class="secondary" data-act="export">EXPORTAR SAVE</button>':''}<button class="secondary" data-act="slots">PARTIDAS / SLOTS</button><button class="secondary" data-act="cast">CONHECER PERSONAGENS</button><button class="secondary" data-act="import">IMPORTAR SALVAMENTO</button></div><p class="subtitle">V0.9.1 · TERROR NARRATIVO · SAVES COMPATÍVEIS ENTRE VERSÕES</p></div><footer>LAKEWOOD · VERÃO DE 2026 <span>DEMONSTRAÇÃO V0.9.1 · CAPÍTULO 5 INCLUÍDO</span></footer></main>`);
}
function creator(){
  view='creator';
  ui(`<main class="landing scenic house">${header('CRIAÇÃO DE PERSONAGEM')}<section class="panel creator"><div class="eyebrow">ANTES DE VOLTAR A LAKEWOOD</div><h1>Quem vai sobreviver?</h1><p>Você é o nono personagem dessa história. Os outros oito carregam o peso de um verão que ninguém deveria lembrar.</p><form id="creator"><label>SEU NOME COMPLETO<input name="name" maxlength="48" minlength="2" placeholder="Digite seu nome" required autocomplete="off"></label><div class="field-row"><label>PRONOMES<select name="pronouns"><option value="ela">Ela / dela</option><option value="ele">Ele / dele</option><option value="elu">Elu / delu</option></select></label><label>ESTILO VISUAL<select name="look"><option value="casual">Casual</option><option value="alternativo">Alternativo</option><option value="elegante">Elegante</option><option value="esportivo">Esportivo</option></select></label></div><p class="note">Os romances, as pistas e as consequências acompanharão esse personagem em todos os capítulos.</p><button class="primary full" type="submit">COMEÇAR PRÓLOGO ↗</button></form><button class="back" data-act="menu">← Voltar ao menu</button></section></main>`);
}
function game(){
  view='game'; const n=window.NODES?.[save?.node]; if(!n){menu();return}
  const choices=n.choices.filter(c=>allowed(c.requires));
  ui(`<main class="play scenic ${esc(n.scene)}"><div class="vignette"></div>${header(n.chapter)}<div class="hud-left"><b>${esc(n.location)}</b><span>${esc(n.time)} · LAKEWOOD</span></div><div class="scene-accent">${n.scene==='phone'?'✆':n.scene==='lake'?'≈':n.scene==='road'?'⌁':n.scene==='party'?'✧':'◇'}</div><div class="game-tools"><button data-act="journal">☰ DIÁRIO</button><button data-act="chapters">☷ CAPÍTULOS</button><button data-act="clues">⌘ PISTAS</button><button data-act="export">⇩ EXPORTAR SAVE</button><button data-act="import">⇧ IMPORTAR SAVE</button><button data-act="cast">♧ ELENCO</button><button data-act="slots">▣ SLOTS</button><button data-act="menu">Ⅱ PAUSAR</button></div><div class="dialogue"><div class="line-top"><span class="narrator">${esc(n.speaker||'NARRADOR')}</span><span class="chapter-index">${esc(n.chapter)}</span></div><div class="story-text">${formatted(n.text)}</div><div class="choices">${choices.length?choices.map((c,i)=>`<button class="choice" data-choice="${i}"><span class="choice-num">${String(i+1).padStart(2,'0')}</span><span>${esc(c.text)}</span><b>↗</b></button>`).join(''):`<button class="primary" data-act="chapters">VER CAPÍTULOS ↗</button><button class="secondary" data-act="clues">QUADRO DE PISTAS</button><button class="secondary" data-act="menu">MENU PRINCIPAL</button>`}</div></div><div class="save-note">◆ PROGRESSO SALVO AUTOMATICAMENTE</div></main>`);
}
function exportSave(){const data=save||getSave();if(!data){alert('Nenhuma partida para exportar.');return}const payload=JSON.stringify({game:'o-ultimo-grito',format:1,save:normalize(data)},null,2);const blob=new Blob([payload],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='o-ultimo-grito-slot-'+activeSlot+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}
function importSave(){const picker=document.createElement('input');picker.type='file';picker.accept='.json,application/json';picker.onchange=async()=>{const f=picker.files?.[0];if(!f)return;if(f.size>2000000){alert('Arquivo muito grande.');return}try{const parsed=JSON.parse(await f.text());if(parsed.game!=='o-ultimo-grito'||parsed.format!==1)throw Error('Formato de salvamento incompatível.');const imported=normalize(parsed.save);if(!imported)throw Error('O ponto salvo não existe nesta versão ou os dados estão incompletos.');if(getSave()&&!confirm('Importar irá substituir APENAS o slot '+activeSlot+'. Deseja continuar?'))return;save=imported;persist();alert('Salvamento importado com sucesso!');game()}catch(e){alert('Não foi possível importar: '+e.message)}};picker.click()}
function select(i){const n=window.NODES[save.node],choices=n.choices.filter(c=>allowed(c.requires)),c=choices[i];if(!c)return;const before={...save.bonds};apply(c.effects);save.history.push({node:n.id,choice:c.text,chapter:n.chapter,effects:(c.effects||[]).map(e=>({type:e[0],key:e[1],value:e[2],name:ELENCO.find(x=>x[0]===e[1])?.[1]||e[1],from:before[e[1]],to:save.bonds[e[1]]}))});save.node=c.to;save.updated=Date.now();persist();game()}
function journal(){
  if(!save){menu();return} view='journal';
  const rows=save.history.slice().reverse().map(h=>`<li><small>${esc(h.chapter)}</small><div>${esc(h.choice)}</div>${h.effects.filter(e=>e.type==='bond').length?`<span>${h.effects.filter(e=>e.type==='bond').map(e=>`${esc(e.name)}: ${e.from} → ${e.to}`).join(' · ')}</span>`:''}</li>`).join('');
  ui(`<main class="landing scenic road">${header('DIÁRIO DE CONSEQUÊNCIAS')}<section class="panel wide"><div class="eyebrow">EFEITO BORBOLETA</div><h1>Suas escolhas deixam marcas.</h1><div class="dashboard"><div><h3>PERSONAGENS</h3>${ELENCO.map(p=>`<div class="bond"><span>${esc(p[1])}</span><div class="meter"><i style="width:${save.bonds[p[0]]||50}%"></i></div><strong>${save.bonds[p[0]]||50}</strong></div>`).join('')}</div><div><h3>ROMANCE ESCOLHIDO</h3><p class="note">${save.romanceEscolhido?save.romanceEscolhido==='solteiro'?'Você escolheu continuar solteiro.':esc(ELENCO.find(p=>p[0]===save.romanceEscolhido)?.[1]||'—'):'Ainda não definido — escolha no capítulo 5.'}</p><h3>AFINIDADES ROMÂNTICAS</h3>${['ryan','breno','rayssa','rauanny'].map(id=>`<p class="stat">${esc(ELENCO.find(x=>x[0]===id)?.[1]||id)} <strong>♥ ${save.romance?.[id]?.atracao||0} · Mágoas ${save.romance?.[id]?.ressentimento||0}</strong></p>`).join('')}<h3>TRAÇOS</h3>${Object.entries(save.traits).map(([k,v])=>`<p class="stat">${esc(k)} <strong>${v}</strong></p>`).join('')}<h3>DECISÕES (${save.history.length})</h3><ol class="history">${rows||'<li>Nenhuma decisão registrada.</li>'}</ol></div></div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="clues">VER PISTAS</button><button class="back" data-act="menu">← Menu</button></div></section></main>`);
}
const TRAITS={
 rayssa:[90,65,86,42,58],ryan:[75,70,76,82,48],laisla:[68,79,91,78,52],samuel:[37,83,72,85,78],rauanny:[66,87,92,87,63],allan:[79,72,83,95,61],isabella:[62,84,93,59,77],breno:[82,62,88,35,80]
};
// Retratos ilustrados oficiais do elenco (arquivos locais, sem rede ou APIs externas).
const CAST_PORTRAITS=Object.freeze({
  rayssa:'rayssa.webp',ryan:'ryan.webp',laisla:'laisla.webp',samuel:'samuel.webp',
  rauanny:'rauanny.webp',allan:'allan.webp',isabella:'isabella.webp',breno:'breno.webp'
});
function characterDead(id){return id==='allan'&&!!save?.flags?.allan_morto_c4;}
function castPortrait(id,name,large=false){
  const image=CAST_PORTRAITS[id];
  if(!image)return `<div class="cast-portrait-placeholder" aria-hidden="true">${esc(name.charAt(0))}</div>`;
  const mode=large?'cast-art--large':'cast-art--card';
  const gone=characterDead(id)?' is-deceased':'';
  return `<div class="cast-art ${mode}${gone}"><img src="${image}" width="720" height="960" alt="Retrato ilustrado de ${esc(name)}" loading="eager" decoding="async">${characterDead(id)?'<span class="cast-art-memorial">EM MEMÓRIA</span>':''}</div>`;
}
const RELS={rayssa:[['isabella','Melhor amiga'],['samuel','Tensão pelo pacto'],['rauanny','Amizade'],['allan','Boa amizade']],ryan:[['rauanny','Muito próximo'],['laisla','Muito próximo'],['allan','Amizade divertida']],laisla:[['rauanny','Melhor amiga, com atritos'],['ryan','Muito próximo'],['samuel','Discussões ocasionais']],samuel:[['allan','Melhor amigo'],['isabella','Aliança tensa'],['rayssa','Conflito sobre a verdade']],rauanny:[['laisla','Melhor amiga, com atritos'],['ryan','Muito próximo'],['rayssa','Amizade']],allan:[['samuel','Melhor amigo'],['ryan','Amizade'],['isabella','Convivência direta']],isabella:[['rayssa','Melhor amiga'],['samuel','Aliança tensa'],['breno','Respeito mútuo']],breno:[['isabella','Respeito'],['allan','Amizade distante'],['ryan','Convivência'] ]};
// Afinidades do elenco: cada dupla tem um valor próprio, compartilhado nas duas fichas.
const RELATION_BASE={
 'rayssa:isabella':94,'laisla:rauanny':91,'ryan:rauanny':86,'laisla:ryan':85,
 'allan:samuel':92,'rayssa:samuel':26,'isabella:samuel':46,'laisla:samuel':39,
 'allan:ryan':74,'allan:rayssa':72,'allan:isabella':65,'allan:breno':40,
 'breno:isabella':66,'breno:ryan':55,'breno:rauanny':43,'breno:rayssa':59,
 'isabella:rauanny':60,'isabella:ryan':63,'isabella:laisla':58,'laisla:rayssa':64,
 'rayssa:rauanny':71,'ryan:samuel':61,'breno:samuel':47,'allan:laisla':67,
 'allan:rauanny':70,'breno:laisla':43,'isabella:allan':65
};
function pairKey(a,b){return [a,b].sort().join(':')}
function relationScore(a,b){
 if(b==='hero')return Math.max(0,Math.min(100,save?.bonds?.[a]??50));
 const pair=pairKey(a,b);
 const base=RELATION_BASE[pair]??RELATION_BASE[pair.split(':').reverse().join(':')]??55;
 const offset=save?.friendBonds?.[pair]??0;
 const f=save?.flags||{};
 let event=0;
 if(pair===pairKey('laisla','rauanny')&&f.ferida_rauanny)event+=4;
 if(pair===pairKey('rayssa','samuel')&&f.samuel_viu_figura)event-=12;
 if(pair===pairKey('allan','samuel')&&f.allan_morto_c4)event-=8;
 if(pair===pairKey('rayssa','isabella')&&f.isa_confidenciou)event+=2;
 return Math.max(0,Math.min(100,base+offset+event));
}
function relationLabel(a,b){
 if(b==='hero')return 'Relação com você';
 const item=(RELS[a]||[]).find(x=>x[0]===b)||(RELS[b]||[]).find(x=>x[0]===a);
 return item?.[1]||'Amizade do grupo';
}
function relationRows(id){
 const others=[...ELENCO.filter(x=>x[0]!==id).map(x=>[x[0],x[1]]),['hero',save?.hero?.name||'Protagonista']];
 return others.map(([other,name])=>{
   const value=relationScore(id,other),detail=relationLabel(id,other);
   return `<div class="relationship-meter-row" title="${esc(detail)} · ${value}/100"><span class="relationship-person">${esc(name)}</span><div class="relationship-track" role="meter" aria-label="Afinidade entre ${esc(ELENCO.find(x=>x[0]===id)?.[1]||id)} e ${esc(name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div><span class="relationship-value">${value}</span></div>`;
 }).join('');
}
function characterStatus(id){
 if(id==='allan'&&save?.flags?.allan_morto_c4)return 'Falecido · Capítulo 4';
 if(id==='allan'&&save?.flags?.allan_vivo_c4)return 'Sobreviveu ao ataque no arquivo';
 if(id==='rauanny'&&save?.flags?.ferida_rauanny)return 'Ferida após o primeiro ataque';
 if(id==='samuel'&&save?.flags?.ferida_samuel_c4)return 'Ferido na fuga';
 if(id==='samuel'&&save?.flags?.samuel_viu_figura)return 'Confrontado após omitir uma testemunha possível';
 return 'Vivo · acompanhando os acontecimentos';
}
function cast(){if(!save)save=getSave();view='cast';castSelected=null;renderCast()}
function renderCast(){
 const selected=ELENCO.find(x=>x[0]===castSelected);
 let content='';
 if(selected){const [id,name,age,desc]=selected;const dims=['Empatia','Coragem','Lealdade','Extroversão','Perspicácia'];const vals=TRAITS[id]||[50,50,50,50,50];const romance=save?.romance?.[id];content=`<button class="back" data-act="castback">← Voltar aos oito amigos</button><div class="char-head">${castPortrait(id,name,true)}<div><div class="eyebrow">PERFIL DE PERSONAGEM</div><h1>${esc(name)}</h1><p>${age} anos · ${esc(characterStatus(id))}</p><p>${esc(desc)}</p></div></div><div class="dashboard"><section><h3>CARACTERÍSTICAS</h3>${dims.map((d,i)=>`<div class="bond"><span>${d}</span><div class="meter"><i style="width:${vals[i]}%"></i></div><strong>${vals[i]}</strong></div>`).join('')}<p class="note">Traços de personalidade-base; o relacionamento com o protagonista evolui com as escolhas.</p></section><section><h3>RELACIONAMENTOS</h3>${relationRows(id)}<p class="note">Barras de afinidade com todo o grupo. Os valores variam conforme as relações e os acontecimentos da história.</p>${romance?`<p class="note">Rota definitiva: ${save?.romanceEscolhido===id?'ROMANCE ESCOLHIDO':save?.romanceEscolhido?'AMIZADE':'AINDA EM ABERTO'} · Sua atração: ${romance.atracao}/100 · Mágoas: ${romance.ressentimento}/100</p>`:''}<h3>ESTADO ATUAL</h3><p>${esc(characterStatus(id))}</p></section></div>`;
 }else content=`<div class="eyebrow">O GRUPO DE AMIGOS</div><h1>Oito amigos. Um segredo.</h1><p>Clique em um card para conhecer seus traços, relações e estado atual.</p><div class="cast-grid">${ELENCO.map(([id,name,age,desc],i)=>`<button class="cast-card cast-click${characterDead(id)?' cast-card--memorial':''}" data-person="${id}" aria-label="Abrir perfil de ${esc(name)}">${castPortrait(id,name)}<div class="cast-info"><b>${esc(name)}</b><small>${age} ANOS</small><p>${esc(desc)}</p><span>Confiança: ${save?.bonds?.[id]??50}/100 · VER PERFIL ↗</span></div></button>`).join('')}</div>`;
 ui(`<main class="landing scenic lake">${header('PERSONAGENS DE LAKEWOOD')}<section class="panel wide cast-panel">${content}<button class="primary" data-act="${save?'resume':'menu'}">${save?'VOLTAR À HISTÓRIA':'VOLTAR AO MENU'} ↗</button></section></main>`)
}
function slotsScreen(){view='slots';migrateLegacy();ui(`<main class="landing scenic house">${header('SALVAMENTOS')}<section class="panel wide"><div class="eyebrow">LINHAS DO TEMPO</div><h1>Minhas partidas</h1><p>Você pode criar até 3 histórias independentes. A partida antiga foi preservada no slot 1 quando encontrada. Exporte os slots antes de mudar de navegador ou computador.</p><div class="slot-grid">${[1,2,3].map(i=>{const d=slotSave(i),cur=d&&chapterMetaForNode(d.node);return `<article class="slot-card ${activeSlot===i?'active':''}"><small>SLOT ${i} ${activeSlot===i?'· ATIVO':''}</small><h3>${esc(d?.hero?.name||'Vazio')}</h3><p>${d?esc(cur.short+' — '+cur.title):'Nenhum progresso neste slot'}</p><button class="secondary" data-slot="${i}">${d?'CARREGAR PARTIDA':'USAR SLOT VAZIO'} ↗</button></article>`}).join('')}</div><div class="actions"><button class="primary" data-act="menu">MENU PRINCIPAL</button><button class="secondary" data-act="import">IMPORTAR PARA SLOT ATIVO</button><button class="secondary" data-act="export">EXPORTAR SLOT ATIVO</button></div></section></main>`)}
function chaptersScreen(){
  if(!save) save=getSave(); view='chapters';
  const highest=save?highestReached(save):0; const current=save?chapterMetaForNode(save.node).id:'prologo';
  ui(`<main class="landing scenic house">${header('MENU DE CAPÍTULOS')}<section class="panel wide"><div class="eyebrow">PROGRESSO DA HISTÓRIA</div><h1>Capítulos de O Último Grito</h1><p>Os capítulos aparecem conforme sua jornada avança. Este menu registra onde você já chegou e qual parte da história está em andamento.</p><div class="chapter-grid">${CHAPTERS.map((ch,idx)=>{const unlocked=idx<=highest; const state=!save?'Bloqueado':current===ch.id?'Atual':idx<highest?'Concluído':unlocked?'Desbloqueado':'Bloqueado'; return `<article class="chapter-card ${unlocked?'':'locked'}"><small>${esc(ch.short)}</small><h3>${esc(ch.title)}</h3><p>${esc(ch.summary)}</p><span class="chapter-state">${state}</span></article>`}).join('')}</div><div class="actions"><button class="primary" data-act="${save?'resume':'menu'}">${save?'VOLTAR À HISTÓRIA':'VOLTAR AO MENU'} ↗</button>${save?'<button class="secondary" data-act="clues">ABRIR PISTAS</button>':''}</div></section></main>`);
}
function clueCard(key){const meta=CLUE_DATA[key]||{title:key.replaceAll('_',' '),category:'Outras',text:'Pista registrada no histórico da sua partida.'};return `<article class="clue-card"><small>${esc(meta.category.toUpperCase())}</small><h4>${esc(meta.title)}</h4><p>${esc(meta.text)}</p></article>`}
function theories(){
  const items=[];
  if(save?.clues.includes('mensagens_apagadas_jullia')) items.push('Alguém apagou mensagens de Jullia depois da noite do acidente.');
  if(save?.clues.includes('video_reacao_samuel')||save?.clues.includes('meia_confissao_samuel')) items.push('Samuel sabe mais do que está admitindo sobre aquela noite.');
  if(save?.clues.includes('moises_provocou')||save?.clues.includes('moises_relacao')) items.push('Moisés continua sendo um suspeito plausível, mas talvez esteja escondendo dor, não culpa.');
  if(save?.clues.includes('distintivo_arranhado')) items.push('O perseguidor deixou para trás um fragmento metálico que pode revelar sua origem.');
  if(save?.clues.includes('pacto_verao')||save?.flags?.sobreviveu_primeiro_ataque) items.push('As ameaças giram em torno do pacto feito após o corpo de Jullia ter sido jogado no lago.');
  return items.length?items:['Ainda faltam pistas para montar uma teoria forte. Continue jogando e observando quem reage de forma estranha.'];
}
function cluesScreen(){
  if(!save){menu();return} view='clues';
  const categories={}; (save.clues||[]).forEach(key=>{const cat=(CLUE_DATA[key]?.category)||'Outras'; (categories[cat]??=[]).push(key)});
  const sections=Object.entries(categories).map(([cat,keys])=>`<section class="clue-section"><h3>${esc(cat)}</h3><div class="clue-grid">${keys.map(clueCard).join('')}</div></section>`).join('');
  ui(`<main class="landing scenic forest">${header('QUADRO DE INVESTIGAÇÃO')}<section class="panel wide"><div class="eyebrow">PISTAS E TEORIAS</div><h1>O que você já sabe</h1><p>Esta aba organiza melhor as pistas encontradas. Aqui ficam separadas as informações sobre o passado, as ameaças atuais e as principais teorias levantadas pelo grupo.</p><div class="investigation-layout"><div><h3>TEORIAS ATUAIS</h3><ul class="theory-list">${theories().map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h3>PONTO ATUAL</h3><p class="note">${esc(chapterMetaForNode(save.node).short)} · ${esc(chapterMetaForNode(save.node).title)}</p></div><div><h3>PISTAS DESCOBERTAS (${save.clues.length})</h3>${sections||'<p class="note">Você ainda não encontrou pistas registradas.</p>'}</div></div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="journal">VER DIÁRIO</button><button class="back" data-act="menu">← Menu</button></div></section></main>`);
}

function render(){ if(view==='menu') menu(); else if(view==='creator') creator(); else if(view==='game') game(); else if(view==='journal') journal(); else if(view==='cast') renderCast(); else if(view==='slots')slotsScreen(); else if(view==='chapters') chaptersScreen(); else if(view==='clues') cluesScreen(); }

app.addEventListener('click',e=>{
  const person=e.target.closest('[data-person]');if(person){castSelected=person.dataset.person;renderCast();return;}const slot=e.target.closest('[data-slot]');if(slot){activeSlot=Number(slot.dataset.slot);save=getSave();if(save)game();else creator();return;}const btn=e.target.closest('[data-act],[data-choice]'); if(!btn) return;
  if(btn.dataset.choice!==undefined){ select(Number(btn.dataset.choice)); return; }
  const action=btn.dataset.act;
  if(action==='sound') sound();
  else if(action==='new'){ if(getSave()&&!confirm('Novo jogo substituirá apenas o slot '+activeSlot+'. Continuar?')) return; creator(); }
  else if(action==='continue'){ save=getSave(); if(save) game(); else menu(); }
  else if(action==='resume'){ if(save) game(); else menu(); }
  else if(action==='menu') menu();
  else if(action==='cast') cast(); else if(action==='castback'){castSelected=null;renderCast();} else if(action==='slots')slotsScreen();
  else if(action==='journal') journal();
  else if(action==='chapters') chaptersScreen();
  else if(action==='clues') cluesScreen();
  else if(action==='export') exportSave();
  else if(action==='import') importSave();
});
app.addEventListener('submit',e=>{ if(e.target.id!=='creator') return; e.preventDefault(); const f=new FormData(e.target); const name=String(f.get('name')||'').trim(); if(name.length<2) return; save=baseSave(name,String(f.get('pronouns')),String(f.get('look'))); persist(); game(); });
menu();
})();
