/* O ÚLTIMO GRITO — V1.5.1 · Memórias de longa duração / efeito borboleta.
   Usa histórico real do save; não altera capítulos antigos nem revive personagens. */
(()=>{'use strict';
const names={allan:'Allan',samuel:'Samuel',isabella:'Isabella',rayssa:'Rayssa',rauanny:'Rauanny',laisla:'Laisla',ryan:'Ryan',breno:'Breno'};
const dead=(s,id)=>!!window.UG150?.dead?.(s,id);
const both=(s,a,b)=>!dead(s,a)&&!dead(s,b);
const hist=(s,id,fragment)=>Array.isArray(s?.history)&&s.history.some(h=>h.node===id&&(!fragment||String(h.choice).includes(fragment)));
const old=(s,id)=>hist(s,id)||!!s?.flags?.['c151_'+id];
const clearPair=(s,a,b)=>both(s,a,b)&&(s?.flags?.c10_rayssa_status!=='jullia'||(a!=='rayssa'&&b!=='rayssa'));
function append(n,lines){return {...n,text:n.text+'\n\n'+lines};}
function modify(id,s,n){if(!s||!n)return n;const f=s.flags||{};let out=n;
 const samAll=both(s,'samuel','allan'),laiRau=both(s,'laisla','rauanny'),isaRay=clearPair(s,'isabella','rayssa');
 // Prólogo: reações às ações anteriores da mesma noite.
 if(id==='p09'){
  if(hist(s,'p08b','Avisar Samuel'))out=append(out,'Samuel encontra a chave da van no bolso e a entrega a Allan.\n\nSamuel: — Tá, você tava certo. Nem encosto no volante depois de beber.\n\nAllan: — Eu vou repetir isso no seu casamento. Com microfone e tudo.');
  else if(hist(s,'p08a'))out=append(out,'Laisla e Rauanny voltam da piscina discutindo uma foto, mas caminham juntas. O assunto não acabou — só deixou de ser urgente por um momento.');
 }
 // Capítulos intermediários: as amizades têm memória, sem alterar a história estabelecida.
 if(id==='g01'&&samAll&&hist(s,'p08b','Avisar Samuel'))out=append(out,'O celular vibra com uma mensagem de Allan: “O Samuel tá se fazendo de durão, mas ele me deixou ficar com a chave da van na festa. Ainda penso no que podia ter sido diferente naquela estrada.” Você guarda a mensagem sem saber como responder.');
 if(id==='h01'&&!dead(s,'breno')&&(hist(s,'p02a')||hist(s,'p08c','Dizer que confia nele'))){out=append(out,'Breno espera você guardar a mochila.\n\nBreno: — Lembra daquela festa? Você falou que se eu quisesse ir embora, a gente ia junto. Eu nunca te agradeci direito por isso.\n\nVocê: — E agora?\n\nBreno: — Agora eu só queria que a gente tivesse uma tarde normal. Cinco minutos já tava ótimo.');}
 if(id==='h43'&&laiRau&&hist(s,'p08a'))out=append(out,'Rauanny olha para Laisla e solta uma risada nervosa.\n\nRauanny: — Cara... pensar que antes eu ficava puta porque você postou uma foto minha horrível.\n\nLaisla: — Você continua saindo horrível nas fotos, viu?\n\nAs duas riem por um instante. Laisla aperta a mão da amiga com mais força quando a lembrança da invasão volta.');
 if(id==='j02'&&samAll&&hist(s,'p08b'))out=append(out,'Samuel escreve para Allan: “Quando você sair daqui a gente vai discutir de novo quem dirige. E eu vou te ouvir, tá?” A resposta vem alguns minutos depois: “Nossa, um milagre. Tira print.”');
 if(id==='k8_debate'&&isaRay&&hist(s,'p08d'))out=append(out,'Isabella encara Rayssa por cima da tela do celular.\n\nIsabella: — Até aquela noite da festa a gente discutia pra defender a Jullia ou pra falar o que pensava. Agora eu não sei mais quem tá escondendo o quê.\n\nRayssa: — Eu sei. Só... não começa a pensar que todo mundo aqui é um inimigo.\n\nIsabella não responde. O medo deixou até aquela velha intimidade desconfortável.');
 if(id==='k8_debate_end'&&hist(s,'k8_debate','suspeitas não são provas'))out=append(out,'Seu celular vibra com um agradecimento curto de alguém que quase foi acusado sem motivo: “Valeu por tentar ouvir antes de condenar. Não sei se eu teria conseguido.”');
 if(id==='k9_01'&&samAll&&hist(s,'p08b'))out=append(out,'Allan encosta o ombro no de Samuel ao lado da homenagem.\n\nAllan: — Lembra que eu te tomei a chave da van naquela festa?\n\nSamuel: — Como esquecer? Você falou aquilo na frente de todo mundo.\n\nAllan: — É... eu queria que algumas conversas tivessem sido suficientes pra salvar a gente de tudo isso.');
 if(id==='k9_01'&&!dead(s,'breno')&&hist(s,'p08c','Dizer que confia nele'))out=append(out,'Breno procura você ao final da homenagem.\n\nBreno: — Você foi uma das poucas pessoas que me ouviu antes de decidir que eu tinha alguma coisa a esconder. Não esqueço disso.');
 // A revelação da cumplicidade tem peso maior quando o jogador viu a amizade das duas antes.
 if(id==='k10_06'&&isaRay&&hist(s,'p08d'))out=append(out,'Isabella limpa o rosto com as costas da mão, furiosa.\n\nIsabella: — Na varanda da festa, você me mostrou aquela foto nossa de criança, lembra? Você falou que a gente ia envelhecer reclamando uma da outra.\n\nRayssa: — Lembro...\n\nIsabella: — Você sabia que a Jullia tava viva e me deixou acreditar que eu tinha enterrado minha amiga. Até aquela promessa virou mentira, porra.\n\nRayssa: — A foto não era mentira, Isa. Mas eu menti pra você. E eu não vou fingir que isso não mudou tudo.');
 if(id==='k10_07'&&!dead(s,'breno')&&hist(s,'p08c','Dizer que confia nele'))out=append(out,'Breno fala baixo, mas não desvia o olhar de Rayssa.\n\nBreno: — Engraçado. Vocês suspeitaram de mim um monte de vezes, e eu sempre tive que provar que não tava escondendo nada. Você tava do nosso lado ouvindo tudo.\n\nRayssa: — Eu sei. Eu devia ter falado.');
 if(id==='k10_12'&&isaRay&&hist(s,'p08d'))out=append(out,'Isabella interrompe antes que alguém obrigue Rayssa a escolher um lado.\n\nIsabella: — Eu não confio em você, Rayssa. Mas não vou deixar a Jullia decidir se você vive ou morre. Isso não quer dizer que tá tudo bem entre a gente.');
 if(id==='k10_17'&&Array.isArray(f.c10_trilha)&&f.c10_trilha.includes('laisla')&&f.c10_trilha.includes('rauanny')&&hist(s,'p08a','Apoiar Rauanny')&&laiRau)out=append(out,'Laisla segura a manga de Rauanny quando a amiga pisa na tábua mais solta.\n\nLaisla: — Pela primeira vez na vida, escuta e pisa onde eu pisar!\n\nRauanny: — Tá, tá! Eu reclamo depois. CORRE!\n\nAs duas ajustam o passo uma à outra enquanto Jullia ganha terreno.');
 if(id==='k10_18'&&f.c151_trilha_memoria){
  const trail=f.c10_trilha||[];
  if(trail.includes('allan')&&trail.includes('samuel'))out=append(out,'Samuel tenta segurar Allan pelo casaco quando o amigo escorrega na descida.\n\nSamuel: — ALLAN! SEGURA MINHA MÃO, CARALHO!\n\nPor um segundo as mãos se encontram. A queda não para, mas Samuel consegue afastá-lo das pedras mais altas antes que a vegetação esconda o garoto. Nenhum dos dois sabe ainda se ele está vivo.');
  else if(trail.includes('laisla')&&trail.includes('rauanny'))out=append(out,'Laisla prende os dedos na manga de Rauanny quando a amiga perde o equilíbrio.\n\nLaisla: — EU NÃO VOU SOLTAR VOCÊ!\n\nEla consegue desviar a amiga do degrau quebrado antes de perder o contato no declive. O som da queda desaparece na chuva. Elas ainda não sabem se vão se reencontrar.');
 }
 if(id==='k10_21'&&Array.isArray(f.c10_galpao)&&f.c10_galpao.includes('isabella')&&f.c10_galpao.includes('breno')&&hist(s,'p08c','Dizer que confia nele')&&both(s,'isabella','breno'))out=append(out,'Breno vê Isabella tentando destrancar a saída sozinha.\n\nBreno: — Isa, olha pra mim. Se você segurar essa grade, eu consigo puxar a madeira sem fazer barulho.\n\nIsabella: — Então vai, caralho. Só não me deixa segurando isso sozinha!\n\nOs dois sincronizam os movimentos antes que Jullia alcance a porta.');
 if(id==='k10_24'&&isaRay&&hist(s,'p08d'))out=append(out,'Isabella afasta a mão quando Rayssa tenta alcançá-la.\n\nIsabella: — Não me abraça pra eu esquecer. Eu te conheço desde pequena. Justamente por isso dói tanto.\n\nRayssa: — Eu não quero que você esqueça. Eu só quero uma chance de fazer alguma coisa certa antes que amanheça.');
 if(id==='k10_25'&&laiRau&&hist(s,'p08a'))out=append(out,'Laisla e Rauanny dividem o último cobertor, ainda discutindo baixinho sobre qual das duas está tremendo mais. Dessa vez nenhuma delas tenta ganhar a discussão; ficam juntas, de olho na saída.');
 if(id==='k10_27'){
  const route=s.romanceEscolhido;
  if(route==='ryan'&&!dead(s,'ryan')&&hist(s,'p08a','Brincar a sós com Ryan'))out=append(out,'Ryan tenta ajeitar a manga molhada e encontra seu olhar.\n\nRyan: — Lembra da piscina naquela festa? Eu achei que a pior coisa que podia acontecer era a Laisla me jogar na água.\n\nVocê: — Quando isso acabar, a gente ainda vai ter muito filme ruim pra discutir.\n\nRyan: — Eu vou cobrar, tá? Sem prometer milagre. Só... fica comigo mais um pouco.');
  if(route==='breno'&&!dead(s,'breno')&&hist(s,'p08c','Dizer que confia nele'))out=append(out,'Breno segura sua mão longe dos outros.\n\nBreno: — Na festa da Jullia, você disse que confiava em mim. Eu guardei aquilo até quando todo mundo começou a suspeitar de mim.\n\nVocê: — Eu não esqueci.\n\nBreno: — Então não some agora, por favor. A gente ainda tem tanta coisa pra conversar.');
  if(route==='rauanny'&&!dead(s,'rauanny')&&hist(s,'p08a','Apoiar Rauanny'))out=append(out,'Rauanny encontra você ao lado da passagem.\n\nRauanny: — Você ficou do meu lado naquela discussão ridícula da piscina. Agora eu tô com medo de verdade.\n\nVocê: — Eu também tô.\n\nRauanny: — Então vamos ter medo e sair daqui juntos. Sem bancar herói sozinho, combinado?');
  if(route==='rayssa'&&!dead(s,'rayssa')&&hist(s,'p08d')&&f.c10_rayssa_status!=='jullia')out=append(out,'Rayssa para perto de você, mas mantém distância.\n\nRayssa: — Na varanda, eu falava da gente como se fosse existir um depois. Eu queria que existisse.\n\nVocê: — Eu ainda não sei se consigo confiar em você.\n\nRayssa: — Eu sei. Mas eu posso tentar impedir que a Jullia tire esse depois de todo mundo.');
 }
 if(id==='k10_30'&&isaRay&&hist(s,'p08d','Concordar com Rayssa')&&f.c10_rayssa_escolha!=='jullia'&&f.c10_rayssa_status!=='jullia'){
  // Novo caminho opcional: memória antiga + reconciliação no presente gera ação efetiva no confronto.
  const special={text:'Lembrar Rayssa da promessa na varanda e pedir que proteja Isabella',to:'k10_31',effects:[['set','c10_rayssa_escolha','grupo'],['flag','c10_rayssa_intervencao',true],['flag','c151_promessa_relembrada',true],['bond','rayssa',4],['friendBond',['rayssa','isabella'],4]]};
  if(!out.choices.some(c=>c.text===special.text))out={...out,choices:[...out.choices,special]};
 }
 if(id==='k10_31'&&f.c151_promessa_relembrada&&isaRay)out=append(out,'Rayssa se coloca perto de Isabella, protegendo a saída enquanto a amiga tenta ajudar os feridos.\n\nRayssa: — Naquela varanda eu prometi que ia estar do seu lado. Eu sei que estraguei tudo. Mas, por favor, deixa eu fazer isso agora.\n\nIsabella: — Então não olha pra mim. Olha pra Jullia e me ajuda a tirar todo mundo daqui.');
 if(id==='k10_40'&&isaRay&&f.c151_promessa_relembrada&&f.c10_rayssa_status!=='jullia')out=append(out,'Isabella olha para Rayssa antes de se dirigir à policial.\n\nIsabella: — Você me ajudou no deck. Eu vi. Mas eu também vi tudo que aconteceu antes. Uma coisa não apaga a outra.\n\nRayssa: — Eu sei. Não vou pedir que você minta por mim.');
 if(/^k10_(4[4-9]|5[01])$/.test(id)&&hist(s,'p08b')&&samAll&&/SAMUEL|ALLAN/.test(out.text)&&f.c10_rayssa_justica!==undefined){
  if(out.text.includes('PONTO DE VISTA: SAMUEL'))out=append(out,'Allan: — Depois de tudo, eu ainda não confio em você com a chave da van.\n\nSamuel: — Tá bom, porra. Você dirige e eu escolho a música.\n\nOs dois riem da velha discussão. Não resolve o passado, mas é a primeira brincadeira que não parece forçada.');
 }
 return out;
}
// Lembranças que mudam a dificuldade de UMA situação concreta, sem mortes automáticas.
function enter(s,id){if(!s?.flags)return false;const f=s.flags;let changed=false;
 if(id==='k10_18'&&!f.c151_trilha_aplicada){
  const trail=f.c10_trilha||[];
  const samuelAllan=trail.includes('allan')&&trail.includes('samuel')&&both(s,'allan','samuel')&&hist(s,'p08b','Avisar Samuel');
  const laislaRauanny=trail.includes('laisla')&&trail.includes('rauanny')&&both(s,'laisla','rauanny')&&hist(s,'p08a','Apoiar Rauanny');
  if((samuelAllan||laislaRauanny)&&f.c10_trilha_ultimo==='alto'){
   f.c10_trilha_apoio=true;f.c151_trilha_memoria=true;changed=true;
  }
  f.c151_trilha_aplicada=true;changed=true;
 }
 if(id==='k10_22'&&!f.c151_galpao_aplicado){
  const gal=f.c10_galpao||[];
  if(gal.includes('isabella')&&gal.includes('breno')&&both(s,'isabella','breno')&&hist(s,'p08c','Dizer que confia nele')&&f.c10_galpao_ultimo==='alto'&&Number(f.c10_galpao_perigo||0)>0){
   f.c10_galpao_perigo=Math.max(0,Number(f.c10_galpao_perigo)-1);f.c151_galpao_memoria=true;changed=true;
  }
  f.c151_galpao_aplicado=true;changed=true;
 }
 return changed;
}
function bonus(s,id,c){const t=c?.text||'',effects=[];const add=(a,b,v)=>{if(both(s,a,b))effects.push(['friendBond',[a,b],v]);};
 if(id==='p08b'&&t.startsWith('Avisar Samuel'))add('allan','samuel',3);
 if(id==='p08a'&&t.includes('Apoiar Rauanny'))add('laisla','rauanny',3);
 if(id==='p08d'&&t.startsWith('Concordar com Rayssa'))add('isabella','rayssa',2);
 if(id==='p08d'&&t.startsWith('Concordar com Isabella'))add('isabella','rayssa',-1);
 if(id==='h43'&&t.startsWith('Ficar ao lado de Laisla'))add('laisla','rauanny',2);
 if(id==='k8_debate'&&t.includes('suspeitas não são provas'))add('isabella','breno',2);
 return effects;
}
function mementos(s){const entries=[];const add=(title,detail,condition)=>{if(condition)entries.push({title,detail});};
 add('A festa e o volante','Você avisou Samuel para não dirigir após beber. Allan e Samuel podem lembrar desse cuidado.',hist(s,'p08b','Avisar Samuel'));
 add('A velha discussão na piscina','Você esteve com Laisla e Rauanny durante a festa. A memória pode reaparecer em reencontros e momentos de perigo.',hist(s,'p08a'));
 add('A foto de duas amigas','Você conheceu um momento de intimidade entre Isabella e Rayssa antes da revelação. Essa lembrança pode mudar o confronto.',hist(s,'p08d'));
 add('A confiança de Breno','Você ouviu Breno antes de tratá-lo como suspeito. Ele pode lembrar disso em capítulos posteriores.',hist(s,'p02a')||hist(s,'p08c','Dizer que confia nele'));
 add('A conversa antes de julgar','Você defendeu que suspeitas precisavam de provas na discussão do hospital.',hist(s,'k8_debate','suspeitas não são provas'));
 add('A promessa relembrada','No final, uma memória antiga abriu outra forma de Rayssa proteger Isabella.',!!s?.flags?.c151_promessa_relembrada);
 add('A fuga em conjunto','Uma amizade e decisões anteriores abriram uma chance extra durante a última perseguição.',!!(s?.flags?.c151_trilha_memoria||s?.flags?.c151_galpao_memoria));
 return entries;
}
window.UG151=Object.freeze({resolve:modify,enter,bonus,mementos});
})();
