// Renderiza as telas do estudo em PNG. Uso: node render.js [nome-da-tela ...]
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const TELAS = [
  ['00-identidade', 1920, 1080],
  ['01-capa', 1920, 1080],
  ['02-seletor', 1920, 1080],
  ['03-confirmar', 1920, 1080],
  ['04-play', 1920, 1080],
  ['05a-intro-vhs', 1920, 1080],
  ['05b-intro-crawl', 1920, 1080],
  ['05c-intro-delorean', 1920, 1080],
  ['05d-intro-jurassic', 1920, 1080],
  ['05e-intro-matrix', 1920, 1080],
  ['05f-intro-aventura', 1920, 1080],
  ['06-jogo', 1920, 1080],
  ['06b-jogo-tensao', 1920, 1080],
  ['07a-resultado-menina', 1920, 1080],
  ['07b-resultado-menino', 1920, 1080],
  ['08-celular-seletor', 390, 844],
  ['05-intro-storyboard', 1920, 1300],
];
(async () => {
  const so = process.argv.slice(2);
  const lista = so.length ? TELAS.filter(t => so.includes(t[0])) : TELAS;
  const b = await chromium.launch();
  for (const [nome, w, h] of lista) {
    const arq = path.join(__dirname, 'telas', nome + '.html');
    if (!fs.existsSync(arq)) { console.log('pulando', nome); continue; }
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto('file://' + arq);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(__dirname, 'imagens', nome + '.png') });
    await p.close();
    console.log('ok', nome);
  }
  await b.close();
})();
