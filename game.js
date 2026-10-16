(()=>{'use strict';
const $=s=>document.querySelector(s),app=$('#app');
const OLD_KEY='ultimo-grito-save';const SLOT_PREFIX='ultimo-grito-slot-';let activeSlot=1;const KEY_UNUSED='ultimo-grito-save';
const LEGACY=['ultimo-grito-save-v06','ultimo-grito-save-v05','ultimo-grito-save-v04','ultimo-grito-save-v03','ultimo-grito-save-v02'];
let save=null,view='menu';let castSelected=null;
let previousAudioView='menu';const audio=window.UGAudio;const inter=window.UGInteractive;const social=window.UG107; let urgentInterval=null,urgentArmedNode=null,urgentRemaining=0;let phoneTab='chats',phoneThread='grupo';let investigationSelection=null;let expandedAlert=false;let selectedMedia=null;

const CHAPTERS=[
  {id:'prologo', short:'PRÓLOGO', title:'A noite em que tudo mudou', label:'PRÓLOGO · A NOITE EM QUE TUDO MUDOU', start:'p01', summary:'A festa de Jullia, o acidente e o pacto no lago.'},
  {id:'cap1', short:'CAPÍTULO 01', title:'Um ano depois', label:'CAPÍTULO 01 · UM ANO DEPOIS', start:'c01', summary:'A homenagem a Jullia reacende o medo quando surge o primeiro bilhete.'},
  {id:'cap2', short:'CAPÍTULO 02', title:'Ninguém está seguro', label:'CAPÍTULO 02 · NINGUÉM ESTÁ SEGURO', start:'d01', summary:'O grupo investiga as ameaças e sofre o primeiro ataque.'},
  {id:'cap3', short:'CAPÍTULO 03', title:'Ninguém é inocente', label:'CAPÍTULO 03 · NINGUÉM É INOCENTE', start:'e01', summary:'Novas suspeitas, mensagens apagadas e uma perseguição mais brutal na marina.'},
  {id:'cap4', short:'CAPÍTULO 04', title:'Fora de alcance', label:'CAPÍTULO 04 · FORA DE ALCANCE', start:'f01', summary:'O grupo é atraído para o arquivo da estrada norte; Allan corre perigo.'},
  {id:'cap5',short:'CAPÍTULO 05',title:'Laços de sangue',label:'CAPÍTULO 05 · LAÇOS DE SANGUE',start:'g01',summary:'O luto muda o grupo e você decide qual romance — ou nenhuma relação — quer seguir.'},
  {id:'cap6',short:'CAPÍTULO 06',title:'O silêncio tem testemunhas',label:'CAPÍTULO 06 · O SILÊNCIO TEM TESTEMUNHAS',start:'h01',summary:'Bella investiga o paradeiro da irmã. O jantar no apartamento de Laisla vira uma perseguição.'},
  {id:'cap7',short:'CAPÍTULO 07',title:'A noite dos traidores',label:'CAPÍTULO 07 · A NOITE DOS TRAIDORES',start:'j01',summary:'Conversa íntima, jantar, investigação de Bella e Moisés, perspectivas alternadas e decisões que determinam quem consegue fugir da oficina.'}
];

const CLUE_DATA={
  ligacao_restrita_registrada_c6:{title:'Registro da chamada restrita',category:'Celular · Capítulo 6',text:'Chamada de número restrito atendida às 23h57; ruídos ouvidos na linha não identificaram a pessoa.'},
  conversa_grupo_preservada_c6:{title:'Mensagens preservadas do grupo',category:'Celular · Capítulo 6',text:'Você pediu que as pessoas guardassem mensagens e horários para confrontar os depoimentos.'},
  registro_ameaca_celular_c6:{title:'Mensagem ameaçadora preservada',category:'Celular · Capítulo 6',text:'Você preservou uma mensagem recebida durante a invasão para comparar com outras provas.'},
  bella_pedido_celular_c6:{title:'Mensagem de Bella após o resgate',category:'Celular · Capítulo 6',text:'Bella procurou notícias do condomínio e reforçou que busca informações comprovadas sobre a irmã.'},
  arquivo_foto_examinado_c6:{title:'Ângulo da fotografia no apartamento',category:'Análise do celular',text:'A foto foi analisada como evidência de acesso ao apartamento antes do ataque.'},
  arquivo_audio_examinado:{title:'Transcrição parcial do áudio de Jullia',category:'Análise do celular',text:'O registro ocorre na mata e se encerra antes do acidente, sem mostrar quem a seguiu.'},
  arquivo_mensagens_examinadas:{title:'Datas das mensagens restauradas',category:'Análise do celular',text:'As mensagens podem ser comparadas aos depoimentos, mas não mostram quem acessou os arquivos depois.'},
  arquivo_van_examinada:{title:'Enquadramento da fotografia da van',category:'Análise do celular',text:'O ângulo da fotografia delimita possíveis pontos de observação na estrada.'},
  arquivo_cracha_examinado:{title:'Detalhe azul observado',category:'Análise do celular',text:'O detalhe visual pode ser comparado com outras informações da propriedade.'},
  bella_contato_c6:{title:'Contato de Bella Gomes',category:'Capítulo 6',text:'A irmã de Jullia passou um ano procurando respostas e ofereceu seu contato ao grupo.'},
  bella_trilha_c6:{title:'O caminho de Bella pela mata',category:'Capítulo 6',text:'Bella afirmou ter seguido Jullia por uma entrada lateral da mata antes do atropelamento, sem ter visto van ou lago.'},
  moises_evita_bella_c6:{title:'Moisés evita a irmã de Jullia',category:'Capítulo 6',text:'Bella disse que Moisés se afastou dela e da família Gomes depois das primeiras semanas de buscas.'},
  escada_manutencao_c6:{title:'Escada de manutenção no condomínio',category:'Capítulo 6',text:'A escada extensível estava sendo usada por técnicos no Bloco B antes do ataque; ela não apareceu do nada durante o resgate.'},
  foto_dentro_apartamento_c6:{title:'Foto tirada durante o jantar',category:'Capítulo 6',text:'O agressor enviou uma foto feita de dentro do apartamento de Laisla, provando acesso à intimidade do grupo.'},
  ligacao_no_jantar_c6:{title:'Ligação distorcida no jantar',category:'Capítulo 6',text:'Uma voz falou sobre deixar pessoas para trás; Isabella conseguiu preservar parte do registro.'},
  grade_servico_c6:{title:'Grade e escada de serviço',category:'Capítulo 6',text:'A lavanderia de Laisla tem uma rota independente para o corredor de serviço, que precisa ser aberta pelo exterior.'},
  policia_alertada_c6:{title:'Relato à polícia do ataque',category:'Capítulo 6',text:'O grupo descreveu a máscara, os locais do ataque e a travessia entre os prédios à polícia.'},
  bella_apoio_c6:{title:'Bella ofereceu ajuda após o ataque',category:'Capítulo 6',text:'Mesmo sem saber toda a verdade sobre a irmã, Bella procurou os sobreviventes ao ver as notícias do condomínio.'},
  moises_apos_ataque_c6:{title:'Moisés apareceu no condomínio',category:'Capítulo 6',text:'Moisés foi visto observando as viaturas e evitando encontrar Bella Gomes.'},
  moises_alerta_c6:{title:'Aviso enigmático de Moisés',category:'Capítulo 6',text:'Moisés alertou o protagonista a não confiar em alguém apenas por parecer arrependido.'},
  cronologia_ataque_c6:{title:'Horários do ataque no apartamento',category:'Capítulo 6',text:'O protagonista reuniu os horários da foto enviada, da invasão, do uso da escada e da chegada policial.'},
  ameaca_janela_c6:{title:'Mensagem sobre a janela',category:'Capítulo 6',text:'Após o resgate o grupo recebeu uma mensagem dizendo que o perseguidor sabia da travessia e de quem observava a janela.'},
  convite_jullia:{title:'Convite inesperado',category:'Passado',text:'Você estranhou o convite de Jullia para a festa. Havia algo urgente e pessoal por trás daquele chamado.'},
  breno_desconfortavel:{title:'Breno já estava desconfortável',category:'Passado',text:'Ainda no caminho para a festa, Breno demonstrava que aquele ambiente e aquela noite o deixavam inquieto.'},
  breno_observador:{title:'Breno percebeu detalhes antes',category:'Passado',text:'Breno observava o comportamento de todos e parecia notar tensões antes mesmo de elas explodirem.'},
  moises_ausente:{title:'Moisés estava distante',category:'Passado',text:'Durante a festa, Jullia procurava Moisés várias vezes, mas ele não estava ao lado dela quando mais precisava.'},
  comentarios_maldosos:{title:'Jullia ouviu comentários cruéis',category:'Passado',text:'O grupo falando mal dela foi uma das últimas humilhações que Jullia suportou naquela noite.'},
  moises_traicao:{title:'Traição de Moisés',category:'Passado',text:'Jullia viu Moisés com outra pessoa logo depois da confusão da festa, o que agravou seu estado emocional.'},
  estrada_escura:{title:'A estrada do lago',category:'Passado',text:'O atropelamento aconteceu na estrada escura próxima ao lago. É o ponto central do segredo do grupo.'},
  saco_na_van:{title:'Saco preto na van',category:'Passado',text:'O grupo usou um saco que estava na van de Samuel para esconder o corpo antes de levá-lo ao lago.'},
  pacto_verao:{title:'Pacto do verão passado',category:'Passado',text:'Depois de jogar o corpo de Jullia no lago, todos juraram manter silêncio absoluto sobre o que aconteceu.'},
  jullia_mata:{title:'Jullia correu para a mata',category:'Passado',text:'Antes do atropelamento, Jullia deixou a festa chorando e correu pela mata do terreno da propriedade.'},
  ultima_mensagem_jullia:{title:'Última mensagem de Jullia',category:'Homenagem',text:'Antes da festa, Jullia enviou uma mensagem dizendo que precisava de um rosto amigo naquela noite.'},
  buscas_continuam:{title:'As buscas continuam',category:'Homenagem',text:'A família Gomes e a polícia ainda tratam o caso como desaparecimento e nunca deixaram de procurar por Jullia.'},
  convidados_observados:{title:'Convidados atentos demais',category:'Homenagem',text:'Durante a homenagem, algumas pessoas pareciam observar o grupo com atenção incomum, como se esperassem uma reação.'},
  moises_provocou:{title:'Moisés conhece detalhes',category:'Homenagem',text:'Moisés sabe que Jullia saiu chorando naquela noite e insinuou conhecer informações sobre a estrada.'},
  moises_relacao:{title:'Relacionamento conturbado',category:'Homenagem',text:'A relação de Jullia com Moisés já estava muito abalada antes do desaparecimento.'},
  bilhete_ameaca:{title:'Bilhete ameaçador',category:'Homenagem',text:'Na homenagem, surgiu a ameaça “Eu sei o que vocês fizeram no verão passado”, provando que alguém conhece o segredo do grupo.'},
  foto_recente_grupo:{title:'Foto recente do grupo',category:'Homenagem',text:'Alguém tirou uma foto recente do grupo durante a homenagem, sem que vocês percebessem. Isso indica vigilância próxima.'},
  foto_pier:{title:'Foto do píer',category:'Homenagem',text:'Uma fotografia antiga reacendeu a memória do píer e dos lugares ligados à última noite de Jullia.'},
  plano_cameras:{title:'Plano das câmeras',category:'Investigação',text:'O grupo cogitou usar as câmeras da propriedade Gomes para descobrir quem circulou perto do lago e do jardim.'},
  cameras_mansao:{title:'Câmeras da mansão',category:'Investigação',text:'Existe a possibilidade de as câmeras da mansão terem registrado movimentações suspeitas perto da homenagem ou do lago.'},
  rota_jardim:{title:'Acesso ao jardim',category:'Investigação',text:'Quem tirou a foto durante a homenagem provavelmente conhecia bem as rotas internas da propriedade.'},
  porta_lateral:{title:'Porta lateral',category:'Investigação',text:'A porta lateral da propriedade ou do local investigado pode ter sido usada para entrar e sair sem chamar atenção.'},
  trilha_servico:{title:'Trilha de serviço',category:'Investigação',text:'Uma trilha ou passagem de serviço pode ter sido usada para se deslocar sem ser visto pelo grupo.'},
  funcionario_gomes:{title:'Funcionário dos Gomes',category:'Investigação',text:'Alguém ligado ao funcionamento da propriedade Gomes pode ter acesso a rotas, horários e áreas restritas.'},
  depoimentos_parecidos:{title:'Depoimentos parecidos',category:'Investigação',text:'Alguns relatos sobre aquela noite ou sobre a homenagem combinam demais entre si, como se parte da história tivesse sido ensaiada.'},
  culpa_breno:{title:'Culpa de Breno',category:'Investigação',text:'Breno revelou culpa por não ter impedido o uso do saco e a decisão de levar o corpo até o lago.'},
  celular_lago:{title:'Celular perto do lago',category:'Investigação',text:'Um celular ou vestígio eletrônico ligado ao lago pode conter provas sobre o que aconteceu depois da festa.'},
  carro_farol_apagado:{title:'Carro de farol apagado',category:'Investigação',text:'Foi notado um carro de farol apagado em circunstâncias suspeitas, possivelmente observando ou acompanhando o grupo.'},
  testemuhna_estrada:{title:'Testemunha da estrada',category:'Investigação',text:'Alguém pode ter visto movimentações estranhas na estrada na noite em que Jullia foi atropelada.'},
  testemunha_estrada:{title:'Testemunha da estrada',category:'Investigação',text:'Existe a possibilidade de alguém ter testemunhado parte do que aconteceu na estrada naquela noite.'},
  fita_vermelha_trilha:{title:'Fita vermelha na trilha',category:'Investigação',text:'Uma fita vermelha encontrada numa trilha pode indicar marcação de rota ou ter ficado presa na fuga de alguém.'},
  marca_cera_vermelha:{title:'Marca de cera vermelha',category:'Investigação',text:'O vestígio de cera vermelha pode estar ligado a algum objeto levado pelo perseguidor ou a uma encenação deliberada.'},
  mascara_lisa:{title:'Máscara pálida',category:'Ataque',text:'O perseguidor usava uma máscara clara, lisa e sem expressão, reforçando a sensação de que tudo foi planejado.'},
  testemunha_padaria:{title:'Testemunha na padaria',category:'Ataque',text:'Pessoas na padaria viram parte da fuga e podem confirmar que houve uma perseguição real.'},
  registro_ataque:{title:'Ataque registrado',category:'Ataque',text:'Pela primeira vez, o grupo cogitou formalizar um ataque sem necessariamente revelar todo o segredo do verão passado.'},
  marcas_arrasto:{title:'Marcas de arrasto',category:'Ataque',text:'Marcas no chão indicam que algo — ou alguém — pode ter sido arrastado em algum ponto importante da investigação.'},
  objeto_sarjeta:{title:'Objeto na sarjeta',category:'Ataque',text:'Um objeto encontrado na sarjeta pode ter pertencido ao perseguidor ou a alguém que passou pela cena antes do grupo.'},
  grade_passarela:{title:'Grade da passarela',category:'Ataque',text:'A passarela ou sua estrutura danificada pode indicar por onde o agressor passou ou onde houve confronto físico.'},
  promessa_sem_resposta:{title:'Promessa a alguém sem voz',category:'Telefonema',text:'A voz no telefone sugeriu que vocês fizeram uma promessa a alguém que já não podia responder.'},
  mensagens_apagadas_jullia:{title:'Mensagens apagadas',category:'Telefonema',text:'A ligação insinuou que mensagens de Jullia foram apagadas depois da noite do acidente.'},
  ligacao_telefone_fixo:{title:'Ligação no telefone antigo',category:'Telefonema',text:'A base do telefone de Isabella ainda estava ativa, apesar de quase nunca ser usada. Alguém sabia o número e a hora em que o grupo estaria reunido.'},
  video_reacao_samuel:{title:'Reação estranha de Samuel',category:'Telefonema',text:'Samuel pareceu reconhecer a mensagem ou a ameaça antes mesmo de ela ser totalmente mostrada aos demais.'},
  notebook_marina:{title:'Pista da marina',category:'Capítulo 3',text:'Um backup antigo ligado a Jullia parece estar guardado na marina velha dos Gomes.'},
  mensagens_restauradas:{title:'Mensagens restauradas',category:'Capítulo 3',text:'Fragmentos de conversas de Jullia foram recuperados, sugerindo que alguém apagou partes importantes de propósito.'},
  meia_confissao_samuel:{title:'Samuel sabe mais',category:'Capítulo 3',text:'Samuel admitiu ter omitido que viu alguém saindo da mata pouco antes do atropelamento.'},
  distintivo_arranhado:{title:'Fragmento do perseguidor',category:'Capítulo 3',text:'Durante a perseguição, alguém conseguiu arrancar ou encontrar um pequeno fragmento metálico ligado ao agressor.'},
  rota_subterranea:{title:'Agressor conhece a marina',category:'Capítulo 3',text:'O perseguidor usou acessos internos e rotas técnicas como alguém que conhecia muito bem a marina.'},
  voz_jullia_backup:{title:'Áudio de Jullia',category:'Capítulo 3',text:'Um gravador ou backup contém um áudio parcial de Jullia gravado pouco antes de tudo dar errado.'},
  acesso_audio_c5:{title:'Quem ouviu o áudio?',category:'Capítulo 5',text:'O áudio pode ter passado por um dispositivo dos Gomes antes de ser recuperado; não há confirmação sobre quem teve acesso.'},
  cracha_portao_c5:{title:'Crachá no portão',category:'Capítulo 5',text:'Uma foto anônima mostra um crachá com detalhe azul, talvez de equipe de apoio da propriedade Gomes.'},
  vigia_portao_c5:{title:'Lembrança da guarita',category:'Capítulo 5',text:'Samuel se recorda de uma figura com roupa escura perto da guarita, mas não pode confirmar a identidade.'},
  audio_ruido_motor:{title:'Ruído na gravação',category:'Capítulo 4',text:'Breno percebeu um som distante de motor ou gerador no áudio de Jullia. Ainda não é prova de um veículo.'},
  foto_van_origem:{title:'Ângulo da foto da van',category:'Capítulo 4',text:'Ryan identificou uma encosta perto da antiga cabine da estrada norte como possível ponto de captura da fotografia.'},
  moises_parou_portao:{title:'Moisés no portão',category:'Capítulo 3',text:'A presença ou movimentação de Moisés perto do portão levanta dúvidas sobre quanto ele sabe e quando chegou.'}
};

Object.assign(CLUE_DATA,window.UGRevisionClues||{},window.UGFinale108?.clues||{},window.UG7?.clues||{});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const baseSave=(name,pronouns,look)=>({hero:{name:name.trim(),pronouns,look},node:'p01',bonds:Object.fromEntries(ELENCO.map(x=>[x[0],50])),traits:{coragem:0,empatia:0,cautela:0},romance:Object.fromEntries(['ryan','breno','rayssa','rauanny'].map(id=>[id,{atracao:0,ressentimento:0}])),flags:{},clues:[],history:[],updated:Date.now(),saveVersion:19,socialReviewVersion:1,socialDepthVersion:1,knowledge:window.UGKnowledge?.empty?.()||null,interactive:inter?.empty?.()||null,social107:social?.empty?.()||null,finale108:window.UGFinale108?.empty?.()||null});

function chapterIdFromLabel(label=''){
  if(label.startsWith('PRÓLOGO')) return 'prologo';
  if(label.startsWith('CAPÍTULO 01')) return 'cap1';
  if(label.startsWith('CAPÍTULO 02')) return 'cap2';
  if(label.startsWith('CAPÍTULO 03')) return 'cap3';
  if(label.startsWith('CAPÍTULO 04')) return 'cap4';
  if(label.startsWith('CAPÍTULO 05')) return 'cap5';
  if(label.startsWith('CAPÍTULO 06')) return 'cap6';
  if(label.startsWith('CAPÍTULO 07')) return 'cap7';
  return 'prologo';
}
function chapterMetaForNode(nodeId){const node=window.NODES?.[nodeId];return CHAPTERS.find(c=>c.id===chapterIdFromLabel(node?.chapter||''))||CHAPTERS[0]}
function highestReached(a){
  if(!a||!a.node||!window.NODES?.[a.node]) return 0;
  const ids=[...new Set([chapterIdFromLabel(window.NODES[a.node].chapter), ...((a.history||[]).map(h=>chapterIdFromLabel(h.chapter)))])];
  return ids.reduce((m,id)=>Math.max(m,CHAPTERS.findIndex(c=>c.id===id)),0);
}
function normalize(a){
  if(!a||!a.hero||typeof a.hero.name!=='string'||!window.NODES?.[a.node]) return null;
  const b=baseSave(a.hero.name,a.hero.pronouns||'ele',a.hero.look||'casual');
  b.node=a.node;
  b.bonds={...b.bonds,...(a.bonds||{})};
  b.traits={...b.traits,...(a.traits||{})};
  b.romance={...b.romance,...(a.romance||{})};
  for(const id of Object.keys(b.romance)){b.romance[id]={atracao:0,ressentimento:0,...(b.romance[id]||{})};}
  b.flags=a.flags&&typeof a.flags==='object'?a.flags:{};b.friendBonds=a.friendBonds&&typeof a.friendBonds==='object'?{...a.friendBonds}:{};
  // Importações da V1.0 preservam a afinidade que já existia e recebem apenas eventos antigos ainda não computados.
  b.history=Array.isArray(a.history)?a.history.map(h=>({...h,effects:Array.isArray(h.effects)?[...h.effects]:[]})):[];
  b.socialReviewVersion=a.socialReviewVersion||0;
  if(b.socialReviewVersion<1&&window.UGReview?.socialForChoice){
    for(const entry of b.history){
      for(const [left,right,delta] of window.UGReview.socialForChoice(entry.node,entry.choice)){
        const pair=[left,right].sort().join(':');
        const from=Math.max(0,Math.min(100,relationBase(left,right)+(b.friendBonds[pair]||0)));
        b.friendBonds[pair]=Math.max(-100,Math.min(100,(b.friendBonds[pair]||0)+delta));
        const to=Math.max(0,Math.min(100,relationBase(left,right)+(b.friendBonds[pair]||0)));
        entry.effects.push({type:'friendBond',key:pair,name:[left,right].map(id=>ELENCO.find(x=>x[0]===id)?.[1]||id).join(' ↔ '),from,to,value:delta});
      }
    }
    b.socialReviewVersion=1;
  }
  b.clues=Array.isArray(a.clues)?a.clues:[];
  b.romanceEscolhido=['ryan','breno','rayssa','rauanny','solteiro'].includes(a.romanceEscolhido)?a.romanceEscolhido:null;
  if(!b.romanceEscolhido){const found=['ryan','breno','rayssa','rauanny'].find(id=>b.flags['romance_'+id+'_c5']);if(found)b.romanceEscolhido=found;else if(b.flags.romance_solteiro_c5)b.romanceEscolhido='solteiro';}
  b.socialDepthVersion=a.socialDepthVersion||0;
  window.UGConsequences?.migrateSocial?.(b,relationBase);
  b.knowledge=window.UGKnowledge?.restore?.(a.knowledge,b)||a.knowledge||null;
  b.interactive=inter?.restore?.(a.interactive)||b.interactive;
  b.social107=social?.restore?.(a.social107,b)||b.social107;
  b.finale108=window.UGFinale108?.restore?.(a.finale108,b)||b.finale108;
  b.updated=a.updated||Date.now();
  b.saveVersion=19;
  return b;
}
function slotKey(n){return SLOT_PREFIX+n}
function slotSave(n){try{return normalize(JSON.parse(localStorage.getItem(slotKey(n))||'null'))}catch{return null}}
function migrateLegacy(){
 if(localStorage.getItem('ultimo-grito-slots-migrated'))return;
 const legacy=[OLD_KEY,...LEGACY];
 for(const k of legacy){try{const raw=localStorage.getItem(k),data=raw&&normalize(JSON.parse(raw));if(data){if(!slotSave(1))localStorage.setItem(slotKey(1),JSON.stringify(data));break}}catch(e){console.warn(e)}}
 localStorage.setItem('ultimo-grito-slots-migrated','1');
}
function getSave(){migrateLegacy();return slotSave(activeSlot)}
function persist(){try{if(save)localStorage.setItem(slotKey(activeSlot),JSON.stringify(save))}catch(e){console.warn('Não foi possível salvar',e)}}
function interp(s){const name=save?.hero?.name?.split(' ')[0]||'Você';return esc(s).replaceAll('{nome}',esc(name))}
function formatted(s){return String(s||'').split(/\n\n/).flatMap(part=>{
 // Narration and dialogue occupy distinct cards even when the source previously joined them.
 const chunks=part.replace(/([^\n])\s+((?:Ryan|Breno|Rayssa|Rauanny|Laisla|Isabella|Allan|Samuel|Bella|Moisés|Você|Enfermeira|Policial|Atendente|Garçom|Número desconhecido|NÚMERO DESCONHECIDO):\s*[—-])/g,'$1\n\n$2').split(/\n\n/);
 return chunks.map(chunk=>{let content=chunk.trim();if(!content)return '';const m=content.match(/^([A-Za-zÀ-ÿ ]{2,32}|Você):\s*[—-]\s*([\s\S]*)$/);if(m){return `<div class="spoken"><div class="speaker-name">${interp(m[1]==='Você'?(save?.hero?.name||'Você'):m[1])}</div><p>${interp(m[2])}</p></div>`}if(content==='UM ANO DEPOIS.'||(content.startsWith('ENQUANTO ISSO')||content.startsWith('PONTO DE VISTA:')))return `<div class="intertitle">${interp(content)}</div>`;return `<p class="narrative">${interp(content).replaceAll('\n','<br>')}</p>`});
 }).join('')}
function allowed(req){return !req||req.every(([type,key,val])=>type==='flag'?Boolean(save.flags[key])===Boolean(val):type==='clue'?save.clues.includes(key)===Boolean(val):type==='bond'?(save.bonds[key]||0)>=val:true)}
function apply(effects){(effects||[]).forEach(([type,key,val])=>{if(type==='flag'){save.flags[key]=!!val;if(key.startsWith('romance_')&&key.endsWith('_c5')&&val)save.romanceEscolhido=key.slice(8,-3)}if(type==='clue'&&!save.clues.includes(key))save.clues.push(key);if(type==='set')save.flags[key]=val;if(type==='cross')save.flags['c6_crossed_'+key]=true;if(type==='death7'){const deaths=['samuel','breno','allan','ryan','rauanny','laisla','isabella','rayssa'].filter(id=>save.flags['c7_morto_'+id]).length;if(deaths<3)save.flags['c7_morto_'+key]=true;else save.flags['c7_ferido_'+key]=true;}if(type==='injury7')save.flags['c7_ferido_'+key]=true;if(type==='death'){const deaths=window.UG6?.countDeaths?.(save)||0;if(deaths<3)save.flags['c6_morto_'+key]=true;else {save.flags['c6_ferida_'+key]=true;save.flags['c6_crossed_'+key]=true;}}if(type==='romance'){save.romance[key]??={atracao:0,ressentimento:0};save.romance[key].atracao=Math.max(0,Math.min(100,save.romance[key].atracao+val))}if(type==='resent'){save.romance[key]??={atracao:0,ressentimento:0};save.romance[key].ressentimento=Math.max(0,Math.min(100,save.romance[key].ressentimento+val))}if(type==='trait')save.traits[key]=(save.traits[key]||0)+val;if(type==='bond')save.bonds[key]=Math.max(0,Math.min(100,(save.bonds[key]||50)+val));if(type==='friendBond'&&Array.isArray(key)&&key.length===2){save.friendBonds??={};const pair=pairKey(key[0],key[1]);save.friendBonds[pair]=Math.max(-100,Math.min(100,(save.friendBonds[pair]||0)+Number(val||0)))}})}

function ui(body){if(urgentInterval){clearInterval(urgentInterval);urgentInterval=null}app.innerHTML=`<div class="grain"></div><div class="ui">${body}</div>`;audio?.syncView(view)}
function header(chapter='UMA HISTÓRIA DE LAKEWOOD',isLanding=false){
  if(view==='game')return `<header class="app-header game-header"><div class="header-center"><div class="brand brand-center"><span class="og-mini">O ÚLTIMO</span><span class="og-grito">GRITO</span></div><div class="top-info">${esc(chapter)}</div></div><details class="game-drawer"><summary aria-label="Abrir opções do jogo">☰ OPÇÕES</summary><nav class="drawer-items" aria-label="Menu da partida"><button data-act="systems">◈ Sobrevivência, confiança e inventário</button><button data-act="journal">☰ Diário e relações</button><button data-act="cast">♧ Elenco</button><button data-act="phone">▣ Celular</button><button data-act="clues">⌘ Pistas e conexões</button><button data-act="butterfly">⌁ Efeito borboleta</button><button data-act="notebook">✎ Meu caderno</button><button data-act="recap">▶ Anteriormente na sua história</button><button data-act="chapters">☷ Capítulos</button><button data-act="slots">▣ Slots</button><button data-act="audio">♫ Ajustar áudio</button><button data-act="sound" aria-pressed="${!!audio?.enabled}">${audio?.enabled?'♫ Silenciar':'♪ Ativar som'}</button><button data-act="export">⇩ Exportar save</button><button data-act="import">⇧ Importar save</button><button data-act="menu">Ⅱ Menu principal</button></nav></details></header>`;
  return `<header class="app-header ${isLanding?'landing-header':''}"><button class="nav-home" data-act="menu">⌂ MENU</button><div class="header-center"><button class="brand brand-center" data-act="menu"><span class="og-mini">O ÚLTIMO</span><span class="og-grito">GRITO</span></button><div class="top-info">${esc(chapter)}</div></div><button class="sound" data-act="sound" aria-label="${audio?.enabled?'Desligar áudio':'Ativar músicas e efeitos sonoros'}" aria-pressed="${!!audio?.enabled}">${audio?.enabled?'♫ SOM ON':'♪ LIGAR'}</button></header>`;
}

function sound(){
 const playing=audio?.toggle();
 document.querySelectorAll('button[data-act="sound"]').forEach(btn=>{
   btn.textContent=btn.closest('.game-drawer')?(playing?'♫ Silenciar':'♪ Ativar som'):(playing?'♫ SOM ON':'♪ LIGAR');
   btn.setAttribute('aria-pressed',String(!!playing));
   btn.setAttribute('aria-label',playing?'Desligar áudio':'Ativar músicas e efeitos sonoros');
 });
 if(!playing&&audio?.unavailable)alert('Este navegador não oferece suporte ao áudio do jogo.');
}
function audioScreen(){
 if(view!=='audio')previousAudioView=view;
 view='audio';const opts=audio?.getSettings()||{enabled:false,music:55,effects:65};
 ui(`<main class="landing scenic forest"><div class="vignette"></div>${header('ÁUDIO E IMERSÃO')}<section class="panel audio-panel"><div class="eyebrow">O SOM DE LAKEWOOD</div><h1>Música e efeitos</h1><p>O jogo tem oito trilhas instrumentais originais que mudam de acordo com o clima da cena, além de efeitos de mensagens, passos, água e suspense. Use fones se quiser uma experiência mais imersiva.</p><div class="audio-status" aria-live="polite">${opts.enabled?'♫ Música e efeitos ativados':'♪ Áudio desligado — ative no botão abaixo'}</div><button class="primary full" data-act="sound-settings">${opts.enabled?'DESLIGAR ÁUDIO':'ATIVAR ÁUDIO ♫'}</button><div class="audio-sliders"><label for="audio-music">VOLUME DA MÚSICA <strong id="audio-music-value">${opts.music}%</strong></label><input id="audio-music" data-audio-volume="music" type="range" min="0" max="100" step="5" value="${opts.music}" aria-label="Volume da música"><label for="audio-effects">VOLUME DOS EFEITOS <strong id="audio-effects-value">${opts.effects}%</strong></label><input id="audio-effects" data-audio-volume="effects" type="range" min="0" max="100" step="5" value="${opts.effects}" aria-label="Volume dos efeitos"></div><div class="audio-preview"><button class="secondary" data-act="preview-message">✆ TESTAR NOTIFICAÇÃO</button><button class="secondary" data-act="preview-knock">⌁ TESTAR BATIDAS</button></div><p class="note">Por exigência dos navegadores, especialmente no iPhone, o som só começa depois que você toca em ATIVAR ÁUDIO. As preferências de volume ficam salvas neste navegador, sem alterar suas partidas.</p><button class="back" data-act="audio-back">← Voltar</button></section></main>`);
}
function audioBack(){view=previousAudioView==='audio'?'menu':previousAudioView;render()}

function menu(){
  view='menu'; const existing=getSave();
  ui(`<main class="landing scenic town"><div class="vignette"></div>${header('UMA HISTÓRIA DE LAKEWOOD',true)}<div class="landing-center"><div class="eyebrow">UM VERÃO. OITO SEGREDOS. UMA ÚLTIMA CHANCE.</div><div class="main-title og-logo" aria-label="O Último Grito"><span class="og-overline">O <em>ÚLTIMO</em></span><span class="og-headline">GRITO<span class="og-cut" aria-hidden="true"></span></span><span class="og-baseline">UM SEGREDO NUNCA MORRE</span></div><p class="tagline">Alguém sabe o que aconteceu naquela noite — e está cansado de esperar.</p><div class="actions"><button class="primary" data-act="new">NOVO JOGO <span>↗</span></button>${existing?'<button class="secondary" data-act="continue">CONTINUAR HISTÓRIA</button><button class="secondary" data-act="chapters">CAPÍTULOS</button><button class="secondary" data-act="recap">ANTERIORMENTE · SUA HISTÓRIA</button><button class="secondary" data-act="clues">QUADRO DE PISTAS</button><button class="secondary" data-act="phone">CELULAR INTERATIVO</button><button class="secondary" data-act="butterfly">EFEITO BORBOLETA</button><button class="secondary" data-act="export">EXPORTAR SAVE</button>':''}<button class="secondary" data-act="slots">PARTIDAS / SLOTS</button><button class="secondary" data-act="cast">CONHECER PERSONAGENS</button><button class="secondary" data-act="import">IMPORTAR SALVAMENTO</button><button class="secondary" data-act="audio">♫ CONFIGURAR ÁUDIO</button></div><p class="subtitle">V1.1.3 · CAPÍTULO 7 — A NOITE DOS TRAIDORES</p></div><footer>LAKEWOOD · VERÃO DE 2026 <span>V1.1.3 · LAKEWOOD</span></footer></main>`);
}
function creator(){
  view='creator';
  ui(`<main class="landing scenic house">${header('CRIAÇÃO DE PERSONAGEM')}<section class="panel creator"><div class="eyebrow">ANTES DE VOLTAR A LAKEWOOD</div><h1>Quem vai sobreviver?</h1><p>Você é o nono personagem dessa história. Os outros oito carregam o peso de um verão que ninguém deveria lembrar.</p><form id="creator"><label>SEU NOME COMPLETO<input name="name" maxlength="48" minlength="2" placeholder="Digite seu nome" required autocomplete="off"></label><div class="field-row"><label>PRONOMES<select name="pronouns"><option value="ela">Ela / dela</option><option value="ele">Ele / dele</option><option value="elu">Elu / delu</option></select></label><label>ESTILO VISUAL<select name="look"><option value="casual">Casual</option><option value="alternativo">Alternativo</option><option value="elegante">Elegante</option><option value="esportivo">Esportivo</option></select></label></div><p class="note">Os romances, as pistas e as consequências acompanharão esse personagem em todos os capítulos.</p><button class="primary full" type="submit">COMEÇAR PRÓLOGO ↗</button></form><button class="back" data-act="menu">← Voltar ao menu</button></section></main>`);
}
function sceneNode(id){const n=window.NODES?.[id];if(!n)return null;const resolved=window.UG6?.resolve?.(id,save)||n;const polished=window.UGPolish?.resolve?.(id,save,resolved)||resolved;const known=window.UGKnowledge?.resolve?.(id,save,polished)||polished;const cons=window.UGConsequences?.resolve?.(id,save,known)||known;const linked=inter?.resolve?.(id,save,cons)||cons;const enriched=social?.sceneAddon?.(save,id,linked)||linked;const continuous=window.UG108?.resolve?.(id,save,enriched)||enriched;const finalised=window.UGFinale108?.resolve?.(id,save,continuous)||continuous;return window.UG7?.resolve?.(id,save,finalised)||finalised;}
function game(){
  view='game'; if(save?.node && window.UG7?.enter?.(save,save.node))persist();if(save?.node && window.UGFinale108?.enter?.(save,save.node))persist(); if(save?.node && window.UGKnowledge?.enter?.(save,save.node))persist(); if(save?.node&&social?.enter?.(save,save.node))persist(); const n=sceneNode(save?.node); if(!n){menu();return}
  const choices=n.choices.filter(c=>allowed(c.requires));
  const active=inter?.activeAlert?.(save,n.id);
  const explore=social?.opportunity?.(save,n.id);const remembered=save?.social107?.scenes?.[n.id];
  const emergency=window.UG7?.timer?.(save,n.id,choices)||social?.timer?.(save,n.id,choices);
  if(urgentArmedNode!==n.id){urgentArmedNode=null;urgentRemaining=0;}
  const alertMarkup=active?`<aside class="narrative-alert" role="region" aria-label="Notificação recebida"><div class="notification-heading"><span class="notification-pulse" aria-hidden="true">●</span><b>CELULAR · ${esc(active.sender)}</b><span>${esc(active.time)}</span></div><p>${expandedAlert?esc(active.text):'Seu celular vibra com uma mensagem recebida agora.'}</p><div class="notification-actions">${expandedAlert?active.options.map(o=>`<button class="notification-option" data-alert-choice="${o.id}" data-alert-id="${active.id}">${esc(o.text)}</button>`).join(''):`<button class="notification-option" data-alert-open="${active.id}">LER AGORA</button>`}<button class="notification-skip" data-alert-choice="ignore" data-alert-id="${active.id}">${expandedAlert?'DEIXAR SEM RESPOSTA':'IGNORAR A NOTIFICAÇÃO'}</button></div></aside>`:'';
  const availableItems=social?.useOptions?.(save,n.id)||[]; const useMarkup=availableItems.length?`<section class=\"v107-explore\"><h3>OBJETOS À MÃO</h3><div class=\"v107-explore-actions\">${availableItems.map(o=>`<button class=\"secondary\" data-use-item=\"${o.id}\">${esc(o.label)}</button>`).join('')}</div></section>`:'';
  const usedMarkup=(social?.usedResults?.(save,n.id)||[]).map(t=>`<section class="v107-result">${esc(t)}</section>`).join('');
  const sceneExtras=explore?`<section class="v107-explore"><h3>EXPLORAR · ${esc(explore.title)}</h3><p>${esc(explore.intro)}</p><div class="v107-explore-actions">${explore.options.map(o=>`<button class="secondary" data-explore="${o.id}">${esc(o.text)}</button>`).join('')}</div></section>`:remembered?`<section class="v107-result">${esc(remembered.result)}</section>`:'';
  const timedReady=emergency&&urgentArmedNode!==n.id;const timeMarkup=emergency?(timedReady?`<section class="v107-timer-ready"><b>O PERIGO SE APROXIMA</b><p>Leia a cena antes de iniciar. Depois, você terá ${emergency.secs} segundos para decidir.</p><button class="primary" data-urgent-start="${n.id}">COMEÇAR DECISÃO URGENTE</button></section>`:`<div class="v107-countdown" role="timer" aria-label="Tempo restante">Tempo para agir: <strong id="v107-clock">${urgentRemaining}s</strong></div>`):'';
  ui(`<main class="play scenic ${esc(n.scene)}"><div class="vignette"></div>${header(n.chapter)}<div class="hud-left"><b>${esc(n.location)}</b><span>${esc(n.time)} · LAKEWOOD</span></div><div class="scene-accent">${n.scene==='phone'?'✆':n.scene==='lake'?'≈':n.scene==='road'?'⌁':n.scene==='party'?'✧':'◇'}</div><div class="dialogue"><div class="line-top"><span class="narrator">${esc(n.speaker||'NARRADOR')}</span><span class="chapter-index">${esc(n.chapter)}</span></div><div class="story-text">${formatted(n.text)}</div>${alertMarkup}${sceneExtras}${usedMarkup}${useMarkup}${timeMarkup}<div class="choices" ${timedReady?'hidden':''}>${choices.length?choices.map((c,i)=>`<button class="choice" data-choice="${i}"><span class="choice-num">${String(i+1).padStart(2,'0')}</span><span>${esc(c.text)}</span><b>↗</b></button>`).join(''):`<button class="primary" data-act="chapters">VER CAPÍTULOS ↗</button><button class="secondary" data-act="clues">QUADRO DE PISTAS</button><button class="secondary" data-act="menu">MENU PRINCIPAL</button>`}</div></div><div class="save-note">◆ PROGRESSO SALVO AUTOMATICAMENTE</div></main>`);
  audio?.syncNode(n);if(emergency&&!timedReady&&urgentArmedNode===n.id)startUrgentTick(n.id);
}
function startUrgentTick(id){if(urgentInterval)clearInterval(urgentInterval);urgentInterval=setInterval(()=>{if(view!=='game'||!save||save.node!==id){clearInterval(urgentInterval);urgentInterval=null;return}if(document.hidden)return;urgentRemaining--;const c=document.getElementById('v107-clock');if(c)c.textContent=Math.max(0,urgentRemaining)+'s';if(urgentRemaining<=0){clearInterval(urgentInterval);urgentInterval=null;urgentArmedNode=null;const n=sceneNode(id);const cc=n.choices.filter(v=>allowed(v.requires));if(cc.length)select(cc.length-1);}},1000);}
function exportSave(){const data=save||getSave();if(!data){alert('Nenhuma partida para exportar.');return}const payload=JSON.stringify({game:'o-ultimo-grito',format:1,save:normalize(data)},null,2);const blob=new Blob([payload],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='o-ultimo-grito-slot-'+activeSlot+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}
function importSave(){const picker=document.createElement('input');picker.type='file';picker.accept='.json,application/json';picker.onchange=async()=>{const f=picker.files?.[0];if(!f)return;if(f.size>2000000){alert('Arquivo muito grande.');return}try{const parsed=JSON.parse(await f.text());if(parsed.game!=='o-ultimo-grito'||parsed.format!==1)throw Error('Formato de salvamento incompatível.');const imported=normalize(parsed.save);if(!imported)throw Error('O ponto salvo não existe nesta versão ou os dados estão incompletos.');if(getSave()&&!confirm('Importar irá substituir APENAS o slot '+activeSlot+'. Deseja continuar?'))return;save=imported;persist();alert('Salvamento importado com sucesso!');game()}catch(e){alert('Não foi possível importar: '+e.message)}};picker.click()}
function select(i){
 const n=sceneNode(save.node),choices=n.choices.filter(c=>allowed(c.requires)),c=choices[i];if(!c)return;
 audio?.cue('toque');const before={...save.bonds},beforePairs={...save.friendBonds};
 const social=[...(window.UGReview?.socialForChoice?.(n.id,c.text)||[]),...(window.UGConsequences?.socialForChoice?.(n.id,c,save)||[])].map(([a,b,delta])=>['friendBond',[a,b],delta]);
 const effects=[...(c.effects||[]),...social];apply(effects);
 window.UG107?.onChoice?.(save,n.id,c,effects);
 window.UGFinale108?.onChoice?.(save,n.id,c,effects);
 save.history.push({node:n.id,choice:c.text,chapter:n.chapter,effects:effects.map(e=>{
   if(e[0]==='friendBond'&&Array.isArray(e[1])){
     const pair=pairKey(e[1][0],e[1][1]);
     const from=relationBase(e[1][0],e[1][1])+(beforePairs[pair]||0);
     const to=relationBase(e[1][0],e[1][1])+(save.friendBonds[pair]||0);
     const name=e[1].map(id=>ELENCO.find(x=>x[0]===id)?.[1]||id).join(' ↔ ');
     return {type:e[0],key:pair,value:e[2],name,from:Math.max(0,Math.min(100,from)),to:Math.max(0,Math.min(100,to))};
   }
   return {type:e[0],key:e[1],value:e[2],name:ELENCO.find(x=>x[0]===e[1])?.[1]||e[1],from:before[e[1]],to:save.bonds[e[1]]};
 })});
 window.UGKnowledge?.go?.(save,n.id,c.to,effects);
 save.node=c.to;save.updated=Date.now();expandedAlert=false;urgentArmedNode=null;persist();game();
}
function journal(){
  if(!save){menu();return} view='journal';
  const rows=save.history.slice().reverse().map(h=>`<li><small>${esc(h.chapter)}</small><div>${esc(h.choice)}</div>${h.effects.filter(e=>e.type==='bond'||e.type==='friendBond').length?`<span>${h.effects.filter(e=>e.type==='bond'||e.type==='friendBond').map(e=>`${esc(e.name)}: ${e.from} → ${e.to}`).join(' · ')}</span>`:''}</li>`).join('');
  ui(`<main class="landing scenic road">${header('DIÁRIO DE CONSEQUÊNCIAS')}<section class="panel wide"><div class="eyebrow">EFEITO BORBOLETA</div><h1>Suas escolhas deixam marcas.</h1><div class="consequence-overview"><h3>CONDIÇÕES E LEMBRANÇAS DO GRUPO</h3><div class="consequence-mini-grid">${ELENCO.map(([id,name])=>{const cond=window.UGConsequences?.status?.(save,id)||'Vivo';const n=window.UGConsequences?.memories?.(save,id)?.length||0;return `<button class="consequence-mini" data-person="${id}"><b>${esc(name)}</b><span>${esc(cond)}${n?' · '+n+' memória(s)':''}</span></button>`}).join('')}</div><p class="note">Toque em um nome para abrir sua ficha. As marcas só aparecem quando os acontecimentos foram registrados na partida.</p></div><div class="dashboard"><div><h3>PERSONAGENS</h3>${ELENCO.map(p=>`<div class="bond"><span>${esc(p[1])}</span><div class="meter"><i style="width:${save.bonds[p[0]]||50}%"></i></div><strong>${save.bonds[p[0]]||50}</strong></div>`).join('')}</div><div><h3>INTERESSE ROMÂNTICO</h3><p class="note">${save.romanceEscolhido?save.romanceEscolhido==='solteiro'?'Você preferiu não investir em uma relação romântica agora.':esc(ELENCO.find(p=>p[0]===save.romanceEscolhido)?.[1]||'—'):'Ainda não definido — decida no capítulo 5.'}</p><h3>AFINIDADES ROMÂNTICAS</h3>${['ryan','breno','rayssa','rauanny'].map(id=>`<p class="stat">${esc(ELENCO.find(x=>x[0]===id)?.[1]||id)} <strong>♥ ${save.romance?.[id]?.atracao||0} · Mágoas ${save.romance?.[id]?.ressentimento||0}</strong></p>`).join('')}<h3>TRAÇOS</h3>${Object.entries(save.traits).map(([k,v])=>`<p class="stat">${esc(k)} <strong>${v}</strong></p>`).join('')}<h3>DECISÕES (${save.history.length})</h3><ol class="history">${rows||'<li>Nenhuma decisão registrada.</li>'}</ol></div></div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="butterfly">LINHA DO TEMPO</button><button class="secondary" data-act="phone">CELULAR</button><button class="secondary" data-act="clues">VER PISTAS</button><button class="back" data-act="menu">← Menu</button></div></section></main>`);
}
const TRAITS={
 rayssa:[90,65,86,42,58],ryan:[75,70,76,82,48],laisla:[68,79,91,78,52],samuel:[37,83,72,85,78],rauanny:[66,87,92,87,63],allan:[79,72,83,95,61],isabella:[62,84,93,59,77],breno:[82,62,88,35,80]
};
// Retratos ilustrados oficiais do elenco (arquivos locais, sem rede ou APIs externas).
const CAST_PORTRAITS=Object.freeze({
  rayssa:'rayssa.webp',ryan:'ryan.webp',laisla:'laisla.webp',samuel:'samuel.webp',
  rauanny:'rauanny.webp',allan:'allan.webp',isabella:'isabella.webp',breno:'breno.webp'
});
function characterDead(id){return (id==='allan'&&!!save?.flags?.allan_morto_c4)||!!save?.flags?.['c6_morto_'+id]||!!save?.flags?.['c7_morto_'+id];}
function castPortrait(id,name,large=false){
  const image=CAST_PORTRAITS[id];
  if(!image)return `<div class="cast-portrait-placeholder" aria-hidden="true">${esc(name.charAt(0))}</div>`;
  const mode=large?'cast-art--large':'cast-art--card';
  const gone=characterDead(id)?' is-deceased':'';
  return `<div class="cast-art ${mode}${gone}"><img src="${image}" width="720" height="960" alt="Retrato ilustrado de ${esc(name)}" loading="eager" decoding="async">${characterDead(id)?'<span class="cast-art-memorial">EM MEMÓRIA</span>':''}</div>`;
}
const RELS={rayssa:[['isabella','Melhor amiga'],['samuel','Tensão pelo pacto'],['rauanny','Amizade'],['allan','Boa amizade']],ryan:[['rauanny','Muito próximo'],['laisla','Muito próximo'],['allan','Amizade divertida']],laisla:[['rauanny','Melhor amiga, com atritos'],['ryan','Muito próximo'],['samuel','Discussões ocasionais']],samuel:[['allan','Melhor amigo'],['isabella','Aliança tensa'],['rayssa','Conflito sobre a verdade']],rauanny:[['laisla','Melhor amiga, com atritos'],['ryan','Muito próximo'],['rayssa','Amizade']],allan:[['samuel','Melhor amigo'],['ryan','Amizade'],['isabella','Convivência direta']],isabella:[['rayssa','Melhor amiga'],['samuel','Aliança tensa'],['breno','Respeito mútuo']],breno:[['isabella','Respeito'],['allan','Amizade distante'],['ryan','Convivência'] ]};
// Afinidades do elenco: cada dupla tem um valor próprio, compartilhado nas duas fichas.
const RELATION_BASE={
 'rayssa:isabella':94,'laisla:rauanny':91,'ryan:rauanny':86,'laisla:ryan':85,
 'allan:samuel':92,'rayssa:samuel':26,'isabella:samuel':46,'laisla:samuel':39,
 'allan:ryan':74,'allan:rayssa':72,'allan:isabella':65,'allan:breno':40,
 'breno:isabella':66,'breno:ryan':55,'breno:rauanny':43,'breno:rayssa':59,
 'isabella:rauanny':60,'isabella:ryan':63,'isabella:laisla':58,'laisla:rayssa':64,
 'rayssa:rauanny':71,'ryan:samuel':61,'breno:samuel':47,'allan:laisla':67,
 'allan:rauanny':70,'breno:laisla':43,'isabella:allan':65
};
function pairKey(a,b){return [a,b].sort().join(':')}
function relationBase(a,b){const key=pairKey(a,b);return RELATION_BASE[key]??RELATION_BASE[key.split(':').reverse().join(':')]??55}
function relationScore(a,b){
 if(b==='hero')return Math.max(0,Math.min(100,save?.bonds?.[a]??50));
 const pair=pairKey(a,b);
 const base=relationBase(a,b);
 const offset=save?.friendBonds?.[pair]??0;
 const f=save?.flags||{};
 let event=0;
 if(pair===pairKey('laisla','rauanny')&&f.ferida_rauanny)event+=4;
 if(pair===pairKey('rayssa','samuel')&&f.samuel_viu_figura)event-=12;
 if(pair===pairKey('allan','samuel')&&f.allan_morto_c4)event-=8;
 if(pair===pairKey('rayssa','isabella')&&f.isa_confidenciou)event+=2;
 return Math.max(0,Math.min(100,base+offset+event));
}
function relationLabel(a,b){
 if(b==='hero')return 'Relação com você';
 const item=(RELS[a]||[]).find(x=>x[0]===b)||(RELS[b]||[]).find(x=>x[0]===a);
 return item?.[1]||'Amizade do grupo';
}
function relationRows(id){
 const others=[...ELENCO.filter(x=>x[0]!==id).map(x=>[x[0],x[1]]),['hero',save?.hero?.name||'Protagonista']];
 return others.map(([other,name])=>{
   const value=relationScore(id,other),detail=relationLabel(id,other);
   return `<div class="relationship-meter-row" title="${esc(detail)} · ${value}/100"><span class="relationship-person">${esc(name)}</span><div class="relationship-track" role="meter" aria-label="Afinidade entre ${esc(ELENCO.find(x=>x[0]===id)?.[1]||id)} e ${esc(name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div><span class="relationship-value">${value}</span></div>`;
 }).join('');
}
function characterStatus(id){
 if(save?.flags?.['c7_morto_'+id])return ['rayssa','isabella','laisla','rauanny'].includes(id)?'Falecida · Capítulo 7':'Falecido · Capítulo 7';
 if(save?.flags?.['c7_ferido_'+id])return 'Ferimento · Capítulo 7';
 if(save?.flags?.['c6_morto_'+id])return 'Falecido · Capítulo 6';
 if(id==='allan'&&save?.flags?.allan_morto_c4)return 'Falecido · Capítulo 4';
 const status=window.UGConsequences?.status?.(save,id);
 return status&&status!=='Sem ferimentos registrados' ? status+' · recuperação pendente' : 'Vivo · acompanhando os acontecimentos';
}
function physicalProfile(id){
 const cons=window.UGConsequences;
 if(!save||!cons)return '';
 const injuries=cons.injury(save,id);
 const memories=cons.memories(save,id);
 const condition=cons.status(save,id);
 return `<section class="condition-profile"><h3>CONDIÇÃO FÍSICA</h3><p class="physical-state">${esc(condition)}</p>${injuries.items.length?`<ul class="condition-list">${injuries.items.map(w=>`<li><strong>${esc(w.label)}</strong><small>${esc(w.source)} · ${esc(w.part)}${w.treated?' · cuidados improvisados recebidos':''}</small></li>`).join('')}</ul>`:'<p class="note">Nenhuma lesão persistente registrada neste slot.</p>'}<h3>MEMÓRIAS EMOCIONAIS</h3>${memories.length?`<div class="memory-list">${memories.map(m=>`<article class="memory-item"><strong>${esc(m.title)}</strong><p>${esc(m.description)}</p></article>`).join('')}</div>`:'<p class="note">Ainda não há um acontecimento emocional marcante registrado para este personagem.</p>'}</section>`;
}
function cast(){if(!save)save=getSave();view='cast';castSelected=null;renderCast()}
function renderCast(){
 const selected=ELENCO.find(x=>x[0]===castSelected);
 let content='';
 if(selected){const [id,name,age,desc]=selected;const dims=['Empatia','Coragem','Lealdade','Extroversão','Perspicácia'];const vals=TRAITS[id]||[50,50,50,50,50];const romance=save?.romance?.[id];content=`<button class="back" data-act="castback">← Voltar aos oito amigos</button><div class="char-head">${castPortrait(id,name,true)}<div><div class="eyebrow">PERFIL DE PERSONAGEM</div><h1>${esc(name)}</h1><p>${age} anos · ${esc(characterStatus(id))}</p><p>${esc(desc)}</p></div></div><div class="dashboard"><section><h3>CARACTERÍSTICAS</h3>${dims.map((d,i)=>`<div class="bond"><span>${d}</span><div class="meter"><i style="width:${vals[i]}%"></i></div><strong>${vals[i]}</strong></div>`).join('')}<p class="note">Traços de personalidade-base; o relacionamento com o protagonista evolui com as escolhas.</p></section><section><h3>RELACIONAMENTOS</h3>${relationRows(id)}<p class="note">Barras de afinidade com todo o grupo. Os valores variam conforme as relações e os acontecimentos da história.</p>${romance?`<p class="note">Rota afetiva: ${save?.romanceEscolhido===id?'APROXIMAÇÃO EXCLUSIVA (SEM NAMORO OFICIAL)':save?.romanceEscolhido?'AMIZADE':'AINDA EM ABERTO'} · Sua atração: ${romance.atracao}/100 · Mágoas: ${romance.ressentimento}/100</p>`:''}<h3>ESTADO ATUAL</h3><p>${esc(characterStatus(id))}</p></section></div>${physicalProfile(id)}`;
 }else content=`<div class="eyebrow">O GRUPO DE AMIGOS</div><h1>Oito amigos. Um segredo.</h1><p>Clique em um card para conhecer seus traços, relações e estado atual.</p><div class="cast-grid">${ELENCO.map(([id,name,age,desc],i)=>`<button class="cast-card cast-click${characterDead(id)?' cast-card--memorial':''}" data-person="${id}" aria-label="Abrir perfil de ${esc(name)}">${castPortrait(id,name)}<div class="cast-info"><b>${esc(name)}</b><small>${age} ANOS</small><p>${esc(desc)}</p><span>${save?esc(window.UGConsequences?.status?.(save,id)||'Vivo')+' · ':''}Confiança: ${save?.bonds?.[id]??50}/100 · VER PERFIL ↗</span></div></button>`).join('')}</div>`;
 ui(`<main class="landing scenic lake">${header('PERSONAGENS DE LAKEWOOD')}<section class="panel wide cast-panel">${content}<button class="primary" data-act="${save?'resume':'menu'}">${save?'VOLTAR À HISTÓRIA':'VOLTAR AO MENU'} ↗</button></section></main>`)
}
function slotsScreen(){view='slots';migrateLegacy();ui(`<main class="landing scenic house">${header('SALVAMENTOS')}<section class="panel wide"><div class="eyebrow">LINHAS DO TEMPO</div><h1>Minhas partidas</h1><p>Você pode criar até 3 histórias independentes. A partida antiga foi preservada no slot 1 quando encontrada. Exporte os slots antes de mudar de navegador ou computador.</p><div class="slot-grid">${[1,2,3].map(i=>{const d=slotSave(i),cur=d&&chapterMetaForNode(d.node);return `<article class="slot-card ${activeSlot===i?'active':''}"><small>SLOT ${i} ${activeSlot===i?'· ATIVO':''}</small><h3>${esc(d?.hero?.name||'Vazio')}</h3><p>${d?esc(cur.short+' — '+cur.title):'Nenhum progresso neste slot'}</p><button class="secondary" data-slot="${i}">${d?'CARREGAR PARTIDA':'USAR SLOT VAZIO'} ↗</button></article>`}).join('')}</div><div class="actions"><button class="primary" data-act="menu">MENU PRINCIPAL</button><button class="secondary" data-act="import">IMPORTAR PARA SLOT ATIVO</button><button class="secondary" data-act="export">EXPORTAR SLOT ATIVO</button></div></section></main>`)}
function recapScreen(){
 if(!save){menu();return}view='recap';const chapters=window.UGFinale108?.recap?.(save)||[];
 const sections=chapters.map(c=>`<section class="v108-recap-chapter"><div class="eyebrow">${c.ch===0?'PRÓLOGO':'CAPÍTULO '+String(c.ch).padStart(2,'0')}</div><h2>${esc(c.title)}</h2>${c.lines.map(t=>`<p>${esc(t)}</p>`).join('')}</section>`).join('');
 ui(`<main class="landing scenic lake">${header('ANTERIORMENTE EM O ÚLTIMO GRITO')}<section class="panel wide v108-recap"><div class="eyebrow">A HISTÓRIA QUE VOCÊ VIVEU</div><h1>Anteriormente em O Último Grito...</h1><p>Este resumo acompanha somente os acontecimentos já concluídos no seu slot. Os destinos e as descobertas variam conforme suas decisões.</p>${sections||'<p>Comece sua história para desbloquear a recapitulação.</p>'}<div class="actions"><button class="primary" data-act="resume">CONTINUAR MINHA HISTÓRIA ↗</button><button class="secondary" data-act="journal">DIÁRIO</button></div></section></main>`);
}
function chaptersScreen(){
  if(!save) save=getSave(); view='chapters';
  const highest=save?highestReached(save):0; const current=save?chapterMetaForNode(save.node).id:'prologo';
  ui(`<main class="landing scenic house">${header('MENU DE CAPÍTULOS')}<section class="panel wide"><div class="eyebrow">PROGRESSO DA HISTÓRIA</div><h1>Capítulos de O Último Grito</h1><p>Os capítulos aparecem conforme sua jornada avança. Este menu registra onde você já chegou e qual parte da história está em andamento.</p><div class="chapter-grid">${CHAPTERS.map((ch,idx)=>{const unlocked=idx<=highest; const state=!save?'Bloqueado':current===ch.id?'Atual':idx<highest?'Concluído':unlocked?'Desbloqueado':'Bloqueado'; return `<article class="chapter-card ${unlocked?'':'locked'}"><small>${esc(ch.short)}</small><h3>${esc(ch.title)}</h3><p>${esc(ch.summary)}</p><span class="chapter-state">${state}</span></article>`}).join('')}</div><div class="actions"><button class="primary" data-act="${save?'resume':'menu'}">${save?'VOLTAR À HISTÓRIA':'VOLTAR AO MENU'} ↗</button>${save?'<button class="secondary" data-act="clues">ABRIR PISTAS</button>':''}</div></section></main>`);
}
function clueCard(key){const meta=CLUE_DATA[key]||{title:key.replaceAll('_',' '),category:'Outras',text:'Pista registrada no histórico da sua partida.'};return `<article class="clue-card"><small>${esc(String(meta.category||'Outras').toUpperCase())}</small><h4>${esc(meta.title)}</h4><p>${esc(meta.text)}</p></article>`}
function cleanBubble(m){const txt=String(m.text||'').trim();const pre=String(m.who||'')+':';return txt.startsWith(pre)?txt.slice(pre.length).trim():txt;}
function phoneScreen(){
 if(!save){menu();return}view='phone';
 const baseThreads=social?.phoneThreads?.(save,inter.threads(save))||inter.threads(save);const threads=window.UG7?.phoneThreads?.(save,baseThreads)||baseThreads;if(!threads.some(t=>t.id===phoneThread))phoneThread=threads[0]?.id||'grupo';
 const current=threads.find(t=>t.id===phoneThread),replies=social?.phoneChoices?.(save,current,inter.choicesFor(save,current))||inter.choicesFor(save,current);
 const nav=(tab,label)=>`<button class="phone-tab ${phoneTab===tab?'active':''}" data-phone-tab="${tab}">${label}</button>`;
 const chats=`<div class="phone-grid"><nav class="phone-threads" aria-label="Conversas disponíveis">${threads.length?threads.map(t=>{const latest=t.messages[t.messages.length-1];const preview=latest?`${latest.who==='Você'?'Você: ':''}${latest.text}`:t.sub;return `<button class="phone-thread ${t.id===phoneThread?'active':''}" data-phone-thread="${t.id}" aria-current="${t.id===phoneThread?'page':'false'}"><strong>${esc(t.name)}</strong><small class="phone-preview">${esc(preview)}</small></button>`}).join(''):'<p class="note">As conversas aparecem conforme você avança na história.</p>'}</nav><div class="phone-messages" aria-live="polite">${current?`<h3>${esc(current.name)}</h3><p class="phone-sub">${esc(current.sub)}</p>${current.messages.map(m=>`<div class="phone-bubble ${m.who==='Você'?'mine':m.who==='Sistema'?'system':''}"><small>${esc(m.who)}${m.time?' · '+esc(m.time):''}</small><p>${esc(cleanBubble(m))}</p></div>`).join('')}${replies.length?`<div class="phone-replies"><h4>Responder</h4>${replies.map(o=>`<button class="phone-reply" data-phone-reply="${o.id}" data-phone-key="${esc(current.replyKey)}">${esc(o.text)}</button>`).join('')}</div>`:''}`:'<p class="note">Nenhuma conversa disponível neste momento.</p>'}</div></div>`;
 const pictures=inter.media(save),calls=[...inter.callLog(save),...(window.UG7?.callLog?.(save)||[])];
 const extras=phoneTab==='files'?`<div class="phone-attachments"><h3>Arquivos recebidos</h3><p class="phone-help">Selecione um arquivo para examinar os detalhes e guardar uma observação como pista.</p>${pictures.length?pictures.map(([id,name])=>{const d=inter.mediaDetails?.[id];const reviewed=save.interactive?.mediaReviewed?.includes(id);return `<article class="phone-file"><span>${d?.kind==='Registro de áudio'?'♫':'▣'}</span><div><b>${esc(name)}</b><small>${esc(d?.kind||'Arquivo digital')} ${reviewed?'· ANALISADO':''}</small><button class="file-review" data-media-open="${esc(id)}">${selectedMedia===id?'FECHAR DETALHES':'EXAMINAR ARQUIVO'}</button>${selectedMedia===id?`<div class="file-detail"><small>${esc(d?.description||CLUE_DATA[id]?.text||'Arquivo encontrado.')}</small>${reviewed?'<p>✓ Observação incorporada às pistas.</p>':`<button class="file-review file-review--record" data-media-save="${esc(id)}">REGISTRAR OBSERVAÇÃO ↗</button>`}</div>`:''}</div></article>`}).join(''):'<p class="note">Você ainda não encontrou fotografias ou gravações para guardar.</p>'}</div>`:phoneTab==='calls'?`<div class="phone-attachments"><h3>Histórico de ligações</h3>${calls.length?calls.map(c=>`<article class="phone-file"><span>✆</span><div><b>${esc(c.who)}</b><small>${esc(c.status)}</small></div></article>`).join(''):'<p class="note">Nenhuma ligação relevante foi registrada nesta partida.</p>'}</div>`:chats;
 ui(`<main class="landing scenic phone"><div class="vignette"></div>${header('CELULAR DO PROTAGONISTA')}<section class="panel wide phone-panel"><div class="eyebrow">LAKEWOOD · APARELHO PESSOAL</div><h1>Seu celular</h1><p>Mensagens, arquivos e chamadas que chegaram até você nesta história. As respostas ficam registradas no slot e não revelam o que ainda não aconteceu.</p><div class="phone-shell"><div class="phone-top"><span>● ● ●</span><b>LAKEWOOD / MENSAGENS</b><span>▣</span></div><div class="phone-tabs">${nav('chats','Conversas')}${nav('files','Arquivos')}${nav('calls','Chamadas')}</div>${extras}</div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="clues">INVESTIGAR PISTAS</button><button class="secondary" data-act="notebook">MEU CADERNO</button></div></section></main>`);
}
function notebookScreen(){if(!save){menu();return}view='notebook';ui(`<main class="landing scenic house">${header('ANOTAÇÕES DO JOGADOR')}<section class="panel wide"><div class="eyebrow">ARQUIVO PESSOAL</div><h1>O que você suspeita?</h1><p>Um espaço só seu, para anotar teorias e detalhes antes que o próximo capítulo chegue. Suas anotações não modificam a história nem são mostradas aos personagens.</p><label class="notes-label" for="player-notes">SEU CADERNO · MÁXIMO 1.500 CARACTERES</label><textarea id="player-notes" class="player-notes" data-player-notes maxlength="1500" placeholder="Quem parecia saber demais? Que pistas ainda não combinam?">${esc(save.interactive?.notes||'')}</textarea><p class="note" id="notes-status" role="status">Salvo automaticamente neste slot.</p><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="clues">QUADRO DE PISTAS</button><button class="secondary" data-act="butterfly">EFEITO BORBOLETA</button></div></section></main>`);}
function butterflyHistoryTitle(h){
 const c=String(h?.choice||'').trim(),node=String(h?.node||'').toLowerCase(),low=c.toLocaleLowerCase('pt-BR');
 if(!c||/^(?:continuar|prosseguir|ir até|voltar à história|seguir em frente|avançar|olhar novamente|retornar à perspectiva)/i.test(c))return null;
 if(/j_funeral_choice_/.test(node))return /lembre do seu sonho|aconteça o que acontecer/i.test(c)?'Seu sonho foi confiado a um amigo':'Uma confidência guardada entre amigos';
 if(/j_funeral_/.test(node))return /vela|estrela|prédio/i.test(c)?'Uma despedida sob as estrelas':/música|foto|história engraçada/i.test(c)?'Uma despedida com música e lembranças':'Uma despedida reservada a quem ama você';
 if(/j_talk_end_/.test(node))return 'Uma promessa feita a um amigo';
 if(/j_past_/.test(node))return /arte|artístic|reconhecido/i.test(c)?'Você compartilhou seu sonho artístico':/familia|aceito|aceitação/i.test(c)?'Uma conversa sobre aceitação familiar':/tranquila|cercada/i.test(c)?'Seu desejo de uma vida tranquila':'A vontade de descobrir seu próprio futuro';
 if(/j_memory_/.test(node))return 'O medo de partir cedo demais';
 if(/j_talk_/.test(node))return 'Uma conversa sobre o que ficou para trás';
 if(/j_party/.test(node)||/convidar|confirmar os convidados/i.test(c))return 'Quem você chamou para a investigação';
 if(/j_date_|j_dinner_/.test(node))return /beij|abraç|mão|aproxim/i.test(low)?'Um gesto de carinho durante o jantar':'Uma noite com alguém especial';
 if(/j_call|j_h0[1-3]/.test(node)&&/moisés|ligação|atender|telefone|socorro/i.test(low))return 'A última ligação de Moisés';
 if(/j_m0[1-9]|j_death_gate/.test(node))return 'A decisão de Moisés na oficina';
 if(/j_npc/.test(node))return 'Uma escolha de sobrevivência em outro setor';
 if(/j_crisis|j_route|j_move|j_escape/.test(node))return 'A fuga pelos acessos da oficina';
 if(/j_evidence|j_body/.test(node))return 'Os vestígios deixados por Moisés';
 if(/j_last/.test(node))return 'O que você contou aos sobreviventes';
 if(/j_/.test(node))return 'Uma decisão durante a noite dos traidores';
 if(/romance|beij|jantar|abraç/i.test(low))return 'O relacionamento que você escolheu construir';
 if(/pista|fotografi|documento|prova/i.test(low))return 'Uma evidência preservada';
 if(/ajud|salvar|puxar|proteg/i.test(low))return 'Você tentou proteger alguém';
 return c.replace(/[.!?]+$/,'').slice(0,95);
}
function butterflyScreen(){if(!save){menu();return}view='butterfly';const events=[...inter.timeline(save),...((save.social107?.events||[]).map((e,i)=>({id:'social-'+i,chapter:e.chapter,kind:e.kind,title:e.kind==='segredo'?'Um segredo que mudou a confiança':e.kind==='confiança'?'Confiança entre amigos':e.kind==='inventário'?'Um objeto guardado para depois':e.kind==='iniciativa'?'Um amigo tomou uma iniciativa':'Um acontecimento entre os amigos',text:e.label}))),...((save.history||[]).filter(h=>/^CAPÍTULO 0[1-9]|^CAPÍTULO 10/.test(h.chapter)&&h.choice).slice(-100).map((h,i)=>({id:'history-'+i,chapter:Number((h.chapter.match(/CAPÍTULO\s+0?(\d+)/)||[])[1]||0),kind:'decisão',title:butterflyHistoryTitle(h),text:h.choice})).filter(e=>e.title))];
 const chapterNumber=x=>{if(typeof x==='number')return x;const m=String(x||'').match(/CAP[IÍ]TULO\s+0?(\d+)/i);return m?Number(m[1]):/PR[OÓ]LOGO/i.test(String(x||''))?0:-1};
 const eventsSorted=events.map((e,i)=>({...e,chapter:chapterNumber(e.chapter),_order:i})).filter(e=>e.chapter>=0&&e.chapter<=highestReached(save)).sort((a,b)=>(b.chapter-a.chapter)||(b._order-a._order));
 const important=(save.history||[]).filter(h=>(h.effects||[]).some(e=>['death','death7','friendBond','clue'].includes(e.type))).slice().reverse().slice(0,35);
 ui(`<main class="landing scenic forest">${header('EFEITO BORBOLETA')}<section class="panel wide"><div class="eyebrow">A SUA LINHA DO TEMPO</div><h1>Uma escolha deixa marcas.</h1><p>Eventos organizados do capítulo mais recente para o primeiro, com as últimas decisões de cada capítulo no topo. Nenhum resultado futuro é revelado.</p><div class="butterfly-timeline">${eventsSorted.length?eventsSorted.map(e=>`<article class="butterfly-event"><small>CAPÍTULO ${e.chapter===0?'PRÓLOGO':String(e.chapter).padStart(2,'0')} · ${esc(String(e.kind||'evento').toUpperCase())}</small><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></article>`).join(''):'<p class="note">Suas decisões mais importantes aparecerão aqui conforme a história avançar.</p>'}</div><div class="butterfly-record"><h3>Escolhas recentes com consequências registradas</h3>${important.length?important.map(h=>`<article class="butterfly-choice"><small>${esc(h.chapter)}</small><p>${esc(h.choice)}</p></article>`).join(''):'<p class="note">Nem todas as escolhas têm consequências imediatas. Continue a história.</p>'}</div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="clues">INVESTIGAÇÃO</button><button class="secondary" data-act="notebook">MINHAS NOTAS</button></div></section></main>`);
}
function investigationLinks(){const defs=inter.connections,have=new Set(save.interactive?.connections||[]);
 const available=(Array.isArray(defs)?defs:[]).filter(c=>c&&inter.found(save,c));
 const known=(Array.isArray(defs)?defs:[]).filter(c=>c&&have.has(c.id));
 return `<section class="investigation-workbench"><div class="eyebrow">NOVO · LABORATÓRIO DE PISTAS</div><h2>Conectar evidências</h2><p>Encontre duas pistas relacionadas para registrar uma hipótese. Nenhuma conexão prova, por si só, a identidade do mascarado.</p><div class="investigation-pair-grid">${available.length?available.map(c=>`<article class="connection-card ${have.has(c.id)?'done':''}"><small>DUAS PISTAS DISPONÍVEIS</small><h4>${esc(CLUE_DATA[c.a]?.title||c.a)} <span>+</span> ${esc(CLUE_DATA[c.b]?.title||c.b)}</h4><button class="secondary" data-connect="${c.id}" ${have.has(c.id)?'disabled':''}>${have.has(c.id)?'HIPÓTESE REGISTRADA ✓':'RELACIONAR AS PISTAS ↗'}</button></article>`).join(''):'<p class="note">Continue procurando evidências. Quando você encontrar um par relevante, poderá cruzá-lo aqui.</p>'}</div>${known.length?`<h3>Hipóteses construídas por você (${known.length})</h3><div class="theory-connections">${known.map(c=>`<article class="memory-item"><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p></article>`).join('')}</div>`:''}<p class="note">Conexões são salvas por slot. Nenhuma pista inexistente é adicionada automaticamente à sua investigação.</p></section>`;
}

function theories(){
  const items=[];
  if(save?.clues.includes('bella_trilha_c6'))items.push('Bella Gomes afirmou ter seguido Jullia pela mata antes do atropelamento. Isso pode explicar parte do relato de Samuel, mas não identifica o mascarado.');
  if(save?.clues.includes('foto_dentro_apartamento_c6'))items.push('O perseguidor obteve uma fotografia feita de dentro do apartamento de Laisla, sugerindo acesso direto ou informação fornecida por outra pessoa.');
  if(save?.clues.includes('moises_alerta_c6'))items.push('Moisés parece ter medo de alguém que demonstra arrependimento. Por que ele estava no condomínio após o ataque?');
  if(save?.clues.includes('mensagens_apagadas_jullia')) items.push('Alguém apagou mensagens de Jullia depois da noite do acidente.');
  if(save?.clues.includes('video_reacao_samuel')||save?.clues.includes('meia_confissao_samuel')) items.push('Samuel sabe mais do que está admitindo sobre aquela noite.');
  if(save?.clues.includes('moises_provocou')||save?.clues.includes('moises_relacao')) items.push('Moisés continua sendo um suspeito plausível, mas talvez esteja escondendo dor, não culpa.');
  if(save?.clues.includes('distintivo_arranhado')) items.push('O perseguidor deixou para trás um fragmento metálico que pode revelar sua origem.');
  if(save?.clues.includes('pacto_verao')||save?.flags?.sobreviveu_primeiro_ataque) items.push('As ameaças giram em torno do pacto feito após o corpo de Jullia ter sido jogado no lago.');
  return items.length?items:['Ainda faltam pistas para montar uma teoria forte. Continue jogando e observando quem reage de forma estranha.'];
}
function cluesScreen(){
  if(!save){menu();return} view='clues';
  const categories={}; (Array.isArray(save.clues)?save.clues:[]).filter(key=>typeof key==='string').forEach(key=>{const cat=String(CLUE_DATA[key]?.category||'Outras'); (categories[cat]??=[]).push(key)});
  const sections=Object.entries(categories).map(([cat,keys])=>`<section class="clue-section"><h3>${esc(cat)}</h3><div class="clue-grid">${keys.map(clueCard).join('')}</div></section>`).join('');
  ui(`<main class="landing scenic forest">${header('QUADRO DE INVESTIGAÇÃO')}<section class="panel wide"><div class="eyebrow">PISTAS E TEORIAS</div><h1>O que você já sabe</h1><p>Esta aba organiza melhor as pistas encontradas. Aqui ficam separadas as informações sobre o passado, as ameaças atuais e as principais teorias levantadas pelo grupo.</p><div class="investigation-layout"><div><h3>TEORIAS ATUAIS</h3><ul class="theory-list">${theories().map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h3>PONTO ATUAL</h3><p class="note">${esc(chapterMetaForNode(save.node).short)} · ${esc(chapterMetaForNode(save.node).title)}</p></div><div><h3>PISTAS DESCOBERTAS (${save.clues.length})</h3>${sections||'<p class="note">Você ainda não encontrou pistas registradas.</p>'}</div></div>${investigationLinks()}<div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="phone">CELULAR</button><button class="secondary" data-act="notebook">ANOTAÇÕES</button><button class="secondary" data-act="journal">VER DIÁRIO</button><button class="back" data-act="menu">← Menu</button></div></section></main>`);
}

function systemsScreen(){if(!save){menu();return}view='systems';const x=social.state(save);const status=social.trustRows(save);const items=x.inventory;const personality=x.personality;const secrets=Object.keys(x.secrets||{}).length;
 ui(`<main class="landing scenic house">${header('SOBREVIVÊNCIA E RELAÇÕES')}<section class="panel wide"><div class="eyebrow">SEUS RECURSOS · SEU SLOT</div><h1>O que você carrega</h1><p>Confiança, suspeitas e objetos mudam conforme suas decisões. Os amigos também podem agir por conta própria quando a situação exige.</p><div class="v107-dashboard"><section><h2>Confiança e desconfiança</h2>${status.map(r=>`<div class="v107-trust-row"><b>${esc(r.name)}${r.dead?' · EM MEMÓRIA':''}</b><small>Confiança ${r.trust} · Suspeita ${r.suspicion}</small><div class="v107-track"><span style="width:${r.trust}%"></span></div></div>`).join('')}</section><section><h2>Inventário narrativo</h2>${items.length?items.map(id=>`<article class="v107-item"><b>${esc(social.objects[id]?.name||id)}</b><p>${esc(social.objects[id]?.desc||'Objeto encontrado na história.')}</p></article>`).join(''):'<p class="note">Você ainda não guardou objetos durante a história.</p>'}<h2>Personalidade em construção</h2>${Object.entries(personality).map(([k,v])=>`<div class="v107-trust-row"><b>${esc(k.charAt(0).toUpperCase()+k.slice(1))}</b><small>${v}/100</small><div class="v107-track"><span style="width:${v}%"></span></div></div>`).join('')}<p class="note">Informações mantidas em sigilo: ${secrets}. O conteúdo de mentiras e segredos não é exibido para evitar revelar o mistério.</p></section></div><div class="v107-settings"><h2>Acessibilidade das decisões urgentes</h2><p>Nos momentos de perigo, o relógio só começa quando você tocar em «Começar decisão urgente». Você pode jogar sem limite de tempo.</p><button class="secondary" data-urgency-toggle="1">${x.timedOff?'ATIVAR CRONÔMETRO NAS PERSEGUIÇÕES':'DESATIVAR CRONÔMETRO · JOGAR SEM PRESSA'}</button><p class="note">Descrições gráficas de violência podem ser suavizadas sem alterar as mortes nem as escolhas.</p><button class="secondary" data-gore-toggle="1">${x.graphicOff?'ATIVAR DESCRIÇÕES GRÁFICAS':'REDUZIR DETALHES GRÁFICOS'}</button></div><div class="actions"><button class="primary" data-act="resume">VOLTAR À HISTÓRIA ↗</button><button class="secondary" data-act="phone">ABRIR CELULAR</button><button class="secondary" data-act="journal">DIÁRIO</button></div></section></main>`);
}
function render(){ if(view==='systems') systemsScreen(); else if(view==='menu') menu(); else if(view==='creator') creator(); else if(view==='game') game(); else if(view==='journal') journal(); else if(view==='cast') renderCast(); else if(view==='slots')slotsScreen(); else if(view==='chapters') chaptersScreen(); else if(view==='recap') recapScreen(); else if(view==='clues') cluesScreen(); else if(view==='phone')phoneScreen(); else if(view==='notebook')notebookScreen(); else if(view==='butterfly')butterflyScreen(); else if(view==='audio')audioScreen(); }

app.addEventListener('click',e=>{
  const alertOpen=e.target.closest('[data-alert-open]');if(alertOpen){expandedAlert=true;game();audio?.cue('mensagem');return;}
  const alertChoice=e.target.closest('[data-alert-choice]');if(alertChoice&&save){if(inter.chooseAlert(save,alertChoice.dataset.alertId,alertChoice.dataset.alertChoice)){persist();audio?.cue('toque');}expandedAlert=false;game();return;}
  const mediaOpen=e.target.closest('[data-media-open]');if(mediaOpen){selectedMedia=selectedMedia===mediaOpen.dataset.mediaOpen?null:mediaOpen.dataset.mediaOpen;phoneScreen();return;}
  const mediaSave=e.target.closest('[data-media-save]');if(mediaSave&&save){if(inter.examineMedia(save,mediaSave.dataset.mediaSave))persist();phoneScreen();return;}
  const tab=e.target.closest('[data-phone-tab]');if(tab){phoneTab=tab.dataset.phoneTab;phoneScreen();return;}
  const thread=e.target.closest('[data-phone-thread]');if(thread){phoneThread=thread.dataset.phoneThread;phoneScreen();return;}
  const reply=e.target.closest('[data-phone-reply]');if(reply&&save){const key=reply.dataset.phoneKey,id=reply.dataset.phoneReply;const ok=key.startsWith('v107-')?social?.phoneReply?.(save,key,id):inter.reply(save,key,id);if(ok){persist();audio?.cue('mensagem');}phoneScreen();return;}
  const connect=e.target.closest('[data-connect]');if(connect&&save){if(inter.connect(save,connect.dataset.connect))persist();cluesScreen();return;}
  const use=e.target.closest('[data-use-item]');if(use&&save){if(social?.useItem?.(save,save.node,use.dataset.useItem)){persist();audio?.cue('toque')}game();return;}
  const exp=e.target.closest('[data-explore]');if(exp&&save){if(social?.act?.(save,save.node,exp.dataset.explore)){persist();audio?.cue('toque');}game();return;}
  const urgent=e.target.closest('[data-urgent-start]');if(urgent&&save&&urgent.dataset.urgentStart===save.node){const now=sceneNode(save.node);const config=window.UG7?.timer?.(save,now.id,now.choices.filter(c=>allowed(c.requires)))||social?.timer?.(save,now.id,now.choices.filter(c=>allowed(c.requires)));if(config){urgentArmedNode=now.id;urgentRemaining=config.secs;game();}return;}
  const goreToggle=e.target.closest('[data-gore-toggle]');if(goreToggle&&save){social.state(save).graphicOff=!social.state(save).graphicOff;persist();systemsScreen();return;}
  const timedToggle=e.target.closest('[data-urgency-toggle]');if(timedToggle&&save){social.state(save).timedOff=!social.state(save).timedOff;urgentArmedNode=null;persist();systemsScreen();return;}
  const person=e.target.closest('[data-person]');if(person){castSelected=person.dataset.person;renderCast();return;}const slot=e.target.closest('[data-slot]');if(slot){activeSlot=Number(slot.dataset.slot);save=getSave();expandedAlert=false;selectedMedia=null;if(save)game();else creator();return;}const btn=e.target.closest('[data-act],[data-choice]'); if(!btn) return;
  if(btn.dataset.choice!==undefined){ select(Number(btn.dataset.choice)); return; }
  const action=btn.dataset.act;
  if(action==='sound') sound();
  else if(action==='audio')audioScreen();
  else if(action==='audio-back')audioBack();
  else if(action==='sound-settings'){audio?.toggle();audioScreen();}
  else if(action==='preview-message'){if(!audio?.enabled){audio?.enable();audioScreen()}audio?.cue('mensagem');}
  else if(action==='preview-knock'){if(!audio?.enabled){audio?.enable();audioScreen()}audio?.cue('batidas');}
  else if(action==='new'){ if(getSave()&&!confirm('Novo jogo substituirá apenas o slot '+activeSlot+'. Continuar?')) return; creator(); }
  else if(action==='continue'){ save=getSave(); if(save) game(); else menu(); }
  else if(action==='resume'){ if(save) game(); else menu(); }
  else if(action==='menu') menu();
  else if(action==='cast') cast(); else if(action==='castback'){castSelected=null;renderCast();} else if(action==='slots')slotsScreen();
  else if(action==='systems')systemsScreen();
  else if(action==='journal') journal();
  else if(action==='chapters') chaptersScreen();
  else if(action==='recap') recapScreen();
  else if(action==='clues') cluesScreen();
  else if(action==='phone')phoneScreen();
  else if(action==='butterfly')butterflyScreen();
  else if(action==='notebook')notebookScreen();
  else if(action==='export') exportSave();
  else if(action==='import') importSave();
});
app.addEventListener('input',e=>{if(e.target?.dataset?.playerNotes!==undefined&&save){save.interactive??=inter.empty();save.interactive.notes=String(e.target.value).slice(0,1500);persist();const status=document.getElementById('notes-status');if(status)status.textContent='Anotações salvas neste slot.';return;}const key=e.target?.dataset?.audioVolume;if(key!=='music'&&key!=='effects')return;const v=Number(e.target.value);audio?.updateSettings({[key]:v});const label=document.getElementById(key==='music'?'audio-music-value':'audio-effects-value');if(label)label.textContent=v+'%';});
app.addEventListener('submit',e=>{ if(e.target.id!=='creator') return; e.preventDefault(); const f=new FormData(e.target); const name=String(f.get('name')||'').trim(); if(name.length<2) return; save=baseSave(name,String(f.get('pronouns')),String(f.get('look'))); persist(); game(); });
menu();
})();
