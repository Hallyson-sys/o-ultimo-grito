/* O Último Grito · V1.3.2 · Respostas e continuidade do capítulo 9.
   Camada aditiva: preserva os IDs de nós, efeitos e todos os slots antigos. */
(()=>{'use strict';
const old=window.UG9;if(!old)return;
const L={ryan:'Ryan',rayssa:'Rayssa',breno:'Breno',rauanny:'Rauanny',laisla:'Laisla',isabella:'Isabella',samuel:'Samuel',allan:'Allan',bella:'Bella'};
const name=id=>L[id]||id||'ninguém';
const alive=(s,id)=>!!L[id]&&!old.dead(s,id);
const lover=s=>alive(s,s.romanceEscolhido)?s.romanceEscolhido:null;
const people=(s,place)=>((s.flags||{})['c9_'+place+'_pessoas']||[]).filter(x=>alive(s,x));
const guest=(s,place,prefer=[])=>{let a=people(s,place);return prefer.find(id=>a.includes(id))||a[0]||null};
const speak=(n,line)=>n?name(n)+': — '+line:'Você observa a situação e escolhe não falar por ninguém.';
const joined=(s,place)=>people(s,place).map(name).join(', ')||'nenhum dos oito amigos';
const same=(s)=>s.flags?.c9_last_choice;
const idIs=id=>typeof id==='string'&&id.startsWith('k9_');
const scene=(narr,hero,other,otherLine,after='')=>[narr,hero?'Você: — '+hero:'',other?speak(other,otherLine):'',after].filter(Boolean).join('\n\n');
const opt=(s,ch,arr)=>arr[ch.i]||'';
function choiceScene(s,ch){if(!ch||!ch.from||ch.i<0)return '';const from=ch.from,k=ch.i,lv=lover(s),f=s.flags||{},sus=f.c9_suspeito,house=guest(s,'casa',['laisla','rauanny','ryan','allan','breno','samuel','isabella']),city=guest(s,'cidade',['isabella','samuel','breno','ryan','allan','rauanny']);
 const h=name(f.c9_refem||old.hostage(s)),p=name(lv),host=house?name(house):'um dos convidados',friend=city||house,other=friend?name(friend):'os amigos';
 switch(from){
 case 'k9_mem_hero':return opt(s,ch,[
  scene('Você respira fundo diante das velas. Os amigos esperam, sem apressar suas palavras.','Eu não sei dizer adeus direito. Mas cada um deles fazia parte da nossa vida. Não quero que a última coisa que lembrem seja como morreram.',friend,'Eu também. Quero que as pessoas lembrem do que a gente viveu junto.','Você coloca a flor perto das fotografias; ninguém aplaude, mas alguém aperta seu ombro.'),
  scene('Você escolhe uma fotografia e conta um episódio comum, daqueles que não pareciam ter importância até agora.','Lembra como a gente conseguia brigar por uma besteira e, dez minutos depois, já tava rindo de novo?',friend,'Lembro. Eu faria qualquer coisa por mais um dia daqueles.','Um riso molhado de choro passa pela roda. A história se torna parte da homenagem.'),
  `Você não consegue formar uma frase. Permanece ao lado de ${other}, segurando uma flor.\n\n${friend?speak(friend,'Você não precisa falar nada. Fica aqui comigo um pouquinho.'):''}\n\nEm silêncio, vocês ajeitam uma vela apagada. Seu gesto também é uma despedida.`]);
 case 'k9_party_announce':return opt(s,ch,[
  scene('Você espera Laisla terminar antes de se posicionar.','Ela tem direito de querer dançar e respirar um pouco. Isso não significa que esqueceu ninguém.',alive(s,'laisla')?'laisla':friend,'Obrigada. É só isso que tô tentando explicar.','Quem discorda continua preocupado; sua defesa não elimina o medo dos outros.'),
  scene('Você olha para os curativos e para as fotos ainda salvas nos celulares.','Eu entendo a vontade de sair, mas a preocupação de vocês também faz sentido.',alive(s,'laisla')?'laisla':friend,'Eu sei. Só me escuta sem transformar tudo numa proibição.','Rauanny respira mais devagar, se ainda está presente. A conversa continua, mas em outro tom.'),
  scene('Você coloca o celular sobre a mesa, aberto no mapa da cidade.','Dá pra fazer as duas coisas. Quem for precisa avisar onde está e combinar uma saída segura.',alive(s,'laisla')?'laisla':friend,'Tá, disso eu topo cuidar. Não vou deixar ninguém sem saber o endereço.','A discussão muda de uma acusação para um acordo prático.')]);
 case 'k9_anna_flashback':return opt(s,ch,[
  'Bella: — Por que isso te machucou tanto, Ju?\n\nJullia: — Porque a Anna sabia que eu confiava nela. Eu não queria perder a amizade. Só queria que ela tivesse me escolhido.\n\nBella se senta perto da irmã e espera que ela termine de falar.',
  'Bella puxa uma cadeira até o lado de Jullia e fica em silêncio.\n\nJullia: — Obrigada por não ficar insistindo que eu tenho que perdoar agora.\n\nBella: — Eu não disse que você precisa. Só não quero te ver sofrer sozinha.\n\nJullia apoia a cabeça no ombro da irmã por alguns instantes.',
  'Bella pega uma almofada.\n\nBella: — Se você continuar fazendo essa cara, a Anna vai achar que roubou seu último biscoito.\n\nJullia: — Bella, cala a boca!\n\nEla tenta não rir, mas a expressão acaba cedendo. As duas se abraçam entre provocações.']);
 case 'k9_bella_meet':return opt(s,ch,[
  'Você: — Qual documento, exatamente, contraria o que a gente ouviu?\n\nBella: — Esse horário aqui, do acesso de serviço. A pessoa contou uma coisa diferente. Não sei se mentiu ou se o registro é falho; é por isso que eu quero comparar as fontes.\n\nEla coloca os dois papéis lado a lado e aponta as datas, sem acrescentar nomes que não aparecem neles.',
  'Você: — E se a pessoa só confundiu a hora?\n\nBella: — É possível. Eu mesma confundi o dia em que fui procurar a Ju uma vez. Mas a gente precisa perguntar antes de decidir que foi só isso.\n\nEla afasta o dedo da página e espera você olhar por conta própria.',
  'Você: — Não vou acusar outro amigo só porque as datas não batem.\n\nBella: — Ainda bem. Eu quero descobrir o que aconteceu, não criar mais um culpado por desespero.\n\nOs dois concordam em guardar o documento sem transformá-lo em sentença.']);
 case 'k9_bella_evidence':return opt(s,ch,[
  `Você: — ${name(sus)} pode ter mil motivos pra estar ali. Não vou tratar isso como prova de assassinato.\n\nBella: — Eu também não tô fazendo isso. Se você quer defender essa pessoa, defende os fatos. A gente só precisa achar uma explicação pro horário.\n\nVocê guarda uma fotografia do registro e decide não mostrar a ninguém como acusação.`,
  `Você: — Vou perguntar diretamente a ${name(sus)} antes de acreditar em qualquer coisa.\n\nBella: — Pergunta, mas não chega já chamando de assassino. E escolhe um momento em que ninguém esteja pronto pra brigar.\n\nEla indica com a ponta da caneta qual intervalo de tempo merece esclarecimento.`,
  'Você: — A gente guarda isso por enquanto. Quando conseguir outro registro, compara.\n\nBella: — Combinado. Eu não quero perder mais ninguém por causa de um palpite.\n\nEla fotografa o horário e arquiva os papéis sem escrever o nome de nenhum suspeito na capa.']);
 case 'k9_love_message':{
  if(!lv)return '';
  return opt(s,ch,[
   `Você responde a ${p} antes que a tela se apague.\n\nVocê (mensagem): — Vem sim. Queria te ver antes de sair.\n\n${p} (mensagem): — Tô indo. Não ri se eu chegar nervoso demais.\n\nVocê coloca o celular sobre a cama e começa a arrumar a sala para receber ${p}.`,
   `Você (mensagem): — Quero te ver, mas a gente se encontra direto na festa, pode ser?\n\n${p} (mensagem): — Pode. Me fala onde você decidir ir que eu tento te encontrar lá.\n\nVocês trocam um último emoji; a conversa não fica sem resposta.`,
   `Você (mensagem): — Hoje eu preciso ficar um pouco sozinho antes de sair. Não é por sua causa.\n\n${p} (mensagem): — Eu entendo. Só me manda notícia quando chegar.\n\nVocê deixa o aparelho por perto, sabendo que explicou o silêncio em vez de abandonar ${p} no vácuo.`]);}
 case 'k9_love_visit':{
  if(!lv)return '';
  return opt(s,ch,[
   `Você: — Nossa... você tá muito ${['rayssa','rauanny'].includes(lv)?'bonita':'bonito'}.\n\n${p}: — Você ensaiou isso antes de abrir a porta?\n\nVocê ri, aproxima-se e beija ${p}. A mão de ${p} permanece junto à sua depois que os lábios se separam.`,
   `Você segura a mão de ${p} e olha para o relógio.\n\nVocê: — Se a gente se atrasar, vou dizer que você demorou pra escolher roupa.\n\n${p}: — Ah, vai jogar essa culpa em mim?\n\n${p} puxa você pela cintura, rindo, e os dois continuam a provocação no corredor.`,
   `Você: — Antes de qualquer coisa... você tá confortável aqui? Aconteceu tanta coisa.\n\n${p}: — Tô. Só queria que você perguntasse mesmo.\n\nVocê abre espaço para ${p} se sentar. A aproximação começa com uma conversa, não com um beijo obrigatório.`]);}
 case 'k9_love_intimate':{
  if(!lv)return '';
  return opt(s,ch,[
   `Você aproxima o rosto do de ${p} outra vez.\n\nVocê: — Eu senti sua falta. Até quando a gente tava no mesmo lugar parecia que não dava pra conversar direito.\n\n${p}: — Eu também.\n\nVocês se beijam de novo, devagar, antes de conferir se ainda há tempo de sair.`,
   `Você abraça ${p} e deixa que o silêncio continue por alguns segundos.\n\n${p}: — Obrigado por não tentar preencher tudo com promessa. Agora só quero ficar assim.\n\nO abraço demora. Quando vocês se afastam, ${p} ainda segura sua mão.`,
   `Você: — A gente pode escolher juntos onde vai hoje. Não quero te arrastar pra lugar nenhum.\n\n${p}: — Então me conta o que você tá pensando. Eu te digo o que prefiro, e a gente decide sem brigar.\n\nVocês olham os convites lado a lado, sem assumir que uma rota romântica obriga a comparecer ao mesmo evento.`]);}
 case 'k9_choose_event':return opt(s,ch,[
  'Você escolhe seguir para a praça. Repassa o endereço do evento a quem combinou de encontrar e confere se o celular está carregado. As luzes das barracas já aparecem entre os prédios.',
  'Você escolhe a estrada da casa de veraneio. Envia sua localização e avisa que estará na festa organizada por Laisla, ou pelos amigos que assumiram a reunião. As árvores escondem as primeiras luzes da piscina.']);
 case 'k9_city_arrive':return opt(s,ch,[
  `Você chama ${other} para perto do mural.\n\nVocê: — Preciso conversar sobre uma coisa que a Bella achou. É uma diferença de horário, não uma acusação.\n\n${speak(friend,'Então me mostra exatamente o que ela encontrou. Sem tirar conclusão antes.')}\n\nVocês procuram um canto afastado da música antes de falar.`,
  'Você percorre o mural devagar e reconhece algumas fotografias. Um voluntário explica quais famílias organizaram as homenagens e onde deixar flores. Você escuta o discurso inteiro, mesmo quando precisa se afastar por alguns segundos para não chorar.',
  lv&&people(s,'cidade').includes(lv)?`Você encontra ${p} perto das barracas.\n\nVocê: — Eu tava te procurando. Como você tá aqui?\n\n${p}: — Tentando fingir que não tô nervoso. Fica um pouco comigo?\n\nVocês caminham entre as luzes antes de voltar para perto do palco.`:`Você procura alguém conhecido e encontra ${other} perto do palco.\n\nVocê: — Eu precisava de uma cara familiar no meio dessa gente.\n\n${speak(friend,'Eu também. Vem, vamos ficar perto da saída por enquanto.')}\n\nVocês seguem juntos pelas barracas.`]);
 case 'k9_city_doubt':return opt(s,ch,[
  `Você: — Quero que isso fique só entre nós por enquanto. A Bella não acusou ${name(sus)}.\n\n${speak(friend,'Concordo. Ninguém precisa ser apontado no meio de uma praça por causa de uma diferença de horário.')}\n\nVocês guardam os celulares antes que alguém se aproxime.`,
  `Você: — Não quero nem defender nem acusar ${name(sus)} sem conferir o documento inteiro.\n\n${speak(friend,'Então vamos anotar o que realmente sabemos, e não o que estamos com medo de descobrir.')}\n\nVocê separa a data da hipótese numa nota do celular.`]);
 case 'k9_house_arrive':return opt(s,ch,[
  `Você encontra ${host} perto da caixa de som e segura a ponta de um cabo enquanto a mesa de bebidas é afastada da porta.\n\nVocê: — Essa playlist vai começar ou vamos continuar brigando por música?\n\n${speak(house,'Se você achar uma música que não faça ninguém reclamar, eu te dou o controle da caixa!')}\n\nOs dois organizam as garrafas longe do vidro. Quando a música finalmente toca, algumas pessoas aplaudem a mudança.`,
  `Você se afasta do som alto com ${host} e procura duas cadeiras na varanda.\n\nVocê: — Precisava de um lugar onde desse pra ouvir sua resposta.\n\n${speak(house,'Eu também. Lá dentro parece que todo mundo tá competindo pra ver quem fala mais alto.')}\n\nVocês observam a água distante. A conversa sobre a noite segue antes que outro convidado os chame.`,
  `Você aproxima-se da roda perto da piscina e desafia ${host} a adivinhar a música apenas pelos primeiros segundos.\n\nVocê: — Se errar, vai ter que escolher uma música melhor que essa.\n\n${speak(house,'Ah, é? Então se prepara pra perder.')}\n\nUm convidado conta os segundos em voz alta. Você erra a primeira, ${host} erra a segunda, e a roda cai na risada. Depois de mais duas rodadas, vocês voltam para a varanda para recuperar o fôlego.`]);
 case 'k9_house_social':return opt(s,ch,[
  `Você chama ${host} para um canto do jardim.\n\nVocê: — A Bella encontrou uma diferença num registro. Não prova que ninguém matou ninguém, mas fiquei pensando nisso.\n\n${speak(house,'Se a gente vai conversar sobre isso, vamos lembrar que um horário errado não torna uma pessoa culpada.')}\n\nVocê mostra apenas as informações que realmente tem e concorda em não divulgar um boato entre os convidados.`,
  `Você: — Quando tudo isso acabar, qual é a primeira coisa que você quer fazer?\n\n${speak(house,'Uma semana inteira sem conferir se a porta tá trancada. Depois eu penso no resto.')}\n\nVocê conta um plano seu também. Durante alguns minutos a conversa chega até viagens, trabalho e músicas, sem precisar voltar aos ataques.`,
  lv&&people(s,'casa').includes(lv)?`Você encontra ${p} num canto mais quieto da varanda.\n\nVocê: — Posso ficar aqui com você um pouquinho?\n\n${p}: — Vem. Lá dentro ninguém deixa a gente terminar uma frase.\n\n${p} segura sua mão. Vocês conversam sobre como foi a tarde antes de se abraçarem, longe dos outros convidados.`:`Você encontra ${host} longe da música.\n\nVocê: — Queria conversar com alguém sem ter que gritar por cima da caixa de som.\n\n${speak(house,'Então senta. Acho que todo mundo tá precisando de um minuto assim.')}\n\nOs dois dividem uma lembrança da tarde e voltam quando alguém chama para uma fotografia.`]);
 case 'k9_omen':return opt(s,ch,[
  `Você abre as mensagens e confere a última localização compartilhada de cada amigo. Os horários não mostram onde todo mundo está neste instante, mas revelam quem parou de responder. Você anota o nome de ${h} e tenta contato novamente.`,
  `Você liga para ${h}. Uma chamada longa termina na caixa postal.\n\nVocê: — Me atende. Por favor.\n\nVocê deixa uma mensagem curta perguntando onde ${h} está, sem divulgar para a multidão uma suspeita que ainda não tem prova.`,
  `Você escreve no grupo: — Quem tá na casa? Quem tá na praça? Respondam com nomes, por favor.\n\nAs respostas chegam aos poucos. ${h} é o nome que continua faltando, e isso torna a ausência muito mais concreta.`]);
 case 'k9_missing':return opt(s,ch,[
  `Você começa pelo último lugar onde ${h} foi visto. Pergunta a um funcionário, confere uma porta lateral e encontra somente uma área de passagem vazia.\n\nVocê: — Você viu ${h} saindo daqui?\n\nFUNCIONÁRIO: — Eu vi alguém indo naquela direção, mas não consigo garantir que era quem você procura.`,
  `Você procura a equipe de segurança e descreve ${h} com detalhes, inclusive a roupa que usava naquela noite.\n\nVocê: — Não é só alguém que se perdeu na festa. Meu amigo não responde e pode estar em perigo.\n\nSEGURANÇA: — Vou chamar minha equipe e verificar as câmeras. Não vá sozinho pra uma área isolada.`,
  `Você liga outra vez para ${h}; a tela continua sem resposta. Procura o último horário de atividade, mas não existe rastreamento preciso autorizado naquele momento.\n\nVocê: — Merda. Não é possível que sumiu assim.\n\nVocê fotografa o horário da ligação para não esquecer depois.`]);
 case 'k9_video':return opt(s,ch,[
  `Você grita o nome de ${h} mesmo sabendo que a tela não pode ouvi-lo.\n\nVocê: — ${h.toUpperCase()}!\n\nUma criança começa a chorar ao seu lado. Você pede que os adultos abram passagem e ajuda duas pessoas a sair do tumulto antes de voltar a olhar o telão.`,
  'Você corre até a mesa de som.\n\nVocê: — Preciso de uma cópia desse vídeo. Não apaga nada, por favor!\n\nTÉCNICO: — Vou separar o arquivo recebido e o registro de reprodução. Mas eu não sei quem enviou.\n\nVocê fotografa a tela para registrar a solicitação.',
  'Você contorna o palco e encontra um funcionário tentando fechar a porta dos bastidores.\n\nVocê: — De onde entrou esse vídeo?\n\nTÉCNICO: — Foi injetado no sistema. A gente ainda tá descobrindo como.\n\nVocê grava o nome do equipamento que ele menciona, mas não consegue identificar o responsável.']);
 case 'k9_video_react':return opt(s,ch,[
  `Você envia a fotografia à conversa dos amigos na casa.\n\nVocê (mensagem): — OLHEM ISSO. A foto é da piscina de vocês, tirada agora. Tranca as portas e me responde com quem tá aí.\n\n${speak(house,'Recebi. Vou avisar todo mundo e conferir os fundos.')}\n\nSeu aviso chega antes que a música seja interrompida.`,
  'Você procura um agente de segurança.\n\nVocê: — Recebi uma foto de uma casa perto do lago. Parece que o assassino tá observando os meus amigos.\n\nAGENTE: — Me passa o endereço e o horário da imagem. Vou comunicar às unidades disponíveis.\n\nVocê envia a localização e anota o nome do agente para acompanhar a ocorrência.',
  'Você amplia a fotografia e compara as luzes com uma imagem antiga da casa.\n\nVocê: — O ângulo é de cima. Alguém estava perto da estrada lateral.\n\nUm elemento do cenário permite identificar um provável ponto de observação, mas não quem fez a foto. Você marca o lugar no mapa.']);
 case 'k9_prep_01':return opt(s,ch,[
  'Você coloca lado a lado a foto recebida e a planta de acesso à casa. O portão lateral e a área da piscina aparecem na mesma posição.\n\nVocê: — Se alguém estiver na entrada da frente, ainda dá pra chegar pelos fundos.\n\nVocê registra um caminho alternativo, sem afirmar que ele está livre.',
  `Você combina um ponto de reunião longe das janelas.\n\nVocê (mensagem): — Se alguma coisa acontecer, todo mundo tenta chegar ao portão da estrada. Quem não conseguir responde de onde tá.\n\n${speak(house,'Tá. Eu vou avisar os que estão aqui e deixar a saída livre.')}\n\nA resposta permite planejar o resgate sem saber de antemão onde o mascarado estará.`,
  'Você volta ao equipamento usado na transmissão. O técnico mostra o horário do acesso remoto, mas a identificação do aparelho de origem foi apagada.\n\nVocê: — Então alguém preparou isso antes do festival.\n\nTÉCNICO: — Parece que sim. Mas isso não diz quem.\n\nVocê fotografa os dados antes de voltar para a estrada.']);
 case 'k9_prep_02':return opt(s,ch,[
  'Você pede uma fotografia das portas externas e compara com o mapa.\n\nVocê (mensagem): — Não abram portas cegamente. Confiram a janela e a passagem lateral.\n\nO grupo confirma que uma saída antiga está difícil de abrir. Essa informação chega antes de vocês precisarem usá-la.',
  `Você cria uma conversa de emergência com quem está nos dois eventos.\n\nVocê (mensagem): — Mandem nome, cômodo e se precisam de ajuda. Nada de só escrever socorro.\n\n${speak(house,'Recebido. Vou avisar quem tá longe da cozinha.')}\n\nOs contatos ficam salvos para a tentativa de fuga.`,
  'Você: — Eu não consigo ficar aqui esperando.\n\nVocê segue pela estrada antes de receber todas as respostas. A pressa diminui o tempo de deslocamento, mas você chega sem saber quais saídas permanecem abertas.']);
 case 'k9_prep_03':return opt(s,ch,[
  'Você marca o carro atravessado no mapa e diminui a velocidade.\n\nVocê: — Não vamos passar por cima disso. Tem outro acesso pelo lado da cerca.\n\nVocê encontra o portão de serviço e anota o lugar em que poderá deixar o veículo.',
  `Você manda a foto do carro e a localização exata.\n\nVocê (mensagem): — Tem um veículo parado no acesso. Não tentem sair por aqui sem olhar antes.\n\n${speak(house,'Obrigado. Vou avisar quem tá perto da garagem.')}\n\nOs convidados recebem o alerta antes de correrem para a estrada.`,
  'Você passa pelo espaço estreito ao lado do carro com cuidado, mas ouve a lataria raspar na vegetação.\n\nVocê: — Droga, a entrada tá pior do que parecia.\n\nVocê chega mais perto da porta principal, sem ter mapeado a rota externa.']);
 case 'k9_house_warning':return opt(s,ch,[
  `A perspectiva acompanha ${host} perto da porta de serviço. ${host} testa o trinco, afasta uma cadeira da passagem e chama os presentes pelo nome.\n\n${speak(house,'Ninguém sai sozinho. Quem for pro jardim avisa antes.')}\n\nAs pessoas mais próximas se agrupam em vez de correr sem direção.`,
  `${host} percorre o corredor até a porta exterior e confere se o portão dá passagem.\n\n${speak(house,'Se a luz cair, a gente vai por aqui. Mas só se estiver livre.')}\n\nUma saída alternativa fica conhecida antes do ataque.`,
  `${host} corta a música por alguns segundos.\n\n${speak(house,'Gente, vamos pra fora sem empurrar. Teve um problema perto da entrada.')}\n\nParte dos convidados sai com calma. Outros hesitam, mas o corredor fica menos cheio.`]);
 case 'k9_invasion':return opt(s,ch,[
  `Você aponta a cozinha, a escada e a porta da piscina.\n\nVocê: — ${host}, confere a saída de serviço! Quem estiver no andar de cima manda notícia!\n\n${speak(house,'Tá! Eu aviso quando chegar à porta!')}\n\nAs funções ficam claras, mesmo que o mascarado force uma mudança de planos.`,
  `Você: — TODO MUNDO PRA FORA! SEM CORRER EM CIMA DOS OUTROS!\n\n${speak(house,'Pelo jardim! A porta da piscina ainda dá passagem!')}\n\nVocê orienta os amigos pela lateral, tentando impedir que alguém fique para trás.`,
  `Você corre até a garagem, procura a chave e tenta abrir o portão de saída.\n\nVocê: — Preciso de alguém na porta! Tem gente tentando sair por aqui!\n\n${speak(house,'Eu vou! Só não liga o carro com todo mundo no caminho!')}\n\nO portão cede alguns centímetros, mas ainda exige mais uma decisão.`]);
 case 'k9_reunion_luto':return opt(s,ch,[
  'Você pede que cada sobrevivente diga o último cômodo onde viu quem está faltando. Anota os nomes dos que foram encontrados e não permite que uma ausência seja chamada de morte sem confirmação.\n\nVocê: — A gente vai contar às famílias o que sabe. Nada de inventar quem viu o quê.',
  `Você se ajoelha junto aos feridos e procura ajuda.\n\nVocê: — Pressiona esse curativo. Eu vou chamar socorro.\n\n${speak(friend||house,'Eu fico com quem não consegue andar agora. Vai avisar a equipe quando chegar.')}\n\nAs pessoas mais abaladas recebem companhia em vez de serem deixadas sozinhas no jardim.`,
  'Você procura marcas de sapato e o caminho de saída sem voltar sozinho para dentro da casa.\n\nVocê: — Se a polícia chegar, a gente precisa mostrar por onde ele foi.\n\nUm sinal perto do portão sugere uma direção, mas o escuro não permite acompanhar ninguém com segurança.']);
 case 'k9_last_call':return opt(s,ch,[
  `Você reúne os presentes.\n\nVocê: — A ligação veio de perto do lago. O refém tá lá. Eu vou, mas vocês precisam saber onde me procurar.\n\n${speak(friend||house,'Não some sem avisar. A gente vai tentar manter contato.')}\n\nVocê compartilha sua localização antes de partir.`,
  'Você liga para Bella e descreve o ruído da água e da madeira.\n\nVocê: — Qual é o deck onde a gente esteve naquela noite?\n\nBella: — Tem dois acessos parecidos. O certo fica depois da curva da margem. Não confunde com a estação.\n\nVocê registra a orientação e agradece, sem exigir que Bella corra ferida até lá.',
  'Você avisa apenas uma pessoa de confiança: — Vou até o deck. Se eu não responder, conta pros outros onde fui.\n\nEla confirma que recebeu a localização. Você segue com menos gente sabendo do plano, mas não desaparece da história sem deixar um rastro.']);
 case 'k9_deck_route':return opt(s,ch,[
  'Você segue por uma parte mais alta da trilha, de onde pode enxergar o deck entre os galhos. O caminho é mais demorado, mas permite ver que uma pessoa está imóvel numa cadeira na extremidade.',
  'Você passa pelo acesso de serviço junto à margem, pisando apenas nas pedras firmes. Escuta uma corrente roçar na madeira e percebe que o mascarado preparou o local antes de sua chegada.',
  'Você caminha pelo acesso principal sem se esconder.\n\nVocê: — EU CHEGUEI! SOLTA MEU AMIGO!\n\nO eco viaja pela água; ninguém responde ainda. Você continua, consciente de que anunciou sua posição.']);
 case 'k9_deck_arrive':return opt(s,ch,[
  `Você se agacha diante de ${h} e examina as amarras.\n\nVocê: — Vou soltar isso, mas preciso saber se tem alguma coisa presa na cadeira.\n\n${h}: — Eu não sei o que ele fez com a fita... cuidado.\n\nVocê começa pelo nó que parece não estar conectado à estrutura, sem puxar tudo de uma vez.`,
  `Você abraça ${h} com cuidado.\n\nVocê: — Achei que nunca mais ia te ver. Você consegue falar?\n\n${h}: — Consigo. Só... não me deixa aqui.\n\nO abraço é breve porque as amarras ainda o prendem à cadeira.`,
  `Você examina o início do deck antes de tocar na cadeira.\n\nVocê: — Tem alguém perto da trilha? Você ouviu passos?\n\n${h}: — Eu ouvi madeira rangendo faz pouco. Não sei de onde veio.\n\nVocê memoriza os acessos e então se aproxima para ajudar ${h}.`]);
 case 'k9_deck_hostage':return opt(s,ch,[
  `Você se coloca ao lado da cadeira.\n\nVocê: — Eu vim como você pediu. Agora solta ${h}!\n\nVOZ DISTORCIDA: — Você ainda acha que está em posição de exigir alguma coisa?\n\nA figura não se aproxima; mantém o caminho de saída bloqueado.`,
  `Você dá um passo entre ${h} e o mascarado.\n\nVocê: — Se quiser chegar perto, vai ter que passar por mim.\n\n${h}: — Não faz nenhuma besteira por minha causa!\n\nO mascarado acompanha seus movimentos sem tirar a máscara.`,
  'Você: — Quantas pessoas ainda vão morrer antes de você parar?\n\nVOZ DISTORCIDA: — E vocês contaram quantas vidas destruíram naquela noite?\n\nVocê vê a água escura além da cadeira e percebe que a discussão não começou hoje.']);
 case 'k9_deck_face':return opt(s,ch,[
  'Você se aproxima com os punhos cerrados.\n\nVocê: — CHEGA! Não vou mais fugir de você.\n\nO mascarado não avança; espera você terminar, como se estivesse tentando prolongar o instante.',
  'Você: — Eu sei que a gente fez uma coisa horrível. Mas matar mais gente não vai trazer ninguém de volta.\n\nVOZ DISTORCIDA: — Não foi só a morte. Foi o que vocês fizeram depois.\n\nA frase devolve à sua memória o peso do saco levado à água.',
  'Você aponta para a máscara.\n\nVocê: — Então mostra seu rosto. Acaba com isso olhando pra mim.\n\nO mascarado leva a mão à lateral da máscara, sem responder.']);
 default:return '';
 }
}
// A segunda e a terceira escolhas da perseguição são específicas de cada rota.
// Os valores safe/risk/bad originais são preservados para não alterar o balanceamento.
const RISK={
 allan:{
  mid:['Segurar a caixa de ferramentas contra a grade antes de descer','Usar a tampa de uma caixa como ponte até o patamar','Empurrar a grade enferrujada para abrir espaço'],
  fin:['Descer junto à parede e chamar Samuel pelo rádio','Saltar para a porta enquanto o assassino ocupa a escada','Se lançar pela abertura sem conferir o piso de baixo'],
  step:['Allan encosta a caixa na grade e descobre que o corrimão vibra mesmo sem peso. Ele precisa escolher uma forma de passar sem depender do metal solto.','Allan encosta a tampa de madeira entre os degraus. A peça escorrega alguns centímetros e torna cada passo uma aposta.','Allan força a grade. Um dos parafusos cai e bate lá embaixo; o mascarado ouve o som e acelera.'],
  last:['Allan encosta as costas na parede e encontra um degrau intacto. Samuel respondeu à mensagem, mas está num setor distante.','Allan tenta atravessar o patamar numa passada larga. A porta fica a um braço de distância, e os degraus vibram atrás dele.','A grade cede de vez sob seu peso. Allan precisa alcançar o apoio antes de cair pelo vão.'],
  saved:'Allan desce pelo degrau que havia testado. Quando o patamar estala, muda o peso para a parede e consegue escapar pelo depósito. Do lado de fora ele responde à chamada de Samuel, ofegante: — Tô vivo, seu idiota. Não vem pra cá!',
  injured:'Allan alcança a porta, mas o suporte se solta e rasga seu antebraço. Ele cai de joelhos, deixa sangue no corrimão e sai mancando do depósito. — Samu... vem me encontrar. Eu consegui sair, mas não tô bem.'
 },
 samuel:{
  mid:['Soltar o travamento manual e afastar os carros da passagem','Usar o carro parado para empurrar o portão parcialmente','Tentar levantar o portão sozinho enquanto o mascarado se aproxima'],
  fin:['Esperar o portão estar firme antes de fazer os amigos passar','Acelerar por uma abertura estreita para alcançar a estrada','Se jogar sob o portão que está descendo'],
  step:['Samuel desliga o motor e encontra a pequena alavanca de liberação atrás do painel. A mão treme, mas ele testa a folga antes de mover o portão.','Samuel encosta o para-choque na chapa de metal. O som do motor cobre por segundos os passos que se aproximam da garagem.','Samuel agarra a porta metálica pelos dois lados e sente o peso descer sobre os braços. Não vai aguentar segurá-la para sempre.'],
  last:['A trava finalmente libera o portão. Samuel ainda precisa tirar um obstáculo da frente antes de mandar alguém atravessar.','O carro passa raspando a lateral do portão. Samuel ouve o vidro estalar e sabe que uma curva errada o prenderá entre a parede e o agressor.','Samuel passa por baixo da chapa. O metal desce atrás dele, e não há mais espaço para voltar pelo mesmo caminho.'],
  saved:'Samuel mantém o motor desligado até liberar a passagem; depois sinaliza aos convidados que podem sair. O mascarado alcança a garagem quando ele já está do lado de fora. — TÔ AQUI! Allan, responde, porra!',
  injured:'O portão bate contra o ombro de Samuel, que cai junto à roda de um carro. Ele grita de dor, consegue rastejar pela passagem lateral e deixa uma mancha de sangue na lataria. — Eu saí... mas meu braço tá ruim. Chama ajuda!'
 },
 isabella:{
  mid:['Calçar a estante para liberar a saída pelo corredor seco','Arrastar a estante para bloquear o mascarado','Forçar a fechadura ao lado do cabo rompido'],
  fin:['Contornar o fio e alcançar a porta por trás da estante','Salt ar pela janela lateral antes que a estante tombe'.replace('Salt ar','Saltar'),'Tentar atravessar o corredor sob o fio energizado'],
  step:['Isabella encaixa um calço sob a estante e acompanha o fio rompido até perceber qual lado do piso ainda está seco.','Isabella empurra a estante entre o mascarado e a porta. O móvel começa a inclinar e pode prender a passagem que ela pretendia usar.','Isabella força a tranca. Uma faísca toca a moldura e a faz puxar a mão com um grito.'],
  last:['A passagem firme fica a alguns passos, mas Isabella precisa evitar a extremidade do fio pendurado.','A estante cai parcialmente, abrindo uma janela estreita. Isabella avalia se consegue passar sem ficar presa entre os móveis.','O mascarado se aproxima pelo corredor e Isabella está perto demais da fiação danificada.'],
  saved:'Isabella afasta o fio com uma ferramenta isolada encontrada no corredor seco e atravessa sem tocar na água. Ao sair, registra o local da pane no celular. — Eu tô fora! Não entrem pela cozinha!',
  injured:'A estante bate no ombro de Isabella quando ela gira para escapar. Um estilhaço abre um corte na lateral de seu rosto. Ela alcança o jardim, respirando com dificuldade. — Eu não vou voltar por aquele corredor. Chamem alguém!'
 },
 laisla:{
  mid:['Destravar a corrente pelo encaixe e conduzir uma pessoa por vez','Quebrar a divisória de vidro para abrir outra passagem','Forçar a porta com o corpo enquanto os convidados empurram'],
  fin:['Puxar o último convidado pelo acesso já aberto','Saltar a moldura quebrada antes que o mascarado alcance a cozinha','Voltar sozinha para dentro do corredor bloqueado'],
  step:['Laisla encontra o encaixe da corrente atrás de um armário de produtos de limpeza. Ela o gira e pede aos convidados que parem de empurrar.','Laisla protege o rosto com o antebraço e bate na divisória. Os estilhaços caem perto do caminho que os convidados precisam cruzar.','A porta resiste à primeira pancada. Laisla sente uma fisgada na lateral do corpo e tenta outra vez, ouvindo gritos atrás dela.'],
  last:['A saída está aberta, mas falta conduzir um convidado que tropeçou na cozinha. Laisla segura a moldura e chama a pessoa pelo nome.','O vidro caiu em grandes placas. Laisla precisa passar de lado sem arrastar ninguém pelos estilhaços.','Um convidado chama do interior. Laisla vê o mascarado mais próximo e precisa decidir se entra sem ajuda.'],
  saved:'Laisla consegue soltar a última corrente e orientar os convidados para fora sem atropelamento. Ela fecha a porta atrás de si, respirando rápido: — Puta que pariu... eu nunca mais reclamo da fechadura dessa casa!',
  injured:'Laisla ajuda a última pessoa a atravessar, mas uma placa de vidro corta sua mão e o antebraço. O sangue marca a manga enquanto ela se afasta da passagem. — Eu tô viva! Só... pega alguma coisa pra apertar isso aqui!'
 },
 rauanny:{
  mid:['Contornar o canteiro seco e pedir que abram o portão','Usar uma cadeira como apoio pela borda da piscina','Pular na piscina para chegar antes do mascarado'],
  fin:['Guiar o amigo pelo jardim com o piso firme','Correr ao redor da borda segurando a grade','Mergulhar sob a estrutura para fugir pela água'],
  step:['Rauanny pisa no chão de terra entre os canteiros e chama a pessoa presa junto ao portão, avaliando se há espaço para passar.','Rauanny encosta uma cadeira de ferro na borda. Uma das pernas derrapa e quase a joga dentro da piscina.','Rauanny entra na água num salto e descobre que a borda oposta não tem escada. O mascarado se aproxima pelo piso seco.'],
  last:['A pessoa presa consegue mover a tranca por dentro. Rauanny só precisa manter a calma e atravessar sem pisar no azulejo molhado.','Rauanny agarra a grade da piscina com a mão machucada. A barra oscila enquanto alguém grita que ela deve recuar.','A saída de água está escura e a passagem é estreita. Um movimento errado pode deixá-la presa sob a estrutura.'],
  saved:'Rauanny contorna a piscina pelo canteiro e puxa o amigo até a passagem livre. Os dois alcançam o jardim antes que o agressor cruze a porta de serviço. — NÃO PARA! VAI ATÉ A ESTRADA!',
  injured:'Rauanny escorrega na borda e bate o ombro contra o piso, abrindo um corte profundo. Ela se levanta com dificuldade e alcança a saída, ensopada e tremendo. — Eu tô aqui! Cadê a Laisla?!'
 },
 ryan:{
  mid:['Verificar o suporte da escada e descer com o corpo junto à parede','Segurar a grade e alcançar a escada num salto curto','Pular da sacada diretamente para o telhado da garagem'],
  fin:['Descer degrau por degrau avisando por onde está indo','Soltar as duas mãos para alcançar a janela de baixo','Saltar até o chão sem conferir os apoios'],
  step:['Ryan testa a parte mais firme da grade e percebe uma vibração no encaixe. Ele procura apoio na parede antes de deslocar o peso.','Ryan se pendura pela lateral da sacada. A escada externa está próxima, mas o espaço entre os dois apoios é maior do que parecia.','Ryan olha para o telhado da garagem. A queda parece curta de cima, mas o metal é fino e há concreto além da beirada.'],
  last:['O primeiro degrau sustenta o peso de Ryan. O segundo range; ele precisa manter os três pontos de apoio, mesmo com o mascarado perto.','Ryan alcança a janela inferior com a ponta dos dedos. Os pés não encontram imediatamente a moldura.','Ryan se prepara para saltar sem ver onde o corpo cairá. O vento joga os cabelos sobre seus olhos no pior momento.'],
  saved:'Ryan mantém o corpo junto à parede, desce pela escada externa e se afasta da sacada antes de gritar. — EU TÔ AQUI! NÃO SOBE, A GRADE TÁ CAINDO! Ele ri de nervoso e apoia as mãos nos joelhos para recuperar o ar.',
  injured:'A grade se solta e Ryan bate a perna contra o telhado inferior. Ele cai de lado, rasga a calça e deixa sangue na borda antes de conseguir se arrastar para o jardim. — Eu consegui... só não consigo correr direito!'
 },
 breno:{
  mid:['Usar o interruptor isolado e seguir pela faixa de piso seco','Puxar um cabo com uma barra de madeira','Tocar o quadro danificado para cortar a luz de uma vez'],
  fin:['Alcançar a porta auxiliar sem voltar à área molhada','Passar por baixo da bancada caída para pegar a chave','Forçar a passagem junto ao painel energizado'],
  step:['Breno identifica o disjuntor pelo rótulo e testa o interruptor sem encostar nas partes metálicas. Ele mantém os tênis longe da poça.','Breno usa um pedaço de madeira para tentar puxar o cabo. A ponta escorrega, e faíscas iluminam a bancada.','Breno estica a mão para o quadro. O cheiro de plástico aquecido fica mais forte, e a água começa a avançar pelo piso.'],
  last:['O corredor auxiliar está seco, mas há um armário caído entre Breno e a saída. Ele procura um espaço para passar sem encostar no quadro.','A chave está do outro lado da bancada. Breno se agacha, com o braço machucado, enquanto os passos se aproximam.','Breno está perto demais do painel aberto. Uma nova descarga pode atingi-lo antes que alcance a porta.'],
  saved:'Breno usa a passagem seca e empurra o armário apenas o suficiente para escapar. A luz pisca atrás dele quando fecha a porta. — Não encosta naquele quadro! Tem fio solto! Ele segue para o jardim com a respiração entrecortada.',
  injured:'Um impacto arremessa Breno contra a quina da bancada e abre um corte acima da sobrancelha. Ele cambaleia até a porta auxiliar e consegue sair, com sangue escorrendo pelo rosto. — Tô vivo... mas preciso de ajuda aqui fora.'
 }
};
function riskNarrative(s,id,base){const m=id.match(/^k9_risk_(\d+)_(act|final|result)$/);if(!m)return base;const st=Number(m[1]),part=m[2],f=s.flags||{},who=f['c9_r'+st+'_target'],r=RISK[who];if(!r)return base;
 const plan=f['c9_r'+st+'_plan'],act=f['c9_r'+st+'_act'];let text=base.text,choices=base.choices;
 const pov='PONTO DE VISTA: '+name(who).toUpperCase()+'\n\n';
 if(part==='act'){
  text=pov+r.step[plan==='safe'?0:plan==='risk'?1:2]+'\n\n'+speak(who,'Eu consigo ver o caminho... mas tenho que decidir agora, antes que ele chegue.');
  choices=choices.map((c,i)=>({...c,text:r.mid[i]}));
 }
 if(part==='final'){
  text=pov+r.last[act==='safe'?0:act==='risk'?1:2]+'\n\n'+speak(who,'Não dá mais pra esperar. É agora ou não tem saída.');
  choices=choices.map((c,i)=>({...c,text:r.fin[i]}));
 }
 if(part==='result'){
  const status=f['c9_r'+st+'_result'];
  if(status==='safe'||status==='injured'){
    let outcome=status==='safe'?r.saved:r.injured;
    if(who==='allan'&&old.dead(s,'samuel'))outcome=outcome.replace(/Samuel|Samu/g,'os amigos').replace('seu idiota','gente');
    if(who==='samuel'&&old.dead(s,'allan'))outcome=outcome.replace('Allan, responde, porra!','Alguém responde, porra!');
    if(who==='rauanny'&&old.dead(s,'laisla'))outcome=outcome.replace('Cadê a Laisla?!','Eu preciso de ajuda!');
    const support=people(s,'casa').find(x=>x!==who);
    if(support)outcome=outcome.replace(/o amigo/g,name(support));
    text=pov+outcome;
  }
  if(status==='fatal'){
    text=base.text; // preserva a cena de morte específica e a opção de gore reduzido
    const fallback=(plan!=='safe'||act!=='safe')?'A sequência de decisões levou '+name(who)+' a uma saída instável. A tentativa de escapar falha quando o mascarado alcança o setor.\n\n':'Mesmo seguindo a rota que parecia segura, faltava uma informação sobre o acesso. O mascarado chega antes que a ajuda consiga atravessar o corredor.\n\n';
    text=pov+fallback+text.replace(/^PONTO DE VISTA:[^\n]+\n\n/,'');
  }
 }
 return {...base,text,choices};
}
function scrubAndPersonalize(id,s,res){let text=res.text,choices=res.choices,lv=lover(s),f=s.flags||{};const nl=lv?name(lv):null;
 // Identificar o romance pelo nome e não por um rótulo genérico.
 if(lv){
  text=text.replace(/Seu interesse romântico, caso esteja vivo,/gi,nl).replace(/seu interesse amoroso/gi,nl).replace(/seu interesse romântico/gi,nl).replace(/o interesse romântico/gi,nl).replace(/O interesse romântico/gi,nl);
  if(['k9_love_message','k9_love_visit','k9_love_intimate','k9_love_goodbye','k9_love_brief'].includes(id)){
   text=text.replace(/\b[Aa] pessoa\b/g,nl).replace(/\bessa pessoa\b/g,nl);
   text=text.replace('Você abre a conversa. '+nl+' espera','Você abre a conversa. '+nl+' espera');
   if(id==='k9_love_message')choices=choices.map(c=>({...c,text:c.text.replace(/a pessoa/gi,nl)}));
  }
 }else if(id==='k9_invites')text=text.replace(/Seu interesse romântico, caso esteja vivo, envia uma mensagem particular perguntando se pode encontrar você em casa antes de sair\./,'Você confere as mensagens de seus amigos. Não há novo convite amoroso nesta noite.');
 if(id==='k9_city_arrive')choices=choices.map(c=>c.text.includes('interesse romântico')?{...c,text:'Procurar '+(nl&&people(s,'cidade').includes(lv)?nl:name(guest(s,'cidade')||'um amigo próximo'))+' na praça'}:c);
 // Presença real e conjugação: remover hipóteses narradas como "se estiver presente".
 if(id==='k9_city_social'){
   const city=people(s,'cidade');const isa=city.includes('isabella'),ray=city.includes('rayssa');
   if(isa&&ray){
    text=`As flores do memorial municipal se misturam à música do palco. Isabella para ao lado de Rayssa e observa uma família que acaba de fotografar o mural.\n\nIsabella: — É estranho, né? Ver gente sorrindo pra foto ali.\n\nRayssa: — Acho que tão tentando seguir em frente.\n\nIsabella: — Você consegue?\n\nRayssa: — Não sei.\n\nIsabella: — Eu também não.\n\nIsabella encosta o ombro no de Rayssa. A amiga não se afasta. As duas permanecem juntas enquanto uma cantora começa outra música.\n\nA segurança passa em direção aos bastidores, onde um funcionário confere cabos atrás do telão.`;
   }else{
    text=`A música chega do palco e algumas pessoas depositam flores no memorial da praça. ${city.length?'Você encontra '+city.map(name).join(', ')+', que também escolheram acompanhar a homenagem.':'Você percorre as barracas sem encontrar um dos oito amigos por perto.'}\n\n${ray?'Rayssa observa as fotografias das vítimas e engole uma resposta que parecia pronta.\n\nRayssa: — Eu queria que essa noite fosse menos estranha.':isa?'Isabella observa o acesso dos bastidores e aponta os funcionários que monitoram o telão.\n\nIsabella: — Espero que tenham alguém cuidando da segurança daqui.':''}\n\nUm técnico apressa o passo perto das caixas de som. Você ainda não sabe que a apresentação será interrompida.`;
   }
 }
 if(id==='k9_reunion_luto'&&!Object.keys(f).some(x=>x.startsWith('c9_morto_')&&f[x]))text=text.replace(/Ryan, se está presente, tenta fazer uma brincadeira para aliviar a tensão, mas ninguém ri por muito tempo\./,people(s,'casa').includes('ryan')?'Ryan tenta fazer uma brincadeira para aliviar a tensão, mas a voz falha antes da última palavra.':'Os sobreviventes procuram notícias dos feridos, sem fingir que o perigo passou.');
 if(id==='k9_city_doubt'||id==='k9_house_doubt'){
   const list=(id==='k9_city_doubt'?people(s,'cidade'):people(s,'casa')).filter(x=>x!==f.c9_suspeito&&x!==f.c9_refem);
   if(list.length>=2)text=text.replace('Você encontra duas pessoas que não reagem do mesmo jeito quando descreve a divergência mencionada por Bella.',
   'Você chama '+name(list[0])+' e '+name(list[1])+' para conversar sobre o registro de Bella. As duas pessoas reagem de maneiras diferentes.');
 }
 if(id==='k9_house_warning'){
  const g=guest(s,'casa',['laisla','rauanny','ryan','allan','breno','samuel','isabella']);
  if(g)text=text.replace('PONTO DE VISTA: UM SOBREVIVENTE NA CASA','PONTO DE VISTA: '+name(g).toUpperCase());
 }
 // O jogo só imprime a seção "PONTO DE VISTA" para NPCs controlados.
 return {...res,text,choices};
}
function narrativeBridge(s,id){const last=same(s);if(!last||last.to!==id||last.from===id||!idIs(last.from))return '';if(last.from.startsWith('k9_ice_'))return '';return choiceScene(s,last);}
window.UG9=Object.freeze({...old,
 onChoice(s,id,c,...rest){old.onChoice?.(s,id,c,...rest);if(!idIs(id)||!s?.flags)return;const n=window.UG9.resolve(id,s,window.NODES[id]);const i=(n?.choices||[]).findIndex(x=>x.text===c.text&&x.to===c.to);s.flags.c9_last_choice={from:id,to:c.to,i,text:c.text};},
 resolve(id,s,n){let base=old.resolve(id,s,n);if(!idIs(id)||!s?.flags)return base;base=riskNarrative(s,id,base);base=scrubAndPersonalize(id,s,base);
   const bridge=narrativeBridge(s,id);
   if(bridge&&id!=='k9_final')base={...base,text:bridge+'\n\n'+base.text};
   if(bridge&&id==='k9_final')base={...base,text:bridge+'\n\n'+base.text};
   // Diálogos escolhidos no celular também recebem cartão vermelho, em vez de virarem prosa.
   base={...base,text:base.text.replace(/\b(Você|Ryan|Breno|Rayssa|Rauanny|Laisla|Isabella|Allan|Samuel) \(mensagem\):\s*—/g,'$1: —')};
   return base;
 }
});
})();
