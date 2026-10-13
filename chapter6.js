/* O ÚLTIMO GRITO · CAPÍTULO 06 · O SILÊNCIO TEM TESTEMUNHAS
 * Não revela o segredo de Jullia/Rayssa. Cenas ramificadas, três perspectivas e
 * travessia dinâmica. Cada rota tem início, reação e encerramento próprios.
 */
(()=>{'use strict';
const TITLE='CAPÍTULO 06 · O SILÊNCIO TEM TESTEMUNHAS';
const N=(id,location,time,scene,text,choices=[],speaker='NARRAÇÃO')=>({id,chapter:TITLE,location,time,scene,text,choices,speaker});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const F=(k,v=true)=>['flag',`c6_${k}`,v];
const B=(id,n)=>['bond',id,n];
const E=[];const A=(...args)=>E.push(N(...args));
const go=(to,text='Continuar',effects=[],requires=null)=>C(text,to,effects,requires);
const alive=(id,yes=true)=>[['flag',`c6_morto_${id}`,!yes]];
const romance=(id)=>[['romance',id]];
const hasAllan=(s)=>!s.flags?.allan_morto_c4;

// ATO I — A pessoa na mata. Bella ainda não sabe do paradeiro da irmã.
A('h01','LAKEWOOD · CENTRO','16:12','town',`O centro de Lakewood voltou a encher as ruas depois do pior da tempestade. Vitrines abertas, gente atravessando a praça, ônibus buzinando. À primeira vista, tudo parece normal. Só que a banca de jornais exibe, pela terceira semana seguida, a mesma fotografia de Jullia Gomes sob a palavra DESAPARECIDA.

Breno chamou você para encontrá-lo antes do jantar na casa de Laisla. Ele está à sombra de uma padaria, segurando uma pasta de documentos e dois cafés que já esfriaram.

Breno: — A menina que trabalha na portaria da propriedade Gomes confirmou o crachá azul. Mas pediu pra gente não falar com ela de novo. Disse que alguém anda fazendo perguntas sobre as gravações antigas.

Você: — A gente sequer sabe em quem confiar.

Breno: — Então vamos começar confiando em fatos. E tentando não levar ninguém a outro lugar abandonado.

Do outro lado da rua, você reconhece Bella Gomes, irmã de Jullia. Ela está de volta a Lakewood. Os cachos compridos caem sobre uma camiseta larga; usa calça baggy e tênis Vans gastos. Ela observa a foto da irmã no jornal e atravessa na direção de vocês, de cara fechada.`,[
C('Cumprimentar Bella e perguntar quando ela voltou','h02a',[B('breno',1),F('bella_acolhida')]),
C('Guardar a pasta e deixar Bella puxar assunto','h02b',[['trait','cautela',1]]),
C('Tentar ir embora antes de Bella se aproximar','h02c',[F('bella_distante')])]);
A('h02a','CALÇADA · PRIMEIRO CONTATO','16:17','town',`Você: — Oi. Aconteceu alguma coisa?

Garota: — Desculpa. Eu não queria ficar olhando. É que eu ouvi o nome da minha irmã.

Breno abaixa o café devagar.

Garota: — Sou Bella. Bella Gomes.

O sobrenome atravessa você como uma corrente de ar gelada. É difícil olhar para ela sem lembrar do saco preto, da estrada, do lago.

Você: — Eu... sinto muito pelo que aconteceu.

Bella: — Todo mundo diz isso. Eu sei que significa alguma coisa pra algumas pessoas, mas às vezes eu só queria que alguém me dissesse o que viu de verdade.

Breno põe a pasta dentro da mochila antes de responder. A cautela dele não passa despercebida. Bella vê o movimento, mas não pressiona.`,[go('h03','Ouvir o que Bella tem a dizer',[B('breno',2)])]);
A('h02b','CALÇADA · UM ROSTO CONHECIDO','16:17','town',`A garota acompanha seu gesto de esconder a pasta.

Garota: — Não precisam guardar nada por minha causa. Eu só reconheci a foto dela.

Você: — Você conhecia a Jullia?

Garota: — Sou a irmã dela. Bella Gomes.

A resposta chega sem preparação. Breno fica imóvel. Você percebe que tem apertado o copo de papel tanto que o café escorre pelos dedos.

Bella: — Não vou perguntar por que vocês estavam falando do caso. Todo mundo tá falando. Mas, se souberem de alguma coisa que não saiu no jornal... eu moro com perguntas há um ano.

Ela se vira para ir embora, dá dois passos e volta.

Bella: — Desculpa. Foi injusto colocar isso em vocês. Só não consigo parar de procurar.`,[go('h03','Responder antes que ela vá embora',[['trait','empatia',1]])]);
A('h02c','CALÇADA · A ESCOLHA DE IR EMBORA','16:17','town',`Você toca discretamente no braço de Breno, mas a garota já ouviu parte da conversa.

Garota: — Espera. Vocês falaram do portão dos Gomes?

Breno: — Estamos verificando uma coisa. Desculpa, não é sobre você.

Garota: — É sempre sobre mim, quando é sobre a minha irmã. Meu nome é Bella Gomes.

Ela diz aquilo sem elevar a voz. Você pensa em pedir desculpa de novo, mas percebe que a palavra não resolve.

Bella: — Eu só preciso saber por que os amigos dela passaram um ano inteiro evitando a nossa casa. Não precisam responder agora.

Ela entrega um cartão simples, com um número de telefone escrito à mão. Depois se afasta. Breno espera até que ela atravesse a rua para falar.

Breno: — A gente vai ter que conversar com ela alguma hora. Mesmo que dê medo.`,[go('h03','Guardar o número de Bella',[['clue','bella_contato_c6']])]);
A('h03','PRAÇA CENTRAL · BELLA GOMES','16:24','town',`Bella não se parece com a imagem de Jullia nos cartazes. Fala devagar, escolhe as palavras, mas segura o olhar quando faz uma pergunta. Ela mostra uma fotografia da festa no próprio celular: um grupo na varanda iluminada, a irmã ao fundo, quase escondida.

Bella: — Na noite em que ela sumiu, eu estava em casa. Ouvi uma discussão pelo telefone. Jullia desligou na minha cara. Eu fui atrás, mas quando cheguei à entrada do bosque não consegui mais encontrar ela.

Ela esfrega o polegar sobre a borda da capa do celular.

Bella: — A polícia já ouviu isso. Talvez eu não tenha visto nada útil, talvez tenha perdido a única chance de falar com ela. Só que eu lembro de uma coisa: a noite toda parecia que alguém estava fugindo de alguém.

Breno olha para você, discreto. A figura que Samuel jurou ter visto na mata ganha, pela primeira vez, uma explicação possível. Mas Bella não descreveu o atropelamento, o lago nem o pacto. E vocês não vão colocar informações que ela não sabe na sua boca.`,[
C('Pedir que Bella descreva o caminho que fez na mata','h04a',[['clue','bella_trilha_c6'],B('breno',2)]),
C('Perguntar se Moisés conversou com ela depois','h04b',[['clue','moises_evita_bella_c6']]),
C('Dizer que ela pode entrar em contato quando quiser','h04c',[F('bella_confiou'),['trait','empatia',1]])]);
A('h04a','PRAÇA · O CAMINHO','16:29','town',`Bella amplia uma foto aérea velha no telefone e marca com o dedo uma entrada de serviço atrás da propriedade.

Bella: — Eu cortei caminho pela cerca. Meu tênis ficou preso num galho, por isso demorei a chegar à trilha principal. Vi as lanternas do pessoal da festa ao longe, mas ninguém ouviu quando chamei.

Você se lembra de Samuel falando em alguém perto das árvores. Talvez fosse Bella. Talvez não. O detalhe não autoriza uma certeza.

Breno: — Você contou à polícia da entrada de serviço?

Bella: — Contei. Eles disseram que a vegetação podia ter apagado qualquer marca. Se vocês acharem qualquer coisa, por favor, me avisem.

Você registra o caminho no mapa sem prometer o que não pode entregar.`,[go('h05','Despedir-se de Bella com cuidado')]);
A('h04b','PRAÇA · O NOME DE MOISÉS','16:29','town',`Bella: — Moisés? Ele apareceu muito nas primeiras semanas. Depois começou a evitar a minha mãe. Disse que não aguentava entrar naquela casa e ver as fotos da Jullia.

Breno: — E você acredita nele?

Bella: — Eu acreditava que ele a amava. Também descobri que isso não impediu ele de fazer coisa horrível. Hoje eu não sei o que acreditar.

A resposta pesa de um jeito diferente em você. Moisés já confrontou os amigos, já ofereceu informações e voltou atrás. Bella parece tão desconfiada quanto vocês, mas por razões completamente diferentes.

Bella: — Se falarem com ele, digam que me deve uma conversa. Sobre minha irmã. Não sobre o que ele sente.

A frase sai firme. Ela não pede pena. Pede respostas.`,[go('h05','Prometer apenas transmitir o recado')]);
A('h04c','PRAÇA · UM ACORDO PEQUENO','16:29','town',`Você: — Se descobrir alguma coisa confiável, não vou fingir que não vi. Mas não quero te dar uma esperança falsa.

Bella: — Obrigada por falar assim. Todo mundo me promete respostas impossíveis.

Breno faz uma pergunta sobre as gravações e Bella diz que não tem acesso aos computadores da casa desde que a investigação começou. Ela também conta que a mãe evita tocar nas coisas de Jullia, como se mexer no quarto significasse aceitar uma despedida.

Bella: — Eu ainda guardo a jaqueta que emprestei pra ela. Às vezes tenho vergonha de dizer isso.

Você: — Não precisa.

Por alguns segundos, vocês são apenas três jovens numa calçada, tentando conversar sobre uma pessoa que já não está ali. Bella agradece e vai embora sem pedir mais nada.`,[go('h05','Ir ao jantar com Breno',[B('breno',2)])]);
A('h05','CARRO DE BRENO · CAMINHO DO CONDOMÍNIO','17:18','road',`Breno dirige devagar. O rádio toca uma música qualquer, baixinha, quase inaudível. Você observa a paisagem pela janela e tenta encaixar a imagem de Bella às palavras de Samuel.

Breno: — A gente não pode tratar ela como pista. Ela é a irmã de uma pessoa que... sumiu. Não tem culpa do que a gente fez.

Você: — Eu sei. Mas se ela era a figura na mata, isso muda tudo.

Breno: — Muda uma parte. Não explica quem fotografou a van, quem nos enviou ameaças ou quem sabia do lago.

O celular de Breno vibra no suporte do painel, conectado ao som do carro. Uma mensagem enviada ao grupo: “SE VOCÊS FALAREM DE ASSASSINO NA MINHA MESA, EU COBRO TAXA DE TERAPIA.”

Breno lê e solta uma risada honesta. É a primeira que você ouve dele naquele dia.

Breno: — A gente vai comer. Conversar. Talvez esquecer o mundo por dez minutos. Você merece isso também.`,[
C('Responder a Laisla com uma brincadeira','h06',[B('laisla',3),F('jantar_leve')]),
C('Perguntar a Breno se ele está bem de verdade','h06',[B('breno',4)]),
C('Revisar mentalmente o que Bella contou','h06',[['trait','cautela',1]])]);

// ATO II — Relações. Não há perigo automático nem cortes bruscos.
A('h06','CONDOMÍNIO DAS ÁRVORES · BLOCO A','18:02','house',`O apartamento de Laisla fica no sexto andar de um prédio antigo, reformado aos poucos. Da entrada, é possível ver o Bloco B, separado por um pátio estreito e alto. Varandas se encaram de um prédio para o outro; embaixo, estão o jardim interno e o piso de serviço do condomínio.

Um zelador empurra uma escada extensível numa base com rodinhas, próximo à portaria. Ryan surge perto dele, com a mochila no ombro; estava ajudando o técnico a descarregar as ferramentas antes de voltar para o apartamento da tia, no Bloco B.

Ryan: — Ô, vocês! Tô esperando o técnico terminar lá no B. Ainda tenho uns minutos antes de subir de novo.

Laisla, na janela do sexto andar, grita antes mesmo de cumprimentar:

Laisla: — SE VOCÊ DEMORAR, VOU COMER SUA SOBREMESA!

Ryan: — VOCÊ NÃO TEM CORAGEM!

Rauanny aparece atrás dela com um garfo na mão.

Rauanny: — Tem, sim. Eu vi ela abrir o doce faz meia hora.

Breno olha para você com um sorriso involuntário. Por uma vez, parece que a cidade não está inteira tentando sufocar o grupo.`,[
C('Brincar com Ryan sobre a sobremesa','h07',[B('ryan',3)]),
C('Chamar Ryan para conversar a sós antes de subir','h06_ryan_privado',[B('ryan',2)],[['flag','romance_ryan_c5',true]]),
C('Observar a distância entre as varandas e a escada de serviço','h07',[['clue','escada_manutencao_c6'],F('notou_distancia')]),
C('Subir logo com Breno','h07',[B('breno',2)])]);
A('h06_ryan_privado','CONDOMÍNIO · PERTO DA PORTARIA','18:10','house',`Ryan acompanha você até perto de uma parede coberta de hera, onde a voz do zelador já não alcança. Ele mexe na alça da mochila, tentando disfarçar o sorriso.

Ryan: — O que foi? Me chamou pra ficar olhando pra minha cara?

Você: — Talvez.

Ryan: — Olha, por mim tudo bem. Mas se a Laisla aparecer, ela vai começar.

Há um silêncio confortável. Vocês já deixaram claro que querem se aproximar, mas ninguém falou em namoro, nem precisa. Ryan toca de leve seus dedos e espera sua reação.`,[
C('Beijar Ryan antes de subir','h06_ryan_beijo',[B('ryan',4),['romance','ryan',4],F('beijou_ryan')]),
C('Abraçar Ryan e ficar pertinho dele','h06_ryan_abraco',[B('ryan',3),['romance','ryan',3]]),
C('Provocar Ryan e roçar a mão na dele','h06_ryan_flerte',[B('ryan',2),['romance','ryan',2]])]);
A('h06_ryan_beijo','PORTARIA · UM MOMENTO SÓ DE VOCÊS','18:12','house',`Você puxa Ryan delicadamente pela gola da camiseta. Ele sorri no meio da pergunta que ia fazer, mas não chega a terminá-la: seus lábios encontram os dele. Ryan retribui o beijo sem pressa, com uma mão na sua cintura.

Quando vocês se afastam, ele mantém a testa encostada na sua por um instante.

Ryan: — Pronto. Agora eu realmente não quero subir.

Você: — Então não demora pra voltar.

Ryan: — Não vou. E... gostei de ter vindo aqui.

O técnico chama do outro lado do pátio. Ryan dá mais um beijo rápido na sua bochecha e retorna ao Bloco B. Você sobe para a casa de Laisla sorrindo.`,[go('h07','Subir para o jantar')]);
A('h06_ryan_abraco','PORTARIA · PERTO DA HERA','18:12','house',`Você abre os braços e Ryan não hesita. Ele o envolve num abraço apertado e fica ali mais tempo do que qualquer um dos dois planejava. Quando você tenta se afastar, ele segura sua mão por mais um instante.

Ryan: — A gente devia fazer mais isso sem precisar de uma desculpa.

Você: — Quem disse que precisa?

Ele ri baixinho e encosta um beijo na sua testa.

Ryan: — Eu te encontro lá em cima, tá?

O técnico chama, e Ryan corre de volta para o outro prédio, olhando por cima do ombro uma última vez.`,[go('h07','Subir para encontrar os amigos')]);
A('h06_ryan_flerte','PORTARIA · POUCOS MINUTOS','18:12','house',`Você finge examinar a camiseta dele, que ainda está com uma mancha de poeira do equipamento de manutenção.

Você: — Tá tentando me impressionar carregando escada agora?

Ryan: — Funcionou?

Você: — Vou pensar.

Ele aproxima a mão da sua, entrelaçando os dedos por baixo da mochila, longe dos olhares do pátio.

Ryan: — Pensa rápido, então. Tenho que subir.

Você aperta os dedos dele uma última vez. Ryan vai embora com aquele sorriso convencido que, apesar de tudo, você adora.`,[go('h07','Subir para o jantar')]);
A('h07','APARTAMENTO DE LAISLA · ENTRADA','18:17','house',`Laisla abre a porta antes de vocês tocarem a campainha. Usa um avental antigo, mal amarrado, e segura uma colher como se fosse uma arma.

Laisla: — Quem falar “tá com cheiro bom” entra. Quem falar “cadê a comida” lava a louça.

Isabella aparece da cozinha com dois pratos na mão.

Isabella: — Tá com cheiro bom. Agora me explica por que você escondeu a frigideira na gaveta dos talheres.

Laisla: — Porque eu moro sozinha e sou livre pra cometer meus erros.

Rauanny: — Ela quase queimou o alho. Eu salvei a situação.

Rayssa se aproxima e dá um abraço demorado em Isabella. As duas trocam uma frase baixinha que você não ouve. Quem conhece as duas sabe que, mesmo quando brigam, terminam procurando uma à outra.

Allan aparece na sala — ou, se não sobreviveu à noite do arquivo, o lugar que costumava ocupar é apenas um vazio de memória. O ambiente não vai fingir que todas as partidas terminaram do mesmo jeito.

Laisla: — Banheiro no corredor, cozinha à esquerda. E ninguém mexe no meu quarto. Tá um desastre.`,[
C('Ajudar Isabella na cozinha','h08i',[B('isabella',4)]),
C('Ficar um pouco com Laisla e Rauanny','h08l',[B('laisla',3),B('rauanny',2)]),
C('Puxar Rayssa para uma conversa discreta','h08s',[B('rayssa',3)])]);
A('h08i','COZINHA · OS PRATOS','18:26','house',`A pia está cheia de talheres, um pacote de queijo repousa aberto sobre a geladeira e Isabella tenta contar pratos como se organizasse uma operação de resgate.

Isabella: — Finalmente alguém que sabe fazer alguma coisa sem pedir instrução três vezes.

Você: — Eu literalmente só peguei uma travessa.

Isabella: — E já fez mais do que metade dessa casa.

Ela ri. Depois apoia os cotovelos no balcão e abandona a máscara de sarcasmo por alguns segundos.

Isabella: — Sabe o que eu odeio? Quando a gente se reúne e todo mundo espera que eu tenha alguma resposta. Eu sou a mesma idiota que esquece senha de cartão. Só sou boa em parecer mandona.

Você: — Você segurou muita coisa quando a gente não conseguiu.

Isabella: — E tô cansada, {nome}. Quero poder não saber o que fazer. Quero poder ser uma pessoa normal que reclama da lasanha e do vizinho barulhento.

Você deixa que o silêncio dure o suficiente. Quando Isabella volta a empilhar os pratos, já está sorrindo de novo.`,[
C('Agradecer por ela ter mantido o grupo unido','h09',[B('isabella',5),['friendBond',['isabella','rayssa'],2]]),
C('Prometer que a próxima decisão será dividida entre todos','h09',[F('prometeu_dividir'),B('isabella',3)])]);
A('h08l','SALA · AS DUAS MELHORES AMIGAS','18:26','house',`Laisla está tentando arrumar as almofadas enquanto Rauanny muda tudo de lugar atrás dela. A discussão é quase coreografada, repetida tantas vezes que já virou um idioma particular.

Laisla: — Eu coloquei a azul ali por algum motivo.

Rauanny: — Porque você acha que decoração funciona por ameaça?

Laisla: — Porque eu moro aqui.

Rauanny: — Argumento fraquíssimo.

As duas riem. Quando você pergunta há quanto tempo se conhecem, Laisla começa uma história sobre uma excursão escolar e um ônibus errado. Rauanny imediatamente corrige os detalhes.

Rauanny: — Ela ficou desesperada porque achou que a gente ia parar em outra cidade.

Laisla: — Você também ficou com medo!

Rauanny: — Eu fiquei com medo de você matar o motorista de tanto reclamar.

Depois de rirem, Laisla baixa a voz.

Laisla: — Não quero perder isso. Você entende? Eu posso brigar com ela o dia inteiro. Só não consigo imaginar voltar pra casa e não poder ligar contando uma bobagem.

Rauanny aperta a mão da amiga, sem transformar o momento num discurso.`,[
C('Dizer que a amizade das duas também te dá coragem','h09',[B('laisla',4),B('rauanny',4),['friendBond',['laisla','rauanny'],3]]),
C('Provocar que Rauanny sempre ganha as discussões','h09',[B('rauanny',3),B('laisla',1)])]);
A('h08s','VARANDA · UMA CONVERSA BAIXA','18:26','house',`Rayssa está sozinha na porta da varanda. Daqui, as luzes do outro prédio parecem dezenas de janelas idênticas. Ela segura o telefone virado contra o corpo.

Rayssa: — Minha mãe pediu pra eu passar em casa depois do jantar. Disse que me espera acordada, mesmo eu falando que não precisa.

Você: — Ela tá preocupada.

Rayssa: — E tem razão. O problema é que eu não sei como tranquilizar ninguém quando eu mesma não tô tranquila.

Você observa a expressão dela mudar quando ouve Isabella rir na cozinha.

Rayssa: — A Isa faz isso, sabe? Finge que tá bem, faz piada, resolve coisa. Queria que alguém cuidasse dela sem ela precisar pedir.

Você: — Você pode falar isso pra ela.

Rayssa: — Eu sei. Só que... às vezes, quando a gente adia uma conversa importante, ela começa a parecer impossível.

Uma vibração interrompe a frase. Rayssa verifica rapidamente a tela e guarda o telefone. Quando você pergunta, ela diz que é a mãe. Não há como verificar ali — e você não insiste.`,[
C('Incentivar Rayssa a conversar com Isabella','h09',[B('rayssa',3),['friendBond',['isabella','rayssa'],3]]),
C('Contar que também tem medo de deixar assuntos para depois','h09',[B('rayssa',5)])]);
A('h09','APARTAMENTO · A MESA','18:51','house',`A mesa fica pronta aos poucos, entre discussões sobre quem cortou o pão errado e quem usou a última cadeira sem perguntar. Laisla traz a travessa principal, Isabella carrega os copos, Rauanny aumenta o volume de uma música antiga no telefone.

A saudade ocupa lugar à mesa de modo diferente para cada pessoa. Não é preciso explicar todas as lembranças: quem está presente continua conversando, e quem falta é lembrado com cuidado.

Laisla: — Hoje a gente vai comer, rir e não procurar pista em porta-retrato, combinado?

Isabella: — E se o seu porta-retrato tiver uma pista?

Laisla: — Eu quebro o porta-retrato.

Breno se despede: prometeu buscar Samuel e conferir uma informação na oficina antes de voltar. Você pede que fique mais um pouco, mas ele aperta sua mão, olha para o relógio e promete avisar assim que encontrar Samuel.

Breno: — Me manda mensagem se precisar. Qualquer coisa. E não tenta resolver tudo sozinho.

Ele sai. O apartamento fica com o grupo do jantar, e Ryan continua do outro lado do pátio, sem ter terminado de esperar o técnico.`,[
C('Pedir que Breno avise assim que encontrar Samuel','h10',[F('breno_avisa'),B('breno',3)]),
C('Deixar Breno ir e voltar para a mesa','h10',[B('laisla',2)])]);
A('h10','SALA DE JANTAR · LEMBRANÇAS','19:04','house',`A conversa não começa com o passado. Começa com um professor que pronunciava os nomes de todo mundo errado, com uma festa de aniversário em que Ryan caiu vestido na piscina e com as vezes em que Isabella precisou buscar Laisla porque o aplicativo de transporte cancelou a corrida.

Isabella: — Ela me ligou e falou “venha me salvar”. Eu pensei que tinha alguém seguindo ela. Era porque começou a chover.

Laisla: — Eu tava de salto! Você queria que eu morresse?

Rauanny: — Agora entendi por que ela acha que você exagera.

Rayssa limpa uma lágrima de tanto rir. Você sente o próprio corpo relaxar. É um sentimento estranho depois de semanas esperando uma ameaça em cada esquina.

O assunto finalmente chega a Samuel. Ryan manda uma mensagem dizendo que o técnico atrasou, mas está terminando. Laisla responde com uma foto da sobremesa pela metade. Segundos depois chega um áudio indignado de Ryan, que provoca uma nova rodada de risadas.

Por alguns minutos, o grupo parece ter voltado à época em que um erro podia ser resolvido com um pedido de desculpas.`,[
C('Perguntar a Isabella sobre seus planos depois da escola','h11a',[B('isabella',5)]),
C('Pedir a Laisla que conte uma história da infância com Rauanny','h11b',[B('laisla',5),B('rauanny',3)]),
C('Responder ao áudio de Ryan com uma provocação','h11c',[B('ryan',4)])]);
A('h11a','MESA · PLANOS ADIADOS','19:16','house',`Isabella demora um pouco para responder.

Isabella: — Eu queria morar fora por seis meses. Nem precisava ser muito longe. Só queria trabalhar, estudar alguma coisa diferente, ver se eu conseguia ser eu mesma sem ninguém me conhecer.

Laisla: — Você queria fugir da gente, isso sim.

Isabella: — Queria fugir de você pedindo carona às duas da manhã.

Rayssa: — Eu lembro desse plano. Você fez uma lista enorme de lugares e me obrigou a avaliar cada um.

Isabella: — Porque você tinha bom gosto! Até começar a me mandar fotos de quartos minúsculos com a legenda “aconchegante”.

As duas trocam um olhar de intimidade antiga. Isabella depois fala mais baixo.

Isabella: — Agora eu nem sei se faria a viagem. Talvez eu só queira ter o direito de pensar no futuro de novo.

Você não tenta consertar o problema. Pergunta qual cidade ela ainda escolheria. Isabella responde, e a conversa termina falando de cafés, praias e sonhos que ainda pertencem a pessoas vivas.`,[go('h12','Voltar ao assunto do jantar',[['trait','empatia',1]])]);
A('h11b','MESA · QUANDO ERAM CRIANÇAS','19:16','house',`Laisla conta que conheceu Rauanny numa fila de escola, quando as duas tinham perdido o ônibus de uma excursão.

Laisla: — Ela apareceu toda mandona dizendo que tinha um plano.

Rauanny: — Eu tinha! O plano era ligar para a coordenação.

Laisla: — O plano dela envolvia gritar com a secretária.

Rauanny: — Porque ninguém atendia o telefone!

A lembrança cresce. Elas falam do primeiro aniversário que passaram juntas, de um tênis emprestado que nunca voltou e de um período em que ficaram sem se falar por causa de uma fofoca ridícula.

Laisla: — Na época eu jurei que nunca mais olhava pra cara dela.

Rauanny: — Durou quarenta minutos.

Laisla: — Cinquenta.

Rauanny: — Você apareceu com um pacote de biscoito e pediu desculpa de boca cheia.

Você percebe que nenhuma das duas quer ser vista como frágil. Ainda assim, as duas ficam perto quando a risada diminui. A conversa se encerra com uma promessa boba de devolver o tênis que ninguém lembra mais onde está.`,[go('h12','Acompanhar a conversa para a sobremesa',[['friendBond',['laisla','rauanny'],2]])]);
A('h11c','MESA · RYAN DO OUTRO BLOCO','19:16','phone',`Você grava um áudio para Ryan:

Você: — Aviso oficial: a sobremesa era ótima. Era.

A resposta chega quase imediatamente, indignada e teatral.

Ryan: — Vocês são criminosos. E eu tenho provas. Minha tia disse que me adota se eu parar de andar com vocês.

Laisla pega o seu telefone e responde:

Laisla: — Pede pra sua tia te ensinar a chegar na hora.

O grupo ri. Ryan aparece por alguns segundos na varanda do bloco vizinho, faz um gesto obsceno para Laisla e some de novo. Do outro lado, uma luz forte ilumina uma estrutura metálica apoiada na parede do corredor de serviço. O técnico ainda está lá.

Isabella: — Pelo menos um de nós mora do lado de alguém que tem ferramenta pra consertar a própria vida.

Rayssa: — Você consegue transformar qualquer assunto numa crítica pessoal.

Isabella: — É um talento. Eu cobro caro.`,[go('h12','Guardar o celular e voltar ao jantar',[F('ryan_avisado')])]);
A('h12','APARTAMENTO · SOBREMESA E SILÊNCIO','19:32','house',`A sobremesa termina num debate sobre qual filme é bom de verdade e qual só tem um trailer bonito. Rauanny implica com o gosto de Ryan, mesmo ele não estando presente. Laisla defende um filme ruim porque viu com a amiga quando eram pequenas. Isabella ameaça criar uma votação formal.

Por um instante, a conversa escorrega para Allan. Se ele ainda está ali, responde com uma piada exagerada sobre escapar de outro filme de terror. Se não está, a mesa guarda alguns segundos de silêncio antes de Samuel mandar uma mensagem para perguntar como todos estão. Laisla oferece guardar um prato para ele.

Rayssa: — Eu senti falta disso. De não precisar de um motivo pra sentar junto.

Laisla: — Então vamos fazer de novo. Só com menos gente falando ao mesmo tempo.

Isabella: — Você convidou justamente essas pessoas e quer silêncio?

Rauanny: — Ela vive de sonhos impossíveis.

Depois, as pessoas se levantam para recolher pratos. A cozinha vira uma pequena bagunça de guardanapos e copos. Ninguém percebe de imediato quando a música do telefone de Rauanny para.`,[
C('Ajudar a guardar os pratos e notar as portas internas','h12private',[F('conhece_corredor'),B('isabella',2)]),
C('Sair à varanda para falar com Ryan','h12private',[F('ryan_avisado'),B('ryan',2)]),
C('Ficar com Laisla na sala e ajudá-la a recolher tudo','h12private',[F('conhece_sala'),B('laisla',2)])]);


// Intervalo afetivo, sem romper a escolha definitiva do capítulo 5.
A('h12private','APARTAMENTO · ANTES DO ATAQUE','19:40','house',`O jantar terminou, mas ainda há coisas para conversar antes que a noite mude.`,[]);
// ATO III — Uma imagem tirada de dentro do apartamento. O intruso age sozinho.
A('h13','SALA · UM RUÍDO DIFERENTE','19:47','house',`Uma pancada curta vem do corredor dos quartos. Não soa como um objeto pesado caindo; é mais discreta, semelhante a uma porta fechando com pressa. Laisla ergue a cabeça.

Laisla: — Rauanny, você foi no meu quarto?

Rauanny: — Não. Por quê?

Laisla: — Porque eu deixei a janela fechada. E ouvi alguma coisa do lado de lá.

Isabella aparece com um pano na mão. O corredor está apagado; apenas a faixa de luz da cozinha alcança o chão. Do apartamento ao lado vem o som abafado de uma televisão.

Rayssa: — Deve ser o vento.

Laisla: — Eu moro aqui. Sei como o vento faz barulho.

Você lembra da porta que ficou encostada quando chegaram. Não dá para saber se alguém entrou. Ainda não. O grupo espera que você diga alguma coisa, talvez porque esteja mais perto do corredor.

O celular de Isabella vibra. Ela olha para a tela e para de respirar por um instante.`,[
C('Mandar todos se reunirem antes de investigar','h14a',[F('grupo_alerta'),['trait','cautela',1]]),
C('Ir com Laisla verificar a porta do quarto','h14b',[F('voce_corredor'),B('laisla',2)]),
C('Pedir que Isabella mostre o que recebeu','h14c',[F('foto_primeiro'),B('isabella',2)])]);
A('h14a','SALA · TODO MUNDO AQUI','19:49','phone',`Você: — Ninguém vai sozinho. Todo mundo pra sala, agora.

Isabella: — Olha meu celular primeiro.

Na tela há uma imagem feita há menos de um minuto. É a mesa do jantar, fotografada a partir do corredor escuro. Vocês aparecem sentados, conversando, sem perceber a câmera.

Laisla: — Isso é daqui. É a porra da minha mesa.

Rauanny já procura a bolsa onde guardou o telefone, mas você pede que ela pare. Não há nenhuma imagem do corredor mostrando quem fotografou. Só a prova de que uma pessoa esteve dentro do apartamento enquanto vocês comiam.

Rayssa leva a mão à boca.

Isabella: — A foto foi enviada para o meu número. O mesmo que recebeu as ameaças anteriores.

O apartamento inteiro parece ficar menor. Você conta as pessoas à sua frente, uma por uma, sem permitir que se espalhem.`,[go('h15','Verificar portas e saídas sem se separar',[F('aviso_sem_separar')])]);
A('h14b','CORREDOR · O PRIMEIRO PASSO','19:49','forest',`Você acompanha Laisla até a entrada do corredor. Ela vai na frente, mas você segura seu braço antes que atravesse a faixa de escuridão.

Laisla: — Tem alguém na minha casa?

Você: — Ainda não sabemos.

De dentro do quarto vem um estalo metálico. Talvez o trinco da janela. Talvez outra coisa. Laisla respira fundo, tentando vencer o tremor das mãos.

Atrás de vocês, Isabella solta um palavrão.

Isabella: — NÃO ENTRA AÍ! Olha isso!

Ela mostra o celular: uma foto da mesa do jantar, tirada a partir do corredor em que vocês estão. Pela posição, a pessoa que fotografou podia ter estado a poucos passos de vocês.

Você recua imediatamente. Laisla puxa o braço, agora sem reclamar. O medo deixa de ser uma hipótese abstrata.`,[go('h15','Recuar com Laisla e juntar o grupo',[F('aisle_perigoso'),B('laisla',3)])]);
A('h14c','SALA · A FOTOGRAFIA','19:49','phone',`Você se aproxima de Isabella. A imagem mostra a mesa, as cadeiras, o guardanapo manchado de refrigerante e a expressão de Rauanny contando alguma história.

Isabella: — Acabaram de mandar isso. Agora. Eu tava olhando pra você quando o celular vibrou.

Laisla: — Meu Deus. Isso foi aqui dentro.

Isabella aproxima a fotografia. No reflexo de um quadro decorativo aparece parte de uma manga escura, mas não há rosto, nem detalhe suficiente para identificar alguém.

Rayssa: — A gente precisa sair.

Rauanny: — Pela porta, então. Antes que essa pessoa perceba que vimos.

Você não sabe se quem fotografou continua no corredor. Mas percebe que a foto foi enviada antes de qualquer ameaça escrita. Como se o remetente quisesse que vocês olhassem exatamente para onde ele está.`,[go('h15','Organizar a saída com o grupo',[['clue','foto_dentro_apartamento_c6'],F('foto_salva')])]);
A('h15','APARTAMENTO · UM PLANO QUE DURA SEGUNDOS','19:52','house',`Você tenta manter a voz baixa. Isabella se aproxima da porta de entrada e testa a maçaneta. Laisla busca as chaves, que deveriam estar num gancho junto ao interruptor, mas o gancho está vazio.

Laisla: — Eu deixei aqui. Eu sempre deixo aqui.

Rauanny: — Tem saída de serviço?

Laisla: — Tem uma porta na área de lavanderia, mas ela dá no corredor de manutenção. E precisa de cartão pra abrir a grade.

Rayssa: — Então liga pra portaria.

Isabella já está discando. Ninguém atende. Do outro lado do corredor, alguma coisa bate de novo. Agora é mais perto.

Você olha as duas rotas: a sala e a cozinha, à esquerda; o corredor dos quartos, à direita. Os amigos estão separados por poucos passos, mas basta um instante para essa distância virar um problema.

Uma voz distorcida sai do alto-falante do telefone de Isabella, apesar de ninguém ter atendido a ligação:

Voz: — Vocês sempre foram muito bons em decidir quem fica para trás.`,[
C('Pedir para Isabella guardar o telefone como prova','h16a',[['clue','ligacao_no_jantar_c6'],F('prova_chamada')]),
C('Mandar alguém procurar um extintor e algo para barricar','h16b',[F('extintor'),['trait','cautela',1]]),
C('Tentar avisar Ryan no bloco vizinho','h16c',[F('ryan_avisado'),B('ryan',2)])]);
A('h16a','SALA · VOZ NO TELEFONE','19:54','phone',`Isabella desliga e salva o registro da ligação enquanto suas mãos tremem.

Isabella: — Eu gravei os últimos segundos. Não sei se vai servir, mas gravei.

Laisla: — É alguém usando o nosso número? Como sabe que a gente tá aqui?

Rayssa: — Perguntar agora não vai tirar essa pessoa do apartamento.

Rauanny concorda, surpresa com a firmeza repentina dela. Você pede que ninguém toque no telefone de Isabella. Se sobreviverem à noite, aquela gravação poderá impedir que a polícia trate o ataque como uma história inventada por jovens assustados.

Uma sombra atravessa o vão entre a porta do quarto e a parede. Isabella vê primeiro.

Isabella: — Gente... tem alguém ali.

A frase mal termina quando o corredor se enche de um ruído seco, como metal batendo contra madeira.`,[go('h17','Reagir ao movimento do corredor')]);
A('h16b','COZINHA · UM OBJETO ÚTIL','19:54','house',`Você vê o pequeno extintor preso ao lado da porta da cozinha. A validade está atrasada, mas o lacre parece inteiro. Pega o cilindro, testa o peso e o entrega a quem estiver mais próximo.

Laisla: — Tá achando que a gente vai apagar incêndio?

Você: — Tô achando que ficar sem nada na mão é pior.

Isabella arranca o suporte de um cabideiro; Rauanny procura o cabo de uma vassoura. Nenhum objeto transforma vocês em lutadores. São improvisos de pessoas tentando ganhar segundos suficientes para fugir.

Rayssa segura a manga de Isabella.

Rayssa: — Não vai até o quarto. Promete.

Isabella: — Eu não vou bancar a heroína. Só quero sair daqui com você.

O corredor responde com uma batida violenta. A luz pisca e apaga por um segundo.`,[go('h17','Manter o extintor por perto',[F('tem_defesa')])]);
A('h16c','SALA · A JANELA DO BLOCO B','19:54','phone',`Você liga para Ryan. Ele atende com a voz abafada, como se estivesse carregando alguma coisa.

Ryan: — Fala, sobrevivente. Eu tô tentando descer, mas o técnico deixou a escada atravessada no corredor e—

Você: — Ryan. Tem alguém dentro do apartamento. A porta dos quartos tá se mexendo sozinha.

A brincadeira morre imediatamente na voz dele.

Ryan: — Fica longe do corredor. Tranca a porta. Eu tô olhando pra janela de vocês agora.

Você: — Não aparece na varanda, senão essa pessoa te vê.

Ryan: — Tá. Eu vou chamar ajuda e não desligo. Se precisar, grita meu nome.

Você termina a ligação com o telefone na mão. O plano é imperfeito, mas ao menos alguém do outro lado sabe que vocês estão em perigo antes que o ataque comece.`,[go('h17','Voltar para os amigos',[F('ryan_tempo')])]);
A('h17','APARTAMENTO · A INVASÃO','19:56','forest',`A porta do quarto se abre devagar. Primeiro aparece uma luva escura. Depois, a superfície lisa de uma máscara pálida, sem expressão. A figura não se apressa. Parece ter calculado exatamente quanto tempo vocês levariam para entender.

Laisla: — SAI DA MINHA CASA!

Isabella grita para todos recuarem. Rauanny empurra uma cadeira em direção ao corredor, mas o mascarado a desvia com um movimento rápido. Um brilho de metal surge junto ao braço dele.

Rayssa: — CORRE! PRA COZINHA!

O grupo se rompe no mesmo instante. Isabella puxa Rayssa para a esquerda. Allan, caso esteja ali, tenta impedir que alguém fique para trás. Do lado direito, Laisla segura a mão de Rauanny e corre para o quarto que dá para a varanda interna.

Você está no meio. As pessoas gritam seu nome de lugares diferentes. Não existe tempo para decidir pela lógica perfeita; existe apenas o próximo passo.`,[
C('Proteger Laisla e Rauanny enquanto correm para o quarto','h18a',[F('nucleo_a_preparado'),B('laisla',3)]),
C('Ajudar Isabella e Rayssa a alcançar a cozinha','h18b',[F('nucleo_b_preparado'),B('isabella',3)]),
C('Tentar distrair o mascarado antes de escolher um lado','h18c',[F('mascarado_atrasado'),['trait','coragem',2]])]);
A('h18a','CORREDOR · SEGUNDOS ROUBADOS','19:57','forest',`Você agarra a cadeira que Rauanny deixou para trás e a empurra contra a entrada do corredor. O mascarado tropeça nela por um instante; o metal raspa a parede, deixando uma marca funda.

Laisla: — {nome}, VEM!

Rauanny já chegou à porta do quarto. Ela segura a maçaneta para que você passe primeiro, mas você espera Laisla atravessar. Os três entram praticamente juntos.

Do lado de fora, Isabella chama por Rayssa. Há barulho de objetos caindo na cozinha. Você tenta enxergar pelo vão, mas a porta do quarto bate com força.

Laisla encosta as costas na madeira e tenta girar a chave. Ela não está na fechadura.

Laisla: — Não, não, não. Onde tá a porcaria dessa chave?

Rauanny: — A gente segura. Depois resolve a janela.

Você sente a madeira vibrar sob o primeiro golpe.`,[go('h19','Procurar uma maneira de manter a porta fechada')]);
A('h18b','COZINHA · UM EMPURRÃO','19:57','forest',`Você se lança na direção de Isabella no momento em que o mascarado acelera. Puxa uma cadeira na frente dele e grita para as duas se afastarem.

Rayssa segura o braço de Isabella. A amiga escorrega perto da pia, bate o ombro na quina do balcão e solta um gemido abafado, mas consegue se levantar.

Isabella: — Vai! Não para por minha causa!

Rauanny chama você do corredor dos quartos. Laisla já está tentando abrir uma porta. Você entende que permanecer entre os dois grupos só vai deixá-los mais expostos.

Você: — ISA! PROCURA OUTRA SAÍDA! A GENTE SE ENCONTRA!

Isabella: — NÃO SOME!

Você responde que não vai. A promessa sai num tom que você não reconhece como sua própria voz. Quando chega ao quarto, Laisla está tentando fechá-lo e a máscara já apareceu no fim do corredor.`,[go('h19','Ajudar Laisla a fechar a porta',[F('ferida_isabella')])]);
A('h18c','SALA · CHAMAR A ATENÇÃO','19:57','forest',`Você derruba a bandeja de copos na direção do mascarado. O vidro estoura no chão, e a figura se vira. Não é suficiente para derrotá-lo, mas o faz mudar de direção.

Você: — É AQUI! VEM ATRÁS DE MIM!

Breno teria chamado aquilo de estupidez. Ryan provavelmente teria feito uma piada, se não estivesse longe demais para ajudar. Você só sabe que Isabella e as outras pessoas ganham alguns passos de distância.

Laisla grita do quarto: — PARA DE BANCAR O HERÓI!

Você recua, evita o primeiro avanço e corre em direção à voz dela. Rauanny fecha a porta na mesma hora em que você atravessa. A madeira estremece.

Do corredor vem um silêncio inquietante. O mascarado parece estar escolhendo qual núcleo perseguir primeiro.`,[go('h19','Respirar e pensar no próximo movimento',[F('ryan_tempo'),['trait','coragem',1]])]);
A('h19','QUARTO DE LAISLA · NÚCLEO A','19:59','house',`O quarto de Laisla está menor do que deveria. Há roupa dobrada pela metade numa cadeira, pôsteres antigos colados junto ao armário e uma janela que se abre para o pátio entre os blocos. Lá fora, as luzes do Bloco B recortam a noite.

Laisla: — Meu Deus, minha casa. Minha casa, cara. Tem uma pessoa de máscara na minha casa.

Rauanny segura as mãos dela.

Rauanny: — Olha pra mim. Você vai conseguir respirar. Depois a gente descobre o resto.

O mascarado bate uma vez na porta, devagar. Um teste. Laisla encolhe os ombros.

Você vê uma cômoda pesada perto da parede, um lençol comprido sobre a cama e a janela com tranca antiga. Pode tentar reforçar a porta ou preparar outra saída, mas não dá para fazer tudo ao mesmo tempo.

Pelo corredor distante, Isabella solta um grito. Os dois núcleos estão separados de verdade.`,[
C('Arrastar a cômoda para proteger a porta','h20a',[F('porta_reforcada'),B('laisla',3)]),
C('Examinar a janela e o bloco vizinho','h20b',[F('janela_localizada'),['trait','cautela',1]]),
C('Procurar pano e alguma coisa para primeiros socorros','h20c',[F('kit_improvisado'),B('rauanny',2)])]);
A('h20a','QUARTO · A CÔMODA','20:01','house',`A cômoda é mais pesada do que parecia. Você e Rauanny a empurram enquanto Laisla segura a porta com o ombro. O móvel raspa o piso, prende no tapete e quase cai sobre o pé de vocês.

Rauanny: — PRA ESQUERDA! NÃO, SUA ESQUERDA!

Você consegue encostar a madeira contra a maçaneta no instante em que o mascarado golpeia do outro lado. O impacto desloca a cômoda alguns centímetros.

Laisla: — Isso segura?

Você: — Tempo suficiente pra gente procurar outra saída. Espero.

Laisla encara o quarto como se estivesse vendo a própria casa pela primeira vez. Pega uma fotografia da mesa de cabeceira — ela e Rauanny com Ryan, todos rindo — e enfia no bolso. É um gesto pequeno, quase automático.`,[go('h21','Verificar como o outro núcleo está')]);
A('h20b','QUARTO · O VÃO ENTRE OS PRÉDIOS','20:01','house',`Você força a janela, que está presa por uma pequena trava de ferro. O ar frio entra de uma vez. No outro bloco, uma varanda iluminada parece perto o bastante para tocar, até você olhar para baixo.

O pátio de serviço é seis andares abaixo. Não há passarela, toldo nem plataforma de segurança entre as janelas. Saltar seria impensável.

Laisla: — Por favor, não me diz que sua ideia é pular.

Você: — Minha ideia é achar alguém do outro lado.

Rauanny aponta para a janela de Ryan, duas portas adiante da varanda iluminada. Ainda não há ninguém ali. Mas o técnico havia deixado uma escada grande perto da saída do apartamento, e você se lembra disso agora.

Uma nova pancada sacode a porta. Laisla pede que você feche a janela antes que alguém perceba.`,[go('h21','Manter a janela preparada',[F('ryan_tempo')])]);
A('h20c','QUARTO · PANO E RESPIRAÇÃO','20:01','house',`Você encontra uma pequena bolsa de medicamentos no armário do banheiro anexo: gaze, ataduras, fita adesiva e um par de luvas. A embalagem não resolve uma ferida grave, mas pode ajudar a estancar sangue enquanto procuram socorro.

Laisla: — Eu comprei isso depois que a Rauanny caiu de bicicleta. A gente riu muito da minha paranoia.

Rauanny: — Hoje eu oficialmente retiro todas as minhas críticas.

Ela tenta sorrir. Não consegue. Você entrega um tecido limpo para Laisla e explica que ninguém deve ficar sozinho se estiver machucado.

Do outro lado da porta o mascarado deixa de bater por alguns segundos. A ausência de som assusta mais do que os golpes.

Rauanny: — Ele não foi embora. Eu tô sentindo.

Laisla: — Então para de falar como se ele pudesse ouvir a gente.`,[go('h21','Escutar o que acontece no corredor')]);
A('h21','QUARTO · UMA CHAMADA INTERROMPIDA','20:03','phone',`Seu telefone começa a vibrar: é Isabella. A tela está molhada de suor e o primeiro toque falha. Você atende no segundo.

Isabella: — A gente tá na cozinha. A porta da lavanderia tá fechada com grade. Não sei onde o Allan foi, a Rayssa tá tentando achar outra saída!

Você: — A gente chegou no quarto. Tem janela pro outro bloco. O Ryan pode ajudar.

Isabella: — ELE AINDA TÁ NO OUTRO PRÉDIO?

Você: — Tá. Fica longe do corredor. Se vocês conseguirem chegar até aqui, a gente procura uma forma de atravessar.

O ruído da ligação aumenta. Uma voz grita ao fundo — não dá para saber quem. Isabella pede que você não desligue. Depois, a linha cai.

Laisla segura seu braço.

Laisla: — A gente não pode deixar elas lá.

Rauanny: — Também não vai adiantar abrir a porta e morrer no corredor. Pensa.`,[
C('Pedir para Rauanny tentar contato com Isabella de novo','h22a',[F('contato_b'),B('rauanny',2)]),
C('Procurar uma saída no quarto antes de arriscar o corredor','h22b',[F('janela_localizada'),['trait','cautela',1]]),
C('Decidir criar uma distração caso o mascarado volte','h22c',[F('distracao_pronta'),['trait','coragem',1]])]);
A('h22a','QUARTO · DUAS VOZES NA LINHA','20:04','phone',`Rauanny envia mensagens rápidas, uma atrás da outra. O indicador de entrega demora mais do que deveria, e cada segundo parece uma ameaça.

Rauanny: — Isa? Você tá ouvindo? Responde, por favor.

A resposta finalmente aparece: “na área de serviço. porta dos fundos travada. procurando saída.”

Laisla encosta a testa na parede, aliviada por receber qualquer sinal.

Você: — Fala pra ela não vir sem avisar. Se abrir a porta do corredor, a gente precisa saber.

Rauanny envia as instruções. Isabella responde com um emoji de mão fechada, provavelmente para mostrar que entendeu. É uma comunicação miseravelmente pequena diante do perigo, mas mantém os grupos conectados.

Uma batida mais forte faz os três se afastarem da porta. A cômoda está começando a ceder.`,[go('h23','Preparar-se para o próximo impacto')]);
A('h22b','QUARTO · A JANELA ALTA','20:04','house',`Você volta à janela. O fecho é velho, mas funciona depois de duas tentativas. O vão entre os prédios parece estreito na escuridão; as luzes lá embaixo revelam que não existe uma maneira segura de descer por fora.

Laisla: — Quando eu era criança, achava que dava pra passar de um prédio pro outro segurando nos canos.

Rauanny: — Excelente hora pra descobrir que criança tem ideias idiotas.

Laisla ri uma única vez, apesar do medo. Você encontra um apoio de ferro fixado na borda interna da janela, próprio para prender uma rede de manutenção quando algum técnico trabalha na fachada. Pode ser útil se Ryan conseguir uma ponte improvisada.

Do corredor vem uma nova pancada. Laisla corre de volta para segurar a cômoda.`,[go('h23','Guardar a informação sobre o apoio',[F('ponto_ancoragem')])]);
A('h22c','QUARTO · DISTRair SEM ATACAR','20:04','house',`Você tira da bolsa de Laisla uma pequena caixa de som portátil, ainda conectada ao celular dela.

Laisla: — O que você vai fazer?

Você: — Se ele achar que alguém correu pro banheiro, talvez deixe a porta do quarto por alguns segundos.

Rauanny: — Ou talvez perceba que a gente tá tentando enganar.

Você coloca o aparelho perto da porta do banheiro, programa um som e recua. Não é um plano seguro, apenas uma possibilidade de ganhar tempo sem abrir a barricada.

Laisla pega sua mão por um momento.

Laisla: — Obrigada por não tratar a gente como problema. Mas não morre tentando consertar tudo sozinho, tá?

Você promete ficar ao alcance das duas. O som é preparado, mas ainda não acionado.`,[go('h23','Deixar a distração pronta para uma emergência')]);

// ATO IV — Isabella é jogável. Duas rotas separadas, não teletransporte.
A('h23','ENQUANTO ISSO · COZINHA','20:05','house',`PONTO DE VISTA: ISABELLA.

Você assume as decisões de Isabella, que prende o telefone entre o rosto e o ombro enquanto tenta abrir a porta da área de serviço.

Rayssa: — A grade tem uma fechadura eletrônica. Se a gente conseguir ligar pra portaria, talvez abram pelo painel.

Isabella: — A portaria não atendeu antes. Por que ia atender agora?

Rayssa: — Porque eu vou continuar ligando até alguém pegar essa porra desse telefone.

Na pia há pratos sujos e uma panela grande ainda quente. A porta da cozinha é de madeira fina; não aguentaria muito se o mascarado resolvesse voltar. Ao lado da geladeira, um armário alto bloqueia parcialmente o acesso à lavanderia.

Isabella pensa em Rayssa, na amiga que conhece desde antes da festa. Não sabe que algumas decisões da noite já foram tomadas longe dali. Sabe apenas que não vai abandoná-la.

Você decide o primeiro movimento de Isabella.`,[
C('Pedir a Rayssa que continue falando com a portaria','h24a',[F('portaria_ligada'),['friendBond',['isabella','rayssa'],2]]),
C('Examinar a fechadura e o acesso à lavanderia','h24b',[F('servico_encontrado')]),
C('Procurar um objeto para impedir a entrada pela cozinha','h24c',[F('barreira_cozinha')])]);
A('h24a','COZINHA · A VOZ DE RAYSSA','20:07','phone',`Rayssa liga três vezes antes de alguém atender. Isabella ouve apenas metade da conversa, entrecortada pelos ruídos do edifício.

Rayssa: — Tem uma pessoa armada aqui dentro! A gente tá trancada na área de serviço! Manda ajuda!

Porteiro: — Senhora, a grade de manutenção só abre com a chave reserva. O funcionário está no Bloco B.

Rayssa: — ENTÃO CHAMA ELE! CHAMA A POLÍCIA!

Isabella encosta a mão no ombro dela e pede que respire. Rayssa treme, mas continua a conversa até confirmar o número do apartamento. Quando desliga, parece prestes a chorar.

Isabella: — Você fez certo. Agora a gente vai achar um jeito.

Rayssa: — Não promete que vai ficar tudo bem. Só fica aqui comigo um segundo.

As duas se abraçam rapidamente, sem permitir que o abraço se transforme numa espera paralisante.`,[go('h25','Voltar a procurar uma passagem',[B('rayssa',2)])]);
A('h24b','ÁREA DE SERVIÇO · GRADE TRAVADA','20:07','house',`A fechadura eletrônica está sem energia, mas a grade de serviço possui um destravamento mecânico protegido por uma tampa pequena. Isabella encontra uma marca de manutenção recente.

Isabella: — A gente talvez consiga abrir. Só preciso de uma coisa fina pra tirar a tampa.

Rayssa entrega uma chave velha de gaveta que estava pendurada perto do tanque.

Rayssa: — Isso serve?

Isabella: — Talvez. Segura a lanterna do telefone sem apontar pra janela.

O trabalho leva tempo. Isabella abre a tampa, mas descobre um mecanismo interno que não consegue alcançar. A saída não está pronta; existe uma rota possível se encontrarem a chave do porteiro ou alguém abrir pelo lado de fora.

Rayssa fica perto da porta da cozinha, ouvindo o corredor. A voz dela muda quando diz que ouviu passos, mas Isabella está concentrada demais para interpretar qualquer hesitação.`,[go('h25','Marcar a saída de serviço como alternativa',[['clue','grade_servico_c6']])]);
A('h24c','COZINHA · GANHAR TEMPO','20:07','house',`Isabella empurra uma mesa estreita até a porta. Rayssa ajuda, mas a quina do móvel prende no piso irregular.

Rayssa: — Puxa pro seu lado. Isso. Cuidado com a mão.

Quando finalmente conseguem encaixar a mesa, Isabella percebe que a janela da cozinha dá para um duto interno, estreito demais para uma pessoa adulta passar com segurança. O duto também não alcança o Bloco B.

Isabella: — Não é uma saída.

Rayssa: — Mas se a gente derrubar alguma coisa lá dentro, talvez chamem ajuda.

Isabella: — Primeiro precisamos sair vivas daqui.

A frase fica entre as duas. Elas nunca conversaram seriamente sobre a possibilidade de perder uma à outra. Talvez porque dizer aquilo em voz alta sempre pareceu chamar uma tragédia.

Rayssa segura a borda da mesa como se pudesse impedir o futuro com as mãos.`,[go('h25','Permanecer junto a Rayssa',[['friendBond',['isabella','rayssa'],2]])]);
A('h25','ÁREA DE SERVIÇO · ALGUÉM FALTA','20:09','forest',`Isabella conta as pessoas no pequeno espaço: ela, Rayssa e, se Allan sobreviveu ao arquivo da estrada norte, ele também. O resto do grupo correu para o corredor dos quartos.

O mascarado passa do outro lado da porta da cozinha. Não tenta entrar imediatamente. Primeiro se detém, como se escutasse a respiração das pessoas escondidas.

Rayssa leva o indicador aos lábios. A cabeça de Isabella pulsa. Ela olha para a grade de serviço e para a bancada. Há um armário que pode ser usado para bloquear a passagem, mas empurrá-lo provocaria barulho.

Do outro lado, o mascarado toca três vezes na madeira. Uma batida deliberada, sem pressa.

Isabella: — Ele sabe que a gente tá aqui.

Rayssa: — Então a gente faz ele esperar.

A frase soa firme demais. Isabella não tem tempo para pensar nisso: alguma coisa raspa a parte inferior da porta, e ela precisa decidir agora.`,[
C('Ficar imóvel até o mascarado se afastar','h26a',[F('isabella_silencio')]),
C('Criar distração para chegar ao corredor de serviço','h26b',[F('rota_isabella_corredor'),F('isabella_perigo')]),
C('Tentar chamar o protagonista para reunir os núcleos','h26c',[F('tentou_reunir'),B('isabella',2)])]);
A('h26a','COZINHA · O SILÊNCIO NÃO É PAZ','20:10','forest',`Isabella coloca o telefone no modo silencioso. Rayssa imita o gesto. O mascarado continua imóvel do outro lado, próximo o bastante para que o peso de cada respiração pareça um anúncio de onde vocês estão.

Um elevador apita no corredor principal do prédio. O mascarado se afasta alguns passos, talvez para verificar o som. Isabella espera mais do que gostaria antes de se mover.

Rayssa: — Acho que ele foi.

Isabella: — Acha não serve. A gente vai até a grade de serviço sem fazer barulho e espera ajuda.

Rayssa assente. Ela parece aliviada por receber uma instrução, mas não consegue deixar de olhar para o telefone. Isabella toca seu ombro: um jeito de lembrar que não está sozinha.

As duas passam para a área de serviço, deixando a porta da cozinha encostada, nunca aberta por completo.`,[go('h27','Procurar como sair sem atravessar o corredor')]);
A('h26b','COZINHA · A DISTRAÇÃO','20:10','forest',`Isabella lança um pote de metal para a parte oposta da cozinha. O estrondo ecoa pelo apartamento; o mascarado se move imediatamente.

Isabella: — AGORA! RAYSSA, VEM!

Elas correm para a porta da lavanderia, mas Isabella escorrega no piso molhado, bate o antebraço na quina da bancada e sente a pele arder. Não é um ferimento fatal, porém dificulta usar a mão.

Rayssa: — Isa! Você tá sangrando!

Isabella: — NÃO PARA! A gente resolve depois!

Elas alcançam a passagem de serviço. O mascarado golpeia a porta atrás das duas, que se chocam contra a parede. A grade continua fechada, e Isabella entende que criar barulho pode ter comprado metros e perdido segundos.

Rayssa pressiona uma toalha limpa contra o braço da amiga e aguarda uma instrução.`,[go('h27','Aceitar o curativo improvisado',[F('ferida_isabella'),F('pressao_b'),['trait','coragem',1]])]);
A('h26c','COZINHA · UMA CHAMADA DE VOLTA','20:10','phone',`Isabella manda uma mensagem ao protagonista: “tentando sair pela lavanderia, tem uma grade. vocês estão vivos?” A resposta demora tanto que ela sente vontade de gritar.

Rayssa: — A Laisla conhece esse prédio. Talvez tenha uma chave de serviço.

Isabella: — E como a gente chega até ela? Abrindo a porta pro mascarado?

Rayssa não responde imediatamente. Quando o telefone vibra, Isabella quase o deixa cair. A mensagem diz que o grupo está no quarto e tentando conseguir ajuda de Ryan no Bloco B.

Isabella: — Eles estão bem. Pelo menos por enquanto.

Rayssa: — Então precisamos chegar do outro lado sem cruzar o apartamento.

Isabella respira fundo. A existência de uma rota alternativa não significa que ela seja segura. Mas agora vocês têm duas pessoas tentando resolver partes diferentes do mesmo problema.`,[go('h27','Continuar pelo corredor de serviço',[F('contato_b')])]);
A('h27','ÁREA DE SERVIÇO · UMA SAÍDA OU UM RETORNO','20:13','house',`A grade que leva à escada de serviço continua fechada. Pelo visor, Isabella enxerga a porta de um elevador de carga e uma luz de emergência piscando. Há uma rota possível para o térreo, mas alguém precisará destravar o portão de fora.

Rayssa: — O zelador tá no outro bloco. A portaria pode chamar ele. Talvez a gente consiga sair por aqui.

Isabella: — E os outros? A gente deixa a Laisla presa no próprio quarto?

Rayssa segura o rosto de Isabella por um instante, forçando a amiga a olhar para ela.

Rayssa: — A gente não vai ajudar ninguém se morrer tentando abrir uma porta sem saber onde aquela pessoa tá.

A frase é lógica. Também soa como alguém implorando que Isabella sobreviva, qualquer que seja o custo. Do outro lado do apartamento, um objeto grande cai. Isabella reconhece o barulho da cômoda do quarto.

Agora a decisão é dela, não do protagonista: arriscar um reencontro ou apostar numa saída independente.`,[
C('Tentar chegar ao quarto para reunir os amigos','h28join',[F('rota_reuniao'),F('pressao_b')]),
C('Seguir pela grade de serviço e pedir destravamento externo','h28service',[F('rota_servico'),['trait','cautela',1]]),
C('Esperar o mascarado se afastar e observar a rota antes de agir','h28wait',[F('rota_servico'),F('observou_servico')])]);
A('h28join','CORREDOR · A DECISÃO DE ISABELLA','20:15','forest',`Isabella encontra a porta da cozinha apenas encostada. O apartamento está assustadoramente silencioso. A música acabou, mas o relógio da sala continua funcionando, marcando os segundos com pequenos estalos.

Isabella: — A gente vai até o quarto. Sem correr, até precisar.

Rayssa: — Isa, não.

Isabella: — Eles vão precisar da gente. Você ouviu a Laisla gritar. Eu não vou fazer de conta que não ouvi.

Isabella avança. No chão há um copo quebrado e a fotografia que Laisla deixara sobre a mesa. Ela alcança metade do corredor quando vê a máscara surgir atrás do batente da sala.

Rayssa a puxa de volta. O tecido da manga se rasga nas mãos dela. O mascarado ergue a lâmina e bloqueia o caminho mais curto para o quarto.

A reação de Isabella decidirá se essa tentativa termina em ferimento, morte ou retorno forçado à rota de serviço.`,[
C('Recuar com Rayssa e procurar outra saída','h29',[F('rota_servico'),F('ferida_isabella'),B('rayssa',2)]),
C('Usar a porta da cozinha para bloquear o avanço e correr','h28join2',[F('isabella_perigo')]),
C('Insistir em atravessar o corredor antes que o mascarado reaja','h28joinRisk',[F('isabella_perigo'),F('erro_isabella')])]);
A('h28join2','CORREDOR · UMA ABERTURA','20:16','forest',`Isabella fecha a porta da cozinha na direção da figura. O mascarado esbarra no batente, perde um passo, mas não cai.

Rayssa: — ISA, POR AQUI!

As duas atravessam o corredor dos quartos. Isabella bate com os punhos na porta de Laisla, tentando se fazer ouvir acima dos golpes e gritos.

Isabella: — É A GENTE! ABRE SÓ UM POUCO!

Você, do outro lado, reconhece a voz. Laisla e Rauanny afastam a cômoda apenas o suficiente para que Isabella e Rayssa passem, uma de cada vez. A porta fecha novamente antes que o mascarado as alcance.

Isabella está com o braço dolorido e a respiração descompassada, mas conseguiu chegar. Ela abraça Laisla com força e não consegue dizer nada por alguns segundos.

Agora os dois núcleos se reuniram — com menos espaço, mais pessoas e a mesma ameaça do outro lado.`,[go('h29','Continuar até reorganizar os grupos',[F('b_junto'),['friendBond',['isabella','laisla'],3]])]);
A('h28joinRisk','CORREDOR · O PREÇO DA PRESSA','20:16','forest',`Isabella tenta passar pelo estreito espaço entre a parede e o mascarado. Ele antecipa seu movimento e a atinge, fazendo-a cair perto da mesa de jantar. Rayssa grita seu nome e tenta puxá-la pela gola da blusa.

Isabella: — RAYSSA, CORRE!

A dor explode no ombro de Isabella. Ela luta para se levantar, mas o mascarado já está perto de novo. Rayssa segura uma cadeira e a lança na frente dele, ganhando um instante.

Há uma segunda chance: agarrar a mão de Rayssa e recuar para a área de serviço ou continuar em direção ao quarto. A primeira opção pode custar a reunião. A segunda coloca as duas ao alcance imediato da lâmina.

Isabella nunca imaginou que teria medo de morrer numa sala em que há vinte minutos discutia sobre sobremesa.`,[
C('Aceitar a mão de Rayssa e recuar','h29',[F('rota_servico'),F('ferida_isabella'),B('rayssa',3)]),
C('Tentar avançar mesmo ferida','h28isadeath',[F('ferida_isabella')])]);
A('h28isadeath','CORREDOR · UM GRITO INTERROMPIDO','20:17','forest',`Isabella dá mais um passo na direção do quarto. A porta está perto, mas não o suficiente. O mascarado a alcança antes que consiga tocar na maçaneta.

Rayssa: — NÃO! ISA! NÃO!

A luta dura poucos segundos. Quando Rayssa tenta se aproximar de novo, o agressor se vira, obrigando-a a recuar. Isabella deixa de responder. O telefone escorrega da sua mão e fica iluminando o chão, mostrando uma chamada incompleta para o protagonista.

Rayssa se afasta chorando, sem conseguir carregar a amiga. Ela se esconde na área de serviço e chama ajuda com os dedos tremendo.

A voz de Isabella não se ouvirá novamente naquela noite. O que aconteceu precisará ser contado às pessoas que a amavam.`,[go('h29','Acompanhar a fuga de Rayssa',[['death','isabella'],F('rota_servico')])]);
A('h28service','LAVANDERIA · A GRADE DE SERVIÇO','20:15','house',`Isabella chega ao portão e se ajoelha para examinar o fecho. Rayssa ilumina o mecanismo com o telefone enquanto conversa com a portaria.

Porteiro: — Já chamamos a polícia! O zelador tá atravessando o pátio. Se ouvirem alguém do lado de fora, peçam pra ele dizer seu nome.

Isabella: — Obrigada. Por favor, rápido.

Ela não sabe se a voz do funcionário chegaria a tempo. Os passos do mascarado voltam a ecoar no corredor. A grade range quando Isabella a pressiona; está presa, mas parece ter alguma folga na base.

Rayssa: — Não força. Se quebrar e não abrir, a gente fica aqui presa.

Isabella: — Eu não vou esperar sentada.

Ela improvisa um aviso por mensagem para o protagonista: “Tentando sair pelo serviço. Não venham atrás de mim”. Pela primeira vez desde a invasão, escolhe uma rota que não depende de reencontrar todo mundo imediatamente.`,[go('h29','Esperar resposta da portaria',[F('servico_preparado')])]);
A('h28wait','LAVANDERIA · A PACIÊNCIA MAIS DIFÍCIL','20:15','house',`Isabella conta lentamente até dez, duas vezes, para não sair correndo quando escuta o mascarado arrastar alguma coisa pela sala. Rayssa encontra uma fresta na grade e observa o corredor de manutenção. Está vazio.

Rayssa: — Tem uma saída mais abaixo. Se o porteiro abrir daqui, a gente consegue descer sem passar pela sala.

Isabella: — Eu odeio ficar esperando.

Rayssa: — Eu sei. Você odeia principalmente quando é a única coisa inteligente que dá pra fazer.

A frase arranca um sorriso quase imperceptível de Isabella. Ela abre o contato de Laisla e digita: “Nós estamos tentando a escada de serviço. Se não receberem outra mensagem, chamem ajuda.”

Você, no quarto, recebe o aviso. A ausência física de Isabella deixa de ser uma informação confusa: existe uma rota separada e, por enquanto, elas estão tentando usá-la.`,[go('h29','Manter a comunicação discreta',[F('servico_preparado'),F('contato_b')])]);
A('h29','LAVANDERIA · SEGUNDOS DE DESVANTAGEM','20:19','house',`Se ele sobreviveu, o grupo precisa ajudá-lo a sair do apartamento sem agravar o que aconteceu no arquivo da estrada norte. Se morreu, não haverá uma cena impossível em que aparece para salvar os amigos: a memória dele pesa sobretudo sobre Samuel, longe dali.

Isabella e Rayssa precisam decidir como seguir, ainda que estejam separadas do grupo. Cada movimento pelo corredor pode atrair o mascarado. Um som de telefone chega até o quarto, abafado pelas batidas na porta.

Pelo lado de fora, a polícia ainda não chegou. Um estalo no corredor indica que o mascarado voltou a se aproximar dos quartos. Os núcleos não sabem exatamente onde ele está.

E, se Allan está ali, surge uma decisão difícil: ele vê um aparelho esquecido na mesa, que poderia registrar o ataque. Voltaria por uma possível prova ou abandonaria tudo para fugir com os amigos?`,[
C('Chamar Allan para a porta da lavanderia','h30',[F('allan_cauteloso'),B('allan',3)],[['flag','allan_morto_c4',false]]),
C('Apontar para o celular que ficou sobre a mesa','h29allanRisk',[F('allan_risco')],[['flag','allan_morto_c4',false]]),
C('Tentar destravar a grade com Rayssa','h30',[F('respeitou_ausencia_allan')],[['flag','allan_morto_c4',true]])]);
A('h29allanRisk','COZINHA · O APARELHO ESQUECIDO','20:20','forest',`Allan observa o telefone em cima da mesa. A tela está acesa, gravando a sala desde o primeiro grito. Talvez tenha filmado o mascarado; talvez esteja apontado apenas para uma parede.

Allan: — Se a gente pegar isso, pelo menos vai ter uma prova. A polícia vai ter que acreditar na gente.

Rayssa: — ALLAN, NÃO!

Ele atravessa a passagem com cuidado, pega o aparelho e volta, mas uma cadeira caída prende o pé na hora errada. O mascarado surge no corredor. Allan se apoia no batente e consegue escapar do primeiro movimento, porém bate o braço que já estava machucado.

Allan: — PORRA! ME AJUDA!

O mascarado ergue a faca novamente. A lâmina raspa o batente junto ao rosto de Allan, abrindo um corte em sua bochecha. O sangue escorre até o queixo. Isabella grita por ele enquanto Rayssa tenta alcançar um objeto no chão.`,[
C('Pedir que largue o telefone e recue imediatamente','h30',[F('ferido_allan'),B('allan',2)]),
C('Tentar criar uma distração para que ele fuja levando a prova','h29allanDanger',[F('erro_allan')])]);
A('h29allanDanger','COZINHA · UM SEGUNDO A MAIS','20:21','forest',`O ruído improvisado funciona por um segundo. Allan dá dois passos com o aparelho na mão, mas a dor no braço o faz perder o equilíbrio. O mascarado avança novamente.

Allan: — EU NÃO CONSIGO!

Rayssa chora do lado de dentro da lavanderia. A distância é pequena; o corredor parece interminável. Allan tenta erguer-se usando a mesa, ainda com o telefone apertado contra o peito.

O metal brilha sobre a mesa. Allan tenta se levantar; a mão escorrega no sangue que manchou a borda. A figura mascarada se aproxima sem dizer uma palavra.`,[
C('Mandar Allan abandonar o aparelho e mergulhar pela porta de serviço','h30',[F('ferido_allan'),F('perdeu_gravacao')]),
C('Pedir que ele continue correndo com o aparelho','h29allandeath',[])]);
A('h29allandeath','COZINHA · A PROVA QUE CUSTOU DEMAIS','20:22','forest',`Allan tenta manter o aparelho erguido e ganhar mais alguns passos. Não consegue. O mascarado o alcança junto à mesa e atinge seu lado com a faca. Allan solta um grito curto, tenta se defender e cai contra as cadeiras. O sangue mancha a camiseta e se espalha entre os pés dos móveis.

Rayssa grita por ajuda. O telefone cai e continua gravando o teto, mas o som de Allan chamando por Samuel desaparece.

Quando a portaria finalmente responde, Rayssa só consegue repetir que há uma pessoa caída na cozinha. O corredor impede qualquer tentativa segura de resgate naquele instante.

Allan havia sobrevivido ao ataque anterior. Chegara até o jantar e conseguira rir com os amigos. Agora nem Samuel está perto para ouvir sua última tentativa de pedir ajuda.`,[go('h30','Voltar à situação dos outros amigos',[['death','allan'],F('rota_servico')])]);

// ATO V — Protagonista, Laisla e Rauanny. Ferimentos e ancoragem importam.
A('h30','QUARTO DE LAISLA · NÚCLEO A','20:22','house',`PONTO DE VISTA: {nome}.

No quarto, o ar começa a ficar quente. A porta range. Laisla testa a janela mais uma vez, mas a saída ainda termina num vão alto entre prédios. Rauanny usa a lanterna do telefone para sinalizar à varanda do Bloco B.

Laisla: — Tem alguém olhando pra cá? O Ryan tá lá?

Rauanny: — Eu vi uma luz mexer. Acho que é ele.

Você chama baixinho, depois mais alto. Do outro lado do pátio surge uma silhueta que levanta a mão. Ryan! Ele aponta para baixo, indicando que vai procurar alguma coisa.

A porta recebe outro impacto. A cômoda se desloca um pouco. Laisla segura uma extremidade; Rauanny se posiciona na outra.

Você percebe que será impossível segurar a barricada, chamar Ryan e ajudar todas as pessoas ao mesmo tempo. Uma delas talvez precise se arriscar primeiro.`,[
C('Reforçar a barricada com Laisla','h31a',[F('porta_reforcada'),B('laisla',2)]),
C('Ajudar Rauanny a sinalizar para Ryan','h31b',[F('ryan_tempo'),B('rauanny',3)]),
C('Examinar os apoios da janela para preparar uma travessia','h31c',[F('ponto_ancoragem'),['trait','cautela',1]])]);
A('h31a','QUARTO · A FORÇA DA PORTA','20:24','house',`Você segura a lateral da cômoda com Laisla. Rauanny encontra um cabo de vassoura e o encaixa contra o rodapé para impedir que o móvel escorregue facilmente.

Laisla: — Se a gente sair daqui, eu nunca mais vou reclamar de subir escada com sacola pesada.

Você: — Pode reclamar. Vai significar que saiu.

Ela solta uma risada quebrada. Depois olha para a fotografia que guardou no bolso e pede que, se Ryan conseguir ajudar, as outras pessoas atravessem primeiro. Não diz por que. Você entende que ela não suportaria ver Rauanny ficar sozinha.

A porta resiste a mais uma pancada, mas a madeira ao redor da fechadura já começa a abrir uma fissura. Vocês ganharam tempo, não segurança permanente.`,[go('h32','Chegar à janela antes que a porta ceda')]);
A('h31b','JANELA · LUZES NO PÁTIO','20:24','house',`Você e Rauanny acendem as lanternas dos celulares. Três piscadas rápidas, uma pausa, mais duas. Ryan percebe e responde com movimentos de braço.

Rauanny: — Ele viu! RYAN, AQUI!

Laisla: — Não grita tanto, ele já viu!

Ryan aponta para o corredor do Bloco B, como se avisasse que precisaria de alguns minutos. Rauanny fica na janela para acompanhar o sinal enquanto você ajuda Laisla com a cômoda.

Laisla: — Ele vai achar alguma coisa. O Ryan sempre inventa coisa.

Rauanny: — É. Às vezes dá errado, mas ele tenta.

As duas se olham e riem por meio segundo. Você não as interrompe. Quando a próxima pancada chega, as três pessoas já estão de novo concentradas na fuga.`,[go('h32','Aguardar Ryan sem deixar a porta desprotegida')]);
A('h31c','JANELA · FERRO ANTIGO','20:24','house',`O apoio lateral da janela é fixado na alvenaria. Você não sabe quanto peso suporta; seria imprudente usá-lo sem alguém verificar a estabilidade. Ainda assim, a peça pode impedir uma escada de deslizar se houver outra pessoa segurando a extremidade oposta.

Você: — A gente não pula. Se Ryan conseguir uma escada de manutenção, prende aqui e segura dos dois lados.

Rauanny: — Você fala isso como se tivesse feito cem vezes.

Você: — Tô repetindo o que um técnico explicou na entrada do prédio.

Laisla: — Prefiro isso a ouvir “a gente descobre na hora”.

Você manda a Ryan uma foto do apoio. Ele responde com um sinal positivo. Não é garantia de sucesso, mas vocês identificaram um risco antes da travessia.`,[go('h32','Guardar o telefone e verificar a porta',[F('ryan_tempo')])]);
A('h32','QUARTO · UM AMIGO FERIDO','20:27','forest',`A próxima pancada faz a cômoda deslizar. Um canto do móvel cai sobre o pé de Rauanny, que recua com um grito. Laisla tenta segurá-la e acaba deixando a porta sem apoio por um instante.

Rauanny: — Ai! CARALHO, MEU PÉ!

Laisla: — Desculpa, desculpa! Eu não vi!

Você se aproxima. Rauanny consegue ficar em pé, mas manca. Pode ter torcido o tornozelo. Ao mesmo tempo, Laisla tem a mão arranhada pela madeira, e a fechadura se solta parcialmente do batente.

Não é uma cena em que alguém recebe um ferimento e esquece dele no quadro seguinte. Qualquer machucado poderá tornar a escada mais perigosa. Você também precisa decidir como dividir a ajuda entre as duas amigas.

O mascarado interrompe os golpes por um instante, talvez ouvindo os gritos.`,[
C('Priorizar o tornozelo de Rauanny e improvisar uma faixa','h33a',[F('ferida_rauanny'),F('rauanny_atendida'),B('rauanny',4)]),
C('Ajudar Laisla a proteger a mão e reforçar a porta','h33b',[F('ferida_laisla'),F('porta_reforcada'),B('laisla',3)]),
C('Mandar ambas recuarem para a janela e abandonar a barricada','h33c',[F('ferida_rauanny'),F('porta_cedendo'),['trait','coragem',1]])]);
A('h33a','QUARTO · CUIDAR ANTES DE CORRER','20:28','house',`Você ajuda Rauanny a sentar na cama e enrola a faixa ao redor do tornozelo, sem apertar demais. Ela tenta esconder a dor, mas toda vez que movimenta o pé o rosto se contrai.

Rauanny: — Se você me falar pra ficar aqui e esperar, eu te mato.

Você: — Não vou deixar você pra trás. Mas você precisa aceitar ajuda.

Laisla observa de perto.

Laisla: — Eu vou atravessar junto. Se tiver que carregar, eu carrego.

Rauanny: — Você nem consegue carregar seu próprio ego.

Laisla ri apesar das lágrimas. O curativo reduz o risco de um movimento descontrolado, mas Rauanny continuará machucada. A porta bate de novo, lembrando que ainda não existe uma rota de fuga.`,[go('h34','Voltar à janela com Rauanny apoiada')]);
A('h33b','QUARTO · UMA DECISÃO PRÁTICA','20:28','house',`Você enrola tecido limpo na mão machucada de Laisla. Ela fecha os olhos por um instante, depois aponta para o móvel.

Laisla: — Segura aquele lado. Se a porta abrir agora, a gente não chega nem na janela.

Rauanny tenta ajudar, mas acaba apoiando mal o pé dolorido. Você percebe que ela está ferida mesmo que vocês não tenham tido tempo de cuidar dela direito.

Laisla: — Depois eu vejo isso. Primeiro a porta.

Você: — Não. Primeiro todo mundo vivo. A porta é só uma parte.

Rauanny encara vocês duas, respirando devagar. O grupo recupera alguns segundos de proteção, mas ainda precisará compensar as dificuldades de quem estiver ferido na travessia.`,[go('h34','Separar tecido para o tornozelo de Rauanny',[F('ferida_rauanny')])]);
A('h33c','QUARTO · ABANDONAR A BARREIRA','20:28','forest',`Você puxa Laisla e Rauanny na direção da janela antes que a cômoda tombe por completo.

Laisla: — E A PORTA?

Você: — Não vai segurar muito mais. Precisa ser agora.

Rauanny manca até a parede, apoiada no seu ombro. A decisão reduz o tempo que os três passam próximos da entrada, mas permite que o mascarado encontre a barricada sem ninguém sustentando o móvel.

O silêncio dura dois segundos. Depois o barulho de madeira cedendo ecoa pelo quarto inteiro.

Laisla: — Ele tá entrando.

Você segura a janela aberta. Lá fora, uma voz distante chama vocês. É Ryan. Ele está de volta, mas a passagem ainda não está pronta.`,[go('h34','Gritar para Ryan preparar a saída imediatamente',[F('ryan_urgencia')])]);

// ATO VI — Ryan é controlável. A escada depende das escolhas dele.
A('h34','BLOCO B · O LADO DE RYAN','20:30','town',`PONTO DE VISTA: RYAN.

Do sexto andar do outro bloco, Ryan enxerga a janela de Laisla aberta e três silhuetas tentando se proteger dentro do quarto. O técnico de manutenção largou uma escada extensível ao lado da área de serviço, mas o equipamento é grande e exige fixação em ambas as pontas.

Ryan: — SENHOR, EU PRECISO DA SUA AJUDA!

Técnico: — Eu já chamei a portaria! Não pode usar isso sem segurar dos dois lados!

Ryan: — EU SEI! TEM GENTE SENDO ATACADA DO OUTRO LADO!

O técnico hesita. Ryan olha a escada, o telefone e a porta do corredor. Ele pode chamar mais pessoas para segurar a estrutura, mas isso consome tempo. Também pode tentar posicionar a escada sozinho, o que aumenta o risco de ela deslizar.

Você decide por Ryan. O relacionamento com o protagonista poderá tornar seus pensamentos mais urgentes, mas não transforma a escada numa travessia segura por mágica.`,[
C('Convencer o técnico a ajudar e prender a base','h35safe',[F('escada_segura'),F('ryan_com_apoio'),B('ryan',3)]),
C('Arrastar a escada sozinho para ganhar segundos','h35fast',[F('escada_apressada'),F('ryan_exposto')]),
C('Ligar para a portaria e chamar mais um funcionário','h35help',[F('ryan_com_apoio'),F('chamou_socorro')])]);
A('h35safe','BLOCO B · DOIS PONTOS DE APOIO','20:33','town',`O técnico para de discutir quando vê um golpe atravessar a madeira da porta do quarto de Laisla, visível pela janela oposta.

Técnico: — Tá. Eu seguro daqui. Você leva a ponta até o parapeito e espera eles prenderem do outro lado. Não sobe antes disso.

Ryan obedece. A escada range enquanto é posicionada, mas a base fica apoiada numa estrutura de manutenção. O técnico prende uma cinta de segurança e pede que uma segunda pessoa se aproxime.

Ryan: — LAISLA! PRECISA SEGURAR A OUTRA PONTA! NÃO É PRA PULAR!

Laisla: — VOCÊ ACHA QUE EU TÔ PENSANDO EM PULAR, IDIOTA?!

Mesmo em pânico, as provocações dos dois sobrevivem. Ryan sente vontade de rir e chorar ao mesmo tempo. A passagem ainda será terrivelmente assustadora, mas está mais estável do que estaria sem ajuda.`,[go('h36','Voltar ao quarto pelo telefone')]);
A('h35fast','BLOCO B · PESO DEMAIS PARA UMA PESSOA','20:33','town',`Ryan puxa a escada sem esperar a autorização do técnico. Um dos pés bate na parede; ele quase perde o equilíbrio. Consegue erguer a primeira parte até o parapeito, mas a estrutura balança de modo inquietante.

Técnico: — MOLEQUE, ESPERA! ISSO PRECISA SER PRESO!

Ryan: — EU NÃO TENHO TEMPO!

Do outro lado, Laisla grita que a porta está cedendo. Ryan segura o ferro com as duas mãos. A distância entre as janelas parece tão pequena vista de longe. Segurando o metal sobre um vazio de seis andares, parece imensa.

Ele consegue apoiar a ponta na janela oposta, mas a base não está completamente estabilizada. Todo mundo que atravessar terá que lidar com essa escolha feita antes da fuga.`,[go('h36','Avisar que a escada está no lugar, mas instável',[F('escada_solto')])]);
A('h35help','BLOCO B · PEDIR AJUDA EM VEZ DE IMPROVISAR','20:33','town',`Ryan fala rápido ao telefone enquanto o técnico tenta trazer a escada.

Ryan: — A gente precisa de mais uma pessoa segurando aqui. Agora. Liga pra polícia de novo. Sexto andar, dois blocos, janela de frente.

Uma funcionária aparece na escada de serviço poucos instantes depois. Ela não sabe o que aconteceu, mas vê a urgência no rosto do técnico e começa a ajudar sem questionar.

Técnico: — Prende ali. Mais alto. Isso.

A passagem fica sustentada de forma razoável, mas o atraso permitiu que o mascarado chegasse mais perto do quarto. Ryan sente que trocou segundos por estabilidade, sem saber se fez o cálculo certo.

Ele grita para Laisla esperar que os dois extremos estejam posicionados. Não há garantia de que o inimigo fará o mesmo.`,[go('h36','Avisar os amigos de que a escada está pronta',[F('escada_segura')])]);
A('h36','QUARTO · A ESCADA ENTRE OS BLOCOS','20:35','forest',`De volta ao quarto, você vê uma estrutura metálica surgir lentamente na janela. Ryan está do outro lado, com o rosto pálido, e grita instruções sobre onde apoiar a extremidade.

Laisla: — Uma escada? RYAN, VOCÊ TÁ MALUCO?!

Ryan: — VOCÊ TEM ALGO MELHOR?!

Rauanny se aproxima mancando. Lá embaixo, a luz da portaria parece distante demais. O mascarado golpeia a porta. A cômoda salta alguns centímetros e quase libera a maçaneta.

Você ajuda a encaixar a ponta da escada no apoio lateral. A passagem é estreita, descoberta, exposta ao vento. Não dá para caminhar em pé: será necessário avançar com o corpo baixo, mão após mão, enquanto alguém segura a estrutura.

Laisla fica imóvel ao olhar para baixo.

Laisla: — Eu não consigo respirar.

Você: — Olha pra mim. Um movimento de cada vez. Não precisa pensar no fim da escada ainda.

Rauanny segura a amiga pela cintura. Ryan continua falando do outro lado para que ninguém se sinta sozinho.

A decisão sobre a ordem da fuga está chegando, mas há algo que você pode preparar antes.`,[
C('Prender melhor a ponta da escada antes de iniciar','h37a',[F('ponto_ancoragem'),F('escada_ancorada')]),
C('Organizar quem irá segurar a estrutura enquanto outros passam','h37b',[F('ajuda_escada'),B('ryan',2)]),
C('Chamar os amigos da rota de serviço e orientar que não venham ao quarto','h37c',[F('contato_b'),B('isabella',1)])]);
A('h37a','JANELA · O APOIO DE FERRO','20:37','forest',`Você ajusta a ponta da escada contra a peça metálica na janela. Laisla ajuda a puxá-la para dentro o suficiente para impedir que deslize com o primeiro movimento. O ferro vibra, mas não sai do lugar.

Ryan: — SEGURA AÍ! O TÉCNICO TÁ COM A OUTRA PONTA!

Rauanny: — E se esse negócio quebrar?

Você: — A gente só coloca uma pessoa por vez. E ninguém tenta correr lá em cima.

Ela não gosta da resposta porque não é uma garantia absoluta. Laisla, por outro lado, parece recuperar algum controle ao receber uma tarefa concreta.

A cada batida na porta, a escada treme levemente. Agora a estrutura está melhor preparada, mas vocês não poderão continuar ajustando indefinidamente.`,[go('h38','Decidir como atravessar')]);
A('h37b','JANELA · REVEZAR A FORÇA','20:37','forest',`Você pede que Laisla e Rauanny alternem a sustentação da escada. Quem estiver mais machucado não poderá segurar o peso por muito tempo. Do outro lado, Ryan mantém uma mão na estrutura e a outra no parapeito.

Ryan: — NÃO OLHEM PRA BAIXO! OLHEM PRA MIM!

Laisla: — VOCÊ TÁ LINDO, MAS ISSO NÃO AJUDA!

Ryan: — ENTÃO OLHA PRO MEU ROSTO E ME XINGA DEPOIS!

A troca arranca uma risada nervosa de Rauanny. Por um segundo, lembra o jantar de meia hora atrás. Só que a porta do quarto acaba de perder outro pedaço de madeira.

Você organiza as tarefas: uma pessoa atravessa, outra sustenta a ponta interna e quem chegar ao Bloco B ajuda Ryan a receber a próxima. A lógica funciona enquanto o mascarado não encostar na escada.`,[go('h38','Iniciar a travessia com apoio')]);
A('h37c','JANELA · MENSAGEM PARA A OUTRA ROTA','20:37','phone',`Você manda uma mensagem para Isabella e Rayssa: “Estamos atravessando pela janela pro Bloco B. Se estiverem na escada de serviço, NÃO VOLTEM AO QUARTO. Chamem ajuda de onde estão.”

A resposta vem curta, mas chega. Isso significa que alguém do outro núcleo ainda consegue usar o telefone.

Laisla: — Elas estão vivas?

Você: — Pelo menos uma delas respondeu. Tão tentando a saída de serviço.

Rauanny aperta o ombro de Laisla. Não há tempo de fazer perguntas longas, mas a notícia evita que alguém volte pelo corredor por acreditar que Isabella foi abandonada.

O mascarado se choca contra a porta novamente. A cômoda sai do lugar com um estalo alto.

Você olha para a escada e entende que chegou a hora.`,[go('h38','Mandar o primeiro sobrevivente atravessar',[F('avisou_servico')])]);

// ATO VII — Cada pessoa atravessa separadamente, numa ordem definida pelo jogador.
// As opções abaixo são reconstruídas ao abrir a tela. Os IDs são estáveis para os saves.
A('h38','JANELA · O VÃO ENTRE OS PRÉDIOS','20:39','forest',`A escada está pronta. Escolha quem atravessa primeiro entre as pessoas que chegaram à janela.`,[]);
A('h38_attempt','ESCADA · PRIMEIRO MOVIMENTO','20:40','forest',`Cada travessia traz um novo risco.`,[]);
A('h38_danger','ESCADA · O VENTO MUDA','20:41','forest',`A escada oscila perigosamente.`,[]);
A('h38_ok','BLOCO B · MAIS UMA PESSOA A SALVO','20:42','town',`O sobrevivente alcança a janela do Bloco B.`,[]);
A('h38_fall','ENTRE OS BLOCOS · UM INSTANTE DECISIVO','20:42','forest',`O perigo se torna real.`,[]);
A('h38_done','BLOCO B · A JANELA FECHA','20:52','town',`Os sobreviventes chegaram ao outro lado.`,[]);

A('h39','BLOCO B · NÃO OLHEM PARA TRÁS','20:55','forest',`Ryan fecha a janela com as mãos trêmulas. A escada ainda está do lado de fora, entre os dois edifícios, mas ninguém deveria precisar usá-la novamente. Do outro lado, o mascarado surge na janela de Laisla, observa o vão e não tenta atravessar imediatamente.

Ryan: — A gente conseguiu. A gente... conseguiu.

Laisla se encosta na parede. Rauanny aperta o antebraço e tenta recuperar o fôlego. O alívio não chega inteiro. Ainda faltam rostos naquela sala. O som que domina o apartamento não é de vitória: é de gente tentando entender quem conseguiu passar e quem ficou para trás.

Do corredor vem a voz do técnico de manutenção chamando a polícia. Ele pergunta se todos os presentes já cruzaram. Ryan olha para a escada e para o telefone. Ainda falta confirmar o destino de quem tentou sair pela cozinha.

Um novo ruído ecoa do outro lado: metal arrastado na janela onde o mascarado está parado. Ryan percebe que a estrutura pode ser solta a qualquer momento.`,[
C('Recuar com Ryan e impedir que alguém volte pela escada','h40safe',[F('ryan_recuou'),B('ryan',4)]),
C('Pedir que Ryan permaneça na janela enquanto verifica o outro núcleo','h40observe',[F('ryan_exposto')]),
C('Deixar Ryan tentar recuperar a escada, apesar do risco','h40risk',[F('ryan_exposto'),F('ryan_voltou')])]);
A('h40safe','BLOCO B · UMA DECISÃO DIFÍCIL','20:57','town',`Você segura o ombro de Ryan quando ele se aproxima outra vez da janela.

Você: — Não. Você já trouxe quem estava do outro lado. Se alguém ainda estiver preso na cozinha, a polícia e o zelador estão vindo pela escada de serviço.

Ryan: — E se não chegarem a tempo?

Você: — Então vamos orientar pelo telefone. Voltar agora pode deixar mais uma pessoa lá.

Ele respira fundo e finalmente se afasta. O técnico tranca o acesso à varanda para que ninguém tente improvisar outra travessia. Ryan passa as mãos pelo rosto e senta no chão sem se importar com quem está vendo.

Ryan: — Eu juro que achei que ia ver alguém cair. Toda vez que essa escada mexia, parecia que meu coração parava.

Você fica ao lado dele até conseguir uma resposta da portaria. Em nenhum momento ele finge que foi corajoso o tempo inteiro.`,[go('h41','Conferir notícias do outro núcleo')]);
A('h40observe','BLOCO B · O RISCO DE FICAR','20:57','forest',`Ryan se mantém perto da janela, observando o corredor oposto. Você liga para a portaria enquanto Laisla pede para que ele recue alguns passos.

Ryan: — Eu só quero ver se alguém ainda aparece lá. A Isabella tava na cozinha, não tava?

Você: — Tava. A gente não sabe qual caminho elas conseguiram usar.

A máscara desaparece da janela de Laisla. Isso é pior do que ter o inimigo à vista: significa que ele voltou a se mover pelo apartamento. O ferro da escada range com o vento.

Ryan apoia uma mão no parapeito. Se o aparelho se deslocar, ele estará perto demais da estrutura. Uma rajada faz a ponta da escada bater contra a fachada. Ryan não afasta a mão do parapeito.`,[
C('Chamar Ryan imediatamente para dentro e esperar a polícia','h41',[F('ryan_recuou')]),
C('Pedir que Ryan tente alcançar a ponta da escada para soltá-la','h40risk',[F('ryan_voltou')])]);
A('h40risk','BLOCO B · A ESCADA NÃO É UMA PONTE SEGURA','20:58','forest',`Ryan se inclina na direção da escada, tentando alcançar a cinta presa à parte externa da janela. A distância é pequena, mas suficiente para que precise apoiar parte do corpo para fora.

Técnico: — SAI DAÍ! DEIXA QUE A GENTE RESOLVE ISSO DEPOIS!

Do bloco oposto, o mascarado mexe na ponta da estrutura. O ferro vibra de um lado para o outro. Ryan perde a firmeza por um instante e se segura na moldura da janela.

Ryan: — NÃO CONSIGO VOLTAR!

Você e o técnico se aproximam ao mesmo tempo. Ryan grita seu nome. O apoio se desloca outra vez e ele tenta alcançar a moldura com a ponta dos dedos.

A estrutura bate contra a alvenaria e Ryan prende a respiração, tentando segurar o próprio peso.`,[
C('Segurar Ryan pelo braço e puxá-lo imediatamente','h40pull',[B('ryan',4)]),
C('Pedir que o técnico estabilize antes de puxá-lo','h40wait',[F('ryan_em_risco')]),
C('Mandar Ryan se soltar da escada e apoiar os pés na parede','h40last',[F('ryan_em_risco')])]);
A('h40pull','BLOCO B · DOIS PASSOS PARA DENTRO','20:59','forest',`Você agarra o antebraço de Ryan com as duas mãos. O técnico segura sua cintura para impedir que os dois percam o equilíbrio. Por um segundo, a corrente da escada estala do lado oposto.

Ryan: — ME PUXA, CARALHO!

Você puxa. Ele bate o ombro na borda da janela e cai para dentro do apartamento, levando você junto. Os dois ficam no chão, sem conseguir respirar direito.

Ryan dá uma risada curta, de puro nervoso.

Ryan: — Tá. Essa foi a coisa mais idiota que eu já fiz.

Você: — Você já fez várias coisas idiotas. Essa só tentou te matar.

Ele segura sua mão antes que você se levante. O técnico fecha a janela e avisa que ninguém vai tocar naquela escada até a polícia chegar.`,[go('h41','Acompanhar o grupo para um lugar seguro',[F('ferido_ryan')])]);
A('h40wait','BLOCO B · O SEGUNDO QUE NÃO VOLTA','20:59','forest',`O técnico procura o suporte interno para estabilizar a escada. Ryan tenta aguentar, mas os braços começam a falhar. Do outro lado, um movimento do mascarado faz o ferro chacoalhar de novo.

Técnico: — AGORA! VAI TER QUE PUXAR AGORA!

Você se aproxima. Ryan tenta apoiar o pé na borda, mas a sola escorrega. A ponta do metal salta contra a parede. Ryan perde um dos apoios, fica pendurado pelo antebraço e começa a gritar por ajuda.

Laisla grita seu nome do corredor. Rauanny tenta se levantar para ajudar, mesmo que esteja ferida. Ryan tenta agarrar a borda; as unhas raspam o parapeito. Sua voz falha quando a escada desce mais alguns centímetros.`,[go('h40ryanResult','Agarrar Ryan antes que o apoio se solte')]);
A('h40last','BLOCO B · UMA INSTRUÇÃO IMPERFEITA','20:59','forest',`Ryan tenta mudar a posição do corpo para alcançar o parapeito. O movimento reduz a pressão num braço, mas deixa o outro sem apoio.

Ryan: — EU TÔ TENTANDO!

Você percebe que não pode simplesmente gritar instruções de longe. O técnico se aproxima, estende o braço e tenta agarrar Ryan pela roupa. Do outro lado, a máscara se afasta da janela, como se estivesse aguardando o resultado.

O técnico segura a manga de Ryan e solta um grito quando sente o tecido escorregar. A escada raspa os tijolos, soltando poeira sobre o pátio.`,[go('h40ryanResult','Tentar puxar Ryan para dentro')]);
A('h40ryanResult','BLOCO B · RESULTADO DO RESGATE','21:00','forest',`Ryan perde o apoio de um pé. O técnico avança até o parapeito, e você ergue as mãos para alcançá-lo.`,[]);

// ATO VIII — A saída da lavanderia, a polícia e o luto. Nada corta para o final de repente.
A('h41','CORREDOR DE SERVIÇO · RESPOSTAS INCOMPLETAS','21:03','house',`A portaria finalmente informa que um funcionário conseguiu chegar à grade de manutenção. As pessoas que permaneceram na lavanderia podem sair por aquela rota, sem precisar retornar ao quarto. Um policial já está subindo pelas escadas principais.

Você recebe uma mensagem curta de Breno: “Estamos a caminho. Vi viaturas entrando no condomínio. Você tá bem?”

Sua mão treme ao responder. O telefone parece pesado demais para carregar todos os nomes que você precisa conferir.

Você: — Cadê a Isabella? Cadê a Rayssa? E o Allan?

Ninguém tem a lista completa de quem está vivo. Você explica o que sabe, sem inventar certezas. O lugar de Ryan entre vocês ainda parece estranho depois da travessia. Os sobreviventes pedem notícias de quem ficou no Bloco A. Cada um fala num tom diferente de urgência.

A porta do apartamento se abre para um policial e uma funcionária do condomínio. Eles pedem que todo mundo se afaste das janelas. Pela primeira vez, chegam pessoas que não estão armadas de medo ou de facas.`,[
C('Pedir que confirmem imediatamente a situação na lavanderia','h42a',[F('priorizou_resgate'),['trait','empatia',1]]),
C('Avisar sobre o mascarado ainda no Bloco A','h42b',[['clue','policia_alertada_c6'],['trait','cautela',1]]),
C('Ligar para Breno antes de falar mais com a polícia','h42c',[B('breno',3),F('avisou_breno')])]);
A('h42a','CORREDOR · UMA LISTA DE NOMES','21:07','house',`Você entrega ao policial os nomes de todas as pessoas que estavam no apartamento, começando por quem ficou na lavanderia. Ele anota com pressa, mas escuta.

Policial: — Temos uma equipe em contato com a portaria de serviço. Preciso que você me diga em qual cômodo cada pessoa estava por último.

Você descreve a cozinha, a lavanderia e o quarto. Laisla corrige o número da porta do corredor de manutenção. Mesmo tremendo, ela conhece aquele prédio melhor que qualquer policial.

Uma chamada no rádio confirma que uma pessoa foi retirada pelo lado de serviço. A frase não revela imediatamente quem. O rosto de Rayssa aparece na sua memória, depois o de Isabella, depois o de Allan.

O policial pede que você espere num apartamento do Bloco B até que a equipe consiga conferir todos. Você obedece, embora esperar pareça mais difícil do que correr.`,[go('h43','Aguardar a confirmação da equipe de resgate')]);
A('h42b','CORREDOR · O QUE A POLÍCIA PRECISA SABER','21:07','house',`Você explica que o mascarado permaneceu no sexto andar do Bloco A enquanto as pessoas fugiam pela escada entre as janelas. Um policial pergunta se viu arma de fogo. Você responde que não: o que viu foi uma lâmina e uma máscara clara.

Policial: — Alguém reconheceu a voz? Altura? Roupa?

Você: — A voz no telefone era distorcida. A máscara... não mostrava nada do rosto.

Ele anota. Pela janela, vê-se um grupo de funcionários afastando curiosos do pátio. As sirenes continuam ligadas, embora ninguém esteja mais correndo entre os prédios.

Você descreve a fotografia enviada durante o jantar. O policial parece mais interessado quando percebe que foi tirada dentro do apartamento. É a primeira vez que uma prova está diretamente ligada ao lugar do ataque.`,[go('h43','Esperar informações sobre os desaparecidos')]);
A('h42c','CORREDOR · A VOZ DE BRENO','21:07','phone',`Breno atende no primeiro toque.

Breno: — {nome}? Pelo amor de Deus, fala comigo. A rua tá cheia de viatura e ninguém me deixa subir.

Você tenta responder com uma frase normal, mas a voz sai quebrada.

Você: — A gente saiu pela janela. O Ryan conseguiu uma escada. Tinha alguém dentro da casa da Laisla. A polícia tá aqui.

Breno: — Você tá machucado?

Você: — Não sei. Eu ainda tô contando quem chegou.

O silêncio do outro lado dura poucos segundos.

Breno: — Tá. Então me escuta: eu tô com o Samuel. A gente vai esperar na portaria até alguém liberar. Não vou te deixar passar por isso sozinho.

Você pede que ele não tente entrar escondido. Ele promete. Pela primeira vez naquela noite, você acredita numa promessa pequena o suficiente para ser cumprida.`,[go('h43','Voltar ao grupo e aguardar a equipe')]);
A('h43','BLOCO B · SALA EMPRESTADA','21:18','house',`Uma moradora abre o apartamento para que vocês se sentem enquanto os policiais trabalham. Ela traz água, cobertores e uma caixa de lenços. Ninguém sabe se deve agradecer ou pedir desculpa por sujar o tapete com os sapatos molhados.

Laisla tenta contar quantos amigos estavam no jantar. Pára no meio. Volta a contar. Rauanny segura sua mão e faz a contagem com ela, nome por nome.

Rayssa aparece na porta acompanhada por uma funcionária — ou, dependendo do caminho, chega sozinha e desesperada, procurando Isabella. Sua expressão não é uma pista óbvia de culpa; é o rosto de alguém que participou de uma situação horrível e não consegue desfazer o que aconteceu.

Um policial pede silêncio para informar quem foi encontrado e quem ainda recebe atendimento. Laisla ergue o rosto, temendo ouvir nomes que conhece. O grupo não recebe a resposta inteira num corte brusco: vocês precisam ouvir cada informação e reagir a ela.`,[
C('Pedir a lista de feridos e sobreviventes com calma','h44a',[F('pediu_respostas')]),
C('Ficar ao lado de Laisla enquanto ela espera','h44b',[B('laisla',3)],[['flag','c6_morto_laisla',false]]),
C('Procurar Isabella e Rayssa para conversar com elas','h44c',[B('rayssa',2)])]);
A('h44a','BLOCO B · O NOME DE CADA UM','21:23','house',`O policial lê os nomes enquanto você acompanha em silêncio. Um a um, vocês confirmam que alguns amigos já estão fora do prédio, outros recebem atendimento e outros podem ter se perdido durante a confusão.

Você pede que não se refiram a ninguém apenas como “vítima” ou “uma jovem”. Há nomes, relações, histórias e pessoas esperando do outro lado de um telefonema.

Policial: — A equipe médica vai falar com vocês assim que puder. Ainda estamos isolando o apartamento de origem do ataque.

Você: — E a pessoa da máscara?

Policial: — Ainda não temos confirmação de captura.

A resposta faz a sala inteira ficar imóvel. O perigo imediato pode ter passado, mas alguém fugiu do mesmo prédio em que vocês quase morreram. O policial percebe o medo e promete não deixar ninguém sozinho no corredor.`,[go('h45','Escutar as reações dos amigos')]);
A('h44b','BLOCO B · LAISLA TENTA SE EXPLICAR','21:23','house',`Laisla olha para o próprio avental rasgado e começa a rir de nervoso.

Laisla: — Eu convidei todo mundo pra jantar. Falei que ia ser uma noite normal. Falei que aqui era seguro.

Você: — Você não chamou o mascarado.

Laisla: — Eu sei. Mas foi na minha casa. Foi tudo na minha frente e eu não consegui... eu nem consegui achar minhas chaves.

Rauanny segura a mão de Laisla. As duas permanecem caladas por um longo momento.

Você diz que ninguém precisava ter um plano perfeito para uma invasão. Laisla responde que gostaria de acreditar nisso. Não resolve o sentimento de culpa na hora, mas a faz parar de se acusar por um instante.

Do corredor, o policial finalmente chama vocês para explicar quem foi encontrado.`,[go('h45','Acompanhar a notícia com Laisla',[B('laisla',3)])]);
A('h44c','BLOCO B · RAYSSA E O TELEFONE','21:23','house',`Rayssa tenta pegar um copo d'água e não consegue impedir que a mão trema. Ela pergunta por Isabella antes de aceitar sentar.

Rayssa: — Eu devia ter feito alguma coisa diferente.

Você: — Todo mundo tá se perguntando isso.

Rayssa: — É. Mas você não sabe todas as coisas que eu tô pensando.

Ela percebe a frase e fecha os olhos.

Rayssa: — Desculpa. Eu só tô muito cansada.

Você oferece espaço sem obrigá-la a falar. Por trás da porta, ouve-se um funcionário conversando com a polícia sobre a grade da lavanderia. Rayssa se levanta num impulso, querendo ir atrás de informações.

Você pede que espere mais alguns segundos, até a equipe concluir a conferência. Ela concorda com dificuldade. A amizade entre vocês existe, mesmo que algumas verdades ainda estejam escondidas dela — e de você.`,[go('h45','Pedir que a polícia confirme o estado de Isabella')]);
A('h45','BLOCO B · A VERDADE SOBRE A NOITE','21:29','house',`A equipe de resgate confirma os nomes que conseguiu localizar. A notícia chega aos poucos: primeiro quem saiu pelo corredor de serviço, depois quem atravessou pela escada, por fim quem foi encontrado no apartamento.

Se houve uma morte, ela não se torna apenas um número no diário. Os amigos precisam ouvir, compreender, discordar, pedir que repitam. Quem perdeu sua melhor amizade reage de forma diferente de quem apenas conhecia a pessoa no grupo.

O policial avisa que os feridos precisam passar por avaliação médica. Pessoas que conseguiram chegar andando também podem ter se machucado no susto.

Laisla: — Eu só queria que hoje fosse normal.

Breno aparece na porta, finalmente liberado pela portaria. Samuel vem atrás, pálido, procurando Allan com os olhos antes mesmo de dizer boa noite.

Você sabe que a conversa seguinte será difícil. Não pretende fugir dela.`,[
C('Contar a Breno o que aconteceu, sem omitir os nomes','h46a',[B('breno',3)]),
C('Perguntar a Samuel como ele está antes de falar sobre Allan','h46b',[B('samuel',3)]),
C('Dar espaço aos amigos que precisam chorar','h46c',[['trait','empatia',1]])]);
A('h46a','BLOCO B · UM ABRAÇO DE BRENO','21:34','house',`Breno se aproxima devagar, como se estivesse com medo de encostar e descobrir que você está ferido. Quando você abre os braços, ele não hesita.

Breno: — Me desculpa. Eu devia ter ficado.

Você: — Você tava procurando o Samuel. Não tinha como adivinhar.

Breno: — Eu sei. Só que pensar nisso é diferente de aceitar.

Você conta desde a fotografia até a escada, incluindo os momentos em que não soube qual decisão tomar. Breno escuta sem interromper, depois pede que você se sente.

Breno: — A gente vai precisar conversar com a polícia sobre muita coisa. Eu não sei se estamos prontos. Mas não quero que você passe mais uma noite tentando lembrar tudo sozinho.

Você promete contar o que souber sem inventar. O abraço demora mais do que qualquer frase.`,[go('h47','Acompanhar as próximas notícias')]);
A('h46b','BLOCO B · SAMUEL NA PORTA','21:34','house',`Samuel mal olha para você. Os olhos dele percorrem a sala, a janela, o corredor, como se procurassem uma pessoa específica.

Samuel: — O Allan tá aqui?

Você respira antes de responder. Se Allan já morreu no capítulo 4, Samuel faz a pergunta por impulso e percebe o próprio erro, levando as mãos ao rosto. Se Allan esteve presente no ataque desta noite, a resposta depende do que realmente aconteceu na cozinha.

Samuel: — Eu fico repetindo que vou cuidar de todo mundo e aí sempre tem alguém que... sempre tem alguém que some.

Você segura o ombro dele.

Você: — Não precisa prometer salvar todo mundo. Precisa ficar aqui e ouvir o que aconteceu.

Samuel assente. Ele se senta, e pela primeira vez não tenta preencher o silêncio com uma discussão sobre culpa. Espera os nomes serem confirmados.`,[go('h47','Ficar perto de Samuel até ele conseguir falar')]);
A('h46c','BLOCO B · NINGUÉM PRECISA SER FORTE AGORA','21:34','house',`Você fica um pouco atrás enquanto Laisla tenta conversar com a equipe médica. Breno entrega água a quem precisa. Samuel se senta perto da porta, as mãos cobrindo o rosto.

Rayssa anda de um lado para outro. As notícias sobre Isabella chegam e mudam o modo como Rayssa consegue respirar. Os sobreviventes se apoiam; quem perdeu alguém permanece em silêncio ou chora, sem precisar representar força.

Você não interrompe o sofrimento com frases prontas. Pergunta quem precisa de ajuda para ligar para casa, quem quer ficar acompanhado, quem prefere silêncio.

O tempo passa devagar. Quando o grupo está pronto para conversar, você finalmente pergunta o que a polícia sabe sobre o mascarado. A resposta é frustrante: ele não foi encontrado.`,[go('h47','Voltar à investigação quando houver espaço')]);
A('h47','LAKEWOOD · AMBULÂNCIAS NA PORTARIA','22:02','town',`Lá fora, ambulâncias e viaturas iluminam as árvores do condomínio. O técnico de manutenção conversa com um policial, apontando para o alto dos dois blocos. A escada continua presa entre as janelas, isolada como prova da fuga.

Bella Gomes está do outro lado da fita de segurança. Viu as notícias da movimentação no condomínio e reconheceu alguns nomes. Ela corre até o portão assim que percebe vocês.

Bella: — Eu soube que tiveram um ataque. Vocês estão bem? Meu Deus, eu vi a foto do prédio nas redes sociais.

Você lembra da conversa na praça poucas horas antes. Bella olha para Laisla, depois para o uniforme dos policiais. Não há satisfação em seu rosto. Ela continua procurando a irmã e, agora, vê outras famílias correndo risco de perder alguém.

Bella: — Eu não quero atrapalhar. Só... se tiver alguma coisa que eu possa fazer, me fala.

Do outro lado do pátio, Moisés aparece perto de um carro estacionado, mas não se aproxima. Quando nota Bella, parece considerar dar meia-volta.`,[
C('Agradecer a Bella e aceitar seu número para manter contato','h48a',[['clue','bella_apoio_c6'],F('bella_confiou')]),
C('Perguntar a Bella sobre o portão da propriedade, sem acusá-la','h48b',[['clue','bella_trilha_c6']]),
C('Observar a atitude de Moisés e registrar que ele estava ali','h48c',[['clue','moises_apos_ataque_c6']])]);
A('h48a','PORTARIA · BELLA NÃO DESISTIU','22:11','town',`Bella entrega um papel dobrado com o número dela e pede que avisem se a polícia precisar da fotografia da festa.

Bella: — Eu tenho medo de ser invasiva. Mas passei tanto tempo correndo atrás de qualquer pista que agora parece impossível ir embora quando alguém tá sofrendo.

Você: — A gente sabe que você quer respostas. Hoje, pelo menos, ninguém precisa inventar uma explicação pra te acalmar.

Bella: — Obrigada.

Ela olha para o prédio mais uma vez. Depois se afasta, respeitando o espaço dos feridos. O gesto não resolve nenhuma pergunta, mas marca o começo de uma relação diferente: Bella deixa de ser apenas o sobrenome numa notícia de desaparecimento.`,[go('h49','Voltar aos sobreviventes')]);
A('h48b','PORTARIA · A ÚLTIMA VEZ QUE BELLA VIU JULLIA','22:11','town',`Bella pensa alguns segundos antes de responder.

Bella: — Eu disse à polícia onde entrei na mata. Tinha uma cerca baixa, perto da trilha de serviço. Não vi nenhuma van, nem ouvi acidente. Só ouvi Jullia me chamar uma vez, ou achei que ouvi. Estava escuro e eu tava chorando também.

Você não completa as lacunas por ela. Não fala do saco ou do lago. Faz apenas uma pergunta que cabe no relato dela.

Você: — Você encontrou alguém no caminho de volta?

Bella: — Não. E foi isso que me deixou maluca. Eu procurei minha irmã e voltei sozinha.

A resposta pode explicar a figura mencionada por Samuel, mas continua deixando o mascarado sem identidade. Bella percebe sua concentração e pede que, se alguma lembrança fizer sentido, você avise.`,[go('h49','Guardar o depoimento sem transformar hipótese em certeza')]);
A('h48c','PORTARIA · MOISÉS DO OUTRO LADO','22:11','town',`Moisés se mantém perto do carro. Quando você se aproxima, ele observa as ambulâncias e pergunta se todos estão vivos, mas não espera a resposta inteira.

Você: — Por que você veio?

Moisés: — Ouvi o endereço no rádio. Achei que... talvez precisassem de ajuda.

Você: — Você sabia que a gente tava aqui?

Moisés: — Lakewood não é grande. Quando tem viatura em condomínio, todo mundo fica sabendo.

Ele passa a mão pelo rosto, claramente nervoso. Bella o chama do outro lado da portaria e ele enrijece.

Bella: — MOISÉS! VOCÊ ME DEVE UMA CONVERSA!

Moisés desvia o olhar. Diz que vai falar com ela no dia seguinte, quando as coisas estiverem mais calmas. Você não sabe se ele está com medo do assassino, de Bella ou de algo que não consegue dizer. Antes de ir, murmura:

Moisés: — Se alguém te pedir pra confiar numa pessoa só porque parece arrependida... pensa duas vezes.

Ele entra no carro e parte.`,[go('h49','Registrar a frase enigmática',[['clue','moises_alerta_c6']])]);
A('h49','CAMINHO DE VOLTA · UMA NOITE QUE NÃO ACABA','23:01','road',`O grupo não volta a se reunir automaticamente no mesmo lugar. Alguns seguem para o hospital, outros ficam com a polícia, outros precisam ligar para as famílias. Você se despede de cada sobrevivente que consegue encontrar, evitando prometer que tudo ficará bem amanhã.

Breno oferece uma carona. Samuel permanece na portaria até receber notícias definitivas dos amigos. Bella volta para casa levando mais perguntas. Moisés desaparece pelas ruas escuras.

Seu telefone ainda contém a fotografia tirada de dentro do apartamento. A imagem captura uma noite em que todos riam. Antes do mascarado, antes dos gritos, antes da escada, todos estavam apenas jantando.

Você percorre os nomes no grupo de mensagens. Alguns já responderam. Outros nunca mais responderão nesta linha do tempo.

Através da janela do carro, Lakewood parece quieta demais. Você entende que a madrugada não terminou para ninguém que esteve naquele apartamento.`,[
C('Enviar uma mensagem individual aos amigos que sobreviveram','h50a',[F('mensagem_sobreviventes'),['trait','empatia',1]]),
C('Salvar a fotografia e os horários em uma pasta de provas','h50b',[['clue','cronologia_ataque_c6'],['trait','cautela',1]]),
C('Pedir a Breno para passar a noite acompanhando você','h50c',[B('breno',4)])]);
A('h50a','NOITE · MENSAGENS QUE IMPORTAM','23:24','phone',`Você escreve mensagens curtas, uma para cada pessoa que conseguiu voltar: “Chegou em casa?”, “Já foi atendido?”, “Se quiser conversar, me chama”. Não pressiona quem não responde imediatamente.

A primeira resposta é de Laisla, perguntando por Rauanny. Depois Ryan manda uma mensagem cheia de erros de digitação, provavelmente escrita com uma das mãos ainda tremendo. Breno pede que você coloque o telefone de lado por cinco minutos e respire.

Se você perdeu alguém, a ausência do nome no grupo dói de um jeito difícil de explicar. Há conversas antigas que continuam abertas, fotos compartilhadas e áudios engraçados que agora parecem vir de um lugar impossível.

Você deixa o telefone sobre o colo e olha a rua. Fazer uma coisa pequena por alguém vivo não apaga o que aconteceu. Ainda assim, é alguma coisa.`,[go('h51','Chegar em casa e tentar descansar')]);
A('h50b','NOITE · CRONOLOGIA DO ATAQUE','23:24','phone',`Você organiza horários: a primeira mensagem, o som no quarto, a ligação distorcida, a separação dos núcleos, a primeira chamada para Ryan, a chegada da polícia. Alguns minutos não batem com as lembranças; você anota as dúvidas em vez de inventar números.

A imagem enviada durante o jantar é a peça mais perturbadora. A pessoa precisou estar dentro do apartamento, ou ter recebido aquela fotografia de alguém que esteve. Isso não diz quem é o mascarado, mas prova acesso à intimidade do grupo.

Você também anota o nome de Bella Gomes e o depoimento sobre a trilha. A figura da mata talvez fosse ela, mas o caso não termina nessa hipótese.

Quando fecha a pasta digital, percebe que está tremendo. Uma boa cronologia pode ajudar amanhã. Hoje, ela não oferece descanso.`,[go('h51','Guardar a pasta e voltar para casa')]);
A('h50c','CARRO DE BRENO · NÃO FICAR SOZINHO','23:24','road',`Breno não faz perguntas sobre por que você quer companhia. Apenas concorda, vira o carro para uma rua mais iluminada e abaixa o volume do rádio.

Breno: — Eu posso ficar no sofá. Ou a gente pode conversar até amanhecer. Não precisa decidir agora.

Você: — Eu não quero fechar os olhos e ver aquela escada de novo.

Breno: — Então não precisa fechar agora.

Vocês passam pela padaria onde encontraram Bella de tarde. A mesma placa está acesa, o mesmo ônibus dobra a esquina. A cidade segue repetindo gestos normais enquanto sua memória tenta entender como algumas horas puderam mudar tudo.

Breno diminui a velocidade ao passar na esquina. Por alguns minutos, vocês não precisam encontrar palavras.`,[go('h51','Aceitar a companhia e chegar em casa')]);
A('h51','LAKEWOOD · ÚLTIMA NOTIFICAÇÃO','23:57','phone',`O apartamento está escuro. Você coloca o telefone para carregar e tenta não voltar às imagens da travessia. As sirenes ainda parecem ecoar na sua cabeça.

No mesmo instante, chega uma mensagem de um número que não está salvo. Não há fotografia, nem voz, nem máscara. Apenas uma frase:

“VOCÊS SEMPRE ACHAM QUE BASTA ATRAVESSAR PARA O OUTRO LADO.”

Uma segunda mensagem aparece antes que você consiga responder:

“PERGUNTE AOS SOBREVIVENTES O QUE VIRAM NA JANELA.”

Você encara a tela até a luz diminuir. Um número desconhecido sabe da escada, mas isso pode significar várias coisas: alguém observou o resgate, alguém está acompanhando as notícias ou quem atacou continua perto. Nenhuma dessas hipóteses traz conforto.

Você não apaga as mensagens. Guarda-as junto das provas, manda uma cópia para Breno e deixa o telefone sobre a mesa.

Amanhã, Lakewood vai acordar com novas perguntas. Nesta noite, você ainda consegue ouvir Laisla pedindo que Ryan não deixe a escada cair.`,[
C('Registrar o novo recado e encerrar o capítulo','fim10',[['clue','ameaca_janela_c6'],F('cap6_concluido')])]);
A('fim10','LAKEWOOD · FIM DO CAPÍTULO','00:08','lake',`FIM DO CAPÍTULO 6 — O SILÊNCIO TEM TESTEMUNHAS.

Bella Gomes entrou na investigação. Um jantar que parecia seguro foi interrompido por um ataque calculado dentro do apartamento de Laisla. Os amigos se dividiram, você controlou outras perspectivas e cada decisão ajudou a definir quem conseguiu escapar, quem se feriu e quem morreu.

As escolhas desta noite ficam registradas no seu salvamento. Nos próximos capítulos, os sobreviventes carregarão os efeitos das perdas, dos ferimentos e dos resgates.

O mascarado continua solto. Moisés parece esconder uma informação importante. E a pessoa que enviou a última mensagem sabe mais sobre o ataque do que deveria.

Continua no Capítulo 7 — A Noite dos Traidores.`,[]);

// Dinâmica da travessia; regras determinísticas, sem sorte nem mortes escondidas.
const NAM={hero:'Você',laisla:'Laisla',rauanny:'Rauanny',isabella:'Isabella',rayssa:'Rayssa',allan:'Allan',ryan:'Ryan'};
const dead=(s,id)=>!!s.flags[`c6_morto_${id}`]||(id==='allan'&&s.flags.allan_morto_c4);
const countDeaths=(s)=>['laisla','rauanny','isabella','allan','ryan'].filter(id=>!!s.flags[`c6_morto_${id}`]).length;
const atWindow=(s)=>['hero','laisla','rauanny',...(s.flags.c6_b_junto?['isabella','rayssa',...(!s.flags.allan_morto_c4?['allan']:[])]:[])].filter(id=>!dead(s,id));
const remaining=(s)=>atWindow(s).filter(id=>!s.flags[`c6_crossed_${id}`]);
const riskOf=(s,id)=>{
 let risk=0;
 if(s.flags[`c6_ferida_${id}`])risk+=2;
 // Ferimentos anteriores também pesam na travessia. Não duplicar a penalidade do ataque atual.
 const persistent=window.UGConsequences?.injury?.(s,id)?.items||[];
 if(persistent.some(w=>w.source!=='Capítulo 6'))risk+=1;
 if(!s.flags.c6_escada_segura)risk+=1;
 if(s.flags.c6_escada_solto)risk+=1;
 if(!s.flags.c6_escada_ancorada&&!s.flags.c6_ponto_ancoragem)risk+=1;
 if(!s.flags.c6_ajuda_escada&&!s.flags.c6_ryan_com_apoio)risk+=1;
 if(s.flags.c6_porta_cedendo)risk+=1;
 if(Object.keys(s.flags).filter(k=>k.startsWith('c6_crossed_')&&s.flags[k]).length>=3)risk+=1;
 if(id==='rauanny'&&s.flags.c6_rauanny_atendida)risk=Math.max(0,risk-1);
 return risk;
};
function rr(id,s){
 const f=s.flags,cur=f.c6_current||'hero',who=cur==='hero'?(s.hero?.name?.split(' ')[0]||'Você'):NAM[cur];
 const risk=riskOf(s,cur),deathPossible=cur!=='hero'&&cur!=='rayssa'&&countDeaths(s)<3;
 const crossed=atWindow(s).filter(id=>f[`c6_crossed_${id}`]).map(id=>id==='hero'?s.hero?.name||'Protagonista':NAM[id]);
 if(id==='h12private'){
  const routes={
   ryan:{who:'Ryan',text:`Seu telefone vibra novamente. Ryan não envia outra provocação; pede que você vá até a varanda por um instante, onde podem se ver pelas janelas opostas.\n\nRyan: — Eu sei que prometi descer. Minha tia ainda tá com o técnico, mas eu queria te ver antes de ficar todo mundo junto.\n\nVocê vai até a janela. Ele está do outro lado, iluminado pela luz quente da sala. Não dá para tocar sua mão. Ainda assim, o sorriso dele muda quando percebe você.\n\nRyan: — Eu faço tanta piada porque, quando fico quieto, começo a pensar que alguém vai embora e não volta. E eu odeio isso. Principalmente quando penso em você.\n\nVocê: — Eu não quero que você se cale pra provar que tá bem. Só quero que fale comigo quando não estiver.\n\nEle respira e concorda. Antes de desligar, promete chegar assim que o técnico liberar a varanda. Você espera vê-lo na mesa em poucos minutos.`,effects:[B('ryan',4)]},
   breno:{who:'Breno',text:`Breno manda uma mensagem enquanto espera Samuel na oficina: “Tem um minuto? Não é sobre a investigação.” Você se afasta um pouco da mesa para responder por áudio.\n\nBreno: — Eu sei que saí cedo. Fiquei pensando em você lá com todo mundo, rindo. Fazia tempo que eu não ouvia você rir assim.\n\nVocê: — Eu também tava sentindo falta.\n\nBreno: — Não quero parecer aquele cara que precisa estar do seu lado o tempo inteiro. Só que depois do que aconteceu com Allan, eu percebi que tô adiando um monte de coisa por medo.\n\nVocê: — Você não precisa resolver tudo sozinho.\n\nBreno: — Eu sei. Tô tentando aprender.\n\nA conversa dura mais do que deveria. Não termina com uma promessa grandiosa; termina com os dois combinando de se ver depois do jantar, quando Samuel estiver seguro.`,effects:[B('breno',4)]},
   rayssa:{who:'Rayssa',text:`Rayssa encontra você perto da cozinha e pergunta se podem conversar sem os outros por um minuto. Não parece querer esconder algo extraordinário; parece apenas exausta.\n\nRayssa: — Eu vi você rindo com a Isa. Ela precisa tanto disso. Eu também precisava.\n\nVocê: — A gente pode ter momentos bons, mesmo com tudo que aconteceu.\n\nRayssa: — Eu tento acreditar. Às vezes parece que qualquer coisa feliz vai cobrar um preço depois.\n\nVocê segura a mão dela. Rayssa não se afasta. Ela olha para os dedos de vocês e volta a levantar os olhos.\n\nRayssa: — Eu gosto de você, {nome}. Isso não é uma desculpa pra nada. Só... é real.\n\nVocê: — Eu sei. E quero que a gente continue conversando, mesmo quando for difícil.\n\nA expressão dela muda por um segundo, como se a frase tivesse atingido um lugar dolorido. Depois ela encosta a testa na sua e pede para voltar ao jantar, onde Isabella está chamando.`,effects:[B('rayssa',4)]},
   rauanny:{who:'Rauanny',text:`Rauanny vai até a varanda com você para respirar um pouco do ar frio. Da sala vem a voz de Laisla discutindo sobre os pratos. Rauanny ri sem olhar para trás.\n\nRauanny: — Ela tem o dom de transformar lavar louça em guerra civil.\n\nVocê: — E você gosta de participar.\n\nRauanny: — Talvez. Mas eu gosto mais de ficar aqui contigo.\n\nEla passa um braço pela sua cintura, hesitando pouco mais que o normal.\n\nRauanny: — Eu tenho medo de te perder, sabia? Não gosto de falar isso porque parece que você vai pensar que eu sou fraca.\n\nVocê: — Eu nunca achei isso.\n\nRauanny: — Então lembra quando eu começar a agir como uma idiota. Eu sou péssima em admitir que tô apavorada.\n\nVocês ficam alguns minutos conversando sobre coisas pequenas, sem transformar todo gesto em despedida. Quando Laisla chama, Rauanny responde que está indo e aperta sua mão mais uma vez.`,effects:[B('rauanny',4)]},
   solteiro:{who:'Amizades',text:`Isabella te puxa de volta para a mesa quando percebe que você ficou olhando o movimento no pátio.\n\nIsabella: — Ei. Eu sei que você decidiu não namorar ninguém agora. Mas não vai achar que isso significa ser o amigo que só cuida de todo mundo e nunca pede nada.\n\nVocê: — Tá falando isso pra mim ou pra você?\n\nEla aponta o dedo, ofendida de brincadeira.\n\nIsabella: — Os dois. Mas eu falei primeiro, então vale mais.\n\nLaisla aparece atrás dela com uma tigela de sobremesa que jurou estar vazia. Rauanny reclama que ela escondeu doce de propósito.\n\nVocê passa alguns minutos entre os três, ajudando a resolver uma discussão completamente inútil. Quando a conversa termina, sente uma espécie de alívio: não é preciso viver um romance para ter gente em quem se apoiar.`,effects:[B('isabella',3)]}
  };
  const route=routes[s.romanceEscolhido]||routes.solteiro;
  return {...window.NODES.h12private,text:route.text,choices:[C('Voltar à reunião e ajudar a recolher a mesa','h13',route.effects),C('Guardar esse momento antes de voltar aos amigos','h13',[['trait','empatia',1],...route.effects])]};
 }
 if(id==='h38'){
  const left=remaining(s);if(!left.length)return {...window.NODES.h38,id:'h38',text:`O último sobrevivente da janela chegou ao Bloco B. As mãos de Ryan estão tremendo e a escada ainda balança entre os dois prédios. Você olha para o lugar onde estava Laisla e percebe que não há mais ninguém esperando naquela janela. A porta do quarto cedeu segundos atrás. Quem escapou pela lavanderia ainda precisa ser encontrado.`,choices:[C('Reunir os sobreviventes e verificar o outro núcleo','h38_done')]};
  const intro=crossed.length?`Já chegaram ao outro lado: ${crossed.join(', ')}.`:'Ainda ninguém atravessou. A escada parece interminável vista deste lado.';
  const friendship=dead(s,'laisla')&&dead(s,'rauanny')?'Os lugares onde Laisla e Rauanny deveriam estar estão vazios, e ninguém encontra forças para comentar isso.':dead(s,'laisla')?'Rauanny procura Laisla com o olhar, mesmo sabendo que ela não está mais ali.':dead(s,'rauanny')?'Laisla aperta a fotografia de Rauanny e Ryan contra o peito, com os olhos cheios de lágrimas.':'Laisla aperta a mão de Rauanny antes de soltar. Mesmo tremendo, as duas continuam tentando cuidar uma da outra.';
  const choices=left.map(id=>C(id==='hero'?'Eu vou atravessar agora':`Mandar ${NAM[id]} atravessar agora`,'h38_attempt',[['set','c6_current',id]]));
  return {...window.NODES.h38,text:`PONTO DE VISTA: {nome}.\n\n${intro}\n\nRyan está na janela oposta, tentando manter a escada estável. O mascarado continua golpeando a porta do quarto. Cada pessoa deverá passar de forma individual, com o corpo baixo, sem qualquer proteção contra a queda.\n\n${friendship}\n\nVocê decide a ordem entre as pessoas que realmente alcançaram a janela. O telefone mostra que Isabella e os outros que escolheram a saída de serviço estão tentando chegar ao corredor de manutenção. A escada entre blocos é somente para quem alcançou esta janela.\n\nQuem vai agora?`,choices};
 }
 if(id==='h38_attempt'){
  const txt=`PONTO DE VISTA: ${who.toUpperCase()}.\n\n${who} se aproxima da janela, olha o vão e apoia as mãos no primeiro degrau. A escada parece muito maior aqui do que parecia vista da sala. Ryan mantém o olhar fixo do outro lado e fala devagar para que cada movimento tenha um ritmo.\n\nRyan: — Um braço por vez. Não corre. Eu tô aqui.\n\nO vento pressiona a roupa contra o corpo. O mascarado golpeia a porta ao fundo. ${f[`c6_ferida_${cur}`]?`${who} sente o ferimento pulsar sempre que muda o peso do corpo, e precisa parar algumas vezes.`:'Mesmo sem um ferimento grave, os dedos tremem tanto que segurar o metal exige concentração.'}\n\nDo outro lado, os amigos tentam não gritar instruções diferentes. Não existe uma decisão perfeita: atravessar com calma pode dar tempo ao agressor; acelerar pode fazer a escada oscilar.\n\nA próxima escolha definirá a forma da travessia.`;
  return {...window.NODES.h38_attempt,text:txt,choices:[
    C('Avançar devagar, esperando Ryan confirmar cada movimento',risk<=3?'h38_ok':'h38_danger',[F('travessia_cautelosa')]),
    C('Tentar acelerar enquanto a porta ainda aguenta',risk<=1?'h38_ok':'h38_danger',[F('travessia_apressada')]),
    C('Pedir que alguém segure a escada por dentro antes de continuar',(f.c6_ajuda_escada||f.c6_escada_segura||f.c6_escada_ancorada)?'h38_ok':'h38_danger',[F('travessia_apoio')])
  ]};
 }
 if(id==='h38_danger'){
  return {...window.NODES.h38_danger,text:`Uma extremidade da escada desliza alguns centímetros. ${who} abraça o metal, procurando com os pés um degrau firme. O vento não parou; do quarto, vem um estalo de madeira partindo.\n\nRyan: — NÃO OLHA PRA BAIXO! OLHA PRA MINHA MÃO!\n\nA voz parece distante. ${who} tenta responder, mas precisa usar toda a força para permanecer onde está. Quem segura a escada do lado de dentro grita para que ninguém se mova por um instante.\n\nA situação ainda não se resolveu. Há uma maneira mais cuidadosa de reagir e uma tentativa arriscada de ganhar distância. Se a passagem foi montada às pressas, se há ferimentos ou se você perdeu tempo na invasão, um erro agora pode ser fatal.`,choices:[
    C('Parar, segurar firme e deixar Ryan reposicionar a escada','h38_ok',[F('travessia_contida'),...(risk>=4?[["flag",`c6_ferida_${cur}`,true]]:[])]),
    C('Soltar uma das mãos e se impulsionar na direção da janela','h38_fall',[F('travessia_arriscada')])
  ]};
 }
 if(id==='h38_ok'){
  return {...window.NODES.h38_ok,text:`${who} alcança o último trecho. Ryan estende a mão apenas quando consegue um apoio firme e a pessoa já está suficientemente perto para não precisar saltar.\n\nRyan: — Isso. Só mais um pouco. Não solta até eu falar.\n\nA mão de ${who} finalmente toca a borda interna do Bloco B. O técnico segura o ferro enquanto Ryan ajuda a pessoa a entrar. A travessia termina com joelhos no chão, respiração irregular e alguns segundos sem conseguir pronunciar uma frase completa.\n\nDo lado oposto, ainda há gente esperando, caso não tenham conseguido passar. O mascarado continua perto, e a escada não ficou menos alta porque alguém chegou. Ryan pede que a próxima pessoa espere até ele confirmar que a base está firme.\n\nA conquista é real, mas ainda não é o fim da fuga.`,choices:[C('Confirmar que chegou e chamar a próxima pessoa','h38',[['cross',cur],B(cur==='hero'?'ryan':cur,1)])]};
 }
 if(id==='h38_fall'){
  if(deathPossible&&risk>=3){
    return {...window.NODES.h38_fall,text:`${who} tenta avançar de uma vez, mas o peso muda no momento em que a escada balança. A mão escorrega e um pé perde o degrau. Por um instante, o corpo fica suspenso fora da linha segura da estrutura.\n\nRyan grita o nome de ${who}. Da janela do outro lado, alguém estende a mão, mas não alcança. O mascarado continua pressionando a passagem e impedindo que a extremidade interna seja estabilizada.\n\nA queda acontece antes que os amigos consigam segurar a pessoa. O grito atravessa o pátio e desaparece num silêncio que ninguém sabe preencher. Ryan se afasta da janela com as mãos sobre a cabeça, incapaz de aceitar o que viu.\n\n${who} morreu durante a travessia. A fuga continua para quem ainda está vivo, mas ninguém que viu a queda conseguirá esquecer aquele instante.`,choices:[C('Continuar a fuga depois da perda','h38',[['death',cur]])]};
  }
  return {...window.NODES.h38_fall,text:`${who} perde o equilíbrio ao tentar avançar depressa. Uma das mãos escorrega, o corpo gira e Ryan grita para que a pessoa pare de se mover.\n\nO técnico consegue puxar a estrutura contra a janela por um instante. Um amigo alcança o braço de ${who} e o ajuda a encontrar novamente o degrau. O resgate acontece por centímetros e força conjunta; ninguém sai sem ferimentos ou sem sentir a gravidade do risco.\n\nRyan: — NÃO FAZ ISSO DE NOVO! POR FAVOR!\n\n${who} alcança a janela do Bloco B com dificuldade, mas vivo. A fuga continua.`,choices:[C('Receber ajuda e chamar o próximo sobrevivente','h38',[['cross',cur],["flag",`c6_ferida_${cur}`,true]])]};
 }
 if(id==='h38_done'){
  const deadNames=['laisla','rauanny','isabella','allan'].filter(x=>dead(s,x)).map(x=>NAM[x]);
  return {...window.NODES.h38_done,text:`O protagonista consegue olhar pela última vez para a janela de Laisla. Não há mais ninguém aguardando para atravessar.\n\n${deadNames.length?`Mas nem todos os nomes estarão na chamada dos sobreviventes. Nesta partida, o grupo já perdeu ${deadNames.join(', ')}.`: 'As pessoas que chegaram à janela conseguiram atravessar. Isso não responde ainda o destino de quem ficou na área de serviço.'}\n\nRyan tenta fechar a janela, mas a ponta da escada continua presa. O mascarado aparece por um segundo do outro lado e encosta a mão na estrutura. Os amigos recuam sem saber se ele pretende tentar alcançá-los ou apenas destruir a única ligação entre os prédios.\n\nDo corredor de manutenção, alguém grita que a polícia está chegando. O técnico de Ryan insiste que ninguém deve tocar na escada até que haja equipes de resgate.\n\nO primeiro momento de alívio chega misturado a uma nova dúvida: onde estão Isabella, Rayssa e Allan, caso tenham seguido a rota de serviço?`,choices:[C('Fechar a janela e reunir quem atravessou','h39')]};
 }
 if(id==='h40ryanResult'){
  const severe=(f.c6_escada_solto||f.c6_escada_apressada)&&!f.c6_ryan_com_apoio&&!f.c6_escada_segura;
  if(severe&&countDeaths(s)<3){
   return {...window.NODES.h40ryanResult,text:`O técnico tenta segurar a base, mas a escada cede do lado oposto. Ryan perde o último ponto de apoio antes que você consiga alcançar sua mão.\n\nOs sobreviventes gritam. Alguém tenta correr para a janela, mas o técnico manda todos se afastarem. O movimento termina rápido demais para que a mente de qualquer um aceite que acabou.\n\nRyan cai entre os dois blocos. Os amigos ficam imóveis, olhando para o lugar onde ele estava segundos antes. Ele salvou pessoas usando uma passagem que nunca deveria ter tentado recuperar sozinho.\n\nRyan havia ajudado todos que conseguiu alcançar, mas não conseguiu voltar daquela última tentativa. Para quem o amava, a ausência não tem nenhuma explicação capaz de torná-la menor.`,choices:[C('Deixar a janela e procurar os outros','h41',[['death','ryan']])]};
  }
  return {...window.NODES.h40ryanResult,text:`O técnico consegue se apoiar na estrutura interna e prende Ryan pela roupa no instante em que a escada dá mais um tranco. Você puxa o braço dele e os três caem para dentro do apartamento.\n\nRyan não fala imediatamente. Fica no chão, encostado na parede, olhando as próprias mãos. Quando recupera a voz, solta um palavrão entre um riso e um choro.\n\nRyan: — Eu achei que tinha acabado. Achei mesmo.\n\nVocê: — Acabou de voltar pra cá. Agora não sai de perto.\n\nA janela é trancada e o técnico proíbe qualquer nova tentativa de atravessar. Ryan está vivo, embora machucado e abalado.`,choices:[C('Levar Ryan para junto dos sobreviventes','h41',[F('ferido_ryan')])]};
 }
 if(['h07','h09','h12','h17','h25','h29','h39','h40ryanResult','h43','h44b','h45','h46b','h50a'].includes(id)){
  const n=window.NODES[id];let t=n.text;
  const survival=hasAllan(s);
  if(id==='h07')t=t.replace('Allan aparece na sala — ou, se não sobreviveu à noite do arquivo, o lugar que costumava ocupar é apenas um vazio de memória. O ambiente não vai fingir que todas as partidas terminaram do mesmo jeito.',survival?'Allan aparece na sala de curativo no braço e um prato na mão. — Avisa se isso aqui tiver alérgico a gente bonito, porque eu sou praticamente um risco sanitário. Isabella ri e pede que ele sente.':'Uma cadeira extra foi retirada às pressas antes de vocês chegarem. Quando Laisla menciona Allan por engano, a conversa interrompe por um segundo. Samuel não veio: está com Breno, tentando lidar com o luto longe da reunião.');
  if(id==='h09')t=t.replace('Allan, caso esteja vivo, também pode participar.',survival?'Allan está com os amigos, sentindo o curativo repuxar quando ri.':'A falta de Allan se torna perceptível mesmo quando ninguém menciona seu nome.').replace('Allan, caso esteja vivo','Allan');
  if(id==='h12')t=t.replace('Se ele ainda está ali, responde com uma piada exagerada sobre escapar de outro filme de terror. Se não está, a mesa guarda alguns segundos de silêncio antes de Samuel mandar uma mensagem para perguntar como todos estão. Laisla oferece guardar um prato para ele.',survival?'Ele está ali e responde com uma piada exagerada sobre escapar de outro filme de terror. Samuel manda mensagem para perguntar como o braço dele está, e Allan responde com uma foto da sobremesa.':'Ele não está ali. A mesa guarda alguns segundos de silêncio antes de Samuel mandar uma mensagem perguntando como todos estão. Laisla oferece guardar um prato para ele.');
  if(id==='h17')t=t.replace('Allan, caso esteja ali, tenta impedir que alguém fique para trás.',survival?'Allan corre atrás delas, protegendo o braço que ainda dói do último ataque.':'A cozinha fica apenas com Isabella e Rayssa.');
  if(id==='h25')t=t.replace('e, se Allan sobreviveu ao arquivo da estrada norte, ele também.','e Allan, ainda com o braço machucado.' ).replace('ela, Rayssa e Allan, ainda com o braço machucado.',survival?'ela, Rayssa e Allan, ainda com o braço machucado.':'ela e Rayssa.');
  if(id==='h29')t=survival?t.replace('Se ele sobreviveu, o grupo precisa ajudá-lo a sair do apartamento sem agravar o que aconteceu no arquivo da estrada norte. Se morreu, não haverá uma cena impossível em que aparece para salvar os amigos: a memória dele pesa sobretudo sobre Samuel, longe dali.','Ele sobreviveu ao ataque do capítulo 4, mas continua com o braço sensível. Precisa fugir sem agravar aquela lesão.'):t.replace('Se ele sobreviveu, o grupo precisa ajudá-lo a sair do apartamento sem agravar o que aconteceu no arquivo da estrada norte. Se morreu, não haverá uma cena impossível em que aparece para salvar os amigos: a memória dele pesa sobretudo sobre Samuel, longe dali.','Allan morreu no arquivo da estrada norte. Seu nome não pertence à lista de pessoas dentro do apartamento. Samuel, longe dali, ainda tenta conviver com a perda.').replace('E, se Allan está ali, surge uma decisão difícil: ele vê um aparelho esquecido na mesa, que poderia registrar o ataque. Voltaria por uma possível prova ou abandonaria tudo para fugir com os amigos?','Isabella e Rayssa tentam abrir a grade enquanto a polícia é chamada. A conversa sobre encontrar provas pode esperar; a urgência é sair vivas.');
  if(id==='h29'){
    if(dead(s,'isabella'))t=t.replace('Isabella e Rayssa precisam decidir como seguir, ainda que estejam separadas do grupo. Cada movimento pelo corredor pode atrair o mascarado. Um som de telefone chega até o quarto, abafado pelas batidas na porta.','Rayssa está sozinha na lavanderia depois de perder Isabella. Ela tenta pedir ajuda à portaria, chorando tanto que mal consegue dizer o número do apartamento.');
    else if(f.c6_b_junto)t=t.replace('Isabella e Rayssa precisam decidir como seguir, ainda que estejam separadas do grupo. Cada movimento pelo corredor pode atrair o mascarado. Um som de telefone chega até o quarto, abafado pelas batidas na porta.','Isabella e Rayssa conseguiram chegar ao quarto. Agora ajudam a segurar a barricada enquanto alguém procura uma saída pela janela. O reencontro trouxe alívio e menos espaço para se mover.');
  }
  if(id==='h39'){
   t=t.replace('Laisla se encosta na parede. Rauanny aperta o antebraço e tenta recuperar o fôlego.',
    dead(s,'laisla')&&dead(s,'rauanny')?'O lugar onde Laisla e Rauanny deveriam estar está vazio. Ryan olha para as mãos, incapaz de aceitar as duas ausências.':dead(s,'laisla')?'Rauanny se encosta na parede, procurando por Laisla com o olhar mesmo sabendo que ela não chegou.':dead(s,'rauanny')?'Laisla se encosta na parede e aperta a fotografia da amiga contra o peito. Rauanny não chegou.':'Laisla se encosta na parede. Rauanny tenta recuperar o fôlego ao lado dela, e as duas procuram manter contato para não se separar.');
  }
  if(id==='h44b'&&dead(s,'rauanny'))t=t.replace('Rauanny segura a mão de Laisla. As duas permanecem caladas por um longo momento.','O lugar que Rauanny ocuparia ao lado da amiga está vazio. Laisla tenta estender a mão e recua quando percebe que não há ninguém ali.');
  if(id==='h44b'&&!dead(s,'rauanny'))t=t.replace('Rauanny segura a mão de Laisla. As duas permanecem caladas por um longo momento.','Rauanny se aproxima e segura a mão da amiga. As duas continuam tremendo, mas estão juntas.');
  if(id==='h43')t=t.replace('Laisla tenta contar quantos amigos estavam no jantar. Pára no meio. Volta a contar. Rauanny segura sua mão e faz a contagem com ela, nome por nome.',dead(s,'laisla')&&dead(s,'rauanny')?'Você tenta listar todos que estavam no jantar. Os dois nomes que faltam parecem impossíveis de escrever.':dead(s,'laisla')?'Rauanny tenta contar quantos amigos estavam no jantar. Para ao pronunciar o nome de Laisla e cobre o rosto.':dead(s,'rauanny')?'Laisla tenta contar quantos amigos estavam no jantar. Para ao pronunciar o nome de Rauanny e abraça os joelhos.':'Laisla tenta contar quantos amigos estavam no jantar. Pára no meio. Volta a contar. Rauanny segura sua mão e faz a contagem com ela, nome por nome.');
  if(id==='h45')t=t.replace('Laisla: — Eu só queria que hoje fosse normal.',dead(s,'laisla')?'Breno: — Era pra ter sido só um jantar.':'Laisla: — Eu só queria que hoje fosse normal.');
  if(id==='h50a')t=t.replace('A primeira resposta é de Laisla, perguntando por Rauanny. Depois Ryan manda uma mensagem cheia de erros de digitação, provavelmente escrita com uma das mãos ainda tremendo.',`${!dead(s,'laisla')?'Laisla manda uma mensagem perguntando se os outros receberam atendimento.':'O telefone continua sem qualquer resposta de Laisla.'} ${!dead(s,'ryan')?'Ryan também envia uma mensagem cheia de erros de digitação, provavelmente escrita com uma das mãos ainda tremendo.':'A conversa com Ryan permanece em silêncio.'}`);
  if(id==='h43')t=t.replace('Rayssa aparece na porta acompanhada por uma funcionária — ou, dependendo do caminho, chega sozinha e desesperada, procurando Isabella. Sua expressão não é uma pista óbvia de culpa; é o rosto de alguém que participou de uma situação horrível e não consegue desfazer o que aconteceu.',f.c6_morto_isabella?'Rayssa chega pela rota de serviço acompanhada de uma funcionária, incapaz de olhar para a sala sem perguntar pelo corpo de Isabella. A culpa pesa na respiração dela.':'Rayssa chega pela rota de serviço ou se aproxima dos amigos depois de atravessar, e procura Isabella com os olhos. As duas conseguem se encontrar se Isabella sobreviveu.');
  if(id==='h46b')t=t.replace('Se Allan já morreu no capítulo 4, Samuel faz a pergunta por impulso e percebe o próprio erro, levando as mãos ao rosto. Se Allan esteve presente no ataque desta noite, a resposta depende do que realmente aconteceu na cozinha.',f.allan_morto_c4?'Samuel pronuncia o nome de Allan por impulso e se lembra de que o amigo não poderia estar aqui. Cobre o rosto, envergonhado até pela própria confusão.':f.c6_morto_allan?'Quando você diz que Allan morreu na cozinha, Samuel recua como se tivesse recebido um golpe. Ele já o vira sobreviver uma vez. Não consegue aceitar perdê-lo agora.':'Você aponta para Allan, que foi encontrado vivo e recebe atendimento. Samuel se aproxima do amigo e o abraça sem se importar com o curativo.');
  return {...n,text:t};
 }
 return window.NODES[id];
}
// O próprio motor valida a escolha, aplica as consequências e salva no slot ativo.
window.UG6={resolve:rr,dead,countDeaths,atWindow,remaining};
window.NODES.fim09.choices=[C('CAPÍTULO 6 · Começar O Silêncio Tem Testemunhas','h01')];
window.HISTORIA.push(...E);
for(const n of E){if(window.NODES[n.id])throw Error('ID duplicado: '+n.id);window.NODES[n.id]=n;}
})();
