/* O ÚLTIMO GRITO · V1.5.2 · Memórias emocionais opcionais e persistentes.
   Nunca remove escolhas pré-existentes; cenas aparecem apenas com seu participante vivo.
   Referências a mortos são lembranças e não diálogos presentes. */
(()=>{'use strict';
const LABEL={allan:'Allan',samuel:'Samuel',isabella:'Isabella',rayssa:'Rayssa',rauanny:'Rauanny',laisla:'Laisla',ryan:'Ryan',breno:'Breno'};
const IDS=Object.keys(LABEL);
const FEM=new Set(['isabella','rayssa','rauanny','laisla']);
const dead=(s,id,until=10)=>{const f=s?.flags||{};
 if(id==='allan'&&f.allan_morto_c4)return true;
 return [6,7,8,9,10].filter(n=>n<=until).some(n=>!!f[`c${n}_morto_${id}`]);
};
const hero=s=>s?.hero?.name?.split(' ')[0]||'Você';
const exists=s=>!!s&&typeof s==='object'&&!!s.flags;
const f=(s,k)=>!!s?.flags?.['c152_'+k];
const choice=(text,to,effects=[])=>({text,to,effects});
const mark=(key,v=true)=>['flag','c152_'+key,v];
const bond=(id,v)=>['bond',id,v];
const addNode=(id,chapter,location,time,scene)=>{
 if(window.NODES[id])throw Error('V1.5.2: cena repetida '+id);
 const n={id,chapter,location,time,scene,speaker:'NARRAÇÃO',text:'',choices:[]};
 window.NODES[id]=n;window.HISTORIA.push(n);
};
const DATA={
 allan:{other:'samuel',title:'A noite do bolo de pedra',
 memory:'Allan relembra uma noite em que decidiu fazer um bolo sem seguir receita. Convidou Samuel para provar antes dos outros, porque sabia que ele não teria coragem de dizer que estava horrível.\n\nAllan: — Eu juro que achei que tava arrasando. Quando o Samu mordeu, fez uma cara de quem tinha engolido cimento. E mesmo assim falou que tava bom.\n\nA risada vem, mas Allan a interrompe quando percebe o quanto faz tempo que ninguém pensa naquela cozinha.',
 heart:'Allan: — Eu faço piada com tudo porque, quando fico sério, eu penso que qualquer despedida pode ser a última. E eu odeio isso. Eu odeio muito.',
 light:'Allan: — Só me promete uma coisa: se eu inventar de cozinhar de novo, alguém vai ter coragem de tirar a panela da minha mão, beleza?',
 echo:'Allan segura o celular entre os dedos e mostra uma fotografia desfocada do bolo. Por alguns segundos ninguém fala da máscara.\n\nAllan: — Ainda tá na minha galeria. Não consigo apagar. Pode parecer besta, mas eu queria ter esse dia de volta.',
 future:'Allan: — Esses meses eu descobri que rir não apaga ninguém. Às vezes eu faço uma receita horrorosa só pra lembrar da confusão que a gente fazia na cozinha.'},
 samuel:{other:'allan',title:'A bicicleta sem freio',
 memory:'Samuel recorda quando tentou ajudar Allan a consertar uma bicicleta velha. Os dois juraram que sabiam o que estavam fazendo. Na primeira descida, perceberam que tinham montado os freios ao contrário.\n\nSamuel: — O Allan gritava meu nome como se eu pudesse parar a bicicleta no grito. Depois a gente caiu no gramado da praça e ficou meia hora discutindo de quem tinha sido a ideia.\n\nEle sorri ao lembrar, mas aperta os dedos em volta da xícara.',
 heart:'Samuel: — Eu fiquei tão acostumado a decidir tudo por todo mundo que nem percebi quando meus amigos começaram a ter medo de discordar de mim. Tô tentando mudar, de verdade.',
 light:'Samuel: — Se um dia eu aparecer com uma bicicleta pra consertar, me faz o favor de esconder a caixa de ferramentas.',
 echo:'Samuel aponta para um arranhão antigo no joelho.\n\nSamuel: — Essa cicatriz é daquela queda. Antes eu contava isso pra fazer todo mundo rir. Agora eu gosto porque ela prova que a gente teve uma infância normal.',
 future:'Samuel: — Comecei a pedir ajuda sem esperar chegar no limite. Não é fácil, mas cada vez que eu lembro daquela bicicleta eu paro de fingir que preciso resolver tudo sozinho.'},
 isabella:{other:'rayssa',title:'O fone de ouvido dividido',
 memory:'Isabella olha para a rua e se lembra das voltas da escola com Rayssa. As duas compartilhavam um fone: uma escolhia a música, a outra reclamava até decorar o refrão.\n\nIsabella: — Ela colocava umas músicas muito ruins só pra me irritar. Eu falava que odiava, mas sabia a letra inteira. A gente achava que nunca ia ficar sem assunto.\n\nA expressão dela muda ao perceber que sente saudade de um tempo em que confiar era automático.',
 heart:'Isabella: — Eu sou grossa quando fico desesperada. Aí, quando a pessoa vai embora, eu fico repassando cada palavra que podia ter falado diferente.',
 light:'Isabella: — Se você começar a cantar uma dessas músicas perto de mim, eu finjo que não te conheço. Mas só até o refrão.',
 echo:'Isabella encontra uma foto antiga do uniforme da escola.\n\nIsabella: — Eu tava com uma franja horrível nessa época. A Rayssa dizia que ficou ótima. Nunca soube se era gentileza ou sacanagem.',
 future:'Isabella: — Eu ainda tenho aquele fone. Decidi não jogar fora só porque a lembrança ficou complicada. O que a gente viveu também aconteceu.'},
 rayssa:{other:'isabella',title:'A promessa na varanda',
 memory:'Rayssa recorda uma tarde de tempestade, quando Isabella apareceu na casa dela sem avisar, levando biscoitos e um filme que nenhuma das duas terminou. Faltou luz e elas ficaram contando histórias até a chuva passar.\n\nRayssa: — A Isa dizia que eu tinha mania de querer consertar os problemas de todo mundo. Eu fiquei brava, óbvio. Hoje eu queria ter escutado melhor.\n\nEla olha para as próprias mãos e desvia quando você percebe que existe alguma coisa que ela não consegue dizer.',
 heart:'Rayssa: — Eu tenho medo de magoar alguém e, pra evitar uma conversa difícil, acabar fazendo uma merda muito maior. Isso não sai da minha cabeça.',
 light:'Rayssa: — A Isa roncou no meio do filme e disse que era o vento na janela. Até hoje ela nega. Eu tenho provas, viu?',
 echo:'Rayssa sorri para uma foto borrada das duas no escuro.\n\nRayssa: — Parece uma bobagem, mas eu queria voltar pra uma época em que a maior mentira era dizer que tinha visto o filme até o final.',
 future:'Rayssa: — Eu confundi proteger alguém com esconder a verdade. Hoje eu sei que uma coisa não substitui a outra. Não espero que isso apague nada.'},
 laisla:{other:'rauanny',title:'O bolo torto de aniversário',
 memory:'Laisla lembra da vez em que Rauanny apareceu em sua casa com um bolo torto, coberto de confeitos que escorriam pela lateral. Ela disse que tinha comprado numa padaria; a blusa estava cheia de farinha.\n\nLaisla: — Eu sabia que era mentira porque tinha até massa no cabelo dela. Só que ela parecia tão orgulhosa que eu comi duas fatias sem comentar.\n\nLaisla encosta a colher no prato e demora antes de continuar.',
 heart:'Laisla: — Eu brigo com a Rau por umas coisas tão pequenas... E aí penso que podia passar a vida inteira tentando ganhar discussão e esquecer de dizer que amo ela.',
 light:'Laisla: — Aquilo tinha gosto de fermento puro. Eu merecia um prêmio pela atuação, na moral.',
 echo:'Laisla mostra uma fotografia do bolo antes de cortarem.\n\nLaisla: — Ela ficou uma semana perguntando se eu tinha gostado. Eu nunca tive coragem de dizer o quanto tava ruim. Nem vou.',
 future:'Laisla: — A gente aprendeu a parar uma discussão e voltar depois. É estranho, mas às vezes a amizade melhora quando ninguém precisa ganhar.'},
 rauanny:{other:'laisla',title:'A viagem que não saiu da rodoviária',
 memory:'Rauanny lembra da tarde em que convenceu Laisla a viajar sem planejar quase nada. Chegaram à rodoviária com pouco dinheiro e descobriram que não tinham passagem nem hospedagem.\n\nRauanny: — A gente voltou pra casa de ônibus comum. A Lai comprou um chaveiro no terminal e falou que era lembrança da viagem. Eu ainda tenho o meu.\n\nEla dá uma risada baixinha, mas a saudade dura mais do que o riso.',
 heart:'Rauanny: — Todo mundo espera que eu seja a forte. Só que tem hora que eu queria poder chorar na frente de alguém sem precisar pedir desculpa depois.',
 light:'Rauanny: — O mais vergonhoso foi a gente postar foto com legenda de aventura. A maior aventura foi descobrir onde ficava o ponto de volta.',
 echo:'Rauanny tira o chaveiro da mochila e o coloca entre vocês.\n\nRauanny: — Quando eu fico com medo, aperto essa porcaria. Não resolve nada. Mas eu lembro que já fui feliz sem ter controle de tudo.',
 future:'Rauanny: — Guardei o chaveiro. Também guardei a promessa de fazer a viagem de verdade, só que com passagem e dinheiro dessa vez.'},
 ryan:{other:'breno',title:'O filme ruim de domingo',
 memory:'Ryan relembra um domingo em que arrastou todo mundo para assistir a um filme tão ruim que metade do grupo começou a comentar as cenas em voz alta. Breno foi o único que ficou até o final sem reclamar.\n\nRyan: — O Breno falou que gostou da fotografia. DA FOTOGRAFIA! O roteiro parecia feito por um cachorro pisando no teclado.\n\nA piada termina numa pausa que ele não costuma deixar acontecer.',
 heart:'Ryan: — Eu fico fazendo graça porque ninguém sabe o que fazer quando eu paro. Tem dia que eu só queria que alguém perguntasse se eu tô bem e aguentasse ouvir um não.',
 light:'Ryan: — Se a gente sobreviver a essa história, eu exijo uma sessão de cinema. Mas sem deixar o Breno escolher filme, por favor.',
 echo:'Ryan abre a lista de filmes favoritos no celular. Aquele filme horroroso continua marcado com cinco estrelas.\n\nRyan: — Foi de propósito. Não dei nota pro filme. Dei nota pro dia.',
 future:'Ryan: — Fui ao cinema sozinho pela primeira vez. No começo fiquei mal, depois percebi que também posso construir umas memórias novas.'},
 breno:{other:'ryan',title:'O portão depois da chuva',
 memory:'Breno recorda uma tarde em que ficou esperando o grupo diante do portão da escola. Chovia forte, o pessoal se atrasou e ele pensou em ir embora. Ryan apareceu com dois guarda-chuvas pequenos demais.\n\nBreno: — Ele disse que eu tava com cara de personagem triste de filme. Me deu o guarda-chuva inteiro e foi se molhando até a esquina. Nunca falei que aquilo fez diferença.\n\nEle observa a janela, procurando uma maneira menos difícil de continuar.',
 heart:'Breno: — Eu tenho medo de ser a pessoa que todo mundo esquece quando faz planos. E o pior é que às vezes eu me afasto primeiro, só pra não descobrir se esqueceriam mesmo.',
 light:'Breno: — O Ryan chegou ensopado e ainda falou que era estilo. Parecia um pinto molhado, pelo amor de Deus.',
 echo:'Breno dobra a manga e mostra uma pulseira desbotada que ganhou naquele dia.\n\nBreno: — Não tem valor nenhum. Mas eu nunca consegui jogar fora. Não é sobre o objeto.',
 future:'Breno: — Voltei a aceitar convites. Ainda tenho medo de sobrar, mas pelo menos agora eu deixo os outros me provar que querem minha companhia.'}
};
function inScene(s,id,until=10){return exists(s)&&IDS.includes(id)&&!dead(s,id,until);}
function chapterForScene(id){return /^(j_|c152_recall_|c152_reaction_|c152_romance_)/.test(id)?7:/^(k8_|c152_echo_)/.test(id)?8:/^(k9_|c152_ice_|c152_tribute)/.test(id)?9:10;}
function addChoiceOnce(out,text,to){if((out.choices||[]).some(c=>c.to===to))return out;return {...out,choices:[...(out.choices||[]),choice(text,to)]};}
for(const id of IDS){
 addNode('c152_recall_'+id,'CAPÍTULO 07 · A NOITE DOS TRAIDORES','CAFETERIA · UMA LEMBRANÇA ANTES DO MEDO','13:30','town');
 addNode('c152_reaction_'+id,'CAPÍTULO 07 · A NOITE DOS TRAIDORES','CAFETERIA · O QUE FICA','13:33','town');
 addNode('c152_echo_'+id,'CAPÍTULO 08 · ÁGUAS TURVAS','PRAÇA · MEMÓRIAS DE UMA TARDE','14:43','town');
 addNode('c152_ice_'+id,'CAPÍTULO 09 · UM ÚLTIMO JOGO','SORVETERIA · O QUE A GENTE GUARDA','17:36','town');
 addNode('c152_future_'+id,'CAPÍTULO 10 · O GRAND FINALE','REENCONTRO · QUATRO MESES DEPOIS','16:24','house');
}
addNode('c152_tribute','CAPÍTULO 09 · UM ÚLTIMO JOGO','SORVETERIA · UMA CADEIRA VAZIA','17:47','town');
const ROMANCES={
 ryan:{memory:'Ryan passa a colher pelo fundo do prato e olha para você como quem está esperando uma oportunidade de fazer uma piada.\n\nRyan: — Sabe aquele dia que eu te mandei cinco mensagens só pra perguntar se você tinha chegado em casa? Eu escrevi umas dez antes e apaguei.\n\nVocê: — Por quê?\n\nRyan: — Porque eu não queria parecer desesperado. Mas eu tava. Não de medo de você me ignorar... de gostar de alguém de verdade. Isso ainda me dá um puta medo.',light:'Ryan: — Tá, só não fala pra ninguém que eu sou romântico. Minha reputação vai pro lixo.'},
 breno:{memory:'Breno encontra sua mão por baixo da mesa, longe dos olhos dos outros clientes.\n\nBreno: — Eu lembro do dia em que você falou que eu podia ficar perto mesmo sem ter nada interessante pra dizer. Parece uma coisa pequena, né? Só que eu passei muito tempo achando que precisava merecer atenção o tempo todo.\n\nVocê: — Você não precisa provar nada pra estar comigo.\n\nBreno: — Eu tô tentando acreditar nisso.',light:'Breno: — Não estraga meu momento sentimental, tá? Eu levei vinte minutos pra criar coragem de falar.'},
 rauanny:{memory:'Rauanny dá uma risadinha ao lembrar da vez em que você a defendeu durante uma discussão sem importância na festa.\n\nRauanny: — Eu sei que às vezes sou insuportável. Só que quando você ficou do meu lado, eu senti que não precisava brigar com o mundo inteiro sozinha.\n\nVocê: — Você ainda pode brigar comigo, se discordar.\n\nRauanny: — Ah, isso eu vou. Gostar de você não tira meu direito de te achar um idiota de vez em quando.',light:'Rauanny: — Mas não vai se acostumando com elogio. Isso aqui é edição limitada.'},
 rayssa:{memory:'Rayssa gira o guardanapo entre os dedos até a borda se rasgar.\n\nRayssa: — Às vezes, quando eu penso no futuro, fico com medo de que uma coisa que escondi estrague tudo.\n\nVocê: — Então fala comigo antes de guardar isso sozinha.\n\nRayssa: — Eu queria que fosse tão simples.\n\nEla sorri de leve, mas o sorriso dura pouco. Você entende apenas que há alguma coisa que ela ainda não consegue contar.',light:'Rayssa: — Desculpa. Vim jantar e acabei bancando a protagonista de drama. Me dá metade da sobremesa que eu melhoro.'}
};
for(const id of Object.keys(ROMANCES))addNode('c152_romance_'+id,'CAPÍTULO 07 · A NOITE DOS TRAIDORES','RESTAURANTE · UMA COISA DIFÍCIL DE DIZER','19:47','town');

const TRIBUTES={
 allan:'Samuel: — O Allan fazia piada até quando eu tava sendo um escroto. Mas também era o único que me chamava na chincha quando eu passava do ponto.',
 samuel:'Allan: — O Samu achava que podia resolver o mundo com uma planilha. A gente zoava. Agora eu daria tudo por mais uma bronca dele.',
 isabella:'Rayssa: — A Isa sempre fingia que não ligava. Mas era ela quem lembrava do aniversário de todo mundo. Até quando ninguém lembrava do dela.',
 rayssa:'Isabella: — Ela tinha um jeito insuportável de perguntar se eu já tinha comido. Eu reclamava. Hoje eu daria qualquer coisa pra ouvir isso de novo.',
 laisla:'Rauanny: — A Lai implicava com tudo. Mas quando eu tava mal aparecia na minha porta sem nem perguntar se podia entrar.',
 rauanny:'Laisla: — A Rau conseguia me deixar puta em cinco minutos e me fazer rir em seis. Não vou saber viver do mesmo jeito sem isso.',
 ryan:'Breno: — O Ryan era o primeiro a fazer graça quando alguém ficava quieto demais. Eu queria ter dito que aquilo me ajudava.',
 breno:'Ryan: — A gente achava o Breno caladão. Mas foi ele quem mais apareceu nos dias em que ninguém tinha ideia do que dizer.'
};
const ICE={
 allan:'Allan observa um menino derrubar a casquinha no chão.\n\nAllan: — Quando era criança eu fiz exatamente isso e o Samuel comprou outra com o dinheiro que tava guardando pra jogar videogame. Ele disse que tinha encontrado uma promoção. Só descobri a mentira depois.\n\nVocê: — Você já agradeceu?\n\nAllan: — Não do jeito que devia. A gente acha que tem tempo pra falar essas coisas.',
 samuel:'Samuel olha a colher suja de calda e lembra de quando Allan passou uma tarde inteira inventando um troféu de papelão para animar uma prova que ele tinha perdido.\n\nSamuel: — Eu reclamei que era ridículo e guardei numa caixa. Ainda tá lá.\n\nVocê: — Por que nunca contou?\n\nSamuel: — Porque às vezes eu acho mais fácil reclamar do que dizer que gostei.',
 isabella:'Isabella segura o celular na altura da mesa, escondendo a tela.\n\nIsabella: — A Rayssa me mandou uma mensagem uma vez dizendo só «chegou?». Eu tava numa viagem de ônibus, duas horas de atraso. Fiquei brava porque parecia minha mãe. Quando cheguei, ela tava me esperando no ponto com um salgado.\n\nVocê: — Você falou que gostou?\n\nIsabella: — Eu reclamei do salgado frio. Ela entendeu.',
 rayssa:'Rayssa observa as crianças brincando do lado de fora.\n\nRayssa: — A Isa sempre agia como se não ligasse pra aniversário, mas uma vez fez um mural horroroso com fotos nossas e colocou na porta do meu quarto.\n\nVocê: — Horroroso?\n\nRayssa: — Cheio de glitter. Meu travesseiro brilhou por uma semana. Eu adorei. Nunca tive coragem de dizer que chorei olhando aquilo.',
 laisla:'Laisla olha a vitrine de sobremesas e encontra um sabor que costumava dividir com Rauanny.\n\nLaisla: — A gente brigou feio uma vez por causa de um ingresso de show. Ela falou que não queria mais ir. No dia seguinte apareceu com dois bilhetes e disse que tinha comprado sem querer.\n\nVocê: — E você acreditou?\n\nLaisla: — Claro que não. Mas aceitei mesmo assim.',
 rauanny:'Rauanny reclama que o sorvete tá derretendo e, sem querer, sorri.\n\nRauanny: — A Laisla sempre demora pra escolher tudo. Até um sorvete vira um projeto. Uma vez fiquei tão puta que comprei dois sabores pra ela e errei os dois. Ela comeu e disse que tava perfeito.\n\nVocê: — E era?\n\nRauanny: — Era horroroso. Mas a gente riu até doer a barriga.',
 ryan:'Ryan aponta para o cartaz de cinema do outro lado da rua.\n\nRyan: — Teve uma sessão em que o filme travou na melhor parte. Eu comecei a narrar o final inventando na hora. O Breno foi o único que riu e ainda me mandou mensagem dizendo que meu final era melhor.\n\nVocê: — Você acredita nele?\n\nRyan: — Nem fodendo. Mas foi um dia bom.',
 breno:'Breno observa a chuva fina na janela e se lembra de uma tarde em que Ryan devolveu uma jaqueta esquecida sem fazer piada.\n\nBreno: — Ele só falou que eu devia me cuidar melhor. Foi estranho. Eu tava acostumado a ele zoar tudo.\n\nVocê: — E você respondeu?\n\nBreno: — Falei «valeu». Às vezes eu fico pensando que podia ter dito bem mais.'
};
function grief(s,id,until=10){const other=DATA[id].other;const adjective=FEM.has(other)?'dela':'dele';
 return dead(s,other,until)?`\n\n${LABEL[id]} baixa o olhar. ${LABEL[other]} não está mais ali para completar a história.\n\n${LABEL[id]}: — Eu queria conseguir contar essa lembrança para ${adjective==='dela'?'ela':'ele'} mais uma vez. Nem que fosse só pra ouvir ${adjective==='dela'?'ela':'ele'} me mandar calar a boca.`:
 `\n\n${LABEL[id]}: — O engraçado é que ${LABEL[other]} provavelmente contaria tudo diferente e juraria que eu tô exagerando.`;
}
function epilogueRole(s,n){const m=String(n.text).match(/^PONTO DE VISTA:\s*(.+)$/m);if(!m)return null;const t=m[1].trim().toUpperCase();return IDS.find(x=>t===LABEL[x].toUpperCase())||null;}
function modify(id,s,n){if(!exists(s)||!n)return n;let out=n;
 for(const who of IDS){
  if(id==='j_talk_'+who&&inScene(s,who,7)&&!f(s,'cafeteria_'+who))out=addChoiceOnce(out,'Perguntar a '+LABEL[who]+' por uma lembrança boa, de antes das ameaças','c152_recall_'+who);
  if(id==='k8_friend_end_'+who&&inScene(s,who,8)&&!f(s,'praca_'+who))out=addChoiceOnce(out,'Conversar sobre uma lembrança que ainda dá saudade','c152_echo_'+who);
  if(id==='k9_ice_'+who+'_5'&&inScene(s,who,9)&&!f(s,'sorveteria_'+who))out=addChoiceOnce(out,'Antes de sair, compartilhar uma lembrança que ficou','c152_ice_'+who);
  if(id==='c152_recall_'+who&&inScene(s,who,7))out={...n,text:`Você pergunta a ${LABEL[who]} qual lembrança guarda de quando o grupo ainda achava que os problemas iam acabar no fim do dia. ${LABEL[who]} demora antes de responder.\n\n${DATA[who].memory}${grief(s,who,id.startsWith('c152_ice_')?9:7)}\n\nO café esfria enquanto você procura uma maneira de responder que não transforme a saudade em mais uma obrigação.`,choices:[choice('Escutar sem tentar consertar o passado','c152_reaction_'+who,[mark('cafeteria_'+who),mark('tom_'+who,'escuta'),bond(who,5)]),choice('Relembrar a parte engraçada, sem diminuir o que dói','c152_reaction_'+who,[mark('cafeteria_'+who),mark('tom_'+who,'leve'),bond(who,3)])]};
  if(id==='c152_reaction_'+who&&inScene(s,who,7))out={...n,text:`${LABEL[who]} fica em silêncio por alguns instantes.\n\n${s.flags['c152_tom_'+who]==='leve'?DATA[who].light:DATA[who].heart}\n\nVocê: — ${s.hero?.pronouns==='ela'?'Obrigada':s.hero?.pronouns==='elu'?'Obrigade':'Obrigado'} por me contar isso. Eu queria conhecer mais desse lado de você.\n\n${LABEL[who]}: — Então não espera outra tragédia pra perguntar, tá?`,choices:[choice('Retomar a conversa na cafeteria','j_talk_'+who)]};
  if(id==='c152_echo_'+who&&inScene(s,who,8))out={...n,text:`${DATA[who].echo}${grief(s,who,8)}\n\nVocê percebe que aquela lembrança não desaparece só porque a conversa terminou.`,choices:[choice('Contar por que você também guarda memórias pequenas','k8_friend_end_'+who,[mark('praca_'+who),bond(who,4)]),choice('Permanecer em silêncio ao lado de '+LABEL[who],'k8_friend_end_'+who,[mark('praca_'+who),bond(who,2)])]};
  if(id==='c152_ice_'+who&&inScene(s,who,9))out={...n,text:`A conversa estava terminando quando ${LABEL[who]} menciona outra coisa de uma tarde que os dois já tinham quase esquecido.\n\n${ICE[who]}${grief(s,who,9)}\n\n${LABEL[who]}: — Tá vendo? Eu consigo falar de outras coisas além daquela noite. Só preciso lembrar de vez em quando.`,choices:[choice('Guardar esse momento sem apressar a despedida','k9_ice_'+who+'_5',[mark('sorveteria_'+who),bond(who,3)])]};
  if(id==='c152_future_'+who&&inScene(s,who)){
    const hDead=!!s.flags.c10_heroi_morto;
    const companion=IDS.find(x=>x!==who&&!dead(s,x)&& (x!=='rayssa'||s.flags.c10_rayssa_justica==='segredo'));
    const intro=hDead?companion?`${LABEL[companion]} pergunta a ${LABEL[who]} o que aconteceu com aquela pequena parte da vida anterior ao massacre.`:`${LABEL[who]} observa uma fotografia antiga do grupo e pensa em como aqueles dias parecem distantes.`:`Você pergunta a ${LABEL[who]} o que aconteceu com aquela pequena parte da vida anterior ao massacre.`;
    const ending=hDead?companion?`${LABEL[companion]}: — A gente ainda pode criar lembranças novas. Não precisa apagar as antigas.`:`${LABEL[who]} respira fundo e decide continuar contando aquelas histórias, mesmo que agora não tenha ninguém para responder.`:'Você: — Então vamos continuar criando outras. Sem precisar esquecer essas.';
    out={...n,text:`O reencontro segue num ritmo mais leve. ${intro}\n\n${DATA[who].future}${grief(s,who)}\n\n${LABEL[who]}: — Eu sei que não dá pra voltar atrás. Mas eu gosto de ter uma história que não começa com alguém gritando.\n\n${ending}`,choices:[choice('Voltar à conversa com os outros','k10_'+s.flags.c152_reunion_return,[mark('futuro_'+who),bond(who,3)])]};
  }
 }
 for(const [who,rom] of Object.entries(ROMANCES)){
    if(id==='j_date_close_'+who&&s.romanceEscolhido===who&&!dead(s,who,7)&&!f(s,'romance_'+who))out=addChoiceOnce(out,'Pedir a '+LABEL[who]+' que conte uma lembrança que nunca teve coragem de dividir','c152_romance_'+who);
    if(id==='c152_romance_'+who){
      if(s.romanceEscolhido!==who||dead(s,who,7))out={...n,text:'Essa conversa não aconteceu nesta rota.',choices:[choice('Voltar ao jantar','j_date_close_'+who)]};
      else out={...n,text:`A conversa atravessa o prato da sobremesa. ${rom.memory}\n\n${rom.light}\n\nVocês riem, mas continuam segurando a mão um do outro. Não é uma promessa de namoro oficial; é só uma conversa em que ninguém precisa fingir coragem.`,choices:[choice('Agradecer por confiar em você','j_date_close_'+who,[mark('romance_'+who),bond(who,4)]),choice('Responder com carinho e uma provocação leve','j_date_close_'+who,[mark('romance_'+who),bond(who,3)])]};
    }
 }
 if(id==='k9_ice_group'&&!f(s,'tribute')&&IDS.some(x=>dead(s,x,9)))out=addChoiceOnce(out,'Compartilhar uma lembrança de um amigo que morreu','c152_tribute');
 if(id==='c152_tribute'){
  const lost=IDS.find(x=>dead(s,x,9));
  const b=lost?LABEL[lost]:'um amigo';
  const speaker=lost&&DATA[lost]&&DATA[lost].other&&!dead(s,DATA[lost].other,9)?DATA[lost].other:null;
  const voice=speaker?TRIBUTES[lost]:`Você: — ${b} era uma pessoa inteira antes disso tudo. Eu não quero que todo mundo só lembre da última noite.`;
  out={...n,text:`A mesa fica mais quieta quando você menciona ${b}. Ninguém tenta fingir que a cadeira vazia não existe.\n\n${voice}\n\nVocês acabam lembrando de um dia bobo que nunca apareceu nas notícias. Por alguns minutos, o nome de ${b} não pertence ao assassino, mas à amizade que vocês viveram.`,choices:[choice('Voltar à mesa e continuar a tarde','k9_ice_group',[mark('tribute')])]};
 }
 const ep=/^k10_(4[4-9]|5[01])$/.test(id);
 if(ep){const who=epilogueRole(s,n);if(who&&!dead(s,who)&&!f(s,'futuro_'+who)){
   // The destination return point is stored per character when selecting; no save mutation during render.
   out=addChoiceOnce(out,'Relembrar com '+LABEL[who]+' uma coisa que parecia pequena antes do massacre','c152_future_'+who);
   out={...out,choices:out.choices.map(c=>c.to==='c152_future_'+who?{...c,effects:[mark('reunion_return_'+who,id)]}:c)};
 }}
 // Change chapter-specific closing scene only after all other mods; no ghost speakers in the epilogue.
 if(/^c152_/.test(id)&&id!=='c152_tribute'){
  const who=IDS.find(x=>id.endsWith('_'+x));
  if(who&&dead(s,who,chapterForScene(id)))out={...n,text:`${LABEL[who]} não está mais vivo para esta conversa. As lembranças permanecem, mas o encontro não pode acontecer.`,choices:[choice('Voltar à história','k10_52')]};
 }
 if(id.startsWith('c152_future_')){
  const who=id.slice('c152_future_'.length),back=s.flags['c152_reunion_return_'+who];
  if(back&&window.NODES[back])out={...out,choices:[choice('Voltar à confraternização',back,[mark('futuro_'+who),bond(who,3)])]};
 }
 return out;
}
function memories(s){if(!exists(s))return [];const romance=Object.keys(ROMANCES).filter(x=>f(s,'romance_'+x)).map(x=>({id:x,title:LABEL[x]+' · Uma conversa no jantar',detail:'Uma memória íntima compartilhada sem promessas forçadas, que mudou a confiança entre vocês.'}));return romance.concat(IDS.flatMap(id=>{
 const stages=[['cafeteria','Uma conversa na cafeteria'],['praca','Um encontro na praça'],['sorveteria','Uma despedida na sorveteria'],['futuro','Quatro meses depois']];
 return stages.filter(([k])=>f(s,k+'_'+id)).map(([k,title])=>({id,title:`${LABEL[id]} · ${title}`,detail:k==='futuro'?DATA[id].future:k==='cafeteria'?DATA[id].heart:k==='praca'?DATA[id].echo:DATA[id].light}));
 }));}
window.UG152=Object.freeze({resolve:modify,memories});
})();
