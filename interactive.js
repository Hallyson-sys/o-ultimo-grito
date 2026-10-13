/* O ÚLTIMO GRITO · V1.0.5 · celular, investigação e efeito borboleta
   Sem rede, sem spoilers do mistério. O progresso fica no slot do jogador. */
(()=>{'use strict';
const empty=()=>({version:1,phoneReplies:{},connections:[],notes:'',events:[]});
const safeObj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const restore=x=>{const y=safeObj(x);return {version:1,phoneReplies:{...safeObj(y.phoneReplies)},connections:Array.isArray(y.connections)?[...new Set(y.connections.filter(v=>typeof v==='string'))].slice(0,30):[],notes:typeof y.notes==='string'?y.notes.slice(0,1500):'',events:Array.isArray(y.events)?y.events.filter(a=>a&&typeof a.label==='string').slice(-40):[]};};
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
  'grupo-depois':[
    {id:'apoio',text:'Chegaram em segurança? Se precisarem, me chamem.',answer:'Laisla: Obrigada por perguntar. Hoje tá difícil até respirar direito.'},
    {id:'fatos',text:'Guardem as fotos e horários. A polícia vai precisar.',answer:'Breno: Eu salvei o que conseguimos. Não apaguem nada.'}
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
      group.push(msg('Sistema','Depois do ataque, o grupo voltou a trocar mensagens.','MADRUGADA'));
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
    const k='ryan-romance',messages=[msg('Ryan','Eu gostei de ficar com você. Só não quero colocar pressa em nada.')];
    const picked=replyOptions[k].find(x=>x.id===whenReply(s,k));if(picked){messages.push(msg('Você',picked.text));messages.push(msg('Ryan',picked.answer));}
    if(late&&dead(s,'ryan'))messages.push(msg('Sistema','Nenhuma nova mensagem recebida.'));
    else if(late)messages.push(msg('Ryan','Quando você puder, me avisa que chegou. Tô preocupado.'));
    ts.push({id:'ryan',name:'Ryan Cariolato',sub:'Conversa particular',messages,replyKey:dead(s,'ryan')?null:k});
  }
  if(ch>=6){
    const messages=[msg('Breno','Vou resolver uma coisa com Samuel na oficina. Depois tento voltar.','TARDE')];
    if(late)messages.push(msg('Breno','Chegou em segurança? A gente precisa descansar antes de conversar com a polícia.','NOITE'));
    ts.push({id:'breno',name:'Breno Ferreira',sub:'Conversa particular',messages});
  }
  if(clue(s,'foto_dentro_apartamento_c6'))ts.push({id:'oculto',name:'Número desconhecido',sub:'Remetente não identificado',messages:[msg('Número desconhecido','Imagem recebida durante o jantar. A fotografia parece ter sido feita de dentro do apartamento.','NOITE DO ATAQUE')]});
  return ts;
}
function choicesFor(s,thread){const k=thread?.replyKey;if(!k||whenReply(s,k))return[];if(k==='grupo-depois'&&stage(s)<49)return[];return replyOptions[k]||[];}
function reply(s,key,id){const options=replyOptions[key];const selected=options?.find(x=>x.id===id);if(!selected||whenReply(s,key))return false;
 const tr=threads(s).find(t=>t.replyKey===key);if(!tr)return false;
 s.interactive??=empty();s.interactive.phoneReplies[key]={id};
 if(key==='ryan-romance'&&!dead(s,'ryan')){s.bonds.ryan=Math.min(100,(s.bonds.ryan??50)+1);s.romance.ryan??={atracao:0,ressentimento:0};s.romance.ryan.atracao=Math.min(100,(s.romance.ryan.atracao||0)+1);}
 s.interactive.events.push({type:'phone',label:'Você respondeu à conversa com '+tr.name+'.',chapter:chapter(s)});
 return true;
}
const CONNECTIONS=[
 {id:'pacto',a:'saco_na_van',b:'pacto_verao',title:'O encobrimento',text:'O saco veio da van. O grupo decidiu esconder o ocorrido em vez de pedir ajuda. O pacto explica o medo atual, mas não identifica quem ameaça vocês.'},
 {id:'trilha',a:'bella_trilha_c6',b:'meia_confissao_samuel',title:'Duas pessoas perto da mata',text:'O relato de Bella pode se relacionar à figura vista por Samuel. Ambos descrevem a mesma noite, mas ainda faltam horários e confirmação da identidade.'},
 {id:'observador',a:'foto_van_origem',b:'testemunha_estrada',title:'Uma testemunha na estrada?',text:'O ângulo de uma fotografia pode indicar de onde alguém observava a estrada. Isso não prova quem tirou a imagem nem o que testemunhou.'},
 {id:'audio',a:'voz_jullia_backup',b:'mensagens_restauradas',title:'Os registros de Jullia',text:'Existe um áudio gravado antes do atropelamento e fragmentos de mensagens recuperadas. Ainda não é possível saber quem teve acesso aos arquivos depois.'},
 {id:'moises',a:'moises_evita_bella_c6',b:'moises_apos_ataque_c6',title:'A atitude de Moisés',text:'Moisés se afasta de Bella, mas apareceu perto das viaturas. É um comportamento contraditório, não uma confissão.'},
 {id:'portao',a:'cracha_portao_c5',b:'vigia_portao_c5',title:'O detalhe azul',text:'O crachá e a lembrança da guarita sugerem uma ligação possível. A fotografia não é suficiente para identificar ninguém.'},
 {id:'janela',a:'foto_dentro_apartamento_c6',b:'escada_manutencao_c6',title:'Vigilância sobre o prédio',text:'A foto prova acesso ao apartamento; a escada já estava no prédio vizinho. As duas pistas ajudam a reconstruir a noite, mas não demonstram que o agressor previu o resgate.'},
 {id:'acesso',a:'foto_dentro_apartamento_c6',b:'grade_servico_c6',title:'As rotas do condomínio',text:'A rota de serviço e a fotografia sugerem que diferentes pessoas poderiam circular perto do apartamento. É preciso conferir horários e acessos.'},
 {id:'origem',a:'moises_parou_portao',b:'moises_relacao',title:'As contradições de Moisés',text:'Moisés aparece ligado ao portão e ao passado de Jullia. O que ele sentia naquela noite não comprova participação nos ataques.'}
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
 for(const e of s?.interactive?.events||[])if(e.type==='phone')add('Uma conversa no celular',e.label,e.chapter,'mensagem');
 return out;
}
function callLog(s){const logs=[];if(clue(s,'ligacao_no_jantar_c6'))logs.push({who:'Voz distorcida',status:'Ligação recebida durante o jantar'});if(clue(s,'ligacao_telefone_fixo'))logs.push({who:'Telefone fixo',status:'Registro encontrado na investigação'});return logs;}
function media(s){return [['foto_dentro_apartamento_c6','Fotografia enviada durante o jantar'],['voz_jullia_backup','Áudio recuperado de Jullia'],['mensagens_restauradas','Conversas restauradas'],['foto_van_origem','Fotografia da van'],['cracha_portao_c5','Crachá com detalhe azul']].filter(([key])=>clue(s,key));}
window.UGInteractive=Object.freeze({empty,restore,chapter,stage,dead,threads,choicesFor,reply,connections:CONNECTIONS,found,connect,timeline,callLog,media});
})();
