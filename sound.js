/* O ULTIMO GRITO - trilha sonora original, local e independente dos slots.
 * A reprodução começa somente após interação explícita do jogador.
 * O mixer usa Web Audio para que volumes e fades funcionem também no Safari/iOS.
 */
(()=>{'use strict';
  const PREFERENCE_KEY='ultimo-grito-audio-preferencias-v1';
  const TRACKS=Object.freeze({
    menu:'som_menu.mp3', amizade:'som_amizade.mp3', romance:'som_romance.mp3',
    investigacao:'som_investigacao.mp3', tensao:'som_tensao.mp3',
    perseguicao:'som_perseguicao.mp3', luto:'som_luto.mp3', lago:'som_lago.mp3'
  });
  const EFFECTS=Object.freeze({
    toque:'som_toque.mp3', mensagem:'som_mensagem.mp3', impacto:'som_impacto.mp3',
    batidas:'som_batidas.mp3', passos:'som_passos.mp3', agua:'som_agua.mp3',
    batimento:'som_batimento.mp3', chuva:'som_chuva.mp3'
  });
  const clamp=v=>Math.max(0,Math.min(100,Number(v)||0));
  function loadPreferences(){
    try{const p=JSON.parse(localStorage.getItem(PREFERENCE_KEY)||'{}');return {music:clamp(p.music??55),effects:clamp(p.effects??65)}}
    catch{return {music:55,effects:65}}
  }
  const preferences=loadPreferences();
  const manager={
    enabled:false, context:null, channels:[], active:-1, current:null, desired:'menu',
    effectsPlaying:new Set(), lastCueTime:0, lastNode:'', settings:preferences, unavailable:false,
    getSettings(){return {...this.settings,enabled:this.enabled}},
    setup(){
      if(this.context)return true;
      try{
        const AudioCtx=window.AudioContext||window.webkitAudioContext;
        if(!AudioCtx){this.unavailable=true;return false}
        this.context=new AudioCtx();
        this.channels=[0,1].map(()=>{
          const element=new Audio();element.preload='auto';element.loop=true;
          const source=this.context.createMediaElementSource(element);
          const gain=this.context.createGain();gain.gain.value=0;
          source.connect(gain).connect(this.context.destination);
          return {element,gain,track:''};
        });
        return true;
      }catch(err){console.warn('Audio não disponível:',err);this.unavailable=true;return false}
    },
    enable(){
      if(!this.setup())return false;
      this.enabled=true;
      try{const p=this.context.resume();if(p?.catch)p.catch(()=>{});}catch{}
      this.startTrack(this.desired,true);
      return true;
    },
    disable(){
      this.enabled=false;
      for(const c of this.channels){try{c.element.pause();c.gain.gain.cancelScheduledValues(this.context?.currentTime||0);c.gain.gain.value=0;}catch{}}
      this.effectsPlaying.forEach(el=>{try{el.pause()}catch{}});
      this.effectsPlaying.clear();this.active=-1;this.current=null;
    },
    toggle(){return this.enabled?(this.disable(),false):this.enable()},
    updateSettings(next){
      if(next.music!==undefined)this.settings.music=clamp(next.music);
      if(next.effects!==undefined)this.settings.effects=clamp(next.effects);
      try{localStorage.setItem(PREFERENCE_KEY,JSON.stringify(this.settings))}catch{}
      if(this.enabled&&this.active>=0){
        const g=this.channels[this.active].gain.gain;
        g.cancelScheduledValues(this.context.currentTime);
        g.setTargetAtTime(this.settings.music/100*.72,this.context.currentTime,.1);
      }
    },
    startTrack(track,immediate=false){
      if(!TRACKS[track])track='menu';this.desired=track;
      if(!this.enabled||!this.context)return;
      if(this.current===track && this.active>=0){return}
      const old=this.active>=0?this.channels[this.active]:null;
      const nextIdx=this.active<0?0:1-this.active;
      const next=this.channels[nextIdx];
      // Always start the media element in the same user gesture as a choice/toggle.
      if(next.track!==track){next.element.src=TRACKS[track];next.track=track;next.element.load()}
      try{next.element.currentTime=0}catch{}
      const at=this.context.currentTime;
      const fade=immediate?.28:1.0;
      next.gain.gain.cancelScheduledValues(at);
      next.gain.gain.setValueAtTime(0,at);
      next.gain.gain.linearRampToValueAtTime(this.settings.music/100*.72,at+fade);
      const attempt=next.element.play();
      if(attempt?.catch)attempt.catch(err=>console.warn('Toque em ♪ SOM para iniciar a música:',err));
      if(old){
        old.gain.gain.cancelScheduledValues(at);
        old.gain.gain.setValueAtTime(old.gain.gain.value,at);
        old.gain.gain.linearRampToValueAtTime(0,at+fade);
        const oldElement=old.element;
        setTimeout(()=>{if(this.enabled&&this.active===nextIdx)oldElement.pause();},Math.ceil((fade+.15)*1000));
      }
      this.active=nextIdx;this.current=track;
    },
    syncView(view){if(view==='game'||view==='audio')return;this.startTrack(view==='menu'?'menu':'investigacao')},
    syncNode(node){
      if(!node)return;
      const theme=this.chooseTheme(node);
      this.startTrack(theme);
      if(this.enabled&&this.lastNode!==node.id){
        const s=String(node.text||'').toLocaleLowerCase('pt-BR');
        const allowCue=Date.now()-this.lastCueTime>3100;
        let cue=null;
        if(/telefone (toca|vibra)|celular (toca|vibra)|nova mensagem|notificaç|telefone começa/.test(s))cue='mensagem';
        else if(/chuva (começa|cai|forte|cobre|da noite|bate)|som da chuva|chovendo/.test(s))cue='chuva';
        else if(/batid[ao]s? (na|à|contra) porta|soco[s]? na porta|arromba a porta/.test(s))cue='batidas';
        else if(/passos (se aproximam|ecoam|rápidos|pesados)|ouve passos/.test(s))cue='passos';
        else if(/cai na água|mergulha|joga.*lago|onda.*atinge/.test(s))cue='agua';
        else if(/faca (atinge|corta)|golpe (acerta|atinge)|[sc]oco (violento|forte)/.test(s))cue='impacto';
        else if(/coração dispara|coração acelera|batimentos aceler/.test(s))cue='batimento';
        if(cue&&allowCue){this.cue(cue);this.lastCueTime=Date.now()}
      }
      this.lastNode=node.id;
    },
    chooseTheme(node){
      const t=String(node.text||'').toLocaleLowerCase('pt-BR');
      const where=String(node.location||'').toLocaleLowerCase('pt-BR');
      const scene=node.scene||'';
      // Grandes perseguições já escritas: a trilha deve acompanhar o risco real,
      // sem depender da palavra 'perseguição' em cada fala individual.
      if(/^h(?:1[3-9]|2[0-9]|3[0-9]|40(?:risk|pull|last|wait|ryanResult)?|41)$/.test(String(node.id)))return 'perseguicao';
      if(/^h(?:4[3-9]|5[0-1])/.test(String(node.id)))return 'luto';
      if(/^h(?:0[6-9]|1[0-2])/.test(String(node.id)))return 'amizade';
      if(/^(?:d16|d17|e09|e10|e11|e12|e13|e14|f09|f10)/.test(String(node.id)))return 'perseguicao';
      if(/morreu|corpo sem vida|morte de allan|luto|funeral|perdemos|velório|falecimento|enterro/.test(t) && !/persegui|mascarad.*corre/.test(t))return 'luto';
      let danger=0;
      for(const [re,n] of [
        [/mascarad[oa]/g,2],[/persegui[çdc]|correndo para (escapar|fugir)|corr[ea]m[!, ]/g,2],
        [/assassin[oa]|atac[oa]|facad[ae]|sangr[ae]|esfaque/g,2],
        [/grit[oa]|desesper[oa]|fug[ea]|escap[ae]|arma|lâmina|porta.*arromb/g,1]
      ])danger+=Math.min(3,(t.match(re)||[]).length)*n;
      if(danger>=6)return 'perseguicao';
      if(danger>=3)return 'tensao';
      if(/beij[oa]|rom[aâ]ntic[oa]|namor[oa]|sentimentos por voc[eê]|sua m[ãa]o.*(segura|aperta)|segura sua m[ãa]o|abraç[ao] demorado|encosta (a testa|a cabeça) em voc[eê]/.test(t))return 'romance';
      if(/chor[oa]|lágrimas|saudade|culpa insuportável|perdeu o (amigo|melhor amigo)/.test(t))return 'luto';
      if(/pista|investig|prova[s ]|arquivo|fotografia|descobri|suspeit|mensag(ens|em) apagadas/.test(t))return 'investigacao';
      if(scene==='lake' && !/amea[çc]a|desaparec|corpo|pacto/.test(t))return 'lago';
      if(scene==='party'||/jantar|brincad|piad|sorriso|risada|riem|conversam sem/.test(t))return 'amizade';
      if(scene==='forest'||scene==='road'||scene==='phone')return 'tensao';
      if(scene==='house')return 'amizade';
      if(where.includes('lago')||where.includes('marina'))return 'lago';
      return 'investigacao';
    },
    cue(name){
      if(!this.enabled||!this.context||!EFFECTS[name]||this.settings.effects===0)return;
      try{
        const el=new Audio(EFFECTS[name]);el.preload='auto';
        const source=this.context.createMediaElementSource(el),gain=this.context.createGain();
        gain.gain.value=this.settings.effects/100*.56;
        source.connect(gain).connect(this.context.destination);
        const done=()=>this.effectsPlaying.delete(el);
        el.addEventListener('ended',done,{once:true});el.addEventListener('error',done,{once:true});
        this.effectsPlaying.add(el);
        const p=el.play();if(p?.catch)p.catch(done);
      }catch(err){console.warn('Efeito não reproduzido:',err)}
    }
  };
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){for(const c of manager.channels)c.element.pause();}
    else if(manager.enabled&&manager.active>=0){
      // Safari may suspend the audio session while backgrounded; avoid silent autoplay attempts.
      const c=manager.channels[manager.active];
      try{manager.context?.resume().catch(()=>{});c.element.play().catch(()=>{});}catch{}
    }
  });
  window.UGAudio=manager;
})();
