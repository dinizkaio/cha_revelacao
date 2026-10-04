// Personagens (Kaio e Nanda crianças) como SVG inline, com partes nomeadas
// pra CSS animar: braços, olhos, pálpebras, sobrancelhas, boca.
// Poses por classe no <svg class="pers">: .torcer, .susto, .festa. Piscar é automático.
(function () {
  const KAIO = `
  <path d="M128 330v48M172 330v48" stroke="#d9a878" stroke-width="18" stroke-linecap="round"/>
  <path d="M100 378h44v14q6 14-6 18H98q-10-4-6-14z" fill="#3d8bff" class="pt"/><path d="M94 396h56" stroke="#fff" stroke-width="6"/>
  <path d="M156 378h44q10 10 6 18q-6 14-12 14h-38z" fill="#3d8bff" class="pt"/><path d="M150 396h58" stroke="#fff" stroke-width="6"/>
  <path d="M108 292h84l6 46h-38l-10-20-10 20h-38z" fill="#d8302f" class="pt"/>
  <g class="braco e" style="transform-origin:106px 236px"><path d="M106 236q-36 30-30 86" fill="none" stroke="#2a1a12" stroke-width="22" stroke-linecap="round"/><path d="M106 236q-36 30-30 86" fill="none" stroke="#d9a878" stroke-width="12" stroke-linecap="round"/></g>
  <g class="braco d" style="transform-origin:194px 236px"><path d="M194 236q36 30 30 86" fill="none" stroke="#2a1a12" stroke-width="22" stroke-linecap="round"/><path d="M194 236q36 30 30 86" fill="none" stroke="#d9a878" stroke-width="12" stroke-linecap="round"/></g>
  <path d="M104 226q46-14 92 0l10 72H94z" fill="#fff8ec" class="pt"/><path d="M130 240q20 8 40 0" fill="none" stroke="#2a1a12" stroke-width="4"/>
  <g transform="translate(150 268)"><circle r="16" fill="#ffd23f" stroke="#2a1a12" stroke-width="3"/><circle cx="-5" cy="-3" r="3" fill="#2a1a12"/><circle cx="5" cy="-3" r="3" fill="#2a1a12"/><path d="M-6 6l6 5 6-5z" fill="#ff8a2e" stroke="#2a1a12" stroke-width="2"/><path d="M-4-14l4-8 4 8" fill="#ffd23f" stroke="#2a1a12" stroke-width="2"/></g>
  <rect x="136" y="206" width="28" height="26" fill="#e3b58b"/>
  <g class="cabeca" style="transform-origin:150px 232px">
  <path d="M52 128q0-96 98-96t98 96q0 60-30 86-28 24-68 24t-68-24q-30-26-30-86z" fill="#e3b58b" class="pt"/>
  <ellipse cx="54" cy="150" rx="11" ry="14" fill="#e3b58b" class="pt"/><ellipse cx="246" cy="150" rx="11" ry="14" fill="#e3b58b" class="pt"/>
  <g fill="#1b1b1b" stroke="#2a1a12" stroke-width="5" stroke-linejoin="round"><circle cx="70" cy="110" r="26"/><circle cx="96" cy="78" r="28"/><circle cx="130" cy="58" r="30"/><circle cx="170" cy="58" r="30"/><circle cx="204" cy="78" r="28"/><circle cx="230" cy="110" r="26"/><circle cx="86" cy="140" r="20"/><circle cx="214" cy="140" r="20"/><circle cx="150" cy="44" r="26"/><path d="M62 128q4-60 88-66t88 66q-20-30-44-26-22-30-44-14-22-16-44 14-24-4-44 26z"/></g>
  <g fill="#1b1b1b"><circle cx="70" cy="110" r="26"/><circle cx="96" cy="78" r="28"/><circle cx="130" cy="58" r="30"/><circle cx="170" cy="58" r="30"/><circle cx="204" cy="78" r="28"/><circle cx="230" cy="110" r="26"/><circle cx="86" cy="140" r="20"/><circle cx="214" cy="140" r="20"/><circle cx="150" cy="44" r="26"/><path d="M62 128q4-60 88-66t88 66q-20-30-44-26-22-30-44-14-22-16-44 14-24-4-44 26z"/></g>
  <g class="olhos" style="transform-origin:150px 160px"><circle cx="116" cy="160" r="30" fill="#fff" class="pt"/><circle cx="184" cy="160" r="30" fill="#fff" class="pt"/>
    <g class="pupilas"><circle cx="122" cy="166" r="14" fill="#4a2a14"/><circle cx="178" cy="166" r="14" fill="#4a2a14"/><circle cx="122" cy="166" r="7" fill="#1a0d06"/><circle cx="178" cy="166" r="7" fill="#1a0d06"/><circle cx="127" cy="159" r="4" fill="#fff"/><circle cx="183" cy="159" r="4" fill="#fff"/></g>
    <path class="palpebra" d="M86 160a30 30 0 0 1 60 0z" fill="#e3b58b" stroke="#2a1a12" stroke-width="5" style="transform-origin:116px 130px"/><path class="palpebra" d="M154 160a30 30 0 0 1 60 0z" fill="#e3b58b" stroke="#2a1a12" stroke-width="5" style="transform-origin:184px 130px"/></g>
  <path class="sobrancelhas" d="M92 122q22-12 46-2M162 120q24-10 46 2" fill="none" stroke="#2a1a12" stroke-width="6" stroke-linecap="round"/>
  <path d="M150 180q-8 12 0 20" fill="none" class="pt"/>
  <g class="boca sorriso"><path d="M112 212q38 34 76 0z" fill="#5a1e24" class="pt"/><path d="M120 214q30 10 60 0v6q-30 6-60 0z" fill="#fff"/></g>
  <g class="boca espanto"><ellipse cx="150" cy="218" rx="15" ry="19" fill="#5a1e24" class="pt"/></g>
  <circle cx="88" cy="196" r="9" fill="#e38a6c" opacity=".55"/><circle cx="212" cy="196" r="9" fill="#e38a6c" opacity=".55"/>
  </g>`;
  const NANDA = `
  <path d="M130 334v44M170 334v44" stroke="#f1cfb4" stroke-width="18" stroke-linecap="round"/>
  <path d="M102 378h44v14q6 14-6 18h-40q-10-4-6-14z" fill="#ff4fa3" class="pt"/><path d="M96 396h56" stroke="#fff" stroke-width="6"/>
  <path d="M158 378h44q10 10 6 18q-6 14-12 14h-38z" fill="#ff4fa3" class="pt"/><path d="M152 396h58" stroke="#fff" stroke-width="6"/>
  <g fill="#d9a84f" stroke="#2a1a12" stroke-width="5"><circle cx="62" cy="200" r="26"/><circle cx="238" cy="200" r="26"/><circle cx="58" cy="160" r="26"/><circle cx="242" cy="160" r="26"/><circle cx="70" cy="236" r="22"/><circle cx="230" cy="236" r="22"/></g>
  <g fill="#d9a84f"><circle cx="62" cy="200" r="26"/><circle cx="238" cy="200" r="26"/><circle cx="58" cy="160" r="26"/><circle cx="242" cy="160" r="26"/><circle cx="70" cy="236" r="22"/><circle cx="230" cy="236" r="22"/></g>
  <g class="braco e" style="transform-origin:106px 236px"><path d="M106 236q-40 36-28 90" fill="none" stroke="#2a1a12" stroke-width="22" stroke-linecap="round"/><path d="M106 236q-40 36-28 90" fill="none" stroke="#f1cfb4" stroke-width="12" stroke-linecap="round"/><circle cx="78" cy="326" r="14" fill="#f1cfb4" class="pt"/></g>
  <g class="braco d" style="transform-origin:194px 236px"><path d="M194 236q40 36 28 90" fill="none" stroke="#2a1a12" stroke-width="22" stroke-linecap="round"/><path d="M194 236q40 36 28 90" fill="none" stroke="#f1cfb4" stroke-width="12" stroke-linecap="round"/><circle cx="222" cy="326" r="14" fill="#f1cfb4" class="pt"/></g>
  <path d="M104 226q46-14 92 0l8 60H96z" fill="#fff" class="pt"/><path d="M100 246h100M98 262h104M96 278h108" stroke="#ff7ac8" stroke-width="7"/>
  <path d="M112 262h76l12 80H100z" fill="#ff5fa8" class="pt"/>
  <path d="M118 230l4 36M182 230l-4 36" stroke="#ff5fa8" stroke-width="12"/><path d="M118 230l4 36M182 230l-4 36" stroke="#2a1a12" stroke-width="3" fill="none"/>
  <rect x="134" y="282" width="32" height="24" rx="4" fill="#ff2e8f" stroke="#2a1a12" stroke-width="3"/>
  <circle cx="122" cy="266" r="5" fill="#ffd23f" stroke="#2a1a12" stroke-width="2"/><circle cx="178" cy="266" r="5" fill="#ffd23f" stroke="#2a1a12" stroke-width="2"/>
  <rect x="136" y="206" width="28" height="26" fill="#f6dcc5"/>
  <g class="cabeca" style="transform-origin:150px 232px">
  <path d="M52 128q0-96 98-96t98 96q0 60-30 86-28 24-68 24t-68-24q-30-26-30-86z" fill="#f6dcc5" class="pt"/>
  <g fill="#e6b85a" stroke="#2a1a12" stroke-width="5" stroke-linejoin="round"><path d="M56 140q-6-78 60-100 36-12 68 0 66 22 60 100-10-26-30-26-10-32-40-20-18-26-42-6-20-16-40 2-18 4-24 24-10 2-12 26z"/><circle cx="72" cy="104" r="22"/><circle cx="228" cy="104" r="22"/><circle cx="106" cy="66" r="24"/><circle cx="194" cy="66" r="24"/><circle cx="150" cy="52" r="24"/></g>
  <g fill="#e6b85a"><path d="M56 140q-6-78 60-100 36-12 68 0 66 22 60 100-10-26-30-26-10-32-40-20-18-26-42-6-20-16-40 2-18 4-24 24-10 2-12 26z"/><circle cx="72" cy="104" r="22"/><circle cx="228" cy="104" r="22"/><circle cx="106" cy="66" r="24"/><circle cx="194" cy="66" r="24"/><circle cx="150" cy="52" r="24"/></g>
  <g transform="translate(218 78)"><g fill="#d1203a" stroke="#2a1a12" stroke-width="2"><circle cx="0" cy="-12" r="8"/><circle cx="11" cy="-4" r="8"/><circle cx="7" cy="9" r="8"/><circle cx="-7" cy="9" r="8"/><circle cx="-11" cy="-4" r="8"/></g><circle r="6" fill="#ffd23f" stroke="#2a1a12" stroke-width="2"/><circle cx="20" cy="-14" r="3" fill="#fff"/><circle cx="-20" cy="12" r="3" fill="#fff"/></g>
  <g class="olhos" style="transform-origin:150px 160px"><circle cx="116" cy="160" r="30" fill="#fff" class="pt"/><circle cx="184" cy="160" r="30" fill="#fff" class="pt"/>
    <g class="pupilas"><circle cx="122" cy="166" r="14" fill="#6a8fb5"/><circle cx="178" cy="166" r="14" fill="#6a8fb5"/><circle cx="122" cy="166" r="6" fill="#1a1a2a"/><circle cx="178" cy="166" r="6" fill="#1a1a2a"/><circle cx="127" cy="159" r="4" fill="#fff"/><circle cx="183" cy="159" r="4" fill="#fff"/></g>
    <path d="M86 140l-12-8M214 140l12-8" class="pt" fill="none" stroke-width="4"/>
    <path class="palpebra" d="M86 160a30 30 0 0 1 60 0z" fill="#f6dcc5" stroke="#2a1a12" stroke-width="5" style="transform-origin:116px 130px"/><path class="palpebra" d="M154 160a30 30 0 0 1 60 0z" fill="#f6dcc5" stroke="#2a1a12" stroke-width="5" style="transform-origin:184px 130px"/></g>
  <path class="sobrancelhas" d="M94 124q22-10 44-2M162 122q22-8 44 2" fill="none" stroke="#2a1a12" stroke-width="5" stroke-linecap="round"/>
  <path d="M150 180q-8 12 0 20" fill="none" class="pt"/>
  <g class="boca sorriso"><path d="M116 212q34 26 68 0" fill="none" class="pt"/></g>
  <g class="boca espanto"><ellipse cx="150" cy="218" rx="14" ry="18" fill="#5a1e24" class="pt"/></g>
  <circle cx="88" cy="196" r="10" fill="#f29aa0" opacity=".6"/><circle cx="212" cy="196" r="10" fill="#f29aa0" opacity=".6"/>
  </g>`;
  window.PERSONAGENS = { kaio: KAIO, nanda: NANDA };
  window.montarPersonagem = function (el, nome) {
    el.setAttribute('viewBox', '0 0 300 420');
    el.dataset.personagem = nome;
    el.innerHTML = PERSONAGENS[nome];
    el.style.setProperty('--atraso', (Math.random() * 4).toFixed(2) + 's');
  };
})();
