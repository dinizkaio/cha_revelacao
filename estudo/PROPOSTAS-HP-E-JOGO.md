# Propostas · painel Harry Potter e jogos alternativos

Dois estudos pedidos na revisão de 5 de outubro: o que fazer com a cena de
Harry Potter na abertura, e que jogo poderia substituir o jogo da velha.

## 1. O painel Harry Potter

Hoje a cena é uma carta só, e dura demais para o que mostra. Harry Potter
tem material para muito mais. A cena tem entre 14 e 24 segundos na música
da sequência (pode roubar tempo da praia, que hoje tem 24).

### Proposta A · Plataforma 9¾ e o Expresso (recomendada)

Três batidas em cerca de 20 segundos:

1. **A plataforma (0 a 6 s).** Parede de tijolos vermelhos ocupando a tela,
   a placa "Plataforma 9¾", um carrinho de bagagem com uma mala, a gaiola
   da coruja e o bebê dinossauro sentado em cima. Kaio e Nanda crianças
   correm de mãos dadas contra a parede, a tela "atravessa" os tijolos num
   flash branco.
2. **O Expresso (6 a 13 s).** Do outro lado, a locomotiva vermelha entra
   soltando vapor, com "EXPRESSO DE HOGWARTS" na lateral e o letreiro da
   frente dizendo "DESTINO: 2027". Pela janela de um vagão aparecem os
   dois, com a coruja no parapeito. O apito da locomotiva vira a transição.
3. **A carta, encurtada (13 a 20 s).** A coruja solta o envelope na janela e
   ele abre num quadro curto, só o essencial: "Vaga reservada para o ano
   letivo de 2038. P.S.: não, isso não decide o nome." O lacre pula.

Referências: plataforma, carrinho, coruja, Expresso, carta, lacre, mais o
pomo que já está na capa e o Chapéu Seletor da guardiã.

### Proposta B · O Espelho de Ojesed

Uma sala escura de pedra, velas flutuando no alto (as do Salão Principal),
e o Espelho de Ojesed no centro, com a moldura dourada e a inscrição ao
contrário. Kaio e Nanda crianças param na frente dele. No reflexo, aparecem
os dois adultos (silhueta) com um berço entre eles, e sobre o berço um "?"
brilhando. Texto: "O Espelho mostra o desejo mais profundo do coração.
Não mostra o nome." Depois, "Lumos" e a sala acende, cortando para a praia.

Mais poético, menos agitado. Funciona bem com a música da Hedwig.

### Proposta C · Aula de Adivinhação

A professora Trelawney (só a bola de cristal e os óculos enormes). A bola
de cristal mostra formas que não se definem: rosa, azul, rosa, azul, um "?".
Texto: "A professora Trelawney previu: será menino. Depois, que será
menina. Depois pediu mais chá." Ligado ao tema "chá". Curto, cômico, 10 s.

### Proposta D · Painel combinado (A + um toque de B)

A proposta A inteira, e no último quadro, em vez da carta, a janela do trem
vira o Espelho de Ojesed por 5 s com o berço e o "?". Mais denso. Só vale
se a cena puder ter 24 s (tirando 10 da praia, que fica com 14).

**Minha recomendação:** A. É a mais reconhecível no telão, tem movimento
(correr, atravessar, trem chegando), e a carta vira uma piada rápida em vez
de um texto para ler. Se quiser o lado emotivo, D.

## 2. Jogos alternativos ao jogo da velha

O que o jogo precisa ter: ser conduzido pela plateia com cliques; o site
decidir o resultado sem ninguém perceber; manter o mistério até a última
jogada; ser legível num telão a 10 metros; ser implementável em um ou dois
dias no mesmo padrão do site (HTML, CSS, SVG, JS).

