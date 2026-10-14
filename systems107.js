/* V1.0.7 · Sistemas narrativos persistentes para os capítulos 0–6.
   Regras locais, sem rede; segredos do roteiro não são revelados pela interface. */
(()=>{'use strict';
const ids=['rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno'];
const names={rayssa:'Rayssa',ryan:'Ryan',laisla:'Laisla',samuel:'Samuel',rauanny:'Rauanny',allan:'Allan',isabella:'Isabella',breno:'Breno',bella:'Bella'};
const clamp=(x,a=0,b=100)=>Math.min(b,Math.max(a,x));
const pair=(a,b)=>[a,b].sort().join(':');
const empty=()=>({version:1,trust:{},suspicion:{},secrets:{},personality:{coragem:50,empatia:50,cautela:50,franqueza:50},inventory:[],scenes:{},autonomy:{},responses:{},choices:{},events:[],timedOff:false});
function restore(raw,save){const r=raw&&typeof raw==='object'?raw:{};const o=empty();o.trust={...(r.trust||{})};o.suspicion={...(r.suspicion||{})};o.secrets={...(r.secrets||{})};o.personality={...o.personality,...(r.personality||{})};o.inventory=Array.isArray(r.inventory)?r.inventory.filter(x=>typeof x==='string').slice(0,40):[];o.scenes={...(r.scenes||{})};o.autonomy={...(r.autonomy||{})};o.responses={...(r.responses||{})};o.choices={...(r.choices||{})};o.events=Array.isArray(r.events)?r.events.slice(-120):[];o.timedOff=Boolean(r.timedOff);return o;}
const state=s=>s.social107??(s.social107=restore(null,s));
function chapter(s){const label=window.NODES?.[s?.node]?.chapter||'';if(label.startsWith('PRÓLOGO'))return 0;const m=label.match(/CAPÍTULO\s+0?(\d+)/);return m?Number(m[1]):0;}
const stage=s=>Number((s.node||'').match(/^[a-z](\d+)/)?.[1]||0);
const dead=(s,id)=>Boolean((id==='allan'&&s.flags?.allan_morto_c4)||s.flags?.['c6_morto_'+id]);
function pairTrust(s,a,b){const k=pair(a,b);return clamp(55+(state(s).trust[k]||0));}
function pairSuspicion(s,a,b){return clamp(12+(state(s).suspicion[pair(a,b)]||0));}
function adjust(s,a,b,trust=0,suspicion=0){const x=state(s),k=pair(a,b);x.trust[k]=clamp((x.trust[k]||0)+trust,-55,45);x.suspicion[k]=clamp((x.suspicion[k]||0)+suspicion,-12,88);}
function item(s,id){return state(s).inventory.includes(id)}
function add(s,id){if(!item(s,id))state(s).inventory.push(id)}
function moment(s,label,kind='decisão'){state(s).events.push({label,kind,chapter:chapter(s)});state(s).events=state(s).events.slice(-120)}
function trait(s,k,d){const x=state(s).personality;x[k]=clamp((x[k]??50)+d)}
const objects={chaveiro:{name:'Chaveiro de Samuel',desc:'Pequena lanterna que ilumina cantos próximos. Encontrado na van.'},foto:{name:'Foto do memorial',desc:'Fotografia com reflexos que podem ajudar a reconstruir a circulação no memorial.'},print:{name:'Captura de mensagem',desc:'Registro de conversa preservado no telefone, com data e remetente.'},bandagem:{name:'Atadura limpa',desc:'Material simples para proteger pequenos ferimentos até receber cuidados.'},lanterna:{name:'Lanterna de bolso',desc:'Ilumina corredores e áreas escuras.'},chave_arquivo:{name:'Chave do armário',desc:'Chave pequena encontrada junto a documentos antigos.'},recorte:{name:'Recorte da homenagem',desc:'Papel com horários anotados a lápis.'},fita:{name:'Fita isolante',desc:'Pode prender algo solto ou reforçar uma fixação temporária.'},anotacao:{name:'Anotações sobre o lago',desc:'Informações parciais reunidas pelo grupo; não provam a autoria dos ataques.'},kit:{name:'Kit básico de primeiros cuidados',desc:'Gaze e material de contenção, insuficientes para tratar ferimentos graves.'}};
// As oportunidades são eventos concretos nos capítulos existentes: não mudam os IDs das cenas.
const events={
 p07:{title:'Antes de a festa piorar',intro:'Samuel deixou o chaveiro sobre uma mesa. Do jardim, você vê Jullia procurar a irmã perto da porta.',options:[
  {id:'guardar',text:'Guardar o chaveiro para devolver a Samuel',result:'Você enfia o chaveiro no bolso. A pequena luz ainda funciona.',item:'chaveiro',trait:['cautela',3],trust:['samuel',3,0]},
  {id:'jullia',text:'Tentar perceber por que Jullia está tão inquieta',result:'Jullia encara o corredor por alguns segundos e força um sorriso ao notar seu olhar.',trait:['empatia',4],trust:['rayssa',2,0]}]},
 p15:{title:'O silêncio dentro da van',intro:'Os amigos entram na van. Você vê Samuel procurar a chave e Allan observá-lo com preocupação.',options:[
  {id:'falar',text:'Perguntar a Samuel se ele está mesmo bem para dirigir',result:'Samuel não responde imediatamente. Allan aproveita a pausa para insistir que ele tenha cuidado.',trait:['franqueza',4],trust:['samuel',-4,2]},
  {id:'guardar',text:'Guardar sua preocupação para não causar uma discussão',result:'Você aperta o cinto e observa a estrada pela janela, tentando afastar o desconforto.',secret:'calou_antes_estrada',trait:['cautela',3]}]},
 c03:{title:'Um detalhe na homenagem',intro:'No jardim, as fotografias de Jullia estão distribuídas ao redor de uma mesa de lembranças.',options:[
  {id:'fotografar',text:'Fotografar os registros expostos',result:'Você fotografa a mesa e percebe um reflexo perto da entrada lateral.',item:'foto',clue:'convidados_observados',trait:['cautela',3]},
  {id:'acolher',text:'Oferecer ajuda a Helena Gomes',result:'Helena agradece baixinho. O gesto lhe parece pequeno diante do que vocês guardam.',trait:['empatia',5],trust:['rayssa',3,0]}]},
 c10:{title:'O que dizer aos amigos?',intro:'O bilhete circula de mão em mão. Samuel parece disposto a discutir, enquanto Isabella pede que ninguém fale alto.',options:[
  {id:'aberto',text:'Admitir que o grupo precisa parar de esconder coisas',result:'Isabella encara você como se quisesse discutir, mas concorda que o silêncio já fez estragos.',trait:['franqueza',6],trust:['isabella',5,-3]},
  {id:'silencio',text:'Pedir que não contem nada a pessoas de fora',result:'Samuel respira aliviado. Rayssa se afasta um pouco, com o olhar preso no lago.',secret:'pediu_silencio_memorial',trait:['cautela',4],trust:['samuel',4,2]}]},
 d03:{title:'Uma parada no centro',intro:'Na vitrine da farmácia há ataduras e pilhas para lanternas. A chuva ainda escorre pelo vidro.',options:[
  {id:'comprar',text:'Comprar uma atadura e guardar na mochila',result:'Você coloca uma atadura fechada na mochila. Espera sinceramente não precisar dela.',item:'bandagem',trait:['cautela',3]},
  {id:'foto',text:'Registrar a imagem do cartaz e as anotações próximas',result:'O aviso mostra o número para denúncias e um horário rabiscado no canto.',item:'recorte',trait:['cautela',2]}]},
 d14:{title:'Uma mensagem difícil de mostrar',intro:'Isabella pede que ninguém apague nada. No seu celular há um trecho de conversa cuja data pode ser importante.',options:[
  {id:'mostrar',text:'Enviar a captura da conversa para Isabella',result:'Isabella promete conferir o horário antes de dizer qualquer coisa ao grupo.',item:'print',clue:'conversa_grupo_preservada_c6',trait:['franqueza',3],trust:['isabella',6,-4]},
  {id:'esconder',text:'Guardar a conversa e não comentar por enquanto',result:'Você bloqueia a tela. Isabella percebe o movimento, mas não pergunta o que houve.',secret:'escondeu_print_c2',trait:['cautela',4],trust:['isabella',-5,9]}]},
 e05:{title:'Antes de seguir pela estrada',intro:'A estrada está escura e os faróis iluminam apenas o acostamento.',options:[
  {id:'lanterna',text:'Levar a pequena lanterna do porta-luvas',result:'A lanterna cabe na palma da mão. Você testa a luz duas vezes.',item:'lanterna',trait:['cautela',3]},
  {id:'alerta',text:'Avisar a todos para não se separarem',result:'Rauanny revira os olhos, mas Ryan concorda que ninguém deveria ficar para trás.',trust:['ryan',5,-2],trait:['empatia',2]}]},
 e09:{title:'Um ruído do lado de fora',intro:'Algo bate contra o metal da estrutura. Os outros hesitam entre investigar e recuar.',options:[
  {id:'escutar',text:'Esperar em silêncio para identificar os passos',result:'Você percebe que o barulho muda de direção antes de desaparecer.',trait:['cautela',4]},
  {id:'avisar',text:'Pedir ajuda imediatamente',result:'O grupo se reúne mais depressa, embora ninguém saiba se o som veio da mata ou do cais.',trust:['rauanny',3,-2],trait:['coragem',3]}]},
 f03:{title:'Preparar a investigação',intro:'Na mesa há um armário com documentos, papéis soltos e uma chave esquecida.',options:[
  {id:'chave',text:'Guardar a chave para conferir o armário depois',result:'Você pega a pequena chave e a enrola num lenço para não perdê-la.',item:'chave_arquivo',trait:['cautela',3]},
  {id:'anotar',text:'Anotar os horários mencionados pelos amigos',result:'Breno ajuda a revisar os horários e você registra alguns detalhes.',item:'anotacao',trust:['breno',4,-2]}]},
 f09:{title:'Algo útil no caminho',intro:'Próximo à saída há um rolo de fita isolante e uma rota mal iluminada.',options:[
  {id:'fita',text:'Guardar a fita isolante',result:'Você recolhe a fita sem perder de vista a saída.',item:'fita',trait:['cautela',3]},
  {id:'samu',text:'Chamar Samuel para que ninguém fique sozinho',result:'Samuel responde de longe. A voz dele soa mais nervosa do que tenta demonstrar.',trust:['samuel',4,-2],trait:['empatia',2]}]},
 g01:{title:'Uma escolha antes da reunião',intro:'O telefone vibra com mensagens do grupo. Você ainda não sabe o que os amigos conseguiram descobrir.',options:[
  {id:'falar',text:'Mandar uma mensagem sincera dizendo que está preocupado',result:'Ryan responde que também está com medo. A franqueza diminui um pouco a distância entre vocês.',trust:['ryan',4,-2],trait:['franqueza',4]},
  {id:'ocultar',text:'Esconder o quanto a noite anterior te abalou',result:'Você escreve «Tô bem» e apaga o restante. O silêncio parece mais fácil por enquanto.',secret:'escondeu_medo_c5',trait:['cautela',2]}]},
 g02:{title:'Ao entrar na casa',intro:'Na mesa estão copos, uma caixa de lenços e papéis de investigação.',options:[
  {id:'escutar',text:'Sentar com Samuel e escutar antes de falar',result:'Samuel demora a começar, mas se sente menos pressionado quando percebe que você não quer interrogá-lo.',trust:['samuel',5,-3],trait:['empatia',4]},
  {id:'recorte',text:'Conferir o recorte deixado perto dos copos',result:'Há horários rabiscados no verso. Você guarda o papel para comparar depois.',item:'recorte',trait:['cautela',3]}]},
 h07:{title:'O apartamento antes do jantar',intro:'O apartamento parece seguro, mas você nota o kit de primeiros cuidados perto do banheiro.',options:[
  {id:'kit',text:'Pedir a Laisla o kit de primeiros cuidados',result:'Laisla entrega uma bolsinha de gaze e fita. «Só não me inventa de precisar disso», resmunga.',item:'kit',trust:['laisla',3,-1]},
  {id:'conversa',text:'Perguntar a Isabella se ela percebeu algo estranho na entrada',result:'Isabella diz que a porta do serviço estava encostada quando chegou. Não sabe quem a deixou assim.',clue:'grade_servico_c6',trust:['isabella',4,-2]}]},
 h17:{title:'O corredor e o barulho',intro:'A porta treme com uma pancada. Alguém grita no apartamento e a sombra do mascarado cruza o corredor.',options:[
  {id:'avisar',text:'Gritar para os outros recuarem',result:'Seu aviso faz os amigos se afastarem da passagem antes que a porta ceda.',trait:['coragem',4],trust:['laisla',3,-2]},
  {id:'recuar',text:'Recuar em silêncio e procurar abrigo',result:'Você se afasta da passagem e evita se expor, mas perde a oportunidade de avisar imediatamente.',trait:['cautela',3],trust:['laisla',-2,3]}]}
};
// Objetos podem ser usados apenas quando a história oferece uma oportunidade real.
const uses={
 p17:[['chaveiro','Acender a lanterna do chaveiro','Você ilumina brevemente o painel da van. Samuel pede que você não direcione a luz aos olhos dele.',null]],
 c10:[['foto','Examinar a fotografia antes de voltar ao grupo','No reflexo da vidraça você reconhece a entrada lateral da propriedade e guarda a imagem.', 'foto_recente_grupo']],
 d16:[['chaveiro','Iluminar a saída com o chaveiro','Você usa a luz fraca para localizar a borda do caminho. O grupo consegue ver onde pisar.',null]],
 e09:[['lanterna','Iluminar a passagem ao lado do galpão','O facho de luz revela uma abertura na cerca e permite que os amigos se orientem.',null]],
 f09:[['fita','Usar a fita para prender a alça solta da mochila','A alça volta a ficar presa. Você consegue correr sem segurar a mochila com uma mão.',null]],
 g02:[['recorte','Mostrar a anotação de horários a Isabella','Isabella examina o papel e promete comparar os horários com as mensagens.', 'conversa_grupo_preservada_c6']],
 h07:[['print','Comparar a captura com as mensagens do grupo','A captura mostra detalhes que valem ser preservados para confrontar depoimentos.', 'conversa_grupo_preservada_c6']],
 h43:[['kit','Oferecer o kit de primeiros cuidados à equipe de resgate','Uma socorrista agradece, mas lembra que os feridos precisam de avaliação médica. Você ajuda a organizar as gazes.',null],['bandagem','Oferecer a atadura a um amigo ferido','Você entrega a atadura limpa para proteger o ferimento até a chegada de atendimento adequado.',null]]
};
function useOptions(s,node){return (uses[node]||[]).filter(([id])=>item(s,id)&&!state(s).scenes['use:'+node+':'+id]).map(([id,label])=>({id,label}));}
function useItem(s,node,id){const u=uses[node]?.find(x=>x[0]===id);if(!u||!item(s,id)||state(s).scenes['use:'+node+':'+id])return false;const [,label,result,clue]=u;state(s).scenes['use:'+node+':'+id]={id,result};if(clue&&!s.clues.includes(clue))s.clues.push(clue);if(node==='h43'&&!dead(s,'rauanny')&&s.flags?.c6_ferida_rauanny)s.flags.c6_rauanny_atendida=true;if(node==='f09')s.flags.v107_mochila_presa=true;if(node==='d16')s.flags.v107_trilha_iluminada=true;if(node==='e09')s.flags.v107_lanterna_marina=true;moment(s,result,'objeto');return true;}
function usedText(s,node){return (uses[node]||[]).map(([id])=>state(s).scenes['use:'+node+':'+id]?.result).filter(Boolean).join('\n\n');}
function opportunity(s,node){const e=events[node];return e&&!state(s).scenes[node]?e:null;}
function act(s,node,id){const e=opportunity(s,node),o=e?.options.find(x=>x.id===id);if(!o)return false;const x=state(s);x.scenes[node]={id,result:o.result};if(o.item)add(s,o.item);if(o.clue&&!s.clues.includes(o.clue))s.clues.push(o.clue);if(o.secret)x.secrets[o.secret]={since:node,knownBy:['hero']};if(o.trait)trait(s,...o.trait);if(o.trust)adjust(s,'hero',...o.trust);moment(s,o.result,'ação');return true;}
function usedResults(s,node){return (uses[node]||[]).map(([id])=>state(s).scenes['use:'+node+':'+id]?.result).filter(Boolean)}
function sceneAddon(s,node,n){const x=state(s);let extra='';
 const ai=x.autonomy[node];if(ai)extra+=(extra?'\n\n':'')+ai;
 if(node==='c10'&&x.personality.franqueza>=58)extra+=(extra?'\n\n':'')+'Você resolve não suavizar o que pensa. Isabella escuta até o fim, mesmo desconfortável com sua franqueza.';
 if(node==='e09'&&x.personality.cautela>=58)extra+=(extra?'\n\n':'')+'Você examina os passos dos amigos e procura onde a madeira parece mais firme antes de seguir.';
 if(node==='h17'&&x.personality.coragem>=58)extra+=(extra?'\n\n':'')+'Apesar do coração acelerado, você força a voz a sair firme para avisar os outros sobre o corredor.';
 if(node==='h17'&&item(s,'bandagem'))extra+=(extra?'\n\n':'')+'Você encontra a atadura comprada dias atrás no fundo da mochila. Ainda está lacrada; poderá ser usada depois que conseguirem um lugar seguro.';
 if(node==='h07'&&item(s,'print'))extra+=(extra?'\n\n':'')+'O celular ainda guarda a captura de conversa que você salvou na investigação anterior.';
 if(node==='g02'&&x.secrets.escondeu_print_c2)extra+=(extra?'\n\n':'')+'Isabella menciona os registros de mensagens. Você lembra da captura que preferiu guardar para si e evita olhar diretamente para ela.';
 return extra?{...n,text:n.text+'\n\n'+extra}:n;
}
// Agentes autônomos têm regras previsíveis baseadas em confiança, lesões e presença.
const auto={p15:s=>pairTrust(s,'hero','samuel')>=58?'Allan recolhe os copos vazios e pede que Samuel espere antes de ligar a van. Samuel hesita, mas concorda em respirar por um instante.':'Allan percebe a pressa de Samuel e decide sentar perto dele, acompanhando o que faz ao volante.',c10:s=>pairTrust(s,'hero','isabella')>=58?'Isabella toma a iniciativa e pede que guardem o bilhete. Ela já começou a conferir os horários, mesmo sem ninguém pedir.':'Isabella decide recolher o bilhete por conta própria. O gesto deixa Samuel desconfiado, mas ela não se explica.',d07:s=>pairTrust(s,'hero','samuel')>=58?'Samuel se oferece para checar a rua antes que os outros saiam. Ele volta depressa e diz que parece vazia.':'Samuel não espera uma decisão conjunta: sai para conferir a rua e volta sem explicar o que procurava.',e09:s=>pairTrust(s,'hero','rauanny')>=58?'Rauanny observa seu sinal e decide ajudar a manter o grupo unido, embora esteja com medo.':'Rauanny decide abrir caminho antes dos outros; Laisla a chama de volta, irritada com o risco.',f09:s=>dead(s,'allan')?'Samuel hesita ao ouvir alguém chamar. O silêncio do grupo o força a continuar.':pairTrust(s,'hero','allan')>=58?'Allan decide ajudar Samuel sem esperar sua ordem. O amigo o acompanha, ainda tenso.':'Allan se afasta para procurar Samuel e os dois discutem por alguns segundos antes de voltarem.',g02:s=>dead(s,'allan')?'Samuel muda de cadeira para não encarar o lugar vazio. Isabella percebe e deixa um copo de água perto dele.':'Allan percebe o nervosismo de Samuel e, sem consultar os outros, senta ao lado dele.',h27:s=>dead(s,'laisla')&&!dead(s,'rauanny')?'Rauanny se afasta das vozes e se senta no chão, incapaz de continuar olhando para as janelas.':dead(s,'isabella')?'Ryan tenta confirmar quem ainda está no apartamento, gritando os nomes junto à janela.':pairTrust(s,'hero','isabella')>=60?'Isabella assume a tarefa de conferir quem conseguiu sair e pede que ninguém se separe.':'Isabella começa a chamar os nomes dos amigos um por um, sem esperar que alguém organize o resgate.'};
function enter(s,node){const x=state(s);if(auto[node]&&!x.autonomy[node]){x.autonomy[node]=auto[node](s);if(node==='c10'&&pairTrust(s,'hero','isabella')>=58&&!s.clues.includes('cameras_mansao'))s.clues.push('cameras_mansao');if(node==='d07'&&pairTrust(s,'hero','samuel')>=58)s.flags.v107_samuel_observou_rua=true;if(node==='e09'&&pairTrust(s,'hero','rauanny')>=58)s.flags.v107_rauanny_ajudou=true;if(node==='f09'&&!dead(s,'allan')&&pairTrust(s,'hero','allan')>=58)s.flags.v107_allan_ajudou=true;if(node==='g02'&&x.secrets.escondeu_print_c2)adjust(s,'hero','isabella',-3,4);if(node==='h27'&&pairTrust(s,'hero','isabella')>=60)s.flags.v107_isabella_organizou=true;moment(s,'Um amigo agiu por conta própria durante '+(window.NODES[node]?.location||'a cena')+'.','autonomia');return true}return false;}
function onChoice(s,node,c,effects){const x=state(s),key=node+':'+c.text;if(x.choices[key])return; x.choices[key]=1;
 for(const e of effects||[]){if(e[0]==='bond'&&ids.includes(e[1]))adjust(s,'hero',e[1],Math.sign(e[2])*Math.min(5,Math.abs(e[2])/2),e[2]<0?3:-1);if(e[0]==='friendBond'&&Array.isArray(e[1]))adjust(s,e[1][0],e[1][1],Math.sign(e[2])*Math.min(6,Math.abs(e[2])),e[2]<0?3:-1);if(e[0]==='trait'&&['coragem','empatia','cautela'].includes(e[1]))trait(s,e[1],Math.sign(e[2])*Math.min(4,Math.abs(e[2])*2));}
 // A mentira não se desfaz por si só; revelar ou ocultar deixa evidência no histórico.
 const t=String(c.text||'').toLowerCase();if(/escond|mentir|não contar|guardar segredo|disfarçar|não revelar/.test(t)){x.secrets['escolha_'+node]={since:node,knownBy:['hero'],description:'Você preferiu não contar tudo.'};trait(s,'cautela',2);adjust(s,'hero','isabella',-1,1)}
 if(/contar a verdade|ser sincero|confessar|mostrar a prova|explicar tudo/.test(t)){trait(s,'franqueza',3);adjust(s,'hero','isabella',3,-2)}
}
// Histórico do celular desde o primeiro capítulo, com mensagens e respostas vinculadas ao slot.
const phoneDefs=[
 {id:'c1-isabella',who:'Isabella',thread:'isabella',chapter:1,time:'CAPÍTULO 1 · TARDE',text:'Você chegou na homenagem? Não precisa fingir que está tudo normal.',opts:[['sincero','Não tô bem. Mas eu vim.','Eu também. Se precisar sair um pouco, me chama.',5,-2,'franqueza'],['evasivo','Tá tudo sob controle.','Sei. A gente conversa quando chegar aqui.',-2,4,'cautela']]},
 {id:'c2-samuel',who:'Samuel',thread:'samuel',chapter:2,time:'CAPÍTULO 2 · MANHÃ',text:'Não espalha o que a gente conversou antes de eu explicar pro resto.',opts:[['guardar','Pode deixar. A gente fala pessoalmente.','Valeu. Eu precisava saber que alguém ia me ouvir.',4,2,'cautela'],['cobrar','Eu não vou esconder mais nada por você.','Tá. Eu entendi.',-6,5,'franqueza']]},
 {id:'c3-ryan',who:'Ryan',thread:'ryan',chapter:3,time:'CAPÍTULO 3 · NOITE',text:'Me dá um sinal quando sair da marina. Não quero perder contato com ninguém.',opts:[['cuidar','Eu aviso. Você também se cuida, por favor.','Prometo. E tô falando sério.',5,-2,'empatia'],['seco','Tô ocupado agora, depois respondo.','Tá. Só me avisa quando puder.',-2,2,'cautela']]},
 {id:'c4-laisla',who:'Laisla',thread:'laisla',chapter:4,time:'CAPÍTULO 4 · ANTES DA BUSCA',text:'A Rauanny tá tentando bancar a forte, mas eu sei que ela tá assustada.',opts:[['guardar','Não vou comentar. Fica perto dela.','Eu vou. Obrigada por entender.',4,-2,'empatia'],['contar','A gente precisa falar disso com todo mundo.','Se você fizer isso agora ela vai me matar de raiva.',-3,3,'franqueza']]},
 {id:'c5-breno',who:'Breno',thread:'breno',chapter:5,time:'CAPÍTULO 5 · MANHÃ',text:'Tem coisas que eu ainda não consegui explicar direito. Queria conversar sem o resto do grupo perto.',opts:[['aproximar','A gente pode conversar só nós dois.','Obrigado. Eu precisava disso.',6,-2,'empatia'],['adiar','Agora eu não tenho cabeça para isso.','Eu entendo. Não quero te pressionar.',-2,1,'cautela']]},
 {id:'c6-isabella',who:'Isabella',thread:'isabella',chapter:6,time:'CAPÍTULO 6 · TARDE',text:'Se você tiver registro das mensagens de ontem, guarda. A gente vai precisar conferir os horários.',opts:[['provas','Eu guardei o que encontrei. Depois te mostro.','Boa. Não manda pra ninguém fora do grupo ainda.',5,-3,'franqueza'],['ocultar','Não encontrei nada que ajude.','Tá. Se lembrar de algo, me fala.',-5,8,'cautela']]}
];
function reached(s,def){const c=chapter(s);return c>=def.chapter;}
function socialPhoneThreads(s,base){if(!s)return base;
 const result=base.map(t=>({...t,messages:[...t.messages]}));
 const grouped={};
 for(const d of phoneDefs){if(!reached(s,d))continue;
  const response=state(s).responses[d.id];const block=[{who:d.who,text:d.text,time:d.time}];
  if(response){block.push({who:'Você',text:response.text,time:d.time});block.push({who:d.who,text:response.answer,time:d.time});}
  (grouped[d.thread]??=[]).push({def:d,block,response});
 }
 for(const [who,blocks] of Object.entries(grouped)){
  let t=result.find(z=>z.id===who);
  if(!t){t={id:who,name:names[who],sub:'Conversa particular',messages:[],replyKey:''};result.push(t)}
  // Capítulos anteriores aparecem primeiro. Se o contato já existia, não duplicar nem mover as mensagens mais recentes.
  const older=blocks.flatMap(b=>b.block);t.messages=[...older,...t.messages];
  const pending=blocks.filter(b=>!b.response);
  if(pending.length&&!t.replyKey&&!dead(s,who))t.replyKey='v107-'+pending[pending.length-1].def.id;
 }
 return result;
}
function socialReplies(s,thread,base){const k=thread?.replyKey||'';if(!k.startsWith('v107-'))return base;const d=phoneDefs.find(q=>'v107-'+q.id===k);return d?d.opts.map(o=>({id:o[0],text:o[1]})):[];}
function socialReply(s,key,id){if(!key.startsWith('v107-'))return null;const d=phoneDefs.find(q=>'v107-'+q.id===key),o=d?.opts.find(z=>z[0]===id);if(!d||!o||!reached(s,d)||state(s).responses[d.id]||dead(s,d.thread))return false;
 state(s).responses[d.id]={id,text:o[1],answer:o[2],at:s.node};adjust(s,'hero',d.thread,o[3],o[4]);trait(s,o[5],3);if(d.id==='c6-isabella'&&id==='provas'){add(s,'print');if(!s.clues.includes('conversa_grupo_preservada_c6'))s.clues.push('conversa_grupo_preservada_c6');}if(d.id==='c6-isabella'&&id==='ocultar')state(s).secrets.escondeu_horarios={since:s.node,knownBy:['hero']};if(d.id==='c2-samuel'&&id==='guardar')state(s).secrets.protegeu_samuel={since:s.node,knownBy:['hero']};moment(s,'Você respondeu à mensagem de '+d.who+'.','mensagem');return true;}
function trustRows(s){return ids.map(id=>({id,name:names[id],trust:pairTrust(s,'hero',id),suspicion:pairSuspicion(s,'hero',id),dead:dead(s,id)}))}
const urgent={p17:{secs:30,fallback:-1},c14:{secs:23,fallback:-1},d16:{secs:20,fallback:-1},e11:{secs:20,fallback:-1},f09:{secs:20,fallback:-1},h19:{secs:18,fallback:-1},h27:{secs:20,fallback:-1}};
function timer(s,node,choices){const d=urgent[node];return d&&choices?.length>1&&!state(s).timedOff?d:null;}
window.UG107=Object.freeze({empty,restore,state,chapter,dead,pairTrust,pairSuspicion,trustRows,opportunity,act,sceneAddon,enter,onChoice,item,objects,useOptions,useItem,usedResults,phoneThreads:socialPhoneThreads,phoneChoices:socialReplies,phoneReply:socialReply,timer,moment});
})();
