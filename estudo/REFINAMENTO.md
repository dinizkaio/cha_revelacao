# Estudo de refinamento · Chá Revelação Nanda e Kaio

O site está completo e funcionando: fluxo, jogo, trilha, resultado, fim e
trailer. Este estudo responde a duas perguntas: o que ainda pode melhorar,
e até onde a arte consegue ir dentro da regra "tudo feito aqui, em código".

## 1. O que já entrou nesta rodada

- **Letreiro:** a Nanda é loira; o texto agora diz "passar chapinha no
  cabelo", em vez de pintar de preto.
- **Personagem da Nanda:** cabelo loiro, na tela do seletor, no jogo, no
  resultado e na cena da praia.
- **DeLorean:** redesenhado. A frente baixa com o farol fica à direita, as
  grades traseiras e a lanterna à esquerda; ele entra pela esquerda e anda
  para a frente.
- **Harry Potter:** o pomo de ouro voando na capa; a placa "Plataforma 9¾"
  na capa; o Chapéu Seletor na tela da guardiã, resmungando "Hmm… difícil.
  Muito difícil…"; e uma cena nova na abertura, entre o Matrix e a praia: a
  carta de Hogwarts chega com a coruja, reservando a vaga do filho ou filha
  para 2037 ("P.S.: não, isso não decide o nome").
- **Jurassic babies:** o selo do Parque dos Bebês agora tem um bebê
  dinossauro saindo do ovo, de chupeta, no lugar do T-Rex adulto. Ele é
  personagem recorrente: aparece na praia da abertura, torcendo ao lado da
  lousa no jogo, comemorando no resultado e dormindo no FIM.
- **Toy Story:** alien de três olhos espiando na capa; o Rex (T-Rex verde)
  e o chapéu do Woody em cima da TV na tela do play (a pizza e o Slinky já
  estavam lá); os três aliens surgem do chão com "Ooooooh!" no "quase!" do
  jogo; selo "Ao infinito e além!" no resultado; chapéu do Woody e "você tem
  um amigo em nós" no FIM; a garra descendo e os aliens ("a garraaaa… ela
  escolhe quem vai e quem fica") no trailer da Galáxia dos Nomes.

Os tempos da sequência musical ficaram: DeLorean 12 s, Parque 11 s,
Matrix 11 s, carta 11 s, praia 16 s. Soma 61 s, o mesmo da música.

## 2. Até onde a arte pode ir

Tudo é vetor (SVG) e CSS. Isso tem um teto e tem um caminho.

**O teto:** não vai virar pintura, como nas imagens de referência geradas
por IA. Vetor não tem pincelada, textura de tinta nem iluminação
fotográfica. O que ele faz muito bem é o visual de pôster chapado, desenho
animado e videogame dos anos 90, que é exatamente o universo do site.

**O caminho, do mais barato ao mais caro:**

1. **Luz e profundidade** (barato, ganho grande). Hoje a maioria das formas
   é cor chapada. Gradientes de duas cores, sombras projetadas, brilho em
   bordas e um "vinheta" por cena dão volume sem mudar o traço. Exemplo: o
   DeLorean com reflexo metálico, o T-Rex com contraluz do pôr do sol, a
   lua com halo.
2. **Camadas com parallax** (barato). Na capa e na praia, fundo, montanhas,
   cidade, mar e objetos se movem em velocidades diferentes com o mouse ou
   sozinhos, devagar. Em projeção isso dá vida sem distrair.
3. **Partículas** (médio). Estrelas que piscam já existem; faltam faíscas no
   rastro do DeLorean, poeira de giz quando o X ou O é riscado, brilho
   caindo do pomo de ouro, confete de verdade (não só fogos) no resultado,
   chuvisco da TV mais orgânico.
4. **Personagens com mais vida** (médio). Kaio e Nanda hoje têm uma pose
   só, com balanço. Dá para ter versões: torcendo com os braços para cima,
   assustados no "quase!", pulando e abraçados no resultado, e piscar de
   olhos aleatório. Cada pose é um SVG a mais, reaproveitando o mesmo
   desenho.
5. **Mais objetos e detalhe** (médio). Os ícones são silhuetas limpas. Dá
   para subir o nível de detalhe de alguns, principalmente os que ficam
   grandes na tela: o DeLorean (portas asa de gaivota abertas, placa
   OUTATIME), o Game Boy (tela com um Tetris rodando), a fita VHS com rótulo
   escrito à mão.
6. **Tipografia como arte** (barato). Títulos com extrusão 3D de verdade
   (várias camadas de sombra), cromado no "A Galáxia dos Nomes", neon com
   tremulação na capa.
7. **Transições de cena** (médio). Hoje é corte seco com fade de som. Pode
   ter o "tracking" de VHS entre cenas, um flash branco no trovão, uma
   cortina de código no Matrix, o pomo cruzando a tela ao sair da capa.