| # | Jogo | Como funciona | Mistério até o fim? | Esforço | Leitura no telão |
|---|---|---|---|---|---|
| 1 | **Ovos de dinossauro** | 11 ovos numa grama de Parque dos Bebês. Cada clique choca um ovo: sai um bebê dinossauro azul ou rosa. Maioria vence. O site mantém o placar empatado ou com um de diferença até o último ovo. | **Garantido** por construção: o último ovo sempre decide. | Baixo | Excelente: dois placares grandes, contagem a olho |
| 2 | **Corrida de photo finish** | Dois carrinhos (um azul, um rosa, ou o DeLorean e a Ecto-1) numa pista. Cada clique avança um deles um tanto aleatório. O site embaralha de modo que cheguem juntos e o vencedor passe por uma roda. | **Garantido**: photo finish sempre. | Baixo | Excelente, e tem animação contínua |
| 3 | **Raspadinha** | Um bilhete de loteria dos anos 90 com 9 casas. A plateia raspa (arrasta o mouse) e cada casa mostra X ou O. Três iguais ganham. Site decide cada casa. | Alto, mesmo princípio do jogo da velha mas em grade menor | Médio (canvas de raspar) | Boa, textura divertida |
| 4 | **Jogo da velha 4×4 (atual)** | Quatro em linha numa lousa. | Alto após o ajuste (ver seção 3), mas não garantido em toda ordem de cliques | Já existe | Boa |
| 5 | **Plinko / pachinko** | Uma bolinha cai por pinos e para numa caneca azul ou rosa. Várias bolinhas; maioria vence. O site escolhe o caminho de cada uma. | Garantido com a mesma regra dos ovos | Médio (animação física) | Muito boa |
| 6 | **Pegadas no Mapa do Maroto** | O mapa da tela final vira o jogo: a cada clique, um par de pegadinhas avança por um corredor que bifurca. O destino final é a sala azul ou a rosa. | Garantido: a bifurcação decisiva é a última | Médio | Boa, mas mais lenta |
| 7 | **Quiz do casal** | Perguntas sobre os dois ("quem demora mais pra escolher restaurante?"). Cada resposta dá ponto para Menino ou Menina. A última pergunta decide. | Garantido, mas o vínculo entre resposta e sexo é arbitrário | Baixo | Ótima para envolver a plateia |
| 8 | **Garra de Toy Story** | A garra do trailer desce sobre bichinhos azuis e rosas; cada clique pega um. Maioria vence. | Garantido com regra dos ovos | Médio | Muito boa, já tem a garra desenhada |
| 9 | **Batalha naval** | Tiros num tabuleiro revelam navios azuis ou rosas. | Alto, não garantido | Médio | Média, muitos quadradinhos |
| 10 | **Jogo da memória** | Cartas viradas com X e O; pares formados contam ponto. | Médio | Médio | Fraca a distância |

### Os dois que eu levaria adiante

**Ovos de dinossauro.** Encaixa no universo (o bebê dinossauro já é
personagem), é imediato de entender, e o mistério é matemático: com 11 ovos
e o site controlando a cor, o placar nunca passa de um de diferença até o
último. A plateia torce ovo a ovo. Dá para reaproveitar o pó de giz como
casca voando, os aliens no "empatou!", e os personagens com as poses de
susto e festa.

**Corrida de photo finish.** O mais cinematográfico. Dois carros, cada
clique acelera o da vez, a linha de chegada com uma câmera que "congela" e
mostra a foto. O site garante que o último clique é o decisivo. Combina com
De Volta para o Futuro e com a música de corrida.

Se quiser manter o jogo da velha, a seção seguinte explica o que mudou nele.

## 3. O jogo da velha com mistério até o fim

O pedido: ninguém deve conseguir adivinhar o resultado antes das duas
últimas jogadas. No jogo da velha, "ainda dá menina?" significa "ainda
existe uma linha sem nenhum X?". Então a regra nova é: o site mantém pelo
menos uma linha sem X e uma linha sem O vivas pelo maior tempo possível,
com prioridade acima de tudo, e só depois tenta empurrar o quatro em linha
para o último clique.

Como a plateia escolhe as casas, o site não controla a ordem; em algumas
ordens o mistério acaba antes (por exemplo, se as primeiras oito casas
clicadas forem justamente as de duas linhas). Medido em simulação com
cliques aleatórios, o resultado é o da tabela abaixo. Com o jogo dos ovos
o número seria 100% por construção.

| Medida (300 partidas simuladas, cliques aleatórios) | Resultado |
|---|---|
| O lado errado nunca fecha quatro | 100% |
| Mistério mantido até a 14ª jogada ou além | 83% |
| Mistério mantido até a 13ª jogada | 13% |
| Mistério acaba antes da 13ª | 4% |
| Quatro em linha na 16ª jogada (a última) | 55% |
| Quatro em linha na 15ª ou 16ª | 86% |
| Quatro em linha na 14ª ou antes | 14% |

Dois detalhes técnicos que entraram junto: a busca exata do fim de jogo
tinha um erro de chave de memória (tabuleiros diferentes caíam na mesma
chave), o que fazia o site jogar pior do que podia; e a regra do começo do
jogo passou a equilibrar as linhas vivas dos dois lados em vez de só
"matar" linhas.
