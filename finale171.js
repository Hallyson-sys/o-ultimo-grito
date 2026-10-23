/* O Último Grito · V1.7.1 — Depoimentos humanos e continuidade das memórias.
   Continuação aditiva: preserva os IDs e os efeitos das escolhas gravadas. */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;
if(!N||!H)return;
const IDS=['isabella','samuel','allan','laisla','rauanny','ryan','breno','rayssa'];
const PEOPLE={isabella:'Isabella',samuel:'Samuel',allan:'Allan',laisla:'Laisla',rauanny:'Rauanny',ryan:'Ryan',breno:'Breno',rayssa:'Rayssa'};
const PEERS={isabella:'rayssa',samuel:'allan',allan:'samuel',laisla:'rauanny',rauanny:'laisla',ryan:'breno',breno:'ryan',rayssa:'isabella'};
const FEMALE=new Set(['isabella','laisla','rauanny','rayssa']);
const name=id=>PEOPLE[id]||id;
const hero=s=>String(s?.hero?.name||'Você').trim().split(' ')[0]||'Você';
const dead=(s,id)=>id==='hero'?!!s?.flags?.c10_heroi_morto:!!window.UG10?.dead?.(s,id)||!!window.UG150?.dead?.(s,id);
const available=(s,id)=>!dead(s,id)&&!s?.flags?.['c10_aparente_'+id];
const rayPresent=s=>available(s,'rayssa')&&s.flags?.c10_rayssa_status!=='jullia'&&s.flags?.c10_rayssa_justica==='segredo'&&!!s.flags?.c10_rayssa_perdoada;
const reunion=s=>{const result=[];if(!dead(s,'hero'))result.push('hero');for(const id of ['isabella','samuel','rayssa','ryan','breno','allan','laisla','rauanny'])if(id==='rayssa'?rayPresent(s):available(s,id))result.push(id);return result;};
const nextReunion=(s,id)=>{const roster=reunion(s),index=roster.indexOf(id);if(index<0||index>=roster.length-1)return 'k10_52';const n=index+1;return n===8?'k10_56':`k10_${44+n}`;};
const choice=(text,to,effects=[])=>({text,to,effects});
function add(id,location,time){if(N[id])throw Error('1.7.1: ID duplicado '+id);const scene={id,chapter:'CAPÍTULO 10 · O GRAND FINALE',location,time,scene:'house',speaker:'NARRAÇÃO',text:'',choices:[]};N[id]=scene;H.push(scene)}
add('c171_reuniao_hero','QUATRO MESES DEPOIS · CONVERSAS QUE CONTINUAM','16:48');
for(const id of IDS)add('c171_entrevista_'+id,'UNIDADE MÉDICA · DEPOIMENTO DE '+name(id).toUpperCase(),'10:17');
const D={
 isabella:{
  opening:'Isabella puxa a manga sobre os dedos. Antes de responder, pede que Diego afaste a câmera do rosto. Ele aceita, mantendo apenas o áudio.',
  start:'Eu fico tentando lembrar da festa. A Isa daquela noite achava que a pior coisa que podia acontecer era brigar com alguém e passar uma semana sem se falar.',
  diego:'— Quando você descobriu que Rayssa sabia que Jullia estava viva, o que sentiu primeiro?',
  lost:'— Raiva. Porque a Rayssa morreu e não tem mais como eu fazer aquela pergunta olhando pra ela. Também sinto falta dela. Queria que fosse mais simples.',
  near:'— Uma raiva que eu nem sabia que existia. Ela me abraçou, me consolou, ouviu eu falar da Jullia... sabendo de tudo. Eu me senti feita de idiota pela minha melhor amiga.',
  extra:'— Eu passei um ano culpando a gente pelo acidente e tentando manter o grupo unido. Aí descobri que tinha alguém dentro de casa abrindo a porta pro perigo entrar.',
  secondQ:'— Vocês eram próximas. O que acontece com essa amizade agora?',
  remember:'— Eu ainda lembro de dividir um fone com ela no ônibus. Não quero que essa memória vire falsa só porque depois aconteceu aquilo.',
  forgiven:'— Eu disse que perdoava, mas não foi um passe de mágica, Diego. Tem dias que ainda dá vontade de gritar com ela. Eu preciso de distância e ela vai ter que respeitar.',
  notForgiven:'— Eu não consegui perdoar. Talvez nunca consiga. E eu tô cansada de gente me dizendo que preciso, como se fosse uma obrigação minha.',
  truth:'— Não vou suavizar. Rayssa mentiu pra gente. Mas eu também não vou fingir que ela foi uma desconhecida. Eu amava aquela menina como irmã. Isso é o que mais machuca.',
  pause:'— Eu... não. Desculpa. Eu passei um ano querendo que ela me dissesse a verdade. Agora que eu posso contar a minha, eu não consigo parar de chorar.',
  diegoTruth:'— Tá. Vou separar o que você viu do que ouviu falar. E, Isabella... ninguém aqui pode exigir que você perdoe alguém.',
  diegoPause:'— Ei, tudo bem. Não precisa terminar isso hoje. Quer que eu chame a enfermeira ou prefere ficar aqui um minuto?',
  leaving:'Isabella leva o copo de água consigo. Antes de sair, pergunta se pode receber uma cópia do próprio depoimento. Diego diz que vai orientá-la sobre como solicitar.'
 },
 samuel:{
  opening:'Samuel pede para que deixem a garrafa de água ao alcance. Quando Diego liga o gravador, ele fica olhando para o ponto vermelho durante vários segundos.',
  start:'Eu tava dirigindo naquela noite. Tinha bebido. Fui arrogante, eu achei que dava conta. Depois do atropelamento, eu só pensava em como não ser pego.',
  diego:'— Você está falando do acidente ou das decisões que tomaram depois?',
  lost:'— Dos dois. E também do Allan. Meu melhor amigo morreu e eu lembro da gente brigando na van, de eu não ouvir ninguém. Eu trocaria qualquer coisa por mais cinco minutos com ele.',
  near:'— Dos dois. O Allan tentou me fazer pensar direito mais de uma vez. Eu respondia atravessado. Ele continuou do meu lado mesmo assim.',
  extra:'— Eu não posso ficar repetindo que foi uma noite ruim como se isso me tornasse outra pessoa. Eu fiz escolhas. Outras pessoas pagaram por elas.',
  secondQ:'— Se pudesse falar com os outros antes daquela noite, o que diria?',
  remember:'— Que eu devia ter escutado. A gente já tinha sobrevivido a coisa idiota quando era criança, bicicleta sem freio, essas merdas. Só que naquela estrada não era brincadeira.',
  truth:'— Eu tinha medo de confessar. E de perder meus amigos. Só consegui perder muito mais coisa tentando esconder. Pode escrever isso do jeito que eu tô falando.',
  pause:'— Pera. A parte do volante... a mão dele, a luz... Eu preciso parar de olhar pra isso na minha cabeça um segundo.',
  diegoTruth:'— Estou anotando. E vou precisar confrontar os horários e as decisões de cada um. A responsabilidade não desaparece porque você se arrependeu.',
  diegoPause:'— Samuel, olha pra mim. A gente pode interromper. Eu vou chamar alguém da equipe médica. Você não precisa desmaiar aqui pra provar que tá mal.',
  leaving:'Samuel levanta, hesita e volta para perguntar se as famílias dos mortos já foram avisadas. Diego responde apenas o que está confirmado, sem tentar confortá-lo com uma mentira.'
 },
 allan:{
  opening:'Allan entra dizendo que a sala parece cenário de série policial. A piada não dura: ele senta e passa a esfregar o polegar contra a palma da mão.',
  start:'Eu sempre fui o cara que fazia piada quando tava todo mundo entrando em pânico. Dessa vez eu não consegui. Nem tinha graça.',
  diego:'— O que você acha que teria feito diferente naquela noite?',
  lost:'— Eu teria puxado o Samuel de volta. Teria arrancado aquela chave da mão dele. Eu sei que pensar assim agora não traz meu melhor amigo de volta, mas a cabeça não para.',
  near:'— Eu teria dito pro Samuel parar de achar que precisava mandar em tudo. Ele vai querer me xingar por dizer isso, mas alguém precisava ter falado mais cedo.',
  extra:'— A gente ficou com medo da polícia porque sabia o que tinha feito na estrada. E, enquanto se protegia daquela verdade, deixou o resto da nossa vida desmoronar.',
  secondQ:'— Você falou que tenta fazer todo mundo rir. O que acontece quando não consegue?',
  remember:'— Eu tenho vontade de pegar o celular e mandar uma bobagem pro grupo. Às vezes mando. Não vou deixar que a única coisa que a gente compartilhe seja a foto de um caixão.',
  truth:'— Eu errei também. Não foi só quem tava dirigindo. Eu concordei em ficar calado. E tive medo demais de ser o primeiro a abrir a boca.',
  pause:'— Desculpa, eu tava bem até agora. É que falar nome por nome... parece que eu tô vendo tudo outra vez.',
  diegoTruth:'— Você não precisa escolher um único culpado para me ajudar. Preciso que diga o que cada pessoa fez, inclusive você. A gente confere depois.',
  diegoPause:'— Eu sei. Vamos parar. Quer água? Posso chamar alguém para ficar aqui com você antes de sair.',
  leaving:'Allan faz menção de contar outra piada, mas desiste. Na porta, respira fundo e agradece por Diego não ter rido quando ele finalmente ficou sério.'
 },
 laisla:{
  opening:'Laisla pergunta se pode sentar de frente para a porta. Diego muda a cadeira de lugar sem discutir e espera que ela se acomode.',
  start:'Eu ouço barulho de janela e meu corpo inteiro reage. Mesmo agora, aqui. Eu penso no apartamento, na escada entre os prédios, na gente tentando atravessar.',
  diego:'— Qual foi o momento em que você achou que não ia conseguir sair?',
  lost:'— Quando achei que tinha perdido a Rauanny. Depois eu perdi de verdade. Eu não consegui proteger a minha melhor amiga e ainda fico procurando ela toda vez que entro em algum lugar.',
  near:'— Quando achei que não ia alcançar a Rauanny. A gente vive brigando, mas eu não consigo imaginar o que teria sido sair dali sem ela.',
  extra:'— Todo mundo fala da coragem de quem atravessou. Eu só lembro de como minha mão tremia tanto que mal conseguia segurar.',
  secondQ:'— Você quer que eu anote alguma coisa sobre o que aconteceu dentro do apartamento?',
  remember:'— Anota que a gente tentou salvar uns aos outros. Não foi bonito, nem organizado. Teve grito, teve erro. Mas ninguém foi só um corpo correndo de uma máscara.',
  truth:'— Eu vi pessoas correndo atrás de nós. Não vou inventar que reconheci um rosto quando não reconheci. O que eu vi, eu conto. O resto eu não sei.',
  pause:'— Não, não consigo. Quando você falou da janela eu ouvi aquele vidro quebrando de novo. Preciso de um minuto.',
  diegoTruth:'— Isso ajuda, Laisla. É melhor um detalhe honesto do que um nome colocado na pessoa errada. Vou conferir as marcas e os horários.',
  diegoPause:'— Tá bom. Olha pra porta, ela tá aberta como você pediu. Você tá aqui, em segurança. Posso desligar agora.',
  leaving:'Laisla se levanta devagar. Antes de ir, pergunta se podem evitar fotografá-la na saída do hospital. Diego chama uma agente para ajudá-la a sair por outro corredor.'
 },
 rauanny:{
  opening:'Rauanny entra com o casaco da enfermaria sobre os ombros. Ela parece determinada a responder, até a voz falhar na primeira pergunta.',
  start:'Falaram que eu fui corajosa. Eu tava apavorada. Tive vontade de largar tudo e correr. Tô cansada de fingir que não tive.',
  diego:'— Você se lembra de alguma escolha que precisou fazer durante a fuga?',
  lost:'— Lembro de procurar a Laisla e não achar. A gente tinha combinado fazer uma viagem idiota um dia desses. E agora tudo que sobrou foi um chaveiro comprado na rodoviária.',
  near:'— Lembro da Laisla me chamando. A gente tinha brigado por uma besteira antes. Naquele momento eu só queria ouvir a voz dela de novo.',
  extra:'— Eu tive que decidir se ficava ou se corria. E descobri que não existe escolha sem medo quando seus amigos podem morrer na sua frente.',
  secondQ:'— Você quer acrescentar algo sobre a forma como os amigos tentaram ajudar?',
  remember:'— Sim. Não escreva que fui eu sozinha. Teve gente que me puxou de volta, que ficou comigo mesmo ferida. Isso também aconteceu.',
  truth:'— Eu pensei primeiro em sobreviver. Em alguns segundos pensei só em mim. Foi feio, mas foi real. E mesmo assim tentei voltar pelos outros.',
  pause:'— Eu queria conseguir contar tudo sem tremer. Eu juro. Mas agora me deu uma vontade absurda de sair correndo daqui.',
  diegoTruth:'— Você não precisa fazer papel de heroína aqui. O que você sentiu também pode ajudar a entender a sequência dos acontecimentos.',
  diegoPause:'— A gente para. Você já contou bastante. Vai encontrar alguém de confiança lá fora, tá?',
  leaving:'Rauanny não pede desculpa por chorar. Sai com o casaco apertado contra o peito e para para perguntar onde estão seus amigos.'
 },
 ryan:{
  opening:'Ryan observa o copo de água e diz que a polícia podia pelo menos oferecer café decente. Diego espera a brincadeira passar antes de fazer a pergunta.',
  start:'Teve hora que eu achei que ia ficar ali pra sempre. Não sei explicar direito a sensação de ouvir passos e não conseguir decidir se devia gritar.',
  diego:'— Você reconheceu alguma das vozes ou viu alguém claramente?',
  lost:'— Não quero inventar uma voz porque o Breno morreu. Só queria ter falado pra ele que era bom ter alguém que me escutava quando eu parava de fazer piada.',
  near:'— O Breno tava perto em alguns dos piores momentos. Ele não precisava falar nada. Parecia que entendia. Eu nunca fui bom em agradecer.',
  extra:'— Eu consigo lembrar do som. Do que me fizeram sentir. Mas não vou jurar que vi alguém quando não vi. Não quero que prendam uma pessoa errada porque eu tive medo.',
  secondQ:'— E o que aconteceu depois que você encontrou os outros?',
  remember:'— Eu continuei contando piada. É ridículo. Se eu parasse, talvez começasse a chorar. Acho que ainda não sabia o que fazer com aquilo.',
  truth:'— Eu tenho vergonha de ter ficado com medo. Pronto, falei. Mas não vou esconder nada do que lembro só porque parece coisa de covarde.',
  pause:'— Preciso respirar. Eu ouvi um barulho no corredor e meu corpo já achou que era alguém entrando atrás de mim.',
  diegoTruth:'— Medo não torna você covarde, Ryan. E dizer que não tem certeza de um rosto pode evitar um erro grave. Vamos registrar exatamente isso.',
  diegoPause:'— Vou fechar a porta mais devagar. Você escolhe se quer continuar outro dia. Não precisa demonstrar coragem pra mim.',
  leaving:'Ryan passa a mão no cabelo e pergunta, com um sorriso cansado, se agora pode finalmente tomar o tal café. Diego responde que vai tentar encontrar um.'
 },
 breno:{
  opening:'Breno prefere a cadeira mais afastada da câmera. Diego pergunta se o gravador incomoda. Breno pede apenas que ele não o interrompa no meio da frase.',
  start:'Eu não falava porque parecia que qualquer coisa que eu dissesse ia virar suspeita. Ficar quieto também virou suspeita. Eu não sabia o que fazer.',
  diego:'— Você sentiu que alguém do grupo deixou de confiar em você?',
  lost:'— Senti. E o Ryan morreu antes que eu pudesse resolver umas coisas com ele. Todo mundo acha que quando alguém morre você lembra dos grandes momentos. Eu lembro de um guarda-chuva.',
  near:'— Senti, mas teve gente que voltou pra me ouvir. O Ryan fez isso de um jeito atrapalhado. Eu não vou fingir que não significou nada.',
  extra:'— Quando apontaram pra mim na homenagem, parecia que eu tinha que provar o tempo todo que não era o monstro. Eu tava tentando sobreviver também.',
  secondQ:'— Você quer que eu registre alguma coisa sobre as acusações?',
  remember:'— Quero que conste que eu pedi pra escutarem minha versão. E que não quero passar outra noite tendo que justificar cada silêncio meu.',
  truth:'— Eu fiquei com raiva dos meus amigos, sim. Em certos momentos pensei em ir embora e não olhar pra trás. Mas não ajudei a pessoa da máscara.',
  pause:'— Eu tava conseguindo falar. Só que quando você disse acusação eu comecei a ouvir tudo de novo. Não vai dar agora.',
  diegoTruth:'— Eu ouvi sua versão, Breno. Vou conferir com as provas. Você não precisa adivinhar o que vai me convencer.',
  diegoPause:'— Tá bom. Você pediu pra eu não te cortar, e eu respeitei. Agora você tá pedindo pra parar. Vou respeitar também.',
  leaving:'Breno confere se Diego anotou a diferença entre uma suspeita e um fato. Depois sai sem precisar se justificar outra vez.'
 },
 rayssa:{
  opening:'Rayssa entra acompanhada por uma policial. Diego relembra que ela pode solicitar assistência jurídica e interromper a entrevista. Ela pede para falar, com o olhar fixo na mesa.',
  start:'Eu encontrei a Jullia viva. Eu podia ter contado. Escolhi esconder. E depois fui entregando informações achando que ainda tinha algum controle sobre o que ela faria.',
  diego:'— Quando você percebeu que aquela vingança ia terminar em mortes?',
  lost:'— Quando a Isabella morreu, eu entendi que tinha destruído a última pessoa que ainda enxergava uma parte boa em mim. Eu não vou usar isso pra pedir pena.',
  near:'— Quando eu vi a Isabella correndo pra sobreviver. Ela confiava em mim. Eu sabia o que tinha feito e mesmo assim continuei olhando na cara dela e mentindo.',
  extra:'— Eu pensei que podia impedir a Jullia se continuasse perto. Mas em vez de proteger meus amigos, deixei a situação piorar. Não tô dizendo que fui obrigada a tudo.',
  secondQ:'— Isabella soube da sua participação. Vocês conseguiram conversar?',
  remember:'— Ela dividiu a vida comigo. Teve um dia que faltou luz e ficamos contando besteira no escuro. Eu lembro de pensar que nunca ia mentir pra ela. Olha o que eu fiz.',
  forgiven:'— Ela disse que tentaria me perdoar. Eu nem sei se mereço ouvir isso. Não significa que ela vai confiar em mim de novo, e eu não vou cobrar.',
  notForgiven:'— Não. E se ela nunca quiser me ver, eu vou ter que aceitar. Eu não tenho o direito de pedir que ela esqueça o que causei.',
  truth:'— Eu vou contar a minha participação. Não quero esconder atrás do nome da Jullia, nem usar o fato de ela ter sobrevivido como desculpa pra ter ajudado.',
  pause:'— Eu tô ouvindo a voz da Isa quando ela descobriu. Eu sei que ficar mal não me inocenta, mas agora eu preciso parar um minuto.',
  diegoTruth:'— Você tem direito à assistência jurídica, Rayssa. E eu vou precisar confrontar o que disser com as provas. O que você acabou de contar é sério.',
  diegoPause:'— Vou desligar. Você pode retomar com sua defesa presente. Não vou pedir que continue nesse estado.',
  leaving:'A policial acompanha Rayssa para fora da sala. Ela olha para o corredor procurando Isabella, mas não se aproxima nem exige uma conversa.'
 }
};
function voice(s,id){const d=D[id],f=s.flags||{},other=PEERS[id];
 const lost=dead(s,other),fled=f.c10_rayssa_justica==='foragida'||f.c10_rayssa_status==='jullia';
 let friend=lost?d.lost:d.near;
 if(id==='isabella'&&!lost&&fled)friend='— Ela fugiu. Depois de tudo, a Rayssa ainda fugiu. Eu me senti traída outra vez, mesmo tentando não pensar nela.';
 if(id==='isabella'&&!lost&&!fled)friend+=' '+(f.c10_rayssa_perdoada?d.forgiven:d.notForgiven);
 if(id==='rayssa'&&!lost)friend+=' '+(f.c10_rayssa_perdoada?d.forgiven:d.notForgiven);
 if(id==='ryan'&&window.UG9?.hostage?.(s)!=='ryan')friend=lost?d.lost:d.near;
 return {friend,other};
}
function interview(s,id){const d=D[id],v=voice(s,id),f=s.flags||{};
 const records=f.c10_proof_saved||f.c10_evidence||f.v160_diego_registros;
 const proof=records?'Diego abre sobre a mesa uma cópia das mensagens preservadas.':'Diego consulta as anotações feitas durante o resgate, mas deixa a caneta parada enquanto escuta.';
 let intro=d.opening;
 if(id==='rayssa'&&f.c10_rayssa_justica==='depoimento')intro+=' A policial aguarda junto à porta; a situação jurídica dela não desapareceu com o resgate.';
 return `${intro}\n\nDiego: — Não vou pedir que você comece pelo pior momento. Me conta do jeito que conseguir.\n\n${name(id)}: — ${d.start}\n\nDiego: ${d.diego}\n\n${name(id)}: ${v.friend}\n\n${proof}\n\n${name(id)}: ${d.extra}\n\nDiego: — Posso fazer mais uma pergunta sobre isso?`;
}
function more(s,id){const d=D[id];const second=(id==='rayssa'&&dead(s,'isabella'))?'— Isabella morreu. Tem alguma coisa que você queria ter dito a ela antes?':(id==='isabella'&&dead(s,'rayssa'))?'— E depois de perder Rayssa, o que você gostaria que as pessoas entendessem sobre essa amizade?':d.secondQ;return `Diego deixa um instante de silêncio antes de voltar a falar.\n\nDiego: ${second}\n\n${name(id)}: ${d.remember}\n\nDiego: — Certo. Essa parte também importa. Eu queria que você me dissesse, com suas palavras, o que consegue afirmar com certeza. O que ainda não sabe, não precisa inventar.\n\n${name(id)} olha para o gravador. Pela primeira vez, pode escolher como encerrar a própria versão.`;}
function finish(s,id){const d=D[id],f=s.flags||{},answer=f['c170_depo_resposta_'+id]||'verdade';const pause=answer==='pausa';
 const lines=pause?`${name(id)}: ${d.pause}\n\nDiego: ${d.diegoPause}`:`${name(id)}: ${d.truth}\n\nDiego: ${d.diegoTruth}`;
 const end=`\n\n${d.leaving}\n\nDiego encerra a gravação e confere se ${name(id)} precisa de alguém da equipe médica antes de sair.`;
 return `${lines}${end}`;
}
function heroFinish(s){const f=s.flags||{},tone=f.c170_hero_tom||'verdade';const losses=IDS.filter(x=>dead(s,x));const who=hero(s);const friendship=losses.length?`Você olha para os nomes escritos na folha e para no de ${name(losses[0])}.`:'Você pensa no grupo que conseguiu sair vivo e na culpa que ainda carrega.';
 if(tone==='pausa')return `Diego põe o gravador mais longe quando percebe que você parou de respirar direito.\n\n${who}: — Eu... eu tô tentando, Diego. Só que você fala da estrada e eu vejo a Jullia caindo de novo. E aí lembro da máscara. Parece tudo a mesma noite.\n\nDiego: — Ei, olha pra mim um instante. Quer que eu chame alguém?\n\n${who}: — Não precisa. Só não consigo falar disso agora.\n\nDiego: — Então a gente para. Eu posso continuar outro dia, com você assistido por quem escolher. Não tem prêmio por aguentar até desmaiar.\n\n${friendship}\n\n${who}: — Você acha que alguém vai acreditar quando eu conseguir contar?\n\nDiego: — Eu vou ouvir. E vou conferir. Você merece que eu faça as duas coisas.\n\nO gravador se apaga. Diego espera até você conseguir se levantar sem tremer tanto.`;
 if(tone==='luto')return `${friendship}\n\n${who}: — Eu lembro de cada um que não voltou. Às vezes fico com medo de esquecer a voz deles.\n\nDiego: — Qual foi a última coisa boa de que você se lembra? Não do ataque. Deles.\n\n${who}: — Uma besteira na festa, uma piada, alguém me chamando pra sentar. Coisa que eu achei que ia acontecer mil vezes.\n\nDiego: — E o que aconteceu na estrada, antes disso tudo?\n\n${who}: — A gente escondeu. Eu também fiquei calado. Não posso usar a morte dos meus amigos pra fingir que não participei daquele silêncio.\n\nDiego: — Eu agradeço por dizer isso. Não vou pedir que carregue sozinho a culpa de todo mundo. Mas vou precisar registrar a sua parte.\n\n${who}: — Tá. Só... não deixa que a única coisa escrita sobre eles seja como morreram.\n\nDiego: — Vou registrar os fatos. A história de quem eles eram vocês vão continuar contando.\n\nVocê vê Diego desligar o gravador. A dor não diminui, mas desta vez houve espaço para falar dos amigos como pessoas.`;
 const resisted=!!(f.resistiu_pacto||f.prometeu_verdade);
 return `${who}: — Eu preciso começar do que aconteceu depois do atropelamento. ${resisted?'Eu falei que era errado esconder o corpo. Tentei impedir, mas depois também fiquei calado.':'Eu fiquei calado quando o grupo decidiu esconder o que aconteceu. Eu sabia que não era certo e não fiz nada.'}\n\nDiego se inclina um pouco, sem tocar no gravador.\n\nDiego: — Você está dizendo que sabia e não procurou ajuda depois?\n\n${who}: — Tô. Eu achei que, se ninguém falasse, aquilo ia parar de existir. Só que eu passei um ano inteiro pensando nisso.\n\nDiego: — Por que não me procurou quando começaram as ameaças?\n\n${who}: — Porque eu tinha medo de você descobrir a estrada. E depois fiquei com medo de não dar tempo de salvar ninguém. Eu sei que uma coisa não desculpa a outra.\n\nDiego: — Não desculpa. Mas eu prefiro que você me diga isso olhando na minha cara a descobrir mais uma mentira depois.\n\n${friendship}\n\n${who}: — O senhor acha que dá pra acreditar em mim agora?\n\nDiego: — Não é questão de eu gostar de você ou não. Eu vou conferir seu relato, os horários, o que os outros disseram. É assim que funciona. Mas eu tô te escutando, ${who}.\n\nDiego desliga o gravador, empurra o copo d'água em sua direção e espera você recuperar o fôlego. A conversa terminou; a investigação, não.`;
}
function reunionHero(s){const f=s.flags||{},tone=f.c10_reuniao_heroi||'terapia',roster=reunion(s),friend=roster.find(x=>x!=='hero'),lost=IDS.filter(x=>dead(s,x));
 const you=hero(s);let text='';
 if(!friend){const solo={terapia:`${you}: — Teve dia que eu sentei na frente de uma terapeuta e fiquei vinte minutos sem dizer uma palavra. Voltei na semana seguinte. E, aos poucos, falar deixou de parecer impossível.`,insonia:`${you}: — Às vezes eu acordo de madrugada achando que alguém voltou pra me buscar. Escrevo a hora no caderno, acendo a luz e espero o coração desacelerar. Não quero passar a vida toda com medo de dormir.`,grupo:`${you}: — Eu perdi todos eles. Pensei em desistir de tentar viver normalmente. Mas não quero que aquela noite decida todos os dias que ainda me restam.`};return `${solo[tone]||solo.terapia}\n\nVocê deixa o caderno perto das fotografias. Não há ninguém para responder, mas suas palavras finalmente encontraram um lugar.`;}
 const gender=FEMALE.has(friend)?'cansada':'cansado';
 if(tone==='terapia')text=`${you}: — No começo eu achei que terapia era só ficar falando da mesma coisa toda semana. Às vezes eu saía de lá pior do que entrei.\n\n${friend?name(friend)+': — E por que continuou indo?':''}\n\n${you}: — Porque teve um dia em que consegui lembrar da Jullia e não foi a máscara a primeira coisa que veio na cabeça. Lembrei de uma conversa idiota na festa. Eu chorei depois, mas consegui respirar.\n\n${friend?name(friend)+': — Caramba. Acho que eu precisava ouvir isso. Eu também tô ${gender} de fingir que tô bem só porque faz quatro meses.':''}\n\n${you}: — Não tá tudo bem. Só não quero passar o resto da vida fingindo que pedir ajuda é fraqueza.`;
 else if(tone==='insonia')text=`${you}: — Tem noite que eu acordo com certeza de que alguém tá andando no corredor. Uma vez fiquei dez minutos olhando pra porta sem conseguir levantar.\n\n${friend?name(friend)+': — Você podia ter me ligado. Mesmo às três da manhã.':''}\n\n${you}: — Eu não queria assustar mais ninguém. Todo mundo já passou por coisa demais.\n\n${friend?name(friend)+': — Ei, ouvir que você tá mal não vai me destruir. Fica mais difícil quando você some e a gente não sabe o que aconteceu.':''}\n\n${you}: — Tá. Da próxima vez eu mando mensagem. Nem que seja só pra dizer que não consegui dormir.`;
 else text=`${you}: — Eu pensei em sumir depois daquela noite. Desligar o celular, parar de responder, nunca mais passar perto de Lakewood.\n\n${friend?name(friend)+': — E o que fez você ficar?':''}\n\n${you}: — Vocês. As mensagens sem assunto, as fotos antigas, até alguém reclamando da faculdade. Eu precisava lembrar que nossa amizade era maior do que o que aconteceu naquela estrada.\n\n${friend?name(friend)+': — Então fica perto. A gente não precisa conversar sobre isso toda vez. Pode só aparecer pra comer alguma porcaria e reclamar da vida.':''}\n\n${you}: — Isso. Eu ainda quero viver coisas que não comecem com uma sirene.`;
 if(lost.length)text+=`\n\nQuando alguém menciona ${name(lost[0])}, você deixa o silêncio existir. Não precisa fingir que a saudade passou para conseguir continuar a conversa.`;
 return text;
}
const MEMORY_END={
 samuel:['Eu nem sabia que aquela bicicleta ainda tava na sua garagem.','Tá, mas agora eu quero consertar ela de verdade. Sem o Allan, vai doer. Só que eu acho que ele ia me chamar de burro se eu desistisse.'],
 allan:['Você ainda lembra daquela noite fazendo bolo com o Samuel?','Lembro até do cheiro de queimado. Quero fazer outro um dia. Talvez fique menos horrível.'],
 isabella:['Você consegue ouvir aquelas músicas sem lembrar de tudo o que aconteceu?','Ainda não todas. Às vezes eu pulo a faixa, às vezes deixo tocar. Tô tentando não me cobrar por isso.'],
 rayssa:['Você acha que ainda dá pra reconstruir alguma coisa depois de tudo?','Não sei. E não quero cobrar isso da Isa. Primeiro eu preciso parar de mentir até pra mim mesma.'],
 laisla:['Você ainda guarda a foto daquele bolo da Rauanny?','Guardo. Tá toda borrada. Foi um dia comum, e eu nunca imaginei que um dia ia precisar tanto lembrar dele.'],
 rauanny:['E aquela viagem que não aconteceu?','Eu guardei o chaveiro. Talvez um dia consiga fazer a viagem de verdade. Se a Laisla estiver comigo, vai reclamar o caminho inteiro.'],
 ryan:['Você voltou a ver filme ruim depois daquela noite?','Voltei. Chorei numa cena ridícula, acredita? No dia seguinte eu ri disso. Achei que não fosse conseguir mais.'],
 breno:['Aquele guarda-chuva ainda tá com você?','Tá. Não faz sentido guardar um negócio quebrado, mas eu gosto de ter uma lembrança que não tenha sangue envolvido.']
};
function resolve(id,s,n){if(!n||!s)return n;
 // A lembrança do epílogo é um desvio de uma pessoa; nunca deve retornar ao seu início.
 if(id.startsWith('c152_future_')){
  const person=id.slice('c152_future_'.length);
  if(!IDS.includes(person))return n;
  const prev=s.flags?.['c152_reunion_return_'+person];
  let destination=nextReunion(s,person);
  // O nó do diálogo original guarda o avanço dinâmico; ele prevalece quando disponível.
  if(prev&&N[prev]){
    const original=window.UG10?.resolve?.(prev,s,N[prev]);
    const next=original?.choices?.find(c=>/^k10_(4[4-9]|5[0-2]|56)$/.test(c.to)&&c.to!==prev)?.to;
    if(next)destination=next;
  }
  if(!N[destination]||destination===prev)destination='k10_52';
  let text=n.text;
  if(!dead(s,'hero')&&MEMORY_END[person]){
    const [question,answer]=MEMORY_END[person];
    const common=`${name(person)}: — Eu sei que não dá pra voltar atrás. Mas eu gosto de ter uma história que não começa com alguém gritando.`;
    text=text.replace(common,`${hero(s)}: — ${question}\n\n${name(person)}: — ${answer}`);
  }
  return {...n,text,choices:[choice('Seguir para a próxima conversa',destination,[['flag','c152_futuro_'+person,true],['bond',person,3]])]};
 }
 if(id==='c170_hero_resposta')return {...n,text:heroFinish(s),choices:[choice('Ouvir os depoimentos dos amigos que sobreviveram',window.UG170?.nextOf?.(s,'hero')||'c170_diego_final')]};
 if(id.startsWith('c170_depo_')){
  const person=id.substring(10);if(!IDS.includes(person))return n;
  if(!available(s,person)||(person==='rayssa'&&(s.flags?.c10_rayssa_justica==='foragida'||s.flags?.c10_rayssa_status==='jullia')))return n;
  return {...n,text:interview(s,person),choices:[choice('Ouvir a pergunta seguinte de Diego','c171_entrevista_'+person)]};
 }
 if(id.startsWith('c171_entrevista_')){
  const person=id.substring('c171_entrevista_'.length);
  if(!IDS.includes(person))return n;
  if(!available(s,person))return {...n,text:'O depoimento não ocorreu.',choices:[choice('Seguir','c170_diego_final')]};
  return {...n,text:more(s,person),choices:[choice('Responder sem esconder a parte difícil','c170_fim_'+person,[['set','c170_depo_resposta_'+person,'verdade']]),choice('Dizer que precisa interromper a entrevista','c170_fim_'+person,[['set','c170_depo_resposta_'+person,'pausa']])]};
 }
 if(id.startsWith('c170_fim_')){
  const person=id.substring('c170_fim_'.length);if(!IDS.includes(person))return n;
  if(!available(s,person)||(person==='rayssa'&&(s.flags?.c10_rayssa_justica==='foragida'||s.flags?.c10_rayssa_status==='jullia')))return n;
  return {...n,text:finish(s,person),choices:[choice('Acompanhar o próximo depoimento',window.UG170?.nextOf?.(s,person)||'c170_diego_final')]};
 }
 if(/^k10_(44|45|46|47|48|49|50|51|56)$/.test(id)&&!dead(s,'hero')){
  const roster=reunion(s),index=id==='k10_56'?8:Number(id.substring(4))-44;
  if(roster[index]==='hero'){
   const old=(n.choices||[]),modified=old.map(c=>{
    if(!['terapia','insonia','grupo'].some(tag=>(c.effects||[]).some(e=>e[1]==='c10_reuniao_heroi'&&e[2]===tag)))return c;
    return {...c,to:'c171_reuniao_hero',effects:[...(c.effects||[]),['set','c171_reuniao_hero_next',c.to]]};
   });
   const quiet=s.hero?.pronouns==='ela'?'quieta':s.hero?.pronouns==='elu'?'quietu':'quieto';
   const natural=n.text.replace('Você ouviu todo mundo falar. E você, como tá de verdade? Sem precisar fingir que tá tudo ótimo.',`Desde que chegou você tá tão ${quiet}... Como você tá de verdade? Não precisa responder “tô bem” só pra mudar de assunto.`);
   return {...n,text:natural,choices:modified};
  }
 }
 if(id==='c171_reuniao_hero'){
  const requested=s.flags?.c171_reuniao_hero_next;
  const dest=requested&&N[requested]&&requested!=='c171_reuniao_hero'?requested:nextReunion(s,'hero');
  return {...n,text:reunionHero(s),choices:[choice(dest==='k10_52'?'Continuar para o brinde':'Ouvir a próxima pessoa',dest)]};
 }
 return n;
}
window.UG171=Object.freeze({resolve,interview,nextReunion,heroFinish});
})();
