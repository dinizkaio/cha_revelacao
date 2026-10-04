# Trilha sonora

Coloque aqui os arquivos de áudio (mp3 ou m4a). Os nomes que o site procura
estão na tabela `TRILHA`, no começo de `assets/site.js`:

| Arquivo | Toca em | Duração que o site usa |
|---|---|---|
| `01-capa.mp3` | capa | em loop, até clicarem em Começar |
| `02-seletor.mp3` | escolha menino/menina | em loop |
| `03-confirmar.mp3` | confirmação da escolha | em loop |
| `04-play.mp3` | "Tá tudo pronto!" | em loop, até o play |
| `05-fita.mp3` | cena 1, a fita entra (NANDA & KAIO) | 4,5 s |
| `06-letreiro.mp3` | cena 2, letreiro Star Wars | cerca de 112 s |
| `07-sequencia.mp3` | cenas 3 a 6: DeLorean, Parque dos Bebês, Matrix, praia | cerca de 33 s (9 + 7,5 + 7,5 + 8,5) |
| `08-jogo.mp3` | jogo da velha | em loop, 1 a 3 min |
| `09-resultado.mp3` | resultado | em loop |
| `10-fim.mp3` | tela de FIM | em loop |
| `11-trailer.mp3` | trailer "A Galáxia dos Nomes" | em loop |

Toda faixa toca em loop, com fade de entrada e saída na troca. Momentos que
apontam para o mesmo arquivo continuam a música sem recomeçar (é o caso da
sequência 07). Se um arquivo não existir, aquele momento fica sem trilha,
sem erro. O botão SOM (ou a tecla M) silencia trilha e efeitos de uma vez.

Faixas que terminam em silêncio ou com fade têm um ponto de corte na
tabela `LOOP` (também em `site.js`): o tocador para ali e emenda com o
começo num crossfade. A capa, por exemplo, corta em 170 s. Para medir uma
faixa nova, o site aceita `?depurar` no endereço e expõe `trilha.estado()`
e `trilha.buscar(segundos)` no console.

Para trocar qual arquivo toca onde, edite a tabela `TRILHA` em `site.js` e
rode `python3 tools/carimbar.py` antes de publicar.
