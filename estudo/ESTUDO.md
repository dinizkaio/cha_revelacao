# Chá Revelação · Nanda & Caio — estudo visual

Estudo feito antes de construir o site. As telas estão em `imagens/`
(renderizadas a partir dos mockups em `telas/`). Nada aqui é o site final:
é a proposta para aprovação.

## 1. O conceito em uma frase

**"Sessão da Tarde num quintal de terra."**

Um filme de tarde de domingo, visto numa TV de tubo, com o quintal da casa da
avó do lado de fora: ipê amarelo soltando flor, chinelo de dedo, Tazo no
bolso. O humor e o traço vêm do Irmão do Jorel; a nostalgia vem de vocês dois.

O site é, na prática, uma **fita VHS**: alguém "grava" o segredo (a
guardiã escolhe o sexo), a fita entra na máquina (tela de play, neutra) e, no
play, roda uma abertura de cinema dos anos 90 que desemboca no jogo. O jogo
termina com um "FIM" de Sessão da Tarde.

## 2. Pesquisa: de onde vêm as referências

### Irmão do Jorel (a espinha dorsal)

- Criado por Juliano Enrico, produzido pelo Copa Studio para o Cartoon
  Network (vencedor do pitching de 2009). Direção de arte de Allan Matias.
- O criador diz que as histórias nasceram "da memória de fotos, eventos de
  família, desenhos e filmes da Sessão da Tarde", uma releitura do que ele via
  nos anos 80. A série é cheia de referências aos anos 80 e 90: Cavaleiros do
  Zodíaco, Steven Seagal, fliperama, brincadeiras de rua, praia em família.
- Visual: **cabeça enorme, olhos redondos gigantes, nariz e boca
  interligados, traço grosso, cores chapadas e quentes**. O Irmão do Jorel usa
  regata preta, short vermelho e galochas amarelas; a Lara tem cabelo preto
  curto e bagunçado, sardas, uniforme branco com mangas azuis, saia verde e
  **galochas magenta**.
- Da 2ª temporada em diante o desenho ficou mais limpo e a paleta mais
  variada. É esse "limpo mas texturizado" que o site segue.

### Anos 90 e 2000 (a infância de vocês, e a adolescência dela)

- Infância (anos 90): VHS e videocassete, Sessão da Tarde, Tazos (1997),
  fliperama de shopping, parque itinerante, banana boat, Dragon Ball, Jurassic
  Park (1993), Matrix (1999), Duro de Matar na TV com o pai, Star Wars.
- Adolescência da Nanda (anos 2000): emo. Franja de lado, listra preta com
  rosa, galocha. Isso virou o visual da personagem menina.
- Adolescência do Caio: Engenheiros do Hawaii e MPB. Entra no letreiro da
  abertura, como piada ("ela também, mas não conta pra ninguém").
- Caiçara (Guarujá): chinelo de dedo, mar, coqueiro, pôr do sol de cartaz.
- Quintal (sua infância): ipê amarelo (vira o confete do site), amoreira
  (vira a cor "amora" da paleta), jenipapo (verde da paleta).
- Família grande (SJC): o "família que não cabe na foto" do letreiro.
- Escola pública, pais trabalhando, avós por perto: no letreiro também.
- Espiritualidade: fica fora do site de propósito. É uma festa; o tom é
  comédia.

### Jogos de chá revelação que existem

Os mais comuns são raspadinha, balão com dardo e jogo da velha de verdade
(peças azuis e rosa). O jogo da velha "de verdade" tem um problema: quem joga
decide o resultado, então não dá para garantir que o lado certo ganha. A
solução está na seção 4.

## 3. Personagens: três opções

| Opção | O que é | Prós | Contras |
|---|---|---|---|
| **A. Originais no espírito do Irmão do Jorel** (recomendada; é o que está nos mockups) | Dois personagens desenhados em SVG para o site: menino de camiseta laranja, chinelo e Tazo; menina emo de listras, galocha rosa e sardas. | Sem risco de direito de imagem; animam (piscar, pular, acenar); viram os ícones dos Tazos; carregam as referências de vocês. | Não são "os" personagens; quem é fã reconhece o estilo, não o rosto. |
| B. Irmão do Jorel e Lara, oficiais | Usar imagens da série. | Reconhecimento imediato. | Preciso que você me mande os PNGs (o acesso daqui a wiki/fandom é bloqueado); imagens fixas não animam; uso só privado, como você disse. |
| C. Híbrido | Originais (A) com easter eggs da série: um pato de óculos escuros (Gesonel) na tela de play, "Cuecas em Chamas" no rádio da abertura. | O melhor dos dois. | Nenhum, se o humor for esse. |

Recomendo **A** (ou **C**). Se quiser, os dois podem ter nome ("Caiozinho" e
"Nandinha", como vocês crianças) ou ficar como "Menino" e "Menina".

## 4. O jogo: jogo da velha de Tazos

**Como funciona para quem vê:** um tabuleiro 4×4 de Tazos virados para baixo.
Vocês revezam: um vira um Tazo, depois o outro. Cada Tazo virado mostra o
menino (azul) ou a menina (rosa). **Três iguais em linha** (reta ou diagonal)
revelam o bebê.

