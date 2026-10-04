# Chá Revelação · Nanda & Kaio — estudo visual (versão 2)

Estudo feito antes de construir o site. As telas estão em `imagens/`
(renderizadas a partir dos mockups em `telas/`). Nada aqui é o site final:
é a proposta para aprovação. A primeira versão ficou guardada em `v1/`.

## 1. O que mudou da versão 1 para a 2

- O estilo segue a proposta de referência que o Kaio trouxe (em
  `referencias/proposta-chatgpt.webp`): **pôster de locadora dos anos 90,
  visto numa TV de tubo**. Pôr do sol synthwave, tudo emoldurado por uma
  tela de tubo com os três pontinhos, etiquetas de fita crepe, bilhetes de
  papel, rabiscos de giz de cera, lousa com X e O.
- O **Irmão do Jorel entra como atmosfera**, não como traço: roteiro,
  problemas de criança dos anos 90, dinâmica de família, humor.
- **Os personagens são o Kaio e a Nanda crianças**, feitos a partir das
  fotos (que não entram no site): ele de cabelo preto cacheado, olhos
  grandes escuros e camiseta do Piu-Piu; ela de cabelo castanho-claro
  ondulado, olhos claros, a florzinha da coroa de daminha e jardineira rosa.
- **Tudo é feito aqui, em código** (HTML, CSS e SVG), sem imagem gerada
  fora, sem fonte ou script de terceiros em tempo de execução. Mesma regra
  do getsessionflow.app.
- "Seremos pais na adolescência (30 anos depois)" continua como a piada
  central, no bilhete da capa e no resultado.

## 2. O conceito em uma frase

**"Pôster de locadora dos anos 90, visto numa TV de tubo."**

Toda tela é uma TV. Dentro dela: a capa é o pôster do filme (Jurassic Park,
E.T. na lua, Vader, DeLorean, Matrix, Game Boy, fita cassete); o bastidor da
guardiã é uma tela de chuvisco com polaroids e etiquetas; o play é uma fita
VHS com o botão neon; a abertura corre como trailer; o jogo é uma lousa de
escola; o resultado é o pôster outra vez, na cor do bebê, com fogos.

## 3. Pesquisa: de onde vêm as referências

### Irmão do Jorel (atmosfera)

- Criado por Juliano Enrico, produzido pelo Copa Studio para o Cartoon
  Network. O criador diz que as histórias nasceram da memória de fotos de
  família e de filmes da Sessão da Tarde: uma releitura dos anos 80 e 90,
  com Cavaleiros do Zodíaco, Steven Seagal, fliperama, praia em família,
  avós dentro de casa.
- É isso que o site puxa: a sensação de "problema de criança" tratado como
  épico (o letreiro Star Wars conta a infância dos dois como saga), a casa
  cheia, a TV de tubo ligada à tarde.

### Anos 90 e 2000, de vocês

- **Infância (anos 90):** VHS, Sessão da Tarde, fliperama de shopping,
  parque itinerante, banana boat, Dragon Ball, Jurassic Park, De Volta para
  o Futuro, E.T., Star Wars, Matrix, Duro de Matar com o pai, Game Boy,
  fita cassete, pizza e dinossauro de borracha.
