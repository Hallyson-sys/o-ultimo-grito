/* O Último Grito V1.7.5 · Reencontro com memórias particulares, reparação e namoro opcional.
   Sistema aditivo: não substitui nem reinicia os saves antigos. */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;if(!N||!H)return;
const IDS=['isabella','samuel','allan','laisla','rauanny','ryan','breno','rayssa'];
const NAME={isabella:'Isabella',samuel:'Samuel',allan:'Allan',laisla:'Laisla',rauanny:'Rauanny',ryan:'Ryan',breno:'Breno',rayssa:'Rayssa'};
const PAIR={isabella:'rayssa',rayssa:'isabella',allan:'samuel',samuel:'allan',laisla:'rauanny',rauanny:'laisla',ryan:'rauanny',breno:'ryan'};
const LOVE=['ryan','breno','rauanny','rayssa'];
const C=(text,to,effects=[])=>({text,to,effects});
const first=s=>String(s?.hero?.name||'Você').trim().split(/\s+/)[0]||'Você';
const deceased=(s,id)=>id==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG10?.dead?.(s,id);
const present=s=>window.UG172?.members?.(s)||IDS.filter(id=>!deceased(s,id));
const activeLove=s=>!deceased(s,'hero')&&LOVE.includes(s?.romanceEscolhido)&&present(s).includes(s.romanceEscolhido)?s.romanceEscolhido:null;
const pName=id=>NAME[id]||id;
const naming=s=>first(s)==='Você'?'você':first(s);
const goNext=(s,id)=>{const others=['isabella','samuel','rayssa','ryan','breno','allan','laisla','rauanny'].filter(w=>present(s).includes(w));
 const roster=deceased(s,'hero')?others:['hero',...others],idx=roster.indexOf(id);if(idx<0||idx===roster.length-1)return 'k10_52';const next=idx+1;return next===8?'k10_56':'k10_'+(44+next);};
function node(id,place,t){if(N[id])throw Error('V1.7.5: cena repetida '+id);const item={id,chapter:'CAPÍTULO 10 · O GRAND FINALE',location:place,time:t,scene:'house',speaker:'NARRAÇÃO',text:'',choices:[]};N[id]=item;H.push(item);}
for(const [id,loc,t] of [
 ['c175_breno_conversa','REENCONTRO · A CONFIANÇA DE BRENO','16:35'],
 ['c175_breno_resposta','REENCONTRO · O QUE UMA DESCULPA NÃO APAGA','16:39'],
 ['c175_romance_pedido','REENCONTRO · UMA PERGUNTA IMPORTANTE','17:37'],
 ['c175_romance_aceito','REENCONTRO · AGORA É DE VERDADE','17:41'],
 ['c175_romance_anuncio','REENCONTRO · A NOSSA NOTÍCIA','17:43'],
 ['c175_romance_sem_rotulo','REENCONTRO · O TEMPO DE CADA UM','17:41'],
 ['c175_romance_despedida','REENCONTRO · MAIS UM AMANHÃ','17:47']])node(id,loc,t);
