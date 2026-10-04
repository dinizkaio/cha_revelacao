/* Chá Revelação · Nanda e Kaio
   Uma página só. Telas: capa → seletor → confirmar → play → abertura → jogo → resultado.
   O segredo fica no navegador (localStorage), ofuscado, e some da interface depois de confirmado.
   ?ensaio   roda tudo sem gravar o segredo de verdade (fica só nesta aba).
   ?reiniciar apaga o segredo e volta pra capa. Segurar o título "Tá tudo pronto!" por 5 s faz o mesmo, com confirmação. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- estado e segredo ----------
  const params = new URLSearchParams(location.search);
  const ENSAIO = params.has('ensaio');
  const CHAVE = 'chaRevelacao.nandaEKaio';
  const CHAVE_SOM = 'chaRevelacao.som';
  const deposito = ENSAIO ? sessionStorage : localStorage;

  function guardar(escolha) {
    // ofuscado: um ruído aleatório na frente, tudo em base64. Não aparece em lugar nenhum da interface.
    const ruido = Math.random().toString(36).slice(2, 10);
    const texto = btoa(ruido + '|' + (escolha === 'm' ? 'azul' : 'rosa') + '|' + Date.now());
    try { deposito.setItem(CHAVE, texto); } catch (e) {}
  }
  function lerSegredo() {
    try {
      const t = deposito.getItem(CHAVE);
      if (!t) return null;
      const partes = atob(t).split('|');
      return partes[1] === 'azul' ? 'm' : partes[1] === 'rosa' ? 'f' : null;
    } catch (e) { return null; }
  }
  function apagarSegredo() {
    try { localStorage.removeItem(CHAVE); sessionStorage.removeItem(CHAVE); } catch (e) {}
  }

  if (params.has('reiniciar')) {
    apagarSegredo();
    history.replaceState(null, '', location.pathname + (ENSAIO ? '?ensaio' : ''));
  }
  if (ENSAIO) $('#ensaio').hidden = false;

  // ---------- o palco escala pra caber na tela ----------
  const palco = $('#palco');
  function ajustar() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    palco.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  addEventListener('resize', ajustar);
  ajustar();

  // ---------- som (sintetizado, sem arquivo) ----------
  let somLigado = true;
  try { somLigado = localStorage.getItem(CHAVE_SOM) !== '0'; } catch (e) {}
  let ac = null;
  function audio() {
    if (!somLigado) return null;
    if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }
  function ruido(dur, tipo, freq, ganho) {
    const c = audio(); if (!c) return;
    const n = c.sampleRate * dur, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = tipo; f.frequency.value = freq; f.Q.value = 1.2;
    const g = c.createGain(); g.gain.value = ganho;
    src.connect(f).connect(g).connect(c.destination); src.start();
  }
  function nota(freq, t0, dur, tipo = 'triangle', ganho = .18) {
    const c = audio(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = tipo; o.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime + t0);
    g.gain.linearRampToValueAtTime(ganho, c.currentTime + t0 + .02);
    g.gain.exponentialRampToValueAtTime(.001, c.currentTime + t0 + dur);
    o.connect(g).connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + .05);
  }
  const som = {
    videocassete() { ruido(.35, 'lowpass', 400, .5); nota(70, 0, .3, 'sine', .3); },
    giz() { ruido(.22, 'bandpass', 1800, .35); },
    quase() { nota(880, 0, .12, 'square', .08); nota(1174, .13, .18, 'square', .08); },
    fanfarra() { [523, 659, 784, 1046].forEach((f, i) => nota(f, i * .14, .5, 'triangle', .22)); nota(1318, .6, 1.2, 'triangle', .2); },
    fogo() { ruido(.5, 'highpass', 900, .25); nota(200 + Math.random() * 200, 0, .25, 'sine', .15); },
    clique() { nota(600, 0, .06, 'square', .05); }
  };
  const btnSom = $('#btn-som');
  function pintarSom() {
    btnSom.textContent = somLigado ? '🔊 SOM' : '🔇 MUDO';
    btnSom.setAttribute('aria-pressed', String(somLigado));
  }
  function alternarSom() {
    somLigado = !somLigado;
    try { localStorage.setItem(CHAVE_SOM, somLigado ? '1' : '0'); } catch (e) {}
    if (!somLigado && ac) ac.suspend();
    trilha.silenciar(!somLigado);
    pintarSom(); if (somLigado) som.clique();
  }
  btnSom.addEventListener('click', alternarSom);

  // ---------- trilha sonora (arquivos em assets/som; se o arquivo não existir, nada toca) ----------
  // Uma faixa por momento. Troque os nomes aqui quando os arquivos chegarem.
  // Momentos que apontam para o mesmo arquivo continuam a mesma música, sem recomeçar.
  const TRILHA = {
    capa: 'assets/som/01-capa.mp3?v=b293531d2b',
    seletor: 'assets/som/02-seletor.mp3?v=eb929f4b64',
    confirmar: 'assets/som/03-confirmar.mp3?v=697a7d6159',
    play: 'assets/som/04-play.mp3?v=61e23149b0',
    vhs: 'assets/som/05-fita.mp3',
    crawl: 'assets/som/06-letreiro.mp3',
    delorean: 'assets/som/07-sequencia.mp3',
    jurassic: 'assets/som/07-sequencia.mp3',
    matrix: 'assets/som/07-sequencia.mp3',
    aventura: 'assets/som/07-sequencia.mp3',
    jogo: 'assets/som/08-jogo.mp3',
    resultado: 'assets/som/09-resultado.mp3',
    fim: 'assets/som/10-fim.mp3',
    trailer: 'assets/som/11-trailer.mp3'
  };
  // Ponto de corte do loop, por faixa (segundos). Sem entrada aqui, a faixa repete inteira.
  // Com entrada, o tocador para em `fim` e emenda com o começo num crossfade de `cruzar` segundos
  // (serve para faixas que terminam em silêncio ou com fade).
  // `inicio` (opcional) é onde a volta recomeça, para pular uma narração que só deve tocar uma vez.
  const LOOP = {
    capa: { fim: 170.0, cruzar: 1.5 },
    seletor: { fim: 175.0, cruzar: 1.5, inicio: 45 },
    confirmar: { fim: 58.5, cruzar: 1.5, inicio: 1 },
    play: { fim: 57.0, cruzar: 1.5, inicio: 2.5 }
  };
  const trilha = (() => {
    let tocando = null;        // { nome, arquivo, a: Audio, vigia: intervalo }
    const falhou = new Set();
    function novoAudio(arquivo) {
      const a = new Audio(arquivo); a.preload = 'auto'; a.muted = !somLigado;
      a.addEventListener('error', () => falhou.add(arquivo));
      return a;
    }
    function fade(a, de, para, ms, depois) {
      const passos = 24, dt = ms / passos; let i = 0;
      const t = setInterval(() => { i++; a.volume = Math.max(0, Math.min(1, de + (para - de) * i / passos)); if (i >= passos) { clearInterval(t); depois && depois(); } }, dt);
    }
    function ligar(a, nome, volumeInicial, msFade) {
      const cfg = LOOP[nome];
      a.loop = !cfg;
      a.volume = volumeInicial;
      a.play().then(() => { if (msFade) fade(a, volumeInicial, 1, msFade); else a.volume = 1; }).catch(() => {});
      if (!cfg) return null;
      // vigia o ponto de corte e emenda com uma segunda instância do mesmo arquivo
      return setInterval(() => {
        if (!tocando || tocando.a !== a) return;
        if (a.currentTime >= cfg.fim - cfg.cruzar) {
          const b = novoAudio(a.currentSrc || a.src);
          if (cfg.inicio) b.currentTime = cfg.inicio;
          const velho = a;
          clearInterval(tocando.vigia);
          tocando.a = b;
          tocando.vigia = ligar(b, nome, 0, cfg.cruzar * 1000);
          fade(velho, velho.volume, 0, cfg.cruzar * 1000, () => { velho.pause(); velho.src = ''; });
        }
      }, 40);
    }
    function desligar(t, ms) {
      if (!t) return;
      clearInterval(t.vigia);
      const a = t.a; fade(a, a.volume, 0, ms, () => { a.pause(); });
    }
    return {
      tocar(nome) {
        const arquivo = TRILHA[nome] || null;
        if (tocando && tocando.arquivo === arquivo) return;
        if (tocando) { desligar(tocando, 600); tocando = null; }
        if (!arquivo || falhou.has(arquivo)) return;
        const a = novoAudio(arquivo);
        tocando = { nome, arquivo, a, vigia: null };
        tocando.vigia = ligar(a, nome, 0, 800);
      },
      parar() { desligar(tocando, 500); tocando = null; },
      silenciar(sim) { if (tocando) tocando.a.muted = sim; },
      estado() { return tocando ? { nome: tocando.nome, tempo: tocando.a.currentTime, volume: tocando.a.volume, pausado: tocando.a.paused } : null; },
      buscar(seg) { if (tocando) tocando.a.currentTime = seg; }
    };
  })();
  if (params.has('depurar')) window.trilha = trilha;
  pintarSom();

  // ---------- navegação entre telas ----------
  const telas = $$('.tela');
  let telaAtual = 'capa';
  const aoEntrar = {};
  const aoSair = {};
  function irPara(nome) {
    if (aoSair[telaAtual]) aoSair[telaAtual]();
    telas.forEach(t => t.classList.toggle('ativa', t.dataset.tela === nome));
    telaAtual = nome;
    if (nome !== 'abertura') trilha.tocar(nome);
    if (aoEntrar[nome]) aoEntrar[nome]();
  }
  $$('[data-ir]').forEach(b => b.addEventListener('click', () => { som.clique(); irPara(b.dataset.ir); }));

  // ---------- 2 e 3. seletor e confirmação ----------
  let escolha = null;
  const cartas = $$('#tela-seletor .polaroid');
  const btnConfirmar1 = $('#btn-confirmar-1');
  cartas.forEach(c => c.addEventListener('click', () => {
    escolha = c.dataset.escolha;
    cartas.forEach(x => x.setAttribute('aria-checked', String(x === c)));
    btnConfirmar1.disabled = false; btnConfirmar1.classList.remove('inativo');
    som.clique();
  }));
  btnConfirmar1.addEventListener('click', () => {
    if (!escolha) return;
    const p = $('#polaroid-escolha');
    p.classList.toggle('m', escolha === 'm'); p.classList.toggle('f', escolha === 'f');
    $('#img-escolha').src = escolha === 'm' ? 'assets/kaio.svg' : 'assets/nanda.svg';
    $('#nome-escolha').textContent = escolha === 'm' ? 'Menino' : 'Menina';
    som.clique(); irPara('confirmar');
  });
  $('#btn-confirmar-2').addEventListener('click', () => {
    guardar(escolha);
    // some da interface
    escolha = null;
    cartas.forEach(x => x.setAttribute('aria-checked', 'false'));
    btnConfirmar1.disabled = true; btnConfirmar1.classList.add('inativo');
    $('#img-escolha').src = 'assets/kaio.svg'; $('#nome-escolha').textContent = '…';
    som.videocassete(); irPara('play');
  });

  // ---------- 4. play ----------
  $('#btn-play').addEventListener('click', comecarAbertura);
  function comecarAbertura() {
    if (!lerSegredo()) { irPara('seletor'); return; }
    som.videocassete();
    irPara('abertura');
  }
  // segurar o título por 5 s pra recomeçar
  const segurar = $('#segurar-reset'); let timerSegurar = null;
  const comecaSegurar = () => { clearTimeout(timerSegurar); timerSegurar = setTimeout(() => { $('#dialogo-reset').hidden = false; }, 5000); };
  const paraSegurar = () => clearTimeout(timerSegurar);
  segurar.addEventListener('pointerdown', comecaSegurar);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => segurar.addEventListener(ev, paraSegurar));
  $('#btn-reset').addEventListener('click', () => { $('#dialogo-reset').hidden = false; });
  $('#reset-nao').addEventListener('click', () => { $('#dialogo-reset').hidden = true; });
  $('#reset-sim').addEventListener('click', () => { apagarSegredo(); location.href = location.pathname + (ENSAIO ? '?ensaio' : ''); });

  // ---------- 5. abertura ----------
  const CENAS = [['vhs', 4500], ['crawl', 112000], ['delorean', 9000], ['jurassic', 7500], ['matrix', 7500], ['aventura', 8500]];
  let timersAbertura = [];
  let cenaAtual = null;
  let timerProximaCena = null;
  function mostrarCena(nome) {
    $$('#tela-abertura .cena').forEach(c => c.classList.toggle('ativa', c.dataset.cena === nome));
    cenaAtual = nome;
    trilha.tocar(nome);
    if (nome === 'vhs') {
      let seg = 0; const osd = $('#osd-tempo');
      const tic = () => { seg++; osd.textContent = '0:00:' + String(seg).padStart(2, '0'); };
      osd.textContent = '0:00:00';
      timersAbertura.push(setInterval(tic, 1000));
    }
    if (nome === 'matrix') {
      montarChuva();
      const alvo = 'Pílula azul ou pílula rosa?', el = $('#matrix-texto'); el.textContent = '';
      let i = 0;
      const t = setInterval(() => { el.textContent = alvo.slice(0, ++i); if (i >= alvo.length) clearInterval(t); }, 70);
      timersAbertura.push(t);
    }
    if (nome === 'jurassic') timersAbertura.push(setTimeout(() => ruido(.9, 'lowpass', 250, .6), 1500));
    if (nome === 'delorean') ruido(1.2, 'lowpass', 600, .35);
  }
  function limparAbertura() {
    timersAbertura.forEach(t => { clearTimeout(t); clearInterval(t); });
    timersAbertura = [];
    $$('#tela-abertura .cena').forEach(c => c.classList.remove('ativa'));
  }
  let indiceCena = 0;
  function irCena(i) {
    clearTimeout(timerProximaCena);
    timersAbertura.forEach(t => { clearTimeout(t); clearInterval(t); }); timersAbertura = [];
    if (i >= CENAS.length) { irPara('jogo'); return; }
    indiceCena = i;
    const [nome, dur] = CENAS[i];
    mostrarCena(nome);
    timerProximaCena = setTimeout(() => irCena(i + 1), dur);
  }
  function proximaCena() { irCena(indiceCena + 1); }
  aoEntrar.abertura = () => { limparAbertura(); irCena(0); };
  aoSair.abertura = () => { clearTimeout(timerProximaCena); limparAbertura(); };
  $('#tela-abertura').addEventListener('click', proximaCena);
  let chuvaPronta = false;
  function montarChuva() {
    if (chuvaPronta) return; chuvaPronta = true;
    const c = $('#chuva'); const chars = 'アイウエオカキクケコ0123456789NANDAKAIO1989199320261&';
    for (let i = 0; i < 44; i++) {
      const d = document.createElement('div'); let s = ''; const n = 24 + Math.floor(Math.random() * 30);
      for (let j = 0; j < n; j++) s += chars[Math.floor(Math.random() * chars.length)];
      d.textContent = s; d.style.animationDuration = (4 + Math.random() * 6) + 's'; d.style.animationDelay = (-Math.random() * 6) + 's'; d.style.opacity = .3 + Math.random() * .7;
      c.appendChild(d);
    }
  }

  // ---------- 6. jogo ----------
  // Tabuleiro 4×4; vence quem fizer 4 em linha, coluna ou diagonal. X = menino, O = menina.
  // O símbolo de cada casa é decidido na hora do clique: o lado que não vai ganhar nunca fecha quatro,
  // e o lado que vai ganhar só fecha o mais tarde possível (regra das "linhas vivas" + busca exata no fim).
  const N = 4;
  const LINHAS = [];
  for (let r = 0; r < N; r++) LINHAS.push([0, 1, 2, 3].map(c => r * N + c));
  for (let c = 0; c < N; c++) LINHAS.push([0, 1, 2, 3].map(r => r * N + c));
  LINHAS.push([0, 5, 10, 15]); LINHAS.push([3, 6, 9, 12]);
  const LINHAS_DA_CASA = Array.from({ length: 16 }, (_, i) => LINHAS.filter(l => l.includes(i)));

  function completa(b, i, s) { return LINHAS_DA_CASA[i].some(l => l.every(j => (j === i ? s : b[j]) === s)); }
  function temViva(b) { return LINHAS.some(l => l.every(j => b[j] !== 'L')); }
  function regraMatar(b, i) {
    const vivas = LINHAS.filter(l => l.every(j => b[j] !== 'L'));
    if (completa(b, i, 'L')) return 'W';
    if (!vivas.some(l => !l.includes(i))) return 'W';
    return 'L';
  }
  // busca exata: valor esperado do clique em que o vencedor fecha, com ordem de cliques aleatória
  const memo = new Map();
  function valor(b) {
    const chave = b.join('');
    if (memo.has(chave)) return memo.get(chave);
    const vazias = []; b.forEach((v, i) => { if (!v) vazias.push(i); });
    const t = 16 - vazias.length;
    let total = 0;
    for (const i of vazias) {
      let melhor = -1;
      for (const s of ['W', 'L']) {
        let v;
        if (s === 'L') {
          if (completa(b, i, 'L')) continue;
          const nb = b.slice(); nb[i] = 'L';
          if (!temViva(nb)) continue;
          v = valor(nb);
        } else if (completa(b, i, 'W')) v = t + 1;
        else { const nb = b.slice(); nb[i] = 'W'; v = valor(nb); }
        if (v > melhor) melhor = v;
      }
      total += melhor;
    }
    const r = vazias.length ? total / vazias.length : 16;
    memo.set(chave, r); return r;
  }
  function melhorSimbolo(b, i) {
    const t = 16 - b.filter(v => !v).length;
    let melhor = -1, escolhido = 'W';
    for (const s of ['W', 'L']) {
      let v;
      if (s === 'L') {
        if (completa(b, i, 'L')) continue;
        const nb = b.slice(); nb[i] = 'L';
        if (!temViva(nb)) continue;
        v = valor(nb);
      } else if (completa(b, i, 'W')) v = t + 1;
      else { const nb = b.slice(); nb[i] = 'W'; v = valor(nb); }
      if (v > melhor) { melhor = v; escolhido = s; }
    }
    return escolhido;
  }
  function decidir(b, i) {
    const vazias = b.filter(v => !v).length;
    return vazias <= 10 ? melhorSimbolo(b, i) : regraMatar(b, i);
  }

  const jogo = { tab: [], vencedor: null, jogada: 0, vez: 'Nanda', acabou: false };
  const celulasEl = $('#celulas');
  const vezEl = $('#vez'), jogadaEl = $('#jogada'), quaseEl = $('#quase');
  function marcaSvg(simbolo) {
    return simbolo === 'X'
      ? '<svg viewBox="0 0 100 100"><path class="tr" d="M18 18l64 64"/><path class="tr tr2" d="M82 18L18 82"/></svg>'
      : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="33"/></svg>';
  }
  function montarTabuleiro() {
    celulasEl.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'cel'; b.dataset.i = i; b.setAttribute('aria-label', 'casa ' + (i + 1));
      b.addEventListener('click', () => jogar(i));
      celulasEl.appendChild(b);
    }
  }
  function pintarVez() {
    vezEl.firstChild.textContent = (jogo.vez === 'Nanda' ? 'vez da Nanda' : 'vez do Kaio');
    jogadaEl.textContent = 'jogada ' + Math.min(jogo.jogada + 1, 16) + ' de 16';
  }
  aoEntrar.jogo = () => {
    jogo.vencedor = lerSegredo() || (ENSAIO ? (Math.random() < .5 ? 'm' : 'f') : 'm');
    jogo.tab = Array(16).fill(''); jogo.jogada = 0; jogo.vez = 'Nanda'; jogo.acabou = false;
    memo.clear();
    quaseEl.hidden = true; $('#tela-jogo .topo').classList.remove('sumir');
    montarTabuleiro(); pintarVez();
  };
  function simboloDe(lado) { // lado interno W/L → X/O conforme quem vence
    const vencedorX = jogo.vencedor === 'm';
    return (lado === 'W') === vencedorX ? 'X' : 'O';
  }
  function jogar(i) {
    if (jogo.acabou || jogo.tab[i]) return;
    const lado = decidir(jogo.tab, i);
    jogo.tab[i] = lado;
    const simbolo = simboloDe(lado);
    const cel = celulasEl.children[i];
    cel.classList.add('cheia', simbolo === 'X' ? 'm' : 'f');
    cel.innerHTML = marcaSvg(simbolo);
    som.giz();
    jogo.jogada++; jogo.vez = jogo.vez === 'Nanda' ? 'Kaio' : 'Nanda'; pintarVez();

    // venceu?
    const linhaVencedora = LINHAS.find(l => l.every(j => jogo.tab[j] === 'W'));
    if (linhaVencedora) {
      jogo.acabou = true;
      linhaVencedora.forEach(j => celulasEl.children[j].classList.add('venceu'));
      quaseEl.hidden = true;
      vezEl.firstChild.textContent = 'quatro em linha!';
      jogadaEl.textContent = 'tá revelado';
      setTimeout(() => som.fanfarra(), 300);
      setTimeout(() => irPara('resultado'), 2600);
      return;
    }
    // quase: alguma linha com três iguais e uma casa vazia
    const quase = LINHAS.find(l => {
      const vazias = l.filter(j => !jogo.tab[j]);
      if (vazias.length !== 1) return false;
      const cheias = l.filter(j => jogo.tab[j]);
      return cheias.every(j => jogo.tab[j] === jogo.tab[cheias[0]]);
    });
    if (quase) {
      const ladoQuase = jogo.tab[quase.find(j => jogo.tab[j])];
      const simb = simboloDe(ladoQuase);
      quaseEl.textContent = simb === 'X' ? 'quase! falta um X…' : 'quase! falta um O…';
      quaseEl.classList.toggle('azul', simb === 'X');
      if (quaseEl.hidden) som.quase();
      quaseEl.hidden = false; $('#tela-jogo .topo').classList.add('sumir');
    } else {
      quaseEl.hidden = true; $('#tela-jogo .topo').classList.remove('sumir');
    }
  }

  // ---------- 7. resultado ----------
  let timerFogos = null;
  aoEntrar.resultado = () => {
    const menino = jogo.vencedor === 'm';
    const tela = $('#tela-resultado');
    tela.classList.toggle('menino', menino);
    $('#grande').textContent = menino ? 'É MENINO!' : 'É MENINA!';
    $('#pers-resultado').src = menino ? 'assets/kaio.svg' : 'assets/nanda.svg';
    const fogos = $('#fogos'); fogos.innerHTML = '';
    const cores = menino ? ['#ffd23f', '#fff', '#36e2ff', '#ff7ac8'] : ['#ffd23f', '#fff', '#36e2ff', '#ff7ac8'];
    for (let k = 0; k < 12; k++) {
      const f = document.createElement('div'); f.className = 'fogo-r';
      const tam = 180 + Math.random() * 260;
      f.style.width = f.style.height = tam + 'px';
      f.style.left = (Math.random() * 1700) + 'px'; f.style.top = (Math.random() * 600) + 'px';
      f.style.color = cores[k % cores.length]; f.style.animationDelay = (Math.random() * 2.4) + 's';
      fogos.appendChild(f);
    }
    som.fogo();
    timerFogos = setInterval(() => som.fogo(), 1300);
  };
  aoSair.resultado = () => clearInterval(timerFogos);
  $('#btn-fim').addEventListener('click', e => { e.stopPropagation(); clearInterval(timerFogos); irPara('fim'); });
  let timerTrailer = null;
  const NOMES = { f: ['Aurora', 'Flora', 'Lara', 'Alice'], m: ['Bernardo', 'Valentim'] };
  aoEntrar.fim = () => {
    const menino = jogo.vencedor === 'm';
    const telaFim = $('#tela-fim');
    telaFim.classList.remove('trailer-ativo'); $('#trailer').hidden = true;
    $('#tt3').textContent = menino ? 'El Nombre del Niño' : 'El Nombre de la Niña';
    const itens = NOMES[menino ? 'm' : 'f'].map(n => n + '?');
    itens.push('…'); itens.push('ainda não decidiu');
    const fita = $('#fita-nomes'); fita.innerHTML = '';
    [...itens, ...itens].forEach(t => { const d = document.createElement('div'); d.textContent = t; if (!/\?$/.test(t)) d.classList.add('duvida'); fita.appendChild(d); });
    $('#sorteio-nota').textContent = menino
      ? 'Kaio: "Bernardo, fechado." Nanda: "calma, deixa eu pensar."'
      : 'Kaio: "Aurora, fechado." Nanda: "calma, deixa eu pensar."';
    clearTimeout(timerTrailer);
    timerTrailer = setTimeout(() => { $('#trailer').hidden = false; telaFim.classList.add('trailer-ativo'); som.videocassete(); trilha.tocar('trailer'); }, 4500);
  };
  aoSair.fim = () => clearTimeout(timerTrailer);
  $('#tela-fim').addEventListener('click', () => {
    if ($('#trailer').hidden) { clearTimeout(timerTrailer); $('#trailer').hidden = false; $('#tela-fim').classList.add('trailer-ativo'); trilha.tocar('trailer'); }
    else irPara('resultado');
  });

  // ---------- teclado ----------
  addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      if (telaAtual === 'play') { e.preventDefault(); comecarAbertura(); }
      else if (telaAtual === 'abertura') { e.preventDefault(); proximaCena(); }
      else if (telaAtual === 'capa') { e.preventDefault(); irPara('seletor'); }
    }
    if (e.key === 'Escape') {
      if (!$('#dialogo-reset').hidden) $('#dialogo-reset').hidden = true;
      else if (telaAtual === 'abertura') irPara('jogo');
    }
    if (e.key === 'm' || e.key === 'M') alternarSom();
  });

  // ---------- começo ----------
  if (lerSegredo()) irPara('play'); else irPara('capa');
  $('#legenda').textContent = 'CHÁ REVELAÇÃO · NANDA E KAIO' + (ENSAIO ? ' · ENSAIO' : '');
})();
