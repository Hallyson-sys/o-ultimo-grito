/* O ÚLTIMO GRITO 1.7.0 — Revisão final + amanhecer + depoimentos.
 * O resgate e as falas nunca inventam sobreviventes e as entrevistas são condicionais.
 * Não altera finais nem fatos já estabelecidos pela partida.
 */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;
const CH='CAPÍTULO 10 · O GRAND FINALE';
const IDS=['isabella','samuel','allan','laisla','rauanny','ryan','breno','rayssa'];
const NAMES={isabella:'Isabella',samuel:'Samuel',allan:'Allan',laisla:'Laisla',rauanny:'Rauanny',ryan:'Ryan',breno:'Breno',rayssa:'Rayssa'};
const FEM=new Set(['isabella','laisla','rauanny','rayssa']);
const name=x=>NAMES[x]||x||'alguém';
const hero=s=>String(s?.hero?.name||'Você').split(' ')[0];
const dead=(s,x)=>x==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG150?.dead?.(s,x)||!!window.UG10?.dead?.(s,x);
const missing=(s,x)=>!!s?.flags?.['c10_aparente_'+x];
const survivor=(s,x)=>!dead(s,x)&&!missing(s,x);
const rayFled=s=>!!s?.flags?.c10_rayssa_foragida||s?.flags?.c10_rayssa_status==='jullia'||s?.flags?.c10_rayssa_justica==='foragida';
const cast=s=>IDS.filter(x=>survivor(s,x)&&!(x==='rayssa'&&rayFled(s)));
const witness=s=>[...cast(s).filter(x=>x!=='rayssa')][0]||null;
const female=x=>FEM.has(x);
const his=x=>female(x)?'dela':'dele';
const pron=x=>female(x)?'ela':'ele';
const introPron=s=>s?.hero?.pronouns==='ela'?'ela':s?.hero?.pronouns==='elu'?'elu':'ele';
const C=(text,to,effects=[])=>({text,to,effects});
const F=(key,val=true)=>['flag','c170_'+key,val];
const S=(key,val)=>['set','c170_'+key,val];
function add(id,location,time,scene,text='',choices=[]){if(N[id])throw Error('1.7.0 cena repetida: '+id);const node={id,chapter:CH,location,time,scene,text,choices};N[id]=node;H.push(node)}
add('c170_amparo','ESTRADA DO LAGO · PRIMEIROS SOCORROS','05:52','road');
add('c170_observacao','UNIDADE MÉDICA DE LAKEWOOD','09:18','house');
add('c170_diego','UNIDADE MÉDICA · CORREDOR RESERVADO','09:31','house');
add('c170_chamada','UNIDADE MÉDICA · SALA DE DEPOIMENTOS','09:38','house');
add('c170_hero','UNIDADE MÉDICA · DEPOIMENTO DO PROTAGONISTA','09:44','house');
add('c170_hero_resposta','UNIDADE MÉDICA · DEPOIMENTO DO PROTAGONISTA','09:48','house');
for(const id of IDS){add('c170_depo_'+id,'DEPOIMENTO · '+name(id).toUpperCase(),'10:15','house');add('c170_fim_'+id,'DEPOIMENTO · '+name(id).toUpperCase(),'10:19','house')}
add('c170_diego_final','UNIDADE MÉDICA · ÚLTIMAS PALAVRAS','11:33','house');
add('c170_intervalo','LAKEWOOD · O DIA QUE VEIO DEPOIS','11:43','road');
const nextOf=(s,cur)=>{
 const arr=cast(s);
 if(cur==='hero')return arr.length?'c170_depo_'+arr[0]:'c170_diego_final';
 const i=arr.indexOf(cur);
 return i>=0&&i+1<arr.length?'c170_depo_'+arr[i+1]:'c170_diego_final';
};
const peers={
 isabella:'rayssa',samuel:'allan',allan:'samuel',laisla:'rauanny',rauanny:'laisla',ryan:'breno',breno:'ryan',rayssa:'isabella'
};
const specifics={
 isabella:{
  intro:'Isabella alisa a borda do cobertor térmico. Ela ainda tem lama sob as unhas e insiste em não olhar diretamente para a câmera de registro.',
  opener:'Eu achei que conhecia todo mundo daquela festa. Só que eu tava vivendo com uma história pela metade. Passei um ano achando que a Jullia tava morta. E minha melhor amiga sabia.',
  near:'A gente dividia fone voltando da escola, sabia? A Rayssa colocava música ruim só pra me irritar. Agora eu lembro disso e não sei nem se fico com saudade ou com raiva.',
  lost:'A Rayssa morreu antes de me explicar tudo olhando na minha cara. Eu tô com raiva dela. E tenho saudade. Que merda de sentimento é esse?',
  close:'Eu não quero que escrevam que a Rayssa era só uma traidora ou só uma coitada. Ela foi minha amiga. E fez uma coisa terrível. As duas coisas são verdade.',
  question:'Quando você começou a suspeitar que Rayssa escondia alguma coisa?'
 },
 samuel:{
  intro:'Samuel passa a mão pelo rosto quando Diego coloca o gravador na mesa. Não pede água; pede que não interrompam enquanto conseguir falar.',
  opener:'Eu tava dirigindo naquela noite. Bebi, fiz merda, não consegui impedir o que aconteceu. Eu sei que nenhuma declaração vai mudar isso.',
  near:'O Allan ia me encher o saco pelo resto da vida se soubesse que eu tô dizendo isso, mas ele era o único que conseguia me mandar parar e ainda ficar do meu lado.',
  lost:'O Allan morreu. Meu melhor amigo desde criança morreu nessa história, e eu nem sei como explicar pra família dele que eu não consegui trazer ele de volta.',
  close:'Tem uma bicicleta velha na garagem que a gente nunca consertou direito. Eu tinha vergonha daquela lembrança. Agora eu daria tudo pra ouvir ele rir disso de novo.',
  question:'Você quer corrigir alguma coisa do que disse sobre a noite do acidente?'
 },
 allan:{
  intro:'Allan tenta fazer uma piada quando a câmera acende. Para no meio, irritado consigo mesmo, e pede para recomeçar.',
  opener:'Eu pensei que a gente tava sendo perseguido porque alguém sabia do que fizemos. A verdade é pior. A gente também machucou a Jullia e depois fingiu que nada tinha acontecido.',
  near:'O Sam sempre achou que podia resolver tudo no grito. Eu ficava com raiva e depois ia lá ver se ele tinha comido alguma coisa. Amizade idiota, né?',
  lost:'O Samuel morreu e eu fiquei vivo. Era pra eu estar feliz por respirar, mas eu só penso que devia ter segurado a chave da van naquela noite.',
  close:'Eu não quero que vocês transformem os mortos num monte de números. Eles eram gente. A gente fazia bolo horrível junto, pelo amor de Deus.',
  question:'Você se culpa por não ter impedido alguma escolha do grupo?'
 },
 laisla:{
  intro:'Laisla pergunta se a porta pode ficar entreaberta. A policial concorda. Só então ela aceita sentar.',
  opener:'Quando começaram a bater na janela do meu apartamento, eu jurei que nunca mais ia entrar num quarto escuro. No lago eu pensei a mesma coisa. Não quero sentir isso de novo.',
  near:'A Rauanny me fez um bolo de aniversário que tinha gosto de fermento. Eu comi duas fatias só pra não magoar ela. A gente brigava por coisa tão pequena...',
  lost:'A Rauanny não voltou. Era minha melhor amiga. Eu nem consegui dizer que aquele bolo tava horrível. Parece idiota falar disso agora, mas é o que eu lembro.',
  close:'Eu queria ter coragem de pedir ajuda antes. Em vez disso, passei semanas fingindo que dava conta sozinha.',
  question:'O que aconteceu quando vocês se separaram na perseguição?'
 },
 rauanny:{
  intro:'Rauanny entra na sala com passos firmes, mas treme quando Diego menciona a palavra «amiga». Ela encosta as mãos na mesa.',
  opener:'Todo mundo fala que eu sou forte. Eu não fui forte a noite inteira. Eu tive medo pra caralho, chorei e achei que ia morrer.',
  near:'Eu e a Laisla uma vez fomos até a rodoviária fazer uma viagem sem passagem. Voltamos pra casa de ônibus e dissemos que tinha sido uma aventura.',
  lost:'A Laisla morreu. E eu continuo carregando um chaveiro daquela viagem que nem aconteceu. Eu daria qualquer coisa pra ouvir ela me chamar de irresponsável mais uma vez.',
  close:'Se vocês forem escrever meu depoimento, escreve que eu tive medo. Não quero virar a garota corajosa da reportagem. Eu só sobrevivi.',
  question:'O que você sentiu quando precisou decidir se ajudava outra pessoa ou fugia?'
 },
 ryan:{
  intro:'Ryan olha para a caneta de Diego e quase comenta que o modelo é feio. Desiste da piada antes de abrir a boca.',
  opener:'Eu lembro das amarras. Do barulho dos passos perto da cadeira. Tinha hora que eu só conseguia pensar que ninguém ia achar onde eu tava.',
  near:'O Breno ia rir da minha cara por eu falar isso, mas ele tinha um jeito de ficar do lado da gente sem fazer escândalo. Eu demorei pra perceber.',
  lost:'O Breno morreu. E eu nunca falei pra ele o quanto significou ter alguém que me escutava, até quando eu tava sendo um babaca.',
  close:'Eu queria que a parte da minha vida antes de Lakewood também entrasse na história. A gente gostava de cinema ruim, sabia? Não era só grito e sangue.',
  question:'O que você se lembra de ter ouvido enquanto estava preso ou se escondia?'
 },
 breno:{
  intro:'Breno demora mais que os outros para entrar. Pede que desliguem a câmera até conseguir respirar e, depois, ele mesmo autoriza o registro.',
  opener:'Durante meses eu me senti suspeito só porque ficava quieto. A verdade é que eu tava com medo, igual todo mundo. Só não gritava junto.',
  near:'O Ryan apareceu uma vez na saída da escola com dois guarda-chuvas ridículos. Me deu um inteiro e foi se molhando até a esquina. Eu nunca agradeci direito.',
  lost:'O Ryan morreu. Ele fazia piada quando eu não conseguia falar com ninguém. Agora as piadas sumiram e ficou um silêncio enorme.',
  close:'Eu não quero passar o resto da vida sendo acusado de uma coisa que não fiz só porque não sabia me defender com palavras.',
  question:'Você sentiu que os amigos confiaram em você quando mais precisava?'
 },
 rayssa:{
  intro:'Rayssa se senta longe da porta, acompanhada por uma policial. Diego avisa que ela pode ter assistência jurídica e não é obrigada a incriminar a si mesma. Ela aceita falar sobre o que viveu.',
  opener:'Eu encontrei Jullia viva. Eu menti. Escondi ela de todo mundo e depois passei informações que ajudaram os ataques. Eu não quero que digam que eu não sabia de nada.',
  near:'Eu e a Isa passamos uma tempestade inteira vendo filme que nem terminamos. Hoje eu fico pensando que foi naquela época que eu ainda sabia como ser amiga dela.',
  lost:'A Isabella morreu sem ouvir a verdade de mim. Eu posso repetir que sinto muito mil vezes e não vou ter como dizer isso pra ela.',
  close:'Eu ajudei porque tive medo de perder a Jullia. Depois continuei porque tive medo de perder todo mundo. No fim eu quase perdi até quem eu era.',
  question:'O que você sabia sobre o plano de vingança e quando percebeu que havia assassinatos?'
 }
};
function reportText(s,id){
 const m=specifics[id],p=peers[id],lost=dead(s,p),flags=s.flags||{};
 const proof=flags.c10_proof_saved||flags.c10_evidence||flags.v160_diego_registros;
 const memory=flags['c152_cafeteria_'+id]||flags['c152_sorveteria_'+id]||flags['c152_praca_'+id];
 let shock=lost?m.lost:m.near;
 if(id==='isabella'&&!lost){
   if(flags.c10_rayssa_perdoada)shock+=' Eu disse que precisava de tempo, e continuo precisando. Perdoar não significa voltar a confiar de uma hora pra outra.';
   else if(rayFled(s))shock='Ela escolheu fugir. Eu vi, eu sei o que aconteceu. E ainda assim eu odeio lembrar das nossas tardes juntas.';
 }
 if(id==='rayssa'&&flags.c10_rayssa_justica==='segredo')shock+=' Eu sei que tem gente tentando me proteger de parte disso. Isso não significa que as provas desapareceram.';
 if(id==='samuel'&&flags.resistiu_pacto)shock+=' Eu me lembro de quem tentou impedir o pacto. Eu não ouvi. Isso importa.';
 if(id==='breno'&&flags.c9_breno_conclusao)shock+=' E ainda teve aquela acusação na homenagem. Parecia que era mais fácil me culpar do que me escutar.';
 if(memory)shock+=' A gente chegou a conversar sobre essa lembrança antes do último ataque. Ainda bem.';
 const observation=proof?'Diego coloca as mensagens preservadas sobre a mesa, mas não trata nenhum registro isolado como prova definitiva.':'Diego anota os horários com cuidado, deixando claro que vai precisar conferir registros e outras testemunhas.';
 return `${m.intro}\n\nDiego: — Eu sei que foi uma noite horrível. Se ficar demais, você me diz. ${m.question}\n\n${name(id)}: — ${m.opener}\n\n${name(id)}: — ${shock}\n\n${observation}\n\nDiego: — E o que você gostaria que as pessoas soubessem, além do que aconteceu no lago?\n\n${name(id)}: — ${m.close}`;
}
function chooseResult(s,id){
 const answer=s.flags?.['c170_depo_resposta_'+id];
 if(answer==='verdade')return `\n\nDiego: — Obrigado por não esconder a parte difícil. Eu vou comparar seu relato com as provas. Não vou prometer que todo mundo vai gostar do que descobrir.\n\n${name(id)}: — Eu também não tô esperando isso.`;
 if(answer==='pausa')return `\n\nDiego: — Tá bom. A gente para por aqui. Você pode continuar quando tiver condição. Não precisa se destruir pra me convencer de que foi real.\n\n${name(id)} deixa a sala acompanhad${female(id)?'a':'o'} por um profissional de saúde.`;
 return '';
}
function route(id,s,n){if(!n||!s)return n;const f=s.flags||{};
 // Recuperação para saves incompletos/antigos: memória do reencontro sem destino gravado.
 if(id.startsWith('c152_future_')&&(n.choices||[]).some(c=>!N[c.to])){
  return {...n,choices:[C('Voltar à confraternização','k10_43')]};
 }

 if(id==='k10_36'){
  const survivors=cast(s).filter(x=>x!=='rayssa');
  const names=survivors.slice(0,3).map(name).join(', ');
  const heroLine=dead(s,'hero')?'Um dos policiais faz uma anotação ao perceber que o protagonista não está entre os resgatados.':'Diego encontra você perto da estrada, examina o corte na sua roupa e chama um socorrista antes de fazer perguntas.';
  return {...n,text:`O céu cinzento finalmente começa a ficar azul. Um carro da polícia abre passagem pelos galhos caídos, seguido por ambulâncias e uma caminhonete com equipamento de resgate. Eles não chegaram antes: a estrada ficou bloqueada durante a madrugada, e a localização só foi confirmada pouco tempo atrás.\n\nDiego: — Primeiro, atendimento. Depois a gente conversa. Quero nome e último lugar onde cada pessoa foi vista. Ninguém entra nessa mata sozinho.\n\n${heroLine}\n\n${names?`Ao lado da varanda, ${names} recebem cobertores e avaliação dos socorristas. Os profissionais conferem ferimentos e sinais vitais sem prometer que todo mundo está bem.`:'A equipe encontra silêncio e sinais de luta. Diego não inventa que há alguém esperando na varanda: manda procurar os desaparecidos e prestar atendimento a quem restou.'}\n\nEnfermeira: — Quem estiver com sangramento, fica comigo. Não tira o curativo pra mostrar a ferida!\n\nDiego: — Eu sei que vocês estão assustados. E sei que muitos tentaram me avisar. Agora a gente vai tirar vocês daqui. Um de cada vez.`,choices:[C('Ajudar a equipe a identificar os feridos e os desaparecidos','c170_amparo')]};
 }
 if(id==='c170_amparo'){
  const alive=cast(s),injured=alive.filter(x=>window.UG150?.injury?.(s,x));
  const person=injured[0]||alive.find(x=>x!=='rayssa')||null;
  const care=person?`${name(person)} recebe atendimento perto da ambulância. Um paramédico checa a respiração de ${pron(person)}, cobre seus ombros e pergunta se consegue mexer os dedos. ${name(person)} responde devagar, tentando manter os olhos abertos.`:'Sem outro amigo consciente à vista, Diego se agacha ao lado do lugar onde encontraram as marcas da luta. Ele cobre os pertences recolhidos, enquanto o pessoal do resgate organiza a busca.';
  const heroPart=dead(s,'hero')?`${name(witness(s)||'Diego')} olha para o lugar onde o protagonista deveria estar. Ninguém tenta suavizar a perda com uma frase pronta.`:`Você segura a manta térmica com força. A mão não para de tremer. Diego percebe e se abaixa para falar no mesmo nível que você.\n\nDiego: — Você não precisa me contar a história inteira agora. Preciso só que diga se alguém ficou na trilha, na casa ou no deck.`;
  return {...n,text:`Os primeiros socorros acontecem ao lado da estrada, longe do deck e das tábuas onde a luta terminou.\n\n${care}\n\n${heroPart}\n\nA equipe confirma nomes e horários. Os pacientes em pior estado seguem diretamente ao hospital; ninguém é mantido ali por causa de perguntas policiais. Diego chama outra equipe para continuar vasculhando a margem enquanto os veículos deixam a propriedade.`,choices:[C('Acompanhar a busca e saber quem ainda falta','k10_37')]};
 }
 if(id==='k10_42'){
  // A revelação à irmã não pode ser só um resumo apressado. Ela não é cúmplice.
  const source=dead(s,'hero')?name(witness(s)||'Diego'):'Você';
  const claim=dead(s,'hero')&&!witness(s)?'Diego: — A equipe confirmou a identidade de Jullia após examinar os registros e o material do deck.':`${source}: — Era. A gente viu o rosto dela.`;
  const fate=f.c10_jullia_fim==='presa'?'Ela está sob custódia, recebendo atendimento. Vai responder pelo que fez.':f.c10_jullia_fim==='fuga'||f.c10_jullia_fim==='lago'&&!f.c10_pistola?'Ela escapou. As equipes estão procurando, e ninguém vai afirmar que morreu sem encontrar provas.':'Ela caiu no lago durante a luta. Houve disparos, mas ainda precisamos confirmar o que aconteceu.';
  return {...n,text:`Bella sai do carro acompanhada de Diego. Quando reconhece o deck, perde o passo.\n\nBella: — Diz que não é verdade. Era mesmo a Jullia debaixo daquela máscara?\n\n${claim}\n\nBella: — Eu passei um ano achando que tinha perdido minha irmã. Minha mãe... eu não consigo nem pensar na minha mãe ouvindo isso.\n\nDiego: — Bella, olha pra mim. Você não tem culpa pelo que sua irmã decidiu esconder. E não vai precisar escutar tudo agora.\n\nBella: — Eu quero ouvir. Se for a verdade, eu quero ouvir.\n\n${source}: — ${fate}\n\nBella encosta na porta do carro, tentando respirar.\n\nBella: — Eu queria tanto que ela estivesse viva. Era tudo que eu pedia. Agora eu nem sei como desejar isso sem pensar nas pessoas que morreram.\n\nDiego: — Você pode amar sua irmã e reconhecer o que ela fez. Uma coisa não obriga a outra a desaparecer.\n\nBella: — E o Moisés? Até onde ele tava metido nisso?\n\nDiego: — Vou verificar tudo que ele sabia. Não vou te dar uma resposta só pra acabar essa conversa.\n\nUm socorrista chama Diego para confirmar o transporte dos feridos. Bella permanece ao lado da viatura, com um copo d'água nas mãos, tentando entender um ano inteiro de silêncio.`,choices:[C('Continuar para o hospital e os depoimentos da manhã','c170_observacao')]};
 }
 if(id==='c170_observacao'){
   const survivors=cast(s);
   const hospitalized=survivors.filter(x=>window.UG150?.injury?.(s,x));
   const who=hospitalized.slice(0,3).map(name).join(', ');
   return {...n,text:`Mais tarde naquela manhã, na unidade médica de Lakewood, os corredores têm cheiro de antisséptico e roupas molhadas. As equipes já passaram horas cuidando dos feridos. Os depoimentos só começam depois de autorização médica, e alguns serão colhidos ao lado da cama.\n\n${who?`${who} ainda precisam de curativos, exames ou acompanhamento. Diego pede que ninguém seja retirado do atendimento para cumprir um horário de interrogatório.`:'A equipe termina as avaliações e mantém os sobreviventes sob observação. Diego espera que os profissionais digam quem está em condição de conversar.'}\n\nEnfermeira: — Se alguém ficar tonto ou entrar em pânico, a gente para. Esses jovens passaram a noite inteira em perigo.\n\nDiego: — Entendido. Eu quero relatos, não uma disputa pra ver quem aguenta mais pressão.\n\nNa entrada da sala, há uma câmera simples, um copo d'água e duas cadeiras. A noite acabou. As perguntas, não.`,choices:[C('Acompanhar Diego antes dos depoimentos','c170_diego')]};
 }
 if(id==='c170_diego'){
   const trust=!!(f.v160_diego_avisado||f.v160_diego_registros||f.v160_diego_contato||f.v160_diego_alerta_final);
   const actor=dead(s,'hero')?name(witness(s)||'Bella'):'Você';
   const last=trust?'Diego deixa uma pasta de mensagens sobre a mesa. Algumas haviam sido entregues a ele antes do massacre, e agora podem ser confrontadas com os horários dos ataques.':'Diego abre a pasta de ocorrências. Há relatos antigos de perseguição que nunca vieram acompanhados de todos os detalhes.';
   return {...n,text:`Diego fecha a porta do corredor para que outros pacientes não escutem. Ainda veste a mesma camisa amarrotada do resgate.\n\nDiego: — Eu sou xerife desta cidade faz tempo suficiente pra saber quando um grupo tá escondendo alguma coisa. Mas nunca imaginei que chegaria num cenário desses.\n\n${last}\n\n${actor}: — Você já sabia da Jullia?\n\nDiego: — Não. Eu suspeitava que vocês tinham medo de me contar alguma coisa sobre aquela estrada. Agora sei que isso custou caro.\n\nDiego: — Meu trabalho não é fazer vocês repetirem a mesma versão. É descobrir o que aconteceu, proteger quem ainda corre perigo e não deixar as famílias receberem respostas inventadas.\n\nDiego: — Vou ouvir cada um separadamente. Quem precisar parar, para. E vocês têm o direito de receber orientação jurídica. Eu não vou prometer impunidade em troca de depoimento.`,choices:[C('Pedir que Diego explique como serão os depoimentos','c170_chamada')]};
 }
 if(id==='c170_chamada'){
   const alive=cast(s);
   const listed=alive.map(name);
   const order=listed.length?listed.join(', '):'Nenhum outro integrante do grupo está em condições de prestar depoimento';
   const all=dead(s,'hero')?'O protagonista não pode depor: a morte foi confirmada na madrugada. Diego abre a primeira pasta em nome de quem não voltou.':'Diego chama você primeiro. Ele quer saber o que você realmente viu, não uma versão ajustada à dos amigos.';
   return {...n,text:`DEPOIMENTOS — MANHÃ SEGUINTE\n\nDiego: — Não é um julgamento. Vocês não precisam decorar fala nenhuma. Se não lembram de algo, digam que não lembram. Se souberem de uma mentira, falem.\n\n${all}\n\nDepois serão ouvidos, individualmente e respeitando as orientações médicas: ${order}.\n\nOs profissionais entram e saem do corredor. Ninguém é colocado na mesma sala com a pessoa que o acusou. O áudio registra pausas, choro e silêncios tanto quanto palavras.`,choices:[C('Iniciar os depoimentos',dead(s,'hero')?nextOf(s,'hero'):'c170_hero')]};
 }
 if(id==='c170_hero'){
   if(dead(s,'hero'))return {...n,text:'O protagonista não está vivo para este depoimento. Diego guarda a pasta, e a narrativa acompanha os sobreviventes.',choices:[C('Ouvir os sobreviventes',nextOf(s,'hero'))]};
   const fear={perda:'Perder alguém e descobrir que não consegui impedir.',abandono:'Ser deixado pra trás por quem eu confiava.',mentira:'Descobrir que as pessoas mais próximas estavam mentindo pra mim.'};
   const intro={protetor:'Você lembra de cada pessoa que tentou tirar do caminho da faca.',observador:'Você lembra de detalhes de horários, portas e vozes que pareciam sem sentido naquela noite.',franco:'Você já tinha prometido não engolir mais a verdade só pra manter a paz.',impulsivo:'Você pensa nas vezes em que correu antes de ouvir o resto do plano.'};
   const love=s.romanceEscolhido,rom=['ryan','breno','rayssa','rauanny'].includes(love)?love:null;
   const relationship=rom?dead(s,rom)?`Você pensa em ${name(rom)}. O que existiu entre vocês não vai ter uma próxima conversa.`:rom==='rayssa'?`O nome de Rayssa aparece na pasta. O que você sentiu por ela não torna o que aconteceu menos grave.`:`Você lembra de ${name(rom)} ao lado da ambulância, viv${female(rom)?'a':'o'}, e da conversa que ainda precisam ter.`:'';
   return {...n,text:`DEPOIMENTO — ${hero(s).toUpperCase()}\n\nDiego: — Eu vou perguntar uma vez, e você pode pensar antes de responder. Como foi perceber que Jullia tava viva?\n\nVocê: — Parecia que alguém tinha arrancado o chão. A gente passou um ano vivendo com medo de uma morte... e ela tava ali, olhando pra nossa cara.\n\nDiego: — O que mais te assustou naquela noite?\n\nVocê: — ${fear[s.hero?.fear]||fear.perda}\n\n${intro[s.hero?.temperament]||intro.observador}\n\n${relationship}\n\nDiego: — E aquela noite na estrada, um ano antes? Você tentou impedir o que aconteceu depois do atropelamento? Eu preciso da sua resposta, não da resposta do grupo.`,choices:[
     C('Admitir o que viu e o que tentou impedir','c170_hero_resposta',[S('hero_tom','verdade')]),
     C('Falar dos amigos perdidos, mas reconhecer as próprias escolhas','c170_hero_resposta',[S('hero_tom','luto')]),
     C('Dizer que não consegue responder tudo agora','c170_hero_resposta',[S('hero_tom','pausa')])
   ]};
 }
 if(id==='c170_hero_resposta'){
   const tom=f.c170_hero_tom||'verdade';
   const response=tom==='verdade'?f.resistiu_pacto||f.prometeu_verdade?'Você: — Eu tentei falar que era errado esconder o corpo. Não consegui impedir ninguém, mas eu devia ter procurado ajuda depois.':'Você: — Eu participei daquele silêncio. Eu tava com medo e fingi que ficar calado protegia todo mundo. Não protegia.':tom==='luto'?'Você: — Eu lembro de cada amigo que perdi. Mas não vou usar a morte deles pra fingir que a gente não fez uma escolha terrível naquela estrada.':'Você: — Eu tô tentando. Só que agora eu preciso parar. Eu ainda vejo a Jullia no deck toda vez que fecho os olhos.';
   const comment=tom==='pausa'?'Diego: — Tudo bem. A gente interrompe. A sua saúde vem antes de qualquer gravação.':'Diego: — Eu ouvi. Esse relato vai ser registrado e confrontado com o das outras pessoas, não apagado nem transformado em prova de uma coisa que você não disse.';
   return {...n,text:`Diego dá tempo para você respirar.\n\n${response}\n\n${comment}\n\nVocê observa o gravador desligar. Nenhuma das respostas apaga as decisões que tomou. Mas, pela primeira vez, não é outra pessoa contando sua história por você.`,choices:[C('Ouvir os depoimentos dos amigos que sobreviveram',nextOf(s,'hero'))]};
 }
 if(id.startsWith('c170_depo_')){
   const who=id.slice('c170_depo_'.length);
   if(!IDS.includes(who))return n;
   if(!survivor(s,who)||who==='rayssa'&&rayFled(s))return {...n,text:'Esta pessoa não pode prestar depoimento porque não está viva ou disponível. Diego não inventa uma fala para preencher o silêncio.',choices:[C('Seguir',nextOf(s,who))]};
   const i=cast(s).indexOf(who);const total=10*60+5+Math.max(0,i)*9;
   const clock=String(Math.floor(total/60)).padStart(2,'0')+':'+String(total%60).padStart(2,'0');
   return {...n,time:clock,text:reportText(s,who),choices:[
     C('Responder com sinceridade, mesmo que a verdade doa','c170_fim_'+who,[S('depo_resposta_'+who,'verdade')]),
     C('Pedir uma pausa e encerrar o depoimento por enquanto','c170_fim_'+who,[S('depo_resposta_'+who,'pausa')])
   ]};
 }
 if(id.startsWith('c170_fim_')){
   const who=id.slice('c170_fim_'.length);
   if(!IDS.includes(who))return n;
   if(!survivor(s,who)||who==='rayssa'&&rayFled(s))return {...n,text:'O depoimento não foi realizado.',choices:[C('Seguir',nextOf(s,who))]};
   const choice=f['c170_depo_resposta_'+who];
   const words=choice==='pausa'?`${name(who)}: — Eu preciso parar. Desculpa. Eu tô tentando, mas não consigo continuar agora.\n\nDiego: — Não precisa pedir desculpa. O depoimento pode continuar depois. Vai cuidar de você.`:`${name(who)}: — Eu não quero mais mudar minha história pra facilitar a vida de ninguém. Foi isso que aconteceu.\n\nDiego: — Entendi. Vou registrar e conferir com os outros relatos. Obrigado por falar.`;
   const stamp=`${name(who)} se levanta com cuidado; a equipe médica confirma se precisa voltar ao atendimento. Diego desliga o gravador antes de chamar a próxima pessoa.`;
   return {...n,text:`${words}\n\n${stamp}`,choices:[C('Acompanhar o próximo depoimento',nextOf(s,who))]};
 }
 if(id==='c170_diego_final'){
   const alive=cast(s).filter(x=>x!=='rayssa');
   const lose=IDS.filter(x=>dead(s,x));
   const witnesses=alive.slice(0,2).map(name).join(' e ');
   const who=dead(s,'hero')?(witnesses||'Bella'):hero(s);
   const note=lose.length?`Diego fecha a pasta onde anotou as mortes de ${lose.map(name).join(', ')}. Antes de guardar, confere os nomes outra vez.`:'Diego revê os nomes dos resgatados. O fato de estarem vivos não torna a investigação simples.';
   const remembered=(f.v160_diego_avisado||f.v160_diego_registros||f.v160_diego_contato||f.v160_diego_alerta_final)?(dead(s,'hero')?'Diego: — Alguém do grupo tentou me avisar antes. Eu devia ter entendido que o perigo era maior. Vou continuar investigando.\n\n':'Diego: — Eu lembro que você tentou falar comigo antes. A gente tinha peças da história e não sabia como juntar. Eu vou continuar tentando, mesmo agora.\n\n'):'';
   return {...n,text:`A última gravação termina. Diego recolhe os papéis sem pressa e pede que as equipes preservem registros, fotografias e os horários das ligações.\n\n${remembered}${note}\n\n${who}: — Você acha que acabou?\n\nDiego: — Acho que os ataques daquela noite acabaram. Mas ainda tem coisa que não fecha: informações que chegaram à pessoa mascarada cedo demais, portas abertas na hora errada, gente que sabia mais do que disse.\n\nDiego: — Isso não é motivo pra acusar qualquer um. É motivo pra continuar investigando.\n\n${who}: — Então o que a gente faz agora?\n\nDiego: — Agora vocês descansam. Depois, quando puderem, voltam a viver. Eu fico com as perguntas que são meu trabalho responder.\n\nEle passa uma mão pelo rosto, cansado. Pela primeira vez naquela manhã, tira o distintivo do bolso e o apoia sobre a mesa.`,choices:[C('Sair da unidade médica e seguir em frente','c170_intervalo')]};
 }
 if(id==='c170_intervalo'){
   const heroLine=dead(s,'hero')?'A ausência do protagonista acompanha os sobreviventes durante os dias seguintes. Não existe despedida que faça essa perda ficar menor.':`Você sai para o ar da manhã. A cidade continua fazendo barulho: ônibus, lojas abrindo, gente atravessando a rua sem saber o que aconteceu no lago. Não parece justo. Ainda assim, por um instante, você consegue respirar.`;
   return {...n,text:`Do lado de fora, o céu está claro. As ambulâncias já saíram. O que aconteceu naquela noite agora está em relatórios, prontuários e lembranças que cada amigo vai carregar de um jeito próprio.\n\n${heroLine}\n\nNos meses seguintes haverá tratamento, conflitos, investigações e dias absolutamente comuns. As pessoas não vão se recuperar todas no mesmo ritmo. Algumas não conseguirão se reunir. Outras vão descobrir que, apesar de tudo, ainda querem tentar.`,choices:[C('Quatro meses depois','k10_43')]};
 }
 // Cena de continuidade: não divulgar a morte antes da confirmação.
 if(dead(s,'hero')&&cast(s).length===0){
   const emptyScenes={
     'k10_35':['Diego chega ao deck depois que a equipe registra o fim do confronto. Nenhum dos nove jovens está vivo para contar o que aconteceu. Os médicos recolhem os corpos com respeito, enquanto os agentes isolam a área.','k10_36'],
     'k10_37':['A equipe percorre a trilha e o galpão. Todos os nomes são confrontados com o registro das vítimas. Ninguém anuncia o resgate milagroso de uma pessoa que não desapareceu.','k10_40'],
     'k10_38':['Os socorristas retornam sem novos pacientes. Diego confirma os nomes com o rádio, sem inventar outro sobrevivente.','k10_39'],
     'k10_39':['A busca termina. Os veículos deixam a margem e Diego reúne os relatórios médicos para identificar cada vítima.','k10_40'],
     'k10_40':['Na ausência dos jovens que poderiam testemunhar, Diego reúne provas materiais, registros e depoimentos de Bella e de outras pessoas envolvidas. Ele não presume culpa nem inocência a partir do silêncio.','k10_41'],
     'k10_41':['As ambulâncias partem da propriedade do lago. Diego espera por Bella junto à estrada para explicar o que foi descoberto, sem apresentar conjecturas como fatos.','k10_42']
   };
   if(emptyScenes[id])return {...n,text:emptyScenes[id][0],choices:[C('Continuar',emptyScenes[id][1])]};
 }
 if(id==='k10_37'&&!f.c10_aparente_nome)return {...n,text:`A equipe de busca percorre a trilha, o deck e o galpão. Já foram localizadas as pessoas que ainda podiam ser socorridas. Não há uma maca misteriosa surgindo da margem sem alguém realmente desaparecido.\n\nDiego: — Confiram cada cômodo e cada acesso. Preciso dos nomes confirmados no relatório, não de palpites.\n\nUm agente informa que a busca de vítimas está terminando.`,choices:[C('Voltar às ambulâncias e ouvir o resultado da busca','k10_40')]};
 return n;
}
window.UG170=Object.freeze({resolve:route,cast,dead,nextOf});
})();
