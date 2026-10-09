/* V0.8 — Capítulo 4: Fora de Alcance. A primeira morte é evitável. */
(()=>{
const N=(id,location,time,scene,text,choices=[])=>({id,chapter:'CAPÍTULO 04 · FORA DE ALCANCE',location,time,scene,text,choices,speaker:'NARRAÇÃO'});
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const E=[];
E.push(N('f01','QUARTO · MANHÃ','08:31','phone',`A foto da van continua aberta no seu celular. Alguém estava observando a estrada na noite do acidente. Mais perturbador: essa pessoa sabia o ponto exato em que vocês deixaram o corpo de Jullia afundar no lago.

Você mal dormiu. As palavras de Samuel continuam ecoando: “Eu vi alguém na mata”. Ele tinha um ano inteiro para contar isso. Escolheu o silêncio.

Seu celular vibra. Breno pergunta se você chegou bem. Ryan mandou uma mensagem tentando fazer graça e desistiu no meio. Rayssa quer ir à polícia; Rauanny responde que ainda dói levantar o braço depois do ataque.

Por baixo dessas notificações há uma nova mensagem anônima: “UM DE VOCÊS VAI FICAR PARA TRÁS HOJE.”`,[
C('Ligar para Breno e pedir que ele organize o grupo','f02b',[['bond','breno',4]]),C('Responder a Rayssa e apoiar a ideia de buscar ajuda','f02r',[['bond','rayssa',5],['flag','apoio_policia_c4',true]]),C('Procurar Samuel e perguntar o que mais ele esconde','f02s',[['bond','samuel',-2]])]));
E.push(N('f02b','QUARTO · TELEFONEMA','08:42','phone',`Breno atende antes do segundo toque.

Breno: — Eu ia te ligar. Vi a mesma mensagem. Não dormi nada.

Você: — Junta todo mundo. Não quero ninguém andando sozinho depois do que aconteceu.

Breno: — Eu cuido disso. E, {nome}... obrigado por me chamar antes de fazer uma besteira sozinho.

Você percebe a leveza na voz dele desaparecer quando alguém bate à porta de seu quarto.`,[C('Seguir para a reunião','f02rom')]));
E.push(N('f02r','QUARTO · MENSAGENS','08:42','phone',`Você: — Ray, eu concordo. Precisamos de ajuda. Não quero esperar alguém se machucar de novo.

Rayssa: — Obrigada. Eu achei que tava sozinha nisso.

Você: — Só que precisamos decidir como explicar as ameaças sem mentir mais.

Rayssa: — Um passo de cada vez. Primeiro, a gente precisa sobreviver a hoje.

Pela primeira vez, ela parece menos isolada na própria culpa.`,[C('Encontrar o grupo','f02rom')]));
E.push(N('f02s','QUARTO · TELEFONEMA','08:42','phone',`Samuel demora a atender e, quando atende, já está na defensiva.

Samuel: — Eu contei o que vi. Uma pessoa de casaco escuro perto da mata. Não vi rosto, não vi carro. Quer que eu invente mais?

Você: — Não. Quero que pare de decidir o que os outros merecem saber.

Samuel: — Justo. Eu mereci essa.

O pedido de desculpas vem seco, mas parece verdadeiro.`,[C('Ir à reunião','f02rom')]));
E.push(N('f02rom','RUA DE LAKEWOOD · CAMINHO DA REUNIÃO','12:22','town',`Antes da reunião, seu celular vibra de novo. O medo que liga o grupo também está criando uma proximidade estranha entre vocês. Talvez hoje você precise de uma conversa que não seja só sobre pistas.`,[C('Encontrar Ryan por alguns minutos','f02ry',[['bond','ryan',4],['romance','ryan',6]]),C('Conversar com Breno longe dos outros','f02br',[['bond','breno',4],['romance','breno',6]]),C('Procurar Rayssa e oferecer apoio','f02ra',[['bond','rayssa',4],['romance','rayssa',6]]),C('Acompanhar Rauanny até a reunião','f02ru',[['bond','rauanny',4],['romance','rauanny',6]]),C('Preferir ficar sozinho e refletir','f03',[['trait','cautela',1]])]));
E.push(N('f02ry','CAFÉ DA ESQUINA','12:37','town',`Ryan está tentando fazer uma piada sobre um cartaz de filme colado na vitrine, mas para ao perceber seu olhar cansado.

Ryan: — Eu podia dizer que tá tudo bem, mas a gente já passou dessa fase, né?

Você: — Faz tempo.

Ryan: — Só queria que você soubesse que eu não tô aqui só pras risadas. Se você precisar de alguém pra sentar junto sem falar nada, eu consigo. Por você eu consigo.

Ele oferece a própria mão sobre a mesa e espera sua reação sem forçar um sorriso.`,[C('Segurar a mão dele','f03',[['romance','ryan',5]]),C('Agradecer e preservar a amizade','f03',[['bond','ryan',4]])]));
E.push(N('f02br','JARDIM DA PRAÇA','12:37','town',`Breno se senta perto de você num banco afastado. Por um tempo, os dois só escutam o movimento da cidade.

Breno: — Todo mundo me pergunta se eu tenho alguma teoria. Ninguém pergunta se eu tô conseguindo dormir.

Você: — E você tá?

Breno: — Não. Mas quando eu consigo conversar com você, parece que eu respiro um pouco melhor. Não precisa responder nada bonito. Só... fica mais cinco minutos?

Ele mantém a distância suficiente para você decidir se quer se aproximar.`,[C('Apoiar a cabeça no ombro dele','f03',[['romance','breno',5]]),C('Ficar por perto como amigo','f03',[['bond','breno',4]])]));
E.push(N('f02ra','VARANDA DE RAYSSA','12:37','house',`Rayssa abre a porta segurando duas xícaras. Uma delas é para você.

Rayssa: — Eu me peguei pensando na Helena de novo. Ela acredita que a Jullia ainda pode voltar. E a gente sabe o que fez.

Você: — Eu sei. Não precisamos fingir aqui.

Rayssa: — Obrigada. É estranho, mas com você eu consigo admitir que tô com medo e continuar de pé.

Ela encosta os dedos nos seus. Os olhos estão úmidos, mas ela sorri.`,[C('Segurar a mão de Rayssa','f03',[['romance','rayssa',5]]),C('Prometer que continuará apoiando-a','f03',[['bond','rayssa',5]])]));
E.push(N('f02ru','CALÇADA · CASA DE LAISLA','12:37','town',`Rauanny tenta esconder a dor no braço enquanto ajusta a mochila. Você diminui o passo para acompanhá-la.

Rauanny: — Se você olhar pra mim desse jeito mais uma vez, eu vou achar que tô morrendo.

Você: — Só tô preocupado.

Rauanny: — Eu sei. E... obrigada. Não sou boa em falar essas coisas sem zoar, mas eu gosto de ter você por perto.

A provocação some por um instante, deixando algo sincero no lugar.`,[C('Dizer que quer ficar mais perto dela','f03',[['romance','rauanny',5]]),C('Brincar para aliviar o clima','f03',[['bond','rauanny',5]])]));
E.push(N('f03','CASA DE ISABELLA · TARDE','14:08','house',`A sala de Isabella virou uma central improvisada de investigação. Fotografias impressas, anotações, um mapa da marina e a gravação da fuga de Jullia estão espalhados sobre a mesa.

Allan: — Eu só queria informar que transformaram o lugar onde eu venho comer bolo num escritório de filme policial.

Isabella: — Então ajuda em vez de reclamar.

Laisla: — Rauanny não devia nem estar aqui com o braço daquele jeito.

Rauanny: — Eu não vou ficar em casa esperando uma pessoa mascarada decidir quando volta.

Ryan: — Tá, mas pelo menos hoje ninguém vai sozinho comprar água, né?

Samuel mantém a cabeça baixa. Rayssa tenta reunir coragem para tocar no assunto da polícia.

Você precisa decidir por onde começar.`,[
C('Analisar a gravação com Breno','f04a',[['bond','breno',4],['clue','audio_ruido_motor',true]]),
C('Investigar a fotografia da van com Ryan','f04b',[['bond','ryan',4],['clue','foto_van_origem',true]]),
C('Conversar com Rayssa e Rauanny sobre o risco','f04c',[['bond','rayssa',3],['bond','rauanny',3]])]));
E.push(N('f04a','SALA · MESA DE INVESTIGAÇÃO','14:18','house',`Breno desacelera o áudio de Jullia, mas toma cuidado para não transformar os sons em certezas.

Breno: — Escuta aqui. Depois que ela fala “tem alguém me seguindo”, aparece um ronco ao fundo. Pode ser motor. Pode ser gerador, talvez até o vento no microfone.

Você: — Mas é uma coisa para verificar.

Breno: — Exatamente. E eu queria que a gente parasse de confundir hipótese com prova.

Do sofá, Allan ergue o dedo.

Allan: — Obrigado, professor. Finalmente um adulto na sala.

Breno: — Tenho dezoito anos, Allan.

Allan: — Em maturidade, uns cinquenta.`,[C('Guardar a informação','f05')]));
E.push(N('f04b','SALA · JANELA','14:18','house',`Ryan amplia a fotografia da van. Ao fundo aparece a sombra de uma cabine de pedágio desativada, perto da estrada norte.

Ryan: — Se essa foto foi tirada dessa altura, alguém tava na encosta ou dentro da antiga cabine. Ninguém clicou isso sem querer.

Você: — Então dá pra descobrir de onde veio.

Ryan: — Talvez. Mas eu não tô afim de levar você lá sozinho, tá? Não depois da marina.

A última frase sai sem piada. Por um segundo, Ryan parece mais sério do que você já o viu.`,[C('Anotar a hipótese','f05')]));
E.push(N('f04c','SALA · SOFÁ','14:18','house',`Rauanny tenta esconder a dor ao se ajeitar no sofá. Rayssa observa e levanta a mão para ajudar, mas recua quando percebe que ela não quer parecer frágil.

Você: — Vocês precisam admitir quando estão com medo. Eu também tô.

Rauanny: — Tô apavorada, porra. Pronto. Falei. Melhorou?

Rayssa: — Melhorou. Porque agora a gente para de fingir.

Laisla: — Eu não vou perder você por orgulho, Rau.

Rauanny aperta a mão da amiga, que finge não estar chorando.`,[C('Voltar ao plano','f05')]));
E.push(N('f05','CASA DE ISABELLA · SALA','15:06','house',`Uma nova mensagem chega ao telefone de Allan. Dessa vez há endereço e horário: “ARQUIVO DA ESTRADA NORTE. 20H. UMA ÚLTIMA CHANCE DE SABER QUEM VIU TUDO.”

Samuel: — Isso é uma armadilha. Óbvio.

Allan: — Nossa, que bom ter um especialista.

Isabella: — A gente não vai entregar ninguém de bandeja. Podemos conferir de longe, com uma rota de fuga.

Breno: — E copiar a localização para várias pessoas. Se algo acontecer, teremos uma referência.

Você percebe que todos estão esperando uma decisão coletiva — exatamente o que faltou na noite do atropelamento.`,[
C('Traçar um plano com duas rotas de saída','f06a',[['flag','rota_segura_c4',true],['trait','cautela',2]]),
C('Pedir que todos levem lanternas e celulares carregados','f06b',[['flag','equipamento_c4',true],['bond','isabella',3]]),
C('Sugerir entrar depressa para não dar tempo ao agressor','f06c',[['trait','coragem',1]])]));
E.push(N('f06a','ESTRADA NORTE · FIM DE TARDE','19:54','road',`Antes de saírem, você desenha duas rotas no mapa. Breno compartilha a localização. Isabella avisa a pessoa de confiança que os buscará se algo der errado.

Allan: — É a primeira vez que a gente vai para um lugar horrível com um plano que não consiste em “vai dar bom”.

Samuel: — Não comemora antes da hora.

Você: — Ninguém vai ficar para trás.

A frase parece simples demais diante da escuridão que os espera.`,[C('Chegar ao arquivo','f07')]));
E.push(N('f06b','ESTRADA NORTE · FIM DE TARDE','19:54','road',`Isabella confere baterias, lanternas e os números de emergência. Rauanny faz piada sobre a organização, mas prende uma pequena lanterna à própria mochila.

Ryan: — Se sobreviver, vou fazer um curso pra virar gente precavida.

Rayssa: — Se sobreviver, você lava a louça na casa da Isa.

Ryan: — Tá bom, sem ameaças desnecessárias.

O riso dura pouco. À frente surge a cabine de arquivo desativada.`,[C('Entrar com cuidado','f07')]));
E.push(N('f06c','ESTRADA NORTE · FIM DE TARDE','19:54','road',`Você insiste em agir depressa. O grupo aceita a contragosto, mas ninguém se sente confortável.

Breno: — Coragem não é a mesma coisa que não pensar, {nome}.

Samuel: — Ele tem razão. Só porque a gente escapou ontem não significa que vai escapar sempre.

Ainda assim, vocês se aproximam da cabine. A fechadura está quebrada. Alguém os esperava.`,[C('Entrar','f07')]));
E.push(N('f07','ARQUIVO DA ESTRADA NORTE','20:04','house',`A cabine de concreto abandonada conserva mapas antigos, placas enferrujadas e caixas de documentos encharcados. Não há ninguém à vista.

Allan encontra um envelope com o nome de Jullia escrito em tinta vermelha. Dentro há uma cópia da fotografia da van — e um bilhete novo: “O PRÓXIMO CORPO NÃO VAI PARA O LAGO.”

Allan: — Não. Não, não, não. Eu não vou ficar aqui com isso.

Rayssa: — Allan, olha pra mim. Respira.

Você ouve a porta de metal bater atrás de vocês. Todas as luzes apagam. Um ruído pesado raspa pelo corredor. A figura mascarada entrou.`,[
C('Mandar Allan e Samuel abrirem a saída de manutenção','f08a',[['flag','rota_allan_samuel_c4',true]]),
C('Pedir que Ryan e Breno procurem o quadro elétrico','f08b',[['bond','breno',2],['bond','ryan',2]]),
C('Ligar para emergência e manter o grupo junto','f08c',[['flag','chamou_emergencia_c4',true]])]));
E.push(N('f08a','ARQUIVO · CORREDOR LATERAL','20:07','house',`Allan puxa Samuel pela manga. Os dois tentam deslocar a trava enferrujada da porta de manutenção.

Allan: — Samuel, mais pra cima! Não é possível que o cara que tem uma van não saiba abrir uma maldita porta!

Samuel: — Quer trocar de lugar, porra?

A tranca cede com um estalo. Do outro lado, uma escada leva a um pátio cercado. Antes que alcancem os degraus, o agressor aparece na penumbra e avança.`,[C('Correr para o pátio','f09')]));
E.push(N('f08b','ARQUIVO · SALA ELÉTRICA','20:07','house',`Ryan e Breno alcançam o quadro elétrico. Uma lanterna ilumina fios soltos e um disjuntor queimado.

Ryan: — Eu sou bonito, não eletricista!

Breno: — Só segura a luz e não encosta em nada.

As lâmpadas piscam por um segundo. Tempo suficiente para todos enxergarem a figura mascarada na porta, mais perto do que deveriam permitir.`,[C('Sair pela passagem de serviço','f09')]));
E.push(N('f08c','ARQUIVO · RECEPÇÃO','20:07','house',`Você disca para a emergência, informa o endereço e diz que alguém armado está ameaçando o grupo. Evita inventar explicações para o verão passado.

Uma voz do outro lado promete enviar ajuda. Antes que a ligação termine, a máscara surge no reflexo do vidro.

Isabella: — ABAIXA!

O grupo se joga atrás do balcão. Um golpe abre uma rachadura no vidro, espalhando cacos e gritos.`,[C('Buscar a saída de manutenção','f09')]));
E.push(N('f09','ESCADA DE SERVIÇO · ARQUIVO','20:11','forest',`A saída de manutenção desemboca numa escada estreita acima de um canal de drenagem. A água corre forte depois da chuva. O grupo se divide por poucos metros, mas cada segundo agora parece uma eternidade.

Na frente, Allan tenta ajudar Samuel a passar por uma grade parcialmente solta. Atrás, o agressor força a porta. Um impacto brutal faz a grade tremer.

Samuel: — O Allan tá preso! A mochila dele enganchou!

Allan: — TÔ VENDO, SEU ANIMAL! ALGUÉM ME AJUDA!

Você pode correr até ele, tentar libertá-lo de longe com a barra caída ou priorizar a saída, esperando que Samuel resolva.`,[
C('Voltar e arrancar a mochila de Allan com as mãos','f10a',[['flag','resgatou_allan_c4',true],['bond','allan',9]]),
C('Usar a barra de ferro para desprender a mochila sem se aproximar','f10b',[['flag','tentou_barra_c4',true],['trait','cautela',1]]),
C('Gritar para Samuel ajudá-lo e correr para buscar apoio','f10c',[['flag','deixou_samuel_salvar_allan_c4',true]])]));
E.push(N('f10a','ESCADA DE SERVIÇO','20:13','forest',`Você volta contra o fluxo de pessoas. O metal frio da grade corta sua palma quando puxa a mochila de Allan com força. A alça arrebenta.

Allan: — {nome}, CARALHO! VOCÊ VOLTOU!

Você: — Não comemora ainda! CORRE!

O perseguidor chega à porta no instante em que vocês atravessam. Samuel ajuda Allan a levantar e os três descem correndo, feridos, mas vivos.`,[C('Escapar até o pátio','f11v',[['flag','allan_vivo_c4',true],['flag','ferida_protagonista_c4',true]])]));
E.push(N('f10b','ESCADA DE SERVIÇO','20:13','forest',`Você empurra a barra de ferro por entre as grades. A primeira tentativa escorrega; na segunda, o gancho de tecido se solta. Allan cai de joelhos, livre, mas a barra bate com força na parede.

O agressor ouve. A máscara vira em sua direção.

Samuel: — Vai, Allan! Eu seguro a porta!

A janela de fuga é curta demais para desperdiçar.`,[
C('Agarrar Allan e correr sem olhar para trás','f11v',[['flag','allan_vivo_c4',true],['bond','allan',7]]),
C('Procurar uma saída mais curta pela drenagem','f11v',[['flag','allan_vivo_c4',true],['flag','ferida_allan_c4',true]])]));
E.push(N('f10c','PÁTIO DE DRENAGEM','20:13','road',`Você corre em busca de ajuda. Atrás, Samuel luta com a mochila de Allan. O barulho da grade batendo se mistura aos gritos dos dois.

Samuel: — ALLAN, SOLTA ESSA MERDA!

O metal estala. Alguém cai. A porta do arquivo se abre de vez.

Você chega à curva do pátio e percebe que não consegue ver o que aconteceu com eles.`,[
C('Voltar imediatamente com uma lanterna e ajudar','f11v',[['flag','allan_vivo_c4',true],['flag','ferida_samuel_c4',true]]),
C('Continuar até a rua para chamar ajuda','f11m',[['flag','allan_morto_c4',true],['flag','morte_allan_c4',true]])]));
E.push(N('f11v','ESTRADA NORTE · PÁTIO','20:19','road',`Vocês emergem entre as árvores, tossindo e ofegando. Allan encosta na parede, tremendo. Uma parte de sua camisa está rasgada, mas ele está vivo.

Allan: — Não sei se eu vou rir ou vomitar. Talvez os dois.

Samuel encosta ao lado dele, exausto.

Samuel: — Você nunca mais vai me fazer sair para uma dessas reuniões, ouviu?

Allan: — Eu? VOCÊ dirigiu a van do inferno que começou essa história!

Os dois riem por meio segundo e depois se abraçam. Lá atrás, o agressor desaparece na escuridão.`,[C('Esperar os outros e voltar para Lakewood','f12',[['flag','allan_vivo_c4',true]])]));
E.push(N('f11m','ESTRADA NORTE · PÁTIO','20:19','road',`Você corre até a estrada e consegue sinalizar para um carro. Quando volta com ajuda, as portas do arquivo estão abertas e Samuel está caído perto da grade, atordoado.

Samuel: — Eu tentei... eu tentei tirar ele dali, {nome}.

Allan não responde. O grupo encontra o amigo imóvel na passagem, e o silêncio que se segue é mais terrível que qualquer grito. A chegada da emergência confirma o que ninguém queria ouvir: Allan morreu durante o ataque.

Rayssa desaba. Ryan fica sem voz. Samuel não consegue olhar para você. Uma escolha naquela escada mudou a história de Lakewood para sempre.`,[C('Acompanhar os amigos depois da tragédia','f12',[['flag','allan_morto_c4',true],['flag','morte_allan_c4',true]])]));
E.push(N('f12','LAKEWOOD · MADRUGADA','00:16','phone',`As luzes da cidade parecem distantes. O grupo não voltou inteiro da mesma maneira que saiu. Mesmo quem sobreviveu sabe que a noite mudou alguma coisa para sempre.

No celular do protagonista, o agressor envia uma última mensagem: “VOCÊS ME DERAM O QUE EU QUERIA. MAS A VERDADE AINDA ESTÁ NO FUNDO DO LAGO.”

Na tela de Isabella, o nome de Jullia continua entre os contatos favoritos. Seu último áudio, gravado durante a fuga, foi salvo em três dispositivos para que ninguém possa apagá-lo outra vez.

Você olha para a linha escura das árvores. O Capítulo 5 exigirá escolhas que não poderão ser adiadas para sempre — inclusive sobre quem você quer ao seu lado.`,[C('Encerrar o capítulo 4','fim08',[['flag','cap4_concluido',true]])]));
E.push(N('fim08','LAKEWOOD · CRÉDITOS DO CAPÍTULO','00:24','lake',`FIM DO CAPÍTULO 4 — FORA DE ALCANCE.

Você chegou ao fim do capítulo. O destino de Allan dependeu das decisões tomadas durante a fuga. Seu histórico, suas pistas e os romances continuam registrados no salvamento.

O CAPÍTULO 5 AINDA NÃO ESTÁ DISPONÍVEL NESTA VERSÃO.

Quando ele chegar, você poderá escolher um romance definitivo ou seguir solteiro. Nenhum romance será selecionado automaticamente.`,[]));
window.NODES.fim07.choices=[C('CAPÍTULO 4 · Continuar a história','f01')];
window.HISTORIA.push(...E);
for(const node of E){if(window.NODES[node.id])throw Error('ID duplicado: '+node.id);window.NODES[node.id]=node;}
})();
