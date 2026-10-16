/* O ÚLTIMO GRITO — CAPÍTULO 8: ÁGUAS TURVAS · V1.2
   Spoiler-free player dialogue. Never expose authorship of crimes in runtime.
   Choices, injuries, investigation, witnesses and whereabouts are per save slot.
*/
(()=>{'use strict';
const TITLE='CAPÍTULO 08 · ÁGUAS TURVAS',nodes=[],seen=new Set();
const L={rayssa:'Rayssa',ryan:'Ryan',laisla:'Laisla',samuel:'Samuel',rauanny:'Rauanny',allan:'Allan',isabella:'Isabella',breno:'Breno'};
const ids=Object.keys(L);const F=(k,v=true)=>['flag','c8_'+k,v],S=(k,v)=>['set','c8_'+k,v],Q=x=>['clue',x],B=(id,n)=>['bond',id,n],FB=(a,b,n)=>['friendBond',[a,b],n];
const C=(text,to,effects=[],requires=null)=>({text,to,effects,requires});const G=(to,label='Continuar',effects=[])=>C(label,to,effects);
function N(id,location,time,scene,text,choices=[]){if(seen.has(id)||window.NODES?.[id])throw Error('ID duplicado '+id);seen.add(id);nodes.push({id,chapter:TITLE,location,time,scene,text,choices});}
const dead=(s,id)=>!!s?.flags?.['c8_morto_'+id]||window.UG7?.dead?.(s,id)||!!s?.flags?.['c6_morto_'+id]||(id==='allan'&&!!s?.flags?.allan_morto_c4);
const heavy=(s,id)=>!!s?.flags?.['c8_grave_'+id]||!!s?.flags?.['c7_ferido_'+id]||!!s?.flags?.['c6_ferida_'+id]||(window.UGConsequences?.injury?.(s,id)?.severity||0)>=2;
const trust=(s,id)=>Number(window.UG107?.pairTrust?.(s,'hero',id)??(s?.bonds?.[id]??50));
const alive=s=>ids.filter(x=>!dead(s,x)); const invited=s=>ids.filter(x=>s?.flags?.['c8_join_'+x]&&!dead(s,x));
const listing=arr=>arr.length<2?(arr[0]||'ninguém'):arr.length===2?arr.join(' e '):arr.slice(0,-1).join(', ')+' e '+arr[arr.length-1];
const names=xs=>listing(xs.map(x=>L[x]||x));
const hero=s=>s?.hero?.name?.trim()?.split(' ')[0]||'Você';
const FURTHER={
 rayssa:'Rayssa esfrega o polegar sobre a borda da própria pulseira, olhando o aparelho desligado como se ele pudesse voltar a vibrar.',
 ryan:'Ryan tira o boné, passa a mão pelos cabelos e coloca o boné de novo. Não encontra graça nem nas palavras que normalmente faria parecer leves.',
 laisla:'Laisla mantém as mãos fechadas no colo. A lembrança do próprio apartamento faz cada barulho no corredor parecer uma nova invasão.',
 samuel:'Samuel se levanta tão rápido que a cadeira arranha o chão. Sua raiva parece estar lutando contra o medo de confessar o que aconteceu na estrada.',
 rauanny:'Rauanny apoia o cotovelo na mesa, protegendo discretamente o braço machucado. A voz firme não esconde o cansaço.',
 allan:'Allan começa a fazer uma piada, mas a engole antes do fim. Olha para Samuel como quem pede que ele não piore as coisas.',
 isabella:'Isabella abre o histórico do grupo e alinha três horários na tela. O silêncio dela é tão duro quanto qualquer acusação.',
 breno:'Breno fica junto da porta. Ele percebe antes dos outros que ninguém está prestando atenção em quem realmente recebeu a mensagem.'
};
const accusatory={
 samuel:'Samuel: — Essa pessoa sabe da van, sabe da oficina, sabe até quando a gente consegue respirar. E vocês continuam agindo como se fosse um estranho qualquer!',
 isabella:'Isabella: — Se a gente não comparar horários, vamos transformar qualquer amizade numa sentença. Quem apagou mensagem precisa falar agora.',
 rauanny:'Rauanny: — Eu não vou aceitar que fiquem apontando dedo pra quem quase morreu tentando ajudar. Mas alguém tá escondendo alguma coisa, sim.',
 laisla:'Laisla: — Eu convidei vocês pra minha casa. Pra MINHA CASA. Como é que alguém entrou lá e tirou uma foto de dentro?',
 breno:'Breno: — Vocês perceberam que tão perguntando mais quem parece culpado do que quem teve acesso às informações?',
 ryan:'Ryan: — Não é porque a gente tá com medo que pode sair condenando os outros. Eu também tô com medo. Pra caralho.',
 allan:'Allan: — Eu já vi gente terminar amizade por mensagem fora de contexto. Dessa vez tem sangue na história. Pelo amor de Deus, pensem antes de acusar.',
 rayssa:'Rayssa: — Eu não quero perder mais ninguém. Só queria que vocês parassem de falar uns com os outros como inimigos.'
};
N('k8_01','HOSPITAL · SALA RESERVADA','00:48','house',`PONTO DE VISTA: PROTAGONISTA

A terceira mensagem aparece na tela de todos os aparelhos: «Boa noite, traidores.»

O relógio do corredor avança mais um minuto. A funcionária da recepção passa ao lado da porta sem entrar. Na sala reservada, os sobreviventes não se levantam. Ninguém quer ser a primeira pessoa a olhar para outra.

O celular de Moisés, ou o pouco que restou dele, está sendo examinado. A notícia de sua morte ainda não se assentou: um rapaz que ligou pedindo ajuda acabou morto antes que pudesse terminar uma frase. Vocês conheciam seu rosto, suas mentiras, seu medo.

Você põe o telefone de frente para a mesa.

Você: — Não dá pra fingir que essa mensagem não chegou pra todos nós.

Ninguém discorda. O que começa como silêncio logo se transforma em vozes sobrepostas. Não é só a ameaça. É o fato de terem sobrevivido a tantas noites e ainda não conseguirem explicar quem está entregando seus passos.

A policial pediu que preservassem o histórico. As mensagens continuam intactas, iluminando a mesa como pequenas acusações.`,[G('k8_02','Ouvir as acusações antes de tomar partido'),G('k8_02','Pedir calma e exigir que confiram os horários',[['trait','cautela',1]])]);
N('k8_02','HOSPITAL · SALA RESERVADA','00:52','house',`O começo da discussão é desordenado. A morte de Moisés coloca uma pergunta sobre cada cadeira ocupada: quem sabia onde ele estaria? As vozes se cruzam; uma cadeira arranha o piso e uma mão bate na mesa com força suficiente para silenciar o corredor.

A porta permanece encostada. Do lado de fora, passos se aproximam, param e se afastam novamente. Você reconhece essa dinâmica: na noite do acidente, os amigos também falaram todos de uma vez até que o grupo tomou uma decisão terrível.

As vozes diminuem quando percebem que você não respondeu. Alguns olham para você esperando apoio. Outros parecem esperar uma confissão.

Você consegue se lembrar de quem recebeu a localização da oficina, mas isso não significa que o assassino precisou de uma mensagem do grupo para encontrar Moisés.

É hora de escolher como entrar na discussão.`,[]);
N('k8_accuse_self','HOSPITAL · PORTA FECHADA','00:55','house',`Um dos sobreviventes se volta para você. O jeito como pronuncia seu nome não parece uma pergunta. Parece uma tentativa desesperada de encontrar alguma certeza.

Você sente o peso da noite inteira pousar sobre a sua resposta. Contar a verdade sobre o encontro com Moisés pode significar admitir omissões. Reagir com raiva pode fechar as últimas portas de confiança.

Uma segunda voz se intromete antes que você abra a boca. Os amigos não concordam nem sobre o que viram na oficina. Ainda assim, a acusação chega até você.

Você precisa responder sem se esquecer de que essas pessoas também têm motivos para estar apavoradas.`,[
 C('Mostrar as mensagens e explicar a sequência completa','k8_conflict',[F('exibiu_celular'),['trait','franqueza',2],Q('c8_horarios_conferidos')]),
 C('Contar apenas a parte do encontro que pode provar','k8_conflict',[F('omitiu_discussao'),['trait','cautela',1]]),
 C('Acusar quem começou a discussão de procurar um culpado fácil','k8_conflict',[F('reagiu_acusacao'),['trait','impulsividade',2]])]);
N('k8_defend','HOSPITAL · SALA RESERVADA','00:56','house',`Você escolhe defender uma pessoa. O barulho diminui por um instante — não porque o grupo concordou, mas porque percebeu que você está disposto a perder a confiança de alguém para impedir uma acusação sem provas.

A pessoa defendida evita seu olhar por alguns segundos. Outra se afasta da mesa, magoada. Não existe uma resposta que recomponha todos os vínculos de uma vez.

Isabella, se ainda puder acompanhar a conversa, tenta reconstruir as mensagens. Não basta lembrar que o endereço circulou: é necessário saber a hora exata, o destinatário e quem poderia ter visto as notificações.

Você pede que todos guardem as capturas antes que alguém apague tudo num acesso de raiva.`,[G('k8_conflict','Aceitar que a discussão deixou marcas',[F('defendeu_alguem')])]);
N('k8_conflict','HOSPITAL · CORREDOR','01:02','house',`A discussão não acaba com um pedido de desculpas. Termina porque a enfermeira pede silêncio e porque ninguém tem fôlego para continuar gritando.

Alguns amigos se despedem de forma mecânica. Outros não olham para você. A porta se fecha devagar; não existe vitória naquele silêncio.

Você fica parado no corredor, ouvindo o ar-condicionado. Na tela, a conversa do grupo permanece aberta. Agora toda palavra digitada parece carregar uma segunda intenção.

Lá fora, a chuva começa a bater nas vidraças do hospital. A próxima vez em que precisar pedir ajuda talvez não baste escrever «vem comigo».

Você olha os nomes que continuam no grupo. Alguns já não poderão responder nunca mais.`,[G('k8_03','Deixar que a madrugada termine')]);
N('k8_03','HOSPITAL · MANHÃ SEGUINTE','08:13','town',`PONTO DE VISTA: PROTAGONISTA

O dia amanhece cinzento, com um noticiário repetindo as poucas informações liberadas sobre o ataque na oficina. A reportagem não tem todas as respostas. Você também não.

Na recepção, uma senhora discute sobre o horário de visita. O cheiro de café recém-passado chega do corredor. O hospital funciona com sua indiferença habitual: alguém recebe alta enquanto outra família aguarda notícias.

Uma investigadora confirma que o local onde Moisés morreu foi isolado, mas não apresenta conclusões sobre a pessoa mascarada. A equipe ainda está organizando ligações e possíveis testemunhas.

Investigadora: — Se vocês encontraram documentos, não editem as imagens. Mandem as cópias com as datas originais. E não entrem em lugares abandonados por conta própria.

O aviso soa razoável. Isso não faz a vontade de descobrir a verdade desaparecer.

Seu telefone mostra conversas interrompidas. Amigos que poderiam ter escrito «bom dia» preferiram não escrever nada depois da discussão.`,[G('k8_04','Procurar notícias dos amigos'),G('k8_04','Perguntar sobre as investigações',[['trait','cautela',1]])]);
N('k8_04','HOSPITAL · ÁREA EXTERNA','08:34','town',`Bella Gomes está perto da porta automática, olhando uma foto antiga no celular. Veste uma jaqueta folgada, calça larga e tênis gastos de tanto andar pela cidade nos últimos dias. A indiferença que tenta mostrar não combina com o jeito em que aperta a mandíbula.

Bella: — Eu recebi uma ligação da polícia. Não vou fingir que fui amiga do Moisés. Mas ele era uma das últimas pessoas que podia me contar alguma coisa sobre a Ju.

Você: — Eu sei.

Bella: — Não, acho que não sabe. Eu passei um ano ouvindo que precisava seguir em frente. Aí o cara decide falar e morre antes de terminar. Me diz como é que eu sigo em frente disso.

O silêncio entre vocês é interrompido por um ônibus freando na rua. Bella ergue os olhos para o outro lado da avenida, onde as pessoas cruzam a faixa com pressa.

Bella: — Tô conseguindo consultar uns arquivos de manutenção. Não quero te arrastar pra nada, mas eu vou olhar. E se você aparecer, não vai poder me oferecer uma mentira bonita e esperar que eu agradeça.

A última frase fica entre vocês, mais pesada do que um convite.`,[
 C('Perguntar se ela quer companhia e prometer transparência','k8_05',[F('bella_confianca'),['trait','empatia',2]]),
 C('Oferecer somente as provas que já foram preservadas','k8_05',[F('bella_provas'),['trait','cautela',1]]),
 C('Dizer que ela está se colocando em risco demais','k8_05',[F('bella_advertida'),['trait','coragem',1]])]);
N('k8_05','BIBLIOTECA DE LAKEWOOD · ARQUIVO','12:04','town',`PONTO DE VISTA: BELLA GOMES

A biblioteca municipal não tem o cheiro de lugar onde se encontra um segredo. Cheira a papel úmido, produtos de limpeza e café frio. Bella coloca um caderno sobre a mesa e abre o arquivo de solicitações que conseguiu consultar com autorização da funcionária.

Nas últimas semanas, descobriu mais sobre contratos de limpeza, troca de lâmpadas e manutenção de bombas do que gostaria de saber na vida inteira. Mas há uma instalação antiga junto ao lago que aparece diversas vezes nas ordens de serviço.

Ela bate a ponta da caneta sobre o nome da estação.

Bella: — Você não era nem pra estar funcionando, porra.

Uma bibliotecária a observa da outra ponta do balcão.

Bibliotecária: — Alguma coisa?

Bella: — Nada. Tô xingando documento. É um hobby caro, aparentemente.

A mulher volta ao computador. Bella abre mais uma pasta, procurando datas, números de protocolo e assinaturas. Não está caçando uma lembrança da irmã. Está procurando algo que possa verificar sem depender da palavra de ninguém.`,[
 C('Examinar as ordens de serviço da estação','k8_archive_service',[F('arquivo_servico'),Q('c8_ordens_estacao')]),
 C('Conferir os registros de acesso aos estabelecimentos','k8_archive_store',[F('arquivo_farmacia'),Q('c8_passagem_farmacia')]),
 C('Procurar fotografias antigas da estrada e das passarelas','k8_archive_photo',[F('arquivo_fotos'),Q('c8_foto_passarela')])]);
N('k8_archive_service','BIBLIOTECA · REGISTROS DE SERVIÇO','12:17','town',`PONTO DE VISTA: BELLA GOMES

Há três ordens de manutenção para a velha estação: uma antes do desaparecimento de Jullia, uma parcialmente cancelada e uma terceira lançada meses depois. O campo do solicitante está marcado com um código administrativo que não identifica uma pessoa.

Bella confere o cabeçalho e o rodapé. As folhas foram digitalizadas em datas diferentes. Uma anotação à mão recomenda procurar a planta do canal de drenagem antes de entrar na área das bombas.

Bella: — Finalmente uma pessoa nessa cidade teve a decência de escrever alguma coisa útil.

Ela fotografa a anotação e amplia o desenho do prédio. A entrada principal leva à sala das bombas; a passagem externa segue até a margem; uma saída de serviço termina na estrada.

O documento não prova quem entrou ali depois do desaparecimento. Prova que existiam motivos técnicos para alguém visitar a estação e que o lugar continuou no sistema administrativo por meses.

Bella marca o acesso secundário no caderno. Não está pronta para concluir nada, mas já sabe onde não deve pisar se for sozinha.`,[G('k8_bella_compare','Guardar a planta parcial e comparar com os outros arquivos',[F('planta_bella'),Q('c8_planta_drenagem')])]);
N('k8_archive_store','BIBLIOTECA · BALCÃO DE ARQUIVOS','12:18','town',`PONTO DE VISTA: BELLA GOMES

Um registro contábil antigo indica que Moisés esteve numa farmácia próxima à estrada do lago em uma tarde posterior ao desaparecimento de Jullia. A descrição não informa o que ele comprou. O comprovante, gerado por uma operadora de pagamentos, registra somente data, valor total e estabelecimento.

Bella: — Farmácia. Tá. E daí?

Ela amplia a data. Não há nome de paciente, número de receita nem relação de produtos. Poderia ter sido uma compra banal: sabonete, pilhas, protetor solar, qualquer coisa.

A questão não é o balcão. É que Moisés também foi visto próximo à estrada naquela semana, segundo um registro de estacionamento que não confirma onde ele passou o restante do dia.

Bella anota os dois horários em páginas separadas para não inventar uma ligação antes de testá-la.

Bibliotecária: — Achou o que precisava?

Bella: — Achei uma pergunta. Tenho a impressão de que isso aqui vende por quilo.`,[G('k8_bella_compare','Anotar a visita, sem presumir a compra',[F('recibo_farmacia'),Q('c8_registro_farmacia')])]);
N('k8_archive_photo','BIBLIOTECA · FOTOGRAFIAS','12:21','town',`PONTO DE VISTA: BELLA GOMES

As fotografias mostram a margem do lago quando a estação ainda recebia técnicos regularmente. Bella aproxima a imagem do rosto até distinguir o desenho da velha passarela: duas vigas sobre a água e um corrimão remendado com placas diferentes.

Bella: — Ótimo. Uma ponte que parece querer matar alguém mesmo sem assassino.

Uma imagem tirada meses depois do desaparecimento mostra uma caminhonete estacionada além da vegetação. A placa não é legível, e a distância impede identificar quem dirigia.

Bella resiste ao impulso de escrever «Moisés» no caderno. Ele poderia ter estado lá. Outras pessoas também.

No verso da cópia antiga, um funcionário anotou que o painel da bomba número dois tem o disjuntor isolado da alimentação do edifício.

Ela fotografa a observação. Uma informação técnica concreta será mais útil que a imagem borrada de uma pessoa desconhecida.`,[G('k8_bella_compare','Registrar o acesso e a nota elétrica',[F('foto_painel'),Q('c8_painel_isolado')])]);
N('k8_bella_compare','BIBLIOTECA · MESA DE LEITURA','12:35','town',`PONTO DE VISTA: BELLA GOMES

Bella espalha seus registros na mesa. Pela primeira vez, os papéis parecem pertencer à mesma história, ainda que falte metade dela.

Ela tem datas que pode conferir e lacunas que não pretende preencher por impulso. A estação aparece em documentos oficiais. Moisés frequentou lugares próximos ao lago em momentos que não explicou à família de Jullia. Uma parte da estrutura continua registrada, apesar de abandonada.

Bella encontra no telefone uma conversa antiga com a irmã, sobre uma briga banal por causa de um casaco emprestado sem pedir. A última mensagem de Jullia era um emoji revirando os olhos.

Bella: — Você ainda me deve aquele casaco, sua chata.

Ela apaga a tela antes que a bibliotecária repare no sorriso que não conseguiu segurar.

Não é uma descoberta policial. É uma lembrança de que a pessoa desaparecida era mais que um nome num arquivo. Bella dobra as folhas e decide que não vai permitir que a história de Jullia seja reduzida àquela estrada.`,[
 C('Compartilhar com o protagonista todas as páginas úteis','k8_bella_message',[F('bella_compartilhou'),F('bella_exata'),['trait','franqueza',1]]),
 C('Guardar uma das anotações até conferir a fonte','k8_bella_message',[F('bella_guardou'),['trait','cautela',1]]),
 C('Enviar somente a localização da estação','k8_bella_message',[F('bella_local'),['trait','cautela',1]])]);
N('k8_bella_message','BIBLIOTECA · CORREDOR','12:44','phone',`PONTO DE VISTA: BELLA GOMES

Bella desce as escadas da biblioteca enquanto envia uma mensagem ao protagonista. Olha duas vezes para o endereço antes de confirmar o envio. Ela sabe que a confiança entre os amigos ficou abalada depois da morte de Moisés. Não pretende criar outra teoria no grupo sem verificar se os dados são verdadeiros.

Uma moto passa fazendo barulho na avenida. Bella quase deixa o telefone cair quando o som explode perto dela. Fica irritada por ter se assustado com algo tão comum.

Bella: — Maravilha. Agora até escapamento me faz passar vergonha.

Ela respira mais devagar, confere se as fotos estão salvas e espera a resposta. Existe uma estação abandonada junto ao lago. Há registros que indicam visitas posteriores ao desaparecimento. Isso é o que ela pode afirmar. Todo o resto permanece em aberto.`,[G('k8_06','Retomar o ponto de vista do protagonista')]);
N('k8_06','PRAÇA CENTRAL · TARDE','14:07','town',`PONTO DE VISTA: PROTAGONISTA

Você chega à praça antes do horário combinado. As mesas externas da padaria estão sendo recolhidas porque a previsão anuncia chuva. Uma senhora alimenta pombos perto da fonte, e duas crianças discutem a vez de usar um balanço.

O telefone vibra com uma mensagem de Bella: ela encontrou registros de uma instalação junto ao lago. Não há nada nos arquivos que identifique um assassino, mas algumas datas merecem atenção. Ela não quer que você confunda suspeita com prova.

O silêncio do grupo é mais difícil de suportar do que a chuva que começa. Depois das acusações no hospital, algumas pessoas podem preferir não falar com você. Outras talvez estejam esperando um pedido de desculpas que você ainda não conseguiu escrever.

Você se lembra das conversas do dia anterior: dos sonhos contados na cafeteria, do jantar que pareceu uma vida inteira antes do telefonema de Moisés e das promessas de continuar vivo. Agora essas lembranças cabem no espaço entre duas mensagens não respondidas.

Ainda existe a chance de procurar uma pessoa. Não precisa ser uma conversa sobre pistas.`,[]);
const COMPANION_SCENES={
 samuel:{place:'PRAÇA · BANCO PERTO DO ESTACIONAMENTO',start:`Samuel chega carregando uma garrafa de água que ainda não abriu. Olha para os carros que passam na esquina e volta os olhos para o chão.

Samuel: — Eu não consigo dirigir até aqui sem lembrar daquela estrada. Até quando o sinal abre, parece que eu tô esperando uma pessoa aparecer no meio do asfalto.

Você: — Você dormiu alguma coisa?

Samuel: — Dormi duas horas. Sonhei que tava de novo no volante. Acordei com a mão apertando o travesseiro como se fosse o câmbio.

Ele tenta abrir a garrafa. A tampa escapa dos dedos.

Samuel: — Se eu chegar até o fim dessa história, vou vender a van. Nem sei se vai adiantar.`,
 choose:`Samuel: — Eu queria contar tudo. Pra polícia, pros pais dela. Mas eu olho pra vocês e penso em quem ia acabar preso. Depois lembro de Moisés morto e penso que alguém vai acabar assim de qualquer jeito.

Você: — Você não precisa decidir isso sozinho hoje.

Samuel: — É justamente o problema. A última vez que a gente decidiu junto, a gente fez a pior coisa da nossa vida.`,effect:'confiança'},
 allan:{place:'PRAÇA · CAFETERIA',start:`Allan chega com o celular na mão e uma expressão que você não conhece nele. Não tenta fazer uma entrada teatral. Senta e pede uma vitamina que fica quase intocada.

Allan: — Eu tava olhando fotos antigas. Todo mundo aparecia de olho fechado, fazendo careta. A gente parecia tão preocupado com nada.

Você: — Você sempre implicava com as fotos.

Allan: — Porque eu tava tentando parecer mais engraçado do que o garoto que ficava com medo de não ser convidado da próxima vez.

Ele encosta o aparelho na mesa, com uma foto de Samuel e ele numa festa de aniversário.

Allan: — Ontem eu vi o Samuel querendo brigar com todo mundo. Dá vontade de segurar ele pelos ombros. Só que nem eu sei o que dizer.`,choose:`Allan: — Eu queria voltar a discutir coisa idiota. Quem vai escolher a música, quem esqueceu a chave. Agora a gente discute se alguém tá entregando os amigos pra morrer.

Você: — Você acha que existe mesmo um traidor?

Allan: — Acho que existe alguém mentindo. Não sei se é a mesma coisa. E eu tenho medo de descobrir.`,effect:'companheirismo'},
 isabella:{place:'LIVRARIA · MESA NO FUNDO',start:`Isabella espalha três recibos e uma folha com horários sobre a mesa. Quando você chega, ela fecha a caneta e empurra os papéis para o lado.

Isabella: — Antes que você reclame: eu pedi autorização pra olhar as cópias. Não invadi o arquivo da polícia.

Você: — Eu nem falei nada.

Isabella: — Pois é. Eu já tô esperando uma briga mesmo quando não existe.

A voz dela perde a dureza. Isabella tira os óculos para limpar as lentes, embora não estejam sujas.

Isabella: — Eu fiquei tentando calcular quanto tempo levou pra polícia chegar na oficina. Quando percebi, fazia meia hora que eu nem piscava.`,choose:`Isabella: — Eu sempre achei que, se eu anotasse as coisas direitinho, nenhuma surpresa ia conseguir me pegar. E aí alguém entrou na casa da Laisla.

Você: — Você não pode controlar tudo.

Isabella: — Eu sei. Só não sei como parar de tentar.`,effect:'proteção'},
 laisla:{place:'PADARIA · MESA DA JANELA',start:`Laisla escolhe uma mesa onde consegue ver a rua inteira. Pede pão na chapa, depois se arrepende e pede um café que não bebe.

Laisla: — Eu sonhei com a minha cozinha. Não tinha sangue nem máscara. Só a pia entupida. Aí acordei chorando porque era a coisa mais normal do mundo.

Você: — Você ainda pode ter uma cozinha normal.

Laisla: — Talvez. Só que agora qualquer prato quebrado me faz querer olhar pra trás.

Ela puxa o guardanapo até formar um quadrado pequeno.

Laisla: — Eu tava pensando em fazer um almoço quando isso acabar. Parece ridículo, mas eu queria cozinhar pra alguém sem imaginar quem vai entrar pela porta.`,choose:`Laisla: — E eu tô com raiva. Não só de quem fez isso. Tô com raiva de quem começou a acusar os outros ontem como se a gente já não tivesse perdido o suficiente.

Você: — Você quer se afastar de todo mundo?

Laisla: — Não. Quero que parem de confundir ficar junto com fingir que nada aconteceu.`,effect:'cuidado'},
 rauanny:{place:'PRAÇA · QUIOSQUE FECHADO',start:`Rauanny chega devagar, tentando esconder uma pontada de dor quando desce o meio-fio. Você faz menção de ajudá-la, mas espera a resposta antes de encostar.

Rauanny: — Obrigada. Só não me pega pelo braço desse jeito, tá? Ainda dói.

Você: — A gente pode sentar ali.

Rauanny: — Pode. Mas só porque eu quero, não porque você mandou.

Ela ri pelo nariz, depois fica séria olhando uma menina tentando aprender a andar de skate.

Rauanny: — Eu sempre fui de achar que bastava ser rápida. Corre, pula, reage. Aí vem um idiota de máscara e descobre que eu também tenho limite.`,choose:`Rauanny: — Ontem eu gritei com quem eu amo. Achei que tava defendendo meus amigos. Talvez só tivesse tentando ter razão.

Você: — Você pode pedir desculpa.

Rauanny: — Posso. Só preciso parar de tratar desculpa como derrota.`,effect:'coragem'},
 breno:{place:'SEBO · CAFÉ DOS FUNDOS',start:`Breno já está sentado numa mesa pequena, com um livro fechado entre as mãos. Você pergunta o título; ele vira a capa como quem se lembrou de que tinha pegado alguma coisa para ler.

Breno: — Eu costumava vir aqui quando queria ficar longe da escola. Era mais fácil sentar no fundo do que explicar por que eu não tava no meio de todo mundo.

Você: — Você podia ter me chamado.

Breno: — Eu não sabia se podia. Às vezes a gente acostuma tanto a ser o que não dá trabalho que esquece que também pode pedir companhia.

Ele observa uma pessoa devolver um livro no balcão e sorri de leve.

Breno: — Ontem, na oficina, eu achei que não ia ver essa rua de novo. Hoje eu vim mesmo assim.`,choose:`Breno: — Eu não tenho medo só do mascarado. Tenho medo de a gente começar a gostar de suspeitar dos outros. É tão mais fácil do que admitir que não sabe.

Você: — Você desconfia de mim?

Breno: — Eu confio em você. Mas confiança não significa não fazer perguntas. Quero que você faça comigo também.`,effect:'verdade'},
 ryan:{place:'LANCHONETE · MESA NA VARANDA',start:`Ryan vem com dois guardanapos amassados dentro do bolso e oferece um para você como se fosse um presente.

Ryan: — Pronto. Sou oficialmente o pior anfitrião de Lakewood. Nem era eu que tava pagando.

Você: — Você podia ter dormido em vez de vir.

Ryan: — Dormi. Acordei quatro vezes achando que tinha deixado a porta aberta. Na quinta levantei pra conferir a janela. Eu nem tenho varanda naquele lado do quarto.

A brincadeira termina ali. Ele fica observando um cachorro puxar a guia do dono do outro lado da rua.

Ryan: — Eu tenho medo de ficar em silêncio, sabe? Porque aí minha cabeça começa a mostrar tudo de novo.`,choose:`Ryan: — Eu queria te levar num lugar com música ruim, comida boa e a pior decoração do mundo. E reclamar do preço como qualquer pessoa normal.

Você: — A gente ainda pode fazer isso.

Ryan: — Então me cobra quando acabar. Mas, se eu fizer piada numa hora ruim, me fala. Eu tô tentando aprender a não me esconder dentro delas.`,effect:'franqueza'},
 rayssa:{place:'PRAÇA · JARDIM DAS MAGNÓLIAS',start:`Rayssa está junto de uma jardineira, retirando folhas secas de uma flor caída sobre o banco. Seu rosto está cansado; a maquiagem mal disfarça as noites sem dormir.

Rayssa: — Eu passei a madrugada digitando desculpas pra todo mundo. Apaguei todas.

Você: — Por quê?

Rayssa: — Porque eu não sabia exatamente do que tava me desculpando. E isso torna tudo pior, né?

Ela deixa a flor no chão com cuidado.

Rayssa: — Eu penso em quando a gente brigava por coisas bobas. Eu podia ter passado mais tempo dizendo que gostava das pessoas, em vez de achar que elas já sabiam.`,choose:`Rayssa: — Não sei se alguém ainda acredita em promessas. Eu mesma já fiz algumas que não consegui cumprir.

Você: — Você pode começar falando a verdade sobre o que sente agora.

Rayssa: — Eu sinto medo. E sinto falta de quando podia olhar pra vocês sem pensar no que vai acontecer amanhã.

Ela baixa os olhos. Você percebe a tristeza, mas não tem como saber a origem de cada lembrança que a atravessa.`,effect:'culpa'}
};
for(const [id,d] of Object.entries(COMPANION_SCENES)){
 N('k8_friend_'+id,d.place,'14:19','town',`PONTO DE VISTA: PROTAGONISTA

${d.start}

A conversa não apaga o que aconteceu na sala do hospital. Ainda assim, vocês conseguem se escutar sem o restante do grupo discutindo ao mesmo tempo. A rua continua viva ao redor, independente dos medos que trouxeram para a mesa.`,[
 C('Perguntar como '+L[id]+' pretende lidar com o medo','k8_friend_end_'+id,[B(id,3),F('conversou_'+id)]),
 C('Contar sobre o próprio medo e ouvir a resposta','k8_friend_end_'+id,[B(id,2),F('conversou_'+id),['trait','empatia',1]]),
 C('Pedir desculpa por alguma palavra dita na discussão','k8_friend_end_'+id,[B(id,4),F('reconciliou_'+id)])]);
 N('k8_friend_end_'+id,d.place,'14:31','town',`${d.choose}

Você deixa ${L[id]} terminar a frase antes de responder. Há muito que não foi resolvido, mas agora conhece uma preocupação que não apareceria no grupo de mensagens.

Quando se despedem, ${L[id]} guarda o telefone e pergunta se você vai avisar quando chegar em casa. É uma pergunta simples. Você promete tentar.`,[G('k8_07','Voltar à investigação')]);
}
N('k8_unavailable','PRAÇA · BANCO VAZIO','14:22','town',`Você tenta encontrar companhia, mas nenhuma das pessoas disponíveis pode sair agora. Algumas seguem em observação; outras precisam de espaço depois da discussão.

Em vez de insistir, você guarda o telefone e fica alguns minutos olhando a fonte. Não ter com quem conversar não significa que aquelas amizades acabaram. Significa que nem todos conseguem enfrentar a mesma manhã da mesma maneira.

O barulho da água lembra a estação de que Bella falou. Você consulta as mensagens e percebe que precisa se preparar antes de decidir ir até lá.`,[G('k8_07','Conferir a mensagem de Bella')]);
N('k8_07','PRAÇA · TELEFONE','15:08','phone',`Você desbloqueia o celular. Bella enviou uma foto de um registro incompleto e a localização aproximada da estação junto ao lago. Ela não tirou conclusões sobre o assassino.

Bella: — Não quero fazer tour de prédio abandonado. Quero conferir um registro antes que suma do sistema. Se você tiver medo, eu vou entender. Mas não me atrapalha se eu for.

Você: — A gente podia pedir ajuda à polícia.

Bella: — A gente DEVE avisar a polícia. Isso não resolve a dúvida do arquivo. Não vou invadir nada fechado: a área externa tem acesso público e a equipe técnica confirmou onde começa a parte isolada.

Ela envia mais uma mensagem: um desenho simplificado dos corredores e do canal de drenagem. Parte da planta foi digitalizada com resolução ruim, mas ao menos mostra por onde a água escoa.

Você lembra da advertência da investigadora. Ir até lá significa assumir um risco real. E arrastar pessoas feridas ou que não confiam em você poderá tornar tudo pior.`,[
 C('Ler a planta e combinar um ponto de encontro seguro','k8_prepare',[F('leu_planta'),['trait','cautela',2]]),
 C('Rever as fotos dos registros antes de sair','k8_prepare',[F('releu_fotos'),['trait','cautela',1]]),
 C('Avisar que só aceitará entrar se houver uma rota de volta','k8_prepare',[F('plano_saida'),['trait','coragem',1]])]);
N('k8_prepare','ESTRADA DO LAGO · PLANEJAMENTO','15:24','road',`PONTO DE VISTA: PROTAGONISTA

Você encontra Bella no estacionamento de um pequeno mercado perto da estrada. Um vento frio atravessa a área coberta. A estação fica além de uma curva, onde o asfalto antigo cede lugar a um caminho de serviço.

Bella mostra uma cópia impressa da planta. A parte central da instalação possui bombas antigas; uma passarela alcança o píer e uma estrada lateral retorna ao acesso público. Existem travas e cercas de segurança. Não seria possível atravessá-las livremente sem autorização.

Bella: — Eu quero olhar a área liberada e comparar com o registro que a prefeitura passou. Se tiver cadeado, a gente não brinca de arrombar porta, tá?

Você: — Isso vindo de você quase parece sensatez.

Bella: — Eu sou sensata. Só sou insuportável junto.

Ela aponta os riscos na planta: o sistema elétrico, a passarela antiga, a parte baixa que pode receber água de chuva. Se o lugar estiver mesmo abandonado, os perigos não vão precisar de um assassino para funcionar.

Você precisa decidir como se preparar e quem avisar.`,[
 C('Conferir com Bella o caminho do disjuntor isolado','k8_invite',[F('painel_planejado'),['trait','cautela',1]]),
 C('Separar uma bolsa impermeável para documentos e telefone','k8_invite',[F('bolsa_impermeavel')]),
 C('Combinar que ninguém atravesse sozinho sem avisar','k8_invite',[F('combinou_posicoes'),['trait','empatia',1]])]);
N('k8_invite','MERCADO · ESTACIONAMENTO','15:39','phone',`Você decide quem pode receber o endereço e o convite para acompanhar a investigação. Bella espera perto do carro, conferindo o nível de bateria do telefone.

Não adianta convidar alguém que está em atendimento intensivo ou que morreu nos capítulos anteriores. Também não adianta pressupor que todos vão aceitar. Depois da discussão, algumas pessoas podem preferir distância.

Bella: — Não chama meio mundo só porque você não quer enfrentar uma conversa difícil. E não coloca ninguém no carro sem dizer que a estação pode estar perigosa.

Você concorda. Cada resposta que chegar será registrada. Uma ausência não significa necessariamente abandono: pode ser medo, dor, raiva ou apenas a decisão de não arriscar mais uma vida.`,[]);
N('k8_invited','ESTRADA DO LAGO · PONTO DE ENCONTRO','16:14','road',`PONTO DE VISTA: PROTAGONISTA

A luz do fim de tarde ilumina a vegetação da margem. Vocês estacionam numa área onde o sinal de celular ainda funciona e verificam as saídas antes de andar.

Bella entrega uma cópia da planta ao protagonista, guarda a original na mochila e pede que todos marquem o próprio acesso no telefone. Ninguém deve desaparecer no prédio sem que os outros saibam para onde foi.

A placa na cerca indica que parte da instalação está interditada. Vocês registram a condição do portão e procuram o responsável pela vistoria. Há registros que podem ser consultados na área autorizada; os corredores perigosos continuam isolados.

O plano parece cauteloso até o momento em que Bella reconhece, num mural atrás da guarita, uma anotação semelhante à que encontrou nos arquivos.

Bella: — Tá vendo aquela sequência? É o mesmo código. Não colocaram ali à toa.

Uma gota de chuva cai sobre o papel. Logo depois, outra.`,[
 C('Registrar os acompanhantes e seguir todos pela entrada sinalizada','k8_station_01',[F('entrada_juntos')]),
 C('Pedir que os acompanhantes esperem no acesso externo enquanto você e Bella consultam a guarita','k8_station_01',[F('entrada_separada')])]);
N('k8_station_01','ESTAÇÃO DO LAGO · GUARITA','16:32','lake',`PONTO DE VISTA: PROTAGONISTA

A guarita tem uma janela rachada e um livro de visitas preso por uma corrente. Os trilhos da cerca estão cobertos de folhas e a placa de advertência perdeu metade das letras. O lago aparece por entre a vegetação, quieto demais para um lugar onde a história de vocês começou a desmoronar.

Bella: — A prefeitura disse que o arquivo técnico ficava por aqui. O prédio principal tá isolado, mas o responsável tinha uma cópia dos registros na guarita.

Você encontra uma pasta protegida por um plástico envelhecido. Alguns carimbos correspondem às ordens que Bella fotografou na biblioteca; outros estão ilegíveis.

A chuva se intensifica. Da estação principal vem o som de uma peça metálica batendo contra outra, como se o vento tivesse alcançado um tubo solto.

Vocês precisam registrar os acessos e conferir o mapa antes de avançar. Ainda é possível ir embora com o que já encontraram. Você percebe o quanto seria mais fácil tentar não saber.

Bella: — Só vou olhar o código. Se não bater, a gente pega a estrada. Eu te prometo.`,[
 C('Fotografar o registro com data e identificação da página','k8_station_02',[F('foto_registro'),Q('c8_registro_guarita')]),
 C('Conferir o mapa e as placas da área interditada','k8_station_02',[F('mapa_estacao'),Q('c8_planta_completa')]),
 C('Registrar os telefones e o ponto de encontro de todos','k8_station_02',[F('contatos_prontos'),['trait','cautela',1]])]);
N('k8_station_02','ESTAÇÃO DO LAGO · ARQUIVO TÉCNICO','16:43','lake',`PONTO DE VISTA: BELLA GOMES

Bella entra na sala de consulta acompanhada pelo ruído de seus próprios passos. O lugar tem um balcão baixo, um relógio parado e um armário com caixas catalogadas. A janela dá para a passarela, que passa sobre uma faixa escura da água.

Ela compara os códigos com o arquivo municipal. Uma pasta menciona uma visita de rotina meses depois do desaparecimento de Jullia, mas a assinatura do solicitante foi coberta por um carimbo de arquivo.

Bella: — Não acredito. De novo esse código. É como se todo mundo tivesse decidido escrever metade de uma resposta.

Você: — Talvez a outra metade esteja em outra página.

Bella: — Ou talvez esteja comigo desde o começo e eu não tenha percebido. O que é uma ideia bem pior.

Ela encontra o nome de uma farmácia anotado num comprovante de deslocamento sem discriminação de produtos. Não há indicação de receitas nem de pessoa atendida; apenas a coincidência de datas com um lançamento anterior.

Bella passa um dedo pela margem do papel e deixa a caneta de lado. Seu primeiro impulso é ligar para alguém. O segundo é verificar se tem mesmo alguma coisa para dizer.

Há uma pequena gaveta com fotografias de inspeções e uma caixa marcada «cópias de segurança».`,[
 C('Conferir a sequência dos protocolos antes de tirar conclusões','k8_station_03',[F('ordenou_protocolos'),Q('c8_protocolos_cruzados')]),
 C('Examinar o verso das fotografias antigas','k8_station_03',[F('foto_verso'),Q('c8_foto_verso')]),
 C('Procurar uma forma de guardar uma cópia independente','k8_station_03',[F('copia_separada'),Q('c8_backup_arquivo')])]);
N('k8_station_03','ESTAÇÃO · ARQUIVO DE SERVIÇO','16:55','lake',`PONTO DE VISTA: BELLA GOMES

Uma gaveta emperrada finalmente cede e revela um envelope pardo, dobrado junto de relatórios que a prefeitura já marcou como encerrados. Não há nome de Jullia no exterior. Nem fotografia de uma pessoa ferida. Apenas datas, códigos de manutenção e uma referência a entregas realizadas num ponto de apoio da região.

Bella: — Isso aqui é recente demais pra estar nessa caixa.

Ela tira uma página e verifica o verso. Há a marca circular deixada por um copo e uma correção feita com caneta preta. O papel foi manuseado mais vezes do que os documentos ao lado.

Você: — A gente tem que preservar o que encontrar, sem mexer no original.

Bella: — Eu sei. Pela primeira vez na vida eu quero MUITO fazer as coisas certas. Não acredito que tô falando isso.

A chuva bate com força nas telhas. Você vê uma gota passar por uma emenda da janela e cair perto da tomada do balcão.

Bella coloca o envelope sobre uma superfície seca. Precisa decidir como registrar os dados sem alterar as possíveis evidências.`,[
 C('Fotografar cada página, incluindo o verso e os metadados','k8_station_04',[F('arquivo_fotografado'),Q('c8_copia_envelope')]),
 C('Proteger a pasta original numa bolsa vedada','k8_station_04',[F('arquivo_protegido'),Q('c8_envelope_original')]),
 C('Anotar apenas códigos e devolver o original ao lugar','k8_station_04',[F('arquivo_anotado'),Q('c8_codigos_anotados')])]);
N('k8_station_04','ESTAÇÃO · CORREDOR CENTRAL','17:04','lake',`PONTO DE VISTA: PROTAGONISTA

O som da chuva muda quando vocês chegam ao corredor central. De um lado, placas apontam para as bombas antigas. Do outro, uma porta envidraçada permite enxergar o início da passarela. Os dois caminhos desembocam em saídas diferentes, e o terceiro leva à estrada lateral.

Você confere o celular e as últimas mensagens dos acompanhantes. A documentação está guardada, ao menos por enquanto. Bella segura o caderno perto do peito e observa o corredor mais escuro.

Bella: — Tem uma anotação aqui que eu reconheço. Não a letra toda. Só um jeito de abreviar uma palavra. Moisés fazia parecido nas listas de festa.

Você: — Isso prova que ele esteve aqui?

Bella: — Prova que eu sei como ele escrevia. E que preciso comparar com mais alguma coisa antes de apontar o dedo pra um morto.

O comentário surpreende você. Bella continua determinada, mas parece mais interessada em não cometer outro erro do que em encontrar um culpado rápido.

Uma luz vermelha piscante acende e apaga ao fundo. Não há sirene, apenas um clique breve vindo da sala elétrica.`,[
 C('Examinar a sinalização dos circuitos antes de seguir','k8_station_05',[F('circuitos_mapeados'),['trait','cautela',1]]),
 C('Conferir se a saída lateral continua livre','k8_station_05',[F('saida_conferida')]),
 C('Confirmar as posições por mensagem, sem mandar ninguém se deslocar','k8_station_05',[F('posicoes_confirmadas')])]);
N('k8_station_05','ESTAÇÃO · VISTA PARA O LAGO','17:12','lake',`PONTO DE VISTA: BELLA GOMES

Bella se aproxima da janela sem tocá-la. A superfície do lago parece escura mesmo com a pouca luz que ainda resta. O caminho de madeira no exterior foi remendado em pontos diferentes; algumas tábuas parecem recentes, outras carregam rachaduras antigas.

Ela vê um pequeno desenho entalhado no interior da madeira da moldura: duas estrelas tortas, lado a lado. O coração acelera antes que consiga pensar.

Bella: — A Ju fazia isso quando era criança. Desenhava duas estrelas em qualquer caderno que pudesse pegar. Dizia que uma era dela e a outra era minha.

Você se aproxima, mas não toca no entalhe.

Você: — Você tem certeza de que foi ela?

Bella: — Não. É um desenho simples, qualquer pessoa faria. Eu só... nunca pensei em ver uma coisa assim aqui.

Ela pega o celular e fotografa a madeira com uma régua ao lado. Não há como saber quem fez o desenho ou quando, mas aquilo lembra Jullia de um jeito que nenhum documento conseguiu.

Um impacto abafado vem do corredor de serviço. Bella se vira.`,[
 C('Pedir que Bella fotografe o detalhe e permaneça perto da saída','k8_alarm',[F('estrelas_foto'),Q('c8_estrelas_madeira')]),
 C('Conferir o som pelo corredor sem se separar','k8_alarm',[F('juntos_corredor')]),
 C('Retornar à guarita com o que já foi registrado','k8_alarm',[F('retorno_antecipado')])]);
N('k8_alarm','ESTAÇÃO · CORREDOR CENTRAL','17:19','lake',`A luz do corredor falha uma vez. Depois, a porta da área técnica bate com violência. A tampa de uma tubulação vibra no chão, empurrada por água que já começa a escapar pela junta. Vocês recuam para a área seca.

Você: — Bella, vamos embora. Agora.

Bella: — Eu tô indo!

O primeiro grito vem de uma entrada lateral. Não é possível dizer de quem foi sem ver o local; você confere as posições registradas antes de tentar alcançar aquela direção.

O mascarado surge do outro lado do corredor. O rosto é uma superfície opaca, recortada pela luz vermelha da emergência. A faca bate contra o corrimão quando a figura força a passagem.

Bella: — PUTA MERDA! CORRE!

Vocês recuam. Não há tempo para uma análise calma das provas. A água começa a se acumular no piso inferior e a saída pela passarela parece mais próxima do que a guarita.

Bella segura a bolsa. Você precisa alcançar o corredor da área de bombas e procurar um caminho que não dependa de enfrentar a faca.`,[
 C('Conduzir Bella até o acesso da passarela, sem perder contato','k8_bella_01',[F('bella_acesso_passarela')]),
 C('Seguir pelo corredor das bombas e procurar uma saída técnica','k8_bella_01',[F('hero_bombas')]),
 C('Recuar para a guarita e pedir ajuda pelo celular','k8_bella_01',[F('socorro_acionado')])]);
// BELLA: three genuine decisions, with persistent costs and nonfatal outcomes.
N('k8_bella_01','ESTAÇÃO · PASSAGEM DA PASSARELA','17:22','lake',`PONTO DE VISTA: BELLA GOMES

Bella vira a esquina correndo e quase escorrega onde a água passou pela soleira. Atrás dela, o som das botas do mascarado parece próximo o suficiente para abafar o vento.

Ela se apoia na parede, tentando recuperar o ar. O envelope pesa quase nada dentro da bolsa, mas é a única coisa que conseguiu encontrar que não depende da memória de alguém.

Bella: — Não é possível. Eu passo um ano procurando resposta e agora tem uma pessoa com uma faca me seguindo pelo mesmo motivo?

À esquerda, a saída para a passarela está visível atrás de uma porta empenada. À direita, um pequeno quarto de ferramentas oferece uma passagem até o patamar superior.

Uma válvula rompe-se no corredor mais baixo. A água desce como um balde despejado de uma vez. Bella entende que não poderá ficar pensando para sempre.

A primeira decisão será sobre como sair daquele trecho.`,[
 C('Usar o mapa fotografado para chegar ao patamar superior','k8_bella_02',[F('bella_etapa1_mapa')]),
 C('Puxar a porta da passarela e seguir pelo lado externo','k8_bella_02',[F('bella_etapa1_passarela')]),
 C('Esconder-se no quarto de ferramentas até o mascarado passar','k8_bella_02',[F('bella_etapa1_esconder')])]);
N('k8_bella_02','ESTAÇÃO · ESCADAS E TUBULAÇÃO','17:25','lake',`PONTO DE VISTA: BELLA GOMES

O caminho escolhido não termina onde Bella esperava. A estação é maior por dentro, cheia de curvas pequenas e áreas remendadas em épocas diferentes. O barulho da água se mistura ao alarme que finalmente começou a tocar perto dos equipamentos.

Uma mensagem não enviada permanece na tela do telefone: «Tô indo pro lado de fora. Não me procura no corredor». Bella sabe que enviá-la pode poupar uma busca inútil. Também sabe que o sinal está falhando.

Bella: — Vai, porra. Envia logo.

Ela encosta a palma da mão num suporte frio e observa os reflexos do corredor à frente. Não consegue ver o mascarado. Não significa que ele se afastou.

O envelope está protegido apenas pelo tecido da bolsa. Bella pode se livrar de peso e ganhar velocidade ou gastar preciosos segundos cuidando do papel.`,[
 C('Enviar localização e manter o telefone acessível','k8_bella_03',[F('bella_localizou'),['trait','cautela',1]]),
 C('Guardar uma foto do registro e proteger a cópia','k8_bella_03',[F('bella_preservou_foto')]),
 C('Deixar o papel e correr imediatamente para a saída','k8_bella_03',[F('bella_abandonou_papel')])]);
N('k8_bella_03','ESTAÇÃO · PATAMAR SOBRE A ÁGUA','17:28','lake',`PONTO DE VISTA: BELLA GOMES

A passarela surge depois de uma curva apertada. Sob as tábuas, a água bate contra os suportes de ferro. Uma placa avisa que a estrutura deve ser usada com cuidado, um conselho inútil agora que alguém mascarado caminha na direção dela.

Bella reconhece a maneira em que o corrimão está remendado pelas fotos antigas. Uma parte foi reforçada; outra parece ter sido simplesmente coberta com madeira nova.

Bella: — Pensa, Bella. Você não passou um ano inteiro correndo atrás de papel pra morrer numa ponte podre.

Um estalo corta a frase. O mascarado empurra a porta do patamar. Bella vê um acesso de manutenção por baixo da escada, uma linha de cabos bem presa ao lado da estrutura e um vão de madeira estreito junto à margem.

Ela tem poucos segundos. Não existe uma opção sem risco. O caminho que escolher terá que considerar o que aprendeu e o que ainda está carregando.`,[
 C('Usar a linha de apoio e testar as tábuas antes de avançar','k8_bella_out',[F('bella_final_apoio')]),
 C('Correr pela parte central e tentar saltar o trecho quebrado','k8_bella_out',[F('bella_final_corrida')]),
 C('Descer para a plataforma inferior e buscar abrigo sob a escada','k8_bella_out',[F('bella_final_inferior')])]);
N('k8_bella_out','MARGEM DO LAGO · SAÍDA DA ESTAÇÃO','17:32','lake',`PONTO DE VISTA: BELLA GOMES

Bella finalmente alcança um ponto onde consegue ouvir a chuva em vez dos passos do mascarado. O ar entra rasgando no peito. Ela olha para os próprios dedos, verifica se consegue movê-los e procura o telefone.

O lago continua escuro. A figura mascarada não aparece diante dela, mas os gritos que vêm do prédio impedem que confunda aquela pausa com segurança.

Bella: — Eu saí. Eu tô aqui. Agora falta o resto.

Ela tenta responder às mensagens do protagonista. O telefone demora a encontrar sinal. Seja qual for a condição em que alcançou a margem, a investigação deixou de ser uma obsessão abstrata: agora existe sangue, medo e um caminho real por onde ela quase não voltou.

Bella sabe que os outros ainda precisam sair. A prova que ela carregava pode ter sobrevivido inteira, apenas em fotografia ou ter se perdido na água.`,[G('k8_hero_rescue','Retomar o ponto de vista do protagonista')]);
N('k8_hero_rescue','ESTAÇÃO · SALA DAS BOMBAS','17:36','lake',`PONTO DE VISTA: PROTAGONISTA

O piso vibra sob seus pés. Há água acumulada perto da casa das máquinas, e um quadro de controle pisca com as últimas luzes de emergência. Você escuta o mascarado em algum lugar distante, mas não sabe qual corredor será alcançado primeiro.

Bella avisou que tenta sair pela margem. Você não pode correr para lá e abandonar um possível pedido de ajuda sem saber onde estão os outros. O telefone mostra as últimas posições confirmadas, não uma visão mágica de todos os sobreviventes.

A primeira coisa a fazer é tentar conter o fluxo de água que invade o setor inferior. A segunda é organizar um resgate antes que alguém tente atravessar os equipamentos sozinho.

Você se aproxima do painel, tomando cuidado para não pisar na área molhada. O que fizer agora poderá mudar o acesso dos amigos à saída.`,[
 C('Usar o mapa e procurar o comando de isolamento antes de tocar no painel','k8_risk1',[F('hero_painel_seguro'),['trait','cautela',1]]),
 C('Mandar uma mensagem com as rotas e pedir confirmação de posição','k8_risk1',[F('hero_rede_organizada'),['trait','empatia',1]]),
 C('Abrir imediatamente o corredor de emergência, sem esperar confirmação','k8_risk1',[F('hero_saida_apressada'),['trait','coragem',1]])]);
N('k8_risk1','ESTAÇÃO · SALA DAS BOMBAS','17:39','lake',`PONTO DE VISTA: PROTAGONISTA

A estrutura inferior geme e parte do sistema de drenagem começa a trabalhar ao contrário. A água que deveria seguir ao lago volta pela passagem antiga. Os degraus ficam úmidos, depois cobertos por uma lâmina brilhante.

Você procura pelos amigos que aceitaram acompanhar a investigação. Quem está no mesmo setor precisa saber qual saída está aberta; quem permaneceu no acesso externo não deve ser tratado como se estivesse preso dentro do prédio.

Um novo som corta a vibração do motor. Desta vez parece uma pessoa chamando por ajuda.

A voz vem de um corredor sinalizado, e você compara o som com as últimas posições recebidas. Precisará pensar depressa, mas sem correr às cegas.`,[]);
const SPOTS={isabella:'bombas',allan:'bombas',breno:'bombas',samuel:'bombas',laisla:'passarela',rauanny:'passarela',ryan:'estrada',rayssa:'estrada'};
const POV={
 isabella:{first:`Isabella está na galeria de controle, onde os disjuntores antigos vibram com o avanço da água. Uma grade corta o caminho até a saída, e o painel de isolamento elétrico começa a emitir estalos. Ela sabe que tocar no metal com as mãos molhadas seria uma péssima ideia.

Isabella: — Ótimo. Um dia eu vou investigar um lugar que não tenha uma maneira absurda de morrer.

O visor de segurança indica dois circuitos e um aviso de bloqueio. Ela precisa escolher uma forma de verificar a alimentação sem se aproximar da poça.`,prep:['Ler as etiquetas e acionar o comando protegido de isolamento','Forçar a grade com a mão antes que a água suba','Seguir pelo cabo mais próximo sem verificar o circuito'],middle:`O corredor escurece depois de um estalo. Isabella encontra a caixa do protocolo de evacuação e a plataforma superior. Do lado oposto, o mascarado aparece através do vidro sujo; ainda existe uma escada de manutenção, mas o primeiro degrau está tomado pela água.

Isabella: — Tá. Uma coisa de cada vez. Só preciso não fazer nenhuma burrice agora.`,end:['Usar a plataforma seca e chamar a posição ao protagonista','Atravessar a água para ganhar um atalho','Voltar ao painel para arrancar os documentos sem isolar o setor'],voice:'Não abre a caixa elétrica se o piso estiver molhado!'},
 allan:{first:`Allan está numa sala de registros ligada ao piso inferior. Uma estante metálica escorrega lentamente porque um dos pés perdeu o apoio no concreto molhado. Uma caixa caiu diante da porta de serviço.

Allan: — Tá de sacanagem. Eu nunca gostei de arquivo nem quando era pra guardar prova da escola.

Ele vê duas opções para estabilizar o armário e uma terceira que exige arrastar a caixa à força. Os papéis espalhados não valem uma lesão na coluna, mas a saída está ali.`,prep:['Travar a estante com a haste lateral antes de abrir passagem','Empurrar a estante com o ombro e correr','Subir na prateleira para passar por cima'],middle:`A passagem agora permite ver o corredor de fuga, mas o mascarado está próximo do acesso de funcionários. Allan segura a respiração e lembra do braço que já machucou numa fuga anterior.

Allan: — Samuel vai me matar se eu morrer fazendo isso. Espera, não. Péssima escolha de palavras.

Ele vê um corredor de segurança por trás do armário e uma porta metálica cujo trinco parece solto.`,end:['Usar a passagem de segurança e avisar a saída escolhida','Gritar e correr pela porta mais próxima','Parar para recolher todos os papéis que caíram'],voice:'Eu preciso que alguém me diga qual corredor tá livre!'},
 breno:{first:`Breno alcançou a galeria onde as bombas antigas ficam instaladas. O compressor vibra contra uma tubulação com água vazando perto do chão. O ruído impede ouvir passos do lado de fora, mas o indicador de pressão ainda está aceso.

Breno: — Calma. Não encosta em nada antes de entender pra onde isso vai.

Ele se lembra das instruções de um técnico que conheceu no trabalho, sobre nunca improvisar numa máquina pressurizada. Procura uma placa de parada remota.`,prep:['Localizar o desligamento remoto e se afastar da tubulação','Tentar fechar a válvula mais próxima com a mão','Passar por baixo da tubulação enquanto vibra'],middle:`Uma descarga de ar percorre o sistema, levantando gotas do piso. Breno encontra a galeria lateral. Atrás da porta, ouve metal bater contra metal — talvez a grade, talvez o mascarado.

Breno: — Eu não vou repetir a oficina. Eu sei onde tô e preciso sair daqui vivo.

Há uma rota marcada em amarelo com o piso ainda seco. Outra vai direto pela área alagada.`,end:['Seguir a sinalização seca e confirmar o caminho por telefone','Atravessar o corredor alagado sem olhar para trás','Voltar para buscar uma caixa que caiu no piso molhado'],voice:'Eu tô junto das bombas, perto da placa amarela. Não vou atravessar a água.'},
 samuel:{first:`Samuel está junto a uma plataforma usada para transportar equipamentos, próxima da saída da galeria. Uma corrente solta bate no metal a cada oscilação do motor. A passagem de emergência está atrás do reboque técnico.

Samuel: — Não. Nem pensar que eu vou ficar preso atrás de outro veículo.

Ele reconhece o mecanismo de trava e percebe que a roda pode se mover se a corrente for puxada da maneira errada.`,prep:['Imobilizar o eixo antes de liberar a passagem lateral','Soltar a corrente sem estabilizar o reboque','Subir sobre o veículo e saltar na saída'],middle:`O reboque se move um palmo e para. Samuel vê as marcas de óleo no piso molhado; está perto de uma saída que também pode ser alcançada por um corredor de pedestres.

Samuel: — Uma vez eu achei que conseguia resolver tudo acelerando. Eu não vou fazer isso de novo.

O mascarado aparece no fim da galeria. A corrente balança entre a figura e a saída.`,end:['Recuar pela faixa de pedestres e comunicar a posição','Enfrentar o mascarado com a corrente solta','Arrancar o reboque mesmo com a passagem ocupada'],voice:'Eu tô na galeria dos veículos. A corrente tá solta. Não venham por esse lado.'},
 laisla:{first:`Laisla tenta alcançar a escada de serviço a partir de uma ponte de manutenção sobre um canal estreito. Uma tábua afunda um pouco quando ela pisa, e a roupa molhada pesa em seus ombros.

Laisla: — Eu quero ir pra casa. Eu quero a porra da minha casa de volta.

Há um cabo de segurança preso na lateral e uma faixa de madeira mais firme junto ao corrimão. Ela não pode simplesmente correr no meio sem saber onde estão os apoios.`,prep:['Prender o cabo de segurança e testar a lateral da ponte','Correr pelo meio da passarela sem olhar para baixo','Tentar saltar para a margem a partir do apoio quebrado'],middle:`O vento traz o barulho da estação. Laisla escuta um grito distante, mas não sabe de quem é. A escada à frente alcança a plataforma seca, e as tábuas do lado esquerdo parecem recém-pregadas.

Laisla: — Se alguém tá me ouvindo, eu tô na ponte de fora. Não vou voltar pro prédio!

Uma silhueta atravessa a porta atrás dela.`,end:['Seguir os apoios reforçados e pedir ajuda pela escada','Virar para enfrentar a silhueta na madeira solta','Descer pela borda sem localizar um apoio'],voice:'Tô na ponte externa. Preciso que saibam qual escada leva pra rua!'},
 rauanny:{first:`Rauanny chega à plataforma junto ao canal de drenagem. A água cobre os tornozelos, gelada o bastante para fazer doer o ferimento antigo. Há uma correnteza mais forte perto da saída das bombas.

Rauanny: — Ah, claro. Justo água. Justo hoje.

Ela observa duas linhas amarelas na parede indicando a altura segura de operação. A barra de apoio está intacta ao longo da passagem lateral.`,prep:['Usar a barra de apoio e avançar pelo lado menos fundo','Correr pelo canal sem testar o fundo','Mergulhar por baixo da grade de proteção'],middle:`O canal dobra à direita. Rauanny respira fundo, tentando não entrar em pânico com o barulho da água. O mascarado aparece acima, num patamar que ainda não alcança diretamente a passagem.

Rauanny: — Você vai ter que correr muito mais do que isso pra me pegar, desgraçado.

Uma escada com barras secas leva ao exterior. Há também uma abertura parcialmente submersa.`,end:['Usar a escada seca, segurando o corrimão e chamando a localização','Atravessar a abertura submersa sem saber a saída','Voltar ao canal mais fundo para recuperar um objeto'],voice:'Tô no canal. A correnteza tá puxando pro lado das bombas.'},
 ryan:{first:`Ryan chegou ao acesso de veículos, onde uma cancela antiga divide a guarita da estrada. A energia falha e a barra começa a descer de maneira irregular. O painel manual está coberto por uma tampa de plástico.

Ryan: — Tá bom. Eu consigo rir de quase tudo. De morrer esmagado por estacionamento, não.

Ele vê uma manivela de segurança sinalizada na parede lateral e uma fenda apertada sob a cancela.`,prep:['Encontrar a manivela de emergência e estabilizar a barra','Deslizar por baixo da cancela enquanto ela desce','Chutar o painel elétrico para forçar a abertura'],middle:`A cancela para por alguns segundos. Ryan olha para a estrada molhada e reconhece o som de passos vindo da guarita. O mascarado ainda está longe o bastante para ele alcançar a portinhola de serviço.

Ryan: — Isso aí. Fica onde você tá, psicopata. Eu tô oficialmente ocupado tentando sobreviver.

Uma placa indica a abertura manual ao lado do corredor iluminado.`,end:['Destravar a portinhola manual e avisar a saída escolhida','Correr em direção ao mascarado para distraí-lo','Subir sobre a cancela instável para alcançar a rua'],voice:'Eu tô na cancela. Tem uma manivela de emergência, mas preciso de espaço.'},
 rayssa:{first:`Rayssa ficou no acesso externo ajudando a registrar a saída. A água escorre pelo toldo e os faróis de um carro iluminam a guarita de forma irregular. Um armário de equipamentos está bloqueando parte da passagem.

Rayssa: — Não quero perder mais ninguém. Me diz que tem uma saída sem atravessar aquilo.

A chave de emergência está numa caixa lacrada ao lado da placa de manutenção. Ela consegue enxergar um pequeno corredor separado das bombas.`,prep:['Usar a chave de emergência e manter o corredor livre','Puxar o armário na direção da saída mesmo com a passagem ocupada','Correr para dentro do prédio tentando encontrar o mascarado'],middle:`O acesso externo começa a ficar sem iluminação. Rayssa segura o telefone; a tela mostra mensagens de amigos esperando confirmação de que a passagem continua livre.

Rayssa: — Eu vou responder. Só... um segundo.

Ela vê a luz de uma equipe na estrada e a passagem sinalizada.`,end:['Avisar a posição e permanecer no ponto de acesso seguro','Voltar ao prédio sozinha atrás de uma voz distante','Seguir pelo caminho escuro sem conferir as placas'],voice:'Tô no portão. Vou manter a saída livre. Só me confirmem quem já passou.'}
};
for(const [id,p] of Object.entries(POV)){
  N('k8_pov_'+id,'ESTAÇÃO · '+SPOTS[id].toUpperCase(),'17:42','lake',`PONTO DE VISTA: ${L[id].toUpperCase()}

${p.first}

O rádio de serviço chia ao fundo, e uma luz de emergência pisca na direção da saída. ${L[id]} tem que decidir sem esperar uma ordem que talvez nunca chegue.`,[
   C(p.prep[0],'k8_pov_follow_'+id,[S('r1_prep',id+':good')]),C(p.prep[1],'k8_pov_follow_'+id,[S('r1_prep',id+':risky')]),C(p.prep[2],'k8_pov_follow_'+id,[S('r1_prep',id+':danger')])]);
  N('k8_pov_follow_'+id,'ESTAÇÃO · '+SPOTS[id].toUpperCase(),'17:45','lake',`PONTO DE VISTA: ${L[id].toUpperCase()}

${p.middle}

A água continua avançando no interior da estação. O que ${L[id]} fez no primeiro obstáculo alterou o espaço disponível para esta segunda escolha. Não é uma nova perseguição começando do nada: ainda é a mesma tentativa de escapar.`,[
   C(p.end[0],'k8_risk1_out',[S('r1_final',id+':good')]),C(p.end[1],'k8_risk1_out',[S('r1_final',id+':risky')]),C(p.end[2],'k8_risk1_out',[S('r1_final',id+':danger')])]);
}
N('k8_sector_empty','ESTAÇÃO · SALA DAS BOMBAS','17:44','lake',`PONTO DE VISTA: PROTAGONISTA

Você confere as mensagens e o corredor. Nenhum dos acompanhantes confirmados ficou preso aqui: alguns aguardam no ponto de acesso e outros já seguiram por uma saída segura. Pelo registro das últimas posições, ninguém ficou para trás nesta sala. Você não ouve pedidos de socorro por aqui.

Você desliga a energia da parte acessível pelo comando de emergência e deixa um aviso para a equipe técnica. A água continua avançando, mas o caminho pela plataforma superior ainda está livre.

Ao longe, Bella finalmente responde com uma mensagem curta: ela conseguiu alcançar a margem. Você precisa encontrá-la antes que o mascarado volte.

A estação não está segura. A ausência de uma pessoa em perigo neste setor não torna o prédio menos perigoso.`,[G('k8_risk2','Seguir para a última passagem')]);
N('k8_risk1_out','ESTAÇÃO · SAÍDA DA GALERIA','17:48','lake',`PONTO DE VISTA: PROTAGONISTA

A chuva abafa os sons do interior do prédio. Você chega ao corredor de comunicação e confere as mensagens recebidas. Uma pessoa enfrentou os equipamentos da galeria; você precisa descobrir o que aconteceu antes de reorganizar a fuga.

O acesso superior leva à estrada. A saída de manutenção segue até uma passarela sobre o lago. Não é possível cuidar dos dois caminhos ao mesmo tempo sem saber quem ainda está em cada setor.

Você tenta ouvir uma resposta no telefone. Uma notificação chega, mas a conexão oscila e parte da frase desaparece.`,[G('k8_risk2','Procurar a última rota de saída')]);
N('k8_risk2','ESTAÇÃO · PASSARELA EXTERNA','17:52','lake',`PONTO DE VISTA: PROTAGONISTA

A estrutura externa é mais larga perto da estação e se estreita ao alcançar a margem. Uma parte foi reforçada com metal; outra está coberta por madeira escura. O vento sopra água sobre o corrimão.

Você percebe que a próxima fuga depende da organização feita mais cedo. Quem já alcançou a saída não deve ser mandado de volta para uma ponte perigosa sem necessidade. Quem permaneceu em outro setor ainda precisa confirmar onde está.

A passarela range com o peso das primeiras rajadas. Você tenta avaliar por onde seria mais seguro pedir ajuda e se vale a pena buscar uma rota alternativa pela estrada de serviço.

O barulho da água aumenta. O mascarado pode alcançar o acesso externo, mas ainda não há razão para presumir que ele esteja ao lado de todas as pessoas ao mesmo tempo.`,[
 C('Conferir os apoios reforçados e orientar a saída pela margem','k8_risk2_pov',[F('r2_hero_lateral')]),
 C('Avisar pelo rádio ou celular a posição do ponto de encontro','k8_risk2_pov',[F('r2_hero_radio')]),
 C('Correr direto pela ponte sem verificar se alguém vem no sentido contrário','k8_risk2_pov',[F('r2_hero_pressa')])]);
N('k8_risk2_pov','ESTAÇÃO · NÚCLEO EXTERNO','17:55','lake',`PONTO DE VISTA: PROTAGONISTA

Você ouve uma resposta distante e confere a última posição confirmada. Você confirma a localização mais recente antes de procurar alguém. A chuva bate forte na grade e apaga qualquer ruído vindo da estrada.

A chuva finalmente diminui. A maré de sons da estação — bombas, alarmes, corrimão e água — parece uma única coisa ameaçadora. Você tenta distinguir os passos de um amigo dos de quem o persegue.`,[]);
N('k8_risk2_empty','ESTAÇÃO · ESTRADA DE SERVIÇO','18:00','road',`PONTO DE VISTA: PROTAGONISTA

A estrada de serviço aparece entre duas árvores. Bella já conseguiu sinalizar a própria localização e os acompanhantes que ficaram no acesso externo confirmam pelo telefone que estão fora do prédio.

Os outros já confirmaram uma saída ou ficaram protegidos na área externa. A passarela permanece vazia, e você não volta ao perigo sem necessidade.

Você finalmente vê o contorno do veículo estacionado. É a primeira vez em muitas horas que um objeto comum parece uma esperança concreta.`,[G('k8_after','Reunir quem conseguiu escapar')]);
N('k8_risk2_out','MARGEM DO LAGO · ESTRADA','18:04','road',`PONTO DE VISTA: PROTAGONISTA

A passagem para a estrada ainda está iluminada por um poste antigo. Você conta os rostos que aparecem à sua frente, mas não faz suposições sobre as pessoas que não vê. Primeiro confere as mensagens. Depois tenta pedir ajuda.

O peso das escolhas na passarela só começa a aparecer agora: o que foi comunicado, quem ajudou e quem ficou sem apoio vai determinar quantas respostas ainda chegam.

O mascarado desapareceu em algum ponto atrás da estação. Não significa que desistiu. Significa apenas que vocês tiveram a chance de alcançar uma área onde a polícia pode fazer a busca sem vocês correndo de volta para o escuro.`,[G('k8_after','Retornar ao ponto de encontro')]);
const LAST_ROUTE={
 isabella:{scene:`Isabella está numa passarela de inspeção elevada; o fio de um sensor se soltou e está prendendo a grade pela qual ela precisa passar. Ela vê que os circuitos foram desativados em parte, mas não presume que todos estejam seguros.

Isabella: — Eu passei a tarde falando pra ninguém tocar no que não entende. Hora de seguir meu próprio conselho.`,step:['Usar o desbloqueio mecânico e permanecer no piso seco','Puxar o fio com a mão molhada','Descer para alcançar a grade por baixo'],follow:`A passagem cede alguns centímetros. Isabella enxerga um patamar de manutenção e uma escada que leva à estrada. O mascarado surge no corredor atrás dela.`,end:['Subir a escada segura e avisar por telefone','Tentar empurrar a grade contra o mascarado','Saltar para a água junto à margem sem examinar o fundo']},
 allan:{scene:`Allan alcança a passarela, mas uma caixa pesada bloqueia o final. Parte da madeira está cedendo pelo lado onde a caixa ficou apoiada.

Allan: — Isso aqui tava nos meus planos de viagem? NÃO. Tava não.

Ele precisa retirar peso da área sem pisar no ponto fraturado.`,step:['Usar o cabo lateral para arrastar a caixa do patamar seco','Empurrar a caixa pisando na madeira rachada','Tentar levantar a caixa sobre a cabeça e correr'],follow:`O mascarado aparece perto da porta. Allan encontra uma escada presa à lateral, reforçada recentemente, e uma passagem mais curta sobre tábuas molhadas.`,end:['Alcançar a escada lateral reforçada','Correr pela passagem curta sem testar os apoios','Parar para fotografar o mascarado a poucos metros']},
 breno:{scene:`Breno caminha pela margem buscando sinal quando uma comporta solta bate no corrimão. A água avança por baixo da plataforma, que começa a se inclinar.

Breno: — Eu já saí das bombas. Não vou ficar aqui até cair.

A sinalização aponta uma saída lateral no patamar alto.`,step:['Seguir a marca amarela e testar os degraus secos','Passar pela comporta batendo para cortar caminho','Saltitar sobre a parte inclinada enquanto ela cede'],follow:`O mascarado se aproxima pela porta de manutenção. Breno vê uma abertura protegida por um guarda-corpo firme.`,end:['Usar a escada protegida e avisar a equipe de resgate','Descer na água para escapar dos passos','Tentar segurar a comporta para impedir o mascarado']},
 samuel:{scene:`Samuel chega à saída de manutenção e vê uma caminhonete parada perto da cerca. A passagem para a rua está livre, mas um trecho da ponte ainda vibra quando o equipamento da estação começa a falhar.

Samuel: — Eu consigo chegar até lá. Sem fazer nenhuma burrice com carro desta vez.

Ele precisa escolher onde apoiar o peso.`,step:['Contornar o trecho pelo piso de concreto sinalizado','Subir na carroceria para saltar sobre a cerca','Atravessar a tábua central que está rangendo'],follow:`O assassino surge à distância, vindo da estação. Samuel percebe que há um portão manual na margem, com passagem suficiente para uma pessoa.`,end:['Usar o portão manual e fechá-lo depois da passagem','Pegar uma ferramenta para enfrentar o mascarado','Voltar sozinho à ponte para provocar uma distração']},
 laisla:{scene:`Laisla segura o corrimão da passarela com os dedos doloridos. A água bate contra as vigas, e sua lembrança do apartamento retorna quando uma porta se fecha atrás dela.

Laisla: — Eu não vou morrer no caminho de casa. Eu não vou.

A antiga escada da doca tem uma seção reforçada.`,step:['Descer pela seção reforçada segurando o cabo','Correr sobre as tábuas soltas da lateral','Saltitar até a doca sem ver a distância'],follow:`A sombra do mascarado aparece no alto. Laisla está a poucos metros do acesso à estrada.`,end:['Seguir pelo patamar seco e enviar a localização','Subir de volta para enfrentar o agressor','Tentar passar por baixo da estrutura com a água subindo']},
 rauanny:{scene:`Rauanny encontra a saída da passarela, mas a água da chuva cobriu a primeira parte da escada. A perna lateja; ela precisa decidir onde colocar o peso sem perder o equilíbrio.

Rauanny: — Não agora. Aguenta só mais um pouco.

Uma barra lateral ainda parece firme.`,step:['Usar o corrimão e pisar no degrau reforçado','Pular três degraus para ganhar tempo','Se apoiar na estrutura quebrada ao lado da escada'],follow:`O assassino aparece pelo acesso central. Rauanny reconhece o caminho mais curto até a estrada.`,end:['Manter o apoio e seguir até o chão seco','Voltar para desafiar o mascarado','Tentar atravessar a vala alagada sem sondar a profundidade']},
 ryan:{scene:`Ryan está perto da guarita, onde a cancela continua travada num ângulo estranho. A passarela externa termina a poucos metros dali; a rua fica além da portinhola lateral.

Ryan: — Por favor, Lakewood. Me dá UMA porta que funcione, só uma.

Ele encontra uma manivela de emergência sinalizada.`,step:['Acionar a trava manual pelo lado seco','Passar por baixo da cancela que está se movendo','Subir na grade metálica molhada'],follow:`O mascarado aparece no fim do acesso. Ryan vê a portinhola de serviço e um corredor escuro que parece encurtar o trajeto.`,end:['Passar pela portinhola e avisar os outros','Tentar atrair o mascarado para longe do acesso','Pular sobre a grade antes que termine de cair']},
 rayssa:{scene:`Rayssa permanece perto da cerca tentando organizar os pedidos de ajuda. Um alarme dispara dentro da guarita e as luzes do acesso começam a se apagar.

Rayssa: — Tá bom. Eu vou sair daqui. Todo mundo tem que sair.

Ela vê a saída de serviço e um portão que precisa de destravamento manual.`,step:['Abrir a trava externa e ficar do lado seguro','Entrar outra vez no corredor escuro sem avisar','Escalar a cerca sobre fios danificados'],follow:`A chuva diminui, mas o barulho de passos continua próximo. Rayssa encontra uma saída protegida por uma placa caída.`,end:['Usar a saída sinalizada e pedir resgate','Correr na direção dos passos para descobrir quem está ali','Voltar sozinha para retirar um objeto do chão']}
};
for(const [id,p] of Object.entries(LAST_ROUTE)){
 N('k8_r2_'+id,'ESTAÇÃO · PASSAGEM EXTERNA','17:57','lake',`PONTO DE VISTA: ${L[id].toUpperCase()}

${p.scene}

${L[id]} chegou pelo acesso indicado no último contato. À frente, a passagem estreita continua bloqueada; atrás, o som de passos se aproxima. Não há tempo para esperar outra instrução.`,[
 C(p.step[0],'k8_r2_follow_'+id,[S('r2_prep',id+':good')]),C(p.step[1],'k8_r2_follow_'+id,[S('r2_prep',id+':risk')]),C(p.step[2],'k8_r2_follow_'+id,[S('r2_prep',id+':danger')])]);
 N('k8_r2_follow_'+id,'ESTAÇÃO · ÚLTIMA SAÍDA','18:01','lake',`PONTO DE VISTA: ${L[id].toUpperCase()}

${p.follow}

O telefone vibra uma vez. ${L[id]} não tem certeza de quem enviou a mensagem e não pode ficar olhando para a tela agora. A saída está visível; cada segundo parado aumenta o risco.`,[
 C(p.end[0],'k8_risk2_out',[S('r2_final',id+':good')]),C(p.end[1],'k8_risk2_out',[S('r2_final',id+':risk')]),C(p.end[2],'k8_risk2_out',[S('r2_final',id+':danger')])]);
}
N('k8_after','ESTRADA DO LAGO · AMBULÂNCIAS','18:26','road',`PONTO DE VISTA: PROTAGONISTA

Os faróis das viaturas riscam a estrada molhada. Bombeiros cercam a entrada da estação e pedem que ninguém tente voltar ao prédio. Um deles examina suas mãos à procura de cortes; outro pergunta se há pessoas desaparecidas.

Você responde com os nomes e as últimas posições reais, sem completar as lacunas com suposições. A experiência da oficina ensinou a diferença entre não receber uma mensagem e confirmar uma morte.

Um paramédico encontra Bella na margem. Ela insiste em explicar onde deixou as fotografias antes de permitir que examinem seu ferimento.

Paramédico: — Primeiro vamos cuidar de você. Depois a polícia pergunta sobre papel.

Bella: — Eu sei. Só me deixa dizer onde tá o negócio antes que alguém jogue fora achando que é lixo.

Do prédio vem um estouro surdo. Ninguém volta. A polícia isola a instalação, e a chuva finalmente diminui sobre a margem.

Você procura os rostos que ainda consegue reconhecer. A soma não é apenas um número. Cada pessoa que chega carrega uma escolha, uma ferida ou a ausência de alguém.`,[G('k8_after_02','Conferir os feridos e as informações preservadas')]);
N('k8_after_02','HOSPITAL · CORREDOR DE ATENDIMENTO','20:15','town',`As cadeiras do hospital são as mesmas da noite anterior. Você se pergunta quantas vezes uma pessoa pode atravessar a mesma porta antes de começar a achar que nunca mais vai voltar para casa.

Uma assistente social oferece água aos sobreviventes. A polícia anota as últimas posições confirmadas. Pessoas que permaneceram fora da estação não são descritas como se tivessem participado da perseguição; recebem notícias por mensagem ou comparecem ao hospital quando podem.

Bella é levada para avaliação. O exame dela demora. Você observa pela janela uma ambulância indo embora sem sirene.

Você se lembra do desenho das estrelas no batente, da voz de Moisés antes de morrer e da forma como os amigos se olharam quando a mensagem sobre o traidor chegou.

Nenhum desses elementos é uma resposta. Mas já não parecem três histórias separadas.

Quando o médico permite, você se aproxima de Bella. Ela segura o celular com dificuldade e pede para conferir uma única fotografia antes de dormir.`,[
 C('Pedir que Bella descanse e guardar os arquivos de maneira segura','k8_evidence',[F('bella_recebe_apoio'),['trait','empatia',1]]),
 C('Conversar sobre o que as duas investigações conseguiram comprovar','k8_evidence',[F('bella_conversou_resultados')]),
 C('Perguntar o que ela lembra da estação sem insistir se estiver mal','k8_evidence',[F('bella_ouvida'),['trait','cautela',1]])]);
N('k8_evidence','HOSPITAL · SALA DE VISITAS','21:04','town',`PONTO DE VISTA: PROTAGONISTA

Bella autoriza que você veja as informações que foram preservadas. Algumas estão em fotografias; outras podem ter ficado nos arquivos recolhidos pelos investigadores. O que não foi encontrado permanece desconhecido.

Vocês tentam reconstruir uma linha do tempo sem completar os buracos com imaginação. Moisés visitou lugares próximos ao lago depois do desaparecimento. A estação continuou aparecendo em documentos administrativos. Uma anotação indica movimentação de materiais, mas não informa o conteúdo dos produtos nem quem os recebeu.

Bella: — Eu passei a vida inteira achando que era só olhar bem que o resto se explicava. Aí eu olho bem e aparece mais um buraco.

Você: — Pelo menos agora sabemos quais perguntas fazer.

Bella: — É. Só que eu tô cansada de perguntar pra gente que acaba morta.

Ela olha para a parede e respira devagar. A lembrança de Jullia parece ocupar a sala inteira. Pela primeira vez, você percebe que Bella talvez não esteja procurando uma pessoa desaparecida: esteja procurando o momento em que poderia ter feito alguma coisa diferente.

Os registros não mostram o assassino. Nem confirmam que Jullia recebeu cuidados. Mas apontam para dias depois daquela noite, quando todos acreditavam que a história já havia acabado.`,[G('k8_last_01','Comparar as datas uma última vez')]);
N('k8_last_01','HOSPITAL · DOCUMENTOS E CELULAR','21:18','phone',`PONTO DE VISTA: PROTAGONISTA

Você alinha o que realmente conseguiu preservar. Um registro administrativo, uma imagem incompleta e o histórico do encontro de Moisés são peças de histórias maiores. Nenhuma traz um nome escrito no lugar onde seria mais fácil encontrá-lo.

Bella consulta as datas em silêncio. Mesmo se estiver hospitalizada e sem condições de se sentar, pode ouvir as informações pelo telefone e confirmar quais arquivos vieram da biblioteca.

Você: — Moisés esteve na região depois do desaparecimento. Isso a gente consegue provar.

Bella: — E existe papel demais passando por aquela estação pra eu acreditar que ela tava completamente vazia.

Você: — Mas não sabemos quem foi até lá.

Bella: — Não. E eu não vou fingir que sei.

O telefone mostra a última mensagem que Moisés conseguiu enviar antes de morrer. Ele prometeu contar uma coisa. Talvez não fosse apenas sobre o atropelamento, nem apenas sobre o passado. Talvez fosse sobre o que alguém fez depois que os amigos voltaram para casa.

Você fecha a pasta sem encontrar uma resposta. Pela primeira vez, não é o silêncio daquela noite que assusta. São os meses que vieram depois.`,[G('k8_last_02','Ouvir o que Bella concluiu')]);
N('k8_last_02','LAKEWOOD · NOITE','21:27','town',`PONTO DE VISTA: PROTAGONISTA

Bella encontra forças para olhar para você. O corredor está quase vazio. Do lado de fora, a chuva se transformou em neblina baixa, cobrindo a rua com uma luz difusa.

Bella: — Eu achei que tava tentando descobrir por que minha irmã desapareceu.

Você: — E agora?

Bella: — Agora eu acho que preciso descobrir quem continuou mexendo nessa história quando todo mundo dizia que já tinha acabado.

Você percebe que ela não está anunciando uma conclusão. Está fazendo uma pergunta que ninguém queria ouvir. Os próximos passos não dependem de acusar um nome qualquer, mas de entender para que a estação foi usada e por que Moisés guardou tanto silêncio.

Em outra parte do hospital, o telefone de um sobrevivente vibra. Desta vez é apenas uma mensagem perguntando se todos chegaram em segurança. A banalidade do gesto parece preciosa.

Bella volta a olhar para a janela.

Bella: — Se o Moisés sabia de alguma coisa sobre aqueles meses, então eu não tava procurando no lugar certo. Faz um ano que eu olho pra noite em que a Ju sumiu. E se o que importa também aconteceu depois?

Você não responde. O lago aparece de novo na sua memória, escuro e quieto.

FIM DO CAPÍTULO 08 — ÁGUAS TURVAS`,[]);
const CLUES={
 c8_horarios_conferidos:{title:'Horários da última reunião',category:'Capítulo 8 · Grupo',text:'O grupo comparou mensagens da oficina, sem presumir que o endereço só poderia ter saído da conversa dos amigos.'},
 c8_ordens_estacao:{title:'Ordem de serviço da estação',category:'Capítulo 8 · Bella',text:'A estação recebeu registros técnicos em datas posteriores ao desaparecimento de Jullia; o solicitante não está identificado.'},
 c8_passagem_farmacia:{title:'Primeira referência ao pagamento',category:'Capítulo 8 · Bella',text:'Um extrato aponta passagem de Moisés por um estabelecimento próximo à estrada, sem informações sobre produtos.'},
 c8_registro_farmacia:{title:'Transação em uma farmácia',category:'Capítulo 8 · Bella',text:'Há data, valor total e estabelecimento. O documento não discrimina produtos, atendimento ou destinatário.'},
 c8_foto_passarela:{title:'Fotografia antiga da margem',category:'Capítulo 8 · Bella',text:'Uma foto mostra a estação, a passarela e uma caminhonete distante, cuja placa não pode ser identificada.'},
 c8_painel_isolado:{title:'Anotação sobre circuito de segurança',category:'Capítulo 8 · Bella',text:'A alimentação do painel dois possuía isolamento próprio, algo útil para interpretar o sistema da estação.'},
 c8_planta_drenagem:{title:'Planta parcial da estação',category:'Capítulo 8 · Bella',text:'O desenho indica salas de bombas, acesso à margem e passagem de serviço. Não comprova a passagem de suspeitos.'},
 c8_registro_guarita:{title:'Livro da guarita',category:'Capítulo 8 · Estação',text:'Páginas digitalizadas e registros físicos podem ser comparados pela data, com lacunas ainda não esclarecidas.'},
 c8_planta_completa:{title:'Acessos sinalizados da estação',category:'Capítulo 8 · Estação',text:'A sinalização da entrada diferencia corredores interditados, salas técnicas e rota de acesso público.'},
 c8_protocolos_cruzados:{title:'Protocolos da estação',category:'Capítulo 8 · Estação',text:'A sequência das ordens confirma movimentações administrativas em datas distintas, sem identificar o usuário da instalação.'},
 c8_foto_verso:{title:'Fotografia com anotação no verso',category:'Capítulo 8 · Estação',text:'O verso de uma fotografia registra um código administrativo, sem nome legível.'},
 c8_backup_arquivo:{title:'Referência à cópia de segurança',category:'Capítulo 8 · Estação',text:'Há notícia de uma cópia arquivada fora da estação, que pode ser solicitada à prefeitura.'},
 c8_copia_envelope:{title:'Fotografias do envelope',category:'Capítulo 8 · Estação',text:'Imagens mostram datas, códigos e registros incompletos; falta comprovar quem utilizou a instalação.'},
 c8_envelope_original:{title:'Envelope original protegido',category:'Capítulo 8 · Estação',text:'Uma pasta física com registros administrativos posteriores ao desaparecimento, sem nome de paciente ou lista de produtos.'},
 c8_codigos_anotados:{title:'Códigos do envelope',category:'Capítulo 8 · Estação',text:'Transcrição parcial de códigos, menos completa que imagens ou originais.'},
 c8_estrelas_madeira:{title:'Duas estrelas na janela',category:'Capítulo 8 · Estação',text:'O entalhe lembra um desenho de infância da família Gomes, mas não há data nem identificação da autoria.'},
 c8_prova_completa:{title:'Registro da estação preservado',category:'Capítulo 8 · Investigação',text:'O arquivo original ou cópia completa foi preservado; não indica quem recebeu eventuais entregas.'},
 c8_prova_parcial:{title:'Fragmentos de registro da estação',category:'Capítulo 8 · Investigação',text:'Algumas datas e códigos sobreviveram, sem informações suficientes para concluir quem esteve ali.'},
 c8_outra_linha:{title:'Referência independente à estação',category:'Capítulo 8 · Investigação',text:'Mesmo sem o envelope, os arquivos da biblioteca confirmam a existência da estação e uma linha de investigação ainda aberta.'}
};
const STAGE_LOC={bombas:'sala das bombas',passarela:'passarela externa',estrada:'acesso da estrada',resgatado:'ponto seguro',fora:'área externa'};
function positions(s){const f=s.flags; if(!f.c8_pos||typeof f.c8_pos!=='object')f.c8_pos={};for(const id of invited(s))if(!f.c8_pos[id])f.c8_pos[id]=SPOTS[id]||'estrada';}
function candidate(s,which){positions(s);const f=s.flags;const people=invited(s).filter(id=>!f['c8_morto_'+id]);
 if(which===1){const priorities=['isabella','allan','breno','samuel'];return priorities.find(x=>people.includes(x)&&f.c8_pos[x]==='bombas')||null;}
 const used=f.c8_risk1_target; const order=['laisla','rauanny','ryan','breno','samuel','isabella','allan'];
 return order.find(x=>people.includes(x)&&x!==used&&(f.c8_pos[x]==='passarela'||f.c8_pos[x]==='estrada'))||null;
}
function preparedness(f,kind){if(kind===1){
 const setup=Number(!!(f.c8_leu_planta||f.c8_mapa_estacao||f.c8_planta_bella||f.c8_circuitos_mapeados||f.c8_painel_planejado));
 const coordination=Number(!!(f.c8_contatos_prontos||f.c8_combinou_posicoes||f.c8_posicoes_confirmadas||f.c8_hero_rede_organizada));
 const action=Number(!!f.c8_hero_painel_seguro);
 return setup+coordination+action;
 }
 return Number(!!(f.c8_mapa_estacao||f.c8_planta_bella||f.c8_leu_planta||f.c8_saida_conferida))+Number(!!(f.c8_posicoes_confirmadas||f.c8_combinou_posicoes||f.c8_contatos_prontos||f.c8_bella_localizou))+Number(!!(f.c8_r2_hero_lateral||f.c8_r2_hero_radio));
}
function riskOutcome(s,part){const f=s.flags,who=f['c8_risk'+part+'_target'];if(!who||dead(s,who))return 'none';
 const a=String(f['c8_r'+part+'_prep']||''),b=String(f['c8_r'+part+'_final']||'');
 const good=Number(a===who+':good')+Number(b===who+':good');
 const score=preparedness(f,part)+good;
 // Safety must be earned by planning and two coherent actions; low scores are lethal.
 return score>=4?'safe':score===3?'injured':'fatal';
}
function markRisk(s,part){const f=s.flags;if(f['c8_risk'+part+'_resolved'])return;f['c8_risk'+part+'_resolved']=true;
 const id=f['c8_risk'+part+'_target'],status=riskOutcome(s,part);f['c8_risk'+part+'_result']=status;
 if(!id||status==='none')return;
 if(status==='fatal'){
  const n=ids.filter(x=>f['c8_morto_'+x]).length;
  if(n<2)f['c8_morto_'+id]=true;else f['c8_grave_'+id]=true;
 }else if(status==='injured')f['c8_grave_'+id]=true;
 f.c8_pos[id]=status==='fatal'?'sem_retorno':'resgatado';
}
function bellaOutcome(s){const f=s.flags;const before=Number(!!(f.c8_planta_bella||f.c8_leu_planta||f.c8_mapa_estacao)) + Number(!!(f.c8_arquivo_fotografado||f.c8_arquivo_protegido||f.c8_bolsa_impermeavel));
 const first=f.c8_bella_etapa1_mapa?2:f.c8_bella_etapa1_esconder?1:0;
 const second=f.c8_bella_localizou?1:f.c8_bella_preservou_foto?1:0;
 const third=f.c8_bella_final_apoio?2:f.c8_bella_final_inferior?1:0;
 const score=before+first+second+third;
 f.c8_bella_condicao=score>=5?'leve':score>=3?'grave':'hospital';
 if(f.c8_bella_condicao!=='leve')f.c8_grave_bella=true;
 if(f.c8_bella_condicao==='hospital')f.c8_hospital_bella=true;
 f.c8_bella_escapou=true;
 const original=!!f.c8_arquivo_protegido&&!f.c8_bella_abandonou_papel&&score>=4;
 const copy=!!(f.c8_arquivo_fotografado||f.c8_bella_preservou_foto||f.c8_copia_separada||f.c8_bolsa_impermeavel);
 f.c8_prova=original?'completa':copy?'parcial':'perdida';
 if(f.c8_prova==='completa'&&!s.clues.includes('c8_prova_completa'))s.clues.push('c8_prova_completa');
 if(f.c8_prova==='parcial'&&!s.clues.includes('c8_prova_parcial'))s.clues.push('c8_prova_parcial');
 if(f.c8_prova==='perdida'&&!s.clues.includes('c8_outra_linha'))s.clues.push('c8_outra_linha');
}
function enter(s,id){if(!s?.flags||!id.startsWith('k8_'))return false;const f=s.flags,stamp='c8_enter_'+id;if(f[stamp])return false;f[stamp]=true;
 if(id==='k8_invited')positions(s);
 if(id==='k8_bella_out')bellaOutcome(s);
 if(id==='k8_risk1'){positions(s);f.c8_risk1_target=candidate(s,1)||'';}
 if(id==='k8_risk2_pov'){positions(s);f.c8_risk2_target=candidate(s,2)||'';}
 if(id==='k8_risk1_out')markRisk(s,1);
 if(id==='k8_risk2_out')markRisk(s,2);
 if(id==='k8_last_02')f.c8_concluido=true;
 return true;
}
function onChoice(s,id,c){if(!id.startsWith('k8_'))return;const f=s.flags;
 if(id==='k8_invite'&&c.to==='k8_invite'){const e=(c.effects||[]).find(x=>x[0]==='flag'&&String(x[1]).startsWith('c8_join_'));if(e){const who=e[1].slice('c8_join_'.length);if(dead(s,who)||heavy(s,who)||trust(s,who)<34){f['c8_join_'+who]=false;f['c8_recusou_'+who]=true;}}}
}
const ROMANCE_LINES={
 ryan:`Ryan: — Eu fiquei lembrando daquele jantar. Do jeito que você riu quando eu falei da sobremesa. Eu sei que é uma coisa pequena, mas eu quero mais noites em que a gente discuta sobremesa, não suspeitos.`,
 breno:`Breno: — Eu gostei de ter uma noite em que ninguém precisou gritar. Eu não sabia se era certo querer aquilo com tudo acontecendo. Agora acho que era exatamente por isso que eu queria.`,
 rayssa:`Rayssa: — Sobre aquele jantar... eu não queria que você pensasse que foi só uma tentativa de esquecer as coisas. Eu queria estar com você. Mesmo sem conseguir explicar tudo o que sentia.`,
 rauanny:`Rauanny: — Eu sei que no jantar eu falei um monte de besteira pra parecer tranquila. Mas eu tava feliz de estar com você. Era bom conseguir pensar numa pessoa e não numa saída de emergência.`
};
function resolve(id,s,n){if(!n||!id.startsWith('k8_'))return n;const f=s.flags||{};let text=n.text,choices=[...(n.choices||[])],location=n.location;
 const live=alive(s),inArea=invited(s);const group=names(live);const inPerson=names(inArea);
 if(id==='k8_01'){
  const deadList=ids.filter(x=>dead(s,x));
  text+='\n\n'+(deadList.length?'Os lugares vazios de '+names(deadList)+' tornam a sala menor. Não há resposta para quem já não pode se defender.':'Todos os oito amigos conseguiram sobreviver às perseguições anteriores. Isso não significa que ainda consigam confiar uns nos outros.');
  const present=live.filter(x=>!heavy(s,x));text+='\n\nNa sala estão '+(present.length?names(present):'apenas você e uma funcionária do hospital')+'. '+(live.filter(x=>heavy(s,x)).length?'Por chamada ou mensagens participam '+names(live.filter(x=>heavy(s,x)))+', que precisam permanecer em atendimento.':'Os demais sobreviventes ainda conseguem participar da discussão pessoalmente.');
 }
 if(id==='k8_02'){
  const voices=['samuel','laisla','isabella','rauanny','breno','ryan','allan','rayssa'].filter(x=>live.includes(x));
  text+='\n\n'+voices.slice(0,6).map(x=>(heavy(s,x)?L[x]+' acompanha a discussão por chamada, ainda recebendo atendimento no hospital.':FURTHER[x])+'\n\n'+accusatory[x]).join('\n\n');
  const accuse=voices.find(x=>x!=='rayssa')||null;
  if(accuse)text+='\n\n'+L[accuse]+': — E você? '+hero(s)+', você sabia onde o Moisés ia estar. O que exatamente contou pros outros?';
  choices=[C('Responder às acusações feitas contra você','k8_accuse_self',[F('foi_acusado')]),...voices.slice(0,5).map(x=>C('Defender '+L[x]+' e pedir que parem de acusar sem provas','k8_defend',[S('defendeu',x),B(x,5),...voices.filter(y=>y!==x).slice(0,2).map(y=>B(y,-2))])),C('Exigir que todos entreguem seus horários antes de acusar alguém','k8_conflict',[F('cobrou_horarios'),Q('c8_horarios_conferidos')])];
 }
 if(id==='k8_accuse_self'){
  const speaker=['samuel','isabella','laisla','rauanny','breno','ryan','allan','rayssa'].find(x=>live.includes(x));
  if(speaker)text=text.replace('Um dos sobreviventes se volta para você.',''+L[speaker]+' se volta para você.').replace('Uma segunda voz se intromete antes que você abra a boca.',(live.find(x=>x!==speaker)?L[live.find(x=>x!==speaker)]+' pede que '+L[speaker]+' deixe você terminar uma frase.':'A enfermeira pede que a conversa não vire outro confronto.'));
 }
 if(id==='k8_defend'){const p=f.c8_defendeu; if(p)text+='\n\n'+L[p]+': — Obrigado por não transformar medo em sentença. Eu não vou esquecer disso.';}
 if(id==='k8_conflict'){
  if(f.c8_exibiu_celular)text+='\n\nVocê mostrou o histórico com horários verificáveis. Mesmo quem discordou de você precisa reconhecer que existe uma diferença entre uma suspeita e um registro.';
  if(f.c8_reagiu_acusacao)text+='\n\nA maneira como você respondeu deixou alguns amigos ainda mais fechados. A discussão não desaparece só porque a sala ficou silenciosa.';
  const betrayed=f.c8_defendeu;if(betrayed)text+='\n\n'+L[betrayed]+' permanece perto de você enquanto os outros se afastam. Defender alguém teve consequências dos dois lados.';
 }
 if(id==='k8_03'){
  const lost=ids.filter(x=>dead(s,x));if(lost.length)text+='\n\nA memória de '+names(lost)+' pesa mais do que qualquer manchete. Você não encontra palavras para nomes que deveriam estar presentes.';
  if(f.c7_hero_presenciou_desfecho)text+='\n\nVocê não consegue afastar a imagem dos últimos instantes de Moisés na oficina. Não é uma reportagem; é uma coisa que você presenciou.';
  else if(f.c7_hero_ouviu_morte)text+='\n\nO som da chamada interrompida continua voltando quando você tenta dormir. Você ouviu Moisés pedir socorro, mas não viu quem o atacou.';
  else text+='\n\nO momento em que encontraram Moisés — ou confirmaram seu destino — ainda pesa em seu corpo.';
 }
 if(id==='k8_04'&&!dead(s,'rayssa')){
   text+='\n\n'+(heavy(s,'rayssa')?'Rayssa envia uma mensagem de voz curta para Bella do quarto de atendimento.':'Rayssa aparece na área externa do hospital, segurando um copo de café que já esfriou.')+'\n\nRayssa: — Bella, eu soube do Moisés. Eu queria perguntar se você precisa de alguma coisa.\n\nBella: — Eu preciso de uma resposta. Não sei se você tem uma dessas.\n\nRayssa: — Não. Mas se tiver alguma coisa prática que eu possa fazer, eu faço.\n\nBella: — Então não deixa ninguém sumir de vista hoje. Já chega de silêncio.\n\nRayssa demora um segundo antes de responder.\n\nRayssa: — Eu vou tentar.\n\nBella se afasta. O cuidado de Rayssa parece sincero, mas não resolve a necessidade de Bella de encontrar provas.';
 }
 if(id==='k8_04'&&trust(s,'bella')<40&&!f.c8_bella_confianca){text+='\n\nBella: — Eu não tô dizendo que você inventou tudo. Tô dizendo que, depois de ontem, eu não vou aceitar sua palavra no lugar de um documento. Entendeu?';}
 if(id==='k8_bella_compare'){
  if(f.c8_arquivo_farmacia)text+='\n\nO comprovante da farmácia está entre as páginas, sem relação de produtos. Bella evita chamar a visita de «compra de remédios» — o registro não permite dizer isso.';
  if(f.c8_arquivo_servico)text+='\n\nA anotação do sistema de drenagem indica um acesso de inspeção que pode ser útil caso a estação seja visitada.';
 }
 if(id==='k8_bella_message'){text+='\n\n'+(f.c8_bella_compartilhou?'Bella enviou fotografias de todas as páginas que julgou verificáveis, inclusive os trechos que contradizem sua hipótese inicial.':f.c8_bella_guardou?'Bella enviou o endereço e avisou que ainda precisa confirmar uma anotação antes de mostrar a página inteira.':'Bella encaminhou apenas a localização e disse que não pretende chamar suspeita de prova.');}
 if(id==='k8_06'){
  const willing=live.filter(x=>!heavy(s,x)&&trust(s,x)>=34);
  const reluctant=live.filter(x=>!willing.includes(x));
  if(reluctant.length)text+='\n\n'+names(reluctant)+' não está disponível para um encontro agora. Pode ser pelo atendimento médico ou pela maneira como a discussão terminou. Você respeita isso.';
  choices=willing.map(x=>C('Conversar a sós com '+L[x],'k8_friend_'+x,[S('amigo_escolhido',x)]));
  choices.push(C('Dar espaço aos outros e seguir com a investigação','k8_unavailable',[F('sem_conversa')]));
 }
 if(id==='k8_07'){
  const love=s.romanceEscolhido;
  if(ROMANCE_LINES[love]&&!dead(s,love))text+='\n\n'+L[love]+' manda uma mensagem particular, antes de você sair.\n\n'+ROMANCE_LINES[love]+'\n\nVocê lê duas vezes. Não é uma promessa de namoro nem uma solução para o medo. É uma pessoa específica tentando permanecer perto.';
  else if(love&&love!=='solteiro'&&dead(s,love))text+='\n\nVocê encontra a última conversa com '+L[love]+' entre as mensagens antigas. Não há uma resposta nova. A ausência torna a ideia de voltar ao lago mais difícil de suportar.';
  if(f.c8_reagiu_acusacao)text+='\n\nVocê percebe que certas pessoas ainda não responderam depois de sua reação no hospital. Não pode fingir que a relação está resolvida.';
 }
 if(id==='k8_prepare'){text+='\n\nBella: — A única regra que eu faço questão é não fingir que sabe onde alguém tá se não tiver recebido confirmação. Eu cansei de gente sumindo e os outros inventando um final pra história.';}
 if(id==='k8_invite'){
  const already=ids.filter(x=>f['c8_join_'+x]);const possible=live.filter(x=>!already.includes(x)&&!f['c8_recusou_'+x]&&!heavy(s,x));
  const no=ids.filter(x=>f['c8_recusou_'+x]);
  text+='\n\nConvites confirmados até agora: '+(already.length?names(already):'nenhum')+'.';
  if(no.length)text+='\n\n'+names(no)+' recusou participar. Você não insistirá para que alguém ferido ou desconfiado atravesse uma área perigosa.';
  choices=possible.map(x=>C('Convidar '+L[x]+' e explicar os riscos da estação','k8_invite',[F('join_'+x),B(x,1)]));
  choices.push(G('k8_invited','Encerrar os convites e seguir com quem aceitou'));
 }
 if(id==='k8_invited'){
  text+='\n\n'+(inArea.length?'Acompanham a investigação presencial: '+inPerson+'.':'Nenhum amigo aceitou acompanhar o protagonista. Apenas você e Bella seguem para conferir o registro autorizado.');
  const outside=live.filter(x=>!inArea.includes(x));if(outside.length)text+='\n\n'+names(outside)+' permanece fora da investigação presencial, por escolha própria ou porque ainda precisa de repouso. Eles não aparecerão de repente no interior da estação.';
  text+='\n\nAs posições combinadas foram registradas: '+inArea.map(x=>L[x]+' — '+(STAGE_LOC[f.c8_pos?.[x]]||'acesso sinalizado')).join('; ')+'.';
 }
 if(id==='k8_station_01'||id==='k8_station_04'){
  const together=inArea.filter(x=>f.c8_pos?.[x]==='bombas');
  const external=inArea.filter(x=>!together.includes(x));
  if(inArea.length)text+='\n\nPelas confirmações recebidas, '+(together.length?names(together)+' se encontra perto da galeria das bombas. ':'')+(external.length?names(external)+' está na área externa ou na estrada. ':'')+'Vocês não presumem que alguém está no mesmo corredor sem vê-lo.';
 }
 if(id==='k8_bella_02'){
  if(f.c8_bella_etapa1_mapa)text+='\n\nBella usa a fotografia da planta para reconhecer uma curva da escada superior. Chegou até aqui conferindo o trajeto, mas ainda precisa sair.';
  if(f.c8_bella_etapa1_passarela)text+='\n\nA porta externa custou tempo e força. O vento molhou parte da bolsa; a proteção do envelope agora importa ainda mais.';
  if(f.c8_bella_etapa1_esconder)text+='\n\nEla ganhou alguns segundos escondida, mas ficou sem confirmação de quem passou pelo corredor durante aquele intervalo.';
 }
 if(id==='k8_bella_03'){
  if(f.c8_bella_localizou)text+='\n\nO celular finalmente confirmou o envio da posição. A informação poderá ajudar o protagonista a alcançá-la.';
  if(f.c8_bella_abandonou_papel)text+='\n\nO envelope ficou no setor anterior. Bella não tem como recuperá-lo sem voltar a se expor ao mascarado.';
 }
 if(id==='k8_bella_out'){
  if(f.c8_bella_condicao==='leve')text+='\n\nBella está com cortes superficiais nas mãos e o pulso dolorido, mas consegue caminhar até a margem sem ajuda. Respira fundo e verifica que ainda consegue usar o telefone.';
  else if(f.c8_bella_condicao==='grave')text+='\n\nBella alcança a saída apoiando o peso no lado menos ferido. Uma queda machucou seriamente sua perna, e ela sabe que precisará de atendimento. Não tenta fingir que poderia correr normalmente.';
  else text+='\n\nBella cai perto da margem e não consegue se levantar sem ajuda. Uma lesão importante e a perda de sangue tornam urgente o atendimento. Ela permanece consciente o suficiente para informar onde está, mas não poderá continuar a investigação andando por aí.';
  text+='\n\n'+(f.c8_prova==='completa'?'O original está protegido; o registro poderá ser examinado de forma íntegra.':f.c8_prova==='parcial'?'Pelo menos uma cópia ou anotação legível permanece no telefone. Parte do documento original se perdeu.':'O papel e as imagens principais se perderam durante a fuga. Restam apenas referências independentes da biblioteca.');
 }
 if(id==='k8_risk1'){
  const who=f.c8_risk1_target;
  if(!who){text+='\n\nTodos os acompanhantes que permaneceram na galeria confirmaram uma saída ou nunca entraram nesse setor. As últimas mensagens confirmam que os outros já estão fora desta sala. O chamado de emergência não vem daqui.';choices=[G('k8_sector_empty','Confirmar a galeria vazia e procurar a margem')];}
  else{
   const others=inArea.filter(x=>x!==who&&f.c8_pos?.[x]==='bombas');
   text+='\n\nA mensagem mais recente é de '+L[who]+', que continua na '+STAGE_LOC[f.c8_pos[who]]+'. '+(others.length?names(others)+' também tinha acesso à galeria, mas não confirmou estar ao lado de '+L[who]+'.':'Nenhum outro amigo confirmou estar com '+L[who]+' neste setor.')+'\n\n'+L[who]+': — '+POV[who].voice+'\n\nVocê não poderá responder pela pessoa à distância. A narrativa vai acompanhar o que '+L[who]+' realmente consegue fazer.';
   choices=[G('k8_pov_'+who,'PONTO DE VISTA: '+L[who].toUpperCase())];
  }
 }
 if(id==='k8_risk1_out'){
  const who=f.c8_risk1_target,result=f.c8_risk1_result;
  if(who){
   if(result==='safe')text+='\n\n'+L[who]+' confirma pelo telefone que conseguiu alcançar a saída técnica sem novos ferimentos graves. O plano e as decisões durante o perigo funcionaram em conjunto.';
   else if(result==='injured')text+='\n\nO pedido de socorro de '+L[who]+' chega acompanhado da localização. '+L[who]+' sobreviveu, mas sofreu um ferimento sério tentando vencer o obstáculo. A equipe médica será avisada antes de qualquer reencontro.';
   else text+='\n\nO último contato de '+L[who]+' foi feito na galeria. A equipe de resgate chega ao local e confirma que '+L[who]+' não resistiu aos ferimentos. A tela permanece silenciosa quando você volta a procurar seu nome.';
  }
 }
 if(id==='k8_risk2_pov'){
  const who=f.c8_risk2_target;
  if(!who){text+='\n\nA última checagem confirma que não há outro acompanhante exposto na passarela. Todos os convidados que podiam passar por aqui já avisaram sobre suas saídas ou permanecem em outra posição segura.';choices=[G('k8_risk2_empty','Seguir sem procurar alguém que não ficou aqui')];}
  else{text+='\n\nO telefone mostra a última posição de '+L[who]+': '+(STAGE_LOC[f.c8_pos?.[who]]||'acesso externo')+'. O mascarado ainda está próximo da estrutura. '+L[who]+' precisa agir antes de conseguir falar novamente.';choices=[G('k8_r2_'+who,'PONTO DE VISTA: '+L[who].toUpperCase())];}
 }
 if(id==='k8_risk2_out'){
  const who=f.c8_risk2_target,res=f.c8_risk2_result;
  if(who){text+='\n\n'+(res==='safe'?L[who]+' alcançou a estrada pelo acesso sinalizado. A confirmação chega com horário e localização, sem ambiguidade.':res==='injured'?L[who]+' conseguiu sair da passarela, mas sofreu uma lesão importante. O resgate médico será necessário; a pessoa não continua correndo como se nada tivesse acontecido.':'A equipe encontra '+L[who]+' perto da última passagem. Os ferimentos foram fatais. Essa confirmação encerra sua perspectiva jogável e será respeitada pelas próximas cenas.');}
 }
 if(id==='k8_after'){
  const lost=ids.filter(x=>f['c8_morto_'+x]);const survivors=inArea.filter(x=>!lost.includes(x));
  text+='\n\n'+(survivors.length?'Entre os acompanhantes que chegaram à estação, estão vivos '+names(survivors)+'.':'Nenhum acompanhante precisou ser retirado da estação além de você e Bella.');
  if(lost.length)text+='\n\nOs socorristas confirmaram a morte de '+names(lost)+'. Não se trata de um telefone sem resposta: há uma confirmação que o grupo terá de enfrentar.';
  text+='\n\nA última localização conhecida de cada amigo foi anotada antes de vocês saírem da estrada. Ninguém reaparece misteriosamente na cena do resgate.';
 }
 if(id==='k8_after_02'){
  const lost=ids.filter(x=>f['c8_morto_'+x]);if(lost.length)text+='\n\nA notícia de '+names(lost)+' se espalha entre os amigos que ficaram em casa ou no hospital. As reações não são iguais: alguns choram, outros pedem para ficar sozinhos. Nenhuma mensagem nova vem de quem morreu.';
  if(f.c8_bella_condicao==='hospital')text+='\n\nBella está internada sob observação, com ferimentos que não permitem que caminhe sem auxílio. Ela conversa por chamada ou durante uma visita autorizada, sem sair para outra investigação.';
  else if(f.c8_bella_condicao==='grave')text+='\n\nBella recebeu atendimento para a lesão na perna. Ela consegue falar, mas evita apoiar peso e sabe que os próximos dias serão de recuperação.';
  else text+='\n\nBella recebeu cuidados para escoriações e foi orientada a descansar. Ainda está abalada, mas pode conversar sem precisar de internação.';
 }
 if(id==='k8_evidence'){
  if(f.c8_prova==='completa')text+='\n\nO envelope original foi preservado em condições que permitem conferir páginas e códigos. Nenhuma anotação exige inventar destinatários.';
  else if(f.c8_prova==='parcial')text+='\n\nO original se perdeu, mas fotografias ou notas permitem recuperar algumas datas. Os detalhes ausentes continuam ausentes.';
  else text+='\n\nNão há envelope original nem fotografia completa. Bella abre os registros que consultou na biblioteca. Só esses dados independentes podem sustentar a nova hipótese.';
  if(s.clues.includes('c8_registro_farmacia'))text+='\n\nO recibo da farmácia aparece novamente. Ele mostra estabelecimento, valor e dia, mas não lista o que Moisés comprou; não há motivo para afirmar que era remédio ou que alguém recebeu tratamento.';
  if(f.c8_bella_condicao==='hospital')text=text.replace('Bella autoriza que você veja as informações que foram preservadas.','Bella autoriza por chamada, do quarto de observação, que você veja as informações preservadas.');
 }
 if(id==='k8_last_02'){
  const lost=ids.filter(x=>f['c8_morto_'+x]);if(lost.length)text+='\n\nA lembrança de '+names(lost)+' torna a palavra «verdade» mais difícil de pronunciar. A busca custou vidas e ainda não terminou.';
 }
 return {...n,text,choices,location};
}
function timer(s,id,choices){if(!s||!id.startsWith('k8_')||s.social107?.timedOff)return null;if(/^k8_bella_0[123]$/.test(id))return {secs:18,fallback:choices.length-1};if(/^k8_(?:pov_follow_|r2_follow_)/.test(id))return {secs:15,fallback:choices.length-1};return null;}
function phoneThreads(s,base){if(!s||!s.flags?.c8_enter_k8_01)return base;const threads=base.map(t=>({...t,messages:[...(t.messages||[])]}));
 const get=(id,name)=>{let t=threads.find(x=>x.id===id);if(!t){t={id,name,sub:'Mensagens de Lakewood',messages:[],replyKey:''};threads.push(t)}return t;};
 if(s.flags.c8_enter_k8_bella_message){get('bella','Bella Gomes').messages.push({who:'Bella',time:'CAPÍTULO 8 · TARDE',text:'Encontrei registros da antiga estação do lago. Quero verificar as datas. Não vou acusar ninguém com base em palpite.'});}
 if(s.flags.c8_enter_k8_invited){get('bella','Bella Gomes').messages.push({who:'Bella',time:'CAPÍTULO 8 · ESTAÇÃO',text:'Me confirma seu acesso quando chegar. Sem inventar localização de ninguém, pelo amor de Deus.'});}
 if(s.flags.c8_enter_k8_bella_out){get('bella','Bella Gomes').messages.push({who:'Bella',time:'CAPÍTULO 8 · FUGA',text:s.flags.c8_hospital_bella?'Consegui chegar à margem, mas tô machucada. Preciso de ajuda médica.':'Saí pela margem. Tô viva. Confere os outros, por favor.'});}
 return threads;
}
window.UG8=Object.freeze({dead,heavy,enter,onChoice,resolve,timer,phoneThreads,clues:CLUES,invited,positions,calc:riskOutcome});
// Chapter 7 ending is the prologue to the new argument. Keep the old save node valid.
if(window.NODES?.j_fim)window.NODES.j_fim.choices=[G('k8_01','CAPÍTULO 08 · COMEÇAR ÁGUAS TURVAS')];
for(const n of nodes){window.HISTORIA.push(n);window.NODES[n.id]=n;}
})();
