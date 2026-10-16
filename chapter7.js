/* O ÚLTIMO GRITO — CAPÍTULO 7: A NOITE DOS TRAIDORES
 * Narrativa em segunda pessoa com perspectiva externa de Moisés.
 * TODAS as mortes dos amigos são opcionais. Moisés é a única fatalidade fixa.
 * Este arquivo não descreve nem expõe a identidade dos responsáveis ao jogador.
 */
(()=>{'use strict';
const T='CAPÍTULO 07 · A NOITE DOS TRAIDORES', nodes=[], known={};
const N=(id,loc,time,scene,text,choices=[])=>{if(known[id])throw Error('Cap7: ID repetido '+id);known[id]=1;nodes.push({id,chapter:T,location:loc,time,scene,text,choices});};
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const F=(key,val=true)=>['flag','c7_'+key,val];
const S=(key,val)=>['set','c7_'+key,val];
const B=(id,n)=>['bond',id,n], Q=id=>['clue',id];
const g=(to,text='Continuar',effects=[])=>C(text,to,effects);
const L={breno:'Breno',samuel:'Samuel',allan:'Allan',ryan:'Ryan',rauanny:'Rauanny',laisla:'Laisla',rayssa:'Rayssa',isabella:'Isabella'};
const ROMANCE_INVITE={
 ryan:'Ryan: — Tá livre hoje à noite? Eu achei um bistrô perto da estação. E antes que pergunte, sim, eu li as avaliações.\n\nVocê: — Você tá me chamando pra jantar?\n\nRyan: — Tô. Sem compromisso de parecer normal, mas com direito a sobremesa. Eu queria ficar um pouco com você.',
 breno:'Breno: — Você consegue sair hoje? Achei um restaurante na praça. É pequeno e a música não é alta.\n\nVocê: — Parece que você pesquisou bastante.\n\nBreno: — Pesquisei. Eu quero conversar sem dez pessoas interrompendo. Se você topar, claro.',
 rayssa:'Rayssa: — Posso fazer um convite meio fora de hora? Queria te levar num restaurante que eu gosto. Só a gente, hoje.\n\nVocê: — Depois dessa madrugada toda?\n\nRayssa: — Justamente. Eu preciso te ver fora daquele hospital, nem que seja por uma hora.',
 rauanny:'Rauanny: — Hoje à noite, você e eu. Pizzaria da avenida. Topa?\n\nVocê: — Isso foi um convite ou uma ordem?\n\nRauanny: — Um convite, seu besta. Só não me faz ficar esperando, porque eu vou comer sua parte.'
};
// Splits explicit speeches and the older narration-embedded '— dialogue — says' form.
function dramaticText(text,id,s){
 let t=String(text||'');
 const love=s?.romanceEscolhido;
 if(id==='j14'){
   t=t.replace(/Antes que consiga responder, chega uma mensagem de quem havia combinado de jantar com você\.[\s\S]*?Uma noite quase normal\. Talvez a última oportunidade de respirar antes de ouvir Moisés\./,
   love&&ROMANCE_INVITE[love]&&!dead(s,love)&&!recentInjury(s,love)?'Antes de responder a Moisés, surge uma notificação de '+L[love]+'. Você abre a conversa.\n\n'+ROMANCE_INVITE[love]+'\n\nA ideia de uma noite com '+L[love]+' faz você sorrir. Ainda há uma mensagem de Moisés para resolver, mas por algumas horas a vida pode ser maior do que a investigação.':
   'Você guarda o telefone. A noite continua, e você pensa em fazer uma refeição tranquila antes de decidir como responder a Moisés.');
 }
 if(id==='j20'){
  t=love&&ROMANCE_INVITE[love]&&!dead(s,love)&&!recentInjury(s,love)?'18h44. Você confere o endereço que '+L[love]+' enviou.\n\n'+L[love]+': — Tá de pé nosso jantar?\n\nVocê: — Tá. Me manda a localização certinha, já tô saindo.\n\nVocê avisa que está a caminho. Entre sirenes distantes e vitrines acesas, pensar em encontrar '+L[love]+' faz você reduzir o passo pela primeira vez hoje.':
  '18h44. Você decide sair para comer alguma coisa e respirar longe das câmeras e das sirenes. O telefone continua no bolso. Moisés ainda espera uma resposta, mas você precisa de alguns minutos sem fugir de nada.';
 }
 const pov=(/^j_m0[1-9]$/.test(id)||id==='j_m_death_show')?'MOISÉS':/^j_npc[123]/.test(id)?'__SIDE__':/^j_(?:h0[1-9]|crisis|route|move|escape|police|after_death|body|evidence|death_gate|m_death_(?:hear|find))/.test(id)?'PROTAGONISTA':null;
 if(pov&&pov!=='__SIDE__')t='PONTO DE VISTA: '+pov+'\n\n'+t;
 // Cada rota deve separar fala, reação e ação. Não basta existir um travessão dentro da narração.
 // O parser de cartões do jogo exige que a fala comece num parágrafo próprio: "Nome: — ...".
 // Tratamos também os blocos mais antigos do jantar, luto e funeral, preservando o dono real da fala.
 const actor=/^j_(?:talk|confide|listen|past|memory|funeral)/.test(id)?Object.keys(L).find(x=>id.endsWith('_'+x)):
 /^j_(?:date_|dinner_)/.test(id)?Object.keys(ROMANCE_INVITE).find(x=>id.endsWith('_'+x)):null;
 if(actor){
  const label=L[actor];
  const looksLikeStage=(fragment)=>/^(?:(?:Ele|Ela|O garçom|A atendente|A voz|Quando|Enquanto|Depois|Antes|Na saída|Ao sair|No corredor|O sorriso)\b|(?:pergunta|perguntou|admite|admitiu|explica|explicou|acrescenta|acrescentou|comenta|comentou|responde|respondeu|diz|disse|ri|riu|sorri|sorriu|suspira|suspirou)\b)/i.test(fragment);
  t=t.split('\n\n').map(para=>{
   const original=para.trim();
   if(!original||/^([A-Za-zÀ-ÿ ]{2,40}|Você):\s*—/.test(original))return para;
   if(!/\s+—\s+/.test(original))return para; // travessão explicativo não é uma fala
   const fragments=original.split(/\s+—\s+/);
   const stage=fragments.shift().trim();
   // "precisa de alguém — para ouvir" não é diálogo. Uma fala ocorre quando o trecho
   // introdutório narra uma ação concreta de quem está conversando.
   if(!new RegExp('(?:^|\\b)'+label+'\\b').test(stage)&&!/(?:^|\b)(?:Ele|Ela|Na saída|Ao sair)\b/.test(stage))return para;
   const sections=[stage];
   for(const fragmentRaw of fragments){
    const fragment=fragmentRaw.trim();if(!fragment)continue;
    if(looksLikeStage(fragment)){
     // Quando já existe cartão com nome, "pergunta."/"acrescenta." sozinhos são redundantes.
     if(/^(?:pergunta|perguntou|explica|explicou|acrescenta|acrescentou|comenta|comentou|diz|disse)[.!?]$/i.test(fragment))continue;
     // Preservar ações físicas que realmente acrescentem algo à cena.
     if(/^admite, desviando os olhos para o cardápio[.!?]$/i.test(fragment)){sections.push(label+' desvia os olhos para o cardápio.');continue;}
     if(/^(?:pergunta|perguntou|admite|admitiu|explica|explicou|acrescenta|acrescentou|comenta|comentou|responde|respondeu|diz|disse)\b/i.test(fragment))sections.push(label+' '+fragment);
     else sections.push(fragment);
    }else sections.push(label+': — '+fragment);
   }
   return sections.join('\n\n');
  }).join('\n\n');
 }
 // Algumas falas da oficina têm interlocutores anônimos por intenção do roteiro;
 // ainda assim, o leitor deve distinguir fala de movimento, sem atribuir um nome falso.
 if(id==='j_h01')t=t.replace('— Faz tempo que ninguém trabalha lá depois das dez. Se for encontrar alguém, não demore.',
 '\n\nGuarda de trânsito: — Faz tempo que ninguém trabalha lá depois das dez. Se for encontrar alguém, não demore.');
 if(id==='j_crisis1_help')t=t.replace('— NÃO PARA! — alguém grita.',
 'Uma voz ecoa no corredor.\n\nVoz no corredor: — NÃO PARA!');
 return t;
}

const dead=(s,id)=>!!s?.flags?.['c7_morto_'+id]||!!s?.flags?.['c6_morto_'+id]||(id==='allan'&&!!s?.flags?.allan_morto_c4);
const recentInjury=(s,id)=>!!s?.flags?.['c7_ferido_'+id]||!!s?.flags?.['c6_ferida_'+id]||(window.UGConsequences?.injury?.(s,id)?.severity||0)>=2;
const trust=(s,id)=>window.UG107?.pairTrust?.(s,'hero',id)??50;
const party=s=>Object.keys(L).filter(id=>s?.flags?.['c7_inv_'+id]&&!dead(s,id));
const use=(s,k)=>!!window.UG107?.item?.(s,k);
const allowed=s=>Object.keys(L).filter(id=>!dead(s,id));
const choices=()=>{};

// ATO I — PRIMEIRA MANHÃ. Os amigos não aparecem vivos se morreram nos capítulos anteriores.
N('j01','HOSPITAL DE LAKEWOOD · SALA DE ESPERA','09:08','town',`O sol alcança as janelas do hospital sem conseguir aquecer a sala de espera. Um rapaz de uniforme azul troca o saco de lixo ao lado dos bancos. A televisão exibe imagens tremidas do condomínio de Laisla: a escada entre os dois blocos, a polícia entrando pela portaria, moradores observando das sacadas.

Você passou a madrugada respondendo perguntas, tentando dormir e conferindo notificações. O susto já não é exatamente o mesmo; transformou-se numa exaustão que pesa atrás dos olhos. As pessoas perguntam como você está, e nenhuma resposta cabe na palavra «bem».

A equipe médica pediu que ninguém saísse sem receber orientações sobre os ferimentos. Os amigos que sobreviveram estão espalhados entre a sala de observação, cadeiras do corredor e casas onde conseguiram descansar. Algumas cadeiras permanecem vazias, e ninguém encontra uma forma fácil de falar sobre as pessoas que foram perdidas.

Uma enfermeira entrega um copo de água e diz seu nome, devagar, como se pudesse impedir que você se perdesse naquele dia.

Enfermeira: — Não precisa contar a história toda outra vez agora. Bebe um pouco. Depois a assistente social vai conversar com vocês.

Você aceita. No fundo do corredor, alguém deixa cair uma bandeja. O ruído faz seu corpo reagir antes que a cabeça entenda: não é uma faca, não é a porta do apartamento, não é a escada cedendo.

Só uma bandeja. Mesmo assim, demora para você respirar normalmente.`,[
 C('Procurar notícias dos amigos e dos feridos','j02',[['trait','empatia',1]]),
 C('Perguntar se a polícia descobriu alguma coisa','j02',[['trait','cautela',1]]),
 C('Tentar se recompor antes de enfrentar o corredor','j02',[['trait','coragem',1]])]);
N('j02','HOSPITAL · CORREDOR DE OBSERVAÇÃO','09:19','town',`O corredor cheira a antisséptico e café velho. Uma funcionária recolhe os cobertores emprestados na madrugada. Ao lado da máquina de água, você vê um quadro de horários e entende que mal se passaram algumas horas desde o ataque.

Breno enviou uma mensagem perguntando se você conseguiu descansar. Samuel escreveu e apagou alguma coisa no grupo, várias vezes. Alguns amigos ainda não responderam. Em vez de insistir, você abre as mensagens que já existem e anota quem precisa de companhia.

Uma policial se aproxima e confirma que a investigação no condomínio ainda está em andamento. A máscara não foi encontrada. Há marcas de arrombamento, gravações incompletas e relatos que não batem em vários detalhes. Ela não acusa ninguém, mas pede que você guarde os arquivos recebidos durante o ataque.

Policial: — Lembrar de uma coisa diferente não significa, por si só, que alguém esteja mentindo. Vocês passaram por uma situação extrema. Só não apaguem mensagens nem alterem horários.

Você pensa na fotografia tirada de dentro do apartamento. Se o mascarado conseguia chegar tão perto de todos, talvez o perigo não esteja restrito às ruas vazias. E se alguém soube do jantar antes mesmo de Laisla convidar o grupo?

O telefone vibra mais uma vez. É Bella Gomes, perguntando se alguém consegue encontrá-la mais tarde. Ela diz ter conseguido um acesso legal a fotografias antigas da propriedade e quer compará-las às informações que vocês receberam.

Você olha para o relógio e percebe que ainda terá um dia inteiro pela frente.`,[g('j03','Guardar o telefone e sair do hospital')]);
N('j03','CAFETERIA DO CENTRO · INÍCIO DA TARDE','13:10','town',`Você escolhe uma mesa perto da janela. Lá fora, o centro de Lakewood continua funcionando como se o mundo não tivesse sido interrompido. A atendente passa pano nas mesas; um casal discute o preço de uma passagem; alguém ri do lado de fora. A normalidade soa quase ofensiva.

Você não precisa de outra investigação neste instante. Precisa falar com alguém que conheça seu rosto de antes das sirenes e da máscara. Não para encontrar respostas — para lembrar que ainda existe uma pessoa sob a culpa e o medo.

No grupo, os amigos conversam aos poucos sobre quem saiu do hospital e quem precisa ficar em observação. Alguns estão indisponíveis, outros disseram que conseguiriam conversar sem forçar o assunto. Você decide escolher alguém para sentar à mesa.

O que vai ser dito ali não precisa chegar ao restante dos amigos. Pode continuar sendo uma lembrança dos dois.`,[]);

const INTRO={
 ryan:`Ryan chega com o casaco sobre o braço e uma expressão cansada. Olha o cardápio sem realmente ler.

Ryan: — Falar de quê? Do tempo? Das nove maneiras que eu achei que ia morrer?

Ele tenta sorrir, mas a brincadeira não chega aos olhos. Vira o celular para baixo sobre a mesa.

Ryan: — Tá, desculpa. Eu fico idiota quando tô com medo. Pode falar. Eu tô aqui.`,
 breno:`Breno chega antes do horário e ocupa a cadeira de costas para a parede. Traz dois cafés e empurra um na sua direção.

Breno: — Eu queria perguntar se você dormiu.

Ele observa as próprias mãos, envergonhado.

Breno: — Só que isso soa ridículo depois de ontem. A gente pode ficar sentado, se for melhor. Não precisa preencher o silêncio comigo.`,
 rayssa:`Rayssa tenta sorrir ao ver você, mas a expressão não dura. Pergunta se quer algo para comer, depois puxa a cadeira.

Rayssa: — Passei a noite pensando no que eu devia ter feito diferente.

Ela roda a colher dentro da xícara vazia.

Rayssa: — Aí me dei conta de que faz um ano que eu penso nisso. Se quiser, a gente fala de outra coisa. Ou de tudo.`,
 rauanny:`Rauanny se senta com cuidado. Você olha para o curativo que aparece por baixo da manga e pergunta se ela está sentindo dor.

Rauanny: — Um pouquinho. Eu não sou de vidro.

A resposta sai depressa demais. Ela percebe e abaixa os olhos.

Rauanny: — Foi mal. Ontem eu vi como é horrível depender das pessoas. Eu quase prefiro sentir dor a pedir ajuda.`,
 laisla:`Laisla coloca a bolsa ao lado da cadeira, como se ainda estivesse arrumando a mesa do apartamento. Demora para pedir uma bebida.

Laisla: — Eu fico lembrando da comida que eu tinha preparado.

Ela ri sem vontade, esfregando a borda do guardanapo.

Laisla: — Olha que merda de coisa pra pensar. Eu só queria uma noite boa pra todo mundo. Uma noite comum. E agora aquele lugar parece outra vida.`,
 isabella:`Isabella chega com uma pasta de papéis do hospital e a deposita sobre a mesa.

Isabella: — Antes que pergunte: sim, eu comi; não, não dormi; e sim, tô tentando marcar o retorno.

Ela suspira, como se o ar tivesse ficado preso desde a madrugada.

Isabella: — Pronto. Terminei de tentar controlar tudo. Você me chamou pra conversar. Sobre o quê? Pode começar pelo que não quer contar pra ninguém.`,
 allan:`Allan se aproxima exagerando uma reverência. O gesto termina com uma careta quando o braço machucado reclama.

Allan: — Tá vendo? Meu talento pra drama agora tem efeitos especiais.

Ele se senta sem fazer a habitual segunda piada.

Allan: — Brincadeira. Eu vim porque você pediu. E porque ficar sozinho com meus pensamentos ontem foi uma péssima ideia.`,
 samuel:`Samuel chega com olheiras profundas e a chave do carro presa ao dedo. Senta sem tirar a jaqueta.

Samuel: — Eu sabia que você ia querer conversar.

Ele encara o fundo do copo.

Samuel: — Só não sabia se ia conseguir ouvir. Toda vez que alguém fala de culpa, penso na van. E quando penso na van, volto pra estrada. Pode falar. Tô tentando não fugir de tudo.`
};
const FUNERAL={
 ryan:'Ryan pensa por um tempo e diz que gostaria de uma reunião com músicas ruins que ele adora, fotos em que aparece fazendo caretas e amigos que continuassem contando suas piadas, mesmo as que nunca tiveram graça.',
 breno:'Breno prefere imaginar uma despedida quase sem cerimônia, num jardim ou numa pequena biblioteca. — Eu só queria que as pessoas dissessem o que realmente sentem. O resto é decoração.',
 rayssa:'Rayssa fala de um jardim cheio de flores, de cartas escritas à mão e de um dia em que as pessoas pudessem dizer também as coisas que nunca tiveram coragem de contar.',
 rauanny:'Rauanny faz uma careta ao imaginar discursos longos. — No meu, ninguém vai me chamar de anjinho. Quero uma música alta e gente lembrando que eu dava trabalho mesmo.',
 laisla:'Laisla imagina uma mesa cheia de pratos feitos por amigos, fotos antigas e as histórias que ela não conseguiu contar. — Melhor se todo mundo se alimentar. Eu odeio gente chorando sem comer.',
 isabella:'Isabella responde que não gostaria de uma fila de pessoas fingindo que a conheciam. Prefere poucos amigos e lembranças sinceras, até as que não fazem todo mundo parecer perfeito.',
 allan:'Allan faz uma descrição absurda de um funeral com luzes de palco e um microfone aberto para qualquer amigo contar uma história vergonhosa. Depois admite baixinho que queria, sobretudo, que Samuel estivesse lá.',
 samuel:'Samuel demora a responder. Diz que talvez quisesse um lugar silencioso, sem espetáculo, onde alguém pudesse ouvir o barulho do vento. — Eu não quero que me perdoem só porque eu morri — acrescenta.'
};
const SOUL={
 ryan:`Ryan: — Eu aprendi a fazer graça antes de aprender a pedir socorro. Se todo mundo ri, ninguém pergunta o que tá acontecendo de verdade. Só que na janela do condomínio eu vi gente gritando meu nome e percebi que uma piada não segurava a escada. Achei que vocês iam me odiar se eu não conseguisse. Você sabe como é? Ser o cara que mantém o clima leve e, de repente, não saber mais como fazer isso?`,
 breno:`Breno: — Eu sempre gostei de observar antes de entrar numa conversa. Na escola me chamavam de esquisito, mas eu só precisava entender se tinha espaço pra mim. Você foi uma das primeiras pessoas que não fez eu me sentir uma visita. E agora eu fico pensando no quanto eu demoro pra agir. Às vezes vejo algo estranho, fico conferindo se não tô exagerando, e quando decido falar pode ser tarde.`,
 rayssa:`Rayssa: — Eu tenho medo de me tornar uma pessoa que só sabe pedir desculpas. Tem coisas que eu queria apagar e não consigo. E mesmo quando alguém me perdoa, continuo lembrando do rosto de quem magoei.

Rayssa respira fundo e aperta as mãos sob a mesa.

Rayssa: — Eu não tô pedindo pra você resolver isso. Queria só que soubesse que às vezes o silêncio não é indiferença. Às vezes é a vergonha de não saber por onde começar.`,
 rauanny:`Rauanny: — A Laisla sempre dizia que eu puxava briga até com cadeira fora do lugar. Eu achava engraçado. Ela me conhece quando eu tô sendo insuportável, quando tô triste e quando eu queria sumir. Aí vem um cara de máscara e eu percebo que posso perder essa pessoa num segundo. Não me pede pra ser calma o tempo inteiro. Eu ainda tô aprendendo a ter medo sem transformar isso em raiva.`,
 laisla:`Laisla: — Todo mundo acha que eu sou a pessoa que junta a galera. Marca horário, lembra aniversário, pergunta se comeu. Eu gosto disso. Só que ontem fui eu que chamei todo mundo pra minha casa. Fico tentando encontrar um jeito de não me sentir responsável.

Laisla aperta o guardanapo.

Laisla: — Eu não queria ter convidado ninguém pra uma armadilha. Eu queria que a gente lembrasse daquela noite como a última vez que riu junto.`,
 isabella:`Isabella: — Na minha cabeça tudo tem uma lista. Se conferir os horários, se guardar as provas, se organizar a fuga, então ninguém morre. É idiota, eu sei. As pessoas não são uma planilha. Só que quando eu paro de resolver alguma coisa, começo a pensar no que eu não consegui impedir.

Isabella olha pela janela.

Isabella: — Tenho pavor de fazer uma escolha e alguém pagar por ela.`,
 allan:`Allan: — Eu ficava imaginando que, quando a gente saísse da faculdade, ia ter foto de formatura, apartamento apertado, festa ruim e conta pra pagar. O Samu ia continuar me ligando pra reclamar de qualquer coisa. Eu ia reclamar dele de volta.

O sorriso de Allan desaparece.

Allan: — Aí eu fiquei preso naquele arquivo. Por um momento achei que ia morrer sem ter vivido metade das coisas que vivia adiando.`,
 samuel:`Samuel: — Você sabe que eu lembro do impacto toda vez que fecho os olhos, né? Não tem noite que eu não volte pra estrada. Tem hora que eu imagino como teria sido se eu tivesse freado um segundo antes. Ou ligado pra ambulância. Ou dito não quando começaram a falar do lago. A pior parte é que eu continuo vivo. E não sei como viver sem fingir que não aconteceu.`
};
const LOSS={
 rauanny:{lost:'laisla',text:`Rauanny puxa o ar e sua voz falha. — Eu ia mandar uma mensagem pra ela hoje de manhã. Peguei o celular por reflexo. Aí lembrei. — Ela aperta a borda da mesa. — Não me diz que vai ficar tudo bem. Só senta aqui comigo um pouco.`},
 laisla:{lost:'rauanny',text:`Laisla esfrega as mãos, tentando controlar o choro. — Eu sempre achei que ia ficar velha implicando com ela. Pensei em ligar umas vinte vezes hoje. Aí lembro que não tem mais ninguém pra atender. — Ela olha para a cadeira vazia. — Posso ficar quieta um pouquinho?`},
 rayssa:{lost:'isabella',text:`Rayssa olha para a xícara intacta. — A Isa guardava um monte de bilhetes bobos meus. Eu só queria saber se ela achou que eu ia estar lá quando precisasse. — A voz quebra. — Eu não sei o que fazer com o resto da minha vida sem ela.`},
 samuel:{lost:'allan',text:`Samuel engole em seco. — O Allan ia me zoar por estar aqui fazendo essa cara. Ia dizer pra eu pedir um bolo, sei lá. — Ele tenta rir. — Eu devia ter conseguido proteger ele. E agora toda vez que alguém ri parecido eu viro a cabeça.`},
 allan:{lost:'samuel',text:''}
};
for(const id of Object.keys(INTRO)){
 N('j_talk_'+id,'CAFETERIA · CONVERSA COM '+L[id].toUpperCase(),'13:24','town',`Você ergue a mão quando ${L[id]} se aproxima da mesa.\n\n${INTRO[id]}\n\nDurante alguns segundos, você e ${L[id]} observam as pessoas passando pela calçada. O intervalo sem sirenes parece raro demais para ser desperdiçado.\n\n${SOUL[id]}\n\nVocê não oferece uma solução imediata. Há coisas que precisam ser ouvidas antes de serem resolvidas.`,[
 C('Contar o que mais tem assustado você','j_confide_'+id,[B(id,4),['trait','empatia',2]]),
 C(`Perguntar o que faria ${L[id]} se sentir melhor agora`,'j_listen_'+id,[B(id,5),['trait','empatia',2]])]);
 N('j_confide_'+id,'CAFETERIA · SEM MÁSCARAS','13:37','town',`Você admite que sente medo até quando o telefone vibra. Conta que ficou olhando para as próprias mãos no hospital e não conseguia acreditar que elas tinham conseguido segurar alguém durante a fuga.\n\n${L[id]} não interrompe. A conversa perde a pressa. Você percebe que há várias maneiras de ficar em silêncio: sozinho, como quem não consegue pedir ajuda, e acompanhado, como quem finalmente não precisa se explicar.\n\nVocê: — Eu tenho medo de morrer antes de fazer tudo que eu queria. Não é só o que aconteceu. É tudo o que ainda não aconteceu.\n\n${SOUL[id]}\n\n${L[id]} segura a xícara por um momento. Não promete que ninguém vai morrer. Apenas continua ali, ouvindo.`,[g('j_past_'+id,'Continuar a conversa sem fugir do assunto')]);
 N('j_listen_'+id,'CAFETERIA · PALAVRAS DIFÍCEIS','13:37','town',`Você deixa o próprio medo para depois e pergunta o que ${L[id]} gostaria de conseguir fazer quando tudo isso acabar. A pergunta é simples, mas a resposta demora.\n\n${SOUL[id]}\n\nVocê: — Eu queria que a gente tivesse tempo de descobrir isso sem viver contando os dias.\n\nHá uma pausa. Vocês se lembram de uma tarde comum antes da festa de Jullia, quando a maior preocupação era conseguir chegar no horário ao cinema ou decidir onde comer. Não existe maneira de voltar àquela tarde, mas as lembranças ainda pertencem a vocês.\n\n${L[id]}: — Obrigado por perguntar de verdade.\n\nVocê percebe que essa conversa ficará entre os dois, a menos que um deles escolha partilhá-la mais tarde.`,[g('j_past_'+id,'Falar de sonhos, futuro e arrependimentos')]);
 N('j_past_'+id,'CAFETERIA · O FUTURO QUE FALTA','13:48','town',`O café já esfriou. Pela primeira vez desde a noite anterior, o assunto não é somente a pessoa de máscara. ${L[id]} pergunta o que você faria se pudesse se mudar de Lakewood amanhã, sem levar a culpa na bagagem.\n\nVocê pensa em quantas versões de uma vida existem antes de alguém escolher uma. Pode ser uma carreira artística, uma família que aceite quem você é, uma profissão comum, uma cidade diferente ou simplesmente acordar sem medo.\n\n${L[id]}: — Não precisa me contar a versão bonita. Pode falar a que parece impossível.\n\nO silêncio dá espaço a uma resposta que você guardava há muito tempo.`,[
 C('Contar sobre o sonho de criar arte e ser reconhecido por isso','j_memory_'+id,[S('sonho_hero','arte'),B(id,3)]),
 C('Falar sobre conflitos familiares e a vontade de ser aceito como é','j_memory_'+id,[S('sonho_hero','aceitacao'),B(id,5)]),
 C('Admitir que só deseja uma vida tranquila, cercada de quem ama','j_memory_'+id,[S('sonho_hero','paz'),B(id,3)]),
 C('Dizer que ainda não sabe o que quer, apenas deseja viver para descobrir','j_memory_'+id,[S('sonho_hero','descoberta'),B(id,3)])]);
 N('j_memory_'+id,'CAFETERIA · UMA CONFIDÊNCIA','14:02','town',`A resposta sai mais devagar do que você esperava. Não parece um discurso ensaiado; existem frases que você interrompe para encontrar a palavra certa e outras que quase não consegue pronunciar.\n\n${L[id]} não tenta transformar a conversa numa lição de vida. Escuta sem medir seus sonhos, sem exigir que você saiba exatamente o que deseja.\n\nDo lado de fora, a chuva começa a marcar pequenos pontos no vidro. Você acompanha as gotas escorrendo até a moldura da janela.\n\nVocê: — Tem uma coisa horrível que eu fiquei pensando ontem. Se tudo isso acabar comigo, eu vou deixar tanta coisa inacabada.\n\n${L[id]} ergue o olhar.\n\n${L[id]}: — Então me fala uma coisa que você gostaria que alguém lembrasse de você. Uma coisa sua. Não da festa. Não da estrada. Sua.\n\nA pergunta parece grande demais. Mesmo assim, vocês ficam ali esperando que alguma resposta apareça.`,[g('j_funeral_'+id,'Responder e falar do futuro')]);
 N('j_funeral_'+id,'CAFETERIA · PROMESSAS E FUNERAIS','14:10','town',`Você acaba rindo de nervoso.\n\nVocê: — Tá querendo escrever meu obituário?\n\n${L[id]} também ri, baixinho.\n\n${L[id]}: — Desculpa. Foi mórbido. Mas depois do que aconteceu... sei lá. Eu pensei na morte mais do que queria.\n\nA conversa deriva para um assunto absurdo: como seriam os funerais que vocês escolheriam se pudessem planejar tudo? A ideia começa desconfortável, quase ofensiva, até se transformar num jeito inesperado de falar sobre o que os dois consideram bonito.\n\nVocê pensa num lugar de despedida que tenha algum sentido para a sua história, e não para o segredo da estrada. Talvez as estrelas, talvez música alta, talvez poucas pessoas reunidas em silêncio. O que importa é poder escolher a lembrança que deixaria.\n\n${FUNERAL[id]}\n\nA conversa atravessa um sorriso desconfortável.\n\n${L[id]}: — Eu espero que a gente só precise decidir isso daqui a muito, muito tempo.\n\nVocê: — Eu também.\n\nO último gole de café está frio. Lá fora, a chuva já diminuiu.`,[
 C('Imaginar velas no alto de um prédio, olhando a cidade e as estrelas','j_funeral_choice_'+id,[S('funeral_hero','estrelas')]),
 C('Imaginar música, fotos antigas e histórias engraçadas','j_funeral_choice_'+id,[S('funeral_hero','musica')]),
 C('Preferir uma despedida discreta, somente com quem ama você','j_funeral_choice_'+id,[S('funeral_hero','intimidade')])]);
 N('j_funeral_choice_'+id,'CAFETERIA · UMA PROMESSA','14:16','town',`Você explica como gostaria que as pessoas se lembrassem de sua vida. Não como alguém que foi atacado ou que participou de um pacto horrível, mas como alguém que amou, sonhou e tentou fazer algo com os próprios dias.\n\n${L[id]} escuta com atenção.\n\n${L[id]}: — Quer que eu guarde essa ideia? Não como uma despedida. Como um jeito de lembrar o que você quer viver.\n\nVocê sente o peso da promessa. Não sabe se terá coragem de pedir isso, mas sabe que a resposta ficará entre vocês.`,[
 C('Pedir que guardem essa conversa só entre vocês','j_talk_end_'+id,[F('confidencia_guardada'),B(id,4)]),
 C('Pedir que essa pessoa lembre do seu sonho, aconteça o que acontecer','j_talk_end_'+id,[F('promessa_sonho'),B(id,5)])]);
 N('j_talk_end_'+id,'CAFETERIA · DESPEDIDA','14:21','town',`Quando vocês se levantam, a tarde já avançou. ${L[id]} espera você guardar o celular antes de sair da mesa. A conversa não resolveu o caso; tampouco desfez o medo. Mas, pela primeira vez, o silêncio entre vocês não parece ser uma ameaça.\n\nPerto da porta, vocês se abraçam. É um gesto simples, demorado o bastante para lembrar que ambos ainda estão vivos.\n\n${L[id]}: — Amigos até a morte?\n\nVocê pensa em responder com uma brincadeira, mas aperta o abraço.\n\nVocê: — Amigos enquanto a gente puder escolher. E, se depender de mim, por muito tempo.\n\nA rua continua molhada, o trânsito continua barulhento, e Lakewood continua tendo um assassino à solta. Ainda assim, por alguns minutos, você não se sentiu sozinho.\n\nAo alcançar a esquina, encontra uma notificação de Bella perguntando se você pode comparecer à biblioteca municipal. Há informações sobre a propriedade que ela quer mostrar pessoalmente.`,[g('j10','Ir ao encontro de Bella')]);
}
// ATO II — BELLA: sem onisciência, sem mentiras retroativas sobre a mata.
N('j10','BIBLIOTECA MUNICIPAL · SALA DE CONSULTA','15:08','town',`Bella está numa mesa de canto, cercada por envelopes e uma pasta plástica transparente. Os cachos longos estão presos por uma presilha; ela veste camiseta larga, calça baggy e tênis de sola gasta. Não se levanta para cumprimentar você. Apenas empurra uma cadeira com o pé.

Bella: — Antes que você pergunte, não roubei nada. Minha mãe liberou cópias das imagens de serviço que ainda estão na investigação. Tirei fotos do que podia ver. O resto tá lacrado.

Você observa uma planta da propriedade Gomes. A trilha pela mata aparece marcada com uma linha fina. Há uma guarita lateral perto da entrada de serviços — a mesma região de onde poderia ter sido fotografada a van.

Bella: — No dia que minha irmã desapareceu, eu fui atrás dela pela mata. Eu já te contei. Perdi ela antes da estrada. Não vi carro nenhum. Só que ontem eu reparei numa coisa: alguém acessou o corredor de manutenção pouco depois da festa. O livro de entrada tem uma assinatura ilegível.

Você: — Isso não prova quem estava lá.

Bella: — Obrigada. Finalmente uma frase inteligente. Não prova mesmo. Mas explica como uma pessoa podia circular por trás do terreno sem passar pela varanda onde tava todo mundo.

Ela mostra uma foto da fechadura do depósito e um registro de troca de credenciais. O detalhe azul lembra o crachá visto anteriormente, mas o modelo era usado por vários funcionários e terceirizados.

Bella: — Eu não vou acusar ninguém porque a cor de uma porcaria de plástico combina com uma foto. Quero saber quem tinha acesso de verdade.

Você se inclina sobre os papéis. Bella espera, braços cruzados, para descobrir se vai ouvir a verdade ou outra resposta conveniente.`,[
 C('Mostrar a Bella as pistas sobre os acessos de serviço','j11a',[Q('c7_livro_servico'),B('isabella',1)]),
 C('Perguntar se Moisés conhecia aquela passagem','j11b',[Q('c7_moises_conhecia_passagem')]),
 C('Questionar por que Bella guardou tudo isso por tanto tempo','j11c',[F('bella_cobrou'),['trait','cautela',1]])]);
N('j11a','BIBLIOTECA · MAPA DE SERVIÇO','15:18','town',`Você compara as datas das imagens com o que tem salvo no celular. O registro não identifica uma pessoa específica, mas delimita um horário em que a passagem poderia ter sido utilizada sem ser vista pela festa.

Bella aproxima a cadeira.

Bella: — Tá. Isso ajuda. Só que eu já ouvi tanta teoria de gente querendo ser detetive que agora eu preciso separar o que alguém viu daquilo que a gente só acha.

Você mostra o detalhe do crachá e o enquadramento da fotografia da van. Bella observa os dois objetos durante mais tempo do que o esperado, depois tira uma foto da comparação — não do seu celular inteiro.

Bella: — Se esse ângulo for da guarita, alguém podia ter registrado o carro. Mas a câmera do livro não aponta pra estrada. Teria que existir outro equipamento. Ou alguém com telefone.

Você: — Então a foto não prova que a pessoa que estava ali é o assassino.

Bella: — Exatamente. E quem tentar vender isso como prova definitiva tá querendo uma resposta fácil.

Ela anota a dúvida numa folha. Ao devolver o celular, sua voz suaviza por um instante.

Bella: — Obrigada por não tentar me convencer de uma coisa que você não sabe.`,[g('j12','Examinar a segunda pasta')]);
N('j11b','BIBLIOTECA · O NOME DE MOISÉS','15:18','town',`Bella não parece surpresa ao ouvir o nome do ex-namorado da irmã.

Bella: — Ele conhecia aquela casa de olhos fechados. Passava mais tempo lá do que muita gente da família. E, depois que Jullia sumiu, começou a aparecer em horários estranhos, sempre dizendo que precisava buscar alguma coisa.

Você: — Você viu isso?

Bella: — Vi duas vezes. O resto foi porteiro me contando. E não, eu não sei o que ele pegou. O pessoal ficou morrendo de pena dele porque a namorada desapareceu, mas ele não teve coragem nem de me olhar nos olhos durante meses.

Ela abaixa a voz.

Bella: — Eu queria odiar o Moisés. Seria mais fácil. Só que ele parece uma pessoa carregando alguma coisa que tá esmagando ele por dentro. É esse o problema. Eu não sei se é culpa, medo ou só covardia.

O comentário faz você se lembrar do aviso enigmático que ele deu após o ataque ao apartamento. Talvez exista uma conversa que nunca chegou a terminar.

Bella fecha a pasta e suspira.

Bella: — Se ele falar com você, por favor, me conta pelo menos que ele tá vivo e onde pode ser encontrado. Não preciso da senha do celular dele. Preciso de respostas sobre a minha irmã.`,[g('j12','Continuar verificando os arquivos')]);
N('j11c','BIBLIOTECA · UMA PERGUNTA DESCONFORTÁVEL','15:18','town',`Bella mantém o olhar firme quando você pergunta por que não mostrou os documentos antes.

Bella: — Porque eu não tinha os documentos antes. E porque eu não devia explicação pra ninguém sobre o dia em que consegui entrar no quarto da minha irmã sem começar a chorar. Isso responde?

Você demora a falar.

Bella: — Foi mal. Eu sei que tá todo mundo assustado. Só que vocês têm a mania de perguntar como se eu fosse a peça que falta no quebra-cabeça. Eu era a irmã dela. Eu vi Jullia correndo, tentei acompanhar e falhei. Desde então tem gente na cidade me tratando como testemunha, suspeita e coitada no mesmo dia.

Você: — Não quis dizer que você escondeu de propósito.

Bella respira mais devagar.

Bella: — Então pede desculpa pelo que perguntou, não pelo que você acha que eu entendi. Aí a gente continua.

Você pede desculpa, sem tentar se justificar. Bella aceita com um gesto curto e volta ao mapa. O encontro continua, mas nenhuma confiança nasce de uma frase bonita.`,[g('j12','Ouvir o que Bella realmente descobriu')]);
N('j12','BIBLIOTECA · O QUE NÃO APARECE NA FOTO','15:27','town',`Entre as cópias, há um recibo de manutenção feito meses depois do desaparecimento. A empresa substituiu uma câmera próxima ao depósito e constatou falha no armazenamento antigo. O documento não é uma fotografia do criminoso; é a confirmação de que os arquivos da propriedade passaram por mais de uma mão.

Bella: — Se alguém tivesse acesso ao servidor ou às chaves, podia guardar uma cópia antes da troca. Minha mãe nunca soube direito quem administrava aquilo. Era funcionário, empresa, segurança contratado... um monte de gente.

Você pensa nas imagens anônimas enviadas ao grupo. A origem possível está ali, mas ainda falta a pessoa que transformou arquivos antigos em ameaças recentes.

Bella: — Outra coisa. O Moisés comprou um monte de coisas na época. Minha mãe comentou que ele andava fazendo viagens curtas sem contar pra ninguém. Não sei se tem relação. Talvez tivesse ajudando alguém. Talvez só não conseguisse ficar na cidade.

Ela não sabe o que você sabe sobre a estrada e o lago. Nem imagina quanto essa informação pode mudar de sentido.

O celular de Bella vibra. Ela rejeita a chamada sem olhar o nome.

Bella: — Vou conversar com a polícia sobre o livro de acessos. Você faz o que quiser com isso, mas não publica foto de documento da minha família. E, se eu descobrir que você tá me usando pra me esconder alguma coisa, eu não vou esquecer.

Você promete apenas o que consegue cumprir: manter as cópias preservadas, sem atribuir culpa a uma pessoa antes de ter provas.`,[g('j13','Sair da biblioteca e conferir o grupo',[Q('c7_acesso_cameras'),['trait','cautela',1]])]);

// ATO III — RELAÇÕES: discussão dependente de informações que realmente circularam.
N('j13','PRAÇA CENTRAL · CHAMADA EM GRUPO','16:05','phone',`Você encontra uma sequência de mensagens no grupo. Alguém recebeu a imagem de uma conversa privada, tirada de um ângulo que não mostra o nome completo de quem a enviou. A mensagem menciona o jantar no apartamento e uma pessoa que teria dito que «ninguém estava seguro nem entre amigos».

Samuel: — QUEM MANDOU ISSO PRA FORA DO GRUPO?

Isabella e os outros respondem em horários diferentes. Algumas pessoas não estavam presentes na discussão original; outras só ouviram a história depois. Uma captura isolada não mostra todas as mensagens anteriores.

Você percebe que o mascarado não precisa inventar mentiras elaboradas para provocar uma briga. Basta mostrar a verdade pela metade, no momento certo, para pessoas cansadas de perder amigos.

O grupo começa a se acusar. Samuel quer saber quem teve acesso às informações. Breno pede que verifiquem o horário original da captura. Ryan tenta impedir que a conversa se transforme em uma caça às bruxas. Nenhuma dessas respostas faz desaparecer o medo de que alguém próximo tenha deixado uma porta aberta.

Você digita, apaga e digita novamente. O modo como responder agora pode influenciar quem aceita encontrá-lo mais tarde — e quem prefere manter distância.`,[
 C('Defender a ideia de comparar os horários antes de acusar alguém','j14',[F('grupo_pediu_provas'),['trait','cautela',2]]),
 C('Perguntar diretamente quem sabia sobre o jantar','j14',[F('grupo_cobrou'),['trait','franqueza',2]]),
 C('Pedir que parem de atacar uns aos outros','j14',[F('grupo_apaziguou'),['trait','empatia',2]])]);
N('j14','CENTRO · DEPOIS DA DISCUSSÃO','16:19','town',`Depois de quase vinte minutos de mensagens atravessadas, a conversa morre sem chegar a uma conclusão. Samuel envia apenas: «Não dá pra continuar fingindo que é coincidência». Breno pede que ninguém apague nada. O resto do grupo reage com corações, confirmações curtas e silêncios longos demais.

Você percebe que hoje não existe uma escolha capaz de devolver a confiança de todo mundo. O que pode fazer é registrar os fatos: quem sabia da reunião, quem teve acesso à foto, quem recebeu a mensagem e quais horários ainda precisam de verificação.

Quando guarda o celular, o nome de Moisés surge numa notificação. Não é uma ligação, ainda. É um texto curto, enviado para você e somente para você.

Moisés: — Eu preciso contar uma coisa. Não dá mais pra guardar. Não quero falar no grupo. Depois te explico onde. Por favor, não some.

Você lê duas vezes. O homem que passou meses evitando Bella e hesitando sobre o passado parece, finalmente, disposto a falar.

Antes que consiga responder, chega uma mensagem de quem havia combinado de jantar com você. É o primeiro convite em muito tempo que não envolve documentos, câmeras ou o assassino.

Uma noite quase normal. Talvez a última oportunidade de respirar antes de ouvir Moisés.`,[g('j20','Conferir os planos para esta noite')]);

// ATO IV — CADA ROTA ROMÂNTICA É ESCRITA SEPARADAMENTE.
const DATE_DREAM={
 ryan:`Ryan pega um guardanapo e desenha uma versão absolutamente horrível de como imaginava a própria vida aos trinta anos: um apartamento pequeno, um cachorro enorme e um trabalho em que pudesse falar com pessoas o dia inteiro. — Eu sempre digo que não ligo pra nada disso, né? — pergunta. — Mentira. Eu quero uma casa com barulho, gente chegando sem avisar, alguém me chamando pra assistir filme ruim. Eu quero a chance de ficar chato de tanto envelhecer. — Ele dobra o guardanapo e empurra para você. — Guarda. Se ficar famoso como artista, esse desenho vai valer alguma coisa. Uma dívida, pelo menos.`,
 breno:`Breno revela uma fotografia antiga no celular: um banco de praça ao entardecer, vazio, iluminado por uma faixa de sol. — Eu tirava foto das coisas quando não sabia falar com as pessoas — explica. — Não por achar tudo profundo. Era só o jeito de lembrar que eu tava lá. — Ele mostra outras imagens, quase todas sem rostos. Conta que gostaria de viajar um dia sem precisar provar coragem para ninguém. Quer morar num lugar com janela grande, adotar uma planta que sobreviva mais de duas semanas e aprender a dizer quando gosta de alguém. Na última frase, olha diretamente para você.`,
 rayssa:`Rayssa fala de uma ideia antiga: organizar um pequeno evento para ajudar um abrigo de animais e chamar os amigos para trabalhar juntos. — Eu falava que ia fazer quando tivesse tempo. Aí tinha prova, trabalho, alguma briga besta. Sempre havia uma desculpa. — Ela mexe na borda da toalha e sorri ao lembrar de Isabella reclamando que acabaria cuidando de tudo. — A Isa teria levado uma prancheta e controlado até a ordem dos banhos. Eu reclamaria, ela me chamaria de distraída... — Rayssa cala por um instante e depois acrescenta que ainda gostaria de realizar a ideia, com quem puder estar presente.`,
 rauanny:`Rauanny admite que tinha uma lista de lugares que pretendia conhecer dirigindo, sem roteiro, com a Laisla escolhendo músicas e reclamando quando ela passasse da saída certa. — Ia ser um desastre, eu sei. A gente ia brigar antes do primeiro pedágio. Mas eu queria isso. — Ela olha para os carros do outro lado da vidraça. — Engraçado como a gente acha que pode adiar qualquer coisa até as férias do próximo ano. — Quando você pergunta qual seria a primeira cidade, ela inventa uma resposta e depois ri. — Tá vendo? Nem precisei de um mapa. Só de alguém que topasse ir comigo.`
};
const ROM={
 ryan:{place:'BISTRÔ DA ESTAÇÃO',intro:`Ryan escolheu um bistrô pequeno perto da estação, com fotografias antigas de bandas nas paredes. Chegou cedo e tentou arrumar a mesa duas vezes. Quando vê você, faz uma reverência ridícula. — Reservei a melhor mesa disponível num raio de três quarteirões. O dono disse que a mesa do canto tava quebrada, então a nossa ficou automaticamente em primeiro lugar.`,private:`Ryan para de mexer no guardanapo. — Eu passei a noite tentando pensar numa piada sobre a escada. Aí lembrava de vocês do outro lado, gritando, e não achava graça de nada. O pior é que eu queria parecer o cara corajoso. Tipo, você olha pra mim e pensa: ele sabe o que tá fazendo. Só que eu tava tremendo tanto que mal conseguia segurar o metal. Quando achei que ia te perder, percebi que tem coisa que eu não quero deixar pra depois.`,desire:`Ryan segura sua mão sob a mesa, sem fazer anúncio e sem procurar quem está olhando. — Eu gosto disso aqui. De você me enxergar sem a versão engraçada obrigatória. Não quero prometer que vai ser fácil. Nem falar que a gente já é um casal de cinema. Mas quero continuar encontrando um motivo pra te ver amanhã. E depois de amanhã.`,after:`Na saída, Ryan encosta a testa na sua por um instante. — Se esse mundo deixar a gente ter outra noite normal, eu te prometo que arrumo um lugar com comida melhor. — Ele ri, aliviado por ainda conseguir brincar sem esconder o que sente.`},
 breno:{place:'RESTAURANTE DA PRAÇA',intro:`Breno escolheu um restaurante discreto, com uma mesa perto da janela e música baixa. Chegou antes, como sempre, e deixou o lugar ao seu lado livre. — Eu pensei em cozinhar — admite, desviando os olhos para o cardápio. — Mas seria uma aposta irresponsável com nossa sobrevivência. Então trouxe você aqui.`,private:`Breno observa a rua antes de falar. — Tem muita coisa que eu guardo pra mim porque acho que, se falar, vai virar um problema dos outros. Quando vi seu nome na tela ontem, sem saber se você tinha saído daquele prédio, percebi que silêncio também machuca. Eu gosto de você há mais tempo do que deixei perceber. E fico com medo de dizer isso do jeito errado, como se existisse um jeito certo num dia desses.`,desire:`Ele aproxima a cadeira só o suficiente para encostar seu joelho no dele. — Eu não quero que você ache que precisa me dar alguma resposta definitiva. Quero conhecer a pessoa que você é quando ninguém tá correndo, gritando ou fazendo promessa impossível. Posso começar ficando aqui, sem pressa?`,after:`Ao sair, Breno entrelaça os dedos nos seus. Ficam assim ao atravessar a praça. Quando você pergunta se ele está nervoso, responde que sim. Depois acrescenta: — Mas dessa vez é um nervoso que eu não quero evitar.`},
 rayssa:{place:'RESTAURANTE JARDIM',intro:`Rayssa reservou uma mesa pequena perto de vasos de plantas iluminados por fios de luz amarela. Ela ajeita uma mecha do cabelo quando você chega. — Eu tava com medo de você cancelar — admite. — Ou de eu cancelar primeiro. Não por não querer te ver. Só porque tem dia que eu não sei se mereço uma coisa boa.`,private:`Rayssa gira a aliança falsa que usa como acessório, nervosa. — Às vezes eu penso em quantas pessoas a gente pode machucar tentando proteger alguém. Eu sei que isso soa estranho. Eu só... tenho medo de ser a pessoa de quem você se arrepende de ter gostado. — Quando você tenta interromper, ela toca sua mão. — Não precisa responder. Eu sei que você não tem como consertar o que eu sinto.`,desire:`Rayssa aproxima o rosto, mas espera sua reação antes de continuar. — Eu gosto de ficar com você. Quando a gente tá junto eu consigo lembrar de quem eu era antes de tudo dar errado. Só não quero que você confunda meu carinho com alguma garantia de que eu nunca vou te decepcionar. Eu tô tentando ser sincera, mesmo quando não encontro as palavras.`,after:`Rayssa abraça você na saída por tempo suficiente para o dono do restaurante começar a apagar as luzes das mesas vazias. Ela se afasta com um sorriso cansado. — Me avisa quando chegar. Mesmo que a gente tenha acabado de se despedir.`},
 rauanny:{place:'PIZZARIA DA AVENIDA',intro:`Rauanny escolheu uma pizzaria com bancos gastos e luzes quentes. Faz uma careta quando você tenta puxar a cadeira para ela. — Ei, eu consigo sentar sozinha. — Depois ri. — Mas obrigada. Eu tô tentando aprender a aceitar ajuda sem achar que virei uma idosa.`,private:`Rauanny abandona o tom provocador quando o assunto vira a madrugada. — Eu me senti tão inútil quando não consegui correr direito. Passei a vida inteira acreditando que, se alguma merda acontecesse, eu ia resolver na força. Aí você tava lá, do meu lado, e eu fiquei apavorada de precisar que alguém escolhesse entre me ajudar e sair vivo. E eu odeio pensar que você podia ter morrido por minha causa.`,desire:`Ela alcança sua mão e aperta seus dedos com firmeza. — Quer saber? Eu gosto de você. Gosto quando discute comigo e quando não tenta me tratar como vidro. Só não me faz prometer que vou ser toda calma e delicada. — Ela sorri, desta vez sem esconder a timidez. — Se você aguentar meu jeito, eu aguento o seu.`,after:`Na calçada, Rauanny se vira para você e dá um beijo rápido antes que a coragem falhe. Depois finge olhar para os carros, com as bochechas coradas. — Não começa a me olhar assim. Eu não vou admitir que planejei isso o dia inteiro.`}
};
for(const id of Object.keys(ROM)){
 const d=ROM[id];
 N('j_dinner_'+id,d.place,'19:12','town',`${d.intro}\n\nO restaurante está cheio de conversas pequenas: talheres, pedidos, pessoas comentando o trânsito. Você descobre que é possível prestar atenção num cardápio e ainda carregar um ano inteiro de culpa.\n\n${L[id]} lê o cardápio em voz alta, mas para na terceira opção: os dois perceberam que estão com mais fome do que imaginavam. Vocês pedem algo para dividir.\n\n${L[id]}: — Eu tava pensando em cancelar. Não por causa de você. Eu fiquei olhando meu armário e achei ridículo escolher roupa depois de ontem.\n\nVocê: — Ainda bem que não cancelou. Eu também quase desisti de sair.\n\n${L[id]}: — Então vamos tentar comer. Se a comida for ruim, pelo menos a gente pode reclamar juntos.\n\nVocês experimentam o primeiro prato e, pela primeira vez no dia, discutem algo tão simples quanto o tempero.`,[
 C('Contar uma lembrança engraçada de quando se conheceram','j_date_chat_'+id,[B(id,4),['romance',id,5]]),
 C('Perguntar sobre um sonho que ninguém conhece','j_date_chat_'+id,[B(id,3),['romance',id,6]])]);
 N('j_date_chat_'+id,d.place,'19:27','town',`A conversa atravessa a primeira parte do jantar quase sem esforço. Vocês lembram de um dia em que o grupo inteiro discutiu durante quinze minutos para escolher um filme, só para acabar vendo metade porque alguém esqueceu a senha da televisão.\n\n${DATE_DREAM[id]}\n\nVocê ri de verdade. A risada parece estranha depois de tudo. ${L[id]} percebe e sorri também, mas não transforma o momento numa lição sobre superação.\n\nQuando a comida chega, vocês dividem o prato e discutem quem ficou com a melhor parte. Aos poucos o assunto muda: trabalho, faculdade, mudanças, amigos que seguirão caminhos diferentes. Há uma delicadeza em falar de futuro depois de noites em que ninguém tinha certeza de que existiria manhã.\n\n${d.private}\n\nVocê percebe que não é uma declaração ensaiada. ${L[id]} está contando algo que normalmente guardaria para si.`,[
 C('Dizer que gosta de estar com essa pessoa, mesmo sem ter respostas','j_date_personal_'+id,[B(id,4),['romance',id,7]]),
 C('Admitir que tem medo de se apegar e perder mais alguém','j_date_personal_'+id,[B(id,3),['trait','empatia',2]])]);
 N('j_date_close_'+id,d.place,'19:44','town',`O garçom passa oferecendo sobremesa. Vocês decidem compartilhar uma, mais para prolongar a conversa do que pela fome.\n\n${d.desire}\n\nVocê fala sobre o quanto mudou desde o verão passado. Não quer transformar o encontro numa promessa formal, nem pedir que alguém esqueça tudo o que aconteceu. Só quer viver um instante que pertença aos dois.\n\nA sobremesa chega. Você tenta prestar atenção no sabor, mas continua lembrando da conversa e do modo como a mão de ${L[id]} se aproxima da sua.\n\nA conversa se alonga sobre pequenos hábitos que vocês ainda não conheciam: a bebida preferida de cada um, o que fazem quando não conseguem dormir, qual música colocariam numa viagem longa. Nenhuma dessas respostas resolve o caso que deixou a cidade em pânico. Ainda assim, são respostas que você queria saber. Vocês dividem o último pedaço da sobremesa e riem de uma discussão ridícula sobre quem deveria ficar com ele.\n\nDo lado de fora, um carro acelera de repente e você se assusta. ${L[id]} repara, mas espera seu corpo relaxar antes de perguntar se está tudo bem. Essa paciência vale mais do que uma frase pronta.`,[
 C('Aproximar-se e beijar a pessoa de quem gosta','j_date_call_'+id,[B(id,5),['romance',id,8],F('beijo_jantar')]),
 C('Apertar sua mão e continuar conversando','j_date_call_'+id,[B(id,4),['romance',id,5],F('carinho_jantar')])]);
 N('j_date_call_'+id,d.place,'20:02','phone',`O encontro segue num ritmo tranquilo. Vocês falam sobre lugares que gostariam de conhecer, músicas que marcaram a adolescência e como seria passar uma semana inteira sem ouvir a palavra «assassino». É quase possível imaginar essa semana.\n\nSeu celular vibra dentro do bolso. Você pensa em ignorar, acreditando ser outra discussão no grupo. Quando olha, vê o nome de Moisés.\n\nEle escreveu mais cedo pedindo uma conversa. Agora está ligando.\n\n${L[id]} percebe a mudança no seu rosto.\n\n${L[id]}: — Quem é?\n\nVocê mostra a tela. A música ambiente parece diminuir, embora ninguém tenha tocado no volume. O telefone continua vibrando.\n\nNão existe uma resposta elegante. Atender pode acabar com a noite. Ignorar pode significar perder o momento em que Moisés finalmente decide falar.`,[
 C('Atender Moisés sem sair da mesa','j_call_answer',[F('ligacao_atendida'),F('par_conhece_moises'),['trait','coragem',1]]),
 C('Pedir licença e atender do lado de fora','j_call_answer',[F('ligacao_atendida'),F('par_conhece_moises'),F('ligacao_reservada')]),
 C('Silenciar, guardar o telefone e decidir retornar depois','j_call_missed',[F('ligacao_perdida'),['trait','cautela',1]])]);
 N('j_date_exit_'+id,'RUAS DO CENTRO · APÓS O JANTAR','20:24','road',`${d.after}\n\nVocê gostaria que a noite terminasse com essa lembrança. Um abraço, o ar fresco, alguém com quem conversar depois de um dia interminável.\n\nMas há uma chamada de Moisés esperando uma resposta ou uma conversa interrompida que precisa ser concluída. Seu telefone parece pesado demais no bolso.\n\n${L[id]} percebe seu olhar.\n\n${L[id]}: — Vai. Descobre o que ele quer. Só não tenta resolver tudo sozinho sem me falar onde você tá.\n\nVocês se despedem. Nenhum dos dois sabe quanto tempo aquela despedida vai durar.`,[g('j30','Ler a nova mensagem de Moisés')]);
}

const DINNER_CONVERSATIONS={
 ryan:`Ryan vira o guardanapo onde desenhou o cachorro enorme e aponta para uma linha torta.\n\nRyan: — Essa é a minha sala. O sofá tá virado pra televisão e o cachorro já destruiu dois travesseiros.\n\nVocê: — E você trabalha com quê nessa sua vida imaginária?\n\nRyan: — Sei lá. Pensei em trabalhar com rádio. Minha mãe vivia falando que eu não calava a boca nem dormindo. Eu gravava programa falso no gravador dela. Entrevistava meus brinquedos, sério.\n\nEle imita a voz de apresentador e você ri.\n\nVocê: — E os convidados respondiam?\n\nRyan: — Respondiam melhor do que metade dos caras da escola.\n\nO garçom traz uma porção de batatas. Ryan pega uma e olha para a janela.\n\nRyan: — Um dia meu pai ouviu uma das gravações. Eu devia ter uns doze. Ele riu tanto que eu achei que tava me zoando. Depois ele perguntou quando ia ter o próximo episódio. Passei a semana inteira preparando.\n\nVocê: — Você nunca me contou isso.\n\nRyan: — Porque é uma vergonha. Mas acho que eu sinto falta daquele menino. Ele falava pelos cotovelos sem ter medo de parecer idiota.\n\nVocê pergunta se ele ainda guarda o gravador. Ryan diz que está numa caixa em casa, junto de ingressos de cinema e uma camisa de futebol que nunca coube direito.\n\nRyan: — Você me ajudaria a gravar outro? A gente podia fazer um sobre histórias ridículas da nossa cidade. Sem máscara. Sem assassinato. Só coisa boba.\n\nVocê: — Com a condição de eu poder escolher a música de abertura.\n\nRyan: — Aí já tá querendo mandar demais. Mas tudo bem.\n\nEle fica quieto pela primeira vez, olhando sua mão próxima da dele.\n\nRyan: — Eu queria que você soubesse uma coisa. Quando eu faço graça e você não ri, eu não fico ofendido. Eu gosto que você perceba quando eu tô fingindo que tá tudo certo. Não precisa rir pra cuidar de mim.`,
 breno:`Breno desliza o celular até você e abre uma pasta de fotos. Não são retratos de pessoas: um cachorro dormindo sobre uma pilha de roupas, o reflexo de uma bicicleta numa poça, um senhor numa padaria lendo jornal de cabeça para baixo.\n\nVocê: — Espera. Esse homem tá lendo o jornal invertido?\n\nBreno: — Tava. Fiquei uns dez minutos tentando entender se ele tinha percebido. No fim descobri que ele só tava esperando a esposa voltar do caixa. Nem lia aquilo.\n\nVocê: — Você coleciona momentos estranhos de desconhecidos?\n\nBreno: — Mais ou menos. Minha avó me dava uma câmera velha quando eu passava as férias com ela. A gente saía pra fotografar as coisas que ninguém ia lembrar no dia seguinte. Uma parede pintada, um gato na janela, o último ônibus.\n\nEle passa para outra imagem. A fotografia de uma cadeira vazia à beira de uma mesa.\n\nBreno: — Essa foi no dia em que ela morreu. Não a cadeira, óbvio. A foto foi depois do enterro. Eu não quis fotografar ninguém chorando. Só queria registrar que aquela cadeira tinha sido dela.\n\nVocê fica alguns segundos sem falar.\n\nVocê: — Posso te perguntar uma coisa? Quando você tá quieto, o que tá acontecendo aí dentro?\n\nBreno: — Às vezes muita coisa. Às vezes nada. Com você eu não fico calculando tanto. Eu penso no que quero dizer e demoro, só isso.\n\nVocê: — Não precisa correr.\n\nBreno: — É. Eu tô começando a entender.\n\nA sobremesa chega e ele pergunta se você prefere a parte de chocolate. Quando você responde, Breno separa a porção sem fazer cerimônia.\n\nBreno: — Se um dia a gente conseguir sair de Lakewood por uma semana, eu queria te mostrar o lugar onde ela morava. Tem uma ponte pequena e um banco de madeira. Acho que você ia gostar. Não é uma proposta de casamento, tá? É só... um lugar importante pra mim.`,
 rayssa:`Rayssa mexe a colher no copo de suco, observando o gelo bater contra o vidro.\n\nRayssa: — A Isa sempre dizia que eu demorava três horas pra escolher presente de aniversário. Ela tava certa.\n\nVocê: — Três horas?\n\nRayssa: — Teve uma vez que eu atravessei a cidade pra encontrar uma caneca específica. Era horrível, tinha um gato com óculos. Eu comprei porque ela comentou aquilo uma única vez.\n\nVocê: — E ela gostou?\n\nRayssa: — Falou que era a coisa mais feia que já tinha ganhado. Usa até hoje.\n\nEla ri, mas logo fica olhando para a mesa.\n\nRayssa: — Eu guardo detalhes assim porque tenho medo de esquecer das pessoas. No celular tem uma lista: a bebida que cada amigo pede, os filmes que vocês odeiam, aniversário, uma frase que alguém soltou sem pensar.\n\nVocê: — Você fez uma lista minha?\n\nRayssa: — Fiz. Não vou mostrar. Tá muito vergonhosa.\n\nVocê: — Agora eu preciso saber.\n\nRayssa: — Anotei que você fica mexendo na manga quando tá nervoso. E que sempre deixa a última batata pros outros, mesmo querendo comer.\n\nVocê tenta protestar, mas ela aponta para sua mão perto do prato.\n\nRayssa: — Viu? Até agora.\n\nO garçom traz outra bebida. Rayssa agradece pelo nome, depois olha para você com um cuidado diferente.\n\nRayssa: — Eu queria ser alguém de quem as pessoas lembrassem por uma coisa boa. Não só pelos erros.\n\nVocê: — Você ainda tem tempo de fazer coisas boas.\n\nRayssa: — Eu espero. Só não quero usar isso como desculpa pra fugir do que já fiz.\n\nEla ergue os olhos, como se fosse dizer mais. Em vez disso, pergunta como você gostaria de passar um domingo que não terminasse numa tragédia. Você descreve uma tarde simples; pela primeira vez ela escuta sem olhar para o celular.`,
 rauanny:`Rauanny já separou os pedaços de pizza por tamanho quando você percebe que ela deixou os maiores do seu lado.\n\nVocê: — Você fez isso de propósito?\n\nRauanny: — O quê?\n\nVocê: — Ficou com os menores.\n\nRauanny: — Tá reclamando de ganhar comida? Come antes que eu me arrependa.\n\nEla conta que aprendeu a dirigir com um tio que perdia a paciência quando errava uma marcha. Na terceira aula, estacionou o carro e se recusou a voltar até ele pedir desculpa.\n\nVocê: — Aposto que foi tranquilo.\n\nRauanny: — Tranquilíssimo. Ele ficou meia hora na calçada gritando que eu era teimosa. Eu gritava de volta que ele era um péssimo professor. No final minha tia apareceu com pão de queijo e mandou os dois calarem a boca.\n\nVocê: — Você fala com esse tio hoje?\n\nRauanny: — Falo. Ele aprendeu a pedir desculpa e eu aprendi a não responder tudo berrando. Mais ou menos.\n\nEla empurra o copo na sua direção para você provar o refrigerante que pediu por engano.\n\nRauanny: — Antes do acidente eu queria entrar num curso de mecânica. Sempre gostei de entender por que as coisas quebram. Quando contei, teve gente falando que não combinava comigo.\n\nVocê: — Por quê?\n\nRauanny: — Porque eles não me conhecem. Acham que eu só sei fazer barulho. Eu gostaria de consertar um carro inteiro sozinha. Pintar de uma cor ridícula e sair dirigindo pela estrada.\n\nVocê: — Eu iria de carona.\n\nRauanny: — Você não pode escolher a música.\n\nVocê: — Isso já é abuso.\n\nEla ri e encosta a mão na sua.\n\nRauanny: — Eu brigo pra caramba. Mas quando gosto de alguém, eu fico. Mesmo quando a pessoa fica insuportável. Então, se eu te disser que tô com medo, não faz cara de pena. Só fica comigo um pouco, tá?`
};
for(const id of Object.keys(ROM)){
 N('j_date_personal_'+id,ROM[id].place,'19:39','town',DINNER_CONVERSATIONS[id],[
 C('Contar uma lembrança sua que ainda não tinha dividido','j_date_close_'+id,[B(id,3),['romance',id,3]]),
 C('Aproximar sua mão e perguntar se podem repetir a noite','j_date_close_'+id,[B(id,4),['romance',id,4]])]);
}

N('j30','AVENIDA · A MENSAGEM DE MOISÉS','20:28','phone',`Você relê o endereço enviado por Moisés e se prepara para sair.`,[g('j15','Seguir para o encontro')]);
// Sem romance e perda de par não viram jantar com um morto.
N('j_dinner_friend','LANCHONETE DO CENTRO · UMA NOITE COMUM','19:12','town',`Você decidiu não começar um romance — ou perdeu alguém com quem sonhava viver mais noites assim. Em vez de fingir que outra pessoa ocupa o lugar vazio, escolhe uma mesa numa lanchonete e pede algo simples.

Uma amiga do balcão coloca um copo d'água ao seu lado. O lugar não exige que você esteja apaixonado, animado ou pronto para falar do que sente. Há pessoas lendo, casais dividindo sobremesas, um homem trabalhando sozinho no computador.

Você folheia as mensagens do grupo. Pensa na conversa da tarde, na pessoa que escolheu ouvir e na promessa silenciosa que ficou entre vocês. Um vínculo não precisa ser romântico para valer a pena.

O pedido chega. Você come devagar, ouvindo uma música antiga e tentando imaginar quais partes de sua vida ainda pertencem a você. Pela janela, o letreiro do outro lado da rua se reflete nas poças. Pela primeira vez desde a madrugada, não precisa correr de nada.

Então seu telefone vibra. É Moisés. Ele não parece disposto a mandar outra mensagem. Está ligando, agora.`,[
 C('Atender Moisés ali mesmo','j_call_answer',[F('ligacao_atendida')]),
 C('Deixar tocar e decidir ligar mais tarde','j_call_missed',[F('ligacao_perdida')])]);
N('j_call_answer','TELEFONE · MOISÉS','20:07','phone',`Você aceita a chamada. Por alguns segundos, só ouve uma respiração irregular e sons de trânsito.

Moisés: — Você atendeu. Graças a Deus.

Você: — Moisés? Fala. O que aconteceu?

Moisés: — Eu não consigo explicar tudo por aqui. Tem gente que pode ouvir. Eu tenho coisas... coisas que devia ter mostrado pra polícia há muito tempo.

Você: — Tem a ver com Jullia?

Do outro lado, Moisés permanece em silêncio por tempo suficiente para você pensar que a ligação caiu.

Moisés: — Tem. Tem a ver com coisas que aconteceram depois. Só me encontra perto da oficina da marina. Não vem trazendo todo mundo. Eu vou mandar o endereço. E, por favor... se eu disser alguma coisa que você não quer ouvir, deixa eu terminar.

Você: — Por que só agora?

Moisés: — Porque eu achei que conseguiria consertar sozinho.

O barulho de uma buzina o interrompe. Ele diz que precisa desligar. Você permanece com o telefone no ouvido mesmo depois que a chamada termina.`,[g('j_call_follow','Guardar o endereço enviado por Moisés',[Q('c7_moises_pediu_encontro')])]);
N('j_call_missed','TELEFONE · CHAMADA NÃO ATENDIDA','20:09','phone',`O telefone para de vibrar. Você tenta voltar ao que estava fazendo, mas a tela acende novamente. Moisés ligou mais uma vez.

Uma mensagem surge quase imediatamente: «Eu sei que você tá ocupado. Preciso falar hoje. Não fica bravo comigo por eu ter demorado. Vou estar na oficina antiga perto da marina. Se eu não atender, não vai embora sem conferir.»

Você relê a frase final. Ela parece desproporcional, como se Moisés estivesse dramatizando, mas ele nunca escreveu daquele jeito antes.

O contato fica disponível para retorno. Você pode ligar agora, quando ele ainda está no caminho, ou esperar mais um pouco e tentar encontrá-lo pessoalmente.`,[
 C('Retornar a chamada imediatamente','j_call_follow',[F('retornou_moises'),Q('c7_moises_pediu_encontro')]),
 C('Guardar a mensagem e terminar o encontro antes de sair','j_call_follow',[F('demorou_moises'),Q('c7_moises_pediu_encontro')])]);
N('j_call_follow','CENTRO · PRÓXIMOS PASSOS','20:17','phone',`Você abre o endereço da oficina num mapa salvo no celular. O edifício fica depois da antiga marina, entre um estacionamento de veículos de manutenção e um galpão que foi fechado há meses.

A mensagem de Moisés não explica por que escolheria um lugar tão isolado. Pode ser medo de câmeras e jornalistas. Pode ser desconfiança do grupo. Ou pode ser um pedido de ajuda que você ainda não compreendeu.

Há uma escolha prática diante de você: dizer a alguém o que está acontecendo ou seguir em silêncio. No grupo, a discussão sobre o suposto informante ainda não se resolveu. Se divulgar o destino de Moisés, outras pessoas terão acesso à informação. Se esconder, estará repetindo o mesmo padrão de segredos que jurou abandonar.

Você precisa decidir antes de partir.`,[
 C('Avisar a todos no grupo que Moisés marcou um encontro','j15',[F('grupo_sabe_encontro'),Q('c7_encontro_divulgado'),['trait','franqueza',2]]),
 C('Avisar somente Bella, porque Moisés está ligado a Jullia','j15',[F('bella_sabe_encontro'),['trait','empatia',1]]),
 C('Guardar o encontro em segredo até saber o que ele quer','j15',[F('encontro_secreto'),['trait','cautela',2]])]);
N('j15','RUA DA PRAÇA · DEPOIS DO JANTAR','20:30','road',`Você sai do centro com o endereço de Moisés guardado. Os sons da noite parecem diferentes: carros passando perto demais, portões fechando, motocicletas virando nas esquinas. Cada barulho oferece uma possibilidade de ameaça que não existia meses atrás.

Breno manda uma mensagem perguntando se você ainda está fora. Samuel quer saber se apareceu alguma novidade sobre o mascarado. Em outro momento você chamaria todos sem pensar. Agora precisa decidir com quem pode contar — e quem realmente consegue participar.

Alguns amigos continuam se recuperando. Outros perderam alguém no apartamento e mal conseguem sair da cama. Forçá-los a uma nova perseguição seria uma crueldade; não é isso que você quer. Mas ir completamente sozinho também pode ser uma decisão impossível de desfazer.

Você encontra um ponto iluminado da avenida e começa a pensar em quem convidar.`,[g('j_party','Decidir quem poderá ir com você')]);
// ATO V — REUNIÃO DA EQUIPE; participantes selecionáveis em tempo real.
N('j_party','AVENIDA DO CENTRO · PREPARATIVOS','20:36','phone',`Você abre os contatos e hesita. Não quer arrastar ninguém para outro risco por puro medo de ficar só. Algumas mensagens podem ser respondidas com um «não consigo sair hoje». Outras poderão mudar de ideia depois de saber onde Moisés está.

A decisão mais segura nem sempre é levar a pessoa de quem você mais gosta. Alguém ainda machucado pode precisar descansar, e um amigo que não confia em você pode preferir continuar investigando sozinho.

Você pode convidar os amigos disponíveis um por um e depois partir. Quem for chamado saberá para onde vai. Você decide não enviar o endereço a quem ficar descansando.`,[]);
N('j_party_done','AVENIDA · QUEM REALMENTE VEM','20:49','road',`Você confere a lista de quem aceitou acompanhar a investigação. Há amigos que ficaram indisponíveis por ferimentos, cansaço ou por não conseguirem lidar com outra noite de perigo. Não é covardia. Ontem foi demais para qualquer pessoa.

O plano é simples: chegar à oficina, encontrar Moisés, ouvir o que tem a dizer e sair. Ninguém quer entrar em galpões abandonados nem enfrentar outra pessoa mascarada. Mas parte do grupo leva o telefone carregado, lanternas e as anotações das trilhas para evitar ficar perdido.

Você envia um último aviso: «Se der errado, chamem a polícia. Não entrem sem saber onde eu tô.»

A resposta demora. Alguém manda apenas um coração. Outro responde que você não tem direito de brincar com uma coisa dessas.

Você fecha o mapa e guarda o celular no bolso.`,[g('j_m01','Acompanhar Moisés enquanto ele chega à oficina')]);

N('j_m01','MOISÉS · OFICINA ANTIGA','21:17','warehouse',`Moisés estaciona diante de um galpão de portões enferrujados. O lugar pertenceu a uma oficina que prestava serviço para barcos e pequenos guinchos. Ainda existem ferramentas, uma plataforma elevatória e um braço de suspensão preso ao teto por correntes pesadas. A energia de emergência funciona em apenas metade das lâmpadas.

Ele carrega um envelope de papel grosso e um telefone antigo. Há cópias de comprovantes, alguns horários anotados à mão e um endereço que não pretende dizer em voz alta antes de conversar com o protagonista.

Ao fechar o carro, Moisés percebe um veículo passando devagar na rua. Não consegue identificar o motorista. Espera alguns segundos para ver se o carro volta. Não volta.

Dentro da oficina, o cheiro de óleo se mistura ao de concreto úmido. Ele empurra uma cadeira contra a porta lateral e verifica a fechadura. O gesto é exagerado para alguém que vai apenas conversar — mas Moisés já não acredita em encontros simples.

Uma mensagem chega de número não salvo: «Você prometeu que ia ficar calado.»

Ele responde digitando duas frases e apagando ambas. Em vez disso, confere novamente o envelope. Se conseguir entregá-lo, não terá como recuperar o que contou. Se destruir, continuará preso ao mesmo segredo.

Moisés decide esperar, por mais alguns minutos, no interior do galpão.`,[
 C('Guardar os comprovantes num armário de manutenção','j_h01',[F('moises_guardou_doc')]),
 C('Levar tudo no bolso para entregar pessoalmente','j_h01',[F('moises_levou_doc')]),
 C('Fotografar os documentos no telefone antigo','j_h01',[F('moises_fotografou_doc')])]);
N('j_h01','PROTAGONISTA · ESTRADA DA MARINA','21:28','road',`Você atravessa uma avenida quase vazia, observando os letreiros que se apagam nas lojas. O mapa marca o estacionamento da oficina como destino, mas a rua anterior está em obras. Será necessário contornar os depósitos para alcançar a entrada certa.

Seu telefone recebe uma mensagem de Moisés: «Tô aqui. Entra pela parte dos fundos se o portão da frente estiver fechado.»

Você percebe que ainda não houve uma explicação do motivo do medo dele. Moisés teve um ano para procurar a polícia, a família Gomes ou qualquer um do grupo. Por que escolher justamente aquela noite? Por que um galpão tão afastado?

Você verifica o celular para saber quem confirmou presença e em qual acesso ficará. O restante do grupo espera notícias longe da oficina.

Um guarda de trânsito aponta o desvio. Você pergunta se conhece a oficina. Ele diz que costumava receber barcos apreendidos, mas está quase fechada. — Faz tempo que ninguém trabalha lá depois das dez. Se for encontrar alguém, não demore.

Você guarda o conselho, embora o tom dele não pareça tranquilizador.`,[
 C('Avisar a polícia sobre o local antes de entrar','j_m02',[F('policia_preavisada'),['trait','cautela',2]]),
 C('Pedir a um amigo que registre sua posição pelo celular','j_m02',[F('amigo_tem_posicao'),['trait','empatia',1]]),
 C('Seguir diretamente para não deixar Moisés esperando','j_m02',[F('hero_apressou'),['trait','coragem',2]])]);
N('j_m02','MOISÉS · SALA DE FERRAMENTAS','21:42','warehouse',`Uma lâmpada pisca no corredor. Moisés sai da sala de manutenção e confere a entrada. A cadeira que encostou à porta lateral continua no lugar, mas há pegadas úmidas perto de uma pilha de pneus. Ele não se lembra de ter passado ali.

Moisés: — Tem alguém aí?

O galpão devolve a pergunta num eco vazio. Um som metálico vem de trás dos elevadores. Ele se aproxima e encontra uma corrente balançando, embora nenhuma janela esteja aberta naquela direção.

O telefone vibra novamente.

NÚMERO DESCONHECIDO: «Não faz isso.»

Moisés tenta ligar para a pessoa que enviou a mensagem. A chamada cai imediatamente. Ele abre o contato do protagonista, prende a respiração e liga.

Do outro lado da oficina, uma porta abre devagar. A luz de emergência recorta uma figura imóvel junto à passagem para o depósito de peças. O rosto está coberto.

Moisés dá dois passos para trás. Não pergunta se aquilo é uma brincadeira. Também não pergunta o nome da pessoa. Aperta a chamada no ouvido e procura uma saída que não passe pela figura.

Moisés: — Por favor, atende...`,[
 C('Procurar a saída pelo corredor das ferramentas','j_h02',[F('moises_rota_manutencao')]),
 C('Recuar até a plataforma elevatória','j_h02',[F('moises_rota_elevador')])]);
N('j_h02','PROTAGONISTA · ENTRADA DO COMPLEXO','21:47','road',`Você alcança o quarteirão da oficina e vê uma luz de emergência atrás das janelas sujas. O portão principal está entreaberto. Perto dele, um carro estacionado de modo torto parece ter sido abandonado às pressas.

Seu celular mostra uma chamada de Moisés. Ela permanece na tela por alguns segundos, interrompida por um sinal fraco na região dos depósitos.

Você tenta ouvir melhor. Há barulho de metal, alguém respirando com dificuldade e uma voz distante chamando por socorro. A ligação oscila.

O silêncio do prédio oferece pouco conforto. Há um portão de serviço à direita, acesso aos veículos à esquerda e uma porta lateral próxima à área externa.

Antes que você decida por qual passagem entrar, a ligação de Moisés é interrompida com um estalo seco.

Você olha o relógio. Ele não sabe exatamente onde você está. E você ainda não consegue explicar o que acabou de ouvir.`,[
 C('Tentar ligar para Moisés outra vez, sem desligar ao primeiro sinal','j_m03',[F('hero_insistiu_chamada')]),
 C('Guardar o celular e avançar pela entrada para ganhar tempo','j_m03',[F('hero_entrada_rapida')]),
 C('Avisar à emergência sobre o pedido de ajuda','j_m03',[F('hero_pediu_socorro')])]);
N('j_m03','MOISÉS · PRIMEIRO GOLPE','21:54','warehouse',`O mascarado avança entre dois veículos cobertos por lonas. Moisés tenta se proteger com o braço, mas a lâmina rasga a manga e abre um ferimento. O choque o faz gritar e recuar contra uma bancada. Ferramentas despencam em cascata pelo chão.

Moisés: — AAAAAH! CARALHO!

Ele empurra uma cadeira de metal na direção do agressor e corre pelo corredor lateral. O telefone escorrega na mão molhada de sangue. Ele consegue agarrá-lo pelo canto antes que caia dentro de uma caixa de óleo.

Uma porta bate atrás dele. O som parece vir de vários lugares ao mesmo tempo. Moisés tropeça, se apoia na parede e percebe que o sangue está atravessando sua camisa. Não dá para continuar correndo do mesmo jeito por muito tempo.

Moisés: — Eu fiz o que você pediu! EU FIZ TUDO!

O assassino não responde.

Moisés tenta destrancar a porta de serviço, mas encontra uma corrente presa pelo lado de fora. Ele não vê quem a colocou. O espaço livre da oficina fica para trás, onde as luzes continuam piscando sobre o braço mecânico usado para suspender motores.

O telefone volta a vibrar. É uma oportunidade de falar, mas também um objeto que pode denunciar onde está.`,[
 C('Manter a ligação aberta para que alguém ouça o que acontece','j_h03',[F('moises_celular_ativo')]),
 C('Esconder o telefone num vão e tentar correr mais leve','j_h03',[F('moises_celular_escondido')]),
 C('Usar o telefone como lanterna e buscar a saída superior','j_h03',[F('moises_celular_lanterna')])]);
N('j_h03','PROTAGONISTA · PÁTIO DE CARGA','22:00','warehouse',`O pátio tem três acessos. Pela esquerda, o estacionamento termina numa fileira de carros de serviço. Adiante, uma porta leva à área de manutenção. Pela direita, uma passagem sem cobertura acompanha o muro até a rua de trás.

Você ouve um ruído abafado vindo do galpão. Não dá para saber se foi um grito ou uma máquina desligando. Uma luz acende no segundo andar e desaparece quase imediatamente.

Você tenta lembrar se Moisés disse que estaria na recepção ou no depósito. Ele só mencionou «a oficina». Nenhuma mensagem informa o andar, a porta ou a sala.

O telefone dele não atende.

Você consulta as últimas confirmações de chegada no celular. Nenhuma localização recebida garante que a pessoa permaneça no mesmo ponto depois de entrar.

Uma sombra passa pela janela suja do galpão. O instinto manda correr na direção dela. A memória do apartamento manda pensar primeiro.`,[
 C('Entrar pela manutenção e procurar Moisés entre as salas de ferramentas','j_m04',[S('rota_inicial','manutencao')]),
 C('Verificar o estacionamento e os veículos mais próximos','j_m04',[S('rota_inicial','veiculos')]),
 C('Contornar o muro pela saída externa','j_m04',[S('rota_inicial','externa')])]);
N('j_m04','MOISÉS · SALA DO GUINCHO','22:08','warehouse',`A plataforma de suspensão ocupa o centro da sala. Correntes grossas descem do braço mecânico; um gancho industrial enferrujado balança acima de um bloco de motores antigos. Moisés entra pelo corredor de manutenção e procura outro caminho, mas encontra a porta oposta presa por uma barra de ferro.

O sangue marca sua passagem pelo concreto. Ele se apoia numa bancada e tenta manter a respiração sob controle. O ferimento na lateral parece pior do que o do braço. Cada vez que se move, uma dor aguda atravessa seu corpo.

Moisés: — Não precisa terminar assim... Eu posso desfazer isso. Eu posso contar outra coisa... posso sumir daqui, caralho!

Passos se aproximam. A pessoa mascarada não acelera. Moisés ouve o som de metal sendo arrastado e olha para o braço de suspensão. Uma roldana se move quando alguma coisa pesada toca a corrente.

Ele pensa em correr pela porta bloqueada ou tentar alcançar a escada da passarela. Nenhuma parece segura. Ainda assim, continua procurando, porque ficar parado significaria esperar pelo próximo golpe.

Moisés olha para o telefone uma última vez. Se conseguir deixar alguma coisa para trás, talvez alguém saiba por que aquele encontro foi marcado.`,[
 C('Tentar preservar uma última informação no aparelho','j_death_gate',[F('moises_ultima_tentativa')]),
 C('Largar tudo e se concentrar em alcançar a passarela','j_death_gate',[F('moises_tentou_passarela')]),
 C('Tentar travar a porta entre o agressor e a plataforma','j_death_gate',[F('moises_tentou_trancar')])]);
N('j_death_gate','OFICINA · A VERDADE SE APROXIMA','22:12','warehouse',`Os passos ressoam no interior do galpão. Uma corrente bate na estrutura do teto. A pessoa mascarada se aproxima, e Moisés entende que já não está diante de alguém disposto a negociar.

Do lado de fora, o protagonista ainda tenta encontrar o acesso correto. Duas pessoas podem estar separadas por uma única parede sem que consigam se ouvir.

É o último instante antes que as escolhas feitas por ambos passem a se encontrar.`,[]);
N('j_m_death_show','MOISÉS · O CONFRONTO FINAL','22:14','warehouse',`Moisés alcança a alavanca da plataforma e a puxa com as duas mãos. Um ruído áspero ecoa por toda a sala. A corrente se move, prendendo a passagem por onde o mascarado avança. Durante um segundo, há espaço para fugir.

Ele tenta subir à passarela. O ferimento na lateral o faz perder a força no segundo degrau. A mão escorrega. Moisés cai contra uma peça metálica e grita de dor.

O agressor o alcança antes que consiga se levantar. Moisés ergue os braços, desesperado, enquanto a lâmina desce. O primeiro golpe o atinge no ombro; outro atravessa sua defesa. O sangue espalha-se pelo piso e pelo uniforme rasgado.

Moisés: — NÃO! EU IA CONTAR! EU JURO QUE IA!

A figura não responde. Ele se debate, derruba uma caixa de parafusos, tenta alcançar a porta e escorrega na própria trilha de sangue.

Moisés: — POR FAVOR... POR FAVOR, NÃO!

O mascarado o imobiliza junto à base do guincho. O braço mecânico range acima deles. A última tentativa de Moisés termina numa respiração entrecortada e num esforço inútil para alcançar o celular caído perto da bancada.

A máscara continua voltada para ele. Não há rosto, nome nem confissão.

Quando tudo termina, o galpão fica silencioso. Moisés não volta a respirar.

Do corredor externo, chega o ruído de uma porta sendo empurrada. Alguém se aproxima.`,[g('j_after_death','Voltar à perspectiva do protagonista',[F('moises_morto'),F('hero_presenciou_desfecho')])]);
N('j_m_death_hear','PROTAGONISTA · CHAMADA ABERTA','22:14','phone',`A ligação se reconecta por um instante. Você leva o aparelho ao ouvido, correndo em direção à porta que parece levar ao centro do galpão.

Moisés: — NÃO! ME ESCUTA! POR FAVOR!

O som de uma ferramenta caindo atravessa a chamada. Há um arrastar de metal, respiração forte e o som de alguém tropeçando contra uma estrutura oca.

Você: — MOISÉS?! FALA ONDE VOCÊ TÁ!

Moisés tenta responder, mas sua voz se perde num grito de dor. Você ouve uma corrente estalar e depois uma sucessão de golpes abafados. A ligação continua aberta por alguns segundos em silêncio.

Você grita o nome dele até a voz falhar.

Uma respiração desconhecida chega ao microfone — ou talvez seja apenas o ruído do aparelho contra o concreto. Não existe tempo para identificar.

A chamada termina.

Você fica imóvel diante de uma porta fechada. Seu reflexo aparece na tela apagada. Há sangue perto da soleira, mas você ainda não viu de quem é.

O silêncio não confirma nada. E, mesmo assim, você já sabe que não chegou a tempo de impedir alguma coisa terrível.`,[g('j_after_death','Abrir caminho para dentro do galpão',[F('moises_morto'),F('hero_ouviu_morte'),Q('c7_chamada_ataque')])]);
N('j_m_death_find','PROTAGONISTA · PORTAS FECHADAS','22:15','warehouse',`O galpão está silencioso demais quando você consegue abrir a primeira porta. Sua lanterna encontra uma cadeira caída, marcas de arrasto no concreto e um casaco preso num pedaço de metal. Não há ninguém na sala de ferramentas.

Você chama Moisés. Sua voz volta como eco pelos corredores. Um telefone toca em algum lugar do prédio, abafado, como se estivesse escondido sob algo pesado.

O rastro de sangue segue para a sala do guincho. Em alguns trechos desaparece e volta a surgir do outro lado de caixas de ferramentas.

Você tenta uma passagem lateral, mas está trancada. Precisa contornar a antiga plataforma elevatória e abrir uma porta de serviço emperrada. O esforço consome minutos, e cada ruído de metal faz seu corpo reagir antes que a cabeça consiga avaliar o perigo.

Quando alcança a entrada, percebe um cheiro forte de ferro e óleo.

A porta está entreaberta. Uma corrente balança lentamente no interior da sala.`,[g('j_after_death','Entrar na sala do guincho',[F('moises_morto'),F('hero_descobriu_depois')])]);
N('j_after_death','SALA DO GUINCHO · DEPOIS DO ATAQUE','22:26','warehouse',`O corredor desemboca numa área onde a luz de emergência pinta as paredes de vermelho. A corrente do guincho range acima de uma poça escura. Você demora um segundo para entender que os sons que ouviu já pararam.

Há um envelope amassado perto de uma bancada e um aparelho que pode ser o telefone de Moisés. Parte do conteúdo foi arrastada para baixo de uma caixa de ferramentas. Você não consegue avaliar o que é seguro tocar sem preservar marcas e horários.

O sangue está fresco. O agressor não pode ter ido muito longe. Mesmo assim, a prioridade muda: agora você precisa verificar o que aconteceu, pedir ajuda e sair antes que a pessoa mascarada volte.

Os telefones ainda permitem procurar os amigos que entraram por outros acessos, mas não mostram onde cada um está a todo momento. Você precisa conferir as últimas respostas antes de escolher uma porta.

Uma corrente oscila novamente. O foco da lanterna acompanha o movimento até o alto da plataforma.`,[]);
N('j_body','SALA DO GUINCHO · A DESCOBERTA','22:28','warehouse',`O feixe de luz alcança o braço industrial suspenso sobre a plataforma.

Moisés está preso ao conjunto de correntes e ao gancho de manutenção, elevado acima do chão. Seu corpo apresenta ferimentos profundos; o abdômen foi aberto e parte das vísceras está exposta. Sangue escorre pelo uniforme, pinga sobre a base metálica e se espalha pelo concreto.

Você demora a reconhecer o rapaz que tinha prometido contar a verdade. O rosto está imóvel, os olhos sem direção. A cena parece organizada para ser encontrada: não foi uma queda e não se parece com um acidente de trabalho.

Você: — Não... Meu Deus. MOISÉS!

Seu estômago se contrai. Por um instante, precisa encostar na parede para não cair. O telefone quase escapa da sua mão.

A última mensagem de Moisés surge na memória, cruel na sua simplicidade: «Se eu não atender, não vai embora sem conferir.»

Você pensa em Bella, na família Gomes e em todas as perguntas que talvez tenham morrido com ele.

Do corredor atrás de você vem um som seco: alguém acabou de bater uma porta de metal. O assassino pode ainda estar nas proximidades.`,[
 C('Fotografar a cena de longe e ligar para a polícia','j_evidence',[Q('c7_cena_guincho'),F('corpo_fotografado'),['trait','cautela',2]]),
 C('Recuar, pedir ajuda aos amigos e preservar o local','j_evidence',[F('local_preservado'),['trait','empatia',1]]),
 C('Procurar qualquer sinal de vida antes de se afastar','j_evidence',[F('tentou_socorrer_moises'),['trait','coragem',2]])]);
N('j_evidence','GALPÃO · ÚLTIMAS PROVAS','22:33','warehouse',`Você se afasta do equipamento e procura uma área iluminada, sem deixar de observar a porta por onde entrou. Qualquer prova naquela sala pode ser importante, mas tocá-la sem pensar também pode destruir marcas ou permitir que o assassino alcance você.

As mãos ainda tremem. Você tenta lembrar das instruções dadas pela policial no hospital: guardar horários, registrar o que viu, separar evidências de hipóteses.

Um armário de manutenção está ligeiramente aberto. Há uma cópia de um recibo amassado sob a bancada e marcas recentes num suporte para telefone. Moisés pode ter preparado parte daquilo antes da chegada do agressor. Ou alguém pode ter remexido a sala durante a luta.

Não dá para examinar tudo. O ruído de passos surge perto da passagem principal, e a luz pisca mais uma vez.

Você precisa escolher o que preservar primeiro, sem saber quanto tempo tem antes de fugir.`,[
 C('Verificar o armário e procurar os documentos','j_escape_setup',[F('prova_armario'),Q('c7_registros_pos_desaparecimento'),['trait','cautela',1]]),
 C('Procurar o telefone que Moisés tentou usar','j_escape_setup',[F('prova_telefone'),Q('c7_rastro_telefone')]),
 C('Não arriscar; registrar o local e recuar','j_escape_setup',[F('prova_local'),Q('c7_loc_guincho')])]);
// ATO VI — NÃO EXISTE SEGUNDO ASSASSINO INVENTADO PARA COBRIR DISTÂNCIAS.
N('j_escape_setup','COMPLEXO DA MARINA · SIRENES DISTANTES','22:42','warehouse',`Você deixa a sala de manutenção e percebe que as portas do complexo já não estão na mesma posição em que encontrou. Um portão está fechado; uma luz que antes brilhava no estacionamento se apagou. O barulho de passos metálicos volta do corredor principal.

Um amigo que veio investigar pode estar em outro acesso, seguindo o plano de observação. Você envia uma mensagem curta a quem realmente está na região: «Moisés foi atacado. Chamem a polícia. Vou procurar uma saída.»

Não há tempo para explicar o que viu. O teclado fica manchado quando você tenta escrever.

O mapa interno aponta três áreas: manutenção, estacionamento e corredor exterior. Nenhuma é inteiramente segura. A rota escolhida determina quem você poderá alcançar fisicamente e quais portas estarão entre vocês. Os amigos que não vieram continuam longe, sem saber mais do que receberam no telefone.

Uma porta bate atrás de você. Alguém está circulando pelo complexo, mas não existe prova de que seja outra pessoa mascarada. Pode ser o mesmo agressor usando os corredores de serviço. O terreno é grande; ele também precisa de tempo para se deslocar.

Você coloca o celular no bolso e escolhe o primeiro ponto de encontro.`,[
 C('Alcançar a área de manutenção para verificar os acessos','j_route1',[S('hero_pos','manutencao')]),
 C('Correr até a fileira de veículos no estacionamento','j_route1',[S('hero_pos','veiculos')]),
 C('Tentar encontrar a saída pelo corredor externo','j_route1',[S('hero_pos','externa')])]);
N('j_route1','COMPLEXO · PRIMEIRO DESLOCAMENTO','22:49','warehouse',`Você atravessa a passagem escolhida enquanto os alarmes de emergência começam a soar ao longe. Há portas fechadas, pontos sem iluminação e lugares onde uma única pessoa consegue passar por vez.

Você tenta atualizar as últimas posições dos amigos pelo celular, mas o sinal oscila. Não sabe se quem estava em outro corredor conseguiu avançar; terá de descobrir quando puder falar com a pessoa. Você recebe informações parciais — não uma visão mágica do que está acontecendo em todas as áreas. Algumas pessoas não têm sinal. Outras preferem se esconder a falar.

Você marca uma porta de referência na mensagem e espera alguns segundos por resposta. O som não atravessa todas aquelas paredes; será preciso encontrar o mesmo acesso para se reunir.

Você encosta a mão numa parede para recuperar o fôlego. Não consegue tirar a imagem de Moisés da cabeça. Quando uma sombra se move à frente, seu corpo reage antes que você saiba se é uma pessoa ou apenas um plástico solto.

A única certeza é que ainda não estão em segurança.`,[g('j_crisis1','Continuar pela passagem')]);
N('j_crisis1','COMPLEXO · PRIMEIRO MOMENTO DE RISCO','22:53','warehouse',`O barulho da corrente ecoa do outro lado da parede. Uma porta se fecha ao fundo e o caminho escolhido fica mais estreito. Você escuta um grito abafado na curva, sem ter certeza de que direção veio. Segue o caminho pelo qual entrou, conferindo a passagem à sua frente.

É necessário agir depressa.`,[]);
N('j_crisis1_safe','COMPLEXO · O PRIMEIRO BLOQUEIO','22:56','warehouse',`Você alcança a próxima porta e a segura aberta tempo suficiente para conferir o corredor. Uma caixa de ferramentas cai atrás de você, espalhando peças pelo chão. O mascarado aparece por um instante no acesso principal, mas a distância é suficiente para impedir que chegue até a porta antes que você a feche.

Seu coração dispara. Você recua e verifica o mapa de saída outra vez. Não dá para permanecer no mesmo local: o agressor conhece os caminhos e provavelmente consegue encontrar passagens que você ainda não viu.

A última comunicação dos amigos mostra que a polícia foi acionada ou está a caminho. A informação traz alívio, mas não dá um minuto exato para a chegada.

Você precisa seguir para outro ponto de encontro.`,[g('j_npc1','Avançar para a próxima área')]);
N('j_crisis1_help','ÁREA DE MANUTENÇÃO · A PORTA','22:56','warehouse',`Você retorna pelo corredor apesar dos passos cada vez mais próximos. Há um instante de pânico quando a porta parece presa dos dois lados, mas o mecanismo cede depois de um puxão e de uma pancada no metal.

Vocês conseguem atravessar juntos. A lâmina acerta a lateral de uma bancada no lugar em que uma mão estava segundos antes. O impacto lança faíscas pequenas, e o som acompanha vocês até a curva seguinte.

— NÃO PARA! — alguém grita.

Você obedece. Não fica tempo suficiente para saber se o agressor tropeçou ou desistiu. O corredor termina numa escada de serviço que leva a outro setor.

O amigo que você puxou pela passagem responde quando você chama seu nome. Não é uma vitória tranquila. É apenas mais uma chance de continuar vivo.`,[g('j_npc1','Seguir antes que o mascarado encontre a escada')]);
N('j_crisis1_cost','ÁREA DE MANUTENÇÃO · A PORTA FECHADA','22:57','warehouse',`Você tenta escolher entre alcançar a passagem e voltar para a pessoa que ficou para trás. O tempo desaparece numa sequência de ruídos: metal retorcido, um grito, uma batida seca contra a porta.

O mascarado alcança o corredor antes que você consiga abrir o bloqueio. Você vê um movimento brusco da lâmina e uma mancha de sangue espalhando-se sobre a parede. A porta volta a fechar com força.

Você grita, bate no metal e tenta puxar a maçaneta até machucar os dedos. Do outro lado, a voz que respondia ao seu chamado para de aparecer entre os ruídos.

Quando a passagem finalmente cede, já não há tempo de desfazer o que aconteceu. Você se obriga a recuar para não ficar preso na mesma armadilha.

A lembrança daquela escolha acompanhará você muito depois de conseguir sair do galpão.`,[g('j_npc1','Sair da passagem e tentar encontrar os outros')]);
N('j_move2','CORREDORES DE SERVIÇO · OUTRA SAÍDA','23:04','warehouse',`O corredor se divide perto de uma placa quebrada. Uma seta aponta para o estacionamento. Outra indica a saída dos funcionários, que contorna o pátio externo. Há marcas antigas de botas no piso, mas nenhuma recente o bastante para dizer por onde o mascarado passou.

Você verifica a posição das pessoas que realmente vieram com você. Um amigo em outro setor pode estar esperando uma resposta. Você se lembra de quem precisou de ajuda na passagem anterior e sente o peso daqueles nomes ao escolher outra saída.

Uma sirene distante corta a noite. Talvez seja a polícia; talvez seja uma ambulância seguindo para a marina. Você ainda não tem como saber.

O mais difícil é tomar outra decisão depois de ter acabado de sobreviver a uma. Seu corpo pede para parar. A mente tenta calcular portas, distâncias, vozes e quanto falta para a rua.

Você se obriga a continuar.`,[
 C('Ir até o corredor exterior, onde o muro encontra a saída dos funcionários','j_route2',[S('hero_pos','externa')]),
 C('Procurar outra pessoa pela manutenção, mesmo correndo risco de voltar','j_route2',[S('hero_pos','manutencao')]),
 C('Usar a passagem curta até o estacionamento','j_route2',[S('hero_pos','veiculos')])]);
N('j_route2','COMPLEXO · O SEGUNDO SETOR','23:10','road',`A passagem escolhida exige contornar uma porta de segurança. Você leva alguns minutos para alcançá-la, seguindo o sinal de um telefone e o som ocasional de uma voz ao longe. Os corredores não deixam ver de uma área para outra.

A chuva voltou. Sob as lâmpadas externas, as gotas parecem fios brancos atravessando o ar. No estacionamento, a água começa a cobrir as marcas no chão. Perto da saída dos funcionários, uma grade vibra com o vento.

Uma lona mexe no limite da iluminação, puxada pelo vento que atravessa a grade. Só consegue distinguir depois de se aproximar.

A próxima decisão não será sobre provas. Será sobre quem consegue continuar correndo e quem precisa de ajuda.`,[g('j_crisis2','Aproximar-se com cuidado')]);
N('j_crisis2','PÁTIO EXTERNO · SEGUNDO MOMENTO DE RISCO','23:13','road',`A luz de uma lanterna varre o muro. Um objeto cai de uma escada de manutenção, e o barulho anuncia que não há muito tempo antes que alguém chegue até vocês.

Você tenta ver quem está do outro lado da grade. O ar frio queima sua garganta.`,[]);
N('j_crisis2_help','PÁTIO EXTERNO · O RESGATE','23:16','road',`Você se abaixa junto à passagem e ajuda a mover o que impede o avanço. O esforço faz as mãos escorregarem no metal molhado. Há um segundo em que o mascarado aparece no fim do corredor e você quase abandona tudo.

Mas a passagem cede.

Você: — VEM! AGORA!

A pessoa consegue atravessar e se apoia em você antes de recuperar o equilíbrio. O agressor investe contra a grade, que vibra sob o impacto. Você corre sem olhar de novo.

Do lado de fora, a chuva encobre os gritos por alguns segundos. Não significa que estão seguros. Só significa que alcançaram o próximo acesso sem perder mais ninguém.`,[g('j_npc2','Seguir para o estacionamento')]);
N('j_crisis2_cost','PÁTIO EXTERNO · UMA ESCOLHA TARDE DEMAIS','23:16','road',`Você tenta alcançar a passagem, mas o caminho estreito impede que os dois se movam ao mesmo tempo. Uma pessoa fica presa entre a grade e o corredor. O mascarado se aproxima pelo lado que vocês não conseguem bloquear.

A lâmina aparece no intervalo entre os tubos de metal. O primeiro golpe atinge o ombro; outro segue antes que você consiga tirar a grade do lugar. O grito atravessa a chuva e se interrompe de maneira abrupta.

Você tenta puxar a estrutura mais uma vez, mas percebe que continuar ali entregará outra vida ao agressor.

O corpo fica do outro lado. Você se afasta cambaleando, com o nome do amigo preso na garganta. A chuva lava parte do sangue do piso, sem conseguir apagar a cena da sua memória.`,[g('j_npc2','Recuar antes que o mascarado alcance você')]);
N('j_crisis2_safe','PÁTIO EXTERNO · CHUVA SOBRE O CONCRETO','23:16','road',`Você alcança a grade e verifica que não há ninguém preso do outro lado. O som que ouviu veio de uma chapa solta, batendo numa estrutura de metal. A chapa balançando era a única coisa que se movia naquele trecho. Você aproveita para seguir.

O mascarado aparece no extremo oposto do pátio. Você corre pelo acesso externo, usando a curva do muro para quebrar a linha de visão. O corredor conduz à saída dos veículos, onde há mais iluminação e a possibilidade de encontrar a polícia.

Seu telefone vibra: uma mensagem curta confirma que a viatura enviada ao bairro está a caminho. Você não sabe se chegará a tempo de impedir outro ataque. Não pode parar para descobrir.`,[g('j_npc2','Correr para a última saída')]);
N('j_move3','ESTACIONAMENTO · PORTÃO PRINCIPAL','23:23','road',`As faixas amarelas do estacionamento estão quase apagadas. Há carros abandonados de manutenção, uma caminhonete com o capô aberto e uma cancela que deveria permitir a passagem para a rua. Você encontra o portão quase fechado e percebe que será necessário acionar o mecanismo manual.

Os passos que se aproximam vêm do lado do galpão. Uma pessoa mascarada emerge por uma passagem entre os depósitos. Está molhada pela chuva, mas continua carregando a mesma lâmina. Não há sinal de outro agressor; é possível que tenha feito o trajeto pelos corredores paralelos enquanto vocês procuravam a saída.

Uma viatura acende as luzes do outro lado do quarteirão. Os policiais ainda precisam alcançar o portão. O tempo até a chegada deles parece maior do que deveria.

Você tenta manter a calma, mas a memória do corpo de Moisés e dos possíveis amigos feridos volta de uma só vez. Não consegue atravessar sem ouvir o som do mecanismo. Ajusta a mão na alavanca e procura uma abertura para os amigos que continuam próximos.`,[g('j_crisis3','Organizar a travessia do último bloqueio')]);
N('j_crisis3','ESTACIONAMENTO · ÚLTIMO MOMENTO DE RISCO','23:26','road',`O mecanismo do portão emperra. As luzes de emergência piscam, e o mascarado atravessa a fileira de carros em direção à saída.

Você precisa escolher imediatamente como agir.`,[]);
N('j_crisis3_help','ESTACIONAMENTO · A ÚLTIMA FUGA','23:30','road',`Você usa o espaço entre os veículos para alcançar o mecanismo da cancela. O metal raspa no chão quando finalmente se move. Alguém grita seu nome e você estende o braço antes de pensar se vai conseguir segurar o peso.

Os dois atravessam o vão enquanto o mascarado se aproxima. A lâmina acerta a borda de uma porta de carro, perto demais de suas costas. Você tropeça na calçada e quase cai, mas sente uma mão agarrar sua jaqueta.

Luzes azuis e vermelhas iluminam o asfalto. Uma voz de policial exige que todos se afastem do portão. O mascarado recua para dentro da oficina e desaparece por um corredor lateral antes que as viaturas possam fechar o acesso.

Você está vivo. A pessoa que ajudou também. Não parece uma vitória; parece apenas uma dívida com a sorte e com o esforço desesperado de continuar correndo.`,[g('j_npc3','Alcançar os policiais e pedir socorro')]);
N('j_crisis3_cost','ESTACIONAMENTO · DIANTE DAS VIATURAS','23:30','road',`O portão abre apenas o suficiente para uma pessoa passar. O mascarado surge na passagem entre os carros e força uma escolha que você não consegue adiar. Há um empurrão, um choque de metal, o som de alguém caindo junto à cancela.

Você tenta voltar, mas a lâmina encontra primeiro a pessoa que ficou bloqueando a passagem. O golpe a atinge profundamente, e o sangue escorre pela guia de concreto. Um segundo ataque interrompe a tentativa de se levantar.

As sirenes se aproximam. Um policial grita para que você recue. Você se vê forçado a atravessar o portão sem conseguir trazer todos.

Quando os agentes alcançam a entrada, o agressor já desapareceu por uma rota de manutenção. Você tenta explicar o que aconteceu, mas o nome da pessoa perdida sai apenas depois da terceira tentativa.

A noite não termina no instante em que as viaturas chegam. Para você, parte dela ficará presa para sempre naquela cancela.`,[g('j_npc3','Contar aos policiais quem ficou para trás')]);
N('j_crisis3_safe','ESTACIONAMENTO · A CANCELA','23:30','road',`Você corre entre dois veículos e alcança o mecanismo manual do portão. A estrutura resiste, depois cede com um estalo. Do outro lado, uma viatura se aproxima com os faróis acesos.

Não há outro amigo preso na passagem. Você consegue sair sem precisar deixar alguém para trás. Ainda assim, o mascarado chega perto o bastante para fazer a lâmina riscar a lataria de um carro a poucos centímetros de você.

O policial aponta para a rua e exige que você corra. Quando olha para trás, vê a figura recuando para os depósitos, aproveitando os corredores que a polícia ainda não cercou.

Você se agacha na calçada, tentando respirar. O mundo cheira a chuva, gasolina e sangue. Os sons do galpão começam a parecer distantes, como se pertencessem a outra noite.`,[g('j_npc3','Pedir aos policiais que verifiquem todo o complexo')]);
N('j_police','RUA DA OFICINA · RESGATE','23:37','road',`Uma policial se agacha diante de você. Pergunta se está ferido, se consegue dizer seu nome completo e quantas pessoas entraram no complexo. Você responde uma pergunta por vez, sem inventar posições de quem não viu.

Outras viaturas cercam os depósitos. Um paramédico prepara uma maca, e o rádio confirma que encontraram sinais de luta na sala do guincho. Você tenta contar o que aconteceu com Moisés, mas a garganta se fecha quando precisa descrever o que viu.

Os nomes dos amigos que vieram com você são conferidos com os próprios presentes e com as mensagens recebidas. A equipe confere as últimas posições informadas e organiza buscas nas passagens que ainda não foram verificadas.

Uma agente recolhe seu depoimento e registra quais objetos você preservou. Explica que poderão ser examinados com mais cuidado, mas não promete que qualquer arquivo contenha a verdade inteira.

Lá dentro, a pessoa mascarada escapou. A polícia bloqueia a entrada principal e começa a procurar rotas de serviço, mas os corredores antigos levam a saídas que ainda precisam ser verificadas.

Seu telefone vibra. Bella escreveu perguntando se Moisés chegou a conversar com você. Você encara a mensagem durante vários segundos antes de conseguir responder.`,[
 C('Contar a Bella que Moisés morreu e pedir que venha acompanhada','j_last_01',[F('bella_informada'),['trait','empatia',2]]),
 C('Pedir que a polícia informe Bella pessoalmente, sem esconder a morte','j_last_01',[F('bella_policia'),['trait','cautela',2]]),
 C('Pedir primeiro uma confirmação dos nomes de todos os sobreviventes','j_last_01',[F('confirmou_sobreviventes'),['trait','empatia',1]])]);

// ATO VII — REUNIÃO FINAL. Só reúnem-se os vivos; feridos que não podem viajar entram por chamada.
N('j_last_01','HOSPITAL DE LAKEWOOD · MADRUGADA','00:17','town',`A polícia organiza a chegada dos sobreviventes a uma sala reservada do hospital. Quem precisa receber atendimento permanece na observação; quem consegue caminhar vai até a sala de espera. Pessoas que estavam longe da oficina chegam depois de receberem notícia, não antes.

Uma funcionária oferece água, lenços e uma extensão para carregar os celulares. Uma televisão exibe imagens da região da marina, mas ninguém consegue assistir durante muito tempo. Alguns amigos preferem olhar para a parede. Outros tentam falar e param no meio da frase.

O nome de Moisés surge numa conversa baixa. O rapaz que ligou prometendo finalmente contar a verdade foi encontrado morto. Você pensa no envelope, na voz desesperada ao telefone, no que conseguiu preservar e no que desapareceu.

Bella chega acompanhada de uma pessoa da equipe do hospital. Sua expressão muda quando percebe que vocês não estão aguardando uma simples conversa. Ela pergunta por Moisés, uma vez, e depois novamente, como se a primeira resposta tivesse sido dada na língua errada.

Há amigos que perderam pessoas durante o ataque ao apartamento. Outros acabaram de testemunhar novas mortes na oficina. Não são as mesmas pessoas que sentaram à mesa um dia antes; ainda assim, todos tentam permanecer perto.

Você percebe que este não é o momento de dar um discurso. Primeiro, precisam ouvir quem está ferido, quem conseguiu sair e o que realmente aconteceu.`,[g('j_last_02','Conferir as notícias e reunir quem pode estar presente')]);
N('j_last_02','HOSPITAL · QUEM SOBROU','00:36','town',`Quando o último telefonema termina, os presentes conseguem reunir informações suficientes para distinguir boatos de confirmações. As pessoas que morreram nos ataques não entram pela porta para oferecer alívio ao grupo. Seus lugares ficam vazios, e ninguém encontra palavras capazes de preenchê-los.

Samuel quer saber quem contou sobre o encontro. Isabella, caso esteja ali, pede que ninguém comece a acusar pessoas antes de comparar horários. Ryan tenta manter uma cadeira livre para quem ainda estiver sendo atendido. Laisla procura o rosto de Rauanny quando ouve algum ruído no corredor. Cada gesto pertence apenas a quem sobreviveu e está realmente presente.

Bella: — Se vocês sabiam que Moisés ia falar, por que ninguém achou isso suspeito antes?

Você explica o que ouviu, sem fingir que conseguiu descobrir tudo. Parte da verdade pode ter ficado no galpão. Parte pode estar no telefone antigo ou nas cópias que Moisés tentou guardar.

O grupo fica em silêncio. Um telefone vibra sobre a mesa. Logo depois, outro aparelho acende com a mesma notificação.

O número não está salvo.

Você abre a conversa.`,[g('j_last_03','Ler a mensagem desconhecida')]);
N('j_last_03','HOSPITAL · BOA NOITE, TRAIDORES','00:41','phone',`NÚMERO DESCONHECIDO: — Vocês passaram um ano escondendo um segredo.

Uma segunda mensagem aparece.

NÚMERO DESCONHECIDO: — O problema é que vocês nunca pararam pra pensar que, às vezes, pode ter um traidor entre vocês.

Você levanta os olhos para o grupo.

Ninguém parece confortável. Pessoas que costumavam sentar lado a lado deixam de sustentar o olhar por mais de alguns segundos. Alguém bloqueia o próprio celular; outra pessoa pede para ver o horário em que a mensagem chegou.

Você se lembra da discussão da tarde e de como era fácil desconfiar de um desconhecido. Agora a suspeita tem rostos, vozes e lembranças. O pior é que nenhum deles precisa estar mentindo para ter medo.

O aparelho vibra pela terceira vez.

NÚMERO DESCONHECIDO: — Boa noite, traidores.

O silêncio que se segue parece mais alto que as sirenes da rua. Você olha para os amigos que conseguiu reunir e percebe que a próxima decisão talvez não seja sobre sair de um lugar perigoso. Talvez seja sobre escolher em quem ainda acredita.`,[
 C('Olhar primeiro para quem tentou acalmar as discussões','j_fim',[F('desconfiou_mediadores'),['trait','cautela',1]]),
 C('Olhar para quem conhecia o endereço de Moisés','j_fim',[F('desconfiou_informados'),['trait','cautela',2]]),
 C('Baixar o celular e pedir que ninguém acuse alguém hoje','j_fim',[F('defendeu_uniao'),['trait','empatia',2]])]);
N('j_fim','LAKEWOOD · FIM DO CAPÍTULO','00:47','lake',`FIM DO CAPÍTULO 7 — A NOITE DOS TRAIDORES.

Você passou um dia tentando encontrar conforto nos amigos e descobriu que a proximidade não protege ninguém da dúvida. Uma conversa íntima trouxe à tona sonhos e medos que não pertencem ao caso de Jullia Gomes. Uma noite que poderia ter sido normal foi interrompida pelo pedido de ajuda de Moisés.

Na oficina, o ex-namorado de Jullia tentou preservar uma verdade que guardava há tempo demais. Ele morreu antes que pudesse explicá-la. O que você conseguiu salvar será importante quando as próximas perguntas surgirem.

A fuga exigiu decisões reais: quem estava presente, quem precisou de ajuda, quem encontrou uma saída e quem não conseguiu continuar. As feridas e perdas não desaparecem no encerramento.

De volta ao hospital, a mensagem anônima mudou a direção do medo. A máscara continua sem rosto. Mas agora o grupo começou a se perguntar se o perigo também conhece os próprios nomes.

CONTINUA NO CAPÍTULO 8.`,[]);
// Cenas de contingência e ferramentas de montagem dinâmica.
N('j03_none','HOSPITAL · UM LUGAR PARA RESPIRAR','13:24','town',`Você tenta marcar um encontro com alguém, mas as pessoas que poderiam conversar hoje ainda precisam de repouso ou de cuidados médicos. Em vez de pressioná-las, senta numa sala silenciosa do hospital e escreve algumas linhas no próprio celular.

Pensa nas coisas que ainda gostaria de viver. No tipo de pessoa que quer ser quando não precisar escolher entre uma porta trancada e um amigo em perigo. Não precisa responder tudo hoje.

Guarda uma lembrança de quem não pôde estar à mesa: uma frase, uma risada, um pedido de desculpas que ainda quer oferecer. Depois promete a si mesmo que, se alguém quiser conversar amanhã, vai reservar tempo.

O telefone vibra. Bella conseguiu os documentos da propriedade e está esperando na biblioteca.`,[g('j10','Encontrar Bella na biblioteca')]);
N('j20','LAKEWOOD · UM CONVITE À NOITE','18:44','town',`A noite começa a cair. Você tenta acreditar que ainda pode haver um momento de tranquilidade depois de tudo o que aconteceu.

A mensagem de Moisés continua guardada. Ele pediu uma conversa reservada, mas não disse quando ligaria de novo. Enquanto espera, decide ao menos jantar.

Você confere as notificações e decide aproveitar algumas horas longe das sirenes antes de responder a Moisés.`,[]);


// Cada personagem tem perigo, voz e decisões próprias. O setor decorre de c7_pos,
// não do nome do alvo; os textos só usam um cenário se ele estiver naquele setor.
const SIDE_PROFILES={
 breno:{
  name:'Breno',where:'manutencao',spot:'sala das bombas hidráulicas',
  intro:'Breno segura o celular com a tela virada para baixo, tentando usar o brilho como reflexo. Uma mangueira de ar comprimido serpenteia entre as bancadas. A porta corta-fogo fechou atrás dele; adiante, o compressor volta a funcionar sozinho.',
  line:'Breno: — Eu vi alguém mexer no registro. Tem ar passando aqui e eu não sei se essa tubulação aguenta.',
  plans:[
   ['Examinar o registro de pressão e procurar a válvula de alívio','Breno identifica um manômetro rachado e memoriza qual válvula desliga o compressor. A porta à esquerda vibra com a pressão.'],
   ['Usar o reflexo da tela para observar quem está atrás da bancada','No reflexo do telefone, ele vê uma sombra atravessar a janela da cabine. A posição da sombra indica uma passagem livre perto dos arquivos.'],
   ['Subir ao estrado de manutenção para alcançar a escotilha','Breno alcança o estrado, mas o piso metálico range. Ele fica acima do compressor, sem espaço para correr caso alguém suba atrás.']
  ],
  dilemma:'Uma mangueira se solta com um estalo e bate contra uma prateleira. Breno vê o mascarado entrar pela porta da oficina. Restam poucos segundos antes que a válvula seja alcançada.',
  actions:['Desligar o compressor e passar por baixo da bancada','Contornar a cabine usando os reflexos do vidro','Pular para a escotilha antes que o mascarado chegue'],
  safe:'Breno fecha a válvula, usa a queda da pressão para abrir a porta de inspeção e se esgueira para a saída. Um jato de ar atinge a máscara atrás dele, impedindo a aproximação.\n\nBreno: — Eu tô bem. Eu consegui. Só... preciso sentar quando sair daqui.',
  hurt:'A mangueira estoura quando Breno passa. Um fragmento corta seu antebraço e ele cai sobre a bancada, mas alcança o corredor de inspeção antes do próximo ataque.\n\nBreno: — Droga... tá sangrando. Eu consigo andar. Só não me pede pra correr mais rápido.',
  cost:'Breno salta sem verificar a escotilha. O metal cede e o prende junto ao compressor. O mascarado alcança a plataforma antes que ele consiga soltar a perna.\n\nBreno: — NÃO! ESPERA!\n\nO som do compressor encobre seu último grito.'},
 samuel:{
  name:'Samuel',where:'veiculos',spot:'garagem dos guinchos',
  intro:'Samuel alcança uma caminhonete de reboque com a chave ainda no contato. O painel acende, mas o motor falha. Uma corrente de tração atravessa o chão, presa a uma roda de serviço. A lembrança da van na estrada o atinge quando sente o cheiro de combustível.',
  line:'Samuel: — Eu sei dirigir essa porcaria. O problema é que tem alguém fechando o portão pelo controle.',
  plans:[
   ['Conferir o freio do reboque e a alavanca de emergência','Samuel localiza a trava manual do reboque. A roda está solta, mas o freio pode segurá-la por alguns segundos.'],
   ['Acender os faróis para localizar o controle do portão','A luz revela a caixa elétrica perto da guarita e projeta a sombra de alguém junto à cancela. Samuel percebe uma passagem estreita entre dois veículos.'],
   ['Pisar fundo e tentar atravessar a cancela com a caminhonete','A caminhonete avança alguns metros e morre. Samuel se vê parado diante de uma cancela reforçada, com o motor abafando os passos atrás dele.']
  ],
  dilemma:'Um carro de manutenção dispara o alarme. O mascarado passa entre dois veículos, aproximando-se da caminhonete. A corrente do reboque começa a arrastar no concreto.',
  actions:['Soltar o freio e usar o reboque como bloqueio','Alcançar a caixa de controle pela lateral iluminada','Engatar a caminhonete e acelerar sem conferir o portão'],
  safe:'Samuel libera a trava no momento certo. O reboque desliza o bastante para bloquear a passagem do mascarado, e ele alcança a calçada lateral.\n\nSamuel: — Hoje não. Eu não vou deixar outro carro acabar com alguém.',
  hurt:'Uma corrente chicoteia quando Samuel passa perto da roda. O golpe abre um corte em sua mão e ele perde a chave no chão. Consegue saltar a mureta, mas o sangue marca o cimento.\n\nSamuel: — Minha mão... porra. Eu consigo segurar, só não deixa ele vir.',
  cost:'Samuel acelera contra a cancela sem notar a corrente atravessada no chão. O eixo trava; ele bate a cabeça contra o volante. Antes que consiga abrir a porta, o mascarado alcança a cabine.\n\nSamuel: — NÃO, NÃO! ABRE ESSA PORTA!\n\nO vidro estilhaça quando a figura ergue a arma.'},
 allan:{
  name:'Allan',where:'manutencao',spot:'depósito de arquivos de manutenção',
  intro:'Allan entra no depósito de peças procurando uma porta que dê ao pátio. Pastas úmidas ocupam uma estante até o teto. Um carrinho de ferramentas bloqueia metade da saída, e o rádio portátil ainda toca uma estação cheia de chiado.',
  line:'Allan: — Se eu sair daqui, nunca mais reclamo que vocês fazem bagunça. É sério, olha esse inferno de armário.',
  plans:[
   ['Empurrar o carrinho para liberar a porta de inspeção','Allan desloca o carrinho apenas o suficiente para descobrir um corredor estreito. Anota que a roda pode emperrar quando for puxada.'],
   ['Desligar o rádio e ouvir os passos atrás das estantes','O chiado desaparece. Allan distingue o barulho de botas no piso molhado e percebe que o mascarado vem pela porta principal, não pelo corredor lateral.'],
   ['Subir pela estante e tentar alcançar o vitrô','A estante range sob seu peso. Allan chega perto do vitrô, mas uma das prateleiras começa a desprender-se da parede.']
  ],
  dilemma:'As pastas caem de uma prateleira. A pessoa mascarada entra e fecha a porta principal. Allan reconhece que só tem tempo de usar uma das saídas.',
  actions:['Empurrar o carrinho para travar a entrada e usar a inspeção','Apagar a luz, seguir os passos e escapar pelo corredor lateral','Saltar para o vitrô antes que a estante tombe'],
  safe:'Allan empurra o carrinho contra a porta na hora em que o mascarado tenta passar. A roda prende o batente e ele consegue alcançar o corredor de inspeção.\n\nAllan: — Samuel vai me ouvir contar essa história por uns vinte anos. Se eu sair daqui, claro.',
  hurt:'A prateleira se rompe e raspa suas costas. Allan se joga atrás de uma mesa e alcança o corredor lateral mancando, pressionando o ferimento.\n\nAllan: — Ai! Tá, tá... eu tô vivo. O próximo arquivo que eu abrir vai ser na internet.',
  cost:'A estante perde apoio quando Allan se lança para o vitrô. Ele cai entre as caixas e fica preso sob a estrutura. O mascarado chega antes que consiga liberar os ombros.\n\nAllan: — SAMUEL! ALGUÉM!\n\nA voz se perde no depósito fechado.'},
 isabella:{
  name:'Isabella',where:'manutencao',spot:'cabine de controle elétrico',
  intro:'Isabella encontra uma sala com um quadro de energia antigo. Dois disjuntores estão identificados à mão e um deles alimenta a trava da porta externa. Um fio descascado encosta numa poça de água. A luz de emergência oscila.',
  line:'Isabella: — Isso aqui não é complicado. É perigoso. São coisas diferentes. Preciso saber qual circuito ainda funciona.',
  plans:[
   ['Isolar a poça e identificar o disjuntor da porta','Isabella usa uma caixa plástica para atravessar a área molhada e anota a posição do interruptor correto.'],
   ['Abrir o armário de plantas e localizar o cabo da sirene','No diagrama, ela encontra a fiação do alarme e vê que ele pode chamar atenção para a outra extremidade da cabine.'],
   ['Puxar os dois disjuntores de uma vez para apagar as luzes','A iluminação morre por um instante. Isabella percebe tarde demais que também cortou a ventilação e o desbloqueio da saída.']
  ],
  dilemma:'Um estalo percorre o quadro. A trava elétrica começa a fechar enquanto uma sombra surge pelo vidro fosco. Isabella precisa escolher sem tocar no fio exposto.',
  actions:['Desarmar só o circuito da trava e recuar pela plataforma seca','Ligar a sirene e cruzar atrás do armário de plantas','Atravessar a poça correndo para a porta escura'],
  safe:'Isabella mantém os pés sobre a plataforma de borracha e desliga apenas o circuito da porta. A trava solta com um clique. Ela passa e prende a maçaneta do outro lado.\n\nIsabella: — Eu disse que tinha um circuito separado. Agora corre, Isa.',
  hurt:'Uma faísca salta do painel ao lado de Isabella. Ela protege o rosto, mas o braço bate contra uma quina de metal. Alcança a saída com a mão dormente.\n\nIsabella: — Eu tô saindo. Isso não quer dizer que eu esteja bem.',
  cost:'Isabella tenta cruzar o piso inundado no escuro. Um choque a derruba perto da maçaneta. O mascarado a encontra antes que ela consiga se levantar.\n\nIsabella: — NÃO ENCOSTA EM MIM!\n\nA porta se fecha sobre o resto da luta.'},
 ryan:{
  name:'Ryan',where:'veiculos',spot:'guarita do estacionamento',
  intro:'Ryan está na guarita, cercado por monitores apagados. O portão automatizado trava a rua e um armário guarda uma sinalização refletiva de emergência. Um vidro lateral rachado oferece vista para a fila de carros.',
  line:'Ryan: — O portão tá descendo sozinho. E eu tenho quase certeza de que não foi o vento que apertou esse botão.',
  plans:[
   ['Localizar a manivela manual do portão','Ryan encontra a manivela sob a mesa do vigia. O encaixe está enferrujado, mas a cancela pode subir sem eletricidade.'],
   ['Usar os monitores desligados para observar o reflexo da rua','Ryan vê uma figura se movendo entre os carros refletidos na tela preta. Identifica a saída lateral e a direção de onde virá o ataque.'],
   ['Passar pelo vidro rachado antes que o portão desça','Ryan empurra a janela, mas o vidro corta a manga e estala. O movimento denuncia sua posição dentro da guarita.']
  ],
  dilemma:'A cancela bate no limite inferior com um estrondo. O mascarado aparece entre os faróis apagados e força a porta da guarita. Ryan precisa deixar a sala antes que o vidro ceda.',
  actions:['Usar a manivela para abrir espaço sob a cancela','Apagar a luz da guarita e seguir pela saída lateral','Sair pela janela rachada sem olhar o estacionamento'],
  safe:'Ryan encaixa a manivela e força até abrir espaço para passar rastejando. Quando o mascarado entra na guarita, ele já está atrás do pilar de concreto.\n\nRyan: — CONSEGUI! Tá, Ryan, agora não inventa de comemorar.',
  hurt:'O vidro da guarita se parte quando Ryan tenta alcançar a saída lateral. Os cacos cortam seu antebraço; ele rola sob a cancela e escapa deixando a manga encharcada.\n\nRyan: — Ai, caralho... tá doendo. Mas eu passei!',
  cost:'Ryan salta pela janela sem perceber a grade de proteção do outro lado. A estrutura o prende contra a guarita enquanto a porta se abre atrás dele.\n\nRyan: — NÃO! TIRA ISSO!\n\nO mascarado ergue a lâmina antes que Ryan consiga soltar o casaco.'},
 rayssa:{
  name:'Rayssa',where:'veiculos',spot:'cabine de registro de entradas',
  intro:'Rayssa encontra uma cabine onde motoristas assinavam entregas. Um rolo de papel do relógio de ponto está espalhado pelo chão. A porta que dá ao estacionamento abre para dentro, mas uma barra de segurança a impede de voltar.',
  line:'Rayssa: — Tem um livro de entradas aqui. Eu posso tentar guardar uma página, mas a porta tá emperrando.',
  plans:[
   ['Soltar a barra e estudar a fechadura antes de sair','Rayssa consegue afastar a barra do trinco e identifica um acesso estreito à área de lavagem.'],
   ['Usar o vidro da cabine para observar o pátio','Do reflexo, Rayssa vê uma passagem por trás da caminhonete e calcula quando os faróis de uma viatura iluminariam a área.'],
   ['Puxar a persiana com força e sair pela janela','A persiana enrosca e faz barulho. Rayssa fica com um pé no parapeito e sem poder fechar a cabine atrás de si.']
  ],
  dilemma:'O relógio de ponto cai da parede. Uma silhueta atravessa as vagas mais próximas e a maçaneta da cabine gira. Rayssa segura a respiração por um segundo.',
  actions:['Passar pela fechadura destravada e alcançar a lavagem','Usar a caminhonete para cobrir a passagem pelo pátio','Descer pela janela sem verificar a altura do parapeito'],
  safe:'Rayssa mantém a porta entre si e a pessoa mascarada até alcançar a área de lavagem. Fecha a grade de serviço e segue para a rua, com o papel dobrado no bolso.\n\nRayssa: — Tá tudo bem... só preciso chegar até eles.',
  hurt:'A persiana arrebenta quando Rayssa desce. A borda metálica corta sua mão e ela cai de joelhos no pátio. Consegue alcançar a rua antes que a sombra chegue à cabine.\n\nRayssa: — Minha mão... não para agora. Levanta.',
  cost:'Rayssa desce pelo parapeito sem perceber a porta de grade travada abaixo. Fica encurralada entre a cabine e a saída fechada. O mascarado chega antes que consiga encontrar outra passagem.\n\nRayssa: — NÃO! POR FAVOR!\n\nO relógio de ponto continua apitando do outro lado do vidro.'},
 laisla:{
  name:'Laisla',where:'externa',spot:'passarela sobre a doca',
  intro:'Laisla está na passarela de serviço que contorna o pátio. A chuva deixa o corrimão escorregadio. Uma escada dobrável foi deixada sobre uma caixa de ferramentas, e a porta da doca está presa por uma corrente.',
  line:'Laisla: — Eu não vou ficar parada nesse negócio balançando. Preciso abrir um caminho antes que ele olhe pra cima.',
  plans:[
   ['Examinar os parafusos do corrimão e preparar a escada','Laisla percebe que o primeiro degrau da escada está torto. Apoia a base contra a parede firme e encontra um ponto para descer.'],
   ['Ouvir o eco sob a passarela para localizar quem se aproxima','Ela distingue passos vindo da área dos contêineres, não da doca. Identifica um instante de silêncio para cruzar o vão.'],
   ['Saltar direto para a cobertura da doca sem testar o piso','A cobertura cede um pouco sob seu peso. Laisla fica de joelhos sobre uma chapa molhada e não consegue voltar facilmente.']
  ],
  dilemma:'Um refletor ilumina a passarela. O mascarado atravessa o pátio e começa a subir a escada fixa. Laisla tem de deixar o corrimão antes que a pessoa a alcance.',
  actions:['Usar a escada apoiada e descer pela parede externa','Esperar o reflexo apagar e atravessar até a porta da doca','Saltar pela cobertura enferrujada sem testar as chapas'],
  safe:'Laisla desce pela escada apoiada, prende a corrente do lado de fora e alcança a rua pelo acesso da doca. A pessoa mascarada chega à passarela tarde demais.\n\nLaisla: — Eu odeio altura. Eu odeio esse lugar. E vou reclamar dos dois quando sair daqui.',
  hurt:'A escada desliza e Laisla bate a perna na borda de uma chapa. Ela se agarra ao corrimão e alcança a porta da doca mancando.\n\nLaisla: — Ai! Tá, respira. Eu consigo chegar lá.',
  cost:'Laisla salta sobre uma chapa enferrujada. O metal desaba e ela fica presa entre os suportes. O mascarado chega pela escada antes que consiga se soltar.\n\nLaisla: — SAI! ME SOLTA!\n\nO som da chuva engole o último pedido.'},
 rauanny:{
  name:'Rauanny',where:'externa',spot:'passagem do canal de drenagem',
  intro:'Rauanny corre ao longo de uma cerca enferrujada ao lado do canal. A água da chuva sobe pelos tornozelos. Uma trava mantém fechada a portinhola de saída, enquanto o caminho ao lado do muro termina num bueiro aberto.',
  line:'Rauanny: — Se eu tiver que voltar pra trás dessa cerca, pode apostar que eu vou arrancar essa merda do chão.',
  plans:[
   ['Verificar a trava da portinhola e apoiar o pé no muro','Rauanny encontra um ferrolho por dentro da grade e um bloco seco onde pode ganhar apoio sem entrar no canal.'],
   ['Observar a correnteza para localizar a passagem rasa','Ela identifica uma faixa de concreto acima da água e marca mentalmente a rota até a portinhola.'],
   ['Correr pelo canal alagado para cortar caminho','Rauanny entra na água e sente o piso afundar perto do bueiro. O barulho dos passos denuncia o caminho que escolheu.']
  ],
  dilemma:'Um ruído metálico vem do alto do muro. O mascarado aparece na passagem de serviço, cortando o retorno. A água bate mais forte contra o concreto.',
  actions:['Levantar o ferrolho e passar pelo bloco seco','Acompanhar a faixa rasa antes que a corrente aumente','Saltar sobre o bueiro sem enxergar o outro lado'],
  safe:'Rauanny ergue o ferrolho com as duas mãos, usa o bloco seco e cai do lado seguro da cerca. O mascarado tenta segui-la, mas a portinhola bate contra o muro.\n\nRauanny: — VEM AGORA, FILHO DA PUTA! Não... melhor não. Eu tô saindo daqui.',
  hurt:'A água encobre um degrau. Rauanny escorrega e torce a perna ao alcançar a cerca. Consegue passar pela portinhola, mas precisa apoiar-se no muro para continuar.\n\nRauanny: — Minha perna! Droga... não vou ficar aqui.',
  cost:'Rauanny pula sem ver a abertura do bueiro. Sua perna fica presa na grade sob a água. O mascarado desce a passagem antes que ela consiga se soltar.\n\nRauanny: — NÃO! EU NÃO VOU MORRER AQUI!\n\nO grito ecoa pelo canal vazio.'}
};
const SIDE_SAFE_ALT={
 breno:'Breno acompanha o reflexo da janela do compressor e desliza até o corredor de arquivos no instante em que a sombra cruza a cabine. A porta se fecha antes que a pessoa mascarada alcance a bancada.\n\nBreno: — Eu consegui ver por onde ele vinha. Foi por pouco.',
 samuel:'Samuel corre pelo acesso revelado pelos faróis e alcança a caixa de controle da cancela. Derruba a chave de segurança e a trava sobe o suficiente para escapar.\n\nSamuel: — Essa máquina nunca mais vai decidir pra onde eu vou.',
 allan:'Allan desliga o rádio e apaga a lâmpada de leitura. Quando os passos chegam perto da estante, ele contorna a mesa pelo corredor lateral e empurra a porta antes que o mascarado possa segui-lo.\n\nAllan: — Tá. Deu certo. Sem comemorar alto, pelo amor de Deus.',
 isabella:'Isabella alcança o fio indicado na planta e aciona a sirene. O alarme atrai a sombra para a extremidade oposta enquanto ela atravessa o corredor seco atrás do armário.\n\nIsabella: — Se essa pessoa quer saber onde eu tô, vai ter que olhar direito.',
 ryan:'Ryan apaga o foco da guarita e espera a sombra se aproximar da porta principal. Sai pela passagem lateral identificada no reflexo do monitor e se esconde atrás de um pilar enquanto o mascarado vasculha a sala vazia.\n\nRyan: — Nunca achei que tela desligada ia salvar a minha vida.',
 rayssa:'Rayssa usa o reflexo do vidro para atravessar atrás da caminhonete no momento em que a viatura ilumina o pátio. Alcança a saída sem expor o rosto ao mascarado e guarda a página de registros no bolso.\n\nRayssa: — Só mais alguns passos. Não olha pra trás.',
 laisla:'Laisla espera a luz do refletor passar e cruza a passarela em direção à doca no intervalo de escuridão. Fecha a porta lateral atrás de si antes que os passos alcancem a escada.\n\nLaisla: — Certo. Nunca mais piso numa passarela dessas.',
 rauanny:'Rauanny mantém os pés sobre a faixa rasa que identificou na correnteza e chega ao lado de dentro da portinhola. Um puxão no ferrolho libera a grade e ela passa antes que o mascarado atravesse o muro.\n\nRauanny: — Caralho... eu quase fui arrastada. Mas saí.'
};
const SIDE_VOICES={
 breno:'Espera. Se a luz apagar de novo, a gente perde essa porta de vista.',
 samuel:'Não volto por onde a gente veio. Essa entrada já tá comprometida.',
 allan:'Tá bom, ótimo, três saídas horríveis. Qual delas tem menos chance de me matar?',
 isabella:'Confere o mapa antes de correr. A gente não sabe se o corredor termina aberto.',
 ryan:'Eu fico com você. Só aponta o caminho antes que esse maluco apareça.',
 rayssa:'Tem uma saída ao lado dos carros. Podemos chegar lá sem cruzar o galpão.',
 rauanny:'A gente não vai ficar esperando aqui. Se tiver que correr, corre agora.',
 laisla:'Cuidado com aquela chapa. Tá solta e eu não quero perder ninguém nessa escada.'
};
const SIDE_COVER={
 breno:'Eu fico aqui e vigio pelo reflexo da janela. Vai.',samuel:'Vai na frente. Se ele aparecer eu bato a porta.',allan:'Certo. Eu olho o corredor, mas não demora, por favor.',isabella:'Eu fico de olho na trava e aviso se ela mexer.',ryan:'Eu cubro a passagem. Me grita se ficar preso.',rayssa:'Eu seguro essa porta. Não olha pra trás ainda.',rauanny:'Vai logo! Eu vejo se ele sobe por aqui.',laisla:'Eu seguro a grade. Não põe a mão naquela borda.'
};
const SIDE_TIMES={1:['22:59','23:00','23:02'],2:['23:17','23:18','23:19'],3:['23:32','23:33','23:34']};
const SIDE_WAYS=['a','b','c'];
const SIDE_OUTCOMES=[['safe','hurt','cost'],['hurt','safe','cost'],['safe','cost','cost']];
const sideNext=part=>part===1?'j_move2':part===2?'j_move3':'j_police';
const sideName=(s,id)=>L[id]||'o personagem';
const sideText=(text)=>String(text||'').replaceAll('\\n','\n');

// Perspectivas dos outros núcleos: duas decisões por personagem e posição real.
for(let part=1;part<=3;part++){
 N('j_npc'+part,'COMPLEXO · SETOR PARALELO',part===1?'22:59':part===2?'23:17':'23:32','warehouse',`O grupo do protagonista segue adiante. Em outro setor, um amigo precisa agir sem poder esperar uma ordem sua.`,[]);
 N('j_npc'+part+'_safe','COMPLEXO · OUTRO CAMINHO',part===1?'23:00':part===2?'23:18':'23:33','warehouse',`O setor fica para trás, mas ninguém pode parar até alcançar a saída.`,[g(part===1?'j_move2':part===2?'j_move3':'j_police','Retomar a perspectiva do protagonista')]);
 N('j_npc'+part+'_hurt','COMPLEXO · FUGA FERIDA',part===1?'23:01':part===2?'23:19':'23:34','warehouse',`A pessoa consegue escapar, mas deixa sangue e uma marca no caminho.`,[g(part===1?'j_move2':part===2?'j_move3':'j_police','Retomar a perspectiva do protagonista')]);
 N('j_npc'+part+'_cost','COMPLEXO · ÚLTIMO SINAL',part===1?'23:02':part===2?'23:19':'23:34','warehouse',`O resultado da decisão será registrado no estado do personagem.`,[g(sideNext(part),'Retomar a perspectiva do protagonista')]);
 for(const letter of SIDE_WAYS){
  N('j_npc'+part+'_phase_'+letter,'COMPLEXO · PERIGO NO OUTRO SETOR',SIDE_TIMES[part][1],'warehouse','Uma segunda decisão será necessária antes de alcançar a saída.',[]);
 }
}

// Cronologia da conversa: preservar a ordem em todas as oito rotas.
for(const n of nodes){
 if(n.id.startsWith('j_talk_end_'))n.time='14:21';
 else if(n.id.startsWith('j_funeral_choice_'))n.time='14:17';
 // Os demais nós já possuem horários crescentes entre 13h24 e 14h10.
}

const readablePeople=(s)=>Object.keys(INTRO).filter(id=>!dead(s,id)&&!recentInjury(s,id));
const PERSONS=Object.keys(L);
const PREFERENCE={samuel:'veiculos',ryan:'veiculos',breno:'manutencao',allan:'manutencao',rauanny:'externa',isabella:'manutencao',laisla:'externa',rayssa:'veiculos'};
const placeLabel={veiculos:'estacionamento',manutencao:'manutenção',externa:'passagem externa'};
const survivors=s=>Object.keys(L).filter(id=>!dead(s,id));
const sel=s=>s?.flags||{};
function risk(s,part){const f=sel(s),where=f.c7_hero_pos;const region=part===1?'manutencao':part===2?'externa':'veiculos';if(where!==region)return null;const p=party(s);const now=p.filter(id=>f.c7_pos?.[id]===where&&!dead(s,id));
 const priorities=part===1?['allan','breno','isabella','ryan','samuel','rauanny','laisla','rayssa']:part===2?['rauanny','laisla','samuel','allan','ryan','breno','isabella','rayssa']:['ryan','samuel','rayssa','breno','rauanny','allan','laisla','isabella'];
 return priorities.find(x=>now.includes(x))||null;
}

function sideTarget(s,part){
 const f=sel(s);const others=party(s).filter(id=>!dead(s,id)&&f.c7_pos?.[id]===PREFERENCE[id]&&f.c7_pos?.[id]!==f.c7_hero_pos&&f.c7_pos?.[id]!=='resgatado');
 const order=part===1?['breno','isabella','allan','samuel','ryan','rauanny','laisla','rayssa']:part===2?['ryan','rauanny','laisla','samuel','breno','allan','isabella','rayssa']:['samuel','ryan','rayssa','breno','allan','rauanny','isabella','laisla'];
 return order.find(id=>others.includes(id))||null;
}

function partyPositions(s){const f=sel(s);if(!f.c7_pos||typeof f.c7_pos!=='object')f.c7_pos={};for(const id of party(s))if(!f.c7_pos[id])f.c7_pos[id]=PREFERENCE[id];}
function groupWithHero(s){partyPositions(s);return party(s).filter(id=>s.flags.c7_pos[id]===s.flags.c7_hero_pos&&!dead(s,id));}
function moveGroup(s,from,to){partyPositions(s);for(const id of party(s))if(s.flags.c7_pos[id]===from&&trust(s,id)>=45)s.flags.c7_pos[id]=to;}
function chooseRoute(s,n){const f=sel(s);let next=n;
 if(n==='j_death_gate'){
  // A apresentação decorre do telefone e da chegada, não de um botão que anuncia uma morte.
  if(f.c7_hero_entrada_rapida&&f.c7_moises_rota_elevador&&f.c7_ligacao_atendida)next='j_m_death_show';
  else if(f.c7_moises_celular_ativo&&(f.c7_ligacao_atendida||f.c7_hero_insistiu_chamada||f.c7_retornou_moises))next='j_m_death_hear';
  else next='j_m_death_find';
 }
 return next;
}
function replaceChoice(to,text,effects=[]){return C(text,to,effects)}
function timer(s,node,choices){
 if(!(/^j_npc[123](?:_phase_[abc])?$/.test(node)||['j_crisis1','j_crisis2','j_crisis3'].includes(node))||!choices||choices.length<2)return null;
 if(window.UG107?.state?.(s)?.timedOff)return null;
 const m=node.match(/^j_npc([123])_phase_([abc])$/);
 // Na segunda decisão o fim do tempo escolhe a saída mais exposta daquele preparo.
 const dangerous=m?SIDE_OUTCOMES[SIDE_WAYS.indexOf(m[2])].indexOf('cost'):choices.length-1;
 return {secs:m?14:node.startsWith('j_npc')?19:22,fallback:dangerous};
}
function enter(s,id){if(!s?.flags||!id.startsWith('j'))return false;const f=s.flags;const stamp='c7_enter_'+id;if(f[stamp])return false;f[stamp]=true;let changed=true;
 if(id==='j_party_done'){f.c7_grupo=party(s).join(',');}
 if(id==='j_escape_setup'){partyPositions(s);}
 if(id==='j_route1') {partyPositions(s); f.c7_hero_pos=f.c7_hero_pos||'manutencao';}
 if(id==='j_route2'){partyPositions(s);}
 if(id==='j_move2')f.c7_prev_area=f.c7_hero_pos;
 if(id==='j_move3'){const old=f.c7_hero_pos||'externa';moveGroup(s,old,'veiculos');f.c7_hero_pos='veiculos';}
 if(id==='j_crisis1'||id==='j_crisis2'||id==='j_crisis3'){
  const key=id==='j_crisis1'?'c7_alvo_1':id==='j_crisis2'?'c7_alvo_2':'c7_alvo_3';f[key]=risk(s,id==='j_crisis1'?1:id==='j_crisis2'?2:3)||'';
 }
 if(/^j_npc[123]$/.test(id)){
  partyPositions(s);const part=Number(id.slice(-1));f['c7_side_'+part]=sideTarget(s,part)||'';
  const target=f['c7_side_'+part];
  f['c7_side_origin_'+part]=target?f.c7_pos[target]:'';
  f['c7_side_ally_'+part]=target?(party(s).filter(x=>x!==target&&!dead(s,x)&&f.c7_pos?.[x]===f.c7_pos[target])[0]||''):'';
 }
 const sideEnd=id.match(/^j_npc([123])_(?:safe|hurt|cost)$/);
 if(sideEnd){const part=Number(sideEnd[1]),target=f['c7_side_'+part],ally=f['c7_side_ally_'+part];
  if(target){partyPositions(s);f.c7_pos[target]='resgatado';}
  if(ally&&!dead(s,ally)&&f.c7_pos?.[ally]!==f.c7_hero_pos)f.c7_pos[ally]='resgatado';
 }
 if(id==='j_last_01'){f.c7_moises_morto=true;}
 return changed;
}
function onChoice(s,id,c){const f=s?.flags||{};
 if(id==='j_party'&&c.to==='j_party'){
  const invited=(c.effects||[]).find(e=>e[0]==='flag'&&String(e[1]).startsWith('c7_inv_'));
  if(invited){const who=String(invited[1]).slice('c7_inv_'.length);if(trust(s,who)<33){f['c7_inv_'+who]=false;f['c7_recusou_'+who]=true;}}
 }
 if(id==='j_move2'||id==='j_escape_setup'||id==='j_move3'){
   const where=(c.effects||[]).find(e=>e[0]==='set'&&e[1]==='c7_hero_pos');if(where){const before=f.c7_prev_area||f.c7_hero_pos;const after=where[2];if(before&&before!==after)moveGroup(s,before,after);f.c7_hero_pos=after;}
 }
 if(id==='j_party_done'||id==='j_m01')partyPositions(s);
}
function resolve(id,s,n){if(!n||!s)return n;const f=sel(s);let text=n.text, cs=[...(n.choices||[])], location=n.location;
 const withHero=()=>groupWithHero(s), names=xs=>xs.length?xs.map(x=>L[x]).join(', '):'ninguém';
 if(id==='j01'){
  const lost=['laisla','rauanny','isabella','allan','ryan'].filter(x=>dead(s,x));
  text+=lost.length?'\n\nA notícia mais difícil já foi confirmada: '+names(lost)+'. Nenhuma conversa pode substituir essas pessoas. Você evita olhar para os lugares que deveriam ocupar.':'\n\nOs oito amigos sobreviveram ao ataque ao apartamento, embora alguns ainda precisem de cuidados. O alívio não apaga o que aconteceu.';
 }

 if(id==='j02'){
  if(dead(s,'breno'))text=text.replace('Breno enviou uma mensagem perguntando se você conseguiu descansar.','Você encontra mensagens da equipe do hospital perguntando se alguém precisa de apoio. O nome de Breno não aparece entre os novos recados.');
  if(dead(s,'samuel'))text=text.replace('Samuel escreveu e apagou alguma coisa no grupo, várias vezes.','O grupo fica silencioso depois de algumas tentativas de conversa. Samuel já não pode responder.');
 }
 if(id==='j13'){
  if(dead(s,'isabella'))text=text.replace('Isabella e os outros respondem em horários diferentes.','Os sobreviventes respondem em horários diferentes, sem novas mensagens de Isabella.');
  if(dead(s,'samuel'))text=text.replace('Samuel quer saber quem teve acesso às informações.','Os sobreviventes querem saber quem teve acesso às informações.');
  if(dead(s,'breno'))text=text.replace('Breno pede que verifiquem o horário original da captura.','O protagonista registra o horário original da captura para comparação.');
  if(dead(s,'ryan'))text=text.replace('Ryan tenta impedir que a conversa se transforme em uma caça às bruxas.','Ninguém sabe como impedir que a conversa vire uma caça às bruxas.');
 }
 if(id==='j14'){
  if(dead(s,'samuel'))text=text.replace('Samuel envia apenas: «Não dá pra continuar fingindo que é coincidência».','Alguém escreve: «Não dá pra continuar fingindo que é coincidência».');
  if(dead(s,'breno'))text=text.replace('Breno pede que ninguém apague nada.','Você pede que ninguém apague nada.');
 }
 if(id==='j_talk_rauanny'&&dead(s,'laisla'))text=text.replace('Ela me conhece quando', 'Ela me conhecia quando').replace('posso perder essa pessoa num segundo','perdi essa pessoa num segundo');
 if(id==='j_date_personal_rayssa'&&dead(s,'isabella'))text=text.replace('Usa até hoje.','Usava até o último aniversário.').replace('Ela ri, mas logo fica olhando para a mesa.','Rayssa tenta rir, mas os olhos ficam úmidos ao lembrar de Isabella. Ela pousa os talheres antes de continuar.');
 if(id==='j15'){
  if(dead(s,'breno'))text=text.replace('Breno manda uma mensagem perguntando se você ainda está fora.','Uma notificação antiga de Breno permanece salva, mas não chega nenhuma mensagem nova dele.');
  if(dead(s,'samuel'))text=text.replace('Samuel quer saber se apareceu alguma novidade sobre o mascarado.','No grupo, alguém pergunta se apareceu alguma novidade sobre o mascarado.');
 }

 if(id==='j03'){
  const can=readablePeople(s);cs=can.map(p=>C('Chamar '+L[p]+' para uma conversa reservada','j_talk_'+p,[F('conversou_'+p)]));
  if(!can.length)cs=[g('j03_none','Respeitar a recuperação dos outros e ficar um pouco só')];
  if(can.length)text+='\n\nConseguem encontrar você agora: '+names(can)+'.';
 }
 for(const p of Object.keys(INTRO)){
  if(id==='j_talk_'+p||id==='j_confide_'+p||id==='j_listen_'+p||id==='j_past_'+p||id==='j_memory_'+p||id==='j_funeral_'+p||id==='j_talk_end_'+p){
   const prev=LOSS[p]; if(id==='j_talk_'+p&&prev&&prev.lost&&dead(s,prev.lost)&&prev.text){text+='\n\n'+prev.text;}
   if(p==='allan'&&s.flags?.allan_morto_c4){text='';cs=[];}
   // Não duplicamos uma confidência em telas diferentes: as cenas seguintes aprofundam o mesmo assunto.
   if(id==='j_confide_'+p||id==='j_listen_'+p){text=text.replace('\n\n'+SOUL[p],'');}
   if(id==='j_funeral_'+p){const memory=f.c7_sonho_hero;
    if(memory==='arte')text+='\n\nVocê também imagina que suas músicas, desenhos ou apresentações possam existir quando não estiver por perto. Não quer fama por morrer; quer tempo para viver sua própria arte.';
    else if(memory==='aceitacao')text+='\n\nVocê pensa em ter ao redor apenas pessoas que respeitam quem você é. O medo de rejeição familiar torna aquela ideia de despedida ainda mais íntima.';
    else if(memory==='paz')text+='\n\nVocê imagina um futuro simples: uma casa tranquila, pessoas amadas, a liberdade de chegar ao fim de um dia sem desconfiar do próximo barulho.';
    else if(memory==='descoberta')text+='\n\nVocê percebe que ainda não sabe que vida gostaria de construir. É justamente por isso que tem tanto medo de perdê-la antes de descobrir.';
   }
  }
 }
 if(id==='j_dinner_friend'){
  const r=s.romanceEscolhido;
  const beginning=(r&&r!=='solteiro'&&dead(s,r))?'A pessoa com quem você estava se aproximando morreu antes que vocês pudessem ter outra noite tranquila. Você não quer colocar alguém no lugar dela só para parecer que seguiu em frente.':(r&&r!=='solteiro'&&recentInjury(s,r))?'Você vinha se aproximando de '+L[r]+', mas a recuperação dos ferimentos exige repouso. Vocês combinaram conversar depois. Hoje você fará a refeição sem arrastar ninguém para um esforço impossível.':'Você decidiu não iniciar um namoro nem uma rota romântica por enquanto. Não precisa inventar um relacionamento para que a noite tenha valor.';
  text=text.replace('Você decidiu não começar um romance — ou perdeu alguém com quem sonhava viver mais noites assim.',beginning);
 }
 if(id==='j20'){
  const r=s.romanceEscolhido;
  if(r&&r!=='solteiro'&&ROM[r]&&!dead(s,r)&&!recentInjury(s,r))cs=[g('j_dinner_'+r,'Encontrar '+L[r]+' para jantar')];
  else if(r&&r!=='solteiro'&&!dead(s,r)){
   text+='\n\n'+L[r]+' ainda está em recuperação. Vocês conversam por telefone e concordam em não trocar repouso por outro esforço físico; o jantar ficará para quando houver condições.';
   cs=[g('j_dinner_friend','Respeitar a recuperação e fazer uma refeição tranquila')];
  } else cs=[g('j_dinner_friend',r==='solteiro'?'Jantar sem assumir um romance que você não escolheu':'Fazer uma refeição sem fingir que a perda não aconteceu')];
 }
 if(id==='j_call_follow'){
  const r=s.romanceEscolhido;
  if(r&&ROM[r]&&!dead(s,r)&&!recentInjury(s,r))cs=[g('j_date_exit_'+r,'Terminar o jantar e se despedir antes da investigação')];
 }
 if(id.startsWith('j_date_exit_')){
  text+='\n\nAo se despedir, você decide quem deve saber onde Moisés marcou o encontro. Contar para alguém pode trazer ajuda, mas também espalhar uma informação que ele pediu para manter reservada.';
  cs=[
   C('Avisar o grupo inteiro sobre o endereço de Moisés','j15',[F('grupo_sabe_encontro'),Q('c7_encontro_divulgado'),['trait','franqueza',2]]),
   C('Compartilhar o local somente com Bella','j15',[F('bella_sabe_encontro'),['trait','empatia',1]]),
   C('Guardar o endereço em segredo por enquanto','j15',[F('encontro_secreto'),['trait','cautela',2]])
  ];
 }
 if(id==='j_party'){
  const already=party(s),eligible=allowed(s).filter(x=>!recentInjury(s,x)&&!f['c7_inv_'+x]&&!f['c7_recusou_'+x]);
  text+='\n\n'+(already.length?'Confirmaram que irão: '+names(already)+'.':'Você ainda não confirmou a presença de nenhum amigo.');
  const refusals=allowed(s).filter(x=>f['c7_recusou_'+x]);if(refusals.length)text+='\n\n'+names(refusals)+' não aceitou o convite desta vez. Não adianta agir como se a pessoa estivesse a caminho.';
  const recovering=allowed(s).filter(x=>recentInjury(s,x));if(recovering.length)text+='\n\nPrecisam permanecer em recuperação: '+names(recovering)+'. Você não vai forçar uma saída perigosa.';
  cs=eligible.map(x=>C('Convidar '+L[x]+' para acompanhar a investigação','j_party',[F('inv_'+x)]));
  cs.push(g('j_party_done',already.length?'Confirmar os convidados e seguir':'Seguir sem convidar ninguém'));
 }
 if(id==='j_party_done'){
  const joined=party(s);text+='\n\n'+(joined.length?'Estão a caminho ou encontrarão você no acesso combinado: '+names(joined)+'.':'Ninguém conseguiu ou decidiu acompanhar você. Vai precisar lidar com a situação sozinho e contar com a polícia.');
  if(joined.includes('samuel')&&dead(s,'allan'))text+='\n\nSamuel mantém o celular na mão e evita comentar o nome de Allan. O luto pelo melhor amigo continua determinando como reage a qualquer pedido de ajuda.';
 }
 if(id==='j_h02'){
  partyPositions(s);
  const companions=party(s).filter(x=>!dead(s,x));
  if(companions.length){
   const nearby=companions.find(x=>f.c7_pos?.[x]==='veiculos')||companions[0];
   const far=companions.filter(x=>x!==nearby);
   let arrivalNote=(f.c7_pos?.[nearby]==='veiculos'
    ?L[nearby]+' está junto aos carros, a poucos metros da entrada. Olha para o portão sem tirar os olhos das janelas.\n\n'+L[nearby]+': — Você acha melhor entrarmos juntos? Eu não tô gostando desse silêncio.'
    :'O telefone vibra. É '+L[nearby]+', falando da '+(placeLabel[f.c7_pos?.[nearby]]||'entrada combinada')+'.\n\n'+L[nearby]+': — Eu tô na minha entrada. Quer que a gente se reúna antes ou entre pelos acessos combinados?');
   if(far.length)arrivalNote+='\n\n'+far.map(x=>L[x]+' confirmou o '+(placeLabel[f.c7_pos?.[x]]||'acesso combinado')).join('; ')+'. Você não pode enxergá-los daqui.';
   text=text.replace('Antes que você decida por qual passagem entrar,',arrivalNote+'\n\nAntes que você decida por qual passagem entrar,');
  }else text=text.replace('Antes que você decida por qual passagem entrar,','Você está sozinho diante do portão. Não há resposta de outro amigo no rádio nem no celular. Precisa escolher o acesso por conta própria.\n\nAntes que você decida por qual passagem entrar,');
 }
 if(id==='j_h03'){
  partyPositions(s);
  const companions=party(s).filter(x=>!dead(s,x));
  text+='\n\n'+(companions.length
   ?'Pelo celular, você recebe as últimas posições: '+companions.map(x=>L[x]+' — '+(placeLabel[f.c7_pos?.[x]]||'acesso ainda não confirmado')).join('; ')+'. Você não os vê todos do pátio, e nenhuma mensagem confirma que já estejam seguros.'
   :'Você olha a lista de chamadas recentes. Ninguém aceitou vir com você; só a polícia recebeu o aviso, se você conseguiu enviá-lo.');
 }
 if(id==='j_h01'){
  const companions=party(s);text+='\n\n'+(companions.length?'Você confere as respostas: '+names(companions)+' aceitaram acompanhá-lo. '+companions.map(x=>L[x]+' entrará pelo '+(placeLabel[PREFERENCE[x]]||'acesso principal')).join('; ')+'. Os outros amigos não estão no complexo.':'Você chegou sozinho. Nenhum outro amigo aceitou entrar no complexo com você.');
 }
 if(['j_h02','j_h03','j_escape_setup','j_route1','j_route2','j_move2','j_move3','j_crisis1','j_crisis2','j_crisis3'].includes(id)){
  partyPositions(s);
  const everyone=party(s).filter(x=>!dead(s,x));
  if(!f.c7_hero_pos&&id.startsWith('j_h')&&id!=='j_h03'&&id!=='j_h02'){
    text+='\n\n'+(everyone.length?'Antes de entrar, você confirma pelo celular: '+names(everyone)+' estão a caminho pelos acessos previamente combinados.':'Você não recebeu confirmação de nenhum amigo presente na oficina.');
  }else{
    const sector=placeLabel[f.c7_hero_pos||'manutencao']||'setor de manutenção';
    const same=everyone.filter(x=>f.c7_pos[x]===f.c7_hero_pos);
    const elsewhere=everyone.filter(x=>f.c7_pos[x]!==f.c7_hero_pos);
    text+='\n\nVocê está no '+sector+'. '+(same.length?'Ao seu lado: '+names(same)+'.':'Nenhum amigo está ao seu lado agora.')+' '+(elsewhere.length?'Em outros setores, conforme as últimas posições confirmadas: '+elsewhere.map(x=>L[x]+' — '+(placeLabel[f.c7_pos[x]]||'posição não confirmada')).join('; ')+'. Essas posições não revelam o que está acontecendo com eles.':'Não há outro núcleo de amigos separado neste momento.');
  }
 }

 if(id==='j_death_gate'){const route=chooseRoute(s,id);const label=route==='j_m_death_show'?'Acompanhar os últimos instantes no guincho':route==='j_m_death_hear'?'Ouvir a ligação instável': 'Seguir as marcas no corredor';cs=[g(route,label)];}
 if(id==='j_after_death'){
  cs=(f.c7_hero_presenciou_desfecho)?[g('j_evidence','Afastar-se e tentar preservar as evidências')]:[g('j_body','Verificar o que está pendurado no guincho')];
  text+=f.c7_hero_presenciou_desfecho?'\n\nVocê já presenciou o que aconteceu com Moisés. Não precisa descobrir a morte duas vezes. Agora precisa preservar as provas e sobreviver.':'\n\nVocê ainda não identificou quem está preso ao equipamento. O feixe de luz sobe lentamente até o guincho.';
 }
 if(id==='j_evidence'){
  cs=n.choices.map(c=>{if(c.to!=='j_escape_setup')return c;
   if(c.text.startsWith('Verificar o armário')){
    const valid=f.c7_moises_guardou_doc||f.c7_moises_fotografou_doc;
    return {...c,effects:[F('prova_armario'),...(valid?[Q('c7_registros_pos_desaparecimento')]:[]),['trait','cautela',1]]};
   }
   if(c.text.startsWith('Procurar o telefone')){
    const valid=f.c7_moises_celular_escondido||f.c7_moises_celular_ativo||f.c7_moises_fotografou_doc;
    return {...c,effects:[F('prova_telefone'),...(valid?[Q('c7_rastro_telefone')]:[])]};
   }
   return c;
  });
 }
 if(id==='j_escape_setup'){
  const all=party(s);
  text+='\n\nNa investigação estão '+(all.length?names(all):'somente você')+'. Os demais amigos ainda estão longe do complexo, aguardando notícias pelo telefone.';
 }
 if(id==='j_route1'||id==='j_route2'){
  const at=withHero();text+='\n\nVocê alcança a região de '+placeLabel[f.c7_hero_pos||'manutencao']+'. '+(at.length?'Consegue ver e ouvir '+names(at)+' no mesmo setor.':'Não encontra nenhum amigo no seu setor agora.');
  const elsewhere=party(s).filter(x=>!at.includes(x));if(elsewhere.length)text+='\n\n'+names(elsewhere)+' permanece em outra parte do complexo. Você só recebe informações se houver comunicação.';
  location='COMPLEXO · '+(placeLabel[f.c7_hero_pos||'manutencao']).toUpperCase();
 }

 for(let part=1;part<=3;part++){
  const target=f['c7_side_'+part];
  const base='j_npc'+part;
  if(id===base){
    if(!target||dead(s,target)){
      const others=party(s).filter(x=>!dead(s,x));
      text='PONTO DE VISTA: PROTAGONISTA\n\n'+(others.length?'Você consulta as últimas mensagens de '+names(others)+'. Nenhum deles está isolado em outro setor exigindo uma decisão sua agora.':'Você chegou sem acompanhantes à oficina. Não há outro ponto de vista para acompanhar neste trecho.')+' A saída segue pelo setor que você escolheu.';
      cs=[g(sideNext(part),'Continuar pela sua rota')];
    }else{
      const area=f.c7_pos?.[target]||PREFERENCE[target],story=SIDE_PROFILES[target];
      const ally=f['c7_side_ally_'+part];
      const local=placeLabel[area]||'setor de serviço';
      location='COMPLEXO · '+(story?.where===area?story.spot:local).toUpperCase();
      const inPlace=story?.where===area;
      const heading='PONTO DE VISTA: '+L[target].toUpperCase()+'\n\n'+(part===1?'22h59':part===2?'23h17':'23h32')+'. Você deixou o protagonista em '+(placeLabel[f.c7_hero_pos]||'outro setor')+'. '+L[target]+' está '+(inPlace?'na '+story.spot:'no '+local)+'.';
      const company=ally&&!dead(s,ally)?' '+L[ally]+' também está ali e tenta encontrar outra saída. '+L[ally]+': — '+SIDE_COVER[ally]:' Não há outro amigo perto o suficiente para ajudar. O celular não consegue completar uma ligação.';
      const intro=inPlace?story.intro+'\n\n'+story.line:
       L[target]+' encontra uma porta corta-fogo emperrada no '+local+'. Há marcas recentes de lama junto à maçaneta e um corredor escuro ao lado. '+L[target]+': — Não vou entrar às cegas. Primeiro preciso descobrir por onde sair.';
      text=heading+'\n\n'+intro+'\n\n'+company+'\n\nUma batida forte ecoa atrás da porta. '+L[target]+' precisa agir antes que os passos alcancem o setor.';
      cs=(inPlace?story.plans:[['Testar a trava da porta antes de passar',''],['Ouvir os passos e procurar uma passagem lateral',''],['Correr pela saída mais próxima','']]).map((option,i)=>C(option[0],'j_npc'+part+'_phase_'+SIDE_WAYS[i],[S('side_plan_'+part,SIDE_WAYS[i]),['trait','cautela',i===0?1:0]]));
    }
  }
  const phaseMatch=id.match(new RegExp('^'+base+'_phase_([abc])$'));
  if(phaseMatch){
    const choice=SIDE_WAYS.indexOf(phaseMatch[1]),profile=SIDE_PROFILES[target];
    if(!target||dead(s,target)||!profile){text='PONTO DE VISTA: PROTAGONISTA\n\nA comunicação foi interrompida e você precisa avançar.';cs=[g(sideNext(part),'Voltar à sua rota')];}
    else{
      location='COMPLEXO · '+profile.spot.toUpperCase();
      const caution=recentInjury(s,target)?' Os ferimentos que '+L[target]+' carrega dos ataques anteriores tornam cada movimento mais doloroso.':'';
      const ally=f['c7_side_ally_'+part];
      text='PONTO DE VISTA: '+L[target].toUpperCase()+'\n\n'+profile.plans[choice][1]+'\n\n'+profile.dilemma+caution;
      if(ally&&!dead(s,ally))text+='\n\n'+L[ally]+': — '+(choice===2?'Cuidado! Essa saída não aguenta muito!':SIDE_VOICES[ally]);
      cs=profile.actions.map((label,i)=>{
       let outcome=SIDE_OUTCOMES[choice][i];
       const effects=[F('side_desfecho_'+part,outcome),F('side_etapa_'+part+'_'+target),['trait','coragem',i===2?2:1]];
       if(outcome==='safe'){effects.push(F('side_salvou_'+target+'_'+part),B(target,5));}
       if(outcome==='hurt'){effects.push(['injury7',target],F('side_feriu_'+target+'_'+part));}
       if(outcome==='cost'){effects.push(['death7',target],F('side_perdeu_'+target+'_'+part));}
       return C(label,base+'_'+outcome,effects);
      });
    }
  }
  const endMatch=id.match(new RegExp('^'+base+'_(safe|hurt|cost)$'));
  if(endMatch&&target){
    const profile=SIDE_PROFILES[target],kind=endMatch[1];
    location='COMPLEXO · '+(f['c7_side_origin_'+part]&&f['c7_side_origin_'+part]!==profile.where?(placeLabel[f['c7_side_origin_'+part]]||'setor paralelo'):profile.spot).toUpperCase();
    let result=kind==='cost'&&!dead(s,target)?profile.hurt:kind==='safe'&&f['c7_side_plan_'+part]==='b'?SIDE_SAFE_ALT[target]:profile[kind];
    if(f['c7_side_origin_'+part]&&f['c7_side_origin_'+part]!==profile.where){
      const position=placeLabel[f['c7_side_origin_'+part]]||'setor paralelo';
      result=L[target]+' consegue sair do '+position+' pela passagem de serviço.'+(kind==='safe'?' Atravessa antes que a figura mascarada chegue à porta.':kind==='cost'&&dead(s,target)?' O mascarado o alcança atrás da última porta, impedindo a fuga.':' No esforço, se machuca e precisará de atendimento.');
    }
    const ally=f['c7_side_ally_'+part];
    const note=ally&&!dead(s,ally)?'\n\n'+L[ally]+' alcança outra passagem e confirma pelo celular que está fora da área do ataque.':' ';
    const status=kind==='cost'?(dead(s,target)?'O telefone de '+L[target]+' permanece sem resposta. A localização do último ataque será informada à polícia.':'O limite de perdas desta noite já foi atingido. '+L[target]+' sobreviveu, mas precisa de atendimento imediato.'):
      kind==='hurt'?L[target]+' escapa ferido e pede socorro pelo telefone.':L[target]+' alcança a saída e confirma que está vivo.';
    text='PONTO DE VISTA: '+L[target].toUpperCase()+'\n\n'+sideText(result)+'\n\n'+status+note;
  }
 }
 for(const num of [1,2,3]){
  const crisis='j_crisis'+num, idRisk='c7_alvo_'+num,target=f[idRisk];
  if(id===crisis){
    const val=target&&!dead(s,target)&&party(s).includes(target)?target:null;
    if(!val)cs=[g(crisis+'_safe','Continuar pela saída sem abandonar ninguém')];
    else{
      text+=`\n\n${L[val]} está nesse mesmo setor. Ao tentar alcançar a saída, ${L[val]} fica bloqueado pela estrutura que acaba de cair. O assassino aparece no extremo do corredor. Você tem segundos para decidir se volta, tenta abrir passagem ou continua a fuga. O grito dessa pessoa atravessa o corredor, e você sente o sangue gelar.`;
      cs=[
        C('Voltar e ajudar '+L[val]+' a atravessar','j_crisis'+num+'_help',[B(val,7),F('salvou_'+val+'_'+num),['trait','coragem',2]]),
        C('Derrubar um objeto para atrasar o agressor e liberar o caminho','j_crisis'+num+'_help',[F('desviou_ataque_'+num),B(val,3),['injury7',val]]),
        C('Seguir pela abertura antes que o mascarado chegue','j_crisis'+num+'_cost',[['death7',val],F('deixou_'+val+'_'+num),['trait','cautela',1]])];
    }
  }
  if(id===crisis+'_help'){const t=f[idRisk];if(t){
      text=text.replace('— NÃO PARA! — alguém grita.',L[t]+': — NÃO PARA!');
      text+='\n\n'+L[t]+' alcança você do outro lado. Está vivo, embora visivelmente abalado.\n\n'+L[t]+': — Tô aqui! Eu consegui!\n\nVocê espera ouvir sua respiração antes de começar a correr novamente.';
      text=text.replace(/A pessoa consegue atravessar/g,L[t]+' consegue atravessar').replace(/A pessoa resgatada/g,L[t]).replace(/Quem você ajudou/g,L[t]).replace(/Alguém grita seu nome/g,L[t]+' grita seu nome').replace(/A pessoa que ajudou/g,L[t]).replace(/A pessoa que você ajudou/g,L[t]).replace(/o amigo que você puxou/g,L[t]).replace(/O amigo que você puxou/g,L[t]);
   }}
  if(id===crisis+'_cost'){const t=f[idRisk];if(t){
   text=text.replace(/A pessoa fica presa/g,L[t]+' fica '+(['rayssa','rauanny','laisla','isabella'].includes(t)?'presa':'preso')).replace(/Uma pessoa fica presa/g,L[t]+' fica '+(['rayssa','rauanny','laisla','isabella'].includes(t)?'presa':'preso')).replace(/a pessoa que ficou bloqueando a passagem/g,L[t]).replace(/o nome da pessoa perdida/g,'o nome de '+L[t]).replace(/uma pessoa passar/g,'alguém passar');
   if(f['c7_morto_'+t])text+='\n\n'+L[t]+' morreu durante essa tentativa de fuga. Você sabe onde o viu pela última vez. A informação será levada à polícia; não será substituída por um reencontro impossível.';
   else text+='\n\n'+L[t]+' continua vivo, mas gravemente ferido. A polícia precisará socorrê-lo; já ocorreram mortes demais nesta noite.';
   }}
 }
 if(id==='j_move2'){
  partyPositions(s);
  const current=placeLabel[f.c7_hero_pos]||'corredor de serviço';
  const beside=withHero();
  const other=party(s).filter(x=>!dead(s,x)&&f.c7_pos[x]!==f.c7_hero_pos&&f.c7_pos[x]!=='resgatado');
  const rescued=party(s).filter(x=>!dead(s,x)&&f.c7_pos[x]==='resgatado');
  text='PONTO DE VISTA: PROTAGONISTA\n\nO caminho que você seguiu termina numa bifurcação sinalizada. Uma seta aponta para o estacionamento; outra, para a saída dos funcionários. Você está no '+current+'. A sirene que vem da marina ainda soa distante.\n\n'+(beside.length?'Você tem '+names(beside)+' ao seu lado. '+beside.map(x=>L[x]+': — '+SIDE_VOICES[x]).join('\n\n'):'Nenhum outro amigo está fisicamente ao seu lado neste momento.')+(other.length?'\n\nVocê confere as posições confirmadas por mensagem: '+other.map(x=>L[x]+' — '+(placeLabel[f.c7_pos[x]]||'setor não confirmado')).join('; ')+'. Ainda não sabe se todos conseguiram passar pelos bloqueios.':'')+(rescued.length?'\n\n'+names(rescued)+' já confirmou que alcançou uma saída. Você não precisa imaginá-los presos no corredor novamente.':'')+'\n\nVocê observa o chão molhado. Há uma trilha de marcas de sapatos em direção aos veículos, mas não sabe se são recentes. A decisão de qual passagem seguir depende do que está à sua frente, e não de algum perigo inventado em outro setor.';
 }
 if(id==='j_move3')text+='\n\n'+(withHero().length?'Perto de você estão '+names(withHero())+'.':'Você avança sem companhia no corredor.');
 if(id==='j_police'){
  const losses=PERSONS.filter(x=>f['c7_morto_'+x]);
  text+='\n\n'+(losses.length?'Você informa aos agentes as mortes que presenciou ou que já foram confirmadas: '+names(losses)+'. A busca continua nos corredores; ninguém será descrito como vivo ao mesmo tempo em que seu corpo é encontrado.':'Até este ponto você não perdeu outro amigo durante a fuga. A polícia continua verificando os ferimentos de todos que chegaram à saída.');
 }
 if(id==='j_last_01'){
  const losses=PERSONS.filter(x=>dead(s,x));
  text+='\n\n'+(losses.length?'A reunião carrega também a ausência de '+names(losses)+'. Ninguém ocupa seus lugares.':'As pessoas que você conseguiu proteger durante a noite ainda podem se abraçar, embora estejam muito abaladas.');
 }
 if(id==='j_last_02'){
  const live=survivors(s),deceased=Object.keys(L).filter(x=>dead(s,x));
  const present=live.filter(x=>!recentInjury(s,x));const byPhone=live.filter(x=>recentInjury(s,x));
  text=`Os amigos que conseguiram vir pessoalmente estão reunidos na sala reservada: ${names(present)}. ${byPhone.length?'Em observação ou em repouso, '+names(byPhone)+' participa por chamada ou recebe notícias por mensagem, sem sair do atendimento.':'Nenhum dos sobreviventes precisou se afastar da conversa para receber novo atendimento.'}\n\n${deceased.length?'Os lugares de '+names(deceased)+' estão vazios. Ninguém olha para a porta esperando que eles cheguem.':'O grupo ainda pode se olhar sem contar outra ausência entre os oito amigos.'}\n\nBella chega depois que a equipe confirma que Moisés morreu. Mantém-se de pé perto da porta, evitando que a voz trema.\n\nBella: — Ele ia falar alguma coisa. Eu sei que ia. E agora ninguém consegue me dizer o quê.\n\n${live.includes('samuel')?'Samuel: — Como é que essa pessoa sempre sabe onde a gente tá? Alguém explica isso pra mim.':(present.length?L[present[0]]+': — Como o mascarado sabia do encontro? A gente precisa conferir quem recebeu o endereço.':'Bella pergunta como o mascarado descobriu o endereço e a hora do encontro.')}\n\n${live.includes('isabella')?'Isabella: — A gente precisa olhar as mensagens. Horários, destinatários. Acusar sem isso só vai acabar com o que resta da gente.':(present.length?L[present.find(x=>x!=='samuel')||present[0]]+': — Vamos conferir o histórico de mensagens antes de acusar qualquer pessoa.':'Bella pede que confiram o histórico das mensagens.')}\n\n${f.c7_grupo_sabe_encontro?'A localização foi anunciada no grupo. Muitas pessoas tiveram acesso ao endereço, embora isso não prove que alguma delas o repassou.':f.c7_bella_sabe_encontro?'Você contou o endereço a Bella, mas não divulgou a mensagem ao grupo todo. Ela confirma o horário em que soube, sem esconder o registro.':'Você não divulgou o endereço a ninguém do grupo. O mascarado só poderia saber por outro caminho ainda não esclarecido — e Moisés já tinha contatos fora desse círculo.'}\n\n${f.c7_prova_armario&&s.clues.includes('c7_registros_pos_desaparecimento')?'Você preservou registros de transações posteriores ao desaparecimento de Jullia. Não é possível saber o que foi comprado ou para quem.':'As provas que você conseguiu alcançar não explicam sozinhas o que Moisés guardava.'}\n\nO silêncio aumenta. Um celular vibra. Outros aparelhos acendem com a mesma notificação. O número não está salvo.`;
 }
 if(id.startsWith('j_talk_end_')){const farewell=f.c7_funeral_hero;if(farewell==='estrelas')text+='\n\nVocê lembra da imagem de uma noite estrelada sobre os prédios de Lakewood. Talvez um dia aquela lembrança seja apenas um jeito bonito de contar como sobreviveu.';else if(farewell==='musica')text+='\n\nVocê sorri ao pensar em fotos vergonhosas e na música que escolheria para uma despedida. Prefere, por enquanto, criar memórias novas para colocar nessas fotos.';else if(farewell==='intimidade')text+='\n\nVocê sente alívio ao perceber que pode escolher quem faz parte de sua história. Não precisa de uma multidão para tornar uma vida importante.';}
 if(window.UG107?.state?.(s)?.graphicOff){
  if(id==='j_body')text=`O feixe de luz alcança o guincho industrial. Moisés está suspenso entre correntes e equipamentos, imóvel. A roupa está encharcada de sangue, e a posição do corpo torna impossível confundir aquilo com um acidente. Você chama seu nome, sem obter resposta.\n\nVocê: — NÃO... MOISÉS!\n\nSeu estômago se contrai e a lanterna treme. A cena deixa claro que alguém preparou aquela descoberta para assustar vocês. Um ruído de metal se aproxima no corredor; é preciso preservar provas e sair.`;
  if(id==='j_m_death_show')text=`Moisés tenta alcançar a alavanca do guincho e impedir que o mascarado avance. Consegue recuar alguns passos, mas cai na plataforma ao sentir o ferimento e perde o equilíbrio.\n\nMoisés: — POR FAVOR! EU IA CONTAR!\n\nA pessoa mascarada o alcança. A luz pisca, e a luta termina em silêncio. O rosto do agressor permanece escondido. O corpo de Moisés fica imóvel diante da plataforma. Não há resposta ao último pedido de ajuda.`;
 }
 if(id==='j_fim'){
  const lost=PERSONS.filter(x=>f['c7_morto_'+x]);
  text+='\n\n'+(lost.length?'Nesta noite você perdeu também '+names(lost)+'. O destino deles está registrado e continuará importando nos próximos capítulos.':'Todos os amigos que sobreviveram aos capítulos anteriores também conseguiram sair vivos desta investigação.');
 }
 text=dramaticText(text,id,s);return {...n,text,choices:cs,location};
}
const clues={
 c7_livro_servico:{title:'Livro de entradas da propriedade',category:'Capítulo 7 · Bella',text:'Um registro de manutenção delimita a movimentação perto da guarita dos Gomes. Não identifica o assassino.'},
 c7_moises_conhecia_passagem:{title:'Moisés conhecia os acessos',category:'Capítulo 7 · Bella',text:'Moisés frequentava a propriedade e poderia utilizar entradas de serviço, mas isso não prova envolvimento nos ataques.'},
 c7_acesso_cameras:{title:'Troca de armazenamento das câmeras',category:'Capítulo 7 · Investigação',text:'Os arquivos antigos podem ter sido copiados antes da manutenção; sua origem atual permanece incerta.'},
 c7_moises_pediu_encontro:{title:'Pedido de Moisés',category:'Capítulo 7 · Celular',text:'Moisés afirmou ter algo a revelar sobre o período posterior ao desaparecimento de Jullia.'},
 c7_encontro_divulgado:{title:'Endereço divulgado no grupo',category:'Capítulo 7 · Mensagens',text:'Você informou o encontro ao grupo. O registro mostra quem poderia saber o local, não quem o repassou.'},
 c7_comprovantes_ocultos:{title:'Envelope de Moisés',category:'Capítulo 7 · Perspectiva de Moisés',text:'Moisés tentou guardar registros antes do ataque. Localização exata depende das escolhas.'},
 c7_copia_documentos:{title:'Cópia digital de documentos',category:'Capítulo 7 · Moisés',text:'Moisés fotografou documentos, mas a cópia pode não ter chegado às mãos do protagonista.'},
 c7_audio_parcial_moises:{title:'Ligação mantida aberta',category:'Capítulo 7 · Moisés',text:'O aparelho ficou ligado durante parte do confronto; a captação não identifica a pessoa mascarada.'},
 c7_telefone_escondido:{title:'Telefone escondido na oficina',category:'Capítulo 7 · Moisés',text:'Moisés tentou ocultar seu telefone antes de fugir. Encontrá-lo exige procurar o local certo.'},
 c7_ultima_acao_moises:{title:'Última tentativa de Moisés',category:'Capítulo 7 · Moisés',text:'Moisés tentou preservar uma informação antes do confronto final.'},
 c7_chamada_ataque:{title:'Últimos sons da chamada',category:'Capítulo 7 · Investigação',text:'Ruídos de metal e gritos na ligação situam o ataque na oficina, sem revelar o agressor.'},
 c7_cena_guincho:{title:'Registro da sala do guincho',category:'Capítulo 7 · Oficina',text:'Fotografias mostram a disposição dos equipamentos e marcas de sangue. A prova precisa ser preservada.'},
 c7_registros_pos_desaparecimento:{title:'Transações posteriores ao desaparecimento',category:'Capítulo 7 · Moisés',text:'Há registros de transações e deslocamentos posteriores ao desaparecimento de Jullia. Os comprovantes não discriminam produtos nem destinatários.'},
 c7_rastro_telefone:{title:'Rastro do telefone de Moisés',category:'Capítulo 7 · Oficina',text:'O aparelho ou seus sinais podem auxiliar a reconstruir os últimos contatos de Moisés.'},
 c7_loc_guincho:{title:'Localização exata do guincho',category:'Capítulo 7 · Oficina',text:'O protagonista preservou a localização da cena para evitar alterar vestígios.'}
};

function phoneThreads(s,base){
 const reached=(s?.history||[]).some(h=>h.node==='j14'||h.node==='j_call_follow'||h.node==='j_last_03')||String(s?.node||'').startsWith('j_');
 if(!reached)return base;
 const result=base.map(t=>({...t,messages:[...t.messages]}));
 const original=(id,name)=>{let t=result.find(x=>x.id===id);if(!t){t={id,name,sub:'Conversa particular',messages:[],replyKey:''};result.push(t)}return t;};
 const moises=original('moises','Moisés');
 if((s?.history||[]).some(h=>h.node==='j14'))moises.messages.push({who:'Moisés',time:'CAPÍTULO 7 · TARDE',text:'Eu preciso contar uma coisa. Não dá mais pra guardar. Por favor, não some.'});
 if(s?.flags?.c7_ligacao_atendida||s?.flags?.c7_ligacao_perdida){moises.messages.push({who:'Moisés',time:'CAPÍTULO 7 · NOITE',text:'A oficina antiga perto da marina. Eu preciso falar hoje. Se eu não atender, não vai embora sem conferir.'});}
 const group=result.find(x=>x.id==='grupo');
 if(group&&(s?.history||[]).some(h=>h.node==='j13'))group.messages.push({who:'Samuel',time:'CAPÍTULO 7 · TARDE',text:'QUEM MANDOU AQUELA CONVERSA PRA FORA DO GRUPO?'});
 if(group&&s?.flags?.c7_grupo_sabe_encontro)group.messages.push({who:'Você',time:'CAPÍTULO 7 · NOITE',text:'Moisés me chamou pra oficina antiga perto da marina. Vou tentar falar com ele.'});
 if((s?.history||[]).some(h=>h.node==='j_last_03')||s?.node==='j_last_03'||s?.node==='j_fim'){
   const u=original('anonimo7','Número desconhecido');
   u.messages.push({who:'Número desconhecido',time:'CAPÍTULO 7 · MADRUGADA',text:'Vocês passaram um ano escondendo um segredo.'});
   u.messages.push({who:'Número desconhecido',time:'CAPÍTULO 7 · MADRUGADA',text:'O problema é que vocês nunca pararam pra pensar que, às vezes, pode ter um traidor entre vocês.'});
   u.messages.push({who:'Número desconhecido',time:'CAPÍTULO 7 · MADRUGADA',text:'Boa noite, traidores.'});
 }
 return result;
}
function callLog(s){const x=[];if(s?.flags?.c7_ligacao_atendida)x.push({who:'Moisés',status:'Atendida · capítulo 7, 20h07'});if(s?.flags?.c7_ligacao_perdida)x.push({who:'Moisés',status:'Chamada perdida · capítulo 7, 20h09'});if(s?.flags?.c7_hero_ouviu_morte)x.push({who:'Moisés',status:'Interrompida durante a oficina · 22h14'});return x;}

window.UG7=Object.freeze({enter,onChoice,resolve,party,dead,chooseRoute,risk,clues,timer,phoneThreads,callLog});
window.NODES.fim10.choices=[g('j01','CAPÍTULO 7 · Começar A Noite dos Traidores')];
window.HISTORIA.push(...nodes);
for(const node of nodes){if(window.NODES[node.id])throw Error('Cap7: ID já usado '+node.id);window.NODES[node.id]=node;}
})();