8. **Som de verdade nos efeitos** (barato, quando os arquivos vierem). Os
   efeitos sintetizados servem; giz, trovão, fogos e o "uh!" de plateia
   gravados são melhores. Os nomes de arquivo já estão no roteiro.

Com os itens 1, 2, 4 e 6 o site dá um salto visível. Os outros são
acabamento.

## 3. Tela a tela: o que eu mudaria

### Capa
- Já está densa, como a referência. O risco agora é poluir: cada objeto
  novo precisa tirar outro ou ficar menor.
- Melhorias: halo na lua e reflexo do sol no mar; o DeLorean com rastro de
  faíscas; o pomo deixando um brilho; parallax leve; neon do botão com
  tremulação de letreiro antigo.
- Ideia: o botão "Começar" como botão físico de videocassete, que afunda ao
  clicar.

### Seletor e confirmação
- Funcionais e claros. O Chapéu Seletor dá o tom.
- Melhoria: quando a guardiã passa o mouse sobre uma polaroid, o chapéu
  reage ("Grifinória? Não… MENINA!" não pode, revela). Melhor: ele só
  resmunga variações neutras: "Vejo coragem…", "Um nome difícil, pelo
  visto…". Pequeno, divertido, sem revelar nada.
- Na confirmação, a voz da trilha já faz o trabalho; na tela, um carimbo
  vermelho "CONFIDENCIAL" girando sobre a polaroid ao confirmar.

### Play
- Boa. Melhoria: a fita VHS entrando no aparelho quando aperta o play
  (animação de 1 s antes de cortar para a abertura), com o som que já
  existe.

### Abertura
- Fita: ok, agora com 8 s para a música respirar.
- Letreiro: é o coração. Melhoria: estrelas com parallax e uma nave
  pequena atravessando ao fundo em algum momento; o texto com leve brilho.
- DeLorean: faíscas e portas abrindo ao parar; os números do painel
  "girando" até fixar.
- Parque dos Bebês: o ovo do selo rachando antes de o bebê aparecer;
  trovão com flash já existe.
- Matrix: a chuva de código já é boa; pode ter as pílulas "flutuando" com
  reflexo.
- Carta: a coruja largar a carta de verdade (hoje ela só cruza); o lacre
  com a letra "H" quebrando.
- Praia: o sol descendo em vez de subindo (pôr do sol), as crianças
  balançando as pernas, o gato com a cauda mexendo, ondas com espuma.

### Jogo
- Melhorias de sensação: ao riscar, pó de giz; no "quase!", os dois
  personagens com cara de susto; na vitória, a linha vencedora riscada por
  cima com giz amarelo, de uma vez, antes de cortar para o resultado.
- Outra ideia: o nome de quem joga (Nanda/Kaio) piscando na lousa, e um
  placar de "jogadas" com giz.

### Resultado
- Já é o clímax. Melhorias: confete de verdade (papel caindo com
  física simples), os dois personagens juntos (não só o do sexo
  revelado), e um "zoom" na foto de criança correspondente.
- "Ao infinito e além!" (Toy Story, 1995, Buzz Lightyear da Patrulha
  Estelar) cabe como frase do bilhete do resultado ou como carimbo. Preciso
  confirmar se era essa a referência de "star energia infinita".

### Fim e trailer
- Bons. Melhoria: no trailer, a roleta parar de mentira num nome, fazer
  "tec… tec…" e voltar a girar, duas ou três vezes, antes de "ainda não
  decidiu".

## 4. O que eu faria primeiro, em ordem (tudo feito)

Todas as sete etapas abaixo entraram no site, nesta ordem, em commits
separados: luz e profundidade; poses e piscar; confete e pó de giz;
transições de VHS (mais flash do trovão, cortina Matrix e pomo fugindo
da capa); parallax com mouse e balanço lento; tipografia 3D com cromado
no trailer e tremulação no neon. Os detalhes de cena da seção 3 que ainda
não entraram ficam como próxima rodada, se quiserem.

Ordem original:

1. Luz e profundidade na capa, na praia e no resultado (gradientes, halos,
   sombras).
2. Personagens com poses: torcida, susto, comemoração, e piscar de olhos.
3. Confete e pó de giz.
4. Transições de VHS entre as cenas da abertura.
5. Parallax na capa e na praia.
6. Tipografia 3D nos títulos grandes.
7. Os detalhes de cena da seção 3, um por um.

Cada um desses é um bloco de trabalho pequeno, testável no `?ensaio`.
Posso seguir nessa ordem ou na que você preferir.

## 5. Decisões já tomadas

- Toy Story entrou como referência (ver seção 1).
- Harry Potter fica na dose atual: capa, seletor e carta.
- O bebê dinossauro é personagem recorrente.
- Os textos novos (carta de Hogwarts, Chapéu Seletor, aliens) podem ser
  reescritos à vontade.
