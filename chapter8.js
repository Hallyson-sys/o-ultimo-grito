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
N('k8_01','HOSPITAL · SALA RESERVADA','00:48','house',`A terceira mensagem aparece na tela de todos os aparelhos: «Boa noite, traidores.»

O relógio do corredor avança mais um minuto. A funcionária da recepção passa ao lado da porta sem entrar. Na sala reservada, os sobreviventes não se levantam. Ninguém quer ser a primeira pessoa a olhar para outra.

O celular de Moisés, ou o pouco que restou dele, está sendo examinado. A notícia de sua morte ainda não se assentou: um rapaz que ligou pedindo ajuda acabou morto antes que pudesse terminar uma frase. Vocês conheciam seu rosto, suas mentiras, seu medo.

Você põe o telefone de frente para a mesa.

Você: — Não dá pra fingir que essa mensagem não chegou pra todos nós.

Ninguém discorda. O que começa como silêncio logo se transforma em vozes sobrepostas. Não é só a ameaça. É o fato de terem sobrevivido a tantas noites e ainda não conseguirem explicar quem está entregando seus passos.

A policial pediu que preservassem o histórico. As mensagens continuam intactas, iluminando a mesa como pequenas acusações.`,[G('k8_debate','Deixar que todos digam o que estão guardando'),G('k8_debate','Pedir calma e exigir que confiram os horários',[['trait','cautela',1]])]);
N('k8_debate','HOSPITAL · SALA RESERVADA','00:50','house',`O que parecia um momento de silêncio começa a virar discussão quando uma cadeira é empurrada para trás.

Você conhece aquelas vozes desde antes da estrada. Sabe quando Samuel está perdendo a paciência e quando Isabella tem algo a dizer, mas espera o momento de mostrar uma prova. Só que hoje o medo muda a expressão de todos.

O celular na mesa continua com a mesma mensagem: «Boa noite, traidores».

Você: — Antes que alguém saia acusando o primeiro nome que vier à cabeça, a gente precisa lembrar do que sabe.

A resposta não vem de uma pessoa só. Vem de quem ainda está ali e não aguenta mais guardar a raiva.

A enfermeira passa no corredor e pede que baixem as vozes. Ninguém parece ter escutado.`,[
 C('Dizer que suspeitas não são provas','k8_02',[F('tentou_mediar'),['trait','cautela',1]]),
 C('Perguntar quem sabia do encontro com Moisés','k8_02',[F('cobrou_acesso'),['trait','franqueza',1]]),
 C('Admitir que também está com medo de ser traído','k8_02',[F('admitiu_medo'),['trait','empatia',1]])]);
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
N('k8_defend','HOSPITAL · SALA RESERVADA','00:56','house',`Você se levanta no meio da discussão e pede que escutem até o fim. A conversa não acabou; alguém precisa distinguir o que realmente aconteceu das conclusões que todos tiraram com medo.

A tela do celular permanece aberta com o histórico do grupo. O som dos aparelhos vibrando já basta para deixar a sala inquieta.

Você insiste que uma acusação precisa de provas e que a pessoa que está defendendo deve ter o direito de responder. O que acontece a seguir depende de quem você decidiu apoiar.`,[G('k8_conflict','Aceitar que a discussão deixou marcas',[F('defendeu_alguem')])]);
N('k8_conflict','HOSPITAL · CORREDOR','01:02','house',`A discussão não acaba com um pedido de desculpas. Termina porque a enfermeira pede silêncio e porque ninguém tem fôlego para continuar gritando.

Alguns amigos se despedem de forma mecânica. Outros não olham para você. A porta se fecha devagar; não existe vitória naquele silêncio.

Você fica parado no corredor, ouvindo o ar-condicionado. Na tela, a conversa do grupo permanece aberta. Agora toda palavra digitada parece carregar uma segunda intenção.

Lá fora, a chuva começa a bater nas vidraças do hospital. A próxima vez em que precisar pedir ajuda talvez não baste escrever «vem comigo».

Você olha os nomes que continuam no grupo. Alguns já não poderão responder nunca mais.`,[G('k8_debate_end','Encarar as consequências do que foi dito')]);
N('k8_debate_end','HOSPITAL · CORREDOR','01:07','house',`A porta da sala se fecha. Você ainda ouve uma voz pedindo que ninguém apague mensagens, seguida por uma resposta irritada que não consegue distinguir.

O corredor cheira a desinfetante. Não parece o mesmo lugar onde vocês chegaram tentando se abraçar depois da oficina.

Você pega o celular. Há pessoas para quem seria fácil escrever uma desculpa, outras que provavelmente deixariam a mensagem sem resposta. A última vez que o grupo decidiu tudo num impulso, alguém desapareceu e o mundo de vocês se partiu.

Você se senta perto da máquina de água e espera que a respiração volte ao normal. Ninguém precisa acreditar que a discussão resolveu alguma coisa. Ela apenas deixou claro que os próximos pedidos de ajuda talvez tenham respostas diferentes.`,[
 C('Enviar ao grupo os horários que puder comprovar','k8_noite_separados',[F('enviou_horarios'),Q('c8_horarios_conferidos')]),
 C('Mandar mensagem privada a quem você magoou','k8_noite_separados',[F('tentou_reaproximar'),['trait','empatia',1]]),
 C('Guardar o telefone e respeitar a distância de quem saiu','k8_noite_separados',[F('respeitou_distancia'),['trait','cautela',1]])]);
N('k8_noite_separados','HOSPITAL · SALA DE ESPERA','01:17','house',`A máquina de café faz um barulho alto demais para aquele corredor. Você compra uma bebida que nem tem vontade de tomar, só para ter alguma coisa entre as mãos.

Uma enfermeira passa com uma caixa de máscaras descartáveis. Reconhece o grupo pela movimentação da madrugada anterior e pergunta se alguém precisa que ela chame um médico.

Você: — Não. Só... se alguém perguntar por mim, tô aqui.

Ela assente e segue o caminho.

Ao olhar o celular, você percebe como a discussão dividiu até as conversas particulares. Antes, qualquer coisa engraçada era enviada para o grupo inteiro. Agora há mensagens privadas, perguntas pela metade, pedidos de desculpa que terminam sem resposta.

Você abre uma fotografia antiga de todos reunidos num aniversário. Samuel está abraçado a Allan; Ryan faz uma careta no fundo; Isabella tenta impedir que alguém derrube o bolo. Laisla, Rauanny, Rayssa e Breno aparecem em lugares diferentes da mesa, mas ninguém parece precisar perguntar onde está o outro.

A foto não prova que todos confiavam em todos. Só mostra que havia uma época em que vocês conseguiam passar uma noite inteira pensando em outras coisas.

Alguém se aproxima pelo corredor. Por um instante, você se prepara para ouvir outra acusação. O rosto que aparece não tem raiva, apenas cansaço.

Você percebe que ainda existe uma diferença entre estar magoado e desejar que uma pessoa morra. Precisa se lembrar disso antes da próxima decisão.`,[
 C('Perguntar se a pessoa quer apenas companhia em silêncio','k8_03',[F('apoiou_madrugada'),['trait','empatia',1]]),
 C('Conferir novamente os horários para não alimentar suspeitas falsas','k8_03',[F('reviu_depoimentos'),['trait','cautela',1]])]);
