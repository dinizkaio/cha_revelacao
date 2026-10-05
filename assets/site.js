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
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    clique() { nota(600, 0, .06, 'square', .05); },
    tracking() { ruido(.32, 'bandpass', 2400, .22); ruido(.18, 'lowpass', 300, .25); },
    carimbo() { ruido(.08, 'lowpass', 500, .5); nota(80, 0, .18, 'square', .22); },
    piar() { nota(520, 0, .22, 'sine', .12); nota(440, .25, .3, 'sine', .12); },
    sininho() { [1760, 2217, 2637].forEach((f, i) => nota(f, i * .12, .6, 'triangle', .07)); },
    apito() { nota(880, 0, .5, 'square', .08); nota(1109, 0, .5, 'square', .06); nota(880, .6, .9, 'square', .08); nota(1109, .6, .9, 'square', .06); },
    rachar() { ruido(.14, 'highpass', 1800, .35); nota(140, 0, .09, 'square', .14); nota(220, .05, .06, 'square', .1); },
    tec() { nota(1500, 0, .025, 'square', .07); }
  };
  const btnSom = $('#btn-som');
  function pintarSom() {
    btnSom.textContent = somLigado ? '🔊 SOM' : '🔇 MUDO';
    btnSom.title = somLigado ? 'Desligar o som (tecla M)' : 'Ligar o som (tecla M)';
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
    vhs: 'assets/som/05-fita.mp3?v=37c527c630',
    crawl: 'assets/som/06-letreiro.mp3?v=71b926360e',
    delorean: 'assets/som/07-sequencia.mp3?v=bc40be505d',
    matrix: 'assets/som/07-sequencia.mp3?v=bc40be505d',
    carta: 'assets/som/07-sequencia.mp3?v=bc40be505d',
    aventura: 'assets/som/07-sequencia.mp3?v=bc40be505d',
    jogo: 'assets/som/08-jogo.mp3?v=fb7f0564f2',
    resultado: 'assets/som/09-resultado.mp3?v=2603673d29',
    fim: 'assets/som/10-fim.mp3?v=9624e41a83',
    trailer: 'assets/som/11-trailer.mp3?v=a3d10521fb',
    final: 'assets/som/12-final.mp3'
  };
  // Ponto de corte do loop, por faixa (segundos). Sem entrada aqui, a faixa repete inteira.
  // Com entrada, o tocador para em `fim` e emenda com o começo num crossfade de `cruzar` segundos
  // (serve para faixas que terminam em silêncio ou com fade).
  // `inicio` (opcional) é onde a volta recomeça, para pular uma narração que só deve tocar uma vez.
  const LOOP = {
    capa: { fim: 170.0, cruzar: 1.5 },
    seletor: { fim: 175.0, cruzar: 1.5, inicio: 45 },
    confirmar: { fim: 58.5, cruzar: 1.5, inicio: 1 },
    play: { fim: 57.0, cruzar: 1.5, inicio: 2.5 },
    jogo: { fim: 162.0, cruzar: 1.5 },
    resultado: { fim: 176.5, cruzar: 1.5 },
    fim: { fim: 57.5, cruzar: 1.5 },
    trailer: { fim: 51.5, cruzar: 1.5 }
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
      a.play().then(() => { if (msFade) fade(a, volumeInicial, 1, msFade); else a.volume = 1; }).catch(() => {
        // o navegador só libera som depois de um gesto: tenta de novo no primeiro clique ou tecla
        a.volume = 1;
        const tentar = () => { if (tocando && tocando.a === a && a.paused) a.play().catch(() => {}); };
        addEventListener('pointerdown', tentar, { once: true, capture: true });
        addEventListener('keydown', tentar, { once: true, capture: true });
      });
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
      estado() { return tocando ? { nome: tocando.nome, arquivo: tocando.arquivo, tempo: tocando.a.currentTime, volume: tocando.a.volume, mudo: tocando.a.muted, pausado: tocando.a.paused, pronto: tocando.a.readyState, rede: tocando.a.networkState, erro: tocando.a.error ? tocando.a.error.code + ' ' + tocando.a.error.message : null, falhou: [...falhou] } : { falhou: [...falhou] }; },
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
  $$('[data-ir]').forEach(b => b.addEventListener('click', () => {
    som.clique();
    const capa = $('#tela-capa');
    if (b.closest('#tela-capa') && !reduzMovimento && !capa.classList.contains('saindo')) {
      capa.classList.add('saindo'); setTimeout(() => { capa.classList.remove('saindo'); irPara(b.dataset.ir); }, 520);
    } else irPara(b.dataset.ir);
  }));

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
    const tela = $('#tela-confirmar');
    if (!tela.classList.contains('carimbado') && !reduzMovimento) {
      tela.classList.add('carimbado'); som.carimbo();
      setTimeout(() => { $('#btn-confirmar-2').click(); tela.classList.remove('carimbado'); }, 900);
      return;
    }
    tela.classList.remove('carimbado');
    guardar(escolha);
    // some da interface
    escolha = null;
    cartas.forEach(x => x.setAttribute('aria-checked', 'false'));
    btnConfirmar1.disabled = true; btnConfirmar1.classList.add('inativo');
    $('#img-escolha').src = 'assets/kaio.svg'; $('#nome-escolha').textContent = '…';
    som.videocassete(); irPara('play');
  });

  // chapéu seletor resmunga (nada que entregue o resultado)
  (() => {
    const balao = $('.balao-chapeu'), chapeu = $('.chapeu-grupo .chapeu'); if (!balao) return;
    const padrao = balao.textContent;
    const falas = ['Vejo coragem… e muita fralda.', 'Um nome difícil, pelo visto…', 'Hmm… opinião forte, esse aqui.', 'Vai dar trabalho. Do bom.', 'Não me apresse!', 'Já sei… não, esqueci.'];
    let k = Math.floor(Math.random() * falas.length);
    function dizer(t) { balao.textContent = t; balao.classList.add('nova'); chapeu.classList.remove('fala'); void chapeu.offsetWidth; chapeu.classList.add('fala'); setTimeout(() => balao.classList.remove('nova'), 250); }
    $$('#tela-seletor .polaroid').forEach(p => {
      p.addEventListener('pointerenter', () => dizer(falas[k++ % falas.length]));
      p.addEventListener('pointerleave', () => { balao.textContent = padrao; });
    });
  })();

  // ---------- 4. play ----------
  $('#btn-play').addEventListener('click', comecarAbertura);
  function comecarAbertura() {
    if (!lerSegredo()) { irPara('seletor'); return; }
    const tela = $('#tela-play');
    if (tela.classList.contains('inserindo')) return;
    som.videocassete();
    if (reduzMovimento) { irPara('abertura'); return; }
    tela.classList.add('inserindo');
    setTimeout(() => { tela.classList.remove('inserindo'); irPara('abertura'); }, 1000);
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
  const CENAS = [['vhs', 8000], ['crawl', 113000], ['delorean', 10000], ['matrix', 10000], ['carta', 29000], ['aventura', 12000]];
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
    if (nome === 'carta') [[5300, () => som.tracking()], [6600, () => som.apito()], [9200, () => som.piar()], [17600, () => som.sininho()], [27600, () => som.rachar()]].forEach(([t, f]) => timersAbertura.push(setTimeout(f, t)));
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
    if (i > 0) { // tracking de VHS entre cenas
      const tela = $('#tela-abertura'); tela.classList.remove('trocando'); void tela.offsetWidth; tela.classList.add('trocando');
      som.tracking(); timersAbertura.push(setTimeout(() => tela.classList.remove('trocando'), 600));
    }
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
  // W = lado que vai vencer, L = lado que não pode vencer.
  // "Vivas" de um lado: linhas sem nenhuma marca do outro lado. Enquanto os dois lados têm linha viva, a plateia
  // não consegue saber o resultado. Prioridade: (1) L nunca fecha quatro; (2) W sempre mantém uma linha viva;
  // (3) L mantém uma linha viva até a 14ª jogada; (4) W fecha o mais tarde possível.
  const vivasW = b => LINHAS.filter(l => l.every(j => b[j] !== 'L'));
  const vivasL = b => LINHAS.filter(l => l.every(j => b[j] !== 'W'));
  function pontos(b, lado) {
    const outro = lado === 'W' ? 'L' : 'W'; let p = 0;
    for (const l of LINHAS) { if (l.some(j => b[j] === outro)) continue; const vaz = l.filter(j => !b[j]).length; p += vaz + (vaz === 4 ? 1 : 0); }
    return p;
  }
  // começo de jogo (mais de 10 casas vazias): mantém os dois lados vivos e equilibrados
  function heuristica(b, i) {
    const opcoes = [];
    for (const s of ['W', 'L']) {
      if (completa(b, i, s)) continue;
      const nb = b.slice(); nb[i] = s;
      if (!vivasW(nb).length) continue;
      const pw = pontos(nb, 'W'), pl = pontos(nb, 'L');
      opcoes.push({ s, score: (vivasL(nb).length ? 0 : -1000) + Math.min(pw, pl) * 10 - Math.abs(pw - pl) + Math.random() });
    }
    if (!opcoes.length) return 'W';
    opcoes.sort((x, y) => y.score - x.score); return opcoes[0].s;
  }
  // fim de jogo: busca exata. V(b) = valor esperado, com ordem de cliques aleatória, da recompensa futura:
  // 100 por jogada concluída (até a 14ª) com L ainda vivo, mais o número da jogada em que W fecha.
  const PESO = 100;
  const memo = new Map();
  function V(b) {
    const k = b.map(v => v || '.').join('');
    if (memo.has(k)) return memo.get(k);
    const vazias = []; b.forEach((v, i) => { if (!v) vazias.push(i); });
    if (!vazias.length) { memo.set(k, 0); return 0; }
    let total = 0;
    for (const i of vazias) total += melhor(b, i).v;
    const r = total / vazias.length; memo.set(k, r); return r;
  }
  function melhor(b, i) {
    const t = 16 - b.filter(v => !v).length + 1; // jogada que este clique conclui
    let m = { v: -Infinity, s: 'W' };
    for (const s of ['W', 'L']) {
      if (s === 'L' && completa(b, i, 'L')) continue;
      const nb = b.slice(); nb[i] = s;
      if (s === 'L' && !vivasW(nb).length) continue;
      let v;
      if (s === 'W' && completa(b, i, 'W')) v = t;
      else v = (t <= 14 && vivasL(nb).length ? PESO : 0) + V(nb);
      if (v > m.v) m = { v, s };
    }
    return m;
  }
  function decidir(b, i) {
    const vazias = b.filter(v => !v).length;
    return vazias <= 10 ? melhor(b, i).s : heuristica(b, i);
  }

  const jogo = { tab: [], vencedor: null, jogada: 0, vez: 'Nanda', acabou: false };
  const celulasEl = $('#celulas');
  const vezEl = $('#vez'), jogadaEl = $('#jogada'), quaseEl = $('#quase');
  function marcaSvg(simbolo) {
    return simbolo === 'X'
      ? '<svg viewBox="0 0 100 100"><path class="tr" d="M18 18l64 64"/><path class="tr tr2" d="M82 18L18 82"/></svg>'
      : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="33"/></svg>';
  }
  function poDeGiz(cel, n) {
    if (reduzMovimento) return;
    for (let k = 0; k < n; k++) {
      const p = document.createElement('i'); p.className = 'po';
      const ang = Math.random() * Math.PI * 2, dist = 30 + Math.random() * 70;
      p.style.setProperty('--x', (Math.cos(ang) * dist).toFixed(0) + 'px');
      p.style.setProperty('--y', (Math.sin(ang) * dist + 25).toFixed(0) + 'px');
      p.style.setProperty('--t', (3 + Math.random() * 5).toFixed(0) + 'px');
      p.style.setProperty('--d', (.5 + Math.random() * .5).toFixed(2) + 's');
      cel.appendChild(p);
      setTimeout(() => p.remove(), 1100);
    }
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
  document.querySelectorAll('svg[data-personagem]').forEach(el => montarPersonagem(el, el.dataset.personagem));
  const persK = $('#tela-jogo .pers.k'), persN = $('#tela-jogo .pers.n');
  function pose(classe) { // '' | 'susto' | 'festa'; torcer segue a vez
    [persK, persN].forEach(p => { p.classList.remove('susto', 'festa', 'torcer'); if (classe) p.classList.add(classe); });
    if (!classe && !jogo.acabou) (jogo.vez === 'Nanda' ? persN : persK).classList.add('torcer');
  }
  function pintarVez() {
    pose('');
    vezEl.firstChild.textContent = (jogo.vez === 'Nanda' ? 'vez da Nanda' : 'vez do Kaio');
    jogadaEl.textContent = 'jogada ' + Math.min(jogo.jogada + 1, 16) + ' de 16';
    const nx = jogo.tab.filter((v, i) => v && simboloDe(v) === 'X').length, no = jogo.tab.filter((v, i) => v && simboloDe(v) === 'O').length;
    const ax = $('.ampulheta.x'), ao = $('.ampulheta.o');
    if (+ax.style.getPropertyValue('--n') !== nx) { ax.style.setProperty('--n', nx); ax.classList.remove('pulso'); void ax.offsetWidth; ax.classList.add('pulso'); }
    if (+ao.style.getPropertyValue('--n') !== no) { ao.style.setProperty('--n', no); ao.classList.remove('pulso'); void ao.offsetWidth; ao.classList.add('pulso'); }
    $('#pontos-x').textContent = nx; $('#pontos-o').textContent = no;
  }
  aoEntrar.jogo = () => {
    jogo.vencedor = lerSegredo() || (ENSAIO ? (Math.random() < .5 ? 'm' : 'f') : 'm');
    jogo.tab = Array(16).fill(''); jogo.jogada = 0; jogo.vez = 'Nanda'; jogo.acabou = false;
    memo.clear();
    quaseEl.hidden = true; $('#aliens').hidden = true; $('#tela-jogo .topo').classList.remove('sumir');
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
    poDeGiz(cel, 16);
    som.giz();
    jogo.jogada++; jogo.vez = jogo.vez === 'Nanda' ? 'Kaio' : 'Nanda'; pintarVez();

    // venceu?
    const linhaVencedora = LINHAS.find(l => l.every(j => jogo.tab[j] === 'W'));
    if (linhaVencedora) {
      jogo.acabou = true;
      linhaVencedora.forEach((j, k) => { const c = celulasEl.children[j]; c.classList.add('venceu'); setTimeout(() => poDeGiz(c, 22), 150 * k); });
      quaseEl.hidden = true; $('#aliens').hidden = true; pose('festa');
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
      quaseEl.hidden = false; $('#aliens').hidden = false; pose('susto'); $('#tela-jogo .topo').classList.add('sumir');
    } else {
      quaseEl.hidden = true; $('#aliens').hidden = true; $('#tela-jogo .topo').classList.remove('sumir');
    }
  }

  // ---------- 7. resultado ----------
  // confete: canvas com papelzinhos caindo com física simples
  const confete = (() => {
    const cv = $('#confete'), cx = cv.getContext('2d');
    let pecas = [], raf = 0, ultimo = 0, cores = [];
    function nova(doTopo) {
      return { x: Math.random() * 1920, y: doTopo ? -20 : Math.random() * 1080, w: 10 + Math.random() * 10, h: 6 + Math.random() * 10,
        vx: (Math.random() - .5) * 60, vy: 90 + Math.random() * 140, ang: Math.random() * Math.PI, va: (Math.random() - .5) * 6,
        osc: Math.random() * Math.PI * 2, cor: cores[Math.floor(Math.random() * cores.length)] };
    }
    function passo(t) {
      const dt = Math.min((t - ultimo) / 1000, .05); ultimo = t;
      cx.clearRect(0, 0, 1920, 1080);
      for (const p of pecas) {
        p.osc += dt * 3; p.x += (p.vx + Math.sin(p.osc) * 40) * dt; p.y += p.vy * dt; p.ang += p.va * dt;
        if (p.y > 1100) Object.assign(p, nova(true));
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.ang); cx.scale(1, Math.cos(p.osc * 1.3));
        cx.fillStyle = p.cor; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
      }
      raf = requestAnimationFrame(passo);
    }
    return {
      ligar(c) { if (reduzMovimento) return; cores = c; pecas = Array.from({ length: 160 }, () => nova(Math.random() < .5)); ultimo = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(passo); },
      desligar() { cancelAnimationFrame(raf); raf = 0; pecas = []; cx.clearRect(0, 0, 1920, 1080); }
    };
  })();
  // parallax: mouse manda; sem mouse por 3 s, um balanço lento assume
  (() => {
    if (reduzMovimento) return;
    const palco = $('#palco'); let alvoX = 0, alvoY = 0, x = 0, y = 0, ultimoMouse = -1e9;
    addEventListener('pointermove', e => {
      alvoX = Math.max(-1, Math.min(1, (e.clientX / innerWidth - .5) * 2));
      alvoY = Math.max(-1, Math.min(1, (e.clientY / innerHeight - .5) * 2));
      ultimoMouse = performance.now();
    });
    (function passo(t) {
      if (t - ultimoMouse > 3000) { alvoX = Math.sin(t / 5200) * .6; alvoY = Math.cos(t / 7300) * .4; }
      x += (alvoX - x) * .04; y += (alvoY - y) * .04;
      palco.style.setProperty('--px', x.toFixed(3)); palco.style.setProperty('--py', y.toFixed(3));
      requestAnimationFrame(passo);
    })(0);
  })();
  let timerFogos = null;
  aoEntrar.resultado = () => {
    const menino = jogo.vencedor === 'm';
    const tela = $('#tela-resultado');
    tela.classList.toggle('menino', menino);
    $('#grande').textContent = menino ? 'É MENINO!' : 'É MENINA!';
    montarPersonagem($('#pers-resultado'), menino ? 'kaio' : 'nanda');
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
    confete.ligar(menino ? ['#36e2ff', '#3d8bff', '#ffd23f', '#fff', '#8ec1ff'] : ['#ff3d9a', '#ff7ac8', '#ffd23f', '#fff', '#ffb3dc']);
  };
  aoSair.resultado = () => { clearInterval(timerFogos); confete.desligar(); };
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
    const fita = $('#fita-nomes'); fita.innerHTML = ''; fita.className = 'fita-nomes'; fita.style.transform = '';
    [...itens, ...itens].forEach(t => { const d = document.createElement('div'); d.textContent = t; if (!/\?$/.test(t)) d.classList.add('duvida'); fita.appendChild(d); });
    roleta.preparar(itens, menino);
    clearTimeout(timerTrailer);
    timerTrailer = setTimeout(mostrarTrailer, 4500);
  };
  function mostrarTrailer() {
    clearTimeout(timerTrailer);
    if (!$('#trailer').hidden) return;
    $('#trailer').hidden = false; $('#tela-fim').classList.add('trailer-ativo'); som.videocassete(); trilha.tocar('trailer');
    roleta.rodar();
  }
  // a roleta gira, freia num nome ("tec… tec…"), pensa, e gira de novo; só para de vez no "ainda não decidiu"
  const roleta = (() => {
    const fita = $('#fita-nomes'), caixa = $('.roleta'), nota = $('#sorteio-nota');
    let timers = [], itens = [], quem = '';
    const limpar = () => { timers.forEach(clearTimeout); timers = []; };
    const depois = (ms, f) => timers.push(setTimeout(f, ms));
    function posAtual() { const m = new DOMMatrixReadOnly(getComputedStyle(fita).transform); return m.m42; }
    function frear(k, cb) { // para no item k (segunda cópia), com tiques de desaceleração
      const y = posAtual(); fita.classList.remove('girando'); fita.style.transform = `translateY(${y}px)`; void fita.offsetWidth;
      fita.classList.add('freando'); fita.style.transform = `translateY(${-120 * (k + itens.length)}px)`;
      [60, 160, 290, 450, 650, 900, 1200].forEach(t => depois(t, () => som.tec()));
      depois(1400, () => { fita.classList.remove('freando'); caixa.classList.add('parou'); cb && cb(); });
    }
    function girar(k) { // volta pro mesmo item na primeira cópia e solta a animação a partir dele
      caixa.classList.remove('parou'); fita.classList.remove('freando');
      fita.style.transform = ''; fita.style.animationDelay = (-(k / itens.length) * 1.2) + 's'; fita.classList.add('girando');
    }
    function dizer(t) { nota.textContent = t; nota.classList.remove('pisca'); void nota.offsetWidth; nota.classList.add('pisca'); }
    return {
      preparar(lista, menino) { limpar(); itens = lista; quem = menino ? 'Bernardo' : 'Aurora'; caixa.classList.remove('parou'); nota.textContent = 'girando…'; },
      rodar() {
        limpar(); if (reduzMovimento) { fita.style.transform = `translateY(${-120 * (itens.length - 1)}px)`; nota.textContent = 'Nanda: "calma, deixa eu pensar."'; return; }
        const ultimo = itens.length - 1, segundo = Math.min(1, ultimo - 2);
        girar(0); nota.textContent = 'girando…';
        depois(2600, () => frear(0, () => { dizer(`Kaio: "${quem}, fechado."`);
          depois(1500, () => { girar(0); dizer('Nanda: "espera… deixa eu ver de novo."');
            depois(1800, () => frear(segundo, () => { dizer('Kaio: "fechado então?"  Nanda: "hmm…"');
              depois(1600, () => { girar(segundo); dizer('girando…');
                depois(2000, () => frear(ultimo, () => dizer('Nanda: "calma, deixa eu pensar."')));
              });
            }));
          });
        }));
      },
      parar() { limpar(); fita.classList.remove('girando', 'freando'); }
    };
  })();
  aoSair.fim = () => { clearTimeout(timerTrailer); roleta.parar(); };
  $('#tela-fim').addEventListener('click', () => {
    if ($('#trailer').hidden) mostrarTrailer();
    else irPara('final');
  });

  // ---------- 9. final: Mapa do Maroto, sem som ----------
  let timersFinal = [];
  aoEntrar.final = () => {
    const tela = $('#tela-final'); tela.classList.remove('nox', 'apagar'); tela.classList.toggle('menino', jogo.vencedor === 'm');
    const peg = $('#pegadas'); peg.innerHTML = '';
    const passo = (x, y, rot, atraso, bebe) => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('class', 'pegada' + (bebe ? ' bebe' : '')); s.innerHTML = '<use href="#pegada"/>';
      s.style.left = x + 'px'; s.style.top = y + 'px'; s.style.transform = `rotate(${rot}deg)`; s.style.animationDelay = atraso + 's';
      peg.appendChild(s);
    };
    const tag = (texto, x, y, atraso, bebe) => {
      const d = document.createElement('div'); d.className = 'tag-pegada' + (bebe ? ' bebe' : ''); d.textContent = texto;
      d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.animationDelay = atraso + 's'; peg.appendChild(d);
    };
    // Nanda vem da esquerda, Kaio da direita; os dois param no meio
    for (let k = 0; k < 9; k++) {
      const t = 2.2 + k * .3;
      passo(150 + k * 62, 420 + (k % 2 ? 22 : -22) - 10 * Math.sin(k / 2), 90 + (k % 2 ? 6 : -6), t, false);
      passo(1280 - k * 62, 420 + (k % 2 ? -22 : 22) + 10 * Math.sin(k / 2), -90 + (k % 2 ? -6 : 6), t, false);
    }
    tag('Nanda', 420, 350, 5.2, false); tag('Kaio', 1040, 350, 5.2, false);
    passo(718, 446, 90, 6.2, true); passo(740, 428, 90, 6.5, true);
    tag('?', 730, 380, 7, true);
    const atraso = reduzMovimento ? 0 : 1;
    timersFinal = [setTimeout(() => { tela.classList.add('nox'); trilha.parar(); }, 12500 * atraso + 10), setTimeout(() => tela.classList.add('apagar'), 15000 * atraso + 20)];
  };
  aoSair.final = () => { timersFinal.forEach(clearTimeout); timersFinal = []; $('#tela-final').classList.remove('nox', 'apagar'); };
  $('#tela-final').addEventListener('click', () => { if ($('#tela-final').classList.contains('nox')) irPara('capa'); });

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
