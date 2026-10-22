/* O ÚLTIMO GRITO — V1.5.0 · revisão transversal de continuidade.
 * Compatível com slots anteriores. Não altera decisões históricas nem desfechos.
 * Só modifica textos quando um personagem confirmado como morto estaria falando.
 */
(()=>{'use strict';
const NAMES={allan:'Allan',samuel:'Samuel',isabella:'Isabella',rayssa:'Rayssa',rauanny:'Rauanny',laisla:'Laisla',ryan:'Ryan',breno:'Breno'};
const PERSONS=Object.keys(NAMES),FEM=new Set(['isabella','rayssa','rauanny','laisla']);
function dead(s,id){if(!s||!id)return false;const f=s.flags||{};
 if(id==='hero')return !!f.c10_heroi_morto;
 return !!(id==='allan'&&f.allan_morto_c4)||[6,7,8,9,10].some(i=>!!f[`c${i}_morto_${id}`]);
}
function injury(s,id){if(dead(s,id))return 0;const f=s?.flags||{};
 return ['c10_ferido_','c9_ferido_','c8_grave_','c7_ferido_','c6_ferido_','c6_ferida_'].some(k=>f[k+id])?2:
 ['ferida_'+id,`ferida_${id}_c4`].some(k=>f[k])?1:0;
}
function status(s,id){if(dead(s,id))return FEM.has(id)?'Falecida':'Falecido';
 const f=s?.flags||{};
 if(f[`c10_aparente_${id}`])return 'Desaparecido(a) · busca em andamento';
 const wound=injury(s,id);
 return wound>=2?'Ferido(a) · em acompanhamento':wound===1?'Em recuperação':'Sem ferimentos registrados';
}
function resolve(id,s,n){if(!n||!s)return n;const f=s.flags||{};let result=n;
 // O Capítulo 7 não pode receber mensagens de amigos que já morreram no 4 ou 6.
 if(id==='j02'){
  const original=n.text;
  let txt=original;
  if(dead(s,'breno'))txt=txt.replace('Breno enviou uma mensagem perguntando se você conseguiu descansar. ','');
  if(dead(s,'samuel'))txt=txt.replace('Samuel escreveu e apagou alguma coisa no grupo, várias vezes. ','');
  if(txt!==original)result={...result,text:txt};
 }
 // Após o último confronto, falas novas dos mortos são removidas, mas lembranças
 // e menções narrativas de luto são preservadas. Não afeta os flashbacks anteriores.
 const chapter10=String(id).match(/^k10_(\d+)$/);
 if(chapter10&&Number(chapter10[1])>=35&&Number(chapter10[1])<=55){
  let t=result.text||'';
  for(const who of PERSONS.filter(x=>dead(s,x))){
   const escaped=NAMES[who].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   t=t.replace(new RegExp(`(?:^|\\n)${escaped}:\\s*[—-][^\\n]*`,'gm'),'');
  }
  if(dead(s,'hero'))t=t.replace(/(?:^|\n)Você:\s*[—-][^\n]*/gm,'');
  if(t!==result.text)result={...result,text:t.replace(/\n{3,}/g,'\n\n')};
 }
 return result;
}
window.UG150=Object.freeze({dead,injury,status,resolve});
})();