N('k8_03','HOSPITAL · MANHÃ SEGUINTE','08:13','town',`O dia amanhece cinzento, com um noticiário repetindo as poucas informações liberadas sobre o ataque na oficina. A reportagem não tem todas as respostas. Você também não.

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
 C('Perguntar se ela quer companhia e prometer transparência','k8_bella_despedida',[F('bella_confianca'),['trait','empatia',2]]),
 C('Oferecer somente as provas que já foram preservadas','k8_bella_despedida',[F('bella_provas'),['trait','cautela',1]]),
 C('Dizer que ela está se colocando em risco demais','k8_bella_despedida',[F('bella_advertida'),['trait','coragem',1]])]);
N('k8_bella_despedida','HOSPITAL · CALÇADA','08:46','town',`Você permanece junto de Bella. Os carros passam molhando a sarjeta, e ela parece procurar um modo de encerrar a conversa sem afastar você por completo.

Bella: — Desculpa se eu tô falando atravessado. Eu sei que você também perdeu gente. Não é uma competição de quem tá pior.

Você: — Eu não quero disputar nada com você.

Bella: — Ainda bem. Porque eu sou péssima perdedora.

Ela tenta rir. O sorriso dura pouco. Do outro lado da rua, alguém derruba um copo de café e os dois se assustam com o estalo do plástico.

Bella: — Antes, quando eu passava por aqui, comprava dois pães de queijo. Um pra mim e outro pra Ju. Ela reclamava que o meu era maior e depois roubava metade.

Você: — E você deixava?

Bella: — Eu fingia que ficava puta. Era mais divertido.

O ônibus que Bella precisa pegar encosta no ponto. Ela fecha o zíper da jaqueta, conferindo o bolso com as chaves e o telefone.

Bella: — Vou atrás dos papéis. Não porque eu acho que tenho respostas. Porque eu cansei de viver só com o que as pessoas dizem que aconteceu.`,[G('k8_05','Deixar Bella seguir para a biblioteca e retomar a perspectiva dela')]);
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
 C('Compartilhar com o protagonista todas as páginas úteis','k8_flashback_inicio',[F('bella_compartilhou'),F('bella_exata'),['trait','franqueza',1]]),
 C('Guardar uma das anotações até conferir a fonte','k8_flashback_inicio',[F('bella_guardou'),['trait','cautela',1]]),
 C('Enviar somente a localização da estação','k8_flashback_inicio',[F('bella_local'),['trait','cautela',1]])]);
N('k8_flashback_inicio','BELLA · LEMBRANÇA · CASA DOS GOMES','UM ANO ANTES','house',`PONTO DE VISTA: BELLA GOMES — LEMBRANÇA

A foto no telefone traz outra tarde de volta, meses antes da festa em que Jullia desapareceu.

Chovia tão forte que as luzes da sala precisaram ficar acesas às três da tarde. Bella tinha chegado encharcada, as meias fazendo barulho no piso. Na cozinha, Jullia tentava acender uma vela de aniversário num bolo torto comprado às pressas.

Jullia: — Você prometeu que chegava antes das duas.

Bella: — E você prometeu que ia ser um bolo normal. A gente tá quites.

Jullia: — Esse bolo custou uma fortuna!

Bella: — Então foi um assalto. Tem cara de ter caído no chão e alguém colado com cobertura.

Jullia segura o riso por dois segundos. No terceiro, ri tão alto que a vela apaga.

Jullia: — Parabéns. Agora acende de novo, engraçadinha.

Bella observa a irmã procurar o isqueiro. Jullia ficava insuportável quando planejava alguma coisa: precisava que tudo estivesse bonito, que todo mundo chegasse no horário, que ninguém percebesse o trabalho que ela tinha tido.

Mas aquele bolo torto era só para as duas. E Jullia tinha lembrado do sabor favorito de Bella.

Bella: — Tá. Foi fofo. Não se acostuma.

Jullia: — Repete que eu vou gravar.

Bella: — Vai sonhando, Ju.

Jullia entrega o primeiro pedaço à irmã. A tempestade continua lá fora; dentro da cozinha, ninguém tem pressa.`,[
 C('Lembrar o presente escondido na gaveta','k8_flashback_final',[F('bella_memoria_presente')]),
 C('Lembrar a pequena briga que virou piada','k8_flashback_final',[F('bella_memoria_briga')])]);
N('k8_flashback_final','BELLA · LEMBRANÇA · QUARTO DAS IRMÃS','UM ANO ANTES','house',`PONTO DE VISTA: BELLA GOMES — LEMBRANÇA

Mais tarde, as duas estão sentadas no chão do quarto. Bella tenta pintar duas estrelas numa caixa de madeira. O pincel é grosso demais, e a tinta começa a escorrer.

Jullia: — Você não vai deixar isso desse jeito, né?

Bella: — Nossa, desculpa, senhora diretora de arte. Quer pegar o pincel e fazer você mesma?

Jullia: — Quero.

Bella: — Pois não vai. São minhas estrelas.

Jullia acaba usando a ponta de um palito para ajeitar a segunda estrela. A primeira continua torta. Em vez de apagá-la, faz a sua ao lado igualmente torta.

Jullia: — Pronto. Agora parece que a gente fez juntas.

Bella: — A gente fez juntas.

Jullia: — Eu sei. Era essa a ideia, idiota.

As duas riem. Bella encosta a cabeça no ombro da irmã por um instante, sem cerimônia. Jullia, que brigara com ela por causa de um casaco naquela manhã, ajeita a coberta sobre os ombros das duas.

Jullia: — Quando eu tiver minha casa, você pode ficar lá se quiser. Só não vai roubar minhas roupas.

Bella: — Você roubou meu moletom ontem.

Jullia: — É diferente.

Bella: — Por quê?

Jullia: — Porque eu sou a irmã mais velha. Tenho autorização divina.

Bella empurra Jullia com o ombro. A caixa cai de lado, e as duas precisam resgatar os pincéis antes que manchem o tapete.`,[G('k8_flashback_volta','Deixar a lembrança terminar')]);
N('k8_flashback_volta','BIBLIOTECA · MESA DE LEITURA','12:41','town',`PONTO DE VISTA: BELLA GOMES

Bella volta a enxergar a mesa da biblioteca. A foto antiga ainda está aberta na tela, mas agora há uma gota molhando seu polegar.

Ela limpa o rosto com a manga, irritada consigo mesma.

Bella: — Parabéns, imbecil. Chorando em cima de documento público.

O telefone tem uma notificação antiga: uma lembrança automática da galeria, as duas sorrindo com a caixa de estrelas nas mãos. Bella fecha a janela antes de abrir outro arquivo.

Não sabe se o que encontrou na biblioteca tem alguma relação com Jullia. Não quer transformar um desenho em prova de nada. Só precisa descobrir o que aconteceu, e conseguir lembrar da irmã sem ver sempre a mesma noite.

Ao recolher as folhas, percebe que ainda não respondeu ao protagonista.`,[G('k8_bella_message','Enviar as informações verificadas ao protagonista')]);
N('k8_bella_message','BIBLIOTECA · CORREDOR','12:44','phone',`PONTO DE VISTA: BELLA GOMES

Bella desce as escadas da biblioteca enquanto envia uma mensagem ao protagonista. Olha duas vezes para o endereço antes de confirmar o envio. Ela sabe que a confiança entre os amigos ficou abalada depois da morte de Moisés. Não pretende criar outra teoria no grupo sem verificar se os dados são verdadeiros.

Uma moto passa fazendo barulho na avenida. Bella quase deixa o telefone cair quando o som explode perto dela. Fica irritada por ter se assustado com algo tão comum.

Bella: — Maravilha. Agora até escapamento me faz passar vergonha.

Ela respira mais devagar, confere se as fotos estão salvas e espera a resposta. Existe uma estação abandonada junto ao lago. Há registros que indicam visitas posteriores ao desaparecimento. Isso é o que ela pode afirmar. Todo o resto permanece em aberto.`,[G('k8_saida_biblioteca','Acompanhar Bella saindo da biblioteca')]);
N('k8_saida_biblioteca','BIBLIOTECA · SAÍDA LATERAL','12:51','town',`PONTO DE VISTA: BELLA GOMES

Antes de sair, Bella volta ao balcão para devolver o crachá de visitante.

Bibliotecária: — Você encontrou o que estava procurando?

Bella: — Ainda não. Mas dessa vez consigo dizer o que falta.

Bibliotecária: — Parece um começo.

Bella: — Parece uma semana de trabalho extra. Desculpa, não quis ser grossa.

A funcionária sorri e aponta para uma pequena etiqueta de devolução que Bella esqueceu de assinar.

Bibliotecária: — Se ficar precisando de outras páginas, faça outro pedido. Aqui a gente não pode entregar arquivo particular sem protocolo, mas você pode acompanhar o andamento.

Bella: — Eu sei. Valeu por não me expulsar quando eu comecei a xingar a impressora.

Do lado de fora, o sol finalmente atravessa as nuvens por alguns segundos. Bella para perto de um muro baixo e olha novamente a fotografia com Jullia.

Bella: — Eu queria tanto contar pra você que encontrei alguma coisa, Ju. Mesmo que fosse só mais uma pergunta idiota.

Uma mensagem de uma colega antiga pergunta se Bella vai comparecer a uma reunião da faculdade naquela semana. Ela não lembra a última vez em que respondeu a uma pergunta sobre aulas, sem precisar falar de polícia ou desaparecimento.

Bella: — Hoje não. Mas obrigada por lembrar de mim.

Ela guarda o telefone com a tela virada para dentro do bolso e caminha na direção do ponto de ônibus. Pela primeira vez na tarde, parece uma pessoa que também precisa chegar em casa, tomar banho e continuar viva.`,[
 C('Conferir que as fotos foram realmente salvas antes de seguir','k8_06',[F('bella_organizou_imagens')]),
 C('Avisar ao protagonista que ainda não tem uma conclusão','k8_06',[F('bella_evitou_suspeitas')])]);
N('k8_06','PRAÇA CENTRAL · TARDE','14:07','town',`Você chega à praça antes do horário combinado. As mesas externas da padaria estão sendo recolhidas porque a previsão anuncia chuva. Uma senhora alimenta pombos perto da fonte, e duas crianças discutem a vez de usar um balanço.

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
const FRIEND_MORE={
 samuel:{deep:`Samuel gira a tampa da garrafa sem conseguir soltá-la.

Samuel: — Na oficina, quando eu achei que não ia sair, só consegui pensar que eu não lembrava a última conversa boa que tive com a minha mãe. Nem uma mensagem normal. Eu deixei tudo virando pedido de desculpa.

Você: — Você não precisa fingir que tá tudo normal pra conseguir falar com ela.

Samuel: — Eu sei. Mas qual parte eu conto? «Oi, mãe, quase morri ontem, ainda sonho com uma pessoa que a gente deixou no lago»? Tem coisa que não dá pra enfiar numa conversa sobre arroz no almoço.

Ele finalmente abre a garrafa, toma um gole e faz uma careta.

Samuel: — Tá quente. Claro que tá.

Você percebe que Samuel evita mencionar a van olhando diretamente para você. Ele aperta a garrafa com tanta força que o plástico afunda.

Samuel: — Se eu te perguntar o que você teria feito naquela noite, você me responde de verdade? Ou vai tentar me poupar como todo mundo?`,soft:`Samuel: — Quando o Allan me mandava mensagem, era só foto de coisa idiota. Agora cada notificação parece uma cobrança.`,dream:`Samuel: — Antes de tudo isso, eu queria juntar dinheiro pra abrir uma oficina pequena, sabe? Não uma garagem como a de ontem. Um lugar meu, sem gente mandando em tudo. Agora nem sei se consigo olhar pra um motor.`,closing:`Samuel deixa as chaves sobre a mesa.

Samuel: — Eu não quero que você me absolva. Quero que, quando a gente tiver que escolher outra vez, alguém tenha coragem de dizer que tá errado. Inclusive eu.

Você: — Eu vou tentar. E vou te cobrar quando você tentar decidir sozinho por todo mundo.

Samuel: — Justo. Pode cobrar. Só... não some sem falar comigo, tá?`},
 allan:{deep:`Allan passa o polegar pela tela do telefone até chegar a uma fotografia tremida em que Samuel está fantasiado de um personagem de filme.

Allan: — Essa aqui ele me proibiu de postar. Eu tenho umas cinquenta iguais. Nunca gostei de deixar ele ganhar discussão.

Você: — Vocês brigavam de verdade?

Allan: — Brigava. Coisa boba. Às vezes eu achava que eu precisava fazer todo mundo rir o tempo todo pra merecer estar no grupo.

Ele fica sério antes de continuar.

Allan: — Teve um dia que eu cheguei numa festa querendo ir embora. O Samuel percebeu e me acompanhou até a esquina. Nem perguntou por que eu tava mal. Só falou que não precisava voltar se eu não quisesse.

Você: — E você voltou?

Allan: — Voltei porque eu quis. É isso que eu tô tentando explicar. Agora parece que a gente tá ficando junto porque tem medo de ficar sozinho. Eu queria que ainda fosse uma escolha.`,soft:`Allan: — Não me pede pra escolher um culpado sem saber. Eu quero ficar do lado do Samu, mas ficar do lado dele não é dar razão pra toda merda que ele fala.`,dream:`Allan: — Eu queria fazer uma viagem sem destino com vocês. Parar em cidade feia, tirar foto de placa engraçada e ficar reclamando da comida. É um sonho muito besta, eu sei.`,closing:`Allan finalmente prova a vitamina, já quase sem gelo.

Allan: — Tá horrível. Sabe o que é engraçado? Eu pedi justamente porque parecia coisa de quando a gente não tinha problema sério.

Você: — Você pode pedir outra.

Allan: — Não. Vou beber isso aqui. É importante lembrar que eu ainda sei tomar uma decisão ruim sem ninguém morrer por causa dela.

Ele sorri de canto, e você sorri também.`},
 isabella:{deep:`Isabella vira uma folha e empurra o papel até você.

Isabella: — Repara nesses dois horários. Eles não provam nada sozinhos. Uma ligação foi registrada às dez e pouco, outra informação aparece depois. A minha cabeça insiste que, se eu achar a ordem certa, tudo vai se encaixar.

Você: — E você tá dormindo quanto?

Isabella: — Não muda de assunto.

Você: — É o mesmo assunto.

Ela fecha os olhos por um instante.

Isabella: — Tá. Dormi três horas. E na segunda acordei achando que tinha alguém mexendo na maçaneta. Não tinha. Era o cano do prédio. Eu conferi duas vezes.

Você deixa que ela guarde os papéis.

Isabella: — Eu sei que acabo falando como se todo mundo fosse burro. Não é isso. É que eu morro de medo de deixar passar um detalhe que podia ter salvado alguém.`,soft:`Isabella: — A Rayssa pediu pra eu largar o celular ontem. Eu fiquei com raiva. Talvez ela só quisesse que eu respirasse. Eu nem sei mais distinguir cuidado de cobrança.`,dream:`Isabella: — Eu queria estudar fora por um semestre. Viver numa cidade onde ninguém conhecesse essa história. Eu nunca falei porque parecia egoísmo querer ir embora.`,closing:`Isabella empilha os papéis, mas deixa um bilhete escrito com a própria letra.

Isabella: — Meu número você já tem. Se eu disser alguma coisa cruel de novo, não precisa aceitar só porque eu tô assustada.

Você: — Eu também não quero que você aceite tudo que eu falo.

Isabella: — Ótimo. Então ainda conseguimos discutir sem tentar destruir um ao outro.`},
 laisla:{deep:`A garçonete pergunta se Laisla quer outro café. Ela olha para a xícara intocada e pede água.

Laisla: — Minha mãe mandou mensagem perguntando se eu queria que ela buscasse minhas coisas no apartamento. Eu fiquei dez minutos pensando qual coisa eu queria de lá. Não consegui lembrar de nada sem lembrar do corredor.

Você: — Você não precisa voltar enquanto não quiser.

Laisla: — Só que era a minha casa. Eu escolhi cada luminária horrível. A Rauanny me ajudou a carregar a mesa. Eu fiz vocês comerem macarrão queimado na primeira semana.

Ela ri, mas o riso não segura as lágrimas.

Laisla: — Eu me odeio por ficar pensando em prato e cortina quando tem gente que não voltou daquela noite.

Você: — Não é errado sentir falta das coisas pequenas.

Laisla pega o copo com as duas mãos, como se estivesse frio.

Laisla: — Eu só queria que aquele lugar continuasse sendo meu. Não um cenário de onde todo mundo quase morreu.`,soft:`Laisla: — Eu fico com medo de dizer pra Rauanny que tô assustada. Ela já carrega coisa demais. Mas aí fico brava quando ela tenta decidir por mim.`,dream:`Laisla: — Eu queria ter uma mesa tão grande que sempre coubesse mais alguém. Gente falando ao mesmo tempo, reclamando do tempero. É estranho querer isso depois de tudo?`,closing:`Quando vocês levantam, Laisla pega o guardanapo dobrado e enfia no bolso sem perceber.

Você: — Você tá levando o guardanapo.

Laisla: — Ah, pelo amor de Deus. Tá vendo? Nem roubar eu sei fazer direito.

Ela ri de verdade pela primeira vez na conversa. É pouco, mas você guarda aquele som.`},
 rauanny:{deep:`Rauanny observa a garota de skate levantar do chão, limpar o joelho e tentar novamente.

Rauanny: — Ela caiu umas cinco vezes e continua. Quando eu era menor, eu também achava que bastava levantar.

Você: — Agora é diferente?

Rauanny: — Agora eu sei que tem queda que você levanta e continua com dor por meses. Isso me deixa com uma raiva absurda.

Ela aponta para o próprio braço, ainda sensível.

Rauanny: — O pior é quando todo mundo começa a me tratar como se eu fosse de vidro. Eu não quero provar nada pra ninguém. Só quero poder dizer quando consigo e quando não consigo.

Você: — Eu posso perguntar antes de tentar ajudar.

Rauanny: — Isso. E acreditar na resposta.

O vento faz o toldo do quiosque bater. Rauanny encolhe os ombros por reflexo, irritada por ter se assustado.

Rauanny: — Desculpa. Eu tô brava com o mundo inteiro hoje.`,soft:`Rauanny: — Se a Laisla disser que precisa de espaço, eu vou dar. Só não quero confundir espaço com deixar alguém sozinha no pior momento.`,dream:`Rauanny: — Eu queria aprender a surfar. Engraçado, né? Depois de tudo que aconteceu perto de água, ainda tenho vontade de entrar no mar. Só não quero ter medo pra sempre.`,closing:`Rauanny se apoia no banco antes de levantar.

Rauanny: — Não fala pros outros que eu fiquei sentimental. Tenho uma reputação muito importante a preservar.

Você: — Qual? A de discutir com um quiosque fechado?

Rauanny: — Exatamente. E tô ganhando.`},
 breno:{deep:`Breno vira o livro sobre a mesa. Entre as páginas, há uma passagem marcada com um tíquete antigo de cinema.

Breno: — Fui sozinho naquele dia. Tava cheio de gente lá dentro, mas foi a primeira vez que eu não me senti observado.

Você: — Você preferia ficar sozinho?

Breno: — Eu prefiro quando posso escolher. Às vezes, no meio de vocês, eu começo a falar e alguém termina minha frase. Aí eu penso que talvez ninguém quisesse ouvir mesmo.

Você: — Eu quero ouvir.

Ele olha para você antes de responder.

Breno: — Eu acredito. Só demorei pra acreditar que você ia querer continuar ouvindo quando eu não tivesse nada impressionante pra dizer.

Uma moça pede ajuda para alcançar um livro alto. Breno se levanta, entrega o volume e volta sem cerimônia.

Breno: — Parece idiota, mas isso eu sei fazer. Coisa pequena. Ficar perto de alguém, oferecer ajuda, não precisar virar herói. Ontem parecia que todo mundo precisava provar alguma coisa.`,soft:`Breno: — Eu tenho medo de prometer que vou proteger você e acabar mentindo. Prefiro dizer que vou tentar voltar, porque isso eu consigo cumprir com honestidade.`,dream:`Breno: — Eu queria desenhar uma cidade inteira. Não mapas de investigação; ruas, fachadas, gente que não precisa olhar por cima do ombro. Tenho um caderno guardado pra isso.`,closing:`Breno fecha o livro e o empurra na sua direção.

Breno: — Fica com ele até a gente se encontrar outra vez. Não é pra você ler agora. Só quero ter um motivo idiota pra te cobrar depois.

Você: — Eu vou cuidar.

Breno: — Eu sei. Só não esquece de cuidar de você também.`},
 ryan:{deep:`Ryan apoia os braços sobre a mesa. O sorriso aparece e desaparece tão depressa que você quase não percebe.

Ryan: — Depois do ataque no apartamento, fiquei tentando lembrar o rosto de todo mundo antes de abrir a porta. Isso é uma coisa horrível pra se dizer, né?

Você: — É uma coisa horrível de viver.

Ryan: — Pois é. Eu sempre fui o cara que dizia «relaxa, vai dar certo». Aí, quando ouvi alguém gritando meu nome, eu não tinha a menor ideia do que fazer.

Ele passa a mão pelos cabelos.

Ryan: — A gente se acostuma a achar que coragem é fazer piada quando tá assustado. Mas teve um momento em que eu só queria que alguém dissesse que tava com medo também.

Você: — Eu tô.

Ryan respira fundo, como se essa confissão tivesse dado a ele permissão para respirar também.

Ryan: — Obrigado por não fingir. Já é mais do que metade de Lakewood consegue fazer.`,soft:`Ryan: — Não quero que você me proteja de tudo. Quero que você me diga quando precisa de mim, mesmo se eu não conseguir fazer nada além de ficar do seu lado.`,dream:`Ryan: — Eu queria montar uma banda horrível com a galera. Nem precisa tocar bem. A graça era a gente discutir qual música seria a menos vergonhosa pra começar.`,closing:`Ryan tira um guardanapo do bolso e escreve um endereço de lanchonete.

Ryan: — O lugar da comida ruim que eu te prometi. Tô colocando por escrito porque eu tô cansado de promessa que evapora.

Você: — Você sabe que eu vou cobrar.

Ryan: — Você pode cobrar. Mas talvez eu deixe você escolher a sobremesa.`},
 rayssa:{deep:`Rayssa olha para as próprias mãos por tempo demais.

Rayssa: — Minha mãe mandou uma foto de quando a gente era mais novo. Eu tava com o cabelo completamente errado. Todo mundo sorria como se isso fosse garantia de alguma coisa.

Você: — Você sente falta daquela época?

Rayssa: — Eu sinto falta de não medir cada palavra antes de dizer.

Você: — Ontem você ficou quieta quando começaram as acusações.

Rayssa: — Eu queria falar, mas cada vez que abria a boca alguém tava chorando ou gritando. Não consegui descobrir o que ajudaria.

Ela alisa uma folha caída no banco.

Rayssa: — Às vezes penso que se eu tivesse insistido numa conversa antes daquela festa, alguma coisa seria diferente. Aí penso que não dá pra voltar lá e escolher por todo mundo.

Você: — Você também merece poder falar do que sente.

Rayssa ergue os olhos, emocionada, mas não oferece uma explicação completa para o que está carregando.`,soft:`Rayssa: — Eu tenho medo de que um dia você olhe pra mim e não reconheça mais a pessoa com quem conversava na escola. Eu sei que isso parece dramático.`,dream:`Rayssa: — Eu queria viajar com a Isabella uma vez sem ficar olhando a hora. Só uma viagem de verdade. Aquelas em que tudo dá errado e depois vira história pra contar.`,closing:`Rayssa se levanta, mas demora um pouco para pegar a bolsa.

Rayssa: — Obrigada por ficar. Mesmo depois de ontem.

Você: — A gente não precisa concordar em tudo pra se ouvir.

Rayssa: — Eu espero conseguir lembrar disso quando as coisas apertarem de novo.`}
};
for(const [id,d] of Object.entries(COMPANION_SCENES)){
 const x=FRIEND_MORE[id];
 N('k8_friend_'+id,d.place,'14:19','town',`${d.start}

Do outro lado da mesa, ${L[id]} finalmente parece menos preocupado em escolher as palavras perfeitas. O barulho da rua obriga vocês a se aproximarem para continuar a conversa.`,[
 C('Perguntar como '+L[id]+' está convivendo com o medo','k8_friend_reflect_'+id,[S('tema_'+id,'medo'),B(id,3),F('conversou_'+id)]),
 C('Contar sobre o próprio medo e escutar a resposta','k8_friend_reflect_'+id,[S('tema_'+id,'pessoal'),B(id,2),F('conversou_'+id),['trait','empatia',1]]),
 C('Pedir desculpas pela discussão antes de ouvir','k8_friend_reflect_'+id,[S('tema_'+id,'desculpa'),B(id,4),F('conversou_'+id)])]);
 N('k8_friend_reflect_'+id,d.place,'14:26','town',`${x.deep}

Vocês não chegam a uma resposta imediata. A conversa demora mais que os cafés; há pausas em que nenhum dos dois precisa fingir que está tudo bem.`,[
 C('Perguntar sobre algo que '+L[id]+' ainda quer fazer quando isso acabar','k8_friend_response_'+id,[S('profundo_'+id,'sonho'),B(id,2)]),
 C('Conversar sobre o medo de perder mais alguém','k8_friend_response_'+id,[S('profundo_'+id,'perda'),B(id,2)]),
 C('Perguntar o que poderia ajudar hoje, sem prometer o impossível','k8_friend_response_'+id,[S('profundo_'+id,'apoio'),B(id,3)])]);
 N('k8_friend_response_'+id,d.place,'14:33','town',`${d.choose}

A conversa não apaga o que foi dito na discussão do hospital. Você tenta não interromper ${L[id]}, e recebe a mesma atenção quando precisa procurar as palavras.`,[
 C('Falar de um plano pequeno para a próxima semana','k8_friend_end_'+id,[F('plano_'+id),B(id,2)]),
 C('Pedir que vocês possam discordar sem abandonar a amizade','k8_friend_end_'+id,[F('promessa_'+id),B(id,3)])]);
 N('k8_friend_end_'+id,d.place,'14:42','town',`${x.closing}

A conversa chegou a um lugar que nenhuma mensagem enviada no grupo teria alcançado. Vocês se despedem sabendo que ainda existem perguntas sem resposta.`,[G('k8_friend_close_'+id,'Despedir-se e conferir se alguém mais quer conversar')]);
 N('k8_friend_close_'+id,d.place,'14:47','town',`Você observa ${L[id]} se afastar entre as pessoas. O encontro não apagou os gritos da madrugada, mas agora você conhece algo mais íntimo do que uma versão dos acontecimentos.

Seu telefone volta a vibrar. Ainda há outros amigos com quem você não conseguiu conversar. E há a mensagem de Bella esperando uma resposta.`,[G('k8_06','Voltar à lista de contatos')]);
}
N('k8_unavailable','PRAÇA · BANCO VAZIO','14:22','town',`Você confere os contatos e decide não marcar outro encontro agora. Alguns amigos estão em observação; outros precisam de espaço depois da discussão. Você também precisa recuperar o fôlego.

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
N('k8_romance_resposta','PRAÇA · MENSAGENS PRIVADAS','15:11','phone',`Você volta à conversa particular. O aplicativo informa que a outra pessoa está disponível para receber mensagens. Depois do que aconteceu na oficina, uma resposta pequena parece exigir mais cuidado do que um discurso inteiro.

Você começa a digitar. Apaga a primeira frase porque ficou formal demais. Tenta de novo.`,[
 C('Dizer que também sente saudade da noite que passaram juntos','k8_romance_continua',[F('respondeu_romance'),S('tom_romance','carinho'),['trait','empatia',1]]),
 C('Contar que está com medo e pedir para conversarem com calma','k8_romance_continua',[F('respondeu_romance'),S('tom_romance','medo'),['trait','franqueza',1]])]);
N('k8_romance_continua','PRAÇA · MENSAGENS PRIVADAS','15:14','phone',`Você vê os três pontinhos na tela. Eles desaparecem, voltam e somem de novo.

Uma notificação comum de um grupo qualquer aparece por cima da conversa. Você a ignora. O que está sendo dito agora merece atenção.

A resposta finalmente chega, e desta vez você não precisa imaginá-la lendo nas entrelinhas.`,[G('k8_07_decidir','Guardar a conversa e continuar a investigação',[F('conversa_romance_terminou')])]);
N('k8_romance_silencio','PRAÇA · MENSAGENS PRIVADAS','15:13','phone',`Você lê a mensagem, começa uma resposta e apaga tudo antes de enviar. Talvez porque ainda esteja pensando na oficina. Talvez porque não encontre um jeito de explicar que está com medo de demonstrar carinho e perder alguém outra vez.

O aviso de leitura permanece na tela. Você bloqueia o celular e atravessa a praça. O silêncio pode ter sido necessário para você, mas do outro lado da conversa não existe maneira de adivinhar isso.`,[G('k8_07_decidir','Guardar o telefone e continuar a investigação',[F('vacuo_romance')])]);
N('k8_07_decidir','PRAÇA · TELEFONE','15:17','phone',`A mensagem de Bella ainda está no topo da tela, com o endereço da estação e uma fotografia parcial da planta de drenagem.

Você confere o que realmente sabe, sem transformar palpite em certeza. A investigação não vai esperar indefinidamente, mas isso não apaga as conversas que ficaram no telefone.`,[
 C('Ler a planta e combinar um ponto de encontro seguro','k8_prepare',[F('leu_planta'),['trait','cautela',2]]),
 C('Rever as fotos dos registros antes de sair','k8_prepare',[F('releu_fotos'),['trait','cautela',1]]),
 C('Avisar que só aceitará entrar se houver uma rota de volta','k8_prepare',[F('plano_saida'),['trait','coragem',1]])]);
N('k8_prepare','ESTRADA DO LAGO · PLANEJAMENTO','15:24','road',`Você encontra Bella no estacionamento de um pequeno mercado perto da estrada. Um vento frio atravessa a área coberta. A estação fica além de uma curva, onde o asfalto antigo cede lugar a um caminho de serviço.

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
N('k8_invited','ESTRADA DO LAGO · PONTO DE ENCONTRO','16:14','road',`A luz do fim de tarde ilumina a vegetação da margem. Vocês estacionam numa área onde o sinal de celular ainda funciona e verificam as saídas antes de andar.

Bella entrega uma cópia da planta ao protagonista, guarda a original na mochila e pede que todos marquem o próprio acesso no telefone. Ninguém deve desaparecer no prédio sem que os outros saibam para onde foi.

A placa na cerca indica que parte da instalação está interditada. Vocês registram a condição do portão e procuram o responsável pela vistoria. Há registros que podem ser consultados na área autorizada; os corredores perigosos continuam isolados.

O plano parece cauteloso até o momento em que Bella reconhece, num mural atrás da guarita, uma anotação semelhante à que encontrou nos arquivos.

Bella: — Tá vendo aquela sequência? É o mesmo código. Não colocaram ali à toa.

Uma gota de chuva cai sobre o papel. Logo depois, outra.`,[
 C('Registrar os acompanhantes e seguir todos pela entrada sinalizada','k8_viagem_estacao',[F('entrada_juntos')]),
 C('Pedir que os acompanhantes esperem no acesso externo enquanto você e Bella consultam a guarita','k8_viagem_estacao',[F('entrada_separada')])]);
N('k8_viagem_estacao','ESTAÇÃO · ÁREA DE ENTRADA','16:24','lake',`O portão de acesso range quando o vento muda. Bella avança até a placa de interdição, lê duas vezes o trecho ainda legível e volta para a guarita sem tentar forçar a corrente.

Bella: — Minha irmã odiava quando eu fazia alguma coisa sem pensar. Ela ia me chamar de cabeça-dura se me visse aqui.

Você: — Ela conhecia você bem.

Bella: — Conhecia. Às vezes mais do que eu queria.

O telefone vibra. Cada pessoa que aceitou o convite foi orientada a compartilhar a última posição antes de entrar. Você não envia a mesma pergunta três vezes; espera as confirmações chegarem e não transforma o silêncio de alguém em notícia de morte.

Bella encosta as costas no muro da guarita, observando a margem escurecer com a aproximação da chuva.

Bella: — Eu não quero que ninguém se machuque por minha causa.

Você: — Então, se a coisa ficar perigosa, a gente volta.

Bella: — Eu sei. Só que eu passei um ano ouvindo que tava procurando fantasma. Quando finalmente tenho um endereço de verdade, é difícil fingir que não quero entrar correndo.

Você: — Querer uma resposta não significa precisar morrer por ela.

Bella: — Não fala como se fosse frase de calendário. Mas... valeu.

O barulho de uma caminhonete vindo pela estrada faz vocês se afastarem do caminho. O motorista reduz a velocidade para passar por uma poça e segue sem olhar para a estação. Nenhum dos dois tenta adivinhar se ele estava observando vocês.

O prédio antigo continua imóvel. Ainda existe a escolha de registrar o que puderem com segurança, manter as pessoas informadas e sair se a estrutura piorar.`,[
 C('Pedir que confirmem posição antes de se aproximar da guarita','k8_station_01',[F('reconfirmou_posicoes')]),
 C('Revisar a fotografia do mapa com Bella','k8_station_01',[F('mapa_revisado'),['trait','cautela',1]])]);
N('k8_station_01','ESTAÇÃO DO LAGO · GUARITA','16:32','lake',`A guarita tem uma janela rachada e um livro de visitas preso por uma corrente. Os trilhos da cerca estão cobertos de folhas e a placa de advertência perdeu metade das letras. O lago aparece por entre a vegetação, quieto demais para um lugar onde a história de vocês começou a desmoronar.

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
N('k8_station_04','ESTAÇÃO · CORREDOR CENTRAL','17:04','lake',`O som da chuva muda quando vocês chegam ao corredor central. De um lado, placas apontam para as bombas antigas. Do outro, uma porta envidraçada permite enxergar o início da passarela. Os dois caminhos desembocam em saídas diferentes, e o terceiro leva à estrada lateral.

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
N('k8_hero_rescue','ESTAÇÃO · SALA DAS BOMBAS','17:36','lake',`O piso vibra sob seus pés. Há água acumulada perto da casa das máquinas, e um quadro de controle pisca com as últimas luzes de emergência. Você escuta o mascarado em algum lugar distante, mas não sabe qual corredor será alcançado primeiro.

Bella avisou que tenta sair pela margem. Você não pode correr para lá e abandonar um possível pedido de ajuda sem saber onde estão os outros. O telefone mostra as últimas posições confirmadas, não uma visão mágica de todos os sobreviventes.

A primeira coisa a fazer é tentar conter o fluxo de água que invade o setor inferior. A segunda é organizar um resgate antes que alguém tente atravessar os equipamentos sozinho.

Você se aproxima do painel, tomando cuidado para não pisar na área molhada. O que fizer agora poderá mudar o acesso dos amigos à saída.`,[
 C('Usar o mapa e procurar o comando de isolamento antes de tocar no painel','k8_risk1',[F('hero_painel_seguro'),['trait','cautela',1]]),
 C('Mandar uma mensagem com as rotas e pedir confirmação de posição','k8_risk1',[F('hero_rede_organizada'),['trait','empatia',1]]),
 C('Abrir imediatamente o corredor de emergência, sem esperar confirmação','k8_risk1',[F('hero_saida_apressada'),['trait','coragem',1]])]);
N('k8_risk1','ESTAÇÃO · SALA DAS BOMBAS','17:39','lake',`A estrutura inferior geme e parte do sistema de drenagem começa a trabalhar ao contrário. A água que deveria seguir ao lago volta pela passagem antiga. Os degraus ficam úmidos, depois cobertos por uma lâmina brilhante.

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
N('k8_sector_empty','ESTAÇÃO · SALA DAS BOMBAS','17:44','lake',`Você confere as mensagens e o corredor. Nenhum dos acompanhantes confirmados ficou preso aqui: alguns aguardam no ponto de acesso e outros já seguiram por uma saída segura. Pelo registro das últimas posições, ninguém ficou para trás nesta sala. Você não ouve pedidos de socorro por aqui.

Você desliga a energia da parte acessível pelo comando de emergência e deixa um aviso para a equipe técnica. A água continua avançando, mas o caminho pela plataforma superior ainda está livre.

Ao longe, Bella finalmente responde com uma mensagem curta: ela conseguiu alcançar a margem. Você precisa encontrá-la antes que o mascarado volte.

A estação não está segura. A ausência de uma pessoa em perigo neste setor não torna o prédio menos perigoso.`,[G('k8_risk2','Seguir para a última passagem')]);
N('k8_risk1_out','ESTAÇÃO · SAÍDA DA GALERIA','17:48','lake',`A chuva abafa os sons do interior do prédio. Você chega ao corredor de comunicação e confere as mensagens recebidas. Uma pessoa enfrentou os equipamentos da galeria; você precisa descobrir o que aconteceu antes de reorganizar a fuga.

O acesso superior leva à estrada. A saída de manutenção segue até uma passarela sobre o lago. Não é possível cuidar dos dois caminhos ao mesmo tempo sem saber quem ainda está em cada setor.

Você tenta ouvir uma resposta no telefone. Uma notificação chega, mas a conexão oscila e parte da frase desaparece.`,[G('k8_risk2','Procurar a última rota de saída')]);
N('k8_risk2','ESTAÇÃO · PASSARELA EXTERNA','17:52','lake',`A estrutura externa é mais larga perto da estação e se estreita ao alcançar a margem. Uma parte foi reforçada com metal; outra está coberta por madeira escura. O vento sopra água sobre o corrimão.

Você percebe que a próxima fuga depende da organização feita mais cedo. Quem já alcançou a saída não deve ser mandado de volta para uma ponte perigosa sem necessidade. Quem permaneceu em outro setor ainda precisa confirmar onde está.

A passarela range com o peso das primeiras rajadas. Você tenta avaliar por onde seria mais seguro pedir ajuda e se vale a pena buscar uma rota alternativa pela estrada de serviço.

O barulho da água aumenta. O mascarado pode alcançar o acesso externo, mas ainda não há razão para presumir que ele esteja ao lado de todas as pessoas ao mesmo tempo.`,[
 C('Conferir os apoios reforçados e orientar a saída pela margem','k8_risk2_pov',[F('r2_hero_lateral')]),
 C('Avisar pelo rádio ou celular a posição do ponto de encontro','k8_risk2_pov',[F('r2_hero_radio')]),
 C('Correr direto pela ponte sem verificar se alguém vem no sentido contrário','k8_risk2_pov',[F('r2_hero_pressa')])]);
N('k8_risk2_pov','ESTAÇÃO · NÚCLEO EXTERNO','17:55','lake',`Você ouve uma resposta distante e confere a última posição confirmada. Você confirma a localização mais recente antes de procurar alguém. A chuva bate forte na grade e apaga qualquer ruído vindo da estrada.

A chuva finalmente diminui. A maré de sons da estação — bombas, alarmes, corrimão e água — parece uma única coisa ameaçadora. Você tenta distinguir os passos de um amigo dos de quem o persegue.`,[]);
N('k8_risk2_empty','ESTAÇÃO · ESTRADA DE SERVIÇO','18:00','road',`A estrada de serviço aparece entre duas árvores. Bella já conseguiu sinalizar a própria localização e os acompanhantes que ficaram no acesso externo confirmam pelo telefone que estão fora do prédio.

Os outros já confirmaram uma saída ou ficaram protegidos na área externa. A passarela permanece vazia, e você não volta ao perigo sem necessidade.

Você finalmente vê o contorno do veículo estacionado. É a primeira vez em muitas horas que um objeto comum parece uma esperança concreta.`,[G('k8_after','Reunir quem conseguiu escapar')]);
N('k8_risk2_out','MARGEM DO LAGO · ESTRADA','18:04','road',`A passagem para a estrada ainda está iluminada por um poste antigo. Você conta os rostos que aparecem à sua frente, mas não faz suposições sobre as pessoas que não vê. Primeiro confere as mensagens. Depois tenta pedir ajuda.

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
N('k8_after','ESTRADA DO LAGO · AMBULÂNCIAS','18:26','road',`Os faróis das viaturas riscam a estrada molhada. Bombeiros cercam a entrada da estação e pedem que ninguém tente voltar ao prédio. Um deles examina suas mãos à procura de cortes; outro pergunta se há pessoas desaparecidas.

Você responde com os nomes e as últimas posições reais, sem completar as lacunas com suposições. A experiência da oficina ensinou a diferença entre não receber uma mensagem e confirmar uma morte.

Um paramédico encontra Bella na margem. Ela insiste em explicar onde deixou as fotografias antes de permitir que examinem seu ferimento.

Paramédico: — Primeiro vamos cuidar de você. Depois a polícia pergunta sobre papel.

Bella: — Eu sei. Só me deixa dizer onde tá o negócio antes que alguém jogue fora achando que é lixo.

Do prédio vem um estouro surdo. Ninguém volta. A polícia isola a instalação, e a chuva finalmente diminui sobre a margem.

Você procura os rostos que ainda consegue reconhecer. A soma não é apenas um número. Cada pessoa que chega carrega uma escolha, uma ferida ou a ausência de alguém.`,[G('k8_socorro_reacoes','Aguardar notícias de cada setor')]);
N('k8_socorro_reacoes','ESTRADA DO LAGO · RESGATE','18:39','road',`A equipe de resgate pede que ninguém atravesse a fita de isolamento. Um rádio chia repetindo números e posições; um bombeiro anota os nomes que vocês conseguem confirmar.

Você tenta ligar para o primeiro contato que ainda aparece como indisponível. Não consegue. Desta vez, não inventa explicações. Entrega o horário da última comunicação a quem pode procurar de verdade.

Uma funcionária do atendimento oferece uma manta térmica. Você aceita sem perceber como suas mãos estão frias.

Bella está recebendo ajuda alguns metros adiante. A luz das ambulâncias alterna vermelho e azul no rosto dela. Você não sabe como fazer com que o tempo entre a chegada dos socorristas e uma notícia pareça mais curto.

Você se lembra da frase que ouviu na noite anterior: que alguém do grupo poderia estar colaborando com o assassino. A suspeita ainda existe, mas na estrada há uma tarefa mais urgente do que descobrir quem começou a mentira. É saber quem chegou à saída.

Um policial se aproxima com uma relação de nomes. Pede que você confirme apenas as pessoas que realmente viu, não aquelas sobre quem ouviu alguém falar durante a fuga.

Você responde com cuidado. Nunca imaginou que dar um nome pudesse exigir tanta coragem.`,[
 C('Informar as últimas posições verificáveis de quem ficou para trás','k8_after_02',[F('depoimento_preciso'),['trait','franqueza',1]]),
 C('Pedir que a equipe priorize quem está ferido','k8_after_02',[F('priorizou_feridos'),['trait','empatia',1]])]);
N('k8_after_02','HOSPITAL · CORREDOR DE ATENDIMENTO','20:15','town',`As cadeiras do hospital são as mesmas da noite anterior. Você se pergunta quantas vezes uma pessoa pode atravessar a mesma porta antes de começar a achar que nunca mais vai voltar para casa.

Uma assistente social oferece água aos sobreviventes. A polícia anota as últimas posições confirmadas. Pessoas que permaneceram fora da estação não são descritas como se tivessem participado da perseguição; recebem notícias por mensagem ou comparecem ao hospital quando podem.

Bella é levada para avaliação. O exame dela demora. Você observa pela janela uma ambulância indo embora sem sirene.

Você se lembra do desenho das estrelas no batente, da voz de Moisés antes de morrer e da forma como os amigos se olharam quando a mensagem sobre o traidor chegou.

Nenhum desses elementos é uma resposta. Mas já não parecem três histórias separadas.

Quando o médico permite, você se aproxima de Bella. Ela segura o celular com dificuldade e pede para conferir uma única fotografia antes de dormir.`,[
 C('Pedir que Bella descanse e guardar os arquivos de maneira segura','k8_depoimento_estacao',[F('bella_recebe_apoio'),['trait','empatia',1]]),
 C('Conversar sobre o que as duas investigações conseguiram comprovar','k8_depoimento_estacao',[F('bella_conversou_resultados')]),
 C('Perguntar o que ela lembra da estação sem insistir se estiver mal','k8_depoimento_estacao',[F('bella_ouvida'),['trait','cautela',1]])]);
N('k8_luto_08','HOSPITAL · SALA DE ESPERA','20:32','town',`A equipe médica pede que os sobreviventes ocupem uma sala reservada. A porta é fechada com cuidado para que ninguém do corredor escute os nomes confirmados pela polícia.

Os amigos que não estiveram na estação recebem a notícia pelo telefone antes de chegar. Ninguém é chamado de volta só para fazer parte de uma cena: quem ainda está em atendimento participa quando consegue.

A médica oferece alguns minutos sem perguntas. Pela primeira vez desde a fuga, vocês não precisam decidir por onde correr. Só precisam encarar quem não vai voltar.`,[G('k8_depoimento_estacao','Continuar depois de ouvir os amigos')]);
N('k8_depoimento_estacao','HOSPITAL · DEPOIMENTO','20:42','town',`Uma investigadora traz dois envelopes transparentes e uma pequena lista de protocolos. Não pede que você imagine o que estava dentro dos papéis perdidos. Quer saber apenas a origem das informações disponíveis.

Investigadora: — Preciso distinguir o que você viu pessoalmente do que outra pessoa encontrou. Se uma foto foi tirada por Bella, é importante que o registro diga isso.

Você: — E se um dos documentos se perdeu?

Investigadora: — Então a gente registra que não tem mais o original. Ninguém melhora uma prova inventando a parte que não sobrou.

Você acompanha a separação das páginas. Alguns registros vieram da biblioteca. Outros podem ter sido fotografados na estação. A diferença parece pequena até que você tenta lembrar de quem segurava cada coisa durante o ataque.

Perto da sala de atendimento, uma mulher ri nervosamente ao falar com a família pelo telefone. O som atravessa o corredor. Você pensa em quantas pessoas naquele hospital tiveram uma noite ruim sem saber absolutamente nada sobre Lakewood, Jullia ou Moisés.

Investigadora: — Vocês passaram por situações graves. Ainda assim, não vão precisar solucionar isso sozinhos. Deixem nosso pessoal verificar as datas e os acessos.

Você concorda em entregar cópias do que foi preservado, mantendo o registro das fontes.

Quando ela se afasta, resta uma conversa difícil com Bella. A noite não acabou. Você precisa encontrar um jeito de perguntar o que ela descobriu sem fazer parecer que os ferimentos dela são menos importantes que um documento.`,[
 C('Conversar com Bella sobre o que pode realmente ser confirmado','k8_evidence',[F('separou_fontes')]),
 C('Perguntar primeiro se Bella quer continuar a conversa agora','k8_evidence',[F('respeitou_recuperacao'),['trait','empatia',1]])]);
N('k8_evidence','HOSPITAL · SALA DE VISITAS','21:04','town',`Bella compartilha com você as informações que foram realmente preservadas. Algumas estão em fotografias; outras podem ter ficado nos arquivos recolhidos pelos investigadores. O que não foi encontrado permanece desconhecido.

Vocês tentam reconstruir uma linha do tempo sem completar os buracos com imaginação. Moisés visitou lugares próximos ao lago depois do desaparecimento. A estação continuou aparecendo em documentos administrativos. Uma anotação indica movimentação de materiais, mas não informa o conteúdo dos produtos nem quem os recebeu.

Bella: — Eu passei a vida inteira achando que era só olhar bem que o resto se explicava. Aí eu olho bem e aparece mais um buraco.

Você: — Pelo menos agora sabemos quais perguntas fazer.

Bella: — É. Só que eu tô cansada de perguntar pra gente que acaba morta.

Ela olha para a parede e respira devagar. A lembrança de Jullia parece ocupar a sala inteira. Pela primeira vez, você percebe que Bella talvez não esteja procurando uma pessoa desaparecida: esteja procurando o momento em que poderia ter feito alguma coisa diferente.

Os documentos não identificam quem esteve na estação. Registram apenas movimentações posteriores ao desaparecimento, quando todos acreditavam que aquela história já tinha acabado.`,[G('k8_last_01','Comparar as datas uma última vez')]);
N('k8_last_01','HOSPITAL · DOCUMENTOS E CELULAR','21:18','phone',`Você organiza apenas as informações que realmente chegaram ao seu alcance. As anotações independentes da biblioteca e o histórico do encontro de Moisés ajudam a identificar datas, mas não revelam quem circulou por ali.

As datas estão dispostas por ordem, sem tentar preencher intervalos que os arquivos não explicam.

Você: — Moisés esteve na região depois do desaparecimento. Isso a gente consegue provar.

Bella: — E existe papel demais passando por aquela estação pra eu acreditar que ela tava completamente vazia.

Você: — Mas não sabemos quem foi até lá.

Bella: — Não. E eu não vou fingir que sei.

O telefone mostra a última mensagem que Moisés conseguiu enviar antes de morrer. Ele prometeu contar uma coisa. Talvez não fosse apenas sobre o atropelamento, nem apenas sobre o passado. Talvez fosse sobre o que alguém fez depois que os amigos voltaram para casa.

Você fecha a pasta sem encontrar uma resposta. Pela primeira vez, não é o silêncio daquela noite que assusta. São os meses que vieram depois.`,[G('k8_last_02','Ouvir o que Bella concluiu')]);
N('k8_last_02','LAKEWOOD · NOITE','21:27','town',`Bella volta os olhos para você. Do outro lado da janela, o corredor está quase vazio. Do lado de fora, a chuva se transformou em neblina baixa, cobrindo a rua com uma luz difusa.

Bella: — Eu achei que tava tentando descobrir por que minha irmã desapareceu.

Você: — E agora?

Bella: — Agora eu acho que preciso descobrir quem continuou mexendo nessa história quando todo mundo dizia que já tinha acabado.

Você percebe que ela não está anunciando uma conclusão. Está fazendo uma pergunta que ninguém queria ouvir. Os próximos passos não dependem de acusar um nome qualquer, mas de entender para que a estação foi usada e por que Moisés guardou tanto silêncio.

Em outra parte do hospital, o telefone de um sobrevivente vibra. Desta vez é apenas uma mensagem perguntando se todos chegaram em segurança. A banalidade do gesto parece preciosa.

Bella volta a olhar para a janela.

Bella: — Se o Moisés sabia de alguma coisa sobre aqueles meses, então eu não tava procurando no lugar certo. Faz um ano que eu olho pra noite em que a Ju sumiu. E se o que importa também aconteceu depois?

Você não responde. O lago aparece de novo na sua memória, escuro e quieto.

FIM DO CAPÍTULO 08 — ÁGUAS TURVAS`,[]);
// V1.2.2: outcomes are written as scenes, not a death flag followed by a generic report.
// Always narrated from the endangered person's perspective BEFORE returning to hero.
const FATAL_BOMBAS={
 isabella:`PONTO DE VISTA: ISABELLA

A galeria de controle escurece antes que Isabella consiga chegar à plataforma. O aviso de circuito isolado pisca, mas há água avançando do outro lado da grade. Ela volta a mão para o apoio seco; um estalo agudo faz a lâmpada explodir sobre sua cabeça.

Isabella: — NÃO! AFASTA, CARALHO!

O metal retorce quando ela tenta passar. A grade se solta da base e a atinge no peito, derrubando-a contra a borda de concreto. Isabella tenta puxar ar, mas a dor interrompe a respiração. Sangue escorre da testa, misturando-se à água que avança.

Isabella: — Rayssa... alguém... me escuta...

O rádio solta um chiado. Ela tenta alcançar o aparelho caído no piso. Os dedos chegam a tocar a capinha, mas não conseguem segurá-la. A última luz da galeria apaga. Isabella para de se mover antes que o socorro consiga abrir a porta.`,
 allan:`PONTO DE VISTA: ALLAN

O som da estante se arrastando pelo chão chega primeiro. Allan tenta passar pela abertura que conseguiu criar, mas a caixa de arquivos se solta de uma prateleira acima de sua cabeça. Ele se joga para o lado, bate com força na borda de concreto e cai de joelhos.

Allan: — SAMU?! SAMUEL, EU TÔ AQUI!

Uma linha de sangue desce de sua têmpora. Ele procura a porta, mas a estante inteira cede quando a água desloca sua base. O metal atinge seu ombro e o prende contra o piso. Allan grita, tentando libertar o braço; a dor tira o ar de seus pulmões.

Allan: — NÃO... NÃO, POR FAVOR! SAMU!

O rádio transmite apenas o começo de seu pedido. Ele ainda tenta empurrar a estrutura, deixando marcas de sangue na lateral do armário, mas a força desaparece aos poucos. O último som que ouve é a água batendo nas caixas. Quando os bombeiros conseguem alcançá-lo, Allan já não respira.`,
 breno:`PONTO DE VISTA: BRENO

O compressor dá três pancadas secas, uma após a outra. Breno recua do corredor alagado, mas a tubulação sob pressão rompe o suporte e atravessa sua rota de fuga. A pancada o lança contra o chão de concreto.

Breno: — MERDA! NÃO... NÃO...

Ele tenta ficar de pé, segurando o lado do corpo. O sangue se espalha pela camisa, e a respiração sai curta. A porta da galeria está tão perto que ele consegue ver a faixa amarela da saída; sua perna não responde quando tenta avançar.

Breno: — Eu tô... na bomba... alguém...

Ele aperta o botão do rádio, mas a conexão falha entre dois alarmes. Ainda arrasta o corpo alguns centímetros, deixando um rastro no piso, até alcançar o primeiro degrau. Quando a equipe entra pelo acesso superior, encontra Breno imóvel, com uma das mãos estendida na direção da saída.`,
 samuel:`PONTO DE VISTA: SAMUEL

O reboque treme sobre o piso encharcado. Samuel tenta se afastar da corrente, mas o eixo destrava de repente. A plataforma avança e esmaga o espaço entre ela e o pilar de concreto.

Samuel: — SAI! SAI DAÍ!

Ele se joga para o lado, mas não rápido o bastante. O impacto o lança contra a parede; sangue aparece na manga e escorre por sua mão enquanto tenta se apoiar. Samuel encara a roda ainda girando, como se de alguma forma fosse possível mandar uma máquina parar pela força da voz.

Samuel: — Não... de novo, não...

O rádio cai de sua mão. Ele tenta chamá-lo de volta, pensa em Allan e no que gostaria de ter dito, mas a dor e a perda de sangue tornam cada respiração mais difícil. Samuel morre antes que a equipe de resgate consiga mover a plataforma.`
};
const FATAL_PASSARELA={
 laisla:`PONTO DE VISTA: LAISLA

Uma tábua estala sob o tênis de Laisla. Ela segura o corrimão, mas o parafuso enferrujado se desprende da madeira. A passarela cede de lado, e Laisla cai contra a estrutura inferior.

Laisla: — RAUANNY! ME AJUDA!

Ela consegue agarrar um apoio, mas a borda quebrada a corta profundamente. A água bate em seu rosto enquanto tenta subir. O mascarado aparece acima, impedindo a passagem de volta. Laisla puxa o corpo uma última vez; o apoio se solta e ela desaparece sob a superfície escura.

O resgate a encontra alguns minutos depois. Há sangue na madeira onde ela tentou se erguer, e nenhuma resposta quando chamam seu nome.`,
 rauanny:`PONTO DE VISTA: RAUANNY

A água cobre a escada quando Rauanny tenta alcançar o patamar. O ferimento antigo na perna se contrai de dor; ela perde o apoio e bate contra a grade lateral.

Rauanny: — LAISLA?! ME RESPONDE!

Ela consegue voltar à superfície uma vez. A correnteza arrasta seu corpo contra a estrutura de drenagem; um corte profundo abre a pele de seu braço, e o sangue se espalha rapidamente. Rauanny agarra uma barra, mas ela se solta com o peso.

Rauanny: — SOCORRO! EU TÔ AQUI!

A água a puxa para baixo novamente. Quando os bombeiros chegam ao canal, encontram seu corpo preso junto à grade, já sem sinais de vida.`,
 ryan:`PONTO DE VISTA: RYAN

Ryan alcança a portinhola da guarita no instante em que a cancela automática desce outra vez. Ele coloca o braço na frente do rosto e tenta passar, mas a estrutura metálica se desprende de um dos suportes.

Ryan: — NÃO, NÃO, NÃO! ABRE ESSA MERDA!

O impacto o derruba contra a base da grade. Ryan tenta se arrastar pela faixa seca, deixando sangue no cimento, enquanto o mascarado aparece atrás do vidro da guarita.

Ryan: — ALGUÉM ME OUVE? EU TÔ NA CANCELA!

Ele ainda encontra forças para empurrar a grade uma vez. O metal cai sobre ele antes que consiga passar. O rádio continua ligado depois que sua voz se cala. Os socorristas o encontram sob a estrutura, sem pulso.`,
 breno:`PONTO DE VISTA: BRENO

A comporta cede quando Breno alcança o patamar. O metal bate contra a borda da passarela e o lança de costas sobre uma viga quebrada. Ele tenta se levantar, mas a pancada abre um ferimento no lado do corpo.

Breno: — EU TÔ NA SAÍDA! EU PRECISO DE AJUDA!

A água continua avançando. Ele prende a mão no apoio, procurando a escada, enquanto o mascarado se aproxima pelo corredor superior. Breno consegue afastar-se do primeiro golpe, mas escorrega ao tentar alcançar o degrau. A queda contra a viga tira dele as últimas forças.

Quando alguém chega à passagem, o celular ainda está aceso perto de sua mão. Breno não responde.`,
 samuel:`PONTO DE VISTA: SAMUEL

A caminhonete está a poucos passos. Samuel tenta contornar a madeira rachada, mas o apoio cede quando ele se volta para o mascarado. Seu pé atravessa o piso; a queda o joga contra o conjunto de ferragens sob a passarela.

Samuel: — CARALHO! ME PUXA DAQUI!

Ele se agarra ao corrimão com as duas mãos. Sangue desce por sua testa; o braço que sustenta seu peso começa a falhar. Samuel tenta alcançar a escada lateral, mas a estrutura inteira se solta com um estrondo.

O corpo cai na margem pedregosa. A equipe de resgate chega pouco depois, mas Samuel já não reage.`,
 isabella:`PONTO DE VISTA: ISABELLA

Isabella alcança a plataforma externa e tenta passar pela grade de inspeção. Um fio solto enrosca em sua manga. Ela o evita, mas a estrutura enferrujada cede quando recua.

Isabella: — PARA! NÃO CHEGA PERTO!

Ela cai contra os degraus da escada e bate a cabeça na base de concreto. O sangue escorre por seu rosto enquanto tenta orientar o corpo para a saída. A luz da guarita ainda aparece entre as árvores, mas seus braços já não obedecem.

Isabella: — Rayssa... me desculpa...

A voz desaparece. Quando os bombeiros a localizam, a escada está coberta de água e Isabella não apresenta sinais de vida.`,
 allan:`PONTO DE VISTA: ALLAN

Allan tenta afastar a caixa que bloqueia a passagem, mas a tábua sob seus pés parte de uma vez. Ele cai entre os apoios da passarela e bate a cabeça numa viga de concreto.

Allan: — AI! NÃO... SAMUEL! TÔ AQUI EMBAIXO!

Ele tenta puxar o corpo para o patamar, mas as mãos escorregam no metal molhado. Sangue escorre de sua testa e pinga na água. A correnteza aumenta; Allan perde o apoio e desaparece sob a estrutura.

A equipe de salvamento o encontra a poucos metros da margem. O rádio preso à sua jaqueta ainda transmite ruído, mas Allan já morreu.`
};
const VOZ_LUTO={
 rayssa:(p)=>`Rayssa fica com a respiração presa quando ouve o nome de ${p}.

Rayssa: — A gente passou a noite inteira discutindo quem podia estar escondendo alguma coisa... e agora ${p} não volta. Eu não sei nem como pedir desculpa por isso.`,
 ryan:(p)=>`Ryan guarda o boné no colo.

Ryan: — Eu tava tentando lembrar da última vez em que a gente saiu pra rir de alguma coisa. Eu não queria que a última lembrança de ${p} fosse aquela estação.`,
 laisla:(p)=>`Laisla procura a mão de quem está ao lado antes de falar.

Laisla: — A gente tinha uma vida, sabe? Festa, prova, ônibus atrasado. ${p} devia estar reclamando dessas coisas com a gente, não virando uma notícia num corredor.`,
 samuel:(p)=>`Samuel encara o chão e esfrega a palma da mão sobre os olhos.

Samuel: — Eu falei tanta merda naquela discussão... e não deu pra dizer uma coisa decente pra ${p} antes de sair.`,
 rauanny:(p)=>`Rauanny passa os dedos pelo curativo sem perceber.

Rauanny: — Se alguém disser pra eu ser forte agora, eu vou mandar calar a boca. ${p} morreu. Eu só quero sentir isso sem ter que fingir coragem.`,
 allan:(p)=>`Allan abre a boca, procurando uma piada que não vem.

Allan: — Eu sempre achava que dava pra animar alguém em cinco minutos. Não sei o que fazer com a falta que ${p} vai fazer.`,
 isabella:(p)=>`Isabella tenta organizar os nomes na tela do telefone, mas interrompe a própria mão.

Isabella: — Eu podia ter conferido mais uma vez onde ${p} estava. Sei que não é tão simples... mas eu vou continuar pensando nisso.`,
 breno:(p)=>`Breno se afasta um passo da porta e respira fundo.

Breno: — Eu queria que ${p} tivesse conseguido sair. Não tenho nenhuma frase bonita pra dizer. Só... eu queria muito.`
};
const LUTO={
 allan:[['samuel',`Samuel se levanta ao ouvir o nome e fica imóvel, como se a médica tivesse falado outra língua.

Samuel: — Não. O Allan tava me mandando áudio hoje. Ele tava fazendo piada comigo. Não pode ser.

Ele aperta o celular contra o peito e começa a chorar sem conseguir terminar a frase.`],['ryan',`Ryan olha para a cadeira vazia.

Ryan: — Ele era o primeiro a mandar mensagem quando alguém desaparecia do grupo. Eu devia ter ligado pra ele.`]],
 samuel:[['allan',`Allan tenta rir de nervoso. Não sai som algum.

Allan: — Eu conheço o Samu desde antes de tudo isso. Eu devia ter... sei lá... ido atrás dele.

Ele perde a voz e abaixa a cabeça sobre os braços.`],['isabella',`Isabella cobre o rosto com as mãos.

Isabella: — Eu briguei com ele hoje. A última coisa que eu fiz foi acusar o Samuel na frente de todo mundo.

Ela demora a conseguir respirar normalmente.`]],
 isabella:[['rayssa',`Rayssa deixa o copo cair no chão. Nem percebe a água espalhando sob seus sapatos.

Rayssa: — Não. Eu falei com a Isa antes de ela sair. Ela disse que me ligava depois.

Quando tenta continuar, a voz falha e ela começa a chorar.`],['laisla',`Laisla leva uma das mãos à boca.

Laisla: — Ela ficava mandando a gente conferir as coisas duas vezes... e tinha razão. Por que eu não escutei?`]],
 laisla:[['rauanny',`Rauanny não consegue aceitar a notícia. Ela se aproxima da porta, volta e agarra a beirada da cadeira.

Rauanny: — Ela é minha melhor amiga. Eu tava com ela ontem. Você tá me dizendo que eu não vou ouvir a voz dela nunca mais?

O choro vem antes que consiga acrescentar qualquer coisa.`],['isabella',`Isabella retira os óculos e tenta enxugar os olhos.

Isabella: — A Laisla foi a pessoa que abriu a porta quando a gente precisava de algum lugar seguro. Não era pra terminar assim.`]],
 rauanny:[['laisla',`Laisla balança a cabeça, olhando para o lugar onde Rauanny deveria estar.

Laisla: — Não, ela ia voltar. Ela sempre voltava pra me buscar. Não fala assim como se fosse uma coisa normal.

Ela chora, apoiada na parede.`],['ryan',`Ryan aperta o celular com tanta força que os dedos ficam brancos.

Ryan: — A Rauanny era a única que conseguia me fazer calar a boca quando eu tava passando dos limites. Como é que eu não vi o perigo?`]],
 breno:[['samuel',`Samuel esfrega os olhos, sem conseguir olhar para o corredor.

Samuel: — Ele ficou sozinho tantas vezes e a gente achava normal. Eu devia ter perguntado se precisava de ajuda.`],['ryan',`Ryan dá um passo para trás ao ouvir o nome.

Ryan: — O Breno tava tentando ajudar. A gente fez ele se sentir parte disso tudo... e agora ele não tá aqui.`]],
 ryan:[['rauanny',`Rauanny olha para as mensagens antigas de Ryan e começa a chorar.

Rauanny: — Ele sempre falava uma besteira na hora errada. Agora eu daria qualquer coisa pra ouvir uma.`],['laisla',`Laisla segura a mão de Rauanny, se ela estiver presente.

Laisla: — Ele fez tanta coisa pra tirar a gente daquele apartamento. A gente devia ter conseguido tirar ele dessa estação.`]]
};
function fatalScene(id,part,s){
 const name=L[id]||id;
 if(s?.social107?.graphicOff){
  const place=part===1?'o setor técnico da estação':'a passagem externa sobre o lago';
  return 'PONTO DE VISTA: '+name.toUpperCase()+'\n\n'+name+' tenta alcançar a saída de '+place+'. Os equipamentos falham e uma parte da estrutura cede durante a fuga. Mesmo tentando recuperar o equilíbrio, '+name+' sofre um ferimento muito grave.\n\n'+name+': — NÃO! ALGUÉM ME AJUDA!\n\nO pedido de socorro se perde entre o barulho da água e dos alarmes. Quando a equipe consegue chegar, não há mais sinais de vida. A perda é definitiva; os amigos ainda precisarão receber a notícia.';
 }
 return (part===1?FATAL_BOMBAS:FATAL_PASSARELA)[id]||'';
}
function memorialText(s){const lost=ids.filter(x=>s.flags?.['c8_morto_'+x]);if(!lost.length)return '';
 let out='';for(const id of lost){out+='\n\nA médica fecha a pasta e confirma o nome de '+L[id]+'. Não há confusão com uma pessoa desaparecida: o corpo foi localizado, e a morte está oficialmente confirmada.';
 const reactions=LUTO[id]||[];let count=0;
 for(const [other,story] of reactions){if(!dead(s,other)){out+='\n\n'+story;count++;}}
 if(count===0){const other=alive(s).find(x=>x!==id);if(other)out+='\n\n'+L[other]+' não tenta esconder as lágrimas.\n\n'+L[other]+': — Eu não quero que a última coisa que a gente lembre de '+L[id]+' seja o jeito que morreu. Não era só isso que '+L[id]+' era.';}
 const already=new Set(reactions.filter(([who])=>!dead(s,who)).map(([who])=>who));
 for(const survivor of alive(s)){if(survivor!==id&&!already.has(survivor))out+='\n\n'+VOZ_LUTO[survivor](L[id]);}
 if(s.flags?.c8_bella_condicao==='hospital')out+='\n\nBella, ainda deitada no quarto de observação, recebe a notícia por uma chamada autorizada. Ela fecha os olhos antes de responder.\n\nBella: — Eu sinto muito. Eu sei o que é esperar alguém voltar e descobrir que isso não vai acontecer. Não deixa as famílias saberem por boato, tá?';
 else out+='\n\nBella segura o próprio casaco e observa o grupo.\n\nBella: — Eu vim aqui procurar notícia da minha irmã. Não aguento ouvir mais um nome sem que ninguém saiba explicar o que aconteceu.';
 if(s.romanceEscolhido===id)out+='\n\nVocê desbloqueia a conversa particular com '+L[id]+'. A última mensagem permanece onde estava. A lembrança do jantar se transforma numa dor que você ainda não sabe nomear.';
 out+='\n\nVocê pensa numa lembrança comum: '+({allan:'as piadas que Allan repetia quando ninguém mais queria rir',samuel:'Samuel girando as chaves do carro no dedo enquanto explicava alguma coisa',isabella:'Isabella corrigindo o horário de todo mundo com uma precisão irritante',laisla:'Laisla preparando uma mesa grande mesmo quando dizia que não dava trabalho',rauanny:'Rauanny fazendo planos em voz alta como se a cidade fosse pequena demais',breno:'Breno escutando quieto antes de oferecer ajuda',ryan:'Ryan fazendo uma careta quando percebia alguém triste'}[id]||'uma conversa interrompida')+'. É disso que você quer se lembrar, mas a notícia acabou de chegar.';
 }
 return out;
}
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
function markRisk(s,part){positions(s);const f=s.flags;if(f['c8_risk'+part+'_resolved'])return;f['c8_risk'+part+'_resolved']=true;
 const id=f['c8_risk'+part+'_target'],status=riskOutcome(s,part);f['c8_risk'+part+'_result']=status;
 if(!id||status==='none')return;
 if(status==='fatal'){
  const n=ids.filter(x=>f['c8_morto_'+x]).length;
  if(n<2)f['c8_morto_'+id]=true;else {f['c8_grave_'+id]=true;f['c8_risk'+part+'_result']='injured';}
 }else if(status==='injured')f['c8_grave_'+id]=true;
 f.c8_pos[id]=f['c8_risk'+part+'_result']==='fatal'?'sem_retorno':'resgatado';
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
function recordDebateRelations(s){const f=s.flags||{};if(!f.c8_enter_k8_debate||f.c8_debate_vinculos_v122)return false;
 f.c8_debate_vinculos_v122=true;s.friendBonds??={};
 const changes=[['isabella','samuel',-12],['allan','samuel',6],['allan','isabella',-6],['rauanny','breno',-12],['laisla','rauanny',-4],['laisla','breno',4],['ryan','isabella',-3]];
 for(const [a,b,n] of changes){if(dead(s,a)||dead(s,b))continue;const k=[a,b].sort().join(':');s.friendBonds[k]=Math.max(-100,Math.min(100,Number(s.friendBonds[k]||0)+n));}
 return true;
}
function enter(s,id){if(!s?.flags||!id.startsWith('k8_'))return false;const f=s.flags,stamp='c8_enter_'+id;const upgraded=id!=='k8_01'&&recordDebateRelations(s);if(f[stamp])return upgraded;f[stamp]=true;
 if(id==='k8_invited')positions(s);
 if(id.startsWith('k8_friend_end_'))f['c8_social_visit_'+id.slice('k8_friend_end_'.length)]=true;
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
 if(id==='k8_debate'){
  const say=(a,b,v)=>{if(live.includes(a)&&live.includes(b))text+='\n\n'+v;};
  say('isabella','samuel',`Isabella: — Você disse que ninguém podia saber da oficina, Samuel. Mas a gente viu as mensagens. Você também perguntou quem ia e a que horas.

Samuel: — EU PERGUNTEI PORQUE O MOISÉS IA FALAR DAQUELA NOITE! PORQUE EU TAVA LÁ NO VOLANTE!

Isabella: — Então para de gritar e explica o que você contou.

Samuel: — Eu não contei porra nenhuma pro assassino! Não tenta me fazer repetir aquele acidente como se você não tivesse no carro também.

Isabella: — Eu tava. E justamente por isso não vou fingir que foi tudo igual pra cada um de nós.

Samuel afasta a cadeira com tanta força que ela bate na parede.`);
  say('allan','samuel',`Allan: — Samu, olha pra mim. Para de berrar. Ela pode fazer pergunta, mas ninguém aqui vai te pendurar numa parede porque você tava dirigindo.

Samuel: — Você vai ficar me defendendo até quando, Allan?

Allan: — Até você parar de agir como se eu tivesse te defendendo de todas as escolhas erradas. Eu tô te defendendo de uma acusação sem prova. É diferente.

Allan: — E, Isabella, você sabe muito bem que ele nem tava sozinho naquela noite.`);
  say('rauanny','breno',`Rauanny: — Então vamos falar da pessoa que passa metade do tempo sozinha e some quando a gente precisa? Breno, você fica perto de todo mundo, mas nunca diz o que tá fazendo.

Breno: — Eu saio quando preciso respirar. Eu sempre fiz isso. Você sabe.

Rauanny: — E a gente sabe onde você tava quando a mensagem chegou?

Breno: — Não. Porque ninguém perguntou. Você podia ter mandado mensagem em vez de guardar isso pra me acusar na frente de todo mundo.

Rauanny: — Eu não tô acusando, tô perguntando.

Breno: — Do jeito que você falou, não parece.`);
  say('laisla','rauanny',`Laisla: — Rauanny, para. Eu te amo, mas você não pode chegar apontando pro Breno só porque ele não fala tanto quanto a gente.

Rauanny: — Eu tô tentando pensar em quem podia estar onde a gente não via.

Laisla: — Então pensa. Só não usa a timidez de uma pessoa como prova de assassinato. Eu já deixei um mascarado entrar na minha casa. Não preciso começar a ter medo dos amigos também.

Rauanny: — Você acha que eu não tô com medo?!

Laisla: — Eu sei que tá. Eu também tô.`);
  say('ryan','isabella',`Ryan: — Eu sei que a Isa quer organizar tudo. Eu também quero. Mas a gente quase se matou pra sair daquele apartamento. Não dá pra usar cada segundo em que alguém ficou fora de vista como se fosse uma confissão.

Isabella: — Não foi isso que eu disse.

Ryan: — Eu ouvi. Só tô pedindo pra gente não se destruir antes de encontrar quem tá fazendo isso.`);
  if(live.includes('rayssa'))text+='\n\nRayssa: — Todo mundo tá tentando achar uma explicação que doa menos. Se a gente transformar medo em certeza, amanhã nem vai ter grupo pra discutir.\n\nEla aperta os dedos contra a manga. Ninguém sabe se aquela tentativa de apaziguar ajuda ou irrita mais.';
  if(live.includes('samuel'))text+='\n\nSamuel volta a olhar para você.\n\nSamuel: — E você, '+hero(s)+'? Vai ficar em silêncio? Você falou com o Moisés. Quem mais sabia do encontro?';
  else if(live.length)text+='\n\n'+L[live[0]]+': — E você, '+hero(s)+'? Você recebeu a ligação. Quem mais conhecia o lugar?';
  if(live.length<3)text+='\n\nA sala tem poucas pessoas, mas o silêncio entre as falas é ainda pior. Não há vozes suficientes para esconder as suspeitas.';
 }
 if(id==='k8_debate_end'){
  if(f.c8_defendeu){const chosen=f.c8_defendeu;if(live.includes(chosen))text+='\n\n'+L[chosen]+': — Você não precisava ter concordado comigo. Obrigado por me deixar terminar a frase.';}
  if(f.c8_foi_acusado)text+='\n\nVocê ainda sente o peso de ser chamado pelo nome diante de todos. Mesmo quem ficou em silêncio ouviu a acusação.';
  if(f.c8_tentou_reaproximar)text+='\n\nVocê escreve uma mensagem curta, sem cobrar resposta. O aparelho continua silencioso por algum tempo.';
 }
 if(id==='k8_bella_despedida'){
  if(f.c8_bella_confianca)text+='\n\nBella: — Se você for mesmo comigo, não inventa desculpa pra me poupar. Eu prefiro uma verdade horrível a ouvir outra vez que «vai ficar tudo bem».\n\nVocê: — Eu não vou prometer uma coisa que não consigo garantir.\n\nBella: — Já é alguma coisa.';
  else if(f.c8_bella_provas)text+='\n\nBella: — Então me mostra só o que você tem. Sem me dizer o que eu devo concluir. Eu consigo lidar com um papel incompleto. Com mentira eu tô ficando sem paciência.';
  else if(f.c8_bella_advertida)text+='\n\nBella: — Eu sei que é perigoso. Você acha que eu esqueci como a minha irmã sumiu? Só não fala comigo como se eu fosse uma criança que perdeu a chave de casa.\n\nVocê: — Eu não quis fazer isso.\n\nBella: — Então a gente começa de novo.';
 }
 if(id==='k8_flashback_final'){
  if(f.c8_bella_memoria_presente)text+='\n\nJullia entrega a Bella um pequeno porta-chaves pintado à mão. Não é bonito nem caro. Bella reconhece duas estrelas feitas com tinta prateada.\n\nBella: — Você é muito ruim em guardar segredo.\n\nJullia: — Eu escondi uma semana!\n\nBella: — Você me perguntou cinco vezes se eu gostava de estrelas.\n\nJullia: — E você não percebeu!';
  else text+='\n\nBella: — Você lembra daquela vez que a gente ficou três dias sem se falar por causa do meu moletom?\n\nJullia: — Não foram três dias. Foram quatro, porque você é dramática.\n\nBella: — VOCÊ que chorou quando eu falei que ia doar o casaco.\n\nJullia: — Porque era meu preferido, sua insensível.\n\nAs duas desatam a rir de novo.';
 }
 if(id.startsWith('k8_friend_reflect_')){
  const who=id.slice('k8_friend_reflect_'.length),d=FRIEND_MORE[who];const kind=f['c8_tema_'+who];
  if(d){text+='\n\n'+(kind==='desculpa'?'Você: — Eu vim aqui porque o que eu disse ontem pode ter machucado você. Não quero pedir desculpa só pra receber perdão depressa.\n\n'+L[who]+': — Então me deixa falar sem você me interromper.':'Você: — Eu não tenho certeza do que falar. Só sei que não queria que você atravessasse tudo isso sozinho.\n\n'+L[who]+': — Eu precisava ouvir alguém dizer isso sem fazer promessa impossível.');}
 }
 if(id.startsWith('k8_friend_response_')){
  const who=id.slice('k8_friend_response_'.length),d=FRIEND_MORE[who],kind=f['c8_profundo_'+who];
  if(d)text+='\n\n'+(kind==='sonho'?d.dream:kind==='perda'?d.soft+'\n\nVocê: — Às vezes eu fico procurando o que eu poderia ter feito antes. Mas não quero esquecer as pessoas que ainda estão aqui.':'Você: — Eu não tenho como resolver o que aconteceu na oficina. Mas posso te perguntar de novo amanhã se você quer companhia.\n\n'+d.soft);
 }
 if(id==='k8_06'){
  const met=ids.filter(x=>f['c8_social_visit_'+x]);
  if(met.length===1)text='PONTO DE VISTA: PROTAGONISTA\n\nVocê sai do primeiro encontro com o coração menos apertado, mas a tarde ainda não terminou. Há outro amigo com quem talvez valha a pena conversar, desde que ele esteja disposto e fisicamente disponível.\n\nO telefone mostra alguns nomes que não responderam desde a discussão. Você não vai insistir com quem pediu distância.';
  if(met.length>=2)text='PONTO DE VISTA: PROTAGONISTA\n\nDepois de duas conversas demoradas, você percebe como cada amigo está enfrentando uma dor diferente. Não há tempo para encontrar mais ninguém agora, e você não quer transformar o cuidado em uma lista de visitas.\n\nA mensagem de Bella continua esperando no celular. A tarde vai avançando.';
 }
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
 if(id==='k8_defend'){
  const p=f.c8_defendeu;
  if(p&&L[p]){
   const critic=({'samuel':'isabella','breno':'rauanny','rauanny':'breno','isabella':'samuel','allan':'isabella','laisla':'rauanny','ryan':'isabella','rayssa':'samuel'})[p];
   text=text.replace('a pessoa que está defendendo',L[p]).replace('O que acontece a seguir depende de quem você decidiu apoiar.','Você olha diretamente para '+L[p]+' e espera que consiga terminar a resposta.');
   text+='\n\nVocê: — Eu tô defendendo '+L[p]+'. Vocês podem perguntar o que quiserem, mas não vão transformar uma suspeita em sentença.';
   if(live.includes(p))text+='\n\n'+L[p]+': — Eu não tô pedindo que ninguém confie em mim sem pensar. Só quero poder explicar antes de vocês decidirem por mim.';
   if(live.includes(critic))text+='\n\n'+L[critic]+': — Tá. Eu ouvi você. Mas isso não apaga minhas perguntas. Nem o que aconteceu com o Moisés.';
   if(live.includes('ryan')&&p!=='ryan')text+='\n\nRyan: — Então a gente faz perguntas e deixa a pessoa responder. É o mínimo depois de tudo que aconteceu.';
   const other=live.find(x=>x!==p&&x!==critic&&x!=='ryan');if(other)text+='\n\n'+L[other]+' não parece convencido, mas abaixa o celular e volta a se sentar. A defesa mudou o clima da sala; não encerrou a desconfiança.';
  }
 }
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
  const met=ids.filter(x=>f['c8_social_visit_'+x]); const willing=met.length>=2?[]:live.filter(x=>!heavy(s,x)&&trust(s,x)>=34&&!f['c8_social_visit_'+x]);
  const reluctant=live.filter(x=>!willing.includes(x)&&!f['c8_social_visit_'+x]);
  if(reluctant.length)text+='\n\n'+names(reluctant)+' não marcou um novo encontro. Pode ser pela recuperação médica, pela discussão ou pela necessidade de ficar a sós. Você respeita a decisão.';
  choices=willing.map(x=>C('Conversar a sós com '+L[x],'k8_friend_'+x,[S('amigo_escolhido',x)]));
  choices.push(C(met.length?'Encerrar as conversas e conferir a investigação':'Dar espaço aos outros e seguir com a investigação',met.length?'k8_07':'k8_unavailable',[F('sem_conversa')]));
 }
 if(id==='k8_07'){
  const love=s.romanceEscolhido;
  if(ROMANCE_LINES[love]&&!dead(s,love)){text+='\n\n'+L[love]+' manda uma mensagem particular, antes de você sair.\n\n'+ROMANCE_LINES[love]+'\n\nVocê lê duas vezes. Não é uma promessa de namoro nem uma solução para o medo. É uma pessoa específica tentando permanecer perto.';choices=[C('Responder a '+L[love]+' agora','k8_romance_resposta',[B(love,2)]),C('Ler e deixar para responder depois','k8_romance_silencio',[F('vacuo_romance'),B(love,-2)])];}
  else if(love&&love!=='solteiro'&&dead(s,love))text+='\n\nVocê encontra a última conversa com '+L[love]+' entre as mensagens antigas. Não há uma resposta nova. A ausência torna a ideia de voltar ao lago mais difícil de suportar.';
  if(f.c8_reagiu_acusacao)text+='\n\nVocê percebe que certas pessoas ainda não responderam depois de sua reação no hospital. Não pode fingir que a relação está resolvida.';
 }
 if(id==='k8_romance_continua'){
  const l=s.romanceEscolhido; const tone=f.c8_tom_romance;
  const answers={
   ryan:tone==='medo'?`Você: — Eu tô com medo de acontecer alguma coisa com você antes de a gente ter outra noite dessas.\n\nRyan: — Eu também tô. E eu odeio não ter uma piada boa pra isso. Mas gosto de saber que você ainda quer me ver.\n\nVocê: — Quero. Só não sei o que prometer.\n\nRyan: — Então não promete. Me chama quando precisar. Eu faço o mesmo.`:`Você: — Ainda tô devendo aquela discussão séria sobre sobremesa. E queria outra noite com você.\n\nRyan: — Agora sim uma mensagem que merece print. Vou usar contra você quando escolher o sabor mais esquisito do cardápio.\n\nVocê: — Você já escolheu o mais esquisito da outra vez.\n\nRyan: — E você gostou de mim mesmo assim.`,
   breno:tone==='medo'?`Você: — Eu queria te ver de novo, mas tô assustado demais pra fingir que tá tudo normal.\n\nBreno: — Ainda bem que você não fingiu. Eu percebo quando você começa a responder como se estivesse preenchendo formulário.\n\nVocê: — Eu faço isso?\n\nBreno: — Um pouco. Não precisa. Eu posso ficar aqui e conversar até o assunto ficar menos pesado.`:`Você: — Eu gostei de ficar com você naquela noite. Queria repetir, sem pressa.\n\nBreno: — Eu fiquei pensando na tua mão perto da minha em cima da mesa. Parece uma coisa pequena, mas eu lembro de cada segundo.\n\nVocê: — A gente tem tempo pra outras coisas pequenas.\n\nBreno: — É disso que eu tenho saudade.`,
   rayssa:tone==='medo'?`Você: — Eu tô assustada com a ideia de perder você. Ontem parecia que nada era seguro.\n\nRayssa: — Eu sei. Às vezes eu acordo e fico esperando o telefone tocar com outra notícia horrível.\n\nVocê: — Eu não quero passar esse medo sozinho.\n\nRayssa: — Nem eu. Obrigada por me dizer.`:`Você: — Eu gostei do jantar, Ray. Gostei de estar com você sem ter que encontrar resposta pra tudo.\n\nRayssa: — Eu também. Fiquei com medo de você achar que eu tava distante. Às vezes tô tentando organizar coisa demais na cabeça.\n\nVocê: — Eu queria outra noite assim.\n\nRayssa: — Eu queria muito.`,
   rauanny:tone==='medo'?`Você: — Eu tô com medo de te perder. E sei que você odeia quando alguém tenta te proteger de tudo.\n\nRauanny: — Odeio mesmo. Mas gosto quando a pessoa pergunta como eu tô, em vez de decidir por mim.\n\nVocê: — Então como você tá?\n\nRauanny: — Com dor, com sono e querendo te beijar de novo quando essa semana horrível acabar.`:`Você: — Tô pensando naquele jantar. Acho que você tava linda quando riu da minha cara.\n\nRauanny: — Você sabe que eu não preciso de motivo pra rir da tua cara, né?\n\nVocê: — Sei. Mesmo assim quero repetir.\n\nRauanny: — Quero também. E dessa vez você escolhe a música, mas não reclama do preço.`};
  if(answers[l])text+='\n\n'+answers[l];
 }
 if(id==='k8_romance_silencio'){
  const l=s.romanceEscolhido;if(L[l])text+='\n\nNa lista de conversas, o nome de '+L[l]+' permanece junto do aviso de leitura. A outra pessoa não sabe que você ficou vários minutos olhando a tela sem conseguir responder.';
 }
 if(id==='k8_07_decidir'){
  const l=s.romanceEscolhido;
  if(L[l]&&f.c8_vacuo_romance&&!dead(s,l))text+='\n\nUma última notificação chega de '+L[l]+': «Vi que você leu. Sei que tá difícil, mas podia ter me dito que precisava de espaço. Espero que você esteja bem.» Você sente o peso da mensagem sem conseguir desfazer o silêncio automaticamente.';
  else if(L[l]&&f.c8_respondeu_romance)text+='\n\nO contato com '+L[l]+' termina com uma despedida simples e uma promessa de avisar quando chegar a um lugar seguro. Não é um compromisso oficial; é uma tentativa de não desaparecer um da vida do outro.';
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
   if(result==='fatal'&&f['c8_morto_'+who])text=fatalScene(who,1,s)+'\n\nEnquanto isso, na passagem superior, você continua tentando completar a ligação. O som do último pedido de socorro ainda não chegou até você.\n\n'+text+'\n\nUma equipe de resgate entra pelo setor indicado e encontra '+L[who]+' sem vida. O médico confirma o óbito. Não é um desaparecimento nem uma dúvida sobre onde essa pessoa está.';
   else if(result==='injured')text+='\n\n'+L[who]+' tenta alcançar a saída, mas a estrutura o atinge durante a fuga. O pedido de ajuda chega com a posição correta. A equipe retira '+L[who]+' com um ferimento grave para atendimento imediato.';
   else if(result==='safe')text+='\n\n'+L[who]+' envia uma mensagem curta confirmando que atravessou o setor e está fora de perigo. Você confere a localização antes de avançar.';
  }
 }
 if(id==='k8_risk2_pov'){
  const who=f.c8_risk2_target;
  if(!who){text+='\n\nA última checagem confirma que não há outro acompanhante exposto na passarela. Todos os convidados que podiam passar por aqui já avisaram sobre suas saídas ou permanecem em outra posição segura.';choices=[G('k8_risk2_empty','Seguir sem procurar alguém que não ficou aqui')];}
  else{text+='\n\nO telefone mostra a última posição de '+L[who]+': '+(STAGE_LOC[f.c8_pos?.[who]]||'acesso externo')+'. O mascarado ainda está próximo da estrutura. '+L[who]+' precisa agir antes de conseguir falar novamente.';choices=[G('k8_r2_'+who,'PONTO DE VISTA: '+L[who].toUpperCase())];}
 }
 if(id==='k8_risk2_out'){
  const who=f.c8_risk2_target,res=f.c8_risk2_result;
  if(who){
   if(res==='fatal'&&f['c8_morto_'+who])text=fatalScene(who,2,s)+'\n\nNa estrada, você ainda procura a confirmação de saída de '+L[who]+'. A equipe de resgate recebe a última posição pelo rádio.\n\n'+text+'\n\nOs socorristas encontram '+L[who]+' sem sinais de vida. A confirmação chega ao grupo antes do reencontro.';
   else if(res==='injured')text+='\n\n'+L[who]+' sobrevive à fuga pela passagem externa, mas a queda deixa ferimentos importantes. Os socorristas fazem o transporte imediato para avaliação.';
   else if(res==='safe')text+='\n\n'+L[who]+' atravessa o acesso sinalizado e confirma pelo telefone: está vivo, fora da estação e aguardando os outros em segurança.';
  }
 }
 if(id==='k8_after'){
  const lost=ids.filter(x=>f['c8_morto_'+x]);const survivors=inArea.filter(x=>!lost.includes(x));
  text+='\n\n'+(survivors.length?'Entre os acompanhantes que chegaram à estação, estão vivos '+names(survivors)+'.':'Nenhum acompanhante precisou ser retirado da estação além de você e Bella.');
  if(lost.length)text+='\n\nOs socorristas confirmaram a morte de '+names(lost)+'. Não se trata de um telefone sem resposta: há uma confirmação que o grupo terá de enfrentar.';
  text+='\n\nA última localização conhecida de cada amigo foi anotada antes de vocês saírem da estrada. Ninguém reaparece misteriosamente na cena do resgate.';
 }
 if(id==='k8_after_02'){
  const lost=ids.filter(x=>f['c8_morto_'+x]);if(lost.length)text+='\n\nA notícia de '+names(lost)+' foi confirmada. Um profissional pede que os amigos se reúnam numa sala reservada. Quem não esteve na estação recebe uma chamada com os nomes, sem conjecturas.';
  if(f.c8_bella_condicao==='hospital')text+='\n\nBella está internada sob observação, com ferimentos que não permitem que caminhe sem auxílio. Ela conversa por chamada ou durante uma visita autorizada, sem sair para outra investigação.';
  else if(f.c8_bella_condicao==='grave')text+='\n\nBella recebeu atendimento para a lesão na perna. Ela consegue falar, mas evita apoiar peso e sabe que os próximos dias serão de recuperação.';
  else text+='\n\nBella recebeu cuidados para escoriações e foi orientada a descansar. Ainda está abalada, mas pode conversar sem precisar de internação.';
 }
 if(id==='k8_after_02'){
   const lost=ids.filter(x=>f['c8_morto_'+x]);
   if(lost.length)choices=choices.map(c=>({...c,to:c.to==='k8_depoimento_estacao'?'k8_luto_08':c.to}));
 }
 if(id==='k8_luto_08')text+=memorialText(s);
 if(id==='k8_evidence'){
  if(f.c8_prova==='completa')text+='\n\nO envelope original foi preservado em condições que permitem conferir páginas e códigos. Nenhuma anotação exige inventar destinatários.';
  else if(f.c8_prova==='parcial')text+='\n\nO original se perdeu, mas fotografias ou notas permitem recuperar algumas datas. Os detalhes ausentes continuam ausentes.';
  else text+='\n\nNão há envelope original nem fotografia completa. Bella abre os registros que consultou na biblioteca. Só esses dados independentes podem sustentar a nova hipótese.';
  if(s.clues.includes('c8_registro_farmacia'))text+='\n\nO recibo da farmácia aparece novamente. Ele mostra estabelecimento, valor e dia, mas não lista o que Moisés comprou; não permite identificar itens, pessoas ou motivos da compra.';
  if(f.c8_bella_condicao==='hospital'){location='HOSPITAL · QUARTO DE OBSERVAÇÃO';text=text.replace('Bella compartilha com você as informações que foram realmente preservadas.','Bella está no quarto de observação. Você mostra as informações recuperadas pela tela do telefone, e ela orienta quais registros da biblioteca podem ser conferidos.').replace('Ela olha para a parede e respira devagar.','Bella observa a parede clara do quarto e respira devagar.');}else if(f.c8_bella_condicao==='grave')text=text.replace('Bella compartilha com você as informações que foram realmente preservadas.','Bella se acomoda com a perna imobilizada antes de dividir com você os documentos recuperados.');else text=text.replace('Bella compartilha com você as informações que foram realmente preservadas.','Bella se senta à mesa e abre os registros preservados, ainda com pequenos curativos nas mãos.');
 }
 if(id==='k8_last_01'){
  if(f.c8_bella_condicao==='hospital'){location='HOSPITAL · CHAMADA COM BELLA';text=text.replace('As datas estão dispostas por ordem, sem tentar preencher intervalos que os arquivos não explicam.','No telefone, Bella acompanha a comparação das datas do quarto de observação. Ela não pode sair da cama, mas reconhece os arquivos que consultou mais cedo.').replace('Bella: — E existe papel demais passando por aquela estação pra eu acreditar que ela tava completamente vazia.','Bella: — Mesmo daqui eu tô olhando pra essas datas e pensando: por que esse lugar aparece tantas vezes nos registros?');}
  else if(f.c8_bella_condicao==='grave')text=text.replace('As datas estão dispostas por ordem, sem tentar preencher intervalos que os arquivos não explicam.','Bella permanece com a perna imobilizada enquanto vocês alinham as datas. Ela pede para deixar o papel mais perto, sem precisar levantar.');
  else text=text.replace('As datas estão dispostas por ordem, sem tentar preencher intervalos que os arquivos não explicam.','Bella chega com passos cautelosos e pequenos curativos nas mãos. Ela se senta ao seu lado para conferir as datas preservadas.');
 }
 if(id==='k8_last_02'){
  if(f.c8_bella_condicao==='hospital'){location='HOSPITAL · QUARTO DE BELLA';text=text.replace('Bella volta os olhos para você. Do outro lado da janela, o corredor está quase vazio.','Bella vira a cabeça na direção da sua voz. Você está sentado ao lado de sua cama no quarto de observação. O monitor faz um ruído baixo, e ela não consegue mover a perna enfaixada sem sentir dor.').replace('Bella volta a olhar para a janela.','Bella segura a beirada do cobertor e olha para a janela do quarto.');}
  else if(f.c8_bella_condicao==='grave')text=text.replace('Bella volta os olhos para você. Do outro lado da janela, o corredor está quase vazio.','Bella se acomoda na cadeira com a perna imobilizada antes de voltar os olhos para você. O corredor está quase vazio.');
  else text=text.replace('Bella volta os olhos para você. Do outro lado da janela, o corredor está quase vazio.','Bella atravessa o corredor com pequenos curativos nas mãos, para ao seu lado e volta os olhos para você.');
  const lost=ids.filter(x=>f['c8_morto_'+x]);if(lost.length)text+='\n\nA lembrança de '+names(lost)+' torna a palavra «verdade» mais difícil de pronunciar. A busca custou vidas e ainda não terminou.';
 }
 return {...n,text,choices,location};
}
function timer(s,id,choices){if(!s||!id.startsWith('k8_')||s.social107?.timedOff)return null;if(/^k8_bella_0[123]$/.test(id))return {secs:18,fallback:choices.length-1};if(/^k8_(?:pov_follow_|r2_follow_)/.test(id))return {secs:15,fallback:choices.length-1};return null;}
function phoneThreads(s,base){if(!s||!s.flags?.c8_enter_k8_01)return base;const threads=base.map(t=>({...t,messages:[...(t.messages||[])]}));
 const get=(id,name)=>{let t=threads.find(x=>x.id===id);if(!t){t={id,name,sub:'Mensagens de Lakewood',messages:[],replyKey:''};threads.push(t)}return t;};
 const love=s.romanceEscolhido;
 if(L[love]&&ROMANCE_LINES[love]&&!dead(s,love)&&s.flags.c8_enter_k8_07){const t=get(love,L[love]);t.messages.push({who:L[love],time:'CAPÍTULO 8 · TARDE',text:ROMANCE_LINES[love].replace(/^\w+: — /,'')});if(s.flags.c8_respondeu_romance){t.messages.push({who:'Você',time:'CAPÍTULO 8 · TARDE',text:s.flags.c8_tom_romance==='medo'?'Tô com medo, mas queria conversar com você e não ficar sozinho nessa.':'Eu gostei muito de estar com você naquele jantar. Queria outra noite assim.'});t.messages.push({who:L[love],time:'CAPÍTULO 8 · TARDE',text:'Eu também queria. Me avisa quando chegar em segurança, tá?'});}else if(s.flags.c8_enter_k8_07_decidir&&s.flags.c8_vacuo_romance)t.messages.push({who:L[love],time:'CAPÍTULO 8 · MAIS TARDE',text:'Vi que você leu. Podia ter dito que precisava de espaço. Espero que esteja bem.'});}
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
