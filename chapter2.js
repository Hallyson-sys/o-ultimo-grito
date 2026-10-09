/* Capítulo 2 — carregado depois do roteiro anterior; não altera IDs antigos */
(()=>{
const N=(id,location,time,scene,text,choices=[])=>({id,chapter:'CAPÍTULO 02 · NINGUÉM ESTÁ SEGURO',location,time,scene,text,choices,speaker:'NARRAÇÃO'});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const E=[];
E.push(N('d01','CASA DO PROTAGONISTA · QUARTO','09:14','phone',`Você não dormiu de verdade. A chuva da noite anterior continua batendo na janela, cada gota parecida com o toque daquele celular no memorial. O bilhete de Isabella, a foto tirada às escondidas e a voz anônima se misturam em sua cabeça. Um ano inteiro tentando esquecer a estrada de Lakewood — e agora alguém parece determinado a obrigar todos a se lembrarem.

Seu telefone acende com 47 mensagens do grupo. A maioria são áudios de Allan e respostas irritadas de Samuel. No meio delas, uma mensagem de Breno enviada às 03h12: “Me diz que chegou bem. Não precisa responder agora, só... responde quando puder.”

O telefone toca outra vez. É Isabella.

Isabella: — {nome}? Finalmente. Eu tô ligando desde cedo, caralho. A gente vai se reunir aqui em casa. E antes que você pergunte: não, não avisei a polícia.

Você: — Bom dia pra você também, Isa.

Isabella: — Desculpa. Não preguei o olho. Minha mãe saiu pra trabalhar. A casa tá vazia. Preciso olhar na cara de vocês e descobrir se alguém tá mentindo.`,[
C('Perguntar a Isabella se ela está bem','d02a',[['bond','isabella',5],['trait','empatia',1]]),C('Cobrar por que ninguém chamou a polícia','d02b',[['flag','cobrou_policia_c2',true],['bond','rayssa',4]]),C('Concordar e dizer que vai imediatamente','d02c',[['trait','cautela',1]])]));
E.push(N('d02a','QUARTO · TELEFONEMA','09:18','phone',`Você: — Isa, esquece por um segundo o bilhete. Você tá bem mesmo?

Isabella: — Você me conhece, né? Eu sou ótima em fingir que tá tudo sob controle.

Ao fundo, uma porta bate. Você a ouve respirar antes de continuar.

Isabella: — A Ray dormiu aqui. Ela acordou chorando. Eu fiquei sentada no chão do banheiro sem conseguir desligar a luz. Isso responde?

Você: — Responde. A gente não devia carregar isso sozinho.

Isabella: — Então aparece aqui. E, por favor, não conta pra Ray que eu te falei. Ela já tá envergonhada o suficiente.`,[C('Se arrumar para o encontro','d03',[['flag','isa_confidenciou',true]])]));
E.push(N('d02b','QUARTO · TELEFONEMA','09:18','phone',`Você: — Isabella, alguém tirou foto nossa ontem. Tem um celular largado na escada da casa. E a nossa solução é... fazer reunião?

Isabella: — E a sua é entregar o Samuel? Entregar todos nós? Você acha que eu não penso nisso toda noite?

Você: — Eu penso na Jullia.

Do outro lado, Isabella fica em silêncio. Quando responde, não parece mais irritada; parece cansada.

Isabella: — Eu também. Por isso eu preciso de você lá. Se a gente vai fazer alguma coisa certa pela primeira vez, tem que decidir junto.`,[C('Ir até a casa de Isabella','d03') ]));
E.push(N('d02c','QUARTO · TELEFONEMA','09:18','phone',`Você: — Tá. Me manda o endereço, eu tô indo.

Isabella: — Você sabe onde eu moro.

Você: — Eu sei. Queria ver se ainda consegue reclamar de alguma coisa normal.

Isabella solta uma risada tão curta que quase desaparece.

Isabella: — Idiota. Compra pão no caminho, então. Não tem nada nessa casa.`,[C('Sair de casa','d03',[['bond','isabella',2]])]));
E.push(N('d03','RUA PRINCIPAL · LAKEWOOD','10:02','town',`O centro de Lakewood está cheio de gente como se nada tivesse acontecido. Uma bicicleta passa pelo mercadinho, uma criança corre atrás do cachorro, e do outro lado da rua um cartaz com o rosto de Jullia ainda está preso ao vidro de uma farmácia: “DESAPARECIDA — QUALQUER INFORMAÇÃO AJUDA”.

Você passa pelo cartaz sem parar. A fotografia mostra Jullia sorrindo, iluminada pelo sol. Não pela luz fria da estrada.

O celular vibra. Ryan mandou um vídeo idiota para o grupo às oito da manhã, tentando fazer o pessoal rir. Rauanny respondeu com um “não tenho psicológico hoje”. Breno continua sem resposta. Você pode mandar uma mensagem antes de chegar.`,[
C('Responder à mensagem de Breno','d04b',[['bond','breno',4],['romance','breno',5]]),C('Mandar mensagem para Ryan','d04r',[['bond','ryan',4],['romance','ryan',4]]),C('Perguntar como Rayssa está','d04s',[['bond','rayssa',5],['romance','rayssa',3]]),C('Procurar Rauanny para saber de Laisla','d04u',[['bond','rauanny',5],['romance','rauanny',3]]),C('Guardar o celular e continuar andando','d05',[['trait','cautela',1]])]));
E.push(N('d04b','RUA PRINCIPAL · MENSAGENS','10:05','phone',`Você digita: “Cheguei em casa. Dormi mal. Você?” A resposta aparece antes mesmo que a tela escureça.

Breno: — Eu tava com medo de parecer grudado se mandasse outra mensagem.

Você: — Você nunca parece grudado.

Breno: — Você fala isso porque não viu minhas sete versões de “bom dia”.

Você para sob a marquise de uma loja, sorrindo sem querer. Por um instante a noite anterior parece mais distante.

Breno: — Quando eu te vir hoje... posso te dar um abraço? Sem fazer disso um evento enorme?

Você: — Pode. Acho que eu também tô precisando.`,[C('Seguir para a reunião','d05',[['flag','abraco_breno',true]])]));
E.push(N('d04r','RUA PRINCIPAL · MENSAGENS','10:05','phone',`Você: — A essa hora você já tá mandando vídeo de gato caindo da cadeira?

Ryan: — O gato não caiu. Ele FEZ UMA ESCOLHA.

Você: — Uma escolha ruim.

Ryan: — Igual eu quando achei que ia ser boa ideia ir naquela homenagem.

Três pontinhos surgem e desaparecem na conversa. Depois: “Desculpa. Humor ruim. Eu não sei conversar quando tô com medo.”

Você: — Não precisa fazer piada comigo o tempo inteiro.

Ryan: — Então não conta pra ninguém que você conseguiu me deixar sem resposta.`,[C('Guardar o telefone com um sorriso','d05',[['flag','ryan_se_abriu',true]])]));
E.push(N('d04s','RUA PRINCIPAL · MENSAGENS','10:05','phone',`Você manda uma mensagem para Rayssa. A resposta demora mais do que o normal.

Rayssa: — Tô com a Isa. Ela fez café, queimou as torradas e tá brigando com a cafeteira.

Você: — Então está tudo normal pelo menos em alguma parte do mundo.

Rayssa: — Queria que estivesse. Ontem a Helena me abraçou e perguntou se eu achava que a Jullia tava viva. Eu menti olhando nos olhos dela.

Você: — Ray...

Rayssa: — Eu sei. Não precisa consertar agora. Só chega aqui, por favor. Eu não tô conseguindo respirar direito.`,[C('Dizer que ela não está sozinha','d05',[['flag','acolheu_rayssa_c2',true],['romance','rayssa',3]])]));
E.push(N('d04u','RUA PRINCIPAL · MENSAGENS','10:05','phone',`Você: — A Laisla tá bem? A Isa falou que a reunião é na casa dela.

Rauanny: — Se “bem” significa ter ligado pra mim às cinco da manhã pra perguntar se eu acho que a Jullia tá nos observando, tá ótima.

Você: — E você? Como tá?

Rauanny: — Eu? Linda, arrasada e prestes a quebrar o celular na parede.

Você: — A parte “linda” continua verdadeira.

Rauanny: — Não começa a me fazer sorrir agora, {nome}. Tô tentando ficar com raiva.

Mesmo por mensagem, dá para perceber o jeito dela fugir do assunto com uma provocação.`,[C('Dizer que conversam pessoalmente','d05',[['flag','rauanny_flerte_c2',true]])]));
E.push(N('d05','CASA DE ISABELLA · SALA','10:39','house',`A casa de Isabella é menor do que a mansão dos Gomes, e o contraste torna tudo mais difícil. Há tênis espalhados pelo corredor, duas canecas na mesa e uma televisão ligada sem som. Alguém trouxe salgadinhos e ninguém abriu o pacote.

Laisla está sentada no tapete com as pernas cruzadas. Rauanny ocupa o sofá ao lado de Ryan. Allan vasculha a cozinha atrás de algo com açúcar; Samuel está de pé perto da janela, tamborilando no vidro. Rayssa e Isabella conversam baixinho. Breno, sozinho na ponta do sofá, levanta o rosto quando você aparece.

Allan: — Aleluia! O último integrante da reunião clandestina chegou. Agora a gente pode decidir se abre uma seita ou se surta em conjunto.

Samuel: — Você pode ficar sério cinco minutos?

Allan: — Faz um ano que eu tô sério por dentro, Samuel. Me deixa ser irritante por fora.

O comentário silencia a sala por um instante.`,[
C('Cumprimentar Breno primeiro','d06b',[['bond','breno',5]]),C('Sentar com Ryan, Laisla e Rauanny','d06r',[['bond','ryan',3],['bond','laisla',3]]),C('Ir até Rayssa e Isabella','d06s',[['bond','rayssa',3],['bond','isabella',3]]),C('Perguntar a Samuel por que está tão nervoso','d06m',[['bond','samuel',-2]])]));
E.push(N('d06b','SALA · AO LADO DE BRENO','10:43','house',`Breno se levanta antes de você chegar perto. O sorriso dele é tímido, mas o abraço que oferece é firme.

Breno: — Oi. Achei que você fosse mudar de ideia.

Você: — Eu pensei nisso umas quatro vezes. Mas não queria deixar vocês sozinhos.

Breno: — Eu pensei nisso oito. Ainda bem que você veio.

Lá do outro lado, Allan ergue uma sobrancelha.

Allan: — Tá lindo esse momento, mas a gente ainda tem um psicopata anônimo pra descobrir, viu?

Breno: — Allan, sinceramente, vai catar coquinho.

O grupo ri por um segundo — a primeira risada da manhã.`,[C('Participar da conversa do grupo','d07',[['romance','breno',3]])]));
E.push(N('d06r','SALA · SOFÁ','10:43','house',`Você se senta, e Ryan imediatamente empurra uma almofada para abrir espaço.

Ryan: — Bem-vindo ao pior encontro de amigos da história. O café tá ruim, a decoração é deprimente e o Samuel tá com cara de boleto vencido.

Laisla: — Ryan, pelo amor de Deus.

Rauanny: — Não, deixa ele. Se eu parar de rir vou lembrar da foto.

A palavra “foto” causa um silêncio incômodo. Laisla segura a mão de Rauanny discretamente.

Você: — Então vamos descobrir quem tirou aquela foto. Sem brigar entre nós.

Ryan: — Com essa turma? Você é otimista até demais.`,[C('Ouvir a reunião','d07') ]));
E.push(N('d06s','SALA · PERTO DA COZINHA','10:43','house',`Rayssa segura uma caneca entre as mãos. Isabella está ao lado dela como se estivesse montando guarda.

Rayssa: — Obrigada por vir. Pensei que ninguém ia querer olhar um pro outro de novo.

Isabella: — Eu não queria, não. Mas se vocês forem fazer merda, prefiro que seja com a minha supervisão.

Você: — Você sempre sabe fazer um convite parecer ameaça.

Isabella: — É meu charme.

Rayssa dá um sorriso breve. Debaixo da mesa, ela encosta de leve na sua mão; você percebe que os dedos dela estão gelados.`,[C('Sentar para a reunião','d07',[['romance','rayssa',2]])]));
E.push(N('d06m','SALA · JANELA','10:43','house',`Samuel não se vira imediatamente quando você fala.

Samuel: — Porque eu tenho motivos pra estar nervoso, {nome}. Alguém fez uma foto nossa numa propriedade cheia de segurança, sem que ninguém visse.

Você: — E você tá com medo de quê? Que tenham visto você dirigir naquela noite?

Samuel aperta a mandíbula. Allan surge ao lado dele.

Allan: — Ei. Chega. Vamos conversar com todo mundo antes de transformar a sala numa arena.

Samuel: — Eu não tô fugindo de conversa nenhuma. Só tô cansado de ser o único que lembra que a gente fez um pacto.`,[C('Chamar todo mundo para conversar','d07',[['flag','samuel_defensivo_c2',true]])]));
E.push(N('d07','CASA DE ISABELLA · REUNIÃO','11:02','house',`Isabella espalha sobre a mesa uma fotografia do bilhete e um desenho rápido do portão de serviço da mansão. Ela também anotou os horários em que cada um se separou durante o memorial.

Isabella: — Antes de começar: ninguém vai sair daqui ameaçando contar tudo em rede social. A gente vai ouvir todo mundo.

Rayssa: — Eu não falei de rede social. Falei da polícia.

Samuel: — E eu falei que não dá pra confiar em polícia nenhuma quando a gente escondeu um corpo.

Allan: — Olha que jeito maravilhoso de começar a manhã.

Laisla: — Cala a boca, vocês dois. Minha cabeça já tá explodindo.

Ryan: — A Isa tinha o bilhete. O celular apareceu na escada. Mas a foto foi tirada de outro ângulo. Talvez tenha mais de uma pessoa.

Breno: — Ou uma pessoa que conhece muito bem os caminhos da propriedade. Pensa: a câmera de serviço, o jardim, o lago... alguém sabia onde a gente ia estar.

Você sente todos os olhares voltarem para você. Pela primeira vez, não é apenas uma conversa sobre o passado. Alguém está planejando algo agora.`,[
C('Sugerir investigar as câmeras da mansão','d08i',[['clue','plano_cameras',true],['bond','breno',4]]),C('Defender que contem a verdade a alguém','d08p',[['flag','pressionou_confissao_c2',true],['bond','rayssa',5],['bond','samuel',-6]]),C('Perguntar quem poderia ter acesso ao jardim','d08s',[['clue','rota_jardim',true],['trait','cautela',1]])]));
E.push(N('d08i','CASA DE ISABELLA · MESA','11:14','house',`Você: — A mansão tem câmeras. Se a foto foi tirada ontem, deve aparecer alguém circulando perto do lago.

Breno: — Eu pensei a mesma coisa. Só não sei se a família vai entregar a gravação pra um grupo de amigos sem motivo aparente.

Isabella: — Eu consigo falar com uma funcionária da casa. Ela me conhece da escola. Mas ninguém vai inventar uma mentira idiota sem combinar antes.

Allan: — Ótimo. O plano é invadir educadamente a privacidade de uma família em luto. Sem comentários.

Samuel: — É melhor do que ficar sentado esperando o próximo bilhete.

Você percebe que, apesar do sarcasmo, Allan foi o primeiro a anotar o nome da funcionária.`,[C('Continuar a reunião','d09') ]));
E.push(N('d08p','CASA DE ISABELLA · MESA','11:14','house',`Você: — A Rayssa tá certa em uma coisa: quanto mais a gente esconde, pior fica. E se essa pessoa souber mais do que a gente?

Samuel: — Você acha que eu não sei disso? Eu tava no volante, porra!

Laisla: — Exatamente. E a gente tava dentro da van! Para de falar como se só você tivesse perdido alguma coisa.

Rauanny: — Eu perdi um ano da minha vida pensando naquela noite. Todos perdemos.

Rayssa: — E a mãe da Jullia perdeu a filha. Ela nem sabe onde ir pra chorar por ela.

Isabella: — Ray, chega. Por favor. Eu não aguento você se destruindo aqui.

Você percebe que a discussão não acabou. Apenas ficou quieta o suficiente para ninguém precisar decidir nada ainda.`,[C('Continuar a reunião','d09') ]));
E.push(N('d08s','CASA DE ISABELLA · MESA','11:14','house',`Você: — Pera. Quem consegue entrar no jardim sem passar pela entrada principal?

Isabella: — Funcionários, segurança, convidados conhecidos... e o Moisés, quando ainda namorava a Jullia.

Rauanny: — Vocês vão colocar a culpa nele porque ele foi um namorado escroto?

Samuel: — Eu não coloquei culpa em ninguém.

Laisla: — Colocou sim. Desde ontem você tá querendo que seja ele.

Ryan: — Tá, mas o Moisés disse que viu gente perto da estrada. E se ele não falou tudo?

Breno: — Então precisamos descobrir o que ele viu, não simplesmente decidir que é culpado.`,[C('Passar para os próximos passos','d09') ]));
E.push(N('d09','CASA DE ISABELLA · QUINTAL','12:26','lake',`A reunião dá uma pausa. Isabella atende uma ligação da mãe; Allan finalmente encontra biscoitos num armário; Samuel sai para fumar perto do portão, embora insista que não fuma mais. Por alguns minutos, você pode conversar com alguém sem o peso dos oito olhares.

No quintal, o sol aparece brevemente entre as nuvens. O cheiro de terra molhada contrasta com a lembrança da chuva no memorial. Você observa Ryan junto à cerca, Breno perto do banco de madeira, Rayssa no degrau da varanda e Rauanny ao lado de um vaso quebrado.

Ninguém parece pronto para ir embora. Talvez todos estejam com medo de ficar sozinhos.`,[
C('Conversar a sós com Ryan','d10r',[['bond','ryan',3]]),C('Conversar a sós com Breno','d10b',[['bond','breno',3]]),C('Conversar a sós com Rayssa','d10s',[['bond','rayssa',3]]),C('Conversar a sós com Rauanny','d10u',[['bond','rauanny',3]]),C('Voltar diretamente à investigação','d12',[['trait','cautela',1]])]));
E.push(N('d10r','QUINTAL · CERCA','12:31','lake',`Ryan joga uma pedrinha no chão, erra a mira de uma tampa de garrafa e finge que foi de propósito.

Ryan: — Eu costumava ser bom nisso. Em fingir que tudo se resolve com uma piada.

Você: — Você ainda é bom nas piadas. Só precisa aceitar que nem tudo tem graça.

Ryan: — É. Principalmente ver você quase chorando ontem. Eu queria ter falado alguma coisa, mas só fiquei olhando.

Ele se aproxima um pouco, sem a pose habitual.

Ryan: — {nome}, você sabe que comigo não precisa bancar a pessoa forte, né? Se quiser desabar, eu fico. Mesmo que eu não saiba o que dizer.`,[
C('Segurar a mão dele e dizer que sentiu sua falta','d11r',[['romance','ryan',11],['bond','ryan',5],['flag','intimidade_ryan_c2',true]]),C('Agradecer pela amizade','d11r',[['bond','ryan',6]]),C('Pedir que ele leve a situação mais a sério','d11r',[['resent','ryan',3],['trait','cautela',1]])]));
E.push(N('d11r','QUINTAL · CERCA','12:38','lake',`Ryan abaixa os olhos e sorri de canto, daquela maneira que normalmente antecede uma provocação. Só que desta vez ele não tenta te fazer rir.

Ryan: — Tá. Hoje sem personagem. Sem piadinha pra fugir da conversa. Eu tô com medo e queria muito que nada disso estivesse acontecendo.

Você: — Eu também.

Ryan: — Então me promete uma coisa. Se acontecer alguma coisa estranha de novo, me chama. Não tenta ser herói sozinho, beleza?

De dentro da casa, Allan grita que alguém achou uma informação. Ryan respira fundo antes de voltar com você.`,[C('Retornar para a investigação','d12') ]));
E.push(N('d10b','QUINTAL · BANCO DE MADEIRA','12:31','lake',`Breno tem os cotovelos apoiados nos joelhos. Quando você se aproxima, ele tira um fone de ouvido, embora não haja música tocando.

Breno: — Você já reparou que, quando todo mundo começa a gritar, eu paro de conseguir falar?

Você: — Reparei. Mas você tava prestando atenção. Foi você que lembrou das câmeras.

Breno: — É mais fácil observar. Quando eu falo, parece que vou dizer a coisa errada e alguém vai se machucar.

Ele encara as mãos.

Breno: — Naquela noite... eu queria ter dito não. Na hora do saco, na hora do lago. Eu não disse. E agora tenho medo de perder você também.`,[
C('Dizer que quer ficar perto dele','d11b',[['romance','breno',11],['bond','breno',5],['flag','intimidade_breno_c2',true]]),C('Garantir que ele pode confiar em você','d11b',[['bond','breno',8]]),C('Perguntar o que ele não contou sobre aquela noite','d11b',[['clue','culpa_breno',true],['resent','breno',2]])]));
E.push(N('d11b','QUINTAL · BANCO DE MADEIRA','12:38','lake',`Breno demora a responder. Você consegue ouvir os carros passando longe, do outro lado do muro.

Breno: — Obrigado por não desistir de conversar comigo. Eu sei que às vezes pareço longe, mas eu escuto você. Sempre escutei.

Você: — Então fala quando estiver com medo. Eu não consigo adivinhar tudo.

Breno solta uma risada pequena.

Breno: — Tá bom. Primeiro aviso: eu tô com medo agora.

Ele estende a mão, como se pedisse licença para ficar ao seu lado por mais algum tempo. A voz de Isabella chama vocês de dentro da casa.`,[C('Voltar para a sala juntos','d12') ]));
E.push(N('d10s','QUINTAL · DEGRAU','12:31','lake',`Rayssa está sentada com os joelhos abraçados. Ao ver você, limpa discretamente o rosto com a manga.

Rayssa: — Você já ficou com raiva de alguém e, ao mesmo tempo, com vontade de pedir desculpa pra essa pessoa?

Você: — Já. Por quê?

Rayssa: — Eu tô com raiva da Jullia. Por ter saído correndo. Por ter deixado a gente lá. Aí me odeio por pensar isso, porque foi a gente que...

Ela não consegue terminar a frase.

Rayssa: — Eu lembro da voz dela na festa. Eu lembro que ela tava chorando. E eu não fui atrás.`,[
C('Sentar perto e oferecer carinho','d11s',[['romance','rayssa',10],['bond','rayssa',6],['flag','intimidade_rayssa_c2',true]]),C('Ouvir e deixar que ela fale','d11s',[['bond','rayssa',8]]),C('Dizer que a culpa não é só dela','d11s',[['trait','empatia',2]])]));
E.push(N('d11s','QUINTAL · DEGRAU','12:38','lake',`Rayssa respira fundo. A expressão dela está cansada, mas não fechada como na noite anterior.

Rayssa: — Obrigada por ficar. A Isa fica tentando resolver tudo pra mim, e eu amo ela por isso... mas às vezes eu só quero que alguém escute.

Você: — Eu posso escutar.

Rayssa: — Eu sei. É por isso que eu fico procurando você quando as coisas desabam.

Lá dentro, Isabella chama o nome da amiga. Rayssa seca as lágrimas e se levanta. Antes de entrar, espera você acompanhá-la.`,[C('Retornar com Rayssa','d12') ]));
E.push(N('d10u','QUINTAL · MURO BAIXO','12:31','lake',`Rauanny observa um vaso de flores quebrado perto do portão.

Rauanny: — Sabe o que mais me irrita? Não é nem o bilhete. É ver a Laisla tremendo e fingindo que tá tudo ótimo porque não quer me preocupar.

Você: — Vocês duas sempre brigam, mas nunca conseguem ficar longe uma da outra.

Rauanny: — Porque ela é minha pessoa. Mesmo quando eu quero jogar ela no lago. É diferente.

Rauanny se vira para você, com a expressão menos dura.

Rauanny: — E você tá começando a virar outra pessoa que eu não quero ver machucada. Isso é um saco, sabia? Eu já tenho problemas suficientes.`,[
C('Dizer que também se importa com ela','d11u',[['romance','rauanny',11],['bond','rauanny',5],['flag','intimidade_rauanny_c2',true]]),C('Prometer ajudar Laisla também','d11u',[['bond','rauanny',6],['bond','laisla',4]]),C('Brincar que ela está sendo sentimental','d11u',[['romance','rauanny',3]])]));
E.push(N('d11u','QUINTAL · MURO BAIXO','12:38','lake',`Rauanny bufa e joga uma folhinha seca no seu ombro.

Rauanny: — Não começa a achar que eu tô toda apaixonadinha, {nome}. Eu ainda posso te mandar calar a boca.

Você: — Eu sei. Faz parte do seu charme.

Por um instante ela sorri, depois olha para a casa.

Rauanny: — Promete só que, se alguém tentar mexer com você, você me conta primeiro. Eu prefiro ficar furiosa junto com você do que descobrir depois.

Ela dá um tapinha leve no seu braço e segue em direção à porta.`,[C('Voltar para a reunião','d12') ]));
E.push(N('d12','CASA DE ISABELLA · COZINHA','13:06','house',`Allan está diante do computador da família de Isabella. Não é exatamente uma descoberta brilhante: ele encontrou uma notícia arquivada sobre os funcionários da propriedade Gomes e uma fotografia da entrada de serviço.

Allan: — Eu só queria uma foto do portão, juro. Mas olha isso. O portão de serviço dá pra uma trilha que chega na estrada onde a van passou.

Samuel: — Muitas trilhas chegam naquela estrada.

Laisla: — Não é sobre quantidade, Samuel. É sobre alguém poder ter visto a gente.

Breno: — E alguém poder ter seguido a Jullia quando ela saiu da festa.

Uma pergunta que ninguém queria fazer fica suspensa: se alguém estava naquela estrada, por que nunca procurou a polícia?

Isabella propõe duas investigações. Parte do grupo tentará falar com um antigo funcionário da mansão. Outra parte voltará à região da trilha para procurar marcas ou câmeras esquecidas.`,[
C('Ir investigar a trilha com Breno e Ryan','d13t',[['clue','trilha_servico',true],['bond','breno',3],['bond','ryan',3]]),C('Investigar o antigo funcionário com Rayssa e Rauanny','d13f',[['clue','funcionario_gomes',true],['bond','rayssa',3],['bond','rauanny',3]])]));
E.push(N('d13t','TRILHA ATRÁS DA PROPRIEDADE','16:52','forest',`No fim da tarde, a trilha parece mais estreita do que nas fotografias. Galhos arranham o braço de Ryan, que tenta manter o bom humor sem muito sucesso. Breno caminha dois passos atrás, iluminando o chão com a lanterna do celular.

Ryan: — Eu só queria dizer que se alguém sugerir acampar aqui eu termino todas as minhas amizades.

Breno: — Ninguém sugeriu acampar.

Ryan: — Ótimo. Vamos manter assim.

Você encontra um pedaço de fita vermelha amarrado a um galho. Parece novo, mas a árvore tem marcas mais antigas, como se algo tivesse sido arrastado perto dali.

Breno: — Isso não tava na foto de ontem. Ou pelo menos eu não vi.

Seu telefone vibra, mesmo sem sinal aparente: “PAREM DE PROCURAR. VOCÊS JÁ ENCONTRARAM O QUE MERECIAM.”`,[
C('Fotografar a fita e não tocar nela','d14',[['clue','fita_vermelha_trilha',true],['trait','cautela',2]]),C('Seguir as marcas alguns metros','d14',[['clue','marcas_arrasto',true],['trait','coragem',1]]),C('Voltar antes de escurecer','d14',[['flag','evitou_risco_trilha',true]])]));
E.push(N('d13f','ANTIGO GALPÃO · LAKEWOOD','16:52','town',`O antigo funcionário se chama Davi Moreira. Ele aceita falar com vocês na frente de um galpão onde guarda ferramentas. Não parece gostar de perguntas sobre os Gomes, mas fica visivelmente desconfortável ao ouvir o nome de Jullia.

Davi: — A menina não era feliz naquela noite. Eu vi ela correndo na direção dos fundos. O namorado veio atrás, mas parou antes do portão.

Rayssa: — Você contou isso à polícia?

Davi: — Contei o que vi. O policial anotou e foi embora.

Rauanny: — Você viu outra pessoa entrar pela trilha?

Davi hesita tempo demais.

Davi: — Tinha um carro parado na estrada. Farol apagado. Eu não vi quem tava dentro. E, sinceramente, não quero descobrir.

Você sente um arrepio. Alguém pode ter estado ali antes mesmo da van.`,[
C('Pedir que Davi descreva o carro','d14',[['clue','carro_farol_apagado',true]]),C('Perguntar se Moisés voltou à propriedade','d14',[['clue','moises_parou_portao',true]]),C('Agradecer e não pressionar','d14',[['bond','rayssa',3]])]));
E.push(N('d14','LAKEWOOD · FIM DE TARDE','18:20','town',`O grupo combina se encontrar à noite para comparar as descobertas. Isabella insiste para ninguém ficar sozinho. Samuel responde no grupo com um simples “ok”; Allan manda um adesivo de gato assustado; Laisla pergunta três vezes se todos chegaram bem.

Você recebe uma ligação de número restrito no exato momento em que o céu começa a escurecer. Atende depois do terceiro toque.

Voz desconhecida: — Vocês acham mesmo que o pior aconteceu naquela estrada?

Você: — Quem é você? Para de se esconder e fala comigo.

Voz desconhecida: — Você ainda acha que conhece seus amigos, {nome}? Pergunta a eles quem apagou as mensagens daquela noite.

A chamada cai antes que você consiga dizer mais uma palavra. Logo em seguida, aparece uma mensagem de Isabella: “A Rauanny foi buscar a Laisla. Ela ainda não chegou. Alguém consegue ligar?”`,[
C('Telefonar imediatamente para Rauanny','d15a',[['bond','rauanny',5],['flag','avisou_rauanny',true]]),C('Avisar Ryan e Samuel para irem procurar','d15b',[['flag','mandou_ajuda',true],['bond','ryan',3]]),C('Ligar para Laisla e pedir a localização','d15c',[['flag','ligou_laisla',true],['bond','laisla',4]])]));
E.push(N('d15a','RUA DO BOSQUE · TELEFONEMA','18:24','phone',`Rauanny atende no quarto toque, respirando depressa.

Rauanny: — Tô bem. Quer dizer, acho que tô. Tem um carro passando devagar atrás de mim desde a farmácia.

Você: — Onde você tá exatamente?

Rauanny: — Na rua do bosque. Perto daquelas casas abandonadas. Eu achei que era impressão minha, mas ele apagou o farol quando eu parei.

Você: — Rau, escuta. Não vai pela trilha. Fica na rua principal e entra em algum lugar com gente.

Rauanny: — Tá. Só fica na linha, tá? Não desliga.`,[C('Orientar Rauanny e ir encontrá-la','d16',[['flag','rota_segura_rauanny',true]])]));
E.push(N('d15b','RUA DO BOSQUE · MENSAGENS','18:24','phone',`Ryan atende quase imediatamente.

Ryan: — Tô perto do mercado, dá uns dez minutos. Que foi?

Você explica a ligação e o sumiço momentâneo de Rauanny. O tom dele muda.

Ryan: — Sem gracinha agora. Eu vou com o Samuel. Me manda sua localização e não inventa de ir sozinho.

Ao fundo, você ouve Samuel perguntar o que aconteceu.

Samuel: — Fala pra ele ficar longe do bosque. Tem um trecho sem iluminação.

Você olha o mapa e percebe que é justamente ali que Rauanny deveria estar passando.`,[C('Correr para encontrar a amiga','d16',[['flag','reforco_ryan_samuel',true]])]));
E.push(N('d15c','RUA DO BOSQUE · TELEFONEMA','18:24','phone',`Laisla atende chorando de raiva.

Laisla: — A Rauanny disse que vinha me buscar e sumiu por quinze minutos. Não atende nenhuma mensagem. Isso não parece ela.

Você: — Respira. Onde vocês combinaram?

Laisla: — No ponto da rua do bosque. Ela disse que pegaria o caminho mais curto.

Você: — Vou atrás dela. Chama a Isa e manda alguém ficar com você.

Laisla: — {nome}, por favor. Se você encontrar ela, me liga primeiro. Eu já briguei demais com a minha melhor amiga por besteira.`,[C('Ir à rua do bosque','d16',[['flag','laisla_esperando',true]])]));
E.push(N('d16','RUA DO BOSQUE · NOITE','18:39','forest',`A rua do bosque está quase vazia. A iluminação pública acaba a cinquenta metros de uma antiga passarela que liga duas partes do bairro. Você ouve o barulho de um motor acelerando e, em seguida, um grito abafado.

Rauanny surge entre as árvores, com o celular na mão e o rosto molhado de chuva.

Rauanny: — {nome}! TEM ALGUÉM ATRÁS DE MIM!

Do outro lado da passarela, uma pessoa com capuz escuro e o rosto coberto por uma máscara lisa desce os degraus sem pressa. Não há nada de sobrenatural nela. Isso é o que torna tudo pior: é uma pessoa real, escolhendo continuar.

Você: — RAU, CORRE! AGORA!

A figura acelera. Rauanny tropeça no desnível da calçada e recupera o equilíbrio por pouco. Você tem segundos para decidir como ajudá-la.`,[
C('Puxar Rauanny pela passagem iluminada','d17a',[['flag','fuga_passagem',true],['bond','rauanny',6]]),C('Derrubar um contêiner para bloquear o perseguidor','d17b',[['flag','bloqueou_passagem',true],['trait','coragem',2]]),C('Correr até a avenida para chamar ajuda','d17c',[['flag','procurou_ajuda',true],['trait','cautela',2]])]));
E.push(N('d17a','PASSAGEM ILUMINADA','18:41','forest',`Você segura Rauanny pela manga e a puxa na direção das lojas. O tênis dela escorrega no asfalto, e os dois quase caem. A pessoa mascarada bate contra a grade atrás de vocês. Há um estalo metálico seco, seguido de passos ainda mais rápidos.

Rauanny: — EU NÃO CONSIGO CORRER MAIS!

Você: — Consegue, sim! Olha pra mim, Rau! Só até a luz!

Quando estão a poucos metros da avenida, ela coloca a mão no braço e faz uma careta. Um corte comprido aparece perto do cotovelo — provavelmente da grade que atravessaram. Não é profundo, mas sangra.`,[C('Ajudar Rauanny a continuar','d18',[['flag','ferida_rauanny',true],['bond','rauanny',7],['clue','grade_passarela',true]])]));
E.push(N('d17b','RUA DO BOSQUE · CONTÊINER','18:41','forest',`Você empurra com toda a força um contêiner de lixo que bloqueia metade da passagem. O barulho metálico ecoa nas casas vazias. A figura tropeça, mas não cai. Rauanny consegue avançar alguns passos.

Rauanny: — CARALHO, {nome}, VOCÊ TÁ MALUCO?!

Você: — DISCUTE COMIGO DEPOIS! VAI!

Ao recuar, você bate o ombro na quina de um muro. A dor explode pelo braço. Por um momento a mão fica dormente, mas você ainda consegue correr.

A pessoa mascarada deixa cair alguma coisa pequena antes de saltar o contêiner. Você vê um brilho perto da sarjeta.`,[C('Seguir correndo, guardando a posição do objeto','d18',[['flag','ferida_protagonista',true],['clue','objeto_sarjeta',true],['bond','rauanny',5]])]));
E.push(N('d17c','AVENIDA · ESQUINA','18:41','road',`Você dispara em direção à avenida gritando por ajuda. Uma mulher sai de uma padaria quase fechando e olha assustada. Ao ouvir seus gritos, ela puxa o telefone para ligar para a polícia.

Atrás de você, Rauanny tenta seguir, mas tropeça no meio-fio. Cai de joelhos, rasgando a calça e a pele. Quando você volta, a figura mascarada já está muito perto.

Você: — NÃO ENCOSTA NELA!

O agressor para por uma fração de segundo, observa as luzes acesas na padaria e recua para a escuridão.

Rauanny: — Ai, porra... meu joelho. Eu achei que ia morrer. Eu achei mesmo.`,[C('Levar Rauanny até a padaria','d18',[['flag','ferida_rauanny',true],['flag','testemunha_padaria',true],['bond','rauanny',4]])]));
E.push(N('d18','PADARIA DA AVENIDA · ABRIGO','18:49','house',`A dona da padaria oferece água e um pano limpo. Rauanny está tremendo tanto que mal consegue segurar o copo. Você sente o próprio coração batendo no pescoço. A ferida de vocês — seja o braço dela, o joelho dela ou seu ombro — é dolorosa, mas ninguém sofreu algo fatal.

A primeira pessoa a chegar é Laisla. Ela quase tropeça ao entrar.

Laisla: — RAUANNY! SUA DESGRAÇADA, EU TÔ TE LIGANDO HÁ MEIA HORA!

Rauanny: — Ai, mulher, não grita comigo agora.

Laisla a abraça com tanta força que Rauanny solta um gemido.

Laisla: — Desculpa. Desculpa. Eu achei que você... eu achei que não ia te ver de novo.

Rauanny: — Eu tô aqui. Tô toda ferrada, mas tô aqui.

Ryan chega logo depois, seguido por Samuel e Allan. A expressão de Allan muda ao ver o ferimento.

Allan: — Puta merda. Isso não é brincadeira. Tem alguém tentando matar a gente.

Você percebe a palavra que ninguém se atreveu a usar até agora: matar.`,[
C('Pedir que chamem atendimento e registrem o ataque','d19a',[['flag','registro_ataque',true],['bond','rayssa',3]]),C('Acalmar Laisla e explicar o que aconteceu','d19b',[['bond','laisla',7],['bond','rauanny',3]]),C('Tentar descrever a máscara para o grupo','d19c',[['clue','mascara_lisa',true],['trait','cautela',1]])]));
E.push(N('d19a','PADARIA · PERTO DO BALCÃO','19:02','house',`Você: — Chega. Tem uma testemunha, tem ferimento, teve perseguição. A gente pode denunciar esse ataque sem contar tudo sobre o verão.

Samuel: — E quando perguntarem por que alguém tá atrás da gente?

Você: — A gente responde o que sabe. Não dá mais pra fingir que isso é só mensagem.

Rauanny: — Pela primeira vez hoje, concordo. Eu não quero voltar praquela rua.

A dona da padaria liga para pedir ajuda. Samuel não gosta, mas desta vez não impede ninguém.`,[C('Continuar a noite','d20') ]));
E.push(N('d19b','PADARIA · MESA DOS FUNDOS','19:02','house',`Você se senta perto de Laisla. Ela continua segurando a mão de Rauanny como se tivesse medo de soltá-la.

Laisla: — A gente brigou antes dela sair. Eu falei um monte de besteira. E pensei que a última coisa que ela ia ouvir de mim era aquilo.

Você: — Vocês se conhecem há anos. Uma discussão não apaga tudo isso.

Rauanny: — Obrigada, {nome}. E Laisla, se você reclamar da minha roupa rasgada eu te expulso daqui.

Laisla solta uma gargalhada chorosa.

Laisla: — Você tá horrível.

Rauanny: — Agora sim. Essa é minha melhor amiga.`,[C('Reunir o grupo','d20') ]));
E.push(N('d19c','PADARIA · JANELA','19:02','house',`Você descreve o capuz, a máscara pálida e a maneira estranhamente cuidadosa com que o perseguidor atravessou a rua. Breno abre as notas do celular e começa a registrar.

Breno: — Ele não parecia perdido, nem bêbado. Sabia por onde sair quando apareceram pessoas.

Isabella: — Isso significa que conhecia a rua. Pode morar aqui. Ou só ter estudado o lugar.

Ryan: — Eu quero saber como ele sabia que a Rau ia passar ali.

Ninguém responde. Seu telefone vibra uma vez, sem notificação visível.`,[C('Voltar para perto dos amigos','d20') ]));
E.push(N('d20','CASA DE ISABELLA · NOITE','20:18','house',`Os oito amigos voltam para a casa de Isabella. Rauanny está com um curativo improvisado, e ninguém brinca com isso. Uma cadeira vazia no centro da sala faz você lembrar do memorial e da maneira como as pessoas evitavam pronunciar o nome de Jullia.

Samuel: — A gente não sai mais sozinho. Nem pra comprar água. Nem pra buscar ninguém.

Isabella: — Você não manda em todo mundo, Samuel. Mas dessa vez concordo.

Rayssa: — Alguém tentou ferir a Rauanny. A Jullia desapareceu. A gente precisa parar de fingir que são coisas separadas.

Allan: — Eu quero fazer uma pergunta muito simples, e eu imploro que ninguém grite: tem alguma coisa daquela noite que alguém aqui não contou?

O olhar de Samuel desvia para a janela. Isabella aperta os lábios. Breno observa o chão. Não é uma resposta. Também não é silêncio inocente.

O telefone fixo da casa — que Isabella jura estar desligado há meses — começa a tocar.`,[
C('Atender antes que alguém impeça','d21a',[['flag','atendeu_fixo_c2',true],['trait','coragem',1]]),C('Pedir a Isabella para colocar no viva-voz','d21b',[['bond','isabella',4],['trait','cautela',1]]),C('Não atender e filmar o telefone tocando','d21c',[['clue','ligacao_telefone_fixo',true]])]));
E.push(N('d21a','CASA DE ISABELLA · TELEFONE FIXO','20:21','phone',`Você tira o aparelho da base. Há estática e, por trás dela, o som abafado de água corrente.

Voz desconhecida: — Você correu bastante hoje. Mas a próxima pessoa talvez não consiga.

Você: — Quem é você? Por que tá fazendo isso?

Voz desconhecida: — Porque vocês fizeram uma promessa a alguém que não podia responder.

O clique de desligar parece alto demais na sala silenciosa.`,[C('Contar exatamente o que ouviu','d22',[['clue','promessa_sem_resposta',true]])]));
E.push(N('d21b','CASA DE ISABELLA · TELEFONE FIXO','20:21','phone',`Isabella atende com a mão trêmula e aperta o botão de viva-voz.

Isabella: — Se você tem alguma coisa pra dizer, fala agora. Todo mundo tá ouvindo.

Voz desconhecida: — Que bom. É melhor quando ninguém pode fingir que não escutou.

Laisla: — Quem é você, seu doente?

Voz desconhecida: — Perguntem quem apagou as mensagens de Jullia naquela noite.

A ligação cai. Samuel empurra a cadeira ao se levantar.`,[C('Perguntar quem apagou as mensagens','d22',[['clue','mensagens_apagadas_jullia',true]])]));
E.push(N('d21c','CASA DE ISABELLA · TELEFONE FIXO','20:21','phone',`O telefone toca seis vezes. Você grava a tela, a sala e a expressão de todos. Quando o som para, chega uma mensagem ao celular de Isabella, de número desconhecido.

Mensagem: — VOCÊS NÃO PRECISAM ATENDER PARA OUVIR O PRÓXIMO GRITO.

Allan: — Tá. Alguém vai me explicar como um telefone desligado resolveu tocar sozinho?

Breno: — Talvez não estivesse desligado. Talvez alguém soubesse o número e estivesse esperando a gente se reunir.

Seu vídeo registra um detalhe: Samuel parece reconhecer a mensagem antes de Isabella mostrá-la.`,[C('Guardar a gravação como prova','d22',[['clue','video_reacao_samuel',true]])]));
E.push(N('d22','CASA DE ISABELLA · SALA','20:29','house',`A chuva começa a bater nas janelas outra vez. Durante um instante, o grupo inteiro parece voltar para dentro da van: Samuel tentando dar ordens, Isabella assumindo o controle, Laisla e Rauanny grudadas uma na outra, Ryan em silêncio, Rayssa chorando sem fazer barulho, Allan prestando atenção em todos, Breno procurando seu olhar.

Você: — Acabou a época de fingir que isso não aconteceu. Alguém está atacando as pessoas que estavam naquela estrada. E essa pessoa sabe mais do que a gente imagina.

Rayssa: — Então a gente fica junto. E amanhã descobre o que foi apagado. Com ajuda, se precisar.

Samuel: — E se isso não parar?

Você olha ao redor. Ninguém tem resposta.

No lado de fora da casa, uma figura com máscara clara atravessa a rua sem olhar para trás. A câmera permanece na janela vazia depois que ela desaparece.`,[C('Encerrar o capítulo e salvar o progresso','fim06',[['flag','sobreviveu_primeiro_ataque',true]])]));
E.push(N('fim06','LAKEWOOD · MADRUGADA','00:07','phone',`FIM DO CAPÍTULO 2 — NINGUÉM ESTÁ SEGURO.

Você e Rauanny sobreviveram ao primeiro ataque, mas a noite deixou ferimentos, suspeitas e novas perguntas. As decisões sobre a rota de fuga, o pedido de ajuda, as pistas e as conversas com os amigos foram registradas para os capítulos seguintes.

ENQUANTO ISSO, EM UM QUARTO DESCONHECIDO...

Uma mão coloca sobre a mesa uma fotografia antiga de Jullia na festa. Ao lado, repousa um telefone com uma conversa apagada. A tela acende apenas por tempo suficiente para mostrar uma data — a noite do desaparecimento.

Depois, escurece.`,[]));
const old=window.NODES.fim04;
old.choices=[C('CAPÍTULO 2 · Continuar no dia seguinte à homenagem','d01')];
window.HISTORIA.push(...E);for(const node of E){if(window.NODES[node.id])throw Error('ID duplicado: '+node.id);window.NODES[node.id]=node}
})();
