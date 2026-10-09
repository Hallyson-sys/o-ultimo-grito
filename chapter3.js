/* Capítulo 3 — V0.7 */
(()=>{
const N=(id,location,time,scene,text,choices=[])=>({id,chapter:'CAPÍTULO 03 · NINGUÉM É INOCENTE',location,time,scene,text,choices,speaker:'NARRAÇÃO'});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const E=[];

E.push(N('e01','CASA DE ISABELLA · SALA','09:47','house',`A manhã seguinte amanhece pesada e cinzenta. O curativo improvisado no braço de Rauanny já foi trocado, e ninguém brinca com isso. O telefone fixo desligado, a ligação anônima e o perseguidor da noite passada ainda pairam no ar como um cheiro difícil de espantar.

Isabella espalha sobre a mesa o bilhete, o vídeo da reação de Samuel e as anotações de Breno. Samuel está de pé perto da janela, inquieto. Rayssa permanece sentada no braço do sofá, os olhos inchados. Allan morde a tampa de uma caneta. Laisla não solta Rauanny por muito tempo. Ryan tenta parecer calmo, mas a perna não para de tremer.

Allan: — Tá. Antes que alguém finja que isso vai passar sozinho, vamos admitir logo: tem uma pessoa mascarada correndo atrás da gente e ela claramente sabe o que houve naquela estrada.

Rayssa: — E sabe porque a gente nunca contou pra ninguém.

Samuel fecha os olhos por um segundo.

Samuel: — Rayssa, por favor. Não começa.

Rayssa: — Não começo? Ontem a Rauanny quase morreu, Samuel. Até quando você quer tratar isso como um problema de relações públicas?`,[
C('Ficar ao lado de Rayssa e dizer que ela tem razão','e02a',[['bond','rayssa',5],['bond','samuel',-4],['trait','empatia',1]]),
C('Pedir que Samuel respire e organize a conversa','e02b',[['bond','samuel',4],['bond','rayssa',-2],['trait','cautela',1]]),
C('Interromper os dois e exigir fatos, não gritos','e02c',[['bond','isabella',3],['bond','allan',3]])
]));

E.push(N('e02a','CASA DE ISABELLA · SALA','09:54','house',`Você: — A Rayssa tem razão. A gente tá tratando tudo isso como um escândalo que precisa ser abafado, e não como a porra de uma pessoa que morreu por causa daquela noite.

O silêncio pesa imediatamente. A palavra “morreu” parece arranhar as paredes.

Rayssa abaixa a cabeça e leva a mão à boca.

Rayssa: — Obrigada. Eu sei que ninguém gosta de ouvir, mas foi isso que aconteceu. A gente jogou o corpo da Jullia no lago e deixou a família dela procurando um milagre que nunca vai acontecer.

Samuel: — Você fala como se eu não pensasse nisso todo santo dia.

Rayssa: — Então para de agir como se o maior problema fosse seu nome aparecer num depoimento.

Samuel quase responde, mas desvia o olhar. É a primeira vez que ele parece realmente sem defesa.`,[C('Ouvir o restante do grupo','e03') ]));
E.push(N('e02b','CASA DE ISABELLA · SALA','09:54','house',`Você: — Samuel, respira. Se você perder a cabeça agora, ninguém vai ouvir ninguém. A gente precisa falar disso direito.

Samuel esfrega o rosto com as duas mãos.

Samuel: — Eu sei. Eu sei, caralho. Só tô cansado de ser tratado como se eu fosse o único culpado.

Rayssa: — Você não é o único culpado. Esse é exatamente o problema. Todos nós estamos nisso.

Allan: — Finalmente uma frase em que eu consigo acreditar dos dois lados.

Samuel encara você por alguns segundos.

Samuel: — Tá. Então vamos falar. Mas eu não vou deixar ninguém sair correndo pra polícia sem entender tudo primeiro.

Pelo menos dessa vez ele não parece estar dando uma ordem. Parece estar implorando por controle.`,[C('Continuar a conversa','e03') ]));
E.push(N('e02c','CASA DE ISABELLA · SALA','09:54','house',`Você ergue a voz antes que os dois se afoguem na própria culpa.

Você: — Chega. A gente já sabe que tá todo mundo ferrado. Agora eu quero fatos. Quem nos seguiu? Quem apagou as mensagens da Jullia? E por que aquela voz sabe tanto sobre a estrada?

Isabella solta o ar devagar, quase aliviada por alguém colocar ordem na bagunça.

Isabella: — Obrigada. Era exatamente isso.

Allan: — Nossa, até eu me senti colocado no meu lugar.

Rauanny: — Pela primeira vez desde ontem, parece que a gente tá tendo uma conversa de verdade.

Samuel cruza os braços. Rayssa seca o rosto. A discussão não some, mas muda de forma. Agora ela tem direção.`,[C('Prosseguir','e03') ]));

E.push(N('e03','CASA DE ISABELLA · MESA DA SALA','10:11','house',`Breno gira a tela do notebook para todos verem. No navegador há uma caixa de e-mail antiga aberta, pertencente a Jullia. Parte das mensagens mais recentes está vazia; outras aparecem como “conteúdo indisponível”.

Breno: — Eu usei a data da festa, o nome do Wi‑Fi da propriedade e umas senhas antigas que a Jullia tinha me mostrado num trabalho da escola. Não entrem em pânico: eu não invadi a conta toda. Só achei um encaminhamento automático.

Isabella: — Um encaminhamento pra onde?

Breno: — Pra um computador de backup da marina velha dos Gomes. Aquele galpão perto do lago onde o pai dela guardava barco antigo.

Ryan: — Claro. Porque um psicopata e uma marina abandonada são exatamente o que faltava na nossa vida.

O celular de Samuel vibra. Número desconhecido.

Mensagem: “SE QUEREM SABER O QUE JULLIA TENTOU APAGAR, 19H. MARINA VELHA. VENHAM ANTES DE NÓS.”

Allan: — Tá de sacanagem.

Isabella: — “Antes de nós” não é o tipo de coisa que eu gosto de ler às dez da manhã.`,[
C('Dizer que parece uma armadilha, mas vocês precisam ir preparados','e04a',[['clue','notebook_marina',true],['trait','cautela',1]]),
C('Sugerir ligar para Moisés antes de decidir','e04b',[['bond','isabella',3],['clue','moises_relacao',true]]),
C('Insistir para o grupo não se separar dessa vez','e04c',[['bond','allan',3],['flag','grupo_unido_c3',true]])
]));

E.push(N('e04a','CASA DE ISABELLA · SALA','10:17','house',`Você: — Isso cheira a armadilha. Mas se existe um backup da Jullia lá, a gente precisa ver antes que a pessoa mascarada chegue.

Isabella: — Então a gente vai preparado. Lanternas, celular carregado, dois carros e ninguém bancando herói sozinho.

Samuel: — Nem pensar em polícia agora.

Rayssa: — Você fala isso como se ainda fosse decidir tudo.

Você: — Hoje ninguém decide sozinho. Isso inclui você, Samuel.

Pela primeira vez, ninguém contesta. Talvez porque todos perceberam que o erro mais mortal do verão passado foi cada um agir por impulso.`,[C('Seguir para o fim da tarde','e05') ]));
E.push(N('e04b','CASA DE ISABELLA · COZINHA','10:18','house',`Você pede o telefone de Moisés. Ninguém parece gostar da ideia, mas Isabella liga mesmo assim. Cai na caixa postal na primeira tentativa. Na segunda, ele atende com a voz rouca.

Moisés: — O que foi agora?

Você: — A gente recebeu uma mensagem sobre a marina velha. Você sabe de alguma coisa?

Do outro lado, há uma pausa longa demais.

Moisés: — Eu recebi a mesma mensagem faz quinze minutos.

Samuel: — Coloca no viva-voz.

Moisés ouve a voz dele e ri sem humor.

Moisés: — Ah, então é esse nível de reunião. Escuta: eu não mandei nada. Mas eu vou estar lá às sete. Se a Jullia deixou alguma coisa escondida naquele lugar, eu quero ver antes de vocês destruírem ou esconderem mais alguma merda.

A ligação termina. Ninguém comenta a última frase por alguns segundos.`,[C('Aceitar encontrá-lo lá','e05',[['clue','notebook_marina',true]]) ]));
E.push(N('e04c','CASA DE ISABELLA · SALA','10:17','house',`Você: — Se a gente for, vai todo mundo junto. Não quero repetir a fórmula perfeita pra dar merda: alguém se afasta, alguém some e o resto chega tarde.

Allan: — Finalmente uma decisão com cara de trauma bem assimilado.

Rauanny: — Concordo. E se alguém inventar de sumir, eu mesma arrasto de volta.

Ryan: — Nossa, que reconfortante ouvir isso.

Laisla encosta o ombro em Rauanny.

Laisla: — Ele tá zoando, mas eu também concordo. Ninguém se separa.

Samuel dá um aceno curto, contrariado. Mas aceita. E isso, vindo dele, já parece uma mudança.`,[C('Avançar para a noite','e05',[['clue','notebook_marina',true]]) ]));

E.push(N('e05','ESTRADA DA MARINA VELHA','18:52','road',`O caminho até a marina cheira a mato úmido e ferrugem. A entrada fica escondida atrás de eucaliptos e uma cerca torta. O lago escurece cedo naquele lado de Lakewood, e a água parece um buraco sem fundo.

Dois carros param juntos. Ninguém toca em música. Ninguém finge normalidade.

Samuel pega uma lanterna da van. Allan carrega uma mochila com água, gaze e um canivete minúsculo que ele jura ser “puramente simbólico”. Breno leva o notebook. Isabella segura o próprio celular como se fosse uma arma.

Antes de entrarem, você percebe que algumas pessoas do grupo o observam discretamente, esperando algum tipo de direção.`,[
C('Pedir a Breno para ficar perto de você','e06b',[['bond','breno',4],['romance','breno',4]]),
C('Chamar Ryan para ir ao seu lado','e06r',[['bond','ryan',4],['romance','ryan',4]]),
C('Perguntar se Rayssa quer ficar com você','e06s',[['bond','rayssa',4],['romance','rayssa',4]]),
C('Dizer a Rauanny para não se afastar','e06u',[['bond','rauanny',4],['romance','rauanny',4]])
]));

E.push(N('e06b','ENTRADA DA MARINA','18:56','lake',`Breno segura o notebook com força demais.

Breno: — Você tem certeza? Porque eu topo. Só... não queria parecer que tô me agarrando em você por pânico.

Você: — Pode se agarrar por pânico. Hoje eu não vou reclamar.

Ele ri pelo nariz e se aproxima um pouco mais.

Breno: — Ótimo. Porque se aparecer outra pessoa mascarada, eu pretendo me agarrar por pânico e por desespero.

A frase seria engraçada em qualquer outro dia. Hoje ela só parece honesta.`,[C('Entrar na marina','e07') ]));
E.push(N('e06r','ENTRADA DA MARINA','18:56','lake',`Ryan passa a lanterna de uma mão para a outra.

Ryan: — Você sabe que, quando me chama pra entrar num cenário de filme de terror, isso conta como flerte, né?

Você: — E quando você aceita sem pensar?

Ryan: — Aí conta como prova de que eu sou muito bonito e muito irresponsável.

Apesar do sorriso, ele olha uma vez para o lago e engole em seco.

Ryan: — Sério agora. Eu fico com você. Se acontecer qualquer coisa, eu não vou te deixar sozinho.`,[C('Seguir em frente','e07') ]));
E.push(N('e06s','ENTRADA DA MARINA','18:56','lake',`Rayssa aperta o casaco contra o próprio corpo.

Rayssa: — Eu não queria admitir, mas tava torcendo pra você me chamar. Esse lugar me dá um negócio horrível.

Você: — Então fica perto de mim.

Ela sorri triste, mas verdadeiro.

Rayssa: — Você sempre fala isso como se fosse simples. Como se ficar perto bastasse pra impedir tudo de desandar.

Você: — Hoje talvez não impeça. Mas ajuda.

Rayssa assente e segura seu braço por um instante, como se precisasse confirmar que você está mesmo ali.`,[C('Entrar com Rayssa','e07') ]));
E.push(N('e06u','ENTRADA DA MARINA','18:56','lake',`Rauanny ergue o queixo quando você fala, tentando bancar a durona de sempre.

Rauanny: — Eu ia falar a mesma coisa pra você, sabia?

Você: — Claro que ia.

Rauanny: — Tô falando sério. Depois de ontem, eu não tô afim de brincar de coragem sozinha.

Você: — Então não brinca. Fica comigo.

Ela prende um sorriso torto e ajeita o curativo no braço.

Rauanny: — Se isso aqui virar tragédia de novo, eu vou te culpar por me convencer a vir. Só deixando registrado.`,[C('Seguir até o galpão','e07') ]));

E.push(N('e07','MARINA VELHA · GALPÃO PRINCIPAL','19:08','house',`A marina é maior do que você lembrava: um galpão central com janelas quebradas, um escritório suspenso acima da água e passarelas de madeira rangendo sobre o lago. O cheiro de óleo e ferrugem se mistura ao de lodo.

Moisés ainda não chegou.

No escritório, Breno encontra um computador antigo ligado a um estabilizador. A tela pisca, pede senha e depois reconhece automaticamente um usuário salvo: JG_BACKUP.

Isabella: — JG de Jullia Gomes?

Breno: — Acho que sim. Olha isso.

Pastas com nomes de meses surgem na tela. Uma delas corresponde exatamente ao verão passado. Outra se chama “rascunhos”.

Samuel: — Abre tudo.

Allan: — Nossa, olha que calmo ele. Parece até que não tá a um passo de vomitar a própria culpa.

Enquanto Breno tenta restaurar os arquivos, um ruído metálico ecoa no andar de baixo. Não parece vento.`,[
C('Ficar no escritório e ajudar Breno a recuperar os arquivos','e08a',[['clue','mensagens_restauradas',true],['bond','breno',3]]),
C('Descer com Samuel e Allan para verificar o barulho','e08b',[['bond','samuel',3],['bond','allan',3]]),
C('Pedir que todos permaneçam no mesmo cômodo','e08c',[['flag','insistiu_unidos_marina',true],['trait','cautela',1]])
]));

E.push(N('e08a','ESCRITÓRIO DA MARINA','19:13','house',`Você se inclina ao lado de Breno enquanto ele navega pelos diretórios antigos. Entre capturas de tela e comprovantes, surge uma pasta protegida com data da noite da festa.

Breno: — Tem fragmentos. Não tudo. Algumas mensagens foram apagadas depois.

Na tela aparecem trechos soltos:

“...não deixa ele dirigir...”

“...vi alguém perto da mata...”

“...se eu precisar correr, me encontra...”

Seu peito aperta.

Antes que dê para ler mais, um grito explode do lado de fora. Não é qualquer grito. É um som de pânico puro.`,[C('Correr imediatamente para fora com o notebook','e09',[['flag','levou_notebook_c3',true]]) ]));
E.push(N('e08b','ANDAR DE BAIXO · GALPÃO','19:13','house',`Você desce com Samuel e Allan. As tábuas rangem sob o peso dos três. No escuro entre barcos cobertos por lona, algo se move rápido demais para ser sombra comum.

Allan: — Eu odeio isso. Eu odeio cada segundo disso.

Samuel levanta a lanterna e a luz encontra uma corrente balançando sozinha.

Samuel: — Tem alguém aqui.

No instante seguinte, uma porta bate com violência no andar de cima e um grito corta o galpão. Samuel olha para você, e vocês dois saem correndo de volta.`,[C('Subir correndo','e09') ]));
E.push(N('e08c','ESCRITÓRIO DA MARINA','19:13','house',`Você ergue a voz antes que o grupo se espalhe.

Você: — Ninguém sai desse escritório. Se tem alguém aqui, é justamente isso que essa pessoa quer.

Isabella concorda com um aceno curto. Samuel resmunga, mas não contesta. Breno continua tentando restaurar os arquivos. O problema é que o perigo não respeita sua lógica.

A luz cai. A tela do computador apaga. No breu completo, alguém tromba na porta e um grito vem do corredor — alto, desesperado e muito perto.`,[C('Sair em direção ao grito','e09') ]));

E.push(N('e09','CORREDOR DA MARINA','19:15','forest',`As lanternas se cruzam sem foco. Gente falando ao mesmo tempo. Passos sobre madeira molhada. Lá na frente, uma figura de máscara clara atravessa o corredor e empurra uma estante, bloqueando metade da passagem.

Ryan: — FILHO DA PUTA!

Laisla: — Rau, corre!

Rauanny: — EU TÔ CORRENDO, CARALHO!

O perseguidor se vira de relance. Mesmo por um segundo, a sensação é de ter encarado um rosto vazio.

Você precisa decidir em um impulso.`,[
C('Passar pela estante e perseguir a figura com Samuel','e10a',[['trait','coragem',1],['bond','samuel',2]]),
C('Puxar Breno e levar o notebook junto','e10b',[['trait','cautela',1],['flag','salvou_notebook_c3',true],['bond','breno',5]]),
C('Mandar o grupo se dispersar e buscar outra saída','e10c',[['bond','allan',2],['bond','isabella',2]])
]));

E.push(N('e10a','PASSARELA SUPERIOR','19:17','lake',`Você e Samuel saltam por cima da estante. A madeira cede sob os pés dos dois. A figura mascarada corre pela passarela superior em direção às docas.

Samuel: — Se ele fugir de novo, a gente nunca descobre porra nenhuma!

Logo adiante, uma tábua apodrecida se parte sob seu peso parcial. Seu tornozelo dói na hora.

Samuel segura seu braço para evitar uma queda maior, mas perde alguns segundos preciosos.

Vocês avistam a figura virar à esquerda, rumo às plataformas flutuantes.`,[
C('Continuar mesmo mancando','e11',[['flag','ferida_protagonista_c3',true],['trait','coragem',1]]),
C('Mandar Samuel seguir e cortar caminho por baixo','e11s',[['bond','samuel',3]]),
C('Desistir da perseguição direta e voltar ao grupo','e11g',[['trait','cautela',1]])
]));
E.push(N('e10b','PASSAGEM LATERAL','19:17','house',`Você agarra Breno pelo braço e arranca o notebook da mesa ao mesmo tempo. Atrás, a máscara volta a surgir por entre as lonas, agora mais perto.

A figura não corre como alguém desesperado. Corre como alguém que conhece cada curva daquele lugar.

Seu ombro bate numa quina de metal quando vocês dobram a esquina. A dor sobe até o pescoço.

Breno: — {nome}, vai, vai, vai!

Ao lado há uma escada que leva ao piso de manutenção. À frente, uma porta para as docas externas.`,[
C('Descer para o piso de manutenção','e11m',[['flag','ferida_protagonista_c3',true],['clue','rota_subterranea',true]]),
C('Correr para as docas externas','e11',[['flag','salvou_notebook_c3',true]])
]));
E.push(N('e10c','GALPÃO PRINCIPAL','19:17','house',`Você grita para cada um procurar uma saída diferente, e o caos se organiza por puro instinto. Isabella puxa Rayssa. Laisla fica com Rauanny. Allan xinga Samuel por correr sem olhar para trás.

No meio da confusão, a figura mascarada surge outra vez e lança um gancho metálico contra uma das colunas. O barulho ecoa como tiro.

Ryan tropeça. Breno volta para ajudá-lo. Você corre na direção dos dois quando percebe que o agressor mudou a rota e está vindo por ali.`,[
C('Ajudar Ryan a levantar e correr com Breno','e11',[['bond','ryan',3],['bond','breno',3]]),
C('Pegar uma barra de ferro e distrair o agressor','e11d',[['trait','coragem',1],['bond','allan',2]])
]));

E.push(N('e11s','PLATAFORMAS FLUTUANTES','19:20','lake',`Samuel dispara à frente, mas você corta por baixo e o reencontra nas plataformas flutuantes. O problema é que a superfície balança demais. Um passo errado e vocês caem na água escura.

A figura mascarada já está na doca seguinte. Samuel estica a mão para agarrar a capa dela, mas recebe em troca um golpe seco no antebraço com algo rígido.

Samuel: — AAH, porra!

Ele recua segurando o braço, enquanto a pessoa mascarada continua correndo.`,[C('Segurar Samuel e continuar a perseguição','e11',[['flag','ferida_samuel_c3',true],['bond','samuel',3]] )]));
E.push(N('e11g','ESCADA DE SERVIÇO','19:20','house',`Você volta na direção dos outros, mas a escolha cobra o preço da hesitação. Um clarão da lanterna revela a figura mascarada surgindo atrás de uma pilha de caixas. Você mal tem tempo de se jogar para o lado.

A lâmina ou gancho — você não consegue distinguir — rasga sua manga e arranha sua pele.

Você: — Ah, merda!

A pessoa não insiste no segundo golpe. Some pela lateral como se só quisesse empurrar você na direção certa: para o medo.`,[C('Correr para as docas','e11',[['flag','ferida_protagonista_c3',true]]) ]));
E.push(N('e11m','PISO DE MANUTENÇÃO','19:20','forest',`A escada estreita leva a um corredor úmido por baixo do galpão. Cano, fiação, mofo, e marcas de sola recentes no piso. A pessoa que corre atrás de vocês já passou por ali antes — talvez muitas vezes.

Breno: — Isso aqui dá em algum lugar?

Você: — Espero que dê.

Lá atrás, passos ecoam. À frente, uma abertura sobe para as docas. Quando vocês emergem, o lago bate nas pilastras e o vento arranca a respiração.`,[C('Seguir até as plataformas externas','e11') ]));
E.push(N('e11d','GALPÃO PRINCIPAL','19:20','house',`Você pega a barra de ferro mais próxima e bate contra uma grade, chamando a atenção do agressor. Por um segundo, funciona. A máscara vira na sua direção.

Allan: — {nome}, VOCÊ TÁ MALUCO?

A figura avança. Você recua, percebe tarde demais que não há espaço atrás de si e escorrega num pedaço de corda molhada. Antes que o golpe chegue, Ryan e Breno puxam você pelos braços para fora da linha de impacto.

Breno: — Correr heroicamente não tava no nosso acordo!

O agressor muda de direção outra vez e some rumo às docas.`,[C('Seguir para as docas com eles','e11',[['bond','breno',3],['bond','ryan',2]]) ]));

E.push(N('e11','DOCAS EXTERNAS','19:24','lake',`A perseguição explode para o lado de fora. Tábuas escorregadias, barcos vazios batendo uns nos outros e o lago escuro respirando logo ao lado. O agressor salta por uma embarcação meio afundada e derruba uma corrente atrás de si.

Do outro lado do píer, você vê algo brilhando preso ao corrimão: um pequeno fragmento metálico, talvez arrancado da roupa ou do equipamento da pessoa mascarada durante a corrida.

Ao mesmo tempo, Breno vacila ao tentar pular um vão entre duas plataformas; Samuel, alguns metros atrás, grita para vocês tomarem cuidado.`,[
C('Segurar Breno para ele atravessar','e12a',[['bond','breno',8],['flag','resgatou_breno_c3',true]]),
C('Arrancar o fragmento metálico e continuar correndo','e12b',[['clue','distintivo_arranhado',true],['trait','cautela',1]]),
C('Chutar a corrente para bloquear o caminho do agressor','e12c',[['trait','coragem',1]])
]));

E.push(N('e12a','DOCAS EXTERNAS','19:26','lake',`Você segura Breno pela cintura e o puxa de uma plataforma para outra. O gesto custa tempo, mas impede uma queda feia na água.

Breno: — Caralho, obrigado... eu achei que fosse cair. Sério, {nome}, achei que ia afundar nessa água.

Quando vocês levantam o rosto, o agressor já está mais distante. Ainda assim, ele não some completamente. Parece observar se vocês vão continuar.

Você percebe, com um arrepio, que a perseguição está sendo conduzida. Quase como se alguém quisesse levar vocês a um lugar específico.`,[C('Seguir mesmo assim','e13') ]));
E.push(N('e12b','DOCAS EXTERNAS','19:26','lake',`Você arranca o fragmento metálico do corrimão. É pequeno, frio e cortante nas bordas, como parte de um distintivo, fivela ou ferramenta. Pode ser a primeira coisa material deixada por quem está fazendo isso.

O problema é que, ao perder esse segundo, o agressor ganha vantagem. Você precisa escolher imediatamente o próximo passo.`,[C('Correr atrás dele pela cabine principal','e13',[['flag','guardou_fragmento_c3',true]] )]));
E.push(N('e12c','DOCAS EXTERNAS','19:26','lake',`Você chuta a corrente com força. Ela gira pelo chão molhado e se enrola nas pernas do agressor por um instante. Não o suficiente para derrubá-lo de vez, mas o bastante para fazê-lo bater no corrimão.

Um estalo metálico ecoa. Alguma peça do equipamento dele se solta e cai perto de você.

Allan, lá atrás, grita alguma coisa que se perde no vento. Agora vocês estão perto o bastante para tentar encurralar a figura.`,[C('Avançar para a cabine principal','e13',[['clue','distintivo_arranhado',true]]) ]));

E.push(N('e13','CABINE DA LANCHA ANTIGA','19:29','house',`A figura mascarada entra numa lancha antiga presa ao píer. Lá dentro, a cabine é apertada, cheia de documentos úmidos, lona rasgada e um cheiro horrível de combustível parado.

Você escuta respiração — a sua, a de alguém atrás e a do próprio agressor em algum ponto do barco. Num canto, uma luz vermelha pisca sobre um gravador portátil ligado a um cabo improvisado.

Antes que você alcance o aparelho, a figura surge de novo e tenta empurrá-lo para fora da cabine. É rápido, brutal e silencioso.`,[
C('Agarrar o gravador antes de recuar','e14a',[['clue','voz_jullia_backup',true],['flag','pegou_gravador_c3',true]]),
C('Desferir um golpe e abrir espaço para fugir','e14b',[['trait','coragem',1]]),
C('Recuar pela lateral e chamar o grupo','e14c',[['trait','cautela',1]])
]));

E.push(N('e14a','CABINE DA LANCHA ANTIGA','19:31','house',`Você se joga para pegar o gravador e sente o ombro quase sair do lugar quando o agressor o acerta de raspão. Ainda assim, o aparelho vem com você.

Há uma etiqueta colada na carcaça: “JG — RASCUNHO”.

Você não consegue ouvir o conteúdo ali. O perseguidor tenta arrancá-lo da sua mão, mas uma lanterna forte o atinge de lado — Allan chegou, xingando como se a raiva fosse combustível. A figura recua pela janela quebrada da cabine e volta a correr.`,[C('Sair da cabine com o gravador','e15',[['flag','ferida_protagonista_c3',true]]) ]));
E.push(N('e14b','CABINE DA LANCHA ANTIGA','19:31','house',`Você acerta o agressor no peito ou no ombro — é difícil saber — e ganha espaço para escapar. O impacto arranca um som abafado, muito mais humano do que monstruoso.

Ryan aparece na entrada da cabine bem a tempo de ver a figura mascarada se lançar para fora.

Ryan: — Eu não acredito que você tentou sair no soco com essa porra.

Você: — Nem eu.

A adrenalina está alta demais para sentir tudo, mas sua mão treme.`,[C('Tentar alcançar o gravador agora','e15',[['trait','coragem',1]]) ]));
E.push(N('e14c','CABINE DA LANCHA ANTIGA','19:31','house',`Você recua e grita pelo resto do grupo. O som ecoa pela marina, e respostas surgem de vários lados. Encurralada pela aproximação das lanternas, a figura hesita por meio segundo. Isso basta para você reparar no gravador vermelho preso ao painel da cabine.

A pessoa mascarada foge por uma escotilha lateral e some entre as docas.`,[C('Pegar o gravador e sair dali','e15',[['clue','voz_jullia_backup',true],['flag','pegou_gravador_c3',true]]) ]));

E.push(N('e15','PLATAFORMA CENTRAL DA MARINA','19:37','lake',`O grupo finalmente se recompõe na plataforma central. Todos falam ao mesmo tempo. Rauanny está pálida, mas de pé. Laisla ainda segura sua mão. Samuel tem o antebraço ensanguentado se a perseguição o atingiu. Seu tornozelo ou ombro lateja. O notebook escapou por pouco.

E então Moisés aparece pelo portão lateral, ofegante, com a camisa suja de lama.

Moisés: — Eu juro por Deus que não fui eu. Tinha alguém no estacionamento e meus pneus foram cortados. Eu vim correndo da estrada.

Samuel dá um passo na direção dele, mas Isabella se põe no meio.

Isabella: — Depois. Agora não.

Breno ergue o gravador e/ou o notebook como se não acreditasse no que tem nas mãos.`,[
C('Mandar Breno tocar o que foi recuperado imediatamente','e16'),
C('Pressionar Moisés antes de ouvir o arquivo','e16m',[['bond','samuel',-2],['bond','isabella',2]]),
C('Pedir que todos se acalmem e formem um círculo','e16c',[['bond','allan',3],['bond','rayssa',2]])
]));

E.push(N('e16m','PLATAFORMA CENTRAL','19:40','lake',`Você encara Moisés antes que a confusão engula tudo.

Você: — Se você sabia dessa marina, por que nunca falou dela antes?

Moisés: — Porque eu só vinha aqui quando o pai da Jullia inventava passeio de família. E porque a última vez que pisei neste lugar foi com ela gritando comigo por eu ter estragado tudo.

Rayssa fecha os olhos. Moisés percebe demais na expressão do grupo.

Moisés: — Vocês sabem de coisa demais pra continuarem agindo como vítimas inocentes.

Samuel: — Cala a boca e deixa ouvir a gravação.

Pela primeira vez, Moisés obedece. Talvez porque ele também queira a verdade.`,[C('Ouvir o arquivo','e16') ]));
E.push(N('e16c','PLATAFORMA CENTRAL','19:40','lake',`Você pede silêncio até sua própria voz sair firme o bastante para todos obedecerem.

Você: — Ninguém vai arrancar resposta no grito. Se a Jullia deixou alguma coisa aqui, é isso que importa agora.

Allan: — Obrigado. Porque eu tô a um segundo de desmaiar de medo e de raiva ao mesmo tempo.

Rayssa encosta no corrimão para se equilibrar. Breno segura o gravador com cuidado quase religioso. Samuel olha para Moisés como se ainda quisesse socá-lo, mas se contém.

No fim, todo mundo se aproxima do mesmo ponto, como se o círculo improvisado pudesse segurar a noite no lugar.`,[C('Ouvir o arquivo','e16') ]));
E.push(N('e16','PLATAFORMA CENTRAL DA MARINA','19:40','lake',`Breno coloca o gravador sobre uma caixa seca. A luz vermelha pisca; alguém limpa o chiado e a voz de Jullia surge entre passos rápidos e folhas se quebrando.

Jullia (gravação): — Eu... não acredito nisso, cara. Puta que pariu... Eu nem queria fazer aquela festa! Meus amigos falando merda de mim... e o Moisés... aquele filho da puta. Eu só queria uma noite tranquila.

A respiração fica ofegante. Jullia parece parar por um momento.

Jullia (gravação): — Nem sei por que tô gravando isso. Precisava falar com alguém... mas parece que não tenho mais ninguém.

Um galho estala. Há alguns segundos de vento e silêncio.

Jullia (gravação): — Pera... tem alguém aí? Moisés? Se for você, me deixa em paz! Eu não quero falar com você!

Os passos aceleram, agora desordenados.

Jullia (gravação): — Caralho... eu acho que tem alguém me seguindo...

A gravação termina. Nenhuma fala sobre a van, Samuel ou o acidente. Jullia ainda não podia saber o que aconteceria minutos depois.

Rayssa cobre a boca com a mão. Isabella olha para Samuel, que ficou completamente imóvel.`,[C('Perguntar a Samuel por que ele ficou tão pálido','e17',[['clue','voz_jullia_backup',true]])]));
E.push(N('e17','PLATAFORMA CENTRAL DA MARINA','19:44','lake',`Você: — Samuel, o que foi? Você ouviu alguma coisa que a gente não ouviu?

Samuel: — Eu vi alguém. Na noite da festa. Perto da mata, quando a gente tava indo embora.

Isabella: — O QUÊ? Você nunca falou isso!

Samuel: — Era só uma sombra passando entre as árvores. Achei que fosse alguém bêbado da festa. Não sabia que a Jullia tinha ouvido passos. Eu só descobri isso agora, junto com vocês!

Rayssa: — Mas depois você atropelou ela. E a gente jogou o corpo no lago. Você não pensou que aquela pessoa podia ter visto tudo?

Samuel: — Pensei! Porra, eu pensei toda noite! Foi justamente por isso que não contei. Se existia testemunha, eu tinha medo de arrastar todo mundo pra cadeia. Eu fui um covarde, tá bom?

Breno: — Você não tem como saber se aquela pessoa era a mesma que a Jullia ouviu. Pode ser coincidência. Mas esconder isso tirou de nós a chance de investigar um ano atrás.

Moisés: — Eu queria saber disso quando ainda estavam procurando por ela.

Samuel abaixa o rosto. Não há desculpa que conserte o silêncio de um ano.`,[
C('Cobrar Samuel pelo silêncio e exigir que ele ajude','e17a',[['bond','samuel',-5],['bond','rayssa',3],['flag','cobrou_samuel_c3',true],['clue','meia_confissao_samuel',true]]),
C('Pedir detalhes precisos sobre a figura','e17b',[['trait','cautela',1],['clue','meia_confissao_samuel',true]]),
C('Dizer que todos tiveram medo e precisam agir juntos','e17c',[['bond','samuel',4],['clue','meia_confissao_samuel',true]])
]));
E.push(N('e17a','PLATAFORMA CENTRAL','19:48','lake',`Você: — Você vai ajudar a gente agora, Samuel. Sem meias verdades. Se lembrar de qualquer coisa, conta.

Samuel: — Eu sei. E você tem direito de estar com raiva. Só não me pede pra voltar naquela estrada porque eu já volto pra lá toda vez que fecho os olhos.

Allan: — A gente não vai voltar no tempo. Mas pode parar de piorar tudo de hoje em diante.

Rayssa segura sua mão rapidamente, agradecida por alguém ter confrontado Samuel sem transformar a noite numa briga sem fim.`,[C('Deixar a marina','e18')]));
E.push(N('e17b','PLATAFORMA CENTRAL','19:48','lake',`Você: — Altura? Roupa? Pra onde essa pessoa foi? Qualquer detalhe serve.

Samuel fecha os olhos, tentando enxergar de novo a cena na cabeça.

Samuel: — Casaco escuro. Mais ou menos minha altura, talvez. Ela atravessou a linha de árvores perto da estrada e sumiu. Não vi rosto nem placa de carro. Não posso inventar o resto.

Breno anota sem tirar conclusões precipitadas.

Isabella: — Finalmente uma pista e não uma acusação.`,[C('Guardar o depoimento','e18')]));
E.push(N('e17c','PLATAFORMA CENTRAL','19:48','lake',`Você: — Todo mundo aqui teve medo. O problema é continuar mentindo por causa dele. Isso precisa parar.

Samuel solta o ar e concorda com um movimento de cabeça.

Samuel: — Eu sei. Vocês merecem ouvir tudo, mesmo as coisas que me deixam parecendo o pior amigo do mundo.

Rayssa não o perdoa. Isabella também não. Mas ninguém o abandona ali, cercado pela água e pelo escuro.`,[C('Voltar para a cidade','e18')]));
E.push(N('e18','ESTRADA DE VOLTA · CARROS PARADOS','20:07','road',`Na saída da marina, ninguém fala alto. A adrenalina cede espaço a uma espécie de esgotamento bruto. Mas agora existe algo que não existia antes: uma gravação de Jullia, um fragmento do agressor e a confirmação de que Samuel omitiu parte da verdade desde o começo.

Breno fecha o notebook com cuidado. Isabella confere três vezes se salvou uma cópia do áudio. Allan limpa as mãos sujas de ferrugem na própria calça e promete nunca mais chamar aquele lugar de “cenário bonito”. Rauanny manca, mas caminha. Ryan olha para o lago como se esperasse ver a máscara surgir outra vez. Laisla não desgruda de Rauanny. Rayssa mantém os olhos no chão. Moisés, pela primeira vez, parece tão perdido quanto vocês.

Seu celular vibra quando você já alcança o carro.

Mensagem desconhecida: “VOCÊS OUVIRAM A PARTE QUE SOBROU. A OUTRA METADE CUSTA MAIS.”

No anexo, há uma fotografia antiga da van de Samuel parada perto do lago — tirada na noite do acidente.`,[
C('Encerrar o capítulo e salvar o progresso','fim07',[['flag','cap3_concluido',true],['flag','samuel_viu_figura',true]])
]));

E.push(N('fim07','LAKEWOOD · ESTRADA VAZIA','20:11','phone',`FIM DO CAPÍTULO 3 — NINGUÉM É INOCENTE.

A marina velha revelou novas peças do quebra‑cabeça: mensagens restauradas, um áudio parcial de Jullia e a certeza de que Samuel escondeu informações sobre a noite do atropelamento. A perseguição deixou ferimentos, medo e evidências reais.

ENQUANTO ISSO...

Num quarto escuro, a fotografia da van é colocada ao lado de um mapa do lago. Alguém risca com caneta vermelha o ponto exato onde o corpo de Jullia foi jogado na água.

Depois escreve apenas duas palavras:

“PRÓXIMO PASSEIO.”`,[]));

const old=window.NODES.fim06;
old.choices=[C('CAPÍTULO 3 · Ir até a marina velha','e01')];
window.HISTORIA.push(...E); for(const node of E){ if(window.NODES[node.id]) throw Error('ID duplicado: '+node.id); window.NODES[node.id]=node; }
})();
