/* O ÚLTIMO GRITO · CAPÍTULO 9: UM ÚLTIMO JOGO · V1.3
 * No public-facing passage may disclose the identities of the masked attackers.
 * Saves are additive; all progression is in c9_* flags on existing slot.
 */
(()=>{'use strict';
const TITLE='CAPÍTULO 09 · UM ÚLTIMO JOGO';
const L={rayssa:'Rayssa',ryan:'Ryan',laisla:'Laisla',samuel:'Samuel',rauanny:'Rauanny',allan:'Allan',isabella:'Isabella',breno:'Breno'};
const IDS=Object.keys(L),NODES=window.NODES,ALL=window.HISTORIA,nodes=[];
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const G=(to,text='Continuar',effects=[])=>C(text,to,effects);
const F=(key,v=true)=>['flag','c9_'+key,v],S=(key,v)=>['set','c9_'+key,v],B=(id,v)=>['bond',id,v],FB=(a,b,v)=>['friendBond',[a,b],v],Q=id=>['clue',id];
function N(id,location,time,scene,text,choices=[]){if(NODES[id]||nodes.some(n=>n.id===id))throw Error('Cap9 id duplicado '+id);nodes.push({id,chapter:TITLE,location,time,scene,text,choices});}
const dead=(s,id)=>!!s?.flags?.['c9_morto_'+id]||!!window.UG8?.dead?.(s,id)||!!s?.flags?.['c8_morto_'+id];
const alive=s=>IDS.filter(id=>!dead(s,id));
const name=id=>L[id]||id;
const names=a=>a.length===0?'ninguém':a.length===1?name(a[0]):a.length===2?a.map(name).join(' e '):a.slice(0,-1).map(name).join(', ')+' e '+name(a[a.length-1]);
const lover=s=>!dead(s,s.romanceEscolhido)&&L[s.romanceEscolhido]?s.romanceEscolhido:null;
const bf=s=>Number(s.bonds?.[lover(s)]||50);
const suspect=s=>['breno','samuel','ryan','allan','isabella','rauanny','laisla'].find(x=>!dead(s,x))||null;
const visits=s=>IDS.filter(x=>s.flags?.['c9_chat_done_'+x]).length;
const heavy=(s,id)=>!!s?.flags?.['c8_grave_'+id]||!!s?.flags?.['c7_ferido_'+id]||!!s?.flags?.['c6_ferida_'+id];
const CHAT={
 allan:{intro:'Allan fica encarando o sorvete enquanto o gelo escorre pelo copo. Pela primeira vez, ele não tenta transformar o silêncio numa piada.',past:'Allan: — Quando eu e o Samu éramos menores, a gente achava que o mundo acabava quando perdia uma prova. Queria poder reclamar só disso agora.',fear:'Allan: — O que me dá medo é alguém sair daqui achando que eu não me importo. Eu brinco porque, se eu parar, às vezes não consigo nem respirar.',dream:'Allan: — Quero pegar um ônibus com vocês sem saber onde vai parar. Comer num restaurante horrível e ter uma história idiota pra contar na volta.',hard:'Allan: — Eu fico do lado do Samuel porque conheço o coração dele. Mas isso não quer dizer que eu concordo com cada escolha dele.',close:'Allan: — Obrigado por ficar. Não precisava nem saber o que dizer, só ficar sentado aqui já ajudou.'},
 samuel:{intro:'Samuel remexe o canudinho até o papel ficar ensopado. O copo está intocado. Ele olha duas vezes para a porta da sorveteria.',past:'Samuel: — Eu conheço a voz do Allan desde moleque. Se o telefone tocasse três da manhã, eu sabia que era ele antes de olhar. Às vezes eu ainda espero ouvir.',fear:'Samuel: — Eu tenho medo de dormir. Toda vez que fecho os olhos vejo a estrada, e agora tem mais gente que não volta pra casa.',dream:'Samuel: — Eu pensava em abrir uma oficina pequena. Não pra fugir do que fiz. Só pra um dia construir alguma coisa com essas mãos.',hard:'Samuel: — Pode me odiar por dirigir a van. Eu também me odeio por isso. Só não fala que eu quis machucar alguém.',close:'Samuel: — Não conta pra ninguém que eu fiquei assim. Ou conta. Nem sei mais por que eu finjo ser forte.'},
 isabella:{intro:'Isabella ajeita três guardanapos perfeitamente alinhados. Seu telefone vibra sobre a mesa; ela vira a tela para baixo.',past:'Isabella: — A gente tinha mania de planejar tudo. Até quem ia levar salgadinho pra reunião. Eu não consigo aceitar que ninguém planejou um jeito de salvar nossos amigos.',fear:'Isabella: — Eu tenho medo de acusar a pessoa errada. Mas também tenho medo de deixar a pessoa certa do meu lado e perceber tarde demais.',dream:'Isabella: — Antes disso eu queria estudar fora. Agora parece egoísmo fazer planos, mas eu ainda quero um futuro.',hard:'Isabella: — Não me pede pra escolher entre acreditar na Rayssa e olhar pras provas. Eu preciso ser capaz de fazer as duas coisas.',close:'Isabella: — Você me deixou pensar alto sem me chamar de paranoica. Isso vale mais do que parece.'},
 laisla:{intro:'Laisla escolhe a taça maior e depois confessa que está sem fome. Suas mãos não param de mexer nos anéis.',past:'Laisla: — Eu lembro de quando a Rauanny dormia lá em casa e a gente inventava uns planos absurdos. Queríamos alugar um apartamento, adotar um cachorro e reclamar da vida adulta.',fear:'Laisla: — Depois do ataque ao meu apartamento, eu assusto até com porta batendo. Quero conseguir rir de novo sem sentir culpa.',dream:'Laisla: — Quero viver o suficiente pra fazer festa por motivo bom. Aniversário, formatura, casamento de alguém... qualquer coisa sem viatura na porta.',hard:'Laisla: — A Rau me conhece, mas às vezes quer cuidar de mim tanto que esquece que eu ainda consigo escolher.',close:'Laisla: — Me promete que vai tentar se divertir hoje, nem que seja por dez minutos. Eu preciso acreditar que ainda dá.'},
 rauanny:{intro:'Rauanny se acomoda do lado de fora, de onde consegue observar a rua. O sorvete começa a derreter antes que ela dê a primeira colherada.',past:'Rauanny: — A Laisla sempre foi a primeira pessoa a aparecer na minha porta. Mesmo quando eu não pedi. Principalmente quando eu não pedi.',fear:'Rauanny: — Tenho medo de perder o controle e falar alguma coisa que nunca mais vou poder consertar. A última discussão podia ser a última conversa.',dream:'Rauanny: — Eu queria viajar, ver o mar, acordar sem celular apitando. E queria levar gente que me faz sentir em casa.',hard:'Rauanny: — Não sou grossa porque não me importo. Às vezes eu só tenho medo demais pra ficar falando bonito.',close:'Rauanny: — Valeu por não me mandar relaxar. Eu juro que, se soubesse como, já tinha relaxado.'},
 breno:{intro:'Breno escolhe uma mesa perto da janela e deixa uma cadeira vazia entre vocês. Depois a aproxima um pouco, quase sem notar.',past:'Breno: — Eu guardo umas fotos antigas no celular. Tem gente nelas que eu nunca mais vou ver. E eu tinha vergonha de pedir outra foto.',fear:'Breno: — Todo mundo pensa que eu fico afastado porque não gosto de ninguém. Às vezes fico porque tenho medo de ser o primeiro a perder alguém.',dream:'Breno: — Eu queria uma casa pequena, com janela grande. Um lugar onde ninguém precisa trancar a porta com móvel.',hard:'Breno: — Quando a Rauanny falou de mim na discussão, doeu. Eu sei que pareço esconder coisa até quando tô tentando ajudar.',close:'Breno: — Obrigado por vir até aqui. Eu ia continuar fingindo que não queria companhia.'},
 ryan:{intro:'Ryan finge que vai roubar a cereja da sua taça e desiste quando percebe sua expressão. Ele fica sério, ainda sorrindo de canto.',past:'Ryan: — Eu tenho saudade da gente fazendo besteira sem transformar tudo em despedida. Até das brigas por causa do controle remoto.',fear:'Ryan: — Tenho medo de parar de fazer graça e descobrir que não sei mais quem eu sou. Parece bobo, né?',dream:'Ryan: — Quero poder chamar alguém pra sair sem fazer plano de fuga. Um cinema, uma viagem, uma tarde perdida no shopping.',hard:'Ryan: — Não quero que todo mundo decida por mim porque me acham engraçadinho. Quando o perigo chega eu também penso.',close:'Ryan: — Valeu por me escutar sem pedir que eu faça alguma piada pra melhorar o clima.'},
 rayssa:{intro:'Rayssa abraça o próprio copo entre as mãos. Ela pergunta se você dormiu e não espera a resposta antes de baixar os olhos.',past:'Rayssa: — A Isabella me conhecia antes de eu aprender a fingir que tava tudo bem. Às vezes eu queria poder voltar pra um daqueles dias.',fear:'Rayssa: — Eu tenho medo de machucar alguém tentando consertar uma coisa que já não tem conserto.',dream:'Rayssa: — Eu queria uma vida normal. Acordar e saber que vou encontrar todo mundo no fim de semana.',hard:'Rayssa: — Quando alguém me pergunta se tenho alguma coisa a esconder, eu penso em quantas coisas cada um de nós esconde. Não sei nem por onde começaria.',close:'Rayssa: — Você acha que uma pessoa consegue mudar de verdade? Desculpa... não precisa responder agora.'}
};
const MEM={
 allan:{memory:'Samuel relembra quando Allan faltou à própria prova para ajudá-lo a recuperar uma bicicleta roubada. Os dois levaram uma bronca enorme e voltaram rindo.',speaker:'Samuel',line:'— Ele era a primeira pessoa que me procurava quando eu fazia merda. Agora eu não sei pra quem ligar.'},
 samuel:{memory:'Allan se lembra de Samuel ensinando o grupo a trocar um pneu numa tarde quente, mesmo que ninguém estivesse realmente prestando atenção.',speaker:'Allan',line:'— O Samu reclamava de tudo, mas era sempre o primeiro a aparecer quando alguém precisava.'},
 isabella:{memory:'Rayssa conta que Isabella passou a noite acordada com ela antes de uma apresentação, revisando as mesmas falas até as duas começarem a rir.',speaker:'Rayssa',line:'— Ela sempre lembrava até as coisas pequenas sobre mim. Eu não sei como vou aprender a esquecer a voz dela.'},
 rayssa:{memory:'Isabella recorda os fins de tarde que passavam compartilhando fones e dizendo que nunca ficariam tão diferentes a ponto de deixar de ser amigas.',speaker:'Isabella',line:'— Eu dizia que conhecia tudo sobre ela. Talvez ninguém conheça tudo sobre outra pessoa. Mas eu amei minha amiga.'},
 laisla:{memory:'Rauanny se lembra das festas de pijama em que Laisla planejava uma viagem impossível e insistia que as duas comprariam passagens assim que arrumassem emprego.',speaker:'Rauanny',line:'— Ela sempre reservava lugar pra mim. Eu tô com medo de aprender a sentar sozinha.'},
 rauanny:{memory:'Laisla recorda as madrugadas em que Rauanny aparecia com uma sacola de doces depois de alguma discussão, incapaz de pedir desculpa sem fazer primeiro um comentário atravessado.',speaker:'Laisla',line:'— A Rau nunca sabia fazer discurso bonito. Mas ela aparecia. Ela sempre aparecia.'},
 breno:{memory:'Ryan lembra da vez em que Breno silenciosamente ajudou a levar compras pesadas até a casa de um vizinho, sem esperar elogio de ninguém.',speaker:'Ryan',line:'— A gente falava que o Breno sumia. Mas quando alguém precisava dele, ele tava lá.'},
 ryan:{memory:'Breno recorda Ryan dando risada de um filme terrível só para impedir que o clima do grupo ficasse pesado numa tarde de chuva.',speaker:'Breno',line:'— Eu nunca disse pra ele que fez diferença. Deveria ter dito.'}
};
N('k9_01','MIRANTE DE LAKEWOOD','16:18','lake',`Na tarde seguinte à investigação da estação, o céu começa a perder a cor quando você chega ao mirante. Não há palanque, imprensa ou música. Apenas uma mesa coberta por tecido claro, flores trazidas de casas diferentes e fotografias que ninguém conseguiu olhar por muito tempo.

Moisés tem uma vela acesa. Você se lembra da ligação interrompida, da oficina e do quanto ele parecia desesperado para dizer alguma coisa. Não é uma despedida simples. Ele fez parte do segredo, e morreu antes de explicar sua versão.

Bella ajudou a encontrar o mirante. O vento passa pelo cabelo dela, e seus olhos permanecem na fotografia de Jullia que trouxe consigo. A imagem de alguém desaparecido não é colocada junto às fotos das mortes confirmadas.

Quem sobreviveu vai chegando, alguns ainda com curativos, outros evitando tocar nas regiões machucadas. Não é preciso estar completamente recuperado para estar ali. Você vê o esforço nos passos de quem ainda sente dor.

Uma vela apaga. Alguém a acende outra vez.

Bella: — Eu não queria que ninguém passasse por isso sozinho. Nem as famílias. Nem vocês.`,[G('k9_mem_loop','Acompanhar a homenagem de cada pessoa')]);
N('k9_mem_loop','MIRANTE · MESA DE LEMBRANÇAS','16:25','lake',`O grupo permanece perto da mesa, deixando espaço para as histórias que faltam contar. As fotografias não lembram apenas mortes: lembram pessoas que existiam antes do medo.

Você passa o olhar pelos nomes. Ninguém é substituído por uma frase genérica. Cada despedida precisa acontecer.`,[]);
for(const id of IDS){const m=MEM[id];N('k9_mem_'+id,'MIRANTE · UMA DESPEDIDA','16:27','lake',`Você se aproxima da fotografia de ${L[id]}. É difícil lembrar que, antes de tudo isso, era parte de um dia comum.

${m.memory}

A voz de quem fala falha. A mesa está silenciosa, e ninguém tenta preencher imediatamente o espaço que ficou.

${m.speaker}: ${m.line}

Você lembra de como ${L[id]} se movia pelo grupo, de suas manias, de pequenos comentários que não pareciam importantes. Agora uma frase simples pode machucar mais do que a notícia da morte.`,[G('k9_mem_loop','Deixar outra pessoa se despedir',[F('mem_seen_'+id)])]);}
N('k9_mem_moises','MIRANTE · VELA DE MOISÉS','16:35','lake',`A última vela é a de Moisés. Bella olha para a chama antes de falar.

Bella: — Eu passei meses com raiva dele. Achei que ele não se importava nem comigo, nem com a Ju. E talvez tenha feito coisas que eu ainda não entendo.

Bella: — Mas ele morreu com medo. E ninguém merece virar só uma foto numa pasta policial.

Samuel abaixa a cabeça, se ainda estiver ali. Você lembra do telefonema que poderia ter mudado tudo e do tempo que não conseguiram recuperar.

Ninguém precisa dizer que Moisés era perfeito para reconhecer que sua morte foi brutal.`,[G('k9_mem_hero','Fazer sua própria homenagem',[F('mem_seen_moises')])]);
N('k9_mem_hero','MIRANTE · A PALAVRA É SUA','16:41','lake',`Alguém oferece a você uma flor. Todos esperam, mas ninguém exige discurso.

Há muitas maneiras de dizer adeus. A mais difícil talvez seja não tentar corrigir o passado com palavras que chegam tarde demais.`,[
 C('Dizer algumas palavras sobre os amigos','k9_mem_response',[S('homenagem_hero','discurso'),['trait','empatia',2]]),
 C('Compartilhar uma lembrança de alguém que se foi','k9_mem_response',[S('homenagem_hero','lembranca'),['trait','empatia',2]]),
 C('Permanecer em silêncio ao lado de alguém','k9_mem_response',[S('homenagem_hero','silencio'),['trait','cautela',1]])]);
N('k9_mem_response','MIRANTE · DESPEDIDA','16:45','lake',`O vento muda de direção e os últimos raios de sol iluminam o tecido da mesa. Nenhum discurso devolve quem morreu. Ainda assim, sua escolha modifica a forma como os outros atravessam este instante.

Bella olha para a foto de Jullia, separada das velas, e aperta a alça da bolsa.

Bella: — Não quero que a gente se encontre só quando alguém morrer.

Longe do mirante, a cidade continua se preparando para comemorar o próprio aniversário. A vida não esperou que vocês aprendessem a lidar com o luto.`,[G('k9_ice_01','Caminhar com o grupo até a sorveteria')]);
N('k9_ice_01','SORVETERIA · CENTRO','17:12','town',`A sorveteria ainda tem o mesmo sino na porta e as mesmas mesas perto da janela. Por alguns segundos é possível fingir que vocês vieram aqui apenas porque alguém perdeu uma aposta.

A atendente olha os curativos, reconhece rostos e, por delicadeza, não pergunta nada. Laisla, se estiver presente, escolhe uma mesa grande demais. Ryan brinca com os nomes exagerados dos sabores. Samuel demora a pedir.

Você ouve uma conversa sobre uma prova de faculdade, duas crianças brigando por um sorvete e o ruído de copos na pia. São sons de uma vida que vocês quase esqueceram.

O grupo conversa sobre fotografias antigas, sobre o gosto que Allan tinha por combinações improváveis e sobre como algumas lembranças sempre parecem mais felizes depois que alguém parte.

Depois de um tempo, a conversa se divide em pequenos grupos. Você tem a oportunidade de procurar duas pessoas para uma conversa mais profunda.`,[G('k9_ice_choose','Escolher com quem conversar')]);
N('k9_ice_choose','SORVETERIA · CONVERSAS','17:18','town',`O barulho do liquidificador termina. As mesas ficam mais quietas. Ainda existe tempo para conversar com alguém sem precisar falar de assassinos a cada frase.

Algumas amizades carregam desentendimentos recentes. Outras podem estar mais fortes depois de tudo o que enfrentaram. As pessoas não vão esquecer o que você disse no hospital.`,[]);
for(const id of IDS){let x=CHAT[id];N('k9_ice_'+id+'_1','SORVETERIA · CONVERSA COM '+L[id].toUpperCase(),'17:22','town',`Você se aproxima de ${L[id]}.

${x.intro}

${L[id]}: — Achei que você ia passar reto. Tava meio sem saber como começar.`,[
 C('Perguntar de uma lembrança boa','k9_ice_'+id+'_2',[B(id,3),S('chat_'+id+'_tom','passado')]),
 C('Perguntar sobre o que mais tem assustado','k9_ice_'+id+'_2',[B(id,3),S('chat_'+id+'_tom','medo')]),
 C('Conversar sobre os planos que ainda quer realizar','k9_ice_'+id+'_2',[B(id,2),S('chat_'+id+'_tom','sonhos')])]);
N('k9_ice_'+id+'_2','SORVETERIA · CONVERSA COM '+L[id].toUpperCase(),'17:25','town',`Vocês continuam conversando. O sorvete derrete no fundo do copo. Por alguns minutos, falar sobre o futuro parece possível outra vez.

${L[id]}: — Eu tô tentando te explicar sem fazer parecer que é tudo simples. Não é.`,[
 C('Ouvir sem interromper','k9_ice_'+id+'_3',[B(id,3),['trait','empatia',1]]),
 C('Contar que você também tem medo','k9_ice_'+id+'_3',[B(id,2),['trait','franqueza',1]]),
 C('Perguntar como a discussão do grupo afetou vocês','k9_ice_'+id+'_3',[S('chat_'+id+'_conflito',true)])]);
N('k9_ice_'+id+'_3','SORVETERIA · CONVERSA COM '+L[id].toUpperCase(),'17:28','town',`${x.hard}

Você percebe que a conversa voltou para uma mágoa concreta. Não basta perguntar se a pessoa está bem: é preciso aceitar que ela pode não concordar com você.

O telefone de ${L[id]} vibra no canto da mesa. A mensagem é deixada para depois.`,[
 C('Perguntar o que ainda espera do grupo','k9_ice_'+id+'_4',[B(id,2)]),
 C('Pedir desculpa por uma escolha que magoou alguém','k9_ice_'+id+'_4',[B(id,4),['trait','empatia',1]]),
 C('Discordar, mas prometer escutar','k9_ice_'+id+'_4',[B(id,1),['trait','franqueza',1]])]);
N('k9_ice_'+id+'_4','SORVETERIA · DESPEDIDA DE '+L[id].toUpperCase(),'17:32','town',`${x.close}

Há uma pausa longa, mas menos desconfortável. ${L[id]} finalmente experimenta o sorvete. Você repara que a mesa ao lado já está vazia.

Talvez vocês tenham passado meses sem dizer coisas simples porque achavam que sempre haveria tempo. Hoje alguém disse, e isso já é alguma coisa.`,[
 C('Abraçar '+L[id]+' antes de voltar ao grupo','k9_ice_choose',[B(id,3),F('chat_done_'+id)]),
 C('Agradecer a conversa e dar espaço','k9_ice_choose',[B(id,2),F('chat_done_'+id)])]);}
N('k9_ice_group','SORVETERIA · MESA CENTRAL','17:46','town',`Você volta ao grupo quando os copos começam a ficar vazios.

O assunto muda para os pequenos hábitos que vocês tinham antes do primeiro ataque: os domingos no shopping, as brigas por lugar no carro, as mensagens de madrugada perguntando quem ainda estava acordado.

Uma camionete de publicidade passa devagar pela avenida. Dos alto-falantes sai um anúncio gravado.

LOCUTOR: — Lakewood comemora hoje seu aniversário! Apresentações na praça, barracas abertas e, nesta edição, uma homenagem especial às vítimas recentes. Parte da arrecadação será destinada às famílias.

O silêncio não demora. Alguns moradores nas mesas vizinhas se animam com a notícia. Entre os amigos, as expressões são diferentes.

Isabella: — Festa da cidade hoje? Depois de tudo?

Samuel: — Parece que eles conseguem transformar qualquer coisa num evento.

Ryan: — Também pode ser bom pra quem não consegue ficar sozinho em casa.

Ninguém concorda totalmente.`,[G('k9_party_announce','Ouvir o que Laisla tem a dizer')]);
N('k9_party_announce','SORVETERIA · ANÚNCIO DE LAISLA','17:51','town',`Laisla apoia as mãos na mesa, chama a atenção de quem ainda conversa e anuncia que os tios disponibilizaram uma casa de veraneio à beira do lago para aquela noite.

Laisla: — Eu não vou naquela homenagem da prefeitura. Eu vou fazer uma festa.

Rauanny: — Lá vem. Naquela casa? Perto do lago?

Laisla: — É a casa dos meus tios, Rau. Não é como se eu tivesse alugado o lugar pra provocar alguém.

Isabella: — A gente acabou de acender vela pra gente que morreu.

Laisla: — EU SEI! Eu tava lá! Eu quase morri dentro do meu próprio apartamento, porra!

Samuel: — Você não acha que uma festa cheia de desconhecidos facilita outra tragédia?

Laisla: — E quando eu posso voltar a viver? Quando todo mundo daqui morrer? Eu quero dançar, ouvir música alta, fazer alguma coisa que não seja esperar uma ligação dizendo que perdemos mais alguém!

Rauanny: — Eu só tô preocupada com você. Não é que eu queira te proibir.

Laisla: — Então não tenta decidir por mim.

Breno observa a mesa. Ryan se inclina para a frente, esperando que alguém diga algo antes de a discussão recomeçar.`,[
 C('Apoiar o direito de Laisla organizar a festa','k9_party_debate',[F('apoiou_festa'),B('laisla',5),FB('laisla','rauanny',2)]),
 C('Dizer que a preocupação dos amigos é legítima','k9_party_debate',[F('discordou_festa'),B('isabella',3),B('samuel',2),B('laisla',-2)]),
 C('Propor segurança e respeitar quem não quiser ir','k9_party_debate',[F('mediou_festa'),B('laisla',2),B('rauanny',2),['trait','cautela',1]])]);
N('k9_party_debate','SORVETERIA · DECISÃO DO GRUPO','17:56','town',`A conversa não termina na primeira discordância. Laisla lembra a noite do apartamento; Rauanny responde que estava lá e também tem direito de estar com medo. Isabella questiona se a prefeitura deveria manter música num dia de homenagens, e Samuel diz que prefere um lugar onde a polícia consiga chegar.

Ryan: — A festa pode ser uma péssima ideia. Mas a gente também não pode falar com a Laisla como se ela fosse uma criança.

Allan: — Meu voto é ficar com quem precisar de mim. Festa ou homenagem, eu não quero deixar ninguém sozinho de novo.

Breno: — Eu não vou fingir que tô confortável no meio de um monte de desconhecido. Mas agradeço o convite.

Rayssa: — Eu acho que vou ao aniversário. Tem famílias que conheço lá. Queria passar um pouco de tempo com elas.

Laisla: — Tá. Quem quiser aparecer, a porta vai estar aberta. Quem não quiser, tudo bem. Só peço que ninguém transforme essa noite em outra guerra entre a gente.

Você olha para os telefones sobre a mesa. Os convites ainda não foram enviados.`,[G('k9_bella_pov','Encontrar Bella na praça')]);
N('k9_bella_pov','PRAÇA CENTRAL · BANCO DE PEDRA','18:03','town',`PONTO DE VISTA: BELLA GOMES

Bella aguarda sob uma árvore antiga, com uma pasta de documentos apoiada no colo. Os degraus da praça estão cheios de gente preparando o aniversário da cidade, mas ela vê apenas a própria anotação da estação.

A dor na perna faz Bella ajustar a posição de tempos em tempos. Ela não é incapaz de se mover, mas sabe que não conseguiria correr como antes.

No coreto, uma mulher diz à filha que não precisa ter vergonha de sentir saudade. A frase atravessa Bella com uma força inesperada.

O nome da irmã aparece escrito atrás de uma fotografia: Jullia. Duas letras L. Uma menina de quem ela sabia o jeito de rir de longe.

Bella fecha os olhos.`,[G('k9_anna_flashback','Lembrar uma tarde antiga')]);
N('k9_anna_flashback','LEMBRANÇA · CASA DOS GOMES','ANOS ANTES','house',`PONTO DE VISTA: BELLA GOMES — LEMBRANÇA

A cozinha dos Gomes cheira a bolo ainda quente. Bella entra e encontra a irmã parada de frente para a janela, com os braços cruzados. Uma adolescente de cabelo preso — Anna, amiga das duas — acaba de sair pela porta da frente.

Bella: — O que rolou? Vocês tavam rindo até agora.

Jullia: — Ela contou pra outra pessoa uma coisa que eu pedi pra guardar entre nós.

Bella: — Anna?

Jullia: — É. E nem foi o assunto. Foi ela olhar pra minha cara e dizer que eu podia confiar.

Bella puxa uma cadeira para a irmã. Jullia a ignora por um momento antes de sentar.

Bella: — Eu sei que foi uma merda. Mas você vai ficar sem falar com ela pro resto da vida?

Jullia: — Não sei. O que eu devia fazer? Fingir que não me importei?

Bella: — Não. Falar com ela quando você tiver pronta. É bem diferente.

Jullia observa a porta por onde Anna saiu.`,[
 C('Perguntar à Jullia por que aquela amizade importava tanto','k9_anna_recall',[F('anna_perguntou_amizade')]),
 C('Sentar com Jullia até ela querer falar','k9_anna_recall',[F('anna_esperou')]),
 C('Tentar quebrar o clima com uma brincadeira','k9_anna_recall',[F('anna_brincou')])]);
N('k9_anna_recall','LEMBRANÇA · IRMÃS','ANOS ANTES','house',`Jullia pega um pedaço de bolo com a mão e Bella protesta. As duas discutem por um guardanapo, como se o mundo pudesse voltar ao normal por causa de uma bobagem.

Jullia: — Eu não queria que a Anna fosse uma pessoa ruim. Eu só queria que ela tivesse me escolhido naquele momento.

Bella: — Isso não significa que ela não gosta de você, Ju.

Jullia: — Você sempre fala como se fosse simples.

Bella: — E você sempre transforma tudo num filme de duas horas.

Jullia: — Insuportável.

Bella: — Dramática.

A almofada voa do sofá para Bella. As duas terminam rindo, ainda magoadas com Anna, mas juntas.

Antes de o dia acabar, Jullia diz que sonha em abrir um pequeno negócio um dia e levar Bella para conhecer cidades que só viram pela televisão. Bella promete cobrar a passagem.

É assim que Bella quer lembrar da irmã: não como alguém que desapareceu, mas como alguém que tinha planos para o próximo fim de semana.`,[G('k9_bella_meet','Voltar ao presente')]);
N('k9_bella_meet','PRAÇA · ENCONTRO COM BELLA','18:17','town',`Você encontra Bella ainda no banco. Ela ergue os olhos, guarda a fotografia e se afasta um pouco para que você possa sentar.

Bella: — Demorou. Eu já tava fazendo amizade com os pombos daqui.

Você pergunta se ela está bem.

Bella: — Tô cansada de responder isso. Mas tô aqui.

Ela abre o envelope de anotações. Não há uma lista mágica de suspeitos. Há horários, registros de acesso e um nome numa linha cujo contexto continua incompleto.

Bella: — Antes de você surtar, presta atenção: eu não disse que ninguém é assassino. Eu disse que alguém descreveu um horário diferente do que aparece aqui.

Você olha para a página. As datas são compatíveis com os arquivos da estação, mas não mostram uma pessoa cometendo um crime.`,[
 C('Perguntar exatamente qual documento contradiz o depoimento','k9_bella_evidence',[F('bella_pediu_origem'),Q('c9_divergencia_registro')]),
 C('Perguntar se alguém poderia ter se confundido','k9_bella_evidence',[F('bella_hipotese_inocente')]),
 C('Dizer que não quer acusar nenhum amigo sem provas','k9_bella_evidence',[F('bella_nao_acusar'),B('isabella',1)])]);
N('k9_bella_evidence','PRAÇA · HORÁRIOS','18:22','town',`Bella mostra dois registros: uma anotação de movimentação administrativa e um trecho de conversa que você já conhecia. Uma diferença de horário faz parecer que alguém passou perto de um acesso quando havia dito que não estivera ali.

Bella: — Não dá pra saber quem usou esse acesso. Pode ser funcionário, entrega, alguém emprestando carro. E pode ser alguém mentindo.

Você pensa em uma pessoa do grupo cuja explicação recente não se encaixa perfeitamente. A lembrança incomoda justamente porque você conhece o jeito dessa pessoa falar.

Bella: — Só não transforma uma hora escrita num papel em sentença. Eu precisei aprender isso do pior jeito.

Você: — E se a pessoa mentiu de propósito?

Bella: — Então a gente precisa descobrir sobre o quê. Não inventar o resto.

A conversa continua por vários minutos, incluindo as informações que o jogador efetivamente preservou da estação.`,[
 C('Defender a pessoa de quem você se lembrou','k9_bella_decide',[F('suspeita_defendeu'),['trait','empatia',1]]),
 C('Dizer que pretende conversar pessoalmente com ela','k9_bella_decide',[F('suspeita_perguntar'),['trait','franqueza',1]]),
 C('Guardar a dúvida até encontrar outra evidência','k9_bella_decide',[F('suspeita_esperar'),['trait','cautela',1]])]);
N('k9_bella_decide','PRAÇA · UM ACORDO','18:29','town',`Bella organiza os papéis por data, sem riscar nenhum nome.

Bella: — A gente pode discordar de alguém e ainda assim não querer que essa pessoa morra. É o mínimo.

Você lembra da discussão que afastou o grupo no hospital. Defender um amigo naquela ocasião também trouxe consequências. Agora uma suspeita ameaça transformar tudo em outra briga.

Bella encosta o envelope no seu braço.

Bella: — Se você descobrir mais alguma coisa hoje, me chama. Mesmo que ache que eu não vou gostar.

O som de ensaio do festival chega da praça. Uma luz de palco se acende atrás de vocês, anunciando que o aniversário de Lakewood está próximo.`,[G('k9_invites','Responder aos convites')]);
N('k9_invites','CELULAR · CONVITES DA NOITE','18:37','phone',`As mensagens começam a chegar. A programação de Lakewood confirma o aniversário da cidade, com apresentações, barracas e uma homenagem às vítimas. Laisla também compartilha instruções de acesso à casa de veraneio, a algumas ruas da margem do lago.

No grupo, ninguém fala de uma decisão coletiva. É a primeira vez que vocês têm duas opções para a mesma noite sem que alguém estabeleça quem deve ir a cada lugar.

Rayssa responde que pretende comparecer ao aniversário da cidade. Ela diz que quer encontrar uma família conhecida e levar flores ao espaço das homenagens.

Seu interesse romântico, caso esteja vivo, envia uma mensagem particular perguntando se pode encontrar você em casa antes de sair.`,[G('k9_love_message','Ler a mensagem particular')]);
N('k9_love_message','CELULAR · MENSAGEM PARTICULAR','18:40','phone',`Você abre a conversa. A pessoa espera sua resposta há alguns minutos. A mensagem é simples, mas, depois das últimas noites, ser convidado para sair juntos parece uma promessa de normalidade.

Do outro lado do telefone alguém está provavelmente se arrumando também, tentando decidir o que vestir sem pensar em saídas de emergência.`,[
 C('Convidar a pessoa para passar em sua casa','k9_love_visit',[F('encontro_em_casa'),['trait','empatia',1]]),
 C('Responder com carinho, mas combinar de se encontrar no evento','k9_love_brief',[F('encontro_no_evento')]),
 C('Dizer que hoje precisa de algum tempo sozinho','k9_love_brief',[F('encontro_recusado')])]);
N('k9_love_visit','SUA CASA · ANTES DA FESTA','19:05','house',`Você está terminando de escolher a roupa quando ouve a campainha. Do lado de fora, a noite começa a cair e as primeiras buzinas seguem em direção ao centro.

O interesse romântico entra depois que você abre a porta. A expressão muda quando os olhos de vocês se encontram. Há uma delicadeza nova na maneira como as pessoas se cumprimentam quando já imaginaram perder uma à outra.

Você fecha a porta devagar. Por alguns minutos, não há telão, máscaras nem investigação. Há apenas duas pessoas tentando encontrar coragem para dizer que gostariam de mais noites assim.`,[
 C('Elogiar a pessoa e aproximar-se para um beijo','k9_love_intimate',[F('romance_mais_beijos')]),
 C('Puxar a pessoa pela mão e brincar sobre o atraso','k9_love_intimate',[F('romance_brincou')]),
 C('Perguntar se ela está confortável depois de tudo que aconteceu','k9_love_intimate',[F('romance_cuidado')])]);
N('k9_love_intimate','SUA CASA · UM INSTANTE SÓ DE VOCÊS','19:11','house',`A conversa fica mais baixa quando vocês se aproximam. Uma mão segura a outra, e a música distante de um carro na rua parece pertencer a outra cidade.

O primeiro beijo é lento. Vocês param apenas para rir da pressa de se arrumarem e perceber quanto tempo passou. A pessoa encosta a testa na sua e pergunta se você tem certeza de que quer sair.

Não são namorados oficialmente. Ainda assim, existe intimidade suficiente para que um silêncio signifique uma pergunta e um sorriso responda sem precisar de promessa.

A festa pode esperar mais alguns minutos.`,[
 C('Beijar novamente e confessar que sentiu saudade','k9_love_goodbye',[F('romance_saudade')]),
 C('Abraçar a pessoa em silêncio por mais alguns instantes','k9_love_goodbye',[F('romance_abraco')]),
 C('Propor que escolham juntos onde passar a noite','k9_love_goodbye',[F('romance_planejou_juntos')])]);
N('k9_love_goodbye','SUA CASA · A PORTA ABERTA','19:17','house',`Você confere as chaves e desliga a última luz. Do lado de fora, a pessoa espera para caminhar com você até o veículo.

Há uma pequena brincadeira sobre atraso, uma promessa de mandar mensagem caso se separem e um último toque nas mãos antes de sair.

Por alguns minutos, você conseguiu pensar em alguém que está aqui agora, e não apenas em quem perdeu.`,[G('k9_choose_event','Decidir em qual festa entrar')]);
N('k9_love_brief','CELULAR · RESPOSTA','18:46','phone',`Você responde à mensagem. A conversa continua por alguns instantes. A pessoa agradece por não deixá-la sem resposta e diz que vocês poderão conversar pessoalmente mais tarde, se houver oportunidade.

A noite segue. Você precisa escolher onde pretende passar as próximas horas.`,[G('k9_choose_event','Escolher seu destino')]);
N('k9_choose_event','LAKEWOOD · COMEÇO DA NOITE','19:25','town',`A rua principal está iluminada pela decoração municipal. Mais adiante, a estrada do lago escurece entre as árvores.

Você observa os dois endereços no celular. O aniversário de Lakewood promete música, barracas e homenagens. A casa de veraneio de Laisla tem piscina, quartos e uma varanda com vista para a água.

O que mudou desde o memorial não foi apenas seu humor. Amigos que se abraçaram no mirante podem passar a noite em lugares diferentes. Você precisa saber quem foi para onde antes de poder encontrá-los.`,[
 C('Ir ao aniversário de Lakewood','k9_city_arrive',[S('hero_local','cidade')]),
 C('Ir à festa na casa de veraneio','k9_house_arrive',[S('hero_local','casa')])]);
N('k9_city_arrive','ANIVERSÁRIO DE LAKEWOOD · PRAÇA','19:42','town',`A praça está cheia de música e iluminação amarela. A prefeitura instalou um palco pequeno e um telão atrás das flores da homenagem. Há famílias sentadas perto das barracas e pessoas trabalhando em silêncio para manter o evento funcionando.

Você não consegue decidir se é reconfortante ou estranho ver crianças correndo com algodão-doce a poucos metros das fotografias de quem morreu.

O mestre de cerimônias lembra que parte da arrecadação irá para as famílias das vítimas. Não é um funeral, mas o luto permanece sobre cada apresentação.

Você reconhece algumas pessoas do grupo que escolheram comparecer. Rayssa está entre elas, ajudando a orientar convidados perto da área das homenagens.`,[
 C('Conversar com duas pessoas sobre a dúvida de Bella','k9_city_doubt',[F('suspeita_compartilhada')]),
 C('Visitar o mural e ouvir os discursos','k9_city_social',[F('mural_visitado')]),
 C('Procurar o interesse romântico ou outro amigo na praça','k9_city_social',[F('busca_amigos')])]);
N('k9_city_doubt','LAKEWOOD · PERTO DO PALCO','19:49','town',`Você encontra duas pessoas que não reagem do mesmo jeito quando descreve a divergência mencionada por Bella.

Uma delas lembra que os documentos não têm assinatura; outra diz que já viu gente mentir sobre horários em circunstâncias bem menores.

O que preocupa você é justamente isso: ambas as interpretações são possíveis. Ninguém encontrou uma faca, um rosto ou uma gravação que provasse um assassinato.

Você sente falta da cautela de Bella, mesmo quando sua própria vontade é perguntar diretamente a pessoa de quem desconfia.`,[
 C('Pedir que guardem a conversa entre vocês','k9_city_social',[F('suspeita_reservada'),['trait','cautela',1]]),
 C('Dizer que só quer reunir fatos antes de acusar','k9_city_social',[F('suspeita_metodo'),['trait','franqueza',1]])]);
N('k9_city_social','LAKEWOOD · ENTRE BARRACAS','19:57','town',`Uma família deposita flores no memorial provisório perto do palco. O barulho de um brinquedo de festa se mistura à voz de uma cantora que inicia a apresentação.

Isabella observa as pessoas sorrindo para fotografias, se ainda estiver presente. Rayssa escuta de lado, aparentemente distraída.

Isabella: — É estranho ver gente tirando foto ali, né?

Rayssa: — Acho que elas tão tentando seguir em frente.

Isabella: — Você consegue?

Rayssa: — Não sei.

Por um instante as duas ficam próximas como amigas que se conhecem há anos, sem conseguir transformar uma resposta curta numa certeza.

Do outro lado da praça, a equipe de segurança circula perto da entrada dos bastidores. A noite parece normal o suficiente para fazer você baixar um pouco a guarda.`,[G('k9_city_evening','Continuar a comemoração')]);
N('k9_city_evening','ANIVERSÁRIO · MAIS TARDE','20:08','town',`Você acompanha uma apresentação musical. Algumas pessoas do grupo conversam perto da mesa de bebidas, e outras saem para ver as barracas de comida.

O telefone vibra com uma fotografia da casa do lago: a piscina iluminada, os primeiros convidados e Laisla, caso esteja viva, tentando organizar os copos.

A imagem por um instante faz você desejar estar nos dois lugares. Mas seu corpo só pode estar em um deles.

Alguém comenta que precisa ir aos bastidores buscar uma coisa. A frase parece banal. Cinco minutos depois, você vai lembrar dela com uma precisão cruel.`,[G('k9_omen','Perceber um detalhe estranho')]);
N('k9_house_arrive','CASA DE VERANEIO · FESTA','19:42','party',`A casa dos parentes de Laisla fica próxima ao lago, afastada da movimentação do aniversário de Lakewood. A piscina reflete luzes roxas e a música atravessa portas de vidro que permanecem abertas.

Há convidados que você não conhece, pessoas dançando na varanda e uma mesa de bebidas sem pretensão de esconder o quanto foi improvisada. Alguns amigos estão presentes. Outros preferiram o evento no centro.

Laisla recebe os convidados na entrada, orgulhosa de ter conseguido organizar uma noite em que alguém ri sem pedir desculpa.

Laisla: — Tá vendo? Eu falei que precisava disso.

Você: — Você conseguiu bastante gente.

Laisla: — Pois é. Achei que ninguém fosse querer aparecer. Depois do que aconteceu no apartamento... eu precisava ver uma casa cheia sem sentir medo.

Ela olha a piscina iluminada, e o sorriso perde força.

Laisla: — Tô tentando ficar feliz. Pelo menos hoje, tenta aproveitar também.`,[
 C('Ajudar a organizar a música e as bebidas','k9_house_social',[F('ajudou_casa'),B('laisla',3)]),
 C('Procurar alguém para conversar numa varanda menos barulhenta','k9_house_social',[F('varanda_calma')]),
 C('Participar de uma brincadeira com os convidados','k9_house_social',[F('brincadeira_festa')])]);
N('k9_house_social','CASA DO LAGO · VARANDA','19:54','party',`A música muda para uma canção conhecida e duas pessoas começam a discutir qual versão é melhor. Na varanda, o ar é mais fresco e o lago parece apenas um reflexo distante entre as árvores.

Ryan pode inventar uma competição boba perto da piscina. Allan, se presente, tenta convencer Samuel a não levar tudo tão a sério. Breno escolhe uma cadeira com visão da porta. Rauanny ajuda Laisla com uma caixa de som.

Você vê, por instantes, o grupo se comportar como antes da ameaça. Não como se tivessem esquecido os mortos, mas porque estar vivo exige alguns minutos sem falar deles.

Alguém pergunta se a cidade já começou a homenagem no palco. Um convidado mostra um vídeo da apresentação que acabou de acontecer.`,[
 C('Compartilhar com um amigo a informação de Bella','k9_house_doubt',[F('suspeita_compartilhada')]),
 C('Conversar sobre os planos para depois do fim dessa história','k9_house_evening',[F('planos_festa')]),
 C('Buscar um momento reservado com alguém querido','k9_house_evening',[F('carinho_festa')])]);
N('k9_house_doubt','CASA DO LAGO · JARDIM','20:00','party',`Você conta a uma pessoa de confiança sobre o registro mostrado por Bella, sem transformar uma diferença de horário em acusação pública.

A resposta é cautelosa. Um amigo lembra que todos escondem coisas desde a noite do acidente. Outro acha perigoso considerar alguém culpado apenas por estar perto de uma estação.

O assunto não termina resolvido. Você percebe que conversar com alguém pode aliviar a solidão, mas não substitui evidência.

A música continua do outro lado da porta de vidro.`,[G('k9_house_evening','Voltar ao jardim')]);
N('k9_house_evening','CASA DO LAGO · PISCINA','20:09','party',`O reflexo das lâmpadas treme na água da piscina. Uma risada explode no andar de cima, seguida de passos apressados. Por alguns segundos você imagina que foi um grito.

Uma pessoa sugere uma fotografia do grupo presente. Alguns aceitam; outros ficam fora do enquadramento. Ninguém é obrigado a aparecer no retrato.

Do centro da cidade chega uma mensagem: a homenagem municipal já começou. Rayssa diz que está auxiliando uma família a encontrar os lugares reservados.

Há alguma coisa diferente na estrada de acesso. Um carro que você não reconhece ficou parado por alguns instantes antes de apagar os faróis.`,[G('k9_omen','Perceber que algo não combina')]);
N('k9_omen','LAKEWOOD · NOITE','20:13','town',`O primeiro sinal é pequeno demais para explicar o medo que você sente: uma resposta atrasada, uma cadeira vazia, um veículo desconhecido ou uma mensagem que aparece sem contexto.

Você tenta lembrar qual foi a última vez que viu cada pessoa. Descobre que não consegue ordenar todos os movimentos da noite.

Há música nos dois eventos. Na casa, as portas de vidro continuam abertas para o jardim. Na praça, a equipe de produção testa uma transição no telão.

Você olha o relógio. Ainda dá tempo de perguntar onde alguém está.`,[
 C('Conferir a localização dos amigos','k9_missing',[F('localizacoes_conferidas')]),
 C('Ligar para quem não respondeu','k9_missing',[F('ligou_desaparecido')]),
 C('Pedir que cada núcleo confirme quem está presente','k9_missing',[F('grupos_confirmados')])]);
N('k9_missing','LAKEWOOD · O DESAPARECIMENTO','20:19','town',`A primeira chamada não é atendida. Você tenta novamente, depois procura a última mensagem recebida. O horário parece normal, mas o silêncio do outro lado já não é.

A pessoa que estava com vocês há poucos minutos não responde. Você pergunta às pessoas próximas, e duas lembranças entram em conflito: alguém acha que a viu perto dos bastidores, outra pessoa diz que ela parecia seguir em direção à saída.

O ruído de ensaio do palco cobre parte da conversa. O coração bate mais rápido quando você percebe que precisa agir.`,[
 C('Procurar na última área em que foi visto','k9_missing_search',[F('busca_imediata')]),
 C('Pedir ajuda à segurança e deixar descrição do desaparecido','k9_missing_search',[F('seguranca_alertada')]),
 C('Ligar mais uma vez e procurar o sinal do celular','k9_missing_search',[F('rastreador_tentado')])]);
N('k9_missing_search','LAKEWOOD · BUSCA PELO AMIGO','20:24','town',`Você avança entre pessoas que ainda acreditam estar numa festa. Cada rosto parece olhar na direção errada. Não há uma trilha única: as pessoas não testemunharam as mesmas coisas.

Rayssa se aproxima com o telefone na mão, se ainda está no local. Ela afirma ter visto uma movimentação perto da lateral dos bastidores, mas não consegue dizer com quem o amigo saiu.

Um funcionário informa que a equipe está conferindo as câmeras disponíveis. Antes que consiga terminar, as luzes do palco se apagam.

A música para tão abruptamente que várias pessoas pensam em queda de energia.`,[G('k9_video','Olhar para o telão')]);
N('k9_video','ANIVERSÁRIO DE LAKEWOOD · TELÃO','20:28','town',`O telão acende com uma imagem granulada. No começo, algumas pessoas pensam que é uma apresentação programada. Então veem a cadeira, a fita nos pulsos e o rosto da pessoa capturada.

O mascarado permanece atrás da cadeira. A câmera foi posicionada para esconder as paredes e qualquer detalhe identificável do local.

VOZ DISTORCIDA: — Olá, Lakewood.

A multidão se agita. Um homem tenta desligar a projeção, mas o vídeo continua por mais alguns segundos.

VOZ DISTORCIDA: — Vocês vieram aqui pra homenagear os mortos? Que bonitinho.

O mascarado aproxima uma mão do ombro do refém.

VOZ DISTORCIDA: — Mas ainda falta gente nessa homenagem.

Uma segunda imagem mostra a estrada que leva ao lago. Não há horário nem local exato da gravação. O vídeo termina antes que alguém consiga identificar os equipamentos do ambiente.

O palco mergulha na escuridão. O público começa a correr.`,[
 C('Chamar pelo refém e tentar conter o pânico','k9_video_react',[F('video_reagiu_voz')]),
 C('Pedir uma cópia da gravação ao técnico','k9_video_react',[F('video_copia'),Q('c9_video_homenagem')]),
 C('Ir diretamente procurar informações nos bastidores','k9_video_react',[F('video_bastidores')])]);
N('k9_video_react','LAKEWOOD · DEPOIS DA TRANSMISSÃO','20:33','town',`O festival não consegue retomar a programação. As pessoas saem pelas laterais, procurando familiares e perguntando se aquele vídeo foi verdadeiro.

Você vê funcionários tentando explicar aos moradores que a segurança foi acionada. Outros querem tirar fotografias do telão apagado.

O celular vibra de novo. O número desconhecido não envia uma ameaça longa. Apenas uma fotografia da piscina da casa de veraneio, tirada de um ângulo alto e recente.

Na mensagem aparece uma frase: «Ainda estão se divertindo?»

Você sente o corpo esfriar. Uma pessoa já desapareceu. Agora o outro núcleo também está sendo observado.`,[
 C('Avisar imediatamente todos que estão na casa','k9_prep_01',[F('aviso_casa_rapido')]),
 C('Pedir à polícia que confira o acesso à casa e ao lago','k9_prep_01',[F('apoio_policia')]),
 C('Examinar a foto antes de escolher o caminho','k9_prep_01',[F('foto_casa_analisada'),Q('c9_foto_casa')])]);
N('k9_prep_01','ENTRE A PRAÇA E O LAGO','20:39','road',`Você mostra a imagem aos amigos disponíveis. Quem está na casa ainda não sabe que o perigo chegou até os arredores da propriedade.

Uma ligação toca. Uma voz familiar informa que uma porta de serviço bateu mesmo sem vento forte, mas não quer causar pânico entre os convidados.

Você: — Não abre a porta pra ninguém até confirmar quem é.

O som é interrompido por música e uma discussão ao fundo.

A primeira escolha é sobre tempo. Você pode tentar encontrar uma rota segura de acesso à casa, confirmar quem está lá ou concentrar-se no local onde o vídeo foi gravado. Não será possível fazer tudo pessoalmente ao mesmo tempo.`,[
 C('Comparar a fotografia com as entradas da casa','k9_prep_02',[F('preparo_planta')]),
 C('Organizar um ponto seguro para os amigos se encontrarem','k9_prep_02',[F('preparo_encontro')]),
 C('Investigar a origem técnica da transmissão','k9_prep_02',[F('preparo_video'),Q('c9_canal_video')])]);
N('k9_prep_02','LAKEWOOD · DECISÕES DE RESGATE','20:44','road',`Uma nova conversa é aberta entre os dois núcleos. Você pede confirmações com nomes, não respostas como «tá todo mundo aqui».

A mensagem do refém não chega. As últimas informações disponíveis não permitem concluir quem gravou a transmissão, quando foi feita nem de qual janela se avista aquele pedaço da estrada.

Você se lembra de Bella avisando que uma hipótese não substitui prova. Não dá para agir como se os criminosos estivessem lendo suas escolhas; dá apenas para preservar alternativas reais.`,[
 C('Conferir portas, janelas e saídas antes de entrar','k9_prep_03',[F('preparo_saida')]),
 C('Montar um grupo de contatos de emergência com posições','k9_prep_03',[F('preparo_contatos')]),
 C('Ir rapidamente ao lago sem esperar a resposta de todos','k9_prep_03',[F('preparo_corrida')])]);
N('k9_prep_03','ESTRADA DO LAGO · FARÓIS','20:51','road',`A estrada se divide. De um lado, o acesso à casa dos parentes de Laisla; de outro, a margem que leva à antiga estação. Você procura não confundir locais que conhece apenas por fotografias.

O céu está escuro, mas não chove. Entre os galhos, o brilho da piscina denuncia o telhado da casa. Há música, passos e gente demais para identificar pelo som quem grita de verdade.

O motorista diminui ao encontrar um carro atravessado parcialmente na entrada. Você pode pedir ajuda para retirá-lo, caminhar pelo acesso lateral ou avisar os outros antes de prosseguir.`,[
 C('Marcar o veículo como obstáculo e usar o acesso lateral','k9_house_warning',[F('preparo_acesso')]),
 C('Avisar a casa sobre a posição exata do carro','k9_house_warning',[F('preparo_alerta')]),
 C('Passar o obstáculo rapidamente e entrar pela frente','k9_house_warning',[F('preparo_forca')])]);
N('k9_house_warning','CASA DO LAGO · PORTA DE SERVIÇO','21:02','party',`PONTO DE VISTA: UM SOBREVIVENTE NA CASA

A música continua por mais alguns instantes. Há risadas na varanda, uma garrafa esquecida em cima da mesa e alguém procurando a chave da garagem.

No telefone, a fotografia da piscina chega junto ao aviso do protagonista. Quem lê olha para a câmera de segurança acima da varanda. A imagem do desconhecido não aparece mais.

Uma das portas de vidro está destrancada. Outra tem uma fechadura que nunca funcionou direito. Os convidados começam a perceber que não estão numa festa como qualquer outra.

Um ruído seco vem do corredor dos fundos. Ninguém consegue explicar de onde.`,[
 C('Verificar a tranca e manter o grupo reunido','k9_invasion',[F('casa_portas'),F('casa_juntos')]),
 C('Procurar uma saída exterior antes de as luzes falharem','k9_invasion',[F('casa_saidas')]),
 C('Avisar os convidados e orientar uma saída calma','k9_invasion',[F('casa_evacuacao')])]);
N('k9_invasion','CASA DO LAGO · A INVASÃO','21:07','party',`O primeiro estouro vem da área de serviço. A luz da cozinha pisca, e uma pessoa sai correndo para a varanda dizendo que viu alguém mascarado.

Laisla, se está ali, tenta juntar os convidados. Outro amigo corre para trancar a porta do corredor. Os desconhecidos entram em pânico; alguns alcançam os carros, outros tropeçam nas próprias bolsas.

O mascarado surge atrás do vidro. Por um instante, permanece imóvel, observando o interior. Então o vidro se rompe.

O grupo tenta fugir. Você precisa saber quem ficou na cozinha, quem foi para a piscina e quem conseguiu alcançar o jardim. O mesmo agressor não pode aparecer simultaneamente em locais distantes.

Um grito vindo do corredor interrompe a tentativa de planejar.`,[
 C('Verificar os cômodos e dividir tarefas com nomes','k9_house_movement',[F('perseguicao_coord')]),
 C('Pedir que todos sigam juntos pelo acesso externo','k9_house_movement',[F('perseguicao_unidos')]),
 C('Correr até a garagem e preparar uma saída','k9_house_movement',[F('perseguicao_carro')])]);
N('k9_house_movement','CASA DO LAGO · CORREDORES','21:12','party',`A casa parece maior no escuro. O corredor da cozinha leva à escada de madeira; à direita, uma porta de serviço dá para a piscina. O acesso à garagem fica atrás de uma despensa, onde há ferramentas e caixas empilhadas.

O mascarado está no piso térreo. Para alcançar os quartos, ele precisará subir. Para chegar à piscina, deverá passar pela porta dos fundos. Você acompanha os ruídos sem presumir que ele pode atravessar paredes.

Alguém grita por ajuda mais adiante. É hora de descobrir quem está isolado e usar os preparativos que vocês fizeram.`,[G('k9_risk_1_pov','Acompanhar a primeira tentativa de fuga')]);
for(let phase=1;phase<=3;phase++){
 const next=phase===3?'k9_reunion':'k9_risk_'+(phase+1)+'_pov';
 N('k9_risk_'+phase+'_pov','CASA DO LAGO · PERIGO '+phase,'21:'+String(12+phase*3).padStart(2,'0'),'party',`O perigo avança para um dos setores da casa. A saída mais evidente não é necessariamente segura. Um amigo tenta localizar uma passagem enquanto o som da perseguição se aproxima.

Não basta correr. A pessoa precisa escolher como escapar e o que fazer com as informações de quem está em outro setor.`,[]);
 N('k9_risk_'+phase+'_act','CASA DO LAGO · FUGA '+phase,'21:'+String(13+phase*3).padStart(2,'0'),'party',`Você está ouvindo o perigo se aproximar. O plano anterior muda o que é possível fazer agora. Há tempo para agir, mas não para procurar uma terceira saída que não foi examinada.`,[
 C('Executar o plano combinado e testar o apoio antes de avançar','k9_risk_'+phase+'_final',[S('r'+phase+'_act','safe')]),
 C('Tentar improvisar uma passagem pelo caminho mais curto','k9_risk_'+phase+'_final',[S('r'+phase+'_act','risk')]),
 C('Correr sem conferir se a saída está bloqueada','k9_risk_'+phase+'_final',[S('r'+phase+'_act','bad')])]);
 N('k9_risk_'+phase+'_final','CASA DO LAGO · ÚLTIMA CHANCE '+phase,'21:'+String(14+phase*3).padStart(2,'0'),'party',`O chão treme com um impacto e uma porta bate às suas costas. Você ouve outro amigo gritar do corredor. A segunda decisão trouxe a pessoa até uma passagem estreita, mas a última depende de onde estão os outros.

Há duas maneiras de continuar: manter a estratégia e esperar pelo apoio, ou tentar alcançar a saída antes de o mascarado se aproximar.`,[
 C('Usar a rota preparada e pedir ajuda pelo contato confirmado','k9_risk_'+phase+'_result',[S('r'+phase+'_last','safe')]),
 C('Forçar a passagem e tentar tirar outra pessoa do caminho','k9_risk_'+phase+'_result',[S('r'+phase+'_last','risk')]),
 C('Agir no impulso, mesmo com a saída ainda instável','k9_risk_'+phase+'_result',[S('r'+phase+'_last','bad')])]);
 N('k9_risk_'+phase+'_result','CASA DO LAGO · DESFECHO '+phase,'21:'+String(15+phase*3).padStart(2,'0'),'party',`Os segundos seguintes parecem lentos. Há um ruído de impacto, algo quebrando e o som de alguém correndo no piso de madeira.

Você procura por uma resposta antes de ter coragem de chamar outro nome.`,[G(next,'Avançar para a próxima parte da fuga')]);
}
N('k9_reunion','CASA DO LAGO · JARDIM','21:35','party',`Pela primeira vez desde que a luz caiu, há um ponto onde os sobreviventes conseguem contar quem está presente. O vento na piscina ainda move cadeiras derrubadas, e a música de uma caixa de som toca baixinho em algum quarto.

Ninguém comemora ainda. Não encontraram o refém. E quem se separou durante a perseguição pode não ter conseguido voltar.

O grupo procura sinais de movimento na casa. A voz de alguém falha ao perguntar por um amigo. Ninguém deve anunciar uma morte antes de ver o que aconteceu ou receber uma confirmação de quem testemunhou.

Você conta os rostos outra vez.`,[G('k9_reunion_luto','Descobrir quem conseguiu sair')]);
N('k9_reunion_luto','CASA DO LAGO · NOTÍCIAS','21:42','party',`A notícia de cada pessoa perdida chega de um jeito diferente. Um amigo se recusa a aceitar, outro tenta voltar para dentro, e alguém precisa impedir que o impulso leve mais uma vida.

As luzes de veículos aparecem longe na estrada. Alguns convidados procuram sinal de celular. Os feridos são acomodados sem que isso automaticamente os retire do restante da história.

Vocês se lembram do memorial que fizeram antes da festa. Ninguém imaginou que precisaria aprender novos nomes para outra despedida na mesma noite.`,[
 C('Reunir depoimentos e confirmar quem está faltando','k9_reunion_after',[F('reuniao_verificou')]),
 C('Confortar os amigos e pedir atendimento aos feridos','k9_reunion_after',[F('reuniao_amparou'),['trait','empatia',1]]),
 C('Procurar pistas da saída do mascarado','k9_reunion_after',[F('reuniao_rastro')])]);
N('k9_reunion_after','CASA DO LAGO · UM MOMENTO DE SILÊNCIO','21:48','party',`Você tenta recordar os últimos minutos em ordem. Algumas pessoas partiram pela garagem; outras foram para a estrada. Quem está vivo e não sofreu ferimentos incapacitantes consegue caminhar, mas todos carregam a exaustão daquela noite.

A falta do refém impede qualquer alívio completo. As fotografias feitas na festa mostram uma casa cheia de gente sorrindo apenas algumas horas antes.

O telefone vibra quando você está tentando ouvir o que um amigo conta. O número não tem identificação.`,[G('k9_last_call','Atender o telefone')]);
N('k9_last_call','LAKEWOOD · LIGAÇÃO DESCONHECIDA','21:53','phone',`VOZ DISTORCIDA: — Parece que você conseguiu sobreviver.

Você: — Onde você tá?!

VOZ DISTORCIDA: — Você sabe onde.

Você: — Para de brincar comigo!

VOZ DISTORCIDA: — Engraçado você falar isso.

Uma pausa comprida. Você ouve água e o rangido de alguma estrutura de madeira. A lembrança da noite do atropelamento volta inteira.

VOZ DISTORCIDA: — Afinal, foram você e seus amigos que começaram esse jogo.

A chamada é encerrada. Você tem um instante para decidir a quem contar e por qual acesso chegar ao lago.`,[
 C('Contar tudo aos amigos presentes','k9_deck_route',[F('contou_ligacao')]),
 C('Pedir ajuda a Bella para identificar o deck exato','k9_deck_route',[F('bella_ajudou_deck')]),
 C('Ir até o deck e avisar um amigo apenas ao chegar','k9_deck_route',[F('foi_sozinho_deck')])]);
N('k9_deck_route','MARGEM DO LAGO · CAMINHO','22:07','lake',`A trilha até o deck passa entre árvores baixas e pedras úmidas. O som do lago é mais constante que o vento. Você sabe que não deve confundir o acesso da estação com o lugar onde o grupo lançou Jullia à água.

Algumas informações já estavam no seu caderno. Outras chegaram por Bella, que conhece a região por ter procurado a irmã ali por meses.

Você não sabe se a voz do telefone estava naquele deck quando ligou. Mas sabe que não pode simplesmente abandonar o refém.`,[
 C('Seguir pela trilha com acesso visual ao deck','k9_deck_arrive',[F('deck_trilha_segura')]),
 C('Aproximar-se pelo caminho de serviço na margem','k9_deck_arrive',[F('deck_acesso_servico')]),
 C('Avançar pelo acesso principal e anunciar sua presença','k9_deck_arrive',[F('deck_chamou')])]);
N('k9_deck_arrive','DECK ANTIGO · A ÁGUA ESCURA','22:17','lake',`A madeira range com seu primeiro passo. O deck termina sobre a mesma água escura que vocês observaram naquela noite. A lembrança de carregar o saco até a margem atravessa você antes que consiga se preparar.

Na extremidade, há uma cadeira. A pessoa sequestrada está nela, com os pulsos presos. Sua cabeça se ergue quando reconhece sua voz.

Você corre até ela, parando quando percebe que alguém deixou uma fita atravessando parte do apoio. Não há explosivo à vista, mas você não vai puxar uma estrutura desconhecida sem verificar.

Você: — Meu Deus... você tá bem?!

A voz que responde está trêmula, mas viva. Você toca o ombro do refém, tentando confirmar que consegue respirar e falar.`,[
 C('Verificar cuidadosamente as amarras e tentar soltá-las','k9_deck_hostage',[F('deck_verificou_lacos')]),
 C('Abraçar o refém e pedir que conte o que aconteceu','k9_deck_hostage',[F('deck_abraçou')]),
 C('Olhar primeiro os acessos e procurar o mascarado','k9_deck_hostage',[F('deck_conferiu_margem')])]);
N('k9_deck_hostage','DECK · A ÚLTIMA CONVERSA','22:20','lake',`Você consegue ouvir o refém falar de perto. A pessoa está abalada e há marcas nos pulsos. Nem tudo que aconteceu durante o sequestro está claro; ela hesita antes de dizer onde esteve desde a transmissão.

O vento muda. Seu telefone vibra uma última vez sem revelar nenhum remetente.

A cadeira se move alguns centímetros quando você tenta soltar a fita. A pessoa segura sua mão e olha para além do seu ombro.

Você: — O que foi?

A resposta vem quase num sussurro.

REFÉM: — Ele tá aqui.

Você se vira. O mascarado surgiu no início do deck, bloqueando o caminho por onde você chegou.`,[
 C('Pedir que o mascarado solte o refém','k9_deck_face',[F('deck_tentou_negociar')]),
 C('Ficar entre o mascarado e a cadeira','k9_deck_face',[F('deck_protegeu_refem')]),
 C('Exigir respostas sobre os amigos mortos','k9_deck_face',[F('deck_exigiu_verdade')])]);
N('k9_deck_face','DECK · O ÚLTIMO JOGO','22:24','lake',`A figura mascarada permanece no começo do deck. A água bate abaixo das tábuas e o ruído parece mais alto do que todas as vozes da noite.

Você: — Eu vim. Agora deixa essa pessoa ir embora!

VOZ DISTORCIDA: — Você realmente acha que pode chegar aqui e me dar ordens?

Você: — Já chega. Você matou gente demais!

VOZ DISTORCIDA: — E vocês acham que não têm sangue nas mãos?

Você sente o estômago revirar.

Você: — O que aconteceu naquela noite foi um acidente!

VOZ DISTORCIDA: — O acidente não foi a pior parte.

Você lembra da estrada, do saco e da água escura. Não há ninguém naquela noite que possa desfazer a decisão de vocês.

Você: — Eu sei.

O vento sopra pelo deck. O mascarado não avança. Apenas espera enquanto você encontra coragem para dar mais um passo.`,[
 C('Enfrentar o mascarado com raiva','k9_final',[F('ultimo_tom_raiva')]),
 C('Pedir que pare e lembrar das pessoas que morreram','k9_final',[F('ultimo_tom_luto')]),
 C('Exigir que mostre o próprio rosto','k9_final',[F('ultimo_tom_determinacao')])]);
N('k9_final','DECK · O FIM DA MÁSCARA','22:27','lake',`: - Ok..Chegou a hora de acabar com tudo isso, Chega de Joguinhos..E chega de máscaras seu idiota!

Digo e o Assassino finalmente tira a sua máscara.

: - O que?... Você?

FIM DO CAPÍTULO 9 — UM ÚLTIMO JOGO`,[]);
const DEATH={
 allan:`PONTO DE VISTA: ALLAN LIRA

Allan alcança a escada de serviço quando a porta superior bate. Ele tenta se apoiar na grade, mas a fixação cede e o metal se desloca com um estalo. Um dos pés escorrega, e ele cai contra o patamar inferior.

Allan: — SAMU! SAMU, ME AJUDA!

O mascarado aparece na curva da escada. Allan se ergue ainda atordoado, tentando alcançar o corrimão do lado oposto. A lâmina acerta seu abdômen. Ele se dobra, pressionando a mão contra o ferimento; sangue quente escorre entre os dedos e mancha os degraus.

Allan: — Não... não, por favor... eu... eu não consigo...

Outro impacto o joga contra a parede. Sua cabeça encontra a quina do patamar e o som é seco, diferente de uma queda comum. Allan fica imóvel por um instante, tenta respirar e deixa escapar um suspiro fraco. Os dedos deslizam pela parede, deixando uma marca vermelha. Quando a ajuda finalmente consegue alcançá-lo, ele já não responde.`,
 samuel:`PONTO DE VISTA: SAMUEL CAMPOS

Samuel se enfia na garagem para encontrar as chaves do carro que poderia tirar os amigos dali. A porta basculante desce até a metade, obrigando-o a passar de lado. O motor do veículo engasga quando ele tenta ligar.

Samuel: — VAI, PORRA... AGORA NÃO!

O mascarado surge atrás da porta de serviço. Samuel tenta sair pelo lado do passageiro, mas a figura o atinge antes. A lâmina atravessa sua camisa e ele bate violentamente contra a carroceria. O sangue escorre pelo banco e pelo piso de cimento.

Samuel: — ALLAN! ALGUÉM, POR FAVOR!

O mecanismo da porta volta a funcionar e a placa de metal se move, prendendo o caminho de fuga. Samuel cai de joelhos, tenta estancar os ferimentos e murmura que não quer morrer ali. Seu último esforço é empurrar o telefone na direção do portão, antes de parar de se mover.`,
 isabella:`PONTO DE VISTA: ISABELLA ALMEIDA

Isabella fecha a porta do corredor e tenta alcançar a caixa elétrica. A chave de manutenção que encontrou não serve na tranca. Ela empurra a estante contra a maçaneta, mas ouve a madeira começar a rachar.

Isabella: — EU PRECISO DE AJUDA! ALGUÉM ME ESCUTA?!

Quando a porta cede, a estante a derruba de lado. Ela tenta rastejar até a janela, deixando um rastro de sangue sobre o chão depois de ser atingida. A figura mascarada se aproxima, e Isabella se vira com o pouco de força que resta.

Isabella: — Você não vai... apagar tudo...

A lâmina desce novamente. Isabella ainda consegue puxar o telefone para perto, mas os dedos não obedecem. O aparelho cai no piso, a tela acesa no nome de Rayssa. A respiração dela se torna irregular e então cessa.`,
 laisla:`PONTO DE VISTA: LAISLA SOUSA

Laisla conduz os convidados pelo corredor que liga a sala à cozinha. A casa dos tios tem uma segunda saída que ela conhece desde criança, mas a porta está presa por uma corrente improvisada.

Laisla: — NÃO EMPURRA! EU VOU ABRIR! EU CONHEÇO ESSA CASA!

O mascarado quebra o vidro atrás dela. Laisla tenta segurar a porta enquanto os outros escapam. Uma borda de vidro rasga seu antebraço e sangue escorre até a mão. Ela consegue abrir a corrente, mas alguém tropeça. Laisla volta para ajudar.

Um golpe a atinge nas costas. Ela cai com força contra a moldura quebrada e a mão encontra apenas estilhaços quando tenta se levantar. O sangue se espalha pela roupa e pelo piso de cerâmica.

Laisla: — Rau... fala pra Rau... eu só queria...

Ela não consegue terminar. O som dos passos que fogem se afasta e Laisla perde as forças diante da saída que conseguiu abrir para os outros.`,
 rauanny:`PONTO DE VISTA: RAUANNY BORGES

Rauanny tenta alcançar o portão do jardim pela borda da piscina. Os convidados já saíram, mas uma pessoa ficou presa do outro lado. Ela volta, agarra uma cadeira e a lança contra a porta para abrir uma passagem.

Rauanny: — VAI! EU TÔ LOGO ATRÁS!

O mascarado a alcança no piso molhado. Um golpe corta seu ombro, e a luta a faz perder o equilíbrio. Ela cai na água, tenta se erguer pela escada, mas uma mão a puxa de volta para baixo.

Bolhas sobem enquanto Rauanny se debate. O ferimento deixa uma mancha vermelha que se abre na superfície. Ela consegue levantar o rosto uma última vez e chamar pelo nome de Laisla, antes de desaparecer sob a água escura.

Quando os sobreviventes a encontram, o corpo está imóvel junto à lateral da piscina. Não há resposta às tentativas de reanimá-la.`,
 ryan:`PONTO DE VISTA: RYAN CARIOLATO

Ryan alcança a sacada e vê as luzes de um carro do outro lado da cerca. A escada externa parece perto, mas parte do suporte está enferrujada. Ele segura a grade e tenta mover o corpo devagar.

Ryan: — EU TÔ AQUI! OLHA PRA CIMA!

O mascarado empurra a porta de vidro. Ryan se vira e perde o apoio de um pé. A grade se parte. Ele cai contra uma viga de madeira, bate a cabeça na quina de concreto abaixo e fica dobrado sobre as tábuas do piso inferior.

Um filete de sangue alcança o degrau mais baixo. Ryan tenta levantar o rosto, procura os amigos e deixa escapar uma frase quase inaudível.

Ryan: — Eu... queria mais tempo...

A cabeça dele cede para o lado. O último movimento dos dedos cessa antes que alguém consiga descer até onde ele caiu.`,
 breno:`PONTO DE VISTA: BRENO FERREIRA

Breno encontra o quadro elétrico da casa e tenta desligar a alimentação da área em que a porta se trancou. Ele mantém os pés afastados da água que vazou de uma tubulação, procurando os disjuntores identificados.

Breno: — NÃO PISA AÍ! ESPERA QUE EU CONSIGO!

A porta se abre atrás dele. O mascarado o acerta no braço, e Breno perde o equilíbrio. A mão esbarra num painel danificado. Uma descarga o arremessa contra a borda da bancada, que se rompe com a pancada.

Ele tenta se levantar, mas o sangue escorre pela lateral da cabeça e embaça sua visão. O mascarado se aproxima novamente; Breno consegue apenas levantar um braço para se proteger.

Breno: — Por favor... eu só queria... sair daqui...

O último golpe interrompe a frase. Seu telefone continua vibrando no chão enquanto ele permanece imóvel, cercado pelo cheiro de fio queimado e pelos restos da bancada.`
};
const THREATS={
 allan:{where:'escada do depósito',intro:'Allan encontra um armário de ferramentas junto à escada, mas a grade do patamar está frouxa. Um pedaço de fita marca o degrau que não suporta peso.',good:'Apoiar-se na parede e descer pelo degrau firme, avisando Samuel',risky:'Saltar dois degraus e tentar alcançar a porta',bad:'Bater na grade para ganhar velocidade'},
 samuel:{where:'garagem',intro:'Samuel procura uma saída entre os carros. Uma porta de metal fecha aos solavancos, e a chave do carro está no porta-luvas.',good:'Testar a abertura da garagem e deixar o motor desligado até a fuga',risky:'Ligar o carro e acelerar antes de verificar o portão',bad:'Empurrar sozinho o portão de metal enquanto o mascarado se aproxima'},
 isabella:{where:'corredor do quadro elétrico',intro:'Isabella observa uma estante solta perto do corredor. Um fio rompido e uma tranca enferrujada impedem a saída mais curta.',good:'Usar o caminho sinalizado e chamar quem tem a planta da casa',risky:'Mover a estante na frente da porta sem conferir a janela',bad:'Forçar a tranca junto ao fio exposto'},
 laisla:{where:'passagem de serviço',intro:'Laisla conhece a despensa e a porta antiga dos tios. A corrente pode ser removida por um encaixe perto da parede.',good:'Soltar o encaixe da corrente e orientar todos a passar sem empurrar',risky:'Quebrar o vidro da porta com o ombro',bad:'Arremessar o corpo contra a fechadura presa'},
 rauanny:{where:'piscina e jardim',intro:'Rauanny procura um amigo do outro lado da piscina. O piso está molhado, mas há um caminho seco entre os canteiros.',good:'Contornar pelo canteiro seco e pedir que outra pessoa abra o portão',risky:'Correr junto à borda para ganhar tempo',bad:'Entrar na água para alcançar a passagem mais curta'},
 ryan:{where:'sacada',intro:'Ryan encontra uma escada externa. Ela parece alcançável pela lateral da sacada, mas uma das grades está empenada.',good:'Conferir a fixação e descer com três pontos de apoio',risky:'Pular diretamente para a escada externa',bad:'Usar a grade enferrujada como apoio para um salto longo'},
 breno:{where:'área de serviço e painel',intro:'Breno chega a uma área de serviço em que um disjuntor antigo está aquecendo. Há uma faixa seca de piso até a segunda porta.',good:'Desligar o circuito correto com o piso seco e manter distância da água',risky:'Tentar arrancar um fio para cortar a energia',bad:'Tocar o painel com as mãos molhadas'}
};
const extra={
 romance:{ryan:'Ryan: — Olha pra mim. Eu sei que faço piada de tudo, mas agora eu tô falando sério. Queria estar com você hoje. Sem obrigação de parecer corajoso.',breno:'Breno: — Eu ensaiei uma frase no caminho inteiro e esqueci tudo quando você abriu a porta. Acho que é porque eu queria muito estar aqui.',rayssa:'Rayssa: — Eu pensei em desistir de vir umas três vezes. Mas quando você disse que podia passar, eu só quis chegar logo. Tenho medo de perder noites assim.',rauanny:'Rauanny: — Não ri, tá? Eu passei um tempão escolhendo o que vestir. Sei lá. Queria que você me olhasse e percebesse que eu fiz isso pra te ver.'},
 pledge:{ryan:'Ryan: — Se a gente sobreviver, você vai me pagar aquele cinema. E eu vou reclamar do filme do começo ao fim.',breno:'Breno: — Eu queria que a próxima vez que você me chamasse fosse só pra gente passar uma tarde tranquila.',rayssa:'Rayssa: — Eu tenho vontade de congelar esse momento antes que alguma coisa ruim aconteça. Desculpa. Eu sei que é estranho falar isso.',rauanny:'Rauanny: — Quando isso acabar, eu quero que você me chame pra sair sem perguntar primeiro se tem alguém seguindo a gente.'}
};
function planParties(s){let f=s.flags;if(Array.isArray(f.c9_casa_pessoas)&&Array.isArray(f.c9_cidade_pessoas))return;
 const group=alive(s),house=[];
 if(group.includes('laisla'))house.push('laisla');
 else if(group.includes('rauanny'))house.push('rauanny');
 else if(group.includes('ryan'))house.push('ryan');
 for(const id of ['rauanny','ryan','allan','breno','samuel','laisla','isabella'])if(group.includes(id)&&!house.includes(id)&&house.length<4)house.push(id);
 if(house.length===0&&group.length)house.push(group[0]);
 const city=group.filter(x=>!house.includes(x));
 if(group.includes('rayssa')&&!city.includes('rayssa')){const i=house.indexOf('rayssa');if(i>=0)house.splice(i,1);city.push('rayssa');}
 f.c9_casa_pessoas=house;f.c9_cidade_pessoas=city;
 f.c9_anfitriao=house.includes('laisla')?'laisla':house[0]||'';
}
function hostage(s){const f=s.flags;planParties(s);if(f.c9_refem)return f.c9_refem;const lv=lover(s);if(lv){f.c9_refem=lv;return lv;}const options=alive(s).filter(x=>x!=='rayssa');options.sort((a,b)=>Number(s.bonds[b]||50)-Number(s.bonds[a]||50));f.c9_refem=options[0]||(alive(s).includes('rayssa')?'rayssa':'bella');return f.c9_refem;}
function nextRisk(s,stage){const f=s.flags;const list=(f.c9_casa_pessoas||[]).filter(x=>x!==f.c9_refem&&!dead(s,x)&&!['rayssa'].includes(x));const used=[1,2,3].filter(i=>i<stage).map(i=>f['c9_r'+i+'_target']);return list.filter(x=>!used.includes(x))[0]||'';}
function markRisk(s,stage){const f=s.flags;if(f['c9_r'+stage+'_resolved'])return;f['c9_r'+stage+'_resolved']=true;const id=f['c9_r'+stage+'_target'];if(!id){f['c9_r'+stage+'_result']='none';return;}
 let score=Number(f.c9_preparo_saida||f.c9_preparo_acesso||f.c9_casa_saidas||f.c9_casa_portas)+Number(f.c9_preparo_contatos||f.c9_preparo_alerta||f.c9_casa_juntos||f.c9_perseguicao_coord)+Number(f['c9_r'+stage+'_plan']==='safe')+Number(f['c9_r'+stage+'_act']==='safe')+Number(f['c9_r'+stage+'_last']==='safe');
 const status=score>=4?'safe':score===3?'injured':'fatal';f['c9_r'+stage+'_result']=status;
 if(status==='fatal'&&IDS.filter(x=>f['c9_morto_'+x]).length<3)f['c9_morto_'+id]=true;
 else if(status!=='safe'){f['c9_ferido_'+id]=true;f['c9_r'+stage+'_result']='injured';}
}
function enter(s,id){if(!id.startsWith('k9_')||!s?.flags)return false;const f=s.flags,stamp='c9_enter_'+id;if(f[stamp])return false;f[stamp]=true;
 if(id==='k9_choose_event'||id==='k9_missing'||id==='k9_house_warning')planParties(s);
 if(id==='k9_bella_meet')f.c9_suspeito=suspect(s)||'desconhecido';
 if(id==='k9_video_react'&&f.c9_refem==='rayssa')f.c9_armadilha_saiu_controle=true;
 if(id==='k9_missing'){const h=hostage(s);f.c9_refem_local=(f.c9_casa_pessoas||[]).includes(h)?'casa':'cidade';f.c9_refem_inicio=Date.now();if(h==='rayssa')f.c9_encenacao_inicial=true;}
 for(let stage=1;stage<=3;stage++){
  if(id==='k9_risk_'+stage+'_pov')f['c9_r'+stage+'_target']=nextRisk(s,stage);
  if(id==='k9_risk_'+stage+'_result')markRisk(s,stage);
 }
 if(id==='k9_final')f.c9_concluido=true;
 return true;
}
function onChoice(s,id,c){if(!id.startsWith('k9_'))return;}
function resolve(id,s,n){if(!id.startsWith('k9_')||!n)return n;const f=s.flags||{},live=alive(s),lv=lover(s),kid=f.c9_refem||hostage(s),lost=IDS.filter(x=>dead(s,x)),lost9=IDS.filter(x=>f['c9_morto_'+x]);let text=n.text,choices=[...(n.choices||[])],location=n.location,scene=n.scene;
 const isLive=id=>live.includes(id);const isHome=x=>(f.c9_casa_pessoas||[]).includes(x);
 const pov=who=>`PONTO DE VISTA: ${name(who).toUpperCase()}\n\n`;
 if(id==='k9_mem_loop'){
  choices=lost.filter(x=>!f['c9_mem_seen_'+x]).map(x=>G('k9_mem_'+x,'Acender uma vela por '+name(x)));
  if(!choices.length)choices=[G('k9_mem_moises','Lembrar Moisés e concluir as homenagens')];
 }
 if(id.startsWith('k9_mem_')&&MEM[id.slice(7)]){
  const who=id.slice(7),m=MEM[who];if(!isLive(m.speaker.toLowerCase())){
   const alt=live.find(x=>x!==who);
   text=`Você se aproxima da fotografia de ${name(who)}. As histórias contadas pelos amigos lembram gestos pequenos de ${name(who)}, mesmo que nem todos tenham conseguido vir.\n\n${m.memory}\n\n${alt?name(alt)+': — Eu sinto falta dessas coisas simples. Parece impossível que não vamos viver outras assim.':'Você permanece diante da fotografia, procurando coragem para continuar.'}\n\nVocê deixa uma flor ao lado da imagem. Não há como recuperar a pessoa perdida, mas existe uma forma de não permitir que a última lembrança seja a violência.`;
  }
 }
 if(id==='k9_01'){
  text+='\n\n'+(f.c8_bella_condicao==='hospital'?'Bella acompanha o memorial por chamada de vídeo caso ainda esteja internada. Os amigos mostram as velas pelo telefone; ela participa sem desobedecer às recomendações médicas.':f.c8_bella_condicao==='grave'?'Bella caminha com apoio e evita apoiar todo o peso sobre a perna machucada.':'Bella tem pequenos curativos, mas consegue acompanhar os amigos ao mirante.')
    +'\n\n'+(lost.length?'Entre os amigos que não voltaram estão '+names(lost)+'. Cada despedida acontecerá diante da própria fotografia.':'Nenhum dos oito amigos morreu até agora. A homenagem lembra Moisés e as outras vítimas dos ataques, sem inventar novos mortos no grupo.');
 }
 if(id==='k9_mem_hero'){
  const fn=f.c7_funeral_hero; if(fn==='estrelas')text+='\n\nVocê recorda uma conversa sobre querer ver estrelas numa despedida. Hoje algumas velas brilham sob o céu que ainda não escureceu.';
  else if(fn==='musica')text+='\n\nVocê lembra de ter falado sobre música e fotografias no próprio funeral. Agora percebe a importância das fotos que restaram.';
  else if(fn==='intimidade')text+='\n\nVocê lembra de desejar uma despedida pequena e próxima. Diante da mesa, entende por que algumas pessoas preferem silêncio a discursos.';
 }
 if(id==='k9_invites'&&dead(s,'laisla'))text=text.replace('Laisla também compartilha instruções de acesso à casa de veraneio, a algumas ruas da margem do lago.','O responsável pela reunião compartilha instruções de acesso à casa de veraneio, com autorização dos parentes de Laisla.');
 if(id==='k9_invites'&&dead(s,'rayssa'))text=text.replace('Rayssa responde que pretende comparecer ao aniversário da cidade. Ela diz que quer encontrar uma família conhecida e levar flores ao espaço das homenagens.','Alguns sobreviventes informam que estarão no aniversário da cidade.');
 if(id==='k9_mem_response')text+='\n\n'+(f.c9_homenagem_hero==='discurso'?'Você: — Eu não sei fazer discurso. Só sei que eles foram mais do que o jeito como morreram. E eu não quero que a gente esqueça disso.':f.c9_homenagem_hero==='lembranca'?'Você conta um acontecimento pequeno de quem se foi. A lembrança faz alguém sorrir enquanto chora.':'Você permanece em silêncio ao lado de quem se aproxima. Não precisa dizer nada para estar presente.');
 if(id==='k9_ice_choose'){
  const done=IDS.filter(x=>f['c9_chat_done_'+x]);choices=visits(s)>=2?[G('k9_ice_group','Voltar para a conversa de todos')]:live.filter(x=>!done.includes(x)).map(x=>G('k9_ice_'+x+'_1','Conversar com '+name(x)));
  if(!choices.length)choices=[G('k9_ice_group','Voltar à mesa central')];
  text+='\n\n'+(done.length?'Você já conversou com '+names(done)+'. Pode procurar outra pessoa.':'Você escolhe quem gostaria de ouvir com calma.');
 }
 for(const who of IDS){if(id==='k9_ice_'+who+'_2'){
  const x=CHAT[who],tone=f['c9_chat_'+who+'_tom'];text+='\n\n'+(tone==='passado'?x.past:tone==='medo'?x.fear:x.dream);
  if(dead(s,who))choices=[G('k9_ice_choose','Voltar à mesa')];
 }}
 if(id==='k9_ice_group'){
  text=text.replace('Laisla, se estiver presente, escolhe uma mesa grande demais.','Quem organizou a mesa escolhe um espaço grande demais.');
  text+='\n\n'+(lost.length?'Os nomes de '+names(lost)+' surgem numa lembrança de almoço antigo. Ninguém fala como se essas pessoas estivessem sentadas ali.':'Por um instante, todos os amigos que sobreviveram conversam como antes da noite do acidente.');
  if(!isLive('isabella'))text=text.replace(/Isabella: — Festa da cidade hoje\? Depois de tudo\?\n\n/,'');
  if(!isLive('samuel'))text=text.replace(/Samuel: — Parece que eles conseguem transformar qualquer coisa num evento\.\n\n/,'');
  if(!isLive('ryan'))text=text.replace(/Ryan: — Também pode ser bom pra quem não consegue ficar sozinho em casa\.\n\n/,'');
 }
 if(id==='k9_party_announce'||id==='k9_party_debate'){
  if(!isLive('laisla')){
   if(id==='k9_party_announce')choices=[C('Apoiar uma reunião discreta na casa do lago','k9_party_debate',[F('apoiou_reuniao')]),C('Preferir o aniversário e as homenagens','k9_party_debate',[F('preferiu_homenagem')]),C('Pedir que todos respeitem a própria escolha','k9_party_debate',[F('mediou_festa')])];
   const organiser=live.find(x=>x!=='rayssa')||null;
   location='SORVETERIA · UMA IDEIA DIFÍCIL';
   text=id==='k9_party_announce'?`A ausência de Laisla pesa na conversa. A casa dos tios ainda existe, e alguns amigos lembram que ela dizia querer comemorar a própria vida mesmo durante os dias difíceis.\n\n${organiser?name(organiser)+': — Os parentes dela disseram que a gente podia usar a casa se quisesse reunir todo mundo. Não seria fingir que ela tá aqui. Seria... tentar viver um pouco do que ela queria viver.':'Você lembra da casa de veraneio e da ideia que Laisla costumava defender.'}\n\nO grupo não concorda imediatamente. Alguns preferem ficar na homenagem da prefeitura; outros gostariam de passar algumas horas juntos perto do lago, mesmo com medo.`:
   `A discussão continua sem Laisla. Ninguém se apropria de sua voz. Alguns acham que uma reunião seria uma forma de honrar o que ela desejava; outros dizem que a casa é um lugar perigoso para ficar tão perto da água.\n\n${organiser?name(organiser)+': — A gente não precisa decidir como todo mundo deve sofrer. Só precisa deixar claro que ninguém vai ser obrigado a ir.':'Você decide que cada sobrevivente poderá escolher como passar a noite.'}\n\nO aniversário da cidade segue confirmado. Quem quiser ir à casa terá de combinar transporte e informar aos amigos onde estará.`;
  }else {
   text=text.replace(/(?:^|\n\n)(?:(?:Allan|Samuel|Isabella|Ryan|Breno|Rauanny|Rayssa): —[^\n]*)(?=\n\n|$)/g,block=>{const m=block.match(/(Allan|Samuel|Isabella|Ryan|Breno|Rauanny|Rayssa):/);return m&&dead(s,m[1].toLowerCase())?'':block;});
  }
 }
 if(id==='k9_bella_pov'){
  if(f.c8_bella_condicao==='hospital')text=text.replace('Bella aguarda sob uma árvore antiga, com uma pasta de documentos apoiada no colo.','Bella participa da conversa por chamada de vídeo de seu quarto de observação, porque ainda não recebeu alta. A praça aparece na tela, e o telefone está apoiado num banco junto às anotações do protagonista.');
 }
 if(id==='k9_bella_meet'){const suspected=f.c9_suspeito; if(L[suspected])text+='\n\nBella: — Se você quer mesmo um nome pra conferir, tem '+name(suspected)+'. Mas, pelo amor de Deus, eu não disse que foi essa pessoa. Só quero saber por que o horário que ela mencionou não bate com o registro de movimentação. E nem dá pra garantir que o acesso foi usado por ela.\n\nVocê tenta imaginar '+name(suspected)+' escondendo alguma coisa de todos. É a possibilidade, e não a prova, que te assusta.';}
 if(id==='k9_bella_evidence'){
  if(f.c8_prova==='completa')text+='\n\nBella confere os códigos do original preservado na estação. O documento continua sem nome de destinatário.';
  else if(f.c8_prova==='parcial')text+='\n\nBella compara fotografias parciais com suas próprias anotações. As páginas perdidas não reaparecem.';
  else text+='\n\nComo o envelope se perdeu, Bella compara apenas as datas da biblioteca e o que vocês lembram das mensagens. A hipótese é mais frágil.';
 }
 if(id==='k9_city_doubt'||id==='k9_house_doubt'){const suspected=f.c9_suspeito;const candid=live.filter(x=>x!==suspected&&x!==kid);const cautious=candid.find(x=>['isabella','breno','allan','ryan'].includes(x))||candid[0];const skeptical=candid.find(x=>x!==cautious&&['samuel','rauanny','laisla','rayssa'].includes(x))||candid.find(x=>x!==cautious);if(cautious&&skeptical)text+='\n\n'+name(cautious)+': — Eu sei que você tá pensando em '+name(suspected)+', mas uma data não é um assassinato. Não fala disso na frente de todo mundo.\n\n'+name(skeptical)+': — Tá, mas se alguém mentiu sobre por onde passou, não acha que a gente tem que pelo menos perguntar por quê?';}
 if(id==='k9_love_message'){
  if(!lv){text='Você observa a tela do celular. Não há mensagem de uma rota romântica ativa e disponível nesta noite. Se você perdeu alguém, ainda existe uma conversa antiga que não teve continuação. A ausência da notificação faz você ficar imóvel por alguns segundos.\n\nO grupo envia os horários dos dois eventos, e você decide como quer passar a noite.';choices=[G('k9_choose_event','Escolher onde passar a noite')];}
  else text+='\n\n'+name(lv)+': — Posso passar na sua casa antes de sair? Queria te ver um pouco. A gente pode ir junto ou se encontrar mais tarde, o que você preferir.';
 }
 if(id==='k9_love_visit'||id==='k9_love_intimate'||id==='k9_love_goodbye'){
  if(lv){text=text.replaceAll('O interesse romântico',name(lv)).replaceAll('o interesse romântico',name(lv)).replaceAll('A pessoa',name(lv)).replaceAll('a pessoa',name(lv));text+='\n\n'+(id==='k9_love_visit'?extra.romance[lv]:id==='k9_love_intimate'?extra.pledge[lv]:name(lv)+': — A gente se fala se precisar mudar os planos. Só... não some sem avisar, tá?');}
  else {text='Você termina de se arrumar sozinho. A roupa escolhida pode ser simples; não existe obrigação de aparecer com ânimo.\n\nUma mensagem do grupo confirma os horários das festas. Você respira fundo antes de sair.';choices=[G('k9_choose_event','Sair de casa')];}
 }
 if(id==='k9_love_brief'&&lv)text+='\n\n'+name(lv)+': — Tudo bem. Obrigado por me avisar. Depois a gente conversa com calma.';
 if(id==='k9_choose_event'){planParties(s);text+='\n\nNa casa, por enquanto: '+names(f.c9_casa_pessoas)+'. No aniversário da cidade: '+names(f.c9_cidade_pessoas)+'. Bella confirma que vai permanecer acessível mesmo se precisar de cuidados por causa do ferimento.';}
 if(id==='k9_city_arrive'||id==='k9_city_social'){
  if(dead(s,'rayssa'))text=text.replace(/Rayssa[^\n]*\n?/g,'').replace(/Isabella: — É estranho[^]*?Rayssa: — Não sei\./,'O espaço das homenagens permanece iluminado, mas Isabella não encontra a amiga com quem costumava conversar sobre essas noites.');
  else if(dead(s,'isabella'))text=text.replace(/Isabella: — É estranho[^]*?Rayssa: — Não sei\./,'Rayssa observa o mural de fotografias em silêncio. Uma pessoa pergunta se ela está bem, e ela desvia os olhos antes de responder.');
 }
 if(id==='k9_house_arrive'){
  const house=(f.c9_casa_pessoas||[]).filter(x=>!dead(s,x));
  text+='\n\nEntre os amigos que decidiram vir estão '+names(house)+'. Os demais não estão aqui e não aparecerão na festa sem uma chegada explicada.';
  if(dead(s,'laisla'))text=`A casa perto do lago foi disponibilizada pelos parentes de Laisla, embora ela não esteja viva para receber ninguém. ${f.c9_anfitriao?name(f.c9_anfitriao)+' assumiu a organização de uma reunião para quem não quis ir ao aniversário de Lakewood.':'Os poucos presentes tentam encontrar algum conforto em estar juntos.'}\n\nA decoração é contida; ninguém tenta reproduzir os gestos de Laisla como se ela estivesse ali.\n\nEntre os amigos presentes: ${names(house)}. A lembrança de Laisla pesa justamente por causa de seu desejo de aproveitar a vida.`;
 }
 if(id==='k9_house_social'){
  const house=(f.c9_casa_pessoas||[]).filter(x=>!dead(s,x));text=text.replace(/Ryan pode inventar[^]*?Rauanny ajuda Laisla com uma caixa de som\./,house.map(x=>name(x)+': — '+({ryan:'Se alguém me desafiar pra alguma brincadeira eu vou perder de propósito. Ou quase.',allan:'Vocês ainda lembram daquelas músicas que a gente escutava no ônibus?',samuel:'Eu só queria que todo mundo voltasse pra casa hoje, sem exceção.',laisla:'A caixa de som tá funcionando! Isso já é uma vitória.',rauanny:'Eu ajeito a música. Só não escolham aquela playlist horrorosa.',breno:'Vou ficar um pouco na varanda, mas tá tudo bem.','isabella':'Por favor, alguém guarda as chaves num lugar que a gente consiga encontrar.'}[x]||'Quero aproveitar a noite com vocês.')+'\n\n').join(''));
 }
 if(id==='k9_omen'){const city=f.c9_hero_local!=='casa';text+='\n\n'+(city?'Você está na praça e recebe uma mensagem incompleta da casa.':'Você está na casa e recebe uma mensagem curta do centro.');}
 if(id==='k9_missing'){
  const where=f.c9_refem_local==='casa'?'casa':'praça';text=`Você percebe que ${name(kid)} não respondeu à última mensagem. ${where==='casa'?'A informação chega por um dos amigos que está na casa de veraneio.':'Entre a multidão do aniversário da cidade, não há sinal de '+name(kid)+'.'}\n\nAntes de se afastar, ${name(kid)} parecia preocupado com alguma coisa que você não conseguiu ouvir. Agora o telefone toca sem resposta. Você pergunta aos outros se alguém viu essa pessoa sair. As respostas não combinam.\n\nSe continuar procurando por muito tempo, talvez perca uma chance de encontrar o caminho do sequestrador. Se agir rápido demais, pode deixar passar um detalhe importante.`;
 }
 if(id==='k9_missing_search')text=text.replace(/Rayssa se aproxima[^]*?com quem o amigo saiu\./,dead(s,'rayssa')?'Ninguém do grupo consegue explicar o desaparecimento. A equipe de segurança começa a consultar os registros disponíveis.':'Rayssa envia uma mensagem dizendo que viu movimento perto dos bastidores, mas não consegue identificar com quem '+name(kid)+' saiu.');
 if(id==='k9_video'){
  text=text.replace('o rosto da pessoa capturada','o rosto de '+name(kid));
  if(f.c9_hero_local==='casa'){
   location='CASA DO LAGO · VÍDEO RECEBIDO';text=`Uma ligação do aniversário de Lakewood chega ao seu celular. Do outro lado, você escuta gritos e alguém dizendo que a apresentação foi interrompida.\n\nUma gravação é enviada para o grupo. ${name(kid)} aparece com os pulsos presos numa cadeira, diante de uma câmera que esconde a maior parte do cenário.\n\nVOZ DISTORCIDA: — Olá, Lakewood. Vieram homenagear os mortos? Que bonitinho.\n\nA figura mascarada toca o ombro do refém.\n\nVOZ DISTORCIDA: — Mas ainda falta gente nessa homenagem.\n\nA gravação termina numa imagem escura da estrada do lago. Você escuta pelo telefone o pânico na praça. Quem está na casa vê o vídeo na tela pequena do aparelho e entende que a festa acabou.`;
  }
 }
 if(id==='k9_video_react'&&kid==='rayssa')text+='\n\nNa imagem, Rayssa parece aterrorizada. Ela repete uma frase que o microfone mal capta: «Você prometeu». Não há explicação sobre o que alguém teria prometido.';
 if(id==='k9_house_warning'){
  if(f.c9_hero_local==='casa'){text=text.replace('PONTO DE VISTA: UM SOBREVIVENTE NA CASA','');}
  const lead=(f.c9_casa_pessoas||[]).find(x=>x!==kid&&!dead(s,x));if(lead&&f.c9_hero_local!=='casa'){text=text.replace('PONTO DE VISTA: UM SOBREVIVENTE NA CASA',pov(lead).trim());}else text=text.replace('PONTO DE VISTA: UM SOBREVIVENTE NA CASA','PONTO DE VISTA: UM CONVIDADO DA CASA');
 }
 if(id==='k9_invasion'){
  const home=(f.c9_casa_pessoas||[]).filter(x=>x!==kid&&!dead(s,x));
  text+='\n\nEntre os amigos que ainda estão dentro da casa: '+names(home)+'.';
  if(dead(s,'laisla'))text=text.replace('Laisla, se está ali, tenta juntar os convidados.','Quem organizou a reunião tenta juntar os convidados.');
  else text=text.replace('Laisla, se está ali, tenta juntar os convidados.','Laisla tenta juntar os convidados e aponta a saída lateral.');
  if(f.c9_hero_local==='cidade')text+='\n\nVocê chega ao acesso da casa depois de receber os avisos. Os primeiros convidados já estão saindo. Não esteve presente desde o começo da invasão e precisa perguntar qual corredor foi bloqueado.';
 }
 for(let stage=1;stage<=3;stage++){
  const tgt=f['c9_r'+stage+'_target'];
  if(id==='k9_risk_'+stage+'_pov'){
   if(!tgt||!THREATS[tgt]){choices=[G(stage===3?'k9_reunion':'k9_risk_'+(stage+1)+'_pov','Prosseguir com quem ainda está vivo')];text='Este setor da casa está vazio. Os personagens que poderiam estar aqui já morreram, foram capturados ou não compareceram. Não inventaremos uma vítima para preencher a cena.';}
   else {const t=THREATS[tgt];location='CASA DO LAGO · '+t.where.toUpperCase();text=pov(tgt)+t.intro+'\n\n'+name(tgt)+': — Eu preciso pensar. Não vou sair correndo sem saber onde piso.\n\nO mascarado se aproxima por um único acesso. '+name(tgt)+' pode usar uma passagem que já observou ou correr no escuro.';
    choices=[C(t.good,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','safe')]),C(t.risky,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','risk')]),C(t.bad,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','bad')])];}
  }
  if(id==='k9_risk_'+stage+'_act'&&tgt&&THREATS[tgt]){
   text=pov(tgt)+`${name(tgt)} continua na ${THREATS[tgt].where}. A escolha anterior determina a distância até a saída, mas o mascarado não ficou parado esperando.\n\n${name(tgt)}: — Calma... só preciso de mais alguns segundos.\n\nUm objeto cai do outro lado da porta. Você reconhece o som de uma tentativa de entrada. É preciso escolher como agir agora.`;
  }
  if(id==='k9_risk_'+stage+'_final'&&tgt&&THREATS[tgt])text=pov(tgt)+`Uma batida faz ${name(tgt)} perder o equilíbrio por um instante. Alguém chama do outro setor da casa. Ainda é possível alcançar uma rota planejada — se o acesso estiver livre e se o amigo tiver sido avisado.\n\n${name(tgt)}: — Não me deixa aqui!\n\nHá uma última oportunidade de agir. O perigo é real, mas o desfecho não foi determinado apenas pela escolha de entrar na casa.`;
  if(id==='k9_risk_'+stage+'_result'){
   const status=f['c9_r'+stage+'_result'];
   if(!tgt||status==='none')text='O cômodo foi encontrado vazio. Quem estava ali não retorna como uma vítima inventada. O próximo perigo acontece em outro setor.';
   else if(status==='fatal')text=window.UG107?.state?.(s)?.graphicOff?`${pov(tgt)}${name(tgt)} tenta escapar, mas é alcançado durante a perseguição. O ferimento é grave, e a ajuda chega tarde demais. A morte é confirmada no local. Os amigos ainda precisarão receber a notícia.`:DEATH[tgt];
   else if(status==='injured')text=pov(tgt)+`${name(tgt)} consegue escapar do pior, mas cai contra a estrutura ao sair. O impacto deixa um ferimento importante, e cada passo dói. Mesmo assim, há sinais claros de vida e uma rota para receber socorro.\n\n${name(tgt)}: — Eu tô vivo... só me ajuda a sair daqui.\n\nO telefone registra a posição. Mais tarde os outros saberão exatamente onde o encontraram.`;
   else text=pov(tgt)+`${name(tgt)} usa a passagem conferida, apoia-se na estrutura firme e aguarda a resposta de um amigo antes de avançar. Um golpe atinge a porta atrás, mas a pessoa consegue sair do setor sem ficar encurralada.\n\n${name(tgt)}: — TÔ AQUI! EU CONSEGUI!\n\nQuem ajudou confirma pelo celular. A fuga custou esforço e preparação, mas foi possível.`;
  }
 }
 if(id==='k9_reunion'||id==='k9_reunion_luto'){
  const house=(f.c9_casa_pessoas||[]).filter(x=>x!==kid);
  if(id==='k9_reunion')text+='\n\nPessoas que conseguiram reunir-se no jardim: '+names(house.filter(x=>!dead(s,x)))+'. A pessoa sequestrada continua desaparecida: '+name(kid)+'.';
  if(id==='k9_reunion_luto'){
   if(!lost9.length)text='Os amigos chegam em grupos pequenos, contando quem saiu pela garagem e quem veio pela varanda. Todos os amigos que estavam na casa e não foram sequestrados conseguiram sobreviver a esta perseguição.\n\nRyan, se está presente, tenta fazer uma brincadeira para aliviar a tensão, mas ninguém ri por muito tempo. O refém continua desaparecido. A polícia ainda precisa conferir o cenário.';
   else {
    text='O reencontro começa pela tentativa de contar os sobreviventes. Não é possível apenas dizer que alguém ficou para trás e seguir como se nada tivesse acontecido.';
    for(const x of lost9){text+='\n\nA morte de '+name(x)+' é confirmada quando o amigo que presenciou os acontecimentos ou a equipe que chegou ao cômodo descreve os ferimentos e identifica o corpo.\n\n';
     if(x==='allan'&&!dead(s,'samuel'))text+='Samuel: — CADÊ O ALLAN? NÃO! EU VOU VOLTAR LÁ! ELE ME DISSE QUE IA SAIR!\n\nSamuel tenta passar pelos outros, mas as pernas cedem antes que consiga chegar à porta.';
     else if(x==='samuel'&&!dead(s,'allan'))text+='Allan: — Não... o Samu não. Ele tava comigo desde pequeno. Não me pede pra entender isso agora.\n\nAllan cobre o rosto com as mãos.';
     else if(x==='isabella'&&!dead(s,'rayssa'))text+='Rayssa: — Eu falei com ela antes da festa. Eu disse que a gente se encontrava depois. Por que eu disse isso?\n\nRayssa se afasta antes de terminar, incapaz de olhar para a porta.';
     else if(x==='laisla'&&!dead(s,'rauanny'))text+='Rauanny: — ELA QUE CHAMOU TODO MUNDO PRA CÁ! EU DISSE QUE FICAVA COM ELA!\n\nRauanny soluça, tentando encontrar ar para continuar.';
     else if(x==='rauanny'&&!dead(s,'laisla'))text+='Laisla: — A Rau falou que ia me ajudar com a música. Faz só uma hora... como é que ela não tá mais aqui?\n\nLaisla olha a piscina e cobre a boca com as mãos.';
     else if(x==='ryan'&&!dead(s,'breno'))text+='Breno: — O Ryan me chamou pra ficar com ele na varanda. Eu não fui. Eu devia ter ido...\n\nBreno se senta na grama sem conseguir erguer os olhos.';
     else if(x==='breno'&&!dead(s,'ryan'))text+='Ryan: — Ele tava tentando ajudar. O Breno sempre tava tentando ajudar alguém...\n\nRyan puxa o ar e não consegue terminar a frase.';
     else {const witness=live.find(y=>y!==x&&y!==kid);text+=(witness?name(witness)+': — Eu vi quando tentaram ajudar. A gente precisa contar à família, não deixar que descubram pela televisão.':'Você observa a porta por onde a pessoa não voltará.');}
     if(s.romanceEscolhido===x)text+='\n\nVocê se lembra do último beijo, das mensagens e da conversa que ainda esperava ter. A dor não permite simplesmente seguir para a próxima escolha.';
    }
   }
  }
 }
 if(id==='k9_deck_route'){text+='\n\n'+(f.c9_bella_ajudou_deck?'Bella examina as anotações e indica qual é o deck ligado ao acidente, sem precisar correr até lá.':'Você usa a memória daquela noite e os acessos conhecidos para identificar o deck, sem inventar uma localização.');}
 if(id==='k9_deck_arrive'||id==='k9_deck_hostage'){
  text=text.replaceAll('o refém',name(kid)).replaceAll('O refém',name(kid));
  text=text.replaceAll('A pessoa',name(kid)).replaceAll('a pessoa',name(kid));
  text=text.replace('REFÉM: — Ele tá aqui.',name(kid)+': — Ele tá aqui.');
  if(id==='k9_deck_hostage'&&lv===kid)text+='\n\nVocê encosta a testa na de '+name(kid)+' e o beija rapidamente, antes de tentar afrouxar a fita. Não há tempo para fingir que esse sentimento é pequeno.';
  if(id==='k9_deck_arrive'&&kid==='rayssa')text+='\n\nRayssa olha para sua mão com uma expressão difícil de interpretar. Ela está machucada e você não sabe o que aconteceu desde a gravação.';
 }
 if(id==='k9_deck_face')text=text.replace('deixa essa pessoa ir embora','deixa '+name(kid)+' ir embora');
 if(id==='k9_final'){
  text=`Você: — Ok..Chegou a hora de acabar com tudo isso, Chega de Joguinhos..E chega de máscaras seu idiota!\n\nDigo e o Assassino finalmente tira a sua máscara.\n\nVocê: — O que?... Você?\n\nFIM DO CAPÍTULO 9 — UM ÚLTIMO JOGO`;
 }
 return {...n,text,choices,location,scene};
}
const CLUES={
 c9_divergencia_registro:{title:'Inconsistência de horário',category:'Capítulo 9 · Bella',text:'Bella encontrou uma divergência entre horários de acesso e versões dadas sobre deslocamentos. Não identifica quem usou o lugar nem prova autoria dos ataques.'},
 c9_video_homenagem:{title:'Cópia da transmissão do aniversário',category:'Capítulo 9 · Lakewood',text:'Uma gravação prévia mostra um refém e um agressor mascarado, sem identificar o lugar exato de filmagem.'},
 c9_foto_casa:{title:'Imagem recente da festa no lago',category:'Capítulo 9 · Ameaça',text:'Fotografia feita de ângulo elevado mostra a área da piscina. A origem da imagem não foi identificada.'},
 c9_canal_video:{title:'Rastro técnico da transmissão',category:'Capítulo 9 · Evento municipal',text:'A transmissão foi inserida no sistema do evento; sua autoria ainda depende de investigação.'}
};
function phoneThreads(s,base){if(!s?.flags?.c9_enter_k9_01)return base;const t=base.map(x=>({...x,messages:[...(x.messages||[])]}));
 const get=(id,label)=>{let x=t.find(y=>y.id===id);if(!x){x={id,name:label,sub:'Lakewood',messages:[],replyKey:''};t.push(x)}return x;};
 const group=get('grupo','Grupo de amigos');if(s.flags.c9_enter_k9_invites){group.messages.push({who:'Laisla',time:'CAPÍTULO 9 · TARDE',text:dead(s,'laisla')?'A casa dos tios de Laisla está disponível para uma reunião pequena.':'Hoje vou fazer uma festa na casa dos meus tios, perto do lago. Quem quiser vem. Sem pressão.'});}
 const lv=lover(s);if(lv&&s.flags.c9_enter_k9_love_message){get(lv,name(lv)).messages.push({who:name(lv),time:'CAPÍTULO 9 · TARDE',text:'Posso passar na sua casa antes de sair? Queria te ver um pouco antes da festa.'});if(s.flags.c9_encontro_em_casa)get(lv,name(lv)).messages.push({who:'Você',time:'CAPÍTULO 9 · TARDE',text:'Pode sim. Tô te esperando.'});}
 if(s.flags.c9_enter_k9_video){get('anonimo9','Número desconhecido').messages.push({who:'Número desconhecido',time:'CAPÍTULO 9 · NOITE',text:'Mas ainda falta gente nessa homenagem.'});}
 if(s.flags.c9_enter_k9_video_react){get('anonimo9','Número desconhecido').messages.push({who:'Número desconhecido',time:'CAPÍTULO 9 · NOITE',text:'Ainda estão se divertindo?',media:'Fotografia recente da piscina na casa de veraneio'});}
 return t;
}
window.UG9=Object.freeze({dead,alive,enter,onChoice,resolve,phoneThreads,clues:CLUES,hostage,planParties});
if(NODES.k8_last_02)NODES.k8_last_02.choices=[G('k9_01','CAPÍTULO 09 · COMEÇAR UM ÚLTIMO JOGO')];
for(const node of nodes){NODES[node.id]=node;ALL.push(node);}
})();
