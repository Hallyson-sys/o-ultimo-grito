/* O ÚLTIMO GRITO · V1.0.4 · consequências persistentes (sem dependências externas).
 * Ferimentos e lembranças reconstruídos dos fatos no slot; vínculos extras registrados
 * por evento narrativo e migrados uma única vez para saves anteriores.
 */
(()=>{'use strict';
const PEOPLE=['hero','rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno'];
const NAMES={hero:'Você',rayssa:'Rayssa',ryan:'Ryan',laisla:'Laisla',samuel:'Samuel',rauanny:'Rauanny',allan:'Allan',isabella:'Isabella',breno:'Breno'};
const FRIEND_BASE={};
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const pair=(a,b)=>[a,b].sort().join(':');
const killed=(s,id)=>!!s?.flags?.['c6_morto_'+id]||(id==='allan'&&!!s?.flags?.allan_morto_c4);
const wounds={
 ferida_rauanny:{id:'primeira_fuga',person:'rauanny',part:'braço e joelho',label:'Cortes e contusões na primeira fuga',severity:1,source:'Capítulo 2'},
 ferida_allan_c4:{id:'arquivo_allan',person:'allan',part:'braço',label:'Ferimento no braço durante a fuga do arquivo',severity:2,source:'Capítulo 4'},
 ferida_samuel_c4:{id:'arquivo_samuel',person:'samuel',part:'corpo',label:'Contusões na fuga do arquivo',severity:1,source:'Capítulo 4'},
 ferida_protagonista_c4:{id:'arquivo_hero',person:'hero',part:'corpo',label:'Escoriações e dores depois da fuga',severity:1,source:'Capítulo 4'}
};
const BODY={hero:'mãos e braços',laisla:'mão e braço',rauanny:'tornozelo e perna',isabella:'braço e ombro',allan:'braço',rayssa:'corpo',ryan:'mãos e costas',breno:'corpo',samuel:'corpo'};
const MEMORY={
 allan:{samuel:['A ausência de Allan','O silêncio do melhor amigo acompanha Samuel, mesmo nos momentos em que tenta se distrair.'],hero:['A perda de Allan','O grupo perdeu Allan na fuga; suas escolhas continuam pesando depois daquela noite.']},
 isabella:{rayssa:['A perda de Isabella','O ataque tirou de Rayssa sua melhor amiga. Seu desespero não desaparece ao chegar a um lugar seguro.']},
 laisla:{rauanny:['A perda de Laisla','Rauanny ainda escuta a voz de Laisla quando pensa na travessia entre os prédios.'],ryan:['O resgate de Laisla','Ryan se lembra da janela do apartamento e do momento em que não conseguiu trazê-la de volta.']},
 rauanny:{laisla:['A perda de Rauanny','Laisla fica presa à lembrança da amiga durante o ataque, mesmo depois da chegada dos socorristas.'],ryan:['O resgate de Rauanny','Ryan revive a imagem de Rauanny tentando fugir pelo vão entre os blocos.']},
 ryan:{laisla:['A perda de Ryan','Laisla lembra quem estendeu a escada entre os prédios e como tudo terminou.'],rauanny:['A perda de Ryan','O silêncio de Ryan depois do ataque deixou uma ausência que Rauanny não sabe preencher.']}
};
function eventInjuries(s,id){
 const f=s?.flags||{};if(killed(s,id))return [];
 let result=[];
 for(const [key,item] of Object.entries(wounds))if(f[key]&&item.person===id)result.push({...item});
 if(f['c6_ferida_'+id])result.push({id:'apartamento_'+id,person:id,part:BODY[id]||'corpo',label:id==='rauanny'?'Ferimento na perna durante o ataque ao apartamento':'Ferimento durante a invasão ou travessia',severity:2,source:'Capítulo 6',treated:id==='rauanny'&&!!f.c6_rauanny_atendida});
 if(id==='allan'&&f.c6_ferido_allan&&!f.c6_ferida_allan)result.push({id:'celular_allan',person:id,part:'braço',label:'Ferimento na fuga pela cozinha',severity:1,source:'Capítulo 6'});
 if(id==='ryan'&&f.c6_ferido_ryan&&!f.c6_ferida_ryan)result.push({id:'resgate_ryan',person:id,part:'mãos e costas',label:'Contusões ao proteger a escada',severity:1,source:'Capítulo 6'});
 return result;
}
function injury(s,id){const items=eventInjuries(s,id);return {items,severity:items.reduce((max,w)=>Math.max(max,w.severity),0),parts:[...new Set(items.map(x=>x.part))]};}
function knowsDeath(s,person,victim){if(person===victim)return false;if(victim==='allan'&&s.flags?.allan_morto_c4)return true;
 return !!s.knowledge?.people?.[person]?.['morte:'+victim] || (s.node==='fim10'&&!!s.flags?.['c6_morto_'+victim]);}
function memories(s,id){if(killed(s,id))return [];const result=[];const f=s.flags||{};
 if(id==='samuel'&&f.allan_morto_c4)result.push({id:'samuel_allan_c4',title:'O luto por Allan',description:'A perda do melhor amigo continua interferindo em como Samuel reage às ameaças.',weight:3});
 for(const [victim,map] of Object.entries(MEMORY)){
   if(!f['c6_morto_'+victim]||!map[id]||!knowsDeath(s,id,victim))continue;
   const [title,description]=map[id];result.push({id:'luto_'+victim,title,description,weight:3});
 }
 if(id==='ryan'&&!killed(s,'ryan')&&f.c6_escada_segura)result.push({id:'escada_preparada',title:'A escada entre os blocos',description:'Ryan ainda se recorda da decisão de pedir ajuda para sustentar a passagem.',weight:2});
 if(id==='isabella'&&!killed(s,'isabella')&&f.c6_b_junto)result.push({id:'reencontro',title:'A saída da cozinha',description:'Isabella conseguiu voltar aos amigos depois de se separar deles durante a invasão.',weight:1});
 if(id==='rayssa'&&f.c6_morto_isabella&&knowsDeath(s,id,'isabella'))result.push({id:'choque_isa',title:'O silêncio depois do ataque',description:'Rayssa tenta organizar pensamentos que ainda voltam à cozinha de Laisla.',weight:2});
 if(id==='hero'){
   for(const victim of ['laisla','rauanny','isabella','allan','ryan']){
     if(f['c6_morto_'+victim]&&knowsDeath(s,'hero',victim))result.push({id:'luto_hero_'+victim,title:'A perda de '+NAMES[victim],description:'A notícia sobre '+NAMES[victim]+' mudou a maneira como você recorda o ataque ao apartamento.',weight:3});
   }
 }
 if(id==='laisla'&&!killed(s,'rauanny')&&f.c6_rauanny_atendida)result.push({id:'cuidou_rauanny',title:'O cuidado durante o ataque',description:'Laisla ainda lembra o esforço para ajudar Rauanny a apoiar a perna enquanto a porta cedia.',weight:1});
 if(id==='rauanny'&&!killed(s,'laisla')&&f.c6_rauanny_atendida)result.push({id:'apoio_laisla',title:'O apoio de Laisla',description:'Em meio à correria, Rauanny se lembra de quem parou para ajudá-la a recuperar o equilíbrio.',weight:1});
 if(id==='isabella'&&!killed(s,'rayssa')&&f.c6_b_junto)result.push({id:'rayssa_reencontro',title:'Rayssa ao seu lado',description:'As duas voltaram a se encontrar depois de perder contato com o restante do grupo.',weight:1});
 if(id==='hero'&&f.c6_cap6_concluido)result.push({id:'trauma_escada',title:'A travessia do Bloco B',description:'O vento, os gritos e os rostos na janela continuam voltando à memória.',weight:1});
 return result;
}
function status(s,id){if(killed(s,id))return ['rayssa','laisla','rauanny','isabella'].includes(id)?'Falecida':'Falecido';const w=injury(s,id);return w.severity>=2?'Ferimento importante':w.severity?'Em recuperação':'Sem ferimentos registrados'}
function socialForChoice(from,choice,s){const label=String(choice?.text||'');const out=[];const add=(a,b,d)=>{if(a!==b&&!killed(s,a)&&!killed(s,b))out.push([a,b,d]);};
 if(from==='h18b'&&label.startsWith('Ajudar Isabella'))add('isabella','rayssa',2);
 if(from==='h28joinRisk'&&label.startsWith('Aceitar a mão'))add('isabella','rayssa',4);
 if(from==='h28joinRisk'&&label.startsWith('Tentar avançar'))add('isabella','rayssa',-3);
 if(from==='h32'&&label.startsWith('Priorizar o tornozelo'))add('laisla','rauanny',3);
 if(from==='h32'&&label.startsWith('Ajudar Laisla'))add('laisla','rauanny',2);
 if(from==='h38_ok'&&label.startsWith('Confirmar que chegou')){
  const who=s.flags?.c6_current;if(who&&who!=='hero'&&who!=='rayssa'&&who!=='ryan')add('ryan',who,s.flags?.['c6_ferida_'+who]?4:3);
 }
 if(from==='h38_fall'&&label.startsWith('Receber ajuda')){
  const who=s.flags?.c6_current;if(who&&who!=='hero'&&who!=='rayssa'&&who!=='ryan')add('ryan',who,4);
 }
 if(from==='h39'&&label.startsWith('Recuar com Ryan')){for(const who of ['laisla','rauanny']){if(s.flags?.['c6_crossed_'+who])add('ryan',who,2);}}
 return out;
}
// Migração de relações: replay determinístico só dos efeitos V1.0.4 novos.
function migrateSocial(s,baseFn){
 if((s.socialDepthVersion||0)>=1)return false;
 const sim={flags:{}};let changed=false;
 for(const h of s.history||[]){
  const choicesSocial=socialForChoice(h.node,{text:h.choice},sim);
  for(const [a,b,delta] of choicesSocial){
   const key=pair(a,b);s.friendBonds??={};const before=baseFn(a,b)+(s.friendBonds[key]||0);
   s.friendBonds[key]=clamp((s.friendBonds[key]||0)+delta,-100,100);
   h.effects??=[];h.effects.push({type:'friendBond',key,value:delta,name:NAMES[a]+' ↔ '+NAMES[b],from:clamp(before,0,100),to:clamp(baseFn(a,b)+s.friendBonds[key],0,100)});changed=true;
  }
  for(const e of h.effects||[]){const type=e.type||e[0],key=e.key||e[1],value=e.value??e[2];
   if(type==='flag'||type==='set')sim.flags[key]=value;
   else if(type==='cross')sim.flags['c6_crossed_'+key]=true;
   else if(type==='death')sim.flags['c6_morto_'+key]=true;
  }
 }
 s.socialDepthVersion=1;return changed;
}
function resolve(id,s,n){if(!s||!n)return n;const f=s.flags||{};let extra='';
 if(id==='h01'){
  const w=injury(s,'hero');if(w.severity)extra='Ao ajeitar a alça da mochila, você sente as dores que ainda não desapareceram desde a última fuga. Breno percebe seu movimento, mas espera que você encontre uma posição confortável antes de começar a falar.';
 }
 if(id==='h29'&&!killed(s,'isabella')){
  const v=s.friendBonds||{};const affinity=94+(v[pair('rayssa','isabella')]||0);
  if(affinity>=97)extra='Isabella segura o pulso de Rayssa por um instante. As duas se entendem pelo olhar; Rayssa mantém a grade erguida enquanto a amiga procura onde apoiar os pés.';
  else if(affinity<91)extra='Isabella pede que Rayssa não a puxe sem avisar. As duas tentam acertar o mesmo movimento, ainda abaladas pelas discussões dos últimos dias.';
 }
 if(id==='h43'&&!killed(s,'laisla')&&!killed(s,'rauanny')&&f.c6_ferida_rauanny)extra='Rauanny tenta se levantar quando ouve um nome no rádio. O tornozelo cede e Laisla segura seu braço antes que ela caia. As duas continuam escutando a conversa dos socorristas de mãos dadas.';
 if(id==='h46b'&&!killed(s,'samuel')&&f.ferida_samuel_c4)extra='Samuel força o ombro contra a parede para ficar de pé. Ele tenta ignorar a dor antiga, mas Breno percebe e lhe oferece a cadeira mais próxima.';
 if(id==='h46c'&&!killed(s,'ryan')&&f.c6_ferido_ryan)extra='Ryan se senta perto da janela com as mãos machucadas. Quando tenta segurar um copo, Breno o ajuda sem dizer nada.';
 if(!extra)return n;
 return {...n,text:n.text+'\n\n'+extra};
}
window.UGConsequences={injury,memories,status,killed,socialForChoice,migrateSocial,resolve,names:NAMES};
})();
