/* O ÚLTIMO GRITO · V1.6.1 · Diálogos completos do prólogo, correção da cafeteria e ponte T1→T2. */
(()=>{'use strict';
const nodes=window.NODES,history=window.HISTORIA;
if(!nodes||!history)return;
const epilogueNode='k10_55';

const ANSWERS={
  "p03": [
    "Você: — Ah, parem. A Jullia convidou a gente porque gosta de vocês, não pra virar alvo de piada.\n\nRayssa: — Obrigada! Era exatamente isso que eu tava tentando falar.\n\nRyan levanta as mãos em rendição.\n\nRyan: — Tá bom, tá bom. Hoje a gente se comporta... pelo menos na entrada.\n\nO grupo segue em direção à porta, ainda sorrindo, mas um pouco mais cuidadoso.",
    "Você: — Vocês duas ainda vão acabar processadas por excesso de stories. E o Ryan vai testemunhar contra vocês.\n\nRyan: — Ei, eu fui contratado como juiz, não como testemunha!\n\nRauanny: — Então paga meu advogado, engraçadinho.\n\nLaisla revira os olhos, rindo. A brincadeira diminui a tensão enquanto vocês chegam à porta.",
    "Você diminui o passo para acompanhar Breno.\n\nVocê: — Não precisa se obrigar a gostar de todo mundo. Eu te conheço.\n\nBreno: — É, mas às vezes parece que eu estrago o clima só por ficar quieto.\n\nVocê: — Se começar a ficar ruim, me chama. A gente sai pra respirar.\n\nEle concorda com um sorriso e entra ao seu lado."
  ],
  "p05": [
    "Você: — Jullia, tá tudo bem? Tipo, de verdade? Não precisa fingir só porque tem gente olhando.\n\nJullia mexe na pulseira, desconfortável.\n\nJullia: — Você sempre escolhe a pergunta mais difícil, né?\n\nRayssa: — A gente pode ir lá pra dentro conversar um pouco, se quiser.\n\nJullia respira fundo e concorda em se afastar da música.",
    "Você: — Olha, eu sei que deve ter dado um trabalho absurdo organizar tudo. Tá muito bonito.\n\nJullia: — Foi minha mãe que resolveu metade das coisas. Eu nem escolhi essa música.\n\nVocê: — Então escolhe pelo menos uma coisa hoje. O resto não precisa decidir por você.\n\nO sorriso dela é pequeno, mas sincero, antes de te convidar para um canto mais tranquilo.",
    "Você: — E o Moisés? Ele ainda não apareceu?\n\nJullia para de procurar entre os convidados.\n\nJullia: — Não sei se ele vem. E quer saber? Agora eu não quero pensar nele.\n\nRayssa: — Então vamos pegar uma água e mudar de assunto.\n\nVocê concorda, sem insistir na pergunta que claramente a machucou.",
    "Você: — Bella, posso te perguntar uma coisa? A Jullia parece tão nervosa... é impressão minha?\n\nBella observa a irmã antes de responder.\n\nBella: — Não é impressão. Só não faz dela um assunto de fofoca, tá?\n\nVocê: — Não tô tentando. Quero ajudar.\n\nBella relaxa um pouco os ombros e te chama para conversar perto da escada."
  ],
  "p04c": [
    "Você: — Se quiser ficar comigo, fica. Não vou te abandonar numa festa só porque tem música alta.\n\nBreno: — Você fala isso como se fosse fácil.\n\nVocê: — É fácil. Difícil vai ser aguentar as piadas do Allan a noite inteira.\n\nBreno ri e te acompanha até o salão."
  ],
  "p06a": [
    "Você: — Depois que isso aqui acalmar, eu volto pra gente conversar. Nem que seja por cinco minutos.\n\nJullia: — Promete?\n\nVocê: — Prometo. Não precisa carregar a festa inteira nas costas.\n\nEla aperta sua mão antes de conduzir vocês à sala de música, longe dos convidados."
  ],
  "p07": [
    "Você se aproxima da piscina e aponta para o celular de Rauanny.\n\nVocê: — Se a foto tá tão ruim assim, a solução é tirar outra. Eu posso bater a próxima.\n\nLaisla: — Desde que você não poste sem me mostrar!\n\nRyan: — Pronto, contrataram uma fotógrafa profissional por um salgado.\n\nOs três abrem espaço para você na conversa.",
    "Você encontra Allan puxando Samuel pela manga.\n\nVocê: — Allan, eu aposto que se você dançar primeiro, o Samu pelo menos ri.\n\nSamuel: — Não faz aposta com minha dignidade, não.\n\nAllan: — Já perdi a conta das vezes que eu fiz isso.\n\nVocê fica com os dois e o assunto muda para a música e quem vai dirigir na volta.",
    "Você atravessa o jardim até a grade do deck, onde Breno está isolado.\n\nVocê: — Fugindo do Allan?\n\nBreno: — Fugindo do barulho. Mas você pode ficar.\n\nVocê encosta ao lado dele. Por um tempo os dois apenas olham as luzes refletidas na água.",
    "Você sobe para a varanda e encontra Isabella tentando pegar o celular de Rayssa.\n\nVocê: — Eu vim conversar, mas posso esperar o julgamento dessa foto acabar.\n\nIsabella: — Finalmente alguém do meu lado!\n\nRayssa: — Você nem viu a foto!\n\nAs duas riem e abrem espaço para você se aproximar."
  ],
  "p08a": [
    "Você: — Ryan, se você é o juiz, eu exijo audiência particular.\n\nRyan: — Gostei desse processo. É sobre danos morais ou sobre meu charme irresistível?\n\nVocê: — Depende de como você vai se comportar.\n\nEle ri e se afasta contigo para a parte mais silenciosa da piscina.",
    "Você: — Rauanny, tenho que admitir que aquela foto nem tá tão ruim. Mas a Laisla tem direito a um recurso.\n\nRauanny: — Tá vendo? Alguém sensato!\n\nLaisla: — Vocês combinaram isso, né?\n\nVocê puxa outra cadeira, e Rauanny aproveita para contar o que a irritou de verdade.",
    "Você: — Vocês resolvam esse tribunal, eu vou pegar água antes que alguém passe mal de tanto discutir.\n\nLaisla: — Traíra!\n\nRyan: — Testemunha dispensada, meritíssimo.\n\nVocê sai rindo, deixando os três em paz, e volta para a festa."
  ],
  "p08b": [
    "Você: — Samuel, para com essa história de beber e depois dirigir. Se quiser, a gente dá um jeito na volta, mas não vai pegar volante bêbado.\n\nSamuel: — Porra, é só um copo.\n\nAllan: — É por isso que eu tô falando desde o começo, Sam. Não faz eu ser o chato da história.\n\nSamuel fica irritado, mas afasta a bebida da mesa. Allan olha para você, agradecido.\n\nVocê: — Eu tô falando sério. Não quero ninguém se machucando por uma besteira.",
    "Você sente vontade de dizer alguma coisa sobre o copo, mas o clima entre os dois está pesado.\n\nVocê: — Eu vou procurar o resto do pessoal. Vocês vêm depois?\n\nAllan: — Eu vou. E você, Samuel, lembra que vai dirigir, tá?\n\nSamuel solta um resmungo e diz que sabe o que faz. Você sai sem insistir, incomodado com a própria escolha."
  ],
  "p08c": [
    "Você: — Eu confio em você, Breno. E não precisa fingir ser outra pessoa só pra agradar esse povo.\n\nBreno: — Às vezes eu acho que só você percebe quando eu tô mal.\n\nVocê: — Então fala comigo, porra. Não vou adivinhar tudo.\n\nEle ri, passa a mão no rosto e aceita caminhar contigo pelo deck.",
    "Você: — Tá achando que alguém tá escondendo alguma coisa?\n\nBreno: — Não sei. Só sinto que ninguém tá ouvindo a Jullia hoje.\n\nVocê: — Não é pouca coisa. Depois da festa a gente pode falar com ela.\n\nBreno concorda. O comentário fica ecoando na sua cabeça enquanto você retorna ao salão."
  ],
  "p08d": [
    "Você: — A Rayssa tá certa. A Jullia tá se esforçando demais pra fingir que tá feliz.\n\nRayssa: — Obrigada. Eu tô ficando preocupada de verdade.\n\nIsabella: — Tá, eu sei. Só não dá pra obrigar ela a se abrir.\n\nVocê: — Não. Mas dá pra não deixar ela sozinha no meio dessa multidão.\n\nRayssa olha para você como se quisesse dizer mais alguma coisa e te chama para o canto da varanda.",
    "Você: — Eu entendo a Isa. A gente não vai resolver os problemas de namoro da Jullia na marra.\n\nIsabella: — Exatamente. A gente ajuda sem fazer interrogatório.\n\nRayssa: — Eu sei... Só não queria que ela passasse a noite se sentindo abandonada.\n\nVocê: — Então a gente fica de olho. Se ela pedir, a gente escuta.\n\nIsabella acena, e vocês encerram a conversa antes de voltar à música."
  ],
  "px_ryan": [
    "Você: — Talvez eu goste, sim. E talvez você não precise fazer piada pra esconder quando fica nervoso.\n\nRyan demora a responder, surpreso.\n\nRyan: — Caramba... você joga sujo. Eu tava tentando parecer misterioso.\n\nVocê: — Tá funcionando mais ou menos.\n\nEle ri e se aproxima um pouco, antes de vocês voltarem para o salão.",
    "Você: — Eu gosto da sua companhia, idiota. Mas principalmente quando você para de fazer stand-up por cinco minutos.\n\nRyan: — Cinco? Exigente. Eu consigo três, no máximo.\n\nVocê: — Então a gente começa com três.\n\nEle bate seu ombro de leve e acompanha você de volta, visivelmente mais à vontade."
  ],
  "px_rauanny": [
    "Você: — Comigo você pode baixar a guarda, Rauanny. Não precisa ser a forte do grupo o tempo todo.\n\nRauanny: — Você vai se arrepender de dizer isso quando eu começar a reclamar de tudo.\n\nVocê: — Pode reclamar. Eu escuto.\n\nEla solta o ar como se tivesse prendido fazia tempo e encosta a mão na sua antes de vocês saírem da piscina.",
    "Você: — Mas você já disse isso pra Laisla? Sem gritar, quero dizer.\n\nRauanny: — Engraçadinho. Acho que não. Eu só fico esperando ela perceber.\n\nVocê: — Então fala. Ela não lê pensamento.\n\nRauanny concorda, ainda um pouco emburrada, e promete tentar conversar com a amiga."
  ],
  "px_breno": [
    "Você encosta os dedos nos de Breno sobre a grade. Ele não se afasta.\n\nBreno: — Você tem noção de como me deixa nervoso fazendo isso?\n\nVocê: — Um pouco. Não é ruim, né?\n\nEle sorri, corado, e aperta sua mão por um segundo antes de voltar a caminhar ao seu lado.",
    "Você: — Então para de achar que vai sobrar, porque eu vou sentir sua falta se você sair. De verdade.\n\nBreno: — Eu queria acreditar nisso toda vez que eu entro num lugar.\n\nVocê: — Pode começar acreditando agora.\n\nEle guarda a frase e aceita voltar com você para a festa."
  ],
  "px_rayssa": [
    "Você segura a mão de Rayssa sem fazer alarde. Ela olha para os dedos de vocês e depois para seu rosto.\n\nRayssa: — Você sempre sabe quando eu tô tentando parecer bem.\n\nVocê: — Não precisa comigo.\n\nO sorriso dela é tímido. Vocês ficam próximos mais alguns segundos, antes de voltar para os convidados.",
    "Você: — A amizade de vocês duas é bonita. Dá pra perceber que uma se importa de verdade com a outra.\n\nRayssa: — A Isa finge que não, mas ela me aguenta até nos piores dias.\n\nVocê: — Então cuida dela também.\n\nRayssa promete, sem imaginar o peso que essa frase ainda vai ter."
  ],
  "p09": [
    "Você: — Chega, gente. A Jullia pode ouvir vocês. Ela convidou todo mundo com a maior boa vontade.\n\nSamuel: — Nossa, agora virou advogado dela?\n\nAllan: — Não, só virou uma pessoa com noção.\n\nAntes que você responda, a porta da cozinha se abre. Jullia ouviu o suficiente para entender o assunto.",
    "Você baixa os olhos, incomodado com as piadas, mas não encontra coragem para interromper.\n\nBreno percebe seu desconforto.\n\nBreno: — Alguém devia falar pra eles pararem.\n\nVocê: — Eu sei...\n\nJullia aparece na passagem. Você percebe tarde demais que o silêncio também teve consequências.",
    "Você: — Samuel, já deu. Ela tá tentando fazer a festa funcionar e vocês só sabem falar mal.\n\nSamuel: — Eu só tô dizendo o que todo mundo pensa.\n\nAllan: — Não fala por mim, não.\n\nJullia surge atrás do grupo antes que a discussão termine. O olhar dela diz que ouviu tudo."
  ],
  "p10a": [
    "Você: — Jullia, espera. Eu tentei cortar o assunto porque achei aquilo muito escroto.\n\nJullia: — Eu ouvi você. Só não sei se consigo separar o que cada um falou agora.\n\nRayssa: — A gente devia deixar ela respirar.\n\nJullia olha para você por um instante e caminha para a entrada, decidida a encerrar a festa do grupo."
  ],
  "p10b": [
    "Você: — Eu me calei e isso foi errado. Não concordava com aquilo, Jullia.\n\nJullia: — Mas deixou acontecer na minha casa. Vocês acham que eu sou idiota?\n\nVocê: — Não. Eu achei que ia piorar se eu entrasse no meio.\n\nJullia: — Pois piorou.\n\nEla se afasta com os olhos cheios de lágrimas. Você não encontra mais nada convincente para dizer."
  ],
  "p10c": [
    "Você: — Desculpa, Jullia. Eu devia ter parado o Samuel antes.\n\nJullia: — Eu ouvi tudo, {nome}. Não dá pra tirar as palavras do ar.\n\nSamuel: — Eu só tava brincando...\n\nAllan: — Não, Sam. Não tava.\n\nA discussão termina quando Jullia aponta para a porta, exigindo que o grupo saia."
  ],
  "p11": [
    "Você: — Antes de ir, eu preciso te pedir desculpa. Não foi justo o jeito que te trataram.\n\nJullia: — Eu sei que você não falou tudo aquilo. Mas eu preciso que vocês saiam agora.\n\nVocê concorda, mesmo querendo insistir. Rayssa acompanha o grupo, chorando baixinho.",
    "Você passa um braço pelos ombros de Rayssa.\n\nVocê: — Ela tá machucada. Vamos dar um tempo. Amanhã a gente tenta conversar direito.\n\nRayssa: — Tomara que ela ainda queira.\n\nA porta da mansão se fecha atrás de vocês. Ninguém volta a falar alto.",
    "Você tenta responder a Jullia, mas não sabe por onde começar.\n\nVocê: — Vamos embora, pessoal. Não adianta piorar as coisas agora.\n\nAllan: — Eu não acredito que terminou assim.\n\nSamuel passa por vocês sem olhar para trás, e todos seguem pela alameda."
  ],
  "p15": [
    "Você: — Samuel, larga esse copo, caralho. Você vai dirigir por essa estrada estreita? Não tô brincando.\n\nSamuel: — Eu sei dirigir, {nome}. Para de agir como minha mãe.\n\nAllan: — Escuta pelo menos uma vez na vida!\n\nSamuel resmunga, irritado, e você insiste até vê-lo afastar o copo.",
    "Você: — Sam, dá uma segurada. Essa estrada é cheia de curva e tá escuro pra caramba.\n\nSamuel: — Relaxa. Eu já conheço.\n\nVocê: — É justamente quando a gente acha que conhece que acontece merda.\n\nAllan concorda em voz baixa, mas Samuel continua dirigindo.",
    "Você se vira para Breno, inquieto.\n\nVocê: — O que aconteceu com a Jullia foi horrível. Você acha que dava pra ter feito diferente?\n\nBreno: — Dava pra ter escutado ela. Era o mínimo.\n\nVocê: — Quando isso acabar, eu quero tentar pedir desculpa.\n\nBreno suspira, sem perceber que a música da van está ficando alta demais."
  ],
  "p17": [
    "Você: — GENTE, CALA A BOCA UM SEGUNDO! Samuel tá dirigindo!\n\nRyan: — Tá, foi mal!\n\nIsabella: — Meu celular tá encharcado, mas tá.\n\nSamuel ainda está olhando pelo retrovisor. Você vê os faróis iluminarem algo na curva e prende a respiração.",
    "Você: — SAMUEL, OLHA PRA FRENTE! AGORA!\n\nSamuel: — O quê?!\n\nAllan segura o banco com força.\n\nAllan: — SAMU, NÃO!\n\nOs faróis alcançam uma silhueta no asfalto antes que alguém consiga agir.",
    "Você se vira para ver o refrigerante derramado.\n\nVocê: — O que vocês fizeram agora?\n\nRauanny: — Foi sem querer!\n\nQuando se volta para a frente, o rosto de Samuel já perdeu a cor. O som dos pneus no asfalto corta sua pergunta."
  ],
  "p19": [
    "Você força a porta e tenta sair sem tropeçar nos próprios pés.\n\nVocê: — Tem alguém lá fora. Eu vou ver!\n\nBreno: — Cuidado. Não chega correndo em cima dela.\n\nRayssa empurra a porta atrás de vocês, desesperada por descobrir quem foi atingido.",
    "Você: — ALGUÉM LIGA PRA EMERGÊNCIA! AGORA!\n\nAllan pega o telefone, mas as mãos dele tremem tanto que mal consegue desbloquear.\n\nIsabella: — Espera, a gente precisa entender o que aconteceu...\n\nVocê: — Depois! Primeiro vê se a pessoa tá viva.\n\nO grupo finalmente sai da van.",
    "Você: — Todo mundo tá bem? Alguém se machucou? Responde!\n\nLaisla: — Acho que eu bati o joelho, só isso.\n\nRauanny: — Eu tô bem, tô bem...\n\nAllan: — Mas e quem tava na estrada?\n\nVocê olha para a silhueta caída e corre ao encontro de Rayssa."
  ],
  "p21": [
    "Você: — Ela pode estar respirando. ALGUÉM CHAMA SOCORRO, PORRA!\n\nRayssa: — Obrigada. Pelo amor de Deus, alguém faz alguma coisa.\n\nSamuel: — Eu... a gente vai se ferrar...\n\nVocê: — Primeiro tenta salvar a vida dela. Depois a gente responde pelo resto.\n\nIsabella tenta te afastar por medo da polícia, e a discussão se intensifica.",
    "Você: — Não adianta gritar todo mundo junto. Vamos conferir se ela respira e chamar ajuda.\n\nBreno: — Eu tentei, mas não consigo ter certeza!\n\nAllan: — Então precisa de uma ambulância. É simples.\n\nIsabella: — Não é simples! Vão perguntar quem dirigia!\n\nVocê percebe o grupo se dividindo, enquanto Jullia permanece imóvel.",
    "Você: — Samuel, você tirou os olhos da pista! Eu falei pra parar!\n\nSamuel: — Você acha que eu queria isso?!\n\nAllan entra entre vocês.\n\nAllan: — Parem de se atacar! A Jullia tá ali, caralho!\n\nVocê se afasta alguns passos para não piorar a briga, mas o peso da culpa continua."
  ],
  "p23": [
    "Você: — O Breno e a Rayssa têm razão. A gente precisa de ajuda de verdade.\n\nRayssa: — Eu não vou aceitar que a gente simplesmente desista dela.\n\nSamuel: — E quando a polícia chegar? Vão prender todo mundo.\n\nVocê: — Se for preciso, a gente conta o que aconteceu.\n\nIsabella fecha os olhos, apavorada com o que essa decisão significa.",
    "Você: — Isabella, você tá falando que a gente não pode ligar. Então qual é a sua ideia?\n\nIsabella: — Eu não tenho uma solução, tá? Só sei que isso vai destruir a vida de todo mundo.\n\nBreno: — E deixar ela aqui vai melhorar o quê?\n\nNinguém responde. A estrada parece mais deserta a cada minuto.",
    "Você abre os braços entre os amigos.\n\nVocê: — Ninguém vai sair correndo sozinho agora. Se a gente fizer alguma coisa, vai ser junto.\n\nAllan: — Eu tô aqui. Só não vou fingir que esconder um corpo é salvar alguém.\n\nSamuel olha para o compartimento da van. Sua expressão anuncia uma ideia horrível."
  ],
  "p25": [
    "Você: — Não. Chega. Ela pode estar viva! Se vocês levarem ela pro lago, isso vira outra coisa.\n\nBreno: — Alguém tem que ouvir. Ela ainda não teve ajuda.\n\nSamuel: — Para, por favor! Eu tô tentando pensar em como a gente sai vivo dessa!\n\nA briga só piora, até que Samuel parte para o compartimento de carga e os outros hesitam.",
    "Você olha para Jullia e tenta falar, mas a voz não sai.\n\nBreno: — Ei, {nome}. Eu sei. Eu também tô com medo.\n\nVocê: — Eu... eu não sei o que fazer.\n\nRayssa começa a chorar mais forte, e Samuel aproveita o silêncio para falar do lago. Você percebe tarde demais que não impedir também é escolher.",
    "Você: — Eu não quero isso. Mas tô com medo de que a polícia não acredite na gente.\n\nRayssa: — Você tá ouvindo o que tá dizendo?\n\nSamuel: — Obrigado. Pelo menos alguém entende o perigo.\n\nBreno se afasta de você sem discutir. A expressão dele machuca mais do que um grito."
  ],
  "p28": [
    "Você: — Eu não vou conseguir esquecer. Mesmo se a gente nunca falar disso, a culpa vai ficar.\n\nBreno: — Eu sei. Eu também vou lembrar até morrer.\n\nSamuel: — Então guarda isso pra você.\n\nVocê: — Eu não tô prometendo que vou ficar bem, Sam. Só tô prometendo que vou sair daqui hoje.\n\nO grupo se dispersa na direção da van, destruído pelo que acabou de fazer.",
    "Você: — Eu só quero impedir que mais alguém se machuque. Se a polícia vier atrás da gente, vou tentar proteger meus amigos.\n\nAllan: — Proteger não é o mesmo que mentir pra sempre.\n\nSamuel: — Hoje é o que dá pra fazer.\n\nVocê concorda sem convicção e segue os outros para a van.",
    "Você: — Um dia isso vai voltar. A gente não pode passar a vida inteira fingindo que não aconteceu.\n\nIsabella: — Não começa essa conversa agora.\n\nBreno: — Não. Deixa falar. É a primeira coisa sincera que a gente ouviu em uma hora.\n\nSamuel baixa a cabeça, exausto, enquanto vocês caminham de volta para a estrada."
  ],
  "rev_p_van": [
    "Você senta ao lado de Breno e o ajuda a abrir espaço para a mochila.\n\nVocê: — Tava guardando lugar mesmo ou era só desculpa pra não ficar sozinho?\n\nBreno: — Talvez os dois.\n\nVocê: — Justo. Então vamos juntos.\n\nEle sorri enquanto Allan começa a reclamar da playlist.",
    "Você chega fazendo a festa no banco de trás.\n\nVocê: — Se vocês não deixarem eu escolher uma música, eu desço agora.\n\nAllan: — Isso é chantagem emocional!\n\nRyan: — Funciona, infelizmente.\n\nO grupo te abre espaço entre piadas e cotoveladas.",
    "Você senta perto das duas e aponta para o presente embrulhado.\n\nVocê: — Vai dizer que vocês não brigaram por causa desse laço?\n\nIsabella: — A Rayssa insistiu em rosa. Foi uma discussão séria.\n\nRayssa: — A Jullia ama rosa!\n\nVocê: — Então ela vai gostar. As duas riem e te contam por que escolheram o presente."
  ],
  "rev_p_jullia_festa": [
    "Você: — Se você quer viajar com a Bella, faz isso. Não precisa esperar a vida ficar perfeita.\n\nJullia: — Eu queria muito. A gente fala disso desde criança.\n\nBella: — E eu já separei as músicas do carro. Péssimas, obviamente.\n\nAs irmãs riem; você promete cobrar a viagem quando o verão acabar. Por alguns segundos, Jullia parece aliviada.",
    "Você: — Não precisa enfrentar tudo sozinha, Jullia. Se o Moisés tá sendo um babaca, você pode falar com a gente.\n\nJullia: — Eu nem sei por onde começar.\n\nRayssa: — Começa quando quiser. Ninguém aqui precisa ter uma solução agora.\n\nJullia concorda, emocionada, e decide voltar à festa antes de chorar.",
    "Você: — Lembra daquela apresentação da escola quando o Allan esqueceu o texto?\n\nJullia começa a rir antes mesmo de você terminar.\n\nJullia: — Ele inventou três personagens que nem existiam!\n\nBella: — E o pior é que todo mundo aplaudiu.\n\nA lembrança faz os quatro rirem e devolve à sala uma leveza rara naquela noite."
  ],
  "rev_p_bella_sala": [
    "Você: — Eu prometo que vou tentar fazer ela rir hoje. Não é só por causa da festa.\n\nBella: — Obrigada. Só não tenta forçar, tá? Às vezes ela só quer que alguém sente do lado.\n\nVocê: — Eu sei. A gente se vê depois.\n\nBella te acompanha até a sala de música, onde Jullia ainda conversa com os amigos."
  ],
  "v160_jullia_p05": [
    "Você: — Eu quero ouvir. Como seria essa cafeteria?\n\nJullia: — Pequena. Uma estante enorme cheia de livro de segunda mão, bolo que a Bella ia criticar e café forte pra aguentar os clientes chatos.\n\nVocê: — Então eu ia virar cliente fixo.\n\nJullia ri de verdade.\n\nJullia: — Sério? Eu ia deixar a primeira mesa reservada pra você. Até se eu queimasse todos os bolos.\n\nA música muda na sala ao lado. Ela agradece por você ter ouvido e chama o grupo para um lugar mais tranquilo.",
    "Você: — A vida é sua, Jullia. Você pode escolher o que quer fazer, mesmo que a sua família prefira outra coisa.\n\nJullia: — Falar é fácil. Mas... obrigada. Acho que eu precisava ouvir alguém dizer isso sem me tratar como criança.\n\nVocê: — Então começa contando da cafeteria pra Bella. Ela vai te ajudar a planejar tudo.\n\nJullia: — Vai me cobrar vinte por cento dos lucros, a desgraçada.\n\nVocês riem e seguem para a sala mais silenciosa da casa.",
    "Você: — Quer saber? Vamos comer alguma coisa e fingir que a festa é só nossa por cinco minutos.\n\nJullia: — Isso foi a melhor proposta da noite.\n\nRayssa chega com duas bebidas e estranha o sorriso dela.\n\nRayssa: — O que eu perdi?\n\nJullia: — Só a primeira ideia boa que ouvi hoje.\n\nVocês se afastam da escada e entram na sala de música para conversar mais um pouco."
  ]
};

const DESTINATIONS={"v160_jullia_p05": "rev_p_jullia_festa", "rev_p_bella_sala": "rev_p_jullia_festa"};

const responseTargets=[];
for(const [source,answers] of Object.entries(ANSWERS)){
 const n=nodes[source];if(!n)throw new Error('Cena original ausente: '+source);
 for(let i=0;i<answers.length;i++){
  if(!answers[i])continue;
  const option=n.choices?.[i];if(!option)throw new Error('Escolha ausente em '+source+':'+i);
  const destination=DESTINATIONS[source]||option.to;
  if(!nodes[destination])throw new Error('Retorno inválido '+destination+' em '+source);
  const id=`v161_dialogo_${source}_${i}`;
  const continuation=(source==='v160_jullia_p05')?'Voltar aos amigos e continuar a noite':source==='rev_p_jullia_festa'?'Encerrar a conversa e voltar ao salão':'Seguir para a próxima cena';
  const text=answers[i];
  const response={id,chapter:n.chapter,location:n.location,time:n.time,scene:n.scene,speaker:'NARRAÇÃO',text,choices:[{text:continuation,to:destination,effects:[]}]};
  nodes[id]=response;history.push(response);
  option.to=id; // Preserve original effects and choice history.
  responseTargets.push({source,index:i,id,destination});
 }
}
// Avoid a replay of the main entrance for players already saved inside the cafeteria scene.
// Saved node IDs remain compatible. The original rewards remain in the original choice.
// Reações de personalidade em momentos específicos, sem repetir uma frase igual após toda escolha.
const emotionalTemperament={
 'v161_dialogo_p08b_0':{
  protetor:'Você confere se Samuel realmente afastou o copo. Allan percebe que você não estava só querendo vencer uma discussão.',
  observador:'Você repara que o copo não está vazio e lembra a si mesmo de conferir quem vai dirigir na volta.',
  franco:'Você sustenta o olhar de Samuel. Não vai amenizar o aviso só para preservar o humor da festa.',
  impulsivo:'Você percebe pelo rosto do Allan que levantou a voz mais do que pretendia, mas não retira o alerta.'
 },
 'v161_dialogo_p08d_0':{
  protetor:'O jeito de Rayssa apertar o celular te faz pensar que ela está carregando a preocupação pela amiga sozinha.',
  observador:'Você percebe a maneira como Isabella olha para Rayssa antes de discordar: ela também está preocupada, só demonstra de outro jeito.',
  franco:'Você avisa que fingir não perceber a tristeza de Jullia não é respeitar seu espaço.',
  impulsivo:'Sua vontade é procurar Jullia na mesma hora, mas Rayssa pede que dê a ela mais alguns minutos.'
 },
 'v161_dialogo_p19_1':{
  protetor:'Você tenta manter a voz firme para não aumentar o pânico de quem ainda está preso na van.',
  observador:'Você vê onde o telefone caiu e aponta para Allan sem perder de vista a pessoa caída no asfalto.',
  franco:'Você deixa claro que nenhuma conversa sobre consequências importa mais do que saber se a vítima respira.',
  impulsivo:'Seu coração dispara tanto que as palavras saem num grito. Você só percebe quando todos olham para você.'
 },
 'v161_dialogo_p28_2':{
  protetor:'A vontade de proteger o grupo não resolve a pergunta que mais te machuca: proteger de quem, e a que custo?',
  observador:'Você observa que cada amigo evita olhar para o lugar onde Jullia desapareceu sob a água.',
  franco:'Mesmo com o silêncio de todos, você não tenta retirar o que disse sobre a verdade.',
  impulsivo:'Você quer correr de volta ao píer e desfazer tudo, mas entende que não existe gesto capaz de apagar a noite.'
 }
};
const fears={
 p19:{perda:'Por um instante, seu medo de perder alguém é maior que qualquer preocupação com a polícia.',abandono:'Você procura a voz dos amigos. Não suporta a ideia de algum deles ficar para trás sem ajuda.',mentira:'A pressa de alguns em explicar o acidente antes de pedir socorro te dá uma sensação horrível.'},
 p21:{perda:'Você tenta não pensar que aquela pode ser a última vez que vê Jullia.',abandono:'A visão de Jullia sozinha no asfalto faz seu estômago revirar.',mentira:'A ideia de inventarem uma versão conveniente dos fatos te parece pior a cada segundo.'},
 p28:{perda:'Você sabe que vai ter medo de perder mais alguém por muito tempo.',abandono:'Mesmo cercado pelo grupo, nunca se sentiu tão isolado.',mentira:'A promessa de silêncio pesa na garganta como uma mentira que não acaba.'}
};
function resolve(id,s,n){
 if(!n||!s)return n;
 let text=n.text;const h=s.hero||{},opts=(n.choices||[]).slice();
 const personal=emotionalTemperament[id]?.[h.temperament];
 if(personal)text+='\n\n'+personal;
 const fearText=fears[id]?.[h.fear];if(fearText)text+='\n\n'+fearText;
 // Personalidade abre escolhas próprias, com resposta escrita e conclusão narrativa.
 const extra={
  p07:{protetor:['Chamar Breno para não ficar isolado perto do deck','v161_traco_protetor']},
  p08b:{franco:['Falar com Samuel sem amenizar o risco de dirigir depois de beber','v161_traco_franco']},
  p08d:{observador:['Perguntar a Isabella por que ela se preocupa com Jullia em silêncio','v161_traco_observador']},
  p10b:{impulsivo:['Interromper Samuel antes que ele piore a situação','v161_traco_impulsivo']}
 };
 // Recupera saves antigos presos no início da festa pelo bug da cafeteria da V1.6.0.
 if(id==='p05'&&s.flags?.v160_jullia_p05_seen&&!s.flags?.v161_cafe_resgatada){
  const past=Array.isArray(s.history)?[...s.history].reverse().find(e=>e.node==='v160_jullia_p05'):null;
  const index=past?nodes.v160_jullia_p05.choices.findIndex(c=>c.text===past.choice):-1;
  if(index>=0){opts.push({text:'Retomar a conversa sobre a cafeteria sem recomeçar a festa',to:`v161_dialogo_v160_jullia_p05_${index}`,effects:[['flag','v161_cafe_resgatada',true]]});}
 }
 const opt=extra[id]?.[h.temperament];
 const traitEffects={protetor:[['bond','breno',5],['trait','empatia',1]],franco:[['bond','allan',4],['bond','samuel',-2],['trait','coragem',1]],observador:[['bond','isabella',4],['trait','cautela',1]],impulsivo:[['bond','samuel',-4],['trait','coragem',1]]};
 if(opt&&nodes[opt[1]]&&!s.flags?.[opt[1]+'_usado']&& !opts.some(x=>x.to===opt[1]))opts.push({text:opt[0],to:opt[1],effects:[['flag',opt[1]+'_usado',true],...(traitEffects[h.temperament]||[])]});
 return text===n.text&&opts.length===(n.choices||[]).length?n:{...n,text,choices:opts};
}
const traitScenes={
 v161_traco_protetor:['p08c','Você vê Breno afastado da música e chama de longe.\n\nVocê: — Ei! Vem com a gente. Se ficar cansado, eu te acompanho pra um lugar mais quieto.\n\nBreno: — Eu achei que ninguém ia reparar. Valeu.\n\nAllan grita que ainda existe espaço para mais uma foto, mas você deixa Breno escolher se quer participar. Ele fica do seu lado.'],
 v161_traco_franco:['p09','Você: — Samuel, tô falando muito sério. Eu gosto de você, mas se beber e dirigir vai colocar todos nós em risco. Se for preciso, eu peço outra carona.\n\nSamuel: — Você tá falando como se eu fosse um criminoso.\n\nVocê: — Tô falando como alguém que não quer ter que te visitar no hospital.\n\nAllan: — Porra, Sam. Escuta pelo menos uma vez.\n\nSamuel larga o copo, contrariado.'],
 v161_traco_observador:['p09','Você nota que Isabella olha para Jullia toda vez que ela passa pelo salão.\n\nVocê: — Você também tá preocupada com ela, né? Só não quer que a Rayssa perceba.\n\nIsabella: — Claro que tô. Mas quando a Ray entra em modo salvadora, ninguém mais consegue respirar.\n\nVocê: — Dá pra cuidar sem invadir.\n\nIsabella concorda e guarda o celular para acompanhar você de volta aos outros.'],
 v161_traco_impulsivo:['p11','Você: — Samuel, cala a boca! A Jullia acabou de ouvir vocês falando mal dela, porra!\n\nSamuel: — Eu só tava brincando!\n\nJullia: — Não. Não tava. E agora eu tô cansada demais pra fingir que não me machucou.\n\nVocê tenta falar mais alguma coisa, mas ela pede que todos deixem a casa. Você obedece, com a respiração acelerada.']
};
for(const [id,[destination,text]] of Object.entries(traitScenes)){
 const anchor=nodes[id==='v161_traco_protetor'?'p07':id==='v161_traco_franco'?'p08b':id==='v161_traco_observador'?'p08d':'p10b'];
 const n={id,chapter:anchor.chapter,location:anchor.location,time:anchor.time,scene:anchor.scene,speaker:'NARRAÇÃO',text:text.replaceAll('\\n','\n'),choices:[{text:'Continuar a conversa',to:destination,effects:[]}]};
 nodes[id]=n;history.push(n);
}
const cast=['rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno'];
function seasonPassport(s){
 if(!s||s.node!==epilogueNode)throw Error('Termine o Capítulo 10 antes de exportar a sua linha do tempo.');
 const f=s.flags||{};
 const isDead=id=>!!window.UG10?.dead?.(s,id);
 const alive=cast.filter(id=>!isDead(id));
 const gone=cast.filter(id=>isDead(id));
 const fateJullia=f.c10_jullia_fim==='presa'?'presa':f.c10_jullia_fim==='fuga'?'foragida':f.c10_jullia_fim==='lago'&&f.c10_pistola?'atingida_no_lago_morte_sob_investigacao':'desaparecida';
 const fateRayssa=isDead('rayssa')?'morta':f.c10_rayssa_justica==='depoimento'?'sob_custodia':f.c10_rayssa_justica==='foragida'||f.c10_rayssa_foragida?'foragida':f.c10_rayssa_justica==='segredo'?'participacao_ocultada':f.c10_rayssa_justica==='independente'?'depoimentos_individuais':'destino_judicial_indefinido';
 const chosenRomance=['ryan','breno','rayssa','rauanny'].includes(s.romanceEscolhido)?s.romanceEscolhido:null;
 const significantKeys=['pacto_culpa','pacto_protecao','prometeu_verdade','prometeu_jullia','conheceu_bella_prologo','promessa_bella_prologo','c10_evidence','c10_heroi_resgate','c10_rayssa_escolha','c10_rayssa_justica','c10_jullia_fim','v160_diego_avisado','v160_diego_registros','v160_diego_contato','v160_diego_alerta_final'];
 const significant=Object.fromEntries(significantKeys.filter(k=>f[k]!==undefined).map(k=>[k,f[k]]));
 return {game:'o-ultimo-grito',kind:'season-passport',format:1,sourceVersion:'1.6.1',season:1,
  exportedAt:new Date().toISOString(),
  protagonist:{name:String(s.hero?.name||'Personagem'),pronouns:String(s.hero?.pronouns||'ele'),look:s.hero?.look||'casual',hair:s.hero?.hair||'curto',temperament:s.hero?.temperament||'observador',fear:s.hero?.fear||'perda',survived:!f.c10_heroi_morto},
  outcomes:{survivors:alive,dead:gone,jullia:fateJullia,rayssa:fateRayssa,romance:chosenRomance,romanceAlive:chosenRomance?!isDead(chosenRomance):null},
  relationships:{protagonist:Object.fromEntries(cast.map(k=>[k,Number(s.bonds?.[k]??50)])),friends:{...(s.friendBonds||{})}},
  evidence:{clueIds:Array.isArray(s.clues)?s.clues.filter(x=>typeof x==='string').slice(0,300):[],significantFlags:significant},
  notice:'Este arquivo registra os resultados da Temporada 1. Ele não substitui o save completo e pode ser importado pelo próximo jogo quando essa função estiver disponível.'
 };
}
window.UG161=Object.freeze({resolve,seasonPassport,responseTargets});
})();
