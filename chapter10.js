/* O ÚLTIMO GRITO · CAPÍTULO 10: O GRAND FINALE · V1.4.4
 * Histórias ramificadas preservam saves; escolhas e estados ficam em flags c10_*.
 * Não substituir dados antigos nem eliminar mortes confirmadas dos capítulos anteriores.
 */
(()=>{'use strict';
const CH='CAPÍTULO 10 · O GRAND FINALE';
const NODES=window.NODES,H=window.HISTORIA;
const LABEL={allan:'Allan',samuel:'Samuel',isabella:'Isabella',rayssa:'Rayssa',rauanny:'Rauanny',laisla:'Laisla',ryan:'Ryan',breno:'Breno',bella:'Bella'};
const FEMALE=new Set(['isabella','rayssa','rauanny','laisla','bella','jullia']);
const IDS=['allan','samuel','isabella','rayssa','rauanny','laisla','ryan','breno'];
const name=x=>LABEL[x]||x||'ninguém';
const pron=x=>FEMALE.has(x)?'ela':'ele';
const pronCap=x=>FEMALE.has(x)?'Ela':'Ele';
const speaker=(s,id)=>id==='hero'?heroName(s):name(id);
const rayssaAtReunion=s=>!dead(s,'rayssa')&&!s?.flags?.c10_aparente_rayssa&&s?.flags?.c10_rayssa_status!=='jullia'&&s?.flags?.c10_rayssa_justica==='segredo'&&!!s?.flags?.c10_rayssa_perdoada;
const reunionRoster=s=>{const roster=[];if(!s?.flags?.c10_heroi_morto)roster.push('hero');const order=['isabella','samuel','rayssa','ryan','breno','allan','laisla','rauanny'];for(const id of order){if(id==='rayssa'&&!rayssaAtReunion(s))continue;if(id!=='rayssa'&&(dead(s,id)||s?.flags?.['c10_aparente_'+id]))continue;if(id==='rayssa'&&dead(s,id))continue;roster.push(id);}return roster;};
const reunionPartner=(s,roster,idx)=>roster.slice(idx+1).find(x=>x!==roster[idx])||roster.find(x=>x!==roster[idx])||null;
const dead=(s,id)=>!!s?.flags?.['c10_morto_'+id]||!!window.UG9?.dead?.(s,id);
const living=s=>IDS.filter(id=>!dead(s,id));
const wounded=(s,id)=>!!s?.flags?.['c10_ferido_'+id]||!!s?.flags?.['c9_ferido_'+id]||!!s?.flags?.['c8_grave_'+id]||!!s?.flags?.['c7_ferido_'+id]||!!s?.flags?.['c6_ferida_'+id];
const hostage=s=>s?.flags?.c9_refem||window.UG9?.hostage?.(s)||'ryan';
const romance=s=>['ryan','breno','rayssa','rauanny'].includes(s.romanceEscolhido)?s.romanceEscolhido:null;
const item=(s,k)=>Array.isArray(s.social107?.inventory)&&s.social107.inventory.includes(k);
const hasProof=s=>!!s.flags?.c10_evidence||!!s.flags?.c10_proof_saved||['print','foto','anotacao'].some(x=>item(s,x))||(s.clues||[]).some(x=>/c9_foto_casa|c8_|grava|registro|cameras|mensagem|conversa_grupo/.test(x));
const flag=(k,v=true)=>['flag','c10_'+k,v],set=(k,v)=>['set','c10_'+k,v],bond=(id,v)=>['bond',id,v],friend=(a,b,v)=>['friendBond',[a,b],v];
const opt=(text,to,effects=[],requires=null)=>({text,to,effects,requires});
const go=(to,label='Continuar',effects=[])=>opt(label,to,effects);
function node(id,location,time,scene,text,choices=[]){if(NODES[id])throw Error('Cap 10: ID duplicado '+id);const n={id,chapter:CH,location,time,scene,text,choices};NODES[id]=n;H.push(n);}
const replace=(text,s)=>String(text).replaceAll('{refem}',name(hostage(s))).replaceAll('{amor}',name(romance(s))).replaceAll('{heroi}',s.hero?.name?.split(' ')[0]||'Você');
const heroName=s=>s.hero?.name?.split(' ')[0]||'Você';
const support=s=>['isabella','allan','laisla','rauanny','breno','ryan','samuel'].find(id=>!dead(s,id)&&id!==hostage(s))||null;
const arrive=s=>living(s).filter(id=>id!==hostage(s)&&id!=='rayssa'&&!s.flags?.['c10_aparente_'+id]);
function assign(s){const f=s.flags; if(f.c10_setup)return;f.c10_setup=true;const pool=arrive(s);
 const trail=pool.filter(x=>x!=='isabella').slice(0,2);if(trail.length<1)trail.push(...pool.filter(x=>!trail.includes(x)).slice(0,2-trail.length));
 f.c10_trilha=trail;f.c10_galpao=pool.filter(x=>!trail.includes(x)).slice(0,2);f.c10_porta_resgate=pool.filter(x=>!trail.includes(x));f.c10_rayssa_status=dead(s,'rayssa')?'morta':hostage(s)==='rayssa'?'refem':'indecisa';
 }
function whenEnter(s,id){if(!id.startsWith('k10_'))return false;let f=s.flags; const stamp='c10_enter_'+id;if(f[stamp])return false;f[stamp]=true;
 if(id==='k10_01')assign(s);
 if(id==='k10_18'){let d=(f.c10_trilha_risco1==='alto'?1:0)+(f.c10_trilha_risco2==='alto'?1:0);f.c10_trilha_perigo=d;}
 if(id==='k10_18'){
   const id0=(f.c10_trilha||[])[0];const danger=Number(f.c10_trilha_perigo||0)+(f.c10_trilha_ultimo==='alto'?1:0);
   if(id0&&danger>=3){f['c10_aparente_'+id0]=true;f.c10_aparente_nome=id0;f.c10_aparente_sobrevive=!!f.c10_trilha_apoio||!wounded(s,id0);}
   else if(id0&&danger>=2){f['c10_ferido_'+id0]=true;}
 }
 if(id==='k10_22'){
   const id0=(f.c10_galpao||[])[0]; const d=Number(f.c10_galpao_perigo||0)+(f.c10_galpao_ultimo==='alto'?2:0);
   if(id0&&d>=3){f['c10_morto_'+id0]=true;f.c10_galpao_morte=id0;}
   else if(id0&&d>=2)f['c10_ferido_'+id0]=true;
 }
 if(id==='k10_31'){
   if(f.c10_rayssa_status!=='morta'&&f.c10_rayssa_escolha==='jullia')f.c10_rayssa_status='jullia';
   else if(f.c10_rayssa_status!=='morta'&&f.c10_rayssa_escolha==='grupo')f.c10_rayssa_status='grupo';
   else if(f.c10_rayssa_status!=='morta'&&f.c10_rayssa_status!=='jullia')f.c10_rayssa_status='indecisa';
 }
 if(id==='k10_34'&&!dead(s,'rayssa')&&f.c10_rayssa_status==='jullia'&&f.c10_jullia_fim==='lago'&&f.c10_pistola){f.c10_morto_rayssa=true;f.c10_rayssa_status='morta';}
 if(id==='k10_34'){
   const danger=Number(f.c10_heroi_perigo||0)+(f.c10_heroi_mid==='alto'?1:0)+(f.c10_heroi_final==='alto'?1:0);
   const saved=!!f.c10_heroi_resgate || (f.c10_rayssa_status==='grupo'&&!!f.c10_rayssa_intervencao);
   if(danger>=3&&!saved)f.c10_heroi_morto=true;
   else if(danger>=2)f.c10_heroi_ferido=true;
 }
 if(id==='k10_35'&&f.c10_rayssa_status==='jullia'&&f.c10_jullia_fim==='fuga'&&!dead(s,'rayssa'))f.c10_rayssa_foragida=true;
 if(id==='k10_39'){
  const missing=f.c10_aparente_nome;if(missing){
    if(f.c10_aparente_sobrevive){f.c10_resgate_milagre=missing;f['c10_ferido_'+missing]=true;}
    else {f['c10_morto_'+missing]=true;f.c10_resgate_morte=missing;}
    delete f['c10_aparente_'+missing];
  }
 }
 return true;
}
const actionNode=(id,loc,time,scene,txt,next)=>node(id,loc,time,scene,txt,[go(next,'Continuar')]);
// ═════════ ATO I ═════════
node('k10_01','DECK ANTIGO · O ROSTO','22:27','lake',`A máscara ainda está na mão dela. Você reconheceria aquele rosto em qualquer lugar, mesmo com a expressão que nunca tinha visto antes: um sorriso estranho, quase satisfeito.

Você: — Jullia...? Não, porra... A gente viu você morrer.

Jullia: — Vocês me viram cair. Tem uma diferença bem grande.

{refem}: — Meu Deus... Você tá viva esse tempo todo?

Jullia: — Eu ia dizer «surpresa», mas acho que vocês já entenderam.

Você dá um passo na direção da cadeira, procurando as amarras com a mão. Jullia acompanha o gesto, tranquila demais.

Jullia: — Você quer mesmo me perguntar como? Então olha pra água. Foi ali que vocês me deixaram.`,[
 opt('“Jullia... eu sinto muito pelo que aconteceu.”','k10_02',[set('primeira_resposta','culpa')]),
 opt('“Você matou nossos amigos! Isso não é justiça!”','k10_02',[set('primeira_resposta','raiva')]),
 opt('“Por que não contou que estava viva?”','k10_02',[set('primeira_resposta','pergunta')])]);
node('k10_02','DECK ANTIGO · UM ANO DE SILÊNCIO','22:30','lake',`Jullia para junto à madeira encharcada do corrimão. A máscara balança entre seus dedos.

Jullia: — Eu lembro de acordar dentro daquela água, tentando respirar e engolindo mais água ainda. Lembro de bater a perna nas pedras. E de achar que alguém ia voltar.

{refem}: — Jullia, a gente achou que você tinha morrido. Isso não justifica...

Jullia: — Não termina essa frase. Sério. Eu passei um ano ouvindo ela dentro da minha cabeça.

Você percebe um nó na lateral da cadeira. O tecido está molhado, mas já começa a ceder. Jullia não viu seu movimento.

Jullia: — Eu gritava até não ter voz. E vocês estavam a quilômetros dali, decidindo como seguir com a vida.`,[
 opt('Continuar afrouxando o nó sem tirar os olhos dela','k10_03',[flag('refem_laco_frouxo')]),
 opt('Ficar na frente de {refem} para impedir que ela se aproxime','k10_03',[flag('refem_protegido')]),
 opt('Perguntar quem ajudou Jullia a sobreviver','k10_03',[flag('jullia_questionada')])]);
node('k10_03','DECK · UM GOLPE NA ESCURIDÃO','22:33','lake',`Jullia percebe o movimento da cadeira e aperta a faca.

Jullia: — Tira a mão daí.

Você: — Não vou deixar você machucar {refem}.

O ataque vem de um ângulo que Jullia não esperava. O objeto atinge o ombro e a lateral da cabeça dela. Jullia cambaleia, bate na grade e cai de joelhos.

Rayssa: — AGORA! SOLTA {refem}! PELO AMOR DE DEUS!

{refem}: — Rayssa?!

Rayssa: — Depois vocês perguntam, tá? Eu não sei quanto tempo ela vai ficar no chão!

Você tenta puxar a fita que prende o último pulso. Rayssa se ajoelha para ajudar, evitando olhar no seu rosto.

Você: — Obrigado. Você salvou a gente.

Rayssa: — Não me agradece ainda.`,[go('k10_04','Tentar terminar de soltar as amarras')]);
node('k10_04','DECK · O RISO','22:36','lake',`Uma risada atravessa o vento.

Jullia se apoia na grade, atordoada, com sangue escorrendo junto à sobrancelha. Mas está sorrindo.

Jullia: — Rayssa... puta que pariu. Você realmente resolveu fazer isso comigo?

Rayssa: — Fica longe deles.

Jullia: — Olha você, bancando a heroína. Depois de tudo que fez pra mim.

Você: — O que ela fez pra você?

Rayssa: — Não escuta ela. Por favor.

Jullia: — Conta quem me encontrou na manhã seguinte. Conta quem me levou comida, remédio... quem sabia que eu tava viva antes de qualquer outra pessoa.

Rayssa fica tão imóvel que você para de mexer no nó.

Você: — Rayssa. Olha pra mim. É verdade?`,[
 opt('“Rayssa, fala comigo. Preciso ouvir da sua boca.”','k10_05',[bond('rayssa',-3),flag('cobrou_rayssa')]),
 opt('“Jullia, para de brincar com a cabeça da gente!”','k10_05',[bond('rayssa',3),flag('defendeu_rayssa')]),
 opt('“Você sabia que ela tava viva esse tempo todo?!”','k10_05',[bond('rayssa',-9),flag('acusou_rayssa')])]);
node('k10_05','CAMINHO DO DECK · TESTEMUNHAS','22:39','lake',`Passos apressados estalam entre as árvores. Gritos, depois o barulho de alguém escorregando nas pedras. Não é outro mascarado: são os amigos que seguiram os sons até o lago.

Jullia: — Que maravilha. A plateia chegou.

{apoio}: — O que tá acontecendo?! Essa... essa é a Jullia?

Você: — É ela. A Jullia tá viva. E a Rayssa sabia.

A primeira reação é silêncio. Depois todos começam a perguntar ao mesmo tempo.

{apoio}: — Pera aí. Como assim «sabia»?!

Jullia: — Eu adoro quando vocês levam uns segundos pra acreditar. É quase um talento.`,[go('k10_06','Escutar a versão de Rayssa')]);
node('k10_06','DECK · ENTRE MELHORES AMIGAS','22:43','lake',`Isabella olha para Rayssa como se ainda esperasse que a amiga dissesse que aquilo tudo é uma mentira cruel.

Isabella: — Fala que ela tá mentindo, Rayssa. Pelo amor de Deus. Fala que isso é alguma porra de armação.

Rayssa: — Isa...

Isabella: — Não fala meu nome desse jeito. Não agora. Só responde.

Rayssa: — Eu encontrei a Jullia no dia seguinte. Ela tava viva. Machucada. Eu entrei em pânico e...

Isabella dá uma risada curta, completamente sem humor, e os olhos enchem de lágrimas no mesmo instante.

Isabella: — Você lembra de quando eu dormi na sua casa porque eu não conseguia fechar o olho sem ver a queda dela? Você me abraçou a noite inteira. Disse que a gente ia passar por aquilo juntas.

Rayssa: — Eu lembro.

Isabella: — Então como você conseguiu me olhar na cara todos esses meses? Como você me ouviu chorar por ela... sabendo que ela tava viva?

Rayssa: — Eu achei que tava protegendo a Jullia. Depois achei que tava protegendo você. Depois já não tava protegendo ninguém. Eu só tava afundando cada vez mais.

Isabella: — Você destruiu a nossa amizade na minha frente e ainda me deixou agradecer por ter você do meu lado. Isso é doentio, Rayssa.

Rayssa: — Eu sei. E eu vou carregar isso pro resto da vida.`,[
 opt('Pedir que Isabella deixe Rayssa explicar até o fim','k10_07',[bond('rayssa',7),bond('isabella',-5),flag('ouviu_rayssa')]),
 opt('Exigir que Rayssa conte a verdade sobre os ataques','k10_07',[bond('rayssa',-5),bond('isabella',4),flag('pressionou_rayssa')]),
 opt('Ficar ao lado de Isabella sem interromper','k10_07',[bond('isabella',8),flag('acolheu_isabella')])]);
node('k10_07','DECK · O QUE RAYSSA FEZ','22:48','lake',`Rayssa seca o rosto com a manga, mas as lágrimas continuam.

Rayssa: — No começo eu só ajudava ela a ficar escondida. Nem conseguia andar direito. Jullia dizia que precisava de tempo. Depois pediu pra eu dizer onde vocês estavam, pra ver se algum de vocês ia confessar.

Você: — E você deu nossos horários pra ela?

Rayssa: — Dei. Eu sei como soa, tá? Eu sei. Achei que era pra assustar vocês. Quando começaram os ataques, eu tentei dizer pra ela parar.

Jullia: — Tentou mesmo. Umas três vezes. Quase me comoveu.

Rayssa: — Você falou que não ia matar ninguém!

Jullia: — E você acreditou porque era mais fácil do que olhar pro que tava acontecendo.

Isabella: — Você podia ter procurado a polícia.

Rayssa: — Eu devia. Eu tava com medo de ir presa, de vocês me odiarem... Aí fui mentindo mais. Não tenho desculpa.`,[go('k10_08','Perguntar como Jullia conseguiu se esconder')]);
node('k10_08','FLASHBACK · A MANHÃ SEGUINTE','22:53','lake',`PONTO DE VISTA: RAYSSA — NA MANHÃ DEPOIS DO ACIDENTE

A água quase não se move. Rayssa atravessa a margem ainda de tênis, procurando algo que não consegue nomear. Um gemido perto das pedras a faz parar.

Jullia está encolhida sob os galhos, tremendo, com os cabelos grudados no rosto.

Rayssa: — Jullia? Meu Deus... JULLIA?!

Jullia: — Não... não chama ninguém. Não chama eles.

Rayssa: — Você precisa de hospital! Deixa eu ligar pra ambulância agora!

Jullia segura o pulso dela com a pouca força que ainda tem.

Jullia: — Se você chamar alguém, eles vão dizer que foi um acidente. Vão continuar vivendo como se eu fosse só um erro daquela noite.

Rayssa: — Para de falar assim. Você tá em choque.

Jullia: — Eu fiquei lá embaixo achando que ia morrer sozinha. Eles me deixaram. Não deixa eles fazerem isso de novo.

Rayssa tira o casaco e cobre os ombros da amiga. Está apavorada, mas não consegue abandoná-la.

DE VOLTA AO DECK

Rayssa: — Eu pensei que ela só precisava de tempo. Só que cada dia que passava ficava pior abrir a boca... e mais fácil continuar mentindo.`,[go('k10_09','Ouvir a explicação sobre Moisés')]);
node('k10_09','DECK · MOISÉS E BELLA','22:58','lake',`Você: — E o Moisés? Ele sabia?

Rayssa: — Eu procurei ele porque não conseguia cuidar da Jullia sozinha. Ele soube que ela tava viva. Ajudou a conseguir um lugar escondido e coisas de que ela precisava.

FLASHBACK — DIAS DEPOIS

Uma lâmpada fraca ilumina um quartinho improvisado. Jullia está sentada numa cama estreita, com o joelho enfaixado. Moisés fecha a porta atrás de si. Rayssa continua em pé, tensa, como se quisesse fugir daquela cena.

Moisés: — Isso saiu do controle faz tempo. Você precisa decidir se vai aparecer viva ou sumir de vez.

Jullia: — Aparecer viva pra quê? Pra ouvir de novo que foi um acidente? Pra ver eles seguirem a vida?

Rayssa: — Jullia, para com isso. A gente ainda pode contar a verdade.

Jullia olha primeiro para Rayssa, depois para Moisés.

Jullia: — Verdade não basta. Eu quero que eles sintam. Quero que cada um deles carregue a mesma angústia que eu carreguei quando achei que ninguém ia voltar por mim.

Moisés: — Vingança não vai te consertar.

Jullia: — Talvez não. Mas vai me impedir de ser esquecida.

DE VOLTA AO DECK

Jullia: — Moisés achava que ia conseguir me controlar. Ficou repetindo que tudo ia acabar quando eu melhorasse. Não entendeu nada.

Você: — Então ele viu vocês montando isso e não fez nada?

Jullia: — Ele viu o suficiente pra se perder no meio dessa merda.

Rayssa: — A Bella não sabia. Jullia fazia questão disso. Eu sei que ela passou meses procurando a irmã e eu fiquei calada.

Jullia olha para a estrada que leva à cidade.

Jullia: — Bella sempre quis encontrar alguém pra culpar. Agora vai ter um nome.`,[go('k10_10','Confrontar as versões com as pistas')]);
node('k10_10','DECK · AS PROVAS','23:03','lake',`A água bate nos pilares. Jullia começa a perder a paciência com as perguntas. Você lembra das pistas reunidas desde a estação do lago e dos registros que o grupo insistiu em preservar.

Você: — Tem coisa que você não tá contando, Jullia. Nem tudo que aconteceu podia ter sido feito só por vocês duas.

Jullia: — Você virou detetive agora? Quer um prêmio?

{refem}: — Eu ouvi outra pessoa quando tava preso. Não vi quem era. Mas ouvi.

Rayssa: — Eu também não sabia de todos os lugares onde ela estava.

Jullia fecha a expressão.`,[
 opt('Mostrar registros e imagens que você preservou','k10_11',[flag('proof_saved'),flag('evidence'),['clue','c10_registros_confronto']], [['clue','c9_foto_casa',true]]),
 opt('Comparar as contradições com as pistas já recolhidas','k10_11',[flag('proof_saved'),flag('evidence'),['clue','c10_depoimento_contraditorio']]),
 opt('Exigir a verdade sem mostrar o que você sabe','k10_11',[flag('proof_hidden')])]);
node('k10_11','DECK · UMA CÚMPLICE DESCARTÁVEL','23:08','lake',`Rayssa dá um passo na direção de Jullia, quase implorando.

Rayssa: — Já chega. Eles sabem. Deixa a gente ir embora, por favor.

Jullia: — «A gente»? Que bonitinho. Você já tá do lado deles de novo?

Rayssa: — Eu nunca quis esse massacre.

Jullia: — Mas deu os endereços, os horários... Você sabe demais, Rayssa. Acha mesmo que eu ia deixar você ir embora sabendo de tudo?

Rayssa: — Do que você tá falando?

Jullia: — Meu plano sempre teve uma última parte. Você não ia sair viva daqui.

Rayssa parece perder o equilíbrio.

Rayssa: — Você ia me matar... Depois de tudo que fiz por você?

Jullia: — Eu não podia correr o risco de você resolver contar a verdade.

Isabella: — Você é completamente doente.

Jullia: — E você continua achando que sua opinião importa, Isa.`,[go('k10_12','Decidir como lidar com Rayssa')]);
node('k10_12','DECK · EM QUEM CONFIAR?','23:13','lake',`Rayssa olha para o grupo, procurando alguém disposto a falar com ela.

Rayssa: — Eu sei que mereço ouvir um monte de coisa. Só... não deixa ela matar mais ninguém.

Jullia: — Olha que discurso lindo. Devia ter ensaiado antes.

O vento arrasta uma embalagem pela madeira. {refem} se mexe na cadeira, tentando aproveitar a distração para soltar o tornozelo.`,[
 opt('“Rayssa, ajuda a gente. Depois você vai responder pelo que fez.”','k10_13',[set('rayssa_escolha','grupo'),bond('rayssa',6),bond('isabella',2)]),
 opt('“Eu não confio mais em você. Fica longe da gente.”','k10_13',[set('rayssa_escolha','jullia'),bond('rayssa',-15)]),
 opt('“Não sei se posso te perdoar, mas ninguém merece morrer aqui.”','k10_13',[set('rayssa_escolha','indecisa'),bond('rayssa',1),flag('limite_rayssa')])]);
node('k10_13','DECK · A CORRIDA COMEÇA','23:17','lake',`{apoio}: — Chega de conversa! A casa fica pela trilha. Se a gente achar sinal ou um telefone, dá pra pedir ajuda!

Jullia: — Vocês acham que eu vou deixar vocês fazerem isso?

{apoio}: — Então tenta impedir!

A aproximação começa como uma tentativa de tirar a faca da mão de Jullia. Ela recua, acerta um golpe na madeira e escapa entre os dois primeiros que tentam cercá-la. O grupo se dispersa para não ficar preso no deck.

Jullia corre atrás de dois amigos que avançaram pela trilha. Outros recuam em direção ao galpão de barcos.

Você volta à cadeira de {refem}. Ainda há uma tira apertada no tornozelo.

{refem}: — Vai atrás deles!

Você: — Não vou deixar você amarrado aqui. Me dá dez segundos!`,[go('k10_14','Terminar o resgate')]);
node('k10_14','DECK · O ÚLTIMO NÓ','23:19','lake',`PONTO DE VISTA: PROTAGONISTA

Você trabalha no nó enquanto ouve Jullia gritar algum nome na trilha. {refem} respira com dificuldade, segurando o pulso machucado contra o peito.

{refem}: — Eu achei que nunca ia ouvir sua voz de novo.

Você: — Ei. Olha pra mim. A gente vai sair daqui.

{refem}: — Você não pode prometer isso.

Você: — Eu posso tentar, porra. Me ajuda a soltar esse último pedaço.

Um estalo vem da estrutura. Vocês precisam sair antes de ficar encurralados.`,[
 opt('Apoiar {refem} e soltar a fita com cuidado','k10_15',[flag('refem_estavel'),bond('ryan',2)]),
 opt('Localizar e afrouxar o laço usando ferramenta do inventário','k10_15',[flag('refem_estavel'),flag('item_usado')]),
 opt('Puxar as amarras rapidamente para ganhar tempo','k10_15',[flag('refem_pulso_ferido')])]);
// ═════════ ATO II: PERSEGUIÇÃO CONTÍNUA ═════════
node('k10_15','TRILHA PARA A CASA · PRIMEIRO CORTE','23:21','forest',`PONTO DE VISTA: {fugitivo}

{fugitivo} e {par} disparam pela trilha estreita que liga o deck à casa. A lanterna velha junto à bifurcação pisca com o vento. O cascalho está molhado e um tronco caído ocupa parte do caminho.

{fugitivo}: — Por aqui! A gente consegue cortar pelo muro!

{par}: — Não me larga, caralho! Eu tô bem atrás de você!

Atrás deles, a voz de Jullia atravessa as árvores.

Jullia: — Eu consigo ouvir vocês!

O terreno obriga os dois a escolher entre ganhar distância e permanecer juntos.`,[
 opt('Seguir pela passagem larga junto ao muro e manter contato','k10_16',[set('trilha_risco1','baixo'),flag('trilha_apoio')]),
 opt('Cortar pelo tronco derrubado para ganhar metros','k10_16',[set('trilha_risco1','alto')]),
 opt('Voltar para tentar enfrentar Jullia na bifurcação','k10_16',[set('trilha_risco1','alto'),flag('trilha_confronto')])]);
node('k10_16','TRILHA · A PONTE DE SERVIÇO','23:25','forest',`O caminho desce até uma pequena ponte de tábuas usadas pelos funcionários da propriedade. A água corre embaixo, e o corrimão está solto.

{par}: — Essa madeira tá podre! Se a gente cair aqui, não tem como voltar rápido!

{fugitivo}: — Então pisa onde eu pisar. E não olha pra trás!

Um galho se parte. Jullia aparece no alto da trilha e acelera, sabendo que a ponte vai atrasar os dois.

{par}: — Tá chegando! Escolhe, PORRA!`,[
 opt('Testar o piso pela borda fixa antes de atravessar','k10_17',[set('trilha_risco2','baixo')]),
 opt('Correr pelo meio da ponte sem parar','k10_17',[set('trilha_risco2','alto')]),
 opt('Pular na margem e usar as pedras para passar','k10_17',[set('trilha_risco2','alto')])]);
node('k10_17','TRILHA · ELA ESTÁ PERTO','23:29','forest',`A ponte range atrás deles. Jullia pisa sobre o primeiro degrau com a faca apontada para baixo, tentando recuperar o fôlego.

Jullia: — Vocês vão continuar correndo até quando?

{fugitivo}: — Até você cansar de ser uma desgraçada!

{par}: — Não provoca ela! Só corre!

À esquerda, a casa já aparece entre as árvores. À direita, um declive termina num amontoado de pedras. {fugitivo} sente o ar faltar e precisa escolher o último movimento.`,[
 opt('Ajudar {par} a passar pela cerca lateral','k10_18',[set('trilha_ultimo','baixo'),flag('trilha_apoio')]),
 opt('Deixar {par} avançar e distrair Jullia entre as árvores','k10_18',[set('trilha_ultimo','alto')]),
 opt('Tentar derrubar a perseguidora com o próprio peso','k10_18',[set('trilha_ultimo','alto')])]);
node('k10_18','TRILHA · UM GRITO NO ESCURO','23:32','forest',`Jullia alcança os arbustos perto da cerca. Um choque de corpos derruba galhos secos; a faca corta o ar e atinge a madeira, fazendo lascas voarem.

{par}: — {fugitivo}! RESPONDE!

O grito que vem da trilha é interrompido por um golpe. Um dos dois desaparece atrás da vegetação enquanto o outro se arrasta pelo acesso da casa, tentando enxergar no escuro.

Por um segundo, a perseguida fica fora de vista. Jullia hesita, ouvindo vozes que vêm do galpão de barcos. Ela precisa decidir qual direção seguir — e não pode atacar os dois locais ao mesmo tempo.`,[go('k10_19','Descobrir quem conseguiu chegar à casa')]);
node('k10_19','CASA DO LAGO · PORTA LATERAL','23:37','house',`O corredor de entrada está vazio, mas a porta lateral não ficou trancada. O sobrevivente que conseguiu chegar se agarra à bancada da cozinha, tentando recuperar o fôlego.

Há um telefone fixo antigo na parede. Ao tirá-lo do gancho, só encontra silêncio: o cabo foi cortado. Pela janela, um relâmpago ilumina as árvores.

{par}: — Alguém?! Preciso de ajuda! Tem alguém aqui?!

Ao longe, Jullia abandona a trilha e segue pelo caminho do galpão, depois de ouvir um ruído metálico. Uma nova perseguição só começará quando ela chegar lá.`,[go('k10_20','Acompanhar os amigos no galpão')]);
node('k10_20','GALPÃO DE BARCOS · LUZES MORTAS','00:02','house',`PONTO DE VISTA: {galpao}

O galpão cheira a combustível velho e madeira úmida. Uma lona cobre um pequeno barco de pesca. {galpao} mantém a porta encostada enquanto {companhia} procura uma forma de destravar a saída dos fundos.

{galpao}: — Se a gente fizer muito barulho, ela vai achar a gente.

{companhia}: — E se ficar aqui, ela só precisa fechar as duas saídas. Eu prefiro correr o risco.

Um telefone celular mostra uma barra instável de sinal. Talvez uma mensagem curta consiga sair — se eles subirem até a janela alta.`,[
 opt('Subir com cuidado até a janela para enviar localização','k10_21',[set('galpao_perigo',0),flag('sinal_enviado')]),
 opt('Usar a bancada para forçar a porta dos fundos','k10_21',[set('galpao_perigo',1)]),
 opt('Empurrar o barco contra a porta principal','k10_21',[set('galpao_perigo',1),flag('galpao_barulho')])]);
node('k10_21','GALPÃO · PASSOS NO TELHADO','00:10','house',`A mensagem fica presa na tela com a palavra «enviando». {galpao} prende a respiração. Um passo do lado de fora, depois outro, anuncia que Jullia deixou a trilha.

Jullia: — Vocês fizeram barulho demais.

{companhia}: — Merda... é ela!

Um gancho de metal está preso à parede. No chão, uma caixa de ferramentas parcialmente aberta. A porta dos fundos continua emperrada.

{galpao}: — Não vou ficar parado esperando ela entrar.`,[
 opt('Puxar a caixa para escorar a passagem enquanto abre a saída','k10_22',[set('galpao_ultimo','baixo')]),
 opt('Atravessar por baixo da lona e tentar surpreendê-la','k10_22',[set('galpao_ultimo','alto')]),
 opt('Correr até a porta principal antes que ela a alcance','k10_22',[set('galpao_ultimo','alto')])]);
node('k10_22','GALPÃO · A SAÍDA POSSÍVEL','00:18','house',`O metal rasga parte da lona. Jullia consegue abrir a porta principal, e a lâmina reflete a luz que entra pela fresta. {galpao} puxa a caixa de ferramentas para ganhar alguns segundos.

{companhia}: — Tem uma passagem aqui! Vem!

O galpão vira uma confusão de tábuas, lona e respirações curtas. Jullia ataca quem ficou mais perto da bancada; a outra pessoa tenta arrastá-la para fora.

O resultado depende do caminho que escolheram dentro do galpão. Não é a existência de ferimentos anteriores que decide sozinha quem sai dali.`,[go('k10_23','Ver as consequências da fuga')]);
node('k10_23','VARANDA DE SERVIÇO · DEPOIS DA FUGA','00:26','forest',`Ao sair do galpão, os sobreviventes avistam a varanda de serviço da casa. Jullia permanece dentro por alguns instantes, procurando por onde eles escaparam.

O celular vibra: a localização enviada parece finalmente ter saído. Mas não há confirmação de resposta. A tempestade piora e o acesso principal está coberto de galhos caídos.

{galpao}: — Se alguém recebeu aquilo, talvez ainda tenha chance.

{companhia}: — Chance a gente vai ter que criar. Não dá pra esperar alguém aparecer e resolver por nós.`,[go('k10_24','Voltar ao grupo que ficou na margem')]);
node('k10_24','MARGEM · A VERDADE ENTRE AS DUAS','01:11','lake',`O grupo tenta se reunir perto da cobertura de madeira, longe do deck. A chuva atravessa as frestas. Ninguém consegue dizer com certeza onde Jullia está naquele momento.

Isabella: — Eu ainda tô tentando entender como você conseguiu olhar na minha cara esse tempo todo, Rayssa.

Rayssa: — Eu sei que você não vai acreditar em nada do que eu disser agora.

Isabella: — Não é sobre acreditar. É sobre você ter tido mil oportunidades pra me contar.

Rayssa: — Eu tenho vergonha, Isa. De verdade. E eu sei que isso não resolve nada.

As duas se encaram enquanto o resto do grupo tenta ouvir sons vindo do galpão.`,[
 opt('Pedir que Isabella não se arrisque sozinha no escuro','k10_25',[bond('isabella',4),friend('isabella','rayssa',1)]),
 opt('Dizer que Rayssa precisa provar que vai ajudá-los','k10_25',[bond('rayssa',-2),flag('rayssa_prova')]),
 opt('Propor que todos se concentrem em sobreviver antes de discutir perdão','k10_25',[friend('isabella','rayssa',2),flag('grupo_unido')])]);
node('k10_25','CASA DO LAGO · HORAS DE CHUVA','02:13','house',`A madrugada parece não acabar. Os sobreviventes conseguem alcançar a despensa da casa e trancar a porta de serviço com um móvel pesado. No escuro, eles contam nomes, conferem quem voltou e improvisam curativos com o que encontram.

Você: — Tem gente que ainda não voltou. A gente não vai fingir que tá tudo bem.

{apoio}: — Eu sei. Só... me dá um segundo. Eu não paro de tremer.

Lá fora, Jullia bate uma vez na janela e desaparece antes que alguém consiga enxergá-la. Ela não está atacando outro setor ao mesmo tempo; está rondando a casa à procura do grupo.

Um celular consegue enviar uma mensagem de emergência com a localização aproximada. A estrada foi bloqueada pela tempestade e ninguém responde imediatamente. A ajuda só vai chegar ao amanhecer.`,[go('k10_26','Preparar a saída antes de Jullia voltar')]);
node('k10_26','CASA · O QUE AINDA RESTOU','03:14','house',`O armário de remédios está quase vazio. {refem} consegue se sentar sem apoio, mas continua com o pulso machucado. A chuva começa a diminuir.

{refem}: — A gente não consegue ficar escondido aqui pra sempre.

Você: — Eu sei. Só preciso pensar antes de fazer outra merda.

{apoio}: — No deck tinha uma mochila e uma luz acesa. Talvez ela tenha deixado mais coisa lá. Mas a gente não vai conseguir ir todo mundo junto.

Você revê mentalmente o que guardou no inventário e o que o grupo conseguiu preservar como prova.`,[
 opt('Usar o kit de primeiros cuidados do inventário e preparar a saída','k10_27',[flag('heroi_resgate'),flag('usou_kit')]),
 opt('Usar a lanterna do inventário para mapear o caminho até o deck','k10_27',[flag('caminho_seguro'),flag('item_usado')]),
 opt('Examinar a foto ou anotações preservadas antes de sair','k10_27',[flag('evidence'),flag('prova_conferida')]),
 opt('Dividir tarefas e proteger os amigos mais feridos','k10_27',[flag('heroi_resgate'),flag('grupo_unido')])]);
node('k10_27','ENTRADA DO DECK · ÚLTIMA CHANCE','04:16','lake',`O grupo segue aos poucos até a parte antiga do lago. A luz antes do amanhecer ainda não alcança as árvores, mas a chuva diminuiu.

{apoio}: — Eu fico perto da trilha. Se ela tentar dar a volta, eu aviso.

{refem}: — Eu não quero que ninguém morra por minha causa.

Você: — Ninguém tá aqui por sua causa. Isso começou muito antes daquela cadeira.

Perto do banco de madeira, o protagonista percebe uma pequena bolsa de Jullia caída atrás da grade. A alça está presa numa farpa. Quando é aberta, revela uma pistola que ela mantinha escondida como último recurso. É possível guardá-la, mas fazê-lo custa tempo e pode alertá-la.`,[
 opt('Recolher a pistola caída e verificar se pode ser usada','k10_28',[flag('pistola')]),
 opt('Não tocar na arma e manter distância da margem','k10_28',[flag('caminho_seguro')]),
 opt('Pedir ajuda a {apoio} para vigiar o acesso enquanto você procura pistas','k10_28',[flag('heroi_resgate'),flag('evidence')])]);
// ═════════ ATO III: CONFRONTO ═════════
node('k10_28','DECK ANTIGO · O CÍRCULO SE FECHA','04:29','lake',`Jullia sai da sombra da passarela, com a roupa molhada e os olhos vermelhos. A faca está na mão direita. Ela observa o grupo, já menor do que no começo da noite.

Jullia: — Quase amanhecendo. Bonito, né? Foi mais ou menos essa hora que eu achei que ia morrer.

Você: — Você já conseguiu que todo mundo soubesse da verdade. Não precisa terminar assim.

Jullia: — Eu não precisava de um discurso. Eu precisava que alguém voltasse naquele dia.

{apoio}: — Jullia, para. Tem gente sangrando. Você não tá vendo?

Jullia: — Tô vendo perfeitamente.

Ela dá um passo. O deck range no mesmo lugar em que a cadeira tinha sido arrastada.`,[
 opt('Tentar mantê-la falando enquanto o grupo se afasta','k10_29',[set('heroi_perigo',0),flag('negociou')]),
 opt('Avançar para tirar a faca antes que ela ataque','k10_29',[set('heroi_perigo',1)]),
 opt('Provocá-la para que pare de ameaçar seus amigos','k10_29',[set('heroi_perigo',1),flag('provocou')])]);
node('k10_29','DECK · NÃO EXISTE VOLTA','04:34','lake',`Jullia avança e a lâmina risca a grade de madeira. Você recua para o lado do suporte central; o metal antigo geme com o peso dos dois.

Jullia: — Você ainda acha que vai consertar o que fez com uma frase bonita?!

Você: — Eu não consigo voltar praquela noite. Você também não!

{apoio}: — {heroi}, CUIDADO!

A faca passa perto do seu ombro. Jullia bate contra o corrimão, perde o equilíbrio por um segundo e se recupera, furiosa.

O piso oferece dois caminhos: alcançar a passarela firme ou lutar sobre a seção molhada, mais perto da borda.`,[
 opt('Recuar para as tábuas firmes e pedir cobertura','k10_30',[flag('heroi_resgate'),set('heroi_mid','baixo')]),
 opt('Segurar o braço de Jullia e tentar imobilizá-la','k10_30',[set('heroi_mid','alto')]),
 opt('Tentar empurrar Jullia contra a grade frouxa','k10_30',[set('heroi_mid','alto'),flag('grade_forcada')])]);
node('k10_30','DECK · A ESCOLHA DE RAYSSA','04:39','lake',`O confronto obriga os sobreviventes a escolher onde ficar. Rayssa ouve Jullia chamar seu nome do outro lado do deck.

Jullia: — Agora, Rayssa! Você sabe que eles nunca vão te perdoar!

Rayssa: — Eu já não sei se vou conseguir me perdoar.

{refem}: — Rayssa, não faz outra besteira. Por favor.

O grupo hesita. Essa decisão vai definir quem protege quem quando a luta recomeçar.`,[
 opt('Pedir que Rayssa proteja os feridos e fique com o grupo','k10_31',[set('rayssa_escolha','grupo'),flag('rayssa_intervencao')]),
 opt('Mandar Rayssa se afastar: você não confia nela','k10_31',[set('rayssa_escolha','indecisa')]),
 opt('Acusar Rayssa de continuar trabalhando com Jullia','k10_31',[set('rayssa_escolha','jullia'),bond('rayssa',-8)])]);
node('k10_31','DECK · O ÚLTIMO MOVIMENTO','04:43','lake',`Jullia atravessa a passarela numa corrida curta. Ao ver os amigos tentando chegar à escada de serviço, ela muda de direção e ataca o protagonista, impedindo a fuga.

{apoio}: — ABAIXA!

Você: — Não... não vou deixar você levar mais ninguém!

O impacto joga os dois contra o corrimão. A madeira se parte em um dos encaixes. O lago está logo abaixo.

Há apenas segundos para decidir: afastar-se e proteger o próprio corpo, intervir para salvar o amigo que ficou exposto ou usar o ambiente contra Jullia.`,[
 opt('Recuperar o equilíbrio e puxar Jullia para longe dos amigos','k10_32',[set('heroi_final','baixo'),flag('heroi_resgate')]),
 opt('Se jogar na frente do golpe destinado a {apoio}','k10_32',[set('heroi_final','alto'),flag('heroi_sacrificio')]),
 opt('Segurar a grade quebrada e fazê-la recuar até a borda','k10_32',[set('heroi_final','alto'),flag('lago_queda')])]);
node('k10_32','DECK · QUAL FINAL É POSSÍVEL?','04:47','lake',`Por um instante, ninguém fala. Jullia está desequilibrada junto à borda; a faca caiu entre duas tábuas. O protagonista sente o corpo doer e precisa decidir antes que ela recupere a arma.

Jullia: — Vocês não vão ganhar essa história de mim.

Você: — Isso nunca foi uma história pra ganhar, Jullia. Foram pessoas de verdade.

Uma voz chama da trilha: alguém finalmente consegue enxergar a luz distante de um veículo no bloqueio da estrada. A polícia ainda não chegou; será preciso resistir até o amanhecer.`,[
 opt('Afastá-la da grade e tentar imobilizá-la para entregar à polícia','k10_33',[set('jullia_fim','presa')]),
 opt('Empurrá-la para o lago para interromper o ataque','k10_33',[set('jullia_fim','lago')]),
 opt('Recuar com os sobreviventes e deixar livre a saída da margem','k10_33',[set('jullia_fim','fuga')])]);
node('k10_33','LAGO · O SILÊNCIO NÃO DURA','04:50','lake',`A madeira volta a ranger. O cheiro de chuva e ferrugem permanece no ar. Por mais que os sobreviventes queiram acreditar que terminou, nenhum deles consegue relaxar.

{refem}: — A gente precisa sair do deck. Agora.

{apoio}: — Eu fico com você. Só não olha pra trás.

Por um instante, algo se move junto às estacas do lago. Não dá para distinguir madeira solta de uma pessoa tentando se erguer.`,[go('k10_34','Enfrentar as consequências do confronto')]);
node('k10_34','DECK · O PREÇO DO ÚLTIMO ATAQUE','04:53','lake',`O vento espalha gotas frias sobre as tábuas. Uma última reação de Jullia pode ainda colocar os sobreviventes em perigo.

Você tenta alcançar a passagem firme quando escuta a água se agitar perto dos pilares. Um dos amigos grita por você.

Não existe botão que apague a violência desta noite: as marcas no corpo e nas relações vão seguir os sobreviventes mesmo quando o perigo passar.`,[go('k10_35','Continuar depois do último ataque')]);
node('k10_35','CASA DO LAGO · CONTANDO OS AUSENTES','05:04','house',`PONTO DE VISTA: SOBREVIVENTES

A casa está fria e silenciosa. Quem conseguiu sair do deck se reúne aos poucos na varanda. Uma toalha vira compressa; um casaco seco cobre os ombros de quem não para de tremer.

{apoio}: — Olha pra mim. Respira comigo. Não precisa falar agora.

{refem}: — A gente deixou gente pra trás?

Os nomes são chamados um a um. Para alguns, há resposta. Para outros, só o barulho do vento. O grupo não trata ninguém como morto sem confirmação, mas também não finge que todos estão bem.

Um sinal fraco de celular finalmente permite confirmar a localização enviada. A equipe de emergência informa que está abrindo caminho pela estrada bloqueada.`,[go('k10_36','Esperar o resgate e cuidar dos feridos')]);
// ═════════ EPÍLOGOS ═════════
node('k10_36','LAKEWOOD · O PRIMEIRO CLARÃO','05:47','road',`O céu começa a clarear por trás das árvores. Faróis surgem entre os galhos caídos: primeiro uma viatura, depois os veículos de resgate. O bloqueio da estrada retardou as equipes durante a madrugada inteira.

Policial: — Quem consegue andar, vem pela direita! Precisamos saber quantas pessoas estavam aqui!

Enfermeira: — Maca aqui! Tem feridos na varanda!

{apoio}: — Não para de procurar, tá? Ainda falta gente!

A polícia inicia a busca pelo galpão, pela trilha e pelo deck. Os sobreviventes são separados para receber atendimento e prestar os primeiros relatos, sem serem obrigados a responder tudo naquele instante.`,[go('k10_37','Acompanhar a busca dos paramédicos')]);
node('k10_37','DECK · A BUSCA PELOS DESAPARECIDOS','05:58','lake',`Uma equipe percorre a margem com lanternas. Outra confere o galpão. A chuva da madrugada deixou marcas de sangue e pegadas misturadas na lama.

{apoio}: — Por favor, vê atrás da cerca! Alguém caiu naquela parte da trilha!

Paramédico: — Vamos olhar. Fica aqui para não bloquear a passagem.

O grupo espera. Cada segundo parece demorar mais do que a perseguição inteira.

Uma voz finalmente chama pelo rádio.`,[go('k10_38','Descobrir o resultado da busca')]);
node('k10_38','MARGEM · UMA ÚLTIMA POSSIBILIDADE','06:04','lake',`Os paramédicos voltam da trilha com uma maca. Os rostos do grupo mudam antes que alguém consiga perguntar quem está nela.

O silêncio é interrompido por uma ordem médica, e os sobreviventes abrem caminho. Alguém se aproxima tentando reconhecer o rosto sob a manta térmica.`,[go('k10_39','Conferir quem foi encontrado')]);
node('k10_39','AMBULÂNCIAS · O QUE AINDA RESTA','06:11','road',`Os sobreviventes aguardam junto à ambulância enquanto os profissionais estabilizam quem foi encontrado na margem.

{apoio}: — Eu achei que nunca mais ia ver aquela pessoa.

{refem}: — Ontem eu pensei que não ia sair daquela cadeira. Agora parece que cada minuto vem com uma notícia diferente.

A manhã continua. Os agentes documentam a cena e pedem que o grupo não volte ao deck.`,[go('k10_40','Conversar sobre Rayssa e a verdade')]);
node('k10_40','AMBULÂNCIA · VERDADE OU SILÊNCIO','06:21','road',`A investigação está começando. Os sobreviventes sabem que Jullia não agiu sozinha durante toda a temporada, mas ainda há medo, raiva e culpa em relação a Rayssa.

{apoio}: — Eu não quero mais passar a vida inteira mentindo. Já deu no que deu uma vez.

{refem}: — E também não quero fingir que não existe diferença entre ajudar alguém e participar dos crimes.

A decisão sobre o que contar às autoridades não apaga provas nem impede que outras testemunhas falem. Mas muda profundamente a confiança entre os amigos.`,[
 opt('Contar a participação de Rayssa, mesmo que você a perdoe','k10_41',[set('rayssa_justica','depoimento'),bond('isabella',5)]),
 opt('Pedir que o grupo não revele a ajuda inicial de Rayssa','k10_41',[set('rayssa_justica','segredo'),bond('isabella',-5)]),
 opt('Dizer apenas o que você viu, sem decidir pelos outros','k10_41',[set('rayssa_justica','independente')])]);
node('k10_41','AMBULÂNCIAS · DESPEDIDAS','06:35','road',`As portas das ambulâncias se fecham uma a uma. Quem está consciente tenta saber para qual hospital os amigos serão levados.

{apoio}: — A gente vai se encontrar de novo, né?

{refem}: — Eu queria poder prometer que vai ser tudo como antes.

{apoio}: — Não vai. Mas a gente pode tentar fazer alguma coisa que preste depois dessa merda toda.

Ao fundo, a polícia continua trabalhando. Bella chega acompanhada por agentes, informada de que encontraram provas relacionadas à irmã. Ela precisa ouvir o que aconteceu de alguém que realmente estava lá.`,[go('k10_42','Acompanhar a conversa com Bella')]);
node('k10_42','ESTRADA · A IRMÃ DE JULLIA','06:42','road',`Bella desce de um veículo com a expressão de quem mal dormiu. Ao enxergar o deck cercado pela polícia, ela para de andar.

Bella: — É verdade? Era a Jullia?

{apoio}: — Era. A gente viu o rosto dela. Ela tava viva esse tempo todo.

Bella: — Eu fiquei um ano procurando uma pessoa que não queria ser encontrada...

Sua voz falha.

Bella: — Não. Não é só isso. Ela escolheu machucar vocês. Eu não sabia. Eu juro que não sabia.

Ela segura o choro enquanto um agente lhe explica que ainda existem perguntas sobre Moisés e outras informações que precisam ser verificadas.`,[go('k10_43','Avançar quatro meses')]);
node('k10_43','LAKEWOOD · QUATRO MESES DEPOIS','15:30','house',`QUATRO MESES DEPOIS

A tarde entra pelas janelas de uma casa que não pertence à propriedade do lago. Não há sirenes, máscaras ou barulho de passos na madrugada. Há pratos sobre uma mesa, uma música baixa e gente tentando aprender de novo a ficar junta.

Nem todo mundo conseguiu vir. Algumas cadeiras foram deixadas vazias de propósito, para lembrar quem não voltou. Os sobreviventes conversam sobre estudos, trabalho, terapia, fisioterapia e as coisas comuns que pareciam impossíveis naquela noite.

Isabella: — Eu sei que soa idiota, mas é bom reclamar de coisa pequena de novo.

Allan: — Reclamar do quê? Da louça? Eu reclamo profissionalmente, se quiser.

Um riso atravessa a mesa, interrompido por um silêncio que ninguém precisa explicar.`,[go('k10_44','Ouvir como Allan passou esses meses')]);
function fourMonths(id,next){node('k10_'+id,'REENCONTRO · QUATRO MESES DEPOIS','15:42','house','',[go(next,'Conversar com o próximo amigo')]);}
fourMonths('44','k10_45');fourMonths('45','k10_46');fourMonths('46','k10_47');fourMonths('47','k10_48');fourMonths('48','k10_49');fourMonths('49','k10_50');fourMonths('50','k10_51');fourMonths('51','k10_56');fourMonths('56','k10_52');
node('k10_52','REENCONTRO · UM BRINDE','16:55','house',`A conversa passa dos acontecimentos no lago para as coisas que ninguém imaginava discutir quatro meses depois: uma matrícula nova, uma entrevista de emprego, um cachorro que destruiu um sofá, um filme horrível que alguém recomendou.

Um dos sobreviventes olha as cadeiras vazias e ergue o copo.

Sobrevivente: — Pelos que não puderam vir. E pelos que ainda tão aqui tentando viver.

Os outros repetem o gesto. Não é um final perfeito. Mas, pela primeira vez em muito tempo, não parece errado sorrir.`,[go('k10_53','Ouvir o podcast sobre Lakewood')]);
node('k10_53','PÓS-CRÉDITOS · PODCAST','19:00','phone',`PODCAST — GRAVAÇÃO PUBLICADA QUATRO MESES DEPOIS

Uma apresentadora jovem ajeita o microfone. Seu rosto não aparece por inteiro, apenas o contorno iluminado da cabine.

Apresentadora: — Hoje a gente recebe alguém que esteve no centro do caso de Lakewood. Você acha que o massacre acabou de verdade?

Convidado: — Eu queria dizer que sim. Só que tem umas coisas que a gente ainda não sabe explicar.

Apresentadora: — Como o quê?

Convidado: — Informações que chegaram ao assassino quando nem todo mundo sabia delas. Eu ainda penso nisso.

A apresentadora demora um segundo além do normal para responder.

Apresentadora: — Então talvez a história ainda não tenha terminado.`,[go('k10_54','Assistir à última cena')]);
node('k10_54','PÓS-CRÉDITOS · A PORTA','19:07','phone',`A imagem muda para um corredor de paredes claras. Uma porta se abre fora do enquadramento.

A câmera permanece voltada para uma cadeira vazia e um telefone sobre a mesa.

Uma voz diz apenas:

Voz desconhecida: — Tem muita gente que ainda acredita que sabe como aquilo terminou.

A imagem desaparece antes de revelar quem estava falando.`,[go('k10_55','Encerrar a primeira temporada')]);
node('k10_55','FIM DA PRIMEIRA TEMPORADA','19:08','lake',`O ÚLTIMO GRITO

FIM DA PRIMEIRA TEMPORADA

As escolhas feitas desde o prólogo determinaram quem chegou até aqui, quem não voltou e que tipo de futuro restou para Lakewood.

Mas algumas perguntas continuam sem resposta.

CONTINUA...`,[]);
// Resolver cenas personalizadas conforme estado real da partida, sem texto genérico de personagens ausentes.
function resolve(id,s,n){if(!id.startsWith('k10_'))return n;const f=s.flags||{};let text=n.text,choices=[...(n.choices||[])],loc=n.location;
 const kid=hostage(s),avail=arrive(s),lead=avail[0]||living(s).find(x=>x!==kid)||null;
 const pair=f.c10_trilha||[],gal=f.c10_galpao||[];
 const first=pair[0],second=pair[1]||null,g1=gal[0],g2=gal[1]||null;
 const speak=(id,phrase)=>id&&!dead(s,id)?`${name(id)}: — ${phrase}`:'';
 let extras='';
 if(id==='k10_02'){
  const q=f.c10_primeira_resposta;
  extras=q==='culpa'?`\n\nVocê: — Eu sinto muito, Jullia. Eu queria ter voltado.\n\nJullia: — Querer é fácil. Eu fiquei esperando uma pessoa aparecer até parar de sentir os dedos.`:q==='raiva'?`\n\nVocê: — Isso não dá direito de esfaquear ninguém, porra!\n\nJullia: — Você não sabe o que é estar lá sozinha. Mas eu tô vendo que aprendeu a julgar.`:`\n\nVocê: — Por que não contou que tinha sobrevivido?\n\nJullia: — Porque eu nem conseguia ficar de pé. E depois... depois eu não queria que vocês me encontrassem.`;
 }
 if(id==='k10_03'){
  if(dead(s,'rayssa')){
   const resc=lead||null; text=`Jullia ergue a faca ao perceber o nó quase aberto.\n\nVocê: — Sai de perto de ${name(kid)}!\n\nUm baque atravessa o deck quando ${resc?name(resc)+' aparece pela entrada e empurra uma tábua solta na direção de Jullia.':'Você alcança uma tábua solta e a empurra na direção de Jullia.'} Ela cai contra a grade e perde o equilíbrio por um instante.\n\n${resc?name(resc)+': — AGORA! ACABA DE SOLTAR '+name(kid).toUpperCase()+'!':name(kid)+': — AGORA, '+heroName(s).toUpperCase()+'! TIRA ESSA FITA!'}\n\nVocê corre até a cadeira. Não há sinal de Rayssa: você ainda carrega a lembrança de sua morte.\n\nJullia começa a rir baixinho do chão.`;
  }else if(kid==='rayssa'){
   text=`Jullia ergue a faca e ordena que você se afaste da cadeira. Rayssa aproveita que a fita do pulso foi afrouxada antes: ela consegue puxar o braço e alcançar uma peça solta de madeira junto ao pé.\n\nRayssa: — SAI DE PERTO DE MIM!\n\nO golpe atinge o ombro de Jullia, que cai contra a grade.\n\nVocê: — Rayssa! Você tá bem?!\n\nRayssa: — Depois! Solta minha outra mão, pelo amor de Deus!\n\nVocê se ajoelha e tenta terminar o resgate.\n\nRayssa: — Não me agradece. Você ainda não sabe de nada.`;
  }
 }
 if(id==='k10_04'&&dead(s,'rayssa'))text=`Jullia se levanta, rindo com uma expressão estranha.\n\nJullia: — A Rayssa não pode mais contar pra vocês. Mas sabe o que é engraçado? Ela me ajudou por tanto tempo...\n\nVocê: — Você tá falando da Rayssa que morreu?\n\nJullia: — Ela me encontrou viva no dia seguinte ao acidente. E guardou meu segredo. Pergunta aos documentos que ela deixou, se não acredita.\n\n${name(lead||kid)}: — Meu Deus... Então ela sabia?\n\nJullia: — Sabia. E eu não ia deixar ninguém contar por mim.`;
 if(id==='k10_05'){if(!avail.length){text=`Você ouve passos no acesso ao lago. Não são novos convidados: ${name(kid)} conseguiu se apoiar na cadeira e chama por ajuda. Jullia encara a trilha vazia.\n\nVocê: — Ninguém mais precisa morrer aqui.\n\nJullia: — Você continua falando como se pudesse decidir.\n\nA ausência dos amigos perdidos torna cada palavra mais difícil.`;}else{
 text=text.replaceAll('{apoio}',name(lead));const each=avail.slice(0,4).map(x=>`${name(x)} alcança a entrada do deck${wounded(s,x)?' com dificuldade por causa dos ferimentos':''}.`).join(' ');
 text=each+'\n\n'+text;
 }}
 if(['k10_06','k10_07','k10_08','k10_11','k10_12','k10_24','k10_30'].includes(id)){
   if(dead(s,'rayssa')){
    if(id==='k10_06')text=`Isabella encara Jullia, tentando entender a acusação dirigida à amiga que já morreu.\n\nIsabella: — Rayssa sabia que você tava viva? E não contou nem pra mim?\n\nJullia: — Ela me encontrou na manhã seguinte. Guardou o segredo até não aguentar mais.\n\nIsabella: — Você tá usando uma pessoa morta pra machucar a gente.\n\nJullia: — Eu tô contando o que aconteceu. E vocês sabem que é verdade.`;
    if(id==='k10_07')text=`Jullia continua falando, enquanto Isabella aperta a própria manga entre os dedos.\n\nJullia: — No começo Rayssa só me ajudava a ficar escondida. Depois passou informações do grupo. Não planejou todos os ataques, mas sabia que eu queria vingança.\n\nVocê: — Ela tentou te impedir?\n\nJullia: — Quando percebeu até onde eu ia chegar, sim. Só que aí também tinha medo de admitir o que fez.\n\nIsabella: — Eu queria que ela estivesse aqui pra ouvir isso da boca dela... mesmo que doesse.`;
    if(id==='k10_08')text=`FLASHBACK — A MANHÃ SEGUINTE AO ACIDENTE\n\nRayssa encontra Jullia perto das pedras. A amiga mal consegue ficar em pé.\n\nRayssa: — Meu Deus, Jullia... você tá viva!\n\nJullia: — Não deixa eles me encontrarem. Por favor.\n\nRayssa tira o casaco e a ajuda a se esconder da estrada.\n\nDE VOLTA AO DECK\n\nJullia: — Ela me ajudou quando ninguém mais voltou. Depois passou a ter medo de vocês descobrirem.`;
    if(id==='k10_11')text=`Você: — Então você usou o segredo da Rayssa até o fim?\n\nJullia: — Ela sabia demais. Depois que eu terminasse, não podia correr o risco de me denunciar.\n\nIsabella: — Você ia matar a Rayssa também, sua desgraçada?\n\nJullia: — Eu ia impedir que minha história fosse contada por outra pessoa.\n\nIsabella: — Ela morreu sem saber que você planejava isso...`;
    if(id==='k10_12'){text=`Isabella está pálida.\n\nIsabella: — Não dá pra perdoar alguém que não pode mais responder. Mas também não dá pra esconder o que aconteceu.\n\nVocê: — Agora a gente tem que sobreviver e contar a verdade.\n\nJullia: — Vocês falam tanto em verdade. Quero ver sair daqui pra contar.`;choices=[go('k10_13','Reunir os sobreviventes antes da fuga',[flag('rayssa_morta_revelada')])];}
    if(id==='k10_24'){text=`Isabella se apoia na parede úmida, em silêncio. A revelação de Jullia sobre Rayssa não devolve a amiga que ela perdeu.\n\nIsabella: — Eu tô com raiva dela e, ao mesmo tempo, daria tudo pra falar com ela só mais uma vez. Isso é horrível.\n\nVocê: — Você pode sentir as duas coisas, Isa.\n\nIsabella: — Eu sei... mas agora eu preciso sair viva daqui.`;choices=[go('k10_25','Permanecer com o grupo',[bond('isabella',3)])];}
    if(id==='k10_30'){text=`Jullia olha os poucos sobreviventes que ainda alcançaram o deck.\n\nJullia: — A Rayssa teria achado alguma desculpa pra vocês. Ainda bem que não pode mais.\n\nVocê: — Para de usar o nome dela!\n\n${name(lead||kid)}: — A gente vai sair daqui, ${heroName(s)}. Não olha pra ela.\n\nO perigo agora depende dos movimentos no deck, não de uma decisão de Rayssa ausente.`;choices=[go('k10_31','Manter a atenção no confronto',[flag('grupo_unido')])];}
   }else if(kid==='rayssa'){
     if(id==='k10_06')text=`Isabella vê Rayssa ainda tentando recuperar a circulação das mãos.\n\nIsabella: — Não. Você tava presa ali... mas sabia que a Jullia tava viva?\n\nRayssa: — Sabia, Isa. Eu escondi. E eu tenho tanta vergonha que nem sei por onde começar.\n\nIsabella: — Então começa pelo começo. Não mente mais pra mim.\n\nRayssa: — Eu encontrei ela na manhã seguinte. Achei que tava salvando uma amiga. E fui mentindo até não conseguir voltar atrás.`;
     if(id==='k10_11')text=text.replaceAll('Rayssa dá um passo na direção de Jullia','Rayssa se ergue apoiada na cadeira e encara Jullia');
   }
 }
 if(id==='k10_07'&&dead(s,'isabella')&&!dead(s,'rayssa'))text=`Rayssa tenta encontrar as palavras diante dos sobreviventes.\n\nRayssa: — Eu comecei ajudando a Jullia a se esconder. Depois fui dando informações, achando que ela só queria que vocês confessassem. Quando vieram as mortes, eu tive medo de tudo que já tinha feito.\n\n${name(lead||kid)}: — Você podia ter ido à polícia.\n\nRayssa: — Eu devia. Eu sei que devia. E eu nunca vou poder pedir desculpas pra Isabella do jeito que ela merecia.`;
 if(id==='k10_11'&&dead(s,'isabella')&&!dead(s,'rayssa'))text=text.replace('Isabella: — Você é completamente doente.','Você: — Você é completamente doente.').replace('Jullia: — E você continua achando que sua opinião importa, Isa.','Jullia: — Você sempre acha que uma frase vai mudar alguma coisa.');
 if(id==='k10_06'&&dead(s,'isabella')&&dead(s,'rayssa')){text=`Só os sobreviventes alcançam o deck. A revelação de que Rayssa ajudou Jullia não pode mais ser confrontada pelas duas melhores amigas, que morreram nos ataques.\n\n${name(lead||kid)}: — A gente nunca vai saber tudo que aconteceu entre elas. Mas você vai contar o que fez, Jullia.\n\nJullia: — Vocês queriam a verdade? Tão ouvindo.`;choices=[go('k10_07','Ouvir o restante da confissão')];}
 if(id==='k10_06'&&dead(s,'isabella')&&!dead(s,'rayssa')){
  const l=lead||kid;text=`${name(l)} olha para Rayssa com o rosto abatido.\n\n${name(l)}: — A Isabella nunca soube, né? Ela morreu acreditando que vocês eram melhores amigas.\n\nRayssa: — Eu sei. E essa é a pior coisa que vou carregar comigo.\n\nVocê: — Então conta tudo. Não dá mais pra esconder.\n\nJullia: — Agora todo mundo quer uma confissão? Que engraçado.`;
  choices=[opt('Ouvir a explicação de Rayssa','k10_07',[bond('rayssa',2)]),opt('Exigir que ela conte os detalhes dos ataques','k10_07',[bond('rayssa',-5)])];
 }
 if(id==='k10_10'&&!hasProof(s)){choices=choices.filter(c=>!c.text.startsWith('Mostrar registros')&&!c.text.startsWith('Comparar as contradições'));extras+='\n\nVocê procura registros que consiga apresentar, mas não encontra nada preservado com segurança. Terá que exigir a verdade sem fingir possuir uma prova.';}
 if(dead(s,'rayssa')&&dead(s,'isabella')){if(id==='k10_07')text=`Jullia conta como Rayssa a ajudou a se esconder e forneceu informações antes de tentar impedir os assassinatos.\n\n${name(lead||kid)}: — Você usou a confiança dela e ainda queria matá-la?\n\nJullia: — Todo mundo aqui escolheu guardar algum segredo.`;if(id==='k10_11')text=`Você: — Então a Rayssa era descartável pra você?\n\nJullia: — Ela sabia demais e estava pronta pra me entregar.\n\n${name(lead||kid)}: — E você já não se importava com o que acontecesse com ela.\n\nJullia: — Vocês vieram me julgar ou ouvir a verdade?`;if(id==='k10_24')text=`O grupo procura abrigo perto da margem enquanto a chuva engrossa. A ausência de Isabella e Rayssa é sentida a cada silêncio.\n\n${name(lead||kid)}: — Eu não quero perder mais ninguém.\n\nVocê: — Então a gente fica junto até ter como sair daqui.`;}
 if(id==='k10_09'&&dead(s,'rayssa'))text=`Você: — E o Moisés? Ele sabia da sua sobrevivência?

Jullia: — Rayssa pediu ajuda pra ele quando me encontrou. Moisés conseguiu um lugar pra mim e tudo que eu precisava pra me recuperar.

${name(lead||kid)}: — E a Bella? Sua própria irmã passou meses procurando você!

Jullia: — Bella não sabia. Eu não deixei. Queria distância de todo mundo.

Você: — Isso foi cruel, Jullia.

Jullia: — E o que fizeram comigo foi o quê?`;
 if(id==='k10_10'&&dead(s,'rayssa'))text=`Você se lembra das pistas reunidas na estação do lago.

Você: — Tem coisas que você não explicou, Jullia. Informações chegaram ao assassino quando nem você parecia ter acesso.

${name(kid)}: — Eu ouvi outra voz enquanto tava preso. Não vi quem era.

Jullia: — Vocês tão imaginando coisa.

Você: — Então conta a verdade toda. Quem mais sabia?

Ela não responde.`;
 if(id==='k10_40'&&f.c10_heroi_morto&&dead(s,'rayssa'))text=text.replace('Você: — Eu sei. Mas também quero que contem como começou.',`${name(kid)}: — Eu sei. Mas também quero que contem como começou.`);
 if(id==='k10_07'&&!dead(s,'rayssa')){
  if(f.c10_ouviu_rayssa)extras+=`

Você: — Eu tô ouvindo. Não quer dizer que te perdoei, mas termina.

Rayssa: — Não espero perdão hoje. Só preciso parar de mentir.`;
  else if(f.c10_pressionou_rayssa)extras+=`

Você: — Não foi só medo, Rayssa. Você sabia que os ataques tinham começado.

Rayssa: — Eu sabia que tinha saído do controle. Nunca vou conseguir desfazer isso.`;
 }
 if(id==='k10_12'&&dead(s,'rayssa')&&dead(s,'isabella'))text=`O protagonista lembra das duas amigas mortas e percebe quanto do segredo nunca poderá ser explicado por elas.\n\nVocê: — Você não vai usar o nome de Rayssa e Isabella pra fugir do que fez.\n\nJullia: — Vocês sempre tentam encontrar alguém pra culpar.\n\n${name(lead||kid)}: — Então chega. A gente precisa sair daqui vivo.`;
 if(id==='k10_12'&&romance(s)==='rayssa'&&!dead(s,'rayssa'))extras=`\n\nRayssa: — Tudo que eu senti por você foi de verdade, {heroi}. Eu sei que agora parece mentira, mas não foi.\n\nVocê: — É isso que dói. Eu não sei mais que parte da gente era real.\n\nRayssa: — Eu queria ter te contado. Tive medo de perder você e acabei te perdendo do mesmo jeito.`;
 if(id==='k10_13'&&!avail.length){text=`Sem outro amigo livre para tentar correr até a casa, Jullia recua pela trilha ao ouvir um barulho do outro lado do deck. Você aproveita para tentar libertar ${name(kid)}.\n\n${name(kid)}: — Vai, tenta esse nó. Eu acho que tá quase soltando!\n\nVocê: — Não vou sair daqui sem você!`;choices=[go('k10_14','Terminar o resgate')];}
 if(id==='k10_14'){
  if(f.c10_refem_laco_frouxo)extras+='\n\nO nó que você afrouxou antes cede com muito menos força. Essa tentativa anterior salvou segundos preciosos.';
  choices=choices.filter(c=>!c.text.includes('ferramenta')||['chaveiro','lanterna','chave_arquivo'].some(x=>item(s,x)));
  choices=choices.map(c=>({...c,text:c.text.replace('ferramenta do inventário',item(s,'chave_arquivo')?'a ponta da chave pequena que você guardou':item(s,'lanterna')?'a luz da lanterna para encontrar o nó':'a luz do chaveiro para localizar a fita apertada')}));
  choices=choices.map(c=>({...c,effects:c.effects.map(e=>e[0]==='bond'&&e[1]==='ryan'?[e[0],kid,e[2]]:e)}));
 }
 if(id==='k10_15'||id==='k10_16'||id==='k10_17'||id==='k10_18'||id==='k10_19'){
   if(!first){text=`A trilha está vazia. Não há dois sobreviventes disponíveis para essa perseguição: quem restou permanece junto ao protagonista e ${name(kid)}. O vento move as folhas e Jullia segue os ruídos em direção ao galpão. Não existem novos personagens surgindo aqui.`;choices=[go('k10_20','Continuar com os sobreviventes presentes')];}
   else if(!second){text=text.replaceAll('{par}','você'); if(id==='k10_15')text=`PONTO DE VISTA: ${name(first).toUpperCase()}\n\n${name(first)} corre sozinho pela trilha de serviço. O chão está coberto de folhas e a cerca de arame marca a curva que leva à casa.\n\n${name(first)}: — Eu só preciso chegar naquela porta. Só isso.\n\nJullia aparece na bifurcação.\n\nJullia: — Você nunca foi bom em fugir!\n\nNão há outro amigo correndo ao lado dele: cada decisão afeta a própria fuga.`;choices=choices.map(c=>({...c,text:c.text.replaceAll('{par}',name(first)).replace('Ajudar '+name(first)+' a passar','Passar')}));}
   else {text=text.replaceAll('{par}',name(second));choices=choices.map(c=>({...c,text:c.text.replaceAll('{par}',name(second))}));}
   if(first){text=text.replaceAll('{fugitivo}',name(first));}
   if(id==='k10_16'&&f.c10_trilha_risco1==='alto')extras+='\n\nA escolha anterior custou tempo e deixou marcas de lama na passagem. Jullia consegue seguir as pegadas.';
   if(id==='k10_17'&&f.c10_trilha_risco2==='alto')extras+='\n\nUma das tábuas quebra e o salto acaba exigindo mais esforço. O atalho deixou os dois expostos.';
   if(id==='k10_18'&&f['c10_aparente_'+first])extras=`\n\n${name(first)} recebe um golpe e desaparece no declive, fora do campo de visão. ${second?name(second):'Ninguém'} grita tentando encontrá-lo, mas Jullia bloqueia o caminho. Não conseguem verificar se ainda está respirando.`;
   if(id==='k10_18'&&first&&f['c10_ferido_'+first])extras=`\n\n${name(first)} consegue escapar, mas arrasta uma perna e precisa comprimir o corte com a manga. Continua vivo e capaz de buscar ajuda.`;
   if(id==='k10_19'&&f['c10_aparente_'+first])text=`PONTO DE VISTA: ${name(second||kid).toUpperCase()}\n\n${name(first)} desapareceu no barranco durante o ataque. ${name(second||kid)} alcança a porta lateral, com os ouvidos zunindo do último grito.\n\n${name(second||kid)}: — ${name(first).toUpperCase()}?! ONDE VOCÊ TÁ?!\n\nNinguém consegue voltar à trilha enquanto Jullia percorre o caminho entre as árvores. O corpo não foi encontrado, e a morte não está confirmada.\n\nO telefone fixo da casa está sem linha; eles precisam buscar outra maneira de pedir socorro.`;
 }
 if(['k10_20','k10_21','k10_22','k10_23'].includes(id)){
  const a=g1,b=g2;
  if(!a){text=`A porta do galpão balança com o vento. Nenhum dos amigos entrou ali; os passos de Jullia ecoam sobre a passarela antes de se perderem na direção da casa. Os sobreviventes tentam manter contato pelas poucas mensagens que conseguem enviar.`;choices=[go('k10_24','Voltar para onde o grupo combinou se encontrar')];}
  else if(!b){text=text.replaceAll('{galpao}',name(a)).replaceAll('{companhia}',name(a)); if(id==='k10_20')text=`PONTO DE VISTA: ${name(a).toUpperCase()}\n\n${name(a)} entra no galpão sozinho. A porta emperrada é a única barreira entre ${pron(a)} e Jullia, que ainda está vindo pela trilha.\n\n${name(a)}: — Calma. Só preciso achar uma saída.\n\nO celular mostra uma barra de sinal. Uma mensagem curta talvez consiga alcançar alguém do outro lado da estrada.`; if(id==='k10_21')text=`A mensagem fica presa na tela com a palavra «enviando». ${name(a)} prende a respiração. Um passo do lado de fora, depois outro, anuncia que Jullia deixou a trilha.\n\nJullia: — Eu sei que tem alguém aí dentro.\n\n${name(a)}: — Merda...\n\nUm gancho de metal está preso à parede. No chão, uma caixa de ferramentas parcialmente aberta. A porta dos fundos continua emperrada.\n\n${name(a)}: — Se eu ficar parado aqui, ela me encurrala.`; if(id==='k10_22')text=`O metal rasga parte da lona. Jullia consegue abrir a porta principal, e a lâmina reflete a luz que entra pela fresta. ${name(a)} puxa a caixa de ferramentas para ganhar alguns segundos.\n\n${name(a)}: — Tem uma abertura na lateral... anda, pensa, pensa...\n\nO galpão vira uma confusão de tábuas, lona e respiração curta. Jullia avança direto em ${name(a)}, sem ninguém por perto para distrair o ataque.\n\nO resultado depende do caminho que ${pron(a)} escolheu dentro do galpão. Ferimentos anteriores não decidem sozinhos quem sai dali.`; if(id==='k10_23')text=`Ao sair do galpão, ${name(a)} avista a varanda de serviço da casa. Jullia permanece lá dentro por alguns instantes, procurando por onde ${pron(a)} escapou.\n\nO celular vibra: a localização enviada parece finalmente ter saído. Mas não há confirmação de resposta. A tempestade piora e o acesso principal está coberto de galhos caídos.\n\n${name(a)}: — Se alguém recebeu aquilo, ainda pode ter uma chance.\n\n${pronCap(a)} não espera socorro cair do céu. Precisa continuar em movimento para voltar ao grupo.`;}
  else text=text.replaceAll('{galpao}',name(a)).replaceAll('{companhia}',name(b));
  if(id==='k10_23'&&a&&f['c10_morto_'+a])text=`PONTO DE VISTA: ${name(b||kid).toUpperCase()}\n\n${name(b||kid)} sai cambaleando do galpão e fecha a porta com o ombro. O rosto está molhado de lágrimas.\n\n${name(b||kid)}: — A Jullia... ela matou ${name(a)}. Eu tentei puxar, mas ela não deixou!\n\nDo lado de dentro, não há resposta quando chamam ${name(a)}. O amigo não respondeu às tentativas desesperadas de reanimá-lo.\n\nUm celular vibra indicando que a localização enviada pode ter saído. A estrada permanece bloqueada pela tempestade.`;
  if(id==='k10_22'&&f.c10_galpao_morte)extras=`\n\n${name(f.c10_galpao_morte)} tenta alcançar a saída, mas Jullia o intercepta atrás da bancada. A faca atinge seu torso; ${b?name(b):'Ninguém'} tenta puxá-${FEMALE.has(f.c10_galpao_morte)?'la':'lo'} para longe, mas a perseguidora bloqueia a passagem. ${pronCap(f.c10_galpao_morte)} perde as forças e para de responder. A morte é confirmada quando a ajuda finalmente consegue alcançá-lo.`;
  else if(id==='k10_22'&&a&&f['c10_ferido_'+a])extras=`\n\n${name(a)} sai ${FEMALE.has(a)?'viva':'vivo'}, com um corte profundo no braço. ${b?name(b):pronCap(a)} segura o ferimento contra a roupa para diminuir o sangramento até encontrar ajuda.`;
  if(id==='k10_20'&&f.c10_galpao_perigo===undefined){};
 }
 if(id==='k10_24'&&(dead(s,'isabella')||dead(s,'rayssa')||f.c10_rayssa_status==='jullia')){
   const t=lead||kid;text=`Os sobreviventes que chegaram à cobertura tentam limpar os cortes e escutar o que acontece na casa. ${name(t)} sente o celular vibrar com uma mensagem que não termina de carregar.\n\n${name(t)}: — A gente precisa parar de se separar. Não aguento mais ficar sem saber quem tá vivo.\n\nVocê: — Vamos esperar aqui só o suficiente pra reunir quem conseguir voltar.\n\nOs amigos trancam a porta e tentam recuperar o fôlego.`;
   choices=[go('k10_25','Manter o grupo reunido',[flag('grupo_unido')])];
 }
 if(id==='k10_25'){
   const missing=IDS.filter(x=>dead(s,x)||f['c10_aparente_'+x]).map(name);
   if(missing.length)extras=`\n\nQuando chamam ${missing.join(' e ')}, nenhuma resposta vem da varanda. Os que ficaram reunidos no local não sabem se todos conseguiram chegar até a estrada.`;
 }
 if(id==='k10_26'){
  choices=choices.filter(c=>!c.text.startsWith('Usar o kit')||item(s,'kit')||item(s,'bandagem')).filter(c=>!c.text.startsWith('Usar a lanterna')||item(s,'lanterna')||item(s,'chaveiro')).filter(c=>!c.text.startsWith('Examinar a foto')||item(s,'foto')||item(s,'print')||item(s,'anotacao')||hasProof(s));
  choices=choices.map(c=>({...c,text:c.text.replace('kit de primeiros cuidados do inventário',item(s,'kit')?'kit que você guardou':'atadura do inventário').replace('lanterna do inventário',item(s,'lanterna')?'lanterna que você guardou':'luz do chaveiro').replace('foto ou anotações preservadas',item(s,'foto')?'foto do memorial':item(s,'anotacao')?'anotações sobre o lago':'registros da investigação')}));
 }
 if(id==='k10_27'&&romance(s)&&!dead(s,romance(s))&&kid===romance(s))extras=`\n\n${name(kid)} segura sua mão por um segundo.\n\n${name(kid)}: — Se a gente conseguir sair daqui, eu não quero mais perder tempo fingindo que tá tudo bem. Eu quero viver alguma coisa de verdade com você.`;
 if(id==='k10_30'){
  if(f.c10_rayssa_status==='morta'){}else if(dead(s,'rayssa')){}else if(f.c10_rayssa_escolha==='jullia'&&(s.bonds?.rayssa||50)<48){extras=`\n\nRayssa se afasta do grupo, chorando. A mão de Jullia se estende para ela. A culpa, o medo da prisão e a sensação de não ter mais lugar entre os amigos a fazem hesitar do lado da antiga cúmplice.`;}
  if(!dead(s,'rayssa')&&kid==='rayssa')extras+='\n\nRayssa, ainda com as marcas das amarras nos punhos, se força a ficar em pé. Não consegue esconder a dor, mas continua capaz de escolher.';
 }
 if(id==='k10_31'&&dead(s,'rayssa'))text=`Jullia atravessa a passarela e segura a faca perto do peito, impedindo a saída.\n\n${name(lead||kid)}: — ${heroName(s)}, CUIDADO!\n\nVocê: — Acabou, Jullia. Ninguém mais vai morrer por causa dessa merda!\n\nEla investe contra você perto da grade frouxa. O piso está molhado e os amigos tentam alcançar a escada de serviço. Você precisa decidir como impedir o último ataque.`;
 if(id==='k10_32'){
  if(!hasProof(s)&&!f.c10_evidence)choices=choices.filter(c=>!c.text.includes('imobilizá-la'));
  if(f.c10_rayssa_status==='jullia'&&!dead(s,'rayssa'))extras=`\n\nRayssa observa da margem e não se aproxima para ajudar. Mesmo que tenha escolhido Jullia, ainda parece horrorizada com o que aconteceu.`;
 }
 if(id==='k10_33'){
   const o=f.c10_jullia_fim;
   if(o==='presa')text=`O protagonista e os sobreviventes conseguem conter Jullia usando a própria grade deslocada para afastar a faca. ${name(lead||kid)} ajuda a imobilizar os braços dela sem abandonar os feridos.\n\nJullia: — Vocês acham que isso faz de vocês inocentes?!\n\nVocê: — Não. Mas faz você parar de matar mais gente.\n\nA arma fica fora do alcance de todos. O grupo a mantém sob vigilância até a chegada da polícia ao amanhecer. Jullia está viva e pode ser presa.`;
   if(o==='lago')text=`Jullia força a faca contra o braço do protagonista, mas o apoio da grade parte. Ela cambaleia, tenta agarrar alguém e cai do deck.\n\nJullia: — NÃO!\n\nA água escura a engole. ${name(lead||kid)} se aproxima da borda sem alcançar o corpo.\n\n${name(lead||kid)}: — Você viu se ela voltou à superfície?\n\nVocê: — Não...\n\nO lago fica silencioso. Ainda não existe prova de morte.`;
   if(o==='fuga')text=`Você afasta os amigos da passarela. Jullia recua até a vegetação, protegendo o lado ferido.\n\nJullia: — Isso não termina aqui.\n\nEla desaparece pelo acesso da margem antes que alguém consiga alcançá-la.\n\n${name(lead||kid)}: — A gente não consegue seguir. Tá todo mundo acabado.\n\nO grupo decide priorizar os sobreviventes, mesmo sabendo que a ameaça escapou.`;
 }
 if(id==='k10_34'){
  if(f.c10_jullia_fim==='lago'){
   if(f.c10_pistola){text=`Um braço emerge junto à estaca do deck. Jullia, ferida, se agarra à madeira e puxa o protagonista pela perna.\n\nJullia: — VOCÊ NÃO VAI ME DEIXAR AQUI DE NOVO!\n\nVocê: — ME SOLTA!\n\nVocê joga a pistola para ${name(lead||kid)}, que a segura com as duas mãos e aponta para a borda.\n\n${name(lead||kid)}: — SOLTA ${heroName(s).toUpperCase()}!\n\nUm disparo ecoa. Jullia perde o apoio e desaparece sob a água.\n\n${name(lead||kid)}: — Nos filmes eles dizem pra atirar sempre na cabeça... Eu nunca quis precisar lembrar dessa frase.\n\nA arma cai no chão. Ninguém comemora. O corpo ainda terá de ser localizado para confirmar a morte.`;}
   else{text=`A água se move junto às estacas. Jullia surge de novo, com um corte na testa, e tenta puxar o protagonista para o lago.\n\n${name(lead||kid)}: — CUIDADO! ELA TÁ VIVA!\n\nSem uma arma recuperada, o grupo precisa afastá-la usando os remos soltos e a grade quebrada. Ela cai de volta na água, mas consegue alcançar as sombras da margem.\n\nVocê: — Não dá pra seguir ela. A gente precisa sair daqui!\n\nNinguém confirma se Jullia morreu; sua fuga permanece possível.`;}
  }else if(f.c10_jullia_fim==='presa')text=`Jullia tenta se soltar mais uma vez, mas não consegue alcançar a faca.\n\nJullia: — Vocês vão passar a vida fingindo que eu sou a única culpada?\n\nVocê: — A polícia vai ouvir o que aconteceu naquela estrada. E vai ouvir tudo que você fez depois.\n\n${name(lead||kid)} mantém distância segura enquanto o grupo espera o amanhecer. Não há um novo ataque impossível com ela já imobilizada.`;
  else text=`A trilha está vazia e ninguém vê para onde Jullia foi. O grupo decide não perseguir uma assassina armada pela mata.\n\n${name(lead||kid)}: — Se ela voltar, a gente fica junto. Não vai ter mais ninguém isolado.\n\nVocê: — Fechado. Agora a gente só precisa aguentar até clarear.`;
  if(f.c10_morto_rayssa) {text=`A água se agita. Jullia reaparece junto à estaca do deck e se agarra à borda. Rayssa, que havia escolhido ficar do lado dela, se aproxima para ajudar.\n\nRayssa: — Jullia! Me dá a mão!\n\nJullia: — Você realmente achou que eu ia confiar em você depois de me atacar?\n\nJullia puxa Rayssa, usa a borda para alcançar a faca caída e a atinge violentamente. Rayssa cai entre as tábuas. O sangue se espalha pela madeira molhada. Ela tenta respirar, mas não consegue responder ao grito dos amigos.\n\n${name(lead||kid)}: — RAYSSA! NÃO!\n\nQuando Jullia tenta atacar o protagonista, você entrega a pistola para ${name(lead||kid)}, que dispara para interromper o ataque. Jullia cai na água outra vez. A morte de Rayssa é confirmada ali; ninguém vai fingir que foi só um desmaio.`;}
  if(f.c10_heroi_morto)extras=`\n\nO protagonista recebeu o último golpe tentando proteger ${name(lead||kid)}. Cai entre as tábuas, e os amigos tentam estancar o sangue, chamando seu nome várias vezes. A respiração não volta. Desta vez a morte é confirmada.\n\n${name(lead||kid)}: — NÃO, ${heroName(s).toUpperCase()}! ABRE O OLHO, POR FAVOR!\n\nO ponto de vista passa para ${name(lead||kid)}. Sua partida continua, mas agora os sobreviventes precisarão terminar a história sem o protagonista.`;
 }
 if(id==='k10_35'&&f.c10_heroi_morto){text=`PONTO DE VISTA: ${name(lead||kid).toUpperCase()}\n\n${name(lead||kid)} cobre o corpo de ${heroName(s)} com o casaco seco que restava. Ninguém sabe o que dizer.\n\n${name(lead||kid)}: — Ele não devia ter morrido aqui...\n\n${name(kid)}: — A gente vai contar tudo. Até o que fizeram naquela estrada. Não vou deixar que a história dele vire só mais uma notícia.\n\nA busca pelos desaparecidos continua; os sobreviventes precisam resistir até o amanhecer.`;if(s.hero?.pronouns==='ela')text=text.replace('Ele não devia','Ela não devia').replace('história dele','história dela');}
 if(id==='k10_37'){
  const missing=f.c10_aparente_nome;
  if(!missing){
    text=`Os profissionais examinam a trilha, recolhem os objetos deixados na fuga e conferem com os sobreviventes os nomes de quem estava no deck e no galpão. A luz do amanhecer permite enxergar os estragos da noite.

${speaker(s,lead||kid)}: — Confere a área do galpão também. A gente se separou lá.

Paramédico: — A equipe já está verificando. Vamos levar os feridos ao hospital e registrar o restante com a polícia.`;
    choices=[go('k10_40','Voltar às ambulâncias e conversar sobre o depoimento')];
  }else{
    text=`Uma equipe segue pela trilha onde ${name(missing)} desapareceu durante a perseguição. Você reconhece o lugar pelas marcas na cerca.

${speaker(s,lead||kid)}: — Foi ali. A gente chamou, mas a Jullia não deixou voltar.

Paramédico: — Vamos procurar. Vocês precisam ficar aqui, estão feridos.

O rádio chia. A equipe pede uma maca e os amigos se viram para a trilha.`;
  }
 }
 if(id==='k10_38'){
  const a=f.c10_aparente_nome;
  if(a)text=`A equipe médica voltou ao barranco onde ${name(a)} desapareceu. O rádio chia quando um paramédico pede mais uma maca.

${speaker(s,lead||kid)}: — Encontraram alguém? É ${name(a)}?

Paramédico: — Estamos trazendo uma pessoa. Deixem espaço perto da ambulância!

${f.c10_heroi_morto?`${speaker(s,lead||kid)} sente as mãos tremerem`:'Você sente as mãos tremerem'}, sem saber se ${name(a)} será encontrado com vida.`;
  else text=`Os paramédicos concluem a vistoria da trilha e voltam para os veículos, onde os outros feridos aguardam atendimento.`;
 }
 if(id==='k10_39'){
  const found=f.c10_resgate_milagre||f.c10_resgate_morte;
  if(found){
    text=`Os paramédicos se aproximam da ambulância com a última maca vinda da trilha.

${speaker(s,lead||kid)}: — ${name(found).toUpperCase()}?!

${f.c10_resgate_milagre?`${name(found)} abre os olhos por um instante. Está muito ferid${FEMALE.has(found)?'a':'o'}, mas respirando.

${name(found)}: — Eu... voltei?

${speaker(s,lead||kid)}: — Voltou. Fica acordad${FEMALE.has(found)?'a':'o'}. A ambulância já tá aqui.`:`O lençol térmico desliza o bastante para que o grupo reconheça ${name(found)}. O silêncio ao redor da maca confirma antes mesmo de qualquer médico abrir a boca.`}

${speaker(s,kid)}: — Depois dessa noite, eu juro que não consigo mais ouvir surpresa nenhuma sem achar que vem mais desgraça junto.`;
  }else{
    const a=speaker(s,lead||kid), b=speaker(s,kid);
    text=`A equipe médica termina de montar as macas. Alguns sobreviventes continuam em silêncio, com cobertores térmicos sobre os ombros.

${a}: — Acho que agora acabou mesmo.

${b}: — Eu queria conseguir acreditar nisso tão rápido quanto você.

Um policial se aproxima para explicar como serão os depoimentos.`;
  }
 }
if(id==='k10_40'&&dead(s,'rayssa')){text=`A equipe policial pede ao grupo tudo que sabe sobre Jullia e a participação de Rayssa, cuja morte já foi confirmada.

${speaker(s,lead||kid)}: — A gente vai ter que contar o que ela fez... mesmo que doa.

${f.c10_heroi_morto?`${speaker(s,avail.find(x=>x!==lead)||lead||kid)}: — Não vamos esconder como isso começou. Nem o que a Jullia fez depois.`:'Você: — Eu sei. Mas também quero que contem como isso começou. Sem poupar ninguém.'}

Rayssa já morreu, e o grupo não terá como conversar com ela sobre o depoimento.`;choices=[go('k10_41','Prestar o depoimento',[flag('depoimento')])];}
if(id==='k10_40'&&f.c10_rayssa_status==='jullia'&&f.c10_jullia_fim==='fuga'){
  text=`Rayssa fugiu pela trilha ao lado de Jullia quando percebeu que o grupo não conseguia mais alcançá-las.

${speaker(s,lead||kid)}: — Não acredito que ela foi com a Jullia depois de tudo.

Você: — A gente precisa contar isso. O que ela fez não vai desaparecer porque fugiu.

A polícia registra o depoimento e inicia as buscas. O perdão já não está nas mãos do grupo.`;
  choices=[go('k10_41','Relatar a fuga',[set('rayssa_justica','foragida')])];
}
if(id==='k10_40'&&!dead(s,'rayssa')&&f.c10_rayssa_status!=='jullia'){
  const someone=avail.find(x=>x!=='rayssa')||living(s).find(x=>x!=='rayssa')||null;
  const listener=dead(s,'isabella')?speaker(s,someone):'Isabella';
  const address=dead(s,'isabella')?`${listener}, eu sei que vocês ouviram tudo.`:'Isa... eu sei que pedir desculpa não conserta nada.';
  const response=dead(s,'isabella')?`${listener}: — A gente não vai fingir que você não participou. Mas pode começar não mentindo no depoimento.`:`Isabella: — Eu passei tanto tempo me culpando por aquela noite... e você tava escondendo a verdade de mim. Eu não sei se consigo te perdoar hoje, mas quero ouvir a verdade da sua boca.`;
  const point=f.c10_heroi_morto?`${speaker(s,someone)}: — O que a gente decidir precisa respeitar também quem não saiu daquele lago.`:`Você: — Eu quero ouvir todo mundo antes de decidir. Não vou esconder nada pelas costas de vocês.`;
  text=`As ambulâncias permanecem estacionadas na estrada, e os policiais começam a pedir depoimentos. Rayssa se aproxima devagar.

Rayssa: — ${address} Eu menti pra vocês. Eu ajudei a Jullia e, quando percebi o que ela tava fazendo, fui covarde demais pra denunciar. Desculpa. Eu sei que não dá pra desfazer isso.

${response}

Rayssa: — Se vocês contarem tudo pra polícia, eu não vou fugir. Não quero mais escolher o caminho fácil e deixar outra pessoa pagar.

${point}

Um dos policiais aguarda perto da viatura, sem interromper.`;
  choices=[
   opt('Perdoar Rayssa, mas contar toda a participação dela à polícia','k10_41',[set('rayssa_justica','depoimento'),flag('rayssa_perdoada'),bond('isabella',5)]),
   opt('Perdoar Rayssa e pedir que escondam a ajuda inicial dela','k10_41',[set('rayssa_justica','segredo'),flag('rayssa_perdoada'),bond('isabella',-3),bond('rayssa',4)]),
   opt('Não decidir pelos outros; cada um prestará seu próprio depoimento','k10_41',[set('rayssa_justica','independente')])
  ];
}
if(id==='k10_40'&&!dead(s,'rayssa')&&f.c10_rayssa_status==='jullia'){
  const speakerId=avail.find(x=>x!=='rayssa')||kid;
  text=`Rayssa deixou o grupo durante a última luta. Ninguém sabe ao certo onde ela está, mas todos viram que escolheu não se entregar naquele momento.

${speaker(s,speakerId)}: — Ela olhou pra gente e foi embora. Eu não consigo fingir que não vi.

Um agente anota a descrição de Rayssa e pergunta em que direção ela seguiu.`;
  choices=[go('k10_41','Relatar à polícia o último paradeiro de Rayssa',[set('rayssa_justica','foragida')])];
}

if(id==='k10_41'){
  if(f.c10_heroi_morto)text=`PONTO DE VISTA: ${name(lead||kid).toUpperCase()}\n\n${name(lead||kid)} observa a maca coberta de ${heroName(s)} sendo levada para um dos veículos.\n\n${name(lead||kid)}: — Eu não sei como a gente vai voltar a viver sem ${heroName(s)}.\n\n${name(kid)}: — A gente não vai esquecer. Nem fingir que tá tudo bem.\n\nOs sobreviventes seguem para o hospital, levando consigo a obrigação de contar a verdade.`;
  else if(romance(s)&&!dead(s,romance(s))&&romance(s)!=='rayssa'){
   const love=name(romance(s));text=`${love} senta ao seu lado na ambulância. A manga da roupa está rasgada, e o curativo provisório não esconde o tremor nas mãos.\n\n${love}: — Eu pensei que tinha perdido você. Sério. Teve uma hora que eu não conseguia nem lembrar como respirar.\n\nVocê: — Eu também tive medo. Muito.\n\n${love}: — Quando você melhorar, a gente conversa sobre a gente. Sem assassino, sem mistério, sem mais essa merda toda.\n\nVocê aperta a mão de ${love}. Não é uma promessa de namoro oficial. É uma chance de continuar.`;
  }else if(romance(s)==='rayssa'&&!dead(s,'rayssa')&&f.c10_rayssa_status!=='jullia'&&f.c10_rayssa_justica!=='foragida'){
   text=`Rayssa permanece sentada perto da outra ambulância, sob observação da equipe e da polícia. Você a vê pelo vidro.\n\nRayssa: — Eu não espero que você fique comigo depois disso. Só precisava que você soubesse que aquilo que senti foi real.\n\nVocê: — Eu preciso de tempo. E de verdade, Rayssa. Agora tudo vai ter consequência.\n\nOs profissionais pedem que você entre para o atendimento. O relacionamento não se resolve com um abraço.`;
  }
 }
 if(id==='k10_41'&&!dead(s,'rayssa')&&f.c10_rayssa_status!=='jullia'){
   if(f.c10_rayssa_justica==='depoimento')extras+=`\n\nRayssa espera junto à viatura enquanto um policial prepara o registro. ${dead(s,'isabella')?'O grupo observa em silêncio.':'Isabella permanece perto, sem se aproximar dela.'}\n\nRayssa: — Eu vou contar o que eu fiz. Sem culpar a Jullia por todas as minhas escolhas.`;
   if(f.c10_rayssa_justica==='segredo')extras+=`\n\nRayssa olha para vocês com os olhos cheios d'água.\n\nRayssa: — Eu sei o tamanho do que vocês estão fazendo. Só não quero que isso vire outra mentira que acabe com tudo.\n\n${dead(s,'isabella')?`${speaker(s,lead||kid)}: — As provas ainda existem. Não depende só da gente.`:'Isabella: — Eu concordei em te ouvir. Não confunde isso com confiança recuperada.'}`;
   if(f.c10_rayssa_justica==='independente')extras+=`\n\nRayssa: — Entendi. Eu mesma vou dar meu depoimento. Vocês não precisam decidir por mim.`;
 }
 if(id==='k10_42'){
  const fate=f.c10_jullia_fim==='presa'?'Jullia foi contida viva e será investigada e julgada.':f.c10_jullia_fim==='fuga'||(f.c10_jullia_fim==='lago'&&!f.c10_pistola)?'Jullia desapareceu e ainda está sendo procurada.':'Jullia caiu no lago depois do confronto; as equipes precisam confirmar o que aconteceu com o corpo.';
  extras=`\n\nBella: — E agora? O que aconteceu com a minha irmã?\n\n${name(lead||kid)}: — ${fate}\n\nBella: — Eu só queria saber a verdade. Nunca pensei que fosse doer desse jeito.`;
 }
 if(id==='k10_43'){
  const roster=reunionRoster(s);
  const empty=IDS.filter(x=>dead(s,x)).map(name);
  let rays='';
  if(rayssaAtReunion(s)) rays='Rayssa foi autorizada a responder em liberdade e aceitou o convite, mas o clima ainda é tenso.';
  else if(!dead(s,'rayssa')&&f.c10_rayssa_justica==='depoimento') rays='A cadeira de Rayssa permanece vazia: ela responde em custódia pelo que fez.';
  else if(!dead(s,'rayssa')&&f.c10_rayssa_justica==='independente') rays='Ninguém sabe se Rayssa viria mesmo que tivesse sido chamada; o grupo preferiu não forçar esse reencontro.';
  else if(f.c10_rayssa_justica==='foragida') rays='Ninguém toca muito no nome de Rayssa. A fuga dela ainda pesa no ambiente.';
  const heroOpen=f.c10_heroi_morto?`${speaker(s,lead||kid)} observa a foto de ${heroName(s)} apoiada na estante antes de se sentar.`:`${heroName(s)} chega com um copo na mão e percebe como o silêncio entre risadas já não assusta do mesmo jeito.`;
  text=`QUATRO MESES DEPOIS

A tarde entra pelas janelas de uma casa longe do lago. A mesa está posta com comida simples, copos diferentes e um cuidado silencioso para ninguém se sentir sozinho demais.

${heroOpen}

${empty.length?`Algumas cadeiras ficaram vazias de propósito, lembrando ${empty.join(', ')}.`:'Pela primeira vez em meses, ninguém precisou contar sobreviventes antes de sentar.'}

${rays}

As conversas começam devagar: faculdade, trabalho, terapia, remédios, medo de dirigir à noite, sonho ruim, conta atrasada, qualquer coisa que pareça vida real de novo.`;
  const roster0=roster[0];
  if(!roster0){text=`QUATRO MESES DEPOIS

A casa permanece vazia. Sobre uma mesa, fotografias do grupo mostram os rostos de quem não conseguiu sobreviver ao lago. Não houve confraternização: ninguém restou para organizar um reencontro.

O silêncio não significa que a história foi esquecida. Os depoimentos, os registros e as famílias ainda carregam o que aconteceu em Lakewood.`;}
  choices=roster0?[go('k10_44', roster0==='hero' ? `Contar como ${heroName(s)} passou esses meses` : `Ouvir o que ${name(roster0)} viveu nesses quatro meses`)]:[go('k10_53','Ouvir o podcast sobre Lakewood')];
}
if(/^k10_(44|45|46|47|48|49|50|51|56)$/.test(id)){
  const roster=reunionRoster(s), idx=id==='k10_56'?8:Number(id.slice(4))-44, who=roster[idx];
  const next=(idx>=roster.length-1)?'k10_52':idx===7?'k10_56':`k10_${45+idx}`;
  if(!who){text=`Os pratos estão quase vazios. Alguém recolhe os copos enquanto a conversa muda de assunto, e o encontro se aproxima do fim.`;choices=[go('k10_52','Fazer o brinde antes de ir embora')];}
  else if(who==='hero'){
    const liveElse=roster.find(x=>x!=='hero')||null;
    const partner=liveElse?speaker(s,liveElse):null;
    const hero=heroName(s);
    text=`PONTO DE VISTA: ${hero.toUpperCase()}

${roster.length===1?'Você observa as fotos sobre a estante e percebe que nenhum dos outros conseguiu voltar. Não haverá uma tarde alegre em grupo, mas você decidiu registrar por escrito o que mudou na sua vida desde Lakewood.':`${partner} nota que você ficou mais ${s.hero?.pronouns==='ela'?'quieta':s.hero?.pronouns==='elu'?'quietu':'quieto'} e encosta o copo na mesa.

${partner}: — Você ouviu todo mundo falar. E você, como tá de verdade? Sem precisar fingir que tá tudo ótimo.`}

${roster.length===1?'Você respira fundo. Tem muito para escrever, e dessa vez ninguém vai escolher suas palavras por você.':`${hero}: — Sabe que eu ainda tô descobrindo como responder isso, né?`}`;
    choices=[
      opt('“Terapia ajudou mais do que eu achei que ajudaria.”',next,[set('reuniao_heroi','terapia')]),
      opt('“Ainda tem noite em que eu acordo achando que ouvi passos.”',next,[set('reuniao_heroi','insonia')]),
      opt(roster.length===1?'“Eu quero continuar vivendo, mesmo sentindo falta de todos eles.”':'“O que mais me salvou foi não me afastar de vocês.”',next,[set('reuniao_heroi','grupo')])
    ];
  }else{
    const partnerId=reunionPartner(s,roster,idx);
    const me=speaker(s,who), partner=speaker(s,partnerId);
    const intros={
      isabella:['Isabella gira o copo entre os dedos antes de falar, como se ainda medisse o peso de cada lembrança.','Voltei a estudar e consegui dormir algumas noites sem acordar procurando o celular.'],
      samuel:['Samuel apoia os cotovelos na mesa e respira fundo antes de encarar todo mundo.','Comecei a pensar no que eu quero estudar. Antes eu só queria passar de um dia pro outro.'],
      rayssa:['Rayssa mantém as mãos unidas no colo. Ela parece ter ensaiado esse momento muitas vezes e falhado em todas.','Eu comecei a me tratar e parei de inventar desculpa pra mim mesma. Ainda tô lidando com a vergonha.'],
      ryan:['Ryan tenta brincar com o guardanapo antes de desistir e falar sério por alguns segundos.','Meu braço ainda incomoda às vezes, mas o pior era sair de casa achando que qualquer rua escura ia me fazer travar.'],
      breno:['Breno se serve de refrigerante e demora um pouco antes de entrar no assunto, como quem desaprendeu a se explicar.','Tô procurando um curso pro próximo semestre. E tô tentando parar de viver como se eu devesse justificativa o tempo todo.'],
      allan:['Allan encosta na cadeira, força um meio sorriso e só então aceita falar de si sem transformar tudo em piada.','Eu comecei a cozinhar. Muito mal, aliás. Mas tem sido bom descobrir que ainda dá pra aprender coisa nova.'],
      laisla:['Laisla ajeita a manga da blusa sobre o curativo já quase cicatrizado e encara a mesa montada.','Comprei uma câmera. Eu queria voltar a registrar momentos bons sem sentir que toda festa vai acabar em sangue.'],
      rauanny:['Rauanny tamborila os dedos no copo, inquieta, mas sem fugir da conversa.','Voltei a treinar e arrumei um estágio. Achei que era cedo, mas ficar parada tava me deixando pior.']
    };
    const replies={
      isabella:`Conversei com a família da Jullia. Eu fui tremendo. No fim a gente chorou, brigou um pouco e depois falou de coisa normal. Parecia impossível, mas aconteceu.`,
      samuel:`Pedi desculpa pra algumas pessoas. Umas me ouviram, outras não. E eu entendo. Eu fui um baita idiota com gente que não merecia.`,
      rayssa:`Eu sei que não dá pra separar a minha culpa do resto. Se eu tô aqui hoje é porque vocês decidiram me ouvir até o fim, e eu não vou desperdiçar isso mentindo de novo.`,
      ryan:`Teve dia em que eu fiz piada de tudo e, cinco minutos depois, precisei sentar porque tava tremendo. Descobri que dá pra estar melhorando e ainda estar mal.`,
      breno:`Passei semanas sem responder o grupo. Não era birra. Eu tava tentando descobrir se ainda conseguia confiar em alguém.`,
      allan:`Minha mãe achou que eu enlouqueci quando me viu vendo tutorial de molho. Acho que eu só precisava provar pra mim que ainda existia rotina.`,
      laisla:`Eu também mudei meu quarto de lugar. Parece bobo, mas eu precisava parar de olhar pra mesma janela e lembrar daquela noite o tempo todo.`,
      rauanny:`E eu aprendi a pedir ajuda. Antes eu bancava a forte o tempo todo. Agora, quando eu tô mal, eu falo. Simples assim.`
    };
    let injury=wounded(s,who)?`

${me} ainda respeita os limites da recuperação física. Alguns movimentos continuam lentos, e o tratamento não terminou.`:'';
    let extra='';
    if(who==='breno'&&f.c9_breno_conclusao) extra=`

Breno: — E eu também não esqueci a homenagem. Aquela acusação mexeu comigo pra caralho. Só não quero que aquilo seja tudo que ficou.`;
    if(who==='rayssa'&&partnerId==='isabella') extra+=`

Rayssa: — Isa... obrigada por ter vindo mesmo depois de tudo.

Isabella: — Eu vim porque seguir em frente não é o mesmo que fingir que nada aconteceu.`;
    if(idx===1&&roster[0]==='hero'){
      const h=f.c10_reuniao_heroi;
      const reactions={terapia:`${me}: — Fico feliz que você tenha procurado ajuda. Tem dia que eu também precisava de alguém de fora pra conseguir falar.`,insonia:`${me}: — Se você acordar de madrugada, manda mensagem. Eu não prometo estar acordado sempre, mas vou responder quando vir.`,grupo:`${me}: — Ainda bem que você ficou perto da gente. Eu também tava com medo de acabar perdendo todo mundo depois de sobreviver.`};
      const line=reactions[h]||'';
      if(line)extra=`${line}\n\n`+extra;
    }
    const questions={isabella:'E como foi entrar lá? Imagino que o coração quase saiu pela boca.',samuel:'E você conseguiu falar disso com alguém, ou guardou tudo de novo?',rayssa:'Eu quero entender o que mudou. Sem desculpas, só a verdade.',ryan:'Você tá conseguindo sair pra fazer alguma coisa que gostava?',breno:'E conseguiu voltar a confiar na gente, pelo menos um pouco?',allan:'Tá falando sério que você aprendeu a cozinhar? Preciso ver isso!',laisla:'Você voltou a pegar na câmera depois de tudo?',rauanny:'E como foi o primeiro dia? Deu vontade de fugir ou foi tranquilo?'};
    const memory={allan:'samuel',samuel:'allan',isabella:'rayssa',rayssa:'isabella',laisla:'rauanny',rauanny:'laisla',ryan:'breno',breno:'ryan'}[who];
    const grief=memory&&dead(s,memory)?`\n\n${me} baixa os olhos ao ouvir alguém mencionar ${name(memory)}.\n\n${me}: — Ainda procuro ${name(memory)} nas coisas mais idiotas do dia. E aí lembro. É uma saudade que não passa só porque a gente começou a viver de novo.`:'';
    const leadIn=idx===1&&roster[0]==='hero'&&extra?`${extra}\n\n`:'';
    text=`PONTO DE VISTA: ${me.toUpperCase()}

${intros[who][0]}

${me}: — ${intros[who][1]}

${partner}: — ${questions[who]}

${me}: — ${replies[who]}${injury}${grief}${leadIn&&idx===1?'\n\n'+leadIn:''}${idx===1&&roster[0]==='hero'?'':extra}`;
    choices=[go(next, idx>=roster.length-1?'Fazer um brinde':'Ouvir a próxima pessoa')];
  }
}
if(id==='k10_52'){
  const roster=reunionRoster(s).filter(x=>x!=='hero');
  const toast=speaker(s,roster[0]||lead||kid);
  if(!roster.length){
    text=`A casa permanece silenciosa. ${f.c10_heroi_morto?`As fotografias mostram quem não sobreviveu a Lakewood. Não há ninguém para erguer um brinde naquela tarde.`:`${heroName(s)} ergue um copo diante das fotografias e promete não deixar que os amigos sejam lembrados apenas por como morreram. O futuro será difícil, mas ainda existe um futuro.`}`;
  }else text=`A conversa já passou por trauma, boletos, vestibular, fisioterapia, noites sem dormir e até por um filme horroroso que alguém insistiu em recomendar. O peso continua existindo, mas não ocupa mais a mesa inteira.

${toast}: — Pelos que não puderam estar aqui. E pelos que ainda tão tentando viver sem fingir que nada aconteceu.

${f.c10_heroi_morto?`${speaker(s,lead||kid)} encosta o copo na moldura com a foto de ${heroName(s)} antes de beber.`:`Você acompanha o brinde e sente que, pela primeira vez em muito tempo, sorrir não parece uma traição.`}`;
}
if(id==='k10_53'){
  const guest=['ryan','samuel','allan'].find(x=>!dead(s,x)&&!f['c10_aparente_'+x])||living(s)[0];
  if(guest){text=text.replace('Convidado: — Eu queria dizer',`${name(guest)}: — Eu queria dizer`).replace('Convidado: — Informações',`${name(guest)}: — Informações`);const voices={ryan:'Ryan passa a mão no cabelo, procura uma piada e desiste.',samuel:'Samuel encara o microfone como se não quisesse esconder mais nada.',allan:'Allan tenta sorrir para a câmera e fica quieto por alguns segundos.'};extras='\n\n'+(voices[guest]||`${name(guest)} respira fundo antes de responder.`);} else text=`PODCAST — QUATRO MESES DEPOIS

A apresentadora lê trechos dos depoimentos públicos, já que nenhum dos sobreviventes convidados pôde participar da entrevista.

Apresentadora: — Há informações daquela noite que ainda não conseguimos explicar. Talvez Lakewood esteja longe de conhecer a verdade completa.

Ela desliga o microfone e recolhe uma fotografia que nunca mostrou à câmera.`;
}
if(id==='k10_54'){
  if(f.c10_rayssa_justica==='depoimento'&&!dead(s,'rayssa')&&f.c10_rayssa_status!=='jullia'){
   text=`PÓS-CRÉDITOS — UNIDADE PRISIONAL

Quatro meses depois do massacre, Rayssa entra numa sala de visitas. Permanece em custódia enquanto responde judicialmente por sua participação nos crimes.

Rayssa: — Se for outro jornalista, pode mandar embora. Eu não vou dar entrevista.

Agente: — Não é jornalista. A pessoa pediu pra falar com você pessoalmente.

A porta se abre. Rayssa ergue os olhos — e perde a cor.

Rayssa: — Você?!

Do outro lado da mesa, a pessoa coloca uma fotografia antiga do lago. O rosto continua fora de quadro.

Voz desconhecida: — Jullia achava que sabia quem tava do lado dela. Era muita confiança pra alguém que escondia tanta coisa.

A câmera corta antes que Rayssa responda.`;
  } else text=`PÓS-CRÉDITOS — ESTÚDIO DE PODCAST

A apresentadora guarda o microfone e apaga as luzes. Seu telefone vibra com uma mensagem de um contato salvo apenas como «Projeto».

Mensagem: — Eles ainda não sabem da outra pessoa.

Ela olha para a fotografia de Lakewood, guardada dentro de um envelope.

Apresentadora: — Então é melhor continuar assim... por enquanto.

A câmera não revela a identidade de quem enviou a mensagem.`;
}
if(id==='k10_55'){
  const fate=f.c10_jullia_fim==='presa'?`JULLIA\n• Foi contida viva e será julgada pelos crimes.`:f.c10_jullia_fim==='lago'&&f.c10_pistola?`JULLIA\n• Caiu no lago após o último disparo. A polícia investiga oficialmente a morte.`:`JULLIA\n• Continua desaparecida depois da última fuga pela margem.`;
  const hero=f.c10_heroi_morto?`PROTAGONISTA
• ${heroName(s)} morreu no confronto final.`:`PROTAGONISTA
• ${heroName(s)} sobreviveu ao confronto final.`;
  const losses=IDS.filter(x=>dead(s,x)).map(name),aliveNow=living(s).map(name);
  const surv=aliveNow.length?aliveNow.map(x=>'• '+x).join('\n'):'• Ninguém do grupo original sobreviveu';
  const lost=losses.length?losses.map(x=>'• '+x).join('\n'):'• Nenhuma perda entre os oito amigos';
  text=`O ÚLTIMO GRITO

FIM DA PRIMEIRA TEMPORADA

━━━━━━━━━━━━━━━━
${hero}

${fate}

SOBREVIVENTES
${surv}

PERDAS
${lost}
━━━━━━━━━━━━━━━━

O que aconteceu naquela estrada nunca poderá ser apagado. Mas cada decisão mudou quem conseguiu atravessar a noite.

CONTINUA...`;
}
let finalText=text+extras;
 if(Number(id.slice(4))>=35&&dead(s,kid)){const escaped=name(kid).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');finalText=finalText.replace(new RegExp('(?:^|\\n\\n)'+escaped+': —[^\\n]*','g'),'').replaceAll('{refem}: —','');}
 return {...n,text:replace(finalText,s).replaceAll('{apoio}',name(lead||kid)).replaceAll('{fugitivo}',name(first)).replaceAll('{par}',name(second)).replaceAll('{galpao}',name(g1)).replaceAll('{companhia}',name(g2)).replaceAll('{heroi}',heroName(s)),choices:choices.map(c=>({...c,text:replace(c.text,s).replaceAll('{apoio}',name(lead||kid)).replaceAll('{fugitivo}',name(first)).replaceAll('{par}',name(second))})),location:loc};
}
window.UG10=Object.freeze({dead,living,resolve,enter:whenEnter,hostage});
if(NODES.k9_final)NODES.k9_final.choices=[go('k10_01','CAPÍTULO 10 · O GRAND FINALE')];
})();