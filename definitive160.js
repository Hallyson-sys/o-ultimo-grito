/* O ÚLTIMO GRITO · V1.6.0 · Xerife Diego, cenas humanas e identidade do protagonista.
 * As cenas extras são opcionais e não alteram escolhas anteriores. IDs de capítulos/saves preservados.
 */
(()=>{'use strict';
const N=window.NODES,H=window.HISTORIA;
if(!N||!H)return;
const choice=(text,to,effects=[])=>({text,to,effects});
const flag=k=>['flag','v160_'+k,true];
const name=s=>s?.hero?.name?.split(' ')[0]||'Você';
const add=(id,anchor,location,time,scene,text,choices)=>{
 if(N[id])throw new Error('V1.6.0: cena já existente '+id);
 const node={id,chapter:N[anchor].chapter,location,time,scene,speaker:'NARRAÇÃO',text,choices};N[id]=node;H.push(node);
};
add('v160_jullia_p05','p05','MANSÃO GOMES · PERTO DA ESCADA','19:49','party',
`A música quase cobre a voz de Jullia. Ela se afasta do grupo só o suficiente para que vocês não precisem gritar.

Jullia: — Você lembra daquela ideia idiota de eu abrir um lugarzinho perto do lago? Uma cafeteria que também vende livro, sei lá. Ia ser uma bagunça.

Você: — Você falava disso como se já tivesse até escolhido o nome.

Jullia: — Porque eu tinha escolhido. Só que agora parece que todo mundo decidiu qual vida eu tenho que viver. Meu pai fala de faculdade, minha mãe fala de viagem... e o Moisés nem consegue ter uma conversa comigo sem olhar pro celular.

Ela ri de nervoso e olha para a festa.

Jullia: — Foi mal. Não vou te transformar em terapeuta da festa inteira. Só queria que alguém perguntasse o que eu quero.` ,[
 choice('“Eu quero saber. Me conta desse lugar.”','p05',[flag('jullia_escutou'),['trait','empatia',2]]),
 choice('“Você pode decidir seu futuro, mesmo se os outros reclamarem.”','p05',[flag('jullia_encorajou'),['trait','franqueza',1]]),
 choice('“Vamos pegar alguma coisa pra comer e rir um pouco.”','p05',[flag('jullia_alegrou'),['trait','coragem',1]])
]);
add('v160_diego_c05','c05','MEMORIAL · VARANDA LATERAL','18:20','house',
`Perto da saída para o jardim, um homem com distintivo preso ao cinto conversa baixinho com um funcionário. É Diego, o xerife de Lakewood. Ele percebe a maneira como você para ao reconhecê-lo.

Diego: — Oi. Desculpa abordar você aqui. Não vim estragar a homenagem.

Você: — Então por que tá me procurando?

Diego: — A família Gomes ainda recebe informação desencontrada sobre aquela noite. E agora começaram a aparecer bilhetes, mensagens... Eu não posso investigar com base em boato. Preciso de prova, de horário, de alguém disposto a conversar.

Você sente o rosto esquentar. A verdade sobre a estrada ainda está presa na garganta.

Diego: — Não precisa me contar nada agora. Só não acha que guardar tudo sozinho vai manter seus amigos seguros. Se alguém ameaçar vocês, me procura antes de tentar resolver na mão.`,[
 choice('Dizer apenas que o grupo vem recebendo mensagens estranhas','c05',[flag('diego_avisado'),['clue','v160_diego_primeiro_alerta']]),
 choice('Pedir o contato de Diego, sem falar da estrada','c05',[flag('diego_contato'),['clue','v160_cartao_diego']]),
 choice('Encerrar a conversa e voltar para os amigos','c05',[flag('diego_evitar')])
]);
add('v160_diego_d20','d20','CASA DE ISABELLA · PORTA DE ENTRADA','20:20','house',
`Uma viatura estaciona discretamente em frente à casa. Diego foi avisado de uma perseguição perto da padaria e pediu para saber se os jovens envolvidos estavam em segurança.

Diego: — Antes de qualquer coisa: alguém precisa de atendimento? Não vou começar fazendo pergunta enquanto vocês estiverem sangrando.

Isabella: — A gente tá cuidando disso. Não precisa entrar.

Diego: — Tudo bem. Mas eu tenho o relato de uma pessoa mascarada correndo atrás de vocês. Um desenho da máscara, uma foto, um horário... qualquer coisa verificável ajuda.

Você observa os amigos pelo corredor. Ninguém menciona o que aconteceu um ano atrás.

Diego: — Eu sei que vocês acham que a polícia vai fazer perguntas que não querem responder. Só que eu não consigo proteger vocês de um agressor que ninguém descreve.`,[
 choice('Entregar apenas a descrição da máscara e do horário','d20',[flag('diego_mascara'),['clue','v160_relato_mascara']]),
 choice('Pedir que Diego fale com o grupo quando todos estiverem mais calmos','d20',[flag('diego_retorno')]),
 choice('Insistir que ninguém pode falar agora','d20',[flag('diego_silencio')])
]);
add('v160_diego_k8','k8_01','HOSPITAL · CORREDOR DESERTO','00:51','house',
`Do lado de fora da sala reservada, Diego conversa com uma enfermeira. Ao ver você, interrompe a anotação no bloco.

Diego: — Fiquei sabendo do Moisés. Sinto muito.

Você: — Você não entende. Ele tentou avisar a gente de alguma coisa.

Diego: — Então me mostra o que vocês têm. Uma ligação, uma gravação, a mensagem original. Não a versão contada pela quinta pessoa do grupo.

Bella está próxima, com a pasta de documentos apertada contra o peito.

Bella: — Xerife, eu também achei horários estranhos nos registros da estação do lago.

Diego: — Ótimo. A gente confere a origem de cada registro. E se não provar nada, eu vou dizer que não prova. Ninguém merece ser acusado só porque o grupo tá com medo.

Você sabe que Diego é uma chance real de ajuda — e que ele ainda não ouviu a história inteira daquela estrada.`,[
 choice('Pedir que ele preserve as mensagens para a investigação','k8_01',[flag('diego_registros'),['clue','v160_mensagens_preservadas']]),
 choice('Deixar Bella apresentar somente os registros que verificou','k8_01',[flag('diego_bella'),['bond','isabella',1]]),
 choice('Dizer que precisa de tempo antes de conversar','k8_01',[flag('diego_espera')])
]);
add('v160_diego_k9','k9_bella_meet','PRAÇA DE LAKEWOOD · PERTO DO CORETO','18:19','town',
`Bella está guardando as fotografias quando Diego passa por vocês. Ele ainda veste a jaqueta do departamento, mas não está de plantão no evento.

Diego: — Bella. Encontrou mais alguma coisa?

Bella: — Encontrei uma diferença de horários. Não uma prova de assassinato. Já aprendi a separar as duas coisas.

Diego: — Tá aprendendo mais rápido do que muita gente adulta.

Ele olha para você.

Diego: — Sei que vocês estão assustados. Mas se acharem que alguém corre perigo hoje, não inventem de entrar numa floresta atrás dessa pessoa. Me liguem. Eu prefiro uma pista incompleta a mais um jovem desaparecido.

Bella aperta a fotografia na mão.

Bella: — Você acha que eu tô errando em continuar procurando?

Diego: — Não. Só não quero que você pague com a própria vida pelo silêncio dos outros.`,[
 choice('Combinar de avisar Diego caso apareça uma ameaça concreta','k9_bella_meet',[flag('diego_alerta_final')]),
 choice('Agradecer o cuidado com Bella, mas guardar as suspeitas','k9_bella_meet',[flag('diego_apenas_bella')]),
 choice('Perguntar quais registros ele já conseguiu verificar','k9_bella_meet',[flag('diego_perguntou_registros'),['clue','v160_diego_verificacao']])
]);
const anchors={
 p05:{scene:'v160_jullia_p05',label:'Conversar com Jullia sobre os planos dela',flag:'v160_jullia_p05_seen'},
 c05:{scene:'v160_diego_c05',label:'Conversar reservadamente com o xerife Diego',flag:'v160_diego_c05_seen'},
 d20:{scene:'v160_diego_d20',label:'Atender a visita do xerife Diego',flag:'v160_diego_d20_seen'},
 k8_01:{scene:'v160_diego_k8',label:'Conversar com Diego e Bella sobre as provas',flag:'v160_diego_k8_seen'},
 k9_bella_meet:{scene:'v160_diego_k9',label:'Ouvir a conversa de Diego com Bella',flag:'v160_diego_k9_seen'}
};
function resolve(id,s,n){if(!s||!n)return n;const f=s.flags||{},h=s.hero||{};let text=n.text,choices=(n.choices||[]).slice();
 const a=anchors[id];if(a&&!f[a.flag])choices.push(choice(a.label,a.scene,[['flag',a.flag,true]]));
 if(id==='p01'){
  const styles={casual:'a roupa confortável que escolheu',alternativo:'seu visual alternativo',elegante:'a roupa que passou um tempo escolhendo',esportivo:'o tênis e a roupa prontos para qualquer correria'};
  const hair={curto:'cabelo curto',medio:'cabelo médio',longo:'cabelo longo',cacheado:'cabelo cacheado',crespo:'cabelo crespo'};
  const temp={protetor:'Mesmo antes de sair da van, você confere se Breno está bem.',observador:'Você observa os faróis da estrada e os gestos inquietos de Samuel.',impulsivo:'Você sente vontade de entrar logo na festa e descobrir o que a noite reserva.',franco:'Você percebe que tem alguma coisa estranha no silêncio da van e não gosta de fingir que não notou.'};
  text+=`\n\nVocê ajeita o ${hair[h.hair]||'cabelo'} e confere ${styles[h.look]||'a roupa que escolheu'} antes de chegar à mansão. ${temp[h.temperament]||''}`;
 }
 if(id==='c05'&&h.temperament==='observador'&&!f.v160_observou_memorial){choices.push(choice('Anotar os horários e detalhes das mensagens para comparar depois','c05',[flag('observou_memorial'),['clue','v160_anotacoes_memorial']]));}
 if(id==='d20'&&h.temperament==='protetor'&&!f.v160_protegeu_depoimento){choices.push(choice('Pedir que todos possam falar juntos, sem deixar um amigo isolado','d20',[flag('protegeu_depoimento'),['bond','isabella',2]]));}
 if(id==='k8_01'&&h.temperament==='franco'&&!f.v160_cobrou_provas){choices.push(choice('Exigir que as suspeitas sejam confrontadas com registros, não boatos','k8_01',[flag('cobrou_provas'),['clue','v160_criterio_provas']]));}
 if(id==='k8_01'&&h.temperament==='impulsivo'&&!f.v160_segura_impulso){choices.push(choice('Admitir que seu primeiro impulso foi perseguir a pessoa anônima','k8_01',[flag('segura_impulso'),['trait','franqueza',1]]));}
 if(id==='k10_36'){
  text=text.replace('Policial: — Quem consegue andar, vem pela direita! Precisamos saber quantas pessoas estavam aqui!', 'Diego: — Quem consegue andar, pela direita! Preciso de nomes e locais exatos. Ninguém volta à trilha sem equipe de resgate.');
  const approach=f.c10_heroi_morto?'Diego alcança os sobreviventes, confere os nomes anotados e percebe a ausência do protagonista.':'Diego reconhece você no meio dos feridos. O rosto dele muda ao perceber quem falta.';
  text=text.replace('A polícia inicia a busca pelo galpão, pela trilha e pelo deck.', approach+'\n\nDiego: — Eu pedi que me procurassem antes que isso acontecesse... Mas agora a gente vai encontrar todos que puder. A verdade vem depois do atendimento.\n\nA polícia inicia a busca pelo galpão, pela trilha e pelo deck.');
 }
 if(id==='k10_40'){
  if(f.v160_diego_registros||f.v160_diego_mascara||f.v160_diego_avisado)text+='\n\nVocê se lembra das vezes em que Diego pediu provas e percebe que agora elas podem ser comparadas aos depoimentos. Isso não apaga a responsabilidade de ninguém.';
  const fear={perda:'A possibilidade de perder mais alguém ainda aperta seu peito, mesmo com as ambulâncias tão perto.',abandono:'Você tem medo de que, depois de tudo, as pessoas simplesmente se afastem sem dizer adeus.',mentira:'Você percebe o quanto mentiras que pareciam pequenas viraram um peso impossível de carregar.'};
  if(!f.c10_heroi_morto&&fear[h.fear])text+='\n\n'+fear[h.fear];
 }
 if(id==='k10_42'&&f.v160_diego_bella)text+='\n\nDiego permanece perto de Bella durante o depoimento. Ele não fala por ela nem revela informações sem consentimento; oferece um lugar tranquilo onde ela pode fazer perguntas.';
 return {...n,text,choices};
}
window.UG160=Object.freeze({resolve});
})();
