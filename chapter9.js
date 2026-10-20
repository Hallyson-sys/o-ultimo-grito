/* O ÚLTIMO GRITO · CAPÍTULO 9: UM ÚLTIMO JOGO · V1.3.3
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
const lover=s=>['ryan','breno','rayssa','rauanny'].includes(s?.romanceEscolhido)&&!dead(s,s.romanceEscolhido)?s.romanceEscolhido:null;
const bf=s=>Number(s.bonds?.[lover(s)]||50);
const suspect=s=>['breno','samuel','ryan','allan','isabella','rauanny','laisla'].find(x=>!dead(s,x))||null;
const visits=s=>IDS.filter(x=>s.flags?.['c9_chat_done_'+x]).length;
const heavy=(s,id)=>!!s?.flags?.['c8_grave_'+id]||!!s?.flags?.['c7_ferido_'+id]||!!s?.flags?.['c6_ferida_'+id];
// Capítulo 9 · Sorveteria. Cada escolha leva a uma fala do protagonista,
// uma réplica escrita para este amigo e uma reação narrativa própria.
const ICE={
 ryan:{
  open:`Ryan está tentando equilibrar uma cereja na ponta da colher. Ela cai no pires. Ele encara a bagunça e balança a cabeça.\n\nRyan: — Aí, pronto. Eu sabia que hoje ia perder pra alguma coisa.\n\nO sorriso dura pouco. Ele empurra a taça na sua direção.\n\nRyan: — Senta aqui. Posso ficar uns cinco minutos sem fazer o palhaço da mesa?`,
  beats:[
   [
    ['Perguntar por que ele tenta animar todo mundo','Você: — Por que você sempre sente que precisa fazer todo mundo rir?','Ryan: — Porque quando eu paro, o pessoal fica olhando como se tivesse dado defeito em mim. Na escola eu fazia graça e já bastava. Agora parece que tenho que salvar o clima também.','Ryan gira a colher entre os dedos e, desta vez, não tenta recuperar a piada.'],
    ['Lembrar alguma bobagem que vocês fizeram juntos','Você: — Lembra quando a gente brigou por meia hora por causa de um controle remoto?','Ryan: — E eu escondi as pilhas! Eu achei que ia ser engraçado até vocês quase me expulsarem da sala.','Ele finalmente ri de verdade. O riso acaba quando olha para a cadeira vazia do outro lado da mesa.'],
    ['Perguntar se ele tem medo de perder a coragem','Você: — Você já pensou que pode não conseguir brincar com tudo isso pra sempre?','Ryan: — Todo dia. Eu morro de medo de travar quando precisarem de mim. E de depois falarem que o Ryan só servia pra fazer piada.','Ryan aperta o guardanapo, procurando uma resposta que não transforme medo em espetáculo.']
   ],[
    ['Dizer que ele não precisa ser engraçado com você','Você: — Comigo você não precisa fazer ninguém rir. Pode ficar quieto. Pode estar mal.','Ryan: — Ainda bem. Porque hoje eu tô quase perdendo a voz de tanto dizer que tô bem.','Ele se recosta no banco, como se tivesse recebido permissão para descansar.'],
    ['Perguntar quando ele se sentiu levado a sério','Você: — Quando foi a última vez que alguém pediu sua opinião sem achar que era brincadeira?','Ryan: — Lá no apartamento da Laisla. Por uns segundos, ninguém esperou que eu fizesse gracinha. Só me ouviram tentando achar uma saída.','Ele aponta para a janela, recordando o medo que sentiu naquela noite.'],
    ['Confessar que também tem medo de falhar','Você: — Eu também tenho medo de chegar na hora e não conseguir ajudar ninguém.','Ryan: — Então tá. Somos dois. Mas a gente consegue pensar mesmo tremendo, né? Pelo menos dá pra tentar junto.','Ele encosta o ombro no seu, de maneira breve e sincera.']
   ],[
    ['Perguntar o que ele faria num dia sem ameaças','Você: — Se amanhã fosse um dia normal, o que você ia fazer primeiro?','Ryan: — Eu comprava ingresso pro pior filme do cinema. Depois ia comer alguma coisa e reclamar da história até você pedir pra eu calar a boca.','Por alguns instantes, vocês discutem qual filme seria ruim o bastante para valer a pena.'],
    ['Dizer que ele já ajudou mais do que imagina','Você: — Você não é só a pessoa que faz o grupo rir. Você já ajudou a gente de verdade.','Ryan: — Queria que eu conseguisse lembrar disso quando todo mundo começa a gritar. Obrigado por falar.','Ele olha para você sem disfarçar a emoção atrás de uma piada.'],
    ['Perguntar como vão recuperar a confiança do grupo','Você: — Como a gente volta a confiar um no outro depois das acusações?','Ryan: — Falando na cara, mesmo quando é desconfortável. E parando de decidir quem é corajoso e quem é inútil pelo jeito que a pessoa reage.','Ryan recolhe a cereja do pires e a coloca sobre a taça, agora sem fazer cerimônia.']
   ]
  ],
  end:[
   ['Prometer um passeio sem falar de mortes','Você: — Quando isso terminar, a gente vai sair e ninguém vai falar de assassino.','Ryan: — Fechado. Só não reclama quando eu escolher um filme horroroso.','Ryan bate a colher na sua como se fosse um brinde. O gesto bobo parece precioso.'],
   ['Agradecer por mostrar seu lado sério','Você: — Obrigado por confiar em mim até quando não tem graça nenhuma.','Ryan: — Obrigado por não me fazer transformar isso em piada. Já é uma baita diferença.','Ele respira fundo antes de voltar para a mesa dos demais.']
  ]
 },
 rayssa:{
  open:`Rayssa está com as duas mãos em volta de um copo que já começou a suar. Em vez de olhar a vitrine de sabores, ela observa os amigos espalhados pelas mesas.\n\nRayssa: — Eu tava pensando se a gente algum dia vai conseguir sentar assim sem contar quem falta.\n\nEla afasta a bolsa para abrir espaço ao seu lado.\n\nRayssa: — Desculpa, não queria começar desse jeito.`,
  beats:[
   [
    ['Perguntar como ela está depois da discussão','Você: — Você ficou tão quieta depois das acusações. O que aconteceu?','Rayssa: — Eu tinha medo de piorar tudo. Às vezes você abre a boca pra proteger alguém e acaba machucando outra pessoa.','Ela acompanha com os olhos uma colher caindo na mesa ao lado, como se o barulho a tivesse assustado.'],
    ['Perguntar de uma lembrança dela com Isabella','Você: — Conta uma coisa boa que você e a Isabella faziam antes disso tudo.','Rayssa: — A gente trocava os fones na volta das aulas. Ela escolhia uma música horrível só pra ver minha cara. E depois cantava o refrão inteiro, desafinada.','Um sorriso aparece devagar. Rayssa passa o polegar pela borda do copo.'],
    ['Perguntar se ela ainda faz planos para o futuro','Você: — Ainda tem alguma coisa que você quer fazer quando tudo isso passar?','Rayssa: — Queria uma manhã boba. Acordar atrasada, escolher roupa sem pensar em perigo e encontrar vocês na esquina. Parece tão pouco, né?','Ela olha para o movimento da rua, tentando imaginar aquela manhã.']
   ],[
    ['Dizer que ela não precisa proteger todos sozinha','Você: — Você não precisa assumir o sofrimento de todo mundo.','Rayssa: — Eu sei que você tá tentando me ajudar. Só que é difícil ver alguém sofrer e ficar parada.','Ela puxa um guardanapo, dobra uma ponta e a desdobra em seguida.'],
    ['Perguntar do que ela sente mais saudade','Você: — Do que você sente mais falta na amizade de vocês?','Rayssa: — De eu poder mandar mensagem sem pensar duas vezes. De a Isa perceber só pelo jeito que eu escrevi um oi quando alguma coisa tava errada.','Rayssa aperta os lábios e desvia os olhos por um instante.'],
    ['Admitir que também pensa em fugir de Lakewood','Você: — Às vezes eu penso em ir embora daqui e nunca mais voltar.','Rayssa: — Eu também penso. Mas aí lembro de todas as pessoas que deixaria pra trás. E nada parece simples.','O sinal de uma bicicleta toca do lado de fora. Ela espera passar antes de continuar.']
   ],[
    ['Perguntar se ela consegue pedir ajuda','Você: — Se as coisas apertarem de novo, você promete pedir ajuda em vez de se calar?','Rayssa: — Posso tentar. Prometer sem saber se vou conseguir seria injusto com você.','Ela levanta os olhos para ver sua reação à resposta menos confortável.'],
    ['Dizer que a amizade de vocês importa','Você: — A nossa amizade importa pra mim. Não quero que a gente só converse quando alguém morre.','Rayssa: — Também não quero isso. Eu sinto falta de conversar sobre qualquer coisa sem ficar com a cabeça em outro lugar.','Ela se inclina um pouco na sua direção, aliviada por poder dizer algo simples.'],
    ['Perguntar como ela lidaria com uma mentira de um amigo','Você: — Você conseguiria ouvir alguém que escondeu alguma coisa séria do grupo?','Rayssa: — Acho que eu ia querer saber por quê. E ia ficar com muita raiva. Uma coisa não impede a outra.','Ela mexe o canudo no copo até o gelo bater de leve nas laterais.']
   ]
  ],
  end:[
   ['Segurar a mão dela por um momento','Você: — Não precisa resolver tudo hoje. Fica aqui comigo mais um pouquinho.','Rayssa: — Só um pouquinho. Acho que eu precisava disso.','Ela segura sua mão e respira devagar antes de soltar.'],
   ['Dizer que podem conversar novamente outro dia','Você: — Quando você quiser conversar sem fingir que tá bem, pode me procurar.','Rayssa: — Tá. Obrigada por não me pressionar a falar mais do que consigo.','Ela limpa uma gota de sorvete do pulso e sorri discretamente.']
  ]
 },
 breno:{
  open:`Breno ficou numa mesa perto da janela, afastada da caixa de som. Ele tinha separado uma cadeira para colocar a mochila, mas a tira quando vê você chegando.\n\nBreno: — Pode sentar. É que aqui dá pra ouvir a própria voz.\n\nEle ajeita a manga perto do curativo e volta a olhar para a rua, ainda desconfortável depois da discussão com Rauanny.`,
  beats:[
   [
    ['Perguntar como foi ser acusado de se isolar','Você: — Aquilo que falaram de você na discussão te machucou?','Breno: — Machucou. Eu não pedi pra ficar sozinho tantas vezes. Só não sei entrar numa conversa gritando mais alto que os outros.','Ele move a mochila para debaixo da cadeira, liberando espaço para você.'],
    ['Pedir para ele mostrar uma fotografia que guarda','Você: — Você disse que guarda fotos antigas. Tem alguma que gostaria de me mostrar?','Breno: — Tenho uma que ninguém ficou bem. A gente tava todo descabelado depois de uma chuva. Eu gosto justamente por isso.','Ele abre a galeria do celular sem apressar sua reação.'],
    ['Perguntar onde ele se sente seguro','Você: — Tem algum lugar onde você ainda consegue relaxar?','Breno: — Perto de uma janela, geralmente. Quando consigo ver quem tá chegando, parece que meu peito abre um pouco.','Breno olha de relance para a porta e volta a atenção para você.']
   ],[
    ['Reconhecer que ele ajudou mesmo estando quieto','Você: — Você ajudou quando precisaram, mesmo sem ser o mais barulhento.','Breno: — Obrigado. Eu achei que ninguém tinha percebido. Às vezes fico tão ocupado tentando não atrapalhar que esqueço de falar.','Ele fecha a galeria e segura o celular contra a mesa, pensativo.'],
    ['Perguntar o que ele faria se pudesse morar longe','Você: — Se pudesse escolher qualquer lugar pra morar, como seria?','Breno: — Uma casa pequena. Uma janela grande. Alguém na cozinha sem precisar olhar pra trás a cada barulho.','Ele quase sorri ao descrever os detalhes da casa imaginária.'],
    ['Dizer que também prefere conversas tranquilas','Você: — Eu também gosto quando dá pra conversar sem todo mundo ouvindo.','Breno: — Então você entende por que eu vim pra essa mesa. Não tô fugindo de vocês. Às vezes só preciso respirar.','O barulho do liquidificador do outro lado da loja faz os dois esperarem alguns segundos.']
   ],[
    ['Sugerir que ele fale diretamente com Rauanny','Você: — Se ainda estiver magoado com a Rauanny, talvez valha conversar com ela.','Breno: — Eu quero, mas não hoje na frente de todo mundo. Primeiro preciso descobrir como falar sem parecer que tô me defendendo de um crime.','Ele alisa o guardanapo até desaparecer a dobra que havia feito.'],
    ['Pedir que ele não desapareça quando estiver mal','Você: — Na próxima vez que precisar ficar sozinho, manda pelo menos um oi. Vou saber que tá aí.','Breno: — Isso eu consigo. Não prometo responder rápido, mas consigo mandar.','O alívio aparece no modo como ele relaxa os ombros.'],
    ['Perguntar se ele gostaria de companhia na festa','Você: — Você quer que eu te faça companhia quando a gente sair daqui?','Breno: — Quero. Não precisa decidir por mim onde vamos. Só de saber que posso te procurar ajuda.','Ele finalmente encara você por mais tempo, sem fugir do olhar.']
   ]
  ],
  end:[
   ['Oferecer um abraço, sem insistir','Você: — Posso te dar um abraço antes da gente voltar?','Breno: — Pode. Obrigado por perguntar.','Ele se aproxima devagar e retribui o abraço com mais força do que você esperava.'],
   ['Combinar de olhar as fotos antigas outro dia','Você: — Depois me mostra o resto das fotos. Não precisa escolher só as bonitas.','Breno: — Fechado. As piores são as melhores mesmo.','Ele guarda o celular com cuidado e vai com você até a mesa central.']
  ]
 },
 samuel:{
  open:`Samuel mexe no canudinho sem beber nada. Quando você puxa a cadeira, ele fecha a mão sobre o copo para impedir que trema.\n\nSamuel: — Eu sei que você quer perguntar da estrada. Todo mundo quer.\n\nVocê se senta. Ele encara a porta por alguns segundos.\n\nSamuel: — Só queria conseguir lembrar de alguma coisa que não fosse aquela noite.`,
  beats:[
   [
    ['Perguntar de uma lembrança antiga com Allan','Você: — Qual foi a maior confusão em que você e o Allan se meteram quando eram pequenos?','Samuel: — A gente tentou consertar uma bicicleta com peça errada. Descemos uma rua inteira sem freio. Ele ria tanto que nem conseguia pedir ajuda.','Samuel esboça uma risada, mas os olhos continuam molhados.'],
    ['Perguntar o que ele faria de diferente naquela noite','Você: — Tem alguma escolha daquela noite que você mais queria mudar?','Samuel: — Ter parado e pedido ajuda. Não dá pra desfazer o acidente, eu sei. Mas o que a gente fez depois... isso foi uma escolha.','Ele observa a própria mão, como se procurasse nela uma resposta.'],
    ['Perguntar se ele ainda pensa em abrir uma oficina','Você: — Você ainda pensa naquela oficina que queria montar?','Samuel: — Penso. Um lugar que conserte coisas. Engraçado, né? Eu nem consegui consertar a maior merda que já fiz.','Ele empurra o copo e presta atenção no barulho do gelo.']
   ],[
    ['Reconhecer a responsabilidade sem atacá-lo','Você: — O que aconteceu foi grave. Mas te ouvir não é dizer que nada disso importa.','Samuel: — Obrigado. Eu prefiro isso a me dizerem que foi tudo culpa do destino. Não foi.','Ele ergue a cabeça pela primeira vez desde que você chegou.'],
    ['Perguntar se ele tem alguém para procurar quando acorda assustado','Você: — Quando você acorda de madrugada, consegue ligar pra alguém?','Samuel: — Às vezes fico com o telefone na mão e não aperto chamar. Parece que todo mundo já tem problema demais.','Ele vira a tela do aparelho para baixo, incomodado consigo mesmo.'],
    ['Dizer que não quer outra discussão entre vocês','Você: — Eu não quero que a gente só saiba conversar gritando.','Samuel: — Nem eu. Se eu levantar a voz, pode falar pra eu parar. Só não vai embora no meio de tudo.','Samuel tira o canudo da boca sem ter encostado na bebida.']
   ],[
    ['Perguntar se ele pensa em contar a verdade','Você: — Você ainda pensa em contar pra polícia o que aconteceu no lago?','Samuel: — Penso todo dia. Só não sei se os outros aguentariam me ouvir dizer isso. E eu não vou fingir que seria fácil.','Ele olha para os amigos nas outras mesas, sem decidir por eles.'],
    ['Pedir que não tente enfrentar tudo sozinho','Você: — Quando vier a próxima notícia ruim, não tenta resolver sozinho.','Samuel: — Vou tentar. Já fiz merda demais achando que dava pra carregar tudo nas costas.','Ele aperta a borda da mesa e assente uma vez.'],
    ['Propor um plano simples para o dia seguinte','Você: — Amanhã a gente podia acordar e fazer uma coisa normal. Nem que seja trocar um pneu.','Samuel: — Eu ensino direito dessa vez. E você promete não segurar a chave inglesa pelo lado errado.','É a primeira provocação leve que Samuel consegue fazer naquela tarde.']
   ]
  ],
  end:[
   ['Dizer que a conversa não absolve ninguém, mas importa','Você: — Eu continuo querendo respostas. Mas fico feliz que a gente conseguiu conversar.','Samuel: — Eu também. Não precisa fingir que eu sou inocente pra sentar do meu lado.','Ele finalmente experimenta o sorvete já quase derretido.'],
   ['Convidar Samuel a se juntar à mesa maior','Você: — Vem com a gente. Não precisa ficar isolado aqui.','Samuel: — Tá. Só me dá um segundo pra respirar.','Ele recolhe a mochila e acompanha você.']
  ]
 },
 allan:{
  open:`Allan está examinando os sabores no cardápio com a concentração de quem escolhe uma decisão de vida ou morte. Ao ver você, aponta para uma combinação absurda.\n\nAllan: — Me diz que você também acha criminoso cobrarem por sorvete de queijo com geleia.\n\nEle ri, mas a risada enfraquece.\n\nAllan: — Brincadeira. Senta aqui, vai. Tenho uma coisa pra falar sem plateia.`,
  beats:[
   [
    ['Perguntar por que ele defendeu Samuel tão intensamente','Você: — Você defendeu o Samu na discussão mesmo discordando dele. Por quê?','Allan: — Porque eu conheço o menino que ele era antes daquela estrada. Isso não apaga o que a gente fez. Mas não vou largar ele sozinho pra ser massacrado.','Allan apoia os cotovelos na mesa e espera você absorver a diferença.'],
    ['Perguntar qual lembrança mais engraçada ele guarda','Você: — Qual foi a coisa mais idiota que você já fez com o grupo?','Allan: — Eu convenci todo mundo de que sabia fazer bolo sem receita. Ficou duro que nem tijolo. O pior é que o Samu comeu pra não me deixar triste.','Ele põe a mão no peito, fingindo estar profundamente ofendido pelo bolo.'],
    ['Perguntar como ele lida com o medo quando está sozinho','Você: — Quando ninguém tá olhando, você consegue parar de fingir que tá tudo bem?','Allan: — Às vezes eu tranco a porta e choro. Aí lavo o rosto e volto a brincar. Não porque não sinto nada, mas porque não sei fazer diferente.','Allan observa os próprios dedos, pouco à vontade com tanta sinceridade.']
   ],[
    ['Dizer que ele pode amar o amigo e discordar','Você: — Você pode ficar do lado dele e ainda dizer que ele errou.','Allan: — Isso! É exatamente o que tento explicar. Só que todo mundo ouve uma metade e acha que eu tô defendendo a outra.','Ele aponta para você com a colher, satisfeito por ter sido compreendido.'],
    ['Perguntar se ele se arrepende das brincadeiras','Você: — Você se arrepende de alguma piada que fez na hora errada?','Allan: — De várias. Tem dia que eu abro a boca porque o silêncio me dá pavor. Eu tô tentando aprender quando calar.','Pela primeira vez, Allan deixa um silêncio existir entre vocês.'],
    ['Admitir que também sente falta da normalidade','Você: — Eu sinto saudade de quando nossa maior preocupação era escolher aonde sair.','Allan: — Nem me fala. Hoje eu pagaria um absurdo pra voltar a discutir qual sabor é o menos horrível.','Ele aponta de novo para o cardápio e consegue arrancar um pequeno sorriso seu.']
   ],[
    ['Perguntar o que ele quer viver depois de tudo','Você: — O que você ainda quer fazer com os amigos?','Allan: — Pegar um ônibus aleatório e ir pra qualquer lugar. Sem segredo, sem mensagem anônima. Só a gente reclamando do calor.','Ele imagina a viagem por um momento e depois abaixa os olhos.'],
    ['Pedir que ele não esconda quando estiver sofrendo','Você: — Se você ficar mal, pode falar. Não precisa ser sempre o engraçado.','Allan: — Vou tentar. Mas aviso que provavelmente vou fazer uma piada horrível no meio do desabafo.','Allan sorri, agora sem usar o sorriso para fugir da conversa.'],
    ['Perguntar se consegue conversar com Isabella ou Rauanny','Você: — Você acha que conseguiria conversar com quem te contrariou na discussão?','Allan: — Consigo, se a pessoa topar ouvir. Não quero passar os próximos dias brigando com quem sobrou.','Ele pega um guardanapo e escreve uma mensagem curta para enviar mais tarde.']
   ]
  ],
  end:[
   ['Brincar sobre o sabor escolhido','Você: — Agora me explica o que você tava pensando quando pediu esse sorvete.','Allan: — Eu tava pensando em aventura culinária! E você claramente não tem espírito de explorador.','Vocês voltam à mesa com a taça mais duvidosa da sorveteria.'],
   ['Agradecer por ter falado sem esconder tudo numa piada','Você: — Obrigado por confiar em mim quando não tava com vontade de brincar.','Allan: — Ah, não espalha que eu tenho sentimentos. Vou perder minha reputação.','Ele sorri, mas dessa vez você percebe o agradecimento por trás da provocação.']
  ]
 },
 isabella:{
  open:`Isabella está com três guardanapos alinhados ao lado do copo. Há uma folha de anotações dobrada dentro da bolsa, mas ela a empurra para longe antes que você se sente.\n\nIsabella: — Se você veio falar da investigação, me dá pelo menos três minutos.\n\nEla aponta para uma colher limpa.\n\nIsabella: — Agora você pode falar. Mas escolhe um assunto que não envolva mapa ou cadáver.`,
  beats:[
   [
    ['Perguntar do que ela sente falta com Rayssa','Você: — Como era um dia comum com a Rayssa antes de tudo isso?','Isabella: — Ela aparecia com um fone sobrando e uma música que dizia que eu precisava ouvir. Eu reclamava, mas no fim ficava cantarolando a maldita música.','Isabella sorri pela primeira vez, com uma expressão que não exige conclusão.'],
    ['Perguntar se ela já se cansou de investigar tudo','Você: — Você não tá exausta de tentar encontrar explicação pra cada coisa?','Isabella: — Tô. Mas quando eu paro, parece que alguém vai fazer outra coisa horrível e eu devia ter percebido antes. É uma armadilha na minha cabeça.','Ela pega o guardanapo mais próximo e começa a rasgá-lo em pequenos quadrados.'],
    ['Perguntar o que mais a incomodou nas acusações','Você: — O que mais te incomodou naquela discussão do grupo?','Isabella: — Todo mundo agiu como se escolher um suspeito fosse a mesma coisa que encontrar prova. Eu também perdi a cabeça. Não tô dizendo que fui melhor.','Ela respira fundo e coloca a caneta dentro da bolsa.']
   ],[
    ['Dizer que ela não precisa prever tudo','Você: — Você não pode impedir cada coisa ruim antes de acontecer.','Isabella: — Eu sei disso na teoria. Só que é muito difícil acreditar depois de tantos avisos que a gente ignorou.','Isabella tenta empilhar os guardanapos rasgados e desiste.'],
    ['Pedir que ela tire cinco minutos de folga','Você: — Só cinco minutos. Sem pista, sem horário, sem investigação.','Isabella: — Tá bom. Mas se chegar uma mensagem ameaçadora, vou cobrar esses cinco minutos de você.','Ela leva a primeira colherada à boca e faz uma careta por causa do frio.'],
    ['Reconhecer que ela também tem direito de errar','Você: — Você também tá assustada. Não precisa acertar tudo pra gente continuar te ouvindo.','Isabella: — Obrigada. Acho que eu precisava ouvir isso de alguém que não tava tentando me interromper.','A tensão nos ombros dela diminui um pouco.']
   ],[
    ['Perguntar o que faria se descobrisse um amigo mentindo','Você: — E se a gente descobrir que alguém próximo mentiu? Você ouviria a explicação?','Isabella: — Ouviria. Depois faria perguntas. Uma amizade não é desculpa pra esconder crime, mas também não é motivo pra condenar sem entender.','Isabella dobra as mãos sobre a mesa como se estivesse estabelecendo uma regra para si mesma.'],
    ['Pedir desculpas por não a ter ouvido antes','Você: — Acho que em alguns momentos eu não te ouvi de verdade. Desculpa.','Isabella: — Também não fui fácil. Eu grito quando tô com medo. Preciso parar de achar que isso faz o outro entender mais rápido.','Ela sustenta seu olhar em vez de voltar às anotações.'],
    ['Propor fazer algo divertido depois da festa','Você: — Quando isso acabar, a gente devia ir a algum lugar que não tenha documentos pra conferir.','Isabella: — Eu voto numa praia sem sinal. Ou num cinema com ar-condicionado gelado. Qualquer lugar onde ninguém me dê uma pasta.','Ela finalmente ri e pede outra colher.']
   ]
  ],
  end:[
   ['Combinar de continuar investigando sem acusações precipitadas','Você: — Vamos continuar procurando respostas, mas sem condenar ninguém antes de saber.','Isabella: — Fechado. E se eu começar a acusar no impulso, você me lembra dessa conversa.','Ela recolhe a folha de anotações e a guarda, sem abri-la.'],
   ['Convidar Isabella de volta para a conversa geral','Você: — Vem. Eles vão achar que a gente montou outra investigação secreta.','Isabella: — Pior que vão. E eu só tava tentando comer meu sorvete.','Ela leva o copo consigo e segue ao seu lado.']
  ]
 },
 laisla:{
  open:`Laisla escolheu um lugar perto do balcão para ver o movimento de todo mundo. Ela está descrevendo com entusiasmo um sabor exagerado, mas perde o fio da meada quando você se aproxima.\n\nLaisla: — Olha só, alguém que ainda aceita ficar na minha companhia.\n\nEla ergue o copo num brinde brincalhão e depois fala mais baixo.\n\nLaisla: — Eu tô cansada de ver as pessoas me olhando com pena desde o apartamento.`,
  beats:[
   [
    ['Perguntar se ela ainda tem medo de ficar em casa','Você: — Como tem sido voltar pro seu apartamento depois daquele ataque?','Laisla: — Eu entro no quarto e olho a janela três vezes. Aí fico com raiva de mim por fazer isso. Era minha casa, sabe? Eu queria me sentir dona dela de novo.','Ela ajeita o cabelo atrás da orelha e olha a rua por alguns segundos.'],
    ['Pedir uma lembrança divertida dela com Rauanny','Você: — Me conta uma história sua com a Rauanny que não envolva fuga nem hospital.','Laisla: — Ela apareceu na minha casa com um bolo todo torto pra me animar. Disse que comprou pronto, mas tinha farinha na blusa. Eu não tive coragem de contar que percebi.','Laisla leva a mão à boca para esconder a risada.'],
    ['Perguntar por que ela insiste em reunir todo mundo','Você: — Por que é tão importante pra você reunir as pessoas?','Laisla: — Porque quando tá todo mundo junto, parece que a vida ainda é nossa. Mesmo que dure só uma hora, eu quero lembrar como isso é.','Ela acompanha dois amigos entrando pela porta, aliviada de vê-los.']
   ],[
    ['Dizer que é normal ter medo depois de um ataque','Você: — Você sobreviveu a uma coisa horrível. Não precisa se cobrar pra estar bem.','Laisla: — Eu sei. Só não quero que o medo vire tudo que existe sobre mim. Eu sou mais que a menina do apartamento.','Ela apoia as palmas abertas sobre a mesa, como quem pede para ser vista inteira.'],
    ['Perguntar se ela ainda quer fazer planos com os amigos','Você: — Você ainda pensa em viajar com o pessoal um dia?','Laisla: — Penso! A Rau vivia escolhendo destino e eu só pensava no que levar na mala. A gente era péssima pra decidir.','Laisla aponta para uma fotografia antiga na própria tela.'],
    ['Dizer que prefere uma noite calma','Você: — Eu queria uma noite calma, sem precisar provar que tô vivendo.','Laisla: — E você tem direito. Eu só quero que também me deixem escolher como passar a minha.','Ela se inclina na sua direção para mostrar que não está brigando com você.']
   ],[
    ['Perguntar como gostaria de ser lembrada','Você: — O que você quer que as pessoas lembrem de você, além do que aconteceu no apartamento?','Laisla: — Que eu fazia as pessoas aparecerem. Que ninguém precisava de ocasião especial pra vir me ver.','Ela dá uma risadinha, percebendo como a resposta soou séria.'],
    ['Sugerir que ela peça ajuda para organizar a noite','Você: — Se você resolver juntar o pessoal mais tarde, divide as tarefas. Não faz tudo sozinha.','Laisla: — Nossa, alguém se oferecendo pra ajudar sem criticar antes? Vou anotar essa data.','Ela começa a enumerar tarefas com os dedos e, ao perceber, ri de si mesma.'],
    ['Dizer que teme vê-la se colocar em risco','Você: — Eu tenho medo de você se machucar tentando mostrar que tá bem.','Laisla: — Eu também tenho medo. Mas prometo te falar quando eu não der conta, tá? Só não me trata como se eu fosse de vidro.','Ela toca de leve no seu braço, agradecendo a preocupação.']
   ]
  ],
  end:[
   ['Prometer respeitar o jeito dela lidar com o medo','Você: — Vou tentar respeitar suas escolhas sem fingir que não me preocupo.','Laisla: — É tudo que eu tô pedindo. E prometo ouvir quando você achar uma ideia minha ruim.','Ela aproxima seu copo do seu num brinde discreto.'],
   ['Convidá-la a voltar para perto dos amigos','Você: — Vamos antes que o resto do grupo coma tudo sem a gente.','Laisla: — AH NÃO, meu sorvete favorito não!','Ela levanta depressa demais, sente a pontada do ferimento e diminui o passo sem perder o sorriso.']
  ]
 },
 rauanny:{
  open:`Rauanny está sentada de frente para a entrada, mas muda de cadeira para ficar ao seu lado. A colher bate na borda do copo num ritmo impaciente.\n\nRauanny: — Antes que você pergunte, sim, eu sei que fui grossa com o Breno.\n\nEla olha para o sorvete.\n\nRauanny: — Só que eu fiquei com raiva de todo mundo fingindo que não tá com medo. Inclusive de mim.`,
  beats:[
   [
    ['Perguntar por que ela desconfiou de Breno','Você: — Por que você foi tão dura com o Breno?','Rauanny: — Porque eu olho pro lado e ele some. Eu sei que isso não faz dele culpado de nada. Mas quando a gente tá assustada, o sumiço vira uma história inteira na cabeça.','Ela encosta a testa na mão por um segundo, incomodada com a própria conclusão.'],
    ['Perguntar de uma lembrança boa com Laisla','Você: — Qual foi a maior aventura que você e a Laisla inventaram?','Rauanny: — A gente resolveu viajar sem ter dinheiro nem passagem. Chegamos até a rodoviária e voltamos de ônibus comum. A Lai comprou um chaveiro pra fingir que tinha sido uma grande viagem.','Rauanny sorri ao imaginar a cara da amiga naquela tarde.'],
    ['Perguntar se ela teme perder alguém por causa de uma briga','Você: — Você tem medo de que a última conversa com alguém seja uma discussão?','Rauanny: — Tenho. E é por isso que eu fico brava comigo mesma depois de explodir. Na hora parece que eu preciso me defender de tudo.','Ela larga a colher para responder sem gesticular tanto.']
   ],[
    ['Sugerir que ela peça desculpas sem se humilhar','Você: — Dá pra pedir desculpa pelo jeito que falou sem fingir que não ficou com medo.','Rauanny: — Eu sei. Só tenho dificuldade de dizer isso sem parecer que tô procurando uma desculpa.','Ela ensaia a primeira frase em voz baixa, depois balança a cabeça.'],
    ['Perguntar por que protege tanto Laisla','Você: — O que faz você se preocupar tanto com a Lai?','Rauanny: — Ela sempre apareceu quando eu tava mal, mesmo quando eu mandava ela ir embora. Não consigo ver ela correr perigo e simplesmente aceitar.','Rauanny olha para a outra mesa, procurando a melhor amiga com os olhos.'],
    ['Admitir que você também acusou alguém sem pensar','Você: — Eu também já falei coisa no impulso. Depois parece impossível desfazer.','Rauanny: — Pois é. A parte pior é saber que a pessoa ouviu. Você pode pedir desculpa, mas não desouvir.','Ela gira o copo sobre o guardanapo molhado.']
   ],[
    ['Perguntar se ela pretende conversar com Breno','Você: — Você pensa em falar com o Breno quando tiver chance?','Rauanny: — Penso. Talvez não hoje, mas vou falar. Ele não merecia ouvir aquilo como se já tivesse sido julgado.','Rauanny encara a mesa e respira fundo antes de continuar.'],
    ['Dizer que Laisla precisa escolher também','Você: — Você pode proteger a Laisla sem escolher tudo por ela.','Rauanny: — Eu sei. O problema é que eu odeio a ideia de ficar olhando quando ela se arrisca. Mas vou tentar ouvir antes de brigar.','Ela parece irritada consigo mesma, não com você.'],
    ['Propor que vocês se apoiem mesmo discordando','Você: — Se a gente discordar de novo, vamos tentar não transformar isso numa guerra.','Rauanny: — Fechado. Mas aviso que às vezes eu vou precisar sair e andar dez minutos antes de responder.','Ela ri da própria falta de paciência, já um pouco mais relaxada.']
   ]
  ],
  end:[
   ['Agradecer por confiar em você mesmo estando irritada','Você: — Obrigado por falar comigo até das partes de que você não se orgulha.','Rauanny: — É. Não espalha que eu sei admitir erro, senão perco a fama de insuportável.','Ela dá um sorriso torto e empurra sua taça para longe da borda da mesa.'],
   ['Convidá-la para voltar ao grupo quando se sentir pronta','Você: — Vem quando quiser. Ninguém precisa resolver todas as brigas agora.','Rauanny: — Tá. Vou terminar isso aqui antes que derreta completamente.','Ela respira fundo e levanta para acompanhar você.']
  ]
 }
};

const ICE_TRANSITIONS={
 ryan:[
  'Ryan deixa a colher sobre o pires. Pela primeira vez desde que entraram, não olha para os amigos esperando que alguém ria. Ele espera sua pergunta terminar antes de responder.',
  'Uma criança derruba parte de uma casquinha perto de vocês. Ryan quase faz uma piada sobre o acidente, mas a engole e continua falando do que sente.',
  'Ryan ajeita a cadeira com o pé, afastando-se do barulho perto do balcão. Sua expressão muda quando percebe que você não pretende encerrar o assunto com uma risada.',
  'Ryan termina a última colherada e recupera a cereja que tinha caído no pires. Ele a coloca ao lado da taça, ouvindo sua despedida com uma atenção incomum.'
 ],
 rayssa:[
  'Rayssa segue com os olhos o reflexo das pessoas no vidro da sorveteria. Quando você a chama, volta a olhar para você e aperta a borda do copo com os dedos.',
  'O gelo estala dentro do copo de Rayssa. Ela fecha os olhos por um segundo, como se estivesse pesando o quanto pode dizer, e então responde com cuidado.',
  'Rayssa estica a manga do casaco sobre a mão. A conversa fica íntima sem que vocês precisem se afastar muito dos outros; ela fala cada vez mais baixo.',
  'Antes de se levantar, Rayssa recolhe o guardanapo amassado e fica segurando-o entre os dedos. Sua resposta vem quase como uma confidência.'
 ],
 breno:[
  'Breno bloqueia a tela do celular quando você fala. Ele precisa procurar suas palavras, mas desta vez não se esconde atrás de um simples aceno.',
  'Um carro passa do lado de fora e Breno acompanha o movimento pela janela. Quando o ruído desaparece, ele retoma exatamente de onde a conversa tinha parado.',
  'Breno puxa a mochila para perto do pé. O gesto parece automático, mas ele deixa a cadeira ao lado livre em vez de se afastar como costuma fazer.',
  'Breno guarda o celular e passa o polegar na alça da mochila. A despedida fica um pouco mais fácil do que o primeiro cumprimento.'
 ],
 samuel:[
  'Samuel empurra o canudo até o fundo do copo e percebe que o papel já se desfez. Ele o deixa de lado antes de dar uma resposta que não seja mais uma desculpa.',
  'Samuel olha as mãos manchadas por pequenas cicatrizes antigas. A resposta demora, mas ele não tenta encurtar o assunto quando você continua.',
  'A atendente chama um pedido pelo número, e Samuel se assusta com a voz alta. Ele respira, espera o coração desacelerar e retoma sua frase.',
  'Samuel finalmente prova o sorvete quase derretido. A colher fica parada no ar enquanto ele reage às últimas palavras que você diz.'
 ],
 allan:[
  'Allan para de apontar o cardápio como se fosse um troféu. Ele ainda sorri, mas agora presta atenção à sua pergunta sem preparar uma resposta engraçada.',
  'A colher de Allan bate na taça quando ele gesticula demais. Ele a segura com as duas mãos e abaixa a voz para não transformar a conversa em espetáculo.',
  'Allan abre a boca para fazer um comentário exagerado, reconsidera e passa a mão no rosto. É estranho vê-lo escolher a sinceridade primeiro.',
  'Allan deixa a taça entre vocês como se fosse um objeto de negociação e aguarda o que você vai dizer antes de voltar para os demais.'
 ],
 isabella:[
  'Isabella afasta a folha dobrada para o fundo da bolsa. A caneta permanece na mesa, esquecida enquanto ela escuta uma pergunta que não tem resposta em nenhum registro.',
  'Isabella organiza os quadrados de guardanapo que rasgou e percebe que está tentando pôr até a bagunça em ordem. Ela dá uma risada curta de si mesma.',
  'Isabella solta um suspiro e se encosta no banco. Em vez de corrigir sua frase imediatamente, espera você terminar e escolhe responder sem levantar a voz.',
  'Isabella coloca a colher sobre a taça vazia e fecha a bolsa. Ela se levanta devagar, mas não foge da última conversa.'
 ],
 laisla:[
  'Laisla faz menção de chamar a atendente para pedir outra cobertura, mas percebe a seriedade da sua pergunta. Ela apoia os braços na mesa e presta atenção.',
  'Do balcão chega o som de gente rindo. Laisla olha para lá com uma saudade inesperada e então volta ao assunto, recusando transformar tudo em mais uma lembrança do ataque.',
  'Laisla afasta uma mecha de cabelo do rosto. A voz dela fica mais firme, não por irritação, mas porque sabe exatamente o que quer dizer.',
  'Laisla pega os copos vazios e os reúne no meio da mesa. Antes de se levantar, procura seu rosto para ter certeza de que você a entendeu.'
 ],
 rauanny:[
  'Rauanny para de bater a colher no copo e a coloca sobre o guardanapo molhado. A resposta começa direta, mas sua voz perde um pouco da dureza habitual.',
  'Rauanny olha para a porta da sorveteria, como se precisasse decidir entre sair andando ou ficar para uma conversa difícil. Ela escolhe ficar.',
  'Rauanny cruza os braços, descruza e se inclina para a mesa. Desta vez, em vez de interromper, escuta sua opinião inteira.',
  'Rauanny termina o resto do sorvete numa colherada só e faz uma careta pelo frio. O gesto quebra a tensão antes da última resposta.'
 ]
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
N('k9_mem_moises','MIRANTE · VELA DE MOISÉS','16:35','lake',`A próxima vela é a de Moisés. Bella olha para a chama antes de falar.

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
N('k9_ice_01','SORVETERIA · CENTRO','17:12','town',`O sino da sorveteria toca quando vocês entram. A atendente reconhece alguns rostos dos noticiários, vê os curativos e, por delicadeza, não faz perguntas.

Duas crianças discutem por uma casquinha na mesa ao lado. O liquidificador faz um barulho alto demais e alguém reclama do preço da cobertura. São sons de um dia comum que quase parecem estranhos depois de tantas semanas.

Vocês se acomodam. Algumas conversas começam tímidas; outras nascem de uma lembrança sobre quem faltou ao memorial. Por um momento, a tarde não exige que ninguém resolva o mistério.

Depois de conversarem juntos, você poderá procurar duas pessoas para uma conversa particular.`,[G('k9_ice_choose','Escolher com quem conversar')]);
N('k9_ice_choose','SORVETERIA · CONVERSAS','17:18','town',`O barulho do liquidificador termina. As mesas ficam mais quietas. Ainda existe tempo para conversar com alguém sem precisar falar de assassinos a cada frase.

Algumas amizades carregam desentendimentos recentes. Outras podem estar mais fortes depois de tudo o que enfrentaram. As pessoas não vão esquecer o que você disse no hospital.`,[]);
// Cada conversa tem quatro escolhas: três assuntos encadeados e uma despedida.
// O texto da escolha anterior aparece na cena seguinte como diálogo efetivo.
for(const id of IDS){
 const x=ICE[id],where='SORVETERIA · CONVERSA COM '+L[id].toUpperCase();
 N('k9_ice_'+id+'_1',where,'17:22','town',`Você se aproxima de ${L[id]}.\n\n${x.open}`,
  x.beats[0].map((b,i)=>C(b[0],'k9_ice_'+id+'_2',[B(id,i===2?2:3),S('ice_'+id+'_a',i)])));
 for(let stage=2;stage<=4;stage++){
  const step='k9_ice_'+id+'_'+stage;
  const nxt='k9_ice_'+id+'_'+(stage+1);
  const prompts=stage===4?x.end:x.beats[stage-1];
  const key=stage===4?'bye':stage===2?'b':'c';
  N(step,where,stage===2?'17:25':stage===3?'17:28':'17:32','town','',
   prompts.map((b,i)=>C(b[0],nxt,[B(id,stage===4?2:stage===3?3:2),S('ice_'+id+'_'+key,i),...(stage===4?[F('chat_done_'+id)]:[])])));
 }
 N('k9_ice_'+id+'_5','SORVETERIA · DESPEDIDA DE '+L[id].toUpperCase(),'17:35','town','',[G('k9_ice_choose','Voltar e escolher outra pessoa')]);
}
N('k9_ice_group','SORVETERIA · MESA CENTRAL','17:46','town',`Você volta à mesa central. Alguns copos já estão vazios; os guardanapos úmidos se acumulam sobre os pires.

Uma caminhonete de som atravessa lentamente a avenida. O anúncio do aniversário de Lakewood invade a sorveteria com música alta e voz de locutor.

LOCUTOR: — Hoje Lakewood comemora mais um aniversário! Programação na praça, apresentações e uma homenagem especial às vítimas recentes. Parte da arrecadação será destinada às famílias.

Na mesa, o anúncio provoca uma discussão sobre a festa e o respeito pelas pessoas que morreram.`,[G('k9_party_announce','Ouvir o que Laisla tem a dizer')]);
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
 C('Visitar o mural e ouvir os discursos','k9_city_memorial',[F('mural_visitado')]),
 C('Procurar o interesse romântico ou outro amigo na praça','k9_city_meet',[F('busca_amigos')])]);
N('k9_city_memorial','ANIVERSÁRIO · O MURAL','19:49','town',`As flores foram colocadas diante de fotografias diferentes. Uma mulher de meia-idade segura um papel dobrado e tenta começar seu discurso duas vezes. Quando consegue, não fala da tragédia. Conta como o filho insistia em cantar errado todas as músicas do carro.

Você se aproxima do mural em silêncio. Um voluntário entrega uma caneta para quem quiser deixar uma mensagem. Uma criança pergunta à mãe por que algumas fotografias têm fitas pretas. A resposta é baixinha, mas suficiente para você ouvir.

VOLUNTÁRIA: — Não precisa escrever bonito. Às vezes só o nome da pessoa já diz muita coisa.

Você encontra um espaço vazio ao lado das flores.`,[
 C('Escrever uma lembrança para as famílias','k9_city_social',[F('mural_mensagem'),['trait','empatia',1]]),
 C('Ouvir o restante do discurso em silêncio','k9_city_social',[F('mural_escutou')]),
 C('Conversar com a voluntária sobre a homenagem','k9_city_social',[F('mural_conversou')])]);
N('k9_city_meet','ANIVERSÁRIO · ENTRE AS BARRACAS','19:51','town',`Você atravessa a praça procurando um rosto conhecido. Não é fácil encontrar alguém no meio de crianças com balões, gente carregando copos e uma banda afinando instrumentos. Uma mensagem enviada ao grupo ajuda você a descobrir quem está perto das barracas.

A música continua, mas agora você consegue distinguir a voz de alguém chamando pelo seu nome.`,[
 C('Pedir companhia para caminhar pela praça','k9_city_social',[F('cidade_caminhou_junto')]),
 C('Perguntar como o amigo está lidando com a noite','k9_city_social',[F('cidade_conversou_amigo')]),
 C('Comprar alguma coisa e dividir com o amigo','k9_city_social',[F('cidade_dividiu_lanche')])]);
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
 C('Ajudar a organizar a música e as bebidas','k9_house_help',[F('ajudou_casa'),B('laisla',3)]),
 C('Procurar alguém para conversar numa varanda menos barulhenta','k9_house_balcony',[F('varanda_calma')]),
 C('Participar de uma brincadeira com os convidados','k9_house_game_intro',[F('brincadeira_festa')])]);
N('k9_house_help','CASA DO LAGO · PREPARATIVOS','19:47','party',`Você vai até a mesa em que a caixa de som foi deixada ao lado de um emaranhado de cabos. Uma convidada está tentando ligar o equipamento na tomada errada. Você se agacha, reorganiza o fio e afasta copos da régua de energia.

CONVIDADA: — Graças a Deus! Eu já ia botar música pelo celular e fingir que era DJ.

Você encontra a caixa de gelo e ajuda a dividir os refrigerantes, enquanto a anfitriã confere se a passagem para o corredor não está bloqueada. Por alguns minutos, organizar uma festa parece o maior problema do mundo.`,[
 C('Escolher uma música animada e chamar o pessoal para dançar','k9_house_social',[F('casa_musica_animada')]),
 C('Ajudar a afastar os copos dos equipamentos e liberar as saídas','k9_house_social',[F('casa_organizou_seguro'),F('casa_saidas')])]);
N('k9_house_balcony','CASA DO LAGO · AR FRESCO','19:47','party',`A varanda é iluminada só pelas luzes coloridas vindas da sala. Você se afasta da caixa de som e encontra alguém apoiado no corrimão, observando o movimento do lago.

Você: — Posso ficar aqui um pouco?

A pessoa afasta o casaco da cadeira para abrir espaço. A música chega abafada. Pela primeira vez desde o memorial, é possível conversar sem elevar a voz.`,[
 C('Perguntar o que a pessoa gostaria de fazer depois de tudo isso','k9_house_social',[F('varanda_sonhos')]),
 C('Admitir que a festa dá um pouco de medo','k9_house_social',[F('varanda_medo')]),
 C('Fazer uma piada sobre fugir do barulho','k9_house_social',[F('varanda_piada')])]);
N('k9_house_game_intro','CASA DO LAGO · A BRINCADEIRA','19:46','party',`Perto da piscina, três convidados fizeram uma roda em torno de uma tigela com papeizinhos. A regra é simples: cada pessoa sorteia uma tarefa inocente; quem não quiser cumpri-la conta uma história constrangedora.

CONVIDADA: — Ô, você aí! Vai ficar só olhando? Chega aqui!

Você entra na roda. Uma das pessoas improvisa um microfone com uma colher de plástico. Outra protesta porque o desafio anterior foi muito fácil.

Você: — Isso aqui é uma festa ou uma armadilha pra passar vergonha?

CONVIDADO: — Os dois, provavelmente. Sua vez!

Você retira um papel da tigela. A turma espera sua reação.`,[
 C('Imitar um famoso e fazer todo mundo adivinhar','k9_house_game_round',[S('brincadeira_tipo','imitacao'),B('laisla',1)]),
 C('Desafiar alguém para uma batalha de dança','k9_house_game_round',[S('brincadeira_tipo','danca')]),
 C('Contar uma história engraçada do grupo','k9_house_game_round',[S('brincadeira_tipo','historia'),['trait','empatia',1]])]);
N('k9_house_game_round','CASA DO LAGO · A RODA AUMENTA','19:50','party',`A brincadeira deixa de ser só uma ideia. As pessoas se aproximam, abrem espaço e esperam a sua apresentação. Um amigo cobre o rosto de vergonha alheia; outro começa a rir antes mesmo de você terminar.

A festa tem alguns minutos de alegria real. Você quase esquece o quanto isso parecia impossível no começo da tarde.`,[
 C('Convidar outra pessoa a entrar na brincadeira','k9_house_game_payoff',[F('brincadeira_incluiu')]),
 C('Fazer uma segunda rodada para arrancar mais risadas','k9_house_game_payoff',[F('brincadeira_repetiu')]),
 C('Encerrar a brincadeira enquanto todo mundo está rindo','k9_house_game_payoff',[F('brincadeira_encerrou')])]);
N('k9_house_game_payoff','CASA DO LAGO · DEPOIS DA RISADA','19:53','party',`A roda se desfaz aos poucos. Alguém ainda repete sua imitação ou um passo de dança desastroso perto da porta. Uma pessoa levanta o copo e brinda à primeira noite em que conseguiu rir sem culpa.

Você: — Da próxima vez, vocês vão escolher desafios menos humilhantes.

CONVIDADA: — Mentira. Da próxima vez vai ser pior!

Você sai da roda com as bochechas quentes e um sorriso que não precisa forçar. Agora pode procurar seus amigos pela casa.`,[G('k9_house_social','Voltar para perto dos amigos')]);
N('k9_house_future','CASA DO LAGO · PLANOS PEQUENOS','20:01','party',`Você pega um refrigerante, senta na borda da varanda e pergunta a alguém do grupo o que faria se amanhã não houvesse telefonemas anônimos ou notícias ruins.

A pergunta provoca um silêncio diferente: não de medo, mas de quem esqueceu como se planeja alguma coisa boa.`,[
 C('Falar de uma viagem com o grupo','k9_house_evening',[F('futuro_viagem')]),
 C('Confessar que só deseja passar um dia normal com alguém','k9_house_evening',[F('futuro_paz')]),
 C('Perguntar quais sonhos o amigo deixou de lado','k9_house_evening',[F('futuro_sonho')])]);
N('k9_house_flirt','CASA DO LAGO · UM LUGAR CALMO','20:02','party',`Você se afasta por alguns minutos da música e procura alguém com quem tenha intimidade suficiente para falar sem fingir tranquilidade. O reflexo das luzes coloridas alcança o vidro da varanda. Do outro lado da porta, a festa continua.

Você: — Posso roubar uns minutos seus?

Uma resposta vem acompanhada de um sorriso cansado.`,[
 C('Convidar para dançar longe do centro da festa','k9_house_evening',[F('festa_dancou_junto')]),
 C('Conversar sobre o medo de perder mais alguém','k9_house_evening',[F('festa_conversa_intima')]),
 C('Ficar lado a lado e aproveitar o silêncio','k9_house_evening',[F('festa_momento_calmo')])]);
N('k9_house_social','CASA DO LAGO · VARANDA','19:54','party',`A música muda para uma canção conhecida e duas pessoas começam a discutir qual versão é melhor. Na varanda, o ar é mais fresco e o lago parece apenas um reflexo distante entre as árvores.

Ryan pode inventar uma competição boba perto da piscina. Allan, se presente, tenta convencer Samuel a não levar tudo tão a sério. Breno escolhe uma cadeira com visão da porta. Rauanny ajuda Laisla com uma caixa de som.

Você vê, por instantes, o grupo se comportar como antes da ameaça. Não como se tivessem esquecido os mortos, mas porque estar vivo exige alguns minutos sem falar deles.

Alguém pergunta se a cidade já começou a homenagem no palco. Um convidado mostra um vídeo da apresentação que acabou de acontecer.`,[
 C('Compartilhar com um amigo a informação de Bella','k9_house_doubt',[F('suspeita_compartilhada')]),
 C('Conversar sobre os planos para depois do fim dessa história','k9_house_future',[F('planos_festa')]),
 C('Buscar um momento reservado com alguém querido','k9_house_flirt',[F('carinho_festa')])]);
N('k9_house_doubt','CASA DO LAGO · JARDIM','20:00','party',`Você procura quem está na festa para conversar reservadamente sobre o registro mostrado por Bella.

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

Você corre até a cadeira, parando quando percebe que alguém deixou uma fita atravessando parte do apoio. Não há explosivo à vista, mas você não vai puxar uma estrutura desconhecida sem verificar.

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
// Reações roteirizadas: a opção escolhida vira uma ação/fala ANTES da próxima cena.
// Guardadas no slot (não nos nós) para preservar a compatibilidade de saves existentes.
const CHOICE_BEATS={
 k9_mem_hero:[
  'Você segura a flor contra o peito.\n\nVocê: — Eu só queria que vocês soubessem que ninguém aqui foi resumido à forma como morreu. A gente conheceu as risadas, as manias, as mensagens idiotas. Eu vou levar isso comigo.\n\nBella baixa a cabeça; outra pessoa toca seu ombro antes de você voltar à mesa.',
  'Você conta uma lembrança de uma tarde em que todos discutiram por uma bobagem e acabaram rindo juntos. No começo sua voz treme. Depois alguém ri baixinho ao reconhecer a história.\n\nVocê: — Era só mais um dia. Eu daria tudo por outro dia assim.',
  'Você escolhe não discursar. Deposita a flor ao lado de uma fotografia e segura por alguns segundos a mão de quem está mais perto. A pessoa aperta seus dedos de volta. O silêncio é compartilhado, não vazio.'
 ],
 k9_party_announce:[
  'Você: — Lai, eu não acho errado você querer uma festa. Você quase perdeu tudo naquele apartamento. Se dançar hoje te fizer bem, você tem direito.\n\nLaisla: — Obrigada. Eu precisava que alguém entendesse que eu não tô rindo de quem morreu.\n\nRauanny respira fundo e não insiste em interrompê-la.',
  'Você: — A Lai tem direito de escolher, mas vocês também têm razão sobre o risco. Uma casa cheia de desconhecidos assusta depois do que aconteceu.\n\nSamuel: — É isso. Não quero brigar, só não quero outra ligação do hospital.\n\nLaisla cruza os braços, mas escuta.',
  'Você: — Então a gente combina regras: saídas desimpedidas, alguém de olho nos convites, localização compartilhada. E ninguém vai ser obrigado a ir.\n\nRauanny: — Se fizerem isso de verdade, eu ajudo.\n\nLaisla: — Tá. Mas você não vai virar minha fiscal de diversão, hein?'
 ],
 k9_anna_flashback:[
  'Bella: — Ju, por que você tá tão magoada com a Anna?\n\nJullia: — Porque eu contei uma coisa que nem pra você eu tinha coragem de dizer. Aí ela usou isso numa conversa qualquer. Eu me senti uma idiota.\n\nBella deixa de procurar uma solução rápida; pela primeira vez entende o tamanho da confiança quebrada.',
  'Bella senta ao lado da irmã e não faz outra pergunta. Passam alguns minutos ouvindo o relógio da cozinha.\n\nJullia: — Você não vai me dar um conselho?\n\nBella: — Hoje não. Hoje eu vou ficar.\n\nJullia encosta o ombro no dela.',
  'Bella pega um garfo como se fosse um microfone.\n\nBella: — Senhora Jullia Gomes, o tribunal do bolo decreta que pessoas traidoras não terão direito à cobertura!\n\nJullia tenta segurar o riso.\n\nJullia: — Você é muito ridícula.\n\nBella: — Mas funcionou.'
 ],
 k9_bella_meet:[
  'Você: — Qual é o documento, Bella? Não adianta me dar um nome sem explicar a origem da diferença.\n\nBella coloca lado a lado a anotação de acesso e a mensagem arquivada, marcando os horários com a unha.\n\nBella: — Aqui tem um registro de passagem. Aqui tem a versão que a gente ouviu. Não tem identificação da pessoa na passagem, entende?',
  'Você: — E se não for mentira? A pessoa pode ter confundido o dia ou emprestado o carro.\n\nBella: — Pode. Por isso eu não fui falar disso na frente da sorveteria inteira. A gente precisa conferir o contexto, não caçar culpado.',
  'Você: — Mesmo que eu esteja desconfiado, não vou sair apontando o dedo pra um amigo sem prova.\n\nBella: — Obrigada. Eu fiz isso uma vez com o Moisés. Sei quanto tempo leva pra desfazer o estrago, quando dá pra desfazer.'
 ],
 k9_bella_evidence:[
  'Você: — Eu conheço essa pessoa. Uma hora num papel não apaga tudo que passamos juntos.\n\nBella: — Eu não quero que apague. Só quero entender a divergência.\n\nVocê fecha o envelope sem arrancar a página que incomoda.',
  'Você: — Vou conversar com %SUSPECT%. Sem ameaça, sem plateia. Só quero ouvir a versão completa.\n\nBella: — Então começa perguntando por que a pessoa estava perto daquela região. E escuta a resposta toda.',
  'Você: — Vou guardar isso até termos outra pista. Se eu acusar alguém agora, talvez nunca mais a gente consiga se olhar.\n\nBella: — Eu guardo os originais. Você guarda a cabeça no lugar. Combinado?'
 ],
 k9_love_message:[
  'Você digita antes de perder a coragem: «Pode vir. Eu queria te ver também.»\n\n%LOVER% responde com um coração discreto e: «Tô saindo. Prometo não demorar».',
  'Você: «Quero te ver. Só acho melhor encontrar a gente lá, com o pessoal.»\n\n%LOVER%: «Fechado. Eu mando a localização quando chegar. E fico te esperando».',
  'Você: «Gosto muito de você, mas hoje preciso me arrumar e ficar sozinho um pouquinho. Não é por sua causa.»\n\n%LOVER%: «Eu entendo. Obrigado por falar comigo em vez de sumir. Se precisar, tô aqui».'
 ],
 k9_love_visit:[
  'Você: — Você tá lind%LOVER_ADJ%. Sério.\n\n%LOVER% olha para a sua boca e sorri antes de encurtar a distância. Vocês se beijam com cuidado, ouvindo a música distante da rua.',
  'Você segura a mão de %LOVER%.\n\nVocê: — Olha quem resolveu chegar! Eu já tava pensando em cobrar taxa de atraso.\n\n%LOVER%: — Nossa, desculpa, excelência. Da próxima vez eu marco consulta.\n\nO riso dos dois deixa o abraço mais demorado.',
  'Você: — Como você tá de verdade? Se hoje for demais, não precisa fingir por mim.\n\n%LOVER% suspira e finalmente admite que dormir sozinho depois dos ataques tem sido difícil. Você escuta sem tentar resolver tudo.'
 ],
 k9_love_intimate:[
  'Você: — Eu senti saudade de você mesmo com a gente se falando todo dia.\n\n%LOVER% ri baixinho: — Também. Parece idiota, mas é verdade.\n\nO beijo seguinte é mais seguro, com a mão de %LOVER% encontrando a sua.',
  'Você abraça %LOVER% e não puxa conversa para preencher o silêncio. A respiração vai desacelerando até que %LOVER% apoia a cabeça no seu ombro.\n\n%LOVER%: — Posso ficar assim só mais um minuto?\n\nVocê: — Pode ficar dois.',
  'Você abre no celular os dois convites.\n\nVocê: — Qual deles seria menos cansativo pra você?\n\n%LOVER% pensa por um momento, diz que gosta da ideia de estarem juntos e promete respeitar a escolha final, mesmo se forem separados pelo programa da noite.'
 ],
 k9_city_memorial:[
  'Você escreve um acontecimento simples no papel e o deixa ao lado das flores. Uma senhora lê só a primeira linha e agradece com um movimento de cabeça. A lembrança ficará com a família.',
  'Você fica ao lado do mural até o fim do discurso. Quando a voz da mulher falha, ninguém a apressa. Ao terminar, parte da multidão aplaude baixo, com respeito.',
  'Você: — Vocês conseguiram falar com todas as famílias?\n\nVOLUNTÁRIA: — Com quase todas. Algumas pediram para não expor fotografias e a gente respeitou.\n\nVocê agradece por ela ter lembrado que homenagem também é saber quando ficar em silêncio.'
 ],
 k9_city_meet:[
  'Você: — Me acompanha um pouco? Não queria ficar rodando essa praça sozinho.\n\n%FRIEND%: — Claro. Vem, vamos sair desse aperto perto do palco.\n\nVocês caminham entre as barraquinhas comparando qual comida vale o preço absurdo.',
  'Você: — Você tá aguentando ficar aqui? Pode falar, não precisa bancar que tá ótimo.\n\n%FRIEND%: — Tem hora que eu tô bem. Aí olho pras fotos e parece que o chão some. Mas conversar ajuda.',
  'Você aparece com dois copos de suco e oferece um a %FRIEND%.\n\n%FRIEND%: — Você comprou o sabor que eu gosto? Como assim ainda lembra disso?\n\nVocê: — Eu lembro de bastante coisa.\n\nPor alguns passos, o barulho do palco fica mais leve.'
 ],
 k9_city_doubt:[
  'Você: — Por favor, fica entre a gente. Bella não mostrou nada que prove um crime.\n\nO amigo mais próximo guarda o telefone no bolso.\n\n%FRIEND%: — Pode deixar. A gente não precisa de mais uma fofoca destruindo o grupo.',
  'Você: — Vamos organizar datas e pedir documentos antes de apontar alguém. Se tiver contradição, a gente pergunta.\n\n%FRIEND%: — Isso eu topo. Mas guarda cópia de tudo, tá?'
 ],
 k9_house_help:[
  'Você pega o celular e escolhe uma batida conhecida. A música cresce pela caixa de som.\n\nVocê: — Tá proibido ficar encostado na parede essa música inteira!\n\nDuas pessoas vêm para a sala e começam a dançar sem muita coordenação.',
  'Você afasta copos e gelo dos fios, prende a extensão atrás de uma mesa e deixa um corredor livre até a porta lateral.\n\nCONVIDADA: — Tá, isso foi muito mais útil que a minha ideia de esconder o fio debaixo do tapete.\n\nVocê: — De preferência ninguém morre eletrocutado numa festa.'
 ],
 k9_house_balcony:[
  'Você: — Quando a gente sair dessa, você ainda vai querer fazer o que planejava antes?\n\n%FRIEND% observa as luzes da piscina e admite que abandonou vários planos por medo. Promete tentar retomar um de cada vez.',
  'Você: — Eu queria curtir isso, mas fico procurando perigo em todo canto.\n\n%FRIEND%: — Eu também. Quando alguém fecha a porta, olho na hora. Talvez a gente leve tempo pra desaprender.',
  'Você: — Se a música aumentar mais um pouquinho, eu vou morar nessa varanda.\n\n%FRIEND% solta uma risada: — Reserva um quarto pra mim. Mas longe da caixa de som.'
 ],
 k9_house_game_round:[
  'Você chama %FRIEND% para o centro da roda.\n\nVocê: — Não vale rir de mim sem passar vergonha também!\n\n%FRIEND% protesta, mas aceita participar. A roda abre espaço e uma nova salva de palmas cobre a música.',
  'Você: — Mais uma rodada. Quero ver se vocês têm coragem de me desafiar de novo!\n\nCONVIDADO: — Falou a pessoa que quase derrubou o copo fazendo a última!\n\nA gargalhada volta, e a disputa ganha mais um minuto.',
  'Você ergue as mãos e dá um passo para fora.\n\nVocê: — Eu me aposento invicto. Sem comentários.\n\nCONVIDADA: — Invicto na vergonha, né?\n\nVocês riem juntos e a roda começa a se dispersar.'
 ],
 k9_house_future:[
  'Você: — A gente podia fazer uma viagem qualquer dia, sem roteiro de fuga, sem ligar pra saber quem sumiu. Só mala, estrada e música ruim.\n\n%FRIEND%: — Se você prometer não escolher a playlist sozinho, eu topo.',
  'Você: — Não preciso de nada incrível. Queria só acordar, comer alguma coisa e passar a tarde sem esperar uma notícia horrível.\n\n%FRIEND%: — Parece o melhor programa que eu ouvi nos últimos meses.',
  'Você: — E você? O que ficou pra trás enquanto tudo isso acontecia?\n\n%FRIEND% hesita, então começa a contar um plano antigo que quase tinha vergonha de ainda querer realizar. Você ouve até o fim.'
 ],
 k9_house_flirt:[
  'Você estende a mão.\n\nVocê: — Não precisa ir pro meio da pista. Só dança comigo aqui.\n\n%FRIEND% sorri e acompanha o ritmo mais lento. Vocês se aproximam sem pressa, enquanto as luzes da sala passam pelo vidro.',
  'Você: — Eu tenho medo de te perder. Não tô falando isso pra estragar a noite.\n\n%FRIEND%: — Eu também tenho medo. Mas tô aqui, agora. Pode falar comigo quando bater esse desespero.\n\nA resposta não apaga o medo, mas torna mais fácil respirar.',
  'Você encosta o ombro no de %FRIEND%. Não há grandes discursos. O barulho da festa fica distante e os dois permanecem olhando a água por alguns segundos, em paz.'
 ],
 k9_omen:[
  'Você abre o mapa compartilhado, confere a última atualização de cada contato e envia uma captura de tela ao grupo. Um dos marcadores parou de atualizar; você pergunta se a bateria acabou. Ninguém responde imediatamente.',
  'Você liga para o contato que ficou em silêncio. A chamada toca quatro vezes e cai na caixa postal.\n\nVocê: — Atende, por favor. Faz essa gentileza pra mim.\n\nTenta novamente, ouvindo o próprio pulso.',
  'Você envia uma mensagem para cada grupo: «Responde com seu nome e quem tá do seu lado, agora». As confirmações chegam aos poucos. Falta uma pessoa.\n\nVocê: — Não, não, não... Quem viu %HOSTAGE% por último?'
 ],
 k9_missing:[
  'Você volta ao último lugar citado por %HOSTAGE%. Pergunta aos funcionários, verifica corredores sem invadir áreas isoladas e encontra apenas um copo abandonado. A ausência fica mais concreta que qualquer pista.',
  'Você chega ao funcionário responsável pela segurança.\n\nVocê: — %HOSTAGE% sumiu. Tenho foto, roupa e horário da última mensagem. Preciso que registrem isso agora.\n\nO segurança confirma a descrição por rádio e pede que você permaneça acessível.',
  'Você pede um sinal de localização pelo celular e tenta uma chamada de voz. O aparelho não informa a posição atual. A única resposta é o toque contínuo até a ligação cair.'
 ],
 k9_video:[
  'Você: — %HOSTAGE%! OLHA PRA MIM! A GENTE VAI TE TIRAR DAÍ!\n\nA multidão empurra de um lado; você segura uma criança pelo braço para que não seja derrubada e grita pedindo espaço. O telão se apaga antes de qualquer resposta.',
  'Você agarra o braço do técnico antes que ele desligue tudo.\n\nVocê: — Não apaga! Salva uma cópia, por favor! É a única prova que temos de que %HOSTAGE% tá vivo!\n\nO técnico confirma que os arquivos serão preservados e encaminhados à equipe responsável.',
  'Você atravessa os bastidores com um segurança e encontra cabos desconectados perto de um gabinete.\n\nTÉCNICO: — Entraram na transmissão por uma fonte externa. Não vi quem fez isso.\n\nVocê fotografa as conexões sem tocar nos equipamentos.'
 ],
 k9_video_react:[
  'Você liga para o contato da casa.\n\nVocê: — SAI DA PISCINA! TRANCAM AS PORTAS! Tem alguém observando vocês e %HOSTAGE% apareceu amarrado num vídeo!\n\nDo outro lado, a pessoa repete as instruções aos convidados.',
  'Você mostra a imagem a um policial e aponta o acesso do lago.\n\nVocê: — A foto é recente. Não quero que vocês cheguem depois de outra tragédia.\n\nO policial transmite o endereço e solicita reforço, sem prometer um tempo de resposta impossível.',
  'Você amplia a fotografia e reconhece a borda do telhado e a posição da caixa de som.\n\nVocê: — Isso foi tirado de cima. Pode ser perto da lateral da casa.\n\nVocê envia a informação aos amigos sem fingir que sabe quem tirou a foto.'
 ],
 k9_prep_01:[
  'Você compara o ângulo da fotografia com as entradas do terreno e circula duas janelas possíveis.\n\nVocê: — Não sabemos de onde tiraram, mas a porta lateral fica exposta. Evitem passar por ali sozinhos.',
  'Você escreve no grupo: «Se a gente se perder, todo mundo se encontra no portão iluminado, fora da casa. Ninguém volta pra buscar bolsa». Dois amigos confirmam o ponto combinado.',
  'Você pede ao técnico a origem do sinal e registra a identificação disponível do equipamento.\n\nTÉCNICO: — O canal foi invadido. Eu consigo preservar os registros, não apontar uma pessoa.\n\nVocê encaminha os dados à investigação.'
 ],
 k9_prep_02:[
  'Você: — Antes de entrar, olhem a janela da cozinha, a porta da piscina e o acesso da garagem. Quero saber qual abre por dentro.\n\nAlguém responde descrevendo uma fechadura com defeito; você registra isso.',
  'Você cria um grupo de emergência e pede que cada pessoa envie nome, localização e uma saída visível. Uma resposta demora. Você insiste até confirmar quem ainda tem sinal.',
  'Você decide seguir pela estrada sem aguardar todas as confirmações.\n\nVocê: — Avisem a polícia de onde eu tô indo. Não quero perder mais ninguém por esperar demais.\n\nO carro avança; você sabe que chegar antes não significa chegar preparado.'
 ],
 k9_prep_03:[
  'Você: — Esse carro tá bloqueando metade da passagem. Não vou tentar tirar ele agora. Vamos pela lateral e manter distância.\n\nVocê manda a posição para os outros e segue a pé por um trecho de cascalho.',
  'Você fotografa a placa e descreve a posição do veículo no grupo.\n\nVocê: — Entrada principal obstruída. Fiquem longe da garagem até a gente entender o que aconteceu.\n\nUma pessoa acusa recebimento.',
  'Você passa pelo espaço estreito ao lado do carro, prendendo a respiração quando o retrovisor raspa num galho. O risco economiza alguns segundos, mas deixa seu caminho de volta bloqueado.'
 ],
 k9_house_warning:[
  'A pessoa mais próxima da cozinha testa a fechadura sem abrir a porta.\n\n%FRIEND%: — Todo mundo pra sala. Quero ver quem tá faltando antes de a gente sair!\n\nOs convidados se agrupam e alguém afasta uma mesa da passagem.',
  'Você ouve um amigo descrever uma rota pelo jardim e apontar a saída do lado seco da piscina. Dois convidados começam a segui-lo antes de a luz piscar.',
  'Você pede calma e abre espaço na porta externa.\n\nVocê: — Sem empurrar! Deixa a passagem livre! Quem tá com criança, sai primeiro!\n\nUm convidado ajuda a orientar quem ainda não percebeu o perigo.'
 ],
 k9_invasion:[
  'Você aponta para as portas e chama cada amigo pelo nome, exigindo confirmação por voz. Os que respondem se dividem entre cozinha, garagem e jardim. O som da lâmina riscando uma parede obriga todos a se mover.',
  'Você: — PELO JARDIM! UM ATRÁS DO OUTRO! NÃO EMPURRA!\n\nOs amigos se aproximam da porta da piscina. Um convidado tropeça num fio, e o grupo precisa reduzir o passo para não abandoná-lo.',
  'Você corre até a garagem, encontra a alavanca do portão e tenta retirar uma bicicleta que caiu atrás do carro.\n\nUm impacto contra a porta faz você se virar. O agressor ainda está na cozinha; há poucos segundos para preparar a saída.'
 ],
 k9_reunion_luto:[
  'Você pede que cada sobrevivente descreva onde viu os outros pela última vez. O grupo confronta horários e identifica os cômodos ainda sem resposta. O silêncio entre as confirmações é doloroso.',
  'Você se ajoelha ao lado de quem está ferido e improvisa pressão com um pano limpo até a chegada do socorro.\n\nVocê: — Fica comigo. Respira. Você não vai enfrentar isso sozinho.\n\nUm amigo segura a sua mão trêmula.',
  'Você observa o vidro quebrado e fotografa uma marca recente de sola no piso, sem se afastar sozinho da área segura. Você repassa a localização à polícia em vez de perseguir o agressor às cegas.'
 ],
 k9_last_call:[
  'Você reúne os sobreviventes ao redor do telefone e conta o que ouviu: água, madeira e a referência à noite do acidente.\n\nVocê: — Ele quer que eu vá ao deck. Não vou deixar vocês no escuro sobre isso.\n\nUm amigo pede que espere a polícia.',
  'Você liga para Bella e descreve o rangido do deck.\n\nBella: — Tem dois acessos naquela margem. O antigo fica do lado das pedras grandes. Não confunde com a estação. E não vai achar que precisa resolver isso sozinho.\n\nEla manda a posição que conseguiu conferir nas anotações.',
  'Você guarda o telefone e parte antes de reunir todo o grupo, mas envia a um amigo a estrada e o local exato pelo qual pretende entrar.\n\nVocê: — Se eu não responder, passa essa localização pra polícia.\n\nA resposta vem quase imediata: «Não faz isso sozinho».'
 ],
 k9_deck_route:[
  'Você caminha pela trilha alta e mantém o deck à vista entre os troncos. A lanterna revela folhas mexidas recentemente, mas nada que permita reconhecer quem passou. Você desliga a luz ao se aproximar.',
  'Você segue pela margem de serviço, usando as pedras para evitar as tábuas mais ruidosas. Uma onda molha seus tênis; você se agacha ao ouvir passos que talvez sejam apenas galhos batendo.',
  'Você avança pelo acesso principal.\n\nVocê: — EU TÔ AQUI! SE VOCÊ QUERIA QUE EU VIESSE, APARECE!\n\nO eco volta da água. Na ponta do deck, uma cadeira se move.'
 ],
 k9_deck_arrive:[
  'Você ajoelha ao lado de %HOSTAGE%, identifica a fita que prende os pulsos e examina a estrutura antes de puxar.\n\nVocê: — Não se mexe de uma vez. Eu vou tentar soltar sem te machucar mais.\n\n%HOSTAGE% tenta acompanhar suas instruções, respirando com dificuldade.',
  'Você abraça %HOSTAGE% sem tocar nos machucados.\n\nVocê: — Eu achei que não ia te ver de novo.\n\n%HOSTAGE%: — Eu tentei chamar... eu tentei.\n\nVocê segura seus ombros até a respiração da pessoa desacelerar.',
  'Você verifica a sombra das árvores e a passagem pela qual chegou.\n\nVocê: — Tem alguém aqui com a gente?\n\n%HOSTAGE% não responde de imediato. Seus olhos seguem alguma coisa além do seu ombro.'
 ],
 k9_deck_hostage:[
  'Você: — ME ESCUTA! Eu vim como você mandou. Agora solta %HOSTAGE% e a gente conversa sem machucar mais ninguém!\n\nO mascarado inclina a cabeça, mas não se afasta da passagem.',
  'Você dá um passo à frente, protegendo a cadeira com o próprio corpo.\n\nVocê: — Você não vai encostar em %HOSTAGE% de novo.\n\nA figura para por um instante. A lâmina ainda está na mão dela.',
  'Você: — OLHA PRA MIM! Fala dos meus amigos. Fala de quem você matou!\n\nA voz distorcida responde depois de uma pausa: — Você acha mesmo que é o único que perdeu alguém?'
 ],
 k9_deck_face:[
  'Você avança um passo com os punhos fechados.\n\nVocê: — Você transformou nosso medo num espetáculo. Já chega dessa merda!\n\nO mascarado não recua. É você quem percebe que a raiva não torna a lâmina menos perigosa.',
  'Você: — Pensa nas pessoas que morreram. Elas tinham família, amigos, planos. Nada disso traz a Jullia de volta.\n\nA figura inclina a cabeça. Por um segundo, você acha que ouviu uma respiração falhar atrás da máscara.',
  'Você: — Chega de voz alterada e joguinhos. Mostra sua cara. Agora.\n\nA figura aproxima a mão da borda da máscara, como se tivesse esperado a noite inteira para esse pedido.'
 ]
};
const PERSONALITY={
 ryan:{meet:'Eu vim pelo pastel e fiquei pela sua companhia. Péssimo marketing, né?',balcony:'Sério, se eu fizer piada demais, me corta. Às vezes eu nem percebo que tô tentando escapar da conversa.',future:'Um dia eu ainda vou levar vocês num cinema e ninguém vai passar o filme inteiro preocupado com a saída.',flirt:'Eu faço graça pra caramba, mas você sabe quando eu tô falando sério. Tô feliz que você me chamou.'},
 breno:{meet:'Achei que ia me perder nessa multidão. Ainda bem que você veio até aqui.',balcony:'Eu gosto daqui. Sem todo mundo olhando, dá pra falar sem pensar tanto no que vão achar.',future:'Eu tenho saudade de querer coisas pequenas. Sair de casa sem verificar a janela três vezes.',flirt:'Eu sempre demoro pra falar o que sinto. Mas ficar perto de você torna isso um pouco mais fácil.'},
 rayssa:{meet:'Acho que eu precisava de alguém que me enxergasse como amiga, não só como quem trouxe flores.',balcony:'Eu queria conseguir escolher um dia e dizer: esse aqui foi bom, sem nada pra estragar depois.',future:'Eu queria viajar com a Isabella, fazer uma viagem de verdade. Às vezes ainda imagino o roteiro.',flirt:'Eu tenho medo de prometer coisas demais. Só posso dizer que estar com você agora é importante.'},
 rauanny:{meet:'Demorou, hein! Eu já tava pensando em mandar uma mensagem te xingando por não aparecer.',balcony:'Não vou fingir que não tô tensa. Você me conhece. Fico irritada quando tô com medo.',future:'A Lai sempre quer fazer vinte planos de uma vez. Eu queria pelo menos cumprir um com ela.',flirt:'Não começa a rir de mim, tá? Eu não sou boa nessas coisas fofinhas. Mas eu queria ficar aqui com você.'},
 laisla:{meet:'Você viu a fila daquela barraca? Nem em show grande eu passo por isso. Vem, conheço um atalho.',balcony:'Eu fiz todo mundo vir pra tentar lembrar que a gente também sabe se divertir. Tô cansada de ser só a sobrevivente.',future:'Eu ainda quero aquela viagem que vivo falando pra Rau. Nem precisa ser longe, só quero todo mundo na estrada.',flirt:'Eu sempre começo a falar sem parar quando fico nervosa. Hoje não vou nem tentar disfarçar.'},
 allan:{meet:'Eu quase comprei dois refrigerantes sozinho. Você me salvou de virar a notícia: jovem consumiu açúcar demais.',balcony:'Eu faço graça, mas tem coisa que eu não consigo dizer na frente de todo mundo. Obrigado por me chamar.',future:'Eu quero umas férias completamente ridículas. Praia, foto ruim e meus amigos me zoando.',flirt:'Você vai me deixar emocionado, idiota. Eu prometi que hoje não ia borrar a cara chorando.'},
 samuel:{meet:'A segurança tá do outro lado do palco. Já vi duas saídas. Desculpa, eu tô fazendo isso até quando tento descansar.',balcony:'Quando falo de risco, parece que eu tô querendo mandar nos outros. Na real, eu só não quero perder mais ninguém.',future:'Meu plano é terminar aquilo que comecei e não deixar meus amigos carregarem meus problemas.',flirt:'Eu fico tentando organizar tudo, até o que eu sinto. Não sei se dá pra fazer isso com você.'},
 isabella:{meet:'Nossa, eu tava tentando encontrar um lugar que não parecesse uma coletiva de imprensa. Vem comigo.',balcony:'Eu odeio quando a gente tem que fingir que tá bem pra não preocupar os outros. É exaustivo.',future:'Eu queria voltar a trabalhar nos meus desenhos. Não consegui terminar nenhum desde aquela noite.',flirt:'Eu fiquei com receio de vir, mas foi bom. Eu tava precisando de uma conversa sem gente ouvindo.'}
};
function sceneCompanion(s,origin){
 const f=s.flags||{},isCity=/^k9_city/.test(origin),ids=(isCity?f.c9_cidade_pessoas:f.c9_casa_pessoas)||[];
 const afterKidnap=/^k9_(?:house_warning|invasion|house_movement|risk_|reunion|deck_|city_doubt|house_doubt)/.test(origin)&&f.c9_enter_k9_missing;
 const available=ids.filter(x=>L[x]&&!dead(s,x)&&(!afterKidnap||x!==f.c9_refem));const lv=lover(s);
 return (lv&&available.includes(lv)?lv:available.find(x=>x!=='rayssa')||available[0])||null;
}
// V1.3.3 — Elenco reconhecível: toda conversa sobre o grupo tem nomes,
// falas e presença checada (inclusive após mortes e entre eventos separados).
const C9_PERSONALITY={
 allan:{doubt:'Eu não quero que a gente transforme um horário num julgamento. A gente já se machucou demais por falar antes de pensar.',counter:'Mas se alguém mentiu, esconder o assunto também não resolve. A gente conversa com calma, um de cada vez.',comfort:'Ei. Olha pra mim. Você não precisa resolver isso sozinho, tá?',danger:'Não vou largar ninguém aqui! Só me diz qual saída tá livre!'},
 samuel:{doubt:'Qualquer registro pode ter erro. Precisamos conferir origem, data e quem realmente passou por lá.',counter:'Se a versão mudou, eu quero uma explicação. Só isso. Não dá pra fingir que não ouvimos.',comfort:'A gente checa os fatos primeiro. Depois decide o que fazer. Sem correr atrás de boato.',danger:'Confirma a porta! Não corre pra um corredor sem saída!'},
 isabella:{doubt:'Eu tô cansada de ver a gente se acusando. Se for perguntar, pergunta olhando na cara. Não espalha.',counter:'Eu vou ouvir a explicação, mas não vou deixar passar uma contradição só porque gosto da pessoa.',comfort:'Me conta direito. Sem pular partes. Eu tô aqui pra te ouvir.',danger:'ME RESPONDE! Quem tá comigo? Preciso ouvir os nomes!'},
 breno:{doubt:'Eu conheço o que é ser julgado por ficar quieto. Uma anotação não prova o que alguém fez.',counter:'Se a pessoa tava perto de lá, talvez tenha visto alguma coisa. Perguntar com respeito não é acusar.',comfort:'Você pode ficar aqui comigo. Nem precisa falar se não quiser.',danger:'Não toca no painel molhado! Tem outra saída do lado de cá!'},
 ryan:{doubt:'Pera. A gente tá falando de um horário, não de alguém carregando uma faca na foto.',counter:'Só que também não dá pra fazer piada e virar as costas. Tem coisa muito errada acontecendo.',comfort:'Olha, minha piada vai ser péssima agora. Então vou só ficar aqui, beleza?',danger:'Ó, quem quiser sair vivo segue minha voz! E sem usar aquela grade quebrada!'},
 rayssa:{doubt:'Eu sei como uma acusação pode destruir uma amizade. Não quero mais ver a gente se ferindo assim.',counter:'Mas, se tem uma mentira, eu quero entender por que alguém teria medo de contar a verdade.',comfort:'Eu posso te escutar. Mesmo que seja difícil.',danger:'Por favor, saiam da frente do vidro! Vem pra cá!'},
 rauanny:{doubt:'Eu já explodi com gente sem ouvir tudo. Não vou repetir isso só porque tô com medo.',counter:'Agora, se tem coisa escondida, eu vou perguntar. Não gosto de gente me fazendo de idiota.',comfort:'Pode falar. Eu vou tentar não interromper, juro.',danger:'LAI! CADÊ A SAÍDA? Pessoal, não se empurra!'},
 laisla:{doubt:'Olha, meu sonho era passar uma noite sem a gente se acusar. Bella pode ter razão e ainda faltar prova.',counter:'E meu medo é a gente ficar quieto até acontecer outra tragédia. Vamos conferir direito.',comfort:'Vem, senta aqui. Não precisa bancar o forte na minha festa.',danger:'A porta do corredor da cozinha! Eu conheço a casa, me sigam!'}
};
function c9Present(s,where,excluded=[]){const f=s.flags||{};const list=(where==='cidade'?f.c9_cidade_pessoas:f.c9_casa_pessoas)||[];return list.filter(x=>L[x]&&!dead(s,x)&&!excluded.includes(x));}
function c9Pick(s,where,exclude=[],preferred=[]){const options=c9Present(s,where,exclude);return preferred.find(x=>options.includes(x))||options[0]||null;}
function c9Line(x,kind){return x?`${name(x)}: — ${C9_PERSONALITY[x]?.[kind]||'Eu tô aqui. Vamos descobrir com cuidado.'}`:'';}
function c9Dialogue(s,id,text,kid){
 const f=s.flags||{},where=id.startsWith('k9_city')?'cidade':'casa';
 const avoidKid=f.c9_enter_k9_missing?[kid]:[];
 const first=c9Pick(s,where,[...avoidKid,f.c9_suspeito],['allan','isabella','breno','ryan','laisla','samuel','rauanny','rayssa']);
 const second=c9Pick(s,where,[...avoidKid,f.c9_suspeito,first],['rauanny','samuel','laisla','rayssa','isabella','ryan','allan','breno']);
 const suspectName=L[f.c9_suspeito]?name(f.c9_suspeito):'uma pessoa do grupo';
 if(id==='k9_house_doubt'||id==='k9_city_doubt'){
  if(!first){return `Você sai por alguns instantes do barulho da ${where==='cidade'?'praça':'festa'} e abre a fotografia da anotação enviada por Bella. Nenhum dos seus amigos está disponível ali para uma conversa em particular.\n\nVocê grava uma mensagem de voz para Bella.\n\nVocê: — Eu vi os horários, mas não vou sair acusando ${suspectName} sem saber quem usou aquele acesso. Se aparecer outro documento, me avisa.\n\nBella: — É isso que eu queria. Guardar uma dúvida não é ignorar a investigação.\n\nVocê guarda o celular e retorna à ${where==='cidade'?'praça':'casa'}, ainda inquieto.`.replaceAll('\\n','\n');}
  const intro=where==='cidade'?'Você chama '+names([first,second].filter(Boolean))+' para perto de uma barraca mais vazia. O discurso do palco chega baixo, misturado às conversas dos visitantes.':'Você chama '+names([first,second].filter(Boolean))+' até o jardim, longe da porta de vidro e das caixas de som. Os três ficam perto do muro, de onde ainda é possível ver a festa.';
  const own=`Você: — A Bella achou uma divergência entre o registro da estação e o que ${suspectName} contou. Não tem imagem de ninguém cometendo um crime. Só que eu não consigo tirar isso da cabeça.`;
  const a=c9Line(first,'doubt');
  const b=second?c9Line(second,'counter'):'';
  const bridge=second?`${name(first)} olha para ${name(second)}. A conversa esquenta, mas ninguém grita.\n\nVocê: — Então a gente concorda em uma coisa: perguntar não é condenar. Vou conferir com a Bella o documento inteiro antes de falar com ${suspectName}.`.replaceAll('\\n','\n'):`Você: — É disso que eu precisava ouvir. Eu tô com medo de estar procurando um culpado em vez de procurar uma resposta.`;
  const finale=second?`${name(second)}: — Beleza. Mas me avisa o que descobrir. Eu não quero ser o último a saber se alguém está em perigo.\n\n${name(first)}: — E não vai jogar isso no grupo. A gente conversa sem plateia.`.replaceAll('\\n','\n'):`${name(first)}: — Me promete que, se a dúvida piorar, vai conversar antes de acusar.\n\nVocê: — Prometo.`.replaceAll('\\n','\n');
  return `${intro}\n\n${own}\n\n${a}${b?'\n\n'+b:''}\n\n${bridge}\n\n${finale}\n\nVocê volta para perto da música. A suspeita continua sem resposta, mas agora existe um acordo concreto, feito entre pessoas que você conhece.`.replaceAll('\\n','\n');
 }
 if(id==='k9_bella_evidence'){
  text=text.replace('Você pensa em uma pessoa do grupo cuja explicação recente não se encaixa perfeitamente. A lembrança incomoda justamente porque você conhece o jeito dessa pessoa falar.',`Você reconhece a versão de ${suspectName} entre as anotações. A diferença de horário o incomoda porque você conhece ${suspectName} e não quer transformar lembranças em acusações.`);
  text=text.replace('A conversa continua por vários minutos, incluindo as informações que o jogador efetivamente preservou da estação.',`Você: — E se alguém simplesmente confundiu a hora?\n\nBella: — Então a gente descobre. Eu prefiro ouvir a explicação inteira do que perder mais alguém por causa de uma conclusão apressada.\n\nVocê: — Vou guardar o que você me mostrou. Mas não prometo que vou parar de pensar nisso.\n\nBella: — Nem eu.`);
 }
 if(id==='k9_bella_decide'){
  text=text.replace('Defender um amigo naquela ocasião também trouxe consequências. Agora uma suspeita ameaça transformar tudo em outra briga.',`Você lembra da discussão no hospital e olha para o nome de ${suspectName} mais uma vez. Uma suspeita, sem outras provas, ainda não é uma sentença.`);
  text=text.replace('Agora uma suspeita ameaça transformar tudo em outra briga.','Você decide não deixar que a dúvida destrua mais uma amizade antes de haver provas.');
 }
 if(id==='k9_city_arrive'&&!dead(s,'rayssa')&&!c9Present(s,'cidade').includes('rayssa'))text=text.replace('Rayssa está entre elas, ajudando a orientar convidados perto da área das homenagens.','Você observa os voluntários trabalhando perto das homenagens; Rayssa não está nesse setor da praça.');
 if(id==='k9_city_evening'){
  const other=c9Pick(s,'cidade',avoidKid,['ryan','allan','isabella','samuel','rayssa','breno','rauanny','laisla']);
  const last=c9Present(s,'cidade').includes(kid)?kid:other;
  text=text.replace('Algumas pessoas do grupo conversam perto da mesa de bebidas, e outras saem para ver as barracas de comida.',`${other?`${name(other)} caminha ao seu lado até a mesa de bebidas.`:'Você para diante da mesa de bebidas, procurando uma nova apresentação no programa.'}`);
  text=text.replace('Laisla, caso esteja viva, tentando organizar os copos',(!dead(s,'laisla')&&c9Present(s,'casa').includes('laisla'))?'Laisla organizando os copos':(c9Pick(s,'casa',[],['rauanny','allan','ryan'])?name(c9Pick(s,'casa',[],['rauanny','allan','ryan']))+' organizando os copos':'os convidados perto da mesa'));
  text=text.replace('Alguém comenta que precisa ir aos bastidores buscar uma coisa. A frase parece banal. Cinco minutos depois, você vai lembrar dela com uma precisão cruel.',last?`${name(last)} confere uma mensagem e guarda o telefone.\n\n${name(last)}: — Vou ali rapidinho, depois a gente se fala.\n\nVocê: — Beleza. Me avisa se mudar de lugar.\n\nVocê volta a observar o palco, sem imaginar como vai se lembrar dessa conversa mais tarde.`:'Uma voluntária anuncia que a apresentação vai continuar. Você confere o celular para saber se o restante do grupo está bem.');
 }
 if(id==='k9_house_evening'){
  const p=c9Pick(s,'casa',avoidKid,['laisla','rauanny','ryan','allan','breno','isabella','samuel']);
  const other=c9Pick(s,'casa',[...avoidKid,p],['allan','ryan','rauanny','laisla','breno','samuel','isabella']);
  text=text.replace('Uma pessoa sugere uma fotografia do grupo presente. Alguns aceitam; outros ficam fora do enquadramento. Ninguém é obrigado a aparecer no retrato.',p?`${name(p)} tira o celular do bolso.\n\n${name(p)}: — Antes que a gente se espalhe, bora tirar uma foto? Só quem quiser, tá?\n\n${other?`${name(other)}: — Pera, deixa eu ajeitar esse cabelo, pelo amor de Deus!`:`Você: — Vamos, mas sem colocar ninguém que não queira aparecer.`}\n\nVocês se juntam ao lado da piscina para a foto. Quem não quer posar fica fora do enquadramento.`:'Uma convidada pergunta se alguém quer uma foto junto à piscina. Você prefere guardar o celular e observar a luz refletida na água.');
  if(dead(s,'rayssa'))text=text.replace('Rayssa diz que está auxiliando uma família a encontrar os lugares reservados.','Os voluntários do aniversário informam que a homenagem está em andamento.');
 }
 if(id==='k9_omen'){
  text=`O celular vibra com uma resposta que não chega inteira. Você abre as mensagens e procura o último contato de ${name(kid)}. As outras conversas continuam, mas a de ${name(kid)} parou.\n\nVocê: — Estranho... ${name(kid)} sempre responde, nem que seja pra mandar eu parar de encher.\n\n${f.c9_hero_local==='casa'?'O som da festa continua na varanda. Você observa as portas de vidro e lembra dos convidados que foram embora.':'Perto do palco, alguém testa o microfone enquanto você procura rostos conhecidos nas barracas.'}\n\nVocê abre as duas conversas do grupo e decide conferir onde cada um está, com nomes e não só mensagens dizendo «tá tudo bem».`.replaceAll('\\n','\n');
 }
 if(id==='k9_missing'){
  const area=f.c9_refem_local==='casa'?'casa':'cidade';
  const w=c9Pick(s,area,[kid],['laisla','rauanny','allan','ryan','isabella','breno','samuel','rayssa']);
  const secondW=c9Pick(s,area,[kid,w],['samuel','isabella','ryan','allan','rauanny','laisla','rayssa','breno']);
  const hint=w?`${name(w)}: — Eu vi ${name(kid)} há pouco, mas não consigo dizer se ${['rayssa','rauanny','laisla','isabella'].includes(kid)?'ela':'ele'} saiu por aquela porta. Tinha gente demais.`:'Você pergunta aos voluntários se alguém viu '+name(kid)+'. Ninguém consegue confirmar um destino.';
  const other=secondW?`${name(secondW)}: — Espera. Acho que ${name(kid)} olhou o celular e se afastou. Mas eu não vou inventar certeza, eu tava distraído também.`:'';
  text=`A última mensagem de ${name(kid)} continua sem resposta. Você liga. O telefone chama até cair.\n\nVocê: — ${name(kid)}? Atende, por favor... só fala que tá tudo bem.\n\n${f.c9_hero_local===area?'Você procura quem estava por perto.':'Você telefona para o outro evento e pede que procurem sem espalhar pânico.'}\n\n${hint}${other?'\n\n'+other:''}\n\nVocê: — Eu preciso saber onde ${name(kid)} foi visto por último. Não vou aceitar «acho que saiu» como se fosse uma resposta.\n\nO barulho do festival e da festa continua. Cada chamada sem resposta parece durar um minuto inteiro.`.replaceAll('\\n','\n');
 }
 if(id==='k9_house_warning'){
  const p=c9Pick(s,'casa',avoidKid,['laisla','rauanny','samuel','allan','ryan','isabella','breno']);
  if(p)text+=`\n\n${name(p)} apalpa a maçaneta do corredor antes de virar para os convidados.\n\n${c9Line(p,'danger')}\n\nVocê: — ${name(p)}, me diz quais portas ainda abrem por dentro. A gente precisa tirar o pessoal daqui sem empurrar ninguém.`.replaceAll('\\n','\n');
 }
 if(id==='k9_invasion'){
  const p=c9Pick(s,'casa',avoidKid,['laisla','rauanny','ryan','allan','samuel','isabella','breno']);
  const other=c9Pick(s,'casa',[...avoidKid,p],['samuel','allan','ryan','breno','isabella','rauanny','laisla']);
  text=text.replace('Outro amigo corre para trancar a porta do corredor.',other?`${name(other)} atravessa a sala para trancar a porta do corredor, mas para ao escutar um golpe do lado oposto.`:'Você corre até a porta do corredor e tenta segurar a maçaneta enquanto os convidados saem.');
  if(p)text+=`\n\n${name(p)}: — Eu vi a máscara! Não fica perto do vidro!\n\nVocê: — ${name(p).toUpperCase()}! A porta da piscina ainda tá livre?\n\n${name(p)}: — Por enquanto, sim! Mas a gente tem que sair AGORA!`.replaceAll('\\n','\n');
 }
 if(id==='k9_house_movement'){
  const endangered=(f.c9_casa_pessoas||[]).find(x=>x!==kid&&!dead(s,x));
  text=text.replace('Alguém grita por ajuda mais adiante.',endangered?`${name(endangered)} chama por ajuda perto do próximo corredor. Você reconhece a voz imediatamente.`:'Um dos convidados grita por ajuda perto da despensa.');
  if(endangered)text+=`\n\n${name(endangered)}: — EU TÔ AQUI! A PORTA EMPERROU!\n\nVocê: — FALA QUAL CORREDOR, ${name(endangered).toUpperCase()}! A GENTE VAI ENCONTRAR UMA SAÍDA!`.replaceAll('\\n','\n');
 }
 for(let stage=1;stage<=3;stage++){
  const tgt=f['c9_r'+stage+'_target'];
  if(!tgt)continue;
  const helper=c9Pick(s,'casa',[...avoidKid,tgt],['samuel','laisla','ryan','allan','rauanny','isabella','breno']);
  const voice=helper?name(helper):'Você';
  if(id==='k9_risk_'+stage+'_act')text=text.replace('Do outro lado da porta alguém responde com um grito e a maçaneta sacode com força.',helper?`${name(helper)} grita do outro lado, sem enxergar ${name(tgt)}.\n\n${name(helper)}: — ${name(tgt).toUpperCase()}, SE AFASTA DA PORTA! TÔ TENTANDO ABRIR!\n\nA maçaneta sacode com força.`.replaceAll('\\n','\n'):`A maçaneta sacode com força e um dos convidados grita que a porta está presa.`);
  if(id==='k9_risk_'+stage+'_final')text=text.replace('O perseguidor pressiona a passagem',`${name(tgt)} escuta ${helper?name(helper)+' chamar seu nome por trás da porta':'os convidados pedindo socorro no jardim'}. O perseguidor pressiona a passagem`);
  if(id==='k9_risk_'+stage+'_result'&&f['c9_r'+stage+'_result']==='injured')text=text.replace('Um amigo responde pelo celular e o orienta a comprimir o ferimento com um pano limpo.',helper?`${name(helper)} atende pelo celular.\n\n${name(helper)}: — ${name(tgt).toUpperCase()}, FICA COMIGO! Pressiona o corte com uma toalha e me diz onde você tá!\n\n${name(tgt)}: — Eu... eu tô tentando. Não desliga!`.replaceAll('\\n','\n'):'Você atende ao chamado e orienta a comprimir o ferimento com um pano limpo até a chegada do socorro.');
  if(id==='k9_risk_'+stage+'_result'&&f['c9_r'+stage+'_result']==='safe')text=text.replace('Quem ajudou confirma pelo celular.',helper?`${name(helper)} atende.\n\n${name(helper)}: — ${name(tgt).toUpperCase()}! Eu te escutei! Não sai daí sozinho, tô indo te encontrar!`.replaceAll('\\n','\n'):'Você escuta a confirmação pelo celular e orienta a pessoa a encontrar a saída sinalizada.');
 }
 if(id==='k9_reunion'){
  const survivors=c9Present(s,'casa',[kid]);
  const p=survivors[0],other=survivors[1];
  text=text.replace('A voz de alguém falha ao perguntar por um amigo.',p?`${name(p)} tenta falar, mas a voz falha antes de completar uma pergunta sobre ${name(kid)}.`:'Você pergunta em voz alta se alguém viu '+name(kid)+'.');
  if(p)text+=`\n\n${name(p)}: — Quem viu ${name(kid)} por último? Por favor, fala que tem notícia.\n\n${other?name(other)+': — Eu tô aqui. Vamos conferir os quartos, mas ninguém volta sozinho.':'Você: — A gente não vai desistir de procurar. Só não pode entrar sozinho.'}`.replaceAll('\\n','\n');
 }
 if(id==='k9_reunion_luto'&&!(IDS.some(x=>f['c9_morto_'+x]))){
  const p=c9Pick(s,'casa',avoidKid,['ryan','allan','laisla','rauanny','isabella','breno','samuel']);
  text=text.replace('Ryan, se está presente, tenta fazer uma brincadeira para aliviar a tensão, mas ninguém ri por muito tempo.',p?`${name(p)} se aproxima de você, ainda ofegante.\n\n${c9Line(p,'comfort')}\n\nVocê: — Faltou o ${['rayssa','rauanny','laisla','isabella'].includes(kid)?'sinal dela':'sinal dele'}. A gente não pode comemorar ainda.`.replaceAll('\\n','\n'):'Você tenta respirar, mas o silêncio de '+name(kid)+' impede qualquer sensação de vitória.');
 }
 if(id==='k9_reunion_after'){
  const p=c9Pick(s,'casa',avoidKid,['isabella','allan','laisla','rauanny','samuel','ryan','breno']);
  if(p)text+=`\n\nVocê: — ${name(p)}, me conta a última coisa que você viu antes de sair. Sem pular nenhum detalhe.\n\n${name(p)}: — Tinha alguém perto da cozinha. Aí a luz apagou e eu só pensei em achar uma porta. Eu não vi o rosto.\n\nVocê: — Tá. Não precisa inventar nada que não lembra.\n\n${name(p)}: — Eu não vou esquecer essa noite. Nem se eu quiser.`.replaceAll('\\n','\n');
 }

 // Revisão das conversas e do deslocamento: ninguém que está ausente aparece
 // como interlocutor apenas para preencher uma fala narrativa.
 if(id==='k9_house_future'){
  const partner=sceneCompanion(s,id);
  if(partner){
   text=text.replace('pergunta a alguém do grupo o que faria',`pergunta a ${name(partner)} o que faria`);
   text+=`\n\nVocê: — Eu quero te perguntar sem pressa: qual era seu plano pra esse ano, antes dessa confusão toda?\n\n${name(partner)}: — ${C9_PERSONALITY[partner]?.future||'Eu ainda tenho coisas que quero fazer. Só preciso encontrar coragem de voltar a planejar.'}`.replaceAll('\\n','\n');
  }else{
   text='Você encontra a varanda vazia. Senta com um refrigerante, escuta a música e tenta lembrar dos seus próprios planos antes dos ataques. Nem toda pausa precisa ser preenchida por uma conversa inventada.';
  }
 }
 if(id==='k9_house_flirt'){
  const partner=sceneCompanion(s,id);
  if(partner)text=text.replace('Uma resposta vem acompanhada de um sorriso cansado.',`${name(partner)} sorri de leve e afasta uma cadeira para você.\n\n${name(partner)}: — Pode roubar. Mas tem que me prometer que não é mais um interrogatório sobre o lago.`.replaceAll('\\n','\n'));
  else text=text.replace('Uma resposta vem acompanhada de um sorriso cansado.','Você não encontra ninguém conhecido naquele momento. Do lado de dentro, a música volta a ficar animada.');
 }
 if(id==='k9_house_game_payoff'){
  const buddy=sceneCompanion(s,'k9_house_arrive');
  if(buddy)text=text.replace('Alguém ainda repete sua imitação ou um passo de dança desastroso perto da porta. Uma pessoa levanta o copo e brinda à primeira noite em que conseguiu rir sem culpa.',`${name(buddy)} ainda imita o passo de dança que viu na roda.\n\n${name(buddy)}: — Não acredito que você teve coragem de fazer isso. Eu vou lembrar pra sempre!\n\nVocê: — Não se atreve a mostrar o vídeo pra ninguém!\n\n${name(buddy)}: — Sem promessas. Mas foi bom ver você rindo de verdade.\n\nVocê ergue o copo. Por alguns segundos, o medo deixa de ocupar toda a conversa.`.replaceAll('\\n','\n'));
 }
 if(id==='k9_house_help'){
  const host=f.c9_anfitriao;
  if(host&&!dead(s,host))text=text.replace('enquanto a anfitriã confere se a passagem para o corredor não está bloqueada.',`enquanto ${name(host)} confere se a passagem para o corredor não está bloqueada.\n\n${name(host)}: — Valeu mesmo pela ajuda. Eu já tava me embolando com essas caixas.`.replaceAll('\\n','\n'));
 }
 if(id==='k9_missing_search'){
  const area=f.c9_refem_local==='casa'?'casa':'cidade';
  const local=area===f.c9_hero_local;
  const w=c9Pick(s,area,[kid],['rayssa','laisla','isabella','samuel','rauanny','allan','ryan','breno']);
  const place=area==='casa'?'na casa do lago':'perto dos bastidores do aniversário';
  const who=w?`${name(w)}: — Eu vi ${name(kid)} pela última vez ${place}. Não sei quem estava por perto. Eu devia ter prestado mais atenção.`:'Um segurança explica que ainda não conseguiu confirmar a última passagem de '+name(kid)+'.';
  const action=f.c9_busca_imediata?`Você tenta refazer o trajeto de ${name(kid)} sem entrar em áreas trancadas. Não encontra nenhuma pista conclusiva.`:f.c9_seguranca_alertada?'Você entrega à segurança a foto, a roupa e o horário da última mensagem. O responsável avisa os colegas por rádio.':'Você liga novamente e pede a localização compartilhada. O aparelho não confirma nenhuma posição atual.';
  text=`${local?'Você atravessa o movimento da festa, procurando o último local em que alguém viu '+name(kid)+'.':'Você pede, por telefone, que os amigos do outro evento procurem '+name(kid)+' e confirmem cada informação sem adivinhar.'}\n\nVocê: — ${name(kid)} não atende. Eu preciso de uma informação de verdade, não de mais um palpite.\n\n${who}\n\n${action}\n\nAntes de você conseguir fazer outra pergunta, a música do aniversário de Lakewood para de repente. Alguém grita perto do telão. Você olha para a tela ou atende à ligação que chega da praça.`.replaceAll('\\n','\n');
 }
 if(id==='k9_video_react'&&f.c9_hero_local==='casa'){
  const p=c9Pick(s,'casa',[kid],['laisla','rauanny','samuel','allan','ryan','isabella','breno']);
  const other=c9Pick(s,'casa',[kid,p],['allan','ryan','breno','samuel','rauanny','isabella','laisla']);
  if(p){
   text=text.replace('Uma pessoa fecha as portas de vidro e outra procura o responsável pela festa.',`${name(p)} fecha as portas de vidro. ${other?name(other)+' corre para avisar os convidados na cozinha.':'Você afasta os convidados da varanda.'}`);
   text+=`\n\n${name(p)}: — A foto da piscina é de agora! Dá pra ver os copos que eu coloquei na mesa faz dez minutos!\n\nVocê: — Ninguém chega perto das janelas. Me diz quem ainda tá na casa, pelo nome!`.replaceAll('\\n','\n');
  }
 }
 if(id==='k9_prep_01'){
  const p=c9Pick(s,'casa',[kid],['laisla','samuel','rauanny','ryan','allan','breno','isabella']);
  const other=c9Pick(s,'casa',[kid,p],['breno','allan','samuel','rauanny','ryan','isabella','laisla']);
  if(f.c9_hero_local==='casa'){
   text=text.replace('Uma pessoa fecha uma cortina. Outra chama os convidados para longe do vidro.',p?`${name(p)} puxa a cortina. ${other?name(other)+' chama os convidados para longe da varanda.':'Você orienta os convidados a se afastarem do vidro.'}`:'Você puxa uma das cortinas e pede aos convidados que se afastem do vidro.');
  }else if(p){
   text=text.replace('Uma ligação toca. Uma voz familiar informa que uma porta de serviço bateu mesmo sem vento forte, mas não quer causar pânico entre os convidados.',`Você liga para ${name(p)}, que atende no meio da música.\n\n${name(p)}: — Acabou de bater uma porta de serviço aqui. Nem tá ventando. Eu não quero assustar a galera, mas achei melhor avisar.`.replaceAll('\\n','\n'));
   text+=`\n\n${name(p)}: — Eu vou conferir quem tá comigo. Você consegue chamar alguém pra ajudar a gente?\n\nVocê: — Já tô tentando. Não sai sozinho, ${name(p)}.`.replaceAll('\\n','\n');
  }
 }
 if(id==='k9_prep_02'){
  const p=c9Pick(s,'casa',[kid],['samuel','laisla','isabella','ryan','allan','rauanny','breno']);
  if(p)text+=`\n\n${name(p)}: — Tô na casa. Já anotei quem saiu pela garagem e quem ainda tá perto da piscina.\n\nVocê: — Ótimo. Me manda cada nome. Se alguém mudar de lugar, avisa de novo.\n\n${name(p)}: — Combinado. E me fala quando chegar.`.replaceAll('\\n','\n');
 }
 if(id==='k9_reunion_after'){
  const p=c9Pick(s,'casa',[kid],['isabella','allan','laisla','rauanny','samuel','ryan','breno']);
  if(p)text=text.replace('O telefone vibra quando você está tentando ouvir o que um amigo conta.',`O telefone vibra enquanto ${name(p)} descreve o corredor por onde fugiu.`);
 }
 if(id==='k9_city_meet'&&!sceneCompanion(s,id)){
  text='Você procura um rosto conhecido entre as barracas, mas ninguém do seu grupo está disponível aqui. Em vez de inventar companhia, você decide voltar ao palco e ficar perto dos voluntários.';
 }
 return text;
}
function priorAction(s,id,text){const f=s.flags||{};
 if(f.c9_last_act_target!==id||!f.c9_last_act_origin||!Array.isArray(CHOICE_BEATS[f.c9_last_act_origin]))return text;
 const entry=CHOICE_BEATS[f.c9_last_act_origin][Number(f.c9_last_act_index)];
 if(!entry)return text;
 let rendered=entry.replaceAll('%LOVER%',name(lover(s)||'seu contato'))
  .replaceAll('%HOSTAGE%',name(f.c9_refem||'a pessoa sequestrada'))
  .replaceAll('%SUSPECT%',name(f.c9_suspeito||'seu amigo'))
  .replaceAll('%FRIEND%',name(f.c9_last_act_friend||'Seu amigo'))
  .replaceAll('%LOVER_ADJ%', ['rayssa','rauanny'].includes(lover(s))?'a':'o');
 // A discussão da festa também existe sem Laisla: não reproduzir falas de quem morreu.
 if(f.c9_last_act_origin==='k9_party_announce'&&dead(s,'laisla')){
  const i=Number(f.c9_last_act_index),host=sceneCompanion(s,'k9_house_arrive');
  const line=i===0?'Eu acho que a gente pode reunir quem quiser lembrar da Laisla. Mas sem fingir que ela tá aqui.':i===1?'A casa lembra muita coisa. Talvez a homenagem da cidade seja melhor pra quem não aguenta isso agora.':'O importante é respeitar quem quer ir e quem prefere não ir. Ninguém tá errado por sentir diferente.';
  rendered=`Você: — ${line}\n\n${host?name(host)+': — Eu concordo. A gente avisa os parentes e organiza sem pressão.':'Um dos amigos concorda e propõe consultar os parentes antes de tomar qualquer decisão.'}`;
 }
 if(f.c9_last_act_origin==='k9_party_announce'){
  // Mortos não participam nem da reação à escolha do protagonista.
  for(const x of ['samuel','rauanny'])if(dead(s,x)){
   const label=name(x),replacement=alive(s).find(y=>y!=='laisla'&&y!==x);
   rendered=rendered.replace(new RegExp('^'+label+': —[^\n]*','gm'),replacement?name(replacement)+': — É importante que todo mundo seja ouvido, mesmo com medo.':'');
  }
 }
 // Cada personalidade responde de modo próprio, sem apagar a ação escolhida.
 const char=f.c9_last_act_friend;
 const context=f.c9_last_act_origin==='k9_city_meet'?'meet':f.c9_last_act_origin==='k9_house_balcony'?'balcony':f.c9_last_act_origin==='k9_house_future'?'future':f.c9_last_act_origin==='k9_house_flirt'?'flirt':null;
 const additional=context&&PERSONALITY[char]?.[context];
 if(additional&&(!f.c9_enter_k9_missing||char!==f.c9_refem))rendered+=`\n\n${name(char)}: — ${additional}`;
 return rendered+'\n\n'+text;
}
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
function onChoice(s,id,c){if(!id.startsWith('k9_')||!s?.flags)return;
 const f=s.flags;f.c9_last_act_origin=id;f.c9_last_act_target=c.to;f.c9_last_act_label=String(c.originText||c.text||'');
 const all=NODES[id]?.choices||[];
 f.c9_last_act_index=all.findIndex(v=>v.text===f.c9_last_act_label);
 f.c9_last_act_friend=sceneCompanion(s,id);
}
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
  text+='\n\n'+(done.length?'Você já conversou com '+names(done)+'. Pode procurar outra pessoa.':'Você decide com quem quer passar alguns minutos.');
 }
 // Conclusões das escolhas da sorveteria: diálogo específico para o personagem e o assunto escolhido.
 if(id==='k9_ice_01'){
  const snippets=[];
  if(isLive('laisla'))snippets.push('Laisla acena para o grupo escolher uma mesa maior e reclama que nenhuma tem cadeiras suficientes.');
  if(isLive('ryan'))snippets.push('Ryan examina o cardápio e pergunta se alguém já teve coragem de pedir sorvete com cobertura de pimenta.');
  if(isLive('allan'))snippets.push(isLive('samuel')?'Allan decide experimentar uma combinação improvável e insiste para Samuel provar uma colherada.':'Allan decide experimentar uma combinação improvável e desafia quem está à sua volta a provar.');
  if(isLive('samuel'))snippets.push('Samuel demora a fazer o pedido. Ele consulta o cardápio sem realmente ler os sabores.');
  if(isLive('isabella'))snippets.push('Isabella recolhe os cardápios espalhados, ajeita uma cadeira e pede que ninguém comece outra investigação antes do sorvete.');
  if(isLive('rauanny'))snippets.push('Rauanny reclama do calor da loja, mas ocupa um assento perto de onde pode observar os amigos.');
  if(isLive('breno'))snippets.push('Breno procura um lugar menos barulhento, perto da janela, e finalmente deixa a mochila no chão.');
  if(isLive('rayssa'))snippets.push('Rayssa procura o sabor preferido de Isabella no cardápio e sorri de leve para uma lembrança que só as duas conhecem.');
  text+=snippets.length?'\n\n'+snippets.join('\n\n'):'';
  if(dead(s,'allan'))text+='\n\nNa mesa, uma lembrança da mistura de sabores que Allan costumava pedir faz alguém sorrir e depois baixar os olhos.';
  if(dead(s,'laisla'))text+='\n\nUm dos amigos separa espaço para todos. A ausência de Laisla torna a reunião mais silenciosa, mas ninguém age como se ela estivesse na sorveteria.';
 }
 for(const who of IDS){
  const root='k9_ice_'+who+'_';
  if(!id.startsWith(root))continue;
  if(dead(s,who)){text='A cadeira de '+name(who)+' está vazia. Não é possível conversar com alguém que morreu. Você retorna à mesa. ';choices=[G('k9_ice_choose','Voltar à mesa')];break;}
  const x=ICE[who],step=id.slice(root.length);
  if(['2','3','4','5'].includes(step)){
   const prev=step==='2'?'a':step==='3'?'b':step==='4'?'c':'bye';
   const idx=Number(f['c9_ice_'+who+'_'+prev]??0);
   const entries=prev==='bye'?x.end:x.beats[prev==='a'?0:prev==='b'?1:2];
   const chosen=entries[Math.max(0,Math.min(entries.length-1,idx))];
   const intro=ICE_TRANSITIONS[who][Number(step)-2];
   text=`${intro}\n\n${chosen[1]}\n\n${chosen[2]}\n\n${chosen[3]}`;
   if(step==='4'&&who==='samuel'&&dead(s,'allan'))text+='\n\nSamuel observa a cadeira vazia onde Allan costumava sentar. Você percebe que ainda há uma perda sobre a qual ele não consegue falar por muito tempo.';
   if(step==='3'&&who==='rayssa'&&dead(s,'isabella'))text+='\n\nO nome de Isabella faz Rayssa perder o fio da conversa. Ela pede alguns segundos e segura o choro.';
   if(step==='3'&&who==='rauanny'&&dead(s,'laisla'))text+='\n\nRauanny encara o copo e admite, baixinho, que queria contar essa história olhando para Laisla mais uma vez.';
   if(step==='3'&&who==='laisla'&&dead(s,'rauanny'))text+='\n\nLaisla tenta continuar sorrindo, mas a lembrança de Rauanny aperta sua garganta. Ela não finge que a melhor amiga ainda está ali.';
   if(step==='5')choices=[G('k9_ice_choose','Voltar à mesa e procurar outro amigo')];
  }
 }
 if(id==='k9_ice_group'){
  const lines=[];
  if(isLive('isabella'))lines.push('Isabella: — O aniversário da cidade hoje? Eu não sei se tô pronta pra ver tanta gente fingindo que tá tudo normal.');
  if(isLive('samuel'))lines.push('Samuel: — E a prefeitura vai fazer música e discurso no mesmo lugar? Sei lá, me parece estranho.');
  if(isLive('ryan'))lines.push('Ryan: — Mas talvez seja importante pra quem não aguenta ficar em casa olhando pro teto.');
  if(isLive('allan'))lines.push('Allan: — Eu nem sei se quero ir, mas prefiro saber que vocês não vão ficar sozinhos.');
  if(isLive('rauanny'))lines.push('Rauanny: — Eu só queria que todo mundo tivesse o direito de escolher, sem mais uma briga.');
  if(isLive('breno'))lines.push('Breno: — Pra mim uma festa cheia de desconhecidos não parece descanso. Mas ninguém precisa pensar igual.');
  if(isLive('rayssa'))lines.push('Rayssa: — Algumas famílias podem querer essa homenagem. Acho que a gente tem que pensar nelas também.');
  if(isLive('laisla'))lines.push('Laisla escuta até o fim antes de apoiar as mãos na mesa, visivelmente decidida a falar.');
  const lostGroup=IDS.filter(x=>dead(s,x));
  if(lostGroup.length)lines.unshift('Entre uma frase e outra, os amigos mencionam '+names(lostGroup)+'. Não como pessoas sentadas ali, mas como presenças de que todos sentem falta.');
  text+='\n\n'+lines.join('\n\n');
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
 if(f.c8_bella_condicao==='hospital'&&['k9_bella_pov','k9_bella_meet','k9_bella_evidence','k9_bella_decide'].includes(id)){
  scene='phone';location=id==='k9_bella_pov'?'HOSPITAL · QUARTO DE BELLA':'CELULAR · CHAMADA COM BELLA';
  if(id==='k9_bella_pov')text=`PONTO DE VISTA: BELLA GOMES\n\nBella apoia o telefone numa mesa do quarto de observação. A perna ainda dói, e os médicos não a liberaram para ir ao mirante ou caminhar pela praça.\n\nNa tela, uma notícia mostra a preparação do aniversário de Lakewood e uma fotografia antiga de Jullia. Bella toca a imagem da irmã com o polegar.\n\nBella: — Eu sei que não posso sair daqui ainda, Ju. Mas não vou parar de procurar o que aconteceu.\n\nEla fecha os olhos e lembra de uma tarde na cozinha dos Gomes, anos antes.`;
  if(id==='k9_bella_meet')text=`Você liga para Bella. Ela atende por vídeo do hospital, com o rosto cansado e alguns papéis espalhados na mesa.\n\nBella: — Se você perguntar se eu tô bem, vou desligar. Brincadeira. Mais ou menos.\n\nVocê: — Eu queria conversar sobre os registros da estação.\n\nBella aproxima duas anotações da câmera e pede que você preste atenção nas datas.\n\nBella: — Um acesso aparece num horário diferente daquele que a gente ouviu num relato. Mas isso não identifica quem passou por ali, tá? Não quero condenar ninguém com um papel.`;
  if(id==='k9_bella_evidence')text=text.replace('Bella mostra dois registros:','Pela câmera, Bella mostra dois registros:').replace('Bella compara fotografias parciais','Bella mostra fotografias parciais');
  if(id==='k9_bella_decide')text=text.replace('Bella encosta o envelope no seu braço.','Bella aproxima o envelope da câmera e você vê a marcação que ela fez com caneta.');
 }
 if(id==='k9_bella_meet'){const suspected=f.c9_suspeito; if(L[suspected])text+='\n\nBella: — Se você quer mesmo um nome pra conferir, tem '+name(suspected)+'. Mas, pelo amor de Deus, eu não disse que foi essa pessoa. Só quero saber por que o horário que ela mencionou não bate com o registro de movimentação. E nem dá pra garantir que o acesso foi usado por ela.\n\nVocê tenta imaginar '+name(suspected)+' escondendo alguma coisa de todos. É a possibilidade, e não a prova, que te assusta.';}
 if(id==='k9_bella_evidence'){
  if(f.c8_prova==='completa')text+='\n\nBella confere os códigos do original preservado na estação. O documento continua sem nome de destinatário.';
  else if(f.c8_prova==='parcial')text+='\n\nBella compara fotografias parciais com suas próprias anotações. As páginas perdidas não reaparecem.';
  else text+='\n\nComo o envelope se perdeu, Bella compara apenas as datas da biblioteca e o que vocês lembram das mensagens. A hipótese é mais frágil.';
 }
 if(id==='k9_city_doubt'||id==='k9_house_doubt'){const suspected=f.c9_suspeito;const candid=live.filter(x=>x!==suspected&&x!==kid);const cautious=candid.find(x=>['isabella','breno','allan','ryan'].includes(x))||candid[0];const skeptical=candid.find(x=>x!==cautious&&['samuel','rauanny','laisla','rayssa'].includes(x))||candid.find(x=>x!==cautious);if(cautious&&skeptical)text+='\n\n'+name(cautious)+': — Eu sei que você tá pensando em '+name(suspected)+', mas uma data não é um assassinato. Não fala disso na frente de todo mundo.\n\n'+name(skeptical)+': — Tá, mas se alguém mentiu sobre por onde passou, não acha que a gente tem que pelo menos perguntar por quê?';}
 const romantic=lv?name(lv):null;
 if(id==='k9_invites'){
  if(lv)text=text.replace('Seu interesse romântico, caso esteja vivo, envia uma mensagem particular perguntando se pode encontrar você em casa antes de sair.',`${romantic} envia uma mensagem particular perguntando se pode passar na sua casa antes dos eventos.`);
  else text=text.replace('Seu interesse romântico, caso esteja vivo, envia uma mensagem particular perguntando se pode encontrar você em casa antes de sair.','Nenhuma mensagem romântica chega esta noite. Você confere os convites do grupo e se prepara para escolher um dos dois eventos.');
 }
 if(id==='k9_love_message'){
  if(!lv){text='Você observa a tela do celular. Não há mensagem de uma rota romântica ativa e disponível nesta noite. Se você perdeu alguém, ainda existe uma conversa antiga que não teve continuação. A ausência da notificação faz você ficar imóvel por alguns segundos.\n\nO grupo envia os horários dos dois eventos, e você decide como quer passar a noite.';choices=[G('k9_choose_event','Escolher onde passar a noite')];}
  else text+='\n\n'+name(lv)+': — Posso passar na sua casa antes de sair? Queria te ver um pouco. A gente pode ir junto ou se encontrar mais tarde, o que você preferir.';
 }
 if(id==='k9_love_visit'||id==='k9_love_intimate'||id==='k9_love_goodbye'){
  if(lv){text=text.replaceAll('O interesse romântico',name(lv)).replaceAll('o interesse romântico',name(lv)).replaceAll('A pessoa',name(lv)).replaceAll('a pessoa',name(lv));text+='\n\n'+(id==='k9_love_visit'?extra.romance[lv]:id==='k9_love_intimate'?extra.pledge[lv]:name(lv)+': — A gente se fala se precisar mudar os planos. Só... não some sem avisar, tá?');}
  else {text='Você termina de se arrumar sozinho. A roupa escolhida pode ser simples; não existe obrigação de aparecer com ânimo.\n\nUma mensagem do grupo confirma os horários das festas. Você respira fundo antes de sair.';choices=[G('k9_choose_event','Sair de casa')];}
 }
 if(id==='k9_love_brief'&&lv)text+='\n\n'+name(lv)+': — Tudo bem. Obrigado por me avisar. Depois a gente conversa com calma.';
 if(lv&&id==='k9_love_message'){
  text=`Você abre a conversa de ${romantic}. A última mensagem chegou há poucos minutos.\n\n${romantic}: — Eu tô tentando escolher uma roupa faz meia hora e nada parece bom. Posso passar aí antes da gente sair? Nem que seja por uns minutos.\n\nVocê começa a responder, apaga a primeira frase e ri sozinho. Faz tanto tempo que uma pergunta assim não chegava sem uma ameaça depois.`;
 }
 if(lv&&['k9_love_visit','k9_love_intimate','k9_love_goodbye','k9_love_brief'].includes(id)){
  choices=choices.map(c=>({...c,originText:c.text,text:c.text.replaceAll('a pessoa',romantic).replaceAll('A pessoa',romantic)}));
  if(id==='k9_love_visit')text=`A campainha toca quando você termina de se vestir. Ao abrir a porta, encontra ${romantic} segurando o celular e tentando esconder o nervosismo.\n\n${romantic}: — Oi. E antes que você pergunte: sim, eu troquei de roupa três vezes. Não comenta.\n\nVocê: — Entra, idiota.\n\n${romantic} solta uma risada e se aproxima. A primeira coisa que você percebe não é a roupa: é a expressão de alívio ao encontrar você bem.\n\n${extra.romance[lv]}`;
  if(id==='k9_love_intimate'){
   const fl=f.c9_romance_mais_beijos,br=f.c9_romance_brincou,care=f.c9_romance_cuidado;
   text=`A porta fica fechada e o som da rua parece distante. ${romantic} está tão perto que você percebe as pequenas pausas antes de cada frase.\n\n${fl?`O beijo que começaram no corredor continua, com ${romantic} sorrindo quando vocês se separam para respirar.`:br?`Depois da brincadeira sobre o atraso, ${romantic} segura sua mão e aproxima a testa da sua. Vocês trocam um beijo breve e riem sem saber por que ficaram tão nervosos.`:care?`${romantic} fala do medo que tem carregado. Você escuta, acaricia seus dedos e pergunta antes de aproximar o rosto. Um beijo cuidadoso acontece quando os dois querem; não é usado para encerrar o assunto.`:`Vocês trocam um olhar demorado e se aproximam sem pressa.`}\n\n${extra.pledge[lv]}\n\nNão existe namoro oficial entre vocês, mas o carinho não precisa de um rótulo para ser verdadeiro.`;
  }
  if(id==='k9_love_goodbye')text=`Você pega as chaves e confere o celular antes de abrir a porta. ${romantic} ajeita a roupa na entrada e olha para você por mais um segundo.\n\n${romantic}: — Se a gente se separar lá, me manda mensagem. Promete?\n\nVocê: — Prometo. E você também.\n\n${romantic} entrelaça os dedos nos seus e sorri. Não é uma despedida definitiva, só a tentativa de continuar juntos depois de um dia difícil.`;
  if(id==='k9_love_brief')text=`Você termina a mensagem para ${romantic} e observa as bolinhas indicando que está digitando.\n\n${romantic}: — Beleza. A gente se encontra quando der. Só me avisa que chegou bem.\n\nVocê: — Pode deixar. Quero te ver mais tarde também.\n\nA conversa termina com um emoji bobo que faz você sorrir, apesar de tudo. Agora é hora de decidir para onde ir.`;
 }
 if(id==='k9_choose_event'){planParties(s);text+='\n\nNa casa, por enquanto: '+names(f.c9_casa_pessoas)+'. No aniversário da cidade: '+names(f.c9_cidade_pessoas)+'. Bella confirma que vai permanecer acessível mesmo se precisar de cuidados por causa do ferimento.';}
 // Lembranças e interações variam com o elenco VIVO e PRESENTE na rota.
 if(id==='k9_city_meet'){
  const who=sceneCompanion(s,id);
  if(!who)choices=[G('k9_city_social','Voltar para perto do palco')];
  if(who){
   text+=`\n\n${name(who)} reconhece você entre as barracas e levanta o braço para chamar sua atenção.\n\n${name(who)}: — Ei! Pensei que não fosse te encontrar com essa multidão toda. Tá fugindo do discurso ou veio mesmo me procurar?\n\nVocê: — Um pouco dos dois. Mas principalmente vim te ver.`;
   if(lv===who)text+=`\n\n${name(who)} encosta os dedos nos seus, discretamente.\n\n${name(who)}: — Ainda bem. Já tava procurando um jeito de te chamar também.`;
  }else text=`Você procura por amigos entre as barracas, mas os sobreviventes que vieram ao aniversário estão em outro setor ou ocupados com a homenagem. Uma voluntária pergunta se você precisa de água. Você agradece e decide permanecer perto do movimento, em vez de fingir que alguém conhecido está ali.`;
 }
 if(id==='k9_house_balcony'){
  const who=sceneCompanion(s,id);if(!who)choices=[G('k9_house_social','Voltar para perto dos convidados')];if(who){
   text=text.replace('alguém apoiado no corrimão',name(who)+' apoiado no corrimão').replace('A pessoa afasta',name(who)+' afasta');
   text+=`\n\n${name(who)}: — Vem. Aqui dá até pra ouvir o lago quando a música abaixa.\n\nVocê: — Parece que você tá pensando em mil coisas.\n\n${name(who)}: — Tô. Mas agora quero tentar conversar de algo que não seja morte.`;
  }else{text=text.replace('encontra alguém apoiado no corrimão, observando o movimento do lago','encontra duas cadeiras vazias e o reflexo do lago entre as árvores').replace('A pessoa afasta o casaco da cadeira para abrir espaço.','Você afasta uma cadeira e respira com calma.');}
 }
 if(id==='k9_house_future'){
  const who=sceneCompanion(s,id);
  if(!who)choices=[G('k9_house_evening','Continuar a festa')];
  if(who)text+=`\n\n${name(who)}: — Tá. Se for pra falar de futuro, eu posso tentar. Mas escolhe uma pergunta que não tenha resposta triste, por favor.\n\nVocê ri e concorda.`;
  else text+='\n\nUm convidado que ainda não conhecia você se senta por perto e aceita conversar sobre planos para depois do fim do ano.';
 }
 if(id==='k9_house_flirt'){
  const who=sceneCompanion(s,id),lvHere=lover(s)&&who===lover(s);
  if(!who)choices=[G('k9_house_evening','Voltar à festa')];
  if(who){text+=`\n\n${name(who)}: — Pode roubar. Mas se for pra me arrastar pra uma palestra sobre o assassino eu volto pra pista.\n\nVocê: — Prometo que é só pra ficar com você um pouco.`;
   if(lvHere)text+=`\n\n${name(who)} fica mais perto, toca sua mão e baixa a voz.\n\n${name(who)}: — Senti sua falta no meio dessa confusão. E olha que você tava bem aqui.`;
   else text+=`\n\n${name(who)}: — Então fica. Acho que nenhum de nós tá muito a fim de bancar o forte hoje.`;
  }else text='Você sai da pista, mas não encontra um amigo disponível naquele canto. Decide guardar alguns minutos para si mesmo e observa a festa da varanda.';
  if(!lvHere){choices=choices.map(c=>({...c,originText:c.text,text:c.text.replace('Convidar para dançar','Convidar um amigo para dançar').replace('Ficar lado a lado','Ficar na varanda lado a lado')}));}
 }
 if(id==='k9_house_game_round'){
  const who=sceneCompanion(s,'k9_house_arrive'),type=f.c9_brincadeira_tipo;
  if(type==='imitacao')text=`Você ergue a colher de plástico como um microfone e imita o apresentador exagerado do aniversário de Lakewood: sotaque carregado, pose dramática e um anúncio interminável sobre a barraca de cachorro-quente.\n\nCONVIDADA: — GENTE, É IGUALZINHO!\n\nVocê: — Muito obrigado, Lakewood! Próxima atração, a pessoa que vai pagar meu lanche!\n\nAs pessoas caem na risada. ${who?name(who)+' se curva de rir e bate palmas junto.':'Os convidados batem palmas e pedem bis.'}`;
  else if(type==='danca')text=`Você abre espaço na varanda e aponta para ${who?name(who):'uma pessoa da roda'}.\n\nVocê: — Duelo de dança. Sem desculpa, hein!\n\nO adversário aceita com um gesto desafiador. Você arrisca um giro, quase perde o chinelo e consegue recuperar o equilíbrio no último segundo. A outra pessoa improvisa um passo totalmente sem coordenação.\n\nCONVIDADO: — EU DECRETO EMPATE POR FALTA DE TALENTO!\n\nTodos riem e começam a bater palmas no ritmo da música.`;
  else if(type==='historia')text=`Você conta aquela vez em que um passeio do grupo terminou com todo mundo no ônibus errado, discutindo quem tinha dito que conhecia o caminho. Faz uma imitação exagerada das vozes sem dizer que alguém morto está ali para rir com vocês.\n\nVocê: — E a pior parte? A gente desceu exatamente onde tinha começado!\n\n${who?name(who)+': — Você não vai contar a parte em que VOCÊ falou que era a linha certa?':'CONVIDADA: — Não acredito que vocês fizeram isso!'}\n\nVocê: — Isso aí é detalhe técnico!\n\nA roda responde com gargalhadas e o som das palmas cobre a música por alguns segundos.`;
 }
 if(id==='k9_house_game_payoff'&&f.c9_brincadeira_tipo==='danca')text+='\n\nUm convidado ainda repete seu passo de dança perto da piscina. Outro grita que vai exigir uma revanche na próxima festa.';
 if(id==='k9_city_doubt'||id==='k9_house_doubt'){
  const group=(id==='k9_city_doubt'?f.c9_cidade_pessoas:f.c9_casa_pessoas)||[];
  const speakers=group.filter(x=>!dead(s,x)&&x!==f.c9_suspeito).slice(0,2);
  if(speakers.length){
   const one=speakers[0],two=speakers[1];
   text=`Você chama ${names(speakers)} para um lugar onde a música não cubra as palavras.\n\nVocê: — Bella encontrou uma diferença entre um registro de acesso e o que alguém contou. Não tem assinatura, não tem câmera mostrando um crime. Mas eu fiquei pensando nisso.\n\n${name(one)}: — Você fez bem em não soltar isso no grupo inteiro. Uma coisa é desconfiar, outra é acusar.\n\n${two?name(two)+': — Mas também não podemos fingir que ninguém esconde nada. Pelo menos vamos conferir se os horários fazem sentido.':''}\n\nVocê explica que o documento não aponta quem realmente usou o acesso. Ninguém chega a uma conclusão mágica; a conversa termina com o compromisso de procurar evidências reais.`;
  }else text='Você procura um amigo disponível para falar com discrição sobre Bella. Não há ninguém do grupo naquele lugar a quem possa confidenciar a suspeita. Em vez de transformar isso em conversa com um desconhecido, registra suas perguntas para depois.';
 }
 if(id==='k9_city_arrive'&&lv){const inCity=(f.c9_cidade_pessoas||[]).includes(lv);choices=choices.map(c=>({...c,originText:c.text,text:c.text.replace('o interesse romântico ou outro amigo',inCity?name(lv)+' ou outro amigo':'um amigo')}));}
 if(id==='k9_city_arrive'&&!lv){choices=choices.map(c=>({...c,originText:c.text,text:c.text.replace('o interesse romântico ou outro amigo','um amigo')}));}
 if(id==='k9_city_arrive'||id==='k9_city_social'){
  if(dead(s,'rayssa'))text=text.replace(/Rayssa[^\n]*\n?/g,'').replace(/Isabella: — É estranho[^]*?Rayssa: — Não sei\./,'O espaço das homenagens permanece iluminado, mas Isabella não encontra a amiga com quem costumava conversar sobre essas noites.');
  else if(dead(s,'isabella'))text=text.replace(/Isabella: — É estranho[^]*?Rayssa: — Não sei\./,'Rayssa observa o mural de fotografias em silêncio. Uma pessoa pergunta se ela está bem, e ela desvia os olhos antes de responder.');
 }
 if(id==='k9_city_social'){
  const city=(f.c9_cidade_pessoas||[]).filter(x=>!dead(s,x));
  let lines=['Você caminha entre as barracas. Uma criança divide um doce com o irmão enquanto uma cantora retoma uma música suave no palco.'];
  if(city.includes('isabella'))lines.push('Isabella observa a parede das homenagens.\n\nIsabella: — É estranho ver gente sorrindo para fotografias de quem morreu. Eu entendo, mas ainda dói.');
  if(city.includes('rayssa'))lines.push(`Rayssa ajuda uma família a encontrar as cadeiras reservadas. ${city.includes('isabella')?'Quando Isabella se aproxima, as duas se entendem com um olhar cansado.':'Ela para diante de uma fotografia e abaixa os olhos.'}\n\nRayssa: — Espero que isso ajude alguém, pelo menos um pouquinho.`);
  for(const x of city.filter(x=>!['isabella','rayssa'].includes(x)).slice(0,2))lines.push(`${name(x)} surge com um copo de refrigerante e acena para você.\n\n${name(x)}: — Vem. A banda começou de novo. Se a gente for ficar aqui, vamos tentar aproveitar um pouco.`);
  if(!city.length)lines.push('Você não encontra ninguém do grupo naquela área. Os voluntários continuam trabalhando, e você escolhe permanecer por perto para não ficar isolado.');
  lines.push('Perto dos bastidores, dois seguranças discutem a posição de uma porta que deveria estar fechada. Nenhum deles parece perceber que alguém os observa do outro lado da praça.');
  text=lines.join('\n\n');
 }
 if(id==='k9_city_evening'&&dead(s,'laisla'))text=text.replace('e Laisla, caso esteja viva, tentando organizar os copos','e o grupo que organizou a reunião tentando recolher copos');
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
  const where=f.c9_refem_local==='casa'?'casa':'praça';text=`Você percebe que ${name(kid)} não respondeu à última mensagem. ${where==='casa'?'A informação chega por um dos amigos que está na casa de veraneio.':'Entre a multidão do aniversário da cidade, não há sinal de '+name(kid)+'.'}\n\nAntes de desaparecer, ${name(kid)} parecia ${['rayssa','rauanny','laisla','isabella'].includes(kid)?'preocupada':'preocupado'} com alguma coisa. Agora o telefone toca sem resposta. Você pergunta aos outros se alguém viu essa pessoa sair. As respostas não combinam.\n\nSe continuar procurando por muito tempo, talvez perca uma chance de encontrar o caminho do sequestrador. Se agir rápido demais, pode deixar passar um detalhe importante.`;
 }
 if(id==='k9_missing_search')text=text.replace(/Rayssa se aproxima[^]*?com quem o amigo saiu\./,dead(s,'rayssa')?'Ninguém do grupo consegue explicar o desaparecimento. A equipe de segurança começa a consultar os registros disponíveis.':'Rayssa envia uma mensagem dizendo que viu movimento perto dos bastidores, mas não consegue identificar com quem '+name(kid)+' saiu.');
 if(id==='k9_video'){
  text=text.replace('o rosto da pessoa capturada','o rosto de '+name(kid));
  if(f.c9_hero_local==='casa'){
   location='CASA DO LAGO · VÍDEO RECEBIDO';text=`Uma ligação do aniversário de Lakewood chega ao seu celular. Do outro lado, você escuta gritos e alguém dizendo que a apresentação foi interrompida.\n\nUma gravação é enviada para o grupo. ${name(kid)} aparece com os pulsos presos numa cadeira, diante de uma câmera que esconde a maior parte do cenário.\n\nVOZ DISTORCIDA: — Olá, Lakewood. Vieram homenagear os mortos? Que bonitinho.\n\nA figura mascarada toca o ombro do refém.\n\nVOZ DISTORCIDA: — Mas ainda falta gente nessa homenagem.\n\nA gravação termina numa imagem escura da estrada do lago. Você escuta pelo telefone o pânico na praça. Quem está na casa vê o vídeo na tela pequena do aparelho e entende que a festa acabou.`;
  }
 }
 if(id==='k9_video_react'&&f.c9_hero_local==='casa'){
  text=`O vídeo chega ao fim na tela do seu celular. Você ouve a confusão no aniversário pela ligação, mas está na casa do lago, cercado por convidados que começam a perguntar se foi encenação.\n\nVocê: — Não! Essa é ${name(kid)}! Isso não é brincadeira!\n\nUma pessoa fecha as portas de vidro e outra procura o responsável pela festa. Uma nova fotografia chega do número desconhecido: a piscina da casa, tirada de um ângulo elevado.\n\nNa legenda, apenas: «Ainda estão se divertindo?»\n\nVocê olha para o alto da varanda, tentando descobrir de onde podem estar observando vocês.`;
 }
 if(id==='k9_prep_01'&&f.c9_hero_local==='casa'){
  text=`Você mostra a fotografia para os amigos que continuam na casa.\n\nVocê: — Olhem a posição da piscina. Alguém tirou isso de cima e mandou agora. Eu não sei quem, mas não dá pra fingir que estamos seguros.\n\nUma pessoa fecha uma cortina. Outra chama os convidados para longe do vidro. No telefone, um policial registra o endereço enquanto você tenta organizar as rotas disponíveis.\n\nNão existe tempo para checar tudo. Você precisa decidir qual preparação vem primeiro.`;
 }
 if(id==='k9_prep_03'&&f.c9_hero_local==='casa'){
  text=`Do lado de dentro da casa, você escuta uma buzina longa. Um dos convidados olha pela janela e vê um veículo atravessado perto da entrada.\n\nVocê: — Tem um carro bloqueando metade do acesso. Se alguém precisar sair de ambulância, isso vai atrapalhar.\n\nPelo celular, os amigos que vêm da cidade pedem uma indicação segura de entrada. Você pode sinalizar o obstáculo, orientar a chegada ou tentar liberar a frente. A escolha não garante que todos cheguem a tempo.`;
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
   if(!tgt||!THREATS[tgt]){choices=[G(stage===3?'k9_reunion':'k9_risk_'+(stage+1)+'_pov','Seguir os passos no próximo corredor')];text='O corredor está vazio quando a porta se abre. Uma cadeira tombada bloqueia metade da passagem, e passos se afastam do outro lado da casa. Você chama por alguém, mas não recebe resposta. Quem poderia estar nesse cômodo partiu antes de o perigo alcançá-lo. É preciso seguir para o próximo setor.';}
   else {const t=THREATS[tgt];location='CASA DO LAGO · '+t.where.toUpperCase();text=pov(tgt)+t.intro+'\n\n'+name(tgt)+': — Eu preciso pensar. Não vou sair correndo sem saber onde piso.\n\nO mascarado se aproxima por um único acesso. '+name(tgt)+' pode usar uma passagem que já observou ou correr no escuro.';
    choices=[C(t.good,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','safe')]),C(t.risky,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','risk')]),C(t.bad,'k9_risk_'+stage+'_act',[S('r'+stage+'_plan','bad')])];}
  }
  if(id==='k9_risk_'+stage+'_act'&&tgt&&THREATS[tgt]){
   const plan=f['c9_r'+stage+'_plan'];
   const route=THREATS[tgt];
   const chosenPlan=plan==='safe'?`${name(tgt)} executa a parte mais cuidadosa do plano: ${route.good.toLowerCase()}. O teste da primeira passagem revela um obstáculo, mas dá tempo de ajustar o corpo e orientar quem vem atrás.`:plan==='risk'?`${name(tgt)} decide ganhar tempo: ${route.risky.toLowerCase()}. A tentativa funciona por instantes, até uma pancada violenta na porta fazer o corredor inteiro estremecer.`:`${name(tgt)} age no impulso: ${route.bad.toLowerCase()}. O impacto deixa uma dor aguda e a passagem parece ainda mais estreita, mas parar significa deixar o perseguidor aproximar-se.`;
   text=pov(tgt)+`${chosenPlan}\n\nUm ruído de metal arranhando a parede segue ${name(tgt)} pelo corredor. A luz fraca mostra marcas de sangue próximas ao rodapé — impossível saber a quem pertencem.\n\n${name(tgt)}: — Merda. Merda, eu preciso sair daqui!\n\nDo outro lado da porta alguém responde com um grito e a maçaneta sacode com força. A decisão agora precisa acontecer enquanto a porta ainda resiste.`;
  }
  if(id==='k9_risk_'+stage+'_final'&&tgt&&THREATS[tgt]){
   const a=f['c9_r'+stage+'_act'],p=f['c9_r'+stage+'_plan'];
   const progress=a==='safe'?`${name(tgt)} se agacha para testar a estrutura e avisa os amigos pelo celular. Um golpe de lâmina atravessa a madeira a poucos centímetros de seu rosto; estilhaços cortam sua bochecha, mas a rota ainda pode estar aberta.`:a==='risk'?`${name(tgt)} tenta cortar o corredor pelo caminho curto. Um objeto cai da prateleira e espalha cacos sob seus pés. O mascarado aparece na curva; a pessoa recua antes que a lâmina a alcance por inteiro.`:`${name(tgt)} dispara pelo acesso sem verificar o apoio. O tornozelo dobra num degrau quebrado. O mascarado empurra a porta e uma lâmina risca sua roupa, abrindo um corte que queima na pele.`;
   text=pov(tgt)+`${progress}\n\n${name(tgt)}: — SOCORRO! TÔ AQUI!\n\nO perseguidor pressiona a passagem por onde veio. Atrás, a única saída exige uma última escolha: confiar no que já foi preparado ou arriscar um salto desesperado. ${p==='safe'?'O plano inicial ainda pode ajudar.':'O erro da primeira tentativa já custou segundos preciosos.'}`;
  }
  if(id==='k9_risk_'+stage+'_result'){
   const status=f['c9_r'+stage+'_result'];
   if(!tgt||status==='none')text='O cômodo foi encontrado vazio. Quem estava ali não retorna como uma vítima inventada. O próximo perigo acontece em outro setor.';
   else if(status==='fatal')text=window.UG107?.state?.(s)?.graphicOff?`${pov(tgt)}${name(tgt)} tenta escapar, mas é alcançado durante a perseguição. O ferimento é grave, e a ajuda chega tarde demais. A morte é confirmada no local. Os amigos ainda precisarão receber a notícia.`:DEATH[tgt];
   else if(status==='injured'){
    const injuries={
     allan:'cortes profundos no antebraço e uma torção ao cair da escada',
     samuel:'um corte extenso na coxa e costelas doloridas pelo impacto na garagem',
     isabella:'uma laceração na mão e o ombro ferido pelos estilhaços do corredor',
     laisla:'um corte aberto no braço e ferimentos no joelho ao passar pelo vidro',
     rauanny:'um corte no ombro e hematomas ao cair no piso molhado',
     ryan:'a palma da mão dilacerada na grade e a perna machucada na descida',
     breno:'queimaduras superficiais na mão e um corte no rosto junto ao painel'
    };
    text=pov(tgt)+`${name(tgt)} escapa por uma passagem estreita quando a ponta da lâmina acerta a parede atrás de seu ombro. O sangue pinga no chão durante a fuga: ${injuries[tgt]||'vários ferimentos que exigem atendimento'}. ${name(tgt)} se arrasta até uma área em que o mascarado não consegue alcançá-lo imediatamente.\n\n${name(tgt)}: — EU TÔ AQUI! Me ajuda... por favor!\n\nUm amigo responde pelo celular e o orienta a comprimir o ferimento com um pano limpo. A dor não desaparece e a pessoa precisa de atendimento médico; escapar não significa sair ileso.`;
   }
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
  text=text.replace(name(kid)+' está abalada',name(kid)+' está '+(['rayssa','rauanny','laisla','isabella','bella'].includes(kid)?'abalada':'abalado'));
  text=text.replaceAll('A pessoa',name(kid)).replaceAll('a pessoa',name(kid));
  text=text.replace('REFÉM: — Ele tá aqui.',name(kid)+': — Ele tá aqui.');
  if(id==='k9_deck_hostage'&&lv===kid)text+='\n\nVocê encosta a testa na de '+name(kid)+' e o beija rapidamente, antes de tentar afrouxar a fita. Não há tempo para fingir que esse sentimento é pequeno.';
  if(id==='k9_deck_arrive'&&kid==='rayssa')text+='\n\nRayssa olha para sua mão com uma expressão difícil de interpretar. Ela está machucada e você não sabe o que aconteceu desde a gravação.';
 }
 if(id==='k9_deck_face')text=text.replace('deixa essa pessoa ir embora','deixa '+name(kid)+' ir embora');
 if(id==='k9_final'){
  text=`Você sustenta o olhar do mascarado enquanto ${name(kid)} tenta se libertar da cadeira. Sua garganta está seca, mas você não recua.\n\nVocê: — Acabou. Chega de mortes, chega de ameaças... e chega dessa porcaria de máscara. Mostra quem você é!\n\nO silêncio dura tempo demais. Então a pessoa leva a mão ao próprio rosto e começa a erguer a máscara, devagar, até revelar a identidade.\n\nVocê sente o ar faltar. Conhece aquele rosto.\n\nVocê: — Não... não pode ser. Você?!\n\nO lago continua batendo nas tábuas. Atrás de você, ${name(kid)} prende a respiração.\n\nFIM DO CAPÍTULO 9 — UM ÚLTIMO JOGO`;
 }
 // Entrega a ação já escolhida como parte visível da história, não apenas como flag.
 text=c9Dialogue(s,id,text,kid);
 text=priorAction(s,id,text);
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
