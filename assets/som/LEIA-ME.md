# Trilha sonora

Coloque aqui os arquivos de áudio (mp3 ou m4a). Os nomes que o site procura
estão na tabela `TRILHA`, no começo de `assets/site.js`:

| Arquivo | Toca em |
|---|---|
| `capa.mp3` | capa |
| `bastidor.mp3` | seletor, confirmação e tela de play |
| `abertura-vhs.mp3` | cena 1, a fita entra |
| `abertura-letreiro.mp3` | cena 2, letreiro |
| `abertura-delorean.mp3` | cena 3, DeLorean |
| `abertura-parque.mp3` | cena 4, Parque dos Bebês |
| `abertura-matrix.mp3` | cena 5, Matrix |
| `abertura-aventura.mp3` | cena 6, os dois olhando o mar |
| `jogo.mp3` | jogo da velha |
| `resultado.mp3` | resultado |
| `fim.mp3` | tela de fim |

Cada faixa toca em loop, com fade de entrada e saída na troca de cena. Se um
arquivo não existir, aquele momento fica sem trilha, sem erro. O botão SOM
(ou a tecla M) silencia trilha e efeitos de uma vez.
