/* O Último Grito · V1.0.3 · memória individual de acontecimentos.
 * Cada personagem só recebe fatos que viu, ouviu ou foram confirmados diante dele.
 * O módulo não contém o segredo do mascarado: isso pertence ao roteiro, não a uma inferência do jogador.
 */
(()=>{'use strict';
const PEOPLE=['hero','rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno','bella','moises'];
const CREW=['hero','rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno'];
const empty=()=>({version:1,people:Object.fromEntries(PEOPLE.map(id=>[id,{}])),events:[],entered:[]});
const isDead=(s,id)=>!!s.flags?.['c7_morto_'+id]||!!s.flags?.['c6_morto_'+id]||(id==='allan'&&!!s.flags?.allan_morto_c4);
const apartment=(s)=>['hero','laisla','rauanny','isabella','rayssa',...(!s.flags?.allan_morto_c4?['allan']:[])];
function set(k,person,fact,origin,at){
 if(!PEOPLE.includes(person))return false;
 const bucket=k.people[person]??={};
 if(bucket[fact])return false; // testemunha anterior continua sendo testemunha, mesmo após aviso oficial.
 bucket[fact]={origin,at};
 if(k.events.length<600) k.events.push({person,fact,origin,at});
 return true;
}
function visibleAtWindow(s){
 const f=s.flags||{};
 const possible=['hero','laisla','rauanny',...(f.c6_b_junto?['isabella','rayssa',...(!f.allan_morto_c4?['allan']:[])]:[])];
 return possible.filter(x=>!isDead(s,x));
}
function record(k,s,id,from=''){
 if(!id||!k||k.entered.includes(id+'@'+(from||'')))return false;
 const at=id;let changed=false;
 const add=(person,fact,origin)=>{changed=set(k,person,fact,origin,at)||changed};
 const many=(ids,fact,origin)=>ids.forEach(person=>add(person,fact,origin));
 if(id==='h01'){many(['hero','breno','bella'],'bella:voltou_lakewood','presenciou');if(s.flags?.allan_morto_c4)many(CREW,'morte:allan','acontecimento_anterior');}
 if(id==='h03')many(['hero','breno','bella'],'bella:procurou_jullia_na_mata','conversa');
 if(id==='h17')many(apartment(s),'ataque:apartamento','presenciou');
 if(id==='h21'&&!s.flags?.c6_b_junto)many(['hero','laisla','rauanny'],'nucleo:isabella_rayssa_separadas','telefone');
 if(id==='h28isadeath')add('rayssa','ataque:isabella_ferida_gravemente','presenciou');
 if(id==='h29allandeath')many(['rayssa',...(!isDead(s,'isabella')?['isabella']:[])],'ataque:allan_ferido_gravemente','presenciou');
 if(id==='h34')add('ryan','ataque:apartamento','viu_da_janela');
 if(id==='h38')many([...visibleAtWindow(s),'ryan'],'fuga:escada_entre_blocos','presenciou');
 if(id==='h41'){
   const survivors=visibleAtWindow(s).filter(x=>s.flags?.['c6_crossed_'+x]);
   many(['hero','ryan',...survivors],'fuga:amigos_na_janela','presenciou');
 }
 if(id==='h43'){
   const assembled=['hero','rayssa',...['laisla','rauanny','isabella','allan','ryan'].filter(x=>!isDead(s,x))];
   assembled.forEach(x=>{
     assembled.filter(y=>y!==x).forEach(y=>add(x,'encontro:viu_vivo:'+y,'encontro'));
   });
 }
 if(id==='h44a'){
   const safe=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!isDead(s,x));
   const assembled=['hero','rayssa',...safe];
   safe.forEach(x=>many(assembled.filter(y=>y!==x),'noticia:vivo:'+x,'policia'));
 }
 if(id==='h45'){
   const deadNames=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!!s.flags?.['c6_morto_'+x]);
   const aliveNames=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!isDead(s,x));
   const informed=['hero','rayssa',...aliveNames];
   deadNames.forEach(x=>many(informed,'morte:'+x,'policia'));
   aliveNames.forEach(x=>many(informed.filter(y=>y!==x),'noticia:vivo:'+x,'policia'));
   many(informed,'ataque:mascarado_nao_localizado','policia');
 }
 if(['h46a','h46b','h46c'].includes(id)){
   const deaths=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!!s.flags?.['c6_morto_'+x]);
   const living=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!isDead(s,x));
   deaths.forEach(x=>many(['samuel','breno'],'morte:'+x,'contado_apos_resgate'));
   living.forEach(x=>many(['samuel','breno'].filter(y=>y!==x),'noticia:vivo:'+x,'contado_apos_resgate'));
 }
 if(id==='h47')add('bella','ataque:apartamento','noticiario');
 if(id==='h48c')add('moises','ataque:apartamento','radio_local');
 if(id==='h28isadeath'&&s.flags?.c6_morto_isabella)add('rayssa','morte:isabella','presenciou');
 if(id==='h29allandeath'&&s.flags?.c6_morto_allan)many(['rayssa',...(!isDead(s,'isabella')?['isabella']:[])],'morte:allan','presenciou');
 if(id==='h38_fall'&&s.flags?.['c6_morto_'+s.flags.c6_current])many(['ryan',...visibleAtWindow(s).filter(x=>x!==s.flags.c6_current)],'morte:'+s.flags.c6_current,'presenciou');
 if(id==='h40ryanResult'&&s.flags?.c6_morto_ryan)many(['hero',...visibleAtWindow(s).filter(x=>s.flags?.['c6_crossed_'+x])],'morte:ryan','presenciou');
 if(!k.entered.includes(id+'@'+(from||'')))k.entered.push(id+'@'+(from||''));
 return true;
}
// Os eventos de morte só se concretizam quando o jogador toma a decisão final da cena.
function transition(k,s,from,to,effects=[]){
 if(!k)return;
 for(const effect of effects){
   const [type,key,val]=Array.isArray(effect)?effect:[effect.type,effect.key,effect.value];
   if(type==='cross'){
     // O outro lado viu a chegada deste sobrevivente, mesmo antes do boletim policial.
     const nearby=['ryan',...visibleAtWindow(s).filter(x=>s.flags['c6_crossed_'+x])];
     nearby.filter(x=>x!==key).forEach(x=>set(k,x,'encontro:viu_vivo:'+key,'travessia',from));
   }
   if(type!=='flag'||!String(key).startsWith('c6_ferida_')||!val)continue;
   const injured=String(key).slice('c6_ferida_'.length);
   const nearby=from.startsWith('h38')?['ryan',...visibleAtWindow(s)]:from.startsWith('h29')?['rayssa',...(!isDead(s,'isabella')?['isabella']:[])]:['hero','laisla','rauanny'];
   nearby.forEach(actor=>set(k,actor,'ferimento:'+injured,'presenciou',from));
 }
 if(from==='h28isadeath'&&s.flags.c6_morto_isabella)set(k,'rayssa','morte:isabella','presenciou',from);
 if(from==='h29allandeath'&&s.flags.c6_morto_allan)['rayssa',...(!isDead(s,'isabella')?['isabella']:[])].forEach(x=>set(k,x,'morte:allan','presenciou',from));
 if(from==='h38_fall'){
   const id=s.flags.c6_current;
   if(id&&s.flags['c6_morto_'+id]) ['ryan',...visibleAtWindow(s).filter(x=>x!==id)].forEach(x=>set(k,x,'morte:'+id,'presenciou',from));
 }
 if(from==='h40ryanResult'&&s.flags.c6_morto_ryan)['hero',...visibleAtWindow(s).filter(x=>s.flags['c6_crossed_'+x])].forEach(x=>set(k,x,'morte:ryan','presenciou',from));
}
function replay(a){
 const k=empty(); const sim={hero:a.hero,flags:{}};
 const history=a.history||[];
 const put=(from,to,effects)=>{
  for(const ef of effects||[]){
    const {type,key,value}=Array.isArray(ef)?{type:ef[0],key:ef[1],value:ef[2]}:ef||{};
    if(type==='flag'||type==='set')sim.flags[key]=value;
    if(type==='death')sim.flags['c6_morto_'+key]=true;
    if(type==='cross')sim.flags['c6_crossed_'+key]=true;
  }
  transition(k,sim,from,to,effects);
  record(k,sim,to,from);
 };
 if(!history.length){record(k,sim,a.node,'primeiro_acesso');return k;}
 const first=history[0]?.node;
 if(first)record(k,sim,first,'inicio');
 history.forEach((h,i)=>put(h.node,history[i+1]?.node||a.node,h.effects));
 return k;
}
function restore(saved,a){
 if(saved?.version===1 && saved.people && saved.events && Array.isArray(saved.entered)){
   const k=empty();k.people={...k.people,...saved.people};k.events=saved.events;k.entered=saved.entered;return k;
 }
 return replay(a);
}
function enter(s,id){if(!s.knowledge)s.knowledge=replay(s);return record(s.knowledge,s,id,'cena');}
function go(s,from,to,effects){if(!s.knowledge)s.knowledge=replay(s);transition(s.knowledge,s,from,to,effects);}
function knows(s,person,fact){return s?.knowledge?.people?.[person]?.[fact]||null;}
function list(s,person){return Object.entries(s?.knowledge?.people?.[person]||{}).map(([fact,info])=>({fact,...info}));}
// Reescrita final de continuidade: mostra apenas fatos que aconteceram naquela partida.
function resolve(id,s,node){
 if(!node||!s||(!id.startsWith('h')&&id!=='fim10'))return node;
 const f=s.flags||{}, has=(p,fact)=>!!knows(s,p,fact);
 const name={laisla:'Laisla',rauanny:'Rauanny',isabella:'Isabella',allan:'Allan',ryan:'Ryan',rayssa:'Rayssa'};
 const deadNow=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!!f['c6_morto_'+x]);
 const aliveNow=['laisla','rauanny','isabella','allan','ryan'].filter(x=>!isDead(s,x));
 const first=s.hero?.name?.split(' ')[0]||'Você';
 const human=(ids)=>ids.map(x=>name[x]||x).join(', ');
 let t=null;
 if(id==='h03')t=node.text.replace('Mas Bella não descreveu o atropelamento, o lago nem o pacto. E vocês não vão colocar informações que ela não sabe na sua boca.','Breno olha para você, mas nenhum dos dois menciona a van ou o lago. Bella continua observando a fotografia da irmã, sem imaginar por que o silêncio de vocês ficou tão pesado.');
 if(id==='h29'){
  t=node.text;
  t=t.replace('Allan morreu no arquivo da estrada norte. Seu nome não pertence à lista de pessoas dentro do apartamento. Samuel, longe dali, ainda tenta conviver com a perda.','Rayssa força a grade com o ombro, e Isabella tenta ajudar. O barulho da faca contra a porta impede que elas ouçam os passos dos vizinhos.');
  t=t.replace('Ele sobreviveu ao ataque do capítulo 4, mas continua com o braço sensível. Precisa fugir sem agravar aquela lesão.','Allan aperta o braço ainda dolorido e se abaixa atrás da bancada. Rayssa procura uma saída, respirando depressa.');
 }
 if(id==='h38_danger'){
  const current=f.c6_current||'hero', who=current==='hero'?first:(name[current]||current);
  const shouts={
   hero:'Ryan: — {nome}, ME ESCUTA! NÃO LARGA! EU VOU CHEGAR MAIS PERTO!',
   laisla:'Ryan: — LAISLA! APERTA A BARRA COM AS DUAS MÃOS! NÃO DESISTE!',
   rauanny:'Ryan: — RAUANNY! EU TÔ VENDO VOCÊ! SEGURA, POR FAVOR!',
   isabella:'Ryan: — ISA! ENCOSTA O JOELHO NO FERRO! ISSO, NÃO SOLTA!',
   rayssa:'Ryan: — RAY! EU NÃO VOU SOLTAR A ESCADA! CONTINUA ME OUVINDO!',
   allan:'Ryan: — ALLAN, OLHA PRA MIM! NÃO FECHA OS OLHOS, CARALHO!'
  };
  t=`A escada sofre uma sacudida violenta. ${who} perde o apoio de um dos pés e o joelho bate contra o ferro. O metal parece vibrar dentro do peito.\n\n${shouts[current]||shouts.hero}\n\nO mascarado chega à janela do Bloco A com a faca na mão. A lâmina golpeia a estrutura e espalha pequenas faíscas. Ryan puxa a escada contra a moldura; do outro lado, ${who} tenta não perder a força nos dedos.\n\nUm grito vem do quarto. A porta cede mais um pouco, e o vento leva embora metade das palavras que os amigos estão dizendo.`;
 }
 if(id==='h38_ok'){
  const current=f.c6_current||'hero', who=current==='hero'?first:(name[current]||current);
  if(current==='laisla'&&isDead(s,'rauanny'))t=`Laisla se lança para dentro da janela, caindo sobre os joelhos. Ryan a segura pelos ombros. Ela olha para a escada e tenta gritar o nome de Rauanny, mas a voz falha.\n\nRyan: — LAISLA, OLHA PRA MIM. RESPIRA.\n\nEla empurra a mão dele por um segundo, furiosa com o próprio desespero, depois aperta seu braço como se fosse cair de novo.\n\nDo lado oposto, a faca do mascarado atinge a madeira do quarto. Ryan volta à janela para ajudar quem ainda está lá.`;
  if(current==='rauanny'&&isDead(s,'laisla'))t=`Rauanny termina a travessia quase sem sentir as pernas. Ela entra pela janela e agarra a camiseta de Ryan.\n\nRauanny: — A LAISLA! RYAN, A LAISLA!\n\nRyan não encontra resposta. Olha para o Bloco A e aperta os dentes até o maxilar tremer. Rauanny cai sentada, incapaz de tirar os olhos da janela vazia.\n\nA porta no apartamento sofre outro golpe. Ainda há pessoas precisando atravessar.`;
  if(current==='rayssa'&&isDead(s,'isabella'))t=`Rayssa atravessa agarrada ao metal, chorando tanto que mal enxerga as barras. Ryan a puxa para dentro.\n\nRyan: — RAY, VOCÊ TÁ AQUI. VEM, SENTA.\n\nRayssa: — A Isa... Eu vi a faca. Eu tentei puxar ela, Ryan.\n\nEle se agacha ao lado dela, mas Rayssa não consegue parar de olhar para a escada. O mascarado ainda está no apartamento.`;
  if(t===null && current==='hero'&&s.romanceEscolhido==='ryan')t=`A mão de Ryan encontra a sua antes que seu outro pé deixe a última barra. Ele o puxa com força, e vocês caem juntos para dentro do Bloco B.\n\nRyan: — MEU DEUS... EU ACHEI QUE IA TE PERDER.\n\nEle encosta a testa na sua por um instante, incapaz de disfarçar o tremor no próprio corpo. Não existe tempo para promessas. No apartamento de Laisla, outra pancada atravessa a porta.\n\nRyan se levanta cambaleando e volta para a janela. Ainda há amigos do outro lado.`;
 }
 if(id==='h38_done'){
  const seen=['laisla','rauanny','isabella','allan'].filter(x=>has('hero','morte:'+x));
  t=`A janela do Bloco A fica vazia. Ryan segura a escada por alguns segundos, com as mãos rígidas, antes de recuar.

${seen.length?'Você ainda ouve o grito de '+human(seen)+'. É impossível olhar para o pátio sem lembrar da queda.':'Lá embaixo, as luzes de uma viatura iluminam o pátio. Você tenta localizar a porta da lavanderia, mas não vê ninguém saindo.'}

A polícia está chegando. Os amigos que seguiram pela cozinha ainda precisam ser localizados. Ryan fecha os olhos, respira fundo e se afasta da janela.`;
 }
 if(id==='h39'){
  const people=aliveNow.filter(x=>x==='laisla'||x==='rauanny').map(x=>name[x]);
  const seen=people.length?people.join(' e ')+' tentam recuperar o ar junto à parede.':'A parede atrás de Ryan está vazia. Você não consegue olhar para a janela sem se lembrar do que acabou de acontecer.';
  t=`Ryan recua da janela. A escada continua presa do lado de fora, e o mascarado aparece no Bloco A, observando os ferros sem avançar.

Ryan: — A gente... a gente conseguiu sair.

${seen}

O técnico pede que ninguém volte para a janela. Ryan abre o celular para procurar uma notícia de quem ficou na lavanderia. A máscara se inclina sobre o parapeito oposto, e um barulho de metal arrastado corta o silêncio.`;
 }
 if(id==='h40observe'){
  t=`Ryan mantém os olhos na janela do outro prédio. Você conversa com a portaria pelo telefone, tentando ouvir as informações entre os gritos no pátio.

${has('ryan','encontro:viu_vivo:isabella')?'Ryan: — A Isa já saiu. Cadê o resto do pessoal da cozinha?':'Ryan: — A Isa tava na cozinha. A gente ainda não sabe se ela conseguiu sair por lá.'}

Você: — Os funcionários estão procurando. Não chega perto dessa escada de novo.

O mascarado desaparece da janela. Ryan se inclina um pouco para tentar enxergar o quarto e o ferro vibra sob o vento.`;
 }
 if(id==='h43'){
  const pairs=isDead(s,'laisla')&&isDead(s,'rauanny')?'O cobertor que a moradora oferece fica dobrado entre duas cadeiras vazias. Você encara a porta, esperando passos que ainda não vieram.':isDead(s,'laisla')?'Rauanny entra com ajuda de uma paramédica. Recusa água, aponta para a saída e pergunta por Laisla mais de uma vez.':isDead(s,'rauanny')?'Laisla se senta na ponta do sofá, com os dedos sangrando por apertar um pedaço do próprio casaco. Ela olha para cada pessoa que entra, esperando encontrar Rauanny.':'Laisla e Rauanny chegam juntas. Laisla tenta soltar a mão da amiga para pegar um copo, mas Rauanny a segura de novo.';
  const ray=has('rayssa','morte:isabella')?`Rayssa chega apoiada numa funcionária. O sangue seco nas mãos dela não é seu.\n\nRayssa: — EU VI O QUE ACONTECEU COM A ISA! CADÊ ELA? PRA ONDE LEVARAM ELA?\n\nA funcionária pede que Rayssa se sente, mas ela recua. Nenhuma das duas consegue dizer com certeza o que a equipe encontrou.`:isDead(s,'isabella')?'Rayssa surge do corredor de serviço, procurando Isabella entre os rostos da sala. Quando não a encontra, começa a perguntar aos policiais se ainda estão revistando a cozinha.':'Isabella entra quase tropeçando, e Rayssa a abraça antes que ela termine de cruzar a porta. A amiga segura seu rosto entre as mãos, conferindo se está machucada.';
  t=`Uma moradora abre a porta para os sobreviventes e distribui cobertores. Há água sobre a mesa e marcas de sangue no piso claro. A sirene continua ecoando entre os blocos.\n\n${pairs}\n\n${ray}\n\nUm policial entra com uma folha de nomes e pede silêncio. Ele confirma que a equipe de resgate ainda está terminando a vistoria. Os amigos se calam quando o rádio chia outra vez.`;
 }
 if(id==='h44c'){
  t=has('rayssa','morte:isabella')?`Rayssa aperta o telefone de Isabella que conseguiu trazer da lavanderia. A tela está trincada.\n\nRayssa: — Eu vi ele atingir ela. EU VI. Mas ninguém me fala pra onde levaram a Isa.\n\nVocê: — O policial vai voltar com os nomes. Eu fico aqui com você.\n\nRayssa: — Não fala pra eu me acalmar. Por favor.\n\nVocê senta perto sem tentar pegar o aparelho. Ela começa a chorar em silêncio quando a porta se abre de novo.`:isDead(s,'isabella')?`Rayssa levanta do sofá assim que vê você.\n\nRayssa: — A Isa tava atrás de mim. Eu me virei um segundo, e...\n\nEla aponta para o corredor. Ninguém responde. A equipe ainda está verificando os cômodos, e você não consegue prometer nada.\n\nVocê segura a mão dela até o policial retornar.`:`Rayssa se ajoelha ao lado de Isabella. As duas estão cobertas por uma manta térmica.\n\nIsabella: — Ray, eu tô aqui. Você pode parar de contar meus dedos.\n\nRayssa: — Cala a boca e deixa eu olhar.\n\nA voz de Rayssa falha. Isabella aproxima a testa da dela. Elas ficam assim até alguém chamar seus nomes para o atendimento.`;
 }
 if(id==='h45'){
  const reactions={
   laisla:!isDead(s,'rauanny')?'Rauanny: — NÃO! ELA TAVA COMIGO! EU NÃO VOU DEIXAR ELA LÁ!':'O nome de Laisla faz você apoiar a mão na parede. Rauanny também não está na sala; ninguém consegue oferecer o consolo que as duas ofereceriam uma à outra.',
   rauanny:!isDead(s,'laisla')?'Laisla: — NÃO, PORRA! ELA TAVA DO MEU LADO! EU TAVA SEGURANDO ELA!':'Você ouve o nome de Rauanny e fecha os olhos. O cheiro de macarrão da cozinha parece voltar por um instante, cruelmente comum.',
   isabella:'Rayssa: — Não... Não fala o nome dela assim. Não fala como se fosse só um nome numa folha.\n\nRayssa se curva para frente, com as duas mãos sobre a boca.',
   allan:'Rayssa se encosta na parede e começa a chorar. Samuel ainda não chegou para ouvir a notícia sobre o melhor amigo.',
   ryan:!isDead(s,'laisla')?'Laisla: — O RYAN NÃO! ELE TAVA NA OUTRA JANELA!':!isDead(s,'rauanny')?'Rauanny: — NÃO, RYAN! NÃO...':'Você se lembra da mão de Ryan estendida na janela e sente o estômago se contrair.'
  };
  const report=deadNow.length?`Policial: — Sinto muito. A equipe confirmou ${deadNow.length===1?'a morte de':'as mortes de'} ${human(deadNow)}.\n\n${deadNow.map(x=>reactions[x]).join('\n\n')}`:`Policial: — Conferimos todos os nomes. Todos conseguiram sair vivos. Alguns vão precisar ser levados ao hospital.\n\nLaisla começa a chorar de alívio. Rauanny a abraça, e alguém finalmente se permite sentar sem olhar para a porta.`;
  t=`O policial volta com a folha de atendimento. Do lado de fora, paramédicos passam com macas e bolsas de equipamentos. O rádio para de chiar.\n\n${report}\n\nBreno e Samuel entram pela porta após serem liberados na portaria. Ambos param ao ver o estado da sala. ${f.allan_morto_c4?'Samuel se detém diante de uma cadeira vazia; o luto de semanas volta a apertar seu peito.':'Samuel procura Allan entre os curativos e as mantas, sem conseguir reconhecer os rostos de imediato.'}\n\nBreno: — Meu Deus... o que aconteceu aqui?\n\nVocê abre a boca, mas precisa respirar fundo antes de conseguir responder.`;
 }
 if(id==='h46b'){
  const sam=f.allan_morto_c4?'Samuel olha para a cadeira vazia mais próxima.\n\nSamuel: — Quando vocês falaram de mais um ataque, só consegui pensar naquela noite do arquivo. Eu não aguento perder mais ninguém.':f.c6_morto_allan?'Samuel ouve o nome de Allan da sua boca e dá um passo para trás.\n\nSamuel: — NÃO... ELE TINHA CONSEGUIDO ESCAPAR! EU DEVIA TER VINDO!':'Allan entra com o braço enfaixado e para na frente dele. Samuel o agarra num abraço forte, os dois ofegantes.\n\nAllan: — Ei... devagar, porra. Tá doendo.\n\nSamuel: — DESCULPA. DESCULPA, CARA.';
  t=`Samuel entra no apartamento sem conseguir controlar a respiração. Breno fica na porta, ouvindo as informações do policial.\n\n${sam}\n\nVocê se aproxima devagar. Samuel enxuga o rosto com a manga da blusa, sem conseguir sustentar o olhar.\n\nVocê: — Senta aqui comigo. Não precisa falar tudo agora.\n\nEle concorda e fica ao seu lado, enquanto as equipes continuam atendendo os outros.`;
 }
 if(id==='h49'){
  const lost=deadNow.length?`Ao abrir o grupo de mensagens, você vê as conversas antigas de ${human(deadNow)}. As últimas mensagens continuam ali, sem que nenhuma resposta possa mudar o que aconteceu.`:'A cada nova mensagem, um nome aparece com a confirmação de que chegou ao hospital ou conseguiu falar com a família.';
  t=`Os feridos são levados em ambulâncias; quem consegue andar fica para prestar depoimento. Breno oferece uma carona quando a polícia permite que você vá embora. Samuel permanece perto da portaria. Bella observa o movimento das equipes sem se aproximar das macas.\n\n${lost}\n\nVocê guarda a foto enviada de dentro do apartamento. Nela, todos ainda estão à mesa, antes da invasão, antes da escada e dos gritos. A paisagem de Lakewood passa pela janela enquanto Breno dirige em silêncio.`;
 }
 if(id==='h50a'){
  const replies=[];
  if(!isDead(s,'laisla'))replies.push('Laisla responde do hospital. Diz que estão cuidando dos machucados e pergunta se você chegou em casa.');
  if(!isDead(s,'rauanny'))replies.push('Rauanny envia um áudio curto. A voz sai rouca; ela pede que ninguém fique sozinho nesta noite.');
  if(!isDead(s,'ryan'))replies.push('Ryan manda uma mensagem cheia de erros de digitação. Você consegue imaginar a mão dele ainda tremendo sobre o teclado.');
  if(!isDead(s,'isabella'))replies.push('Isabella envia uma foto do copo de água que a enfermeira obrigou ela a beber. Acrescenta: “tô aqui. respirando.”');
  if(!isDead(s,'allan'))replies.push('Allan responde com poucas palavras: “cheguei. depois eu falo, tá?”');
  t=`Você escreve para os amigos que saíram vivos do prédio, perguntando se foram atendidos e se precisam de alguma coisa. Não insiste quando alguém demora a responder.\n\n${replies.join('\n\n')}\n\n${deadNow.length?'O celular fica pesado na sua mão quando você encontra as conversas de '+human(deadNow)+'. Você não apaga nenhuma mensagem.':'Quando a última resposta chega, você encosta a cabeça no banco. Ninguém parece bem, mas todos conseguiram voltar.'}\n\nBreno pede que você deixe o telefone de lado por alguns minutos. Você obedece, apesar de continuar ouvindo o som da notificação na cabeça.`;
 }
 if(id==='h12private')t=node.text.replace('Eu sei que você decidiu não namorar ninguém agora.','Eu sei que você não tá querendo se envolver com ninguém agora.').replace('não é preciso viver um romance para ter gente em quem se apoiar.','você tem gente com quem contar, mesmo sem um romance.');
 if(id==='h50c')t=node.text.replace('Breno segura sua mão por alguns instantes, caso isso seja apropriado à relação entre vocês. Depois deixa que o silêncio exista sem parecer abandono.',s.romanceEscolhido==='breno'?'Breno alcança sua mão sobre o banco e entrelaça os dedos aos seus. Você aperta de volta, sem precisar definir aquilo em palavras.':'Breno toca seu ombro com cuidado, perguntando com o olhar se você quer companhia. Você concorda e ele volta a prestar atenção na estrada.');
 if(id==='h51'){
  const last=isDead(s,'laisla')?'Você ainda consegue ouvir a voz de Laisla pedindo ajuda atrás da porta. O silêncio depois é pior.':'Você ainda consegue ouvir Laisla gritando para Ryan segurar a escada, enquanto Rauanny tentava encontrar apoio na janela.';
  t=node.text.replace('Nesta noite, você ainda consegue ouvir Laisla pedindo que Ryan não deixe a escada cair.',last);
 }
 return t===null?node:{...node,text:t};
}

window.UGKnowledge={empty,restore,replay,enter,go,knows,list,resolve,PEOPLE,CREW};
})();
