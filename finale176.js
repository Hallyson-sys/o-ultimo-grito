/* O Último Grito V1.7.6 — Podcast de Alice. Episódio de fechamento
   com falas coerentes com a sobrevivência, perdas e sigilo do save. */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;
if(!N||!H)return;
const FRIENDS=['ryan','samuel','allan','isabella','breno','rauanny','laisla','rayssa'];
const NAME={ryan:'Ryan',samuel:'Samuel',allan:'Allan',isabella:'Isabella',breno:'Breno',rauanny:'Rauanny',laisla:'Laisla',rayssa:'Rayssa'};
const CLOSE={ryan:['rauanny','laisla','breno'],samuel:['allan','isabella'],allan:['samuel','ryan'],isabella:['rayssa','laisla'],breno:['ryan','isabella'],rauanny:['laisla','ryan'],laisla:['rauanny','ryan'],rayssa:['isabella','rauanny']};
const C=(text,to,effects=[])=>({text,to,effects});
const dead=(s,id)=>id==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG10?.dead?.(s,id);
const hero=s=>String(s?.hero?.name||'Você').trim().split(/\s+/)[0]||'Você';
const available=s=>window.UG172?.members?.(s)||FRIENDS.filter(id=>!dead(s,id));
const guest=s=>FRIENDS.filter(id=>id!=='rayssa').find(id=>available(s).includes(id))||(!dead(s,'hero')?'hero':null);
const who=(s,id)=>id==='hero'?hero(s):NAME[id]||'Convidado';
const lost=s=>FRIENDS.filter(id=>dead(s,id));
const friendLost=(s,id)=>{const fallen=lost(s);if(id==='hero')return fallen[0]||null;return (CLOSE[id]||[]).find(x=>fallen.includes(x))||fallen[0]||null;};
const reply={
 ryan:'Eu passei semanas tentando fazer todo mundo rir. Aí me vi no mercado, tremendo porque alguém deixou cair uma garrafa. É estranho ter medo até de barulho normal.',
 samuel:'Eu fiquei tentando encontrar o momento em que podia ter feito diferente. Demorei muito pra entender que assumir meus erros não é a mesma coisa que viver me punindo todo dia.',
 allan:'Eu era o cara que fazia piada até na hora errada. Depois eu fiquei sem conseguir contar uma. Achei que, se voltasse a rir, tava desrespeitando quem morreu.',
 isabella:'A pessoa em quem eu mais confiava sabia de coisas que eu não sabia. Eu ainda não tenho uma resposta pronta quando alguém pergunta se dá pra voltar a confiar.',
 breno:'Já era difícil me sentir parte do grupo antes. Depois de tudo, quando alguém me liga, eu ainda penso que vai ser pra me acusar de alguma coisa.',
 rauanny:'Eu fazia planos até pra quem não me pedia. Depois fiquei com medo de planejar o fim de semana. Ainda tô reaprendendo a pensar no amanhã.',
 laisla:'Passei dias sem chegar perto de uma janela. Eu sabia que tava segura, mas meu corpo não acreditava. Ninguém vê isso quando lê a notícia.',
 hero:'Eu fiz escolhas que ainda repasso na cabeça. Algumas salvaram pessoas, outras eu não consigo explicar sem ficar com a voz presa.'
};
const remembrance={
 allan:'Ele fazia a pior piada possível e achava genial. Eu queria ouvir uma delas agora, nem que fosse pra reclamar.',
 samuel:'Ele implicava com tudo, mas era quem mais se preocupava quando a gente ficava sem notícias de alguém.',
 isabella:'Ela fazia playlists com músicas que eu nem conhecia. Depois que a gente escutava, parecia que ela entendia uma coisa que ninguém tinha conseguido dizer.',
 rayssa:'O que aconteceu com ela é complicado. Eu não vou simplificar uma vida inteira só por causa da dor que ficou.',
 laisla:'Ela queria guardar os dias bons em fotografias. Eu tenho uma em que ninguém saiu bonito, e é uma das poucas que ainda consigo olhar.',
 rauanny:'Ela conseguia discutir comigo e, dez minutos depois, aparecer com comida e perguntar se eu tava bem.',
 ryan:'Ele era o tipo de pessoa que fazia a gente rir até quando não queria. Eu sinto falta até das piadas ruins.',
 breno:'Ele não falava muito, mas sempre notava quando alguém tinha ficado pra trás.'
};
const location='PODCAST · VOZES DE LAKEWOOD';
const seq=[
 ['c176_podcast_01','19:02'],['c176_podcast_02','19:06'],['c176_podcast_03','19:11'],
 ['c176_podcast_04','19:15'],['c176_podcast_05','19:21'],['c176_podcast_06','19:26']
];
for(const [id,time] of seq){if(N[id])throw Error('V1.7.6: ID duplicado '+id);let x={id,chapter:'CAPÍTULO 10 · O GRAND FINALE',location,time,scene:'phone',speaker:'NARRAÇÃO',text:'',choices:[]};N[id]=x;H.push(x);}
function resolve(id,s,n){if(id!=='k10_53'&&id!=='k10_54'&&!id.startsWith('c176_podcast_'))return n;
 const f=s?.flags||{},g=guest(s),label=g?who(s,g):null,fallen=lost(s),close=g?friendLost(s,g):null;
 const victimNames=fallen.map(id=>NAME[id]);if(dead(s,'hero'))victimNames.push(hero(s));
 const list=victimNames.length?victimNames.length<=4?victimNames.join(', '):victimNames.slice(0,4).join(', ')+' e outros amigos':'ninguém do grupo de oito amigos';
 const prior=f.c176_assunto||'acolhimento';
 const gratitude=(g==='isabella'||g==='laisla'||g==='rauanny'||(g==='hero'&&s?.hero?.pronouns==='ela'))?'Obrigada':'Obrigado';
 if(id==='k10_53'){
  return {...n,location,scene:'phone',text:`QUATRO MESES DEPOIS · NOVO EPISÓDIO\n\nO sinal vermelho de GRAVAÇÃO ACESA se ilumina no estúdio. Em outra parte de Lakewood, alguém coloca os fones e aumenta o volume.\n\nUma jovem ajeita o microfone e confere um papel cheio de anotações. Seu nome é Alice. Ela respira fundo, espera a vinheta terminar e começa.\n\nAlice: — Oi, pessoal. Eu sou a Alice, e vocês estão ouvindo Vozes de Lakewood. Normalmente eu trago histórias daqui, de lugares e de gente que quase ninguém conhece. Mas hoje... hoje é diferente.\n\nAlice: — Faz quatro meses que nossa cidade virou manchete por causa dos ataques na propriedade Gomes e de tudo que aconteceu antes daquela noite. Vocês viram notícias, teorias, vídeos. Só que ninguém consegue resumir o que essas pessoas viveram em um título.\n\n${g?`Alice: — Meu convidado de hoje é ${label}, uma das pessoas que conseguiu sair viva daquele pesadelo. Obrigada por vir. Se você não quiser responder alguma coisa, me fala. A gente para.`:`Alice: — Eu convidei sobreviventes e familiares, mas ninguém pôde ou quis gravar hoje. E tá tudo bem. Não vou colocar palavras na boca deles. Este episódio vai reunir somente informações públicas e perguntas que continuam em aberto.`}\n\n${g?`${label}: — ${gratitude} por falar isso. Não é exatamente fácil estar aqui.`:'Alice coloca os depoimentos públicos sobre a mesa, longe das fotos das vítimas. Ela deixa alguns segundos de silêncio antes de continuar.'}`,choices:[C('Continuar o episódio com Alice','c176_podcast_01')]};
 }
 if(id==='c176_podcast_01'){
  const count=fallen.length+(dead(s,'hero')?1:0);
  const open=g?`${label}: — Na internet parece que já virou tudo uma história fechada, né? Como se tivesse começo, meio e fim. Pra mim ainda parece que eu tô tentando acordar daquela noite.\n\nAlice: — O que as pessoas mais erram quando falam do que aconteceu?\n\n${label}: — Acham que, se a gente sobreviveu, então acabou. Não acabou. Tem gente que não dorme, tem gente que mudou de casa. Tem dia em que eu não respondo o telefone porque fico com medo do que vou ouvir.`:`Alice: — Mesmo sem uma entrevista ao vivo, é importante lembrar: o número de sobreviventes não diz como eles estão. O fim dos ataques não significa que o trauma terminou.\n\nAlice consulta informações publicadas sobre atendimentos e pedidos de privacidade, sem divulgar prontuários nem relatos íntimos.`;
  return {...n,text:`VOZES DE LAKEWOOD · EPISÓDIO ESPECIAL\n\n${open}\n\nAlice: — Antes de qualquer teoria, eu quero lembrar das famílias. ${count?`Pelo menos ${count} pessoa${count>1?'s':''} entre o grupo e o protagonista não volt${count>1?'aram':'ou'}.`: 'O grupo de amigos conseguiu sobreviver, mas as marcas daquela noite não desapareceram.'} ${count?`A cidade perdeu ${list}. `:''}Eu não quero usar esses nomes só pra provocar medo ou aumentar audiência.\n\n${g?`${label}: — ${gratitude}. Porque cada pessoa que estava lá tinha vida antes daquela máscara aparecer. A gente tinha plano besta, aniversário, prova, briga por besteira. É disso que eu tento lembrar.`:'Alice faz uma pausa. O ruído discreto do ventilador é a única coisa que se ouve por alguns instantes.'}`,choices:[C('Ouvir Alice falar sobre as pessoas por trás das manchetes','c176_podcast_02')]};
 }
 if(id==='c176_podcast_02'){
  const l=close?NAME[close]:null;
  const personal=g?(close?`${label}: — Eu fico lembrando de ${l}. ${remembrance[close]}\n\nAlice: — Você fala dessa lembrança e parece que volta pra um dia comum.\n\n${label}: — Pois é. A gente acha que vai lembrar só da última noite, mas tem muita coisa de antes que eu não quero perder.`:`${label}: — ${reply[g]||reply.hero}\n\nAlice: — Você teve ajuda pra atravessar esses meses?\n\n${label}: — Não o tempo todo. Tive que aprender a pedir. Ainda tô tentando, na verdade.`):`Alice: — Os nomes que aparecem nas notícias não são personagens inventados. Eram pessoas com amizades, planos e famílias. Nenhuma lista de vítimas consegue mostrar isso.\n\nEla decide não reproduzir gravações de luto que circularam sem autorização.`;
  const heroLost=dead(s,'hero')&&g?`\n\nAlice: — Também houve quem nunca chegasse em casa naquela manhã. ${hero(s)} estava entre essas pessoas.\n\n${label}: — É difícil ouvir o nome em voz alta. Parece que alguém vai responder.`:'';
  return {...n,text:`O ASSUNTO MUDA QUANDO ALICE DEIXA DE LADO O ROTEIRO.\n\nAlice: — Eu separei perguntas sobre a investigação. Mas antes disso, queria saber uma coisa bem mais simples: do que você sente falta?\n\n${personal}${heroLost}\n\nAlice: — Obrigada por dividir isso. Quem tá ouvindo, por favor, não procure essas famílias pra exigir detalhes. O luto delas não é um quebra-cabeça pra internet resolver.\n\n${g?`${label}: — Eu só queria que lembrassem das pessoas como elas eram, não só de como morreram.`:'Ela lê os nomes publicados no memorial da cidade sem divulgar qualquer informação pessoal que não conste nos registros públicos.'}`,choices:[C('Ouvir a parte da entrevista sobre a investigação','c176_podcast_03')]};
 }
 if(id==='c176_podcast_03'){
  let jf=f.c10_jullia_fim==='presa'?'Jullia foi presa após o confronto final, mas a investigação não terminou com a prisão.':f.c10_jullia_fim==='lago'&&f.c10_pistola?'Jullia caiu no lago após um disparo; as autoridades ainda precisam esclarecer oficialmente o desfecho.':'O paradeiro de Jullia permanece incerto depois do confronto.';
  const ray=f.c10_rayssa_justica==='depoimento'&&!dead(s,'rayssa')?'Rayssa também está respondendo pela participação que assumiu nos depoimentos.':f.c10_rayssa_justica==='foragida'||f.c10_rayssa_status==='jullia'?'A polícia ainda procura esclarecer a participação de outras pessoas ligadas aos ataques.':f.c10_rayssa_justica==='segredo'?'Parte dos depoimentos continua restrita; nem toda acusação que circula online pode ser tratada como fato.':dead(s,'rayssa')?'Entre as pessoas mortas está Rayssa, cuja participação nos fatos segue sendo apurada.':'Algumas responsabilidades ainda dependem de provas e depoimentos.';
  return {...n,text:`ALICE PASSA O DEDO POR UMA LINHA DA CRONOLOGIA.\n\nAlice: — Eu queria ser bem responsável aqui. Tem muita postagem juntando rumor com coisa confirmada. O que sabemos é que Jullia Gomes sobreviveu ao acidente de um ano atrás, e que a volta dela foi descoberta naquela noite. ${jf}\n\nAlice: — ${ray}\n\n${g?`${label}: — O problema é que alguém publicou nossa história como se soubesse exatamente o que cada um pensava. Nem eu consigo lembrar de tudo sem precisar parar. Imagina gente que nem estava lá.`:'Alice afasta da câmera um quadro com setas e fotografias compartilhado nas redes. Nenhuma daquelas conexões foi confirmada apenas porque alguém a desenhou.'}\n\nAlice: — E tem uma pergunta que aparece toda vez que eu revejo a cronologia. Como certas mensagens chegaram às pessoas certas, em horários em que quase ninguém tinha acesso àquelas informações?\n\n${g?`${label}: — Foi isso que me fez aceitar conversar. Eu não quero acusar alguém só porque tenho medo. Mas tem detalhes que nunca se encaixaram.`:'Alice: — Eu não vou apresentar uma suspeita como culpada sem prova. Isso seria repetir os erros que cercaram esse caso desde o início.'}`,choices:[C('Ouvir o que ainda não se encaixa','c176_podcast_04')]};
 }
 if(id==='c176_podcast_04'){
  const clue= (s.clues||[]).some(x=>/c8_|c9_|registro|mensagem|audio|grava|foto/.test(x))||f.c10_evidence||f.c10_proof_saved;
  const rec=g?`${label}: — ${clue?'A gente guardou algumas mensagens e horários. Não é uma resposta, mas é uma forma de verificar se uma história bate com a outra.':'Eu lembro de mensagens e de horários que não faziam sentido. Só que lembrar não é ter prova. E não quero apontar um nome sem saber.'}\n\nAlice: — Você acha que houve mais alguém envolvido?\n\n${label}: — Eu acho que a gente não sabe tudo. Isso é diferente de dizer que conheço a resposta.`:`Alice: — Alguns horários divulgados publicamente foram interpretados de maneiras diferentes. Isso não prova que houve outro agressor. Apenas mostra que ainda existem lacunas.\n\nEla fecha a pasta. Na capa, escreveu à mão: NÃO CONFUNDIR SUSPEITA COM PROVA.`;
  return {...n,text:`VOZES DE LAKEWOOD · O QUE AINDA FALTA\n\n${rec}\n\nAlice: — Tem gente dizendo que apareceu uma terceira pessoa de máscara em alguns ataques. Tem gente jurando que tudo foi armado por quem já foi identificado. Eu não tenho elementos suficientes pra confirmar nenhuma dessas versões.\n\n${g?`${label}: — Eu já fiquei preso nessa pergunta madrugada inteira. Mas se tiver mais alguém, quero que encontrem pelas provas, não por teoria de internet.`:'Alice: — Uma pergunta sem resposta não autoriza a gente a transformar qualquer pessoa numa suspeita.'}\n\nAlice: — E eu tenho outra pergunta, só que ela é pra quem está ouvindo: por que tanta gente procura um monstro novo antes de escutar as pessoas que sobreviveram?`,choices:[
   C('Ouvir a parte sobre reconstruir a vida','c176_podcast_05',[['set','c176_assunto','acolhimento']]),
   C('Ouvir a última reflexão sobre o mistério','c176_podcast_05',[['set','c176_assunto','investigacao']])
  ]};
 }
 if(id==='c176_podcast_05'){
  const supporting=g?(prior==='investigacao'?`${label}: — Eu ainda quero respostas. Mas isso não significa que vou transformar todos os meus amigos em suspeitos. Já fizemos coisa demais movidos pelo medo.\n\nAlice: — Você voltaria a falar com o xerife Diego se surgisse uma prova nova?\n\n${label}: — Voltaria. Uma prova de verdade, sim. Não um print cortado com legenda assustadora.`:`${label}: — O mais difícil foi aceitar que minha vida continuou. Eu me senti culpado até na primeira vez que ri com alguém.\n\nAlice: — E o que você diria pra quem viveu algo parecido?\n\n${label}: — Que pedir ajuda não é desistir. Às vezes é a única coisa que faz a gente conseguir atravessar mais um dia.`):prior==='investigacao'?`Alice: — A investigação do xerife Diego continua sendo o caminho pra esclarecer fatos, não os comentários de um vídeo. Se uma prova nova aparecer, o lugar dela é com quem pode verificar.`:`Alice: — Talvez alguns sobreviventes nunca queiram falar publicamente, e isso precisa ser respeitado. Seguir em frente não tem prazo nem roteiro.`;
  return {...n,text:`ALICE DESLIGA A TELA COM AS PERGUNTAS ENVIADAS PELOS OUVINTES.\n\nAlice: — Eu recebi centenas de mensagens perguntando se alguém foi perdoado, se os amigos voltaram a ser próximos, se conseguiram dormir de novo. Algumas dessas respostas não pertencem ao público.\n\n${supporting}\n\nAlice: — A gente pode querer saber a verdade sem exigir que alguém reviva o pior momento da própria vida na frente de um microfone.\n\n${g?`${label}: — ${gratitude} por perguntar sem tentar me fazer dar uma resposta de efeito.`:'Ela respira fundo e vira a última página do roteiro.'}`,choices:[C('Escutar a despedida de Alice','c176_podcast_06')]};
 }
 if(id==='c176_podcast_06'){
  return {...n,text:`O LED VERMELHO DO MICROFONE CONTINUA ACESO.\n\nAlice: — Quando comecei esse programa, achava que descobrir uma história era encontrar a resposta certa e dar um ponto final. Hoje eu entendo que algumas histórias não terminam quando a manchete desaparece.\n\n${g?`Alice: — ${label}, obrigada por confiar em mim pra conversar sobre um assunto tão difícil. De verdade.\n\n${label}: — Eu só espero que as pessoas lembrem que a gente existia antes de tudo isso.`:'Alice: — Obrigada a quem compartilhou informações verificadas e, principalmente, às famílias que pediram privacidade. Esse espaço continua aberto quando elas quiserem falar — sem pressão.'}\n\nAlice: — E, pra quem tá ouvindo: se você tiver informações concretas sobre os ataques, procure as autoridades. Não vá atrás de suspeitos sozinho.\n\nAlice dá um sorriso pequeno para a câmera e tira um dos fones.\n\nAlice: — Eu sou a Alice, e esse foi o Vozes de Lakewood. Obrigada por me acompanhar até aqui. A gente se escuta no próximo episódio.\n\nA vinheta toca novamente. Por um momento, parece apenas o fim de uma entrevista difícil. Mas o silêncio que vem depois da gravação dura um pouco mais do que Alice esperava.`,choices:[C('Assistir à última cena da temporada','k10_54')]};
 }
 if(id==='k10_54'&&!(f.c10_rayssa_justica==='depoimento'&&!dead(s,'rayssa')&&f.c10_rayssa_status!=='jullia')){
  return {...n,location:'PÓS-CRÉDITOS · ESTÚDIO DE ALICE',time:'19:32',text:`O estúdio de Alice já está vazio. Ela confere os últimos arquivos antes de fechar o notebook. O episódio acabou de ser publicado.\n\nUma notificação surge de um remetente desconhecido.\n\nMENSAGEM: «Você perguntou se havia mais alguém. E se estivesse fazendo a pergunta errada?»\n\nAnexo: uma fotografia borrada de um lugar próximo ao lago. Não é possível identificar a pessoa na imagem nem quando ela foi tirada.\n\nAlice: — Que porra é essa...?\n\nEla salva a mensagem e pega o telefone, procurando o contato do xerife Diego. A tela escurece antes que a ligação seja atendida.\n\nNinguém sabe quem enviou o arquivo.`,choices:n.choices};
 }
 return n;
}
window.UG176=Object.freeze({resolve,guest});
})();