**Como funciona por dentro:** o site sabe a resposta. O lado de cada Tazo
**não é sorteado antes**: é decidido no momento do clique, seguindo regras:

1. O lado "perdedor" nunca completa três em linha.
2. O lado perdedor pode (e deve) chegar a dois em linha, para dar susto.
3. O lado vencedor só fecha a linha a partir do 7º Tazo virado, e no máximo
   no 11º. Antes disso, se um clique fosse fechar a linha, o Tazo vira do
   outro lado.
4. Se na posição clicada nenhum dos lados for "seguro", o site escolhe o lado
   que mantém o jogo vivo; é matematicamente garantido no 4×4 com três em
   linha, porque sempre sobram linhas livres.

Resultado: dura entre 7 e 11 viradas (1 a 2 minutos), vocês dois clicam de
verdade, ninguém consegue "errar", e o final tem tensão.

**Por que 4×4 e três em linha, e não 3×3:** no 3×3 o jogo acaba em 3 a 5
viradas, rápido demais para uma plateia. No 5×5 com quatro em linha passa
de 15 viradas e esfria. O 4×4 com três em linha é o meio do caminho.

**Alternativas que descartei:** jogo da velha clássico X e O entre vocês dois
(não dá para garantir o resultado) e tabuleiro pré-sorteado (se a ordem dos
cliques for livre, não dá para garantir que o perdedor não feche uma linha).

## 5. O fluxo, tela a tela

| # | Tela | Quem vê | O que acontece |
|---|---|---|---|
| 01 | **Capa** | Quem abre o site | Cartaz de VHS: "Sessão da Tarde apresenta Chá Revelação · Nanda & Caio", tagline "Seremos pais na adolescência". Botão Começar. |
| 02 | **Seletor** | Só a guardiã do segredo | Fundo escuro de bastidor. Duas cartas grandes: Menino / Menina. Confirmar. |
| 03 | **Tem certeza?** | Só a guardiã | Mostra a escolha e avisa que ela some. "Confirmar e trancar". |
| 04 | **Fita na máquina** | Todo mundo (pode ligar o projetor) | Tela idêntica para os dois resultados. Fita VHS, "Segredo trancado", botão PLAY. Espaço também dá play. |
| 05 | **Abertura** (~60 s) | Todo mundo | 6 cenas: VHS entra → Sessão da Tarde apresenta → letreiro Star Wars com a história de vocês → título Jurassic Park → Matrix (pílula azul ou rosa) → fliperama "READY? JOGA!". Um clique pula para o jogo. |
| 06 | **Jogo** | Todo mundo | Tabuleiro de Tazos entre os dois personagens; "Vez de: Nanda/Caio" no placar de fliperama; "2 em linha!" quando esquenta. |
| 07 | **Resultado** | Todo mundo | Tela inteira na cor do bebê, "É MENINA!/É MENINO!", personagem pulando, chuva de flores de ipê e confete, placar "FLAWLESS VICTORY", "◼ STOP · FIM". |

**Segurança do segredo**

- A escolha é gravada no navegador (localStorage) de forma ofuscada e some
  da interface. Não existe botão "voltar" depois de trancar.
- A tela 04 e toda a abertura são iguais para os dois resultados.
- Reset só com gesto escondido: segurar o título por 5 segundos (ou
  `?reiniciar` na URL). Útil se alguém confirmar errado.
- **Modo ensaio** (`?ensaio`): roda o fluxo inteiro com um resultado sorteado
  e a palavra ENSAIO no canto, para você testar com o projetor antes da
  festa sem "gastar" o segredo.
- Depois de carregar uma vez, a página não precisa de internet: fontes,
  imagens e o jogo são do próprio site (igual ao getsessionflow.app). Bom para
  salão de festa com wifi ruim.

## 6. Direção de arte

**Paleta** (ver `imagens/00-identidade.png`): papel #f7e9c9, ipê amarelo
#ffc233, laranja Sessão da Tarde #f0632b, mar do Guarujá #1f9aa6, amora
#6b2d5c, tinta #2b1d14, noite #0c1024. Menino azul #2f6fd1 ("azul piscina de
plástico"), menina rosa #ec4b8b ("rosa galocha"). Os nomes seguem a mesma
regra: Nanda em rosa, Caio em azul.

**Tipografia** (todas Google Fonts com licença livre, servidas do próprio site):
Bowlby One SC para o título (o momento Jurassic Park), Luckiest Guy para
nomes e botões (letra de desenho animado), Nunito para texto (legível de
longe), Press Start 2P para o placar (fliperama) e VT323 para o videocassete.

**Texturas:** grão de papel sobre tudo, meio-tom de gibi, scanlines nas cenas
de TV, azulejo de quintal na mesa do jogo.

**Movimento (no site final):** flores de ipê caindo devagar na capa e no
resultado; Tazo girando em 3D ao virar; glitch de VHS nas transições da
abertura; personagens piscam e balançam; no resultado, o personagem pula e o
outro aplaude.

