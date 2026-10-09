/* O ÚLTIMO GRITO · V0.3 · roteiro original em nós, sem dependências externas. */
window.ELENCO=[
['rayssa','Rayssa Santos',19,'Atenta e empática; melhor amiga de Isabella. É a primeira a perceber quando alguém está sofrendo.'],
['ryan','Ryan Cariolato',18,'Extrovertido e provocador. Tem intimidade com Rauanny e Laisla, mas evita conflitos sérios.'],
['laisla','Laisla Sousa',19,'Franca, afetuosa e temperamental. Melhor amiga de Rauanny; as duas se amam e vivem se estranhando.'],
['samuel','Samuel Campos',18,'Dono da van, confiante e teimoso. Muito próximo de Allan; tenta controlar tudo quando está com medo.'],
['rauanny','Rauanny Borges',19,'Intensa e orgulhosa. Defende Laisla, mesmo quando discutem; não tolera falsidade.'],
['allan','Allan Lira',18,'Gay, expansivo e dono das melhores tiradas. É especialmente próximo de Samuel, mas não concorda com tudo que ele faz.'],
['isabella','Isabella Almeida',19,'Melhor amiga de Rayssa. Ácida, prática e defensiva; quando entra em pânico, tenta comandar os demais.'],
['breno','Breno Ferreira',18,'Mais reservado que os outros. Se sente deslocado nas festas, mas tem uma amizade muito forte com o protagonista.']
];
const N=(id,chapter,location,time,scene,text,choices=[],speaker='NARRAÇÃO')=>({id,chapter,location,time,scene,text,choices,speaker});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const P='PRÓLOGO · A NOITE EM QUE TUDO MUDOU',A='CAPÍTULO 01 · UM ANO DEPOIS';
window.HISTORIA=[
N('p01',P,'LAKEWOOD · ESTRADA DO LAGO','19:12','town',`O sol se esconde atrás das colinas de Lakewood. À beira da estrada, o lago parece uma lâmina escura refletindo as últimas faixas alaranjadas do céu. No celular, o convite de Jullia Gomes ainda está aberto: uma festa na propriedade da família, música ao vivo, piscina iluminada e uma lista de convidados que parece não ter fim.\n\nBreno: — {nome}, você tá ouvindo? Já perguntei três vezes se a gente vai ficar até tarde.\n\nVocê está no banco ao lado da janela, enquanto Allan descreve a festa com uma empolgação quase teatral. Lá fora, a cidade vai ficando pequena. A noite, ainda jovem, promete ser inesquecível.`,[C('Dizer a Breno que vocês podem sair juntos se ele quiser','p02a',[['bond','breno',8],['trait','empatia',1]]),C('Entrar na animação de Allan sobre a festa','p02b',[['bond','allan',6],['trait','coragem',1]]),C('Perguntar por que Jullia convidou todo mundo','p02c',[['clue','convite_jullia',true],['trait','cautela',1]])]),
N('p02a',P,'VAN · CAMINHO DA FESTA','19:15','road',`Breno sorri de lado, quase imperceptivelmente.\n\nBreno: — Valeu. Você sabe que essas festas cheias me cansam. Não é que eu não goste deles... Só parece que eu tô sempre sobrando.\n\nAllan, do banco de trás, se inclina entre vocês.\n\nAllan: — Eu ouvi esse drama, tá? Ninguém vai sobrar hoje. Se alguém ficar sozinho, eu arrasto pra pista. Inclusive você, Breno.\n\nBreno ri, e por um instante o clima fica leve.`,[C('Continuar','p03')]),
N('p02b',P,'VAN · CAMINHO DA FESTA','19:15','road',`Allan bate palmas, como se você tivesse acabado de lhe entregar o microfone de um show.\n\nAllan: — É DISSO que eu tô falando! {nome}, hoje ninguém vai me segurar. A não ser que apareça um boy bonito, aí eu aceito ser segurado.\n\nSamuel: — Allan, pelo amor de Deus, se você gritar no meu ouvido mais uma vez, eu te deixo na estrada.\n\nAllan: — E perder seu melhor passageiro? Nem você acredita nessa ameaça, meu querido.\n\nO grupo ri. Até Samuel deixa escapar um sorriso.`,[C('Continuar','p03')]),
N('p02c',P,'VAN · CAMINHO DA FESTA','19:15','road',`Isabella ergue as sobrancelhas.\n\nIsabella: — Porque ela tem uma mansão e quer mostrar pra cidade inteira, talvez?\n\nRayssa: — Não fala assim. Jullia me disse que nem queria fazer a festa. Foi ideia dos pais dela, pra distrair a cabeça.\n\nLaisla: — Distrair do quê?\n\nRayssa hesita.\n\nRayssa: — Ela e Moisés não estão bem. E eu acho que ela anda meio sozinha.\n\nA conversa muda de assunto depressa demais para parecer natural.`,[C('Continuar','p03')]),
N('p03',P,'PORTÕES DA PROPRIEDADE GOMES','19:38','house',`A van passa por um portão de ferro cercado por árvores altas. A casa dos Gomes surge no fim da alameda: paredes claras, janelas gigantes e uma piscina acesa como um retângulo azul no escuro. Música vibra até no volante. Há carros importados ao longo do gramado.\n\nRyan: — Rapaz... Essa menina mora num hotel?\n\nRauanny: — É por isso que metade do pessoal apareceu, né. Festa de rico, comida de graça e foto bonita.\n\nLaisla: — Você fala como se não tivesse passado uma hora escolhendo roupa.\n\nRauanny: — E você fala como se não tivesse me pedido opinião sobre cada uma das suas.\n\nAllan: — Pronto. Nem entramos e as casadas já estão discutindo.`,[C('Defender a festa e agradecer o convite','p04a',[['bond','rayssa',5],['trait','empatia',1]]),C('Brincar com Rauanny e Ryan','p04b',[['bond','rauanny',4],['bond','ryan',4]]),C('Observar o comportamento de Breno','p04c',[['bond','breno',4],['clue','breno_desconfortavel',true]])]),
N('p04a',P,'ENTRADA DA FESTA','19:41','party',`Rayssa olha para você com gratidão.\n\nRayssa: — Obrigada. Às vezes parece que ninguém pensa na Jullia como uma pessoa de verdade.\n\nIsabella: — Tá, tá. A gente vai ser educado. Pelo menos nos primeiros dez minutos.\n\nVocê vê Jullia perto da porta, tentando sorrir enquanto abraça convidados que mal reconhece.`,[C('Ir cumprimentar Jullia','p05')]),
N('p04b',P,'ENTRADA DA FESTA','19:41','party',`Ryan passa um braço pelos ombros de Laisla e Rauanny, que imediatamente começam a disputar quem vai tirar a primeira foto.\n\nRyan: — Se vocês brigarem aqui na entrada, vão estragar o cenário dos ricos.\n\nLaisla: — Ela começou.\n\nRauanny: — Ela SEMPRE fala isso.\n\nVocês riem, mas a troca de olhares entre as duas tem um fundo de cansaço que ninguém comenta.`,[C('Ir cumprimentar Jullia','p05')]),
N('p04c',P,'ENTRADA DA FESTA','19:41','party',`Breno fica alguns passos atrás, alisando a manga da camisa.\n\nBreno: — Um monte de gente que nem conhece a Jullia direito. Parece meio estranho, né?\n\nVocê acompanha o olhar dele: junto à porta, Jullia recebe os convidados com um sorriso cansado.\n\nBreno: — Acho que eu prefiro ficar perto de você hoje. Se não for incômodo.`,[C('Garantir a Breno que ele pode ficar com você','p05',[['bond','breno',7]])]),
N('p05',P,'SALÃO PRINCIPAL','19:48','party',`Jullia Gomes, 19 anos, usa um vestido escuro simples demais para o tamanho daquela festa. Há olheiras discretas sob os olhos e a expressão de quem não dormiu bem. Quando vê o grupo, abre um sorriso de verdade pela primeira vez naquela noite.\n\nJullia: — Vocês vieram! Nossa, eu tava começando a achar que iam me dar bolo.\n\nRayssa a abraça demoradamente. Isabella oferece um beijo no rosto, enquanto Ryan tenta fazer uma reverência exagerada diante da decoração luxuosa.\n\nJullia: — Para, idiota! Vocês vão me fazer rir na frente de todo mundo.\n\nA música aumenta. Jullia encara a escada por um instante, procurando alguém.`,[C('Perguntar se Jullia está bem','p06a',[['flag','acolheu_jullia',true],['trait','empatia',1]]),C('Elogiar a festa e tentar animá-la','p06b',[['bond','rayssa',3]]),C('Perguntar por Moisés','p06c',[['clue','moises_ausente',true]])]),
N('p06a',P,'SALÃO PRINCIPAL','19:52','party',`Jullia abaixa um pouco a voz.\n\nJullia: — Pra falar a verdade? Nem tanto. Essa festa era pra ser pequena. Meus pais insistiram. E o Moisés... deixa pra lá.\n\nVocê percebe o esforço que ela faz para impedir as lágrimas.\n\nJullia: — Mas vocês vieram. Isso já faz ficar menos horrível. Obrigada, {nome}. Sério.\n\nPor alguns segundos, ela parece querer contar mais alguma coisa, até ser interrompida por outro convidado.`,[C('Prometer conversar mais tarde','p07',[['flag','prometeu_jullia',true]])]),
N('p06b',P,'SALÃO PRINCIPAL','19:52','party',`Jullia observa as luzes penduradas no teto e os funcionários atravessando o salão com bandejas.\n\nJullia: — Bonita, né? Parece festa de alguém que tá muito feliz.\n\nO comentário não combina com o sorriso que ela tenta manter.\n\nJullia: — Foi mal. Não quero estragar a noite de vocês. Aproveita, tá?\n\nEla toca de leve seu ombro antes de se afastar.`,[C('Seguir para o jardim','p07')]),
N('p06c',P,'SALÃO PRINCIPAL','19:52','party',`O nome provoca uma mudança imediata em Jullia.\n\nJullia: — Moisés? Deve estar por aí. Ele disse que vinha mais tarde. Quer dizer... ele disse várias coisas.\n\nRayssa muda de assunto antes que o silêncio fique desconfortável.\n\nRayssa: — Vamos pegar alguma coisa pra comer? Jullia, você precisa respirar um pouco.\n\nJullia concorda, mas seu olhar volta a percorrer o salão.`,[C('Seguir para o jardim','p07')]),
N('p07',P,'JARDIM DA MANSÃO','20:24','party',`O jardim parece um mundo à parte. Lanternas pendem das árvores, as caixas de som tocam uma música lenta perto da piscina e pequenos grupos se espalham pelos sofás.\n\nLaisla e Rauanny discutem sobre uma foto que nenhuma das duas quer apagar. Ryan tenta mediar, mas acaba rindo das duas. Isabella tira selfies com Rayssa; Allan dança sozinho com uma confiança contagiante.\n\nNo deck, Breno está encostado na grade, observando o reflexo das luzes na água. Samuel conversa com alguns conhecidos ao lado de uma mesa de bebidas.\n\nVocê tem um tempo antes que a noite saia dos trilhos.`,[C('Conversar com Laisla, Rauanny e Ryan','p08a',[['bond','laisla',4],['bond','rauanny',4]]),C('Procurar Allan e Samuel','p08b',[['bond','allan',5],['bond','samuel',3]]),C('Ficar um pouco com Breno','p08c',[['bond','breno',9]]),C('Conversar com Rayssa e Isabella','p08d',[['bond','rayssa',5],['bond','isabella',4]])]),
N('p08a',P,'BORDA DA PISCINA','20:31','party',`Laisla está indignada com uma fotografia em que aparece de olhos fechados.\n\nLaisla: — Rauanny, você postou de propósito!\n\nRauanny: — Mulher, você saiu linda em todas as outras. É só uma foto!\n\nRyan: — Eu apoio que vocês resolvam isso num tribunal. Posso ser o juiz e cobrar em salgadinho.\n\nLaisla tenta segurar a risada, mas não consegue. Rauanny ajeita o cabelo da amiga com um gesto familiar, como se a discussão nunca tivesse acontecido.\n\nLaisla: — Tá. Mas você vai tirar outra comigo. Uma decente.`,[C('Brincar a sós com Ryan','px_ryan',[['romance','ryan',5]]),C('Apoiar Rauanny na discussão','px_rauanny',[['bond','rauanny',6],['romance','rauanny',3]]),C('Voltar à festa','p09')]),
N('p08b',P,'ÁREA DA MÚSICA','20:31','party',`Allan segura o braço de Samuel e tenta puxá-lo para dançar.\n\nAllan: — Uma música! Uma. Você tem coordenação suficiente pra dirigir, então consegue mexer os pés.\n\nSamuel: — Duas coisas diferentes. E eu não tô bêbado o bastante pra passar essa vergonha.\n\nAllan: — Ótimo. Então não fica bêbado, porque você vai dirigir depois.\n\nSamuel desvia com uma risada, mas continua com o copo na mão. Você percebe que Allan não ri dessa vez.`,[C('Avisar Samuel para não beber dirigindo','p09',[['flag','alertou_samuel',true],['bond','allan',4],['bond','samuel',-3]]),C('Deixar o assunto passar','p09',[['flag','ignorou_bebida',true]])]),
N('p08c',P,'DECK DO JARDIM','20:31','lake',`Breno abre espaço ao lado dele. O som da festa chega abafado até o deck.\n\nBreno: — Sabe uma coisa estranha? A Jullia passou por aqui e perguntou se todo mundo tava se divertindo. Ninguém perguntou o mesmo pra ela.\n\nVocê olha para a mansão. Através das janelas, os convidados parecem dançar dentro de um aquário iluminado.\n\nBreno: — Eu sei que o pessoal é nosso amigo. Só acho que às vezes a gente passa do ponto. Se der alguma confusão hoje, fica perto de mim, tá?`,[C('Dizer que confia nele','px_breno',[['bond','breno',6],['flag','confiou_breno',true]]),C('Perguntar se ele desconfia de alguém','p09',[['clue','breno_observador',true]])]),
N('p08d',P,'VARANDA SUPERIOR','20:31','house',`Rayssa mostra no celular uma foto das duas quando eram crianças. Isabella reclama da própria franja e tenta pegar o aparelho.\n\nIsabella: — Apaga isso! Eu parecia uma criança de comercial de shampoo que deu errado.\n\nRayssa: — Você era linda. Continua sendo chata, mas linda.\n\nAs duas riem. Quando você se aproxima, Rayssa fica séria.\n\nRayssa: — A Jullia não tá legal. Eu queria que ela tivesse uma noite boa, só isso.\n\nIsabella: — A gente não pode consertar a vida amorosa de ninguém, Rayssa. Mas pode pelo menos não piorar.`,[C('Concordar com Rayssa','px_rayssa',[['bond','rayssa',6]]),C('Concordar com Isabella','p09',[['bond','isabella',5]])]),

N('px_ryan',P,'PISCINA · LADO MAIS CALMO','20:38','party',`Ryan caminha com você até um canto menos barulhento. Por alguns segundos, a música chega abafada e vocês conseguem ouvir os grilos perto do jardim. Ele observa as pessoas dançando pela vidraça.

Ryan: — Sabe o que é engraçado? Eu faço piada de tudo, mas tem dia que eu só queria ficar quieto. Com alguém que não me cobrasse ser engraçado o tempo inteiro.

Você: — Você não precisa fazer show comigo.

Ryan: — Não fala assim, {nome}. Vou acabar achando que você gosta da minha companhia.

Ele sorri, mas a pergunta escondida na brincadeira fica entre vocês.`,[C('Flertar: dizer que gosta mais do que ele imagina','p09',[['romance','ryan',12],['bond','ryan',5],['flag','flertou_ryan',true]]),C('Brincar e oferecer amizade','p09',[['bond','ryan',7]])]),
N('px_rauanny',P,'PISCINA · CADEIRAS DE MADEIRA','20:39','party',`Rauanny puxa uma cadeira e cruza os braços. Laisla já se afastou para buscar bebida; o silêncio faz a irritação dela parecer menos teatral.

Rauanny: — Às vezes eu acho que a Laisla não percebe como as coisas que ela fala me machucam. Eu adoro aquela menina. Mas amizade também cansa, sabia?

Você: — Vocês duas parecem irmãs. Brigam e cinco minutos depois estão juntas.

Rauanny: — É. Só que eu também queria que alguém percebesse quando eu tô cansada de ser a forte da história.

Ela sustenta seu olhar e sorri de um jeito inesperadamente tímido.`,[C('Dizer que ela pode baixar a guarda com você','p09',[['romance','rauanny',12],['bond','rauanny',6],['flag','flertou_rauanny',true]]),C('Sugerir uma conversa com Laisla','p09',[['bond','rauanny',5],['bond','laisla',3]])]),
N('px_breno',P,'DECK · REFLEXO DAS LUZES','20:39','lake',`Breno esfrega as mãos para se aquecer. Ele não costuma puxar conversas longas, mas hoje parece ter preparado alguma coisa para dizer.

Breno: — Eu sempre falo que odeio festas. Só que não é exatamente isso. É entrar num lugar e pensar que ninguém vai sentir minha falta se eu sair.

Você: — Eu sentiria.

Breno: — Você fala isso tão fácil... Eu queria conseguir acreditar em coisas boas sem ficar procurando uma pegadinha.

Ele olha para a sua mão apoiada na grade. A distância entre os dedos de vocês é pequena.`,[C('Encostar sua mão na dele','p09',[['romance','breno',13],['bond','breno',8],['flag','flertou_breno',true]]),C('Prometer não deixá-lo sozinho','p09',[['bond','breno',9]])]),
N('px_rayssa',P,'VARANDA · PERTO DAS LANTERNAS','20:41','house',`Isabella se afasta para atender uma ligação. Rayssa fica olhando a festa lá embaixo, segurando o celular contra o peito.

Rayssa: — A Isa diz que eu quero salvar todo mundo. Talvez seja verdade. Mas a Jullia sempre pergunta se a gente tá bem, e quase ninguém pergunta isso pra ela.

Você: — E você? Tá bem, Ray?

Rayssa dá uma risada pequena, sem humor.

Rayssa: — Viu? É por isso que eu gosto de conversar com você. Você não faz parecer uma pergunta boba.

Ela se aproxima da grade ao seu lado; o ombro dela encosta no seu.`,[C('Segurar delicadamente a mão de Rayssa','p09',[['romance','rayssa',12],['bond','rayssa',7],['flag','flertou_rayssa',true]]),C('Agradecer pela amizade das duas','p09',[['bond','rayssa',7],['bond','isabella',4]])]),
N('p09',P,'SALÃO DA FESTA','21:10','party',`O clima muda quando um grupo se reúne perto da cozinha. Jullia desapareceu por alguns minutos, e parte dos amigos começa a comentar a festa em voz alta.\n\nRyan: — Nunca vi uma festa tão cara com tanta gente de cara fechada.\n\nIsabella: — Tem gente que só veio aqui pra mostrar que foi convidada.\n\nRauanny: — Incluindo você, né? Já postou quinze stories.\n\nLaisla: — Gente, para. A Jullia pode ouvir.\n\nSamuel: — Ah, para de fingir. Metade daqui só veio porque ela tem dinheiro.\n\nAllan: — Samuel, baixa a voz. Isso não tem graça.\n\nUma sombra para na entrada da cozinha. Jullia está ali, segurando um copo de água.`,[C('Interromper a conversa e defender Jullia','p10a',[['flag','defendeu_jullia',true],['trait','empatia',2],['bond','rayssa',6]]),C('Ficar em silêncio, desconfortável','p10b',[['flag','silenciou_fofoca',true]]),C('Repreender Samuel em voz alta','p10c',[['bond','samuel',-7],['bond','allan',5],['trait','coragem',1]])]),
N('p10a',P,'COZINHA DA MANSÃO','21:12','house',`Você tenta conter a conversa, mas já é tarde. Jullia ouve a última frase.\n\nJullia: — Então era isso? Vocês vieram pela minha casa? Pela comida? Pelo que eu posso pagar?\n\nRayssa: — Jullia, espera. Nem todo mundo tava falando...\n\nJullia: — Eu ouvi, Rayssa. E ouvi muito bem.\n\nEla olha rapidamente para você, como se reconhecesse sua tentativa de defendê-la. A gratidão dura apenas um segundo; a mágoa é maior.`,[C('Tentar conversar com ela','p11')]),
N('p10b',P,'COZINHA DA MANSÃO','21:12','house',`O barulho da festa parece sumir. Jullia deixa o copo sobre a bancada, cuidadosamente, como alguém tentando não perder o controle.\n\nJullia: — Nossa. Eu sabia que vocês gostavam das minhas festas. Não sabia que era a única coisa de que gostavam em mim.\n\nLaisla: — Não é assim...\n\nJullia: — Então explica. Por favor. Eu adoraria ouvir.\n\nNinguém consegue responder de imediato. Seu silêncio pesa mais do que você imaginava.`,[C('Tentar se explicar','p11')]),
N('p10c',P,'COZINHA DA MANSÃO','21:12','house',`Você corta Samuel antes que ele continue. Ele ergue as mãos, irritado.\n\nSamuel: — Ah, pronto. Agora ninguém pode falar mais nada.\n\nAllan: — Pode falar. Só não precisa ser cruel.\n\nJullia aparece atrás de vocês. O rosto dela se fecha ao entender o assunto.\n\nJullia: — Não precisa parar por minha causa. Continua, Samuel. É bom saber o que vocês pensam.\n\nA coragem de Samuel evapora.`,[C('Pedir desculpas a Jullia','p11')]),
N('p11',P,'ENTRADA PRINCIPAL','21:19','house',`Jullia respira fundo. Os olhos estão cheios de lágrimas, mas ela se recusa a chorar diante de vocês.\n\nJullia: — Eu não queria essa festa. Eu falei pros meus pais que não queria. Mas pensei... pensei que pelo menos vocês iam estar aqui porque gostam de mim.\n\nRayssa: — Eu gosto de você. De verdade.\n\nJullia: — Eu sei, Rayssa. E sei que nem todo mundo falou. Mas eu não consigo olhar pra nenhum de vocês agora.\n\nEla abre a porta.\n\nJullia: — Eu quero que vocês vão embora. Todos. Por favor.\n\nLaisla tenta tocar o braço dela; Jullia recua. A festa continua acontecendo atrás da porta, indiferente.`,[C('Pedir desculpas antes de sair','p12a',[['flag','pediu_desculpas',true],['trait','empatia',1]]),C('Acompanhar Rayssa e dar espaço a Jullia','p12b',[['bond','rayssa',5]]),C('Sair com o grupo sem responder','p12c',[['bond','samuel',3]])]),
N('p12a',P,'ALAMEDA DA MANSÃO','21:25','forest',`Jullia não fecha a porta de imediato.\n\nVocê: — Jullia, eu sinto muito. De verdade.\n\nJullia: — Eu queria acreditar que isso resolve alguma coisa, {nome}. Eu queria muito.\n\nA porta se fecha devagar. Rayssa enxuga os olhos antes de se juntar ao grupo na alameda.`,[C('Seguir para a van','p13')]),
N('p12b',P,'ALAMEDA DA MANSÃO','21:25','forest',`Rayssa anda com os braços cruzados, em silêncio. Isabella tenta abraçá-la; ela apenas balança a cabeça.\n\nRayssa: — Ela não merecia isso. Não hoje.\n\nVocê acompanha Rayssa pela alameda enquanto a música fica distante. Atrás de vocês, a porta da mansão se fecha.`,[C('Seguir para a van','p13')]),
N('p12c',P,'ALAMEDA DA MANSÃO','21:25','forest',`Samuel caminha depressa até a van.\n\nSamuel: — Ela exagerou. Tá todo mundo fazendo tempestade por uma frase.\n\nAllan: — Não foi uma frase, Samuel. Foi o jeito que vocês falaram dela.\n\nA discussão continua enquanto a mansão desaparece entre as árvores.`,[C('Seguir para a van','p13')]),
N('p13',P,'MANSÃO GOMES · CORREDOR LATERAL','21:31','house',`ENQUANTO ISSO — JULLIA\n\nLonge do grupo, Jullia atravessa o corredor quase vazio. As vozes da festa parecem vir de um lugar onde ela não pertence. Ela tira os sapatos e para ao ouvir uma risada conhecida.\n\nMoisés está junto à varanda lateral, abraçado a outra pessoa. O beijo não deixa espaço para dúvidas.\n\nJullia: — Moisés?\n\nEle se afasta num sobressalto.\n\nMoisés: — Jullia, espera. Isso não é...\n\nJullia: — Não termina essa frase. Por favor, não termina.\n\nDepois de ser humilhada pelos amigos, a traição do namorado faz o pouco controle que lhe restava desaparecer.`,[C('Continuar a cena','p14')]),
N('p14',P,'MANSÃO GOMES · LIMITE DA MATA','21:36','forest',`Moisés tenta alcançá-la no jardim.\n\nMoisés: — Você também se afastou de mim. Faz semanas que mal conversa comigo!\n\nJullia: — Eu estava tentando pedir ajuda! Você disse que eu era dramática!\n\nMoisés: — Não dá pra conversar quando você transforma tudo num problema!\n\nA frase a atinge em cheio. Jullia recua, chorando.\n\nJullia: — Então não conversa. Não vem atrás de mim.\n\nEla corre para a trilha escura que atravessa a propriedade e leva à estrada do lago. Os galhos arranham seus braços. Atrás dela, a música continua tocando.`,[C('Voltar ao grupo','p15')]),
N('p15',P,'VAN DE SAMUEL','21:42','road',`Samuel dirige com os ombros tensos. Você está no banco de passageiro. No retrovisor, as luzes da mansão já desapareceram.\n\nBreno está quieto junto à janela. Rayssa olha o celular repetidas vezes, como se aguardasse uma mensagem de Jullia. Allan tenta aliviar o clima, mas as piadas caem no vazio.\n\nLaisla, Ryan, Rauanny e Isabella ocupam os bancos de trás. Ainda há copos de bebida circulando; uma música exageradamente animada toca no rádio.\n\nSamuel leva um copo à boca enquanto segura o volante com a outra mão. Você sente o estômago apertar.`,[C('Exigir que Samuel pare de beber ao volante','p16a',[['flag','confrontou_samuel',true],['bond','samuel',-7],['bond','allan',6],['trait','coragem',1]]),C('Pedir que ele dirija com cuidado','p16b',[['flag','alertou_direcao',true]]),C('Falar com Breno sobre a festa','p16c',[['bond','breno',5]])]),
N('p16a',P,'VAN · ESTRADA DA MATA','21:44','road',`Você: — Samuel, coloca esse copo no chão. Você tá dirigindo.\n\nSamuel: — Eu sei muito bem o que tô fazendo.\n\nAllan: — Pela primeira vez hoje, eu concordo cem por cento com {nome}. Larga isso, Sam.\n\nSamuel joga o copo no porta-objetos com irritação.\n\nSamuel: — Pronto. Felizes? Agora dá pra todo mundo me deixar em paz?\n\nA van continua pela estrada estreita, sacudindo nas irregularidades do asfalto.`,[C('Continuar','p17')]),
N('p16b',P,'VAN · ESTRADA DA MATA','21:44','road',`Você: — Samuel, por favor. Essa estrada é apertada e tá escuro. Vai mais devagar.\n\nSamuel: — Relaxa, {nome}. Eu faço esse caminho desde criança.\n\nAllan: — Isso é o tipo de frase que alguém fala antes de dar problema.\n\nSamuel: — Você quer dirigir, Allan?\n\nAllan: — Se você me deixar, quero.\n\nSamuel não responde. A música sobe um pouco mais.`,[C('Continuar','p17')]),
N('p16c',P,'VAN · ESTRADA DA MATA','21:44','road',`Breno se inclina para a frente quando você chama seu nome.\n\nBreno: — Eu tô pensando na Jullia. A gente devia ter ficado pra conversar depois.\n\nVocê: — Acho que ela precisava de espaço.\n\nBreno: — Talvez. Mas eu conheço aquele jeito de olhar. Às vezes a pessoa diz que quer ficar sozinha quando queria que alguém percebesse que ela não tá bem.\n\nNa frente, Samuel toma mais um gole da bebida antes de dobrar a próxima curva.`,[C('Continuar','p17')]),
N('p17',P,'VAN · CURVA DOS PINHEIROS','21:48','road',`Um grito explode no fundo da van.\n\nLaisla: — RYAN! OLHA O QUE VOCÊ FEZ!\n\nO copo de Rauanny vira sobre o banco. Bebida escorre pela mochila de Isabella e cai no piso.\n\nIsabella: — Não! Meu celular tava aqui! Vocês são idiotas?\n\nRauanny: — Não fui eu, foi o Ryan!\n\nRyan: — Eu nem encostei! Laisla me empurrou!\n\nLaisla: — Porque você tava puxando meu braço!\n\nSamuel olha pelo retrovisor.\n\nSamuel: — O QUE VOCÊS TÃO FAZENDO COM A MINHA VAN?!`,[C('Mandar o grupo parar de discutir','p18',[['trait','coragem',1]]),C('Pedir que Samuel olhe para a estrada','p18',[['flag','tentou_evitar_acidente',true]]),C('Virar para conferir a confusão','p18',[['flag','olhou_para_tras',true]])]),
N('p18',P,'VAN · CURVA DOS PINHEIROS','21:49','road',`Samuel gira o corpo para trás, furioso, tentando descobrir quem derramou bebida no banco. A van começa a invadir a faixa oposta. Você se vira para entender a gritaria, depois encara novamente o para-brisa.\n\nO feixe dos faróis alcança uma figura na estrada. Uma pessoa, sozinha, saindo da margem da mata.\n\nPor um segundo, o mundo parece parar. Você vê o rosto úmido de lágrimas, o vestido escuro, o movimento desesperado de quem não consegue sair do caminho.\n\nVocê: — SAMUEL, PARA! TEM ALGUÉM NA FRENTE!\n\nSamuel volta o rosto. Seus olhos se arregalam. Ele pisa no freio.\n\nO impacto vem antes do silêncio.`,[C('Continuar','p19')]),
N('p19',P,'ESTRADA DO LAGO','21:50','road',`A van para atravessada. Por alguns segundos, ninguém sabe se está ferido. O rádio ainda toca, baixo e distorcido.\n\nAllan: — Meu Deus. Meu Deus, o que foi isso?\n\nSamuel: — Eu... eu não vi. Eu não vi ninguém.\n\nRayssa: — Tinha alguém na estrada. Eu vi!\n\nIsabella: — Todo mundo tá bem? Responde, gente!\n\nBreno segura seu braço, procurando seus olhos.\n\nBreno: — {nome}, tá tudo bem? Você se machucou? Fala comigo.\n\nLá fora, os faróis iluminam apenas a neblina. Rayssa aponta para alguns metros adiante. Há uma pessoa caída na pista.`,[C('Sair primeiro para procurar a vítima','p20a',[['trait','coragem',2],['bond','breno',3]]),C('Pedir que alguém ligue para a emergência','p20b',[['flag','quis_chamar_ajuda',true],['trait','empatia',2]]),C('Conferir se os amigos estão feridos','p20c',[['bond','rayssa',4],['bond','allan',4]])]),
N('p20a',P,'ESTRADA DO LAGO','21:52','road',`Você abre a porta. O cheiro de pneu queimado mistura-se ao ar úmido da mata. Cada passo até o corpo parece mais difícil que o anterior.\n\nRayssa vem logo atrás, tremendo. Samuel sai da van e fica parado, incapaz de se aproximar.\n\nRayssa: — Por favor, diz que ela tá respirando. Por favor...\n\nQuando a luz alcança o rosto da pessoa caída, Rayssa leva as mãos à boca.`,[C('Descobrir quem foi atingido','p21')]),
N('p20b',P,'ESTRADA DO LAGO','21:52','road',`Você pega o celular com dedos trêmulos.\n\nVocê: — Alguém liga pra emergência, agora! A gente não sabe se essa pessoa tá viva!\n\nIsabella: — Espera! Primeiro a gente precisa entender o que aconteceu!\n\nAllan: — Isabella, pelo amor de Deus!\n\nBreno acompanha você até o asfalto. A poucos metros da van, Rayssa se ajoelha ao lado do corpo e começa a chorar.`,[C('Aproximar-se do corpo','p21')]),
N('p20c',P,'ESTRADA DO LAGO','21:52','road',`Você tenta contar os rostos: um, dois, três... Todos parecem conscientes, embora alguns estejam chorando. Laisla segura Rauanny pelo pulso; as duas se desculpam simultaneamente pela discussão.\n\nAllan: — A gente tá vivo. Mas quem tava na estrada?\n\nRayssa já está fora da van. Quando chega perto do corpo, recua como se tivesse levado outro impacto.\n\nRayssa: — Não... Não, não, não...`,[C('Ir até Rayssa','p21')]),
N('p21',P,'ESTRADA DO LAGO','21:55','road',`É Jullia.\n\nO vestido escuro está sujo de terra. O cabelo cobre parte do rosto. A garota que poucas horas antes os recebera na festa agora está imóvel no asfalto.\n\nRayssa: — Jullia? Jul, escuta minha voz. É a Rayssa. Por favor...\n\nBreno se ajoelha, tentando verificar se ela responde, mas não consegue ter certeza do que sente.\n\nBreno: — Eu não sei. Eu não sei se ela tá respirando. A gente precisa de socorro.\n\nSamuel se aproxima cambaleando.\n\nSamuel: — Não. Não pode ser ela. Isso não tá acontecendo.\n\nA palavra 'acidente' ainda parece pequena demais para descrever o que vocês estão vendo.`,[C('Insistir para chamarem a polícia e ambulância','p22a',[['flag','insistiu_socorro',true],['bond','rayssa',7],['bond','samuel',-7]]),C('Pedir que todos se acalmem antes de decidir','p22b',[['trait','cautela',1]]),C('Confrontar Samuel sobre a direção','p22c',[['bond','samuel',-12],['trait','coragem',1]])]),
N('p22a',P,'ESTRADA DO LAGO','21:58','road',`Você: — Chega. Ela pode estar viva. A gente vai ligar agora.\n\nRayssa: — É isso. Não dá pra deixar ela aqui.\n\nIsabella segura sua mão antes de você desbloquear o aparelho.\n\nIsabella: — E quando perguntarem quem dirigia? Quando perceberem que tinha bebida na van?\n\nAllan: — A resposta é contar a verdade!\n\nSamuel, pálido, ergue a voz.\n\nSamuel: — Você não entende. Vão acabar comigo.`,[C('Continuar a discussão','p23')]),
N('p22b',P,'ESTRADA DO LAGO','21:58','road',`Você pede que todos deem espaço a Jullia. Laisla segura as mãos de Rauanny, que chora sem conseguir formular uma frase.\n\nBreno: — Ela precisa de ajuda. Só isso importa agora.\n\nSamuel: — E se já for tarde?\n\nRayssa: — Não fala assim! Você não sabe!\n\nIsabella olha da van para a estrada vazia. Seu rosto endurece enquanto ela começa a calcular as consequências.`,[C('Continuar a discussão','p23')]),
N('p22c',P,'ESTRADA DO LAGO','21:58','road',`Você: — Você virou pra trás, Samuel. Eu avisei!\n\nSamuel: — Eu sei! Acha que eu não sei? Eu vejo aquela pessoa toda vez que fecho os olhos!\n\nAllan fica entre vocês.\n\nAllan: — Brigar não vai trazer solução. Agora a gente precisa ajudar a Jullia.\n\nIsabella: — E depois? Vocês acham que alguém vai acreditar na nossa versão?\n\nUm vento frio percorre a estrada. Ninguém responde.`,[C('Continuar a discussão','p23')]),
N('p23',P,'ESTRADA DO LAGO','22:03','road',`A discussão explode de vez.\n\nRayssa: — Eu vou chamar a ambulância. Não me interessa o que vai acontecer depois.\n\nIsabella: — Interessa, sim! Samuel bebeu. Todo mundo viu. Alguns de vocês também beberam, e a Jullia tinha acabado de expulsar a gente da festa. Vão achar que fizemos de propósito.\n\nAllan: — E você prefere o quê? Fingir que nada aconteceu?\n\nRyan: — Gente, a gente tá falando da Jullia! Da Jullia que tava com a gente há uma hora!\n\nLaisla: — Meu Deus... Eu falei mal dela. Ela ouviu. Ela saiu chorando...\n\nRauanny: — Laisla, olha pra mim. Você não fez isso acontecer.\n\nSamuel: — Se ligarem, minha vida acabou.\n\nBreno: — A vida de alguém pode acabar se a gente não ligar.`,[C('Reforçar a posição de Breno e Rayssa','p24a',[['flag','defendeu_socorro',true],['bond','breno',8],['bond','rayssa',8],['bond','isabella',-5]]),C('Perguntar a Isabella o que ela propõe','p24b',[['bond','isabella',4],['trait','cautela',1]]),C('Tentar impedir que o grupo se separe','p24c',[['bond','allan',4],['trait','empatia',1]])]),
N('p24a',P,'ESTRADA DO LAGO','22:06','road',`Você fica ao lado de Breno e Rayssa.\n\nVocê: — A gente tem que procurar ajuda. Esconder isso só vai piorar tudo.\n\nSamuel: — Fácil falar quando não era você ao volante!\n\nRayssa: — Ninguém tá dizendo que é fácil, Samuel. Tá dizendo que é o certo!\n\nIsabella: — Vocês não estão pensando no que a polícia vai fazer com todos nós.\n\nNinguém se move para realizar a ligação. Cada segundo de hesitação parece trancar mais uma porta.`,[C('Continuar','p25')]),
N('p24b',P,'ESTRADA DO LAGO','22:06','road',`Você: — Isabella, então fala. O que você acha que a gente deve fazer?\n\nIsabella demora a responder.\n\nIsabella: — Não sei. Eu só sei que ligar agora muda a vida de todos nós. Vão interrogar, vão culpar, vão espalhar a história inteira.\n\nRayssa: — E a Jullia? A vida dela não conta?\n\nIsabella abre a boca e fecha de novo. Pela primeira vez, não encontra uma resposta.`,[C('Continuar','p25')]),
N('p24c',P,'ESTRADA DO LAGO','22:06','road',`Você tenta organizar as vozes. Allan se aproxima, com os olhos marejados.\n\nAllan: — {nome}, eu conheço o Samuel desde pequeno. Mas não consigo defender isso. Não consigo fingir que não aconteceu.\n\nSamuel: — Allan, por favor...\n\nAllan: — Eu tô aqui, Sam. Só não me pede pra dizer que você tá certo.\n\nAtrás de vocês, Rayssa se vira novamente para o corpo.`,[C('Continuar','p25')]),
N('p25',P,'ESTRADA DO LAGO','22:11','road',`Rayssa fala baixo, sem olhar para ninguém.\n\nRayssa: — Então o que a gente vai fazer? Ficar aqui até amanhecer?\n\nSamuel olha para a van, depois para as árvores escuras que cercam a estrada. Ele respira como se cada palavra lhe custasse alguma coisa.\n\nSamuel: — Tem um saco grande no compartimento de carga. A gente pode... tirar ela daqui. Levar até o lago.\n\nLaisla: — Você tá falando de esconder a Jullia? Você perdeu a cabeça?\n\nRyan: — Não. Não, cara. Isso é loucura.\n\nIsabella: — Se alguém encontrar a van assim, vão nos prender.\n\nBreno: — Samuel, pensa no que tá dizendo. Ela é nossa amiga.\n\nAllan: — Tá ouvindo a merda que você tá falando, Samuel? É a Jullia! Ela recebeu a gente na casa dela algumas horas atrás!

Samuel: — E você quer que eu vá preso? Você tava do meu lado quando eu peguei a chave, Allan! Não vem fingir que é santo agora.

Allan: — Eu devia ter tirado essa chave da sua mão. Eu sei. Isso vai me perseguir pra caralho.

Você: — Parem! Todo mundo tá com medo, mas gritar não vai fazer essa noite desaparecer.

Rayssa: — E se ela estiver respirando? Alguém checou direito? A gente nem sabe!

Isabella: — Não fala isso... Ray, por favor, não fala isso.

Breno: — É justamente por isso que precisamos chamar ajuda.

Um barulho atravessa a mata. Todos olham para a escuridão; ninguém consegue identificar se foi um galho partindo ou passos. O silêncio seguinte é horrível. Não há uma decisão limpa, apenas medo.`,[C('Recusar e tentar convencer o grupo uma última vez','p26a',[['flag','resistiu_pacto',true],['bond','breno',6],['bond','samuel',-6]]),C('Permanecer em choque, incapaz de responder','p26b',[['flag','paralisou_na_estrada',true]]),C('Concordar, com medo das consequências','p26c',[['flag','aceitou_ocultacao',true],['bond','samuel',5],['bond','rayssa',-8]])]),
N('p26a',P,'ESTRADA DO LAGO','22:15','road',`Você: — Não! É a Jullia. A gente não pode fazer isso com ela.\n\nBreno: — {nome} tem razão!\n\nSamuel: — Eu não tô pedindo que gostem da ideia! Eu tô tentando impedir que a polícia destrua nossa vida!\n\nIsabella: — Não temos muito tempo. Algum carro pode aparecer.\n\nVocê tenta ligar, mas Samuel arranca o telefone de sua mão em desespero. Allan o obriga a devolver. A discussão se arrasta, e o medo vence cada protesto. Alguns começam a se mover sem que ninguém consiga dizer em voz alta que concordou.`,[C('Continuar','p27')]),
N('p26b',P,'ESTRADA DO LAGO','22:15','road',`As palavras chegam até você como se viessem debaixo d'água. Rayssa soluça. Allan diz que isso vai persegui-los para sempre.\n\nBreno: — {nome}? Olha pra mim. Respira. Você não precisa fingir que tá tudo bem.\n\nAo longe, um farol ilumina as árvores por um segundo antes de virar em outra estrada. O pânico de serem encontrados faz Samuel correr para a van. Ninguém o impede.`,[C('Continuar','p27')]),
N('p26c',P,'ESTRADA DO LAGO','22:15','road',`Você quase não reconhece a própria voz ao concordar.\n\nRayssa: — Não acredito que você também tá dizendo isso.\n\nSamuel: — Não tem volta. Agora a gente precisa agir.\n\nBreno desvia os olhos de você. A pequena distância entre vocês parece enorme.\n\nAllan: — Se a gente fizer isso, não vamos conseguir fingir depois que foi só um acidente. Vocês entendem, né?`,[C('Continuar','p27')]),
N('p27',P,'MARGENS DO LAGO · TRILHA DE SERVIÇO','22:28','lake',`O grupo encontra uma lona grossa de transporte no compartimento da van. Ninguém conversa enquanto cobrem Jullia. O gesto é lento, hesitante e irreversível.\n\nRayssa fica de costas, chorando. Laisla segura sua mão. Rauanny tenta parecer firme, mas sua respiração entrega o pânico. Allan não tira os olhos de Samuel. Breno permanece ao seu lado, sem dizer uma palavra.\n\nA curta caminhada até a margem do lago parece atravessar uma vida inteira. Quando a superfície escura recebe o peso envolto na lona, o som da água se fecha sobre o último vestígio visível daquela noite.\n\nNão há alívio. Só uma ausência insuportável e a pergunta que ninguém tem coragem de fazer: e se Jullia ainda estivesse viva?`,[C('Continuar','p28')]),
N('p28',P,'PÍER DESATIVADO','22:40','lake',`Samuel reúne o grupo junto ao antigo píer. Todos estão sujos de lama, com roupas amassadas e olhos vermelhos.\n\nSamuel: — Ninguém fala sobre isso. Nunca. Nem entre a gente.\n\nRayssa: — Você não tem o direito de decidir o que eu vou lembrar.\n\nIsabella: — Mas todo mundo aqui vai ser arrastado se essa história vier à tona.\n\nRyan: — Então é isso? A gente simplesmente volta pra casa?\n\nAllan: — Não existe 'simplesmente' depois de hoje.\n\nBreno olha para você antes de se pronunciar.\n\nBreno: — Se a gente fizer esse pacto... isso não significa que tá tudo bem. Significa só que estamos com medo.\n\nLaisla, abraçada a Rauanny, balança a cabeça. Samuel estende a mão, não como gesto de amizade, mas como exigência.`,[C('Prometer silêncio, mas guardar a culpa','p29',[['flag','pacto_culpa',true],['trait','empatia',1]]),C('Prometer silêncio apenas para proteger os amigos','p29',[['flag','pacto_protecao',true],['bond','samuel',4]]),C('Dizer que um dia a verdade precisará aparecer','p29',[['flag','prometeu_verdade',true],['bond','breno',5],['bond','isabella',-4]])]),
N('p29',P,'LAKEWOOD · ESTRADA VAZIA','23:08','road',`A van parte antes da meia-noite. Ninguém volta a colocar música. A cidade dorme quando vocês cruzam a placa de boas-vindas a Lakewood.\n\nNo banco de passageiro, você observa as mãos de Samuel presas ao volante. Rayssa chora em silêncio. Isabella fixa o olhar na janela. Allan se encolhe no banco, enquanto Ryan tenta, em vão, dizer alguma coisa a Laisla e Rauanny. Breno encosta os dedos nos seus por um instante, um pedido mudo para que você continue ali.\n\nAquela noite terminou sem sirenes, sem testemunhas aparentes e sem respostas.\n\nMas há segredos que não ficam enterrados.\n\nUM ANO DEPOIS.`,[C('INICIAR CAPÍTULO 01','c01')]),

N('c01',A,'LAKEWOOD · QUARTO DO PROTAGONISTA','15:18','town',`UM ANO DEPOIS.

No alto do guarda-roupa há uma camisa que você nunca mais usou. A da noite em que Jullia desapareceu. Durante meses, você acordou com o barulho imaginário de freios e vidro tremendo. Aprendeu a sorrir quando perguntavam como tinha sido o verão.

Seu celular acende. Uma mensagem de Breno: “Oi, {nome}. Sei que a gente mal se falou. A mãe da Jullia vai fazer uma homenagem hoje, às seis. Eu vou. Você quer que eu te espere na entrada?”

Logo depois chega outra mensagem, de um número do grupo que permaneceu silencioso por quase um ano. Isabella: “Todo mundo foi convidado. Sem drama. Só apareçam.”

Você encara as duas notificações. Pela primeira vez em meses, a cidade parece pequena demais para todos os seus segredos.`,[C('Responder com carinho a Breno','c02a',[['bond','breno',6],['romance','breno',5]]),C('Perguntar a Isabella se realmente todos vão','c02b',[['bond','isabella',3]]),C('Demorar a responder e reler as mensagens antigas','c02c',[['trait','cautela',1]])]),
N('c02a',A,'QUARTO · CELULAR','15:25','phone',`Você: — Eu vou. Obrigado por lembrar de mim. E... eu também senti sua falta.

A resposta não vem de imediato. Quando chega, são três palavras: “Eu também senti.” Depois outra: “Te espero lá. Não entra sozinho, tá?”

Você sorri sem perceber, até que a imagem da estrada volta de repente. Não é simples estar perto de alguém que carrega a mesma culpa.`,[C('Preparar-se para a homenagem','c03')]),
N('c02b',A,'QUARTO · CELULAR','15:25','phone',`Isabella: — Eu mandei no grupo, {nome}. Todo mundo recebeu.

Você: — Você acha uma boa ideia a gente se reunir assim?

Isabella: — Não acho nada. A mãe da Jullia fez um pedido. É o mínimo que podemos fazer.

Trinta segundos depois ela manda outra mensagem: “E não toca no assunto daquela noite. Pelo amor de Deus.”`,[C('Preparar-se para a homenagem','c03')]),
N('c02c',A,'QUARTO · CONVERSAS ANTIGAS','15:28','phone',`Você abre a última conversa com Jullia. O histórico termina com uma mensagem escrita antes da festa: “Espero que você venha, {nome}. Preciso de um rosto amigo hoje.”

Você chegou a digitar uma resposta naquela noite, mas nunca a enviou. Seu dedo paira sobre a caixa vazia. Não há nada que possa ser escrito agora.`,[C('Guardar o celular e sair','c03',[['clue','ultima_mensagem_jullia',true]])]),
N('c03',A,'MEMORIAL GOMES · JARDIM','17:56','house',`A propriedade dos Gomes está irreconhecível. As luzes coloridas da festa deram lugar a fitas brancas e lanternas baixas. No centro do jardim, um retrato de Jullia sorri entre flores. Uma placa diz: “JULLIA GOMES — ONDE HÁ AMOR, HÁ MEMÓRIA.”

Rayssa está perto do portão com Isabella. Mais adiante, Ryan tenta conversar com Laisla e Rauanny, mas as duas parecem distraídas. Allan segura um copo de água sem beber. Samuel observa a própria van estacionada do lado de fora. Breno está sozinho próximo à cerca, procurando alguém entre os convidados.

Você ainda não deu cinco passos e já sente que cada pessoa presente naquela festa poderia enxergar a culpa no seu rosto.`,[C('Procurar Breno antes de entrar','c04b',[['bond','breno',4]]),C('Cumprimentar Rayssa e Isabella','c04r',[['bond','rayssa',3],['bond','isabella',2]]),C('Conversar com Ryan, Laisla e Rauanny','c04y',[['bond','ryan',3],['bond','rauanny',2]])]),
N('c04b',A,'MEMORIAL · PRÓXIMO AO PORTÃO','18:02','house',`Breno olha duas vezes para confirmar que é você. Ele começa a sorrir, mas parece não ter certeza se deve se aproximar.

Breno: — {nome}. Oi. Desculpa, eu ensaiei falar alguma coisa normal, mas nada parece normal hoje.

Você: — Pode falar qualquer coisa.

Breno: — Tá. Seu cabelo tá legal. Pronto, falei uma besteira. Melhorou?

Vocês riem, e por um instante o peso daquela noite diminui. Quando Breno vê a fotografia de Jullia pela janela, o sorriso desaparece.

Breno: — Eu devia ter procurado você antes. Eu não tava conseguindo nem cuidar da minha cabeça. Isso não é desculpa, eu sei.`,[C('Dizer que também sentiu falta dele','c05',[['romance','breno',8],['bond','breno',7],['flag','reaproximou_breno',true]]),C('Dizer que ficou magoado com a distância','c05',[['resent','breno',3],['bond','breno',2]]),C('Entrar juntos, em silêncio','c05',[['bond','breno',4]])]),
N('c04r',A,'MEMORIAL · VARANDA','18:03','house',`Isabella ajeita a gola do vestido de Rayssa com o jeito impaciente de quem faz aquilo há anos.

Isabella: — Fica parada um segundo, mulher. Você vai entrar parecendo que brigou com a roupa.

Rayssa: — E você vai entrar parecendo que brigou com todo mundo.

Você: — Oi pra vocês também.

Isabella: — Olha só! {nome} resolveu aparecer. Eu já tinha separado um discurso pra te xingar.

Rayssa a interrompe e abraça você com força. O abraço dura mais do que uma saudação comum.

Rayssa: — Eu tô com medo de ver a mãe dela. Não sei se consigo olhar nos olhos daquela mulher.`,[C('Confortar Rayssa discretamente','c05',[['romance','rayssa',8],['bond','rayssa',7]]),C('Fazer uma brincadeira para aliviar o clima','c05',[['bond','isabella',6]]),C('Admitir que também está com medo','c05',[['bond','rayssa',4],['trait','empatia',1]])]),
N('c04y',A,'MEMORIAL · ALAMEDA','18:03','house',`Ryan abre os braços assim que vê você.

Ryan: — {nome}! Finalmente uma pessoa que não parece estar me julgando por respirar!

Laisla: — Eu não tô te julgando por respirar, tô te julgando por falar sem parar.

Rauanny: — Isso é verdade. O homem não ficou quieto nem na hora de estacionar.

Ryan: — Tá vendo o carinho que eu recebo? Um ano longe e continua tudo igual.

Você: — Nem tudo.

A brincadeira morre aos poucos. Rauanny olha para o retrato de Jullia.

Rauanny: — É. Nem tudo.`,[C('Puxar Ryan para conversar em particular','c04yr',[['romance','ryan',5]]),C('Perguntar como Rauanny passou esse ano','c04ra',[['bond','rauanny',4]]),C('Voltar ao salão','c05')]),
N('c04yr',A,'MEMORIAL · SOB AS ÁRVORES','18:06','lake',`Ryan encosta num tronco e finalmente fica quieto.

Ryan: — Eu fiquei muito tempo ensaiando como seria te ver de novo. Imaginava que ia fazer uma piada, você ia rir, e pronto. Que a gente ia poder fingir um pouco.

Você: — E agora?

Ryan: — Agora eu tô com a sensação de que qualquer coisa que eu disser vai parecer errada. Mas... eu queria que você soubesse que eu fiquei feliz que veio.

Ele segura seu olhar por mais tempo do que costuma.`,[C('Dizer que também queria vê-lo','c05',[['romance','ryan',10],['bond','ryan',6],['flag','reaproximou_ryan',true]]),C('Convidá-lo para ficar com o grupo','c05',[['bond','ryan',6]])]),
N('c04ra',A,'MEMORIAL · ALAMEDA','18:07','house',`Rauanny respira fundo, ajeitando o bracelete no pulso.

Rauanny: — Eu tive dias bons. Acho que isso é o que mais me dá culpa. Às vezes eu ria de verdade e depois pensava: como é que eu tô rindo?

Você: — Você continua vivendo, Rau. Não é errado.

Rauanny: — Eu sei. Só queria acreditar nisso o tempo inteiro.

Laisla chama por ela de longe. Rauanny parece querer ficar mais um pouco, mas se levanta.`,[C('Dizer que podem conversar depois, a sós','c05',[['romance','rauanny',8],['bond','rauanny',5],['flag','reaproximou_rauanny',true]]),C('Acompanhar Rauanny até Laisla','c05',[['bond','rauanny',5],['bond','laisla',4]])]),
N('c05',A,'MEMORIAL · SALÃO PRINCIPAL','18:18','house',`Uma mulher de cabelos presos se aproxima, segurando uma caixa de fotografias. Helena Gomes, mãe de Jullia, parece cansada, mas recebe todos com uma delicadeza que parte seu coração.

Helena: — Você é {nome}, não é? A Jullia gostava muito de vocês. Ela dizia que podia contar com os amigos quando as coisas ficavam difíceis.

A frase atinge cada pessoa ao redor como uma pancada. Isabella baixa os olhos. Samuel leva a mão ao bolso e a tira de novo. Breno se mantém imóvel.

Helena: — Obrigada por ter vindo. Eu sei que faz um ano, mas... enquanto a gente continuar lembrando dela, de alguma forma ela continua com a gente.

Você sente que há palavras demais presas na garganta.`,[C('Abraçar Helena e oferecer ajuda','c06',[['trait','empatia',1],['bond','rayssa',4]]),C('Perguntar se encontraram alguma pista nova','c06',[['clue','buscas_continuam',true]]),C('Apenas dizer que sente muito','c06')]),
N('c06',A,'MEMORIAL · DISCURSOS','18:34','house',`Helena sobe ao pequeno palco e agradece aos convidados. O pai de Jullia permanece na primeira fila, mãos cruzadas, sem olhar para o retrato. Num telão, aparecem imagens da infância de Jullia: o primeiro dia de aula, uma viagem ao lago, a festa de dezesseis anos e vídeos feitos com os amigos.

De repente, aparece um vídeo que você reconhece. Jullia está sorrindo na mesma varanda onde ouviu as pessoas que dizia amar falando mal dela. Ela vira para a câmera e manda um beijo. A gravação termina antes de alguém perceber seu rosto mudando.

Allan: — Meu Deus... eu nunca mais consegui assistir a um vídeo dela.

Samuel: — Baixa a voz, Allan.

Allan: — Eu falei baixo, Sam. Você que tá agindo como se tudo fosse uma ameaça.

Rayssa enxuga os olhos sem se preocupar em disfarçar.`,[C('Segurar a mão de Rayssa durante o vídeo','c07',[['romance','rayssa',9],['bond','rayssa',4]]),C('Ficar ao lado de Allan e Samuel','c07',[['bond','allan',4]]),C('Observar as reações dos convidados','c07',[['clue','convidados_observados',true]])]),
N('c07',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:51','house',`O corredor está mais vazio do que o salão. Retratos de Jullia enfeitam as paredes, cercados por flores brancas e velas. É quase insuportável ver o sorriso dela repetido em tantas fotografias.

Moisés surge atrás de vocês. O terno preto está amassado e ele tem os olhos fundos de quem passou a noite sem dormir. Quando vê Samuel, interrompe o próprio passo.

Moisés: — Então vocês vieram mesmo. Achei que iam inventar outra desculpa, igual fizeram quando começaram as buscas.

Rayssa: — Moisés, por favor. Hoje não.

Moisés: — Hoje não? Há um ano eu tô escutando isso. Amanhã, depois, quando eu estiver mais calmo... Quando é que vocês vão querer conversar?

Isabella: — A gente veio pela família dela. Não pra brigar com você.

Moisés: — Que conveniente. A última vez que a Jullia viu vocês, expulsou todo mundo da casa. E depois sumiu. Nenhum de vocês acha isso estranho?

Samuel avança um passo. Allan segura o antebraço dele. Breno se desloca discretamente para mais perto de você.

Samuel: — Você não sabe nada sobre aquela noite.

Moisés: — Então me conta, Samuel. Eu tô escutando.`,[C('Perguntar o que Moisés realmente sabe','c07investiga',[['clue','moises_provocou',true]]),C('Intervir antes que Samuel perca a cabeça','c07acalmar',[['bond','allan',5],['bond','samuel',-2]]),C('Confrontar Moisés sobre a traição','c07acusa',[['clue','moises_relacao',true]])]),
N('c07investiga',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:54','house',`Você: — Tá. Se você tá acusando a gente de alguma coisa, fala logo. O que exatamente você sabe?

Moisés demora a responder. Ele observa o reflexo da porta de vidro, certificando-se de que ninguém da família está ouvindo.

Moisés: — Sei que a Jullia saiu correndo naquela noite. Sei que ela tava chorando. E sei que vocês foram embora pouco antes de alguém ouvir um barulho na estrada.

Ryan: — Barulho? Que barulho?

Moisés: — Engraçado você perguntar desse jeito. Eu nem falei que foi carro.

Ryan abre a boca, mas Rauanny o interrompe.

Rauanny: — Você tá tentando fazer a gente se contradizer. Isso não prova merda nenhuma.

Moisés: — Não tô tentando provar nada. Tô tentando entender por que toda pergunta faz vocês ficarem assim.

Breno: — Moisés, você sabe que ela entrou na mata. Por que não foi atrás dela?

A expressão dele endurece.

Moisés: — Porque ela mandou eu deixar ela em paz. E eu fui covarde o suficiente pra obedecer. Eu penso nisso todos os dias.

Pela primeira vez, a raiva na voz dele parece ceder espaço à vergonha.`,[C('Perguntar quem ouviu o barulho na estrada','c07pista',[['clue','testemunha_estrada',true]]),C('Encerrar a conversa antes que alguém escute','c07saida')]),
N('c07acalmar',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:54','house',`Você segura o braço de Samuel antes que ele se aproxime mais.

Você: — Sam, não. Olha onde a gente tá. A mãe da Jullia tá do outro lado daquela porta.

Samuel: — Esse filho da puta tá acusando a gente!

Allan: — E sair na mão na homenagem vai ajudar pra caralho, né? Olha pra mim. Fica quieto um minuto.

Moisés: — É sempre assim? Alguém fala alguma coisa e vocês precisam calar essa pessoa?

Rayssa: — Não fala como se conhecesse a gente. Você também machucou ela.

Moisés pisca, surpreso por ouvir aquilo dela.

Moisés: — Eu sei. Não preciso que me lembrem.

Você: — Então talvez não seja o momento de transformar dor em acusação.

Moisés respira fundo. Por um instante parece que ele vai embora, mas se aproxima apenas o suficiente para falar mais baixo.

Moisés: — Eu só quero saber por que, quando pergunto daquela noite, vocês parecem ter ensaiado a mesma resposta.`,[C('Perguntar por que ele acha isso','c07pista',[['clue','depoimentos_parecidos',true]]),C('Afastar o grupo da discussão','c07saida')]),
N('c07acusa',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:54','house',`Você: — Você fala como se fosse o único que se importava com a Jullia. Ela te viu com outra pessoa naquela noite, Moisés. Você acha que a gente não sabe?

O rosto de Moisés perde a cor. Isabella encara você como se quisesse perguntar por que decidiu falar disso agora.

Moisés: — Abaixa a voz.

Você: — Por quê? Você pode jogar suspeita em todo mundo, mas ninguém pode perguntar o que você fez?

Moisés: — Eu fiz uma merda, tá bom? Uma merda enorme. Eu fui atrás dela, a gente discutiu e ela correu. Eu devia ter corrido atrás. Devia ter chamado alguém.

Rayssa: — Você nunca contou isso pra mãe dela?

Moisés: — Contei que brigamos. Não contei tudo. Não tive coragem.

Samuel: — E vem aqui pagar de santo? Vai se foder.

Allan: — Samuel, por favor!

Moisés volta a olhar para você, com raiva e um medo que parece genuíno.

Moisés: — Você tem razão de me odiar. Mas isso não explica por que vocês todos desapareceram da vida dela naquela mesma noite.`,[C('Perguntar se alguém mais viu Jullia na mata','c07pista',[['clue','jullia_mata',true]]),C('Parar a discussão','c07saida')]),
N('c07pista',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:57','house',`Moisés passa a mão no rosto, hesitando.

Moisés: — Tinha um funcionário fechando o portão lateral. Acho que ele ouviu alguma coisa perto da estrada. Mas quando fui perguntar, disseram que ele tinha pedido demissão.

Laisla: — Você só tá falando isso agora?

Moisés: — Eu falei com a polícia. Não sei o que fizeram com a informação.

Rauanny: — Ou você inventou tudo pra colocar medo na gente.

Você percebe que até os amigos que antes pareciam seguros agora evitam se olhar. Moisés fixa os olhos no retrato de Jullia pendurado sobre a mesa.

Moisés: — Eu sei que errei com ela. Só não vou fingir que esse último ano fez sentido.

Passos se aproximam pelo corredor. Moisés recolhe a voz e se afasta da parede.`,[C('Voltar ao salão e guardar o que ouviu','c08')]),
N('c07saida',A,'MEMORIAL · CORREDOR DAS FOTOGRAFIAS','18:57','house',`Você: — Já chega. Nenhum de nós vai resolver isso gritando aqui.

Moisés lança um último olhar ao grupo. Os olhos param em Samuel por tempo demais.

Moisés: — Talvez vocês tenham razão. Talvez eu esteja procurando respostas no lugar errado.

Ele se afasta, deixando para trás um silêncio pesado.

Isabella: — Meu Deus. Eu tô tremendo inteira.

Breno, ainda ao seu lado, fala tão baixo que só você consegue ouvir.

Breno: — {nome}, o que ele falou sobre a estrada... você também achou estranho, né?

Antes de responder, vocês ouvem o barulho de passos vindo do jardim de inverno.`,[C('Voltar à homenagem','c08')]),
N('c08',A,'MEMORIAL · JARDIM DE INVERNO','19:07','party',`Uma bandeja cai no corredor e faz todo mundo se assustar. Ryan ri alto demais; Laisla manda ele parar. O evento continua, mas ninguém do grupo parece confortável. Rauanny se afasta para buscar ar e Isabella diz que precisa usar o banheiro.

Breno: — {nome}, você viu a Rayssa? Ela saiu depois de falar com a mãe da Jullia.

Antes que você responda, um grito curto vem do corredor. Não parece um grito de dor, mas de susto. Isabella volta com o rosto pálido e uma folha dobrada na mão.

Isabella: — Alguém colocou isso dentro da minha bolsa. Eu juro que não tava lá antes.

Ela abre o papel. Há uma frase escrita em letras maiúsculas: “EU SEI O QUE VOCÊS FIZERAM NO VERÃO PASSADO.”`,[C('Pedir que Isabella não esconda mais nada','c09a',[['bond','isabella',-3],['trait','coragem',1]]),C('Pegar o bilhete e procurar marcas','c09b',[['clue','bilhete_ameaca',true]]),C('Chamar o restante do grupo discretamente','c09c',[['bond','breno',4],['trait','cautela',1]])]),
N('c09a',A,'MEMORIAL · JARDIM DE INVERNO','19:10','house',`Você: — Isa, olha pra mim. Se você já recebeu alguma coisa antes, é a hora de contar.

Isabella: — Eu não recebi nada antes! Puta merda, {nome}, eu tô tentando não surtar e você tá me interrogando?

Rayssa: — Isa, ninguém tá te acusando. Respira.

Isabella: — Para de falar pra eu respirar! Eu tava sozinha no banheiro. Qualquer um podia ter entrado naquela sala!

Você percebe que a raiva dela é uma forma de esconder o medo.`,[C('Reunir o grupo','c10')]),
N('c09b',A,'MEMORIAL · JARDIM DE INVERNO','19:10','phone',`O papel está dobrado em quatro partes. O verso tem uma pequena mancha de cera vermelha, como a das velas usadas na homenagem. Não há assinatura.

Você: — A pessoa que colocou isso na bolsa esteve aqui hoje.

Allan: — Que ótimo. Um perseguidor com convite pra evento social. Era tudo que faltava.

Samuel: — Ou alguém pegou papel de qualquer lugar e tá tentando assustar a gente.

Breno: — Sam, você tá mesmo disposto a apostar nisso?`,[C('Guardar uma foto do bilhete','c10',[['clue','marca_cera_vermelha',true]])]),
N('c09c',A,'MEMORIAL · JARDIM DE INVERNO','19:11','house',`Você pede a Breno para buscar Ryan e Rauanny sem chamar a atenção dos outros convidados. Allan encontra Samuel perto da mesa de bebidas; Laisla chega segurando a mão de Rayssa.

Rauanny: — Por que a Isa tá branca desse jeito?

Isabella: — Porque alguém resolveu brincar de ameaça anônima comigo!

Laisla: — Fala baixo, mulher. Tem gente aqui.

Rayssa: — Não é brincadeira. É sobre aquela noite.`,[C('Mostrar o bilhete a todos','c10')]),
N('c10',A,'MEMORIAL · VARANDA DOS FUNDOS','19:18','lake',`Os nove se apertam na varanda, longe dos outros convidados. Por um instante é como estar de novo na estrada: todos presentes, ninguém querendo assumir a primeira palavra.

Samuel: — Isso não prova nada. Não tem nome. Não tem foto. É só uma frase.

Allan: — E que frase, Samuel? Você acha que alguém adivinhou exatamente a pior coisa que a gente esconde?

Laisla: — Alguém pode ter ouvido a gente falando depois. Naquele ano... qualquer um.

Rauanny: — A gente mal se falou depois! E quando falava, era sempre por telefone.

Ryan: — Não começa a apontar dedo pros outros. Isso é o que essa pessoa quer.

Breno: — A pergunta é outra: quem ganharia alguma coisa fazendo isso justamente hoje?

Rayssa: — A gente devia contar a verdade. Pelo menos pra família dela.

Isabella: — Ray, pelo amor de Deus. Não faz isso aqui.`,[C('Apoiar Rayssa e discutir a verdade','c11a',[['bond','rayssa',8],['bond','isabella',-5],['flag','quer_confessar',true]]),C('Concordar com Breno e investigar','c11b',[['bond','breno',5],['trait','cautela',1]]),C('Acalmar Ryan e pedir unidade','c11c',[['bond','ryan',6],['bond','allan',3]])]),
N('c11a',A,'MEMORIAL · VARANDA','19:23','lake',`Você: — Rayssa não tá errada. A gente devia, pelo menos, considerar contar o que aconteceu.

Samuel: — Considerar? Você sabe que se abrir a boca eu vou ser o primeiro a cair, né?

Você: — E a Jullia foi a primeira a desaparecer.

Ninguém responde. Rayssa segura sua mão com força; Isabella vira o rosto, os olhos brilhando de raiva e lágrimas.`,[C('Voltar ao salão sem chamar atenção','c12')]),
N('c11b',A,'MEMORIAL · VARANDA','19:23','lake',`Você: — A gente precisa descobrir quem colocou o papel antes de sair acusando gente.

Breno: — Concordo. Tem câmeras no portão. Talvez na entrada da casa também.

Allan: — Por favor me diz que você não quer invadir a sala de segurança durante uma homenagem.

Breno: — Eu quero que a gente pare de fingir que não tem ninguém olhando pra nós.

Rauanny concorda com um aceno curto.`,[C('Voltar ao salão e observar os convidados','c12',[['clue','cameras_mansao',true]])]),
N('c11c',A,'MEMORIAL · VARANDA','19:23','lake',`Você: — Para. Se a gente começar a brigar, essa pessoa já conseguiu o que queria.

Ryan: — Obrigado. Finalmente alguém falando como gente.

Laisla: — Tá. Então ninguém sai sozinho. A gente fica junto até decidir o que fazer.

Isabella: — Combinado. Pelo menos por hoje.

Breno observa os convidados através da janela, inquieto.`,[C('Voltar para perto da família Gomes','c12')]),
N('c12',A,'MEMORIAL · SALÃO ESCURO','19:42','house',`As luzes do salão oscilam quando começa uma chuva forte. Os convidados se agrupam perto das janelas, e o vídeo de Jullia permanece pausado na tela. Um funcionário anuncia que o gerador deve entrar em instantes.

Ao passar pelo corredor, você vê a porta lateral entreaberta. Há gotas de água no piso, embora ninguém tenha passado ali nos últimos minutos. Uma pequena etiqueta vermelha está presa ao trinco.

Seu celular vibra com uma notificação de número desconhecido: “Vocês prometeram silêncio. Quem vai ser o primeiro a quebrar?”

Antes que consiga mostrar a tela, ouve passos rápidos vindos da área externa.`,[C('Seguir os passos com cautela','c13a',[['trait','coragem',1],['clue','porta_lateral',true]]),C('Procurar Breno e não ir sozinho','c13b',[['bond','breno',6],['romance','breno',4]]),C('Avisar todos e ficar no salão','c13c',[['trait','cautela',2]])]),
N('c13a',A,'JARDIM · CHUVA','19:47','forest',`A chuva cobre os caminhos de pedra com uma película brilhante. Você corre até o portão de serviço e vê apenas uma silhueta desaparecendo entre as árvores. Uma voz conhecida grita seu nome atrás de você.

Rauanny: — {nome}! Você tá maluco? Não vai atrás de alguém no meio do mato!

Você: — Eu vi alguém!

Rauanny: — Ótimo. Então deixa a gente ver junto. Não me faz ter que te procurar também.

Ela segura seu braço; por trás da irritação, há medo verdadeiro.`,[C('Aceitar voltar com Rauanny','c14',[['romance','rauanny',5],['bond','rauanny',7]])]),
N('c13b',A,'CORREDOR · PORTA DE SERVIÇO','19:47','forest',`Breno pega uma lanterna na recepção e caminha ao seu lado. Ele não tenta esconder que está tremendo.

Breno: — Só pra deixar claro: eu odeio absolutamente tudo isso. Mas não vou deixar você ir sozinho.

Você: — Você podia ficar lá dentro.

Breno: — Podia. Só que eu já passei um ano fugindo. Cansei um pouco.

Uma figura passa atrás do vidro molhado. Quando vocês abrem a porta, não há ninguém.`,[C('Voltar juntos para o salão','c14',[['bond','breno',5],['romance','breno',5]])]),
N('c13c',A,'SALÃO · PERTO DA ESCADA','19:47','phone',`Você chama os amigos e mostra a mensagem. Allan força uma piada, mas ninguém ri.

Allan: — Tá legal. Agora eu oficialmente tenho saudade de quando o maior problema da minha vida era boleto.

Samuel: — Isso é algum idiota que tá aqui dentro. Só precisamos descobrir qual.

Rayssa: — E se não for alguém de dentro? E se for alguém que viu a gente naquela noite?

O barulho de um objeto caindo na área externa corta a conversa.`,[C('Investigar a origem do barulho com o grupo','c14')]),
N('c14',A,'MEMORIAL · SAÍDA PARA O LAGO','20:03','lake',`Todos se reúnem perto da escada que desce até o lago. Na madeira molhada, alguém deixou uma pequena flor branca idêntica às do memorial. Ao lado dela, um celular antigo começa a tocar, embora a tela esteja rachada.

Ryan: — Nem fodendo. Eu não vou atender isso.

Isabella: — Não encosta. Pode ser uma armadilha.

Allan: — Tá tocando há um tempão. Se ninguém atender, eu vou enlouquecer.

Você olha o visor: NÚMERO DESCONHECIDO. O som insiste, cortando o silêncio do grupo.

A noite em que Jullia desapareceu parece ter encontrado uma maneira de continuar.`,[C('Atender o celular','c15a',[['flag','atendeu_chamada',true],['trait','coragem',1]]),C('Deixar tocar e fotografar a cena','c15b',[['clue','celular_lago',true],['trait','cautela',1]])]),
N('c15a',A,'ESCADARIA DO LAGO','20:05','phone',`Você aceita a chamada. Por alguns segundos, só existe o som da chuva e de uma respiração fraca do outro lado.

Voz desconhecida: — Vocês fizeram uma promessa. Eu também fiz a minha.

Você: — Quem é você? O que quer da gente?

Voz desconhecida: — Quero ver quanto tempo demora até um de vocês contar a verdade.

A ligação cai. Na tela, surge uma fotografia recente do grupo reunido naquela mesma varanda.`,[C('Mostrar a fotografia aos outros','fim04',[['clue','foto_recente_grupo',true]])]),
N('c15b',A,'ESCADARIA DO LAGO','20:05','phone',`O toque cessa sozinho. O celular vibra mais uma vez e sua tela rachada acende com uma fotografia recente do grupo reunido na varanda minutos antes.

Breno: — Essa foto foi tirada hoje. De algum lugar aqui perto.

Rauanny: — Então a pessoa tá na propriedade. Talvez ainda esteja olhando pra gente.

Samuel: — Chega. Todo mundo pra dentro. Agora.`,[C('Guardar o que descobriu','fim04',[['clue','foto_recente_grupo',true]])]),
N('fim04','FIM DO CAPÍTULO 1 · DEMONSTRAÇÃO V0.4','LAKEWOOD · CASA GOMES','20:11','phone',`A homenagem termina sem respostas. Em algum lugar da propriedade, alguém observa os convidados deixarem o jardim e digita uma nova mensagem.

ENQUANTO ISSO, NA ESTRADA DO LAGO...

Uma figura de capa escura recolhe uma flor branca do chão. O telefone volta a vibrar. Na tela há uma única palavra: “AMANHÃ.”

O primeiro bilhete foi apenas o começo. Suas conversas, seus romances e as escolhas feitas no prólogo foram registrados. A história de Lakewood está prestes a se tornar muito mais perigosa.`,[]),

];
window.NODES=Object.fromEntries(window.HISTORIA.map(n=>[n.id,n]));