- **Adolescência da Nanda (anos 2000):** emo. Entra no letreiro ("pintar a
  franja de preto e cantar emo no chuveiro"), não no visual da personagem
  criança.
- **Adolescência do Kaio:** Engenheiros do Hawaii e MPB. No letreiro, como
  piada.
- **Guarujá:** mar, coqueiro, pôr do sol de cartaz. **SJC e a família
  grande:** "família que não cabe na foto".
- Quintal, ipê, amoreira e jenipapo: no texto do letreiro.
- Espiritualidade fica fora de propósito: é festa, o tom é comédia.

### Jogos de chá revelação que existem

Raspadinha, balão com dardo e jogo da velha de verdade com peças azuis e
rosa. O jogo da velha "de verdade" tem um problema: quem joga decide o
resultado. A solução está na seção 5.

## 4. Personagens

Kaio e Nanda crianças, desenhados em SVG para o site (`telas/kaio.svg`,
`telas/nanda.svg`), a partir das fotos de infância:

| | Kaio | Nanda |
|---|---|---|
| Cabelo | preto, cacheado | castanho-claro, ondulado |
| Olhos | grandes, castanhos escuros | claros (azul-acinzentado) |
| Detalhe | camiseta branca com o Piu-Piu, short vermelho, tênis azul | florzinha vermelha no cabelo (a coroa da foto), jardineira rosa sobre camiseta listrada, tênis rosa |

Por serem SVG, eles animam no site: piscar, balançar, pular no resultado,
e aparecem de costas na última cena da abertura. As cores de cada um
(azul e rosa) são as cores dos lados do jogo.

## 5. O jogo: jogo da velha na lousa

**Para quem vê:** uma lousa com um tabuleiro 4×4 desenhado a giz. Vocês
revezam clicando numa casa. A cada clique, o giz desenha um **X azul
(menino)** ou um **O rosa (menina)**. Três iguais em linha, reta ou
diagonal, revelam o bebê.

**Por dentro:** o site sabe a resposta. O que sai em cada casa não é
sorteado antes; é decidido no clique, seguindo regras:

1. O lado "perdedor" nunca completa três em linha.
2. O lado perdedor pode, e deve, chegar a dois em linha, para dar susto.
3. O lado vencedor só fecha a linha a partir da 7ª jogada, e no máximo na
   11ª. Antes disso, se um clique fosse fechar a linha, sai o outro
   símbolo.
4. Se na casa clicada nenhum lado for "seguro", o site escolhe o que mantém
   o jogo vivo. No 4×4 com três em linha isso é sempre possível.

Resultado: de 7 a 11 jogadas (1 a 2 minutos), vocês dois clicam de verdade,
ninguém consegue "errar" e o final tem tensão.

**Por que 4×4 com três em linha:** no 3×3 acaba em 3 a 5 jogadas, rápido
demais para uma plateia. No 5×5 com quatro em linha passa de 15 e esfria.
Descartei o jogo da velha clássico entre vocês (não garante o resultado) e
o tabuleiro pré-sorteado (com ordem livre de cliques, o perdedor pode
fechar uma linha). Se preferirem o visual 3×3 da referência, dá para manter
o 3×3 e trocar a regra para "melhor de três rodadas"; fica mais longo e
menos limpo, por isso não é a minha recomendação.

## 6. O fluxo, tela a tela

| # | Tela | Quem vê | O que acontece |
|---|---|---|---|
| 1 | **Capa** | Quem abre o site | Pôster: pôr do sol, lua com a bicicleta do E.T., Vader, selo "Parque dos Bebês", DeLorean, Game Boy, fita cassete, "MATRIX", "EPISÓDIO I". Título "CHÁ REVELAÇÃO · Nanda e KAIO". Bilhete "Seremos pais na adolescência (30 anos depois)". Botão neon "Começar". |
| 2 | **Seletor** | Só a guardiã do segredo | Tela de chuvisco. Etiqueta "QUAL É O RESULTADO?". Duas polaroids (menino azul, menina rosa) com os personagens, bolinha de escolha, botão "Confirmar" (cinza até escolher). |
| 3 | **Confirmação** | Só a guardiã | "CONFIRMAR RESULTADO? Você escolheu:" com a polaroid escolhida, botão vermelho "Confirmar" e "voltar e trocar". |
| 4 | **Play** | Todo mundo (pode ligar o projetor) | "TÁ TUDO PRONTO!" Fita VHS com o play neon, pizza, slinky, Game Boy, TV velha, dinossauro de borracha. Idêntica para os dois resultados. Play no botão ou na tecla espaço. |
| 5 | **Abertura** (~70 s) | Todo mundo | 6 cenas: a fita entra → letreiro Star Wars com a história de vocês → painel do DeLorean (destino 2026, presente 1989, última partida 1993) → título "Parque dos Bebês" → Matrix (pílula azul ou rosa) → os dois de costas olhando o mar, "uma nova aventura está prestes a começar…". Um clique pula. |
| 6 | **Jogo** | Todo mundo | Lousa, "VAMOS JOGAR?", "três em linha para descobrir nosso maior presente!", tabuleiro de giz, os dois personagens torcendo, "vez da Nanda / vez do Kaio" em giz amarelo, "quase! falta um…" quando esquenta. |
| 7 | **Resultado** | Todo mundo | Pôster na cor do bebê, "É MENINA!" ou "É MENINO!" em neon, fogos, o personagem no centro, bilhete "Nanda & Kaio, pais na adolescência (30 anos depois)", "◼ STOP · FIM" de videocassete. |

**Segurança do segredo**

- A escolha é gravada no navegador (localStorage) de forma ofuscada e some
  da interface. Não existe "voltar" depois de confirmar.
- A tela de play e toda a abertura são iguais para os dois resultados.
- Reset só com gesto escondido: segurar o título por 5 segundos, ou um
  endereço especial (`?reiniciar`). Útil se alguém confirmar errado.
- **Modo ensaio** (`?ensaio`): roda o fluxo inteiro com resultado sorteado e
  a palavra ENSAIO no canto, para testar com o projetor antes da festa sem
  gastar o segredo.
- Depois de carregar uma vez, a página não precisa de internet: fontes,
  desenhos e jogo são do próprio site. Bom para salão com wifi ruim.

## 7. Direção de arte

**Paleta** (ver `imagens/00-identidade.png`): noite #0b0820, roxo #4a1d7a,
magenta neon #ff3d9a, laranja de pôr do sol #ff7a2e, amarelo #ffd23f, verde
Matrix #39ff6a, chuvisco da TV #cfcdc5, lousa #1c2823, fita crepe #f3d66b,
papel #f6efdd. Menino #3d8bff, menina #ff4fa3. Nanda em rosa, Kaio em
amarelo (como na referência), e o título em branco com sombra magenta.

**Tipografia** (Google Fonts com licença livre, servidas pelo próprio site):
Bungee para o pôster (título e KAIO), Shrikhand para NANDA (letra
"derretida"), Special Elite para etiquetas e textos (máquina de escrever),
Permanent Marker para a lousa (giz), VT323 para o videocassete, Press Start
2P para detalhes de fliperama, Nunito para o letreiro.

**Objetos dos anos 90, todos em SVG** (`telas/props.js`): T-Rex, capacete do
Vader, bicicleta do E.T., lua, coqueiro, DeLorean, Game Boy, fita cassete,
fita VHS, TV velha, gato, pizza, slinky, florzinha, rabiscos (coração,
estrela, carinha, raio, brilho), X e O de giz, selo do parque.

**Texturas:** chuvisco de TV (ruído), scanlines e vinheta do tubo em todas
as telas, grão de lousa, fita crepe com bordas rasgadas, papel de bilhete
com fita adesiva.

**Movimento (no site final):** chuvisco e scanlines sempre vivos, bem
sutis; na capa, estrelas piscando, a bicicleta cruzando a lua, o DeLorean
com rastro de fogo; o play neon pulsando; glitch de VHS nas transições da
abertura; letreiro subindo; chuva de código no Matrix; na lousa, o X ou O
sendo riscado a giz com som de giz; no resultado, fogos estourando e o
personagem pulando.

**Projeção:** tudo em 1920×1080, texto grande, contraste alto. A capa, a
abertura e o resultado são escuros de propósito (cinema); as telas de
bastidor e o play são claros (chuvisco). O jogo é lousa escura com giz
claro, que projeta bem. O layout escala com a largura da tela.

**Som (a decidir):** efeitos (videocassete, giz, trovão, fogos), sempre
disparados por clique, como o navegador exige. Sem música licenciada.
Liga e desliga na tela de play.

## 8. Como o site vai ser construído

Igual ao getsessionflow.app em espírito: **site estático**, sem framework,
sem build, sem nada de fora, tudo feito aqui.

- Um `index.html`, um `site.css`, um `site.js`, os SVGs (personagens e
  objetos), as fontes em `/assets/fontes` e um favicon. A troca de telas
  acontece na mesma página, sem recarregar. Os mockups em `telas/` já são a
  base do código.
- Publicado pelo **GitHub Pages** a partir da branch principal do
  repositório `dinizkaio/cha_revelacao`, com `.nojekyll`. Endereço padrão:
  `dinizkaio.github.io/cha_revelacao`. Domínio próprio é só um `CNAME` e o
  DNS no Namecheap.
- `README.md` explicando como testar (modo ensaio), como resetar e como
  publicar.
- Sem analytics, sem cookies, sem serviço de terceiros.

## 9. O que preciso que vocês aprovem ou decidam

1. **Direção de arte v2**: pôster de locadora na TV de tubo.
2. **Personagens**: Kaio e Nanda crianças, como estão. Algum detalhe para
   mudar (roupa, cabelo, a florzinha)?
3. **Jogo**: 4×4 com três em linha na lousa, "o site sabe a resposta".
4. **Abertura**: as seis cenas e a ordem. O texto do letreiro pode ser
   reescrito por vocês.
5. **Tagline**: "Seremos pais na adolescência (30 anos depois)".
6. **Som**: com efeitos (ligável) ou mudo.
7. **Onde a guardiã escolhe**: no mesmo notebook que projeta (fluxo dos
   mockups) ou no celular dela. No celular o site precisaria de um código
   de 4 dígitos para passar o segredo ao notebook; dá para fazer, mas é mais
   uma peça para dar errado. Recomendo o mesmo aparelho.
8. **Data no bilhete do resultado**: está "outubro de 2026"; confirmar.

## 10. Fontes consultadas

- [Irmão do Jorel — Wikipédia](https://pt.wikipedia.org/wiki/Irm%C3%A3o_do_Jorel)
- [Jorel's Brother — Wikipedia (EN)](https://en.wikipedia.org/wiki/Jorel%27s_Brother)
- [Desenhos infantis antigos e suas referências — site oficial](https://irmaodojorel.com.br/desenhos-infantis-antigos-e-suas-referencias/)
- [Perifacon 2024: 10 anos de Irmão do Jorel](https://portalperifacon.com/perifacon-2024-painel-cartoon-network-e-copa-studio-apresentam-10-anos-de-irmao-do-jorel/)
- [Irmão do Jorel: a série que prova que a animação brasileira é de outro nível — blog do Mercado Livre](https://www.mercadolivre.com.br/blog/mplay-comedias-animadas-malucas-irmao-do-jorel)
- [42 Gender Reveal Games — WebBabyShower](https://webbabyshower.com/guides/gender-reveal-games/)

## 11. Arquivos deste estudo

- `imagens/*.png`: as telas, em 1920×1080 (e 390×844 a de celular).
- `telas/*.html`: os mockups em HTML/CSS que geraram as imagens;
  `kaio.svg`, `nanda.svg` e `props.js` (objetos) são reaproveitados no site.
- `fontes/`: as fontes baixadas do Google Fonts.
- `referencias/`: a proposta de referência.
- `render.js`: gera as imagens (`node render.js`).
- `v1/`: a primeira versão do estudo, descartada.
