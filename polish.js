/* V1.0.2 — cenas do Capítulo 6 condicionadas aos fatos da partida.
   Nunca descreve ramificações ou avisa quais escolhas são fatais ao jogador. */
(()=>{'use strict';
const names={hero:'você',laisla:'Laisla',rauanny:'Rauanny',isabella:'Isabella',rayssa:'Rayssa',allan:'Allan',ryan:'Ryan'};
const dead=(s,id)=>Boolean(s?.flags?.['c6_morto_'+id]||(id==='allan'&&s?.flags?.allan_morto_c4));
const firstName=s=>s.hero?.name?.split(' ')[0]||'Você';
const eachDead=s=>['laisla','rauanny','isabella','allan','ryan'].filter(id=>s.flags?.['c6_morto_'+id]);
const aliveInApartment=(s,id)=>!dead(s,id)&&!(id==='allan'&&s.flags.allan_morto_c4);
const idWord=(s,id)=>id==='hero'?firstName(s):names[id];
const friendSpeech={
 hero:'Ryan: — OLHA PRA MIM! EU TÔ AQUI. VEM, EU TE SEGURO!',
 laisla:'Ryan: — LAISLA, ME ESCUTA! NÃO LARGA O FERRO! EU TÔ TE VENDO!',
 rauanny:'Ryan: — RAUANNY, OLHA PRA CÁ! APOIA O PÉ! POR FAVOR!',
 isabella:'Ryan: — ISA, NÃO OLHA PRA BAIXO! SÓ VEM! MAIS UM POUCO!',
 rayssa:'Ryan: — RAY, SEGURA! TÔ COM A MÃO AQUI! VEM!',
 allan:'Ryan: — ALLAN! EU TÔ AQUI! VOCÊ NÃO VAI CAIR, CARALHO!'
};
const crossing={
 hero:'Você coloca o pé na primeira barra. A altura faz suas pernas vacilarem, e por um instante o metal parece sumir debaixo dos seus dedos.',
 laisla:'Laisla tenta prender o cabelo atrás da orelha, desiste e sobe na escada com os joelhos tremendo. A mulher que comandava o jantar mal consegue respirar.',
 rauanny:'Rauanny fica em silêncio, coisa rara. Aperta as barras até os nós dos dedos perderem a cor e tenta manter os olhos na janela de Ryan.',
 isabella:'Isabella engole a primeira instrução que ia dar. Ajusta os pés na escada e tenta calcular os espaços, mas o vento rouba a concentração.',
 rayssa:'Rayssa olha uma última vez para o apartamento, com os olhos cheios de lágrimas. Quando pisa na escada, chama Isabella num fio de voz.',
 allan:'Allan segura a manga sobre o braço machucado. A primeira tentativa de avançar faz o ferimento repuxar; ele solta um palavrão e trava o maxilar.'
};
const welcome={
 hero:'Ryan segura sua mão e não a solta imediatamente. O alívio faz a voz dele falhar.',
 laisla:'Ryan agarra a mão de Laisla. Ela cai de joelhos do outro lado e só consegue repetir o nome de Rauanny.',
 rauanny:'Rauanny se joga para dentro. Ryan segura seus ombros enquanto ela pergunta por Laisla, atropelando as próprias palavras.',
 isabella:'Isabella cai sentada no piso do Bloco B. Ryan lhe oferece água, mas ela só pede que avisem Rayssa.',
 rayssa:'Rayssa entra ofegante. Ryan a encosta na parede enquanto ela procura Isabella entre os rostos que já atravessaram.',
 allan:'Allan chega tremendo. Ryan tenta ajudar com o braço, mas Allan o puxa num abraço desajeitado antes de conseguir falar.'
};
const familyReactions={
 laisla:'Rauanny: — Não. NÃO, NÃO! VOCÊS TÊM QUE VOLTAR LÁ! A LAISLA TÁ LÁ!',
 rauanny:'Laisla: — É mentira. EU TAVA SEGURANDO ELA! EU TAVA DO LADO DELA!',
 isabella:'Rayssa: — Não pode ser a Isa. Eu ouvi ela falando comigo. Eu ouvi, caralho...',
 allan:'Samuel: — Ele já tinha escapado uma vez... Eu prometi que ia buscar o Allan. POR QUE EU NÃO FUI?',
 ryan:'Laisla leva as duas mãos à boca; Rauanny tenta dizer alguma coisa, mas não consegue terminar o nome de Ryan.'
};
function rescue(s){
 const f=s.flags||{};
 const list=eachDead(s);
 const safe=['laisla','rauanny','isabella','allan','ryan'].filter(id=>aliveInApartment(s,id));
 const namesSafe=safe.map(id=>names[id]);
 const missing=list.map(id=>names[id]);
 const grief=list.map(id=>{
  if(id==='laisla')return dead(s,'rauanny')?'Você ouve o nome de Laisla e sente o estômago afundar. Ao seu lado, ninguém consegue reagir.':familyReactions.laisla;
  if(id==='rauanny')return dead(s,'laisla')?'Você segura a quina da mesa para não cair. O policial pergunta se precisa de água, mas você não consegue responder.':familyReactions.rauanny;
  if(id==='allan')return 'Rayssa cobre a boca com a mão. — O Samuel não sabe... A gente precisa contar pra ele. Agora.';
  if(id==='ryan')return !dead(s,'laisla')?'Laisla leva as mãos à boca e começa a chorar, incapaz de dizer o nome de Ryan.':!dead(s,'rauanny')?'Rauanny deixa o copo cair no chão. — O Ryan não... não...':'Você olha para a janela vazia onde Ryan estava. Seus olhos se enchem de lágrimas antes que alguém consiga falar.';
  return familyReactions[id];
 }).join('\n\n');
 return {safe,missing,grief};
}
function resolve(id,s,node){
 if(!s || !node || !id?.startsWith('h') && id!=='fim10')return node;
 const f=s.flags||{};
 const cur=f.c6_current||'hero';const who=idWord(s,cur);
 const missed=eachDead(s);const r=rescue(s);
 let text=null,choices=null;
 if(id==='h02a')text=`Você: — Bella? Caramba, eu nem sabia que você tinha voltado pra Lakewood.\n\nBella: — Pois é. Também não tava no meu planejamento encontrar vocês falando da Jullia no meio da rua.\n\nO cabelo cacheado cai sobre a camiseta larga. Bella ajeita a calça baggy e olha a pasta nas mãos de Breno.\n\nBreno: — A gente tava tentando entender umas informações da propriedade.\n\nBella: — Eu percebi. Só não me trata como se eu tivesse cinco anos. Se souber alguma coisa, fala na minha cara.\n\nVocê: — Sinto muito por tudo.\n\nBella: — Obrigada. Mas eu prefiro resposta a condolência.`;
 if(id==='h02b')text=`Você esconde a pasta, mas Bella reconhece seu rosto imediatamente.\n\nBella: — Vai mesmo fingir que não me viu?\n\nVocê: — Bella?! Achei que você ainda estivesse fora da cidade.\n\nBella: — Eu tava. Voltei. E continuo sem saber onde tá minha irmã, caso queira uma atualização.\n\nEla cruza os braços. Usa camiseta larga, calça baggy e tênis Vans; os cachos longos escorrem sobre os ombros.\n\nBreno: — Nós estamos buscando umas informações.\n\nBella: — Ótimo. Quando acharem alguma coisa de verdade, me avisem. Só não me venham com mais pena.`;
 if(id==='h02c')text=`Você toca no braço de Breno, tentando fazê-lo andar, mas Bella atravessa a rua antes que consigam se afastar.\n\nBella: — Nossa. Que recepção calorosa.\n\nVocê: — Bella? Eu não sabia que você tinha voltado.\n\nBella: — E eu não sabia que vocês tinham desenvolvido alergia a olhar na minha cara.\n\nEla olha a foto de Jullia na banca e aperta as alças da mochila.\n\nBella: — Eu vim atrás de respostas. Não vou pedir pra vocês gostarem de mim. Só não escondam o que sabem.\n\nBreno baixa os olhos e aceita o número de telefone que ela entrega, antes de Bella seguir pela calçada.`;
 if(id==='h03')text=node.text.replace('Bella não se parece com a imagem de Jullia nos cartazes. Fala devagar, escolhe as palavras, mas segura o olhar quando faz uma pergunta.', 'Bella usa uma camiseta ampla, calça baggy e Vans surrados. Os cabelos longos e cacheados caem sobre os ombros. Ao contrário de Jullia, ela não adoça o que diz para deixar ninguém confortável.');
 if(id==='h06')text=node.text.replace('Breno olha para você com um sorriso involuntário. Por uma vez, parece que a cidade não está inteira tentando sufocar o grupo.', 'Breno olha para você com um sorriso involuntário. Ryan dá alguns passos na sua direção antes de voltar para o Bloco B. Por alguns minutos, a cidade parece menos pesada.');
 if(id==='h09'){
  text=node.text.replace('A saudade ocupa lugar à mesa de modo diferente para cada pessoa. Não é preciso explicar todas as lembranças: quem está presente continua conversando, e quem falta é lembrado com cuidado.',f.allan_morto_c4?'O nome de Allan quase surge em uma história antiga, mas Isabella se interrompe. Samuel não veio ao jantar; Breno foi buscá-lo. Laisla troca um olhar com Rauanny e aumenta um pouco a música.':'Allan chega com duas garrafas de refrigerante debaixo do braço. Ele consegue arrancar uma risada de Isabella antes mesmo de perguntar onde deve sentar.');
 }
 if(id==='h29'){
  const allanHere=aliveInApartment(s,'allan')&&!f.c6_morto_allan;
  text=dead(s,'isabella')?`PONTO DE VISTA: RAYSSA.\n\nA cozinha parece maior sem Isabella. Rayssa tenta destravar o telefone com os dedos escorregando de suor e sangue. A porta da lavanderia range. Ela chama pela amiga uma vez, depois outra, mas só escuta os golpes do outro lado do apartamento.\n\n${allanHere?'Allan segura o braço ferido e aponta para um celular caído na mesa. A tela continua gravando. O aparelho está perto demais do corredor onde o mascarado passou.':'Rayssa encontra a grade emperrada e começa a sacudi-la, até que o metal corta a pele de seus dedos. A única ideia que lhe resta é gritar pela portaria.'}`:`PONTO DE VISTA: ISABELLA.\n\nIsabella e Rayssa chegam à lavanderia quase tropeçando uma na outra. Do quarto vem um impacto forte, seguido da voz de Laisla chamando por ajuda. Isabella força a grade com o ombro, enquanto Rayssa procura uma trava na parede.\n\n${allanHere?'Allan, ainda com o braço machucado, avista um telefone esquecido sobre a mesa. A câmera está gravando. Ele estica o pescoço, tentando saber se existe alguém entre ele e o aparelho.':'Rayssa consegue falar com a portaria, mas a ligação cai. Isabella bate o ombro mais uma vez contra a grade. O metal cede um centímetro, depois trava de novo.'}`;
 }
 if(id==='h29allanRisk')text=node.text.replace('O mascarado surge no corredor. Allan se apoia no batente e consegue escapar do primeiro movimento, porém bate o braço que já estava machucado.', 'O mascarado surge no corredor, com a faca levantada. Allan se joga contra o batente para evitar a lâmina, mas ela rasga a manga da camiseta e corta sua bochecha. O sangue escorre sobre o telefone enquanto ele tenta correr.');
 if(id==='h38'){
  const still=window.UG6.remaining(s);
  if(still.length)text=`A escada de manutenção se estende entre os blocos. Lá embaixo, uma sirene ecoa longe demais. O mascarado golpeia a porta outra vez; a madeira começa a rachar perto da fechadura.\n\n${still.map(w=>w==='hero'?'Você':names[w]).join(', ')} ${still.length===1?'ainda está esperando':'ainda estão esperando'} junto à janela. Ryan grita do outro lado, tentando ouvir as vozes acima do vento.\n\n${missed.includes('laisla')?'Rauanny engole o choro e aperta o batente onde Laisla esteve.':missed.includes('rauanny')?'Laisla não consegue parar de olhar para o espaço vazio ao lado da escada.':'Laisla segura o antebraço de Rauanny. Uma das duas pode precisar soltar a mão a qualquer instante.'}\n\nQuem vai atravessar agora?`;
  else text=`A janela do Bloco A está vazia. Ryan ainda segura a ponta da escada, sem conseguir relaxar os braços. Da lavanderia chegam vozes confusas pelo telefone; ninguém ali sabe ao certo o que aconteceu com os outros.\n\nO mascarado dá o último golpe na porta do quarto. A madeira cede com um estrondo. Vocês recuam da janela do Bloco B.`;
 }
 if(id==='h38_attempt'){
  const injured=Boolean(f['c6_ferida_'+cur]);
  const hasLover=cur==='hero'&&s.romanceEscolhido==='ryan';
  text=`PONTO DE VISTA: ${who.toUpperCase()}.\n\n${crossing[cur]||crossing.hero}\n\n${hasLover?f.c6_beijou_ryan?'Ryan reconhece seu olhar de pânico. A lembrança do beijo na portaria parece de outra vida. Ele estende a mão, mas ainda está longe demais para tocar a sua.':'Ryan reconhece seu olhar de pânico e estende a mão, mas ainda está longe demais para tocar a sua. O desespero na voz dele não parece diferente do seu.':friendSpeech[cur]||friendSpeech.hero}\n\n${injured?`${who} tenta apoiar o peso no outro lado do corpo. A dor faz a visão escurecer por um segundo; gotas de sangue marcam a barra que acabou de segurar.`:`O vento golpeia a roupa de ${who}. A escada vibra sob cada movimento, e o ferro gelado parece escapar das mãos úmidas.`}\n\nDo quarto vem um estrondo. O mascarado crava a faca na madeira junto à fechadura e puxa com força, abrindo outra fenda. Alguém grita para que ${who} continue.\n\nO que fazer?`;
 }
 if(id==='h38_danger')text=`O metal sofre um solavanco. ${who} perde o apoio de um pé e se agarra a duas barras da escada. A pele da palma raspa contra a superfície áspera, deixando um fio de sangue.\n\n${friendSpeech[cur]||friendSpeech.hero}\n\nPela janela do Bloco A, o mascarado aparece com a faca na mão. A lâmina bate contra a estrutura, fazendo o ferro vibrar sob o corpo de ${who}.\n\n${who} prende a respiração. Ryan se inclina perigosamente do outro lado para tentar alcançar a ponta da escada.`;
 if(id==='h38_ok')text=`${who} alcança a última barra, respirando aos soluços. A escada estala mais uma vez antes que Ryan consiga segurar seu pulso.\n\n${welcome[cur]||welcome.hero}\n\n${f['c6_ferida_'+cur]?`O ferimento de ${who} voltou a sangrar. O técnico pressiona um pano limpo contra a roupa enquanto Ryan volta à janela.`:'O técnico pede que a pessoa se afaste do parapeito e oferece um lugar para sentar.'}\n\nDo outro lado, a porta do quarto treme sob outro golpe de faca. Ryan segura a escada e grita para o próximo amigo se preparar.`;
 if(id==='h38_fall'){
  const isDeath=node.choices?.some(c=>c.effects?.some(e=>e[0]==='death'));
  if(isDeath)text=`${who} estica o braço para Ryan, mas a escada sofre uma sacudida brutal. O pé escorrega. Um grito rasga o pátio.\n\nRyan: — NÃO! SEGURA! PELO AMOR DE DEUS!\n\nOs dedos de ${who} deslizam da última barra. O corpo despenca e atinge o piso de serviço com um impacto seco. Sangue escurece o concreto junto à cabeça. No Bloco B, alguém começa a gritar o nome de ${who} sem parar.\n\nRyan fica paralisado na janela, as mãos erguidas, como se ainda pudesse segurar a pessoa. Do outro lado, o mascarado recua para dentro do quarto e desaparece na sombra.`;
  else text=`${who} escorrega e fica pendurado por um braço, com os pés procurando um apoio que não existe.\n\nRyan: — ME DÁ A MÃO! AGORA!\n\nO técnico segura a extremidade da escada e um amigo alcança o pulso de ${who}. Um puxão desesperado faz os três caírem para trás, no chão do Bloco B.\n\n${who} fica alguns segundos sem conseguir respirar. A palma da mão sangra, mas a voz de Ryan chega nítida: está a salvo.`;
 }
 if(id==='h38_done')text=`A janela do Bloco A finalmente fica vazia. Ryan encosta a testa no vidro sem conseguir esquecer os gritos. O ferro continua suspenso entre os prédios, manchado nas partes onde mãos feridas tentaram se agarrar.\n\n${missed.length?`Lá embaixo, funcionários se afastam do pátio. Alguém cobre o rosto e pede que parem de olhar pela janela.`:'Da lavanderia chegam notícias de pessoas que encontraram outra passagem. Vocês esperam a confirmação, sem saber o que cada uma enfrentou.'}\n\nA sirene de uma viatura dobra a esquina. Ryan se afasta da janela e tenta falar, mas desiste. Ainda é preciso encontrar o outro núcleo.`;
 if(id==='h41')text=node.text.replace('O lugar de Ryan entre vocês ainda parece estranho depois da travessia.',dead(s,'ryan')?'A janela do Bloco B ficou em silêncio desde que Ryan desapareceu no pátio. Você mal consegue olhar naquela direção.':'Ryan se agacha perto da parede e tenta recuperar o ar. As mãos dele tremem tanto que a garrafa de água quase cai.');
 if(id==='h43')text=`Uma moradora oferece o próprio apartamento para vocês aguardarem a polícia. Há copos d'água sobre a mesa e cobertores empilhados no sofá, mas ninguém consegue ficar parado.\n\n${dead(s,'laisla')&&dead(s,'rauanny')?'Os dois lugares onde Laisla e Rauanny deveriam estar estão vazios. Você se senta à beira do sofá e espera uma notícia que, no fundo, já teme.':dead(s,'laisla')?'Rauanny entra agarrada ao braço de uma paramédica. O olhar dela procura Laisla a cada passo; ninguém sabe como fazer a pergunta que está presa na garganta.':dead(s,'rauanny')?'Laisla senta na borda do sofá e aperta um pano contra a mão ferida. Ela se recusa a beber água antes de saber o que aconteceu com Rauanny.':'Laisla se senta ao lado de Rauanny. As duas mantêm as mãos entrelaçadas, como se alguém pudesse separá-las de novo.'}\n\n${dead(s,'isabella')?'Rayssa aparece amparada por uma funcionária, chorando. Ela olha os rostos na sala, um por um, e pergunta pela melhor amiga.':'Isabella surge perto da porta com Rayssa. Elas se abraçam antes que qualquer pessoa consiga perguntar se precisam de atendimento.'}\n\nUm policial entra e pede os nomes das pessoas que estavam no apartamento. Ele anota cada um, confere pelo rádio e pede que esperem. Uma nova comunicação estala no aparelho. A sala inteira fica imóvel.`;
 if(id==='h44a')text=`O policial lê os nomes que a equipe conseguiu localizar. ${r.safe.length?`Ele confirma que ${r.safe.map(id=>names[id]).join(', ')} ${r.safe.length===1?'recebe atendimento':'recebem atendimento'} em segurança ou no próprio prédio.`:'Ele informa que as buscas dentro do apartamento continuam.'}\n\nVocê o interrompe quando ouve um sobrenome errado e pede que repita. A caneta treme entre os dedos do policial.\n\nPolicial: — Ainda estamos verificando as últimas áreas do apartamento. Não encontramos o agressor.\n\nOs amigos trocam olhares. A máscara continua em algum lugar de Lakewood.`;
 if(id==='h44c')text=dead(s,'isabella')?`Rayssa tenta segurar um copo d'água, mas derrama quase tudo.\n\nRayssa: — Onde tá a Isabella? Fala pra mim que encontraram a Isa.\n\nVocê: — Eles ainda estão conferindo o apartamento.\n\nRayssa: — Eu ouvi ela gritar. Eu... eu tentei alcançar.\n\nRayssa aperta o celular contra o peito, como se pudesse obrigá-lo a tocar. Ao ouvir o rádio do policial, se levanta num salto.`:`Rayssa está sentada ao lado de Isabella. Nenhuma das duas consegue fazer parar o tremor das mãos.\n\nIsabella: — Se você me apertar mais um pouco, eu paro de respirar, Ray.\n\nRayssa: — Cala a boca e deixa eu te abraçar.\n\nIsabella encosta a cabeça no ombro da amiga. Quando você se aproxima, Rayssa estende a mão livre para você. Ninguém precisa falar sobre o corredor agora.`;
 if(id==='h45'){
  const confirmed=r.missing.length?`O policial abaixa a folha e respira fundo.\n\nPolicial: — Sinto muito. A equipe confirmou ${r.missing.length===1?'uma morte':'as mortes'} de ${r.missing.join(', ')}.\n\n${r.grief}`:'O policial confere a última chamada no rádio.\n\nPolicial: — Todos os nomes foram localizados. Há feridos, alguns precisando ir ao hospital, mas todos sobreviveram.\n\nLaisla solta o ar aos soluços. Rauanny a abraça com tanta força que as duas quase caem da cadeira.';
  text=`O rádio chia. A equipe que entrou pela lavanderia finalmente se reúne aos policiais do Bloco B. Os feridos são chamados pelo nome, um por um, para serem examinados.\n\n${confirmed}\n\nBreno entra pela porta com Samuel. Os dois param ao perceber o estado da sala. Samuel procura Allan antes de perguntar qualquer coisa.\n\nBreno: — Meu Deus... o que foi que aconteceu aqui?\n\nVocê tem que responder. A voz não sai de primeira.`;
 }
 if(id==='h46b')text=`Samuel fica na porta, com os olhos vermelhos e a respiração curta.\n\n${f.allan_morto_c4?'Ele segura o celular aberto na última conversa com Allan, que terminou naquela noite no arquivo. O silêncio de semanas parece voltar de uma vez.':f.c6_morto_allan?'Samuel pergunta por Allan. Quando você confirma a morte na cozinha, ele recua e bate as costas na parede.':'Allan aparece com o braço enfaixado. Samuel atravessa a sala e o abraça tão rápido que quase derruba a cadeira ao lado.'}\n\nSamuel: — Eu fico pensando que vou conseguir proteger todo mundo... E eu nem sei cuidar de mim.\n\nVocê: — Fica aqui comigo. Não precisa falar nada agora.\n\nSamuel se senta e cobre o rosto com as mãos. Pela primeira vez, não tenta discutir quem foi culpado.`;
 if(id==='h46c')text=`Você se senta perto de quem precisa de companhia, sem pedir que ninguém pare de chorar. Breno distribui água. Samuel permanece de cabeça baixa.\n\n${dead(s,'laisla')&&dead(s,'rauanny')?'Você mantém o olhar no chão, incapaz de esquecer o lugar onde suas amigas deveriam estar.':dead(s,'laisla')?'Rauanny afasta qualquer pessoa que tenta confortá-la e só aceita ficar ao seu lado depois de alguns minutos.':dead(s,'rauanny')?'Laisla segura a camiseta de Rauanny que ficou em seu apartamento, chorando em silêncio.':'Laisla e Rauanny dividem um cobertor no sofá, com os olhos vermelhos.'}\n\n${dead(s,'isabella')?'Rayssa anda pelo corredor e volta repetidamente, incapaz de aceitar a notícia sobre Isabella.':'Isabella passa o braço pelos ombros de Rayssa. As duas se sentam no chão, encostadas à parede.'}\n\nQuando o policial informa que o mascarado não foi encontrado, ninguém responde. A noite ainda não acabou para vocês.`;
 if(id==='h47')text=node.text.replace('Bella: — Eu soube que tiveram um ataque. Vocês estão bem? Meu Deus, eu vi a foto do prédio nas redes sociais.', 'Bella: — Eu vi as viaturas nas notícias. Que merda aconteceu? Vocês estão feridos?').replace('Bella: — Eu não quero atrapalhar. Só... se tiver alguma coisa que eu possa fazer, me fala.', 'Bella: — Vou ser direta: se vocês souberem quem fez isso, me falem. Não vou ficar sentada em casa esperando outra tragédia.');
 if(id==='fim10')text=`FIM DO CAPÍTULO 6 — O SILÊNCIO TEM TESTEMUNHAS.\n\nAs luzes da polícia ainda piscam sobre o pátio quando vocês deixam o condomínio. A escada continua entre os dois blocos, cercada por fitas de isolamento.\n\n${r.missing.length?`Os nomes de ${r.missing.join(', ')} pesam no silêncio dentro do carro. Ninguém consegue falar sobre o jantar sem lembrar o que aconteceu depois.`:'Todos conseguiram sair do prédio, mas as roupas manchadas de sangue e as mãos trêmulas não deixam ninguém fingir que a noite passou sem consequências.'}\n\nBella voltou a Lakewood em busca da irmã. Moisés evita encontrá-la. E uma última mensagem chega antes do amanhecer, vinda de alguém que não deveria saber tanto.\n\nCONTINUA NO CAPÍTULO 7 — A NOITE DOS TRAIDORES.`;
 return text===null?node:{...node,text,...(choices?{choices}:{})};
}
window.UGPolish={resolve};
})();
