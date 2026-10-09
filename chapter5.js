/* Capítulo 5: LAÇOS DE SANGUE — escolhas, luto e compromisso */
(()=>{
const N=(id,location,time,scene,text,choices=[])=>({id,chapter:'CAPÍTULO 05 · LAÇOS DE SANGUE',location,time,scene,text,choices,speaker:'NARRAÇÃO'});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const E=[];const add=(...args)=>E.push(N(...args));
add('g01','QUARTO · LAKEWOOD','08:09','phone',`O dia clareia sem pedir licença. Seu celular tem dezenas de notificações, mensagens sem resposta e um vídeo de seis segundos da estrada, filmado da janela de uma viatura. Nada nele mostra o agressor.

O cheiro de café vem da cozinha, mas você não sente fome. Na noite anterior, alguém colocou a vida de Allan em risco, e a cidade inteira continua tratando tudo como uma série de acidentes desconexos.

Seu reflexo no vidro parece mais cansado. É difícil reconhecer aquela pessoa que, um ano atrás, entrou rindo na van de Samuel.

Breno: — {nome}, acordou? A Isabella pediu pra gente se encontrar na casa dela. Não falou no grupo, só por mensagem privada. Disse que tem uma coisa séria pra mostrar.

Você: — Depois de ontem eu tô começando a odiar a palavra “séria”.

Breno: — Eu também. Mas... não precisa ir sozinho.`,[
C('Responder que vai com Breno','g02',[['bond','breno',4],['romance','breno',3]]),
C('Mandar mensagem para saber como Ryan está','g02r',[['bond','ryan',4]]),
C('Pedir notícias de Allan antes de sair','g02a',[['flag','procurou_allan_c5',true]])]);
add('g02r','CONVERSA NO CELULAR','08:18','phone',`Ryan responde com um áudio que começa com uma tentativa de piada e termina num suspiro.

Ryan: — Bom dia, sobrevivente. Péssima abertura, eu sei. Eu escrevi três vezes e essa foi a menos idiota.

Você: — Como você tá?

Ryan: — Com medo. Com raiva. E com saudade de quando meu maior problema era a Laisla roubar minhas batatas. A gente conversa quando se ver, tá?

Você ouve alguém chamando Ryan ao fundo. Ele promete esperar você na casa de Isabella.`,[C('Ir ao encontro do grupo','g02')]);
add('g02a','COZINHA · TELEFONEMA','08:20','phone',`Você liga para o número de Allan. O toque parece durar uma eternidade. As lembranças da escada vêm junto: a lanterna caindo, Samuel gritando, o silêncio depois da fuga.

O telefone para de chamar. Você não sabe se sente alívio ou ainda mais medo.

Na última conversa, Allan havia enviado um sticker ridículo, como se o mundo nunca pudesse ficar pesado demais. Agora aquela imagem parece pertencer a outra vida.`,[C('Sair para a reunião','g02')]);
add('g02','CASA DE ISABELLA · ENTRADA','10:04','house',`O portão de Isabella está aberto. Há dois copos de café esquecidos na varanda, um guarda-chuva quebrado no canto e uma caixa de lenços quase vazia sobre a mesa.

Rayssa vê você pela janela e abre a porta antes da campainha. Seus olhos estão vermelhos. Laisla abraça Rauanny tão apertado que ela reclama, por hábito, mas não se afasta. Samuel permanece sentado em silêncio; a cadeira à sua frente parece grande demais.

Isabella: — Obrigada por ter vindo. Eu juro que dessa vez não vou fazer discurso. Só... entra. A gente precisa decidir como continuar vivendo depois de tudo isso.`,[
C('Entrar e perguntar pelo estado de Allan','g03'),
C('Abraçar Rayssa antes de falar qualquer coisa','g03',[['bond','rayssa',5],['trait','empatia',1]]),
C('Sentar ao lado de Samuel','g03',[['bond','samuel',3]])]);
add('g03','SALA DE ISABELLA','10:12','house',`Isabella espera todos se acomodarem. Ao contrário das reuniões anteriores, ninguém interrompe imediatamente. Até Ryan fica quieto. Samuel gira uma pulseira de tecido entre os dedos, olhando fixamente para o chão.

Isabella: — Antes de qualquer coisa... a gente precisa falar do Allan. Não dá pra sentar aqui e fingir que ontem foi só mais uma noite ruim.

A frase parece quebrar a última resistência do grupo.`,[
C('Ouvir como os amigos estão lidando com a noite','g04v',[],[['flag','allan_morto_c4',false]]),
C('Deixar Samuel falar sobre Allan','g04m',[],[['flag','allan_morto_c4',true]])]);
add('g04v','SALA · O DIA SEGUINTE','10:19','house',`Allan está sentado no canto do sofá, com um curativo no braço e uma almofada apoiada na cintura.

Allan: — Pra quem tá me olhando com cara de velório: eu tô vivo, tá? Mal-humorado, dolorido, lindo mesmo assim. Podem respirar.

Samuel solta uma risada que termina no meio.

Samuel: — Para de fazer piada de tudo, cara. Ontem eu achei que ia te perder.

Allan: — E eu achei que não ia sair daquela escada. Não vou fingir que não fiquei com medo só porque sobrevivi.

Ele olha para você, depois para Samuel.

Allan: — A gente tem que parar de usar humor e gritaria pra esconder o que tá acontecendo. Eu também faço isso. Só que agora eu quero que a gente faça alguma coisa que preste.

Samuel limpa os olhos com a manga da blusa, sem comentar.`,[C('Conversar sobre o próximo passo','g05',[['friendBond',['allan','samuel'],5]])]);
add('g04m','SALA · CADEIRA VAZIA','10:19','house',`A cadeira onde Allan costumava se jogar de qualquer jeito permanece vazia. O nome dele foi pronunciado baixo demais desde a madrugada, como se falar alto pudesse tornar a perda definitiva.

Samuel ergue o rosto. Está com olheiras profundas e as mãos tremendo.

Samuel: — Ele ficou porque eu mandei. Eu disse que dava tempo, que tinha uma saída. E ele confiou em mim.

Rayssa: — Samuel, não foi só você quem decidiu...

Samuel: — Mas fui eu que ouvi ele gritar. Eu ouvi e não consegui voltar.

Laisla começa a chorar em silêncio. Ryan leva as mãos à cabeça. Breno se aproxima de você, sem tocar, só estando ali.

Samuel: — Eu passei um ano inteiro tentando esconder uma morte. E agora perdi meu melhor amigo porque a gente continuou escondendo tudo.

Ninguém discorda.`,[
C('Dizer que Allan merecia que o grupo buscasse a verdade','g05',[['bond','samuel',2],['trait','empatia',1]]),
C('Pedir que Samuel pare de carregar a culpa sozinho','g05',[['bond','samuel',5],['bond','rayssa',2]])]);
add('g05','SALA · O MAPA NA MESA','11:03','house',`Isabella estende um mapa impresso de Lakewood. Marca com caneta três pontos: a mansão dos Gomes, a marina velha e a estrada onde a van atingiu Jullia.

Isabella: — O que a família e os policiais sabem é que Jullia desapareceu. O que a gente sabe é outra coisa. A gente colocou o corpo dela no lago. E agora alguém quer que a gente sofra antes de contar tudo.

Breno: — A foto da van foi tirada de um lugar alto. A câmera precisa ter tido uma linha de visão limpa para o acostamento.

Rauanny: — E o áudio dela? Aquele barulho de passos e galhos? Se tinha alguém na mata, talvez seja essa pessoa que tá atrás da gente.

Ryan: — Ou alguém usando isso pra fazer a gente suspeitar uns dos outros.

Você observa o mapa. Três lugares, uma noite, e muito mais gente envolvida do que vocês quiseram acreditar.`,[
C('Conectar a foto ao mirante da estrada norte','g06a',[['clue','foto_van_origem'],['trait','cautela',1]]),
C('Perguntar quem teve acesso ao áudio de Jullia','g06b',[['clue','acesso_audio_c5',true]]),
C('Defender que o grupo preserve as provas e procure ajuda','g06c',[['flag','defendeu_ajuda_c5',true],['bond','rayssa',4]])]);
add('g06a','SALA · MAPA','11:09','house',`Você aponta para a encosta junto à estrada norte.

Você: — Aqui. Alguém fotografou a van de cima. Se a imagem é daquela noite, a pessoa podia estar ali antes do atropelamento.

Breno: — E o ângulo confere com a altura do antigo mirante.

Samuel: — Mas naquela noite eu não vi carro nenhum estacionado lá.

Rauanny: — Você também demorou um ano pra contar que viu uma pessoa na mata. Desculpa se isso não tranquiliza ninguém.

Samuel abaixa os olhos. Isabella circula a encosta no mapa, agora com uma pergunta nova.`,[C('Deixar a discussão esfriar','g07')]);
add('g06b','SALA · ARQUIVOS DIGITAIS','11:09','house',`Você: — Quem podia ter acesso ao áudio antes da gente encontrar o gravador?

Breno: — Se a gravação ficou sincronizada em algum computador dos Gomes, funcionários e pessoas com a senha podiam ter acesso. Mas isso ainda é hipótese.

Isabella: — E a gente não sabe se quem apagou as mensagens foi quem deixou o áudio lá.

Ryan: — Ou se deixou de propósito pra gente achar.

O silêncio confirma o desconforto: uma pista não é a mesma coisa que uma resposta.`,[C('Anotar essa dúvida e continuar','g07')]);
add('g06c','SALA · DISCUSSÃO','11:09','house',`Você: — Precisamos guardar cópias das provas, falar com alguém de confiança e parar de agir como se desse pra resolver isso em grupo de WhatsApp.

Rayssa: — Obrigada. Eu só queria ouvir isso sem o Samuel me interromper.

Samuel: — Eu não vou impedir ninguém de pedir ajuda pra se proteger. Mas quando perguntarem da Jullia, a gente vai ter que decidir o que dizer.

Isabella: — Pela primeira vez, acho que você entendeu que essa decisão não é só sua.

A tensão não desaparece, mas o grupo consegue estabelecer um acordo: preservar tudo e não sair sozinho.`,[C('Seguir para uma conversa mais pessoal','g07')]);
add('g07','JARDIM · FIM DE TARDE','16:42','lake',`Depois de horas de discussão, o grupo se dispersa pelo jardim para respirar. Uma conversa sobre mapas não cura ferimentos nem faz a culpa desaparecer. Você está exausto, e a sensação de que pode perder outra pessoa pesa mais do que o medo do assassino.

Ryan está perto da cerca, tentando ajeitar a roda solta de uma bicicleta. Breno observa a água da fonte, perdido em pensamentos. Rayssa está no degrau da varanda. Rauanny discute baixinho com Laisla sobre voltar para casa.

Os quatro já se aproximaram de você de maneiras diferentes ao longo dos últimos capítulos. Agora existe uma escolha que não dá mais para adiar: que tipo de relação você quer construir daqui para frente?`,[
C('Conversar com Ryan antes de decidir','g08r'),C('Conversar com Breno antes de decidir','g08b'),C('Conversar com Rayssa antes de decidir','g08s'),C('Conversar com Rauanny antes de decidir','g08u'),C('Pensar um pouco sozinho primeiro','g08n')]);
add('g08r','JARDIM · PERTO DA CERCA','16:51','town',`Ryan finge concentração na bicicleta até perceber que você parou ao lado dele.

Ryan: — Você veio ver minha habilidade mecânica? Porque eu aviso que sou um desastre, mas um desastre charmoso.

Você: — Você parece cansado.

Ryan solta o guidão.

Ryan: — Eu tô. E tô com medo de ser engraçado quando você precisa de alguém sério. Eu gosto de ficar perto de você, {nome}. Mais do que eu costumava admitir. Só que, se você não quiser nada além de amizade, eu não vou fugir por causa disso.

O sorriso dele é pequeno, sem encenação. Pela primeira vez, parece estar esperando uma resposta que importa.`,[C('Dizer que a sinceridade dele importa para você','g09',[['romance','ryan',5]]),C('Agradecer e dizer que precisa pensar','g09',[['bond','ryan',3]])]);
add('g08b','JARDIM · FONTE','16:51','lake',`Breno guarda o celular quando você se aproxima, como se já estivesse prestes a mandar uma mensagem.

Breno: — Tô tentando entender como eu consigo falar com você mais fácil que com qualquer outra pessoa. Nem sempre consigo, mas... com você eu tento.

Você: — Você não precisa dizer tudo perfeitamente.

Breno: — Então eu vou dizer de um jeito horrível mesmo: eu tenho medo de perder você. E também tenho medo de que você não sinta nada parecido comigo.

Ele ri, nervoso, antes de completar.

Breno: — Seja qual for sua resposta, eu quero continuar perto. Como amigo, como... o que você quiser. Só não quero sumir de novo.`,[C('Apertar a mão dele e agradecer','g09',[['romance','breno',5]]),C('Dizer que valoriza muito essa amizade','g09',[['bond','breno',4]])]);
add('g08s','VARANDA · DEGRAUS','16:51','house',`Rayssa está olhando uma fotografia antiga de Jullia no telefone. Ela bloqueia a tela antes de olhar para você.

Rayssa: — Eu fiquei com medo de te chamar aqui e fazer você achar que eu queria falar só da culpa. Mas eu também queria falar de nós.

Você: — Nós?

Rayssa: — É. Eu penso em você de um jeito que vai além de amizade. Às vezes fico feliz só de saber que você tá bem, e aí me sinto uma idiota por ter um momento bom no meio disso tudo.

Ela olha para as mãos.

Rayssa: — Não precisa responder agora. Eu só precisava parar de mentir sobre isso também.`,[C('Dizer que ela merece momentos felizes','g09',[['romance','rayssa',5],['bond','rayssa',2]]),C('Escutá-la em silêncio e ficar ao lado dela','g09',[['bond','rayssa',4]])]);
add('g08u','VARANDA · MURO DO JARDIM','16:51','town',`Rauanny cruza os braços quando vê você. A postura é firme, mas ela evita sustentar seu olhar.

Rauanny: — Antes que você fale qualquer coisa, eu e a Laisla não távamos brigando. Tá, a gente tava. Mas não é sobre isso.

Você: — Então é sobre o quê?

Rauanny: — Sobre eu ter passado um ano inteiro tentando fingir que não precisava de ninguém. E agora toda vez que você sai de perto eu começo a pensar em tudo que pode acontecer.

Ela respira fundo, irritada consigo mesma.

Rauanny: — Eu gosto de você. Pronto, falei. Se quiser rir, eu te afogo naquela fonte.

Você sorri. Ela também, contra a própria vontade.`,[C('Brincar que prefere um beijo a um afogamento','g09',[['romance','rauanny',6]]),C('Dizer que a sinceridade dela vale muito','g09',[['bond','rauanny',4]])]);
add('g08n','JARDIM · SOZINHO','16:51','lake',`Você se senta num degrau longe do grupo. Pela primeira vez em semanas, tenta pensar na própria vida sem colocar a tragédia de Jullia no centro de tudo.

Gostar de alguém não vai consertar o passado. E escolher ficar sozinho não significa abandonar os amigos. Talvez o mais importante seja parar de agir por impulso ou por medo de magoar alguém.

Quando você volta a se levantar, a decisão começa a tomar forma.`,[C('Decidir com sinceridade','g09')]);
add('g09','JARDIM · A DECISÃO','17:14','lake',`O vento passa entre as árvores enquanto você pensa no que cada pessoa trouxe para sua vida desde a festa. Não existe escolha certa nem obrigação de começar um namoro depois de tudo que aconteceu.

Se você escolher alguém, será uma decisão afetiva para os capítulos seguintes. As outras pessoas continuarão sendo suas amigas, e a relação com elas seguirá existindo.

Se decidir ficar solteiro, continuará tendo apoio, cenas de amizade e liberdade para viver a história sem romance.`,[
C('Quero seguir um romance com Ryan Cariolato','g10r',[['flag','romance_decidido_c5',true],['flag','romance_ryan_c5',true]]),
C('Quero seguir um romance com Breno Ferreira','g10b',[['flag','romance_decidido_c5',true],['flag','romance_breno_c5',true]]),
C('Quero seguir um romance com Rayssa Santos','g10s',[['flag','romance_decidido_c5',true],['flag','romance_rayssa_c5',true]]),
C('Quero seguir um romance com Rauanny Borges','g10u',[['flag','romance_decidido_c5',true],['flag','romance_rauanny_c5',true]]),
C('Prefiro continuar solteiro e fortalecer minhas amizades','g10n',[['flag','romance_decidido_c5',true],['flag','romance_solteiro_c5',true]])]);
add('g10r','JARDIM · RYAN','17:21','town',`Ryan olha surpreso quando você pede para falar a sós.

Você: — Eu pensei bastante. E queria saber se a gente pode tentar algo de verdade. Sem ficar escondendo atrás de piada.

Ryan: — Tá, só um segundo. Meu cérebro parou de funcionar.

Ele ri, depois fica sério.

Ryan: — Eu quero. Muito. Eu sei que a gente tá vivendo um pesadelo, mas não vou tratar isso como brincadeira. E se você precisar de tempo, eu espero.

Você segura a mão dele. Pela primeira vez, o sorriso de Ryan parece maior que o medo.`,[C('Voltar para o grupo juntos','g11',[['romance','ryan',12],['bond','ryan',7]])]);
add('g10b','JARDIM · BRENO','17:21','lake',`Breno para quando você o chama. Ele parece reconhecer a seriedade da conversa antes de ouvir qualquer palavra.

Você: — Eu quero tentar ficar com você. Não só como amigo.

Breno pisca duas vezes, como quem precisa conferir se entendeu.

Breno: — Você tá falando sério?

Você: — Tô.

Ele ri nervoso, emocionado.

Breno: — Eu tava preparando um discurso enorme pra caso você dissesse não. Agora eu não sei o que falar.

Você: — Pode começar ficando aqui.

Breno encosta a testa na sua por um instante. O silêncio, dessa vez, não é desconfortável.`,[C('Voltar com Breno','g11',[['romance','breno',12],['bond','breno',7]])]);
add('g10s','JARDIM · RAYSSA','17:21','house',`Você se senta ao lado de Rayssa e espera até ela guardar o celular.

Você: — Eu também penso na gente de um jeito diferente. E queria tentar descobrir o que isso significa, se você quiser.

Rayssa leva a mão à boca, surpresa e emocionada.

Rayssa: — Eu quero. Mas promete uma coisa? Que a gente não vai usar esse carinho pra fingir que a culpa desapareceu.

Você: — Eu prometo que vamos ser sinceros.

Ela segura sua mão e respira fundo. O mundo continua difícil, mas agora existe um lugar seguro entre vocês.`,[C('Voltar com Rayssa','g11',[['romance','rayssa',12],['bond','rayssa',7]])]);
add('g10u','JARDIM · RAUANNY','17:21','town',`Você alcança Rauanny perto do portão.

Você: — Você disse que gostava de mim. Acho que tá na hora de eu admitir que sinto o mesmo.

Rauanny fica muda por um segundo — algo raríssimo.

Rauanny: — Pera. Você tá falando sério ou tá tentando me fazer passar vergonha?

Você: — Sério.

Ela ri, sacudindo a cabeça.

Rauanny: — Você é muito sem noção. Eu tava pronta pra te xingar se isso desse errado.

Você: — E agora?

Rauanny segura sua mão, sem desviar o olhar.

Rauanny: — Agora você fica comigo. Mas só se for porque quer.`,[C('Voltar com Rauanny','g11',[['romance','rauanny',12],['bond','rauanny',7]])]);
add('g10n','JARDIM · ESCOLHA PESSOAL','17:21','lake',`Você observa os amigos e entende que, por enquanto, precisa de espaço para descobrir quem é depois de tudo. Não vai começar um namoro por medo de ficar sozinho.

Quando você explica isso aos amigos mais próximos, ninguém transforma a decisão numa ofensa. Ryan faz uma piada leve, Breno oferece uma conversa quando você precisar, Rayssa aperta sua mão e Rauanny diz que você não deve satisfação a ninguém.

Há muito carinho ali, mesmo sem romance. E isso também importa.`,[C('Voltar para a reunião','g11',[['trait','empatia',1]])]);
add('g11','CASA DE ISABELLA · NOITE','20:06','phone',`O grupo retorna à sala quando todos os celulares vibram praticamente ao mesmo tempo. Na tela aparece uma única mensagem enviada de um número privado:

“VOCÊS ACHAM QUE CONHECEM A HISTÓRIA TODA. ENTÃO POR QUE NINGUÉM PERGUNTOU QUEM ABRIU O PORTÃO DOS GOMES NAQUELA NOITE?”

Isabella: — Como essa pessoa continua sabendo quando a gente tá junto?

Samuel: — O portão? Não. Eu saí dirigindo e ele já tava aberto.

Laisla: — Tinha segurança na festa. Pode ter sido qualquer funcionário.

Breno: — Ou alguém que sabia que a Jullia ia tentar sair.

Rayssa: — Isso não muda o que a gente fez com ela. Mas pode explicar por que ela correu até a estrada.

No fim da mensagem há uma imagem granulada de um crachá preso a um cordão vermelho. Sem rosto. Sem nome legível.`,[
C('Salvar a imagem e comparar com registros da mansão','g12a',[['clue','cracha_portao_c5',true]]),
C('Pedir a Samuel que explique tudo que lembra do portão','g12b',[['flag','pressionou_samuel_portao_c5',true]]),
C('Insistir que ninguém investigue sozinho','g12c',[['flag','grupo_protegido_c5',true]])]);
add('g12a','SALA · A IMAGEM','20:14','house',`Você amplia a foto até os pixels virarem manchas. No canto do crachá aparece uma faixa azul que Isabella reconhece das equipes de apoio da propriedade.

Isabella: — Isso pode ser de um segurança. Ou de um funcionário. Não prova quem tava lá.

Breno: — Mas é um jeito de perguntar. A Helena pode saber quem trabalhou na festa. Só precisamos achar uma forma respeitosa de falar com ela.

A pista não resolve o mistério. Pelo menos agora vocês sabem o que procurar.`,[C('Guardar a nova pista','g13')]);
add('g12b','SALA · SAMUEL','20:14','house',`Samuel fecha os olhos, tentando montar a lembrança sem inventar detalhes.

Samuel: — Quando a gente saiu, o portão tava aberto e tinha um cara perto da guarita. Eu não vi o rosto. Eu tava irritado porque tinham derramado bebida na van e... porque eu já tinha bebido. Eu sei o que isso significa.

Rayssa: — Você consegue lembrar da roupa?

Samuel: — Escura. Talvez uniforme. Eu não vou jurar uma coisa que não tenho certeza.

Desta vez ele admite a dúvida em vez de transformar medo em certeza.`,[C('Registrar o depoimento sem acusá-lo','g13',[['clue','vigia_portao_c5',true]])]);
add('g12c','SALA · NOVO ACORDO','20:14','house',`Você: — Não vamos correr até outro lugar abandonado atrás de uma foto. Primeiro vamos juntar informação. Depois decidimos juntos.

Rauanny: — Amém. Uma noite sem o risco de cair de uma passarela, por favor.

Ryan: — Eu voto em pesquisa de sofá. Com pizza.

Isabella: — Pizza depois. Antes, a gente faz cópia de tudo e manda para mais de uma pessoa confiável.

O grupo concorda. Pela primeira vez, a resposta ao medo não é um impulso desesperado.`,[C('Encerrar a noite','g13',[['bond','isabella',3],['bond','rayssa',2]])]);
add('g13','LAKEWOOD · CASA DO PROTAGONISTA','23:38','phone',`Em casa, o silêncio parece diferente. Talvez porque você tenha finalmente feito uma escolha que diz respeito ao futuro, e não apenas ao passado.

Na tela do celular há novas fotos da marina, o áudio de Jullia guardado em mais de um lugar e a imagem do crachá. Em outra conversa, uma pessoa de quem você gosta espera uma resposta — ou um amigo oferecendo companhia sem cobrar nada.

O mistério continua: quem abriu o portão? Por que a pessoa na mata conhecia o caminho? E por que alguém parece tão interessado em fazer vocês repetirem o medo daquela noite?

Você fecha os olhos. No outro lado da cidade, um carro para diante da antiga guarita dos Gomes. Alguém desliga os faróis e espera.

A noite ainda não terminou.`,[C('Encerrar Capítulo 5 e registrar as decisões','fim09',[['flag','cap5_concluido',true]])]);
add('fim09','LAKEWOOD · FIM DE CAPÍTULO','23:59','lake',`FIM DO CAPÍTULO 5 — LAÇOS DE SANGUE.

O grupo continua dividido entre culpa e sobrevivência. Uma nova pista aponta para alguém que abriu o portão naquela noite. Sua decisão sobre romance — inclusive a de continuar solteiro — foi registrada e influenciará os próximos capítulos.

Os perigos ainda não acabaram. Mas, desta vez, talvez você não precise enfrentar tudo sozinho.`,[]);
window.NODES.fim08.choices=[C('CAPÍTULO 5 · Continuar a história','g01')];
window.HISTORIA.push(...E);for(const node of E){if(window.NODES[node.id])throw Error('ID duplicado: '+node.id);window.NODES[node.id]=node;}
})();
