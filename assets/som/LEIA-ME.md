# Trilha sonora

Coloque aqui os arquivos de áudio (mp3 ou m4a). Os nomes que o site procura
estão na tabela `TRILHA`, no começo de `assets/site.js`:

| Arquivo | Toca em | Trecho usado |
|---|---|---|
| `01-capa.mp3` | capa | do segundo 2 ao 205,5, em loop |
| `02-seletor.mp3` | escolha menino/menina | do começo ao 94, em loop |
| `03-confirmar.mp3` | confirmação da escolha | do 2,3 ao 50,5, em loop |
| `04-play.mp3` | "Tá tudo pronto!" | do começo ao 121, em loop |
| `05-fita.mp3` | cena 1, a fita entra | do 2,8, uma vez (a cena dura 19,5 s) |
| `06-letreiro.mp3` | cena 2, letreiro | do 1,2, uma vez (113 s) |
| `07-sequencia-1.mp3` | cena 3, DeLorean | do 148,6, uma vez (10 s) |
| `07-sequencia-2.mp3` | cena 4, Matrix | do 23,6, uma vez (10 s) |
| `07-sequencia-3.mp3` | cena 5, Hogwarts | do 151,8, uma vez (42 s); o ataque cai no clarão da parede |
| `07-sequencia-4.mp3` | cena 6, praia | do 185,6, uma vez (12 s) |
| `08-jogo.mp3` | jogo da velha | do começo ao 42, em loop |
| `09-resultado.mp3` | resultado | entra na vitória, no 189,4; o 192 cai na revelação; loop do 189,5 ao 235 |
| `10-fim.mp3` | tela de FIM | do começo ao 179, em loop |
| `11-trailer.mp3` | trailer "A Galáxia dos Nomes" | do começo ao 51,5, em loop |
| `12-final.mp3` | tela final, Mapa do Maroto | do começo até o "Nox" (12,5 s) |

Os pontos de entrada, de loop e o volume de cada faixa ficam na tabela `LOOP`
de `assets/site.js`. O volume foi medido trecho a trecho e equilibrado em
torno de -25 dB, então o site toca mais baixo que antes: no dia, suba o
volume do som da sala, não o do navegador. Os arquivos não têm metadados de
título, artista ou álbum.

A troca entre telas faz fade de saída e de entrada. Se um arquivo não existir, aquele momento fica sem trilha,
sem erro. O botão SOM (ou a tecla M) silencia trilha e efeitos de uma vez.

Faixas que terminam em silêncio ou com fade têm um ponto de corte na
tabela `LOOP` (também em `site.js`): o tocador para ali e emenda com o
começo num crossfade. A capa, por exemplo, corta em 205,5 s. Para medir uma
faixa nova, o site aceita `?depurar` no endereço e expõe `trilha.estado()`
e `trilha.buscar(segundos)` no console.

Para trocar qual arquivo toca onde, edite a tabela `TRILHA` em `site.js` e
rode `python3 tools/carimbar.py` antes de publicar.
