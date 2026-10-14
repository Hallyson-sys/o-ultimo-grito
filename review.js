/* O ÚLTIMO GRITO · V1.0.1 — revisão editorial e social; mantém os IDs antigos para os três slots. */
(()=>{'use strict';
const nodes=window.NODES, all=window.HISTORIA;
if(!nodes || !all) throw Error('Carregue review.js depois de chapter6.js');
const P='PRÓLOGO · A NOITE EM QUE TUDO MUDOU';
const D='CAPÍTULO 02 · NINGUÉM ESTÁ SEGURO';
const F='CAPÍTULO 04 · FORA DE ALCANCE';
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const add=(id,chapter,location,time,scene,text,choices)=>{
 if(nodes[id])throw Error('Cena repetida: '+id);
 const n={id,chapter,location,time,scene,text,choices,speaker:'NARRAÇÃO'};
 nodes[id]=n;all.push(n);return n;
};
const edit=(id)=>{if(!nodes[id])throw Error('Cena ausente: '+id);return nodes[id]};
const link=(id,index,to)=>{const n=edit(id);if(!n.choices[index])throw Error(`Escolha ausente: ${id} #${index}`);n.choices[index].to=to};
// Os índices são históricos, não suposições sobre os nomes. Todos os efeitos sociais
// abaixo vêm de cenas realmente narradas. O retorno é compartilhado por ambas as fichas.
const socialRules={
 p02b:[['allan','samuel',-2]],
 p02c:[['rayssa','isabella',-1]],
 p04b:[['laisla','rauanny',-1],['ryan','laisla',2]],
 p08a:[['laisla','rauanny',-2],['ryan','rauanny',2]],
 p08b:[['allan','samuel',2]],
 p08d:[['rayssa','isabella',4]],
 px_rauanny:[['laisla','rauanny',-2]],
 p09:[['samuel','rayssa',-4]],
 p10a:[['rayssa','samuel',-4]],
 p10b:[['rayssa','isabella',-3]],
 p10c:[['allan','samuel',-5]],
 p12b:[['rayssa','isabella',2]],
 p12c:[['allan','samuel',-8]],
 p17:[['ryan','laisla',-5]],
 p23:[['rayssa','samuel',-12],['isabella','rayssa',-4]],
 p24a:[['samuel','rayssa',-5]],
 p24b:[['rayssa','isabella',-4]],
 p24c:[['allan','samuel',-6]],
 p25:[['samuel','breno',-4],['samuel','allan',-4]],
 p26a:[['samuel','breno',-5]],
 p26c:[['rayssa','samuel',-3]],
 p28:[['rayssa','samuel',-5],['laisla','rauanny',4]],
 c04r:[['isabella','rayssa',4]],
 c04y:[['ryan','laisla',3],['ryan','rauanny',3]],
 d13f:[['rayssa','rauanny',-2]],
 f03:[['allan','samuel',3],['rayssa','allan',-5]],
 f07:[['rayssa','allan',3]],
 f11v:[['allan','samuel',6]],
 f11m:[['allan','samuel',-10]],
 h07:[['laisla','rauanny',4]],
 h10:[['ryan','laisla',3]],
 h12:[['rayssa','isabella',3]],
 h17:[['rayssa','isabella',3]],
 h18b:[['isabella','rayssa',5]],
 h27:[['laisla','rauanny',6]]
};
const specific={
 p08a:[['Pedir a Rauanny', [['laisla','rauanny',3]]]],
 p23:[['Apoiar Rayssa',[['rayssa','samuel',-4]]],['Defender Samuel',[['rayssa','samuel',-3]]]],
 p24b:[['Apoiar Isabella',[['rayssa','isabella',-2]]]],
 f05:[['Apoiar Samuel',[['allan','samuel',2]]]]
};
window.UGReview={
 socialForChoice(id,label){
  const result=(socialRules[id]||[]).map(x=>[...x]);
  for(const [prefix,change] of (specific[id]||[]))if(String(label||'').startsWith(prefix))result.push(...change.map(x=>[...x]));
  return result;
 }
};

// PRÓLOGO: novos nós antes da van, mantendo a cena e as escolhas originais em rev_p_estrada.
const p01=edit('p01');
const original={...p01,id:'rev_p_estrada'};
nodes[original.id]=original;all.push(original);
Object.assign(p01,{
 location:'QUARTO DO PROTAGONISTA · FIM DE TARDE',time:'18:06',scene:'house',
 text:`A cidade ainda guarda o calor do fim da tarde. No quarto, o reflexo alaranjado da janela atravessa roupas largadas na cama: a festa de Jullia Gomes começa em pouco mais de uma hora. Seu celular vibra sem parar com mensagens do grupo.\n\nAllan: — ALGUÉM ME DIZ SE VAI DE PRETO OU SE EU SOU A ÚNICA PESSOA COM BOM GOSTO NESSE CARRO.\n\nIsabella: — Allan, você vai vestir o que quiser. Só não atrasa.\n\nBreno escreveu em particular: “O Samu passa aí daqui a pouco. Se você quiser, eu guardo um lugar do meu lado.”\n\nVocê se olha no espelho. É só mais uma festa, pensa. Ainda não sabe o tamanho da mentira que essa frase vai se tornar.`,
 choices:[C('Escolher uma roupa casual e confortável','rev_p_roupa_casual',[['flag','look_casual_prologo',true]]),C('Vestir algo mais arrumado para a festa','rev_p_roupa_chique',[['flag','look_elegante_prologo',true]]),C('Montar um visual alternativo e ousado','rev_p_roupa_alternativo',[['flag','look_alternativo_prologo',true]])]
});
add('rev_p_roupa_casual',P,'QUARTO · FRENTE DO ESPELHO','18:16','house',`Você escolhe uma camiseta que combina com tudo, uma calça confortável e um tênis que não machuca os pés. Melhor conseguir dançar e respirar do que passar a noite ajustando a roupa.\n\nIsabella responde à sua foto: — Finalmente alguém normal nesse grupo.\n\nAllan: — NORMAL? Eu sou contra esse conceito.\n\nA buzina curta de Samuel interrompe a discussão no celular.`,[C('Descer para encontrar a van','rev_p_van')]);
add('rev_p_roupa_chique',P,'QUARTO · FRENTE DO ESPELHO','18:16','house',`Você passa alguns minutos escolhendo uma combinação mais elegante. Confere os detalhes, ajeita o cabelo e dá um último passo diante do espelho.\n\nRyan responde à foto: — Ihhhh, tem alguém querendo deixar uma boa impressão!\n\nBreno manda só um coração discreto. Allan exige os créditos por ter inspirado o visual, mesmo não tendo ajudado em absolutamente nada.\n\nLá fora, a buzina de Samuel toca duas vezes.`,[C('Descer para encontrar a van','rev_p_van')]);
add('rev_p_roupa_alternativo',P,'QUARTO · FRENTE DO ESPELHO','18:16','house',`Você escolhe uma composição mais marcante: roupa escura, acessórios e um detalhe que faz o visual parecer realmente seu. Quando manda uma foto ao grupo, as respostas chegam quase juntas.\n\nRauanny: — AGORA SIM!\n\nLaisla: — Concordo. Só faltou me chamar pra escolher contigo.\n\nAllan: — Eu aprovo oficialmente. A diretoria da moda de Lakewood agradece.\n\nA buzina de Samuel atravessa a janela.`,[C('Descer para encontrar a van','rev_p_van')]);
add('rev_p_van',P,'CALÇADA · EM FRENTE À SUA CASA','18:27','road',`A van de Samuel está parada junto ao meio-fio, com a porta lateral aberta e o rádio tocando alto demais. Allan acena como se vocês fossem iniciar uma viagem de férias. Ryan tenta escolher a próxima música, enquanto Laisla ameaça pegar o celular dele.\n\nSamuel: — Entra logo, {nome}! Se eu perder o horário por sua causa, eu juro...\n\nIsabella: — Você saiu dez minutos atrasado da própria casa, Samuel.\n\nAllan: — Não briguem, crianças. O motorista precisa de concentração.\n\nRayssa reserva um espaço para suas coisas. Breno ergue a mão do banco ao lado da janela, oferecendo o lugar que prometeu.\n\nVocê sente o cheiro misturado de perfume, estofado velho e salgadinho aberto. Pela primeira vez no dia, tudo parece uma noite comum entre amigos.`,[
 C('Sentar ao lado de Breno e perguntar se está animado','rev_p_sentar_breno',[['bond','breno',4]]),
 C('Se juntar a Allan, Ryan e às brincadeiras','rev_p_sentar_grupo',[['bond','allan',3],['bond','ryan',3]]),
 C('Conversar com Rayssa e Isabella sobre Jullia','rev_p_sentar_amigas',[['bond','rayssa',4],['bond','isabella',3]])
]);
add('rev_p_sentar_breno',P,'VAN · BANCO DA JANELA','18:33','road',`Breno se afasta um pouco para você sentar. Ele sorri com aquela timidez que raramente mostra diante dos outros.\n\nBreno: — Achei que ia escolher o pessoal da bagunça.\n\nVocê: — Eles estão a dois bancos de distância. Se o Allan gritar, todo mundo vai ouvir.\n\nBreno ri, depois olha para as árvores que passam pela janela.\n\nBreno: — Eu só espero que a Jullia esteja melhor. Ela me pareceu triste nas últimas mensagens. Talvez hoje a gente possa perguntar como ela tá de verdade.\n\nVocês concordam em procurá-la quando chegarem. Allan chama os dois para uma foto e encerra o assunto com um flash que faz Samuel reclamar.`,[C('Seguir viagem com os amigos','rev_p_estrada')]);
add('rev_p_sentar_grupo',P,'VAN · BANCOS DE TRÁS','18:33','road',`Allan bate no assento livre ao lado dele.\n\nAllan: — Finalmente a pessoa que faltava! Ryan tá tocando as mesmas três músicas desde que entrou.\n\nRyan: — Chama-se bom gosto.\n\nLaisla: — Chama-se falta de repertório.\n\nRauanny: — Por favor, alguém troca antes que vocês dois comecem a cantar.\n\nVocê assume a missão de escolher uma música. Até Samuel acompanha o refrão por alguns segundos. Depois do coro desafinado, todos caem na risada. O caminho parece curto demais para tanta conversa.`,[C('Continuar a caminho da propriedade','rev_p_estrada')]);
add('rev_p_sentar_amigas',P,'VAN · BANCO DO MEIO','18:33','road',`Rayssa ajeita uma sacola de presente no colo. Isabella confere no celular se a fita do embrulho não descolou.\n\nIsabella: — Se a Jullia não gostar, vou fingir que essa ideia foi sua.\n\nRayssa: — Ela vai gostar. Você sabe que ela gosta de coisas feitas por amigos.\n\nVocê: — Ela tá melhor da discussão com Moisés?\n\nRayssa hesita antes de responder.\n\nRayssa: — Acho que ela tá tentando fingir que sim. Não precisa perguntar na frente de todo mundo, tá?\n\nIsabella: — A gente pode pelo menos dar a ela uma noite sem fazer julgamento.\n\nRayssa agradece com um olhar. O assunto termina quando Samuel anuncia que falta pouco para a propriedade.`,[C('Continuar a viagem','rev_p_estrada')]);

// Jullia também recebe tempo para conversar e ser pessoa antes da tragédia.
for(const id of ['p06a','p06b','p06c'])for(const option of edit(id).choices){if(option.to==='p07')option.to='rev_p_jullia_festa';}
add('rev_p_jullia_festa',P,'MANSÃO GOMES · SALA DE MÚSICA','20:00','party',`Jullia leva vocês até a sala onde o barulho da festa chega mais baixo. No sofá há uma caixa com velhas fotografias da família e uma almofada de que Bella vive implicando por estar sempre fora do lugar.

Jullia: — Eu sei que essa noite era pra ser divertida. Desculpa se eu tô estranha. É difícil explicar sem parecer ingrata.

Rayssa: — Não precisa pedir desculpa por não estar feliz.

Isabella: — A gente pode passar uns minutos aqui, sem música estourando o ouvido.

Jullia ri, agradecida. Bella surge à porta com um copo d'água e o coloca ao lado da irmã sem fazer discurso.

Bella: — Trouxe água. E não, você não vai me convencer a cantar no karaokê.

Jullia: — Eu nem falei nada!

Bella: — Eu conheço essa cara.

As irmãs trocam uma risada íntima. Jullia fala sobre querer viajar com Bella no fim das férias e voltar a fazer coisas pequenas, longe das expectativas dos pais. Pela primeira vez, você escuta um plano para o futuro dela, não apenas uma reclamação sobre a festa.`,[
 C('Incentivar Jullia a viajar com Bella quando puder','rev_p_jullia_fim',[['flag','promessa_bella_prologo',true]]),
 C('Dizer que ela pode contar com o grupo quando estiver mal','rev_p_jullia_fim',[['trait','empatia',1]]),
 C('Mudar o assunto para uma lembrança engraçada da escola','rev_p_jullia_fim',[['bond','rayssa',2]])
]);
add('rev_p_jullia_fim',P,'SALÃO GOMES · VOLTA À FESTA','20:12','party',`Jullia volta ao salão um pouco mais leve, embora ainda procure Moisés com os olhos.

Bella: — Se você cansar, me manda mensagem. Eu te ajudo a dar uma desculpa e subir.

Jullia: — Eu sei. Obrigada, Bel.

Bella abraça a irmã rapidamente e segue para ajudar os funcionários com uma confusão de lugares à mesa. Jullia agradece a você e aos amigos pela conversa antes de se afastar.

Rayssa comenta que talvez a noite ainda possa melhorar. Isabella diz que agora só falta alguém impedir Samuel de escolher a próxima música. Todos riem e caminham de volta para o jardim.`,[C('Voltar ao jardim e aos outros amigos','p07')]);

// Bella não é uma introdução súbita no capítulo 6: aparece na festa e tenta proteger a irmã.
edit('p05').text+=`\n\nPerto da escada, uma garota um pouco mais nova do que Jullia observa a recepção com a mesma preocupação. Jullia apresenta rapidamente: “Essa é a Bella, minha irmã. Se eu esquecer de respirar durante essa festa, ela me lembra.”\n\nBella: — É porque alguém precisa fazer esse trabalho.\n\nJullia sorri para a irmã, agora sem fingimento. O carinho entre as duas é evidente.`;
edit('p05').choices.push(C('Perguntar a Bella como Jullia está de verdade','rev_p_bella_sala',[['clue','bella_conhecia_jullia',true],['trait','empatia',1]]));
add('rev_p_bella_sala',P,'MANSÃO GOMES · PRÓXIMO À ESCADA','19:55','house',`Bella se afasta do barulho e observa Jullia rindo com os amigos. Não parece totalmente convencida pelo sorriso.\n\nBella: — Ela tava animada com vocês vindo. De verdade. Só que essa festa cresceu, o Moisés sumiu e ela ficou nervosa.\n\nVocê: — Vocês são próximas?\n\nBella: — A gente briga pela última fatia de bolo, se isso contar. Mas se ela me chama de madrugada, eu vou. E sei que ela faria o mesmo por mim.\n\nDo salão, Jullia acena. Bella responde levantando dois dedos e sorri. Antes de voltar à irmã, pede que vocês tentem fazer uma noite boa para ela.`,[C('Voltar para conversar com Jullia','p06a',[['flag','conheceu_bella_prologo',true]])]);
link('p14',0,'rev_p_bella_mata');
add('rev_p_bella_mata',P,'PROPRIEDADE GOMES · ENTRADA DA MATA','21:38','forest',`ENQUANTO ISSO — BELLA\n\nBella ouviu a discussão no jardim. Ela sai correndo pelos fundos da casa sem nem pegar o casaco. Jullia já alcançou os primeiros pinheiros, enxugando o rosto com as costas da mão.\n\nBella: — JULLIA! Espera! Pelo amor de Deus, conversa comigo!\n\nJullia olha por cima do ombro.\n\nJullia: — Vai embora, Bella. Eu não quero falar com ninguém!\n\nBella: — O Moisés é um cuzão, eu sei! Não precisa ficar sozinha por causa dele. Volta comigo. A gente entra, pega suas coisas e sai dessa festa ridícula.\n\nPor um instante, Jullia parece parar. Então ouve vozes mais atrás, perto do jardim, e se afasta outra vez.\n\nJullia: — Desculpa. Só preciso ficar longe daqui!\n\nBella tenta acompanhá-la, mas tropeça numa raiz e perde a silhueta escura entre os galhos. Quando chama de novo, não há resposta. Ela ainda não ouviu nenhum barulho de veículo. Não sabe onde a irmã foi parar.`,[
 C('Acompanhar Bella procurando a irmã perto da trilha','rev_p_bella_procura',[['clue','bella_perdeu_jullia',true]]),
 C('Voltar à van, sem saber o que ocorreu na mata','p15')
]);
add('rev_p_bella_procura',P,'MATA · TRILHA DOS FUNDOS','21:41','forest',`Bella tenta iluminar as marcas da trilha com a lanterna do telefone. Cada passo faz o mato estalar. Ao passar entre os galhos, Bella prende a manga da camiseta numa ponta seca. Um pequeno fio de tecido fica para trás. Ela arranca a roupa do espinho sem sequer olhar para o rasgo.\n\nBella: — Ju? Sou eu. Você pode ficar brava comigo amanhã, só responde agora.\n\nUm pássaro levanta voo e Bella dá um salto. A mata se divide em dois caminhos. Ela chama mais uma vez, até a voz falhar. Depois corre de volta para pedir ajuda na casa.\n\nNinguém ali imagina que, longe dali, a noite do grupo está prestes a se transformar em um desastre.`,[C('Voltar à van e aos amigos','p15')]);

// CAPÍTULO 2: Davi responde à pergunta escolhida e o encontro se encerra de forma orgânica.
link('d13f',0,'rev_davi_carro');link('d13f',1,'rev_davi_moises');link('d13f',2,'rev_davi_calma');
add('rev_davi_carro',D,'ANTIGO GALPÃO · FRENTE DA OFICINA','16:57','town',`Você pede a Davi que descreva o carro parado na estrada. Ele prende a respiração, como se a pergunta tivesse tirado dele a última chance de fingir que não viu nada.\n\nDavi: — Era escuro. Talvez cinza, talvez preto. Eu vi de longe. Não vou inventar placa nem modelo para parecer útil.\n\nIsabella: — Mas ele ficou parado por muito tempo?\n\nDavi: — Não sei. Quando voltei do depósito, já tinha ido embora. O que me assustou foi não ver farol aceso naquela curva.\n\nRayssa: — Você acha que alguém estava esperando a Jullia?\n\nDavi: — Não consigo dizer isso. Só consigo dizer o que vi.\n\nEle mostra o lugar no mapa e explica que a curva tem um acesso secundário, quase escondido pelas árvores.`,[C('Pedir autorização para registrar o mapa e agradecer','rev_davi_despedida',[['clue','carro_farol_apagado',true]]),C('Perguntar por que ele evitou falar disso antes','rev_davi_reserva',[['trait','cautela',1]])]);
add('rev_davi_moises',D,'ANTIGO GALPÃO · PORTA ABERTA','16:57','town',`Ao ouvir o nome de Moisés, Davi tira os óculos de proteção e os limpa com a camisa.\n\nDavi: — Vi o rapaz indo até o portão depois da discussão. Quando voltei com a chave da guarita, ele estava parado perto da fonte, olhando para a mata.\n\nBreno: — Ele foi atrás dela?\n\nDavi: — Não depois do portão. Não que eu tenha visto.\n\nIsabella: — E ele parecia preocupado?\n\nDavi: — Parecia nervoso. Só que nervoso pode significar um monte de coisas. Isso vocês sabem melhor que eu.\n\nVocê olha para Rayssa. Ela mantém os braços cruzados e não responde. Davi deixa claro que não possui provas para acusar ninguém.`,[C('Agradecer pela honestidade e encerrar a conversa','rev_davi_despedida',[['clue','moises_parou_portao',true]]),C('Perguntar sobre o portão lateral','rev_davi_reserva',[['clue','moises_parou_portao',true]])]);
add('rev_davi_calma',D,'ANTIGO GALPÃO · CALÇADA','16:57','town',`Você agradece antes de insistir. Davi relaxa um pouco a postura.\n\nDavi: — Achei que vocês fossem me tratar como os outros. Vieram aqui, perguntaram, escreveram metade e disseram que eu estava confundindo as coisas.\n\nRauanny: — Quem fez isso?\n\nDavi: — Gente querendo uma resposta rápida para uma história que não é simples. Não quero me meter em problema que não consigo resolver.\n\nVocê: — A gente também não quer colocar isso na sua conta. Só precisava ouvir sua versão.\n\nDavi pega um papel e anota o horário aproximado de seu turno naquela noite. Não é uma grande revelação, mas é algo que pode ser conferido depois.`,[C('Guardar o horário e se despedir com respeito','rev_davi_despedida',[['bond','rayssa',3],['clue','davi_turno_prologo',true]])]);
add('rev_davi_reserva',D,'ANTIGO GALPÃO · MESA DE FERRAMENTAS','17:03','town',`Davi abaixa a voz ao perceber que vocês ainda querem uma resposta.\n\nDavi: — Se eu disser que tenho medo, vão rir de mim?\n\nVocê: — Depois de tudo isso? Não.\n\nDavi: — Alguém andou fazendo perguntas por aqui meses depois do desaparecimento. Eu não vi o rosto direito e não sei se tem relação. Mas fiquei com a sensação de que era melhor não voltar àquele assunto.\n\nIsabella: — Você contou isso para alguém?\n\nDavi: — Pra polícia, na época. Não posso afirmar nada além disso.\n\nVocês deixam um telefone para caso ele se lembre de algum detalhe verificável. Davi hesita, mas concorda em guardar o número.`,[C('Prometer não divulgar o nome de Davi e ir embora','rev_davi_despedida',[['flag','respeitou_davi',true]])]);
add('rev_davi_despedida',D,'LAKEWOOD · SAÍDA DO GALPÃO','17:08','town',`Antes de vocês saírem, Davi fecha o portão devagar.\n\nDavi: — Esperem. A mãe da Jullia foi muito correta comigo, mesmo depois que pedi demissão. Se descobrirem alguma coisa de verdade... não deixem a família sabendo por boato, tá?\n\nRayssa: — A gente entende.\n\nEla diz isso quase num sussurro. Você percebe que a frase custou alguma coisa.\n\nDo lado de fora, Isabella confere as anotações. Breno sugere comparar o horário do turno com as fotos antigas, enquanto Rauanny pergunta se todos precisam comer antes da próxima busca. A conversa vai perdendo a tensão e, só depois de alguns minutos, vocês se despedem e seguem caminhos diferentes.`,[C('Reunir as informações antes de voltar para casa','d14',[['flag','davi_conversa_encerrada',true]])]);

// Uma discussão importante tem consequências distintas da simples narração de amizade.
edit('f03').text+=`\n\nRayssa encara Allan por tempo demais antes de voltar à questão da polícia.\n\nRayssa: — Você sempre fica do lado do Samuel, não importa o que ele diga. Às vezes parece que, pra você, defender ele é mais importante do que a Jullia.\n\nAllan: — Ray, porra, isso é injusto. Eu posso amar meu melhor amigo e achar que ele fez uma merda enorme. Eu tava naquela van também.\n\nRayssa: — Então por que você não fala isso na frente dele?\n\nAllan: — Porque eu tenho medo de perder mais uma pessoa. Não significa que eu ache que ele esteja certo.\n\nEla respira fundo, mas não pede desculpas. Allan se afasta da mesa para buscar água. Isabella troca um olhar com você: aquela amizade acabou de sofrer um desgaste que não desaparece só porque alguém muda de assunto.\n\nBreno espera até todos voltarem a se sentar antes de retomar as pistas. A discussão termina por enquanto, mas nenhum dos dois parece realmente em paz.`;

// CAPÍTULO 4: um segundo desenvolvimento para cada romance; escolhas não pulam para a reunião.
for(const [from,id] of [['f02ry','ryan'],['f02br','breno'],['f02ra','rayssa'],['f02ru','rauanny']]){
 for(const opt of edit(from).choices) if(opt.to==='f03') opt.to='rev_f4_'+id;
}
add('rev_f4_ryan',F,'CAFÉ · MESA PERTO DA VITRINE','12:49','town',`Ryan não solta a mão imediatamente. Por alguns segundos, fica olhando para o guardanapo amassado entre os copos.\n\nRyan: — Sabe o que eu fiz ontem? Deixei a televisão ligada pra não ouvir cada barulhinho da casa. Fiquei deitado esperando amanhecer. Ridículo, né?\n\nVocê: — Não é ridículo sentir medo.\n\nRyan: — Eu sei. Só que todo mundo espera que eu faça uma piada, e eu faço. Às vezes penso que, se parar, vou assustar mais vocês.\n\nEle força um sorriso, desiste e finalmente respira fundo.\n\nRyan: — Obrigado por não rir de mim quando eu falo sério. Eu quero que a gente continue tendo momentos normais, nem que seja uma tarde tomando esse café horrível.\n\nVocê percebe que ele não está pedindo uma promessa impossível. Está pedindo companhia.`,[C('Admitir que gosta desse lado sincero dele','rev_f4_ryan_fim',[['romance','ryan',6],['bond','ryan',3]]),C('Prometer que ele pode falar sem fazer graça','rev_f4_ryan_fim',[['bond','ryan',6]])]);
add('rev_f4_ryan_fim',F,'CAFÉ · SAÍDA','13:02','town',`Ryan paga a conta antes que você encontre a carteira e recebe uma reclamação bem-humorada por isso.\n\nRyan: — Próxima você paga. Isso significa que a gente vai se ver de novo, ouviu?\n\nEle acena ao se afastar e manda uma mensagem quando chega à esquina: “Se ficar ruim, me liga. Mesmo sem assunto.”\n\nVocê guarda o celular sentindo que a conversa terminou de verdade, não porque alguém interrompeu no meio.`,[C('Seguir para a reunião','f03')]);
add('rev_f4_breno',F,'JARDIM · BANCO DE MADEIRA','12:49','town',`Breno observa duas crianças correndo atrás de uma bola na praça. Ele parece aliviado por não precisar preencher cada silêncio.\n\nBreno: — Eu tive medo de você pensar que eu tava fugindo de você depois do acidente. E talvez eu estivesse mesmo. Não porque você fez alguma coisa comigo. Eu fugia do que a gente lembrava junto.\n\nVocê: — E agora?\n\nBreno: — Agora eu tô cansado de perder gente enquanto finjo que ficar distante é proteção.\n\nEle toca com o pé o seu tênis, um gesto quase infantil que faz os dois rirem.\n\nBreno: — Eu não sou muito bom em falar. Mas queria aprender, se você tiver paciência.\n\nA honestidade fica entre vocês por tempo suficiente para merecer uma resposta.`,[C('Dizer que quer construir essa confiança com ele','rev_f4_breno_fim',[['romance','breno',6],['bond','breno',5]]),C('Agradecer por ele ter falado de verdade','rev_f4_breno_fim',[['bond','breno',6]])]);
add('rev_f4_breno_fim',F,'PRAÇA · CAMINHO DE VOLTA','13:02','town',`Breno acompanha você até a calçada e para antes do cruzamento.\n\nBreno: — A gente conversa depois da reunião? Sem precisar ter um desastre pra isso?\n\nVocê concorda. Ele parece considerar o gesto durante alguns segundos, então finalmente sorri. Não há pressa em transformar a conversa em algo maior.`,[C('Encontrar os outros amigos','f03')]);
add('rev_f4_rayssa',F,'VARANDA DE RAYSSA · FIM DA MANHÃ','12:49','house',`Rayssa deixa a xícara na mesa e esfrega os olhos com a manga.\n\nRayssa: — Eu tinha uma foto com a Jullia aqui. Tirei porque minha mãe perguntava por que eu ficava olhando pra aquilo toda hora. Você acha que as pessoas conseguem esquecer de propósito?\n\nVocê: — Não sei. Acho que a gente aprende a conviver com lembranças.\n\nRayssa: — Às vezes penso que, se eu disser todas as coisas que sinto, ninguém mais vai conseguir olhar pra mim.\n\nO silêncio pesa. Ela aperta o tecido da blusa, percebe que exagerou e muda o tom.\n\nRayssa: — Desculpa. Você veio me fazer companhia e eu tô aqui chorando.\n\nVocê tem tempo para responder. Ela está realmente esperando ouvir o que você pensa.`,[C('Garantir que ela pode ser vulnerável com você','rev_f4_rayssa_fim',[['romance','rayssa',5],['bond','rayssa',5]]),C('Incentivá-la a conversar também com Isabella','rev_f4_rayssa_fim',[['bond','rayssa',4],['friendBond',['rayssa','isabella'],3]])]);
add('rev_f4_rayssa_fim',F,'CASA DE RAYSSA · PORTÃO','13:02','house',`Rayssa acompanha você até a porta e segura seu braço antes de se despedir.\n\nRayssa: — Obrigada por não tentar consertar tudo com uma frase bonita. Eu só precisava de alguém aqui.\n\nEla sorri, embora os olhos ainda estejam vermelhos. Você promete mandar mensagem depois da reunião. Ela espera você atravessar o portão antes de voltar para dentro.`,[C('Seguir até a reunião','f03')]);
add('rev_f4_rauanny',F,'CALÇADA · CAMINHO DA REUNIÃO','12:49','town',`Rauanny desacelera perto de uma banca fechada e encosta na parede. O braço ainda dói.\n\nRauanny: — Não fala pra Laisla que eu reclamei, tá? Ela vai trazer uma farmácia inteira e me obrigar a tomar cinco remédios.\n\nVocê ri, mas pergunta se ela precisa parar. Rauanny confirma que sim, por um minuto.\n\nRauanny: — Eu odeio que me vejam com medo. A Laisla sempre foi aquela pessoa com quem eu podia brigar de tudo, mas também a primeira que eu procurava quando ficava mal. Agora até ela tá assustada.\n\nVocê: — Então talvez você possa falar isso pra ela.\n\nRauanny: — Talvez. E talvez eu tenha que admitir que eu também preciso que alguém cuide de mim.\n\nEla olha nos seus olhos, um pouco desarmada pela própria confissão.`,[C('Prometer ficar ao lado dela, sem exigir que seja forte','rev_f4_rauanny_fim',[['romance','rauanny',6],['bond','rauanny',5]]),C('Sugerir que ela e Laisla conversem depois','rev_f4_rauanny_fim',[['bond','rauanny',5],['friendBond',['laisla','rauanny'],3]])]);
add('rev_f4_rauanny_fim',F,'CALÇADA · EM FRENTE À PRAÇA','13:02','town',`Rauanny se ajeita e insiste em continuar andando. Você acompanha o ritmo dela.\n\nRauanny: — Eu te avisei que sou chata, né?\n\nVocê: — Várias vezes.\n\nRauanny ri de verdade. Quando chegam à rua da reunião, agradece por você ter esperado sem apressá-la. A conversa termina com uma promessa de tomar alguma coisa juntos quando tudo estiver menos assustador.`,[C('Seguir para a reunião','f03')]);

// A perseguição no Capítulo 4 ganha preparação, perigo crescente e ramificações adicionais.
// Um resgate só é marcado como concluído quando Allan chega ao pátio, não ao escolher tentar.
for(const option of edit('f09').choices)option.effects=(option.effects||[]).filter(e=>!(e[0]==='flag'&&e[1]==='resgatou_allan_c4'));

for(const opt of edit('f09').choices){if(opt.to==='f10a')opt.to='rev_f4_coragem';else if(opt.to==='f10b')opt.to='rev_f4_ferramenta';else if(opt.to==='f10c')opt.to='rev_f4_corrida';}
add('rev_f4_coragem',F,'ESCADA DE SERVIÇO · PRIMEIRO PATAMAR','20:11','forest',`Você retorna alguns degraus e sente o piso vibrar sob a correria dos outros. Allan está preso pela alça da mochila; Samuel segura a grade, tentando impedir que ela se feche sobre o amigo.\n\nAllan: — NÃO PUXA ASSIM, SAMU! TÁ PRENDENDO MAIS!\n\nSamuel: — ENTÃO PARA DE SE MEXER!\n\nO mascarado aparece na passagem superior. A distância é pequena demais. Há uma porta auxiliar à direita, mas a maçaneta está parcialmente coberta por ferrugem. Se você se aproximar de Allan, pode ajudá-lo; se tentar a porta, talvez ganhe tempo para todos.`,[
 C('Puxar Allan enquanto Samuel segura a grade','f10a',[['flag','c4_iniciou_resgate',true]]),
 C('Tentar abrir a porta auxiliar primeiro','rev_f4_porta',[['flag','c4_busca_rota',true]]),
 C('Pedir que Samuel solte a grade e corra','rev_f4_erro',[['flag','c4_errou_samuel',true]])
]);
add('rev_f4_ferramenta',F,'ARQUIVO · PASSAGEM METÁLICA','20:11','forest',`Você procura algo que possa alcançar a mochila sem aproximar seu corpo da grade. As mãos tremem tanto que a primeira barra de ferro cai e quica no degrau de baixo.\n\nAllan: — TEM ALGUÉM AÍ?!\n\nVocê encontra uma peça de metal comprida, mas pesada, e um cabo de madeira com a ponta rachada. O perseguidor ainda está no corredor superior, procurando uma forma de entrar.\n\nBreno grita que a porta lateral foi aberta parcialmente. Samuel precisa de ajuda agora, mas escolher a ferramenta errada pode fazer vocês perderem tempo.`,[
 C('Usar a barra de metal resistente','f10b',[['flag','c4_ferramenta_forte',true]]),
 C('Tentar usar o cabo rachado','rev_f4_cabo',[['flag','c4_cabo_fragil',true]]),
 C('Abandonar as ferramentas e voltar até Allan','f10a',[['flag','c4_iniciou_resgate',true]])
]);
add('rev_f4_corrida',F,'ARQUIVO · SAÍDA PARA A RUA','20:11','road',`Você corre procurando uma maneira de chamar ajuda. O ar frio atinge seus pulmões, mas os gritos de Allan continuam chegando por trás das paredes.\n\nNo estacionamento, há um vigia num carro de manutenção. Ele ainda não viu o grupo. O caminho direto até ele é iluminado, mas expõe você à passagem lateral. Um outro caminho contorna o muro, mais seguro e mais demorado.\n\nVocê se força a escolher, mesmo sabendo que Samuel continua tentando libertar Allan.`,[
 C('Correr até o vigia e pedir socorro imediatamente','rev_f4_vigia',[['flag','c4_chamou_vigia',true]]),
 C('Contornar o muro para encontrar uma saída lateral','f10c',[['flag','c4_rota_longa',true]]),
 C('Desistir da fuga e voltar para ajudar Allan','rev_f4_coragem',[['flag','c4_voltou_pelo_amigo',true]])
]);
add('rev_f4_porta',F,'ESCADA DE SERVIÇO · PORTA AUXILIAR','20:12','forest',`A maçaneta gira só um pouco. Você firma os pés e empurra a porta com o ombro. Do outro lado há um depósito estreito e uma janela alta para a drenagem.\n\nO mascarado percebe o barulho e acelera os passos. Samuel chama seu nome com desespero. Você pode tentar convencer Allan a tirar a mochila e abandonar os objetos, ou insistir em abrir a passagem, mesmo perdendo tempo.`,[
 C('Gritar para Allan abandonar a mochila e ajudá-lo a passar','f10a',[['flag','c4_sem_mochila',true]]),
 C('Continuar forçando a porta mesmo com o assassino perto','rev_f4_erro',[['flag','c4_atraso_pesado',true]])
]);
add('rev_f4_cabo',F,'ESCADA DE SERVIÇO · GRADE','20:12','forest',`O cabo de madeira engancha na mochila por um segundo. Allan quase consegue se libertar. Então a ponta cede com um estalo seco.\n\nAllan: — NÃO! NÃO, PORRA!\n\nSamuel recua assustado. Você perde a ferramenta, e o mascarado já alcança o alto da escada. A grade chacoalha novamente.\n\nAinda existe uma chance de voltar e puxar Allan com as próprias mãos, mas vocês estarão expostos.`,[
 C('Voltar imediatamente e tentar puxá-lo','f10a',[['flag','c4_resgate_desesperado',true]]),
 C('Correr para a rua e buscar ajuda','f10c',[['flag','c4_atraso_pesado',true]])
]);
add('rev_f4_erro',F,'ESCADA DE SERVIÇO · SOB A PASSARELA','20:12','forest',`Samuel perde a força na grade. Allan escorrega e bate os joelhos no metal; o barulho denuncia exatamente onde vocês estão.\n\nAllan: — NÃO ME DEIXEM! SAMU, ME ESCUTA!\n\nVocê consegue segurá-lo pela manga, mas o mascarado já está do outro lado da porta. Breno, no degrau inferior, oferece uma lanterna para iluminar uma pequena trava que ninguém havia notado.\n\nSe vocês trabalharem juntos, talvez consigam abrir a passagem. Se correrem separados, Allan ficará exposto.`,[
 C('Aceitar a lanterna de Breno e abrir a trava juntos','f10a',[['flag','c4_resgate_desesperado',true],['bond','breno',3]]),
 C('Fugir pela passagem inferior sem olhar para trás','f10c',[['flag','c4_atraso_pesado',true]])
]);
add('rev_f4_vigia',F,'ESTRADA NORTE · ESTACIONAMENTO','20:13','road',`Você alcança o carro de manutenção e bate na janela com tanta força que o vigia quase deixa o telefone cair.\n\nVocê: — TEM GENTE PRESA LÁ DENTRO! LIGA PRA EMERGÊNCIA, POR FAVOR!\n\nO homem liga o alerta do veículo e pega um extintor na cabine. De longe, você escuta outra pancada na porta de metal. Ainda não sabe se Allan conseguiu sair.\n\nVigia: — Eu vou até a entrada. Você consegue mostrar o caminho?\n\nAgora a escolha é entre voltar com ajuda imediatamente ou esperar a polícia na rua.`,[
 C('Guiar o vigia até a escada e socorrer Allan','f10a',[['flag','c4_vigia_resgate',true]]),
 C('Permanecer na rua enquanto a ajuda se aproxima','f10c',[['flag','c4_rota_longa',true]])
]);
// Se já se chegou a f10a ou f10b numa partida antiga, a nova tensão ainda continua.
for(const opt of edit('f10a').choices){if(opt.to==='f11v')opt.to='rev_f4_ultima_corrida';}
for(const opt of edit('f10b').choices){if(opt.to==='f11v')opt.to='rev_f4_ultima_corrida';}
link('f10c',0,'rev_f4_ultima_corrida'); // a escolha segura antiga ganha última etapa de risco
add('rev_f4_ultima_corrida',F,'CANAL DE DRENAGEM · GRADE EXTERNA','20:15','forest',`Mesmo depois de Allan se soltar, ninguém consegue simplesmente sair correndo. A passagem desemboca numa rampa molhada. Samuel está ofegante, o braço de Allan sangra e há alguém batendo na porta superior.\n\nAllan: — Eu não aguento correr assim, cara!\n\nSamuel: — Aguenta só mais um pouco. Eu tô aqui.\n\nUma grade baixa separa o grupo do pátio. Ao lado, um corrimão enferrujado pode servir de apoio — ou quebrar com o peso. A curva da drenagem oferece outra saída, mais longa, mas menos escorregadia.\n\nVocê vê a mão de Allan tremendo quando ele tenta se erguer. O próximo erro pode custar caro.`,[
 C('Ajudar Allan a passar devagar pela grade, sem soltar sua mão','rev_f4_saida_segura',[['flag','c4_ultima_ajuda',true],['bond','allan',5]]),
 C('Mandar todos correrem pela rampa escorregadia','rev_f4_saida_risco',[['flag','c4_saida_arriscada',true]]),
 C('Escolher o desvio longo e manter o grupo junto','rev_f4_saida_desvio',[['flag','c4_desvio_escolhido',true]])
]);
add('rev_f4_saida_segura',F,'PÁTIO · EMERGÊNCIA','20:18','road',`Você segura Allan enquanto Samuel ajuda a passar a última grade. O metal corta a manga de Allan, mas não o derruba. Do lado de fora, Breno ilumina o caminho e Ryan grita para todos continuarem.\n\nAllan: — Eu vou te xingar por ter me feito passar por isso amanhã. Hoje eu só quero sair vivo.\n\nSamuel: — Amanhã você me xinga o quanto quiser.\n\nVocês se afastam da porta sem largar uns dos outros. Só quando chegam ao pátio Allan consegue parar e respirar.`,[C('Encontrar os outros na estrada','f11v',[['flag','allan_vivo_c4',true],['flag','resgatou_allan_c4',true]])]);
add('rev_f4_saida_risco',F,'RAMPA DE DRENAGEM','20:17','forest',`Os tênis derrapam na água acumulada. Allan tenta acompanhar Samuel, mas perde o apoio e cai contra o corrimão. Um estalo metálico faz todos se virarem.\n\nA figura mascarada aparece no alto da rampa. Se você conseguir puxar Allan agora, ainda haverá uma saída. Se correr para pedir ajuda, o barulho poderá atrair alguém — mas você não saberá o que aconteceu atrás.`,[
 C('Arriscar voltar e puxar Allan com Samuel','rev_f4_saida_segura',[['flag','c4_ultima_ajuda',true],['flag','ferida_protagonista_c4',true]]),
 C('Fugir para a estrada buscando reforços','f11m',[['flag','allan_morto_c4',true],['flag','morte_allan_c4',true]])
]);
add('rev_f4_saida_desvio',F,'TRILHA LATERAL · ARQUIVO','20:18','forest',`O grupo segue por uma passagem estreita entre o muro e as árvores. A rota é mais longa, mas o chão é firme. Allan manca e Samuel o apoia pelo ombro.\n\nA cada cinco passos alguém olha para trás. O perseguidor aparece por um instante do outro lado da grade, incapaz de alcançá-los por aquela passagem.\n\nBreno sinaliza do pátio. Só quando todos passam pela última cerca você percebe que está respirando sem parar há mais de um minuto.`,[C('Reencontrar o grupo no pátio','f11v',[['flag','allan_vivo_c4',true],['flag','c4_desvio_salvou',true]])]);
// remove o falso aviso de capítulo não disponível; chapter5.js já liga fim08 a g01
edit('fim08').text=`FIM DO CAPÍTULO 4 — FORA DE ALCANCE.\n\nA noite no arquivo da estrada norte mudou o grupo. Allan pode ter sido salvo — ou a perda dele pode ter deixado Samuel e os amigos num estado de choque impossível de esconder. Seus ferimentos, pistas e escolhas continuam registrados.\n\nO perigo não desapareceu com a fuga. Em Lakewood, o capítulo seguinte será sobre os vínculos que ainda restam e as decisões que ninguém poderá adiar para sempre.\n\nCAPÍTULO 5 · LAÇOS DE SANGUE DISPONÍVEL.`;
// Adições visíveis no menu das pistas, sem revelar a sobrevivência de Jullia.
window.UGRevisionClues={
 bella_conhecia_jullia:{title:'Bella na festa',category:'Prólogo',text:'Bella Gomes, irmã de Jullia, estava na festa e demonstrava preocupação sincera com ela.'},
 bella_perdeu_jullia:{title:'Bella procurou a irmã na mata',category:'Prólogo',text:'Depois da discussão de Jullia com Moisés, Bella tentou segui-la pela mata, mas perdeu o rastro.'},
 davi_turno_prologo:{title:'Horário do antigo funcionário',category:'Investigação',text:'Davi Moreira anotou seu turno da noite do desaparecimento; o horário pode ser comparado com outros relatos.'}
};
})();