const PERSONAL_MEM={
 isabella:{look:'Isabella passa o polegar sobre o celular ao lembrar das músicas que escolhia para cada pessoa.',
  ask:'Isa, você ainda consegue ouvir aquela playlist que montou quando eu tava mal?',
  answer:'Algumas faixas eu pulo. Outras eu ouço inteira. Parece bobo, mas tô aprendendo a não fugir de todas as lembranças.',
  hero:'Você cuidava de todo mundo com música. Eu devia ter te perguntado mais vezes quem cuidava de você.',
  end:'Isabella ri pelo nariz, com os olhos marejados. — Às vezes bastava você sentar comigo e ouvir o lado B. Ainda dá tempo.'},
 samuel:{look:'Samuel gira uma colher, lembrando da bicicleta sem freio e das tardes de escola.',
  ask:'Samu, você ainda lembra de quando a bicicleta não tinha freio e o Allan inventou de descer aquela rua?',
  answer:'Claro que lembro. Eu gritei pra ele pular. Ele gritou de volta que aquilo não tava no plano.',
  hero:'Naquela época você tentava controlar até as coisas impossíveis. Hoje não precisa segurar tudo sozinho.',
  end:'Samuel sorri pela primeira vez sem se desculpar. — Então, se eu começar a fazer merda de novo, me avisa antes da ladeira.'},
 allan:{look:'Allan ajeita o guardanapo como se fosse um palco improvisado.',
  ask:'Allan, você ainda sabe contar aquela piada horrível que fez o Samuel cuspir refrigerante?',
  answer:'Sei, mas agora é patrimônio histórico. Vou cobrar ingresso. E o Samu ainda jura que não riu.',
  hero:'Você fazia a gente rir mesmo quando ninguém pedia. Também quero conhecer o Allan que pode ficar triste.',
  end:'Allan baixa um pouco a voz. — Esse aí também quer continuar sendo convidado. Até quando não tiver graça nenhuma.'},
 laisla:{look:'Laisla abre a galeria do celular e para numa foto desfocada de um aniversário.',
  ask:'Laisla, por que você nunca apagou aquela foto em que todo mundo saiu horrível?',
  answer:'Porque a Rauanny tava rindo de verdade. Eu também. A foto tá péssima, mas é um dos meus dias preferidos.',
  hero:'Eu gosto que você tenha guardado isso. Não foi a câmera que fez aquela tarde importante.',
  end:'Laisla mostra a foto com mais calma. — Promete que na próxima a gente tira outra? Mesmo que eu pisque de novo.'},
 rauanny:{look:'Rauanny mexe no chaveiro antigo preso à bolsa, recordando uma viagem adiada.',
  ask:'Rau, você ainda guarda o chaveiro da viagem que vocês nunca fizeram?',
  answer:'Guardo. A Laisla disse que era cafona. Depois comprou um igual e fingiu que foi coincidência.',
  hero:'Quando essa viagem acontecer, quero uma foto das duas reclamando do roteiro, exatamente como antes.',
  end:'Rauanny dá uma risada baixa. — Fechado. E dessa vez vou deixar outra pessoa escolher a hospedagem.'},
 ryan:{look:'Ryan vê um cartaz de cinema na rua e quase solta uma piada antiga.',
  ask:'Ryan, ainda faz narração de filme quando o projetor dá defeito?',
  answer:'Só se o público merecer. O Breno dizia que minha versão era melhor. Nunca soube se tava falando sério.',
  hero:'Eu gostava mais de olhar você inventando o final do que de assistir à tela.',
  end:'Ryan fica vermelho e tenta esconder com uma piada. — Pô, avisa antes de falar uma coisa dessas. Eu fico sem roteiro.'},
 breno:{look:'Breno encosta o ombro na parede, lembrando do dia do guarda-chuva quebrado.',
  ask:'Breno, você ainda guarda aquele guarda-chuva que o Ryan te deu na chuva?',
  answer:'Guardo. Quase não abre mais. Mas naquele dia alguém reparou que eu tava sozinho no portão.',
  hero:'Você merecia que a gente reparasse em você sem precisar acontecer alguma coisa horrível antes.',
  end:'Breno olha nos seus olhos. — Obrigado por dizer isso. Eu tô aprendendo a acreditar quando alguém fala que quer ficar.'},
 rayssa:{look:'Rayssa observa o celular, lembrando das mensagens que mandava para saber se todos chegaram.',
  ask:'Rayssa, você ainda lembra daquelas mensagens perguntando se todo mundo tinha chegado em casa?',
  answer:'Lembro. Algumas eram sinceras. Isso é o pior de tudo: eu me importava com vocês e mesmo assim escondi tanta coisa.',
  hero:'Eu lembro do carinho, mas também do que você fez. Não quero fingir que uma lembrança resolve tudo.',
  end:'Rayssa aceita o limite sem tentar justificar o passado. — Eu sei. Obrigada por não me pedir que minta de novo.'}
};
const MEMORIAL={
 allan:'A gente tinha combinado de aprender a dirigir um carro velho quando tudo passasse. Eu daria qualquer coisa para ouvir a risada escandalosa dele reclamando do meu jeito de segurar o volante.',
 samuel:'Samuel vivia organizando tudo num papel. Eu odiava quando ele mandava em mim, mas agora vejo a letra dele numa anotação e penso em ligar pra reclamar.',
 isabella:'Isabella montava playlists pra quem não conseguia falar. Eu achei uma dela semana passada e ouvi sentada no chão da cozinha.',
 rayssa:'Rayssa mandava mensagem perguntando se a gente chegou bem. É difícil lembrar do carinho sem lembrar do que ela escondeu. Não vou fingir que uma coisa apaga a outra.',
 laisla:'Laisla tinha uma foto nossa completamente tremida e se recusava a apagar. Dizia que era porque todo mundo ria de verdade nela.',
 rauanny:'Rauanny fez planos pra uma viagem que nunca saiu do papel. Tenho a lista de lugares salva. Não consigo apagar.',
 ryan:'Ryan inventava finais melhores pros filmes ruins e tentava fazer a gente rir quando a sala ficava silenciosa demais.',
 breno:'Breno não falava muito, mas ele lembrava de coisas que ninguém percebia. Uma vez ficou comigo sem perguntar nada até eu conseguir respirar.'
};
const SPECIFIC_LOST={
 allan:{samuel:'Eu lembro do Allan correndo com a bicicleta sem freio e dizendo que tava tudo sob controle. Eu tava puto com ele. Hoje eu pagava pra ouvir aquela risada de novo.'},
 samuel:{allan:'Eu sei que o Samuel irritava todo mundo tentando mandar. Mas ele também era o primeiro a aparecer quando alguém precisava. Sinto falta até das broncas.'},
 isabella:{laisla:'Ela me mandou uma playlist quando eu tava mal e nem falou nada sobre isso depois. A Isa cuidava das pessoas assim.',rauanny:'Quando eu precisava de alguém, a Isa aparecia com música e um pacote de biscoito. Eu nunca agradeci direito.'},
 rayssa:{isabella:'Eu ainda tô com raiva do que a Rayssa fez. Ela mentiu olhando na minha cara. E eu também sinto falta da menina com quem dividia tudo. As duas coisas tão aqui, porra.'},
 laisla:{rauanny:'Eu guardo aquela foto horrível do meu aniversário. A Laisla insistia que o valor dela era ver a gente feliz. Agora eu entendo.'},
 rauanny:{laisla:'Aquela menina me tirava do sério por qualquer coisa. Eu guardei o chaveiro da viagem que a gente nunca fez. Não sei o que fazer com isso ainda.'},
 ryan:{rauanny:'Ele sempre aparecia com uma piada na hora errada. Só agora eu percebo quantas vezes o Ryan me fez continuar quando eu queria desistir.',laisla:'Quando ninguém sabia o que dizer, o Ryan começava a narrar alguma besteira e acabava salvando a noite.'},
 breno:{ryan:'Eu lembro que o Breno guardou meu casaco uma noite inteira sem reclamar. E eu só fui descobrir semanas depois. Era o jeito dele de gostar de gente.'}
};
const closePairs={allan:['samuel','ryan','laisla'],samuel:['allan','isabella','ryan'],isabella:['rayssa','laisla','rauanny','breno'],rayssa:['isabella','rauanny','laisla'],laisla:['rauanny','ryan','isabella'],rauanny:['laisla','ryan','isabella'],ryan:['rauanny','laisla','breno','allan'],breno:['ryan','isabella','allan']};
function selectSpeaker(s,lost,used){
 const people=present(s);if(!people.length)return null;
 const options=people.filter(p=>p!==lost);
 const priority=closePairs[lost]||[];
 function score(id){const key=[id,lost].sort().join(':');const bond=Number(s.friendBonds?.[key])||0;const base=priority.includes(id)?60-8*priority.indexOf(id):0;
   const penalty=used[id]||0;return base+bond-penalty*45;
 }
 return options.slice().sort((a,b)=>score(b)-score(a))[0]||null;
}
function memorial(s){const lost=IDS.filter(x=>deceased(s,x)),used={};let spoken=0;
 const lines=lost.map(id=>{const who=selectSpeaker(s,id,used);let line;
  if(who){used[who]=(used[who]||0)+1;spoken++;
   const special=SPECIFIC_LOST[id]?.[who];line=`${pName(who)}: — ${special||MEMORIAL[id]}`;
   if(id==='rayssa'&&who==='isabella')line='Isabella: — Eu tô com uma raiva enorme da Rayssa. Talvez nunca pare. Mas também sinto saudade de quando ela era minha melhor amiga. Não quero que ninguém escolha o que eu tenho que sentir.';
  }else if(!deceased(s,'hero')){line=`Você: — ${MEMORIAL[id]}`;}
  else{line=`Ao lado da fotografia de ${pName(id)}, alguém deixou uma lembrança escrita. Ninguém tenta resumir a vida inteira numa frase.`;}
  return `${pName(id)}. Uma pausa atravessa a mesa antes que a lembrança venha.\n\n${line}`;
 });
 return lines.join('\n\n');
}
const ROM={
 ryan:{setting:'Ryan tira do bolso um ingresso de cinema amassado. Não é um convite novo: é o primeiro que vocês guardaram juntos.',
  talk:'Ryan: — Eu brinco com tudo, você sabe. Só que isso aqui é sério pra caralho. Eu quero poder te chamar de meu amor sem fingir que é piada. Quero namorar com você, de verdade. Você topa?',
  yes:'Ryan abre um sorriso tão grande que precisa esconder o rosto no seu ombro. — Eu tinha preparado uma fala ótima. Acabou de sumir, porra.',
  joke:'Ryan: — Aliança? Amor, eu vim preparado com um ingresso velho e coragem emprestada. Mas posso pesquisar umas bonitas depois do filme.',
  public:'Ryan: — Pessoal, antes que alguém invente teoria... a gente tá namorando. Sim, podem rir. Não, não vou aceitar interrogatório.'},
 breno:{setting:'Breno te acompanha até a varanda. Ele está com as mãos no bolso, mas dessa vez não evita olhar nos seus olhos.',
  talk:'Breno: — Eu passei tempo demais achando que ia sobrar na vida dos outros. Com você eu queria parar de me esconder. Eu quero algo sério. Quero ser seu namorado. Se você também quiser.',
  yes:'Breno sorri pequeno, depois encosta a testa na sua. — Você faz ideia de quantas vezes eu ensaiei essa pergunta sem coragem de falar?',
  joke:'Breno: — A aliança? Você mal aceitou e já tá me deixando nervoso de novo. Mas... eu ia gostar de escolher uma com você.',
  public:'Breno: — Eu não sou muito bom com anúncios, então... a gente decidiu ficar junto. De verdade. E eu tô feliz, tá?'},
 rauanny:{setting:'Rauanny puxa você para perto das luzes da varanda. Tenta parecer decidida, mas aperta sua mão com força.',
  talk:'Rauanny: — Eu sei que sou teimosa e que às vezes fico brava quando tô com medo. Mas eu não quero ficar imaginando o que a gente podia ter sido. Quero namorar com você. Você quer?',
  yes:'Rauanny solta uma risada nervosa e te abraça pela cintura. — Caralho, eu tava me preparando pra você dizer que precisava pensar até amanhã.',
  joke:'Rauanny: — Aliança? Óbvio que você ia falar isso! Calma, meu bem. Primeiro a gente escolhe onde vai ter o nosso primeiro encontro oficial.',
  public:'Rauanny: — Atenção, família! Não é pronunciamento, mas a gente tá namorando, tá? E ninguém vai fazer aposta sobre quanto tempo dura.'},
 rayssa:{setting:'Rayssa espera você se aproximar e mantém as mãos visíveis sobre a mesa. Ela não age como se quatro meses tivessem apagado o que aconteceu.',
  talk:'Rayssa: — Eu sei que não mereço que você confie só porque eu digo que te amo. Quero continuar respondendo pelo que fiz. Mas eu também queria perguntar se existe um futuro pra nós dois. Um namoro de verdade, sem que eu esconda de você o que sinto. Você quer tentar?',
  yes:'Rayssa engole o choro e pergunta baixinho se pode te abraçar. — Obrigada por escolher tentar. Eu prometo que não vou usar essa escolha pra cobrar perdão de ninguém.',
  joke:'Rayssa: — Aliança... eu nem sabia se você ia querer segurar minha mão de novo. Vamos construir isso com calma, sem esconder um do outro o que sente.',
  public:'Rayssa: — Eu preciso falar por mim. A gente decidiu tentar ficar junto, mas ninguém aqui tem obrigação de me aceitar de volta só por isso.'}
};
const REACT={
 isabella:{usual:'Isabella abre um sorriso e empurra o ombro de quem está perto. — Tá, tá. Agora eu posso finalmente parar de fingir que não percebia vocês se olhando.',rayssa:'Isabella segura o copo mais forte. — Eu desejo que você seja feliz. Mas isso não muda o que a Rayssa fez comigo e com a gente. Ainda preciso de distância.'},
 samuel:{usual:'Samuel solta o ar pelo nariz, quase sorrindo. — Finalmente. Só não me façam organizar uma festa pra isso hoje.',rayssa:'Samuel observa os dois por um momento. — Eu espero que vocês saibam o peso dessa decisão. Pra mim ainda tem coisa sem resposta.'},
 allan:{usual:'Allan bate uma palma antes de todos. — EU SABIA! Eu quero o crédito por ter sobrevivido a todas as indiretas dos dois.',rayssa:'Allan não faz piada. — Eu quero que vocês sejam felizes. Só não confundam namoro com o pessoal ter esquecido tudo.'},
 laisla:{usual:'Laisla leva a mão ao rosto, emocionada. — Vocês demoraram tanto que eu já tava perdendo a paciência. Que coisa linda, sério.',rayssa:'Laisla troca um olhar com os outros. — É uma notícia grande. Eu não vou fingir que sei como reagir agora, mas ouvi vocês.'},
 rauanny:{usual:'Rauanny aponta para o casal, rindo. — EU SABIA! Agora eu vou cobrar uma foto decente dos dois.',rayssa:'Rauanny olha para Rayssa sem disfarçar a tensão. — Tomara que vocês façam as coisas direito dessa vez.'},
 ryan:{usual:'Ryan abre os braços teatralmente. — Casalzão do ano! Tá, parei. Eu tô feliz por vocês, de verdade.',rayssa:'Ryan não consegue brincar como faria antes. — Eu torço por vocês, mas vou precisar de tempo pra entender.'},
 breno:{usual:'Breno sorri de canto. — Gosto de ver vocês dois assim. Espero que cuidem um do outro.',rayssa:'Breno baixa a voz. — Espero que vocês consigam construir algo bom. Mas não finjam que tá tudo resolvido.'},
 rayssa:{usual:'Rayssa sorri com certa timidez. — Fico feliz por vocês dois. Eu sei que talvez a gente não esteja perto como antes, mas desejo coisas boas.'}
};
function resolved(id,s,n){if(!n||!s)return n;
 const f=s.flags||{},available=present(s),h=first(s),r=activeLove(s);
 if(id==='c172_homenagem'&&available.length&&IDS.some(x=>deceased(s,x))){const lost=IDS.filter(x=>deceased(s,x));
   const intro=`Alguém colocou ${lost.length===1?'uma fotografia':'as fotografias'} sobre uma cadeira vazia. Durante um minuto ninguém encontra as palavras certas. Depois, quem era mais próximo de cada pessoa começa a falar — um de cada vez.`;
   const ending=`Ninguém tenta transformar aquelas vidas em estatísticas. Alguns se abraçam, outros só escutam. A mesa não fica menos triste, mas ninguém precisa guardar tudo sozinho.`;
   return {...n,text:`${intro}\n\n${memorial(s)}\n\n${ending}`};}
 if(id.startsWith('c152_future_')){
   const who=id.slice('c152_future_'.length),v=PERSONAL_MEM[who];if(!v)return n;
   // Preserva as lembranças e consequências do sistema V1.5.2, substituindo apenas as respostas genéricas.
   let t=n.text.replace(/^O reencontro segue num ritmo mais leve\. /,v.look+' ');
   if(!deceased(s,'hero')){
     t=t.replace(`Você pergunta a ${pName(who)} o que aconteceu com aquela pequena parte da vida anterior ao massacre.`,`Você: — ${v.ask}`);
     const personalEnding=v.end.replace(' — ',`\n\n${pName(who)}: — `);
     t=t.replace(`Você: — Então vamos continuar criando outras. Sem precisar esquecer essas.`,`Você: — ${v.hero}\n\n${personalEnding}`);
     // UG171 transforms the generic speech into hero's question and NPC answer; personalize this too.
     t=t.replace(new RegExp(`${pName(who)}: — Eu sei que não dá pra voltar atrás\\. Mas eu gosto de ter uma história que não começa com alguém gritando\\.`),`${pName(who)}: — ${v.answer}`);
   }
   return {...n,text:t};
 }
 if(/^k10_(44|45|46|47|48|49|50|51|56)$/.test(id)&&available.includes('breno')&&!deceased(s,'hero')&&/PONTO DE VISTA: BRENO/.test(n.text)){
  const wounded=f.c9_breno_abordagem==='acusacao'||f.c9_breno_conclusao==='rompimento'||f.c9_breno_conclusao==='cobranca';
  if(wounded){const nxt=n.choices?.find(c=>/^k10_/.test(c.to))?.to||goNext(s,'breno');
   let t=n.text.replace(/Breno: — E eu também não esqueci a homenagem\. Aquela acusação mexeu comigo pra caralho\. Só não quero que aquilo seja tudo que ficou\./g,'');
   t+=`\n\nBreno: — Eu vou falar uma coisa que ainda pesa. Ser acusado já foi uma merda. Mas o pior foi você, ${h}. Eu pensei que, de todo mundo, você ia perguntar como eu tava antes de me olhar como se eu fosse culpado.\n\nEle abaixa os olhos. Não está tentando estragar o reencontro. Só cansou de fingir que aquilo não machucou.`;
   return {...n,text:t,choices:[C('Conversar com Breno e tentar reparar a confiança','c175_breno_conversa',[['set','c175_breno_retorno',nxt]]),C('Dar espaço a Breno e ouvir a próxima pessoa',nxt)]};
  }
 }
 if(id==='c175_breno_conversa'){
  if(!available.includes('breno')||deceased(s,'hero'))return {...n,text:'Esta conversa não está disponível nesta rota.',choices:[C('Continuar o reencontro','k10_52')]};
  return {...n,text:`Breno espera você se aproximar da porta. Do outro lado, os amigos riem de alguma coisa que Allan ou Ryan disse. Ele não acompanha a risada.\n\nBreno: — Eu não tô cobrando que você confie cegamente em mim. Todo mundo tava com medo naquela noite. Mas a maneira como você falou comigo na homenagem... eu passei dias ouvindo aquilo na minha cabeça.\n\nVocê: — Breno, eu...\n\nBreno: — Deixa eu terminar, por favor. Eu já tinha medo de ser esquecido. Quando você me chamou de mentiroso, principalmente você, ${h}, eu senti que não tinha lugar nem entre vocês.\n\nEle respira fundo. Pela primeira vez, não há perseguidor interrompendo a conversa.`,choices:[
   C('Pedir desculpas de verdade, sem justificar a acusação','c175_breno_resposta',[['set','c175_breno_tom','desculpa'],['bond','breno',5]]),
   C('Reconhecer que estava com medo, mas ainda precisa conversar','c175_breno_resposta',[['set','c175_breno_tom','conversa'],['bond','breno',1]]),
   C('Respeitar que Breno não queira falar disso agora','c175_breno_resposta',[['set','c175_breno_tom','espaco']])
  ]};
 }
 if(id==='c175_breno_resposta'){
  const nxt=N[f.c175_breno_retorno]?f.c175_breno_retorno:goNext(s,'breno');
  if(!available.includes('breno')||deceased(s,'hero'))return {...n,text:'A conversa não aconteceu nesta rota.',choices:[C('Avançar',nxt)]};
  const variant=f.c175_breno_tom==='desculpa'?`Você: — Você tem razão. Eu te acusei sem te ouvir, e falar que eu tava assustado não apaga isso. Eu fui injusto. Me desculpa, Breno.\n\nBreno demora a responder.\n\nBreno: — Obrigado por falar assim. Eu precisava ouvir uma desculpa sem um «mas» depois. Não tô dizendo que esqueci, só... já ajuda muito.\n\nVocê: — Eu sei. Não vou exigir que você confie em mim imediatamente. Vou tentar merecer isso de novo.\n\nBreno segura sua mão por um instante, se você permite. — A gente pode começar conversando. Eu gosto de você. Só não quero me perder pra continuar perto.`:f.c175_breno_tom==='conversa'?`Você: — Eu tava apavorado com o que tava acontecendo. Queria uma resposta, qualquer uma, e te tratei como suspeito.\n\nBreno: — Eu entendo o medo, ${h}. Mas ainda me dói. Se a gente quiser melhorar, preciso que você escute antes de tirar conclusão.\n\nVocê: — Posso tentar. E a gente conversa mais quando você quiser.\n\nBreno assente, sem fingir que houve reconciliação imediata.`:`Você: — Eu não vou te obrigar a me ouvir agora. Eu só queria que você soubesse que percebi que te machuquei.\n\nBreno: — Tá. Eu preciso de tempo mesmo. Obrigado por não transformar isso em outra discussão.\n\nVocê fica perto dele alguns segundos antes de voltar para a mesa.`;
  return {...n,text:`${variant}\n\nQuando voltam para a sala, ninguém exige um relatório do que conversaram. Algumas relações precisam de mais de uma noite para cicatrizar.`,choices:[C('Ouvir a próxima pessoa na confraternização',nxt)]};
 }
 if(id==='c172_romance_reacao'&&r){return {...n,choices:[C('Continuar a conversa com '+pName(r),'c175_romance_pedido')]};}
 if(/^c175_romance_/.test(id)&&!r){return {...n,text:'A despedida acontece sem uma cena romântica que não pertence a esta história.',choices:[C('Voltar à despedida','c172_despedida')]};}
 if(id==='c175_romance_pedido'){
  const v=ROM[r];const trust=(r==='breno'&&(f.c9_breno_abordagem==='acusacao'||f.c9_breno_conclusao==='rompimento')&&!['desculpa'].includes(f.c175_breno_tom))?`\n\nBreno: — E eu preciso dizer uma coisa: o que aconteceu na homenagem ainda dói. Namorar não vai resolver isso de repente. Eu preciso sentir que você me escuta.`:'';
  return {...n,text:`${v.setting}\n\n${v.talk}${trust}\n\nVocê percebe que não é só uma conversa sobre o próximo fim de semana. ${pName(r)} está falando de compartilhar uma vida de verdade: estudar, errar, pedir ajuda, ter encontros bobos e fazer planos que não terminem em tragédia.\n\n${pName(r)}: — Não precisa responder só porque a gente sobreviveu. Eu quero que você escolha por você.`,choices:[
   C('Aceitar: “Eu quero namorar com você.”','c175_romance_aceito',[['set','c175_namoro_oficial',r],['set','c175_namoro_decisao','sim'],['bond',r,6]]),
   C('Continuar juntos, mas sem oficializar por enquanto','c175_romance_sem_rotulo',[['set','c175_namoro_decisao','sem_rotulo'],['bond',r,2]]),
   C('Pedir mais tempo antes de assumir um compromisso','c175_romance_sem_rotulo',[['set','c175_namoro_decisao','tempo']])
  ]};
 }
 if(id==='c175_romance_aceito'){
  const v=ROM[r],extra=r==='rayssa'?'Ela não dá o beijo como se isso limpasse sua responsabilidade. Antes, pergunta com os olhos se você quer mesmo. Você se aproxima por vontade própria.':'Você segura o rosto de '+pName(r)+' com cuidado. O sorriso dos dois se mistura ao nervosismo daquele começo.';
  return {...n,text:`Você: — Eu quero. Não porque a gente quase morreu, nem porque preciso ter alguém. Eu quero namorar com você, ${pName(r)}. Quero os dias normais também.\n\n${v.yes}\n\n${extra}\n\nVocês se beijam devagar. O primeiro beijo como um casal assumido não tem plateia, sirene nem relógio contando segundos. Há só o barulho distante dos amigos na cozinha e uma vontade enorme de ficar mais um pouco.\n\nVocê se afasta um centímetro, sorrindo.\n\nVocê: — Pronto. Agora só falta a aliança.\n\n${v.joke}\n\nVocê ri e dá outro beijo em ${pName(r)}. Não é uma promessa de que nunca terão dias difíceis. É a decisão de estar junto e conversar também quando as coisas não forem fáceis.`,choices:[
   ...(available.filter(x=>x!==r).length?[C('Voltar e contar aos amigos que vocês estão namorando','c175_romance_anuncio',[['set','c175_namoro_anunciado',true]])]:[]),
   C('Guardar a novidade só entre vocês por enquanto','c175_romance_despedida',[['set','c175_namoro_anunciado',false]])
  ]};
 }
 if(id==='c175_romance_anuncio'){
  const v=ROM[r],others=available.filter(x=>x!==r);
  const order={ryan:['rauanny','laisla','breno','allan','isabella','samuel','rayssa'],breno:['ryan','isabella','allan','laisla','samuel','rauanny','rayssa'],rauanny:['laisla','ryan','isabella','allan','samuel','breno','rayssa'],rayssa:['isabella','rauanny','laisla','ryan','samuel','breno','allan']}[r];
  const invited=order.filter(x=>others.includes(x)).slice(0,3);
  return {...n,text:`Vocês entram de mãos dadas. Alguém percebe antes mesmo que o assunto apareça.\n\n${v.public}\n\nVocê: — É oficial, gente. A gente decidiu namorar. Só não precisa marcar casamento pra amanhã, tá?\n\n${invited.map(id=>REACT[id]?.[r==='rayssa'?'rayssa':'usual']||`${pName(id)} sorri ao ouvir a notícia.`).join('\n\n')}\n\n${r==='rayssa'?'A mesa não vira uma festa de reconciliação. Isabella e os outros têm direito à própria dor; ninguém exige que esqueçam a traição. O casal aceita esse limite.':'Alguém pede uma foto dos dois. Vocês riem, se abraçam e acabam dando mais um beijo diante dos amigos, sob uma chuva de brincadeiras e parabéns.'}\n\nDepois, a conversa segue com histórias bobas e planos de encontros — coisas pequenas pelas quais vocês estão felizes de novo.`,choices:[C('Encerrar a noite ao lado de '+pName(r),'c175_romance_despedida')]};
 }
 if(id==='c175_romance_sem_rotulo'){
  const shape=f.c175_namoro_decisao==='tempo';const ready=s.hero?.pronouns==='ela'?'pronta':s.hero?.pronouns==='elu'?'pronte':'pronto';const nervous=['rauanny','rayssa'].includes(r)?'nervosa':'nervoso';
  return {...n,text:shape?`Você: — Eu gosto de você, ${pName(r)}. Muito. Mas ainda não tô ${ready} pra chamar isso de namoro. Não quero prometer e depois me esconder.\n\n${pName(r)} não sorri de imediato, mas escuta até o fim.\n\n${pName(r)}: — Obrigado por falar a verdade. Eu fiquei ${nervous} só de perguntar. Vou respeitar seu tempo — mas também preciso cuidar de mim.\n\nVocês ficam alguns minutos em silêncio, sem transformar uma resposta difícil em castigo.`:`Você: — Eu quero continuar vivendo isso com você. Sair, conversar, beijar, fazer planos pequenos. Só não quero oficializar hoje.\n\n${pName(r)}: — Tá. Eu queria dar um nome pra gente, mas prefiro saber o que você sente de verdade. Vamos conversar de novo quando estivermos mais seguros do que queremos?\n\nVocê segura a mão de ${pName(r)}. O afeto continua existindo, sem uma promessa arrancada no susto.`,choices:[C('Voltar à despedida com carinho','c175_romance_despedida')]};
 }
 if(id==='c175_romance_despedida'){
  const yes=f.c175_namoro_oficial===r;
  return {...n,text:yes?`A noite chega devagar. ${pName(r)} pergunta se pode acompanhar você até o portão. Vocês caminham de mãos dadas, ainda meio sem acreditar.\n\n${pName(r)}: — Me manda mensagem quando chegar?\n\nVocê: — Só se você mandar também. Namoro sério tem fiscalização dupla.\n\n${pName(r)} ri e te puxa para mais um beijo. Dessa vez ninguém está correndo de nada.\n\nVocê volta para a mesa sabendo que a noite não apagou as perdas, mas abriu espaço para uma coisa boa.`:`Vocês voltam para a mesa sem precisar explicar tudo aos outros. O carinho continua ali, sem pressa e sem cobrança. Pela primeira vez, escolher o próprio ritmo também parece uma forma de coragem.`,choices:[C('Seguir para a última despedida','c172_despedida')]};
 }
 return n;
}
window.UG175=Object.freeze({resolve:resolved,memorial,activeLove});
})();
