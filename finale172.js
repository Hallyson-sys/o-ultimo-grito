/* O Último Grito · V1.7.2 — Encerramento, memórias e passaporte.
   Adição compatível: preserva os nós e os eventos dos saves anteriores. */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;
if(!N||!H)return;
const CAST=['isabella','samuel','allan','laisla','rauanny','ryan','breno','rayssa'];
const LABEL={isabella:'Isabella',samuel:'Samuel',allan:'Allan',laisla:'Laisla',rauanny:'Rauanny',ryan:'Ryan',breno:'Breno',rayssa:'Rayssa'};
const PRON={isabella:'ela',samuel:'ele',allan:'ele',laisla:'ela',rauanny:'ela',ryan:'ele',breno:'ele',rayssa:'ela'};
const hero=s=>String(s?.hero?.name||'Você').trim().split(' ')[0]||'Você';
const dead=(s,id)=>id==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG10?.dead?.(s,id);
const present=(s,id)=>!dead(s,id)&&!s?.flags?.['c10_aparente_'+id];
const rayWelcome=s=>present(s,'rayssa')&&s?.flags?.c10_rayssa_status!=='jullia'&&s?.flags?.c10_rayssa_justica==='segredo'&&!!s?.flags?.c10_rayssa_perdoada;
const members=s=>CAST.filter(id=>id==='rayssa'?rayWelcome(s):present(s,id));
const chosen=s=>['ryan','breno','rayssa','rauanny'].includes(s?.romanceEscolhido)?s.romanceEscolhido:null;
const loveHere=s=>!dead(s,'hero')&&!!chosen(s)&&members(s).includes(chosen(s));
const label=id=>LABEL[id]||id;
const C=(text,to,effects=[])=>({text,to,effects});
function add(id,location,time){if(N[id])throw Error('Cena duplicada em V1.7.2: '+id);const n={id,chapter:'CAPÍTULO 10 · O GRAND FINALE',location,time,scene:'house',speaker:'NARRAÇÃO',text:'',choices:[]};N[id]=n;H.push(n);}
for(const [id,loc,t] of [
 ['c172_conversa','REENCONTRO · O QUE RESTOU','17:02'],
 ['c172_conversa_reacao','REENCONTRO · CONVERSAS DE VERDADE','17:06'],
 ['c172_homenagem','REENCONTRO · OS NOMES QUE FALTAM','17:14'],
 ['c172_homenagem_reacao','REENCONTRO · UM LUGAR À MESA','17:20'],
 ['c172_romance','REENCONTRO · A DOIS','17:27'],
 ['c172_romance_reacao','REENCONTRO · SEM PRESSA','17:34'],
 ['c172_despedida','REENCONTRO · A ÚLTIMA FOTOGRAFIA','17:48']
])add(id,loc,t);
const MOMENTS={
 allan:'a vez em que tentou fazer Samuel rir depois de uma prova ruim e acabou quebrando uma cadeira',
 samuel:'o cuidado escondido nas broncas e nos planos exageradamente detalhados',
 isabella:'as playlists que montava para quem dizia não precisar de ajuda',
 rayssa:'as mensagens perguntando se todo mundo tinha chegado bem em casa',
 laisla:'a fotografia horrível que insistiu em guardar porque todos estavam rindo',
 rauanny:'a viagem que tentou organizar mesmo depois de discutir com metade do grupo',
 ryan:'as sessões de cinema que ele transformava em comédia só para alguém sorrir',
 breno:'os momentos em que ficava quieto do lado de alguém sem exigir explicações'
};
const PARTNER={allan:'samuel',samuel:'allan',isabella:'rayssa',rayssa:'isabella',laisla:'rauanny',rauanny:'laisla',ryan:'breno',breno:'ryan'};
const ROMANCE={
 ryan:{first:'Ryan encosta perto de você na varanda e tenta uma piada, mas para na metade. É a primeira vez na noite que o sorriso dele parece um pouco nervoso.',
  heart:'Ryan: — Eu tinha pensado em te chamar pra sair na semana passada. Aí apaguei a mensagem. Fiquei imaginando se uma noite normal não ia parecer estranha depois de tudo.',
  tomorrow:'Ryan: — Então a gente começa com uma coisa pequena. Cinema, pipoca, reclamar de filme ruim. Sem precisar decidir o resto da vida na saída.',
  fear:'Ryan: — Eu também tenho. Às vezes fico querendo brincar pra não falar que tô assustado. Só que com você eu queria aprender a não fazer isso toda hora.'},
 breno:{first:'Breno espera até o corredor ficar vazio. Ele puxa sua manga com delicadeza, como quem ainda está aprendendo a pedir um momento só de vocês.',
  heart:'Breno: — Hoje eu quase fui embora antes de todo mundo chegar. Pensei que ia atrapalhar, que iam olhar pra mim e só lembrar das coisas ruins.',
  tomorrow:'Breno: — Não precisa me prometer nada enorme. Só me chama quando quiser companhia. Mesmo que seja pra ficar em silêncio.',
  fear:'Breno: — Eu também acordo achando que vou perder quem eu amo. Não vou fingir que tenho uma resposta. Mas posso ficar do seu lado enquanto a gente descobre.'},
 rauanny:{first:'Rauanny te puxa para perto da porta, longe da confusão. Aperta sua mão duas vezes, querendo parecer tranquila sem conseguir esconder os olhos marejados.',
  heart:'Rauanny: — Minha mãe perguntou se eu tava mesmo pronta pra ver o pessoal de novo. Eu disse que sim, óbvio. Depois chorei no banheiro igual uma idiota.',
  tomorrow:'Rauanny: — A gente pode sair no sábado. E, por favor, escolhe um lugar que não tenha lago, floresta ou qualquer merda parecida.',
  fear:'Rauanny: — Eu não sou tão forte quanto finjo. Obrigada por me deixar ser só eu quando a cabeça não colabora.'},
 rayssa:{first:'Rayssa fica perto da cozinha, hesitando em se aproximar. Quando vocês finalmente ficam a sós, ela mantém uma distância respeitosa.',
  heart:'Rayssa: — Eu não sei nem se tenho o direito de pedir que você fique perto. O que eu fiz não some porque a gente teve alguma coisa bonita.',
  tomorrow:'Rayssa: — Se você quiser conversar outra vez, eu vou estar lá. Sem cobrar nada de você e sem pedir que esqueça o que eu fiz.',
  fear:'Rayssa: — Você tem motivo de sobra pra ter medo de mim. Eu preciso aceitar isso. E preciso provar com atitudes que não vou mentir de novo.'}
};
function memory(s,id){
 const friend=PARTNER[id],gone=friend&&dead(s,friend);
 if(!gone&&['isabella','rayssa'].includes(id)&&members(s).includes('isabella')&&members(s).includes('rayssa'))
  return `${label(id)} se lembra de ${MOMENTS[id]}. Isabella escuta, sem transformar a antiga amizade numa reconciliação automática. Rayssa entende que não tem o direito de pedir isso agora.`;
 return `${label(id)} se lembra de ${MOMENTS[id]}.${gone?` ${label(friend)} não está mais aqui para corrigir a história, e isso pesa em cada pausa.`:` ${label(friend)} rebate um detalhe da lembrança, e por um instante os dois riem de verdade.`}`;
}
function resolve(id,s,n){if(!n||!s)return n;const f=s.flags||{},people=members(s),gone=CAST.filter(x=>dead(s,x)),h=hero(s),aliveHero=!dead(s,'hero');
 if(id==='k10_52'){
  if(!people.length)return {...n,choices:[C('Ouvir o que Lakewood conta sobre aquela noite','k10_53')]};
  return {...n,choices:[C('Ficar mais um pouco com os amigos','c172_conversa')]};
 }
 if(id==='c172_conversa'){
  const lead=people.find(x=>x!=='rayssa')||people[0],second=people.find(x=>x!==lead),speaker=label(lead);
  const intro=`A reunião já devia ter acabado, mas ninguém faz menção de ir embora. A comida esfriou; os celulares estão esquecidos ao lado dos pratos.\n\n${speaker}: — Lembram quando nosso maior problema era decidir onde passar o fim de semana?\n\n${second?label(second)+': — A gente levava três horas pra escolher e acabava na casa de alguém vendo filme ruim.':'O silêncio depois da pergunta não é vazio. Pela primeira vez, ninguém precisa preencher tudo com uma história sobre o massacre.'}\n\n${memory(s,lead)}`;
  if(!aliveHero){const other=second||lead;return {...n,text:`${intro}\n\n${label(other)}: — Eu queria que ${h} estivesse aqui pra ouvir a gente falando essas besteiras. A pessoa não precisava ter sido perfeita pra fazer falta.\n\nEles deixam um lugar vazio na mesa, sem transformar a ausência em espetáculo.`,choices:[C('Ouvir como os amigos se despedem','c172_homenagem')]};}
  return {...n,text:`${intro}\n\n${speaker}: — E você, ${h}? Você quase não falou desde o brinde. Não precisa dizer nada bonito, tá?`,choices:[
   C('Lembrar uma situação engraçada de antes da tragédia','c172_conversa_reacao',[['set','c172_tom_encontro','humor']]),
   C('Dizer que sente falta de quem morreu','c172_conversa_reacao',[['set','c172_tom_encontro','luto']]),
   C('Admitir que ainda tem medo de perder os sobreviventes','c172_conversa_reacao',[['set','c172_tom_encontro','medo']])
  ]};
 }
 if(id==='c172_conversa_reacao'){
  const friend=people.find(x=>x!=='rayssa')||people[0],who=label(friend),tone=f.c172_tom_encontro||'medo';
  const variants={
    humor:`Você: — Eu tava lembrando de quando a gente tentou preparar uma surpresa e esqueceu o bolo no forno. Ainda dá pra sentir o cheiro de queimado se eu fechar os olhos.\n\n${who}: — Porra, era pra você ter guardado essa informação!\n\nA mesa ri. Não é um riso de nervoso nem um jeito de esconder assunto difícil. É a lembrança de que houve vida antes daquela noite.`,
    luto:gone.length?`Você: — Eu queria muito que ${label(gone[0])} estivesse aqui. Tem coisa que eu ainda pego o celular pra contar e só depois lembro.\n\n${who}: — Eu também faço isso. Às vezes até abro a conversa. Depois fico encarando a tela.\n\nVocê: — Eu não quero que a única história que a gente conte ${PRON[gone[0]]==='ela'?'dela':'dele'} seja como morreu.`:`Você: — Eu sei que todo mundo tá aqui, mas ainda sinto falta de quem a gente era antes daquela noite.\n\n${who}: — Eu também. Acho que a gente vai conhecer versões diferentes uns dos outros daqui pra frente.`,
    medo:`Você: — Eu fico olhando pra vocês e contando quantas pessoas tem na sala. Se alguém vai ao banheiro e demora, minha cabeça já inventa o pior.\n\n${who}: — Eu faço isso também. Mas pode perguntar se eu tô bem, tá? Não precisa carregar tudo sozinho.\n\nVocê: — Eu vou tentar. Só queria conseguir acreditar que hoje ninguém precisa fugir.`};
  const feminine=s.hero?.pronouns==='ela';const neutral=s.hero?.pronouns==='elu';
  let text=(variants[tone]||variants.medo).replace('carregar tudo sozinho',`carregar tudo ${feminine?'sozinha':neutral?'sozinhe':'sozinho'}`);
  return {...n,text:`${text}\n\nA conversa não cura a noite do lago. Mas ninguém olha para o relógio enquanto você fala.`,choices:[C(gone.length?'Preparar uma homenagem aos que não voltaram':'Conversar sobre o que mudou','c172_homenagem')]};
 }
 if(id==='c172_homenagem'){
  if(!people.length)return {...n,text:'Nenhuma pessoa do grupo está presente. As fotografias dos jovens são guardadas entre os materiais da investigação. O silêncio não recebe diálogos inventados.',choices:[C('Seguir para os acontecimentos posteriores','k10_53')]};
  if(!gone.length){const a=label(people[0]);return {...n,text:`Não há nomes faltando na fotografia daquele grupo, mas nem por isso tudo voltou a ser simples.\n\n${a}: — A gente saiu vivo. Eu queria achar que isso resolvia as coisas, mas tem dias que ainda não consigo dormir.\n\n${aliveHero?'Você: — Sobreviver não significa que precisamos fingir que estamos bem.':'Ninguém precisa fingir que está bem só porque saiu vivo.'}\n\nEles concordam em não deixar que o aniversário do massacre seja a única data em que se procuram.`,choices:[C(loveHere(s)?'Conversar a sós antes de ir embora':'Continuar a despedida',loveHere(s)?'c172_romance':'c172_despedida')]};}
  const lines=gone.slice(0,4).map(id=>{const partner=PARTNER[id],speaker=people.includes(partner)?partner:people.find(x=>x!=='rayssa')||people[0];if(id==='rayssa'&&speaker==='isabella')return `Isabella: — Eu tô com raiva da Rayssa pelo que ela fez. Isso não desapareceu quando ela morreu. Mas eu também sinto falta da minha melhor amiga. Não sei direito como carregar as duas coisas.`;
  if(id==='isabella'&&speaker==='rayssa')return `Rayssa: — A Isa confiou em mim e eu destruí isso. Ficar triste por ela não apaga o que eu fiz, porra. Eu queria ter escolhido diferente.`;
  return `${label(speaker)}: — Eu lembro de ${label(id)} por ${MOMENTS[id]}. ${speaker===partner?'A gente discutia tanto por besteira. Eu queria poder discutir mais uma vez.':'Eu não quero que a história dessa pessoa termine na notícia do massacre.'}`;});
  const remaining=gone.length>4?`\n\nOs nomes de ${gone.slice(4).map(label).join(', ')} também são lembrados, um de cada vez.`:'';
  return {...n,text:`Uma das cadeiras está ocupada por um porta-retrato. Quem o colocou ali não anunciou nada: só esperou que os outros percebessem.\n\n${lines.join('\n\n')}${remaining}\n\nNinguém exige que todos falem ou chorem. Há quem segure a fotografia, quem desvie os olhos, e quem finalmente diga o nome de uma pessoa sem reduzir sua vida à forma como morreu.`,choices:aliveHero?[
   C('Contar o que você gostaria de ter dito a quem se foi','c172_homenagem_reacao',[['set','c172_homenagem_tom','palavras']]),
   C('Acompanhar a homenagem em silêncio','c172_homenagem_reacao',[['set','c172_homenagem_tom','silencio']])
  ]:[C('Continuar a homenagem','c172_despedida')]};
 }
 if(id==='c172_homenagem_reacao'){
  const first=gone[0],friend=people.find(x=>x!=='rayssa')||people[0];
  const words=f.c172_homenagem_tom==='silencio'?`Você encosta a mão perto da fotografia de ${label(first)}. Não consegue falar. ${label(friend)} percebe e se aproxima sem fazer nenhuma pergunta.`:`Você: — Eu sinto muito pelas vezes que achei que dava pra deixar pra depois. Eu queria ter dado mais valor aos dias comuns com ${label(first)}.\n\n${label(friend)}: — Eu acho que ${PRON[first]==='ela'?'ela':'ele'} sabia. Mas eu entendo você querer ter dito mais.`;
  return {...n,text:`${words}\n\nDepois, os copos são recolhidos. O retrato permanece sobre a mesa. Ninguém tenta substituir a ausência com uma frase de efeito.`,choices:[C(loveHere(s)?'Conversar a sós antes de ir embora':'Se despedir dos sobreviventes',loveHere(s)?'c172_romance':'c172_despedida')]};
 }
 if(id==='c172_romance'){
  if(!loveHere(s))return {...n,text:'A despedida se aproxima, sem uma conversa romântica impossível.',choices:[C('Continuar','c172_despedida')]};
  const r=chosen(s),v=ROMANCE[r];
  const touches=r==='rayssa'?'Não existe promessa de perdão automático.':'Há carinho nos gestos, sem a necessidade de colocar um nome definitivo no que vocês têm.';
  return {...n,text:`${v.first}\n\n${v.heart}\n\nVocê: — Eu também tô tentando descobrir como voltar a viver sem esperar o pior.\n\n${touches}`,choices:[
   C('Propor um próximo encontro simples, sem pressa','c172_romance_reacao',[['set','c172_romance_tom','futuro'],['bond',r,2]]),
   C('Confessar que tem medo de se apegar depois do massacre','c172_romance_reacao',[['set','c172_romance_tom','medo'],['bond',r,2]])
  ]};
 }
 if(id==='c172_romance_reacao'){
  if(!loveHere(s))return {...n,text:'A lembrança é interrompida pelo momento real dos sobreviventes.',choices:[C('Ir para a despedida','c172_despedida')]};
  const r=chosen(s),v=ROMANCE[r],tom=f.c172_romance_tom==='medo'?'medo':'futuro';
  const pre=tom==='medo'?`Você: — Eu gosto de você, mas toda vez que penso em alguém perto de mim eu lembro de como foi fácil perder tudo.`:`Você: — Não quero fazer uma promessa gigante agora. Só queria saber se você topa me encontrar de novo num dia normal.`;
  const end=r==='rayssa'?'Rayssa não tenta te beijar nem encurtar o espaço entre vocês sem convite. Ela entende que reconstruir confiança não é uma cena romântica com final garantido.':'Vocês ficam juntos mais alguns minutos. Não há pedido de namoro, nem a obrigação de esquecer o que aconteceu para continuar se aproximando.';
  return {...n,text:`${pre}\n\n${v[tom==='medo'?'fear':'tomorrow']}\n\n${end}`,choices:[C('Voltar para se despedir de todos','c172_despedida')]};
 }
 if(id==='c172_despedida'){
  if(!people.length)return {...n,text:'Ninguém do grupo conseguiu chegar àquele encontro. No dia seguinte, os arquivos sobre Lakewood continuam a circular, e há perguntas que ainda não têm resposta.',choices:[C('Ouvir o podcast sobre Lakewood','k10_53')]};
  const lead=people[0],l=label(lead),remembrance=gone.length?`As fotografias de ${gone.map(label).join(', ')} continuam na mesa, e ninguém tem coragem de tirá-las de lá.`:'As fotografias antigas permanecem na mesa. O grupo inteiro sobreviveu, mas cada rosto mudou com aquela noite.';
  const solo=people.length===1?`${l} guarda o copo, apaga as luzes e envia uma mensagem para alguém de confiança. Não há multidão para aplaudir sua sobrevivência, mas isso não torna seu esforço menor.`:`Antes de sair, ${l} pega o celular.\n\n${l}: — Uma foto. Nem adianta reclamar, eu quero ter uma lembrança de hoje.\n\nNinguém consegue posar perfeitamente. Alguém pisca, outro reclama do flash, e a primeira foto fica torta. Eles decidem guardar justamente aquela.`;
  const you=aliveHero?`${h} observa os rostos dos amigos. Não sabe como será o próximo mês, mas sabe que esta tarde aconteceu de verdade. É uma memória que pertence a vocês.`:`O lugar de ${h} continua vazio. ${l} encosta a mão no encosto da cadeira antes de ir embora. Ninguém precisa dizer em voz alta o nome que falta.`;
  return {...n,text:`${remembrance}\n\n${solo}\n\n${you}\n\nDo lado de fora, Lakewood continua a mesma cidade: os carros passam, as lojas fecham, alguém ri na calçada. A vida não recomeça de uma só vez. Mas continua.`,choices:[C('Assistir ao epílogo de Lakewood','k10_53')]};
 }
 return n;
}
function seasonPassport(s){
 const base=window.UG161?.seasonPassport?.(s);if(!base)throw Error('O passaporte ainda não está disponível.');
 const f=s.flags||{};
 const timelineKeys=Object.keys(f).filter(k=>/^(?:c10_|c9_|c8_|c152_|c151_|c160_|v160_|v161_|c170_|c171_|c172_|c175_|c176_)/.test(k)&&!/^(?:c10_enter_|c152_reunion_return_|c152_enter_|c170_enter_)/.test(k)).sort();
 const chosenFlags={};
 for(const k of timelineKeys){const v=f[k];if(typeof v==='boolean'||typeof v==='number'||(typeof v==='string'&&v.length<=140))chosenFlags[k]=v;}
 const victims=CAST.filter(x=>dead(s,x));
 const live=CAST.filter(x=>!dead(s,x));
 return {...base,sourceVersion:'1.7.6',schemaVersion:2,
   outcomes:{...base.outcomes,heroSurvived:!dead(s,'hero'),rayssaAtReunion:rayWelcome(s),reunionAttendees:members(s),fallenFriends:victims},
   continuity:{finalNight:{witnesses:live,heroMissing:dead(s,'hero'),jullia:FATE(s,'jullia'),rayssa:FATE(s,'rayssa')},
      memorial:{names:victims,choice:f.c172_homenagem_tom||null},reunion:{heroTone:f.c10_reuniao_heroi||null,conversation:f.c172_tom_encontro||null,romanticConversation:f.c172_romance_tom||null,officialPartner:f.c175_namoro_oficial||null,relationshipDecision:f.c175_namoro_decisao||null,announcedToFriends:!!f.c175_namoro_anunciado,apologyToBreno:f.c175_breno_tom||null},
      emotionalMemories:CAST.filter(x=>f['c152_cafeteria_'+x]||f['c152_sorveteria_'+x]||f['c152_futuro_'+x]||f['c152_praca_'+x]),
      questioning:{protagonist:f.c170_hero_tom||null,friends:Object.fromEntries(CAST.filter(x=>f['c170_depo_resposta_'+x]).map(x=>[x,f['c170_depo_resposta_'+x]]))}},
   decisions:chosenFlags,
   importGuidance:{target:'O Último Grito 2',status:'estrutura_preparada_na_temporada_1',compatibleWith:'season-passport',fullSaveRequired:false},
   notice:'Passaporte da Temporada 1 para futura importação em O Último Grito 2. Não substitui o save e ainda não existe um importador no segundo jogo.'};
}
function FATE(s,who){const f=s.flags||{};if(who==='jullia'){if(f.c10_jullia_fim==='presa')return 'presa';if(f.c10_jullia_fim==='lago'&&f.c10_pistola)return 'atingida_no_lago_morte_nao_confirmada';return 'desaparecida_ou_foragida';}return dead(s,'rayssa')?'morta':f.c10_rayssa_justica||'indefinido';}
function creditsMarkup(s,esc){
 const f=s.flags||{},fallen=CAST.filter(x=>dead(s,x)),surv=CAST.filter(x=>!dead(s,x));
 const names=CAST.map(x=>`${label(x)}${dead(s,x)?' — EM MEMÓRIA':' — SOBREVIVEU'}`);
 const lover=chosen(s);const romance=lover?`${label(lover)}${dead(s,lover)?' · lembrança de um amor':f.c175_namoro_oficial===lover?' · namoro oficial':' · vínculo que permanece'}`:'Nenhum romance exclusivo';
 const list=(title,lines)=>`<div class="credits-unit"><span>${esc(title)}</span>${lines.map(x=>`<strong>${esc(x)}</strong>`).join('')}</div>`;
 const messages=[];
 if(f.c172_tom_encontro==='humor')messages.push('Você escolheu lembrar da alegria que existia antes do medo.');
 if(f.c172_tom_encontro==='luto')messages.push('Você deu espaço ao luto sem diminuir quem se foi.');
 if(f.c172_tom_encontro==='medo')messages.push('Você falou do medo de perder mais alguém.');
 if(f.c175_namoro_oficial)messages.push('Você decidiu assumir um namoro com '+label(f.c175_namoro_oficial)+'.');else if(f.c172_romance_tom)messages.push('Um vínculo afetivo teve uma conversa sobre o amanhã.');
 if(!messages.length)messages.push('As decisões que você tomou continuam registradas neste save.');
 return `<section class="v172-story-signature" aria-label="O legado da sua temporada"><div class="eyebrow">O SEU LEGADO EM LAKEWOOD</div><h3>${esc(s.hero?.name||'Protagonista')}</h3><p>${dead(s,'hero')?'Sua história terminou naquela noite, mas quem ficou ainda se lembra de você.':'Você atravessou aquela noite. O que vem depois não precisa ser decidido pelo medo.'}</p><div class="v172-legacy-grid"><article><b>${surv.length} de 8</b><span>amigos sobreviveram</span></article><article><b>${fallen.length}</b><span>amigos perdidos</span></article><article><b>${esc(romance)}</b><span>interesse romântico</span></article></div>${messages.map(m=>`<p class="v172-memory-line">${esc(m)}</p>`).join('')}</section>
  <details class="v172-credits"><summary>▶ ASSISTIR AOS CRÉDITOS CINEMATOGRÁFICOS</summary><div class="v172-credit-stage"><div class="v172-credit-roll"><div class="v172-credit-content"><div class="v172-credit-title"><small>UMA HISTÓRIA DE LAKEWOOD</small><strong>O ÚLTIMO<br>GRITO</strong><span>FIM DA PRIMEIRA TEMPORADA</span></div>${list('O NONO PERSONAGEM',[s.hero?.name||'Protagonista'])}${list('O GRUPO DE AMIGOS',names)}${list('PERSONAGENS DE LAKEWOOD',['Jullia Gomes','Bella Gomes','Moisés Oliveira','Xerife Diego','Alice — Vozes de Lakewood'])}${list('SUA TEMPORADA',[surv.length+' sobrevivente(s) entre os oito amigos',fallen.length+' perda(s) entre os oito amigos',romance])}<div class="v172-credit-close">LAKEWOOD NUNCA ESQUECE.<small>OBRIGADO POR JOGAR · ATÉ A PRÓXIMA TEMPORADA</small></div></div></div></div><p class="v172-credit-help">Os créditos não alteram o save. Você pode fechá-los, reabri-los ou rolar a página para ler os nomes.</p></details>`;
}
window.UG172=Object.freeze({resolve,seasonPassport,creditsMarkup,members,loveHere});
})();
