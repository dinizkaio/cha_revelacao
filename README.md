# Chá Revelação · Nanda e Kaio

Site do chá revelação, para ser projetado na festa. Uma página só, estática,
publicada pelo GitHub Pages. Nada vem de fora: fontes, desenhos (SVG) e
script são deste repositório. Sem análise de uso, sem cookies, sem serviço
de terceiros.

## Como usar na festa

1. Abra o site no notebook que vai projetar. **Capa** → "Começar".
2. Entregue o notebook para quem guarda o segredo. Ela escolhe **Menino** ou
   **Menina**, confirma duas vezes e devolve. A escolha some da tela e fica
   trancada no navegador.
3. A tela **"Tá tudo pronto!"** é igual para os dois resultados: pode ligar o
   projetor. Quando todo mundo estiver olhando, aperte o play (ou a tecla
   espaço).
4. Roda a **abertura** (cerca de 2 minutos e meio; um clique pula para o
   jogo).
5. **Jogo da velha na lousa**, 4×4: vocês revezam clicando numa casa; o giz
   decide se sai X (menino) ou O (menina). Quatro iguais em linha, coluna ou
   diagonal revelam o bebê. O site sabe a resposta e segura a revelação o
   mais tarde possível, sem nunca deixar o outro lado fechar quatro.
6. **Resultado**, com fogos, e fim.

Se fechar ou atualizar a página, o site volta direto para a tela de play:
o segredo continua guardado.

## Ensaio, reset e som

- **Ensaiar sem gastar o segredo:** abra o site com `?ensaio` no fim do
  endereço. Roda tudo igual, com a palavra ENSAIO no canto, e a escolha fica
  só naquela aba.
- **Recomeçar do zero** (se alguém confirmou errado): abra com `?reiniciar`
  no fim do endereço, ou segure o título "Tá tudo pronto!" por 5 segundos e
  confirme.
- **Som:** o botão SOM fica na moldura da TV, em todas as telas (ou a tecla
  M). Silencia a trilha e os efeitos de uma vez; a preferência fica guardada.
  A trilha sonora vai em `assets/som/` (veja o `LEIA-ME.md` de lá).
- **Abertura:** um clique ou espaço passa para a próxima cena; Esc vai
  direto para o jogo.
- **Fim:** o botão "STOP · FIM" na tela do resultado para os fogos e o som e
  mostra a tela de encerramento. Um clique nela volta para o resultado.
- Em celular, o site pede para virar na horizontal, como uma TV. Tudo é
  desenhado em 1920×1080 e escalado para caber na tela.

## Publicar

O site é servido direto da branch principal pelo GitHub Pages:

1. No GitHub, **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**, branch
   `main`, pasta `/ (root)`. Salve.
3. Em um ou dois minutos o site fica em
   `https://dinizkaio.github.io/cha_revelacao/`.

O arquivo `.nojekyll` evita que o GitHub processe a pasta. Para um domínio
próprio, é só criar o arquivo `CNAME` com o domínio e apontar o DNS, como no
getsessionflow.app.

## Arquivos

| Caminho | O que é |
|---|---|
| `index.html` | A página, com todas as telas. |
| `assets/site.css` | Todo o estilo (a TV de tubo, o pôster, a lousa, a abertura). |
| `assets/site.js` | Navegação, segredo, abertura, jogo e som. |
| `assets/props.js` | Os desenhos dos anos 90 em SVG (T-Rex, Vader, E.T., DeLorean, Game Boy, cassete, VHS…). |
| `assets/kaio.svg`, `assets/nanda.svg` | Os dois personagens. |
| `assets/img/` | As fotos de infância, na tela do resultado. |
| `assets/fontes/` | As fontes (Google Fonts, licença OFL), servidas daqui. |
| `estudo/` | O estudo visual que precedeu o site (mockups, imagens, decisões). |
