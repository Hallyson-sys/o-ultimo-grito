/* O Último Grito V1.7.7 — pós-créditos personalizados e continuação misteriosa.
   Adiciona cenas sem renumerar os nós existentes; preserva saves V1.7.6. */
(()=>{'use strict';
 const N=window.NODES,H=window.HISTORIA;
 if(!N||!H)return;
 const LABEL={ryan:'Ryan',breno:'Breno',rauanny:'Rauanny',rayssa:'Rayssa',isabella:'Isabella',samuel:'Samuel',allan:'Allan',laisla:'Laisla'};
 const IDS=['isabella','samuel','allan','laisla','rauanny','ryan','breno','rayssa'];
 const hero=s=>String(s?.hero?.name||'Você').trim().split(/\s+/)[0]||'Você';
 const dead=(s,id)=>id==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG10?.dead?.(s,id);
 const here=s=>window.UG172?.members?.(s)||IDS.filter(id=>!dead(s,id));
 const romantic=s=>{
  const r=s?.romanceEscolhido;
  return ['ryan','breno','rauanny','rayssa'].includes(r)&&!dead(s,'hero')&&here(s).includes(r)?r:null;
 };
 const opt=(text,to,effects=[])=>({text,to,effects});
 const base={chapter:'CAPÍTULO 10 · O GRAND FINALE',scene:'house',speaker:'NARRAÇÃO'};
 const nodes=[['c177_chamada','23:49','PÓS-CRÉDITOS · A VOZ'],['c177_resposta','23:50','PÓS-CRÉDITOS · NÃO DESLIGUE'],['c177_rastro','23:51','PÓS-CRÉDITOS · UMA NOVA PISTA']];
 for(const [id,time,location] of nodes){if(N[id])throw Error('V1.7.7: ID duplicado '+id);const n={...base,id,time,location,text:'',choices:[]};N[id]=n;H.push(n);}
 const dialogue={
  ryan:{presence:'Ryan está no sofá, tentando escolher um filme. Ele segura a pipoca entre os joelhos e abre um sorriso quando você aparece.',ask:'Ryan: — Ei... quem liga a essa hora? Não reconheço esse número.',after:'Ryan: — Eu queria fazer uma piada agora, mas não tem graça. Tô aqui com você. E a gente vai contar pro Diego.'},
  breno:{presence:'Breno se sentou no chão ao seu lado, encostado no sofá. Está montando uma lista de lugares que vocês querem conhecer sem fugir de nada.',ask:'Breno: — Você ficou pálido. É alguém do hospital? O que foi?',after:'Breno pega sua mão. — Não vou dizer que não tô com medo. Mas também não vou te deixar passar por isso sem ajuda.'},
  rauanny:{presence:'Rauanny deixa duas canecas de chocolate quente na mesa e reclama, brincando, que você escolheu a pior série do catálogo.',ask:'Rauanny: — Amor, seu celular tá tocando... Por que você tá olhando pra ele desse jeito?',after:'Rauanny desliga a televisão. — Ninguém vai enfrentar essa merda sozinho outra vez. Vamos falar com o Diego.'},
  rayssa:{presence:'Rayssa está com você numa visita tranquila e discreta. Ainda existem conversas difíceis entre os dois, mas hoje ela ficou para jantar, sem pedir que o passado fosse esquecido.',ask:'Rayssa: — Número desconhecido? Se for sobre o caso, não atende sozinho. Por favor.',after:'Rayssa respira fundo. — Eu sei que você tem todos os motivos pra desconfiar de mim. Mas essa ligação precisa ir pro Diego. Sem esconder nada desta vez.'}
 };
 function resolve(id,s,n){if(!n||!s||!(id==='k10_54'||id.startsWith('c177_')))return n;
  const f=s.flags||{},h=hero(s),alive=!dead(s,'hero'),r=romantic(s),love=r?LABEL[r]:null,rt=r?dialogue[r]:null;
  const committed=r&&f.c175_namoro_oficial===r;
  const intro=r?`${rt.presence}\n\n${committed?`${love} se aproxima e te dá um beijo rápido, sem se preocupar se agora vocês podem chamar isso de namoro. O nome já foi escolhido na confraternização.`:`Entre vocês ainda existem coisas que precisam ser conversadas, mas ${love} ficou. A companhia não exige uma promessa nova.`}`:'A casa está quieta. Você deixou uma xícara sobre a mesa e tentava escolher algo para assistir, mas ainda não se acostumou completamente com o silêncio.';
  if(id==='k10_54'){
    if(alive)return {...n,scene:'house',location:'PÓS-CRÉDITOS · CASA DO PROTAGONISTA',time:'23:48',text:`QUATRO MESES DEPOIS · LAKEWOOD\n\nO último episódio do podcast de Alice terminou há algumas horas. O celular está virado para baixo na mesa. Há quatro meses, você teria esperado que qualquer toque significasse outra notícia horrível; hoje está tentando reaprender a simplesmente ficar em casa.\n\n${intro}\n\nSeu telefone vibra. NÚMERO DESCONHECIDO. Nenhuma fotografia, nenhum nome. A vibração para e recomeça segundos depois.\n\n${r?rt.ask:'Você olha a tela. Ninguém do grupo avisou que ligaria. Seu peito aperta sem que você saiba explicar por quê.'}\n\nVocê pensa em ignorar. Então vê uma nova notificação, enviada pelo mesmo número: «Atende, ${h}. Eu sei que você tá em casa.»\n\nVocê ergue os olhos para a janela. Do lado de fora não há ninguém que consiga enxergar.`,choices:[opt('Atender a ligação e descobrir quem está do outro lado','c177_chamada')]};
    const people=here(s).filter(id=>!dead(s,id));const witness=people.sort((a,b)=>(s?.bonds?.[b]??50)-(s?.bonds?.[a]??50))[0];
    if(witness){const w=LABEL[witness];return {...n,scene:'house',location:`PÓS-CRÉDITOS · CASA DE ${w.toUpperCase()}`,time:'23:48',text:`QUATRO MESES DEPOIS · LAKEWOOD\n\n${w} termina de ouvir o episódio de Alice. A casa está silenciosa, e uma fotografia antiga do grupo permanece sobre a estante. Na fotografia, ${h} ainda está vivo.\n\nO telefone vibra. NÚMERO DESCONHECIDO. Uma mensagem aparece: «Você achou que a história terminava no lago?»\n\n${w}: — Tá de sacanagem...\n\nO aparelho toca de novo. ${w} hesita, mas atende.`,choices:[opt('Ouvir o que a voz desconhecida quer','c177_chamada')]};}
    return {...n,scene:'town',location:'PÓS-CRÉDITOS · DEPARTAMENTO DO XERIFE',time:'23:48',text:`QUATRO MESES DEPOIS · LAKEWOOD\n\nDiego está sozinho no departamento, revisando os últimos documentos públicos do massacre. Nenhum dos nove jovens chegou a essa noite. Ele passa os dedos por uma fotografia do grupo, sem conseguir decidir qual nome ainda pesa mais.\n\nO telefone fixo toca. O identificador de chamadas está em branco.\n\nDiego: — Departamento do Xerife de Lakewood. Quem fala?\n\nDo outro lado, a respiração é baixa e distorcida.`,choices:[opt('Ouvir a ligação anônima','c177_chamada')]};
  }
  if(id==='c177_chamada'){
   if(alive)return {...n,scene:'phone',text:`Você atende e leva o aparelho ao ouvido.\n\nVocê: — Alô? Quem tá falando?\n\nUm chiado curto. Um som de respiração, abafado por algum tipo de filtro.\n\nVOZ DESCONHECIDA: — Faz tempo, ${h}. Gostou de ouvir a história da sua vida no podcast?\n\nVocê: — Quem é você?\n\nVOZ DESCONHECIDA: — Engraçado... você ficou tão bom em descobrir quem tá por trás de uma máscara. Achei que ia reconhecer minha voz.\n\nVocê se levanta. ${r?`${love} percebe a mudança no seu rosto e se aproxima, sem tentar pegar o telefone.`:'A sala parece menor de repente.'}\n\nVocê: — Se isso é alguma brincadeira, acabou. Eu vou chamar a polícia.\n\nVOZ DESCONHECIDA: — Chama. Conta tudo pro Diego. Mas me responde uma coisa antes: você achou mesmo que o jogo tinha acabado?\n\nA voz ri baixinho, quase sem som.\n\nVOZ DESCONHECIDA: — O jogo ainda não acabou, ${h}. E, desta vez, não adianta escolher quem você vai salvar.\n\nA ligação permanece aberta. Você escuta uma porta bater ao fundo, em algum lugar que não consegue identificar.\n\n${r?rt.after:'Você abre o contato de Diego na tela, sem desligar a ligação.'}`,choices:[
    opt('“Eu não vou fugir de você. Quem é?”','c177_resposta',[['set','c177_reacao_final','enfrentar']]),
    opt('Desligar e procurar o xerife Diego','c177_resposta',[['set','c177_reacao_final','diego']]),
    ...(r?[opt(`Pedir a ${love} que fique perto e ligar para Diego`,'c177_resposta',[['set','c177_reacao_final','proteger']])]:[])
   ]};
   const witness=here(s).filter(id=>!dead(s,id)).sort((a,b)=>(s?.bonds?.[b]??50)-(s?.bonds?.[a]??50))[0];
   if(witness){const w=LABEL[witness];return {...n,scene:'phone',text:`${w}: — Quem é?\n\nVOZ DESCONHECIDA: — Você ainda guarda a foto daquela noite, não guarda? A que tem ${h}?\n\n${w}: — Vai se foder. Quem tá falando?\n\nVOZ DESCONHECIDA: — O massacre acabou. Mas o jogo, não.\n\n${w}: — Eu vou levar essa ligação pro xerife.\n\nVOZ DESCONHECIDA: — Pode levar. Ele vai precisar escutar com atenção.\n\nA linha fica muda. ${w} grava o horário e telefona para Diego.\n\nA morte de ${h} não é desfeita por essa chamada. Quem está do outro lado continua sem nome.`,choices:[opt('Encerrar o pós-crédito','k10_55')]};}
   return {...n,scene:'phone',text:`VOZ DESCONHECIDA: — Xerife... o senhor realmente achou que tinha ouvido a última história sobre aquela noite?\n\nDiego: — Identifique-se. Agora.\n\nVOZ DESCONHECIDA: — Eles não podem mais jogar. Mas o jogo ainda não acabou.\n\nA chamada cai. Diego anota o horário, guarda o telefone e pede que a central preserve o registro da ligação. Não há pistas suficientes para identificar a voz.\n\nDiego: — Dessa vez não vou deixar essa porra virar mais um segredo.`,choices:[opt('Encerrar a primeira temporada','k10_55')]};
  }
  if(id==='c177_resposta'){
   const reaction=f.c177_reacao_final||'enfrentar';
   const outcome=reaction==='enfrentar'?`Você: — Escuta bem. Eu não sei quem você é, mas não vou deixar você transformar a vida dos meus amigos em outro jogo.\n\nVOZ DESCONHECIDA: — Que bonito. Espero que você consiga cumprir essa promessa.\n\nA chamada cai antes que você consiga perguntar qualquer outra coisa.`:reaction==='proteger'&&r?`Você afasta o telefone da orelha sem desligar.\n\nVocê: — ${love}, tranca a porta e fica aqui comigo. A gente vai ligar pro Diego agora.\n\n${love}: — Tá. Mas olha pra mim: você não tá sozinho nisso.\n\nA voz solta uma última risada, distante. A ligação se encerra.`:`Você desliga sem responder. As mãos tremem, mas você procura o contato de Diego imediatamente.\n\nDiego atende na segunda chamada.\n\nDiego: — ${h}? O que aconteceu?\n\nVocê: — Recebi uma ligação. Uma voz... falando do jogo. Eu preciso que você ouça o que eu tô dizendo.\n\nDiego: — Tô ouvindo. Não apaga nada. E me diz se você tá num lugar seguro.`;
   return {...n,scene:'phone',text:`${outcome}\n\nVocê olha para o histórico da chamada. Nenhum nome, nenhuma pista que indique quem estava do outro lado. Só a voz — e o jeito como pronunciou seu nome.\n\nVocê tenta lembrar todos os detalhes para contar a Diego. Não vai acusar um rosto conhecido sem provas. Já sabe o estrago que isso pode causar.\n\nDo lado de fora, um carro passa devagar pela rua. Você espera que siga em frente — e ele segue. Por enquanto.`,choices:[opt('Encerrar a primeira temporada','k10_55')]};
  }
  return n;
 }
 window.UG177=Object.freeze({resolve,romantic});
})();