**Projeção:** tudo foi desenhado em 1920×1080 (16:9). Texto grande, contraste
alto, fundo claro na maior parte das telas (projetor em sala iluminada
sofre com fundo escuro). As cenas escuras da abertura são curtas. O layout
escala por `vw`, então funciona no notebook, na TV e no projetor.

**Som (a decidir):** o site pode ter efeitos (videocassete, "virada" de
Tazo, trovão do Jurassic, fanfarra no final), sempre disparados por clique,
que é o que o navegador exige. Sem música licenciada: só efeitos sintetizados
ou sons livres. Pode ser ligado/desligado na tela de play.

## 7. Como o site vai ser construído

Igual ao getsessionflow.app em espírito: **site estático**, sem framework,
sem build, sem nada de fora.

- Um `index.html`, um `site.css`, um `site.js`, os dois SVGs dos personagens,
  as fontes em `/assets/fontes` e um favicon. O estado (tela atual, escolha,
  tabuleiro) fica em JavaScript puro, no mesmo documento: a troca de telas
  não recarrega a página.
- Publicado pelo **GitHub Pages** a partir da branch `main` do repositório
  `dinizkaio/cha_revelacao` (`.nojekyll`, como no outro site). Endereço
  padrão: `dinizkaio.github.io/cha_revelacao`. Se quiser um domínio próprio,
  é só um arquivo `CNAME` e o DNS no Namecheap, como no Session Flow.
- `README.md` explicando como testar (`?ensaio`), como resetar e como
  publicar.
- Sem analytics, sem cookies, sem serviço de terceiros.

## 8. O que preciso que você aprove ou decida

1. **Conceito e direção de arte**: "Sessão da Tarde num quintal de terra".
2. **Personagens**: opção A (originais), B (oficiais, você manda as
   imagens) ou C (originais + easter eggs).
3. **Jogo**: 4×4 com três em linha, "o site sabe a resposta". Ou prefere
   outro tamanho?
4. **Abertura**: as 6 cenas e a ordem. Algum filme a mais ou a menos? O texto
   do letreiro (está nos mockups) pode ser reescrito por vocês.
5. **Tagline**: "Seremos pais na adolescência" + "(ela, 33 · ele, 37)". As
   idades estão certas para a data da festa?
6. **Som**: com efeitos (ligável) ou mudo.
7. **Onde a guardiã escolhe**: no mesmo notebook que vai projetar (fluxo dos
   mockups) ou no celular dela? No celular, o site precisaria de um código de
   4 dígitos para passar o segredo ao notebook; dá para fazer, mas é mais uma
   peça para dar errado na festa. Recomendo o mesmo aparelho.
8. **Nomes dos personagens**: "Menino/Menina" ou apelidos.

## 9. Fontes consultadas

- [Irmão do Jorel — Wikipédia](https://pt.wikipedia.org/wiki/Irm%C3%A3o_do_Jorel)
- [Jorel's Brother — Wikipedia (EN)](https://en.wikipedia.org/wiki/Jorel%27s_Brother)
- [Lara — Irmão do Jorel Wiki (Fandom)](https://irmaodojorel.fandom.com/pt-br/wiki/Lara)
- [Irmão do Jorel (personagem) — Fandom](https://irmaodojorel.fandom.com/pt-br/wiki/Irm%C3%A3o_do_Jorel)
- [Você conhece os personagens do Irmão do Jorel? — site oficial](https://irmaodojorel.com.br/personagens-irmao-do-jorel-conheca/)
- [Desenhos infantis antigos e suas referências — site oficial](https://irmaodojorel.com.br/desenhos-infantis-antigos-e-suas-referencias/)
- [Perifacon 2024: 10 anos de Irmão do Jorel (Cartoon Network e Copa Studio)](https://portalperifacon.com/perifacon-2024-painel-cartoon-network-e-copa-studio-apresentam-10-anos-de-irmao-do-jorel/)
- [Relatório "Animação brasileira: Irmão do Jorel" — UFV](https://literaturaemidia.ufv.br/wp-content/uploads/2020/08/Relat%C3%B3rio-Anima%C3%A7%C3%A3o-Brasileira-Irm%C3%A3o-do-Jorel.pdf)
- [Irmão do Jorel: a série que prova que a animação brasileira é de outro nível — Mercado Livre blog](https://www.mercadolivre.com.br/blog/mplay-comedias-animadas-malucas-irmao-do-jorel)
- [42 Gender Reveal Games — WebBabyShower](https://webbabyshower.com/guides/gender-reveal-games/)
- [Gender reveal tic-tac-toe ideas — TikTok](https://www.tiktok.com/discover/gender-reveal-ideas-tic-tac-toe-tutorial)

## 10. Arquivos deste estudo

- `imagens/*.png`: as telas, em 1920×1080 (e 390×844 as de celular).
- `telas/*.html`: os mockups em HTML/CSS que geraram as imagens, com os dois
  personagens em `menino.svg` e `menina.svg`. Já são uma base para o site.
- `fontes/`: as fontes baixadas do Google Fonts (serão reaproveitadas).
- `render.js`: gera as imagens (`node render.js`).
