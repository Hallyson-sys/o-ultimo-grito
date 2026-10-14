/* O ÚLTIMO GRITO · V1.0.5 · celular, investigação e efeito borboleta
   Sem rede, sem spoilers do mistério. O progresso fica no slot do jogador. */
(()=>{'use strict';
const empty=()=>({version:2,phoneReplies:{},connections:[],notes:'',events:[],alerts:{},mediaReviewed:[]});
const safeObj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const restore=x=>{const y=safeObj(x);const replies={...safeObj(y.phoneReplies)};for(const k of ['ryan-romance','breno-romance','rayssa-romance','rauanny-romance'])if(replies[k]&&!Number.isFinite(replies[k].atStage))replies[k]={...replies[k],atStage:49};return {version:2,phoneReplies:replies,connections:Array.isArray(y.connections)?[...new Set(y.connections.filter(v=>typeof v==='string'))].slice(0,30):[],notes:typeof y.notes==='string'?y.notes.slice(0,1500):'',events:Array.isArray(y.events)?y.events.filter(a=>a&&typeof a.label==='string').slice(-90):[],alerts:{...safeObj(y.alerts)},mediaReviewed:Array.isArray(y.mediaReviewed)?[...new Set(y.mediaReviewed.filter(v=>typeof v==='string'))]:[]};};
const chapter=s=>{const ch=window.NODES?.[s?.node]?.chapter||'';if(ch.startsWith('PRÓLOGO'))return 0;const m=ch.match(/CAPÍTULO\s+0?(\d+)/);return m?Number(m[1]):0;};
const stage=s=>{const xs=[s?.node,...(s?.history||[]).map(h=>h.node)].filter(x=>typeof x==='string');let best=0;for(const id of xs){const m=id.match(/^h(\d+)/);if(m)best=Math.max(best,Number(m[1]));}return best;};
const clue=(s,k)=>(s?.clues||[]).includes(k);
const dead=(s,id)=>!!(id==='allan'&&s.flags?.allan_morto_c4)||!!s.flags?.['c6_morto_'+id];
const personName=id=>({ryan:'Ryan',breno:'Breno',rayssa:'Rayssa',rauanny:'Rauanny',laisla:'Laisla',allan:'Allan',isabella:'Isabella',samuel:'Samuel',bella:'Bella'})[id]||id;
const msg=(who,text,time='')=>({who,text,time});
const replyOptions={
  'bella-inicio':[
    {id:'pistas',text:'Quero descobrir o que aconteceu com Jullia.',answer:'Então fala comigo quando tiver alguma coisa concreta. A minha irmã não é uma teoria de internet.'},
    {id:'cuidado',text:'Você não precisa investigar tudo sozinha.',answer:'Eu sei me virar. Mas... valeu por perguntar. Só não vem com pena de mim.'}
  ],
  'ryan-romance':[
    {id:'carinho',text:'Quando tudo acalmar, quero ficar um pouco com você.',answer:'Também quero. Nem que seja só ficar abraçado sem falar de nada.'},
    {id:'brincadeira',text:'Você ainda me deve aquele encontro, viu?',answer:'Anotado. E eu vou cobrar o meu beijo, se você quiser.'}
  ],
  'breno-romance':[
    {id:'proximidade',text:'Você não precisa guardar tudo só pra você.',answer:'Eu sei. Com você fica um pouco mais fácil falar.'},
    {id:'convite',text:'Depois disso tudo, vamos sair só nós dois?',answer:'Vamos. Um lugar tranquilo, sem ninguém tentando nos achar.'}
  ],
  'rayssa-romance':[
    {id:'cuidado',text:'Me manda mensagem quando estiver segura, tá?',answer:'Mando. Promete que vai fazer a mesma coisa?'},
    {id:'chamego',text:'Quando der, eu queria te abraçar de novo.',answer:'Eu também. Mais do que você imagina.'}
  ],
  'rauanny-romance':[
    {id:'chamego',text:'Quando eu te encontrar, vou querer um beijo.',answer:'Vai ter que me achar primeiro. Brincadeira... também tô com saudade.'},
    {id:'sincero',text:'Tô preocupada com você. De verdade.',answer:'Eu sei. Isso importa pra mim, viu? Cuida de você também.'}
  ],
  'grupo-depois':[
    {id:'apoio',text:'Chegaram em segurança? Se precisarem, me chamem.',answer:'Obrigada por perguntar. Hoje tá difícil até respirar direito.'},
    {id:'fatos',text:'Guardem as fotos e horários. A polícia vai precisar.',answer:'Eu salvei o que conseguimos. Não apaguem nada.'}
  ]
};
const whenReply=(s,key)=>s?.interactive?.phoneReplies?.[key]?.id||null;
function threads(s){
  if(!s)return[];
  const ch=chapter(s),late=ch>=6&&stage(s)>=49;
  const ts=[];
  if(ch>=1){
    const group=[msg('Laisla','Eu só quero um dia sem vocês discutindo no grupo.'),msg('Ryan','Prometo tentar. Não garanto nada.')];
    if(ch>=6){group.push(msg('Laisla','Hoje o jantar é na minha casa. Quem falar do mascarado na mesa lava a louça.','ANTES DO JANTAR'));}
    if(late){
      group.push(msg('Sistema','Mensagens trocadas após o ataque.','MADRUGADA'));
      for(const [id,text] of [['laisla','Estou sendo atendida. Ainda tô tremendo.'],['rauanny','Por favor, ninguém fica sozinho hoje.'],['isabella','Cheguei. Eu tô aqui. Depois conversamos.'],['allan','Cheguei. Não quero falar agora.'],['ryan','Tá todo mundo em algum lugar seguro? Me respondam.']])if(!dead(s,id))group.push(msg(personName(id),text));
    }
    const gr=late?'grupo-depois':null;
    if(gr&&whenReply(s,gr)){
      group.push(msg('Você',replyOptions[gr].find(x=>x.id===whenReply(s,gr))?.text||''));
      const chosen=replyOptions[gr].find(x=>x.id===whenReply(s,gr));
      if(chosen)group.push(msg(chosen.id==='apoio'&&!dead(s,'laisla')?'Laisla':'Breno',chosen.id==='apoio'&&dead(s,'laisla')?'Obrigado. Só não esquece de cuidar de você também.':chosen.id==='apoio'?chosen.answer:'Eu salvei o que conseguimos. Não apaguem nada.'));
    }
    ts.push({id:'grupo',name:'Amigos de Lakewood',sub:'Conversa do grupo',messages:group,replyKey:gr});
  }
  if(clue(s,'bella_contato_c6')){
    const k='bella-inicio',messages=[msg('Bella','Salva meu número. E, por favor, só me manda algo sobre a Jullia se tiver certeza.')];
    const picked=replyOptions[k].find(x=>x.id===whenReply(s,k));if(picked){messages.push(msg('Você',picked.text));messages.push(msg('Bella',picked.answer));}
    if(clue(s,'bella_trilha_c6'))messages.push(msg('Bella','Eu segui minha irmã por uma trilha naquela noite. Não vi o que aconteceu na estrada.'));
    ts.push({id:'bella',name:'Bella Gomes',sub:'Irmã de Jullia',messages,replyKey:k});
  }
  if(s.romanceEscolhido==='ryan'&&ch>=5){
    const k='ryan-romance',messages=[msg('Ryan','Eu gostei de ficar com você. Só não quero colocar pressa em nada.','DEPOIS DA CONVERSA')];
    const picked=replyOptions[k].find(x=>x.id===whenReply(s,k));
    const oldReply=Number(s?.interactive?.phoneReplies?.[k]?.atStage||0)<49;
    if(picked&&oldReply){messages.push(msg('Você',picked.text));messages.push(msg('Ryan',picked.answer));}
    if(late&&!dead(s,'ryan'))messages.push(msg('Ryan','Quando você puder, me avisa que chegou. Tô preocupado.','DEPOIS DO ATAQUE'));
    if(picked&&!oldReply){messages.push(msg('Você',picked.text));messages.push(msg('Ryan',picked.answer));}
    ts.push({id:'ryan',name:'Ryan Cariolato',sub:'Conversa particular',messages,replyKey:dead(s,'ryan')?null:k});
  }
  for(const [id,name,first] of [
    ['breno','Breno Ferreira','Eu não sou muito bom falando dessas coisas por mensagem. Mas gostei de ter você comigo ontem.'],
    ['rayssa','Rayssa Santos','Eu fiquei pensando na nossa conversa. Queria te ver de novo quando tudo ficar menos assustador.'],
    ['rauanny','Rauanny Borges','Só avisando que eu gostei de ficar com você. E não, não vou fingir que não gostei.']
  ]){
    if(s.romanceEscolhido!==id||ch<5||dead(s,id))continue;
    const k=id+'-romance',picked=replyOptions[k].find(x=>x.id===whenReply(s,k));
    const found=ts.find(t=>t.id===id);const messages=found?found.messages:[msg(personName(id),first,'DEPOIS DO CAPÍTULO 5')];
    if(picked){messages.push(msg('Você',picked.text));messages.push(msg(personName(id),picked.answer));}
    if(found)found.replyKey=k;else ts.push({id,name,sub:'Conversa particular',messages,replyKey:k});
  }
  if(ch>=6){
    const messages=[msg('Breno','Vou resolver uma coisa com Samuel na oficina. Depois tento voltar.','TARDE')];
    if(late)messages.push(msg('Breno','Chegou em segurança? A gente precisa descansar antes de conversar com a polícia.','NOITE'));
    const existing=ts.find(t=>t.id==='breno');
    if(existing){
      // Conversas do capítulo 5 antecedem a oficina; respostas posteriores ficam ao final.
      const picked=replyOptions['breno-romance'].find(x=>x.id===whenReply(s,'breno-romance'));
      const atStage=Number(s?.interactive?.phoneReplies?.['breno-romance']?.atStage||0);
      if(picked&&atStage>=49){existing.messages.splice(existing.messages.length-2,0,...messages);}
      else existing.messages.push(...messages);
    }else ts.push({id:'breno',name:'Breno Ferreira',sub:'Conversa particular',messages});
  }
  const unknown=[];
  if(clue(s,'foto_dentro_apartamento_c6'))unknown.push(msg('Número desconhecido','Uma fotografia foi enviada de dentro do apartamento.','NOITE DO ATAQUE'));
  for(const a of ALERTS){const d=s?.interactive?.alerts?.[a.id];if(!d)continue;if(a.from==='desconhecido')unknown.push(msg('Número desconhecido',a.text,a.time));}
  if(unknown.length)ts.push({id:'oculto',name:'Número desconhecido',sub:'Remetente não identificado',messages:unknown});
  for(const a of ALERTS){const d=s?.interactive?.alerts?.[a.id];if(!d||a.from==='desconhecido')continue;let t=ts.find(t=>t.id===a.thread);
    if(!t){t={id:a.thread,name:a.sender,sub:'Conversa particular',messages:[]};ts.push(t)}
    const alertMessages=[msg(a.sender,a.text,a.time)];
    const picked=a.options.find(o=>o.id===d.choice);if(picked)alertMessages.push(msg('Você',picked.text,a.time));
    else if(d.choice==='ignore')alertMessages.push(msg('Sistema','Notificação ignorada.',a.time));
    if(a.id==='c6-entrada'){
      const after=t.messages.findIndex(m=>m.time==='MADRUGADA');
      t.messages.splice(after>=0?after:t.messages.length,0,...alertMessages);
    }else if(a.id==='c6-ryan'){
      const after=t.messages.findIndex(m=>m.time==='DEPOIS DO ATAQUE');
      t.messages.splice(after>=0?after:t.messages.length,0,...alertMessages);
    }else t.messages.push(...alertMessages);
  }
  return ts;
}
function choicesFor(s,thread){const k=thread?.replyKey;if(!k||whenReply(s,k))return[];if(k==='grupo-depois'&&stage(s)<49)return[];return replyOptions[k]||[];}
function reply(s,key,id){const options=replyOptions[key];const selected=options?.find(x=>x.id===id);if(!selected||whenReply(s,key))return false;
 const tr=threads(s).find(t=>t.replyKey===key);if(!tr)return false;
 s.interactive??=empty();s.interactive.phoneReplies[key]={id,atStage:stage(s),atChapter:chapter(s)};
 if(key.endsWith('-romance')){const who=key.split('-')[0];if(!dead(s,who)&&s.romanceEscolhido===who){s.bonds[who]=Math.min(100,(s.bonds[who]??50)+1);s.romance[who]??={atracao:0,ressentimento:0};s.romance[who].atracao=Math.min(100,(s.romance[who].atracao||0)+2);}}
 if(key==='bella-inicio'){s.flags['phone_bella_'+id]=true;}
 if(key==='grupo-depois'){
   if(id==='apoio'&&!dead(s,'laisla'))s.bonds.laisla=Math.min(100,(s.bonds.laisla??50)+2);
   if(id==='fatos'&&!s.clues.includes('conversa_grupo_preservada_c6'))s.clues.push('conversa_grupo_preservada_c6');
 }
 s.interactive.events.push({type:'phone',label:'Você respondeu à conversa com '+tr.name+'.',chapter:chapter(s)});
 return true;
}

// V1.0.6: a notification exists only at its real narrative moment; no impossible future messages.
const ALERTS=[
 {id:'c6-entrada',node:'h05',sender:'Laisla',thread:'grupo',from:'laisla',time:'ANTES DO JANTAR',text:'Vocês estão chegando? O macarrão vai esfriar, e eu não vou esperar a vida inteira.',options:[
  {id:'acolher',text:'Estamos indo! Guarda um prato pra mim.',bond:['laisla',2],result:'Laisla ficou contente de saber que você estava chegando.'},
  {id:'seco',text:'Já estamos chegando.',bond:['laisla',0],result:'Você respondeu rapidamente enquanto Breno dirigia.'}]},
 {id:'c6-ryan',node:'h06',sender:'Ryan',thread:'ryan',from:'ryan',time:'PORTARIA',text:'Te vi chegando pelo pátio. Depois me chama antes de subir, tá?',options:[
  {id:'carinho',text:'Pode deixar. Quero te ver um pouquinho também.',romance:'ryan',bond:['ryan',2],result:'Ryan percebeu sua vontade de vê-lo.'},
  {id:'amizade',text:'Fechado, te aviso em alguns minutos.',bond:['ryan',1],result:'Você combinou de encontrar Ryan.'}]},
 {id:'c6-invasao',node:'h17',sender:'Número desconhecido',thread:'oculto',from:'desconhecido',time:'DURANTE O ATAQUE',text:'Você devia ter olhado melhor quem estava dentro daquele apartamento.',options:[
  {id:'salvar',text:'Salvar a mensagem como prova',clue:'registro_ameaca_celular_c6',result:'A ameaça ficou preservada no celular para a investigação.'},
  {id:'descartar',text:'Bloquear a tela e se concentrar na fuga',result:'Você guardou o telefone sem examinar a mensagem.'}]},
 {id:'c6-bella',node:'h49',sender:'Bella',thread:'bella',from:'bella',time:'DEPOIS DO RESGATE',text:'Eu vi as viaturas no condomínio. Se você souber qualquer coisa sobre a Jullia, fala comigo antes que vire fofoca.',options:[
  {id:'ajudar',text:'Vou te avisar quando tiver algo confirmado.',clue:'bella_pedido_celular_c6',result:'Você prometeu compartilhar apenas informações verificadas.'},
  {id:'reservar',text:'Agora não dá. Preciso cuidar do pessoal.',result:'Você preferiu esperar antes de envolver Bella.'}]},
 {id:'c6-chamada',node:'h51',sender:'Número restrito',thread:'oculto',from:'desconhecido',type:'call',time:'23:57',text:'Chamada recebida de um número restrito.',options:[
  {id:'atender',text:'Atender e guardar o registro da ligação',clue:'ligacao_restrita_registrada_c6',result:'Você atendeu à ligação. O registro e o horário foram preservados.'},
  {id:'recusar',text:'Recusar a chamada e guardar o aparelho',result:'A chamada foi recusada, mas o horário ficou registrado.'}]}
];
function activeAlert(s,node){return ALERTS.find(a=>a.node===node&&!s?.interactive?.alerts?.[a.id]&&(!(a.id==='c6-ryan')||!dead(s,'ryan'))&&(!(a.id==='c6-bella')||clue(s,'bella_contato_c6')))||null;}
function chooseAlert(s,id,choice){const a=ALERTS.find(x=>x.id===id);if(!a||a.node!==s.node||s.interactive?.alerts?.[id])return false;
 const o=a.options.find(x=>x.id===choice);if(!o&&choice!=='ignore')return false;
 s.interactive??=empty();s.interactive.alerts[id]={choice,at:s.node};
 if(o?.bond){const [pid,n]=o.bond;s.bonds[pid]=Math.max(0,Math.min(100,(s.bonds[pid]??50)+n));}
 if(o?.romance&&s.romanceEscolhido===o.romance){s.romance[o.romance]??={atracao:0,ressentimento:0};s.romance[o.romance].atracao=Math.min(100,(s.romance[o.romance].atracao||0)+2);}
 if(o?.clue&&!s.clues.includes(o.clue))s.clues.push(o.clue);
 s.interactive.events.push({type:'alert',label:choice==='ignore'?'Você ignorou uma notificação de '+a.sender+'.':o.result,chapter:chapter(s),at:s.node});
 return true;
}
const MEDIA_DETAILS={
 foto_dentro_apartamento_c6:{title:'Fotografia tirada durante o jantar',kind:'Fotografia',description:'A imagem veio de um ponto dentro do apartamento. O ângulo importa mais que o remetente, que ainda é desconhecido.',derived:'arquivo_foto_examinado_c6'},
 voz_jullia_backup:{title:'Último áudio de Jullia',kind:'Registro de áudio',description:'Gravação anterior ao acidente: Jullia estava abalada na mata e ouviu algo que a assustou. O áudio termina antes do atropelamento. Transcrição parcial; não há gravação dublada.',derived:'arquivo_audio_examinado'},
 mensagens_restauradas:{title:'Mensagens recuperadas',kind:'Conversa exportada',description:'Fragmentos recuperados antes do acidente. A datação pode ajudar a comparar depoimentos, mas não mostra quem acessou as mensagens depois.',derived:'arquivo_mensagens_examinadas'},
 foto_van_origem:{title:'Fotografia da van',kind:'Fotografia',description:'Imagem ligada à estrada naquela noite. Examinar o enquadramento pode ajudar a reconstituir a posição de uma possível testemunha.',derived:'arquivo_van_examinada'},
 cracha_portao_c5:{title:'Crachá com detalhe azul',kind:'Imagem',description:'O detalhe azul permite comparar este registro à lembrança da guarita.',derived:'arquivo_cracha_examinado'}
};
function examineMedia(s,id){const d=MEDIA_DETAILS[id];if(!d||!clue(s,id))return false;s.interactive??=empty();if(s.interactive.mediaReviewed.includes(id))return false;
 s.interactive.mediaReviewed.push(id);if(!s.clues.includes(d.derived))s.clues.push(d.derived);
 s.interactive.events.push({type:'media',label:'Você examinou '+d.title.toLowerCase()+' e registrou detalhes no quadro.',chapter:chapter(s)});return true;}

const CONNECTIONS=[
 {id:'pacto',a:'saco_na_van',b:'pacto_verao',title:'O encobrimento',text:'O saco veio da van. O grupo decidiu esconder o ocorrido em vez de pedir ajuda. O pacto explica o medo atual, mas não identifica quem ameaça vocês.'},
 {id:'trilha',a:'bella_trilha_c6',b:'meia_confissao_samuel',title:'Duas pessoas perto da mata',text:'O relato de Bella pode se relacionar à figura vista por Samuel. Ambos descrevem a mesma noite, mas ainda faltam horários e confirmação da identidade.'},
 {id:'observador',a:'foto_van_origem',b:'testemunha_estrada',title:'Uma testemunha na estrada?',text:'O ângulo de uma fotografia pode indicar de onde alguém observava a estrada. Isso não prova quem tirou a imagem nem o que testemunhou.'},
 {id:'audio',a:'voz_jullia_backup',b:'mensagens_restauradas',title:'Os registros de Jullia',text:'Existe um áudio gravado antes do atropelamento e fragmentos de mensagens recuperadas. Ainda não é possível saber quem teve acesso aos arquivos depois.'},
 {id:'moises',a:'moises_evita_bella_c6',b:'moises_apos_ataque_c6',title:'A atitude de Moisés',text:'Moisés se afasta de Bella, mas apareceu perto das viaturas. É um comportamento contraditório, não uma confissão.'},
 {id:'portao',a:'cracha_portao_c5',b:'vigia_portao_c5',title:'O detalhe azul',text:'O crachá e a lembrança da guarita sugerem uma ligação possível. A fotografia não é suficiente para identificar ninguém.'},
 {id:'janela',a:'foto_dentro_apartamento_c6',b:'escada_manutencao_c6',title:'Vigilância sobre o prédio',text:'A foto prova acesso ao apartamento; a escada já estava no prédio vizinho. As duas pistas ajudam a reconstruir a noite, mas não demonstram que o agressor previu o resgate.'},
 {id:'acesso',a:'foto_dentro_apartamento_c6',b:'grade_servico_c6',title:'As rotas do condomínio',text:'A rota de serviço e a fotografia sugerem que diferentes pessoas poderiam circular perto do apartamento. É preciso conferir horários e acessos.'},
 {id:'conversa-horarios',a:'conversa_grupo_preservada_c6',b:'cronologia_ataque_c6',title:'O grupo e os horários',text:'Mensagens preservadas podem ser confrontadas com os horários do ataque. Diferenças não provam mentiras por si só.'},
 {id:'rastro-digital',a:'registro_ameaca_celular_c6',b:'arquivo_foto_examinado_c6',title:'A ameaça e a imagem',text:'O texto ameaçador e a imagem tirada de dentro do apartamento parecem ter sido enviados com a mesma intenção: demonstrar vigilância. Não há prova sobre a autoria.'},
 {id:'fita-van',a:'arquivo_van_examinada',b:'testemunha_estrada',title:'A posição da câmera',text:'O enquadramento ajuda a delimitar pontos possíveis de observação na estrada. Isso não identifica o fotógrafo.'},
 {id:'voz-trilha',a:'arquivo_audio_examinado',b:'bella_trilha_c6',title:'A mata antes do atropelamento',text:'O áudio anterior ao acidente e o caminho descrito por Bella podem ajudar a reconstruir a sequência de acontecimentos.'},
 {id:'origem',a:'moises_parou_portao',b:'moises_relacao',title:'As contradições de Moisés',text:'Moisés aparece ligado ao portão e ao passado de Jullia. O que ele sentia naquela noite não comprova participação nos ataques.'},
 {id:'velas-memorial',a:'marca_cera_vermelha',b:'bilhete_ameaca',title:'O bilhete passou pelo memorial',text:'A cera remete às velas disponíveis na homenagem. O remetente pode ter usado material do local sem ter participado da festa um ano antes.'},
 {id:'acesso-tecnico',a:'trilha_servico',b:'fita_vermelha_trilha',title:'A trilha foi usada recentemente',text:'A fita recente pode marcar uma passagem de manutenção. Ela não foi necessariamente deixada na noite do acidente.'},
 {id:'backup-propriedade',a:'notebook_marina',b:'acesso_audio_c5',title:'Um arquivo recuperado depois',text:'O computador de backup poderia permitir copiar gravações antigas após o desaparecimento. Ainda não se sabe quem entrou nessa conta.'},
 {id:'camera-estrada',a:'foto_van_origem',b:'cameras_mansao',title:'O acesso às câmeras antigas',text:'A origem da fotografia pode estar relacionada ao sistema de serviço da propriedade. É possível recuperar imagens sem ter estado presente na estrada naquela hora.'}
];
const found=(s,d)=>clue(s,d.a)&&clue(s,d.b);
function connect(s,id){const d=CONNECTIONS.find(c=>c.id===id);if(!d||!found(s,d)||s.interactive.connections.includes(id))return false;s.interactive.connections.push(id);s.interactive.events.push({type:'deduction',label:'Você relacionou duas pistas: '+d.title+'.',chapter:chapter(s)});return true;}
function timeline(s){if(!s)return[];const out=[];let seq=0;
 const add=(title,text,chapterNum,kind)=>out.push({id:String(++seq),title,text,chapter:chapterNum,kind});
 if(clue(s,'pacto_verao'))add('O pacto do lago','Vocês decidiram esconder o atropelamento. O silêncio passou a acompanhar o grupo.',0,'segredo');
 if(clue(s,'bilhete_ameaca'))add('A primeira ameaça','Alguém deixou claro que conhece o segredo do verão passado.',1,'ameaça');
 if(clue(s,'meia_confissao_samuel'))add('Samuel contou uma parte da verdade','Samuel admitiu ter visto uma figura perto da mata naquela noite.',3,'revelação');
 if(chapter(s)>=5||String(s.node||'').startsWith('g')){
   if(s.flags?.allan_morto_c4)add('A ausência de Allan','Allan não sobreviveu ao que aconteceu no arquivo da estrada norte.',4,'perda');
   else if((s.history||[]).some(x=>String(x.node).startsWith('f')))add('Allan conseguiu escapar','Allan chegou ao fim da perseguição no arquivo com vida.',4,'sobrevivência');
 }
 if(s.romanceEscolhido){add('Uma aproximação escolhida',s.romanceEscolhido==='solteiro'?'Você decidiu não seguir nenhuma rota romântica por enquanto.':'Você decidiu se aproximar de '+personName(s.romanceEscolhido)+', sem assumir um namoro automaticamente.',5,'relação');}
 const completed=stage(s)>=45;
 if(completed){
   const victims=['laisla','rauanny','isabella','allan','ryan'].filter(id=>dead(s,id)&&!(id==='allan'&&s.flags?.allan_morto_c4));
   add('A fuga do condomínio',victims.length?victims.map(id=>personName(id)).join(', ')+' não sobreviveu ao ataque. Os demais precisaram lidar com as consequências.':'O grupo conseguiu deixar o condomínio sem perder ninguém durante o ataque.',6,victims.length?'perda':'sobrevivência');
   const wounded=['laisla','rauanny','isabella','allan','ryan'].filter(id=>!dead(s,id)&&!!window.UGConsequences?.injury?.(s,id)?.severity);
   if(wounded.length)add('Ferimentos que ainda importam',wounded.map(id=>personName(id)).join(', ')+' saiu do confronto com lesões registradas. Essas condições acompanham os próximos acontecimentos.',6,'consequência');
 }
 for(const id of s?.interactive?.connections||[]){const d=CONNECTIONS.find(c=>c.id===id);if(d)add('Pistas conectadas: '+d.title,'Uma hipótese foi registrada no seu quadro de investigação. Ainda pode haver outras explicações.',chapter(s),'investigação');}
 for(const e of s?.interactive?.events||[])if(['phone','alert','media'].includes(e.type))add(e.type==='media'?'Arquivo examinado':e.type==='alert'?'Notificação e consequência':'Uma conversa no celular',e.label,e.chapter,e.type==='media'?'investigação':'mensagem');
 return out;
}
function callLog(s){const logs=[];const answered=s?.interactive?.alerts?.['c6-chamada'];if(answered)logs.push({who:'Número restrito',status:answered.choice==='atender'?'Atendida · 23:57':'Recusada · 23:57'});if(clue(s,'ligacao_no_jantar_c6'))logs.push({who:'Voz distorcida',status:'Ligação recebida durante o jantar'});if(clue(s,'ligacao_telefone_fixo'))logs.push({who:'Telefone fixo',status:'Registro encontrado na investigação'});return logs;}
function media(s){return [['foto_dentro_apartamento_c6','Fotografia enviada durante o jantar'],['voz_jullia_backup','Áudio recuperado de Jullia'],['mensagens_restauradas','Conversas restauradas'],['foto_van_origem','Fotografia da van'],['cracha_portao_c5','Crachá com detalhe azul']].filter(([key])=>clue(s,key));}
function resolve(node,s,n){
  if(!s||!n)return n;
  const al=s.interactive?.alerts||{};
  let extra='';
  if(node==='h07'){
   if(al['c6-entrada']?.choice==='acolher')extra='Laisla ergue a travessa ao ver você entrar.\n\nLaisla: — Achei que você ia me deixar aqui sozinha com esse macarrão. Li sua mensagem. Ainda bem que chegaram.';
   else if(al['c6-entrada']?.choice==='seco')extra='Laisla aponta para o próprio celular, deixado sobre a mesa.\n\nLaisla: — Pelo menos alguém avisou que tava chegando. Tava quase desistindo de esperar.';
  }
  if(node==='h06_ryan_privado'&&al['c6-ryan']?.choice==='carinho'&&s.romanceEscolhido==='ryan')extra='Ryan sorri ao se lembrar da sua mensagem.\n\nRyan: — Li o que você mandou. Eu também queria esse tempinho com você.';
  if(node==='h51'){
   if(al['c6-chamada']?.choice==='atender')extra='Você atende. Do outro lado, há um ruído abafado, três batidas secas e então a ligação cai. Nenhuma voz se identifica. Você salva o horário e a duração no histórico.';
   else if(al['c6-chamada']?.choice==='recusar')extra='Você recusa a ligação e deixa o celular virado para baixo. O horário continua visível no histórico, mesmo sem saber quem tentou ligar.';
  }
  return extra?{...n,text:n.text+'\n\n'+extra}:n;
}
window.UGInteractive=Object.freeze({empty,restore,chapter,stage,dead,threads,choicesFor,reply,connections:CONNECTIONS,found,connect,timeline,callLog,media,mediaDetails:MEDIA_DETAILS,examineMedia,alerts:ALERTS,activeAlert,chooseAlert,resolve});
})();
