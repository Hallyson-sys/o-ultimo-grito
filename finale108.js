/* O ÚLTIMO GRITO · V1.0.8 — continuidade e investigação, sem spoilers na interface.
 * Ferramentas do autor: fatos e posições conhecidos, memória de versões e recap por slot.
 * O segredo definitivo dos antagonistas NÃO é inferido automaticamente neste módulo.
 */
(()=>{'use strict';
const N=window.NODES, HIST=window.HISTORIA;
const PEOPLE=['hero','rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno','bella','moises'];
const LABEL={hero:'você',rayssa:'Rayssa',ryan:'Ryan',laisla:'Laisla',samuel:'Samuel',rauanny:'Rauanny',allan:'Allan',isabella:'Isabella',breno:'Breno',bella:'Bella',moises:'Moisés'};
const isDead=(s,p)=>!!(s?.flags?.['c7_morto_'+p]||s?.flags?.['c6_morto_'+p]||(p==='allan'&&s?.flags?.allan_morto_c4));
const empty=()=>({version:1,visited:[],persons:{},facts:{},confrontations:{},autonomy:{},recapsOpened:{}});
function restore(raw,s){const r=raw&&typeof raw==='object'?raw:{};const n=empty();
 n.visited=Array.isArray(r.visited)?[...new Set(r.visited.filter(x=>typeof x==='string'))].slice(-800):[];
 n.persons=r.persons&&typeof r.persons==='object'?structuredClone(r.persons):{};
 n.facts=r.facts&&typeof r.facts==='object'?structuredClone(r.facts):{};
 n.confrontations=r.confrontations&&typeof r.confrontations==='object'?{...r.confrontations}:{};
 n.autonomy=r.autonomy&&typeof r.autonomy==='object'?{...r.autonomy}:{};
 n.recapsOpened=r.recapsOpened&&typeof r.recapsOpened==='object'?{...r.recapsOpened}:{};
 // Saves anteriores: só reconstruímos fatos testemunhados no histórico; sem atribuir onisciência.
 for(const h of s?.history||[]){
  if(h.node==='rev_p_bella_mata')know(n,'bella','jullia_na_mata','presenciou','prólogo');
  if(h.node==='e17')for(const p of ['hero','samuel','isabella','rayssa','breno'])know(n,p,'samuel_viu_figura','ouviu','capítulo 3');
  if(h.node==='h03')for(const p of ['hero','breno','bella'])know(n,p,'bella_seguiu_jullia','ouviu','capítulo 6');
 }
 return n;
}
function state(s){if(!s.finale108)s.finale108=restore(null,s);return s.finale108;}
function know(st,who,what,how,where){if(!PEOPLE.includes(who))return;const key=who+':'+what;if(!st.facts[key])st.facts[key]={how,where};}
const attending={
 p05:['hero','rayssa','ryan','laisla','samuel','rauanny','allan','isabella','breno','bella'],
 rev_p_bella_mata:['bella'],
 c07:['hero','moises','samuel','rayssa'],
 d13f:['hero','rayssa','rauanny'],
 e03:['hero','breno','isabella','ryan','samuel','allan'],
 e17:['hero','samuel','isabella','rayssa','breno','moises'],
 f03:['hero','breno','isabella','samuel','rayssa','ryan','allan','laisla','rauanny'],
 g05:['hero','isabella','breno','rayssa','ryan','samuel','laisla','rauanny'],
 h01:['hero','breno','bella'],h03:['hero','breno','bella'],
 h06:['hero','breno','ryan'],h07:['hero','rayssa','isabella','laisla','rauanny','ryan','allan'],
 h41:['hero','ryan','laisla','rauanny','isabella','rayssa','allan'],
 h45:['hero','rayssa','ryan','laisla','rauanny','isabella','allan'],
 h47:['hero','bella','moises']
};
function presence(s,node){let people=(attending[node]||[]).filter(x=>!isDead(s,x));if(node==='h07'||node==='h41'||node==='h45'){
 if(!s.flags?.c6_b_junto){people=people.filter(x=>!['isabella','rayssa','allan'].includes(x));}
 if(node==='h07')people=people.filter(x=>x!=='ryan');
 }return people;}
function enter(s,id){if(!s||!id)return false;const st=state(s);if(st.visited.includes(id))return false;st.visited.push(id);if(st.visited.length>800)st.visited.shift();
 const n=N[id];for(const who of presence(s,id)){const at=n?.location||'';st.persons[who]={where:at,at:id};}
 if(id==='rev_p_bella_mata')know(st,'bella','jullia_na_mata','presenciou','prólogo');
 if(id==='e17')for(const who of presence(s,id))know(st,who,'samuel_viu_figura','ouviu','capítulo 3');
 if(id==='h03')for(const who of presence(s,id))know(st,who,'bella_seguiu_jullia','ouviu','capítulo 6');
 if(id==='h45')for(const p of ['hero','rayssa','ryan','laisla','rauanny','isabella','allan']){
  if(isDead(s,p))continue;
  for(const lost of ['laisla','rauanny','isabella','allan','ryan'])if(isDead(s,lost))know(st,p,'morte:'+lost,'polícia','capítulo 6');
 }
 // Ações autônomas ancoradas em cenas realmente vividas, sem modificar mortes obrigatórias.
 const trust=(a,b)=>window.UG107?.pairTrust?.(s,a,b)??50;
 if(id==='d12'&&!st.autonomy.d12&&trust('hero','breno')>=50){st.autonomy.d12='Breno guardou uma cópia do mapa de serviço, por iniciativa própria.';know(st,'breno','mapa_servico','investigou','capítulo 2');}
 if(id==='e17'&&!st.autonomy.e17&&trust('hero','samuel')<40){st.autonomy.e17='Samuel não entregou o restante de suas anotações; decidiu esperar a discussão terminar.';}
 if(id==='h45'&&!st.autonomy.h45){if(!isDead(s,'isabella')&&!isDead(s,'rayssa'))st.autonomy.h45='Isabella procurou Rayssa antes de responder à polícia.';else if(!isDead(s,'laisla')&&!isDead(s,'rauanny'))st.autonomy.h45='Laisla manteve Rauanny ao seu lado durante a avaliação.';}
 return true;}
function resolve(id,s,n){if(!n)return n;const st=state(s);let text=n.text;const append=[];
 if(id==='d12'&&st.autonomy.d12&&window.UG107?.pairTrust?.(s,'hero','breno')>=50)append.push('Sem esperar que alguém peça, Breno fotografa o mapa de acesso e guarda a cópia no celular. — Se sumir daqui, pelo menos a gente tem isso.');
 if(id==='e17'&&st.autonomy.e17)append.push('Samuel aperta o celular na mão. Isabella pede para ver suas anotações, mas ele bloqueia a tela. — Agora não. Não com todo mundo gritando.');
 if(id==='h45'&&st.autonomy.h45)append.push(st.autonomy.h45);
 if(append.length)text+='\n\n'+append.join('\n\n');
 const choices=[...(n.choices||[])];
 const add=(req,idto,label)=>{if(req&&!st.confrontations[idto]&&!choices.some(c=>c.to===idto))choices.push({text:label,to:idto,effects:[]})};
 if(id==='c07')add(s.clues?.includes('moises_ausente'),'v108_moises','Mostrar a Moisés o que você descobriu sobre a festa');
 if(id==='g05')add(s.clues?.includes('meia_confissao_samuel'),'v108_samuel','Confrontar a versão de Samuel usando a confissão anterior');
 if(id==='h03')add(s.clues?.includes('bella_conhecia_jullia'),'v108_bella','Perguntar a Bella por que demorou a falar sobre a trilha');
 return text===n.text&&choices.length===(n.choices||[]).length?n:{...n,text,choices};}
function onChoice(s,from,c){const st=state(s);if(c.to==='v108_moises')st.confrontations.v108_moises=true;
 if(c.to==='v108_samuel')st.confrontations.v108_samuel=true;
 if(c.to==='v108_bella')st.confrontations.v108_bella=true;}
const chapterOf=id=>{const n=N[id];const t=n?.chapter||'';return t.startsWith('PRÓLOGO')?0:Number(t.match(/CAPÍTULO\s+0?(\d+)/)?.[1]||0);};
function reached(s){let mx=chapterOf(s?.node);for(const h of s?.history||[])mx=Math.max(mx,chapterOf(h.node));return mx;}
function recap(s,limit){if(!s)return[];const r=reached(s),completed=(s?.node==='fim10'||s?.node==='j_fim')?r:Math.max(-1,r-1),max=Math.min(completed,Number.isFinite(limit)?limit:completed);const clues=new Set(s.clues||[]),f=s.flags||{};const out=[];
 if(max>=0&&(s.history||[]).some(h=>chapterOf(h.node)===0))out.push({ch:0,title:'A noite da festa',lines:[
 'Você e os amigos foram à propriedade dos Gomes. A festa terminou em humilhação, acusações e uma fuga pela mata.',
 clues.has('bella_perdeu_jullia')?'Bella correu atrás de Jullia e a perdeu de vista entre as árvores.':'Jullia desapareceu na escuridão depois de sair da festa.',
 'Samuel dirigia a van quando Jullia foi atingida. O grupo escondeu o que acreditava ser seu corpo e fez um pacto.'
 ]});
 if(max>=1)out.push({ch:1,title:'Um ano depois',lines:['A família Gomes ainda procura Jullia. Durante a homenagem, alguém colocou o segredo diante do grupo.',clues.has('foto_recente_grupo')?'Uma fotografia recente mostrou que alguém observava os amigos de perto.':'Moisés confrontou os amigos durante a homenagem.']});
 if(max>=2)out.push({ch:2,title:'Ninguém está seguro',lines:['A investigação levou o grupo a caminhos e testemunhas da propriedade.',clues.has('fita_vermelha_trilha')?'Na trilha apareceu uma fita recente, perto de marcas mais antigas.':'A investigação encontrou indícios de passagem pelas rotas de serviço.',clues.has('carro_farol_apagado')?'Davi descreveu um carro parado sem luzes naquela noite.':'O grupo encontrou motivos para desconfiar de antigos depoimentos.']});
 if(max>=3)out.push({ch:3,title:'A marina',lines:['Na marina, a busca por registros antigos se transformou em uma perseguição.',clues.has('voz_jullia_backup')?'Uma gravação revelou o medo de Jullia na mata, antes do atropelamento.':'Documentos restaurados levantaram perguntas sobre os arquivos de Jullia.',clues.has('meia_confissao_samuel')?'Samuel confessou que vira alguém na mata e não contou ao grupo.':'A versão de Samuel sobre a noite permaneceu incompleta.']});
 if(max>=4)out.push({ch:4,title:'O arquivo da estrada',lines:['A busca por provas sobre a van terminou em outro ataque.',f.allan_morto_c4?'Allan não sobreviveu. A ausência dele mudou a relação entre os amigos.':'Allan escapou do ataque, mas o grupo saiu abalado.',clues.has('foto_van_origem')?'O ângulo da foto da van apontou para a região da cabine de serviço.':'A origem dos registros da estrada continua sendo investigada.']});
 if(max>=5)out.push({ch:5,title:'Laços de sangue',lines:['Os amigos confrontaram suas culpas e novas informações sobre o portão dos Gomes.',s.romanceEscolhido&&s.romanceEscolhido!=='solteiro'?'Você decidiu investir em uma aproximação com '+(LABEL[s.romanceEscolhido]||'alguém do grupo')+'. Ainda não há namoro oficial.':'Você preferiu seguir sem uma rota romântica definida.',clues.has('cracha_portao_c5')?'Um crachá de apoio apareceu numa mensagem anônima, mas a identidade de quem o usava permanece incerta.':'A noite da festa ainda guarda lacunas.']});
 if(max>=6) {const deceased=['laisla','rauanny','isabella','allan','ryan'].filter(p=>!!f['c6_morto_'+p]);out.push({ch:6,title:'O apartamento de Laisla',lines:['Bella voltou a Lakewood procurando respostas sobre a irmã. Pouco depois, uma reunião entre amigos terminou em ataque.',f.c6_b_junto?'Os amigos conseguiram alcançar o quarto juntos e tentar a passagem entre os prédios.':'O grupo se dividiu durante a invasão e precisou encontrar saídas diferentes.',deceased.length?'A polícia confirmou a perda de '+deceased.map(x=>LABEL[x]).join(', ')+'.':'A fuga terminou sem novas mortes confirmadas no apartamento.',...(!deceased.length?['Os ferimentos e o medo acompanharam os sobreviventes depois do resgate.']:[])]});}
 if(max>=7){const deaths=['samuel','breno','allan','ryan','rauanny'].filter(x=>!!f['c7_morto_'+x]); const met=Object.keys(f).filter(x=>x.startsWith('c7_conversou_')&&f[x]).map(x=>LABEL[x.slice('c7_conversou_'.length)]||x);out.push({ch:7,title:'A noite dos traidores',lines:[met.length?'Você conversou a sós com '+met[0]+' sobre o medo de não viver o próprio futuro.':'Você tentou encontrar um momento de paz depois do ataque ao condomínio.', 'Bella apresentou documentos de acesso à propriedade Gomes. Moisés pediu um encontro para contar algo que vinha escondendo.','O encontro na oficina terminou com a morte de Moisés. '+(clues.has('c7_registros_pos_desaparecimento')?'Você preservou registros de compras feitas depois do desaparecimento de Jullia.':'As principais provas continuam incompletas.'),deaths.length?'No ataque à oficina, também morreram '+deaths.map(x=>LABEL[x]||x).join(', ')+'.':'Todos os amigos presentes conseguiram escapar vivos da oficina.','Uma mensagem anônima deixou no ar a possibilidade de um traidor dentro do grupo.']});}
 return out;}
// Revisão editorial do quadro de pistas: fatos observáveis, nunca spoilers do culpado.
const clues={
 moises_provocou:{text:'Moisés sabia da discussão, mas seu relato ainda não esclarece onde estava durante toda a noite.'},
 marca_cera_vermelha:{text:'A cera é semelhante à usada nas velas do memorial. Alguém teve acesso ao local ou aproveitou o material da homenagem; isso não identifica o autor do bilhete.'},
 fita_vermelha_trilha:{text:'A fita parece recente e pode sinalizar uma rota usada por funcionários ou por quem voltou a vigiar a trilha. Não prova que estivesse ali no dia do acidente.'},
 marcas_arrasto:{text:'As marcas antigas junto à trilha podem ter sido deixadas por equipamento de serviço, não necessariamente por uma pessoa arrastada.'},
 carro_farol_apagado:{text:'Davi recorda um veículo parado junto ao acesso secundário. Pode estar ligado às movimentações após a discussão, mas ele não viu motorista nem passageiros.'},
 objeto_sarjeta:{text:'Um brilho metálico caiu durante a fuga; seu dono ainda não foi estabelecido e ele pode ser um fragmento de equipamento.'},
 distintivo_arranhado:{text:'O fragmento encontrado na marina pode ser parte de um fecho ou credencial dos acessos técnicos. Não há nome ou rosto que identifique o mascarado.'},
 rota_subterranea:{text:'O agressor conhecia acessos de manutenção da marina. Plantas, chaves ou informações sobre as instalações poderiam explicar esse conhecimento.'},
 foto_van_origem:{text:'O enquadramento da van coincide com a linha de visão da antiga cabine de serviço da estrada. Uma câmera fixa ou um arquivo reaproveitado poderiam explicar a imagem.'},
 cracha_portao_c5:{text:'A imagem anônima mostra um crachá de apoio com cordão avermelhado e detalhe azul. Pode ser antigo ou emprestado; não identifica a pessoa que abriu o portão.'},
 acesso_audio_c5:{text:'O áudio pode ter sido sincronizado com um backup dos Gomes e posteriormente copiado. Isso não comprova quem o recuperou ou colocou na marina.'},
 voz_jullia_backup:{text:'O áudio foi gravado enquanto Jullia ainda corria pela mata; termina antes do atropelamento e não identifica a pessoa cujos passos ela ouviu.'},
 notebook_marina:{text:'Um registro antigo da conta de Jullia aponta para um computador de backup na marina. O arquivo poderia ser acessado mais tarde por alguém com as credenciais.'},
 mensagens_restauradas:{text:'Arquivos antigos da conta de Jullia mostram lacunas e rascunhos; pode ter havido exclusão ou recuperação posterior. Não se sabe quem fez isso.'},
 meia_confissao_samuel:{text:'Samuel relatou uma figura entre árvores próximas à estrada. Ela pode ser alguém vindo da festa; ele não viu o descarte no lago ser testemunhado.'},
 vigia_portao_c5:{text:'Samuel se lembra vagamente de alguém de roupa escura perto da guarita. Ele estava abalado e não reconheceu a pessoa.'},
 bella_trilha_c6:{text:'Bella correu atrás da irmã na mata, perdeu-a entre os pinheiros e não viu o atropelamento. Seu relato pode esclarecer uma das figuras daquela noite.'},
 moises_evita_bella_c6:{text:'Moisés manteve distância da família Gomes após o desaparecimento. Sua atitude pode esconder culpa, receio ou informação que ainda não contou.'},
 foto_dentro_apartamento_c6:{text:'A imagem foi tirada durante o jantar de Laisla, por alguém com acesso ao apartamento ou a uma câmera posicionada nele. O reflexo não permite reconhecer ninguém.'},
 audio_ruido_motor:{text:'Um ruído distante aparece no áudio gravado na mata, antes do acidente. Pode ser um motor ou equipamento da propriedade; não prova que a van já estivesse ali.'},
 moises_parou_portao:{text:'Davi viu Moisés voltar em direção ao portão, mas ele não seguiu Jullia até o interior da mata naquele momento.'},
 testemunha_estrada:{text:'Relatos de movimentação na estrada não provam que alguém tenha visto o atropelamento ou o descarte; devem ser confrontados com horários e pontos de observação.'}
};
function Nnew(id,from,location,text,choices){if(N[id])return;const x={id,chapter:from,location,time:'CONTINUAÇÃO',scene:'house',speaker:'NARRAÇÃO',text,choices};N[id]=x;HIST?.push(x)}
const q=(text,to,effects=[])=>({text,to,effects});
Nnew('v108_moises','CAPÍTULO 01 · UM ANO DEPOIS','HOMENAGEM DOS GOMES',`Você mostra a Moisés a anotação sobre a festa. Ele lê o nome de Jullia antes de devolver seu telefone.\n\nVocê: — Você ficou longe dela quando ela mais precisava. E sabe mais sobre aquela noite do que contou.\n\nMoisés: — Eu sei o que eu fiz de errado. Não preciso que vocês me lembrem.\n\nRayssa observa o rosto dele por um instante. Moisés fecha a mão ao redor das chaves do carro, sem olhar para Bella, que conversa com os familiares do outro lado do salão.\n\nMoisés: — Perguntem o que quiserem. Só não inventem resposta no meu lugar.`,[
 q('Exigir que ele diga onde esteve depois da discussão','c08',[['bond','rayssa',-1],['set','v108_moises_pressao',true]]),
 q('Registrar a resposta e continuar a homenagem','c08',[['trait','cautela',1],['set','v108_moises_calma',true]])]);
Nnew('v108_samuel','CAPÍTULO 05 · LAÇOS DE SANGUE','CASA DE ISABELLA',`Você abre no celular a anotação da conversa na marina. Samuel vê suas próprias palavras e fica imóvel.\n\nVocê: — Você disse que tinha visto alguém nas árvores. Hoje falou como se o portão explicasse tudo. Não explica.\n\nSamuel: — Eu sei. Eu só não lembro do rosto. Tava bêbado, com medo... e depois fiz uma merda muito maior.\n\nIsabella pede a Samuel que repita o local exato, sem acrescentar o que não viu. Desta vez, vocês anotam as incertezas junto com os fatos.`,[
 q('Pedir a Samuel que desenhe a posição da figura','g06a',[['clue','vigia_portao_c5'],['set','v108_samuel_detalhe',true]]),
 q('Dizer que prefere esperar uma confirmação','g06c',[['bond','samuel',2],['set','v108_samuel_respeito',true]])]);
Nnew('v108_bella','CAPÍTULO 06 · O SILÊNCIO TEM TESTEMUNHAS','CENTRO DE LAKEWOOD',`Você se lembra de ter conhecido Bella na festa e pergunta por que ela demorou tanto para falar com o grupo sobre a trilha.\n\nVocê: — Você estava lá. Por que a gente só tá falando dessa mata agora?\n\nBella: — Eu contei tudo à polícia. Não falei com vocês porque eu tava procurando minha irmã, não tentando tranquilizar quem tava na festa. Ouvi a discussão, fui atrás dela e perdi Jullia naquela mata de merda.\n\nBreno: — E a estrada?\n\nBella: — Não cheguei perto. Se tivesse visto alguma coisa, tinha contado à polícia. Não misturem o que vocês imaginam com o que eu realmente vi.`,[
 q('Pedir que Bella desenhe a trilha percorrida','h04a',[['clue','bella_trilha_c6'],['bond','breno',1]]),
 q('Pedir desculpas pelo tom e perguntar por Moisés','h04b',[['bond','rayssa',1],['set','v108_bella_respeito',true]])]);
window.UGFinale108=Object.freeze({empty,restore,state,enter,resolve,onChoice,recap,reached,clues,know,isDead});
})();
